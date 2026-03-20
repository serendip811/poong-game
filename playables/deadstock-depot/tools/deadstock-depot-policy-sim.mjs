#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const ROOT_DIR = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const GAME_FILE = path.join(ROOT_DIR, "game.js");

const DEFAULT_DAYS = [1, 2, 3, 4, 5, 6];
const DEFAULT_COMPLAINTS = [0, 25, 50, 100];
const DEFAULT_POLICIES = ["idle", "attack-only", "balanced"];
const DEFAULT_RUNS = 200;
const DEFAULT_DT = 0.05;
const MAX_STEPS = 2000;

const POLICY_LABELS = {
  idle: "Idle",
  "attack-only": "Attack Only",
  balanced: "Balanced",
};

const options = parseArgs(process.argv.slice(2));
const runtime = createRuntime();
const rows = [];

for (const complaint of options.complaints) {
  for (const day of options.days) {
    for (const policy of options.policies) {
      rows.push(
        runBatch({
          runtime,
          day,
          complaint,
          policy,
          runs: options.runs,
          dt: options.dt,
        })
      );
    }
  }
}

if (options.json) {
  console.log(JSON.stringify({ options, rows }, null, 2));
} else {
  printSummary(options, rows);
}

function parseArgs(argv) {
  const parsed = {
    days: DEFAULT_DAYS,
    complaints: DEFAULT_COMPLAINTS,
    policies: DEFAULT_POLICIES,
    runs: DEFAULT_RUNS,
    dt: DEFAULT_DT,
    json: false,
  };

  for (const arg of argv) {
    if (arg === "--json") {
      parsed.json = true;
      continue;
    }

    const [flag, rawValue] = arg.split("=");
    if (!rawValue) {
      continue;
    }

    if (flag === "--days") {
      parsed.days = parseNumberList(rawValue);
    } else if (flag === "--complaints") {
      parsed.complaints = parseNumberList(rawValue);
    } else if (flag === "--policies") {
      parsed.policies = rawValue
        .split(",")
        .map((value) => value.trim())
        .filter((value) => DEFAULT_POLICIES.includes(value));
    } else if (flag === "--runs") {
      parsed.runs = Math.max(1, Number(rawValue) || DEFAULT_RUNS);
    } else if (flag === "--dt") {
      parsed.dt = Math.max(0.01, Number(rawValue) || DEFAULT_DT);
    }
  }

  return parsed;
}

function parseNumberList(value) {
  return value
    .split(",")
    .map((entry) => Number(entry.trim()))
    .filter((entry) => Number.isFinite(entry));
}

function runBatch({ runtime, day, complaint, policy, runs, dt }) {
  let wins = 0;
  let totalBase = 0;
  let totalWindowHp = 0;
  let totalPeakZombies = 0;
  let totalBrokenWindows = 0;

  for (let run = 0; run < runs; run += 1) {
    const result = runNight({
      runtime,
      day,
      complaint,
      policy,
      seed: buildSeed(day, complaint, policy, run),
      dt,
    });

    if (result.survived) {
      wins += 1;
    }

    totalBase += result.baseHealth;
    totalWindowHp += result.totalWindowHp;
    totalPeakZombies += result.peakZombies;
    totalBrokenWindows += result.brokenWindows;
  }

  return {
    day,
    complaint,
    policy,
    runs,
    winRate: wins / runs,
    avgBaseHealth: totalBase / runs,
    avgWindowHp: totalWindowHp / runs,
    avgPeakZombies: totalPeakZombies / runs,
    avgBrokenWindows: totalBrokenWindows / runs,
  };
}

function runNight({ runtime, day, complaint, policy, seed, dt }) {
  runtime.setSeed(seed);
  runtime.api.initNight(day, complaint);

  let peakZombies = 0;
  let maxBrokenWindows = 0;
  let steps = 0;

  while (steps < MAX_STEPS) {
    const snapshot = runtime.api.snapshot();
    if (snapshot.phase !== "defense") {
      break;
    }

    peakZombies = Math.max(peakZombies, snapshot.zombies.length);
    maxBrokenWindows = Math.max(
      maxBrokenWindows,
      snapshot.windows.filter((windowState) => windowState.hp <= 0).length
    );

    applyPolicy(policy, snapshot, runtime.api);
    runtime.api.tick(dt);
    steps += 1;
  }

  if (steps >= MAX_STEPS) {
    throw new Error(`Simulation exceeded ${MAX_STEPS} steps for ${policy} on day ${day}`);
  }

  const outcome = runtime.api.result();
  return {
    survived: outcome.survived,
    baseHealth: outcome.baseHealth,
    totalWindowHp: outcome.windows.reduce((sum, windowState) => sum + windowState.hp, 0),
    peakZombies,
    brokenWindows: maxBrokenWindows,
  };
}

function applyPolicy(policy, snapshot, api) {
  if (policy === "idle") {
    return;
  }

  if (policy === "attack-only") {
    const targetLane = getFrontLane(snapshot.zombies);
    if (targetLane !== null) {
      api.attackLane(targetLane);
    }
    return;
  }

  if (policy === "balanced") {
    const frontZombie = getFrontZombie(snapshot.zombies);
    const laneStates = snapshot.windows.map((windowState) => ({
      ...windowState,
      frontZombie: getFrontZombie(snapshot.zombies.filter((zombie) => zombie.lane === windowState.id)),
    }));
    const brokenWindow =
      laneStates
        .filter((windowState) => windowState.hp <= 0)
        .sort(
          (left, right) =>
            (right.frontZombie?.progress ?? 0) - (left.frontZombie?.progress ?? 0)
        )[0] ?? null;
    const criticalWindow =
      laneStates
        .filter(
          (windowState) =>
            windowState.frontZombie &&
            windowState.frontZombie.progress >= 0.7 &&
            windowState.hp <= Math.ceil(windowState.maxHp * 0.6)
        )
        .sort((left, right) => left.hp - right.hp)[0] ?? null;
    const repairableWindow =
      laneStates
        .filter(
          (windowState) =>
            windowState.frontZombie &&
            windowState.frontZombie.progress >= 0.45 &&
            windowState.hp > 0 &&
            windowState.hp < windowState.maxHp
        )
        .sort((left, right) => left.hp - right.hp)[0] ?? null;
    const crowdedCount = snapshot.zombies.filter((zombie) => zombie.progress >= 0.55).length;

    if (
      frontZombie &&
      crowdedCount >= 2 &&
      frontZombie.progress >= 0.72 &&
      snapshot.actionEnergy >= 2 &&
      snapshot.stunCooldown <= 0
    ) {
      api.flash();
      return;
    }

    if (brokenWindow && snapshot.actionEnergy >= 1) {
      api.repairWindow(brokenWindow.id);
      return;
    }

    if (criticalWindow && snapshot.actionEnergy >= 1) {
      api.repairWindow(criticalWindow.id);
      return;
    }

    if (frontZombie && snapshot.attackCooldown <= 0 && snapshot.actionEnergy >= 1) {
      api.attackLane(frontZombie.lane);
      return;
    }

    if (repairableWindow && snapshot.actionEnergy >= 1.4) {
      api.repairWindow(repairableWindow.id);
    }
  }
}

function getFrontLane(zombies) {
  const frontZombie = getFrontZombie(zombies);
  return frontZombie ? frontZombie.lane : null;
}

function getFrontZombie(zombies) {
  return [...zombies].sort(
    (left, right) => right.progress - left.progress || left.hp - right.hp
  )[0] ?? null;
}

function buildSeed(day, complaint, policy, run) {
  const policySeed = policy
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return day * 100000 + complaint * 100 + policySeed + run;
}

function createRuntime() {
  const source = fs.readFileSync(GAME_FILE, "utf8");
  const nodeStore = new Map();
  let randomSource = Math.random;

  const mathProxy = Object.create(Math);
  mathProxy.random = () => randomSource();

  const context = {
    console,
    document: createDocument(nodeStore),
    localStorage: {
      getItem() {
        return null;
      },
      setItem() {},
    },
    navigator: { language: "en-US", languages: ["en-US"] },
    requestAnimationFrame() {
      return 1;
    },
    cancelAnimationFrame() {},
    performance: { now: () => 0 },
    setTimeout,
    clearTimeout,
    Date,
    Math: mathProxy,
    window: null,
  };

  context.window = context;
  vm.createContext(context);
  vm.runInContext(source, context);
  vm.runInContext(
    `
      globalThis.__sim = {
        initNight(day, complaint) {
          startRun();
          beginDay(day);
          state.complaint = complaint;
          enterDefensePhase();
        },
        tick(dt) {
          updatePhase(dt);
          return state.phase;
        },
        attackLane(laneIndex) {
          state.currentAction = "attack";
          attackLane(laneIndex);
        },
        repairWindow(index) {
          state.currentAction = "repair";
          repairWindow(index);
        },
        flash() {
          flashLamp();
        },
        snapshot() {
          return {
            phase: state.phase,
            day: state.day,
            dayThreat: state.dayThreat,
            phaseTimeLeft: state.phaseTimeLeft,
            baseHealth: state.baseHealth,
            actionEnergy: state.actionEnergy,
            maxEnergy: state.maxEnergy,
            attackCooldown: state.attackCooldown,
            stunCooldown: state.stunCooldown,
            maxWindowHp: state.maxWindowHp,
            windows: state.windows.map((windowState) => ({
              id: windowState.id,
              hp: windowState.hp,
              maxHp: windowState.maxHp,
            })),
            zombies: state.zombies.map((zombie) => ({
              id: zombie.id,
              lane: zombie.lane,
              hp: zombie.hp,
              progress: zombie.progress,
              stunned: zombie.stunned,
              type: zombie.type,
            })),
          };
        },
        result() {
          return {
            phase: state.phase,
            baseHealth: state.baseHealth,
            windows: state.windows.map((windowState) => ({
              id: windowState.id,
              hp: windowState.hp,
              maxHp: windowState.maxHp,
            })),
            survived:
              state.phase === "upgrade" ||
              (state.phase === "result" && Boolean(state.result?.victory)),
          };
        },
      };
    `,
    context
  );

  return {
    api: context.__sim,
    setSeed(seed) {
      randomSource = mulberry32(seed);
    },
  };
}

function createDocument(nodeStore) {
  return {
    documentElement: {
      lang: "en",
      style: {
        setProperty() {},
      },
    },
    title: "",
    body: { dataset: {} },
    querySelector(selector) {
      if (!selector.startsWith("#")) {
        return createNode();
      }

      if (!nodeStore.has(selector)) {
        nodeStore.set(selector, createNode());
      }

      return nodeStore.get(selector);
    },
    querySelectorAll() {
      return [];
    },
    addEventListener() {},
  };
}

function createNode(dataset = {}) {
  return {
    textContent: "",
    innerHTML: "",
    dataset: { ...dataset },
    style: {
      setProperty() {},
    },
    value: "",
    disabled: false,
    listeners: {},
    classList: {
      add() {},
      remove() {},
      toggle() {},
      contains() {
        return false;
      },
    },
    setAttribute(name, value) {
      this[name] = value;
    },
    getAttribute(name) {
      return this[name];
    },
    addEventListener(type, callback) {
      this.listeners[type] = callback;
    },
    querySelector() {
      return createNode();
    },
    querySelectorAll() {
      return [];
    },
    appendChild() {},
    focus() {},
    closest() {
      return null;
    },
  };
}

function mulberry32(seed) {
  let value = seed >>> 0;
  return function next() {
    value += 0x6d2b79f5;
    let hash = value;
    hash = Math.imul(hash ^ (hash >>> 15), hash | 1);
    hash ^= hash + Math.imul(hash ^ (hash >>> 7), hash | 61);
    return ((hash ^ (hash >>> 14)) >>> 0) / 4294967296;
  };
}

function printSummary(options, rows) {
  console.log("# Deadstock Depot night policy simulator");
  console.log("");
  console.log(
    `Runs per cell: ${options.runs}, dt: ${options.dt.toFixed(2)}s, using actual defense logic from game.js`
  );
  console.log("");

  for (const complaint of options.complaints) {
    console.log(`Complaint ${complaint}`);
    console.log(
      pad("Day", 5) +
        options.policies
          .map((policy) => pad(POLICY_LABELS[policy] || policy, 34))
          .join("")
    );
    console.log(
      pad("", 5) +
        options.policies
          .map(() => pad("Win/Base/Boards/Peak/Broken", 34))
          .join("")
    );

    for (const day of options.days) {
      const cells = options.policies.map((policy) =>
        rows.find(
          (row) => row.day === day && row.complaint === complaint && row.policy === policy
        )
      );

      console.log(
        pad(String(day), 5) +
          cells
            .map((row) =>
              pad(
                `${formatPercent(row.winRate)} ${row.avgBaseHealth.toFixed(1)} ${row.avgWindowHp.toFixed(1)} ${row.avgPeakZombies.toFixed(1)} ${row.avgBrokenWindows.toFixed(1)}`,
                34
              )
            )
            .join("")
      );
    }

    console.log("");
  }

  const attackOnlyRows = rows.filter((row) => row.policy === "attack-only");
  const weakestAttackOnly = [...attackOnlyRows].sort((left, right) => left.winRate - right.winRate)[0];
  const strongestAttackOnly = [...attackOnlyRows].sort((left, right) => right.winRate - left.winRate)[0];

  console.log("Highlights");
  console.log(
    `Attack Only best case: complaint ${strongestAttackOnly.complaint}, day ${strongestAttackOnly.day}, win ${formatPercent(strongestAttackOnly.winRate)}`
  );
  console.log(
    `Attack Only worst case: complaint ${weakestAttackOnly.complaint}, day ${weakestAttackOnly.day}, win ${formatPercent(weakestAttackOnly.winRate)}`
  );
}

function pad(value, width) {
  return String(value).padEnd(width);
}

function formatPercent(value) {
  return `${(value * 100).toFixed(1)}%`;
}

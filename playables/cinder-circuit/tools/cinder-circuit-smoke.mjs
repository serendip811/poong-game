import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const repoRoot = path.resolve(
  path.dirname(new URL(import.meta.url).pathname),
  ".."
);
const gamePath = path.join(repoRoot, "game.js");
const source = fs.readFileSync(gamePath, "utf8");

const sandbox = {
  module: { exports: {} },
  exports: {},
  console,
  Math,
};

vm.runInNewContext(source, sandbox, { filename: gamePath });

const game = sandbox.module.exports;

assert.equal(game.GAME_TITLE, "Cinder Circuit");
assert.equal(game.MAX_WAVES, 5);
assert.equal(game.WAVE_CONFIG.length, 5);
assert.ok(game.WAVE_CONFIG[0].spawnBudget < game.WAVE_CONFIG[2].spawnBudget);
assert.ok(game.WAVE_CONFIG[4].hazard);
assert.ok(game.WAVE_CONFIG[3].hazard.interval > game.WAVE_CONFIG[4].hazard.interval);
assert.ok(game.WAVE_CONFIG[4].driveGainFactor > game.WAVE_CONFIG[3].driveGainFactor);
assert.equal(game.DEFAULT_SIGNATURE_ID, "relay_oath");

const signatureBuild = game.createInitialBuild("scrap_pact");
assert.equal(signatureBuild.signatureId, "scrap_pact");
assert.equal(signatureBuild.maxHpBonus, 8);
assert.equal(signatureBuild.pickupBonus, 18);
assert.equal(signatureBuild.scrapMultiplier, 1.08);

const build = game.createInitialBuild("scrap_pact");
build.pendingCores = game.sanitizeBenchCoreIds(build.pendingCores.concat(["lance"]));
assert.equal(
  JSON.stringify(game.sanitizeBenchCoreIds(["scatter", "scatter", "scatter", "scatter"])),
  JSON.stringify(["scatter", "scatter", "scatter"])
);
assert.equal(game.getBenchCount(build, "scatter"), 2);
assert.equal(
  JSON.stringify(game.getBenchEntries(build)),
  JSON.stringify([
    { coreId: "scatter", copies: 2, syncLevel: 1 },
    { coreId: "lance", copies: 1, syncLevel: 0 },
  ])
);

let rollIndex = 0;
const deterministicRolls = [0.11, 0.73, 0.49, 0.27, 0.92, 0.34, 0.58];
const rng = () => {
  const value = deterministicRolls[rollIndex % deterministicRolls.length];
  rollIndex += 1;
  return value;
};

const choices = game.buildForgeChoices(build, rng, 180);
assert.equal(choices.length, 3);
assert.ok(choices.some((choice) => choice.type === "core"));
assert.ok(choices.some((choice) => choice.type === "utility"));
assert.ok(choices.every((choice) => typeof choice.verb === "string" || choice.type === "fallback"));
assert.ok(choices.every((choice) => typeof choice.cost === "number"));

const scatterChoice = choices.find((choice) => choice.type === "core" && choice.coreId === "scatter");
assert.ok(scatterChoice);
assert.equal(scatterChoice.benchCopies, 2);
assert.equal(scatterChoice.syncLevel, 2);
assert.ok(scatterChoice.cost < game.CORE_DEFS.scatter.cost);

const recycleChoice = choices.find((choice) => choice.action === "recycle");
assert.ok(recycleChoice);

const lowBankChoices = game.buildForgeChoices(build, rng, 0);
assert.ok(lowBankChoices.some((choice) => choice.cost === 0));

const fallbackBuild = game.createInitialBuild();
fallbackBuild.pendingCores = [];
const fallbackChoices = game.buildForgeChoices(fallbackBuild, rng, 0);
assert.ok(fallbackChoices.some((choice) => choice.type === "fallback"));

const run = {
  build,
  player: {
    hp: 74,
    maxHp: 100,
    heat: 86,
    overheated: true,
  },
  resources: {
    scrap: 10,
  },
  stats: {
    scrapCollected: 0,
  },
};

game.applyForgeChoice(run, scatterChoice);
assert.equal(run.build.coreId, "scatter");
assert.equal(game.getBenchCount(run.build, "scatter"), 0);
assert.equal(game.computeWeaponStats(run.build).attunedCopies, 3);
assert.equal(game.computeWeaponStats(run.build).benchSyncLevel, 2);

run.build.pendingCores = game.sanitizeBenchCoreIds(run.build.pendingCores.concat(["scatter"]));
const sameCoreChoice = game.buildForgeChoices(run.build, rng, 180).find(
  (choice) => choice.type === "core" && choice.coreId === "scatter"
);
assert.ok(sameCoreChoice);
game.applyForgeChoice(run, sameCoreChoice);
assert.equal(run.build.coreId, "scatter");
assert.equal(run.build.attunedCopies, 3);
assert.equal(game.computeWeaponStats(run.build).benchSyncLevel, 2);
assert.equal(game.getBenchCount(run.build, "scatter"), 0);

game.applyForgeChoice(run, {
  type: "core",
  coreId: "lance",
  benchCopies: 1,
});
assert.equal(run.build.coreId, "lance");
assert.equal(run.build.attunedCoreId, "lance");
assert.equal(run.build.attunedCopies, 1);
assert.equal(game.getBenchCount(run.build, "lance"), 0);
assert.equal(game.computeWeaponStats(run.build).benchSyncLevel, 0);

const recycleRun = {
  build: game.createInitialBuild(),
  player: {
    hp: 74,
    maxHp: 100,
    heat: 86,
    overheated: true,
  },
  resources: {
    scrap: 10,
  },
  stats: {
    scrapCollected: 0,
  },
};
recycleRun.build.coreId = "scatter";
recycleRun.build.pendingCores = ["scatter", "scatter", "ricochet"];
game.applyForgeChoice(recycleRun, {
  type: "utility",
  action: "recycle",
  scrapValue: 45,
});
assert.equal(recycleRun.resources.scrap, 55);
assert.equal(recycleRun.build.pendingCores.length, 0);
assert.ok(recycleRun.player.hp > 74);
assert.ok(recycleRun.player.heat < 86);
assert.equal(game.computeWeaponStats(recycleRun.build).benchSyncLevel, 0);

game.applyForgeChoice(run, {
  type: "mod",
  modId: "coolant_purge",
});
assert.ok(run.player.hp >= 74);
assert.ok(run.player.heat < 68);
assert.equal(run.player.overheated, false);

const weapon = game.computeWeaponStats(run.build);
const playerStats = game.computePlayerStats(run.build);

assert.ok(weapon.damage > 0);
assert.equal(weapon.benchSyncLevel, 0);
assert.equal(playerStats.pickupRadius, 60);
assert.equal(playerStats.maxHp, 108);
assert.ok(playerStats.maxHp >= 100);
assert.ok(playerStats.overdriveDuration >= 5.5);

const waveSummary = game.WAVE_CONFIG.map((wave) => ({
  wave: wave.label,
  duration: wave.duration,
  spawnBudget: wave.spawnBudget,
  activeCap: wave.activeCap,
  hazard: wave.hazard ? wave.hazard.label : "none",
}));

console.log("cinder-circuit smoke ok");
console.table(waveSummary);
console.log({
  activeCore: weapon.core.label,
  weaponDamage: weapon.damage,
  weaponCooldown: weapon.cooldown,
  weaponHeat: weapon.heatPerShot,
  moveSpeed: playerStats.moveSpeed,
  pickupRadius: playerStats.pickupRadius,
});

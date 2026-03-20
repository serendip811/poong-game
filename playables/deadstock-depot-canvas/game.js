(function (root, factory) {
  const api = factory();

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }

  root.DeadstockDepotCanvas = api;

  if (typeof document !== "undefined") {
    api.mountBrowserGame();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const WORLD_WIDTH = 960;
  const WORLD_HEIGHT = 540;
  const PLAYER_RADIUS = 13;
  const MAX_DAYS = 4;
  const DAY_EXIT_POINT = { x: 480, y: -36 };
  const INSIDE_ENTRY_POINT = { x: 480, y: 110 };
  const CHECKOUT_PROGRESS_MAX = 1.2;
  const CHECKOUT_FRONT_RADIUS = 10;
  const CHECKOUT_SETTLE_TIME = 0.34;

  const PRICE_TIERS = [
    { id: "low", label: "저가", delta: -1, patience: 3.5, trust: 0.35, greed: -0.05, heat: 0.1 },
    { id: "standard", label: "표준", delta: 0, patience: 0, trust: 0.06, greed: 0.05, heat: 0.35 },
    { id: "high", label: "고가", delta: 2, patience: -3.5, trust: -0.14, greed: 0.4, heat: 0.9 },
  ];

  const ITEM_DEFS = [
    { id: "canned", label: "통조림", color: "#d6a35f", basePrice: 4, demand: 1.2, delivery: [8, 9, 10, 11] },
    { id: "battery", label: "배터리", color: "#81bcc7", basePrice: 5, demand: 1.05, delivery: [6, 7, 8, 9] },
    { id: "medkit", label: "메디킷", color: "#d67b67", basePrice: 7, demand: 0.8, delivery: [4, 5, 6, 7] },
    { id: "tools", label: "고철도구", color: "#b7bf78", basePrice: 6, demand: 0.92, delivery: [5, 6, 7, 8] },
  ];

  const CRAFT_DEFS = [
    { id: "boards", hotkey: "1", label: "판자 묶음", cost: 4, amount: 2, stockKey: "boards" },
    { id: "ammo", hotkey: "2", label: "탄약 상자", cost: 5, amount: 8, stockKey: "ammo" },
    { id: "kits", hotkey: "3", label: "수리 키트", cost: 7, amount: 1, stockKey: "kits" },
  ];

  const DAY_CONFIG = [
    { dayTime: 65, spawnInterval: 6.8, maxCustomers: 5, nightTime: 46, raidBase: 6 },
    { dayTime: 68, spawnInterval: 6.1, maxCustomers: 6, nightTime: 49, raidBase: 8 },
    { dayTime: 72, spawnInterval: 5.5, maxCustomers: 7, nightTime: 53, raidBase: 11 },
    { dayTime: 75, spawnInterval: 5.1, maxCustomers: 7, nightTime: 57, raidBase: 14 },
  ];

  const ZOMBIE_DEFS = {
    walker: { id: "walker", label: "워커", radius: 10, speed: 42, health: 4.1, attack: 0.96, strike: 0.95, color: "#d96b57" },
    runner: { id: "runner", label: "러너", radius: 8, speed: 75, health: 2.5, attack: 0.72, strike: 0.72, color: "#f0b45c" },
  };

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function formatSeconds(value) {
    return `${Math.max(0, value).toFixed(1)}초`;
  }

  function formatSigned(value) {
    return value > 0 ? `+${value}` : `${value}`;
  }

  function withSubjectParticle(word) {
    const lastCode = word.charCodeAt(word.length - 1);
    if (lastCode < 0xac00 || lastCode > 0xd7a3) {
      return `${word}가`;
    }
    const hasBatchim = (lastCode - 0xac00) % 28 !== 0;
    return `${word}${hasBatchim ? "이" : "가"}`;
  }

  function distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.hypot(dx, dy);
  }

  function distanceToRect(point, rect) {
    const cx = clamp(point.x, rect.x, rect.x + rect.w);
    const cy = clamp(point.y, rect.y, rect.y + rect.h);
    return Math.hypot(point.x - cx, point.y - cy);
  }

  function circleRectOverlap(circle, rect) {
    const nearestX = clamp(circle.x, rect.x, rect.x + rect.w);
    const nearestY = clamp(circle.y, rect.y, rect.y + rect.h);
    const dx = circle.x - nearestX;
    const dy = circle.y - nearestY;
    return dx * dx + dy * dy < circle.radius * circle.radius;
  }

  function segmentIntersectsRect(x1, y1, x2, y2, rect, padding = 0) {
    const minX = rect.x - padding;
    const maxX = rect.x + rect.w + padding;
    const minY = rect.y - padding;
    const maxY = rect.y + rect.h + padding;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const p = [-dx, dx, -dy, dy];
    const q = [x1 - minX, maxX - x1, y1 - minY, maxY - y1];

    let t0 = 0;
    let t1 = 1;

    for (let index = 0; index < 4; index += 1) {
      if (p[index] === 0) {
        if (q[index] < 0) {
          return false;
        }
        continue;
      }

      const ratio = q[index] / p[index];
      if (p[index] < 0) {
        if (ratio > t1) {
          return false;
        }
        if (ratio > t0) {
          t0 = ratio;
        }
      } else {
        if (ratio < t0) {
          return false;
        }
        if (ratio < t1) {
          t1 = ratio;
        }
      }
    }

    return true;
  }

  function normalizeVector(dx, dy) {
    const length = Math.hypot(dx, dy);
    if (!length) {
      return { x: 0, y: 0 };
    }
    return { x: dx / length, y: dy / length };
  }

  function random(state) {
    state.rngSeed = (state.rngSeed * 1664525 + 1013904223) >>> 0;
    return state.rngSeed / 4294967296;
  }

  function randomRange(state, min, max) {
    return lerp(min, max, random(state));
  }

  function weightedPick(state, items, getWeight) {
    let total = 0;
    for (const item of items) {
      total += Math.max(0, getWeight(item));
    }

    if (total <= 0) {
      return items[0];
    }

    let roll = random(state) * total;

    for (const item of items) {
      roll -= Math.max(0, getWeight(item));
      if (roll <= 0) {
        return item;
      }
    }

    return items[items.length - 1];
  }

  function pointFromRect(rect) {
    return { x: rect.x + rect.w / 2, y: rect.y + rect.h / 2 };
  }

  function clonePoint(point) {
    return { x: point.x, y: point.y };
  }

  function compactRoute(points) {
    const route = [];
    for (const point of points) {
      if (!point) {
        continue;
      }
      const last = route[route.length - 1];
      if (!last || last.x !== point.x || last.y !== point.y) {
        route.push(clonePoint(point));
      }
    }
    return route;
  }

  function isQueueState(customer) {
    return customer.state === "to-queue" || customer.state === "queue" || customer.state === "checkout" || customer.state === "paying";
  }

  function getQueueStatePriority(customer) {
    if (customer.state === "paying") {
      return 0;
    }
    if (customer.state === "checkout") {
      return 1;
    }
    if (customer.state === "queue") {
      return 2;
    }
    return 3;
  }

  function getQueueSortDistance(state, customer) {
    return distance(customer, state.warehouse.counter.queueSpots[0]);
  }

  function getQueueCustomers(state) {
    return state.customers
      .filter((customer) => isQueueState(customer))
      .sort((a, b) => {
        const priorityGap = getQueueStatePriority(a) - getQueueStatePriority(b);
        if (priorityGap !== 0) {
          return priorityGap;
        }

        const distanceGap = getQueueSortDistance(state, a) - getQueueSortDistance(state, b);
        if (Math.abs(distanceGap) > 0.001) {
          return distanceGap;
        }

        return Number(a.id.slice(1)) - Number(b.id.slice(1));
      });
  }

  function getQueueSpot(state, index) {
    const spots = state.warehouse.counter.queueSpots;
    if (index < spots.length) {
      return spots[index];
    }

    const lastSpot = spots[spots.length - 1];
    const previousSpot = spots[spots.length - 2] || { x: lastSpot.x, y: lastSpot.y - 32 };
    const spacing = Math.max(28, lastSpot.y - previousSpot.y);
    return {
      x: lastSpot.x,
      y: lastSpot.y + spacing * (index - spots.length + 1),
    };
  }

  function isCustomerReadyForCheckout(state, customer) {
    if (!customer || customer.state === "to-queue" || customer.state === "paying") {
      return false;
    }
    return distance(customer, state.warehouse.counter.queueSpots[0]) <= CHECKOUT_FRONT_RADIUS;
  }

  function createWarehouse() {
    const shelfRects = [
      { x: 134, y: 160, w: 88, h: 48 },
      { x: 260, y: 160, w: 88, h: 48 },
      { x: 134, y: 298, w: 88, h: 48 },
      { x: 260, y: 298, w: 88, h: 48 },
    ];

    const shelves = ITEM_DEFS.map((item, index) => {
      const rect = shelfRects[index];
      return {
        id: item.id,
        itemId: item.id,
        label: item.label,
        rect,
        color: item.color,
        capacity: index < 2 ? 6 : 5,
        stock: 0,
        priceTier: 1,
        interact: { x: rect.x + rect.w / 2, y: rect.y + rect.h + 26 },
      };
    });

    const counter = {
      rect: { x: 382, y: 64, w: 196, h: 52 },
      interact: { x: 480, y: 142 },
      queueSpots: [
        { x: 480, y: 150 },
        { x: 480, y: 182 },
        { x: 480, y: 214 },
        { x: 480, y: 246 },
      ],
    };

    const storage = {
      rect: { x: 88, y: 422, w: 178, h: 78 },
      interact: { x: 278, y: 458 },
    };

    const workbench = {
      rect: { x: 420, y: 420, w: 128, h: 76 },
      interact: { x: 484, y: 406 },
    };

    const core = {
      rect: { x: 758, y: 406, w: 118, h: 82 },
      interact: { x: 746, y: 446 },
      anchor: { x: 816, y: 448 },
    };

    const entries = [
      {
        id: "front",
        label: "정문 셔터",
        type: "door",
        rect: { x: 412, y: 0, w: 136, h: 18 },
        interact: { x: 480, y: 34 },
        interior: { x: 480, y: 38 },
        exterior: { x: 480, y: -28 },
        maxHealth: 18,
        health: 18,
      },
      {
        id: "west-window",
        label: "서쪽 창문",
        type: "window",
        rect: { x: 94, y: 0, w: 108, h: 16 },
        interact: { x: 148, y: 34 },
        interior: { x: 148, y: 38 },
        exterior: { x: 148, y: -24 },
        maxHealth: 10,
        health: 10,
      },
      {
        id: "east-window",
        label: "동쪽 창문",
        type: "window",
        rect: { x: 760, y: 0, w: 108, h: 16 },
        interact: { x: 814, y: 34 },
        interior: { x: 814, y: 38 },
        exterior: { x: 814, y: -24 },
        maxHealth: 10,
        health: 10,
      },
      {
        id: "side-door",
        label: "측면 출입문",
        type: "door",
        rect: { x: WORLD_WIDTH - 18, y: 196, w: 18, h: 116 },
        interact: { x: WORLD_WIDTH - 38, y: 254 },
        interior: { x: WORLD_WIDTH - 36, y: 254 },
        exterior: { x: WORLD_WIDTH + 26, y: 254 },
        maxHealth: 14,
        health: 14,
      },
    ];

    return {
      shelves,
      counter,
      storage,
      workbench,
      core,
      entries,
      routes: {
        entryLane: clonePoint(INSIDE_ENTRY_POINT),
        shelfLaneX: 480,
        coreApproach: { x: 640, y: 388 },
      },
      obstacles: [
        ...shelves.map((shelf) => shelf.rect),
        counter.rect,
        storage.rect,
        workbench.rect,
        core.rect,
      ],
    };
  }

  function createGameState(options = {}) {
    const warehouse = createWarehouse();
    const state = {
      rngSeed: (options.seed == null ? 1729 : options.seed) >>> 0,
      warehouse,
      maxDays: MAX_DAYS,
      phase: "day",
      day: 1,
      timer: DAY_CONFIG[0].dayTime,
      coins: 18,
      trust: 0,
      greed: 0,
      boards: 4,
      ammo: 14,
      kits: 1,
      coreHealth: 12,
      maxCoreHealth: 12,
      storage: {},
      customers: [],
      zombies: [],
      bullets: [],
      particles: [],
      logs: [],
      elapsedTime: 0,
      screenShake: 0,
      screenFlash: 0,
      screenFlashColor: "#f0b45c",
      result: null,
      customerSpawnTimer: 0,
      nextCustomerId: 1,
      nextZombieId: 1,
      shootHeld: false,
      interaction: "창고를 열기 전에 선반부터 채운다.",
      objective: "선반을 채우고 손님을 받아라.",
      summary: "창고 문을 열 준비를 한다.",
      dayClosing: false,
      dayMetrics: {
        served: 0,
        lost: 0,
        stockouts: 0,
        queueWalkouts: 0,
        coins: 0,
        priceHeat: 0,
      },
      nightPressure: 0,
      raid: null,
      player: {
        x: 480,
        y: 332,
        radius: PLAYER_RADIUS,
        speed: 188,
        facingX: 0,
        facingY: -1,
        shootCooldown: 0,
        shoveCooldown: 0,
        checkoutProgress: 0,
        muzzleFlash: 0,
      },
    };

    initializeDay(state, 1, true);
    return state;
  }

  function pushLog(state, message) {
    state.logs.push(message);
    if (state.logs.length > 14) {
      state.logs.shift();
    }
  }

  function setRoute(entity, points) {
    entity.route = compactRoute(points);
  }

  function clearRoute(entity) {
    entity.route = [];
  }

  function moveAlongRoute(entity, dt, fallbackTarget) {
    let remaining = entity.speed * dt;

    while (remaining > 0) {
      const target = entity.route && entity.route.length ? entity.route[0] : fallbackTarget;
      if (!target) {
        break;
      }

      const d = distance(entity, target);
      if (d <= Math.max(1, remaining)) {
        entity.x = target.x;
        entity.y = target.y;
        remaining -= d;
        if (entity.route && entity.route.length) {
          entity.route.shift();
          continue;
        }
        break;
      }

      const direction = normalizeVector(target.x - entity.x, target.y - entity.y);
      entity.x += direction.x * remaining;
      entity.y += direction.y * remaining;
      break;
    }
  }

  function buildRouteToShelf(state, shelf) {
    const lane = { x: state.warehouse.routes.shelfLaneX, y: shelf.interact.y };
    return compactRoute([state.warehouse.routes.entryLane, lane, shelf.interact]);
  }

  function buildRouteToQueue(state, shelf, queueSpot) {
    const lane = { x: state.warehouse.routes.shelfLaneX, y: shelf.interact.y };
    return compactRoute([lane]);
  }

  function buildRouteToExit(state) {
    return compactRoute([state.warehouse.routes.entryLane, DAY_EXIT_POINT]);
  }

  function buildRouteToCore(state, entryId) {
    const entry = getEntryById(state, entryId);
    if (!entry) {
      return compactRoute([state.warehouse.routes.coreApproach, state.warehouse.core.anchor]);
    }

    if (entry.id === "front") {
      return compactRoute([
        entry.interior,
        { x: 480, y: 168 },
        { x: 640, y: 168 },
        state.warehouse.routes.coreApproach,
        state.warehouse.core.anchor,
      ]);
    }

    if (entry.id === "west-window") {
      return compactRoute([
        entry.interior,
        { x: 148, y: 118 },
        { x: 148, y: 388 },
        state.warehouse.routes.coreApproach,
        state.warehouse.core.anchor,
      ]);
    }

    if (entry.id === "east-window" || entry.id === "side-door") {
      return compactRoute([
        entry.interior,
        { x: 814, y: entry.id === "side-door" ? 254 : 118 },
        { x: 814, y: 388 },
        state.warehouse.routes.coreApproach,
        state.warehouse.core.anchor,
      ]);
    }

    return compactRoute([entry.interior, state.warehouse.routes.coreApproach, state.warehouse.core.anchor]);
  }

  function createDayDelivery(day) {
    const storage = {};
    ITEM_DEFS.forEach((item) => {
      storage[item.id] = item.delivery[Math.min(day - 1, item.delivery.length - 1)];
    });
    return storage;
  }

  function getShelfById(state, shelfId) {
    return state.warehouse.shelves.find((shelf) => shelf.id === shelfId);
  }

  function getItemDef(itemId) {
    return ITEM_DEFS.find((item) => item.id === itemId);
  }

  function getEntryById(state, entryId) {
    return state.warehouse.entries.find((entry) => entry.id === entryId);
  }

  function getShelfPrice(shelf) {
    const item = getItemDef(shelf.itemId);
    const tier = PRICE_TIERS[shelf.priceTier];
    return item.basePrice + tier.delta;
  }

  function initializeDay(state, day, freshRun) {
    const config = DAY_CONFIG[Math.min(day - 1, DAY_CONFIG.length - 1)];

    state.phase = "day";
    state.day = day;
    state.timer = config.dayTime;
    state.dayClosing = false;
    state.customerSpawnTimer = 3.2;
    state.customers = [];
    state.zombies = [];
    state.bullets = [];
    state.particles = [];
    state.raid = null;
    state.nightPressure = 0;
    state.dayMetrics = {
      served: 0,
      lost: 0,
      stockouts: 0,
      queueWalkouts: 0,
      coins: 0,
      priceHeat: 0,
    };
    state.player.x = 480;
    state.player.y = 332;
    state.player.shootCooldown = 0;
    state.player.shoveCooldown = 0;
    state.player.checkoutProgress = 0;

    if (freshRun) {
      state.coins = 18;
      state.boards = 5;
      state.ammo = 18;
      state.kits = 2;
      state.trust = 0;
      state.greed = 0;
      state.coreHealth = state.maxCoreHealth;
      state.warehouse.entries.forEach((entry) => {
        entry.health = entry.maxHealth;
      });
      state.warehouse.shelves.forEach((shelf) => {
        shelf.priceTier = 1;
        shelf.stock = 0;
      });
      state.storage = createDayDelivery(day);
    } else {
      const delivery = createDayDelivery(day);
      ITEM_DEFS.forEach((item) => {
        state.storage[item.id] = (state.storage[item.id] || 0) + delivery[item.id];
      });
      state.boards += 1;
      state.ammo += 4;
      state.warehouse.entries.forEach((entry) => {
        entry.health = entry.health <= 0 ? Math.ceil(entry.maxHealth * 0.4) : Math.min(entry.maxHealth, entry.health + 2);
      });
      state.coreHealth = Math.min(state.maxCoreHealth, state.coreHealth + 1);
      state.coins += 4 + day;
    }

    state.warehouse.shelves.forEach((shelf) => {
      restockShelf(state, shelf.id, 2);
    });

    state.objective = "선반을 채우고 계산대 줄을 비운다.";
    state.interaction = "선반 근처에서 E로 재고를 채우고 R로 가격을 바꾼다.";
    state.summary = "오늘 밤 압박을 낮추려면 빈 선반부터 막는다.";

    pushLog(state, `> 셔터를 올렸다. ${day}일차 영업을 시작한다.`);
  }

  function beginNight(state) {
    const config = DAY_CONFIG[Math.min(state.day - 1, DAY_CONFIG.length - 1)];
    const metrics = state.dayMetrics;
    const pressure =
      metrics.stockouts * 1.25 +
      metrics.queueWalkouts * 1.4 +
      metrics.lost * 0.75 +
      metrics.priceHeat * 0.45 +
      state.greed * 0.22 +
      state.day * 0.3;

    state.phase = "night";
    state.dayClosing = false;
    state.timer = config.nightTime;
    state.customers = [];
    state.bullets = [];
    state.particles = [];
    state.player.x = 480;
    state.player.y = 330;
    state.player.checkoutProgress = 0;
    state.player.shootCooldown = 0;
    state.player.shoveCooldown = 0;
    state.nightPressure = Number(pressure.toFixed(1));
    state.raid = {
      remaining: config.raidBase + Math.round(pressure * 1.35),
      spawnTimer: 1.1,
      runnerChance: clamp(0.14 + state.day * 0.04 + pressure * 0.015, 0.14, 0.48),
      total: config.raidBase + Math.round(pressure * 1.35),
      dawnClosed: false,
    };

    state.objective = "가장 약한 진입점부터 막고 코어를 지킨다.";
    state.interaction = "R로 진입점을 보강하고, 작업대에서 1 2 3으로 자원을 만든다.";
    state.summary = `습격 ${state.raid.total}체 예상 · 압박 ${state.nightPressure}`;

    pushLog(state, `> 해가 졌다. 오늘 밤 압박 ${state.nightPressure}가 창고로 몰려온다.`);
  }

  function endRun(state, success) {
    state.phase = "result";
    state.result = {
      success,
      day: state.day,
      coins: state.coins,
      served: state.dayMetrics.served,
      coreHealth: state.coreHealth,
      trust: state.trust,
      greed: state.greed,
    };
    pushLog(state, success ? "> 새벽을 버텼다. 창고를 지켜냈다." : "> 코어가 무너졌다. 창고를 잃었다.");
  }

  function advanceAfterNight(state) {
    if (state.day >= state.maxDays) {
      endRun(state, true);
      return;
    }
    initializeDay(state, state.day + 1, false);
  }

  function addParticle(state, particle) {
    state.particles.push({
      id: `p${Date.now()}-${Math.random()}`,
      x: particle.x,
      y: particle.y,
      life: particle.life,
      maxLife: particle.life,
      vx: particle.vx || 0,
      vy: particle.vy || 0,
      label: particle.label || "",
      color: particle.color || "#f0e5cf",
      radius: particle.radius || 2,
      growth: particle.growth || 0,
      lineWidth: particle.lineWidth || 2,
      shape: particle.shape || (particle.label ? "text" : "dot"),
    });
  }

  function pushScreenFeedback(state, flashColor, flashStrength, shakeStrength) {
    state.screenFlash = Math.max(state.screenFlash, flashStrength || 0);
    state.screenShake = Math.max(state.screenShake, shakeStrength || 0);
    if (flashColor) {
      state.screenFlashColor = flashColor;
    }
  }

  function restockShelf(state, shelfId, amount) {
    const shelf = getShelfById(state, shelfId);
    if (!shelf) {
      return false;
    }

    const available = state.storage[shelf.itemId] || 0;
    const needed = shelf.capacity - shelf.stock;
    const moved = Math.min(amount, available, needed);

    if (moved <= 0) {
      return false;
    }

    shelf.stock += moved;
    state.storage[shelf.itemId] -= moved;
    return moved;
  }

  function findNearestShelf(state, maxDistance) {
    let nearest = null;
    let nearestDistance = maxDistance;
    for (const shelf of state.warehouse.shelves) {
      const d = distance(state.player, shelf.interact);
      if (d < nearestDistance) {
        nearest = shelf;
        nearestDistance = d;
      }
    }
    return nearest;
  }

  function findNearestEntry(state, maxDistance) {
    let nearest = null;
    let nearestDistance = maxDistance;
    for (const entry of state.warehouse.entries) {
      const d = distance(state.player, entry.interact);
      if (d < nearestDistance) {
        nearest = entry;
        nearestDistance = d;
      }
    }
    return nearest;
  }

  function isNearWorkbench(state) {
    return distance(state.player, state.warehouse.workbench.interact) < 62;
  }

  function isNearCounter(state) {
    return distance(state.player, state.warehouse.counter.interact) < 54;
  }

  function isNearCore(state) {
    return distance(state.player, state.warehouse.core.interact) < 64;
  }

  function cycleNearestShelfPrice(state) {
    const shelf = findNearestShelf(state, 64);
    if (!shelf || state.phase !== "day") {
      return false;
    }

    shelf.priceTier = (shelf.priceTier + 1) % PRICE_TIERS.length;
    const tier = PRICE_TIERS[shelf.priceTier];
    state.dayMetrics.priceHeat += tier.heat * 0.18;
    pushLog(state, `> ${shelf.label} 가격을 ${tier.label}로 바꿨다.`);
    return true;
  }

  function attemptContextAction(state) {
    if (state.phase === "day") {
      const shelf = findNearestShelf(state, 64);
      if (shelf) {
        const moved = restockShelf(state, shelf.id, 2);
        if (moved) {
          addParticle(state, { x: shelf.interact.x, y: shelf.interact.y - 16, label: `+${moved}`, color: "#83b28a", life: 0.7 });
          pushLog(state, `> ${shelf.label} 선반을 ${moved}칸 채웠다.`);
        } else {
          pushLog(state, `> ${shelf.label}은 더 채울 재고가 없다.`);
        }
        return moved;
      }

      if (isNearWorkbench(state)) {
        pushLog(state, "> 작업대: 1 판자 · 2 탄약 · 3 수리 키트 제작.");
        return true;
      }
    }

    if (state.phase === "night" && isNearWorkbench(state)) {
      pushLog(state, "> 야간 작업대: 코인으로 바로 제작할 수 있다.");
      return true;
    }

    return false;
  }

  function attemptRepair(state) {
    const entry = findNearestEntry(state, 58);
    if (entry && entry.health < entry.maxHealth) {
      if (state.boards > 0) {
        state.boards -= 1;
        entry.health = Math.min(entry.maxHealth, entry.health + 5.2);
        addParticle(state, { x: entry.interact.x, y: entry.interact.y - 18, label: "+보강", color: "#f0e5cf", life: 0.65 });
        pushLog(state, `> ${entry.label}을 판자로 보강했다.`);
        return true;
      }

      if (state.kits > 0) {
        state.kits -= 1;
        entry.health = Math.min(entry.maxHealth, entry.health + 7.5);
        addParticle(state, { x: entry.interact.x, y: entry.interact.y - 18, label: "+수리", color: "#83b28a", life: 0.65 });
        pushLog(state, `> ${entry.label}을 수리 키트로 복구했다.`);
        return true;
      }

      pushLog(state, "> 판자도 수리 키트도 남지 않았다.");
      return false;
    }

    if (isNearCore(state) && state.kits > 0 && state.coreHealth < state.maxCoreHealth) {
      state.kits -= 1;
      state.coreHealth = Math.min(state.maxCoreHealth, state.coreHealth + 4);
      addParticle(state, { x: state.warehouse.core.anchor.x, y: state.warehouse.core.anchor.y - 18, label: "+코어", color: "#83b28a", life: 0.7 });
      pushLog(state, "> 코어 안정기에 수리 키트를 사용했다.");
      return true;
    }

    return false;
  }

  function attemptCraft(state, craftId) {
    const recipe = CRAFT_DEFS.find((item) => item.id === craftId);
    if (!recipe) {
      return false;
    }

    if (!isNearWorkbench(state)) {
      pushLog(state, "> 작업대 가까이에서만 제작할 수 있다.");
      return false;
    }

    if (state.coins < recipe.cost) {
      pushLog(state, `> 코인이 부족하다. ${recipe.label} 제작에 ${recipe.cost}코인 필요.`);
      return false;
    }

    state.coins -= recipe.cost;
    state[recipe.stockKey] += recipe.amount;
    addParticle(state, { x: state.warehouse.workbench.interact.x, y: state.warehouse.workbench.interact.y - 20, label: `+${recipe.amount}`, color: "#c39b5f", life: 0.7 });
    pushLog(state, `> 작업대에서 ${recipe.label} ${recipe.amount}${recipe.stockKey === "kits" ? "개" : ""}를 만들었다.`);
    return true;
  }

  function createCustomer(state) {
    const shelves = state.warehouse.shelves;
    const shelf = weightedPick(state, shelves, (candidate) => {
      const item = getItemDef(candidate.itemId);
      const tier = PRICE_TIERS[candidate.priceTier];
      return item.demand * (candidate.stock > 0 ? 1.1 : 0.92) * (tier.id === "high" ? 0.9 : 1);
    });

    const patienceBase = randomRange(state, 16, 22);
    const patience = patienceBase + PRICE_TIERS[shelf.priceTier].patience;

    return {
      id: `c${state.nextCustomerId++}`,
      x: 480,
      y: -18,
      radius: 9,
      speed: randomRange(state, 58, 74),
      desire: shelf.itemId,
      shelfId: shelf.id,
      patience,
      maxPatience: patience,
      shoppingTimer: randomRange(state, 0.7, 1.3),
      checkoutProgress: 0,
      queueIndex: 0,
      state: "entering",
      mood: "neutral",
      carried: false,
      saleValue: 0,
      priceTier: shelf.priceTier,
      tint: random(state) > 0.5 ? "#cabd9f" : "#b5c7ce",
      route: compactRoute([state.warehouse.routes.entryLane]),
      animPhase: randomRange(state, 0, Math.PI * 2),
      bobAmount: randomRange(state, 0.9, 1.35),
      flashTimer: 0,
      checkoutGlow: 0,
      payTimer: 0,
    };
  }

  function completeSale(state, customer) {
    state.coins += customer.saleValue;
    state.dayMetrics.served += 1;
    state.dayMetrics.coins += customer.saleValue;

    const tier = PRICE_TIERS[customer.priceTier];
    state.trust = clamp(state.trust + tier.trust, 0, 20);
    state.greed = clamp(state.greed + tier.greed, 0, 20);

    customer.state = "paying";
    customer.x = state.warehouse.counter.queueSpots[0].x;
    customer.y = state.warehouse.counter.queueSpots[0].y;
    customer.payTimer = CHECKOUT_SETTLE_TIME;
    customer.checkoutProgress = 0;
    customer.checkoutGlow = 1.15;
    customer.flashTimer = 0.28;
    customer.carried = false;
    clearRoute(customer);
    addParticle(state, { x: state.warehouse.counter.interact.x, y: state.warehouse.counter.interact.y - 20, label: `+${customer.saleValue}c`, color: "#c39b5f", life: 0.78 });
    addParticle(state, {
      x: state.warehouse.counter.interact.x,
      y: state.warehouse.counter.interact.y - 2,
      radius: 10,
      growth: 62,
      color: "#f0b45c",
      life: 0.22,
      lineWidth: 3,
      shape: "ring",
    });
    addParticle(state, { x: customer.x + 10, y: customer.y - 18, radius: 4, growth: 18, color: "#f0b45c", life: 0.3 });
    addParticle(state, { x: customer.x - 6, y: customer.y - 12, radius: 3, growth: 12, color: "#f0e5cf", life: 0.26 });
    pushScreenFeedback(state, "#f0b45c", 0.08, 2.2);
    pushLog(state, `> 판매 완료: ${getItemDef(customer.desire).label} ${customer.saleValue}코인.`);
  }

  function upsetCustomer(state, customer, reason) {
    customer.state = "leaving";
    customer.mood = "angry";
    customer.target = DAY_EXIT_POINT;
    customer.carried = false;
    setRoute(customer, buildRouteToExit(state));
    state.dayMetrics.lost += 1;

    if (reason === "stockout") {
      state.dayMetrics.stockouts += 1;
      pushLog(state, `> ${getItemDef(customer.desire).label} 재고가 비어 손님이 돌아섰다.`);
    } else if (reason === "queue") {
      state.dayMetrics.queueWalkouts += 1;
      pushLog(state, "> 계산대 줄이 길어 손님이 등을 돌렸다.");
    } else {
      pushLog(state, "> 손님이 불만을 남기고 나갔다.");
    }

    addParticle(state, { x: customer.x, y: customer.y - 16, label: "!", color: "#d96b57", life: 0.8 });
    customer.flashTimer = 0.26;
  }

  function updateCustomers(state, dt) {
    const config = DAY_CONFIG[Math.min(state.day - 1, DAY_CONFIG.length - 1)];
    const queue = getQueueCustomers(state);

    queue.forEach((customer, index) => {
      customer.queueIndex = index;
    });

    const frontCustomer = queue[0] || null;
    const frontReady = isCustomerReadyForCheckout(state, frontCustomer);

    if (frontReady && isNearCounter(state)) {
      frontCustomer.state = "checkout";
      frontCustomer.checkoutProgress += dt * 1.2;
      frontCustomer.checkoutGlow = 1;
      state.player.checkoutProgress = clamp(frontCustomer.checkoutProgress / CHECKOUT_PROGRESS_MAX, 0, 1);
      if (frontCustomer.checkoutProgress >= CHECKOUT_PROGRESS_MAX) {
        completeSale(state, frontCustomer);
      }
    } else {
      state.player.checkoutProgress = 0;
      if (frontCustomer && frontCustomer.state === "checkout" && !frontReady) {
        frontCustomer.state = "queue";
        frontCustomer.checkoutProgress = 0;
      }
    }

    const survivors = [];

    for (const customer of state.customers) {
      const moving =
        customer.state === "entering" ||
        customer.state === "to-shelf" ||
        customer.state === "to-queue" ||
        customer.state === "leaving";
      customer.animPhase += dt * (moving ? 8.4 : 4.6);
      customer.flashTimer = Math.max(0, customer.flashTimer - dt);
      customer.checkoutGlow = Math.max(0, customer.checkoutGlow - dt * 1.9);
      customer.patience -= dt * (customer.state === "queue" || customer.state === "checkout" || customer.state === "paying" ? 0.55 : 0.2);
      const shelf = getShelfById(state, customer.shelfId);
      const queueSpot = getQueueSpot(state, customer.queueIndex);

      switch (customer.state) {
        case "entering": {
          moveAlongRoute(customer, dt, state.warehouse.routes.entryLane);
          if (distance(customer, INSIDE_ENTRY_POINT) < 8) {
            customer.state = "to-shelf";
            setRoute(customer, buildRouteToShelf(state, shelf));
          }
          break;
        }

        case "to-shelf": {
          moveAlongRoute(customer, dt, shelf.interact);
          if (distance(customer, shelf.interact) < 9) {
            if (shelf.stock > 0) {
              customer.state = "shopping";
              clearRoute(customer);
            } else {
              customer.state = "waiting-stock";
              clearRoute(customer);
            }
          }
          break;
        }

        case "waiting-stock": {
          if (shelf.stock > 0) {
            customer.state = "shopping";
            clearRoute(customer);
          } else if (customer.patience <= 0) {
            upsetCustomer(state, customer, "stockout");
          }
          break;
        }

        case "shopping": {
          customer.shoppingTimer -= dt;
          if (customer.shoppingTimer <= 0) {
            if (shelf.stock > 0) {
              shelf.stock -= 1;
              customer.carried = true;
              customer.saleValue = getShelfPrice(shelf);
              customer.priceTier = shelf.priceTier;
              customer.state = "to-queue";
              customer.patience += 4;
              customer.flashTimer = 0.12;
              setRoute(customer, buildRouteToQueue(state, shelf, queueSpot));
            } else {
              customer.state = "waiting-stock";
            }
          }
          break;
        }

        case "to-queue":
        case "queue":
        case "checkout": {
          moveAlongRoute(customer, dt, queueSpot);
          if (customer.state === "to-queue" && distance(customer, queueSpot) < 8) {
            customer.state = "queue";
            customer.checkoutProgress = 0;
            customer.checkoutGlow = 0.16;
          }
          if (customer.patience <= 0) {
            upsetCustomer(state, customer, "queue");
          }
          break;
        }

        case "paying": {
          customer.x = lerp(customer.x, state.warehouse.counter.queueSpots[0].x, dt * 14);
          customer.y = lerp(customer.y, state.warehouse.counter.queueSpots[0].y, dt * 14);
          customer.payTimer -= dt;
          if (customer.payTimer <= 0) {
            customer.state = "leaving";
            customer.target = DAY_EXIT_POINT;
            customer.carried = false;
            setRoute(customer, buildRouteToExit(state));
          }
          break;
        }

        case "leaving": {
          moveAlongRoute(customer, dt, customer.target || DAY_EXIT_POINT);
          if (distance(customer, customer.target || DAY_EXIT_POINT) < 18) {
            continue;
          }
          break;
        }

        default:
          break;
      }

      if (customer.state !== "leaving" || customer.y > -28) {
        survivors.push(customer);
      }
    }

    state.customers = survivors;

    state.customerSpawnTimer -= dt;
    const activeCustomers = state.customers.filter((customer) => customer.state !== "leaving").length;
    if (!state.dayClosing && state.timer > 4 && state.customerSpawnTimer <= 0 && activeCustomers < config.maxCustomers) {
      state.customers.push(createCustomer(state));
      state.customerSpawnTimer = randomRange(state, config.spawnInterval * 0.82, config.spawnInterval * 1.16);
    }
  }

  function chooseEntryTarget(state) {
    return weightedPick(state, state.warehouse.entries, (entry) => 1 + (entry.maxHealth - entry.health) * 0.2);
  }

  function spawnZombie(state) {
    const targetEntry = chooseEntryTarget(state);
    const type = random(state) < state.raid.runnerChance ? ZOMBIE_DEFS.runner : ZOMBIE_DEFS.walker;
    const spawn = {
      x: targetEntry.exterior.x + randomRange(state, -12, 12),
      y: targetEntry.exterior.y + randomRange(state, -12, 12),
    };

    state.zombies.push({
      id: `z${state.nextZombieId++}`,
      kind: type.id,
      x: spawn.x,
      y: spawn.y,
      radius: type.radius,
      speed: type.speed + state.day * (type.id === "runner" ? 3 : 2),
      health: type.health + state.day * (type.id === "runner" ? 0.35 : 0.55),
      maxHealth: type.health + state.day * (type.id === "runner" ? 0.35 : 0.55),
      attack: type.attack + state.day * 0.08,
      strikeCooldown: 0,
      color: type.color,
      targetEntryId: targetEntry.id,
      targetMode: "entry",
      pushX: 0,
      pushY: 0,
      route: [],
      animPhase: randomRange(state, 0, Math.PI * 2),
      bobAmount: randomRange(state, 0.9, 1.4),
      hitFlash: 0,
      attackFlash: 0,
    });
  }

  function attackEntry(state, zombie, entry, dt) {
    zombie.strikeCooldown -= dt;
    if (zombie.strikeCooldown <= 0) {
      zombie.strikeCooldown = zombie.kind === "runner" ? 0.72 : 0.95;
      entry.health = Math.max(0, entry.health - zombie.attack);
      addParticle(state, { x: entry.interact.x, y: entry.interact.y + 2, label: "-1", color: "#d96b57", life: 0.42 });
      addParticle(state, { x: entry.interact.x, y: entry.interact.y + 4, radius: 8, growth: 28, color: "#d96b57", life: 0.18, lineWidth: 2, shape: "ring" });
      zombie.attackFlash = 0.18;
      pushScreenFeedback(state, "#d96b57", 0.05, 1.4);
      if (entry.health <= 0) {
        pushLog(state, `> ${withSubjectParticle(entry.label)} 열렸다.`);
      }
    }
  }

  function attackCore(state, zombie, dt) {
    if (state.phase === "result") {
      return;
    }
    zombie.strikeCooldown -= dt;
    if (zombie.strikeCooldown <= 0) {
      zombie.strikeCooldown = zombie.kind === "runner" ? 0.68 : 0.92;
      state.coreHealth = Math.max(0, state.coreHealth - zombie.attack * 0.9);
      addParticle(state, { x: state.warehouse.core.anchor.x, y: state.warehouse.core.anchor.y - 8, label: "-코어", color: "#d96b57", life: 0.46 });
      addParticle(state, { x: state.warehouse.core.anchor.x, y: state.warehouse.core.anchor.y - 6, radius: 10, growth: 36, color: "#d96b57", life: 0.22, lineWidth: 3, shape: "ring" });
      zombie.attackFlash = 0.24;
      pushScreenFeedback(state, "#d96b57", 0.12, 4.2);
      if (state.coreHealth <= 0) {
        endRun(state, false);
      }
    }
  }

  function updateZombies(state, dt) {
    const remaining = [];

    for (const zombie of state.zombies) {
      if (state.phase === "result") {
        break;
      }
      zombie.animPhase += dt * (zombie.kind === "runner" ? 11.4 : 7.6);
      zombie.hitFlash = Math.max(0, zombie.hitFlash - dt);
      zombie.attackFlash = Math.max(0, zombie.attackFlash - dt);
      if (zombie.health <= 0) {
        addParticle(state, { x: zombie.x, y: zombie.y - 10, label: "DOWN", color: "#f0b45c", life: 0.6 });
        addParticle(state, { x: zombie.x, y: zombie.y, radius: 11, growth: 34, color: "#f0b45c", life: 0.26, lineWidth: 3, shape: "ring" });
        continue;
      }

      const pushStrength = Math.hypot(zombie.pushX, zombie.pushY);
      if (pushStrength > 0.5) {
        zombie.x += zombie.pushX * dt;
        zombie.y += zombie.pushY * dt;
        zombie.pushX = lerp(zombie.pushX, 0, dt * 8);
        zombie.pushY = lerp(zombie.pushY, 0, dt * 8);
      }

      const entry = getEntryById(state, zombie.targetEntryId);

      if (entry && entry.health > 0) {
        zombie.targetMode = "entry";
        clearRoute(zombie);
        const target = entry.exterior;
        moveTowardPoint(zombie, target, dt);
        if (distance(zombie, target) < zombie.radius + 10) {
          attackEntry(state, zombie, entry, dt);
        }
      } else {
        if (zombie.targetMode !== "core") {
          zombie.targetMode = "core";
          setRoute(zombie, buildRouteToCore(state, zombie.targetEntryId));
        }
        moveAlongRoute(zombie, dt, state.warehouse.core.anchor);
        if (distance(zombie, state.warehouse.core.anchor) < zombie.radius + 20) {
          attackCore(state, zombie, dt);
        }
      }

      remaining.push(zombie);
    }

    state.zombies = remaining;
  }

  function attemptShoot(state, aimX, aimY) {
    if (state.phase !== "night") {
      return false;
    }
    if (state.player.shootCooldown > 0 || state.ammo <= 0) {
      return false;
    }

    const direction = normalizeVector(aimX - state.player.x, aimY - state.player.y);
    if (!direction.x && !direction.y) {
      return false;
    }

    state.ammo -= 1;
    state.player.shootCooldown = 0.18;
    state.player.muzzleFlash = 0.12;
    state.bullets.push({
      x: state.player.x + direction.x * 18,
      y: state.player.y + direction.y * 18,
      vx: direction.x * 430,
      vy: direction.y * 430,
      radius: 3,
      damage: 1.75 + state.day * 0.15,
      life: 1.05,
    });
    addParticle(state, { x: state.player.x + direction.x * 16, y: state.player.y + direction.y * 16, label: "", color: "#f0e5cf", radius: 4, life: 0.18 });
    return true;
  }

  function attemptShove(state) {
    if (state.phase !== "night" || state.player.shoveCooldown > 0) {
      return false;
    }

    state.player.shoveCooldown = 1.0;
    let hit = false;
    for (const zombie of state.zombies) {
      const d = distance(state.player, zombie);
      if (d < 56) {
        const push = normalizeVector(zombie.x - state.player.x, zombie.y - state.player.y);
        zombie.pushX += push.x * 180;
        zombie.pushY += push.y * 180;
        zombie.health -= 0.85;
        zombie.hitFlash = Math.max(zombie.hitFlash, 0.16);
        zombie.attackFlash = Math.max(zombie.attackFlash, 0.12);
        addParticle(state, { x: zombie.x, y: zombie.y - 10, label: "밀침", color: "#81bcc7", life: 0.5 });
        hit = true;
      }
    }
    if (hit) {
      addParticle(state, { x: state.player.x, y: state.player.y, radius: 16, growth: 52, color: "#81bcc7", life: 0.18, lineWidth: 3, shape: "ring" });
      pushScreenFeedback(state, "#81bcc7", 0.05, 1.8);
      pushLog(state, "> 창고 안으로 파고든 적을 밀어냈다.");
    }
    return hit;
  }

  function updateBullets(state, dt) {
    const nextBullets = [];
    for (const bullet of state.bullets) {
      bullet.life -= dt;
      const previousX = bullet.x;
      const previousY = bullet.y;
      bullet.x += bullet.vx * dt;
      bullet.y += bullet.vy * dt;

      let collided = false;
      for (const entry of state.warehouse.entries) {
        if (entry.health > 0 && segmentIntersectsRect(previousX, previousY, bullet.x, bullet.y, entry.rect, bullet.radius)) {
          addParticle(state, { x: bullet.x, y: bullet.y, radius: 6, growth: 18, color: "#c39b5f", life: 0.14, lineWidth: 2, shape: "ring" });
          collided = true;
          break;
        }
      }

      for (const zombie of state.zombies) {
        if (collided) {
          break;
        }

        if (distance(bullet, zombie) < bullet.radius + zombie.radius) {
          zombie.health -= bullet.damage;
          zombie.pushX += bullet.vx * 0.05;
          zombie.pushY += bullet.vy * 0.05;
          zombie.hitFlash = Math.max(zombie.hitFlash, 0.18);
          addParticle(state, { x: zombie.x, y: zombie.y - 10, label: formatSigned(-Math.ceil(bullet.damage)), color: "#f0b45c", life: 0.46 });
          addParticle(state, { x: zombie.x, y: zombie.y, radius: zombie.radius + 2, growth: 20, color: "#f0e5cf", life: 0.16, lineWidth: 2, shape: "ring" });
          collided = true;
          break;
        }
      }

      if (
        !collided &&
        bullet.life > 0 &&
        bullet.x >= -32 &&
        bullet.x <= WORLD_WIDTH + 32 &&
        bullet.y >= -32 &&
        bullet.y <= WORLD_HEIGHT + 32
      ) {
        nextBullets.push(bullet);
      }
    }
    state.bullets = nextBullets;
  }

  function updateParticles(state, dt) {
    state.particles = state.particles.filter((particle) => {
      particle.life -= dt;
      particle.x += particle.vx * dt;
      particle.y += particle.vy * dt;
      particle.radius += particle.growth * dt;
      return particle.life > 0;
    });
  }

  function moveTowardPoint(entity, target, dt) {
    const direction = normalizeVector(target.x - entity.x, target.y - entity.y);
    entity.x += direction.x * entity.speed * dt;
    entity.y += direction.y * entity.speed * dt;
  }

  function resolveCircleRect(circle, rect) {
    const nearestX = clamp(circle.x, rect.x, rect.x + rect.w);
    const nearestY = clamp(circle.y, rect.y, rect.y + rect.h);
    const dx = circle.x - nearestX;
    const dy = circle.y - nearestY;
    const distanceSq = dx * dx + dy * dy;
    if (distanceSq >= circle.radius * circle.radius) {
      return;
    }

    const distanceValue = Math.sqrt(distanceSq) || 0.0001;
    const overlap = circle.radius - distanceValue;
    circle.x += (dx / distanceValue) * overlap;
    circle.y += (dy / distanceValue) * overlap;
  }

  function movePlayer(state, moveX, moveY, dt) {
    const player = state.player;
    const magnitude = Math.hypot(moveX, moveY);
    const speed = state.phase === "night" ? 194 : 182;

    if (magnitude > 0) {
      moveX /= magnitude;
      moveY /= magnitude;
      player.facingX = moveX;
      player.facingY = moveY;
    }

    player.x += moveX * speed * dt;
    player.x = clamp(player.x, player.radius, WORLD_WIDTH - player.radius);
    for (const obstacle of state.warehouse.obstacles) {
      resolveCircleRect(player, obstacle);
    }

    player.y += moveY * speed * dt;
    player.y = clamp(player.y, player.radius, WORLD_HEIGHT - player.radius);
    for (const obstacle of state.warehouse.obstacles) {
      resolveCircleRect(player, obstacle);
    }
  }

  function describeInteraction(state) {
    if (state.phase === "day") {
      if (state.dayClosing) {
        return "마감 중이다. 남은 손님과 빈 줄부터 정리한다.";
      }

      const shelf = findNearestShelf(state, 64);
      if (shelf) {
        const tier = PRICE_TIERS[shelf.priceTier];
        return `${shelf.label}: E 보충 · R 가격 ${tier.label} · 재고 ${shelf.stock}/${shelf.capacity}`;
      }

      if (isNearCounter(state)) {
        return state.customers.some((customer) => isQueueState(customer))
          ? "맨 앞 손님이 계산대에 닿으면 결제가 진행된다."
          : "지금은 계산대 줄이 비어 있다.";
      }
    }

    if (isNearWorkbench(state)) {
      return "작업대: 1 판자 · 2 탄약 · 3 수리 키트 제작";
    }

    const entry = findNearestEntry(state, 58);
    if (entry && entry.health < entry.maxHealth) {
      return `${entry.label}: R 보강 ${entry.health.toFixed(1)} / ${entry.maxHealth}`;
    }

    if (isNearCore(state) && state.coreHealth < state.maxCoreHealth && state.kits > 0) {
      return `코어 안정기: R로 복구 ${state.coreHealth.toFixed(1)} / ${state.maxCoreHealth}`;
    }

    return state.phase === "night" ? "적이 약한 진입점을 두드린다. 가까운 곳부터 막아라." : "빈 선반과 계산대 줄을 함께 본다.";
  }

  function describeObjective(state) {
    if (state.phase === "day") {
      if (state.dayClosing) {
        return "셔터를 내리기 전에 남은 손님을 모두 정리한다.";
      }

      const emptyShelves = state.warehouse.shelves.filter((shelf) => shelf.stock <= 1).length;
      const queueLength = state.customers.filter((customer) => isQueueState(customer)).length;
      if (queueLength >= 3) {
        return "계산대 줄이 밀린다. 카운터를 비우지 않는다.";
      }
      if (emptyShelves >= 2) {
        return "빈 선반을 채워 손님 이탈을 막는다.";
      }
      return "손님을 받아 코인과 자원을 챙긴다.";
    }

    const broken = state.warehouse.entries.filter((entry) => entry.health <= entry.maxHealth * 0.35).length;
    if (broken >= 2) {
      return "여러 진입점이 약하다. 가까운 쪽부터 메운다.";
    }
    if (state.coreHealth <= state.maxCoreHealth * 0.45) {
      return "코어가 흔들린다. 수리 키트를 써서 버틴다.";
    }
    return "창고 안으로 파고드는 적을 먼저 잘라낸다.";
  }

  function describeSummary(state) {
    if (state.phase === "day") {
      const queue = state.customers.filter((customer) => isQueueState(customer)).length;
      if (state.dayClosing) {
        return `마감 정산 · 남은 손님 ${state.customers.length} · 줄 ${queue}`;
      }
      return `손님 처리 ${state.dayMetrics.served} · 줄 ${queue} · 압박 재료 ${state.dayMetrics.stockouts + state.dayMetrics.queueWalkouts}`;
    }

    if (state.phase === "night" && state.raid) {
      return `남은 습격 ${state.raid.remaining + state.zombies.length} · 탄약 ${state.ammo} · 판자 ${state.boards}`;
    }

    return "창고를 정리한다.";
  }

  function normalizeCommands(commands) {
    return {
      moveX: commands.moveX || 0,
      moveY: commands.moveY || 0,
      aimX: commands.aimX == null ? 0 : commands.aimX,
      aimY: commands.aimY == null ? 0 : commands.aimY,
      shoot: Boolean(commands.shoot),
      shove: Boolean(commands.shove),
      interact: Boolean(commands.interact),
      cyclePrice: Boolean(commands.cyclePrice),
      repair: Boolean(commands.repair),
      craftId: commands.craftId || null,
    };
  }

  function advanceGameStep(state, step, input, allowDiscrete) {
    if (input.aimX || input.aimY) {
      const facing = normalizeVector(input.aimX - state.player.x, input.aimY - state.player.y);
      if (facing.x || facing.y) {
        state.player.facingX = facing.x;
        state.player.facingY = facing.y;
      }
    }

    movePlayer(state, input.moveX, input.moveY, step);

    if (allowDiscrete && input.cyclePrice) {
      cycleNearestShelfPrice(state);
    }

    if (allowDiscrete && input.interact) {
      attemptContextAction(state);
    }

    if (allowDiscrete && input.repair) {
      attemptRepair(state);
    }

    if (allowDiscrete && input.craftId) {
      attemptCraft(state, input.craftId);
    }

    if (state.phase === "night") {
      if (input.shoot) {
        attemptShoot(state, input.aimX, input.aimY);
      }
      if (allowDiscrete && input.shove) {
        attemptShove(state);
      }
    }

    state.player.shootCooldown = Math.max(0, state.player.shootCooldown - step);
    state.player.shoveCooldown = Math.max(0, state.player.shoveCooldown - step);
    state.player.muzzleFlash = Math.max(0, state.player.muzzleFlash - step);
    state.screenShake = Math.max(0, state.screenShake - step * 10);
    state.screenFlash = Math.max(0, state.screenFlash - step * 4.2);
    state.elapsedTime += step;

    if (state.phase === "day") {
      updateCustomers(state, step);
    }

    if (state.phase === "night" && state.raid) {
      if (state.timer > 0 && state.raid.remaining > 0) {
        state.raid.spawnTimer -= step;
        if (state.raid.spawnTimer <= 0) {
          spawnZombie(state);
          state.raid.remaining -= 1;
          state.raid.spawnTimer = clamp(2.2 - state.day * 0.14 - state.nightPressure * 0.028, 0.86, 2.1);
        }
      }
      updateZombies(state, step);
    }

    updateBullets(state, step);
    updateParticles(state, step);

    state.timer = Math.max(0, state.timer - step);

    if (state.phase === "day" && state.timer <= 0 && state.customers.length > 0) {
      if (!state.dayClosing) {
        state.dayClosing = true;
        pushLog(state, "> 셔터를 내리기 시작했다. 남은 손님부터 정리한다.");
      }
      state.timer = 0;
    }

    if (state.phase === "night" && state.timer <= 0 && state.raid && state.raid.remaining > 0 && !state.raid.dawnClosed) {
      state.raid.dawnClosed = true;
      state.raid.remaining = 0;
      pushLog(state, "> 새벽빛이 비치자 남은 무리가 흩어졌다.");
    }

    if (state.phase === "day" && state.timer <= 0 && state.customers.length === 0) {
      beginNight(state);
    }

    if (state.phase === "night" && state.timer <= 0 && state.raid && state.raid.remaining <= 0 && state.zombies.length === 0) {
      advanceAfterNight(state);
    }

    if (state.phase === "night" && state.coreHealth <= 0) {
      endRun(state, false);
    }

    state.objective = describeObjective(state);
    state.interaction = describeInteraction(state);
    state.summary = describeSummary(state);
  }

  function updateGame(state, dt, commands = {}) {
    if (!state || state.phase === "result") {
      return state;
    }

    const input = normalizeCommands(commands);
    let remaining = Math.max(dt || 0, 0);
    if (!Number.isFinite(remaining)) {
      remaining = 0;
    }

    if (remaining <= 0) {
      return state;
    }

    let allowDiscrete = true;
    while (remaining > 0 && state.phase !== "result") {
      const step = Math.min(remaining, 0.05);
      advanceGameStep(state, step, input, allowDiscrete);
      remaining -= step;
      allowDiscrete = false;
    }

    return state;
  }

  function drawRoundedRect(ctx, x, y, w, h, radius, fillStyle, strokeStyle) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + w, y, x + w, y + h, radius);
    ctx.arcTo(x + w, y + h, x, y + h, radius);
    ctx.arcTo(x, y + h, x, y, radius);
    ctx.arcTo(x, y, x + w, y, radius);
    if (fillStyle) {
      ctx.fillStyle = fillStyle;
      ctx.fill();
    }
    if (strokeStyle) {
      ctx.strokeStyle = strokeStyle;
      ctx.stroke();
    }
  }

  function drawWarehouse(ctx, state) {
    ctx.fillStyle = state.phase === "night" ? "#0b0f12" : "#11181c";
    ctx.fillRect(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

    ctx.fillStyle = state.phase === "night" ? "#121921" : "#1a252b";
    ctx.fillRect(38, 26, WORLD_WIDTH - 76, WORLD_HEIGHT - 52);

    ctx.strokeStyle = "rgba(255,255,255,0.03)";
    ctx.lineWidth = 1;
    for (let x = 38; x < WORLD_WIDTH - 38; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x, 26);
      ctx.lineTo(x, WORLD_HEIGHT - 26);
      ctx.stroke();
    }
    for (let y = 26; y < WORLD_HEIGHT - 26; y += 32) {
      ctx.beginPath();
      ctx.moveTo(38, y);
      ctx.lineTo(WORLD_WIDTH - 38, y);
      ctx.stroke();
    }

    drawRoundedRect(ctx, state.warehouse.storage.rect.x, state.warehouse.storage.rect.y, state.warehouse.storage.rect.w, state.warehouse.storage.rect.h, 12, "#243036", "rgba(195,155,95,0.15)");
    drawRoundedRect(ctx, state.warehouse.workbench.rect.x, state.warehouse.workbench.rect.y, state.warehouse.workbench.rect.w, state.warehouse.workbench.rect.h, 12, "#2c3b41", "rgba(78,123,129,0.25)");
    drawRoundedRect(ctx, state.warehouse.counter.rect.x, state.warehouse.counter.rect.y, state.warehouse.counter.rect.w, state.warehouse.counter.rect.h, 14, "#28353a", "rgba(195,155,95,0.22)");
    drawRoundedRect(ctx, state.warehouse.core.rect.x, state.warehouse.core.rect.y, state.warehouse.core.rect.w, state.warehouse.core.rect.h, 14, "#2f2d2a", "rgba(195,155,95,0.28)");

    state.warehouse.shelves.forEach((shelf) => {
      drawRoundedRect(ctx, shelf.rect.x, shelf.rect.y, shelf.rect.w, shelf.rect.h, 10, shelf.color, "rgba(255,255,255,0.08)");
      ctx.fillStyle = "rgba(7, 11, 13, 0.46)";
      ctx.fillRect(shelf.rect.x + 10, shelf.rect.y + 12, shelf.rect.w - 20, 10);
      ctx.fillRect(shelf.rect.x + 10, shelf.rect.y + 26, shelf.rect.w - 20, 10);

      ctx.fillStyle = "#f0e5cf";
      ctx.font = "12px Avenir Next";
      ctx.fillText(`${shelf.label}`, shelf.rect.x + 6, shelf.rect.y - 8);
      ctx.fillStyle = "#e1d5c0";
      ctx.fillText(`${shelf.stock}/${shelf.capacity}`, shelf.rect.x + shelf.rect.w - 30, shelf.rect.y - 8);
      ctx.fillStyle = "#c39b5f";
      ctx.fillText(`${PRICE_TIERS[shelf.priceTier].label}`, shelf.rect.x + 8, shelf.rect.y + shelf.rect.h + 16);
    });

    state.warehouse.entries.forEach((entry) => {
      const healthRatio = clamp(entry.health / entry.maxHealth, 0, 1);
      const fill = entry.type === "door" ? "#4a3125" : "#36424c";
      drawRoundedRect(ctx, entry.rect.x, entry.rect.y, entry.rect.w, entry.rect.h, 6, fill, "rgba(255,255,255,0.1)");

      if (entry.type === "door" && entry.rect.h > entry.rect.w) {
        ctx.fillStyle = `rgba(195,155,95,${0.18 + healthRatio * 0.35})`;
        ctx.fillRect(entry.rect.x + 3, entry.rect.y + entry.rect.h * (1 - healthRatio), entry.rect.w - 6, entry.rect.h * healthRatio);
      } else {
        ctx.fillStyle = `rgba(195,155,95,${0.18 + healthRatio * 0.35})`;
        ctx.fillRect(entry.rect.x + 3, entry.rect.y + 3, (entry.rect.w - 6) * healthRatio, entry.rect.h - 6);
      }
    });

    ctx.fillStyle = "#f0e5cf";
    ctx.font = "13px Avenir Next";
    ctx.fillText("보관 구역", 108, 418);
    ctx.fillText("작업대", 452, 414);
    ctx.fillText("계산대", 446, 58);
    ctx.fillText("코어", 796, 400);

    if (state.phase === "night") {
      const light = ctx.createRadialGradient(state.player.x, state.player.y, 14, state.player.x, state.player.y, 170);
      light.addColorStop(0, "rgba(255, 236, 186, 0)");
      light.addColorStop(1, "rgba(4, 6, 8, 0.68)");
      ctx.fillStyle = "rgba(4, 6, 8, 0.62)";
      ctx.fillRect(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = light;
      ctx.beginPath();
      ctx.arc(state.player.x, state.player.y, 170, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";
    }
  }

  function drawCustomers(ctx, state) {
    const customers = [...state.customers].sort((a, b) => a.y - b.y);

    for (const customer of customers) {
      const bob = Math.sin(customer.animPhase) * customer.bobAmount * (customer.state === "checkout" || customer.state === "paying" ? 0.6 : 1.5);
      const bodyY = customer.y + bob;
      const flashAlpha = clamp(customer.flashTimer / 0.28, 0, 1);
      const glowAlpha = clamp(customer.checkoutGlow, 0, 1) * 0.34;

      ctx.fillStyle = "rgba(7, 11, 13, 0.28)";
      ctx.beginPath();
      ctx.ellipse(customer.x, customer.y + customer.radius + 7, customer.radius + 4, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      if (glowAlpha > 0) {
        ctx.globalAlpha = glowAlpha;
        ctx.strokeStyle = "#f0b45c";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(customer.x, bodyY, customer.radius + 6 + Math.sin(customer.animPhase * 0.65) * 1.5, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      ctx.fillStyle = customer.mood === "angry" ? "#d96b57" : customer.tint;
      ctx.beginPath();
      ctx.arc(customer.x, bodyY, customer.radius, 0, Math.PI * 2);
      ctx.fill();

      if (flashAlpha > 0) {
        ctx.globalAlpha = flashAlpha * 0.7;
        ctx.fillStyle = "#fff4d8";
        ctx.beginPath();
        ctx.arc(customer.x, bodyY, customer.radius + 1.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      ctx.fillStyle = "#0d1316";
      ctx.beginPath();
      ctx.arc(customer.x, bodyY - 2, 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = getItemDef(customer.desire).color;
      ctx.fillRect(customer.x - 7, bodyY - customer.radius - 12, 14, 8);

      if (customer.carried) {
        drawRoundedRect(ctx, customer.x + 6, bodyY + 1, 10, 8, 3, getItemDef(customer.desire).color, "rgba(7,11,13,0.35)");
      }

      if (customer.state === "paying") {
        ctx.fillStyle = "#f0b45c";
        ctx.beginPath();
        ctx.arc(customer.x + 12, bodyY - 14, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#fff4d8";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(customer.x + 12, bodyY - 14, 2, 0, Math.PI * 2);
        ctx.stroke();
      }

      const patienceRatio = clamp(customer.patience / customer.maxPatience, 0, 1);
      ctx.fillStyle = "rgba(255,255,255,0.12)";
      ctx.fillRect(customer.x - 10, bodyY + customer.radius + 6, 20, 4);
      ctx.fillStyle = patienceRatio > 0.45 ? "#83b28a" : "#d96b57";
      ctx.fillRect(customer.x - 10, bodyY + customer.radius + 6, 20 * patienceRatio, 4);
    }
  }

  function drawZombies(ctx, state) {
    const zombies = [...state.zombies].sort((a, b) => a.y - b.y);

    for (const zombie of zombies) {
      const bob = Math.sin(zombie.animPhase) * zombie.bobAmount * (zombie.kind === "runner" ? 1.7 : 1.1);
      const bodyY = zombie.y + bob;
      const hitAlpha = clamp(zombie.hitFlash / 0.18, 0, 1);
      const attackAlpha = clamp(zombie.attackFlash / 0.24, 0, 1);

      ctx.fillStyle = "rgba(5, 8, 10, 0.32)";
      ctx.beginPath();
      ctx.ellipse(zombie.x, zombie.y + zombie.radius + 7, zombie.radius + 4, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      if (attackAlpha > 0) {
        ctx.globalAlpha = attackAlpha * 0.7;
        ctx.strokeStyle = zombie.kind === "runner" ? "#f0b45c" : "#d96b57";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(zombie.x, bodyY, zombie.radius + 7 + Math.sin(zombie.animPhase) * 2, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      ctx.fillStyle = zombie.color;
      ctx.beginPath();
      ctx.arc(zombie.x, bodyY, zombie.radius, 0, Math.PI * 2);
      ctx.fill();

      if (hitAlpha > 0) {
        ctx.globalAlpha = hitAlpha * 0.85;
        ctx.fillStyle = "#fff0dd";
        ctx.beginPath();
        ctx.arc(zombie.x, bodyY, zombie.radius + 1.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      ctx.fillStyle = "#0d1316";
      ctx.beginPath();
      ctx.arc(zombie.x - 2, bodyY - 2, 1.4, 0, Math.PI * 2);
      ctx.arc(zombie.x + 3, bodyY - 1, 1.4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "rgba(13, 19, 22, 0.65)";
      ctx.fillRect(zombie.x - 12, bodyY - zombie.radius - 10, 24, 4);
      ctx.fillStyle = zombie.kind === "runner" ? "#f0b45c" : "#d96b57";
      ctx.fillRect(zombie.x - 12, bodyY - zombie.radius - 10, 24 * clamp(zombie.health / zombie.maxHealth, 0, 1), 4);
    }
  }

  function drawBullets(ctx, state) {
    ctx.fillStyle = "#f0e5cf";
    for (const bullet of state.bullets) {
      ctx.beginPath();
      ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawPlayer(ctx, state) {
    const player = state.player;
    const muzzleAlpha = clamp(player.muzzleFlash / 0.12, 0, 1);
    ctx.fillStyle = "#4e7b81";
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "#d5efe7";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(player.x, player.y);
    ctx.lineTo(player.x + player.facingX * 18, player.y + player.facingY * 18);
    ctx.stroke();

    if (muzzleAlpha > 0) {
      const flashX = player.x + player.facingX * 20;
      const flashY = player.y + player.facingY * 20;
      ctx.globalAlpha = muzzleAlpha;
      ctx.fillStyle = "#fff1c7";
      ctx.beginPath();
      ctx.arc(flashX, flashY, 7 + muzzleAlpha * 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    if (state.phase === "day" && isNearCounter(state) && state.player.checkoutProgress > 0) {
      ctx.fillStyle = "rgba(195,155,95,0.16)";
      ctx.fillRect(state.warehouse.counter.interact.x - 34, state.warehouse.counter.interact.y - 8, 68, 10);
      ctx.fillStyle = "#c39b5f";
      ctx.fillRect(state.warehouse.counter.interact.x - 34, state.warehouse.counter.interact.y - 8, 68 * state.player.checkoutProgress, 10);
    }
  }

  function drawParticles(ctx, state) {
    for (const particle of state.particles) {
      const alpha = clamp(particle.life / particle.maxLife, 0, 1);
      if (particle.shape === "text") {
        ctx.fillStyle = particle.color.replace(")", `, ${alpha})`).replace("rgb", "rgba");
        ctx.fillStyle = particle.color.startsWith("#") ? particle.color : particle.color;
        ctx.globalAlpha = alpha;
        ctx.font = "bold 12px Avenir Next";
        ctx.fillText(particle.label, particle.x, particle.y);
        ctx.globalAlpha = 1;
      } else if (particle.shape === "ring") {
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = particle.color;
        ctx.lineWidth = particle.lineWidth;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
      } else {
        ctx.globalAlpha = alpha;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }
  }

  function drawHUDBadges(ctx, state) {
    ctx.fillStyle = "rgba(9, 14, 17, 0.72)";
    ctx.fillRect(18, WORLD_HEIGHT - 40, 228, 24);
    ctx.fillRect(WORLD_WIDTH - 262, WORLD_HEIGHT - 40, 244, 24);
    ctx.fillStyle = "#f0e5cf";
    ctx.font = "12px Avenir Next";
    ctx.fillText(`재료 보유  판자 ${state.boards} · 탄약 ${state.ammo} · 수리 ${state.kits}`, 28, WORLD_HEIGHT - 24);
    ctx.fillText(`코어 ${state.coreHealth.toFixed(1)} / ${state.maxCoreHealth}`, WORLD_WIDTH - 148, WORLD_HEIGHT - 24);
  }

  function renderCanvas(ctx, state) {
    ctx.clearRect(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
    const shake = state.screenShake > 0 ? state.screenShake : 0;
    const offsetX = shake ? Math.sin(state.elapsedTime * 74) * shake : 0;
    const offsetY = shake ? Math.cos(state.elapsedTime * 63) * shake * 0.65 : 0;

    ctx.save();
    ctx.translate(offsetX, offsetY);
    drawWarehouse(ctx, state);
    if (state.phase === "day") {
      drawCustomers(ctx, state);
    } else if (state.phase === "night") {
      drawZombies(ctx, state);
      drawBullets(ctx, state);
    }
    drawPlayer(ctx, state);
    drawParticles(ctx, state);
    drawHUDBadges(ctx, state);
    ctx.restore();

    if (state.screenFlash > 0) {
      ctx.globalAlpha = clamp(state.screenFlash, 0, 1);
      ctx.fillStyle = state.screenFlashColor;
      ctx.fillRect(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
      ctx.globalAlpha = 1;
    }
  }

  function renderShelfPanel(container, state) {
    container.innerHTML = state.warehouse.shelves
      .map((shelf) => {
        const tier = PRICE_TIERS[shelf.priceTier];
        const ratio = clamp(shelf.stock / shelf.capacity, 0, 1);
        return `
          <article class="rack-row rack-row--${tier.id}">
            <div class="rack-row__head">
              <strong>${shelf.label}</strong>
              <span class="rack-row__tier">${tier.label}</span>
            </div>
            <div class="rack-row__meta">
              <span>재고 ${shelf.stock}/${shelf.capacity}</span>
              <span class="rack-row__price">${getShelfPrice(shelf)}c</span>
            </div>
            <div class="rack-row__bar" aria-hidden="true">
              <span style="width:${Math.round(ratio * 100)}%"></span>
            </div>
            <div class="rack-row__foot">E 보충 · R 가격</div>
          </article>
        `;
      })
      .join("");
  }

  function renderStoragePanel(container, state) {
    container.innerHTML = [
      ...ITEM_DEFS.map((item) => {
        const amount = state.storage[item.id] || 0;
        return `
          <article class="supply-row">
            <div class="supply-row__name">
              <strong>${item.label}</strong>
              <span>비축분</span>
            </div>
            <div class="supply-row__value">${amount}</div>
          </article>
        `;
      }),
      `
        <article class="supply-row supply-row--ammo">
          <div class="supply-row__name">
            <strong>방어 자재</strong>
            <span>판자 · 탄약 · 수리 키트</span>
          </div>
          <div class="supply-row__value">${state.boards} / ${state.ammo} / ${state.kits}</div>
        </article>
      `,
    ].join("");
  }

  function renderCraftPanel(container, state) {
    const nearWorkbench = isNearWorkbench(state);
    container.innerHTML = CRAFT_DEFS.map((recipe) => {
      return `
        <article class="command-card">
          <div class="command-card__key">${recipe.hotkey}</div>
          <div class="command-card__body">
            <strong>${recipe.label}</strong>
            <div class="command-card__meta">
              <span>${recipe.cost}코인</span>
              <span>보유 ${state[recipe.stockKey]}</span>
            </div>
          </div>
          <button class="command-card__action" type="button" data-craft-id="${recipe.id}" ${nearWorkbench ? "" : "disabled"}>
            <strong>+${recipe.amount}</strong>
          </button>
        </article>
      `;
    }).join("");
  }

  function renderEntryPanel(container, state) {
    const pressureLine =
      state.phase === "night" && state.raid
        ? `
          <article class="breach-row breach-row--pressure">
            <div class="breach-row__head">
              <strong>야간 압박</strong>
              <span>잔여 ${state.raid.remaining}체</span>
            </div>
            <div class="breach-row__value">${state.nightPressure}</div>
          </article>
        `
        : `
          <article class="breach-row breach-row--pressure">
            <div class="breach-row__head">
              <strong>야간 예상</strong>
              <span>오늘 누적된 압박</span>
            </div>
            <div class="breach-row__value">${(state.dayMetrics.stockouts + state.dayMetrics.queueWalkouts).toFixed(0)}</div>
          </article>
        `;

    container.innerHTML = [
      pressureLine,
      ...state.warehouse.entries.map((entry) => {
        const ratio = clamp(entry.health / entry.maxHealth, 0, 1);
        return `
          <article class="breach-row breach-row--entry ${ratio < 0.4 ? "breach-row--low" : ""}">
            <div class="breach-row__head">
              <strong>${entry.label}</strong>
              <span>${entry.type === "door" ? "문" : "창문"}</span>
            </div>
            <div class="breach-row__meta">
              <span>${entry.health.toFixed(1)} / ${entry.maxHealth}</span>
              <strong>${Math.round(ratio * 100)}%</strong>
            </div>
            <div class="breach-row__bar" aria-hidden="true">
              <span style="width:${Math.round(ratio * 100)}%"></span>
            </div>
          </article>
        `;
      }),
      `
        <article class="breach-row breach-row--core">
          <div class="breach-row__head">
            <strong>코어 안정기</strong>
            <span>기지의 마지막 전력선</span>
          </div>
          <div class="breach-row__value">${state.coreHealth.toFixed(1)} / ${state.maxCoreHealth}</div>
        </article>
      `,
    ].join("");
  }

  function renderLogs(container, state) {
    container.innerHTML = state.logs
      .map(
        (line) => `
          <div class="feed-line">
            <span class="feed-line__tick">></span>
            <span class="feed-line__text">${line}</span>
          </div>
        `
      )
      .join("");
    container.scrollTop = container.scrollHeight;
  }

  function renderResultGrid(container, state) {
    if (!state.result) {
      container.innerHTML = "";
      return;
    }
    container.innerHTML = [
      { label: "도달 일차", value: `${state.result.day} / ${state.maxDays}` },
      { label: "보유 코인", value: `${state.result.coins}` },
      { label: "마지막 날 판매", value: `${state.result.served}` },
      { label: "코어", value: `${state.result.coreHealth.toFixed(1)}` },
    ]
      .map(
        (entry) => `
          <article class="result-stat">
            <p>${entry.label}</p>
            <strong>${entry.value}</strong>
          </article>
        `
      )
      .join("");
  }

  function mountBrowserGame() {
    const canvas = document.getElementById("game-canvas");
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    const refs = {
      titleScreen: document.getElementById("title-screen"),
      gameScreen: document.getElementById("game-screen"),
      resultScreen: document.getElementById("result-screen"),
      startButton: document.getElementById("start-run"),
      restartButton: document.getElementById("restart-run"),
      backButton: document.getElementById("back-to-title"),
      shelfPanel: document.getElementById("shelf-panel"),
      storagePanel: document.getElementById("storage-panel"),
      craftPanel: document.getElementById("craft-panel"),
      entryPanel: document.getElementById("entry-panel"),
      logPanel: document.getElementById("log-panel"),
      phasePill: document.getElementById("phase-pill"),
      dayStat: document.getElementById("day-stat"),
      coinsStat: document.getElementById("coins-stat"),
      coreStat: document.getElementById("core-stat"),
      timeStat: document.getElementById("time-stat"),
      summaryStat: document.getElementById("summary-stat"),
      phaseTitle: document.getElementById("phase-title"),
      phaseCopy: document.getElementById("phase-copy"),
      objectiveText: document.getElementById("objective-text"),
      interactionText: document.getElementById("interaction-text"),
      resultTitle: document.getElementById("result-title"),
      resultCopy: document.getElementById("result-copy"),
      resultGrid: document.getElementById("result-grid"),
      canvasShell: document.querySelector(".canvas-shell"),
      canvas,
      ctx,
    };

    let state = null;
    let currentScreen = "title";
    let lastFrame = 0;

    const inputState = {
      pressed: {},
      justPressed: new Set(),
      pointerX: WORLD_WIDTH * 0.5,
      pointerY: WORLD_HEIGHT * 0.2,
      pointerDown: false,
    };

    function showScreen(screen) {
      currentScreen = screen;
      refs.titleScreen.classList.toggle("hidden", screen !== "title");
      refs.gameScreen.classList.toggle("hidden", screen !== "game");
      refs.resultScreen.classList.toggle("hidden", screen !== "result");
    }

    function resetRun() {
      state = createGameState();
      showScreen("game");
      renderEverything();
    }

    function syncCanvasShellSize() {
      if (!refs.canvasShell || currentScreen !== "game") {
        return;
      }

      if (window.innerWidth <= 1100) {
        refs.canvasShell.style.width = "";
        refs.canvasShell.style.height = "";
        return;
      }

      const centerPanel = refs.canvasShell.parentElement;
      const header = centerPanel.querySelector(".panel__header--hero");
      const panelStyle = window.getComputedStyle(centerPanel);
      const gap = Number.parseFloat(panelStyle.rowGap || panelStyle.gap || "12") || 12;
      const paddingX = (Number.parseFloat(panelStyle.paddingLeft) || 0) + (Number.parseFloat(panelStyle.paddingRight) || 0);
      const paddingY = (Number.parseFloat(panelStyle.paddingTop) || 0) + (Number.parseFloat(panelStyle.paddingBottom) || 0);
      const availableWidth = centerPanel.clientWidth - paddingX;
      const availableHeight =
        centerPanel.clientHeight - paddingY - (header ? header.getBoundingClientRect().height : 0) - gap;

      if (availableWidth <= 0 || availableHeight <= 0) {
        return;
      }

      const aspect = WORLD_WIDTH / WORLD_HEIGHT;
      let width = availableWidth;
      let height = width / aspect;

      if (height > availableHeight) {
        height = availableHeight;
        width = height * aspect;
      }

      refs.canvasShell.style.width = `${Math.floor(width)}px`;
      refs.canvasShell.style.height = `${Math.floor(height)}px`;
    }

    function finishRun() {
      if (!state || !state.result) {
        return;
      }
      refs.resultTitle.textContent = state.result.success ? "창고 사수 성공" : "창고 붕괴";
      refs.resultCopy.textContent = state.result.success
        ? `${state.day}일 밤까지 버텼다. 장사와 방어가 같은 창고에서 이어지는 리듬은 이제 잡혔다.`
        : `${state.day}일차 야간 공세에서 코어가 무너졌다. 선반 운영과 자원 제작을 더 매끈하게 굴려야 한다.`;
      renderResultGrid(refs.resultGrid, state);
      showScreen("result");
    }

    function readCommands() {
      const moveX = (inputState.pressed.KeyD ? 1 : 0) - (inputState.pressed.KeyA ? 1 : 0);
      const moveY = (inputState.pressed.KeyS ? 1 : 0) - (inputState.pressed.KeyW ? 1 : 0);

      const command = {
        moveX,
        moveY,
        aimX: inputState.pointerX,
        aimY: inputState.pointerY,
        shoot: inputState.pointerDown,
        interact: inputState.justPressed.has("KeyE"),
        cyclePrice: inputState.justPressed.has("KeyR") && state && state.phase === "day",
        repair: inputState.justPressed.has("KeyR") && state && state.phase !== "day",
        shove: inputState.justPressed.has("Space"),
        craftId: null,
      };

      if (inputState.justPressed.has("Digit1")) {
        command.craftId = "boards";
      } else if (inputState.justPressed.has("Digit2")) {
        command.craftId = "ammo";
      } else if (inputState.justPressed.has("Digit3")) {
        command.craftId = "kits";
      }

      if (state && state.phase === "day" && inputState.justPressed.has("KeyR")) {
        const entry = findNearestEntry(state, 58);
        if (entry && entry.health < entry.maxHealth) {
          command.cyclePrice = false;
          command.repair = true;
        }
      }

      inputState.justPressed.clear();
      return command;
    }

    function renderEverything() {
      if (!state) {
        return;
      }
      syncCanvasShellSize();
      renderCanvas(refs.ctx, state);
      refs.phasePill.textContent = state.phase === "day" ? "DAY" : "NIGHT";
      refs.dayStat.textContent = `${state.day} / ${state.maxDays}`;
      refs.coinsStat.textContent = `${state.coins}`;
      refs.coreStat.textContent = `${state.coreHealth.toFixed(1)} / ${state.maxCoreHealth}`;
      refs.timeStat.textContent = formatSeconds(state.timer);
      refs.summaryStat.textContent = state.summary;
      refs.phaseTitle.textContent = state.phase === "day" ? "창고 운영" : "야간 방어";
      refs.phaseCopy.textContent =
        state.phase === "day"
          ? "선반 상태가 오늘 밤 압박을 만든다."
          : "약한 구멍부터 메우고 코어까지의 길을 끊는다.";
      refs.objectiveText.textContent = state.objective;
      refs.interactionText.textContent = state.interaction;
      renderShelfPanel(refs.shelfPanel, state);
      renderStoragePanel(refs.storagePanel, state);
      renderCraftPanel(refs.craftPanel, state);
      renderEntryPanel(refs.entryPanel, state);
      renderLogs(refs.logPanel, state);
    }

    function tick(timestamp) {
      if (!lastFrame) {
        lastFrame = timestamp;
      }
      const dt = (timestamp - lastFrame) / 1000;
      lastFrame = timestamp;

      if (currentScreen === "game" && state) {
        const commands = readCommands();
        updateGame(state, dt, commands);
        renderEverything();
        if (state.phase === "result") {
          finishRun();
        }
      }

      requestAnimationFrame(tick);
    }

    refs.startButton.addEventListener("click", resetRun);
    refs.restartButton.addEventListener("click", resetRun);
    refs.backButton.addEventListener("click", () => {
      state = null;
      showScreen("title");
    });

    refs.craftPanel.addEventListener("click", (event) => {
      const button = event.target.closest("[data-craft-id]");
      if (!button || !state) {
        return;
      }
      attemptCraft(state, button.getAttribute("data-craft-id"));
      renderEverything();
    });

    window.addEventListener("keydown", (event) => {
      if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.code)) {
        event.preventDefault();
      }
      inputState.pressed[event.code] = true;
      inputState.justPressed.add(event.code);
    });

    window.addEventListener("keyup", (event) => {
      inputState.pressed[event.code] = false;
    });

    window.addEventListener("resize", () => {
      syncCanvasShellSize();
      if (state && currentScreen === "game") {
        renderEverything();
      }
    });

    canvas.addEventListener("mousemove", (event) => {
      const rect = canvas.getBoundingClientRect();
      inputState.pointerX = ((event.clientX - rect.left) / rect.width) * WORLD_WIDTH;
      inputState.pointerY = ((event.clientY - rect.top) / rect.height) * WORLD_HEIGHT;
    });

    canvas.addEventListener("mousedown", () => {
      inputState.pointerDown = true;
    });

    window.addEventListener("mouseup", () => {
      inputState.pointerDown = false;
    });

    showScreen("title");
    requestAnimationFrame(tick);
  }

  return {
    WORLD_WIDTH,
    WORLD_HEIGHT,
    ITEM_DEFS,
    PRICE_TIERS,
    CRAFT_DEFS,
    DAY_CONFIG,
    createWarehouse,
    createGameState,
    initializeDay,
    beginNight,
    updateGame,
    attemptCraft,
    attemptRepair,
    attemptContextAction,
    cycleNearestShelfPrice,
    restockShelf,
    mountBrowserGame,
  };
});

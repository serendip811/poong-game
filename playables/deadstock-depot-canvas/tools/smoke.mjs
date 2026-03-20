import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const game = require("../game.js");

function makeCustomer(id, overrides = {}) {
  return {
    id,
    x: 480,
    y: 150,
    radius: 9,
    speed: 62,
    desire: "canned",
    shelfId: "canned",
    patience: 20,
    maxPatience: 20,
    shoppingTimer: 0,
    checkoutProgress: 0,
    queueIndex: 0,
    state: "queue",
    mood: "neutral",
    carried: true,
    saleValue: 4,
    priceTier: 1,
    tint: "#cabd9f",
    route: [],
    animPhase: 0,
    bobAmount: 1,
    flashTimer: 0,
    checkoutGlow: 0,
    payTimer: 0,
    ...overrides,
  };
}

const state = game.createGameState({ seed: 42 });
const warehouseRef = state.warehouse;

assert.equal(state.phase, "day");
assert.equal(state.day, 1);
assert.equal(state.warehouse.entries.length, 4);
assert.ok(state.warehouse.shelves.some((shelf) => shelf.stock > 0));

const shelf = state.warehouse.shelves[0];
state.player.x = shelf.interact.x;
state.player.y = shelf.interact.y;
shelf.stock = 0;
state.storage[shelf.itemId] = 3;
game.updateGame(state, 0.016, { interact: true });
assert.equal(shelf.stock, 2);
assert.equal(state.storage[shelf.itemId], 1);

const priceBefore = shelf.priceTier;
game.updateGame(state, 0.016, { cyclePrice: true });
assert.notEqual(shelf.priceTier, priceBefore);

const checkoutState = game.createGameState({ seed: 19 });
const counterSpot = checkoutState.warehouse.counter.queueSpots[0];
checkoutState.customerSpawnTimer = 999;
checkoutState.player.x = checkoutState.warehouse.counter.interact.x;
checkoutState.player.y = checkoutState.warehouse.counter.interact.y;
checkoutState.customers = [
  makeCustomer("c1", {
    x: counterSpot.x,
    y: 48,
    desire: shelf.itemId,
    shelfId: shelf.id,
    state: "to-queue",
  }),
];
game.updateGame(checkoutState, 0.05, {});
assert.equal(checkoutState.player.checkoutProgress, 0);
assert.equal(checkoutState.customers[0].checkoutProgress, 0);

checkoutState.customers[0].x = counterSpot.x;
checkoutState.customers[0].y = counterSpot.y;
checkoutState.customers[0].state = "queue";
game.updateGame(checkoutState, 0.05, {});
assert.ok(checkoutState.player.checkoutProgress > 0);
assert.ok(checkoutState.customers[0].checkoutProgress > 0);

const queuePriorityState = game.createGameState({ seed: 21 });
const queueFront = queuePriorityState.warehouse.counter.queueSpots[0];
queuePriorityState.customerSpawnTimer = 999;
queuePriorityState.player.x = queuePriorityState.warehouse.counter.interact.x;
queuePriorityState.player.y = queuePriorityState.warehouse.counter.interact.y;
queuePriorityState.customers = [
  makeCustomer("c1", { x: queueFront.x, y: queueFront.y + 70, state: "to-queue" }),
  makeCustomer("c2", { x: queueFront.x, y: queueFront.y, desire: "battery", shelfId: "battery" }),
];
game.updateGame(queuePriorityState, 0.05, {});
assert.equal(queuePriorityState.customers.find((customer) => customer.id === "c2").state, "checkout");
assert.equal(queuePriorityState.customers.find((customer) => customer.id === "c2").queueIndex, 0);
assert.equal(queuePriorityState.customers.find((customer) => customer.id === "c1").queueIndex, 1);

const overflowQueueState = game.createGameState({ seed: 22 });
const overflowFront = overflowQueueState.warehouse.counter.queueSpots[0];
overflowQueueState.customerSpawnTimer = 999;
overflowQueueState.customers = Array.from({ length: 6 }, (_, index) =>
  makeCustomer(`c${index + 1}`, {
    x: overflowFront.x,
    y: overflowFront.y,
  })
);
game.updateGame(overflowQueueState, 2.5, {});
assert.equal(overflowQueueState.customers.find((customer) => customer.id === "c5").queueIndex, 4);
assert.equal(overflowQueueState.customers.find((customer) => customer.id === "c6").queueIndex, 5);
assert.notEqual(
  overflowQueueState.customers.find((customer) => customer.id === "c5").y.toFixed(1),
  overflowQueueState.customers.find((customer) => customer.id === "c6").y.toFixed(1)
);

const closingState = game.createGameState({ seed: 23 });
closingState.customerSpawnTimer = 999;
closingState.timer = 0.01;
closingState.customers = [makeCustomer("c1", { x: counterSpot.x, y: counterSpot.y })];
game.updateGame(closingState, 0.05, {});
assert.equal(closingState.phase, "day");
assert.equal(closingState.dayClosing, true);
assert.equal(closingState.customers.length, 1);

state.player.x = state.warehouse.workbench.interact.x;
state.player.y = state.warehouse.workbench.interact.y;
const coinsBeforeCraft = state.coins;
const boardsBeforeCraft = state.boards;
assert.equal(game.attemptCraft(state, "boards"), true);
assert.equal(state.coins, coinsBeforeCraft - 4);
assert.equal(state.boards, boardsBeforeCraft + 2);

game.beginNight(state);
assert.equal(state.phase, "night");
assert.equal(state.warehouse, warehouseRef);
assert.ok(state.raid.total >= 6);

const ammoBeforeShot = state.ammo;
game.updateGame(state, 0.016, {
  aimX: state.player.x + 40,
  aimY: state.player.y,
  shoot: true,
});
assert.equal(state.ammo, ammoBeforeShot - 1);
assert.equal(state.bullets.length, 1);

for (let index = 0; index < 60; index += 1) {
  game.updateGame(state, 0.05, {});
}
assert.ok(state.zombies.length > 0 || state.raid.remaining < state.raid.total);

const blockedShotState = game.createGameState({ seed: 24 });
game.beginNight(blockedShotState);
blockedShotState.raid.remaining = 0;
blockedShotState.raid.spawnTimer = 99;
const frontEntry = blockedShotState.warehouse.entries.find((entry) => entry.id === "front");
blockedShotState.zombies = [
  {
    id: "z1",
    kind: "walker",
    x: frontEntry.exterior.x,
    y: frontEntry.exterior.y + 6,
    radius: 10,
    speed: 0,
    health: 4.1,
    maxHealth: 4.1,
    attack: 1,
    strikeCooldown: 99,
    color: "#d96b57",
    targetEntryId: "front",
    targetMode: "entry",
    pushX: 0,
    pushY: 0,
    route: [],
    animPhase: 0,
    bobAmount: 1,
    hitFlash: 0,
    attackFlash: 0,
  },
];
blockedShotState.player.x = frontEntry.interior.x;
blockedShotState.player.y = frontEntry.interior.y + 24;
for (let index = 0; index < 10; index += 1) {
  game.updateGame(blockedShotState, 0.05, {
    aimX: frontEntry.exterior.x,
    aimY: frontEntry.exterior.y,
    shoot: true,
  });
}
assert.equal(blockedShotState.zombies[0].health, 4.1);
assert.equal(frontEntry.health, frontEntry.maxHealth);

state.timer = 0.01;
state.raid.remaining = 3;
state.zombies = [];
game.updateGame(state, 0.05, {});
assert.equal(state.phase, "day");
assert.equal(state.day, 2);
assert.equal(state.raid, null);

const longStepState = game.createGameState({ seed: 77 });
const splitStepState = game.createGameState({ seed: 77 });
game.updateGame(longStepState, 1, {});
for (let index = 0; index < 20; index += 1) {
  game.updateGame(splitStepState, 0.05, {});
}
assert.equal(longStepState.timer.toFixed(3), splitStepState.timer.toFixed(3));
assert.equal(longStepState.customerSpawnTimer.toFixed(3), splitStepState.customerSpawnTimer.toFixed(3));
assert.equal(longStepState.customers.length, splitStepState.customers.length);

console.log("deadstock-depot-canvas smoke ok");

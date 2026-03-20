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

assert.equal(game.GAME_TITLE, "Hexfall March");
assert.equal(game.ROUTE_TEMPLATE.length, 6);
assert.equal(game.createStarterDeck().length, 12);

const deterministicRolls = [0.08, 0.37, 0.61, 0.14, 0.92, 0.48, 0.25, 0.73];
let rollIndex = 0;
const rng = () => {
  const value = deterministicRolls[rollIndex % deterministicRolls.length];
  rollIndex += 1;
  return value;
};

const rewards = game.buildRewardChoices(game.createStarterDeck(), rng);
assert.equal(rewards.length, 3);
assert.equal(new Set(rewards.map((entry) => entry.cardId)).size, 3);

const starterDeck = game.createStarterDeck();
assert.equal(game.upgradeCard(starterDeck[0]), true);
assert.equal(starterDeck[0].upgraded, true);

const run = game.createInitialRun();
game.selectRouteOption(run, 0, rng);
assert.equal(run.phase, "combat");
assert.equal(run.combat.enemy.id, "ash-scout");
assert.ok(run.combat.hand.length >= 5);

run.combat.enemy.hp = 1;
const opener = run.combat.hand.find((card) =>
  game
    .getCardBlueprint(card)
    .actions.some((action) => action.type === "damage")
);

assert.ok(opener);
game.playCard(run, opener.uid, rng);
assert.equal(run.phase, "reward");
assert.equal(run.rewardChoices.length, 3);

game.chooseReward(run, 0);
assert.equal(run.phase, "route");
assert.equal(run.routeIndex, 1);

game.selectRouteOption(run, 0, rng);
assert.equal(run.phase, "rest");
const hpBeforeRest = run.hp;
game.applyRestChoice(run, "recover");
assert.equal(run.routeIndex, 2);
assert.ok(run.hp >= hpBeforeRest);

game.selectRouteOption(run, 1, rng);
assert.equal(run.phase, "combat");
run.combat.enemy.hp = 1;
const finisher = run.combat.hand.find((card) =>
  game
    .getCardBlueprint(card)
    .actions.some((action) => action.type === "damage")
);
assert.ok(finisher);
game.playCard(run, finisher.uid, rng);
assert.equal(run.phase, "reward");
assert.ok(run.pendingRelic || run.relics.length >= 1);

console.log("hexfall-march smoke ok");
console.log({
  routeSteps: game.ROUTE_TEMPLATE.length,
  starterDeck: game.createStarterDeck().length,
  firstRewardChoices: rewards.map((entry) => entry.cardId),
  relicsAfterElite: run.relics.map((relic) => relic.id),
});

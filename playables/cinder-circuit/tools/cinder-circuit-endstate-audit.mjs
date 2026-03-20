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

function createAuditBuild(signatureId, coreId, benchCoreId, mods) {
  const build = game.createInitialBuild(signatureId);
  build.coreId = coreId;
  build.pendingCores = game.sanitizeBenchCoreIds([
    benchCoreId,
    benchCoreId,
    benchCoreId,
  ]);
  for (const modId of mods) {
    game.MOD_DEFS[modId].apply(build);
  }
  return build;
}

const archetypes = [
  {
    id: "precision_bounce",
    label: "precision / bounce",
    signatureId: "relay_oath",
    coreId: "ricochet",
    benchCoreId: "ricochet",
    mods: ["pulse_gate", "drive_sync", "heat_sink"],
    validate({ weapon, player }) {
      assert.ok(weapon.bounce >= 2);
      assert.ok(weapon.cooldown <= 0.25);
      assert.ok(player.driveGainMultiplier >= 1.5);
    },
  },
  {
    id: "spread_sustain",
    label: "spread / sustain",
    signatureId: "scrap_pact",
    coreId: "scatter",
    benchCoreId: "scatter",
    mods: ["armor_mesh", "step_servos", "magnet_rig"],
    validate({ weapon, player }) {
      assert.ok(weapon.pellets >= 6);
      assert.ok(player.maxHp >= 128);
      assert.ok(player.pickupRadius >= 86);
      assert.ok(player.hazardMitigation >= 0.18);
    },
  },
  {
    id: "chain_cooldown",
    label: "chain / cooldown",
    signatureId: "rail_zeal",
    coreId: "lance",
    benchCoreId: "lance",
    mods: ["arc_array", "heat_sink", "reactor_cap"],
    validate({ weapon, player }) {
      assert.ok(weapon.chain >= 2);
      assert.ok(weapon.pierce >= 3);
      assert.ok(player.coolRate >= 50);
    },
  },
];

const summary = archetypes.map((archetype) => {
  const build = createAuditBuild(
    archetype.signatureId,
    archetype.coreId,
    archetype.benchCoreId,
    archetype.mods
  );
  const weapon = game.computeWeaponStats(build);
  const player = game.computePlayerStats(build);
  archetype.validate({ build, weapon, player });
  return {
    archetype: archetype.label,
    signature: game.SIGNATURE_DEFS[archetype.signatureId].label,
    core: game.CORE_DEFS[archetype.coreId].label,
    mods: archetype.mods.join(", "),
    sync: weapon.benchSyncLabel,
    dmg: weapon.damage,
    cd: weapon.cooldown,
    bounce: weapon.bounce,
    pierce: weapon.pierce,
    chain: weapon.chain,
    hp: player.maxHp,
    cool: player.coolRate,
    drive: player.driveGainMultiplier,
  };
});

console.log("cinder-circuit endstate audit ok");
console.table(summary);

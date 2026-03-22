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
assert.equal(game.MAX_WAVES, 12);
assert.equal(game.WAVE_CONFIG.length, 12);
assert.equal(game.ACT_BREAK_ARMORY_WAVE, 5);
assert.equal(game.LATE_BREAK_ARMORY_WAVE, 9);
assert.equal(game.ACT3_CATALYST_DRAFT_WAVE, 10);
assert.equal(game.getActLabelForWave(4).shortLabel, "Act 1");
assert.equal(game.getActLabelForWave(5).shortLabel, "Act 2");
assert.equal(game.getActLabelForWave(9).shortLabel, "Act 3");
assert.equal(game.getActLabelForWave(13).shortLabel, "Act 4");
assert.equal(game.getActLabelForWave(19).shortLabel, "Act 4");
assert.equal(game.POST_CAPSTONE_WAVE_COUNT, 7);
assert.ok(game.WAVE_CONFIG[0].spawnBudget < game.WAVE_CONFIG[2].spawnBudget);
assert.ok(game.WAVE_CONFIG[4].hazard);
assert.ok(game.WAVE_CONFIG[3].hazard.damage > game.WAVE_CONFIG[4].hazard.damage);
assert.ok(game.WAVE_CONFIG[4].driveGainFactor > game.WAVE_CONFIG[3].driveGainFactor);
assert.equal(game.WAVE_CONFIG[4].arena.width, 1280);
assert.equal(game.WAVE_CONFIG[4].arena.height, 720);
assert.equal(game.WAVE_CONFIG[4].hazard.type, "territory");
assert.ok(game.WAVE_CONFIG[4].hazard.coreHp > 0);
assert.ok(game.WAVE_CONFIG[7].spawnBudget > game.WAVE_CONFIG[4].spawnBudget);
assert.ok(game.WAVE_CONFIG[7].mix.warden > 0);
assert.ok(game.WAVE_CONFIG[7].mix.mortar > 0);
assert.ok(game.WAVE_CONFIG[7].hazard.coreHp > game.WAVE_CONFIG[4].hazard.coreHp);
assert.equal(game.WAVE_CONFIG[7].hazard.type, "territory");
assert.ok(game.WAVE_CONFIG[7].hazard.turretInterval < game.WAVE_CONFIG[4].hazard.turretInterval);
assert.equal(game.WAVE_CONFIG[8].arena.width, 1440);
assert.equal(game.WAVE_CONFIG[8].hazard.type || "pulse", "pulse");
assert.ok(game.WAVE_CONFIG[8].mix.skimmer > game.WAVE_CONFIG[8].mix.warden);
assert.ok(game.WAVE_CONFIG[8].mix.lancer > game.WAVE_CONFIG[8].mix.mortar);
assert.equal(game.WAVE_CONFIG[9].arena.height, 820);
assert.equal(game.WAVE_CONFIG[9].hazard.type, "salvage");
assert.ok(game.WAVE_CONFIG[9].hazard.coreHp > 0);
assert.ok(game.WAVE_CONFIG[9].hazard.salvageScrap > 0);
assert.ok(game.WAVE_CONFIG[9].hazard.salvageBurstCount >= 4);
assert.ok(game.WAVE_CONFIG[9].mix.warden > game.WAVE_CONFIG[9].mix.brute);
assert.ok(game.WAVE_CONFIG[9].mix.mortar > 0);
assert.equal(game.WAVE_CONFIG[10].arena.height, 820);
assert.equal(game.WAVE_CONFIG[10].hazard.type, "drift");
assert.ok(game.WAVE_CONFIG[10].hazard.driftSpeed > 0);
assert.ok(game.WAVE_CONFIG[10].mix.warden < game.WAVE_CONFIG[9].mix.warden);
assert.ok(game.WAVE_CONFIG[10].mix.shrike > game.WAVE_CONFIG[9].mix.shrike);
assert.ok(game.WAVE_CONFIG[10].mix.mortar > 0);
assert.equal(game.WAVE_CONFIG[11].arena.width, 1440);
assert.ok(game.WAVE_CONFIG[11].spawnBudget > game.WAVE_CONFIG[10].spawnBudget);
assert.equal(game.WAVE_CONFIG[11].hazard.type, "relay");
assert.ok(game.WAVE_CONFIG[11].hazard.count >= 4);
assert.ok(game.WAVE_CONFIG[11].hazard.relayWidth > 0);
assert.ok(game.WAVE_CONFIG[11].activeCap > game.WAVE_CONFIG[9].activeCap);
assert.ok(game.WAVE_CONFIG[11].mix.mortar > 0);
assert.ok(game.WAVE_CONFIG[11].mix.mortar > game.WAVE_CONFIG[11].mix.shrike - 0.05);
const predatorBaitBuild = game.createInitialBuild("scrap_pact");
const predatorBaitChoice = game.createPredatorBaitChoice(predatorBaitBuild, 9);
assert.ok(predatorBaitChoice);
assert.equal(predatorBaitChoice.action, "predator_bait");
const predatorBaitRun = {
  build: predatorBaitBuild,
  resources: { scrap: 0 },
  stats: { scrapCollected: 0, scrapSpent: 0 },
  player: { hp: 100, maxHp: 100, heat: 24, overheated: false },
};
game.applyForgeChoice(predatorBaitRun, predatorBaitChoice);
assert.equal(predatorBaitRun.build.predatorBaitCharges, 1);
const mirrorLateBuild = game.createInitialBuild("relay_oath");
mirrorLateBuild.bastionDoctrineId = "mirror_hunt";
const mirrorWaveNine = game.resolveWaveConfig(8, mirrorLateBuild);
const bastionLateBuild = game.createInitialBuild("scrap_pact");
bastionLateBuild.bastionDoctrineId = "kiln_bastion";
const bastionWaveNine = game.resolveWaveConfig(8, bastionLateBuild);
const bastionWaveTen = game.resolveWaveConfig(9, bastionLateBuild);
const bastionWaveEleven = game.resolveWaveConfig(10, bastionLateBuild);
const bastionWaveTwelve = game.resolveWaveConfig(11, bastionLateBuild);
const artilleryLateBuild = game.createInitialBuild("rail_zeal");
artilleryLateBuild.bastionDoctrineId = "storm_artillery";
const artilleryWaveTen = game.resolveWaveConfig(9, artilleryLateBuild);
const artilleryWaveEleven = game.resolveWaveConfig(10, artilleryLateBuild);
const artilleryWaveTwelve = game.resolveWaveConfig(11, artilleryLateBuild);
const mirrorWaveTen = game.resolveWaveConfig(9, mirrorLateBuild);
const mirrorWaveEleven = game.resolveWaveConfig(10, mirrorLateBuild);
const mirrorWaveTwelve = game.resolveWaveConfig(11, mirrorLateBuild);
assert.equal(mirrorWaveNine.label, game.WAVE_CONFIG[8].label);
assert.equal(mirrorWaveTen.label, game.WAVE_CONFIG[9].label);
assert.equal(mirrorWaveEleven.label, game.WAVE_CONFIG[10].label);
assert.equal(mirrorWaveTwelve.label, game.WAVE_CONFIG[11].label);
assert.equal(JSON.stringify(mirrorWaveNine), JSON.stringify(bastionWaveNine));
assert.equal(JSON.stringify(mirrorWaveTen), JSON.stringify(bastionWaveTen));
assert.equal(JSON.stringify(mirrorWaveEleven), JSON.stringify(bastionWaveEleven));
assert.equal(JSON.stringify(mirrorWaveTwelve), JSON.stringify(bastionWaveTwelve));
assert.equal(JSON.stringify(artilleryWaveTen), JSON.stringify(bastionWaveTen));
assert.equal(JSON.stringify(artilleryWaveEleven), JSON.stringify(bastionWaveEleven));
assert.equal(JSON.stringify(artilleryWaveTwelve), JSON.stringify(bastionWaveTwelve));
assert.equal(mirrorWaveNine.hazard.type || "pulse", "pulse");
assert.equal(mirrorWaveTen.hazard.type, "salvage");
assert.equal(mirrorWaveEleven.hazard.type, "drift");
assert.equal(mirrorWaveTwelve.hazard.type, "relay");
assert.ok(mirrorWaveNine.mix.skimmer > mirrorWaveNine.mix.warden);
assert.ok(mirrorWaveNine.mix.lancer > mirrorWaveNine.mix.mortar);
assert.ok(mirrorWaveNine.mix.skimmer > mirrorWaveNine.mix.shrike);
assert.ok(mirrorWaveTen.hazard.salvageScrap >= game.WAVE_CONFIG[9].hazard.salvageScrap);
assert.ok(mirrorWaveEleven.mix.shrike > mirrorWaveEleven.mix.mortar);
assert.ok(mirrorWaveEleven.hazard.driftSpeed > game.WAVE_CONFIG[10].hazard.driftSpeed);
assert.ok(mirrorWaveTwelve.mix.warden > mirrorWaveEleven.mix.warden);
assert.ok(mirrorWaveTwelve.activeCap > game.WAVE_CONFIG[11].activeCap);
assert.ok(mirrorWaveTwelve.hazard.count >= game.WAVE_CONFIG[11].hazard.count);
const afterburnTransitionRun = {
  build: game.createInitialBuild("scrap_pact"),
  phase: "forge",
  pendingFinalForge: true,
  postCapstone: { active: false, stageIndex: 0, total: 0 },
  waveIndex: game.MAX_WAVES - 1,
  wave: null,
  arena: { width: 1440, height: 820 },
  waveClearTimer: 0,
  enemies: [{ type: "elite" }],
  drops: [{ kind: "scrap" }],
  hazards: [{ type: "relay" }],
  projectiles: [{ owner: "enemy" }],
  particles: [{ color: "#fff" }],
  player: {
    x: 240,
    y: 180,
    heat: 32,
    overheated: true,
    fireCooldown: 1,
    dashMax: 2,
    dashCharges: 0,
    dashCooldownTimer: 2,
  },
};
const afterburnTransition = game.applyFinalCashoutTransition(afterburnTransitionRun);
assert.equal(afterburnTransitionRun.phase, "wave");
assert.equal(afterburnTransitionRun.pendingFinalForge, false);
assert.equal(afterburnTransitionRun.waveIndex, game.MAX_WAVES);
assert.equal(afterburnTransitionRun.postCapstone.active, true);
assert.equal(afterburnTransitionRun.postCapstone.total, 7);
assert.ok(afterburnTransitionRun.wave.finaleMutation);
assert.equal(afterburnTransitionRun.wave.finaleMutation.deployed, false);
assert.ok(afterburnTransitionRun.wave.finaleMutation.choices.length >= 1);
assert.ok(afterburnTransitionRun.wave.activeCap >= game.WAVE_CONFIG[9].activeCap);
assert.ok(afterburnTransition.clearProjectiles);
const afterburnOne = game.createPostCapstoneWave(0, afterburnTransitionRun.build);
const afterburnTwo = game.createPostCapstoneWave(1, afterburnTransitionRun.build);
const afterburnThree = game.createPostCapstoneWave(2, afterburnTransitionRun.build);
const afterburnFour = game.createPostCapstoneWave(3, afterburnTransitionRun.build);
const afterburnFive = game.createPostCapstoneWave(4, afterburnTransitionRun.build);
const afterburnSix = game.createPostCapstoneWave(5, afterburnTransitionRun.build);
const afterburnSeven = game.createPostCapstoneWave(6, afterburnTransitionRun.build);
assert.equal(afterburnOne.hazard.type, "relay");
assert.equal(afterburnTwo.hazard.type, "salvage");
assert.equal(afterburnThree.hazard.type, "territory");
assert.equal(afterburnFour.hazard.type || "pulse", "pulse");
assert.equal(afterburnFive.hazard.type, "relay");
assert.equal(afterburnSix.hazard.type, "drift");
assert.equal(afterburnSeven.hazard.type, "territory");
assert.ok(afterburnFour.mix.skimmer > afterburnFour.mix.warden);
assert.ok(afterburnFour.mix.lancer > afterburnFour.mix.mortar);
assert.ok(afterburnTwo.hazard.salvageScrap > game.WAVE_CONFIG[9].hazard.salvageScrap);
assert.ok(afterburnTwo.mix.shrike > afterburnOne.mix.shrike);
assert.ok(afterburnThree.mix.brute > afterburnTwo.mix.brute);
assert.ok(afterburnFour.spawnBudget > afterburnTwo.spawnBudget);
assert.ok(afterburnFive.spawnBudget > afterburnThree.spawnBudget);
assert.ok(afterburnSix.mix.shrike > afterburnFive.mix.shrike);
assert.ok(afterburnSeven.spawnBudget > afterburnFive.spawnBudget);
assert.ok(afterburnSeven.activeCap > afterburnFive.activeCap);
assert.equal(afterburnSeven.completesRun, true);
assert.ok(afterburnOne.combatCache);
assert.ok(afterburnTwo.combatCache);
assert.equal(afterburnSeven.combatCache, null);
assert.ok(
  afterburnOne.combatCache.choices.some((choice) => choice && choice.action === "risk_mutation")
);
const systemsForgeBuild = game.createInitialBuild("scrap_pact");
const architectureChoices = game.buildArchitectureDraftChoices(systemsForgeBuild);
assert.equal(architectureChoices.length, 3);
assert.ok(architectureChoices.every((choice) => choice.action === "architecture_forecast"));
const architecturePreviewRun = {
  build: systemsForgeBuild,
  resources: { scrap: 0 },
  stats: { scrapCollected: 0, scrapSpent: 0 },
  player: { hp: 100, maxHp: 100, heat: 0, overheated: false },
};
game.applyForgeChoice(architecturePreviewRun, architectureChoices[0]);
assert.equal(architecturePreviewRun.build.bastionDoctrineId, null);
assert.equal(architecturePreviewRun.build.architectureForecastId, architectureChoices[0].doctrineId);
const wave6DoctrineChoices = game.buildBastionDraftChoices(architecturePreviewRun.build, () => 0, 6);
assert.equal(wave6DoctrineChoices.length, 3);
assert.ok(wave6DoctrineChoices.every((choice) => choice.action === "wave6_ascension"));
assert.equal(wave6DoctrineChoices[0].doctrineId, architecturePreviewRun.build.architectureForecastId);
assert.ok(wave6DoctrineChoices.every((choice) => choice.skipNextAdminStop));
assert.ok(wave6DoctrineChoices.every((choice) => choice.systemChoice));
systemsForgeBuild.bastionDoctrineId = "kiln_bastion";
const systemsForgeChoices = game.buildBastionDraftChoices(systemsForgeBuild, () => 0, 6);
const siegePactChoice = systemsForgeChoices.find((choice) => choice.action === "bastion_pact");
assert.ok(siegePactChoice);
assert.equal(siegePactChoice.debtWaves, 3);
assert.match(siegePactChoice.description, /Siege Debt/);
const wave6ChassisPackages = game.buildWave6ChassisBreakpointChoices(systemsForgeBuild, () => 0, 6);
assert.equal(wave6ChassisPackages.length, 3);
assert.equal(
  JSON.stringify(wave6ChassisPackages.map((choice) => choice.chassisId).sort()),
  JSON.stringify(["bulwark_treads", "salvage_winch", "vector_thrusters"])
);
assert.ok(wave6ChassisPackages.every((choice) => choice.skipNextAdminStop));
const initialMaxHpBonus = systemsForgeBuild.maxHpBonus;
const pactRun = {
  build: systemsForgeBuild,
  resources: { scrap: 0 },
  stats: { scrapCollected: 0 },
  player: { hp: 100, maxHp: 100, heat: 10, overheated: false },
};
game.applyForgeChoice(pactRun, siegePactChoice);
assert.equal(pactRun.build.bastionPactDebtWaves, 3);
assert.equal(pactRun.resources.scrap, 56);
assert.equal(pactRun.build.maxHpBonus, initialMaxHpBonus - 22);
const chassisRun = {
  build: game.createInitialBuild("scrap_pact"),
  resources: { scrap: 0 },
  stats: { scrapCollected: 0, scrapSpent: 0 },
  player: { hp: 100, maxHp: 100, heat: 0, overheated: false },
};
const wave6AscensionRun = {
  build: game.createInitialBuild("scrap_pact"),
  resources: { scrap: 0 },
  stats: { scrapCollected: 0, scrapSpent: 0 },
  player: { hp: 100, maxHp: 100, heat: 0, overheated: false },
};
game.applyForgeChoice(wave6AscensionRun, wave6DoctrineChoices[0]);
assert.equal(wave6AscensionRun.build.bastionDoctrineId, wave6DoctrineChoices[0].doctrineId);
assert.ok(wave6AscensionRun.build.wave6ChassisBreakpoint);
assert.ok(wave6AscensionRun.build.supportBayCap >= 3);
assert.equal(wave6AscensionRun.build.chassisId, wave6DoctrineChoices[0].chassisId);
assert.ok(game.shouldSkipOwnershipAdminStop(wave6AscensionRun.build, 9));
chassisRun.build.bastionDoctrineId = "kiln_bastion";
game.applyForgeChoice(chassisRun, wave6ChassisPackages[0]);
assert.ok(chassisRun.build.wave6ChassisBreakpoint);
assert.ok(chassisRun.build.supportBayCap >= 3);
assert.equal(chassisRun.build.chassisId, wave6ChassisPackages[0].chassisId);
assert.ok(game.shouldSkipOwnershipAdminStop(chassisRun.build, 9));
const predatorCacheChoices = game.buildFieldGrantChoices(predatorBaitRun.build, () => 0, 10);
assert.ok(predatorCacheChoices.some((choice) => choice.action === "risk_mutation"));
assert.equal(
  predatorCacheChoices.filter(
    (choice) => choice.action === "predator_bait" || choice.action === "risk_mutation"
  ).length,
  1
);
const riskMutationChoice = predatorCacheChoices.find((choice) => choice.action === "risk_mutation");
const riskMutationRun = {
  build: game.createInitialBuild("scrap_pact"),
  resources: { scrap: 0 },
  stats: { scrapCollected: 0, scrapSpent: 0 },
  player: { hp: 100, maxHp: 100, heat: 20, overheated: false },
};
const baseAfterburnPreview = game.createPostCapstoneWave(1, riskMutationRun.build);
game.applyForgeChoice(riskMutationRun, riskMutationChoice);
assert.equal(riskMutationRun.build.riskMutationLevel, 1);
assert.equal(riskMutationRun.build.riskMutationQueuedLevel, 1);
assert.equal(riskMutationRun.build.illegalOverclockId, "meltdown_cycler");
const taxedAfterburnPreview = game.createPostCapstoneWave(1, riskMutationRun.build);
assert.ok(taxedAfterburnPreview.spawnBudget > baseAfterburnPreview.spawnBudget);
assert.ok(taxedAfterburnPreview.activeCap > baseAfterburnPreview.activeCap);
assert.ok(taxedAfterburnPreview.hazard.count > baseAfterburnPreview.hazard.count);
const riskMutationWeapon = game.computeWeaponStats(riskMutationRun.build);
assert.equal(riskMutationWeapon.riskMutationLevel, 1);
assert.ok(riskMutationWeapon.riskMutationFirePattern);
assert.equal(riskMutationWeapon.illegalOverclockLabel, "Meltdown Cycler");
const secondRiskMutationChoice = game
  .buildFieldGrantChoices(riskMutationRun.build, () => 0, 11)
  .find((choice) => choice.action === "risk_mutation");
assert.ok(secondRiskMutationChoice);
game.applyForgeChoice(riskMutationRun, secondRiskMutationChoice);
assert.equal(riskMutationRun.build.riskMutationLevel, 2);
assert.equal(riskMutationRun.build.illegalOverclockMutationLevel, 1);
assert.match(game.computeWeaponStats(riskMutationRun.build).illegalOverclockTraitLabel, /MOLT 1/);
const lateAscensionBuild = game.createInitialBuild("relay_oath");
lateAscensionBuild.supportBayCap = 3;
lateAscensionBuild.supportSystems = [
  { id: "seeker_array", tier: 1 },
  { id: "volt_drones", tier: 1 },
];
const lateAscensionChoices = game.createLateAscensionChoices(lateAscensionBuild);
assert.equal(lateAscensionChoices.length, 2);
const crownsplitterChoice = lateAscensionChoices.find(
  (choice) => choice.lateAscensionId === "crownsplitter_array"
);
assert.ok(crownsplitterChoice);
const crownsplitterRun = {
  build: lateAscensionBuild,
  resources: { scrap: 0 },
  stats: { scrapCollected: 0, scrapSpent: 0 },
  player: { hp: 100, maxHp: 100, heat: 14, overheated: false },
};
game.applyForgeChoice(crownsplitterRun, crownsplitterChoice);
assert.equal(crownsplitterRun.build.lateAscensionId, "crownsplitter_array");
const crownsplitterWeapon = game.computeWeaponStats(crownsplitterRun.build);
assert.equal(crownsplitterWeapon.lateAscensionLabel, "Crownsplitter Array");
assert.equal(crownsplitterWeapon.lateAscensionFirePattern.kind, "split_wing");
assert.equal(crownsplitterWeapon.lateAscensionFirePattern.offsets.length, 4);
const slagburstBuild = game.createInitialBuild("scrap_pact");
slagburstBuild.supportBayCap = 3;
slagburstBuild.supportSystems = [
  { id: "seeker_array", tier: 1 },
  { id: "volt_drones", tier: 1 },
];
const slagburstChoice = game
  .createLateAscensionChoices(slagburstBuild)
  .find((choice) => choice.lateAscensionId === "slagburst_drive");
assert.ok(slagburstChoice);
const slagburstRun = {
  build: slagburstBuild,
  resources: { scrap: 0 },
  stats: { scrapCollected: 0, scrapSpent: 0 },
  player: { hp: 100, maxHp: 100, heat: 8, overheated: false },
};
game.applyForgeChoice(slagburstRun, slagburstChoice);
const slagburstWeapon = game.computeWeaponStats(slagburstRun.build);
assert.equal(slagburstWeapon.lateAscensionLabel, "Slagburst Drive");
assert.equal(slagburstWeapon.lateAscensionFirePattern.kind, "slag_seed");
assert.equal(slagburstWeapon.lateAscensionFirePattern.count, 2);
const illegalOverclockBuild = game.createInitialBuild("relay_oath");
const illegalOverclockChoices = game.createIllegalOverclockChoices(illegalOverclockBuild);
assert.equal(illegalOverclockChoices.length, 3);
assert.ok(illegalOverclockChoices.every((choice) => choice.action === "illegal_overclock"));
const broadsideChoice = illegalOverclockChoices.find(
  (choice) => choice.illegalOverclockId === "glass_broadside"
);
assert.ok(broadsideChoice);
const broadsideRun = {
  build: illegalOverclockBuild,
  resources: { scrap: 0 },
  stats: { scrapCollected: 0, scrapSpent: 0 },
  player: { hp: 100, maxHp: 100, heat: 32, overheated: false },
};
game.applyForgeChoice(broadsideRun, broadsideChoice);
assert.equal(broadsideRun.build.illegalOverclockId, "glass_broadside");
assert.equal(broadsideRun.build.maxHpBonus, -18);
const broadsideWeapon = game.computeWeaponStats(broadsideRun.build);
assert.equal(broadsideWeapon.illegalOverclockLabel, "Glass Broadside");
assert.equal(broadsideWeapon.illegalOverclockFirePattern.kind, "broadside");
assert.equal(broadsideWeapon.illegalOverclockFirePattern.offsets.length, 2);
const broadsideMutationChoice = game.createIllegalOverclockMutationChoice(broadsideRun.build);
assert.ok(broadsideMutationChoice);
assert.equal(broadsideMutationChoice.mutationLevel, 1);
game.applyForgeChoice(broadsideRun, broadsideMutationChoice);
assert.equal(broadsideRun.build.illegalOverclockMutationLevel, 1);
assert.equal(broadsideRun.build.maxHpBonus, -26);
const mutatedBroadsideWeapon = game.computeWeaponStats(broadsideRun.build);
assert.match(mutatedBroadsideWeapon.illegalOverclockTraitLabel, /MOLT 1/);
assert.equal(mutatedBroadsideWeapon.illegalOverclockFirePattern.offsets.length, 4);
const apexRun = {
  build: game.createInitialBuild("relay_oath"),
  resources: { scrap: 0 },
  stats: { scrapCollected: 0, scrapSpent: 0 },
  player: { hp: 100, maxHp: 100, heat: 18, overheated: false },
};
const apexReward = game.applyApexPredatorMutation(apexRun);
assert.equal(apexReward.nextLevel, 1);
assert.equal(game.getApexMutationLevel(apexRun.build), 1);
const apexWeapon = game.computeWeaponStats(apexRun.build);
assert.equal(apexWeapon.apexMutationLabel, "Predator Molt");
assert.match(apexWeapon.apexMutationTraitLabel, /PRED 1/);
assert.equal(apexWeapon.apexMutationFirePattern.offsets.length, 2);
const apexIllegalRun = {
  build: game.createInitialBuild("relay_oath"),
  resources: { scrap: 0 },
  stats: { scrapCollected: 0, scrapSpent: 0 },
  player: { hp: 100, maxHp: 100, heat: 18, overheated: false },
};
game.applyForgeChoice(
  apexIllegalRun,
  illegalOverclockChoices.find((choice) => choice.illegalOverclockId === "rupture_crown")
);
const apexIllegalReward = game.applyApexPredatorMutation(apexIllegalRun);
assert.equal(apexIllegalReward.nextLevel, 1);
assert.equal(apexIllegalReward.illegalMutationApplied, true);
assert.equal(apexIllegalRun.build.illegalOverclockMutationLevel, 1);
const baseRelayWeapon = game.computeWeaponStats(game.createInitialBuild("relay_oath"));
const cyclerBuild = game.createInitialBuild("relay_oath");
const cyclerRun = {
  build: cyclerBuild,
  resources: { scrap: 0 },
  stats: { scrapCollected: 0, scrapSpent: 0 },
  player: { hp: 100, maxHp: 100, heat: 0, overheated: false },
};
game.applyForgeChoice(
  cyclerRun,
  illegalOverclockChoices.find((choice) => choice.illegalOverclockId === "meltdown_cycler")
);
const cyclerWeapon = game.computeWeaponStats(cyclerBuild);
assert.equal(cyclerWeapon.illegalOverclockLabel, "Meltdown Cycler");
assert.ok(cyclerWeapon.cooldown < baseRelayWeapon.cooldown);
const cyclerMutationChoice = game.createIllegalOverclockMutationChoice(cyclerBuild);
assert.ok(cyclerMutationChoice);
game.applyForgeChoice(cyclerRun, cyclerMutationChoice);
const mutatedCyclerWeapon = game.computeWeaponStats(cyclerBuild);
assert.ok(mutatedCyclerWeapon.cooldown < cyclerWeapon.cooldown);
assert.equal(mutatedCyclerWeapon.illegalOverclockFirePattern.offsets.length, 2);
const artilleryFrameBuild = game.createInitialBuild("rail_zeal");
artilleryFrameBuild.bastionDoctrineId = "storm_artillery";
artilleryFrameBuild.coreId = "lance";
artilleryFrameBuild.doctrineChaseClaimed = true;
assert.equal(game.getDoctrinePursuitCapstoneDef(artilleryFrameBuild).id, "sky_lance_battery");
artilleryFrameBuild.affixes = ["phase_rounds"];
assert.equal(game.getDoctrinePursuitCapstoneDef(artilleryFrameBuild).id, "stormspire_needle");
const artilleryFrameWeapon = game.computeWeaponStats(artilleryFrameBuild);
assert.equal(artilleryFrameWeapon.doctrineFormLabel, "Thunder Rack");
assert.equal(artilleryFrameWeapon.doctrineOnHazardHit.kind, "relay_sever");
assert.equal(artilleryFrameWeapon.doctrineOnHazardHit.burstCount, 1);
artilleryFrameBuild.doctrineCapstoneId = "stormspire_needle";
const artilleryRelayNeedleWeapon = game.computeWeaponStats(artilleryFrameBuild);
assert.equal(artilleryRelayNeedleWeapon.doctrineFormLabel, "Stormspire Needle");
assert.equal(artilleryRelayNeedleWeapon.doctrineOnHazardHit.kind, "relay_sever");
assert.equal(artilleryRelayNeedleWeapon.doctrineOnHazardHit.burstCount, 2);
const kilnFrameBuild = game.createInitialBuild("scrap_pact");
kilnFrameBuild.bastionDoctrineId = "kiln_bastion";
kilnFrameBuild.coreId = "scatter";
const kilnFrameWeapon = game.computeWeaponStats(kilnFrameBuild);
assert.equal(kilnFrameWeapon.doctrineFormLabel, "Kiln Frame");
assert.equal(kilnFrameWeapon.doctrineStage, 1);
assert.equal(kilnFrameWeapon.doctrineFirePattern.kind, "slag_seed");
assert.equal(kilnFrameWeapon.doctrineFirePattern.count, 1);
kilnFrameBuild.doctrineChaseClaimed = true;
const kilnCrucibleWeapon = game.computeWeaponStats(kilnFrameBuild);
assert.equal(kilnCrucibleWeapon.doctrineFormLabel, "Crucible Scatter");
assert.equal(kilnCrucibleWeapon.doctrineStage, 2);
assert.equal(kilnCrucibleWeapon.doctrineFirePattern.kind, "slag_seed");
assert.equal(kilnCrucibleWeapon.doctrineFirePattern.count, 3);
kilnFrameBuild.doctrineCapstoneId = "bulwark_foundry";
const kilnBulwarkWeapon = game.computeWeaponStats(kilnFrameBuild);
assert.equal(kilnBulwarkWeapon.doctrineFormLabel, "Bulwark Furnace");
assert.equal(kilnBulwarkWeapon.doctrineStage, 3);
assert.equal(kilnBulwarkWeapon.doctrineFirePattern.kind, "slag_seed");
assert.equal(kilnBulwarkWeapon.doctrineFirePattern.count, 5);
assert.equal(game.resolveWaveConfig(8, game.createInitialBuild("relay_oath")).label, game.WAVE_CONFIG[8].label);
assert.ok(game.ENEMY_DEFS.warden.hp > game.ENEMY_DEFS.shrike.hp);
assert.ok(game.ENEMY_DEFS.mortar);
assert.ok(game.ENEMY_DEFS.skimmer);
assert.ok(game.ENEMY_DEFS.lancer);
assert.ok(game.ENEMY_DEFS.apex);
assert.ok(game.ENEMY_DEFS.apex.hp > game.ENEMY_DEFS.elite.hp);
assert.ok(game.ENEMY_DEFS.mortar.scrap >= game.ENEMY_DEFS.shrike.scrap);
assert.ok(game.ENEMY_DEFS.mortar.speed < game.ENEMY_DEFS.shrike.speed);
assert.ok(game.ENEMY_DEFS.skimmer.speed > game.ENEMY_DEFS.shrike.speed);
assert.ok(game.ENEMY_DEFS.lancer.hp > game.ENEMY_DEFS.skimmer.hp);
assert.equal(game.createFinalCashoutWave().arena.width, 1440);
const afterburnBuild = game.createInitialBuild("relay_oath");
const afterburnWaveOne = game.createPostCapstoneWave(0, afterburnBuild);
const afterburnWaveThree = game.createPostCapstoneWave(2, afterburnBuild);
assert.ok(afterburnWaveOne.spawnBudget > game.WAVE_CONFIG[9].spawnBudget);
assert.ok(afterburnWaveOne.activeCap > game.WAVE_CONFIG[9].activeCap);
assert.ok(afterburnWaveThree.spawnBudget > afterburnWaveOne.spawnBudget);
assert.ok(afterburnWaveThree.activeCap > afterburnWaveOne.activeCap);
assert.ok(afterburnWaveThree.spawnBudget > game.WAVE_CONFIG[11].spawnBudget);
assert.ok(afterburnWaveThree.activeCap > game.WAVE_CONFIG[11].activeCap);
assert.ok(afterburnWaveThree.timeLeft > afterburnWaveOne.timeLeft);
assert.ok(afterburnWaveOne.hazard.interval < game.WAVE_CONFIG[9].hazard.interval);
assert.ok(afterburnWaveThree.hazard.count >= afterburnWaveOne.hazard.count);
assert.ok(afterburnWaveOne.apexPredator);
assert.ok(afterburnWaveThree.apexPredator.spawnTimer < afterburnWaveOne.apexPredator.spawnTimer);
assert.equal(game.DEFAULT_SIGNATURE_ID, "relay_oath");
assert.equal(
  JSON.stringify(Object.keys(game.SUPPORT_SYSTEM_DEFS).sort()),
  JSON.stringify(["aegis_halo", "ember_ring", "kiln_sentry", "seeker_array", "volt_drones"])
);
assert.equal(
  JSON.stringify(Object.keys(game.CHASSIS_BREAKPOINT_DEFS).sort()),
  JSON.stringify(["bulwark_treads", "salvage_winch", "vector_thrusters"])
);
assert.equal(
  JSON.stringify(Object.keys(game.ILLEGAL_OVERCLOCK_DEFS).sort()),
  JSON.stringify(["glass_broadside", "meltdown_cycler", "rupture_crown"])
);
assert.equal(game.MAX_APEX_MUTATION_LEVEL, 3);

const signatureBuild = game.createInitialBuild("scrap_pact");
assert.equal(signatureBuild.signatureId, "scrap_pact");
assert.equal(signatureBuild.maxHpBonus, 8);
assert.equal(signatureBuild.pickupBonus, 18);
assert.equal(signatureBuild.scrapMultiplier, 1.08);
assert.equal(signatureBuild.supportBayCap, 2);
assert.equal(JSON.stringify(signatureBuild.affixes), JSON.stringify(["salvage_link"]));

const build = game.createInitialBuild("scrap_pact");
build.pendingCores = game.sanitizeBenchCoreIds(build.pendingCores.concat(["lance"]));
assert.equal(
  JSON.stringify(game.sanitizeBenchCoreIds(["scatter", "scatter", "scatter", "scatter", "scatter"])),
  JSON.stringify(["scatter", "scatter", "scatter", "scatter"])
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
assert.equal(choices.length, 4);
assert.equal(
  JSON.stringify(choices.map((choice) => choice.laneLabel).sort()),
  JSON.stringify(["빌드 고정", "생존/경제", "예비", "전환"])
);
assert.ok(choices.some((choice) => choice.laneLabel === "전환" && choice.type === "core"));
assert.ok(choices.some((choice) => choice.laneLabel === "생존/경제"));
assert.ok(choices.every((choice) => typeof choice.verb === "string" || choice.type === "fallback"));
assert.ok(choices.every((choice) => typeof choice.cost === "number"));

const scatterChoice = choices.find((choice) => choice.type === "core" && choice.coreId === "scatter");
assert.ok(scatterChoice);
assert.equal(scatterChoice.benchCopies, 2);
assert.equal(scatterChoice.syncLevel, 2);
assert.ok(scatterChoice.cost < game.CORE_DEFS.scatter.cost);

const directPivotBuild = game.createInitialBuild("scrap_pact");
directPivotBuild.pendingCores = game.sanitizeBenchCoreIds(["scatter"]);
const directPivotChoices = game.buildForgeChoices(directPivotBuild, () => 0, 180);
const directPivotChoice = directPivotChoices.find(
  (choice) =>
    choice.laneLabel === "전환" &&
    choice.type === "core" &&
    choice.coreId !== directPivotBuild.coreId &&
    choice.directOffer
);
assert.ok(directPivotChoice);
assert.equal(directPivotChoice.pivotFuelCoreId, "scatter");
assert.equal(directPivotChoice.pivotFuelCopies, 1);

const scatterFinisherChoice = directPivotChoices.find(
  (choice) => choice.laneLabel === "빌드 고정" && choice.recipeLabel === "Kiln Bloom"
);
assert.ok(scatterFinisherChoice);
assert.equal(scatterFinisherChoice.type, "core");
assert.equal(scatterFinisherChoice.coreId, "scatter");
assert.equal(scatterFinisherChoice.tag, "FINISHER");

const railBuild = game.createInitialBuild("rail_zeal");
railBuild.pendingCores = [];
railBuild.attunedCopies = 4;
const railChoices = game.buildForgeChoices(railBuild, () => 0, 180);
const railFinisherChoice = railChoices.find(
  (choice) => choice.laneLabel === "빌드 고정" && choice.recipeLabel === "Sky Pierce"
);
assert.ok(railFinisherChoice);
assert.equal(railFinisherChoice.type, "affix");
assert.equal(railFinisherChoice.affixId, "phase_rounds");

const prismBuild = game.createInitialBuild("relay_oath");
prismBuild.pendingCores = [];
prismBuild.attunedCopies = 4;
const prismChoices = game.buildForgeChoices(prismBuild, () => 0, 180);
const prismFinisherChoice = prismChoices.find(
  (choice) => choice.laneLabel === "빌드 고정" && choice.recipeLabel === "Prism Cascade"
);
assert.ok(prismFinisherChoice);
assert.equal(prismFinisherChoice.type, "affix");
assert.equal(prismFinisherChoice.affixId, "arc_link");

const midrunChaseBuild = game.createInitialBuild("scrap_pact");
midrunChaseBuild.pendingCores = [];
midrunChaseBuild.attunedCopies = 1;
const genericForgeChoices = game.buildForgeChoices(midrunChaseBuild, () => 0, 180);
assert.ok(!genericForgeChoices.some((choice) => choice.laneLabel === "빌드 고정" && choice.recipeLabel === "Kiln Bloom"));
const waveTwoForgeChoices = game.buildForgeChoices(midrunChaseBuild, () => 0, 180, { nextWave: 2 });
assert.equal(waveTwoForgeChoices.length, 3);
assert.ok(waveTwoForgeChoices.some((choice) => choice.type === "system" && choice.systemId === "kiln_sentry"));
const waveThreeForgeChoices = game.buildForgeChoices(midrunChaseBuild, () => 0, 180, { nextWave: 3 });
const waveThreeEvolutionChoice = waveThreeForgeChoices.find(
  (choice) => choice.laneLabel === "주무장 진화" && choice.type === "evolution"
);
assert.ok(waveThreeEvolutionChoice);
assert.equal(waveThreeEvolutionChoice.coreId, "scatter");
assert.equal(waveThreeEvolutionChoice.evolutionTier, 1);
const midrunForgeFinisherChoice = waveThreeForgeChoices.find(
  (choice) => choice.laneLabel === "빌드 고정" && choice.recipeLabel === "Kiln Bloom"
);
assert.ok(midrunForgeFinisherChoice);
assert.equal(midrunForgeFinisherChoice.type, "core");
assert.equal(midrunForgeFinisherChoice.coreId, "scatter");
assert.equal(midrunForgeFinisherChoice.benchCopies, 0);
assert.equal(midrunForgeFinisherChoice.tag, "FINISHER");
assert.equal(waveThreeForgeChoices.length, 3);
assert.ok(waveThreeForgeChoices.every((choice) => choice.laneLabel !== "보조 시스템"));
assert.ok(waveThreeForgeChoices.every((choice) => choice.laneLabel !== "생존/경제"));
assert.equal(game.shouldUseFieldGrant({ nextWave: 3, finalForge: false }), false);
const architectureDraftChoices = game.buildArchitectureDraftChoices(game.createInitialBuild("relay_oath"));
assert.equal(architectureDraftChoices.length, 3);
assert.ok(architectureDraftChoices.every((choice) => choice.action === "architecture_forecast"));
assert.ok(architectureDraftChoices.every((choice) => choice.cost === 0));
assert.ok(architectureDraftChoices.every((choice) => choice.weaponChoice));
assert.ok(architectureDraftChoices.every((choice) => choice.doctrineCapstoneLabel));
const architectureRun = {
  build: game.createInitialBuild("relay_oath"),
  player: null,
  resources: { scrap: 999 },
  stats: {},
};
game.applyForgeChoice(architectureRun, architectureDraftChoices[0]);
assert.equal(architectureRun.build.bastionDoctrineId, null);
assert.equal(architectureRun.build.architectureForecastId, architectureDraftChoices[0].doctrineId);
assert.equal(architectureRun.build.doctrineChaseClaimed, false);
assert.ok(
  architectureRun.build.upgrades.some((upgrade) => upgrade.startsWith("아키텍처 예고: "))
);
assert.equal(architectureRun.build.coreId, "ricochet");
assert.equal(game.computeWeaponStats(architectureRun.build).evolutionTier, 1);
assert.equal(architectureRun.build.supportSystems.length, 0);
const doctrineChaseChoices = game.buildForgeChoices(
  architectureRun.build,
  () => 0,
  180,
  { nextWave: 4, finalForge: false }
);
const blockedDoctrineChaseChoice = doctrineChaseChoices.find(
  (choice) => choice.type === "utility" && choice.action === "doctrine_chase"
);
assert.equal(blockedDoctrineChaseChoice, undefined);
architectureRun.build.overcommitUnlocked = true;
architectureRun.build.overcommitResolved = true;
const bastionOvercommitChoices = game.buildBastionDraftChoices(
  architectureRun.build,
  () => 0,
  6
);
assert.equal(bastionOvercommitChoices.length, 3);
assert.ok(bastionOvercommitChoices.every((choice) => choice.action === "wave6_ascension"));
const wave6AscensionChoice = bastionOvercommitChoices[0];
assert.ok(wave6AscensionChoice);
game.applyForgeChoice(architectureRun, wave6AscensionChoice);
assert.equal(architectureRun.build.bastionDoctrineId, wave6AscensionChoice.doctrineId);
assert.equal(game.getSupportBayCapacity(architectureRun.build), 3);
assert.equal(architectureRun.build.auxiliaryJunctionLevel, 1);
assert.equal(architectureRun.build.wave6ChassisBreakpoint, true);
assert.equal(architectureRun.build.supportSystems.length, 1);
assert.equal(architectureRun.build.doctrinePursuitCommitted, true);
assert.equal(architectureRun.build.doctrinePursuitProgress, 0);
assert.equal(architectureRun.build.doctrineChaseClaimed, false);
assert.ok(
  architectureRun.build.upgrades.some((upgrade) =>
    upgrade.startsWith("교리 추격 자동 점화:")
  )
);
assert.ok(
  architectureRun.build.upgrades.includes("Chassis Breakpoint: flex bay +1 now, auto Wave 8 uplink")
);
assert.equal(game.shouldSkipOwnershipAdminStop(architectureRun.build, 9), true);
assert.equal(game.unlockLateSupportBay(architectureRun.build), true);
assert.equal(game.getSupportBayCapacity(architectureRun.build), 4);
assert.ok(game.doctrineAllowsSystemInstall(architectureRun.build, "aegis_halo"));
const postChaseChoices = game.buildForgeChoices(
  architectureRun.build,
  () => 0,
  180,
  { nextWave: 5, finalForge: false }
);
assert.ok(!postChaseChoices.some((choice) => choice.type === "utility" && choice.action === "doctrine_chase"));
assert.equal(game.shouldUseFieldGrant({ nextWave: 5, finalForge: false }), false);
assert.equal(game.shouldUseFieldGrant({ nextWave: 9, finalForge: false }), false);
assert.equal(game.shouldUseFieldGrant({ nextWave: 12, finalForge: true }), false);
const bastionDoctrineBuild = game.createInitialBuild("relay_oath");
bastionDoctrineBuild.pendingCores = [];
const bastionDraftChoices = game.buildBastionDraftChoices(bastionDoctrineBuild, () => 0, 6);
assert.equal(bastionDraftChoices.length, 3);
const bastionDoctrineChoice = bastionDraftChoices.find(
  (choice) => choice.action === "wave6_ascension"
);
assert.ok(bastionDoctrineChoice);
assert.equal(bastionDoctrineChoice.title, "Mirror Hunt Ascension");

const catalystBuild = game.createInitialBuild("scrap_pact");
catalystBuild.finisherCatalysts = ["scatter"];
assert.equal(
  game.shouldRunCatalystDraft(
    { nextWave: game.ACT3_CATALYST_DRAFT_WAVE, finalForge: false },
    catalystBuild
  ),
  true
);
const catalystDraftChoices = game.buildCatalystDraftChoices(catalystBuild);
assert.equal(catalystDraftChoices.length, 3);
assert.equal(catalystDraftChoices[0].action, "catalyst_reforge");
assert.equal(catalystDraftChoices[0].cost, 0);
assert.equal(catalystDraftChoices[0].laneLabel, "촉매 점화");
assert.equal(catalystDraftChoices[1].action, "cashout_support");
assert.equal(catalystDraftChoices[1].cost, 0);
assert.equal(catalystDraftChoices[1].laneLabel, "촉매 안정화");
assert.equal(catalystDraftChoices[2].type, "fallback");
catalystBuild.act3CatalystDraftSeen = true;
assert.equal(
  game.shouldRunCatalystDraft(
    { nextWave: game.ACT3_CATALYST_DRAFT_WAVE, finalForge: false },
    catalystBuild
  ),
  false
);
assert.equal(bastionDoctrineChoice.doctrineChoice.title, "Prism Crown");
game.applyForgeChoice(
  { build: bastionDoctrineBuild, player: null, resources: { scrap: 999 }, stats: {} },
  bastionDoctrineChoice
);
assert.equal(bastionDoctrineBuild.bastionDoctrineId, "mirror_hunt");
assert.ok(bastionDoctrineBuild.upgrades.includes("교리 채택: Mirror Hunt Doctrine"));
assert.equal(game.computeWeaponStats(bastionDoctrineBuild).evolutionLabel, "Prism Crown");
const doctrinePrimaryChoices = game.buildForgeChoices(
  bastionDoctrineBuild,
  () => 0.99,
  180,
  { nextWave: 7, finalForge: false }
);
const doctrineCommitChoice = doctrinePrimaryChoices.find(
  (choice) => choice.laneLabel === "빌드 고정"
);
assert.ok(doctrineCommitChoice);
assert.equal(doctrineCommitChoice.modId, "drive_sync");
const doctrineFollowupChoices = game.buildForgeFollowupChoices(
  bastionDoctrineBuild,
  () => 0,
  180,
  { nextWave: 7, finalForge: false },
  doctrineCommitChoice
);
const doctrineInstallSystemIds = doctrineFollowupChoices
  .filter((choice) => choice.type === "system" && choice.systemTier === 1)
  .map((choice) => choice.systemId)
  .sort();
assert.ok(doctrineInstallSystemIds.length >= 1);
assert.ok(
  doctrineInstallSystemIds.every((systemId) => ["seeker_array", "volt_drones"].includes(systemId))
);
assert.ok(
  doctrineFollowupChoices.every(
    (choice) =>
      choice.type !== "system" ||
      choice.systemTier !== 1 ||
      choice.laneLabel === "공세 모듈"
  )
);
const doctrineCapstoneBuild = game.createInitialBuild("relay_oath");
doctrineCapstoneBuild.pendingCores = [];
const mirrorArchitectureChoice = game
  .buildArchitectureDraftChoices(doctrineCapstoneBuild)
  .find((choice) => choice.title === "Mirror Hunt Doctrine");
assert.ok(mirrorArchitectureChoice);
game.applyForgeChoice(
  { build: doctrineCapstoneBuild, player: null, resources: { scrap: 999 }, stats: {} },
  mirrorArchitectureChoice
);
doctrineCapstoneBuild.bastionDoctrineId = "mirror_hunt";
game.applyForgeChoice(
  { build: doctrineCapstoneBuild, player: null, resources: { scrap: 999 }, stats: {} },
  { type: "system", systemId: "volt_drones", systemTier: 1, cost: 0 }
);
const mirrorWaveThreeWeapon = game.computeWeaponStats(doctrineCapstoneBuild);
assert.equal(mirrorWaveThreeWeapon.doctrineFormLabel, "Hunt Frame");
assert.equal(mirrorWaveThreeWeapon.doctrineStage, 1);
assert.equal(
  JSON.stringify(mirrorWaveThreeWeapon.doctrineFirePattern.offsets),
  JSON.stringify([-0.22, 0.22])
);
doctrineCapstoneBuild.doctrineChaseClaimed = true;
const mirrorWaveSevenWeapon = game.computeWeaponStats(doctrineCapstoneBuild);
assert.equal(mirrorWaveSevenWeapon.doctrineFormLabel, "Relay Storm Frame");
assert.equal(mirrorWaveSevenWeapon.doctrineStage, 2);
assert.ok(mirrorWaveSevenWeapon.chain > mirrorWaveThreeWeapon.chain);
assert.ok(mirrorWaveSevenWeapon.cooldown < mirrorWaveThreeWeapon.cooldown);
assert.equal(
  JSON.stringify(mirrorWaveSevenWeapon.doctrineFirePattern.offsets),
  JSON.stringify([-0.34, -0.17, 0, 0.17, 0.34])
);
const doctrineLateArmoryChoices = game.buildForgeChoices(
  doctrineCapstoneBuild,
  () => 0,
  180,
  { nextWave: 9, finalForge: false }
);
const doctrineCapstoneChoice = doctrineLateArmoryChoices.find(
  (choice) => choice.action === "doctrine_capstone"
);
assert.ok(doctrineCapstoneChoice);
assert.equal(doctrineCapstoneChoice.title, "Relay Storm Lattice");
assert.equal(doctrineCapstoneChoice.laneLabel, "Doctrine Apex");
game.applyForgeChoice(
  { build: doctrineCapstoneBuild, player: null, resources: { scrap: 999 }, stats: {} },
  doctrineCapstoneChoice
);
assert.equal(doctrineCapstoneBuild.doctrineCapstoneId, "relay_storm_lattice");
const mirrorCapstoneWeapon = game.computeWeaponStats(doctrineCapstoneBuild);
assert.equal(mirrorCapstoneWeapon.doctrineFormLabel, "Relay Storm Lattice");
assert.equal(mirrorCapstoneWeapon.doctrineStage, 3);
assert.equal(mirrorCapstoneWeapon.doctrineTraitLabel, "칠익 릴레이 벽");
assert.equal(mirrorCapstoneWeapon.doctrineOnHit.kind, "mirror_reave");
assert.equal(
  JSON.stringify(mirrorCapstoneWeapon.doctrineFirePattern.offsets),
  JSON.stringify([-0.42, -0.28, -0.14, 0, 0.14, 0.28, 0.42])
);
const doctrineCapstoneSystemStats = game.computeSupportSystemStats(doctrineCapstoneBuild);
assert.equal(doctrineCapstoneSystemStats.doctrineCapstoneLabel, "Relay Storm Lattice");
assert.ok(doctrineCapstoneSystemStats.statusNote.includes("Relay Storm Lattice"));
const artilleryDoctrineBuild = game.createInitialBuild("rail_zeal");
artilleryDoctrineBuild.pendingCores = [];
const artilleryArchitectureChoice = game
  .buildArchitectureDraftChoices(artilleryDoctrineBuild)
  .find((choice) => choice.title === "Storm Artillery Doctrine");
assert.ok(artilleryArchitectureChoice);
assert.equal(
  artilleryArchitectureChoice.doctrineCapstoneLabel,
  "Sky Lance Battery / Stormspire Needle"
);
game.applyForgeChoice(
  { build: artilleryDoctrineBuild, player: null, resources: { scrap: 999 }, stats: {} },
  artilleryArchitectureChoice
);
artilleryDoctrineBuild.bastionDoctrineId = "storm_artillery";
const artilleryWaveThreeWeapon = game.computeWeaponStats(artilleryDoctrineBuild);
assert.equal(artilleryWaveThreeWeapon.evolutionLabel, "Twin Spine");
assert.equal(artilleryWaveThreeWeapon.doctrineFormLabel, "Siege Frame");
assert.equal(artilleryWaveThreeWeapon.doctrineTraitLabel, "외곽 공성선");
assert.equal(
  JSON.stringify(artilleryWaveThreeWeapon.doctrineFirePattern.offsets),
  JSON.stringify([-0.22, 0.22])
);
const artilleryChaseChoice = game
  .buildBastionDraftChoices(
    Object.assign(artilleryDoctrineBuild, { overcommitUnlocked: true, overcommitResolved: true }),
    () => 0,
    8
  )
  .find((choice) => choice.action === "doctrine_chase");
assert.ok(artilleryChaseChoice);
game.applyForgeChoice(
  { build: artilleryDoctrineBuild, player: null, resources: { scrap: 999 }, stats: {} },
  artilleryChaseChoice
);
const artilleryWaveFiveWeapon = game.computeWeaponStats(artilleryDoctrineBuild);
assert.equal(artilleryDoctrineBuild.doctrinePursuitCommitted, true);
assert.equal(artilleryDoctrineBuild.doctrinePursuitProgress, 0);
assert.equal(artilleryWaveFiveWeapon.doctrineFormLabel, "Siege Frame");
assert.equal(artilleryWaveFiveWeapon.doctrineStage, 1);
assert.equal(artilleryWaveFiveWeapon.chain, 1);
assert.equal(
  JSON.stringify(artilleryWaveFiveWeapon.doctrineFirePattern.offsets),
  JSON.stringify([-0.22, 0.22])
);
artilleryDoctrineBuild.doctrineChaseClaimed = true;
const artilleryWaveSevenWeapon = game.computeWeaponStats(artilleryDoctrineBuild);
assert.equal(artilleryWaveSevenWeapon.doctrineFormLabel, "Thunder Rack");
assert.equal(artilleryWaveSevenWeapon.doctrineStage, 2);
assert.equal(
  JSON.stringify(artilleryWaveSevenWeapon.doctrineFirePattern.offsets),
  JSON.stringify([-0.3, -0.12, 0.12, 0.3])
);
const artilleryLateArmoryChoices = game.buildForgeChoices(
  artilleryDoctrineBuild,
  () => 0,
  180,
  { nextWave: 9, finalForge: false }
);
const artilleryCapstoneChoices = artilleryLateArmoryChoices.filter(
  (choice) => choice.action === "doctrine_capstone"
);
assert.equal(artilleryCapstoneChoices.length, 0);
const artilleryAfterburnWave = game.createPostCapstoneWave(0, artilleryDoctrineBuild);
assert.ok(artilleryAfterburnWave.afterburnAscension);
assert.equal(artilleryAfterburnWave.afterburnAscension.choices.length, 2);
assert.ok(artilleryAfterburnWave.finaleMutation);
const batteryCapstoneChoice = artilleryAfterburnWave.afterburnAscension.choices.find(
  (choice) => choice.doctrineCapstoneId === "sky_lance_battery"
);
const needleCapstoneChoice = artilleryAfterburnWave.afterburnAscension.choices.find(
  (choice) => choice.doctrineCapstoneId === "stormspire_needle"
);
assert.ok(batteryCapstoneChoice);
assert.ok(needleCapstoneChoice);
game.applyForgeChoice(
  { build: artilleryDoctrineBuild, player: null, resources: { scrap: 999 }, stats: {} },
  batteryCapstoneChoice
);
const artilleryWaveNineWeapon = game.computeWeaponStats(artilleryDoctrineBuild);
const artilleryBatteryPlayer = game.computePlayerStats(artilleryDoctrineBuild);
assert.equal(artilleryWaveNineWeapon.doctrineFormLabel, "Sky Lance Battery");
assert.equal(artilleryWaveNineWeapon.doctrineStage, 3);
assert.ok(artilleryWaveNineWeapon.cooldown < artilleryWaveSevenWeapon.cooldown);
assert.ok(artilleryWaveNineWeapon.chainRange > artilleryWaveSevenWeapon.chainRange);
assert.equal(artilleryBatteryPlayer.dashMax, 3);
assert.ok(artilleryBatteryPlayer.moveSpeed > 248);
assert.equal(
  JSON.stringify(artilleryWaveNineWeapon.doctrineFirePattern.offsets),
  JSON.stringify([-0.36, -0.22, -0.08, 0.08, 0.22, 0.36])
);
const artilleryNeedleBuild = game.createInitialBuild("rail_zeal");
artilleryNeedleBuild.pendingCores = [];
const artilleryNeedleArchitectureChoice = game
  .buildArchitectureDraftChoices(artilleryNeedleBuild)
  .find((choice) => choice.title === "Storm Artillery Doctrine");
assert.ok(artilleryNeedleArchitectureChoice);
game.applyForgeChoice(
  { build: artilleryNeedleBuild, player: null, resources: { scrap: 999 }, stats: {} },
  artilleryNeedleArchitectureChoice
);
artilleryNeedleBuild.doctrineChaseClaimed = true;
game.applyForgeChoice(
  { build: artilleryNeedleBuild, player: null, resources: { scrap: 999 }, stats: {} },
  needleCapstoneChoice
);
const artilleryNeedleWeapon = game.computeWeaponStats(artilleryNeedleBuild);
assert.equal(artilleryNeedleWeapon.doctrineFormLabel, "Stormspire Needle");
assert.equal(artilleryNeedleWeapon.doctrineStage, 3);
assert.ok(artilleryNeedleWeapon.damage > artilleryWaveNineWeapon.damage);
assert.ok(artilleryNeedleWeapon.pierce > artilleryWaveNineWeapon.pierce);
assert.equal(artilleryNeedleWeapon.doctrineOnHit.kind, "stormspire_branch");
assert.equal(
  JSON.stringify(artilleryNeedleWeapon.doctrineFirePattern.offsets),
  JSON.stringify([-0.08, 0.08])
);
const recurringFinaleBuild = game.createInitialBuild("relay_oath");
const afterburnStageOne = game.createPostCapstoneWave(0, recurringFinaleBuild);
const afterburnStageTwo = game.createPostCapstoneWave(1, recurringFinaleBuild);
assert.ok(afterburnStageOne.finaleMutation);
assert.ok(afterburnStageTwo.finaleMutation);
assert.equal(
  afterburnStageOne.finaleMutation.choices.length,
  afterburnStageTwo.finaleMutation.choices.length
);
const recurringFinaleChoice = afterburnStageOne.finaleMutation.choices.find(
  (choice) => choice.action === "cashout_support" || choice.action === "cashout_failsoft"
);
assert.ok(recurringFinaleChoice);
game.applyForgeChoice(
  { build: recurringFinaleBuild, player: null, resources: { scrap: 999 }, stats: {} },
  recurringFinaleChoice
);
const lockedAfterburnStage = game.createPostCapstoneWave(1, recurringFinaleBuild);
assert.equal(lockedAfterburnStage.finaleMutation, null);
const fortressDoctrineBuild = game.createInitialBuild("scrap_pact");
fortressDoctrineBuild.pendingCores = [];
const fortressDoctrineChoice = game
  .buildBastionDraftChoices(fortressDoctrineBuild, () => 0, 6)
  .find((choice) => choice.doctrineId === "kiln_bastion");
assert.ok(fortressDoctrineChoice);
game.applyForgeChoice(
  { build: fortressDoctrineBuild, player: null, resources: { scrap: 999 }, stats: {} },
  fortressDoctrineChoice
);
const fortressFollowupChoices = game.buildForgeFollowupChoices(
  fortressDoctrineBuild,
  () => 0,
  180,
  { nextWave: 7, finalForge: false },
  fortressDoctrineChoice.doctrineChoice
);
const fortressInstallSystemIds = fortressFollowupChoices
  .filter((choice) => choice.type === "system" && choice.systemTier === 1)
  .map((choice) => choice.systemId)
  .sort();
assert.ok(fortressInstallSystemIds.length >= 1);
assert.ok(fortressInstallSystemIds.includes("kiln_sentry"));
assert.ok(
  fortressInstallSystemIds.every((systemId) => ["kiln_sentry", "aegis_halo"].includes(systemId))
);
assert.ok(!fortressInstallSystemIds.includes("seeker_array"));
assert.ok(!fortressInstallSystemIds.includes("volt_drones"));
const fieldGrantBuild = game.createInitialBuild("relay_oath");
fieldGrantBuild.pendingCores = [];
const fieldGrantChoices = game.buildFieldGrantChoices(fieldGrantBuild, () => 0, 4);
assert.ok(fieldGrantChoices.length >= 2);
assert.ok(fieldGrantChoices.length <= 3);
assert.ok(fieldGrantChoices.every((choice) => ["evolution", "system", "affix", "mod", "fallback"].includes(choice.type)));
assert.ok(fieldGrantChoices.every((choice) => choice.fieldGrant === true));
assert.ok(fieldGrantChoices.every((choice) => choice.type !== "core"));
assert.ok(fieldGrantChoices.every((choice) => choice.type !== "utility"));
assert.ok(fieldGrantChoices.some((choice) => choice.type === "fallback" && choice.cost === 0));
assert.ok(
  fieldGrantChoices
    .filter((choice) => choice.type !== "fallback")
    .every((choice) => choice.cost >= 10 && choice.originalCost > choice.cost)
);

const evolutionBuild = game.createInitialBuild("relay_oath");
const evolutionChoice = game.buildForgeChoices(evolutionBuild, () => 0, 180, { nextWave: 3 }).find(
  (choice) => choice.type === "evolution"
);
assert.ok(evolutionChoice);
game.applyForgeChoice(
  { build: evolutionBuild, player: null, resources: { scrap: 999 }, stats: {} },
  evolutionChoice
);
const evolvedWeapon = game.computeWeaponStats(evolutionBuild);
assert.equal(evolvedWeapon.evolutionTier, 1);
assert.equal(evolvedWeapon.evolutionLabel, "Prism Crown");
assert.equal(evolvedWeapon.evolutionTraitLabel, "삼중 분광탄");
assert.equal(JSON.stringify(evolvedWeapon.evolutionFirePattern.offsets), JSON.stringify([0]));
const evolutionChoiceTierTwo = game.buildForgeChoices(evolutionBuild, () => 0, 180, { nextWave: 4 }).find(
  (choice) => choice.type === "evolution"
);
assert.ok(evolutionChoiceTierTwo);
assert.equal(evolutionChoiceTierTwo.evolutionTier, 2);
game.applyForgeChoice(
  { build: evolutionBuild, player: null, resources: { scrap: 999 }, stats: {} },
  evolutionChoiceTierTwo
);
const evolutionChoiceTierThree = game.buildForgeChoices(evolutionBuild, () => 0, 180, { nextWave: 5 }).find(
  (choice) => choice.type === "evolution"
);
assert.ok(evolutionChoiceTierThree);
assert.equal(evolutionChoiceTierThree.evolutionTier, 3);
game.applyForgeChoice(
  { build: evolutionBuild, player: null, resources: { scrap: 999 }, stats: {} },
  evolutionChoiceTierThree
);
const apexEvolvedWeapon = game.computeWeaponStats(evolutionBuild);
assert.equal(apexEvolvedWeapon.evolutionTier, 3);
assert.equal(apexEvolvedWeapon.evolutionLabel, "Mirror Cathedral");
assert.equal(apexEvolvedWeapon.evolutionTraitLabel, "칠중 분광탄");
assert.equal(
  JSON.stringify(apexEvolvedWeapon.evolutionFirePattern.offsets),
  JSON.stringify([-0.28, -0.18, -0.08, 0.08, 0.18, 0.28])
);

const scatterEvolutionBuild = game.createInitialBuild("scrap_pact");
scatterEvolutionBuild.pendingCores = [];
const scatterEvolutionChoice = game
  .buildForgeChoices(scatterEvolutionBuild, () => 0, 180, { nextWave: 3 })
  .find((choice) => choice.type === "evolution");
assert.ok(scatterEvolutionChoice);
game.applyForgeChoice(
  { build: scatterEvolutionBuild, player: null, resources: { scrap: 999 }, stats: {} },
  scatterEvolutionChoice
);
const scatterEvolvedWeapon = game.computeWeaponStats(scatterEvolutionBuild);
assert.equal(scatterEvolvedWeapon.evolutionLabel, "Cinder Mines");
assert.equal(scatterEvolvedWeapon.evolutionTraitLabel, "용광 지뢰 x1");
assert.equal(scatterEvolvedWeapon.evolutionFirePattern.kind, "slag_seed");
assert.equal(scatterEvolvedWeapon.evolutionFirePattern.count, 1);
assert.ok(scatterEvolvedWeapon.evolutionFirePattern.poolRadius > 50);

const systemRun = {
  build: midrunChaseBuild,
  player: null,
  resources: { scrap: 999 },
  stats: {},
};
const packageBuild = game.createInitialBuild("relay_oath");
packageBuild.pendingCores = [];
const packageWaveThreeChoices = game.buildForgeChoices(packageBuild, () => 0, 180, { nextWave: 3 });
const packagePrimaryChoice = packageWaveThreeChoices.find(
  (choice) =>
    choice.laneLabel === "주무장 진화" ||
    choice.laneLabel === "빌드 고정" ||
    choice.laneLabel === "전환"
);
assert.ok(packagePrimaryChoice);
assert.equal(
  game.shouldOpenForgePackage(
    {
      build: packageBuild,
      pendingFinalForge: false,
      waveIndex: 1,
    },
    packagePrimaryChoice
  ),
  true
);
game.applyForgeChoice(
  { build: packageBuild, player: null, resources: { scrap: 999 }, stats: {} },
  packagePrimaryChoice
);
const packageFollowupChoices = game.buildForgeFollowupChoices(
  packageBuild,
  () => 0,
  180 - packagePrimaryChoice.cost,
  { nextWave: 3, finalForge: false },
  packagePrimaryChoice
);
assert.ok(packageFollowupChoices.length >= 1);
assert.ok(
  packageFollowupChoices.every(
    (choice) =>
      choice.laneLabel === "공세 모듈" ||
      choice.laneLabel === "보조 시스템" ||
      choice.laneLabel === "생존/경제"
  )
);
const packageFollowupSystems = packageFollowupChoices
  .filter((choice) => choice.laneLabel === "보조 시스템")
  .map((choice) => choice.systemId)
  .sort();
assert.ok(packageFollowupSystems.length >= 2);
assert.ok(packageFollowupSystems.includes("kiln_sentry"));
assert.ok(packageFollowupSystems.includes("aegis_halo") || packageFollowupSystems.includes("ember_ring"));
const firstOrbitalInstallChoice = packageFollowupChoices.find(
  (choice) =>
    choice.laneLabel === "보조 시스템" &&
    choice.type === "system" &&
    choice.systemId !== "kiln_sentry"
);
assert.ok(firstOrbitalInstallChoice);
game.applyForgeChoice(
  { build: packageBuild, player: null, resources: { scrap: 999 }, stats: {} },
  firstOrbitalInstallChoice
);
const firstOrbitalTierOne = game.computeSupportSystemStats(packageBuild);
assert.equal(firstOrbitalTierOne.orbitCount, 1);
assert.equal(firstOrbitalTierOne.deployCount, 0);
assert.equal(
  game.shouldOpenForgePackage(
    {
      build: game.createInitialBuild("relay_oath"),
      pendingFinalForge: false,
      waveIndex: 0,
    },
    packagePrimaryChoice
  ),
  false
);

const aegisBuild = game.createInitialBuild("relay_oath");
aegisBuild.pendingCores = [];
const aegisInstallChoices = game.buildForgeFollowupChoices(
  aegisBuild,
  () => 0.99,
  180,
  { nextWave: 3, finalForge: false },
  packagePrimaryChoice
);
const aegisInstallSystemIds = aegisInstallChoices
  .filter((choice) => choice.laneLabel === "보조 시스템")
  .map((choice) => choice.systemId)
  .sort();
assert.ok(aegisInstallSystemIds.length >= 2);
assert.ok(aegisInstallSystemIds.includes("aegis_halo"));
const sentryBuild = game.createInitialBuild("relay_oath");
sentryBuild.pendingCores = [];
const sentryInstallChoice = game.buildForgeChoices(
  sentryBuild,
  () => 0,
  180,
  { nextWave: 2, finalForge: false }
).find((choice) => choice.type === "system" && choice.systemId === "kiln_sentry");
assert.ok(sentryInstallChoice);
assert.equal(sentryInstallChoice.laneLabel, "보조 시스템");
game.applyForgeChoice(
  { build: sentryBuild, player: null, resources: { scrap: 999 }, stats: {} },
  sentryInstallChoice
);
const sentryTierOne = game.computeSupportSystemStats(sentryBuild);
assert.equal(sentryTierOne.orbitCount, 0);
assert.equal(sentryTierOne.deployCount, 1);
assert.equal(sentryTierOne.renderShape, "turret");
game.applyForgeChoice(
  { build: sentryBuild, player: null, resources: { scrap: 999 }, stats: {} },
  { type: "system", systemId: "aegis_halo", systemTier: 1 }
);
const sentryTierTwoChoice = game
  .buildForgeFollowupChoices(sentryBuild, () => 0, 180, { nextWave: 4, finalForge: false }, packagePrimaryChoice)
  .find((choice) => choice.type === "system" && choice.systemId === "kiln_sentry");
assert.ok(sentryTierTwoChoice);
assert.equal(sentryTierTwoChoice.systemTier, 2);
game.applyForgeChoice(
  { build: sentryBuild, player: null, resources: { scrap: 999 }, stats: {} },
  sentryTierTwoChoice
);
const sentryTierTwo = game.computeSupportSystemStats(sentryBuild);
assert.equal(sentryTierTwo.deployCount, 2);
assert.ok(sentryTierTwo.systems[0].deployShotRange > sentryTierOne.systems[0].deployShotRange);
assert.ok(sentryTierTwo.systems[0].deployBurstCount > sentryTierOne.systems[0].deployBurstCount);
const aegisInstallChoice = aegisInstallChoices.find(
  (choice) => choice.laneLabel === "보조 시스템" && choice.type === "system" && choice.systemId === "aegis_halo"
);
assert.ok(aegisInstallChoice);
assert.equal(aegisInstallChoice.systemId, "aegis_halo");
assert.equal(aegisInstallChoice.systemTier, 1);
game.applyForgeChoice(
  { build: aegisBuild, player: null, resources: { scrap: 999 }, stats: {} },
  aegisInstallChoice
);
const aegisTierOne = game.computeSupportSystemStats(aegisBuild);
assert.equal(aegisTierOne.orbitCount, 1);
assert.equal(aegisTierOne.shotCooldown, 0);
assert.ok(aegisTierOne.interceptRange > 0);
assert.equal(aegisTierOne.interceptPulseDamage, 0);

const aegisUpgradeChoices = game.buildForgeFollowupChoices(
  aegisBuild,
  () => 0,
  180,
  { nextWave: 4, finalForge: false },
  packagePrimaryChoice
);
assert.equal(
  JSON.stringify(aegisUpgradeChoices.filter((choice) => choice.laneLabel === "공세 모듈").map((choice) => choice.systemId).sort()),
  JSON.stringify(["seeker_array"])
);
const secondSupportBayChoice = aegisUpgradeChoices.find(
  (choice) =>
    choice.laneLabel === "보조 시스템" &&
    choice.type === "system" &&
    choice.systemId !== "aegis_halo"
);
assert.ok(secondSupportBayChoice);
assert.equal(secondSupportBayChoice.systemTier, 1);
game.applyForgeChoice(
  { build: aegisBuild, player: null, resources: { scrap: 999 }, stats: {} },
  secondSupportBayChoice
);
const aegisTierTwoChoice = game
  .buildForgeFollowupChoices(aegisBuild, () => 0, 180, { nextWave: 6, finalForge: false }, packagePrimaryChoice)
  .find(
    (choice) =>
      choice.laneLabel === "보조 시스템" &&
      choice.type === "system" &&
      choice.systemId === "aegis_halo"
  );
assert.ok(aegisTierTwoChoice);
assert.equal(aegisTierTwoChoice.systemTier, 2);
game.applyForgeChoice(
  { build: aegisBuild, player: null, resources: { scrap: 999 }, stats: {} },
  aegisTierTwoChoice
);
const aegisTierTwo = game.computeSupportSystemStats(aegisBuild);
assert.ok(aegisTierTwo.orbitCount >= 2);
assert.ok(aegisTierTwo.interceptRange > aegisTierOne.interceptRange);
assert.ok(aegisTierTwo.interceptPulseDamage > 0);
const aegisTierThreeChoice = game
  .buildForgeFollowupChoices(aegisBuild, () => 0, 180, { nextWave: 7, finalForge: false }, packagePrimaryChoice)
  .find(
    (choice) =>
      choice.laneLabel === "보조 시스템" &&
      choice.type === "system" &&
      choice.systemId === "aegis_halo"
  );
assert.ok(aegisTierThreeChoice);
assert.equal(aegisTierThreeChoice.systemTier, 3);
game.applyForgeChoice(
  { build: aegisBuild, player: null, resources: { scrap: 999 }, stats: {} },
  aegisTierThreeChoice
);
const aegisTierThree = game.computeSupportSystemStats(aegisBuild);
assert.ok(aegisTierThree.orbitCount > aegisTierTwo.orbitCount);
assert.ok(aegisTierThree.interceptRange > aegisTierTwo.interceptRange);
assert.ok(aegisTierThree.interceptPulseRadius > aegisTierTwo.interceptPulseRadius);

const actTwoModuleBuild = game.createInitialBuild("relay_oath");
actTwoModuleBuild.pendingCores = [];
const actBreakArmoryChoices = game.buildForgeChoices(
  actTwoModuleBuild,
  () => 0,
  180,
  { nextWave: 5, finalForge: false }
);
assert.equal(actBreakArmoryChoices.length, 6);
assert.ok(actBreakArmoryChoices.some((choice) => choice.laneLabel === "주무장 진화"));
assert.ok(actBreakArmoryChoices.some((choice) => choice.laneLabel === "공세 모듈"));
assert.ok(actBreakArmoryChoices.some((choice) => choice.laneLabel === "방호/유틸 차체"));
assert.ok(actBreakArmoryChoices.some((choice) => choice.laneLabel === "대형 화력"));
assert.ok(
  actBreakArmoryChoices.filter((choice) =>
    ["주무장 진화", "공세 모듈", "대형 화력"].includes(choice.laneLabel)
  ).length >= 4
);
assert.ok(
  actBreakArmoryChoices.every((choice) =>
    ["주무장 진화", "공세 모듈", "대형 화력", "보조 시스템", "방호/유틸 차체"].includes(choice.laneLabel)
  )
);
const armoryFirstPick = actBreakArmoryChoices.find((choice) => choice.laneLabel === "공세 모듈");
assert.ok(armoryFirstPick);
game.applyForgeChoice(
  { build: actTwoModuleBuild, player: null, resources: { scrap: 999 }, stats: {} },
  armoryFirstPick
);
const actBreakFollowupChoices = game.buildForgeFollowupChoices(
  actTwoModuleBuild,
  () => 0,
  180 - armoryFirstPick.cost,
  { nextWave: 5, finalForge: false },
  armoryFirstPick
);
assert.ok(actBreakFollowupChoices.length >= 4);
assert.ok(!actBreakFollowupChoices.some((choice) => choice.id === armoryFirstPick.id));
assert.ok(actBreakFollowupChoices.some((choice) => choice.laneLabel === "방호/유틸 차체"));
assert.ok(
  actBreakFollowupChoices.some((choice) =>
    ["주무장 진화", "공세 모듈", "대형 화력"].includes(choice.laneLabel)
  )
);
const lateArmoryBuild = game.createInitialBuild("relay_oath");
lateArmoryBuild.pendingCores = [];
lateArmoryBuild.supportBayCap = 3;
lateArmoryBuild.supportSystems = [
  { id: "aegis_halo", tier: 2 },
  { id: "ember_ring", tier: 2 },
];
const lateArmoryChoices = game.buildForgeChoices(
  lateArmoryBuild,
  () => 0,
  220,
  { nextWave: 9, finalForge: false }
);
assert.equal(lateArmoryChoices.length, 6);
assert.ok(lateArmoryChoices.some((choice) => choice.laneLabel === "공세 모듈"));
const thirdBayChoice = lateArmoryChoices.find(
  (choice) =>
    choice.type === "system" &&
    choice.systemTier === 1 &&
    ["seeker_array", "volt_drones"].includes(choice.systemId)
);
assert.ok(thirdBayChoice);
game.applyForgeChoice(
  { build: lateArmoryBuild, player: null, resources: { scrap: 999 }, stats: {} },
  thirdBayChoice
);
const lateArmorySystems = game.computeSupportSystemStats(lateArmoryBuild);
assert.equal(lateArmoryBuild.supportSystems.length, 3);
assert.ok(lateArmorySystems.orbitCount >= 5);
const actModuleFollowupBuild = game.createInitialBuild("relay_oath");
actModuleFollowupBuild.pendingCores = [];
const actOneModuleFollowup = game.buildForgeFollowupChoices(
  actModuleFollowupBuild,
  () => 0,
  180,
  { nextWave: 3, finalForge: false },
  packagePrimaryChoice
);
assert.ok(!actOneModuleFollowup.some((choice) => choice.laneLabel === "공세 모듈"));
const actTwoModuleFollowup = game.buildForgeFollowupChoices(
  actModuleFollowupBuild,
  () => 0,
  180,
  { nextWave: 4, finalForge: false },
  packagePrimaryChoice
);
assert.equal(
  JSON.stringify(actTwoModuleFollowup.filter((choice) => choice.laneLabel === "공세 모듈").map((choice) => choice.systemId).sort()),
  JSON.stringify(["seeker_array"])
);
const seekerInstallChoice = actTwoModuleFollowup.find(
  (choice) => choice.laneLabel === "공세 모듈" && choice.systemId === "seeker_array"
);
assert.ok(seekerInstallChoice);
game.applyForgeChoice(
  { build: actModuleFollowupBuild, player: null, resources: { scrap: 999 }, stats: {} },
  seekerInstallChoice
);
const seekerTierOne = game.computeSupportSystemStats(actModuleFollowupBuild);
assert.equal(seekerTierOne.orbitCount, 1);
assert.ok(seekerTierOne.shotCooldown > 0);
assert.equal(seekerTierOne.renderShape, "missile");
const voltInstallChoice = game
  .buildForgeFollowupChoices(
    actModuleFollowupBuild,
    () => 0,
    180,
    { nextWave: 6, finalForge: false },
    packagePrimaryChoice
  )
  .find((choice) => choice.laneLabel === "공세 모듈" && choice.systemId === "volt_drones");
assert.ok(voltInstallChoice);
game.applyForgeChoice(
  { build: actModuleFollowupBuild, player: null, resources: { scrap: 999 }, stats: {} },
  voltInstallChoice
);
const dualOffenseStats = game.computeSupportSystemStats(actModuleFollowupBuild);
assert.equal(dualOffenseStats.orbitCount, 3);
const actTwoUpgradeChoices = game.buildForgeFollowupChoices(
  actModuleFollowupBuild,
  () => 0,
  180,
  { nextWave: 8, finalForge: false },
  packagePrimaryChoice
);
assert.equal(
  JSON.stringify(actTwoUpgradeChoices.filter((choice) => choice.laneLabel === "공세 모듈").map((choice) => choice.systemTier).sort()),
  JSON.stringify([2, 2])
);

const emberBuild = game.createInitialBuild("relay_oath");
emberBuild.coreId = "ember";
emberBuild.attunedCoreId = "ember";
emberBuild.attunedCopies = 1;
emberBuild.pendingCores = [];
emberBuild.affixes = ["overclock", "phase_rounds"];
emberBuild.finisherCatalysts = [];
emberBuild.catalystCapstoneId = null;
emberBuild.cashoutSupportId = null;
emberBuild.cashoutFailSoftId = null;
assert.equal(game.buildCanEarnFinisherCatalyst(emberBuild), true);
const emberLockedChoices = game.buildForgeChoices(emberBuild, () => 0, 180);
assert.ok(!emberLockedChoices.some((choice) => choice.affixId === "hotshot"));
const emberFailSoftFinalChoices = game.buildForgeChoices(emberBuild, () => 0, 180, { finalForge: true });
assert.equal(emberFailSoftFinalChoices.length, 2);
assert.equal(
  JSON.stringify(emberFailSoftFinalChoices.map((choice) => choice.laneLabel)),
  JSON.stringify(["비상 점화", "안정화"])
);
assert.equal(emberFailSoftFinalChoices[0].action, "cashout_failsoft");
assert.equal(emberFailSoftFinalChoices[0].cost, 18);
assert.equal(emberFailSoftFinalChoices[0].failSoftLabel, "Ember Wake");
assert.ok(emberFailSoftFinalChoices[0].finalePreview.label.includes("Ember Wake Trial"));
assert.equal(emberFailSoftFinalChoices[1].action, "cashout_support");
assert.equal(emberFailSoftFinalChoices[1].cost, 0);
assert.ok(emberFailSoftFinalChoices[1].finalePreview.label.includes("Pilot Light Trial"));
assert.notEqual(
  emberFailSoftFinalChoices[0].finalePreview.hazard,
  emberFailSoftFinalChoices[1].finalePreview.hazard
);
const emberFailSoftRun = {
  build: emberBuild,
  player: {
    hp: 100,
    maxHp: 100,
    drive: 30,
    heat: 20,
    overheated: false,
  },
  resources: { scrap: 999 },
  stats: {},
};
game.applyForgeChoice(emberFailSoftRun, emberFailSoftFinalChoices[0]);
assert.equal(emberBuild.cashoutFailSoftId, "ember_wake");
assert.equal(emberBuild.cashoutSupportId, null);
assert.ok(emberFailSoftRun.player.drive > 30);
emberBuild.cashoutFailSoftId = null;
emberBuild.finisherCatalysts = ["ember"];
assert.equal(game.hasFinisherCatalyst(emberBuild, "ember"), true);
const emberFinalChoices = game.buildForgeChoices(emberBuild, () => 0, 180, { finalForge: true });
assert.equal(
  JSON.stringify(emberFinalChoices.map((choice) => choice.laneLabel)),
  JSON.stringify(["완성", "촉매 연소", "안정화"])
);
assert.equal(emberFinalChoices[0].recipeLabel, "Crown Pyre");
assert.equal(emberFinalChoices[0].affixId, "hotshot");
assert.equal(emberFinalChoices[1].action, "catalyst_reforge");
assert.equal(emberFinalChoices[1].capstoneLabel, "Sear Halo");
assert.ok(emberFinalChoices[1].finalePreview.label.includes("Sear Halo Trial"));
assert.equal(emberFinalChoices[2].action, "cashout_support");
assert.equal(emberFinalChoices[2].supportLabel, "Pilot Light");
assert.equal(emberFinalChoices[2].finalePreview.hazard, "Pilot Rings x2");
game.applyForgeChoice(
  { build: emberBuild, player: null, resources: { scrap: 999 }, stats: {} },
  emberFinalChoices[0]
);
assert.equal(game.hasFinisherCatalyst(emberBuild, "ember"), false);
assert.equal(game.computeWeaponStats(emberBuild).affixLabels.length, 3);

const emberCapstoneBuild = game.createInitialBuild("relay_oath");
emberCapstoneBuild.coreId = "ember";
emberCapstoneBuild.attunedCoreId = "ember";
emberCapstoneBuild.attunedCopies = 1;
emberCapstoneBuild.pendingCores = [];
emberCapstoneBuild.affixes = ["overclock", "phase_rounds"];
emberCapstoneBuild.finisherCatalysts = ["ember"];
const emberCapstoneChoice = game
  .buildForgeChoices(emberCapstoneBuild, () => 0, 180, { finalForge: true })
  .find((choice) => choice.action === "catalyst_reforge");
assert.ok(emberCapstoneChoice);
game.applyForgeChoice(
  { build: emberCapstoneBuild, player: null, resources: { scrap: 999 }, stats: {} },
  emberCapstoneChoice
);
const emberCapstoneWeapon = game.computeWeaponStats(emberCapstoneBuild);
assert.equal(emberCapstoneBuild.catalystCapstoneId, "sear_halo");
assert.equal(emberCapstoneWeapon.capstoneLabel, "Sear Halo");
assert.equal(emberCapstoneWeapon.capstoneFire.kind, "ember_echo");
assert.equal(emberCapstoneWeapon.capstoneFire.projectileCount, 2);

const emberSupportBuild = game.createInitialBuild("relay_oath");
emberSupportBuild.coreId = "ember";
emberSupportBuild.attunedCoreId = "ember";
emberSupportBuild.attunedCopies = 1;
emberSupportBuild.pendingCores = [];
emberSupportBuild.affixes = ["overclock", "phase_rounds"];
emberSupportBuild.finisherCatalysts = ["ember"];
const emberSupportRun = {
  build: emberSupportBuild,
  player: {
    hp: 100,
    maxHp: 100,
    drive: 34,
    heat: 36,
    overheated: false,
  },
  resources: { scrap: 999 },
  stats: {},
};
const emberSupportChoice = game
  .buildForgeChoices(emberSupportBuild, () => 0, 180, { finalForge: true })
  .find((choice) => choice.action === "cashout_support");
assert.ok(emberSupportChoice);
game.applyForgeChoice(emberSupportRun, emberSupportChoice);
assert.equal(emberSupportBuild.cashoutSupportId, "pilot_light");
assert.ok(emberSupportRun.player.drive > 34);
assert.ok(emberSupportBuild.driveGainBonus > 0.18);

const catalystGateBuild = game.createInitialBuild("scrap_pact");
catalystGateBuild.pendingCores = [];
catalystGateBuild.attunedCopies = 4;
catalystGateBuild.affixes = ["overclock", "thermal_weave"];
assert.equal(game.buildCanEarnFinisherCatalyst(catalystGateBuild), true);
const catalystLockedChoices = game.buildForgeChoices(catalystGateBuild, () => 0, 180);
assert.ok(!catalystLockedChoices.some((choice) => choice.affixId === "hotshot"));
const blockedRun = {
  build: catalystGateBuild,
  player: null,
  resources: { scrap: 999 },
  stats: {},
};
assert.equal(
  game.applyForgeChoice(blockedRun, { type: "affix", affixId: "hotshot" }),
  null
);
assert.equal(JSON.stringify(catalystGateBuild.affixes), JSON.stringify(["overclock", "thermal_weave"]));

catalystGateBuild.finisherCatalysts = ["scatter"];
assert.equal(game.hasFinisherCatalyst(catalystGateBuild, "scatter"), true);
const catalystReadyChoices = game.buildForgeChoices(catalystGateBuild, () => 0, 180);
const catalystFinisherChoice = catalystReadyChoices.find(
  (choice) => choice.laneLabel === "빌드 고정" && choice.affixId === "hotshot"
);
assert.ok(catalystFinisherChoice);
assert.equal(catalystFinisherChoice.tag, "FINISHER");
assert.equal(catalystFinisherChoice.consumesCatalyst, true);
const catalystReforgeChoice = catalystReadyChoices.find(
  (choice) => choice.laneLabel === "전환" && choice.action === "catalyst_reforge"
);
assert.ok(catalystReforgeChoice);
assert.equal(catalystReforgeChoice.capstoneLabel, "Flash Temper");

const finalForgeChoices = game.buildForgeChoices(catalystGateBuild, () => 0, 180, { finalForge: true });
assert.equal(finalForgeChoices.length, 3);
assert.equal(
  JSON.stringify(finalForgeChoices.map((choice) => choice.laneLabel)),
  JSON.stringify(["완성", "촉매 연소", "안정화"])
);
assert.ok(finalForgeChoices.every((choice) => choice.finalePreview));
assert.ok(!finalForgeChoices.some((choice) => choice.action === "reforge" || choice.action === "affix_reforge"));
assert.equal(finalForgeChoices[0].affixId, "hotshot");
assert.ok(finalForgeChoices[0].finalePreview.label.includes("Afterburn I"));
assert.equal(finalForgeChoices[1].action, "catalyst_reforge");
assert.ok(finalForgeChoices[1].finalePreview.label.includes("Flash Temper Trial"));
assert.equal(finalForgeChoices[2].action, "cashout_support");
assert.equal(finalForgeChoices[2].supportLabel, "Quench Loop");
assert.equal(finalForgeChoices[2].cost, 0);
assert.ok(finalForgeChoices[2].finalePreview.label.includes("Quench Loop Trial"));
assert.equal(finalForgeChoices[2].finalePreview.hazard, "Quench Lanes x1");
assert.ok(finalForgeChoices[2].finalePreview.tempo.includes("7연전"));
const lowScrapFinalChoices = game.buildForgeChoices(catalystGateBuild, () => 0, 0, { finalForge: true });
assert.ok(lowScrapFinalChoices.some((choice) => choice.action === "cashout_support" && choice.cost === 0));
game.applyForgeChoice(blockedRun, catalystFinisherChoice);
assert.ok(catalystGateBuild.affixes.includes("hotshot"));
assert.equal(game.hasFinisherCatalyst(catalystGateBuild, "scatter"), false);

const missedCatalystFinalBuild = game.createInitialBuild("scrap_pact");
missedCatalystFinalBuild.pendingCores = [];
missedCatalystFinalBuild.attunedCopies = 4;
missedCatalystFinalBuild.affixes = ["overclock", "thermal_weave"];
missedCatalystFinalBuild.finisherCatalysts = [];
const missedCatalystFinalChoices = game.buildForgeChoices(
  missedCatalystFinalBuild,
  () => 0,
  0,
  { finalForge: true }
);
assert.equal(missedCatalystFinalChoices.length, 2);
assert.equal(missedCatalystFinalChoices[0].action, "cashout_failsoft");
assert.equal(missedCatalystFinalChoices[0].cost, 18);
assert.equal(missedCatalystFinalChoices[0].laneLabel, "비상 점화");
assert.equal(missedCatalystFinalChoices[0].failSoft, true);
assert.ok(missedCatalystFinalChoices[0].finalePreview.label.includes("Slag Burst Trial"));
assert.equal(missedCatalystFinalChoices[1].action, "cashout_support");
assert.equal(missedCatalystFinalChoices[1].cost, 0);
assert.equal(missedCatalystFinalChoices[1].laneLabel, "안정화");
assert.equal(missedCatalystFinalChoices[1].failSoft, true);
assert.ok(missedCatalystFinalChoices[1].finalePreview.label.includes("Quench Loop Trial"));
assert.ok(
  !missedCatalystFinalChoices.some(
    (choice) => choice.action === "reforge" || choice.action === "affix_reforge"
  )
);

const supportBuild = game.createInitialBuild("scrap_pact");
supportBuild.pendingCores = [];
supportBuild.attunedCopies = 4;
supportBuild.affixes = ["overclock", "thermal_weave"];
supportBuild.finisherCatalysts = ["scatter"];
const supportRun = {
  build: supportBuild,
  player: {
    hp: 88,
    maxHp: 108,
    heat: 61,
    overheated: true,
  },
  resources: { scrap: 999 },
  stats: {},
};
const quenchChoice = game
  .buildForgeChoices(supportBuild, () => 0, 180, { finalForge: true })
  .find((choice) => choice.action === "cashout_support");
assert.ok(quenchChoice);
game.applyForgeChoice(supportRun, quenchChoice);
assert.equal(game.hasFinisherCatalyst(supportBuild, "scatter"), false);
assert.equal(supportBuild.cashoutSupportId, "quench_loop");
assert.ok(supportRun.player.heat < 40);
assert.equal(supportRun.player.overheated, false);
assert.equal(supportBuild.coolRateBonus >= 14, true);
assert.ok(supportBuild.heatFactor < 1);

const catalystPivotBuild = game.createInitialBuild("scrap_pact");
catalystPivotBuild.pendingCores = [];
catalystPivotBuild.attunedCopies = 4;
catalystPivotBuild.affixes = ["overclock", "thermal_weave"];
catalystPivotBuild.finisherCatalysts = ["scatter"];
const catalystPivotRun = {
  build: catalystPivotBuild,
  player: null,
  resources: { scrap: 999 },
  stats: {},
};
const catalystPivotChoices = game.buildForgeChoices(catalystPivotBuild, () => 0, 180);
const flashTemperChoice = catalystPivotChoices.find(
  (choice) => choice.laneLabel === "전환" && choice.action === "catalyst_reforge"
);
assert.ok(flashTemperChoice);
game.applyForgeChoice(catalystPivotRun, flashTemperChoice);
assert.equal(game.hasFinisherCatalyst(catalystPivotBuild, "scatter"), false);
assert.equal(catalystPivotBuild.damageBonus, 6);
assert.equal(catalystPivotBuild.pierceBonus, 1);
assert.equal(catalystPivotBuild.driveGainBonus, 0.22);
assert.equal(catalystPivotBuild.catalystCapstoneId, "flash_temper");
const flashTemperWeapon = game.computeWeaponStats(catalystPivotBuild);
assert.equal(flashTemperWeapon.capstoneLabel, "Flash Temper");
assert.equal(flashTemperWeapon.capstoneTraitLabel, "중앙 관통 슬러그");
assert.equal(flashTemperWeapon.capstoneFire.kind, "temper_slug");
assert.ok(flashTemperWeapon.capstoneFire.pierceBonus >= 2);

const stormRailBuild = game.createInitialBuild("rail_zeal");
stormRailBuild.pendingCores = [];
stormRailBuild.attunedCopies = 4;
stormRailBuild.affixes = ["phase_rounds", "arc_link"];
stormRailBuild.finisherCatalysts = ["lance"];
const stormRailChoice = game
  .buildForgeChoices(stormRailBuild, () => 0, 180)
  .find((choice) => choice.laneLabel === "전환" && choice.action === "catalyst_reforge");
assert.ok(stormRailChoice);
game.applyForgeChoice(
  { build: stormRailBuild, player: null, resources: { scrap: 999 }, stats: {} },
  stormRailChoice
);
const stormRailWeapon = game.computeWeaponStats(stormRailBuild);
assert.equal(stormRailBuild.catalystCapstoneId, "storm_rail");
assert.equal(stormRailWeapon.capstoneLabel, "Storm Rail");
assert.equal(stormRailWeapon.capstoneOnHit.kind, "storm_branch");
assert.equal(stormRailWeapon.capstoneOnHit.burstCount, 2);

const mirrorSpiralBuild = game.createInitialBuild("relay_oath");
mirrorSpiralBuild.pendingCores = [];
mirrorSpiralBuild.attunedCopies = 4;
mirrorSpiralBuild.affixes = ["arc_link", "overclock"];
mirrorSpiralBuild.finisherCatalysts = ["ricochet"];
const mirrorSpiralChoice = game
  .buildForgeChoices(mirrorSpiralBuild, () => 0, 180)
  .find((choice) => choice.laneLabel === "전환" && choice.action === "catalyst_reforge");
assert.ok(mirrorSpiralChoice);
game.applyForgeChoice(
  { build: mirrorSpiralBuild, player: null, resources: { scrap: 999 }, stats: {} },
  mirrorSpiralChoice
);
const mirrorSpiralWeapon = game.computeWeaponStats(mirrorSpiralBuild);
assert.equal(mirrorSpiralBuild.catalystCapstoneId, "mirror_spiral");
assert.equal(mirrorSpiralWeapon.capstoneLabel, "Mirror Spiral");
assert.equal(mirrorSpiralWeapon.capstoneOnBounce.kind, "mirror_split");
assert.equal(mirrorSpiralWeapon.capstoneOnBounce.splitCount, 2);

const capstonePivotBuild = game.createInitialBuild("scrap_pact");
capstonePivotBuild.pendingCores = ["lance"];
capstonePivotBuild.catalystCapstoneId = "flash_temper";
game.applyForgeChoice(
  { build: capstonePivotBuild, player: null, resources: { scrap: 999 }, stats: {} },
  { type: "core", coreId: "lance", benchCopies: 1 }
);
assert.equal(capstonePivotBuild.catalystCapstoneId, null);

assert.equal(
  game.shouldFinishAfterForge({ pendingFinalForge: true, waveIndex: game.MAX_WAVES - 1 }),
  true
);
assert.equal(
  game.shouldFinishAfterForge({ pendingFinalForge: false, waveIndex: game.MAX_WAVES - 1 }),
  false
);
assert.equal(
  game.shouldFinishAfterForge({ pendingFinalForge: true, waveIndex: game.MAX_WAVES - 2 }),
  false
);
const finalCashoutWave = game.createFinalCashoutWave(game.MAX_WAVES - 1);
assert.equal(finalCashoutWave.timeLeft, game.WAVE_CONFIG[9].duration + 6);
assert.equal(finalCashoutWave.completesRun, false);
assert.equal(finalCashoutWave.awaitingForge, false);
assert.ok(finalCashoutWave.spawnBudget > 0);
assert.ok(finalCashoutWave.activeCap > game.WAVE_CONFIG[9].activeCap);
assert.ok(finalCashoutWave.hazard.interval < game.WAVE_CONFIG[9].hazard.interval);
assert.ok(finalCashoutWave.label.includes("Afterburn I"));
assert.equal(finalCashoutWave.postCapstoneTotal, game.POST_CAPSTONE_WAVE_COUNT);

const finalAfterburnWave = game.createPostCapstoneWave(game.POST_CAPSTONE_WAVE_COUNT - 1, catalystPivotBuild);
assert.equal(finalAfterburnWave.completesRun, true);
assert.equal(finalAfterburnWave.postCapstoneStage, game.POST_CAPSTONE_WAVE_COUNT);
assert.ok(finalAfterburnWave.label.includes("Afterburn VII"));

const temperCashoutWave = game.createFinalCashoutWave(game.MAX_WAVES - 1, flashTemperChoice ? catalystPivotBuild : null);
assert.equal(temperCashoutWave.label.includes("Temper Trial"), true);
assert.equal(temperCashoutWave.bannerLabel, "Flash Temper Trial · Afterburn I");
assert.equal(temperCashoutWave.hazard.count, 1);
assert.ok(temperCashoutWave.mix.brute > finalCashoutWave.mix.brute);
assert.ok(temperCashoutWave.spawnBudget > finalCashoutWave.spawnBudget);

const railCashoutWave = game.createFinalCashoutWave(game.MAX_WAVES - 1, stormRailBuild);
assert.equal(railCashoutWave.label.includes("Rail Trial"), true);
assert.equal(railCashoutWave.hazard.count, 3);
assert.ok(railCashoutWave.mix.scuttler > finalCashoutWave.mix.scuttler);
assert.ok(railCashoutWave.activeCap >= game.WAVE_CONFIG[game.MAX_WAVES - 1].activeCap);

const mirrorCashoutWave = game.createFinalCashoutWave(game.MAX_WAVES - 1, mirrorSpiralBuild);
assert.equal(mirrorCashoutWave.label.includes("Mirror Trial"), true);
assert.equal(mirrorCashoutWave.hazard.label, "Mirror Crossfire");
assert.ok(mirrorCashoutWave.mix.shrike > finalCashoutWave.mix.shrike);
assert.ok(mirrorCashoutWave.baseSpawnInterval <= railCashoutWave.baseSpawnInterval);

const quenchCashoutWave = game.createFinalCashoutWave(game.MAX_WAVES - 1, supportBuild);
assert.equal(quenchCashoutWave.label.includes("Quench Trial"), true);
assert.equal(quenchCashoutWave.bannerLabel, "Quench Loop Trial · Afterburn I");
assert.equal(quenchCashoutWave.hazard.label, "Quench Lanes");
assert.ok(quenchCashoutWave.activeCap <= finalCashoutWave.activeCap + 1);
assert.ok(quenchCashoutWave.hazard.telegraph > finalCashoutWave.hazard.telegraph);
assert.equal(game.getFinalCashoutTransitionProfile(supportBuild).preserveArenaState, true);
assert.equal(game.getFinalCashoutTransitionProfile(supportBuild).refillDash, false);

const emberHaloCashoutWave = game.createFinalCashoutWave(game.MAX_WAVES - 1, emberCapstoneBuild);
assert.equal(emberHaloCashoutWave.label.includes("Halo Trial"), true);
assert.equal(emberHaloCashoutWave.bannerLabel, "Sear Halo Trial · Afterburn I");
assert.equal(emberHaloCashoutWave.hazard.count, 3);
assert.ok(emberHaloCashoutWave.mix.scuttler > finalCashoutWave.mix.scuttler);

assert.equal(game.getFinalCashoutTransitionProfile(emberCapstoneBuild).preserveArenaState, false);
assert.equal(game.getFinalCashoutTransitionProfile(emberCapstoneBuild).refillDash, true);

const emberPilotCashoutWave = game.createFinalCashoutWave(game.MAX_WAVES - 1, emberSupportBuild);
assert.equal(emberPilotCashoutWave.label.includes("Pilot Trial"), true);
assert.equal(emberPilotCashoutWave.bannerLabel, "Pilot Light Trial · Afterburn I");
assert.equal(emberPilotCashoutWave.hazard.label, "Pilot Rings");
assert.ok(emberPilotCashoutWave.hazard.telegraph > finalCashoutWave.hazard.telegraph);

const supportTransitionRun = {
  build: supportBuild,
  waveIndex: game.MAX_WAVES - 1,
  pendingFinalForge: true,
  phase: "forge",
  wave: null,
  waveClearTimer: 3,
  enemies: [{ id: "elite" }],
  projectiles: [{ id: "projectile" }],
  drops: [{ id: "drop" }],
  hazards: [{ id: "hazard" }],
  particles: [{ id: "particle" }],
  player: {
    x: 180,
    y: 220,
    heat: 52,
    overheated: true,
    fireCooldown: 0.4,
    dashCharges: 0,
    dashMax: 2,
    dashCooldownTimer: 1.1,
  },
};
const supportTransition = game.applyFinalCashoutTransition(supportTransitionRun);
assert.equal(supportTransition.preserveArenaState, true);
assert.equal(supportTransitionRun.phase, "wave");
assert.equal(supportTransitionRun.pendingFinalForge, false);
assert.equal(supportTransitionRun.waveIndex, game.MAX_WAVES);
assert.equal(supportTransitionRun.postCapstone.active, true);
assert.equal(supportTransitionRun.enemies.length, 1);
assert.equal(supportTransitionRun.drops.length, 1);
assert.equal(supportTransitionRun.hazards.length, 1);
assert.equal(supportTransitionRun.projectiles.length, 0);
assert.equal(supportTransitionRun.particles.length, 0);
assert.equal(supportTransitionRun.player.x, 180);
assert.equal(supportTransitionRun.player.y, 220);
assert.equal(supportTransitionRun.player.heat, 44);
assert.equal(supportTransitionRun.player.dashCharges, 0);
assert.equal(supportTransitionRun.player.dashCooldownTimer, 1.1);

const capstoneTransitionRun = {
  build: emberCapstoneBuild,
  waveIndex: game.MAX_WAVES - 1,
  pendingFinalForge: true,
  phase: "forge",
  wave: null,
  waveClearTimer: 2,
  enemies: [{ id: "elite" }],
  projectiles: [{ id: "projectile" }],
  drops: [{ id: "drop" }],
  hazards: [{ id: "hazard" }],
  particles: [{ id: "particle" }],
  player: {
    x: 120,
    y: 140,
    heat: 33,
    overheated: true,
    fireCooldown: 0.6,
    dashCharges: 0,
    dashMax: 3,
    dashCooldownTimer: 2.4,
  },
};
const capstoneTransition = game.applyFinalCashoutTransition(capstoneTransitionRun);
assert.equal(capstoneTransition.preserveArenaState, false);
assert.equal(capstoneTransitionRun.waveIndex, game.MAX_WAVES);
assert.equal(capstoneTransitionRun.postCapstone.active, true);
assert.equal(capstoneTransitionRun.enemies.length, 0);
assert.equal(capstoneTransitionRun.drops.length, 0);
assert.equal(capstoneTransitionRun.hazards.length, 0);
assert.equal(capstoneTransitionRun.projectiles.length, 0);
assert.equal(capstoneTransitionRun.particles.length, 0);
assert.equal(capstoneTransitionRun.player.x, 720);
assert.equal(capstoneTransitionRun.player.y, 410);
assert.equal(capstoneTransitionRun.player.heat, 17);
assert.equal(capstoneTransitionRun.player.dashCharges, 3);
assert.equal(capstoneTransitionRun.player.dashCooldownTimer, 0);

const affixBuild = game.createInitialBuild("relay_oath");
game.applyForgeChoice(
  { build: affixBuild, player: null, resources: { scrap: 999 }, stats: {} },
  { type: "affix", affixId: "arc_link" }
);
assert.ok(affixBuild.affixes.includes("arc_link"));

const lowBankChoices = game.buildForgeChoices(build, rng, 0);
assert.ok(lowBankChoices.some((choice) => choice.laneLabel === "전환"));
assert.ok(lowBankChoices.some((choice) => choice.laneLabel === "생존/경제" && choice.cost === 0));
assert.ok(lowBankChoices.some((choice) => choice.cost === 0));

const hazardConfig = game.WAVE_CONFIG[4].hazard;
const eliteHazard = game.chooseHazardSpawn(
  hazardConfig,
  {
    arenaWidth: 960,
    arenaHeight: 540,
    player: { x: 220, y: 260 },
    aimVector: { x: 1, y: 0 },
    moveVector: { x: 1, y: 0 },
    enemies: [{ type: "elite", x: 360, y: 262 }],
    drops: [],
    hazards: [],
  },
  () => 0
);
assert.ok(Math.abs(eliteHazard.x - 360) <= 28);
assert.ok(Math.abs(eliteHazard.y - 262) <= 28);

const lootHazard = game.chooseHazardSpawn(
  hazardConfig,
  {
    arenaWidth: 960,
    arenaHeight: 540,
    player: { x: 220, y: 260 },
    aimVector: { x: 1, y: 0 },
    moveVector: { x: 1, y: 0 },
    enemies: [],
    drops: [{ kind: "core", x: 332, y: 250, life: 8 }],
    hazards: [],
  },
  () => 0
);
assert.ok(Math.abs(lootHazard.x - 332) <= 28);
assert.ok(Math.abs(lootHazard.y - 250) <= 28);

const fallbackBuild = game.createInitialBuild();
fallbackBuild.pendingCores = [];
const fallbackChoices = game.buildForgeChoices(fallbackBuild, rng, 0);
assert.ok(!fallbackChoices.some((choice) => choice.type === "core" && choice.directOffer));
assert.ok(fallbackChoices.some((choice) => choice.laneLabel === "전환"));
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
assert.equal(run.build.attunedCopies, 4);
assert.equal(game.computeWeaponStats(run.build).benchSyncLevel, 3);
assert.equal(game.getBenchCount(run.build, "scatter"), 0);

game.applyForgeChoice(run, {
  type: "affix",
  affixId: "thermal_weave",
});
game.applyForgeChoice(run, {
  type: "affix",
  affixId: "phase_rounds",
});
assert.equal(game.computeWeaponStats(run.build).tierLabel, "Legendary");
assert.equal(game.computeWeaponStats(run.build).pellets, 7);
assert.ok(game.computeWeaponStats(run.build).spread < game.CORE_DEFS.scatter.spread);
assert.equal(game.computeWeaponStats(run.build).affixLabels.length, 3);

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

const pivotRun = {
  build: game.createInitialBuild("scrap_pact"),
  player: {
    hp: 80,
    maxHp: 108,
    heat: 52,
    overheated: false,
  },
  resources: {
    scrap: 200,
  },
  stats: {
    scrapCollected: 0,
  },
};
pivotRun.build.pendingCores = game.sanitizeBenchCoreIds(["scatter"]);
game.applyForgeChoice(pivotRun, directPivotChoice);
assert.equal(pivotRun.build.coreId, directPivotChoice.coreId);
assert.equal(pivotRun.build.attunedCoreId, directPivotChoice.coreId);
assert.equal(pivotRun.build.attunedCopies, 1);
assert.equal(game.getBenchCount(pivotRun.build, "scatter"), 0);
assert.ok(pivotRun.build.upgrades.some((entry) => entry.includes("무기 전환")));

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
assert.equal(playerStats.pickupRadius, 84);
assert.equal(playerStats.maxHp, 108);
assert.ok(playerStats.maxHp >= 100);
assert.ok(playerStats.overdriveDuration >= 5.5);
assert.ok(Array.isArray(weapon.affixLabels));

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

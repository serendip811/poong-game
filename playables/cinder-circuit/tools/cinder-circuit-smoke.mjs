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
assert.equal(
  JSON.stringify(Object.keys(game.SUPPORT_SYSTEM_DEFS).sort()),
  JSON.stringify(["aegis_halo", "ember_ring"])
);

const signatureBuild = game.createInitialBuild("scrap_pact");
assert.equal(signatureBuild.signatureId, "scrap_pact");
assert.equal(signatureBuild.maxHpBonus, 8);
assert.equal(signatureBuild.pickupBonus, 18);
assert.equal(signatureBuild.scrapMultiplier, 1.08);
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
assert.equal(choices.length, 3);
assert.equal(
  JSON.stringify(choices.map((choice) => choice.laneLabel).sort()),
  JSON.stringify(["빌드 고정", "생존/경제", "전환"])
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
const midrunForgeChoices = game.buildForgeChoices(midrunChaseBuild, () => 0, 180, { nextWave: 2 });
const midrunForgeFinisherChoice = midrunForgeChoices.find(
  (choice) => choice.laneLabel === "빌드 고정" && choice.recipeLabel === "Kiln Bloom"
);
assert.ok(midrunForgeFinisherChoice);
assert.equal(midrunForgeFinisherChoice.type, "core");
assert.equal(midrunForgeFinisherChoice.coreId, "scatter");
assert.equal(midrunForgeFinisherChoice.benchCopies, 0);
assert.equal(midrunForgeFinisherChoice.tag, "FINISHER");

const midrunSystemChoices = game.buildForgeChoices(midrunChaseBuild, () => 0, 180, { nextWave: 3 });
const installSystemChoice = midrunSystemChoices.find(
  (choice) => choice.laneLabel === "보조 시스템" && choice.type === "system"
);
assert.ok(installSystemChoice);
assert.equal(installSystemChoice.systemId, "ember_ring");
assert.equal(installSystemChoice.systemTier, 1);
const systemRun = {
  build: midrunChaseBuild,
  player: null,
  resources: { scrap: 999 },
  stats: {},
};
game.applyForgeChoice(systemRun, installSystemChoice);
assert.equal(midrunChaseBuild.supportSystemId, "ember_ring");
assert.equal(midrunChaseBuild.supportSystemTier, 1);
assert.equal(game.computeSupportSystemStats(midrunChaseBuild).orbitCount, 1);
assert.equal(game.computeSupportSystemStats(midrunChaseBuild).shotCooldown, 0);

const upgradedSystemChoices = game.buildForgeChoices(midrunChaseBuild, () => 0, 180, { nextWave: 4 });
const upgradeSystemChoice = upgradedSystemChoices.find(
  (choice) => choice.laneLabel === "보조 시스템" && choice.type === "system"
);
assert.ok(upgradeSystemChoice);
assert.equal(upgradeSystemChoice.systemTier, 2);
game.applyForgeChoice(systemRun, upgradeSystemChoice);
assert.equal(midrunChaseBuild.supportSystemTier, 2);
assert.equal(game.computeSupportSystemStats(midrunChaseBuild).orbitCount, 2);
assert.ok(game.computeSupportSystemStats(midrunChaseBuild).shotCooldown > 0);

const aegisBuild = game.createInitialBuild("relay_oath");
aegisBuild.pendingCores = [];
const aegisInstallChoices = game.buildForgeChoices(aegisBuild, () => 0.99, 180, { nextWave: 3 });
const aegisInstallChoice = aegisInstallChoices.find(
  (choice) => choice.laneLabel === "보조 시스템" && choice.type === "system"
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

const aegisUpgradeChoices = game.buildForgeChoices(aegisBuild, () => 0, 180, { nextWave: 4 });
const aegisUpgradeChoice = aegisUpgradeChoices.find(
  (choice) => choice.laneLabel === "보조 시스템" && choice.type === "system"
);
assert.ok(aegisUpgradeChoice);
assert.equal(aegisUpgradeChoice.systemId, "aegis_halo");
assert.equal(aegisUpgradeChoice.systemTier, 2);
game.applyForgeChoice(
  { build: aegisBuild, player: null, resources: { scrap: 999 }, stats: {} },
  aegisUpgradeChoice
);
const aegisTierTwo = game.computeSupportSystemStats(aegisBuild);
assert.equal(aegisTierTwo.orbitCount, 2);
assert.ok(aegisTierTwo.interceptRange > aegisTierOne.interceptRange);
assert.ok(aegisTierTwo.interceptPulseDamage > 0);

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
assert.equal(emberFailSoftFinalChoices[0].finalePreview.label, "Ember Wake Trial");
assert.equal(emberFailSoftFinalChoices[1].action, "cashout_support");
assert.equal(emberFailSoftFinalChoices[1].cost, 0);
assert.equal(emberFailSoftFinalChoices[1].finalePreview.label, "Pilot Light Trial");
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
assert.equal(emberFinalChoices[1].finalePreview.label, "Sear Halo Trial");
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
assert.equal(finalForgeChoices[0].finalePreview.label, "Meltdown Cash-Out");
assert.equal(finalForgeChoices[1].action, "catalyst_reforge");
assert.equal(finalForgeChoices[1].finalePreview.label, "Flash Temper Trial");
assert.equal(finalForgeChoices[2].action, "cashout_support");
assert.equal(finalForgeChoices[2].supportLabel, "Quench Loop");
assert.equal(finalForgeChoices[2].cost, 0);
assert.equal(finalForgeChoices[2].finalePreview.label, "Quench Loop Trial");
assert.equal(finalForgeChoices[2].finalePreview.hazard, "Quench Lanes x1");
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
assert.equal(missedCatalystFinalChoices[0].finalePreview.label, "Slag Burst Trial");
assert.equal(missedCatalystFinalChoices[1].action, "cashout_support");
assert.equal(missedCatalystFinalChoices[1].cost, 0);
assert.equal(missedCatalystFinalChoices[1].laneLabel, "안정화");
assert.equal(missedCatalystFinalChoices[1].failSoft, true);
assert.equal(missedCatalystFinalChoices[1].finalePreview.label, "Quench Loop Trial");
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
assert.equal(finalCashoutWave.timeLeft, game.FINAL_CASHOUT_DURATION);
assert.equal(finalCashoutWave.completesRun, true);
assert.equal(finalCashoutWave.awaitingForge, false);
assert.ok(finalCashoutWave.spawnBudget > 0);
assert.ok(finalCashoutWave.activeCap < game.WAVE_CONFIG[4].activeCap);
assert.ok(finalCashoutWave.hazard.interval < game.WAVE_CONFIG[4].hazard.interval);
assert.ok(finalCashoutWave.label.includes("Cash-Out"));

const temperCashoutWave = game.createFinalCashoutWave(game.MAX_WAVES - 1, flashTemperChoice ? catalystPivotBuild : null);
assert.equal(temperCashoutWave.label.includes("Temper Trial"), true);
assert.equal(temperCashoutWave.bannerLabel, "Flash Temper Trial");
assert.equal(temperCashoutWave.hazard.count, 1);
assert.ok(temperCashoutWave.mix.brute > finalCashoutWave.mix.brute);
assert.ok(temperCashoutWave.spawnBudget > finalCashoutWave.spawnBudget);

const railCashoutWave = game.createFinalCashoutWave(game.MAX_WAVES - 1, stormRailBuild);
assert.equal(railCashoutWave.label.includes("Rail Trial"), true);
assert.equal(railCashoutWave.hazard.count, 3);
assert.ok(railCashoutWave.mix.scuttler > finalCashoutWave.mix.scuttler);
assert.ok(railCashoutWave.activeCap > finalCashoutWave.activeCap);

const mirrorCashoutWave = game.createFinalCashoutWave(game.MAX_WAVES - 1, mirrorSpiralBuild);
assert.equal(mirrorCashoutWave.label.includes("Mirror Trial"), true);
assert.equal(mirrorCashoutWave.hazard.label, "Mirror Crossfire");
assert.ok(mirrorCashoutWave.mix.shrike > finalCashoutWave.mix.shrike);
assert.ok(mirrorCashoutWave.baseSpawnInterval <= railCashoutWave.baseSpawnInterval);

const quenchCashoutWave = game.createFinalCashoutWave(game.MAX_WAVES - 1, supportBuild);
assert.equal(quenchCashoutWave.label.includes("Quench Trial"), true);
assert.equal(quenchCashoutWave.bannerLabel, "Quench Loop Trial");
assert.equal(quenchCashoutWave.hazard.label, "Quench Lanes");
assert.ok(quenchCashoutWave.activeCap < finalCashoutWave.activeCap);
assert.ok(quenchCashoutWave.hazard.telegraph > finalCashoutWave.hazard.telegraph);
assert.equal(game.getFinalCashoutTransitionProfile(supportBuild).preserveArenaState, true);
assert.equal(game.getFinalCashoutTransitionProfile(supportBuild).refillDash, false);

const emberHaloCashoutWave = game.createFinalCashoutWave(game.MAX_WAVES - 1, emberCapstoneBuild);
assert.equal(emberHaloCashoutWave.label.includes("Halo Trial"), true);
assert.equal(emberHaloCashoutWave.bannerLabel, "Sear Halo Trial");
assert.equal(emberHaloCashoutWave.hazard.count, 3);
assert.ok(emberHaloCashoutWave.mix.shrike > finalCashoutWave.mix.shrike);

assert.equal(game.getFinalCashoutTransitionProfile(emberCapstoneBuild).preserveArenaState, false);
assert.equal(game.getFinalCashoutTransitionProfile(emberCapstoneBuild).refillDash, true);

const emberPilotCashoutWave = game.createFinalCashoutWave(game.MAX_WAVES - 1, emberSupportBuild);
assert.equal(emberPilotCashoutWave.label.includes("Pilot Trial"), true);
assert.equal(emberPilotCashoutWave.bannerLabel, "Pilot Light Trial");
assert.equal(emberPilotCashoutWave.hazard.label, "Pilot Rings");
assert.ok(emberPilotCashoutWave.driveGainFactor > finalCashoutWave.driveGainFactor);

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
assert.equal(capstoneTransitionRun.enemies.length, 0);
assert.equal(capstoneTransitionRun.drops.length, 0);
assert.equal(capstoneTransitionRun.hazards.length, 0);
assert.equal(capstoneTransitionRun.projectiles.length, 0);
assert.equal(capstoneTransitionRun.particles.length, 0);
assert.equal(capstoneTransitionRun.player.x, 480);
assert.equal(capstoneTransitionRun.player.y, 270);
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

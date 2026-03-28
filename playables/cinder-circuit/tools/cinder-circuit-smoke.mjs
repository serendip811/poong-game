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
assert.equal(game.DEFAULT_ROUTE_WAVE_COUNT, 8);
assert.equal(game.WAVE_CONFIG.length, 12);
assert.equal(game.ACT_BREAK_ARMORY_WAVE, 5);
assert.equal(game.LATE_BREAK_ARMORY_WAVE, 9);
assert.equal(game.ACT3_CATALYST_DRAFT_WAVE, 10);
assert.equal(game.getActLabelForWave(4).shortLabel, "Act 1");
assert.equal(game.getActLabelForWave(5).shortLabel, "Act 2");
assert.equal(game.getActLabelForWave(9).shortLabel, "Act 2");
assert.equal(game.getActLabelForWave(13).shortLabel, "Act 2");
assert.equal(game.getActLabelForWave(19).shortLabel, "Act 2");
assert.equal(game.getPlayerFacingActLabelForWave(6).shortLabel, "Act 2");
assert.equal(game.getPlayerFacingActLabelForWave(9).shortLabel, "Act 2");
assert.equal(game.getPlayerFacingActLabelForWave(13).shortLabel, "Act 2");
assert.equal(game.getPlayerFacingActLabelForWave(19).shortLabel, "Act 2");
assert.equal(game.getPlayerFacingWaveNumber(6), 6);
assert.equal(game.getPlayerFacingWaveNumber(9), 8);
assert.equal(game.getPlayerFacingWaveNumber(19), 8);
const playerFacingProofBuild = game.createInitialBuild("rail_zeal");
assert.equal(
  JSON.stringify(game.getPlayerFacingProofWindowSummary(playerFacingProofBuild, 11)),
  JSON.stringify(game.getImmediateProofWindowSummary(playerFacingProofBuild, 8))
);
const titleFocus = game.getBaseRouteTransformationFocus(1, { stage: "title" });
assert.equal(titleFocus.eyebrow, "Bare Hull");
assert.equal(titleFocus.windowLabel, "회로 투입");
assert.equal(titleFocus.title, "빈 선체 돌입");
assert.equal(titleFocus.detail, "약한 화선으로 첫 전장을 버틴다.");
assert.ok(!titleFocus.detail.includes("Wave 5"));
assert.ok(!titleFocus.detail.includes("Wave 7"));
assert.ok(!titleFocus.title.includes("Chassis Lock"));
const relayTitleLaunchSummary = game.getLeanStartLaunchSummary(game.createInitialBuild("relay_oath"));
const railTitleLaunchSummary = game.getLeanStartLaunchSummary(game.createInitialBuild("rail_zeal"));
assert.equal(JSON.stringify(relayTitleLaunchSummary), JSON.stringify(railTitleLaunchSummary));
assert.equal(relayTitleLaunchSummary.hullValue, "빈 선체");
assert.equal(relayTitleLaunchSummary.hookValue, "Wave 3 무기 방향");
assert.ok(!/시그니처|Signature|Wave 6|Wave 8/.test(relayTitleLaunchSummary.detail));
const shippedPresentationBeats = game.getShippedRoutePresentationBeats();
assert.equal(shippedPresentationBeats.length, 8);
assert.equal(
  JSON.stringify(shippedPresentationBeats.map((entry) => entry.title)),
  JSON.stringify(["Ember Hull", "버티기", "무장 도약", "도약 시험", "주포 폭주", "차체 잠금", "지배 연장", "완성 시험"])
);
assert.equal(game.POST_CAPSTONE_WAVE_COUNT, 7);
assert.equal(game.shouldAllowCombatRewardDrops(), false);
assert.equal(game.shouldAllowContrabandOverclockRoute(), false);
assert.equal(
  game.getForgeDraftType({
    nextWave: 5,
    finalForge: false,
    build: game.createInitialBuild("rail_zeal"),
  }),
  "early_mutation"
);
assert.equal(game.shouldUseFieldGrant({ nextWave: 9, finalForge: false }), false);
assert.equal(game.shouldUseFieldGrant({ nextWave: 5, finalForge: false }), false);
assert.equal(game.getCombatCacheChoicesForWave(game.createInitialBuild("rail_zeal"), 9).length, 0);
assert.equal(game.getCombatCacheChoicesForWave(game.createInitialBuild("rail_zeal"), 5).length, 0);
assert.equal(game.getCombatCacheChoicesForWave(game.createInitialBuild("rail_zeal"), 14).length, 0);
assert.equal(game.SUPPORT_SYSTEM_DEFS.ember_ring.forgeWaveMin, 6);
assert.ok(!game.getVisibleSupportOfferSystemIds(game.createInitialBuild("rail_zeal"), 5).includes("ember_ring"));
assert.ok(game.getVisibleSupportOfferSystemIds(game.createInitialBuild("rail_zeal"), 6).includes("ember_ring"));
assert.ok(!game.SUPPORT_SYSTEM_DEFS.seeker_array.tiers[1].description.includes("Late Break Armory"));
assert.ok(!game.SUPPORT_SYSTEM_DEFS.seeker_array.tiers[1].description.includes("Wave 9"));
assert.ok(game.SUPPORT_SYSTEM_DEFS.seeker_array.tiers[1].description.includes("차체 잠금"));
assert.equal(
  game.getBaseRoutePostWaveTransition({ waveIndex: 4, wave: { completesRun: false } }, 6).action,
  "forge"
);
assert.equal(
  game.getBaseRoutePostWaveTransition({ waveIndex: 8, wave: { completesRun: false } }, 10).action,
  "victory_lap"
);
assert.equal(
  game.getBaseRoutePostWaveTransition({ waveIndex: 7, wave: { completesRun: true } }, 9).action,
  "victory_lap"
);
assert.equal(
  game.getBaseRoutePostWaveTransition(
    { waveIndex: 7, wave: { completesRun: true, baseRouteVictoryLap: true } },
    9
  ).action,
  "result"
);
assert.ok(game.WAVE_CONFIG[0].spawnBudget < game.WAVE_CONFIG[2].spawnBudget);
assert.equal(game.WAVE_CONFIG[0].activeCap, 12);
assert.equal(game.WAVE_CONFIG[1].activeCap, 15);
assert.equal(game.WAVE_CONFIG[2].activeCap, 19);
assert.equal(game.WAVE_CONFIG[0].hazard, null);
assert.equal(game.WAVE_CONFIG[1].hazard, null);
assert.equal(game.WAVE_CONFIG[0].mix.shrike, 0);
assert.equal(game.WAVE_CONFIG[1].mix.shrike, 0);
assert.ok(game.WAVE_CONFIG[0].mix.scuttler > 0.9);
assert.ok(game.WAVE_CONFIG[1].mix.brute >= 0.3);
assert.ok(game.WAVE_CONFIG[2].hazard?.damage > 0);
assert.equal(game.WAVE_CONFIG[0].arena.width, 1080);
assert.equal(game.WAVE_CONFIG[1].arena.width, 1160);
assert.equal(game.WAVE_CONFIG[2].arena.width, 1220);
assert.equal(game.WAVE_CONFIG[3].arena.width, 1260);
assert.ok(game.WAVE_CONFIG[3].arena.width > game.WAVE_CONFIG[0].arena.width);
assert.ok(game.WAVE_CONFIG[3].activeCap < 30);
assert.ok(game.WAVE_CONFIG[3].spawnBudget < 120);
assert.equal(game.WAVE_CONFIG[3].activeCap, 22);
assert.equal(game.WAVE_CONFIG[3].spawnBudget, 88);
assert.equal(game.WAVE_CONFIG[4].hazard, undefined);
assert.ok(game.WAVE_CONFIG[3].hazard.damage > 0);
assert.ok(game.WAVE_CONFIG[4].driveGainFactor > game.WAVE_CONFIG[3].driveGainFactor);
assert.equal(game.WAVE_CONFIG[4].arena.width, 1520);
assert.equal(game.WAVE_CONFIG[4].arena.height, 860);
assert.ok(game.WAVE_CONFIG[8].arena.width > game.WAVE_CONFIG[4].arena.width);
assert.ok(game.WAVE_CONFIG[8].arena.height > game.WAVE_CONFIG[4].arena.height);
assert.ok(game.WAVE_CONFIG[4].activeCap < game.WAVE_CONFIG[3].activeCap);
assert.ok(game.WAVE_CONFIG[4].spawnBudget < game.WAVE_CONFIG[5].spawnBudget);
assert.equal(game.WAVE_CONFIG[4].activeCap, 16);
assert.equal(game.WAVE_CONFIG[4].spawnBudget, 88);
assert.equal(game.WAVE_CONFIG[5].hazard.type, "relay");
assert.ok(game.WAVE_CONFIG[5].activeCap <= game.WAVE_CONFIG[4].activeCap + 2);
assert.ok(game.WAVE_CONFIG[5].arena.width > game.WAVE_CONFIG[4].arena.width);
assert.equal(game.WAVE_CONFIG[5].activeCap, 17);
assert.equal(game.WAVE_CONFIG[5].spawnBudget, 92);
assert.equal(game.WAVE_CONFIG[5].arena.width, 1720);
assert.equal(game.WAVE_CONFIG[5].arena.height, 980);
assert.ok(game.WAVE_CONFIG[5].hazard.interval > 11);
assert.equal(game.WAVE_CONFIG[4].label, "Wave 5 · Payoff Run");
assert.equal(game.WAVE_CONFIG[5].label, "Wave 6 · Crown Breach");
assert.equal(game.WAVE_CONFIG[6].label, "Wave 7 · Dominion Sweep");
assert.equal(game.WAVE_CONFIG[7].label, "Wave 8 · Dominion Proof");
const baseRouteVictoryLap = game.createBaseRouteVictoryLapWave(game.createInitialBuild("rail_zeal"));
assert.equal(baseRouteVictoryLap.label, "Victory Lap · Dominion Run");
assert.equal(baseRouteVictoryLap.completesRun, true);
assert.equal(baseRouteVictoryLap.baseRouteVictoryLap, true);
assert.equal(baseRouteVictoryLap.hazard, null);
assert.ok(baseRouteVictoryLap.arena.width > game.WAVE_CONFIG[8].arena.width);
assert.ok(baseRouteVictoryLap.spawnBudget < game.WAVE_CONFIG[8].spawnBudget);
assert.ok(baseRouteVictoryLap.activeCap < game.WAVE_CONFIG[8].activeCap);
assert.equal(baseRouteVictoryLap.arena.width, 1820);
assert.equal(baseRouteVictoryLap.arena.height, 1020);
assert.equal(baseRouteVictoryLap.spawnBudget, 66);
assert.equal(baseRouteVictoryLap.activeCap, 18);
assert.equal(game.WAVE_CONFIG[7].label, "Wave 8 · Dominion Proof");
assert.equal(game.WAVE_CONFIG[8].label, "Wave 9 · Payoff Run+");
assert.equal(game.WAVE_CONFIG[9].label, "Wave 10 · Crown Proof+");
assert.equal(game.WAVE_CONFIG[4].directive, "가장 넓은 flank부터 비우고 열린 lane 둘 중 하나를 오래 붙든다.");
assert.equal(game.WAVE_CONFIG[5].directive, "가장 먼 relay를 먼저 끊고 뚫린 corridor 하나를 길게 지킨다.");
assert.equal(
  game.WAVE_CONFIG[6].directive,
  "가장 넓은 flank를 먼저 비우고 같은 gun/body lane 하나를 오래 붙들며 점유 시간을 늘린다."
);
assert.equal(
  game.WAVE_CONFIG[7].directive,
  "가장 넓은 외곽 lane을 먼저 비우고 같은 gun/body 화선을 끝까지 밀어 점유 시간을 늘린다."
);
assert.equal(game.WAVE_CONFIG[5].pressureFamily, "breach");
assert.equal(game.WAVE_CONFIG[5].hazard.type, "relay");
assert.ok((game.WAVE_CONFIG[5].mix.binder || 0) > 0);
assert.ok((game.WAVE_CONFIG[5].mix.lancer || 0) > 0);
assert.equal(game.WAVE_CONFIG[5].mix.mortar || 0, 0);
assert.equal(game.WAVE_CONFIG[6].pressureFamily, "domination");
assert.equal(game.WAVE_CONFIG[6].activeCap, 18);
assert.equal(game.WAVE_CONFIG[6].spawnBudget, 100);
assert.equal(game.WAVE_CONFIG[6].hazard.type, "drift");
assert.ok((game.WAVE_CONFIG[6].mix.binder || 0) > 0);
assert.equal(game.WAVE_CONFIG[6].arena.width, 1840);
assert.equal(game.WAVE_CONFIG[6].arena.height, 1040);
assert.ok(game.WAVE_CONFIG[6].arena.width > game.WAVE_CONFIG[5].arena.width);
assert.ok(game.WAVE_CONFIG[6].activeCap < game.WAVE_CONFIG[7].activeCap);
assert.equal(game.WAVE_CONFIG[7].pressureFamily, "domination");
assert.equal(game.WAVE_CONFIG[7].activeCap, 19);
assert.equal(game.WAVE_CONFIG[7].spawnBudget, 108);
assert.equal(game.WAVE_CONFIG[7].arena.width, 1920);
assert.equal(game.WAVE_CONFIG[7].arena.height, 1080);
assert.ok(game.WAVE_CONFIG[7].hazard.interval > 10);
assert.equal(game.WAVE_CONFIG[7].hazard.type, "territory");
assert.ok((game.WAVE_CONFIG[7].mix.binder || 0) > 0);
assert.ok((game.WAVE_CONFIG[7].mix.warden || 0) >= 0.1);
assert.equal(game.WAVE_CONFIG[8].activeCap, 26);
assert.equal(game.WAVE_CONFIG[9].activeCap, 30);
assert.equal(game.WAVE_CONFIG[10].activeCap, 28);
assert.equal(game.WAVE_CONFIG[11].activeCap, 33);
assert.equal(game.WAVE_CONFIG[8].arena.width, 1700);
assert.equal(game.WAVE_CONFIG[8].arena.height, 980);
assert.equal(game.WAVE_CONFIG[9].arena.width, 1640);
assert.equal(game.WAVE_CONFIG[10].arena.width, 1760);
assert.equal(game.WAVE_CONFIG[11].arena.width, 1680);
assert.ok(game.WAVE_CONFIG[10].arena.width > game.WAVE_CONFIG[9].arena.width);
assert.equal(game.WAVE_CONFIG[8].pressureFamily, "domination");
assert.equal(game.WAVE_CONFIG[8].hazard, undefined);
assert.equal(game.WAVE_CONFIG[9].hazard.type, "relay");
assert.equal(game.WAVE_CONFIG[9].pressureFamily, "breach");
assert.equal(game.WAVE_CONFIG[9].hazard.count, 1);
assert.ok(game.WAVE_CONFIG[9].hazard.relayWidth > 0);
assert.equal(game.WAVE_CONFIG[10].label, "Wave 11 · Refuge Run");
assert.equal(game.WAVE_CONFIG[11].label, "Wave 12 · Final Stand");
assert.equal(game.WAVE_CONFIG[10].pressureFamily, "pursuit");
assert.equal(game.WAVE_CONFIG[11].pressureFamily, "hold");
const roadmapBuild = game.createInitialBuild("rail_zeal");
const shippedLadder = game.getShippingLadderSteps(roadmapBuild, game.computeWeaponStats(roadmapBuild), 5);
assert.equal(shippedLadder.length, 4);
assert.equal(
  JSON.stringify(shippedLadder.map((step) => step.label)),
  JSON.stringify(["START", "THESIS", "INSTALL", "LAP"])
);
const openingContractSummary = game.getShippingContractSummary(
  roadmapBuild,
  game.computeWeaponStats(roadmapBuild),
  1
);
assert.equal(openingContractSummary.titleLabel, "현재 선체");
assert.equal(openingContractSummary.titleValue, "빈 선체");
assert.equal(openingContractSummary.leadLabel, "다음 변이");
assert.equal(openingContractSummary.leadValue, "Wave 3 무기 방향");
const leanStartLaunchSummary = game.getLeanStartLaunchSummary(
  roadmapBuild,
  game.computeWeaponStats(roadmapBuild)
);
assert.equal(leanStartLaunchSummary.title, "빈 선체 돌입");
assert.ok(leanStartLaunchSummary.detail.includes("Wave 3 무기 방향"));
assert.equal(leanStartLaunchSummary.hullLabel, "현재 선체");
assert.equal(leanStartLaunchSummary.hullValue, "빈 선체");
assert.equal(leanStartLaunchSummary.hookLabel, "첫 도약");
assert.equal(leanStartLaunchSummary.hookValue, "Wave 3 무기 방향");
assert.ok(!leanStartLaunchSummary.detail.includes("Wave 6"));
assert.ok(!leanStartLaunchSummary.detail.includes("Wave 8"));
const openingLiveStatus = game.getLiveSideBetSummary({
  build: roadmapBuild,
  waveIndex: 0,
  phase: "wave",
  wave: {},
  catalystCrucible: { active: false },
  overcommit: { active: false },
  doctrinePursuit: { active: false },
});
assert.equal(openingLiveStatus?.label, "조용한 선체");
assert.equal(openingLiveStatus?.status, "Wave 3 무기 방향");
assert.ok(!/Wave 6|방호|보조|Late Break|Ascension/.test(openingLiveStatus?.note || ""));
const midrunContractSummary = game.getShippingContractSummary(
  roadmapBuild,
  game.computeWeaponStats(roadmapBuild),
  5
);
assert.equal(midrunContractSummary.titleLabel, "무기 변이");
assert.equal(midrunContractSummary.leadLabel, "다음 설치");
assert.equal(midrunContractSummary.leadValue, "Wave 6 지원 설치");
const supportSurgeBuild = game.createInitialBuild("rail_zeal");
supportSurgeBuild.wave6ChassisBreakpoint = true;
supportSurgeBuild.supportSystems = [{ id: "seeker_array", tier: 1 }];
supportSurgeBuild.supportSystemId = "seeker_array";
supportSurgeBuild.supportSystemTier = 1;
const seekerBaseline = game.computeSupportSystemStats(supportSurgeBuild, 5);
const seekerSurge = game.computeSupportSystemStats(supportSurgeBuild, 6);
assert.equal(seekerBaseline.orbitCount, 1);
assert.equal(seekerSurge.orbitCount, 2);
assert.ok(seekerSurge.shotCooldown < seekerBaseline.shotCooldown);
assert.ok(seekerSurge.shotDamage > seekerBaseline.shotDamage);
const aegisSurgeBuild = game.createInitialBuild("rail_zeal");
aegisSurgeBuild.wave6ChassisBreakpoint = true;
aegisSurgeBuild.supportSystems = [{ id: "aegis_halo", tier: 1 }];
aegisSurgeBuild.supportSystemId = "aegis_halo";
aegisSurgeBuild.supportSystemTier = 1;
const aegisBaselineStats = game.computeSupportSystemStats(aegisSurgeBuild, 5);
const aegisSurgeStats = game.computeSupportSystemStats(aegisSurgeBuild, 6);
const aegisOverclockStats = game.computeSupportSystemStats(aegisSurgeBuild, 8);
assert.equal(aegisBaselineStats.orbitCount, 1);
assert.equal(aegisSurgeStats.orbitCount, 1);
assert.ok(aegisSurgeStats.interceptCooldown < aegisBaselineStats.interceptCooldown);
assert.ok(aegisSurgeStats.interceptPulseRadius > aegisBaselineStats.interceptPulseRadius);
assert.ok(aegisOverclockStats.interceptPulseRadius > aegisSurgeStats.interceptPulseRadius);
const sentrySurgeBuild = game.createInitialBuild("rail_zeal");
sentrySurgeBuild.wave6ChassisBreakpoint = true;
sentrySurgeBuild.supportSystems = [{ id: "kiln_sentry", tier: 1 }];
sentrySurgeBuild.supportSystemId = "kiln_sentry";
sentrySurgeBuild.supportSystemTier = 1;
const sentryBaseline = game.computeSupportSystemStats(sentrySurgeBuild, 5);
const sentrySurge = game.computeSupportSystemStats(sentrySurgeBuild, 8);
assert.equal(sentryBaseline.deployCount, 1);
assert.equal(sentrySurge.deployCount, 2);
assert.ok(sentrySurge.systems[0].deployShotCooldown < sentryBaseline.systems[0].deployShotCooldown);
assert.ok(sentrySurge.systems[0].deployShotDamage > sentryBaseline.systems[0].deployShotDamage);
assert.ok(!shippedLadder.some((step) => step.label === "점화"));
assert.equal(game.createWildcardProtocolChoice(roadmapBuild, 4), null);
assert.equal(game.createWildcardProtocolChoice(roadmapBuild, 7), null);
assert.equal(game.createWildcardProtocolChoice(roadmapBuild, 10), null);
const wave5ForgeChoices = game.buildForgeChoices(roadmapBuild, Math.random, 999, {
  nextWave: 5,
  finalForge: false,
});
assert.equal(wave5ForgeChoices.length, 2);
assert.equal(wave5ForgeChoices.find((choice) => choice.contractRole === "headline")?.action, "afterglow_mutation");
assert.equal(wave5ForgeChoices.find((choice) => choice.contractRole === "headline")?.type, "utility");
const wave5RiderChoice = wave5ForgeChoices.find((choice) => choice.contractRole === "rider");
assert.ok(
  wave5RiderChoice &&
    ((wave5RiderChoice.type === "affix" && wave5RiderChoice.affixId === "thermal_weave") ||
      (wave5RiderChoice.type === "mod" &&
        ["armor_mesh", "step_servos", "coolant_purge"].includes(wave5RiderChoice.modId)) ||
      wave5RiderChoice.type === "fallback")
);
assert.equal(
  game.getBaseRouteBranchPayoffSummary({
    build: roadmapBuild,
    supportSystem: game.computeSupportSystemStats(roadmapBuild),
    waveNumber: 5,
  }),
  null
);
assert.equal(
  game.getMinimalBaseRouteHudVisibility({ paused: true, phase: "combat" }).minimal,
  true
);
assert.equal(
  game.getMinimalBaseRouteHudVisibility({ paused: false, phase: "forge" }).minimal,
  false
);
const greedBuild = game.createInitialBuild("rail_zeal");
game.applyForgeChoice(
  { build: greedBuild, resources: { scrap: 999 }, stats: { scrapSpent: 0 }, feed: [] },
  game.createFieldGreedContractChoice(greedBuild, 5)
);
const greedPayoff = game.getBaseRouteBranchPayoffSummary({
  build: greedBuild,
  supportSystem: game.computeSupportSystemStats(greedBuild),
  waveNumber: 5,
});
assert.equal(greedPayoff?.label, "분기 보상");
assert.equal(greedPayoff?.value, "Entry Vault");
const wave6PreviewBuild = game.createInitialBuild("rail_zeal");
wave6PreviewBuild.architectureForecastId = "storm_artillery";
const wave6Choices = game.buildWave6ChassisBreakpointChoices(wave6PreviewBuild, () => 0, 6);
const chassisOnlyChoice = wave6Choices.find((choice) => choice.chassisTitle);
assert.ok(chassisOnlyChoice);
const wave6PreviewRows = game.createForgePreviewRows(chassisOnlyChoice);
assert.equal(wave6PreviewRows[0]?.label, "차체");
assert.ok(["추적 랙", "방호 고리", "거점 포탑", "절단 고리"].includes(wave6PreviewRows[1]?.label));
assert.equal(wave6PreviewRows[2]?.label, "즉시 변화");
assert.ok(!wave6PreviewRows.some((row) => /빈 보조칸|후속 보조 선택|다음 방호/.test(row.label) || /빈 보조칸|후속 보조 선택|다음 방호/.test(row.value)));
const wave6SingleAxisChoiceTransformation = game.getBaseRouteForgeChoiceTransformation(chassisOnlyChoice);
assert.ok(!wave6SingleAxisChoiceTransformation.promise.includes("빈 보조칸"));
assert.ok(!wave6SingleAxisChoiceTransformation.promise.includes("후속 보조 선택"));
assert.ok(wave6Choices.every((choice) => choice.bayUnlock));
assert.ok(wave6Choices.every((choice) => choice.systemChoice));
assert.ok(wave6Choices.every((choice) => !choice.singleAxisBreakpoint));
assert.ok(!chassisOnlyChoice.description.includes("Late Break Armory"));
assert.ok(!chassisOnlyChoice.description.includes("Wave 9"));
assert.ok(chassisOnlyChoice.description.includes("Wave 6"));
assert.ok(!chassisOnlyChoice.description.includes("Wave 8"));
assert.ok(!chassisOnlyChoice.description.includes("support bay"));
assert.ok(chassisOnlyChoice.description.includes("pocket ownership"));
const chassisBranchBuild = game.createInitialBuild("rail_zeal");
chassisBranchBuild.architectureForecastId = "storm_artillery";
game.applyForgeChoice(
  {
    build: chassisBranchBuild,
    resources: { scrap: 999 },
    stats: { scrapSpent: 0 },
    feed: [],
    supportSystem: game.computeSupportSystemStats(chassisBranchBuild),
  },
  chassisOnlyChoice
);
const wave6SupportStats = game.computeSupportSystemStats(chassisBranchBuild);
assert.equal(wave6SupportStats?.id, "ember_ring");
const supportPayoff = game.getBaseRouteBranchPayoffSummary({
  build: chassisBranchBuild,
  supportSystem: wave6SupportStats,
  waveNumber: 7,
});
assert.equal(supportPayoff?.label, "절단 고리");
assert.equal(supportPayoff?.value, "근접 요격 + 외곽 소각");
assert.equal(game.getSupportBayCapacity(chassisBranchBuild), 2);
assert.equal(chassisBranchBuild.supportSystems.length, 1);
assert.equal(chassisBranchBuild.wave6ChassisBreakpoint, true);
assert.equal(JSON.stringify(game.getVisibleSupportOfferSystemIds(chassisBranchBuild, 7)), JSON.stringify([]));
assert.equal(JSON.stringify(game.getVisibleSupportOfferSystemIds(chassisBranchBuild, 8)), JSON.stringify(["seeker_array"]));
const wave8PayoffChoices = game.buildForgeChoices(chassisBranchBuild, () => 0, 999, {
  nextWave: 8,
  finalForge: false,
});
const wave8PayoffRider = wave8PayoffChoices.find((choice) => choice.contractRole === "rider");
assert.equal(wave8PayoffRider?.type, "system");
assert.equal(wave8PayoffRider?.systemId, "ember_ring");
assert.equal(wave8PayoffRider?.systemTier, 2);
assert.ok(wave8PayoffRider?.slotText.includes("기존 베이 증설"));
assert.ok(!wave8PayoffRider?.description.includes("눈에 띄는 support silhouette"));
const shippedLadderWave6 = game.getShippingLadderSteps(
  chassisBranchBuild,
  game.computeWeaponStats(chassisBranchBuild),
  6
);
assert.equal(shippedLadderWave6[2].label, "INSTALL");
assert.ok(shippedLadderWave6[2].detail.includes("Wave 6-7"));
assert.ok(shippedLadderWave6[2].detail.includes("Ember Ring"));
const shippedRoadmapWave6 = game.getBuildRoadmap(
  chassisBranchBuild,
  game.computeWeaponStats(chassisBranchBuild),
  6
);
assert.ok(shippedRoadmapWave6.steps[1].detail.includes("Ember Ring"));
assert.ok(shippedRoadmapWave6.steps[1].detail.includes("같은 실루엣"));
const shippedRoadmapMarkup = game.createShippingLadderMarkup(
  chassisBranchBuild,
  game.computeWeaponStats(chassisBranchBuild),
  6
);
assert.ok(shippedRoadmapMarkup.includes("설치"));
assert.ok(shippedRoadmapMarkup.includes("주력 변이"));
assert.ok(!shippedRoadmapMarkup.includes("분기 보상"));
assert.ok(shippedRoadmapMarkup.includes("route-contract--double"));
const aegisSpotlightBuild = game.createInitialBuild("rail_zeal");
game.applyForgeChoice(
  {
    build: aegisSpotlightBuild,
    resources: { scrap: 999 },
    stats: { scrapSpent: 0 },
    feed: [],
  },
  {
    type: "system",
    systemId: "aegis_halo",
    systemTier: 1,
    title: "Aegis Halo",
    tag: "SYSTEM",
  }
);
const aegisPayoff = game.getBaseRouteBranchPayoffSummary({
  build: aegisSpotlightBuild,
  supportSystem: game.computeSupportSystemStats(aegisSpotlightBuild),
  waveNumber: 7,
});
assert.equal(aegisPayoff?.label, "방호 고리");
assert.equal(aegisPayoff?.value, "탄막 절개 + 방호 파동");
const aegisInstalledPayoff = game.getSupportSystemInstalledPayoff("aegis_halo", 1);
assert.equal(aegisInstalledPayoff?.label, "방호 고리");
assert.equal(aegisInstalledPayoff?.value, "탄막 절개 + 방호 파동");
assert.ok(aegisInstalledPayoff?.feed.includes("방호 파동"));
const aegisLiveStatus = game.getLiveSideBetSummary({
  build: aegisSpotlightBuild,
  waveIndex: 6,
  phase: "wave",
  wave: {},
  catalystCrucible: { active: false },
  overcommit: { active: false },
  doctrinePursuit: { active: false },
});
assert.equal(aegisLiveStatus?.label, "Wave 8 숙련 랩");
assert.equal(aegisLiveStatus?.status, "Ember Spindle · Aegis Halo");
assert.ok(aegisLiveStatus?.note.includes("Wave 6"));
const aegisProofBuild = game.createInitialBuild("rail_zeal");
aegisProofBuild.chassisId = "vector_thrusters";
aegisProofBuild.supportSystems = [{ id: "aegis_halo", tier: 1 }];
const aegisWave6Config = game.resolveWaveConfig(5, aegisProofBuild);
assert.equal(aegisWave6Config.supportProof?.label, "Halo Scissor");
assert.equal(aegisWave6Config.supportProof?.status, "bullet seam breach");
assert.ok(aegisWave6Config.directive.includes("Halo가 자른 탄선 틈"));
assert.ok((aegisWave6Config.mix.shrike || 0) >= 0.2);
assert.ok((aegisWave6Config.mix.lancer || 0) >= 0.14);
assert.ok((aegisWave6Config.activeCap || 0) <= 15);
assert.ok((aegisWave6Config.arena?.width || 0) >= 1760);
const aegisWave7Config = game.resolveWaveConfig(6, aegisProofBuild);
assert.equal(aegisWave7Config.supportProof?.label, "Halo Re-entry");
assert.equal(aegisWave7Config.supportProof?.status, "tight pocket re-entry");
assert.ok(aegisWave7Config.directive.includes("재진입 seam"));
assert.ok((aegisWave7Config.mix.shrike || 0) >= 0.22);
assert.ok((aegisWave7Config.mix.brander || 0) >= 0.06);
const aegisWave8Config = game.resolveWaveConfig(7, aegisProofBuild);
assert.equal(aegisWave8Config.supportProof?.label, "Halo Bastion");
assert.equal(aegisWave8Config.supportProof?.status, "overclock pocket hold");
assert.ok(aegisWave8Config.directive.includes("pocket hold"));
assert.ok((aegisWave8Config.mix.warden || 0) >= 0.12);
const aegisProofLiveStatus = game.getLiveSideBetSummary({
  build: aegisProofBuild,
  waveIndex: 7,
  phase: "wave",
  wave: aegisWave8Config,
  catalystCrucible: { active: false },
  overcommit: { active: false },
  doctrinePursuit: { active: false },
});
assert.equal(aegisProofLiveStatus?.label, "Halo Bastion");
assert.equal(aegisProofLiveStatus?.status, "overclock pocket hold");
const kilnProofBuild = game.createInitialBuild("scrap_pact");
kilnProofBuild.chassisId = "bulwark_treads";
kilnProofBuild.supportSystems = [{ id: "kiln_sentry", tier: 1 }];
const kilnWave6Config = game.resolveWaveConfig(5, kilnProofBuild);
assert.equal(kilnWave6Config.supportProof?.label, "Kiln Crosshold");
assert.ok(kilnWave6Config.directive.includes("binder와 warden"));
assert.ok((kilnWave6Config.mix.binder || 0) >= 0.16);
const kilnWave7Config = game.resolveWaveConfig(6, kilnProofBuild);
assert.equal(kilnWave7Config.supportProof?.label, "Kiln Reclaim");
assert.ok(kilnWave7Config.directive.includes("brander"));
const kilnLiveStatus = game.getLiveSideBetSummary({
  build: kilnProofBuild,
  waveIndex: 5,
  phase: "wave",
  wave: kilnWave6Config,
  catalystCrucible: { active: false },
  overcommit: { active: false },
  doctrinePursuit: { active: false },
});
assert.equal(kilnLiveStatus?.label, "Kiln Crosshold");
assert.equal(kilnLiveStatus?.status, "forward pocket hold");
const seekerProofBuild = game.createInitialBuild("rail_zeal");
seekerProofBuild.chassisId = "vector_thrusters";
seekerProofBuild.supportSystems = [{ id: "seeker_array", tier: 1 }];
const seekerWave6Config = game.resolveWaveConfig(5, seekerProofBuild);
assert.equal(seekerWave6Config.supportProof?.label, "Seeker Sweep");
assert.equal(seekerWave6Config.supportProof?.status, "outer lane delete");
assert.ok(seekerWave6Config.directive.includes("outer pocket"));
assert.ok((seekerWave6Config.mix.skimmer || 0) >= 0.17);
assert.ok((seekerWave6Config.mix.mortar || 0) >= 0.05);
const seekerWave7Config = game.resolveWaveConfig(6, seekerProofBuild);
assert.equal(seekerWave7Config.supportProof?.label, "Seeker Shear");
assert.equal(seekerWave7Config.supportProof?.status, "crosslane shear");
assert.ok(seekerWave7Config.directive.includes("같은 flank"));
assert.ok((seekerWave7Config.mix.lancer || 0) >= 0.14);
assert.ok((seekerWave7Config.mix.shrike || 0) >= 0.2);
const seekerWave8Config = game.resolveWaveConfig(7, seekerProofBuild);
assert.equal(seekerWave8Config.supportProof?.label, "Seeker Overclock");
assert.equal(seekerWave8Config.supportProof?.status, "barrage corridor chain");
assert.ok(seekerWave8Config.directive.includes("corridor"));
assert.ok((seekerWave8Config.mix.warden || 0) >= 0.12);
assert.ok((seekerWave8Config.mix.mortar || 0) >= 0.04);
const seekerProofLiveStatus = game.getLiveSideBetSummary({
  build: seekerProofBuild,
  waveIndex: 7,
  phase: "wave",
  wave: seekerWave8Config,
  catalystCrucible: { active: false },
  overcommit: { active: false },
  doctrinePursuit: { active: false },
});
assert.equal(seekerProofLiveStatus?.label, "Seeker Overclock");
assert.equal(seekerProofLiveStatus?.status, "barrage corridor chain");
const supportContractSummary = game.getShippingContractSummary(
  seekerProofBuild,
  game.computeWeaponStats(seekerProofBuild),
  7
);
assert.equal(supportContractSummary.titleLabel, "설치");
assert.equal(supportContractSummary.titleValue, "Seeker Array");
assert.equal(supportContractSummary.leadLabel, "주력 변이");
assert.ok(supportContractSummary.leadValue.length > 0);
const openingForgeBuild = game.createInitialBuild("rail_zeal");
const openingForgeSummary = game.getShippingContractSummary(
  openingForgeBuild,
  game.computeWeaponStats(openingForgeBuild),
  1,
  { phase: "forge" }
);
assert.equal(openingForgeSummary.titleLabel, "현재 선체");
assert.equal(openingForgeSummary.titleValue, "빈 선체");
assert.equal(openingForgeSummary.leadLabel, "다음 설치");
assert.equal(openingForgeSummary.leadValue, "Wave 3 무기 방향");
const supportForgeSummary = game.getShippingContractSummary(
  seekerProofBuild,
  game.computeWeaponStats(seekerProofBuild),
  7,
  { phase: "forge" }
);
assert.equal(supportForgeSummary.titleLabel, "설치");
assert.equal(supportForgeSummary.leadLabel, "주력 변이");
assert.ok(supportForgeSummary.leadValue.length > 0);
const closingForgeSummary = game.getShippingContractSummary(
  seekerProofBuild,
  game.computeWeaponStats(seekerProofBuild),
  8,
  { phase: "forge" }
);
assert.equal(closingForgeSummary.titleLabel, "설치");
assert.equal(closingForgeSummary.leadLabel, "주력 변이");
assert.ok(closingForgeSummary.leadValue.length > 0);
const seekerDominantForm = game.getDominantFormSummary(
  seekerProofBuild,
  game.computeWeaponStats(seekerProofBuild),
  7
);
assert.ok(seekerDominantForm.label.includes("Seeker Array"));
const seekerShippedMarkup = game.createShippingLadderMarkup(
  seekerProofBuild,
  game.computeWeaponStats(seekerProofBuild),
  7
);
assert.ok(seekerShippedMarkup.includes("Seeker Array"));
const seekerResultCopy = game.getBaseRouteResultCopy(
  seekerProofBuild,
  game.computeWeaponStats(seekerProofBuild),
  true
);
assert.ok(seekerResultCopy.includes("완성 시험"));
assert.ok(seekerResultCopy.includes("승리 랩"));
assert.ok(seekerResultCopy.includes("Seeker Array"));
assert.ok(!seekerResultCopy.includes("Wave 9"));
assert.ok(!seekerResultCopy.includes("중반 보조 축"));
const droneProofBuild = game.createInitialBuild("scrap_pact");
droneProofBuild.chassisId = "bulwark_treads";
droneProofBuild.supportSystems = [{ id: "volt_drones", tier: 1 }];
const droneWave6Config = game.resolveWaveConfig(5, droneProofBuild);
assert.equal(droneWave6Config.supportProof?.label, "Drone Screen");
assert.equal(droneWave6Config.supportProof?.status, "rear screen reset");
assert.ok(droneWave6Config.directive.includes("뒤쪽 pocket"));
assert.ok((droneWave6Config.mix.shrike || 0) >= 0.15);
assert.ok((droneWave6Config.mix.binder || 0) >= 0.18);
const droneWave7Config = game.resolveWaveConfig(6, droneProofBuild);
assert.equal(droneWave7Config.supportProof?.label, "Drone Re-entry");
assert.equal(droneWave7Config.supportProof?.status, "tail seam re-entry");
assert.ok(droneWave7Config.directive.includes("rear screen"));
assert.ok((droneWave7Config.mix.binder || 0) >= 0.17);
assert.ok((droneWave7Config.mix.brander || 0) >= 0.05);
const droneWave8Config = game.resolveWaveConfig(7, droneProofBuild);
assert.equal(droneWave8Config.supportProof?.label, "Drone Overclock");
assert.equal(droneWave8Config.supportProof?.status, "rolling refuge chain");
assert.ok(droneWave8Config.directive.includes("refuge"));
assert.ok((droneWave8Config.mix.brute || 0) >= 0.18);
assert.ok((droneWave8Config.mix.binder || 0) >= 0.09);
const droneProofLiveStatus = game.getLiveSideBetSummary({
  build: droneProofBuild,
  waveIndex: 7,
  phase: "wave",
  wave: droneWave8Config,
  catalystCrucible: { active: false },
  overcommit: { active: false },
  doctrinePursuit: { active: false },
});
assert.equal(droneProofLiveStatus?.label, "Drone Overclock");
assert.equal(droneProofLiveStatus?.status, "rolling refuge chain");
const hiddenPursuitStatus = game.getLiveSideBetSummary({
  build: {
    ...game.createInitialBuild("rail_zeal"),
    bastionDoctrineId: "storm_artillery",
    doctrinePursuitCommitted: true,
    doctrinePursuitProgress: 1,
    doctrineChaseClaimed: false,
  },
  waveIndex: 6,
  phase: "wave",
  wave: {},
  catalystCrucible: { active: false },
  overcommit: { active: false },
  doctrinePursuit: { active: true },
});
assert.equal(hiddenPursuitStatus?.label, "Wave 8 숙련 랩");
assert.equal(hiddenPursuitStatus?.status, "Wave 6 지원 설치");
assert.ok(hiddenPursuitStatus?.note.includes("Wave 6"));
const wave7FieldGrantChoices = game.buildFieldGrantChoices(chassisBranchBuild, () => 0, 7);
assert.equal(wave7FieldGrantChoices.find((choice) => choice.contractRole === "gamble"), undefined);
const wave7FieldGrantRiderChoice = wave7FieldGrantChoices.find((choice) => choice.contractRole === "rider");
assert.equal(wave7FieldGrantRiderChoice?.type, "system");
assert.equal(wave7FieldGrantRiderChoice?.systemId, "ember_ring");
assert.equal(wave7FieldGrantRiderChoice?.systemTier, 2);
const branchForgeContextMarkup = game.createBaseRouteForgeContextMarkup({
  currentFormLabel: "Twin Spine / Vector Thrusters",
  waveAskLabel: "다음 전장",
  waveAskValue: "Dominion Sweep",
  branchPayoffLabel: "분기 보상",
  branchPayoffValue: "Scrapline Raid",
});
assert.ok(branchForgeContextMarkup.includes("forge-ask-shell"));
assert.ok(branchForgeContextMarkup.includes("forge-ask-shell__eyebrow"));
assert.ok(branchForgeContextMarkup.includes("Dominion Sweep"));
assert.ok(branchForgeContextMarkup.includes("Twin Spine / Vector Thrusters"));
assert.ok(!branchForgeContextMarkup.includes("분기 보상"));
assert.ok(!branchForgeContextMarkup.includes("Scrapline Raid"));
const pauseSnapshotMarkup = game.createBaseRoutePauseSnapshotMarkup({
  build: greedBuild,
  weapon: game.computeWeaponStats(greedBuild),
  supportSystem: game.computeSupportSystemStats(greedBuild),
  waveIndex: 4,
  phase: "combat",
  paused: true,
});
assert.ok(pauseSnapshotMarkup.includes("다음 설치"));
assert.ok(pauseSnapshotMarkup.includes("machine-payoff"));
assert.ok(!pauseSnapshotMarkup.includes("summary-head"));
assert.ok(!pauseSnapshotMarkup.includes("최근 획득"));
assert.ok(!pauseSnapshotMarkup.includes("고철 +34 / 회수 +10% / Siege Debt 1웨이브"));
assert.ok(!pauseSnapshotMarkup.includes("활성 판돈"));
assert.ok(!pauseSnapshotMarkup.includes("Era III"));
assert.ok(!pauseSnapshotMarkup.includes("주력 변이"));
assert.ok(!pauseSnapshotMarkup.includes("방호·보조"));
assert.ok(!pauseSnapshotMarkup.includes("W5"));
const openingPauseSnapshotMarkup = game.createBaseRoutePauseSnapshotMarkup({
  build: roadmapBuild,
  weapon: game.computeWeaponStats(roadmapBuild),
  supportSystem: game.computeSupportSystemStats(roadmapBuild),
  waveIndex: 1,
  phase: "combat",
  paused: true,
});
assert.ok(openingPauseSnapshotMarkup.includes("다음 변이"));
assert.ok(openingPauseSnapshotMarkup.includes("현재 선체"));
assert.ok(openingPauseSnapshotMarkup.includes("빈 선체"));
assert.ok(openingPauseSnapshotMarkup.includes("machine-payoff"));
assert.ok(openingPauseSnapshotMarkup.includes("폭주 지형 없음."));
assert.ok(!openingPauseSnapshotMarkup.includes("summary-head"));
assert.ok(!openingPauseSnapshotMarkup.includes("최근 획득"));
assert.ok(!openingPauseSnapshotMarkup.includes("첫 포지 전"));
assert.ok(!openingPauseSnapshotMarkup.includes("pause-summary__lanes"));
assert.ok(!openingPauseSnapshotMarkup.includes("Bare Hull"));
assert.ok(!openingPauseSnapshotMarkup.includes("조용한 계약"));
assert.ok(!openingPauseSnapshotMarkup.includes("Wave 6"));
const supportPauseSnapshotMarkup = game.createBaseRoutePauseSnapshotMarkup({
  build: aegisSpotlightBuild,
  weapon: game.computeWeaponStats(aegisSpotlightBuild),
  supportSystem: game.computeSupportSystemStats(aegisSpotlightBuild),
  waveIndex: 6,
  phase: "combat",
  paused: true,
});
assert.ok(supportPauseSnapshotMarkup.includes("machine-payoff"));
assert.ok(supportPauseSnapshotMarkup.includes("설치"));
assert.ok(supportPauseSnapshotMarkup.includes("주력 변이"));
assert.ok(supportPauseSnapshotMarkup.includes("Aegis Halo"));
assert.ok(supportPauseSnapshotMarkup.indexOf("설치") < supportPauseSnapshotMarkup.indexOf("주력 변이"));
assert.ok(supportPauseSnapshotMarkup.includes("같은 seam으로 바로 재진입한다."));
assert.ok(!supportPauseSnapshotMarkup.includes("summary-head"));
assert.ok(!supportPauseSnapshotMarkup.includes("활성 보조"));
assert.ok(!supportPauseSnapshotMarkup.includes("활성 판돈"));
assert.ok(!supportPauseSnapshotMarkup.includes("탄막 절개 + 방호 파동"));
const supportPauseHeroSummary = game.getBaseRoutePauseHeroSummary({
  build: aegisSpotlightBuild,
  weapon: game.computeWeaponStats(aegisSpotlightBuild),
  supportSystem: game.computeSupportSystemStats(aegisSpotlightBuild),
  waveIndex: 6,
  phase: "combat",
  paused: true,
});
assert.equal(supportPauseHeroSummary.machineLabel, "설치");
assert.equal(supportPauseHeroSummary.machineValue, "Aegis Halo");
assert.equal(supportPauseHeroSummary.payoffLabel, "주력 변이");
const hiddenCombatCacheStatus = game.getLiveSideBetSummary({
  build: game.createInitialBuild("rail_zeal"),
  waveIndex: 4,
  phase: "wave",
  wave: {
    combatCache: {
      deployed: false,
      claimed: false,
    },
  },
  catalystCrucible: { active: false },
  overcommit: { active: false },
  doctrinePursuit: { active: false },
});
assert.equal(hiddenCombatCacheStatus?.label, "Wave 6 지원 설치");
assert.equal(hiddenCombatCacheStatus?.status, "Wave 6 지원 설치");
assert.ok(hiddenCombatCacheStatus?.note.includes("Wave 6"));
const liveCombatCacheStatus = game.getLiveSideBetSummary({
  build: game.createInitialBuild("rail_zeal"),
  waveIndex: 4,
  phase: "wave",
  wave: {
    combatCache: {
      deployed: true,
      claimed: false,
    },
  },
  catalystCrucible: { active: false },
  overcommit: { active: false },
  doctrinePursuit: { active: false },
});
assert.equal(liveCombatCacheStatus?.label, "Wave 6 지원 설치");
assert.equal(liveCombatCacheStatus?.status, "Wave 6 지원 설치");
assert.ok(!liveCombatCacheStatus?.note.includes("cache"));
const wave5GambleChoice = wave5ForgeChoices.find((choice) => choice.contractRole === "gamble");
assert.equal(wave5GambleChoice, undefined);
const scriptedMidrunGreedChoice = game.createFieldGreedContractChoice(
  game.createInitialBuild("rail_zeal"),
  5
);
assert.equal(scriptedMidrunGreedChoice.midrunGreedRouteUntilWave, 8);
assert.equal(scriptedMidrunGreedChoice.title, "Scrapline Raid");
assert.match(scriptedMidrunGreedChoice.slotText, /twin tow fork/i);
const midrunGreedBuild = game.createInitialBuild("rail_zeal");
const midrunGreedRun = {
  build: midrunGreedBuild,
  resources: { scrap: 0 },
  stats: { scrapCollected: 0, scrapSpent: 0 },
  player: { hp: 100, maxHp: 100, heat: 18, overheated: false },
};
game.applyForgeChoice(midrunGreedRun, scriptedMidrunGreedChoice);
assert.equal(midrunGreedRun.build.midrunGreedRouteUntilWave, 8);
assert.equal(game.isMidrunGreedRaidFrameActive(midrunGreedRun.build, 5), true);
assert.equal(game.isMidrunGreedRaidFrameActive(midrunGreedRun.build, 6), true);
assert.equal(game.isMidrunGreedRaidFrameActive(midrunGreedRun.build, 8), true);
assert.equal(game.isMidrunGreedRaidFrameActive(midrunGreedRun.build, 9), false);
assert.equal(midrunGreedRun.player.chassisSalvageBurstTime, 0.95);
const greedWave5 = game.applyMidrunGreedRouteConfig(
  game.resolveWaveConfig(4, midrunGreedRun.build),
  midrunGreedRun.build,
  5
);
const greedWave6 = game.applyMidrunGreedRouteConfig(
  game.resolveWaveConfig(5, midrunGreedRun.build),
  midrunGreedRun.build,
  6
);
const greedWave7 = game.applyMidrunGreedRouteConfig(
  game.resolveWaveConfig(6, midrunGreedRun.build),
  midrunGreedRun.build,
  7
);
const greedWave8 = game.applyMidrunGreedRouteConfig(
  game.resolveWaveConfig(7, midrunGreedRun.build),
  midrunGreedRun.build,
  8
);
assert.equal(greedWave5.hazard?.type, "salvage");
assert.equal(greedWave5.hazard?.label, "Scrapline Entry Vault");
assert.ok(greedWave5.note.includes("entry vault pocket"));
assert.ok(greedWave5.directive.includes("entry vault pocket"));
assert.ok(greedWave5.midrunGreedRoute);
assert.equal(greedWave5.midrunGreedRoute?.label, "Entry Vault");
assert.equal(greedWave6.hazard?.type, "salvage");
assert.equal(greedWave6.midrunGreedRoute?.label, "Tow Fork");
assert.equal(greedWave7.hazard?.type, "caravan");
assert.equal(greedWave7.midrunGreedRoute?.label, "Caravan Hook");
assert.equal(greedWave8.hazard?.type, "salvage");
assert.ok(greedWave6.note.includes("Greed route"));
assert.ok(greedWave7.directive.includes("caravan"));
assert.ok(greedWave8.midrunGreedRoute);
assert.equal(greedWave8.midrunGreedRoute?.label, "Jackpot Fork");
assert.equal(
  game.getBaseRouteBranchPayoffSummary({
    build: midrunGreedRun.build,
    supportSystem: game.computeSupportSystemStats(midrunGreedRun.build),
    waveNumber: 6,
  })?.value,
  "Tow Fork"
);
assert.equal(
  game.getBaseRouteBranchPayoffSummary({
    build: midrunGreedRun.build,
    supportSystem: game.computeSupportSystemStats(midrunGreedRun.build),
    waveNumber: 7,
  })?.value,
  "Caravan Hook"
);
assert.equal(
  game.getBaseRouteBranchPayoffSummary({
    build: midrunGreedRun.build,
    supportSystem: game.computeSupportSystemStats(midrunGreedRun.build),
    waveNumber: 8,
  })?.value,
  "Jackpot Fork"
);
const wave5FieldGrantChoices = game.buildFieldGrantChoices(game.createInitialBuild("rail_zeal"), Math.random, 5);
assert.equal(wave5FieldGrantChoices.length, 2);
assert.equal(wave5FieldGrantChoices.find((choice) => choice.contractRole === "headline")?.contractLabel, "주력");
assert.equal(wave5FieldGrantChoices.find((choice) => choice.contractRole === "rider")?.contractLabel, "버팀");
assert.equal(wave5FieldGrantChoices.find((choice) => choice.contractRole === "gamble"), undefined);
const wave6ForgeBuild = game.createInitialBuild("rail_zeal");
wave6ForgeBuild.bastionDoctrineId = "storm_artillery";
const wave6ForgeChoices = game.buildForgeChoices(wave6ForgeBuild, () => 0, 999, {
  nextWave: 6,
  finalForge: false,
});
assert.equal(wave6ForgeChoices.length, 2);
const wave6HeadlineChoice = wave6ForgeChoices.find((choice) => choice.contractRole === "headline");
assert.equal(wave6HeadlineChoice?.action, "bastion_bay_forge");
assert.equal(wave6HeadlineChoice?.contractLabel, "설치");
assert.equal(wave6HeadlineChoice?.systemChoice?.systemId, "ember_ring");
const wave6RiderChoice = wave6ForgeChoices.find((choice) => choice.contractRole === "rider");
assert.equal(wave6RiderChoice?.type, "evolution");
assert.equal(wave6RiderChoice?.contractLabel, "주포");
const wave6GambleChoice = wave6ForgeChoices.find((choice) => choice.contractRole === "gamble");
assert.equal(wave6GambleChoice, undefined);
assert.notEqual(wave6GambleChoice?.action, "affix_reforge");
const cappedHeadlineBuild = game.createInitialBuild("rail_zeal");
cappedHeadlineBuild.weaponEvolutions[cappedHeadlineBuild.coreId] = 3;
cappedHeadlineBuild.chassisId = "vector_thrusters";
cappedHeadlineBuild.pendingCores = ["ember", "scatter"];
const wave8HeadlineChoices = game.buildForgeChoices(cappedHeadlineBuild, () => 0, 999, {
  nextWave: 8,
  finalForge: false,
});
const wave8HeadlineChoice = wave8HeadlineChoices.find((choice) => choice.contractRole === "headline");
const strictWave8RiderChoice = wave8HeadlineChoices.find((choice) => choice.contractRole === "rider");
const strictWave8GambleChoice = wave8HeadlineChoices.find((choice) => choice.contractRole === "gamble");
assert.ok(
  wave8HeadlineChoice &&
    (wave8HeadlineChoice.type === "core" ||
      wave8HeadlineChoice.type === "evolution" ||
      wave8HeadlineChoice.type === "utility" ||
      wave8HeadlineChoice.type === "fallback")
);
assert.ok(
  strictWave8RiderChoice &&
    ((strictWave8RiderChoice.type === "affix" && strictWave8RiderChoice.affixId === "thermal_weave") ||
      (strictWave8RiderChoice.type === "mod" &&
        ["armor_mesh", "step_servos", "coolant_purge"].includes(strictWave8RiderChoice.modId)) ||
      strictWave8RiderChoice.type === "fallback")
);
assert.ok(strictWave8GambleChoice);
assert.notEqual(strictWave8GambleChoice?.action, "reforge");
assert.notEqual(strictWave8GambleChoice?.action, "affix_reforge");
const earlyRoadmap = game.getBuildRoadmap(roadmapBuild, game.computeWeaponStats(roadmapBuild), 1);
assert.equal(earlyRoadmap.steps.length, 3);
assert.equal(earlyRoadmap.steps[0].title, "첫 무기 도약");
assert.equal(earlyRoadmap.steps[1].title, "첫 차체 잠금");
assert.ok(earlyRoadmap.steps[1].detail.includes("Wave 6"));
assert.ok(earlyRoadmap.steps[1].detail.includes("차체"));
assert.equal(earlyRoadmap.steps[2].title, "완성 시험");
assert.ok(earlyRoadmap.steps[2].detail.includes("Wave 8"));
assert.ok(!earlyRoadmap.prompt.includes("Lance"));
assert.ok(!earlyRoadmap.note.includes("Lance"));
roadmapBuild.bastionDoctrineId = "storm_artillery";
roadmapBuild.overcommitUnlocked = true;
roadmapBuild.previewSupportSystemId = "volt_drones";
roadmapBuild.wildcardProtocolIds = ["rogue_lattice"];
const previewRoadmapSupportStats = game.computeSupportSystemStats(roadmapBuild);
assert.equal(previewRoadmapSupportStats, null);
const primedRoadmap = game.getBuildRoadmap(roadmapBuild, game.computeWeaponStats(roadmapBuild), 6);
assert.equal(primedRoadmap.steps[0].title, "Ember Spindle");
assert.equal(primedRoadmap.steps[0].state, "locked");
assert.equal(primedRoadmap.steps[1].title, "Bulwark Treads");
assert.equal(primedRoadmap.steps[1].state, "primed");
assert.ok(primedRoadmap.steps[1].detail.includes("Wave 6"));
assert.ok(primedRoadmap.steps[1].detail.includes("identity"));
assert.equal(primedRoadmap.steps[2].title, "완성 시험");
roadmapBuild.lateBreakProfileId = "mutation";
const consolidatedLateRoadmap = game.getBuildRoadmap(
  roadmapBuild,
  game.computeWeaponStats(roadmapBuild),
  9
);
assert.ok(consolidatedLateRoadmap.steps[2].detail.includes("짧은 승리 랩"));
assert.ok(!consolidatedLateRoadmap.steps[2].detail.includes("Wave 9-12"));
assert.ok(!consolidatedLateRoadmap.steps[2].detail.includes("Afterburn"));
assert.ok(!consolidatedLateRoadmap.steps[2].detail.includes("live ascension"));
const latePayoffSummary = game.getStandardLateRouteBeatSummary(roadmapBuild, 9);
const lateProofSummary = game.getStandardLateRouteBeatSummary(roadmapBuild, 11);
const lateFinaleSummary = game.getStandardLateRouteBeatSummary(roadmapBuild, 12);
assert.equal(latePayoffSummary.label, "Cataclysm Payoff");
assert.ok(latePayoffSummary.detail.includes("flank"));
assert.equal(lateProofSummary.label, "Refuge Run");
assert.ok(lateProofSummary.detail.includes("cadence"));
assert.equal(lateFinaleSummary.label, "Final Stand");
assert.ok(lateFinaleSummary.detail.includes("점유 시간"));
const lockgridRoadmap = game.getBuildRoadmap(roadmapBuild, game.computeWeaponStats(roadmapBuild), 9);
assert.ok(lockgridRoadmap.prompt.includes("Bulwark Treads"));
assert.ok(!lockgridRoadmap.prompt.includes("form track"));
assert.ok(lockgridRoadmap.note.includes("->"));
const eraOnePlan = game.getForgeEraPlan(roadmapBuild, game.computeWeaponStats(roadmapBuild), null, 1);
assert.equal(eraOnePlan.length, 1);
assert.equal(eraOnePlan[0].waveLabel, "Wave 1");
assert.equal(eraOnePlan[0].state, "live");
assert.equal(eraOnePlan[0].primaryLabel, "현재 선체");
assert.equal(eraOnePlan[0].proofLabel, "다음 설치");
assert.ok(eraOnePlan[0].secondaryLabel.length > 0);
assert.ok(eraOnePlan[0].proofLabel.length > 0);
const eraThreePlan = game.getForgeEraPlan(roadmapBuild, game.computeWeaponStats(roadmapBuild), null, 9);
assert.equal(eraThreePlan.length, 1);
assert.equal(eraThreePlan[0].state, "live");
assert.equal(eraThreePlan[0].waveLabel, "Wave 8");
assert.equal(eraThreePlan[0].proofLabel, "다음 설치");
assert.ok(eraThreePlan[0].proofDetail.length > 0);
const compactEraPanelMarkup = game.createEraContractPanelMarkup(
  roadmapBuild,
  game.computeWeaponStats(roadmapBuild),
  null,
  6
);
assert.ok(compactEraPanelMarkup.includes("현재 머신"));
assert.ok(compactEraPanelMarkup.includes("설치"));
assert.ok(compactEraPanelMarkup.includes("다음 설치"));
assert.ok(compactEraPanelMarkup.includes("machine-payoff"));
assert.ok(!compactEraPanelMarkup.includes("Era I"));
assert.ok(!compactEraPanelMarkup.includes("Headline Form"));
assert.ok(!compactEraPanelMarkup.includes("Survival Rider"));
assert.ok(!compactEraPanelMarkup.includes("Proof Band"));
const compactFocusMarkup = game.createBaseRouteFocusMarkup({
  eyebrow: "현재 형태",
  title: "Sky Lance",
  currentFormLabel: "Sky Lance",
  spotlightLabel: "다음 전장",
  spotlightValue: "Cataclysm Arsenal",
  tradeoffLabel: "판돈·유틸",
  tradeoffValue: "고철 42",
  tradeoffTone: "accent",
  compact: true,
});
assert.ok(compactFocusMarkup.includes("판돈·유틸"));
assert.ok(compactFocusMarkup.includes("고철 42"));
assert.ok(compactFocusMarkup.includes("Cataclysm Arsenal"));
assert.ok(!compactFocusMarkup.includes("다음 도약"));
const statusStripMarkup = game.createBaseRouteStatusStripMarkup({
  leadLabel: "현재 전장",
  leadValue: "Dominion Sweep",
  titleLabel: "현재 형태",
  titleValue: "Prism Crown",
});
assert.ok(statusStripMarkup.includes("route-contract--double"));
assert.ok(statusStripMarkup.includes("현재 전장"));
assert.ok(statusStripMarkup.includes("Dominion Sweep"));
assert.ok(statusStripMarkup.includes("Prism Crown"));
assert.ok(!statusStripMarkup.includes("다음 급등"));
assert.ok(!statusStripMarkup.includes("summary-head"));
const forgeContextMarkup = game.createBaseRouteForgeContextMarkup({
  currentFormLabel: "Prism Crown",
  waveAskLabel: "다음 전장",
  waveAskValue: "Dominion Sweep",
});
assert.ok(forgeContextMarkup.includes("forge-ask-shell__eyebrow"));
assert.ok(forgeContextMarkup.includes("Dominion Sweep"));
assert.ok(!forgeContextMarkup.includes("다음 급등"));
assert.ok(forgeContextMarkup.includes("forge-ask-shell"));
assert.ok(forgeContextMarkup.includes("forge-ask-shell__value"));
assert.ok(forgeContextMarkup.includes("Prism Crown"));
assert.ok(!forgeContextMarkup.includes("summary-head"));
assert.ok(!forgeContextMarkup.includes("Next Proof"));
assert.ok(!forgeContextMarkup.includes("Route Payoff"));
assert.ok(!forgeContextMarkup.includes("forge-contract-strip"));
assert.ok(!forgeContextMarkup.includes("forge-card__pivot--bill"));
assert.ok(!forgeContextMarkup.includes("세 장 중 하나만"));
assert.ok(!forgeContextMarkup.includes("다음 시험"));
assert.ok(!forgeContextMarkup.includes("보조 결"));
assert.ok(!forgeContextMarkup.includes("forge-focus__hint"));
assert.equal(
  game.getBaseRouteForgeContextTailSummary({
    riderStep: false,
    branchPreviewPayoff: { label: "새 보조", value: "Seeker Array" },
  }),
  null
);
assert.equal(
  game.getBaseRouteForgeContextTailSummary({
    riderStep: true,
    branchPreviewPayoff: { label: "새 보조", value: "Seeker Array" },
  }),
  null
);
const aegisRiderPreviewRows = game.createForgePreviewRows({
  type: "utility",
  action: "bastion_bay_forge",
  chassisTitle: "Bulwark Treads",
  systemChoice: {
    systemId: "aegis_halo",
    systemTier: 1,
    title: "Aegis Halo",
  },
});
assert.equal(aegisRiderPreviewRows[1].label, "방호 고리");
assert.equal(aegisRiderPreviewRows[2].value, "탄막 절개 + 방호 파동");
const aegisSpotlight = game.getSupportSystemSpotlight("aegis_halo", 1);
assert.equal(aegisSpotlight?.hudLabel, "방호 고리");
assert.equal(aegisSpotlight?.hudValue, "탄막 절개 + 방호 파동");
assert.ok(aegisSpotlight?.promise.includes("방호 고리"));
assert.ok(!aegisSpotlight?.feed.includes("Wave 8"));
const seekerSpotlight = game.getSupportSystemSpotlight("seeker_array", 2);
assert.equal(seekerSpotlight?.hudLabel, "추적 랙");
assert.equal(seekerSpotlight?.hudValue, "쌍미사일 + 측면 절단");
assert.ok(seekerSpotlight?.promise.includes("쌍미사일"));
assert.ok(seekerSpotlight?.proof.includes("자동 미사일"));
const droneSpotlight = game.getSupportSystemSpotlight("volt_drones", 3);
assert.equal(droneSpotlight?.hudLabel, "자율 편대");
assert.equal(droneSpotlight?.status, "4기 전격망");
assert.ok(droneSpotlight?.promise.includes("자동 전격망"));
const sentrySpotlight = game.getSupportSystemSpotlight("kiln_sentry", 2);
assert.equal(sentrySpotlight?.hudLabel, "거점 포탑");
assert.ok(sentrySpotlight?.feed.includes("교차 사격"));
const emberRingSpotlight = game.getSupportSystemSpotlight("ember_ring", 3);
assert.equal(emberRingSpotlight?.hudLabel, "절단 고리");
assert.equal(emberRingSpotlight?.hudValue, "근접 요격 + 연쇄 점화");
assert.ok(emberRingSpotlight?.proof.includes("연쇄 점화"));
assert.equal(
  game.getBaseRouteForgeContextTailSummary({
    riderStep: true,
    branchPreviewPayoff: game.getSupportSystemInstalledPayoff("aegis_halo", 1),
  }),
  null
);
const wave6SingleAxisTransformation = game.getBaseRouteForgeChoiceTransformation({
  type: "utility",
  action: "bastion_bay_forge",
  chassisTitle: "Bulwark Treads",
  singleAxisBreakpoint: true,
  bayUnlock: false,
});
assert.equal(wave6SingleAxisTransformation.accent, "Bulwark Treads");
assert.equal(wave6SingleAxisTransformation.previewValue, "hold, dive, exit 리듬 교체");
assert.ok(!wave6SingleAxisTransformation.promise.includes("body/support bracket"));
assert.ok(!wave6SingleAxisTransformation.proof.includes("Wave 8 마무리 포지"));
const seekerWave8Transformation = game.getBaseRouteForgeChoiceTransformation({
  type: "system",
  systemId: "seeker_array",
  systemTier: 2,
  title: "Seeker Array Mk.II",
  description: "Seeker Array를 2기 편대로 증설한다. 미사일 발사 간격이 짧아지고 두 갈래 탄막이 측면 교차 화선을 먼저 정리한다.",
  slotText: "공세 모듈 증설 · 미사일 랙 2기",
  forgeLaneLabel: "공세 모듈",
  contractRole: "rider",
});
assert.equal(seekerWave8Transformation.previewLabel, "추적 랙");
assert.equal(seekerWave8Transformation.previewValue, "쌍미사일 + 측면 절단");
assert.ok(seekerWave8Transformation.promise.includes("2기 편대"));
assert.ok(seekerWave8Transformation.proof.includes("측면 교차 화선"));
const forgeHeadlineMarkup = game.createBaseRouteForgeContextMarkup({
  title: "주력 변이",
  titleLabel: "다음 시험",
  currentFormLabel: "Payoff Run",
  waveAskLabel: "주력 변이",
  waveAskValue: "Afterglow",
});
assert.ok(forgeHeadlineMarkup.includes("주력 변이"));
assert.ok(forgeHeadlineMarkup.includes("Payoff Run"));
assert.ok(forgeHeadlineMarkup.includes("다음 시험"));
assert.ok(!forgeHeadlineMarkup.includes("Afterglow"));
assert.ok(forgeHeadlineMarkup.includes("forge-ask-shell"));
assert.ok(forgeHeadlineMarkup.includes("forge-ask-shell__eyebrow"));
assert.ok(!forgeHeadlineMarkup.includes("분기 보상"));
const forgeHeadlineSpotlight = game.getBaseRouteForgeSpotlightSummary({
  choice: wave6HeadlineChoice,
  proofWindowLabel: "Payoff Run",
});
assert.ok(forgeHeadlineSpotlight.titleLabel.length > 0);
assert.ok(forgeHeadlineSpotlight.titleValue.length > 0);
assert.equal(forgeHeadlineSpotlight.leadValue, "고리가 긁은 입구로 짧게 파고든다.");
const forgeRiderSpotlight = game.getBaseRouteForgeSpotlightSummary({
  choice: wave6RiderChoice,
  riderStep: true,
  proofWindowLabel: "Dominion Sweep",
});
assert.ok(forgeRiderSpotlight.titleLabel.length > 0);
assert.ok(forgeRiderSpotlight.titleValue.length > 0);
assert.equal(forgeRiderSpotlight.leadValue, "복귀선 하나만 길게 붙든다.");
const forgeDominantInstallHero = game.getBaseRouteForgeDominantInstallHero({
  choice: wave6HeadlineChoice,
  dominantFormLabel: "Twin Spine",
  waveNumber: 6,
});
assert.equal(forgeDominantInstallHero?.eyebrow, "절단 고리");
assert.equal(forgeDominantInstallHero?.title, "Ember Ring");
assert.equal(forgeDominantInstallHero?.currentFormLabel, "Twin Spine");
assert.equal(forgeDominantInstallHero?.askNote, "고리가 긁은 입구로 짧게 파고든다.");
const dominantInstallContextMarkup = game.createBaseRouteForgeContextMarkup({
  eyebrow: forgeDominantInstallHero?.eyebrow,
  title: forgeDominantInstallHero?.title,
  currentFormLabel: forgeDominantInstallHero?.currentFormLabel,
  askNote: forgeDominantInstallHero?.askNote,
});
assert.ok(dominantInstallContextMarkup.includes("Ember Ring"));
assert.ok(dominantInstallContextMarkup.includes("Twin Spine"));
assert.ok(dominantInstallContextMarkup.includes("고리가 긁은 입구로 짧게 파고든다."));
assert.ok(!dominantInstallContextMarkup.includes("다음 전투"));
const forgeFinalSpotlight = game.getBaseRouteForgeSpotlightSummary({
  pendingFinalForge: true,
  dominantFormLabel: "Prism Crown",
  proofWindowLabel: "짧은 마감 랩",
});
assert.equal(forgeFinalSpotlight.titleLabel, "형태 고정");
assert.equal(forgeFinalSpotlight.titleValue, "Prism Crown");
assert.equal(forgeFinalSpotlight.leadLabel, "마무리");
assert.equal(forgeFinalSpotlight.leadValue, "짧은 마감 랩");
const summarizedFeed = game.summarizeCombatFeedEntry({
  stamp: "W6",
  text: "Wave 6 진입. 가장 먼 relay를 먼저 끊고 뚫린 corridor 하나를 길게 지킨다.",
});
assert.equal(summarizedFeed.stamp, "W6");
assert.equal(summarizedFeed.headline, "Wave 6 진입.");
assert.ok(summarizedFeed.proof.includes("relay"));
const openerFocus = game.getBaseRouteTransformationFocus(1);
assert.equal(openerFocus.windowLabel, "다음 포지");
assert.equal(openerFocus.title, "첫 무기 도약");
assert.ok(openerFocus.detail.includes("화선"));
const titleStageFocus = game.getBaseRouteTransformationFocus(1, { stage: "title" });
assert.equal(titleStageFocus.title, "빈 선체 돌입");
assert.ok(titleStageFocus.detail.includes("약한 화선"));
const chassisFocus = game.getBaseRouteTransformationFocus(5);
assert.equal(chassisFocus.title, "첫 차체 잠금");
assert.ok(chassisFocus.detail.includes("몸체 리듬"));
const forgeFocus = game.getBaseRouteTransformationFocus(5, { stage: "forge" });
assert.equal(forgeFocus.eyebrow, "버팀");
assert.equal(forgeFocus.title, "첫 차체 잠금");
assert.ok(forgeFocus.detail.includes("몸체 리듬"));
const forgeBillMarkup = game.createBaseRouteForgeBillMarkup("고철 18");
assert.ok(forgeBillMarkup.includes("고철 18"));
assert.ok(!forgeBillMarkup.includes("비용·대가"));
const minimalCombatAskMarkup = game.createMinimalCombatAskMarkup({
  focus: {
    windowLabel: "다음 포지",
    title: "첫 무기 도약",
    detail: "다음 포지까지 버티면 처음으로 화선과 화면 점유가 크게 갈라진다.",
  },
  waveAsk: "가장 먼 relay를 먼저 끊고 뚫린 corridor 하나를 길게 지킨다.",
  hazardStatus: {
    tone: "summary-chip--cool",
    chipLabel: "RELAY",
    detailLabel: "위협",
    detailValue: "중계기 1",
  },
});
assert.ok(minimalCombatAskMarkup.includes("combat-ask-card"));
assert.ok(minimalCombatAskMarkup.includes("다음 포지"));
assert.ok(minimalCombatAskMarkup.includes("첫 무기 도약"));
assert.ok(minimalCombatAskMarkup.includes("현재 전장"));
assert.ok(minimalCombatAskMarkup.includes("RELAY"));
assert.ok(minimalCombatAskMarkup.includes("중계기 1"));
assert.ok(minimalCombatAskMarkup.includes("combat-ask-card__focus"));
assert.ok(!minimalCombatAskMarkup.includes("mini-pill-row"));
assert.ok(!minimalCombatAskMarkup.includes("summary-head"));
const indexPath = path.join(repoRoot, "index.html");
const indexMarkup = fs.readFileSync(indexPath, "utf8");
assert.ok(indexMarkup.includes('id="run-track-label"'));
assert.ok(indexMarkup.includes('id="wave-track"'));
assert.ok(indexMarkup.includes('id="combat-feed"'));
assert.ok(indexMarkup.includes('id="pause-summary"'));
assert.ok(indexMarkup.includes('machine-panel machine-panel--overlay'));
assert.ok(!indexMarkup.includes('roadmap-card roadmap-card--contract'));
const minimalHudVisibility = game.getMinimalBaseRouteHudVisibility({
  paused: false,
});
assert.equal(minimalHudVisibility.minimal, true);
assert.equal(minimalHudVisibility.showWave, false);
assert.equal(minimalHudVisibility.showDash, false);
assert.equal(minimalHudVisibility.showTimer, false);
assert.equal(minimalHudVisibility.showScrap, false);
assert.equal(minimalHudVisibility.showRoadmap, false);
const pausedHudVisibility = game.getMinimalBaseRouteHudVisibility({
  paused: true,
  phase: "combat",
});
assert.equal(pausedHudVisibility.minimal, true);
assert.equal(pausedHudVisibility.showWave, false);
assert.equal(pausedHudVisibility.showDash, false);
assert.equal(pausedHudVisibility.showTimer, false);
assert.equal(pausedHudVisibility.showRoadmap, false);
const openingCombatAsk = game.getBaseRouteCombatAsk({
  waveIndex: 0,
  wave: { directive: "", hazard: null },
});
assert.equal(openingCombatAsk, "열린 외곽을 돌며 회피 각부터 익힌다.");
const relayCombatAsk = game.getBaseRouteCombatAsk({
  waveIndex: 5,
  wave: {
    directive: "가장 먼 relay를 먼저 끊고 뚫린 corridor 하나를 길게 지킨다.",
    hazard: { type: "relay" },
  },
});
assert.equal(relayCombatAsk, "가장 먼 relay를 먼저 끊고 뚫린 corridor 하나를 길게 지킨다.");
const genericWave7Build = game.createInitialBuild("rail_zeal");
assert.deepEqual(
  Array.from(game.getVisibleSupportOfferSystemIds(genericWave7Build, 7)),
  ["ember_ring", "aegis_halo", "kiln_sentry", "seeker_array", "volt_drones"]
);
assert.deepEqual(
  Array.from(game.getVisibleSupportOfferSystemIds(genericWave7Build, 8)),
  ["ember_ring", "aegis_halo", "kiln_sentry", "seeker_array", "volt_drones"]
);
const genericWave7Choices = game.buildForgeChoices(genericWave7Build, () => 0.1, 999, {
  nextWave: 7,
  finalForge: false,
  build: genericWave7Build,
});
const genericWave7RiderChoice = genericWave7Choices.find((choice) => choice.contractRole === "rider");
assert.ok(genericWave7RiderChoice);
assert.equal(genericWave7RiderChoice.type, "system");
const midrunSupportBuild = game.createInitialBuild("rail_zeal");
midrunSupportBuild.architectureForecastId = "mirror_hunt";
midrunSupportBuild.bastionDoctrineId = "mirror_hunt";
midrunSupportBuild.chassisId = "vector_thrusters";
assert.deepEqual(Array.from(game.getVisibleSupportOfferSystemIds(midrunSupportBuild, 7)), ["volt_drones"]);
assert.deepEqual(Array.from(game.getVisibleSupportOfferSystemIds(midrunSupportBuild, 8)), ["volt_drones"]);
assert.deepEqual(Array.from(game.getVisibleSupportOfferSystemIds(midrunSupportBuild, 9)), ["seeker_array"]);
const wave7ForgeChoices = game.buildForgeChoices(midrunSupportBuild, () => 0.1, 999, {
  nextWave: 7,
  finalForge: false,
});
assert.equal(game.createWildcardProtocolChoice(midrunSupportBuild, 7), null);
const wave7RiderChoice = wave7ForgeChoices.find((choice) => choice.contractRole === "rider");
assert.ok(wave7RiderChoice);
assert.equal(wave7RiderChoice.type, "system");
const wave8ForgeChoices = game.buildForgeChoices(midrunSupportBuild, () => 0.1, 999, {
  nextWave: 8,
  finalForge: false,
});
assert.ok(
  !wave8ForgeChoices.some(
    (choice) => choice.type === "utility" && choice.action === "wildcard_protocol"
  )
);
const mirrorHuntWave6Choices = game.buildWave6ChassisBreakpointChoices(
  { ...game.createInitialBuild("relay_oath"), bastionDoctrineId: "mirror_hunt" },
  Math.random,
  6
);
assert.ok(mirrorHuntWave6Choices.length > 0);
assert.ok(mirrorHuntWave6Choices.every((choice) => choice.systemChoice?.systemId === "volt_drones"));
const kilnBastionWave6Choices = game.buildWave6ChassisBreakpointChoices(
  { ...game.createInitialBuild("scrap_pact"), bastionDoctrineId: "kiln_bastion" },
  Math.random,
  6
);
assert.ok(kilnBastionWave6Choices.every((choice) => choice.systemChoice?.systemId === "aegis_halo"));
const kilnWave6Spotlight = game.getBaseRouteForgeSpotlightSummary({
  choice: kilnBastionWave6Choices[0],
});
assert.equal(kilnWave6Spotlight.titleLabel, "설치");
assert.equal(kilnWave6Spotlight.titleValue, "Aegis Halo");
assert.equal(kilnWave6Spotlight.leadValue, "탄선이 갈라진 틈으로 찢어 들어간다.");
const stormArtilleryWave6Choices = game.buildWave6ChassisBreakpointChoices(
  { ...game.createInitialBuild("rail_zeal"), bastionDoctrineId: "storm_artillery" },
  Math.random,
  6
);
assert.ok(stormArtilleryWave6Choices.every((choice) => choice.systemChoice?.systemId === "ember_ring"));
const emberRingBuild = {
  ...game.createInitialBuild("rail_zeal"),
  bastionDoctrineId: "storm_artillery",
  supportSystems: [{ id: "ember_ring", tier: 1 }],
};
assert.equal(game.resolveWaveConfig(5, emberRingBuild).supportProof?.label, "Ring Cut");
assert.equal(game.resolveWaveConfig(6, emberRingBuild).supportProof?.label, "Ring Re-ignite");
assert.equal(game.resolveWaveConfig(7, emberRingBuild).supportProof?.label, "Ring Overclock");
const wave8RiderChoice = wave8ForgeChoices.find((choice) => choice.contractRole === "rider");
assert.ok(wave8RiderChoice);
assert.notEqual(wave8RiderChoice.type, "system");
const driftFallbackAsk = game.getBaseRouteCombatAsk({
  waveIndex: 10,
  wave: { directive: "", hazard: { type: "drift" } },
});
assert.equal(driftFallbackAsk, "추격 덩어리를 자르고 빈 pocket으로 갈아탄다.");
assert.equal(
  game.shouldUseConsolidatedLateFormForge({ nextWave: 9, finalForge: false }),
  true
);
assert.equal(
  game.shouldUseConsolidatedLateFormForge({ nextWave: 5, finalForge: false }),
  false
);
assert.equal(
  game.getBaseRouteForgeStage(
    { phase: "wave", pendingFinalForge: false, waveIndex: 7, build: roadmapBuild },
    9
  ).label,
  "마무리"
);
assert.equal(
  game.getBaseRoutePostWaveTransition(
    { waveIndex: 3, wave: { completesRun: false } },
    5
  ).action,
  "forge"
);
assert.equal(
  game.getBaseRoutePostWaveTransition(
    { waveIndex: 3, wave: { completesRun: false } },
    5
  ).id,
  "field_break"
);
assert.equal(
  game.getBaseRoutePostWaveTransition(
    { waveIndex: 7, wave: { completesRun: false } },
    9
  ).action,
  "victory_lap"
);
assert.equal(game.shouldUseFieldGrant({ nextWave: 6, finalForge: false, build: roadmapBuild }), false);
const recurringWave3Choices = game.buildForgeChoices(roadmapBuild, Math.random, 40, {
  nextWave: 3,
  finalForge: false,
  build: roadmapBuild,
});
assert.equal(recurringWave3Choices.length, 2);
assert.equal(
  recurringWave3Choices.map((choice) => choice.contractRole).join("|"),
  "headline|rider"
);
assert.equal(
  recurringWave3Choices.map((choice) => choice.contractLabel).join("|"),
  "주력|버팀"
);
const recurringWave3HeadlineTransform =
  game.getBaseRouteForgeChoiceTransformation(recurringWave3Choices[0]);
assert.equal(recurringWave3HeadlineTransform.previewLabel, "진화");
assert.ok(recurringWave3HeadlineTransform.previewValue.length > 0);
assert.ok(recurringWave3HeadlineTransform.previewValue.includes("삼열"));
assert.ok(recurringWave3HeadlineTransform.promise.includes("보조 점화 총열"));
assert.ok(
  !/afterburn|dominion|ascension|forecast|draft|doctrine|교리|승천|예보|초안/i.test(
    recurringWave3HeadlineTransform.promise
  )
);
assert.ok(!/Lance\b/.test(recurringWave3HeadlineTransform.previewValue));
const recurringWave3PreviewMarkup = game.createBaseRouteForgePreviewMarkup(
  recurringWave3HeadlineTransform.previewLabel,
  recurringWave3HeadlineTransform.previewValue
);
assert.ok(recurringWave3PreviewMarkup.includes(recurringWave3HeadlineTransform.previewLabel));
assert.ok(recurringWave3PreviewMarkup.includes(recurringWave3HeadlineTransform.previewValue));
const recurringWave3CardMarkup = game.createBaseRouteForgeHeadlineCardMarkup({
  choice: recurringWave3Choices[0],
  index: 0,
  kind:
    recurringWave3Choices[0].type === "utility"
      ? recurringWave3Choices[0].action || "utility"
      : recurringWave3Choices[0].type || "choice",
  contractLabel: recurringWave3Choices[0].contractLabel,
  transformation: recurringWave3HeadlineTransform,
  slotLabel: "고철 18",
  disabled: false,
});
assert.ok(recurringWave3CardMarkup.includes("forge-card--snap"));
assert.ok(recurringWave3CardMarkup.includes(recurringWave3HeadlineTransform.promise));
assert.ok(recurringWave3CardMarkup.includes("forge-card__hero-copy"));
assert.ok(!recurringWave3CardMarkup.includes("forge-card__proof"));
assert.ok(!recurringWave3CardMarkup.includes(recurringWave3HeadlineTransform.proof));
assert.ok(recurringWave3CardMarkup.includes("forge-card__spotlight"));
assert.ok(recurringWave3CardMarkup.includes(recurringWave3HeadlineTransform.previewLabel));
assert.ok(recurringWave3CardMarkup.includes(recurringWave3HeadlineTransform.previewValue));
const recurringWave3RiderChoice =
  recurringWave3Choices.find((choice) => choice.contractRole === "rider") || recurringWave3Choices[1];
const recurringWave3RiderTransform =
  game.getBaseRouteForgeChoiceTransformation(recurringWave3RiderChoice);
const recurringWave3RiderMarkup = game.createBaseRouteForgeCompactCardMarkup({
  choice: recurringWave3RiderChoice,
  index: 1,
  kind:
    recurringWave3RiderChoice.type === "utility"
      ? recurringWave3RiderChoice.action || "utility"
      : recurringWave3RiderChoice.type || "choice",
  contractLabel: recurringWave3RiderChoice.contractLabel,
  transformation: recurringWave3RiderTransform,
  slotLabel: "고철 12",
  disabled: false,
});
assert.ok(recurringWave3RiderMarkup.includes("forge-card--contract-side"));
assert.ok(recurringWave3RiderMarkup.includes(recurringWave3RiderChoice.title));
assert.ok(recurringWave3RiderMarkup.includes(recurringWave3RiderTransform.promise));
assert.ok(recurringWave3RiderMarkup.includes("forge-card__hero-copy"));
assert.ok(!recurringWave3RiderMarkup.includes("forge-card__proof"));
assert.ok(recurringWave3RiderMarkup.includes("forge-card__pivot"));
assert.ok(recurringWave3RiderMarkup.includes(recurringWave3RiderTransform.previewLabel));
assert.ok(recurringWave3RiderMarkup.includes(recurringWave3RiderTransform.previewValue));
const wave5MutationBuild = game.createInitialBuild("relay_oath");
wave5MutationBuild.pendingCores = [];
const recurringWave5Choices = game.buildForgeChoices(wave5MutationBuild, Math.random, 40, {
  nextWave: 5,
  finalForge: false,
  build: wave5MutationBuild,
});
assert.equal(recurringWave5Choices.length, 2);
assert.equal(
  recurringWave5Choices.map((choice) => choice.contractRole).join("|"),
  "headline|rider"
);
const recurringWave5HeadlineChoice =
  recurringWave5Choices.find((choice) => choice.contractRole === "headline") ||
  recurringWave5Choices[0];
assert.equal(recurringWave5HeadlineChoice.action, "afterglow_mutation");
const recurringWave5Transform = game.getBaseRouteForgeChoiceTransformation(recurringWave5HeadlineChoice);
assert.ok(/프리즘탄|날개|레일|산탄/.test(recurringWave5Transform.promise));
assert.ok(/반사|lane|빈틈|전투/.test(recurringWave5Transform.proof));
const recurringWave5RiderChoice =
  recurringWave5Choices.find((choice) => choice.contractRole === "rider") ||
  recurringWave5Choices[1];
assert.ok(recurringWave5RiderChoice);
assert.equal(game.computeSupportSystemStats(wave5MutationBuild), null);
assert.ok(!recurringWave5Choices.some((choice) => choice.type === "system"));
assert.ok(
  (recurringWave5RiderChoice.type === "affix" && recurringWave5RiderChoice.affixId === "thermal_weave") ||
    (recurringWave5RiderChoice.type === "mod" &&
      ["armor_mesh", "step_servos", "coolant_purge"].includes(recurringWave5RiderChoice.modId)) ||
    recurringWave5RiderChoice.type === "fallback"
);
const recurringWave5RiderTransform =
  game.getBaseRouteForgeChoiceTransformation(recurringWave5RiderChoice);
assert.equal(recurringWave5RiderTransform.tone, "defense");
const recurringWave5GambleChoice =
  recurringWave5Choices.find((choice) => choice.contractRole === "gamble");
assert.equal(recurringWave5GambleChoice, undefined);
const mirrorPrimerBuild = game.createInitialBuild("relay_oath");
mirrorPrimerBuild.pendingCores = [];
mirrorPrimerBuild.bastionDoctrineId = "mirror_hunt";
const mirrorPrimerRun = {
  build: mirrorPrimerBuild,
  player: null,
};
const mirrorWave7Choices = game.buildForgeChoices(mirrorPrimerRun.build, Math.random, 64, {
  nextWave: 7,
  finalForge: false,
  build: mirrorPrimerRun.build,
});
const mirrorWave7RiderChoice =
  mirrorWave7Choices.find((choice) => choice.contractRole === "rider") || mirrorWave7Choices[1];
assert.ok(mirrorWave7RiderChoice);
assert.equal(mirrorWave7Choices.length, 2);
assert.equal(mirrorWave7RiderChoice.type, "system");
game.applyForgeChoice(mirrorPrimerRun, mirrorWave7RiderChoice);
const mirrorWave7SupportStats = game.computeSupportSystemStats(mirrorPrimerRun.build);
assert.ok(mirrorWave7SupportStats);
assert.equal(mirrorWave7SupportStats.id, "volt_drones");
assert.equal(mirrorWave7SupportStats.tier, 1);
const mirrorWave8Choices = game.buildForgeChoices(mirrorPrimerRun.build, Math.random, 64, {
  nextWave: 8,
  finalForge: false,
  build: mirrorPrimerRun.build,
});
assert.equal(mirrorWave8Choices.length, 3);
const mirrorWave8RiderChoice =
  mirrorWave8Choices.find((choice) => choice.contractRole === "rider") || mirrorWave8Choices[1];
assert.ok(mirrorWave8RiderChoice);
assert.notEqual(mirrorWave8RiderChoice.type, "system");
game.applyForgeChoice(mirrorPrimerRun, mirrorWave8RiderChoice);
const mirrorWave8SupportStats = game.computeSupportSystemStats(mirrorPrimerRun.build);
assert.ok(mirrorWave8SupportStats);
assert.equal(mirrorWave8SupportStats.id, "volt_drones");
const seekerSurgeBuild = game.createInitialBuild("rail_zeal");
seekerSurgeBuild.wave6ChassisBreakpoint = true;
seekerSurgeBuild.supportSystemId = "seeker_array";
seekerSurgeBuild.supportSystemTier = 1;
seekerSurgeBuild.supportSystems = [{ id: "seeker_array", tier: 1 }];
const seekerBaselineSupportStats = game.computeSupportSystemStats(seekerSurgeBuild);
const seekerWave6SupportStats = game.computeSupportSystemStats(seekerSurgeBuild, 6);
const seekerWave8SupportStats = game.computeSupportSystemStats(seekerSurgeBuild, 8);
assert.equal(seekerBaselineSupportStats.systems[0].shotBurstCount, 1);
assert.equal(seekerWave6SupportStats.systems[0].shotBurstCount, 2);
assert.equal(seekerWave8SupportStats.systems[0].shotBurstCount, 3);
assert.ok(seekerWave8SupportStats.systems[0].shotBurstSpread > seekerWave6SupportStats.systems[0].shotBurstSpread);
const droneSurgeBuild = game.createInitialBuild("rail_zeal");
droneSurgeBuild.wave6ChassisBreakpoint = true;
droneSurgeBuild.supportSystemId = "volt_drones";
droneSurgeBuild.supportSystemTier = 1;
droneSurgeBuild.supportSystems = [{ id: "volt_drones", tier: 1 }];
const droneBaselineSupportStats = game.computeSupportSystemStats(droneSurgeBuild);
const droneWave7SupportStats = game.computeSupportSystemStats(droneSurgeBuild, 7);
assert.equal(droneBaselineSupportStats.systems[0].shotBurstCount, 1);
assert.equal(droneWave7SupportStats.systems[0].shotBurstCount, 2);
const emberSurgeBuild = game.createInitialBuild("rail_zeal");
emberSurgeBuild.wave6ChassisBreakpoint = true;
emberSurgeBuild.supportSystemId = "ember_ring";
emberSurgeBuild.supportSystemTier = 1;
emberSurgeBuild.supportSystems = [{ id: "ember_ring", tier: 1 }];
const emberWave7SupportStats = game.computeSupportSystemStats(emberSurgeBuild, 7);
const emberWave8SupportStats = game.computeSupportSystemStats(emberSurgeBuild, 8);
assert.equal(emberWave7SupportStats.systems[0].shotCooldown, 0);
assert.ok(emberWave8SupportStats.systems[0].shotCooldown > 0);
assert.equal(emberWave8SupportStats.systems[0].shotBurstCount, 2);
const supportTrackSnapshot = game.getForgeSupportTrackSnapshot(mirrorPrimerRun.build);
assert.equal(supportTrackSnapshot.label, "Volt Drones");
assert.ok(!/Bay Package|Wildcard Rail|Catalyst/.test(supportTrackSnapshot.label));
const shippingLadderWave4 = game.getShippingLadderSteps(roadmapBuild, null, 4);
assert.equal(shippingLadderWave4.length, 4);
assert.equal(shippingLadderWave4.map((step) => step.label).join("|"), "START|THESIS|INSTALL|LAP");
assert.ok(
  !shippingLadderWave4.some(
    (step) => /Wave 5|작은 변이|사격 조율/i.test(`${step.label} ${step.title} ${step.detail}`)
  )
);
const shippingLadderFocusWave4 = game.getShippingLadderFocus(roadmapBuild, null, 4);
assert.equal(shippingLadderFocusWave4.label, "INSTALL");
assert.ok(/Wave 6|지원 설치|버팀선/.test(shippingLadderFocusWave4.detail));
const shippingLadderWave7 = game.getShippingLadderSteps(seekerProofBuild, null, 7);
const liveInstallStep = shippingLadderWave7.find((step) => step.label === "INSTALL");
assert.equal(liveInstallStep?.title, "Seeker Array");
const recurringWave6Build = game.createInitialBuild("rail_zeal");
recurringWave6Build.architectureForecastId = "storm_artillery";
const recurringWave6Choices = game.buildForgeChoices(recurringWave6Build, Math.random, 40, {
  nextWave: 6,
  finalForge: false,
  build: recurringWave6Build,
});
const wave6DefenseChoice = recurringWave6Choices.find((choice) => choice.contractRole === "headline");
assert.ok(wave6DefenseChoice);
assert.equal(wave6DefenseChoice.action, "bastion_bay_forge");
assert.ok(wave6DefenseChoice.bayUnlock);
assert.equal(wave6DefenseChoice.systemChoice?.systemId, "ember_ring");
assert.equal(wave6DefenseChoice.contractLabel, "설치");
const wave6DefenseTransform = game.getBaseRouteForgeChoiceTransformation(wave6DefenseChoice);
assert.equal(wave6DefenseTransform.cardTitle, "Ember Ring");
assert.ok(wave6DefenseTransform.previewLabel.length > 0);
assert.ok(/절단 고리|근접/.test(wave6DefenseTransform.promise));
assert.ok(/다음 전투|복귀선|근접 적/.test(wave6DefenseTransform.proof));
assert.ok(wave6DefenseTransform.accent.includes("절단 고리"));
const wave6OffenseChoice = recurringWave6Choices.find((choice) => choice.contractRole === "rider");
assert.ok(wave6OffenseChoice);
assert.equal(wave6OffenseChoice.type, "evolution");
assert.equal(wave6OffenseChoice.contractLabel, "주포");
const wave6HeadlineMarkup = game.createBaseRouteForgeHeadlineCardMarkup({
  choice: wave6DefenseChoice,
  index: 0,
  kind: wave6DefenseChoice.action || wave6DefenseChoice.type || "choice",
  contractLabel: wave6DefenseChoice.contractLabel,
  transformation: wave6DefenseTransform,
  slotLabel: "무료",
  disabled: false,
});
assert.ok(!wave6HeadlineMarkup.includes("forge-card__proof"));
assert.ok(wave6HeadlineMarkup.includes("forge-card__spotlight"));
assert.ok(wave6HeadlineMarkup.includes(wave6DefenseTransform.previewLabel));
assert.ok(wave6HeadlineMarkup.includes(wave6DefenseTransform.previewValue));
const wave6ForgeContextMarkup = game.createBaseRouteForgeContextMarkup({
  titleLabel: wave6DefenseTransform.previewLabel,
  title: "Ember Ring",
  currentFormLabel: "Twin Spine",
  waveAskLabel: "전투 ask",
  waveAskValue: game.getBaseRouteForgeChoiceCombatAsk(wave6DefenseChoice, 6),
  askNote: game.getBaseRouteForgeChoiceCombatAsk(wave6DefenseChoice, 6),
});
assert.ok(wave6ForgeContextMarkup.includes("forge-ask-shell__note"));
assert.ok(wave6ForgeContextMarkup.includes("Ember Ring"));
assert.ok(wave6ForgeContextMarkup.includes("Twin Spine"));
assert.ok(wave6ForgeContextMarkup.includes("고리가 긁은 입구로 짧게 파고든다."));
assert.ok(!wave6ForgeContextMarkup.includes("다음 전투"));
assert.ok(wave6HeadlineMarkup.includes("Ember Ring"));
assert.ok(!wave6HeadlineMarkup.includes(wave6DefenseTransform.proof));
const crownfireBuild = game.createInitialBuild("rail_zeal");
const crownfireWave5Choices = game.buildForgeChoices(crownfireBuild, () => 0.1, 999, {
  nextWave: 5,
  finalForge: false,
  build: crownfireBuild,
});
game.applyForgeChoice(
  { build: crownfireBuild, player: null },
  crownfireWave5Choices.find((choice) => choice.contractRole === "headline")
);
const crownfireWave6Choices = game.buildForgeChoices(crownfireBuild, () => 0.1, 999, {
  nextWave: 6,
  finalForge: false,
  build: crownfireBuild,
});
game.applyForgeChoice(
  { build: crownfireBuild, player: null },
  crownfireWave6Choices.find((choice) => choice.contractRole === "headline")
);
game.applyForgeChoice(
  { build: crownfireBuild, player: null },
  crownfireWave6Choices.find((choice) => choice.contractRole === "rider")
);
const crownfireWave7Choices = game.buildForgeChoices(crownfireBuild, () => 0.1, 999, {
  nextWave: 7,
  finalForge: false,
  build: crownfireBuild,
});
const crownfireWave7Headline =
  crownfireWave7Choices.find((choice) => choice.contractRole === "headline") ||
  crownfireWave7Choices[0];
assert.equal(crownfireWave7Headline.action, "crownfire_overdrive");
assert.equal(crownfireWave7Headline.title, "Crownflare Turbine");
assert.equal(crownfireWave7Headline.previewText, "측면 점화 편대 5줄");
const crownfireWave7Transform = game.getBaseRouteForgeChoiceTransformation(crownfireWave7Headline);
assert.equal(crownfireWave7Transform.previewLabel, "형태");
assert.ok(/점화 터빈|측면 점화 편대|ownership/.test(crownfireWave7Transform.promise));
assert.ok(/mid-run ownership|측면 둘|pocket/.test(crownfireWave7Transform.proof));
game.applyForgeChoice({ build: crownfireBuild, player: null }, crownfireWave7Headline);
const crownfireWeapon = game.computeWeaponStats(crownfireBuild);
assert.equal(crownfireWeapon.crownfireOverdriveLabel, "Crownflare Turbine");
assert.deepEqual(
  Array.from(crownfireWeapon.crownfireOverdriveFirePattern.offsets),
  [-0.42, -0.26, -0.1, 0.1, 0.26, 0.42]
);
assert.equal(crownfireWeapon.pierce, 0);
const crownfireWave8Choices = game.buildForgeChoices(crownfireBuild, () => 0.1, 999, {
  nextWave: 8,
  finalForge: false,
  build: crownfireBuild,
});
const crownfireWave8Headline =
  crownfireWave8Choices.find((choice) => choice.contractRole === "headline") ||
  crownfireWave8Choices[0];
assert.equal(crownfireWave8Headline.type, "evolution");
assert.equal(crownfireWave8Headline.evolutionTier, 2);
assert.equal(recurringWave3Choices.find((choice) => choice.contractRole === "gamble"), undefined);
const actBreakCacheBuild = game.createInitialBuild("rail_zeal");
const actBreakCacheChoices = game.getCombatCacheChoicesForWave(actBreakCacheBuild, 5, 12);
assert.equal(actBreakCacheChoices.length, 0);
const wildcardGrantBuild = game.createInitialBuild("scrap_pact");
const wildcardGrantChoices = game.buildFieldGrantChoices(wildcardGrantBuild, Math.random, 4);
assert.ok(
  !wildcardGrantChoices.some(
    (choice) => choice.type === "utility" && choice.action === "wildcard_protocol"
  )
);
const rogueLatticeBuild = game.createInitialBuild("rail_zeal");
rogueLatticeBuild.bastionDoctrineId = "storm_artillery";
rogueLatticeBuild.supportBayCap = 3;
rogueLatticeBuild.supportSystems = [{ id: "aegis_halo", tier: 1 }];
const rogueLatticeChoice = game.createWildcardProtocolChoice(rogueLatticeBuild, 10);
assert.equal(rogueLatticeChoice, null);
const pollutedShippingBuild = game.createInitialBuild("rail_zeal");
pollutedShippingBuild.previewSupportSystemId = "volt_drones";
pollutedShippingBuild.wildcardProtocolIds = ["rogue_lattice"];
pollutedShippingBuild.act3CatalystDraftSeen = true;
pollutedShippingBuild.catalystCapstoneId = "storm_rail";
pollutedShippingBuild.cashoutSupportId = "vector_relay";
pollutedShippingBuild.cashoutFailSoftId = "rail_sprint";
pollutedShippingBuild.doctrineCapstoneId = "relay_storm_lattice";
pollutedShippingBuild.doctrineChaseClaimed = true;
pollutedShippingBuild.doctrinePursuitCommitted = true;
pollutedShippingBuild.doctrinePursuitProgress = 2;
pollutedShippingBuild.doctrinePursuitExpired = true;
pollutedShippingBuild.overcommitUnlocked = true;
pollutedShippingBuild.overcommitResolved = true;
pollutedShippingBuild.lateBreakProfileId = "mutation";
pollutedShippingBuild.lateAscensionId = "crownsplitter_array";
pollutedShippingBuild.afterburnAscensionOffered = true;
pollutedShippingBuild.crownfireOverdriveId = "ember_rush";
pollutedShippingBuild.afterburnOverdriveId = "cataclysm_crown";
pollutedShippingBuild.afterburnDominionId = "ember";
pollutedShippingBuild.afterburnDominionVictoryLapWaves = 2;
pollutedShippingBuild.illegalOverclockId = "predator_bait";
pollutedShippingBuild.illegalOverclockMutationLevel = 3;
pollutedShippingBuild.riskMutationLevel = 2;
pollutedShippingBuild.riskMutationQueuedLevel = 1;
pollutedShippingBuild.apexMutationLevel = 2;
pollutedShippingBuild.predatorBaitCharges = 1;
pollutedShippingBuild.lateFieldMutationLevel = 4;
pollutedShippingBuild.lateFieldAegisLevel = 2;
pollutedShippingBuild.lateFieldConvergenceId = "towchain_reaver";
pollutedShippingBuild.arsenalBreakpointProfileId = "mutation";
pollutedShippingBuild.blackLedgerRaidWaves = 3;
pollutedShippingBuild.upgrades.push("교리 추격 자동 점화: Relay Storm Frame");
pollutedShippingBuild.upgrades.push("Ascension Relay: Storm Frame 즉시 활성화");
pollutedShippingBuild.upgrades.push("Contraband Overcommit");
pollutedShippingBuild.upgrades.push("Wave 6 Ascension: 정상 기록");
const pollutedWave5Choices = game.buildForgeChoices(pollutedShippingBuild, Math.random, 40, {
  nextWave: 5,
  finalForge: false,
  build: pollutedShippingBuild,
});
assert.ok(
  !pollutedWave5Choices.some(
    (choice) =>
      choice.action === "preview_support" || choice.action === "wildcard_protocol"
  )
);
assert.ok(
  !pollutedWave5Choices.some((choice) =>
    ["field_mutation", "field_aegis", "late_ascension", "afterburn_overdrive", "afterburn_dominion"].includes(
      choice.action
    )
  )
);
const pollutedShippingRoadmap = game.getBuildRoadmap(
  pollutedShippingBuild,
  game.computeWeaponStats(game.createInitialBuild("rail_zeal")),
  8
);
assert.ok(!pollutedShippingRoadmap.prompt.includes("Wave 9"));
assert.ok(!pollutedShippingRoadmap.prompt.includes("Afterburn"));
assert.ok(!pollutedShippingRoadmap.steps[2].detail.includes("Cataclysm"));
const pollutedPauseSnapshotMarkup = game.createBaseRoutePauseSnapshotMarkup({
  build: pollutedShippingBuild,
  waveIndex: 4,
  phase: "combat",
  paused: true,
});
assert.ok(!pollutedPauseSnapshotMarkup.includes("Afterburn"));
assert.ok(!pollutedPauseSnapshotMarkup.includes("Wave 9"));
assert.ok(!pollutedPauseSnapshotMarkup.includes("Cataclysm"));
const sanitizedShippingBuild = game.getSanitizedConsolidatedPresentationBuild(pollutedShippingBuild);
assert.equal(sanitizedShippingBuild.act3CatalystDraftSeen, false);
assert.equal(sanitizedShippingBuild.catalystCapstoneId, null);
assert.equal(sanitizedShippingBuild.cashoutSupportId, null);
assert.equal(sanitizedShippingBuild.cashoutFailSoftId, null);
assert.equal(sanitizedShippingBuild.doctrineCapstoneId, null);
assert.equal(sanitizedShippingBuild.crownfireOverdriveId, null);
assert.equal(game.getShippingUpgradePresentationLabel("Wave 6 Ascension: 정상 기록"), "정상 기록");
assert.equal(game.getShippingUpgradePresentationLabel("Ascension Relay: Storm Frame 즉시 활성화"), "");
assert.equal(game.getShippingUpgradePresentationLabel("Ownership Relay: Wave 8 bay uplink without armory stop"), "");
assert.equal(game.getShippingUpgradePresentationLabel("Reforge: Ember + Lance"), "벤치 Ember + Lance");
assert.equal(
  JSON.stringify(
    game.getShippingUpgradePresentationLabels({
      upgrades: [
        "교리 채택: Mirror Hunt Doctrine",
        "Ascension Relay: Storm Frame 즉시 활성화",
        "Wave 6 Ascension: 정상 기록",
        "Wave 6 Ascension: 정상 기록",
        "Ownership Relay: Wave 8 bay uplink without armory stop",
        "안정화: Aegis Halo",
      ],
    })
  ),
  JSON.stringify(["Aegis Halo", "정상 기록", "Mirror Hunt Doctrine"])
);
assert.equal(game.computeSupportSystemStats(pollutedShippingBuild), null);
game.sanitizeConsolidatedBuildState(pollutedShippingBuild);
assert.equal(pollutedShippingBuild.doctrineChaseClaimed, false);
assert.equal(pollutedShippingBuild.doctrinePursuitCommitted, false);
assert.equal(pollutedShippingBuild.doctrinePursuitProgress, 0);
assert.equal(pollutedShippingBuild.doctrinePursuitExpired, false);
assert.equal(pollutedShippingBuild.overcommitUnlocked, false);
assert.equal(pollutedShippingBuild.overcommitResolved, false);
assert.ok(!pollutedShippingBuild.upgrades.some((entry) => entry.includes("교리 추격")));
assert.ok(!pollutedShippingBuild.upgrades.some((entry) => entry.startsWith("Ascension Relay:")));
assert.ok(!pollutedShippingBuild.upgrades.includes("Contraband Overcommit"));
assert.ok(pollutedShippingBuild.upgrades.includes("Wave 6 Ascension: 정상 기록"));
assert.ok(game.WAVE_CONFIG[7].spawnBudget > game.WAVE_CONFIG[4].spawnBudget);
assert.ok(game.WAVE_CONFIG[7].mix.warden > 0);
assert.equal(game.WAVE_CONFIG[7].mix.mortar || 0, 0);
assert.equal(game.WAVE_CONFIG[7].hazard.type, "territory");
assert.equal(game.WAVE_CONFIG[7].pressureFamily, "domination");
assert.ok((game.WAVE_CONFIG[7].mix.binder || 0) > 0);
assert.ok(game.WAVE_CONFIG[7].activeCap > game.WAVE_CONFIG[5].activeCap);
assert.ok(game.WAVE_CONFIG[7].arena.width >= game.WAVE_CONFIG[6].arena.width);
assert.equal(game.WAVE_CONFIG[8].arena.width, 1700);
assert.equal(game.WAVE_CONFIG[8].hazard, undefined);
assert.ok(game.WAVE_CONFIG[8].mix.skimmer > game.WAVE_CONFIG[8].mix.warden);
assert.ok(game.WAVE_CONFIG[8].mix.lancer > game.WAVE_CONFIG[8].mix.mortar);
assert.ok(game.WAVE_CONFIG[8].activeCap > game.WAVE_CONFIG[7].activeCap);
assert.ok(game.WAVE_CONFIG[9].hazard.count >= 1);
assert.equal(game.ENEMY_DEFS.brander.label, "Brander");
assert.equal(game.WAVE_CONFIG[9].arena.height, 940);
assert.equal(game.WAVE_CONFIG[9].hazard.type, "relay");
assert.ok(game.WAVE_CONFIG[9].hazard.coreHp > 0);
assert.ok(game.WAVE_CONFIG[9].hazard.relayRange > 0);
assert.ok(game.WAVE_CONFIG[9].hazard.relayWidth > 0);
assert.ok(game.WAVE_CONFIG[9].mix.brander > game.WAVE_CONFIG[9].mix.binder);
assert.ok(game.WAVE_CONFIG[9].mix.brander > game.WAVE_CONFIG[9].mix.mortar);
assert.equal(game.WAVE_CONFIG[9].ascensionCarrierType, "binder");
assert.equal(game.WAVE_CONFIG[10].arena.width, 1760);
assert.equal(game.WAVE_CONFIG[10].arena.height, 1020);
assert.equal(game.WAVE_CONFIG[10].hazard.type, "drift");
assert.ok(game.WAVE_CONFIG[10].hazard.driftSpeed > 0);
assert.ok(game.WAVE_CONFIG[10].hazard.driftOrbit >= 0.34);
assert.ok(game.WAVE_CONFIG[10].mix.shrike > game.WAVE_CONFIG[10].mix.skimmer);
assert.ok(game.WAVE_CONFIG[10].mix.binder > game.WAVE_CONFIG[10].mix.mortar);
assert.equal(game.WAVE_CONFIG[10].ascensionCarrierType, "binder");
assert.ok(game.WAVE_CONFIG[10].activeCap <= game.WAVE_CONFIG[9].activeCap);
assert.equal(game.WAVE_CONFIG[10].pressureFamily, "pursuit");
assert.equal(game.WAVE_CONFIG[11].arena.width, 1680);
assert.ok(game.WAVE_CONFIG[11].spawnBudget > game.WAVE_CONFIG[10].spawnBudget);
assert.equal(game.WAVE_CONFIG[11].hazard.type, "territory");
assert.equal(game.WAVE_CONFIG[11].hazard.count, 1);
assert.ok(game.WAVE_CONFIG[11].hazard.turretInterval > 0);
assert.ok(game.WAVE_CONFIG[11].activeCap > game.WAVE_CONFIG[9].activeCap);
assert.ok(game.WAVE_CONFIG[11].mix.warden > game.WAVE_CONFIG[11].mix.mortar);
assert.ok(game.WAVE_CONFIG[11].mix.brute > game.WAVE_CONFIG[11].mix.skimmer);
assert.equal(game.WAVE_CONFIG[11].ascensionCarrierType, "binder");
const act2WindowBuild = game.createInitialBuild("rail_zeal");
const afterglowWindow = game.resolveWaveConfig(4, act2WindowBuild);
const breaklineFollowthrough = game.resolveWaveConfig(5, act2WindowBuild);
const crownfireSpike = game.resolveWaveConfig(6, act2WindowBuild);
const forgecrossSpike = game.resolveWaveConfig(7, act2WindowBuild);
assert.equal(afterglowWindow.hazard, undefined);
assert.equal(breaklineFollowthrough.hazard.type, "relay");
assert.equal(breaklineFollowthrough.pressureFamily, "breach");
assert.equal(breaklineFollowthrough.label, "Wave 6 · Crown Breach");
assert.equal(crownfireSpike.pressureFamily, "domination");
assert.equal(crownfireSpike.hazard.type, "drift");
assert.equal(crownfireSpike.label, "Wave 7 · Dominion Sweep");
assert.equal(forgecrossSpike.pressureFamily, "domination");
assert.equal(forgecrossSpike.hazard.type, "territory");
assert.equal(forgecrossSpike.label, "Wave 8 · Dominion Proof");
assert.ok(afterglowWindow.activeCap <= breaklineFollowthrough.activeCap);
assert.ok(breaklineFollowthrough.activeCap < crownfireSpike.activeCap);
assert.ok(crownfireSpike.activeCap < forgecrossSpike.activeCap);
assert.ok(afterglowWindow.arena.width < breaklineFollowthrough.arena.width);
assert.ok(crownfireSpike.arena.width <= forgecrossSpike.arena.width);
assert.ok(crownfireSpike.mix.binder > crownfireSpike.mix.skimmer);
assert.ok(forgecrossSpike.mix.warden > 0);
const lateCacheBuild = game.createInitialBuild("relay_oath");
lateCacheBuild.chassisId = "vector_thrusters";
lateCacheBuild.supportBayCap = 3;
lateCacheBuild.supportSystems = [{ id: "volt_drones", tier: 1 }];
lateCacheBuild.blackLedgerRaidWaves = 1;
lateCacheBuild.lateFieldMutationLevel = 2;
const lockgridPayoff = game.resolveWaveConfig(8, lateCacheBuild);
const lockgridEscalation = game.resolveWaveConfig(9, lateCacheBuild);
const lockgridRefuge = game.resolveWaveConfig(10, lateCacheBuild);
const lockgridFinale = game.resolveWaveConfig(11, lateCacheBuild);
assert.equal(lockgridPayoff.bandId, "late_payoff_run");
assert.equal(lockgridPayoff.bandLabel, "Payoff Run+");
assert.equal(lockgridPayoff.ladderStepId, "claim_space");
assert.equal(lockgridEscalation.bandId, "crownhold_proof");
assert.equal(lockgridEscalation.bandLabel, "Crown Proof+");
assert.equal(lockgridEscalation.ladderStepId, "hold_breach");
assert.equal(lockgridEscalation.pressureFamily, "breach");
assert.ok(lockgridPayoff.activeCap < lockgridEscalation.activeCap);
assert.ok(lockgridPayoff.spawnBudget < lockgridEscalation.spawnBudget);
assert.equal(lockgridPayoff.pressureFamily, "domination");
assert.equal(lockgridPayoff.hazard, null);
assert.equal(lockgridEscalation.hazard.type, "relay");
assert.equal(lockgridEscalation.hazard.label, "Crown Proof Relay");
assert.ok(lockgridEscalation.hazard.count >= 1);
assert.ok(lockgridPayoff.arena.width > lockgridEscalation.arena.width);
assert.equal(lockgridRefuge.ladderStepId, "survive_spike");
assert.equal(lockgridFinale.ladderStepId, "survive_spike");
const lateRoutePayoffBeat = game.getStandardLateRouteBeatSummary(lateCacheBuild, 9);
const lateRouteProofBeat = game.getStandardLateRouteBeatSummary(lateCacheBuild, 11);
const lateRouteFinaleBeat = game.getStandardLateRouteBeatSummary(lateCacheBuild, 12);
assert.equal(lateRoutePayoffBeat.label, "Payoff Band");
assert.ok(lateRoutePayoffBeat.detail.includes("Claim Space."));
assert.ok(lateRoutePayoffBeat.detail.includes("Payoff Run+"));
assert.equal(lateRouteProofBeat.label, "Refuge Run");
assert.ok(lateRouteProofBeat.detail.includes("Survive Spike."));
assert.ok(lateRouteProofBeat.detail.includes("Refuge Run"));
assert.equal(lateRouteFinaleBeat.label, "Finale");
assert.ok(lateRouteFinaleBeat.detail.includes("Survive Spike."));
assert.ok(lateRouteFinaleBeat.detail.includes("Final Stand"));
const lateRouteProofWindow = game.getImmediateProofWindowSummary(lateCacheBuild, 11);
assert.equal(lateRouteProofWindow.label, "Refuge Run");
assert.ok(lateRouteProofWindow.detail.includes("Survive Spike."));
assert.ok(lateRouteProofWindow.detail.includes("Refuge Run"));

const mutationLateBandBuild = game.createInitialBuild("scrap_pact");
const mutationLateBreakChoices = game.buildForgeChoices(mutationLateBandBuild, Math.random, 999, { nextWave: 9 });
const cataclysmChoice = mutationLateBreakChoices.find((choice) => choice.action === "field_mutation");
assert.ok(cataclysmChoice);
assert.equal(cataclysmChoice.title, "Cataclysm Arsenal");
assert.equal(cataclysmChoice.lateFieldMutationLevel, 4);
assert.equal(cataclysmChoice.roadmapDetail, "Wave 8 완성 시험 -> 짧은 승리 랩");
const cataclysmRun = {
  build: mutationLateBandBuild,
  resources: { scrap: 999 },
  stats: { scrapCollected: 0, scrapSpent: 0 },
  player: { hp: 100, maxHp: 100, heat: 18, overheated: false, invulnerableTime: 0, lateFieldBroadsideCooldown: 0 },
};
game.applyForgeChoice(cataclysmRun, cataclysmChoice);
const cataclysmWeapon = game.computeWeaponStats(cataclysmRun.build);
assert.equal(cataclysmWeapon.lateFieldMutationLevel, 4);
assert.equal(cataclysmWeapon.lateFieldMutationFirePattern.offsets.length, 6);
assert.ok(cataclysmWeapon.lateFieldBroadsideConfig.podCount >= 3);
assert.ok(cataclysmWeapon.lateBreakCataclysmFirePattern);
assert.ok(cataclysmWeapon.lateBreakCataclysmFirePattern.offsets.length >= 5);
assert.ok(cataclysmWeapon.lateFieldMutationTraitLabel.includes("Cataclysm Arsenal"));
assert.ok(cataclysmWeapon.damage >= 20);
const cataclysmLanceBuild = game.createInitialBuild("rail_zeal");
cataclysmLanceBuild.coreId = "lance";
cataclysmLanceBuild.attunedCoreId = "lance";
cataclysmLanceBuild.attunedCopies = 1;
cataclysmLanceBuild.pendingCores = [];
cataclysmLanceBuild.lateFieldMutationLevel = 4;
const lanceMutationWeapon = game.computeWeaponStats(cataclysmLanceBuild);
cataclysmLanceBuild.lateBreakProfileId = "mutation";
const cataclysmLanceWeapon = game.computeWeaponStats(cataclysmLanceBuild);
assert.ok(cataclysmLanceWeapon.lateBreakCataclysmFirePattern);
assert.equal(cataclysmLanceWeapon.lateBreakCataclysmFirePattern.offsets.length, 5);
assert.ok(cataclysmLanceWeapon.pierce > lanceMutationWeapon.pierce);
assert.ok(cataclysmLanceWeapon.projectileSpeed > lanceMutationWeapon.projectileSpeed);
mutationLateBandBuild.lateBreakProfileId = "mutation";
const mutationPayoffOne = game.resolveWaveConfig(8, mutationLateBandBuild);
const mutationPayoffTwo = game.resolveWaveConfig(9, mutationLateBandBuild);
const mutationSpikeOne = game.resolveWaveConfig(10, mutationLateBandBuild);
const mutationSpikeTwo = game.resolveWaveConfig(11, mutationLateBandBuild);
assert.equal(mutationPayoffOne.bandLabel, "Payoff Run+");
assert.equal(mutationPayoffTwo.bandLabel, "Crown Proof+");
assert.equal(mutationPayoffOne.ladderStepId, "claim_space");
assert.equal(mutationPayoffTwo.ladderStepId, "hold_breach");
assert.equal(mutationSpikeOne.ladderStepId, "survive_spike");
assert.equal(mutationSpikeTwo.ladderStepId, "survive_spike");
assert.ok(Math.max(mutationPayoffOne.activeCap, mutationPayoffTwo.activeCap) < Math.min(mutationSpikeOne.activeCap, mutationSpikeTwo.activeCap));
assert.ok(Math.max(mutationPayoffOne.spawnBudget, mutationPayoffTwo.spawnBudget) < Math.min(mutationSpikeOne.spawnBudget, mutationSpikeTwo.spawnBudget));
assert.ok(mutationPayoffOne.arena.width < mutationPayoffTwo.arena.width);
assert.ok(mutationPayoffTwo.arena.width > mutationPayoffOne.arena.width);
assert.equal(mutationPayoffOne.pressureFamily, "domination");
assert.equal(mutationPayoffOne.hazard, null);
assert.equal(mutationPayoffTwo.hazard.type, "relay");
assert.equal(mutationPayoffTwo.hazard.label, "Crown Proof Relay");
assert.ok(mutationPayoffTwo.activeCap < 30);
assert.equal(mutationSpikeTwo.hazard.type, "territory");
assert.ok(mutationSpikeTwo.hazard.coreHp > 0);
assert.ok(mutationSpikeOne.hazard.count <= mutationSpikeTwo.hazard.count);

const aegisLateBandBuild = game.createInitialBuild("rail_zeal");
aegisLateBandBuild.lateBreakProfileId = "aegis";
const aegisPayoffOne = game.resolveWaveConfig(8, aegisLateBandBuild);
const aegisPayoffTwo = game.resolveWaveConfig(9, aegisLateBandBuild);
const aegisSpikeOne = game.resolveWaveConfig(10, aegisLateBandBuild);
const aegisSpikeTwo = game.resolveWaveConfig(11, aegisLateBandBuild);
assert.ok(Math.max(aegisPayoffOne.activeCap, aegisPayoffTwo.activeCap) < Math.min(aegisSpikeOne.activeCap, aegisSpikeTwo.activeCap));
assert.ok(Math.max(aegisPayoffOne.spawnBudget, aegisPayoffTwo.spawnBudget) < Math.min(aegisSpikeOne.spawnBudget, aegisSpikeTwo.spawnBudget));
assert.equal(aegisSpikeOne.hazard.type, "drift");
assert.equal(aegisSpikeTwo.hazard.type, "territory");

const ledgerLateBandBuild = game.createInitialBuild("relay_oath");
ledgerLateBandBuild.lateBreakProfileId = "ledger";
const ledgerPayoffOne = game.resolveWaveConfig(8, ledgerLateBandBuild);
const ledgerPayoffTwo = game.resolveWaveConfig(9, ledgerLateBandBuild);
const ledgerSpikeOne = game.resolveWaveConfig(10, ledgerLateBandBuild);
const ledgerSpikeTwo = game.resolveWaveConfig(11, ledgerLateBandBuild);
assert.ok(Math.max(ledgerPayoffOne.activeCap, ledgerPayoffTwo.activeCap) < Math.min(ledgerSpikeOne.activeCap, ledgerSpikeTwo.activeCap));
assert.ok(Math.max(ledgerPayoffOne.spawnBudget, ledgerPayoffTwo.spawnBudget) < Math.min(ledgerSpikeOne.spawnBudget, ledgerSpikeTwo.spawnBudget));
assert.equal(ledgerSpikeOne.hazard.type, "drift");
assert.equal(ledgerSpikeTwo.hazard.type, "territory");
const lateCacheChoices = game.buildFieldGrantChoices(lateCacheBuild, Math.random, 10);
assert.equal(lateCacheChoices.length, 3);
assert.equal(
  JSON.stringify(lateCacheChoices.map((choice) => choice.laneLabel)),
  JSON.stringify(["Main Weapon Mutation", "Defense / Utility", "Greed Contract"])
);
assert.ok(lateCacheChoices.some((choice) => choice.arsenalBreakpointProfileId === "mutation"));
assert.ok(lateCacheChoices.some((choice) => choice.arsenalBreakpointProfileId === "aegis"));
assert.ok(lateCacheChoices.some((choice) => choice.arsenalBreakpointProfileId === "ledger"));
const lateBreakArmoryChoices = game.buildForgeChoices(lateCacheBuild, Math.random, 999, {
  finalForge: false,
  nextWave: 9,
  build: lateCacheBuild,
});
assert.equal(lateBreakArmoryChoices.length, 3);
assert.ok(
  lateBreakArmoryChoices.every((choice) => choice.roadmapDetail === "Wave 8 완성 시험 -> 짧은 승리 랩")
);
assert.ok(lateBreakArmoryChoices.every((choice) => !choice.roadmapDetail?.includes("Wave 9")));
assert.ok(lateBreakArmoryChoices.every((choice) => !choice.roadmapDetail?.includes("Wave 10")));
assert.ok(lateBreakArmoryChoices.every((choice) => !choice.roadmapDetail?.includes("Wave 11")));
assert.ok(lateBreakArmoryChoices.every((choice) => !choice.roadmapDetail?.includes("Wave 12")));
const afterburnBreakpointChoices = game.getCombatCacheChoicesForWave(lateCacheBuild, 14);
assert.equal(afterburnBreakpointChoices.length, 0);
const crownWindowBuild = game.createInitialBuild("scrap_pact");
crownWindowBuild.bastionDoctrineId = "bulwark";
const crownWindowPayoff = game.resolveWaveConfig(10, crownWindowBuild);
const crownWindowEscalation = game.resolveWaveConfig(11, crownWindowBuild);
assert.equal(crownWindowPayoff.bandId, "refuge_run");
assert.equal(crownWindowPayoff.hazard.type, "drift");
assert.equal(crownWindowEscalation.bandId, "final_stand");
assert.equal(crownWindowEscalation.hazard.type, "territory");
assert.ok(crownWindowPayoff.activeCap < crownWindowEscalation.activeCap);
assert.ok(crownWindowEscalation.hazard.count >= 2);
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
const lateBreakBuild = game.createInitialBuild("relay_oath");
const lateBreakChoices = game.buildForgeChoices(lateBreakBuild, Math.random, 999, {
  nextWave: 9,
  finalForge: false,
});
assert.equal(lateBreakChoices.length, 3);
assert.equal(
  JSON.stringify(lateBreakChoices.map((choice) => choice.laneLabel)),
  JSON.stringify(["Main Weapon Mutation", "Defense / Utility", "Greed Contract"])
);
const earlyPackageBuild = game.createInitialBuild("rail_zeal");
const earlyRiderChoices = game.buildForgeFollowupChoices(
  earlyPackageBuild,
  Math.random,
  999,
  { nextWave: 3, finalForge: false },
  {
    id: "headline:main",
    laneLabel: "Main Weapon Mutation",
    forgeLaneLabel: "Main Weapon Mutation",
    tag: "MUTATE",
  }
);
assert.equal(
  earlyRiderChoices.map((choice) => choice.contractRole).join("|"),
  "headline|rider"
);
const actBreakRiderChoices = game.buildForgeFollowupChoices(
  game.createInitialBuild("scrap_pact"),
  Math.random,
  999,
  { nextWave: 5, finalForge: false },
  {
    id: "headline:defense",
    laneLabel: "Defense / Utility",
    forgeLaneLabel: "Defense / Utility",
    tag: "HALO",
  }
);
assert.equal(
  actBreakRiderChoices.map((choice) => choice.contractRole).join("|"),
  "headline|rider"
);
const packageProbeRun = { waveIndex: 7, pendingFinalForge: false };
assert.equal(game.shouldOpenForgePackage(packageProbeRun, lateBreakChoices[0]), false);
const mirrorLateBuild = game.createInitialBuild("relay_oath");
mirrorLateBuild.bastionDoctrineId = "mirror_hunt";
const mutationChoice = lateBreakChoices.find((choice) => choice.laneLabel === "Main Weapon Mutation");
game.applyForgeChoice(
  {
    build: mirrorLateBuild,
    resources: { scrap: 999 },
    stats: { scrapCollected: 0, scrapSpent: 0 },
    player: { hp: 100, maxHp: 100, heat: 24, overheated: false, fieldAegisCharge: 0, fieldAegisCooldown: 0, invulnerableTime: 0 },
  },
  mutationChoice
);
const mirrorLateWeapon = game.computeWeaponStats(mirrorLateBuild);
assert.equal(mirrorLateBuild.lateFieldMutationLevel, 4);
assert.ok(mirrorLateWeapon.lateFieldBroadsideConfig);
assert.equal(mirrorLateWeapon.lateFieldBroadsideConfig.podCount, 3);
assert.ok(mirrorLateWeapon.lateFieldBroadsideConfig.range >= 520);
const mirrorWaveNine = game.resolveWaveConfig(8, mirrorLateBuild);
const bastionLateBuild = game.createInitialBuild("scrap_pact");
bastionLateBuild.bastionDoctrineId = "kiln_bastion";
const aegisChoice = lateBreakChoices.find((choice) => choice.laneLabel === "Defense / Utility");
game.applyForgeChoice(
  {
    build: bastionLateBuild,
    resources: { scrap: 999 },
    stats: { scrapCollected: 0, scrapSpent: 0 },
    player: { hp: 100, maxHp: 100, heat: 24, overheated: false, fieldAegisCharge: 0, fieldAegisCooldown: 0, invulnerableTime: 0 },
  },
  aegisChoice
);
const bastionWaveNine = game.resolveWaveConfig(8, bastionLateBuild);
const bastionWaveTen = game.resolveWaveConfig(9, bastionLateBuild);
const bastionWaveEleven = game.resolveWaveConfig(10, bastionLateBuild);
const bastionWaveTwelve = game.resolveWaveConfig(11, bastionLateBuild);
const artilleryLateBuild = game.createInitialBuild("rail_zeal");
artilleryLateBuild.bastionDoctrineId = "storm_artillery";
const greedChoice = lateBreakChoices.find((choice) => choice.laneLabel === "Greed Contract");
game.applyForgeChoice(
  {
    build: artilleryLateBuild,
    resources: { scrap: 999 },
    stats: { scrapCollected: 0, scrapSpent: 0 },
    player: { hp: 100, maxHp: 100, heat: 24, overheated: false, invulnerableTime: 0 },
  },
  greedChoice
);
assert.equal(artilleryLateBuild.lateBreakProfileId, "ledger");
const artilleryWaveTen = game.resolveWaveConfig(9, artilleryLateBuild);
const artilleryWaveEleven = game.resolveWaveConfig(10, artilleryLateBuild);
const artilleryWaveTwelve = game.resolveWaveConfig(11, artilleryLateBuild);
const artilleryWaveNine = game.resolveWaveConfig(8, artilleryLateBuild);
const mirrorBaseStats = game.computePlayerStats(game.createInitialBuild("relay_oath"));
const mirrorStageOneBuild = game.createInitialBuild("relay_oath");
mirrorStageOneBuild.coreId = "ricochet";
mirrorStageOneBuild.attunedCoreId = "ricochet";
mirrorStageOneBuild.bastionDoctrineId = "mirror_hunt";
const mirrorStageOneWeapon = game.computeWeaponStats(mirrorStageOneBuild);
const mirrorStageOneBody = game.getDoctrineBodyForm(mirrorStageOneBuild);
const mirrorStageOneStats = game.computePlayerStats(mirrorStageOneBuild);
assert.equal(mirrorStageOneWeapon.doctrineFormLabel, "Hunt Frame");
assert.equal(mirrorStageOneBody.label, "Hunt Wing Rig");
assert.ok((mirrorStageOneWeapon.doctrineFirePattern?.offsets || []).length >= 3);
assert.ok(mirrorStageOneStats.moveSpeed > mirrorBaseStats.moveSpeed);
const mirrorChaseBuild = game.createInitialBuild("relay_oath");
mirrorChaseBuild.coreId = "ricochet";
mirrorChaseBuild.attunedCoreId = "ricochet";
mirrorChaseBuild.bastionDoctrineId = "mirror_hunt";
mirrorChaseBuild.doctrineChaseClaimed = true;
const mirrorBodyForm = game.getDoctrineBodyForm(mirrorChaseBuild);
const mirrorChaseStats = game.computePlayerStats(mirrorChaseBuild);
assert.equal(mirrorBodyForm.label, "Stormglass Pursuit Frame");
assert.ok(mirrorChaseStats.moveSpeed > mirrorBaseStats.moveSpeed);
assert.ok(mirrorChaseStats.pickupRadius > mirrorBaseStats.pickupRadius);
const stormBaseStats = game.computePlayerStats(game.createInitialBuild("rail_zeal"));
const stormStageOneBuild = game.createInitialBuild("rail_zeal");
stormStageOneBuild.coreId = "lance";
stormStageOneBuild.attunedCoreId = "lance";
stormStageOneBuild.bastionDoctrineId = "storm_artillery";
const stormStageOneWeapon = game.computeWeaponStats(stormStageOneBuild);
const stormStageOneBody = game.getDoctrineBodyForm(stormStageOneBuild);
const stormStageOneStats = game.computePlayerStats(stormStageOneBuild);
assert.equal(stormStageOneWeapon.doctrineFormLabel, "Siege Frame");
assert.equal(stormStageOneBody.label, "Siege Rack Carriage");
assert.ok((stormStageOneWeapon.doctrineFirePattern?.offsets || []).length >= 3);
assert.ok(stormStageOneStats.coolRate > stormBaseStats.coolRate);
const stormChaseBuild = game.createInitialBuild("rail_zeal");
stormChaseBuild.coreId = "lance";
stormChaseBuild.attunedCoreId = "lance";
stormChaseBuild.bastionDoctrineId = "storm_artillery";
stormChaseBuild.doctrineChaseClaimed = true;
const stormBodyForm = game.getDoctrineBodyForm(stormChaseBuild);
const stormChaseStats = game.computePlayerStats(stormChaseBuild);
assert.equal(stormBodyForm.label, "Thunder Rack Carriage");
assert.ok(stormChaseStats.coolRate > stormBaseStats.coolRate);
assert.ok(stormChaseStats.moveSpeed < stormBaseStats.moveSpeed);
const kilnBaseStats = game.computePlayerStats(game.createInitialBuild("scrap_pact"));
const kilnStageOneBuild = game.createInitialBuild("scrap_pact");
kilnStageOneBuild.coreId = "scatter";
kilnStageOneBuild.attunedCoreId = "scatter";
kilnStageOneBuild.bastionDoctrineId = "kiln_bastion";
const kilnStageOneWeapon = game.computeWeaponStats(kilnStageOneBuild);
const kilnStageOneBody = game.getDoctrineBodyForm(kilnStageOneBuild);
const kilnStageOneStats = game.computePlayerStats(kilnStageOneBuild);
assert.equal(kilnStageOneWeapon.doctrineFormLabel, "Kiln Frame");
assert.equal(kilnStageOneBody.label, "Kiln Mantlet");
assert.equal(kilnStageOneWeapon.doctrineFirePattern?.count, 2);
assert.ok(kilnStageOneStats.maxHp > kilnBaseStats.maxHp);
const kilnCapstoneBuild = game.createInitialBuild("scrap_pact");
kilnCapstoneBuild.coreId = "scatter";
kilnCapstoneBuild.bastionDoctrineId = "kiln_bastion";
kilnCapstoneBuild.doctrineChaseClaimed = true;
kilnCapstoneBuild.doctrineCapstoneId = "bulwark_foundry";
const kilnCapstoneForm = game.getDoctrineWeaponForm(kilnCapstoneBuild, "scatter");
const mirrorWaveTen = game.resolveWaveConfig(9, mirrorLateBuild);
const mirrorWaveEleven = game.resolveWaveConfig(10, mirrorLateBuild);
const mirrorWaveTwelve = game.resolveWaveConfig(11, mirrorLateBuild);
assert.equal(mirrorWaveNine.label, "Wave 9 · Payoff Run+");
assert.equal(mirrorWaveTen.label, "Wave 10 · Crown Proof+");
assert.equal(mirrorWaveEleven.label, "Wave 11 · Refuge Run");
assert.equal(mirrorWaveTwelve.label, "Wave 12 · Final Stand");
assert.equal(bastionWaveNine.label, "Wave 9 · Payoff Run+");
assert.equal(bastionWaveTen.label, "Wave 10 · Crown Proof+");
assert.equal(bastionWaveEleven.label, "Wave 11 · Refuge Run");
assert.equal(bastionWaveTwelve.label, "Wave 12 · Final Stand");
assert.equal(artilleryWaveNine.label, "Wave 9 · Payoff Run+");
assert.equal(artilleryWaveTen.label, "Wave 10 · Crown Proof+");
assert.equal(artilleryWaveEleven.label, "Wave 11 · Refuge Run");
assert.equal(artilleryWaveTwelve.label, "Wave 12 · Final Stand");
assert.equal(mirrorWaveNine.hazard, null);
assert.equal(bastionWaveNine.hazard, null);
assert.equal(artilleryWaveNine.hazard, null);
assert.equal(bastionWaveNine.pressureFamily, "domination");
assert.equal(artilleryWaveNine.pressureFamily, "domination");
assert.equal(mirrorWaveTen.hazard.type, "relay");
assert.equal(bastionWaveTen.hazard.type, "relay");
assert.equal(artilleryWaveTen.hazard.type, "relay");
assert.equal(bastionWaveTen.pressureFamily, "breach");
assert.equal(artilleryWaveTen.pressureFamily, "breach");
assert.equal(mirrorWaveEleven.hazard.type, "drift");
assert.equal(mirrorWaveTwelve.hazard.type, "territory");
assert.equal(bastionWaveEleven.hazard.type, "drift");
assert.equal(bastionWaveTwelve.hazard.type, "territory");
assert.equal(artilleryWaveEleven.hazard.type, "drift");
assert.equal(artilleryWaveTwelve.hazard.type, "territory");
assert.equal(mirrorWaveNine.arena.width, 1820);
assert.equal(bastionWaveNine.arena.width, 1680);
assert.equal(artilleryWaveNine.arena.width, 1820);
assert.equal(mirrorWaveTen.arena.width, 2020);
assert.equal(bastionWaveTen.arena.width, 1760);
assert.equal(artilleryWaveTen.arena.width, 1860);
assert.equal(mirrorWaveEleven.arena.width, 1760);
assert.equal(mirrorWaveTwelve.arena.height, 980);
assert.equal(bastionWaveEleven.arena.width, 1760);
assert.equal(bastionWaveTwelve.arena.height, 980);
assert.equal(artilleryWaveEleven.arena.width, 1760);
assert.equal(artilleryWaveTwelve.arena.height, 980);
assert.ok(mirrorWaveNine.mix.skimmer > mirrorWaveNine.mix.warden);
assert.ok(mirrorWaveNine.mix.lancer > mirrorWaveNine.mix.mortar);
assert.ok(mirrorWaveNine.mix.skimmer > mirrorWaveNine.mix.shrike);
assert.ok(mirrorWaveNine.activeCap < 26);
assert.ok(bastionWaveNine.activeCap < 24);
assert.ok(artilleryWaveNine.activeCap < 25);
assert.ok(bastionWaveNine.activeCap < mirrorWaveTen.activeCap);
assert.ok(bastionWaveNine.mix.brute >= bastionWaveNine.mix.shrike);
assert.ok(artilleryWaveNine.mix.brander > artilleryWaveNine.mix.binder);
assert.ok(mirrorWaveTen.activeCap <= 27);
assert.ok(bastionWaveTen.activeCap <= 27);
assert.ok(artilleryWaveTen.activeCap <= 28);
assert.equal(mirrorWaveTen.hazard.count, 2);
assert.equal(bastionWaveTen.hazard.count, 2);
assert.equal(artilleryWaveTen.hazard.count, 2);
assert.ok(mirrorWaveTen.mix.skimmer > mirrorWaveTen.mix.mortar);
assert.ok(mirrorWaveTen.mix.lancer > mirrorWaveTen.mix.warden);
assert.ok(bastionWaveTen.mix.brute > bastionWaveTen.mix.skimmer);
assert.ok(bastionWaveTen.hazard.relayRange > 0);
assert.ok(artilleryWaveTen.hazard.relayRange > 0);
assert.ok(mirrorWaveEleven.mix.shrike > mirrorWaveEleven.mix.mortar);
assert.ok(mirrorWaveEleven.mix.brander >= mirrorWaveEleven.mix.mortar);
assert.ok(mirrorWaveEleven.activeCap <= 29);
assert.equal(mirrorWaveEleven.hazard.count, 2);
assert.ok(mirrorWaveTwelve.hazard.coreHp > 0);
assert.ok(mirrorWaveTwelve.mix.lancer > mirrorWaveTwelve.mix.mortar);
assert.ok(mirrorWaveTwelve.activeCap > mirrorWaveEleven.activeCap);
assert.equal(bastionWaveEleven.activeCap, mirrorWaveEleven.activeCap);
assert.equal(bastionWaveEleven.hazard.count, 2);
assert.ok(bastionWaveTwelve.hazard.coreHp > 0);
assert.ok(bastionWaveEleven.activeCap < bastionWaveTwelve.activeCap);
assert.ok(artilleryWaveEleven.hazard.driftSpeed > 0);
assert.equal(artilleryWaveEleven.hazard.count, 2);
assert.ok(artilleryWaveTwelve.hazard.coreHp > 0);
assert.ok(artilleryWaveTwelve.hazard.turretInterval > 0);
assert.ok(artilleryWaveEleven.activeCap < artilleryWaveTwelve.activeCap);
assert.equal(kilnCapstoneForm.label, "Bulwark Furnace");
assert.equal(kilnCapstoneForm.onHit.kind, "foundry_shatter");
assert.equal(kilnCapstoneForm.onHit.burstCount, 3);
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
assert.equal(afterburnTransition, null);
assert.equal(afterburnTransitionRun.phase, "forge");
assert.equal(afterburnTransitionRun.pendingFinalForge, true);
assert.equal(afterburnTransitionRun.waveIndex, game.MAX_WAVES - 1);
assert.equal(afterburnTransitionRun.postCapstone.active, false);
assert.equal(afterburnTransitionRun.postCapstone.total, 0);
assert.equal(afterburnTransitionRun.wave, null);
assert.equal(afterburnTransitionRun.projectiles.length, 1);
const afterburnOne = game.createPostCapstoneWave(0, afterburnTransitionRun.build);
const afterburnTwo = game.createPostCapstoneWave(1, afterburnTransitionRun.build);
const afterburnThree = game.createPostCapstoneWave(2, afterburnTransitionRun.build);
const afterburnFour = game.createPostCapstoneWave(3, afterburnTransitionRun.build);
const afterburnFive = game.createPostCapstoneWave(4, afterburnTransitionRun.build);
const afterburnSix = game.createPostCapstoneWave(5, afterburnTransitionRun.build);
const afterburnSeven = game.createPostCapstoneWave(6, afterburnTransitionRun.build);
assert.equal(afterburnOne.hazard.type || "pulse", "pulse");
assert.equal(afterburnTwo.hazard.type, "drift");
assert.equal(afterburnThree.hazard.type || "pulse", "pulse");
assert.equal(afterburnFour.hazard.type, "caravan");
assert.equal(afterburnFive.hazard.type, "caravan");
assert.equal(afterburnSix.hazard.type, "drift");
assert.equal(afterburnSeven.hazard.type, "drift");
assert.ok(afterburnFour.mix.skimmer > afterburnFour.mix.warden);
assert.ok(afterburnFour.mix.lancer > afterburnFour.mix.mortar);
assert.ok(afterburnFour.hazard.salvageScrap > 0);
assert.ok(afterburnFour.hazard.driftSpeed > 0);
assert.ok(afterburnFour.activeCap < afterburnFive.activeCap);
assert.ok(afterburnOne.mix.skimmer > afterburnOne.mix.mortar);
assert.ok(afterburnOne.mix.lancer > afterburnOne.mix.mortar);
assert.ok(afterburnTwo.mix.shrike > afterburnTwo.mix.mortar);
assert.ok(afterburnThree.mix.skimmer > afterburnThree.mix.mortar);
assert.ok(afterburnFive.mix.shrike > afterburnFive.mix.brander);
assert.ok(afterburnFive.hazard.salvageScrap > afterburnFour.hazard.salvageScrap);
assert.ok(afterburnFive.hazard.driftSpeed >= afterburnFour.hazard.driftSpeed);
assert.ok(afterburnSeven.activeCap >= afterburnSix.activeCap);
assert.equal(afterburnOne.arena.width, 1560);
assert.equal(afterburnThree.arena.height, 900);
assert.equal(afterburnOne.hazard.coreHp, undefined);
assert.equal(afterburnTwo.hazard.coreHp, undefined);
assert.equal(afterburnThree.hazard.coreHp, undefined);
assert.ok(afterburnFour.spawnBudget > afterburnTwo.spawnBudget);
assert.ok(afterburnFive.spawnBudget > afterburnThree.spawnBudget);
assert.ok(afterburnSix.mix.shrike > afterburnFive.mix.shrike);
assert.ok(afterburnSeven.spawnBudget >= afterburnSix.spawnBudget);
assert.ok(afterburnSeven.activeCap > afterburnSix.activeCap);
assert.equal(afterburnSeven.arena.width, 1560);
assert.equal(afterburnSeven.arena.height, 900);
assert.equal(afterburnSeven.hazard.coreHp, undefined);
assert.ok(afterburnSeven.mix.binder > 0);
assert.ok(afterburnSeven.mix.brander > afterburnSeven.mix.mortar);
assert.ok(afterburnSeven.mix.shrike > afterburnSeven.mix.mortar);
assert.ok(afterburnSeven.mix.skimmer > afterburnSeven.mix.mortar);
assert.ok(afterburnSeven.mix.lancer > afterburnSeven.mix.warden);
assert.equal(afterburnSeven.completesRun, true);
assert.equal(afterburnOne.lateAscensionCarrierType, "binder");
assert.equal(afterburnTwo.lateAscensionCarrierType, "binder");
assert.equal(afterburnThree.lateAscensionCarrierType, "binder");
assert.ok(afterburnOne.combatCache);
assert.ok(afterburnTwo.combatCache);
assert.equal(afterburnSeven.combatCache, null);
assert.equal(afterburnOne.afterburnOverdrive, null);
assert.equal(afterburnThree.afterburnOverdrive, null);
assert.equal(afterburnOne.combatCache.choices.length, 0);
const overdriveBuild = game.createInitialBuild("rail_zeal");
overdriveBuild.catalystCapstoneId = "storm_rail";
const overdriveChoices = game.getAfterburnOverdriveChoices(overdriveBuild);
const overdriveWave = game.createPostCapstoneWave(3, overdriveBuild);
assert.equal(overdriveChoices.length, 0);
assert.equal(overdriveWave.afterburnOverdrive, null);
overdriveBuild.afterburnOverdriveId = "cataclysm_crown";
const overdriveWeapon = game.computeWeaponStats(overdriveBuild);
const overdrivePlayer = game.computePlayerStats(overdriveBuild);
assert.equal(overdriveBuild.afterburnOverdriveId, "cataclysm_crown");
assert.equal(overdriveWeapon.afterburnOverdriveLabel, "Cataclysm Crown");
assert.match(overdriveWeapon.afterburnOverdriveTraitLabel, /^FORM 3 · /);
assert.ok(overdriveWeapon.afterburnOverdriveFirePattern.offsets.length >= 2);
assert.ok(overdrivePlayer.moveSpeed > 248);
const dominionWave = game.createPostCapstoneWave(4, overdriveBuild);
assert.equal(dominionWave.afterburnDominion, null);
const dominionRun = {
  build: overdriveBuild,
  resources: { scrap: 0 },
  stats: { scrapCollected: 0, scrapSpent: 0 },
  player: { hp: 84, maxHp: 100, heat: 36, overheated: true },
};
dominionRun.build.afterburnDominionId = "lance";
dominionRun.build.afterburnDominionVictoryLapWaves = 1;
assert.equal(dominionRun.build.afterburnDominionId, "lance");
assert.equal(dominionRun.build.afterburnDominionVictoryLapWaves, 1);
const dominionWeapon = game.computeWeaponStats(dominionRun.build);
assert.equal(dominionWeapon.afterburnDominionLabel, "Vector Dominion");
assert.match(dominionWeapon.afterburnDominionTraitLabel, /^FORM 4 · /);
assert.ok(dominionWeapon.afterburnDominionFirePattern.offsets.length >= 4);
const dominionVictoryLap = game.createPostCapstoneWave(5, dominionRun.build);
assert.equal(dominionVictoryLap.dominionVictoryLapActive, true);
assert.equal(dominionVictoryLap.combatCache, null);
assert.equal(dominionVictoryLap.afterburnOverdrive, null);
assert.equal(dominionVictoryLap.apexPredator, null);
const convergenceBuild = game.createInitialBuild("relay_oath");
convergenceBuild.chassisId = "vector_thrusters";
convergenceBuild.supportBayCap = 3;
convergenceBuild.supportSystems = [{ id: "ember_ring", tier: 1 }];
convergenceBuild.blackLedgerRaidWaves = 1;
const convergenceChoices = game.buildFieldGrantChoices(convergenceBuild, () => 0, 12);
const convergenceChoice = convergenceChoices.find(
  (choice) => choice && choice.action === "field_convergence"
);
assert.ok(convergenceChoice);
assert.equal(convergenceChoice.title, "Slipstream Talons");
const convergenceRun = {
  build: convergenceBuild,
  resources: { scrap: 0 },
  stats: { scrapCollected: 0, scrapSpent: 0 },
  player: { hp: 100, maxHp: 100, heat: 44, overheated: true, invulnerableTime: 0 },
};
game.applyForgeChoice(convergenceRun, convergenceChoice);
assert.equal(convergenceRun.build.lateFieldConvergenceId, "slipstream_talons");
const convergenceWeapon = game.computeWeaponStats(convergenceRun.build);
assert.equal(convergenceWeapon.lateFieldConvergenceLabel, "Slipstream Talons");
assert.ok(convergenceWeapon.lateFieldConvergenceFirePattern);
assert.ok(convergenceWeapon.lateFieldConvergenceFirePattern.offsets.length >= 4);
assert.equal(convergenceRun.player.overheated, false);
const headlineAscensionBuild = game.createInitialBuild("rail_zeal");
headlineAscensionBuild.lateAscensionId = "crownsplitter_array";
headlineAscensionBuild.supportSystems = [
  { id: "ember_ring", tier: 1 },
  { id: "volt_drones", tier: 1 },
];
const headlineAscensionWeapon = game.computeWeaponStats(headlineAscensionBuild);
assert.equal(headlineAscensionWeapon.headlineFormLabel, "FORM 2 · Crownsplitter Array");
assert.match(headlineAscensionWeapon.lateAscensionTraitLabel, /^FORM 2 · .* · CORE ENDFORM$/);
assert.ok(headlineAscensionWeapon.lateAscensionFirePattern.offsets.length >= 6);
assert.match(headlineAscensionWeapon.lateAscensionStatusNote, /보조선/);
const unsupportedAscensionBuild = game.createInitialBuild("rail_zeal");
unsupportedAscensionBuild.lateAscensionId = "crownsplitter_array";
const unsupportedAscensionWeapon = game.computeWeaponStats(unsupportedAscensionBuild);
assert.equal(unsupportedAscensionWeapon.lateAscensionFirePattern.kind, "split_wing");
assert.ok(unsupportedAscensionWeapon.lateAscensionFirePattern.offsets.length >= 6);
assert.match(unsupportedAscensionWeapon.lateAscensionStatusNote, /support uplink 없이도 완성형/);
const biasedLeanStartBuild = game.createInitialBuild("scrap_pact", {
  leanStartBiasDoctrineId: "storm_artillery",
});
assert.equal(biasedLeanStartBuild.leanStartBiasDoctrineId, "storm_artillery");
assert.ok(biasedLeanStartBuild.pendingCores.includes("lance"));
const biasedArchitectureChoices = game.buildArchitectureDraftChoices(biasedLeanStartBuild);
assert.equal(biasedArchitectureChoices[0].doctrineId, "storm_artillery");
assert.equal(biasedArchitectureChoices[0].weaponChoice.coreId, "lance");
assert.ok((biasedArchitectureChoices[0].weaponChoice.benchCopies || 0) >= 1);
const biasedArchitectureRun = {
  build: biasedLeanStartBuild,
  resources: { scrap: 0 },
  stats: { scrapCollected: 0, scrapSpent: 0 },
  player: { hp: 100, maxHp: 100, heat: 0, overheated: false },
};
game.applyForgeChoice(biasedArchitectureRun, biasedArchitectureChoices[0]);
const biasedWave6Choices = game.buildWave6ChassisBreakpointChoices(biasedArchitectureRun.build, () => 0, 6);
assert.ok(biasedWave6Choices.every((choice) => choice.systemChoice?.systemId === "ember_ring"));
const systemsForgeBuild = game.createInitialBuild("scrap_pact");
const architectureChoices = game.buildArchitectureDraftChoices(systemsForgeBuild);
assert.equal(architectureChoices.length, 3);
assert.ok(architectureChoices.every((choice) => choice.action === "architecture_forecast"));
assert.ok(architectureChoices.every((choice) => !choice.systemChoice));
assert.ok(architectureChoices.every((choice) => !choice.chassisId));
assert.ok(architectureChoices.every((choice) => choice.breakpointLabel));
const architecturePreviewRun = {
  build: systemsForgeBuild,
  resources: { scrap: 0 },
  stats: { scrapCollected: 0, scrapSpent: 0 },
  player: { hp: 100, maxHp: 100, heat: 0, overheated: false },
};
game.applyForgeChoice(architecturePreviewRun, architectureChoices[0]);
assert.equal(architecturePreviewRun.build.bastionDoctrineId, null);
assert.equal(architecturePreviewRun.build.architectureForecastId, architectureChoices[0].doctrineId);
assert.equal(architecturePreviewRun.build.wave6ChassisBreakpoint, false);
assert.equal(game.getSupportBayCapacity(architecturePreviewRun.build), 1);
assert.equal(architecturePreviewRun.build.supportSystems.length, 0);
const wave6DoctrineChoices = game.buildBastionDraftChoices(architecturePreviewRun.build, () => 0, 6);
assert.equal(wave6DoctrineChoices.length, 3);
assert.ok(wave6DoctrineChoices.every((choice) => choice.action === "bastion_bay_forge"));
assert.ok(wave6DoctrineChoices.every((choice) => choice.bayUnlock));
assert.ok(wave6DoctrineChoices.every((choice) => choice.systemChoice?.systemTier === 1));
assert.ok(wave6DoctrineChoices.every((choice) => !choice.singleAxisBreakpoint));
assert.ok(wave6DoctrineChoices.every((choice) => choice.chassisId));
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
assert.ok(wave6ChassisPackages.every((choice) => choice.bayUnlock));
assert.ok(wave6ChassisPackages.every((choice) => choice.systemChoice?.systemTier === 1));
assert.ok(wave6ChassisPackages.every((choice) => !choice.singleAxisBreakpoint));
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
const vectorChassisChoice = wave6ChassisPackages.find((choice) => choice.chassisId === "vector_thrusters");
const bulwarkChassisChoice = wave6ChassisPackages.find((choice) => choice.chassisId === "bulwark_treads");
const salvageChassisChoice = wave6ChassisPackages.find((choice) => choice.chassisId === "salvage_winch");
assert.ok(vectorChassisChoice);
assert.ok(bulwarkChassisChoice);
assert.ok(salvageChassisChoice);
const wave6AscensionRun = {
  build: game.createInitialBuild("scrap_pact"),
  resources: { scrap: 0 },
  stats: { scrapCollected: 0, scrapSpent: 0 },
  player: { hp: 100, maxHp: 100, heat: 0, overheated: false },
};
const fallbackWave6AscensionChoices = game.buildBastionDraftChoices(wave6AscensionRun.build, () => 0, 6);
assert.ok(fallbackWave6AscensionChoices.every((choice) => choice.action === "wave6_ascension"));
game.applyForgeChoice(wave6AscensionRun, fallbackWave6AscensionChoices[0]);
assert.equal(wave6AscensionRun.build.bastionDoctrineId, fallbackWave6AscensionChoices[0].doctrineId);
assert.equal(wave6AscensionRun.build.wave6ChassisBreakpoint, false);
assert.equal(wave6AscensionRun.build.supportBayCap, 1);
assert.equal(wave6AscensionRun.build.chassisId, fallbackWave6AscensionChoices[0].chassisId);
assert.equal(wave6AscensionRun.build.doctrinePursuitCommitted, false);
assert.equal(wave6AscensionRun.build.doctrinePursuitProgress, 0);
assert.equal(wave6AscensionRun.build.doctrineChaseClaimed, false);
assert.equal(game.shouldSkipOwnershipAdminStop(wave6AscensionRun.build, 9), false);
chassisRun.build.bastionDoctrineId = "kiln_bastion";
game.applyForgeChoice(chassisRun, vectorChassisChoice);
assert.equal(chassisRun.build.wave6ChassisBreakpoint, true);
assert.equal(chassisRun.build.supportBayCap, 2);
assert.equal(chassisRun.build.supportSystems.length, 1);
assert.equal(chassisRun.build.chassisId, vectorChassisChoice.chassisId);
assert.equal(game.shouldSkipOwnershipAdminStop(chassisRun.build, 9), false);
assert.equal(JSON.stringify(game.getVisibleSupportOfferSystemIds(chassisRun.build, 7)), JSON.stringify([]));
const delayedWave7GrantChoices = game.buildFieldGrantChoices(chassisRun.build, () => 0, 7);
assert.equal(delayedWave7GrantChoices.find((choice) => choice.contractRole === "gamble"), undefined);
const delayedWave7Rider = delayedWave7GrantChoices.find((choice) => choice.contractRole === "rider");
assert.ok(
  delayedWave7Rider &&
    ((delayedWave7Rider.type === "affix" && delayedWave7Rider.affixId === "thermal_weave") ||
      (delayedWave7Rider.type === "mod" &&
        ["armor_mesh", "step_servos", "coolant_purge"].includes(delayedWave7Rider.modId)) ||
      delayedWave7Rider.type === "system" ||
      delayedWave7Rider.type === "fallback")
);
const vectorWave6Proof = game.resolveWaveConfig(5, chassisRun.build);
const vectorWave7Proof = game.resolveWaveConfig(6, chassisRun.build);
const baseWave7Proof = game.resolveWaveConfig(6, game.createInitialBuild("scrap_pact"));
assert.equal(vectorWave6Proof.chassisProof?.label, "Slipstream Breach");
assert.equal(vectorWave7Proof.chassisProof?.label, "Slipstream Pursuit");
assert.match(vectorWave6Proof.directive, /relay/);
assert.ok(vectorWave7Proof.hazard?.driftSpeed >= baseWave7Proof.hazard?.driftSpeed);
const bulwarkProofBuild = game.createInitialBuild("scrap_pact");
bulwarkProofBuild.bastionDoctrineId = "kiln_bastion";
game.applyForgeChoice(
  { build: bulwarkProofBuild, resources: { scrap: 0 }, stats: {}, player: null },
  bulwarkChassisChoice
);
const bulwarkWave7Proof = game.resolveWaveConfig(6, bulwarkProofBuild);
assert.equal(bulwarkWave7Proof.chassisProof?.label, "Bulwark Refuge");
assert.match(bulwarkWave7Proof.directive, /재진입|pocket|seam/);
assert.ok(bulwarkWave7Proof.hazard?.driftSpeed > 0);
const salvageProofBuild = game.createInitialBuild("scrap_pact");
salvageProofBuild.bastionDoctrineId = "kiln_bastion";
game.applyForgeChoice(
  { build: salvageProofBuild, resources: { scrap: 0 }, stats: {}, player: null },
  salvageChassisChoice
);
const salvageWave6Proof = game.resolveWaveConfig(5, salvageProofBuild);
const baseWave6Proof = game.resolveWaveConfig(5, game.createInitialBuild("scrap_pact"));
assert.equal(salvageWave6Proof.chassisProof?.label, "Towchain Sweep");
assert.ok(salvageWave6Proof.driveGainFactor > baseWave6Proof.driveGainFactor);
salvageProofBuild.midrunGreedRouteUntilWave = 8;
assert.equal(game.resolveWaveConfig(5, salvageProofBuild).chassisProof, undefined);
const predatorCacheChoices = game.buildFieldGrantChoices(predatorBaitRun.build, () => 0, 10);
assert.equal(game.isArsenalBreakpointWave(10), true);
assert.ok(predatorCacheChoices.some((choice) => choice.action === "field_mutation"));
assert.ok(predatorCacheChoices.some((choice) => choice.action === "field_aegis"));
assert.equal(predatorCacheChoices.length, 3);
assert.equal(
  JSON.stringify(predatorCacheChoices.map((choice) => choice.laneLabel)),
  JSON.stringify([
    "Main Weapon Mutation",
    "Defense / Utility",
    "Greed Contract",
  ])
);
assert.ok(predatorCacheChoices.some((choice) => choice.action === "field_greed"));
const fieldMutationChoice = predatorCacheChoices.find((choice) => choice.action === "field_mutation");
const fieldAegisChoice = predatorCacheChoices.find((choice) => choice.action === "field_aegis");
const greedContractChoice = predatorCacheChoices.find((choice) => choice.action === "field_greed");
assert.ok(fieldMutationChoice);
assert.ok(fieldAegisChoice);
assert.ok(greedContractChoice);
assert.equal(fieldMutationChoice.title, "Overdrive Arsenal Prime");
assert.equal(fieldMutationChoice.lateFieldMutationLevel, 2);
assert.equal(fieldAegisChoice.title, "Warplate Halo");
assert.equal(fieldAegisChoice.lateFieldAegisLevel, 2);
assert.equal(greedContractChoice.title, "Black Ledger Raid");
assert.equal(greedContractChoice.blackLedgerRaidWaves, 1);
const greedRun = {
  build: game.createInitialBuild("scrap_pact"),
  resources: { scrap: 0 },
  stats: { scrapCollected: 0, scrapSpent: 0 },
  player: { hp: 100, maxHp: 100, heat: 24, overheated: false },
};
const baseGreedMultiplier = greedRun.build.scrapMultiplier;
const baseGreedPickup = greedRun.build.pickupBonus;
game.applyForgeChoice(greedRun, greedContractChoice);
assert.equal(greedRun.resources.scrap, 58);
assert.equal(greedRun.build.blackLedgerRaidWaves, 1);
assert.equal(greedRun.build.bastionPactDebtWaves, 2);
assert.equal(greedRun.build.scrapMultiplier, baseGreedMultiplier + 0.18);
assert.equal(greedRun.build.pickupBonus, baseGreedPickup + 18);
const blackLedgerWaveTen = game.applyBlackLedgerRaidConfig(
  game.resolveWaveConfig(9, greedRun.build),
  greedRun.build,
  10
);
assert.ok(blackLedgerWaveTen.blackLedgerRaid);
assert.equal(blackLedgerWaveTen.blackLedgerRaid.salvageWave, true);
assert.equal(blackLedgerWaveTen.hazard.label, "Black Ledger Vaults");
assert.ok(blackLedgerWaveTen.hazard.interval < game.resolveWaveConfig(9, greedRun.build).hazard.interval);
assert.ok(blackLedgerWaveTen.spawnBudget > game.WAVE_CONFIG[9].spawnBudget);
const fieldMutationRun = {
  build: game.createInitialBuild("scrap_pact"),
  resources: { scrap: 0 },
  stats: { scrapCollected: 0, scrapSpent: 0 },
  player: { hp: 100, maxHp: 100, heat: 20, overheated: false },
};
game.applyForgeChoice(fieldMutationRun, fieldMutationChoice);
assert.equal(fieldMutationRun.build.lateFieldMutationLevel, 2);
const fieldMutationWeapon = game.computeWeaponStats(fieldMutationRun.build);
assert.equal(fieldMutationWeapon.lateFieldMutationLevel, 2);
assert.ok(fieldMutationWeapon.lateFieldMutationFirePattern);
const fieldAegisRun = {
  build: game.createInitialBuild("relay_oath"),
  resources: { scrap: 0 },
  stats: { scrapCollected: 0, scrapSpent: 0 },
  player: { hp: 100, maxHp: 100, heat: 0, overheated: false, invulnerableTime: 0 },
};
game.applyForgeChoice(fieldAegisRun, fieldAegisChoice);
assert.equal(fieldAegisRun.build.lateFieldAegisLevel, 2);
assert.equal(fieldAegisRun.player.fieldAegisCharge, 1);
const standardLateFieldChoice = game
  .buildFieldGrantChoices(fieldMutationRun.build, () => 0, 11)
  .find((choice) => choice.action === "risk_mutation");
assert.ok(standardLateFieldChoice);
assert.ok(!standardLateFieldChoice.description.includes("금지 성장선"));
assert.ok(!standardLateFieldChoice.slotText.includes("contraband splice"));
const standardLateFieldRun = {
  build: game.createInitialBuild("scrap_pact"),
  resources: { scrap: 0 },
  stats: { scrapCollected: 0, scrapSpent: 0 },
  player: { hp: 100, maxHp: 100, heat: 20, overheated: false },
};
game.applyForgeChoice(standardLateFieldRun, standardLateFieldChoice);
assert.equal(standardLateFieldRun.build.riskMutationLevel, 1);
assert.equal(standardLateFieldRun.build.riskMutationQueuedLevel, 1);
assert.equal(standardLateFieldRun.build.illegalOverclockId, null);
assert.equal(standardLateFieldRun.build.illegalOverclockOffered, false);
assert.equal(standardLateFieldRun.build.illegalOverclockMutationLevel, 0);
const lateAscensionBuild = game.createInitialBuild("relay_oath");
lateAscensionBuild.supportBayCap = 3;
lateAscensionBuild.supportSystems = [
  { id: "seeker_array", tier: 1 },
  { id: "volt_drones", tier: 1 },
];
const lateAscensionChoices = game.createLateAscensionChoices(lateAscensionBuild);
assert.equal(lateAscensionChoices.length, 4);
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
assert.ok(crownsplitterWeapon.lateAscensionFirePattern.offsets.length >= 6);
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
assert.ok(slagburstWeapon.lateAscensionFirePattern.count >= 3);
const voltspineRun = {
  build: game.createInitialBuild("relay_oath"),
  resources: { scrap: 0 },
  stats: { scrapCollected: 0, scrapSpent: 0 },
  player: { hp: 100, maxHp: 100, heat: 12, overheated: false },
};
voltspineRun.build.supportBayCap = 4;
voltspineRun.build.supportSystems = [
  { id: "seeker_array", tier: 1 },
  { id: "volt_drones", tier: 1 },
  { id: "aegis_halo", tier: 0 },
];
const voltspineChoice = game
  .createLateAscensionChoices(voltspineRun.build)
  .find((choice) => choice.lateAscensionId === "voltspine_lattice");
assert.ok(voltspineChoice);
game.applyForgeChoice(voltspineRun, voltspineChoice);
const voltspineWeapon = game.computeWeaponStats(voltspineRun.build);
assert.equal(voltspineWeapon.lateAscensionLabel, "Voltspine Lattice");
assert.equal(voltspineWeapon.lateAscensionFirePattern.kind, "split_wing");
assert.ok(voltspineWeapon.lateAscensionFirePattern.offsets.length >= 8);
assert.ok(voltspineWeapon.chain >= 2);
const anvilRun = {
  build: game.createInitialBuild("scrap_pact"),
  resources: { scrap: 0 },
  stats: { scrapCollected: 0, scrapSpent: 0 },
  player: { hp: 100, maxHp: 100, heat: 16, overheated: false },
};
anvilRun.build.supportBayCap = 4;
anvilRun.build.supportSystems = [
  { id: "kiln_sentry", tier: 1 },
  { id: "volt_drones", tier: 1 },
];
const anvilChoice = game
  .createLateAscensionChoices(anvilRun.build)
  .find((choice) => choice.lateAscensionId === "anvil_prism");
assert.ok(anvilChoice);
game.applyForgeChoice(anvilRun, anvilChoice);
const anvilWeapon = game.computeWeaponStats(anvilRun.build);
assert.equal(anvilWeapon.lateAscensionLabel, "Anvil Prism");
assert.equal(anvilWeapon.lateAscensionFirePattern.kind, "split_wing");
assert.ok(anvilWeapon.lateAscensionFirePattern.offsets.length >= 5);
assert.ok(anvilWeapon.damage > slagburstWeapon.damage);
const illegalOverclockBuild = game.createInitialBuild("relay_oath");
const illegalOverclockChoices = game.createIllegalOverclockChoices(illegalOverclockBuild);
assert.equal(illegalOverclockChoices.length, 0);
illegalOverclockBuild.illegalOverclockId = "glass_broadside";
assert.equal(game.createIllegalOverclockMutationChoice(illegalOverclockBuild), null);
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
apexIllegalRun.build.illegalOverclockId = "rupture_crown";
const apexIllegalReward = game.applyApexPredatorMutation(apexIllegalRun);
assert.equal(apexIllegalReward.nextLevel, 1);
assert.equal(apexIllegalReward.illegalMutationApplied, false);
assert.equal(apexIllegalRun.build.illegalOverclockMutationLevel, 0);
const baseRelayWeapon = game.computeWeaponStats(game.createInitialBuild("relay_oath"));
const cyclerBuild = game.createInitialBuild("relay_oath");
const cyclerRun = {
  build: cyclerBuild,
  resources: { scrap: 0 },
  stats: { scrapCollected: 0, scrapSpent: 0 },
  player: { hp: 100, maxHp: 100, heat: 0, overheated: false },
};
const cyclerWeapon = game.computeWeaponStats(cyclerBuild);
assert.equal(cyclerWeapon.illegalOverclockLabel, null);
assert.equal(cyclerWeapon.cooldown, baseRelayWeapon.cooldown);
assert.equal(game.createIllegalOverclockMutationChoice(cyclerBuild), null);
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
assert.equal(kilnFrameWeapon.doctrineFirePattern.count, 2);
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
const sharedLateBuild = game.createInitialBuild("relay_oath");
const sharedLateWaveNine = game.resolveWaveConfig(8, sharedLateBuild);
const sharedLateWaveTen = game.resolveWaveConfig(9, sharedLateBuild);
const sharedLateWaveEleven = game.resolveWaveConfig(10, sharedLateBuild);
const sharedLateWaveTwelve = game.resolveWaveConfig(11, sharedLateBuild);
assert.equal(sharedLateWaveNine.label, "Wave 9 · Payoff Run+");
assert.equal(sharedLateWaveTen.label, "Wave 10 · Crown Proof+");
assert.equal(sharedLateWaveTen.pressureFamily, "breach");
assert.equal(sharedLateWaveTen.hazard.type, "relay");
assert.equal(sharedLateWaveEleven.label, "Wave 11 · Refuge Run");
assert.equal(sharedLateWaveEleven.hazard.type, "drift");
assert.equal(sharedLateWaveTwelve.label, "Wave 12 · Final Stand");
assert.equal(sharedLateWaveTwelve.pressureFamily, "hold");
assert.equal(sharedLateWaveTwelve.hazard.type, "territory");
assert.equal(sharedLateWaveTwelve.hazard.count, 2);
assert.ok(sharedLateWaveNine.activeCap < sharedLateWaveTen.activeCap);
assert.ok(sharedLateWaveEleven.activeCap <= sharedLateWaveTen.activeCap);
assert.ok(sharedLateWaveEleven.activeCap < sharedLateWaveTwelve.activeCap);
assert.ok(sharedLateWaveTen.activeCap <= 33);
assert.ok(sharedLateWaveTwelve.activeCap <= 33);
assert.ok(sharedLateWaveTwelve.hazard.turretInterval > 0);
assert.ok(sharedLateWaveTwelve.hazard.enemyPullRadius > 0);
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
assert.equal(game.createFinalCashoutWave().arena.width, game.WAVE_CONFIG[11].arena.width);
const afterburnBuild = game.createInitialBuild("relay_oath");
const afterburnWaveOne = game.createPostCapstoneWave(0, afterburnBuild);
const afterburnWaveThree = game.createPostCapstoneWave(2, afterburnBuild);
assert.ok(afterburnWaveOne.spawnBudget > game.WAVE_CONFIG[9].spawnBudget);
assert.ok(afterburnWaveOne.activeCap < game.WAVE_CONFIG[11].activeCap);
assert.ok(afterburnWaveThree.spawnBudget > afterburnWaveOne.spawnBudget);
assert.ok(afterburnWaveThree.activeCap > afterburnWaveOne.activeCap);
assert.ok(afterburnWaveThree.spawnBudget >= game.WAVE_CONFIG[10].spawnBudget);
assert.ok(afterburnWaveThree.activeCap >= game.WAVE_CONFIG[10].activeCap);
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
assert.equal(game.SUPPORT_SYSTEM_DEFS.aegis_halo.forgeWaveMin, 6);
assert.equal(game.SUPPORT_SYSTEM_DEFS.ember_ring.forgeWaveMin, 6);
assert.equal(game.SUPPORT_SYSTEM_DEFS.volt_drones.forgeWaveMin, 6);
assert.equal(game.SUPPORT_SYSTEM_DEFS.kiln_sentry.forgeWaveMin, 6);
assert.equal(game.SUPPORT_SYSTEM_DEFS.seeker_array.forgeWaveMin, 6);
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
assert.equal(signatureBuild.signatureId, null);
assert.equal(signatureBuild.coreId, "ember");
assert.equal(signatureBuild.attunedCoreId, "ember");
assert.equal(signatureBuild.maxHpBonus, 0);
assert.equal(signatureBuild.pickupBonus, 0);
assert.equal(signatureBuild.scrapMultiplier, 1);
assert.equal(signatureBuild.supportBayCap, 1);
assert.equal(JSON.stringify(signatureBuild.affixes), JSON.stringify([]));
assert.equal(JSON.stringify(signatureBuild.pendingCores), JSON.stringify([]));
assert.equal(JSON.stringify(signatureBuild.upgrades), JSON.stringify([]));

const relayStartBuild = game.createInitialBuild("relay_oath");
assert.equal(relayStartBuild.signatureId, null);
assert.equal(relayStartBuild.coreId, "ember");
assert.equal(relayStartBuild.attunedCoreId, "ember");
assert.equal(relayStartBuild.driveGainBonus, 0);
assert.equal(relayStartBuild.overdriveDurationBonus, 0);
assert.equal(JSON.stringify(relayStartBuild.pendingCores), JSON.stringify([]));

const railStartBuild = game.createInitialBuild("rail_zeal");
assert.equal(railStartBuild.signatureId, null);
assert.equal(railStartBuild.coreId, "ember");
assert.equal(railStartBuild.attunedCoreId, "ember");
assert.equal(railStartBuild.damageBonus, 0);
assert.equal(railStartBuild.coolRateBonus, 0);
assert.equal(JSON.stringify(railStartBuild.pendingCores), JSON.stringify([]));

const build = game.createInitialBuild("scrap_pact");
build.pendingCores = game.sanitizeBenchCoreIds(build.pendingCores.concat(["lance"]));
assert.equal(
  JSON.stringify(game.sanitizeBenchCoreIds(["scatter", "scatter", "scatter", "scatter", "scatter"])),
  JSON.stringify(["scatter", "scatter", "scatter", "scatter"])
);
assert.equal(game.getBenchCount(build, "scatter"), 0);
assert.equal(
  JSON.stringify(game.getBenchEntries(build)),
  JSON.stringify([{ coreId: "lance", copies: 1, syncLevel: 0 }])
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
assert.deepEqual(new Set(choices.map((choice) => choice.contractLabel)), new Set(["주력", "버팀", "판돈"]));
assert.ok(choices.some((choice) => choice.contractRole === "gamble"));
assert.ok(choices.some((choice) => choice.contractRole === "rider"));
assert.ok(choices.every((choice) => typeof choice.verb === "string" || choice.type === "fallback"));
assert.ok(choices.every((choice) => typeof choice.cost === "number"));

const recycleChoice = choices.find((choice) => choice.action === "recycle");
assert.ok(recycleChoice);
assert.equal(recycleChoice.contractRole, "gamble");
assert.equal(recycleChoice.cost, 0);

const directPivotBuild = game.createInitialBuild("scrap_pact");
directPivotBuild.pendingCores = game.sanitizeBenchCoreIds(["scatter"]);
const directPivotChoices = game.buildForgeChoices(directPivotBuild, () => 0, 180);
assert.ok(
  directPivotChoices.some(
    (choice) => choice.contractRole === "gamble" && choice.action === "recycle"
  )
);
const directPivotOfferChoices = game.buildForgeChoices(
  directPivotBuild,
  () => 0,
  180,
  { nextWave: 2 }
);
assert.equal(directPivotOfferChoices.length, 2);
assert.deepEqual(new Set(Array.from(directPivotOfferChoices, (choice) => choice.contractRole)), new Set(["headline", "rider"]));
assert.ok(
  directPivotOfferChoices.some(
    (choice) =>
      choice.contractRole === "headline" &&
      (choice.type === "fallback" || choice.type === "evolution")
  )
);
assert.ok(!directPivotOfferChoices.some((choice) => choice.type === "core"));
assert.ok(
  directPivotOfferChoices.some(
    (choice) => choice.contractRole === "rider" && choice.type !== "system"
  )
);
const directPivotChoice = {
  type: "core",
  coreId: "lance",
  directOffer: true,
  pivotFuelCoreId: "scatter",
  pivotFuelCopies: 1,
  benchCopies: 0,
};

assert.ok(!directPivotChoices.some((choice) => choice.recipeLabel === "Kiln Bloom"));
const scatterHeadlinePivot = directPivotChoices.find((choice) => choice.contractRole === "headline");
assert.ok(scatterHeadlinePivot);
assert.equal(scatterHeadlinePivot.type, "fallback");
assert.ok(!directPivotChoices.some((choice) => choice.type === "core"));

const railBuild = game.createInitialBuild("rail_zeal");
railBuild.coreId = "lance";
railBuild.attunedCoreId = "lance";
railBuild.pendingCores = [];
railBuild.attunedCopies = 4;
railBuild.bastionDoctrineId = "storm_artillery";
railBuild.architectureForecastId = "storm_artillery";
const railChoices = game.buildForgeChoices(railBuild, () => 0, 180);
const railFinisherChoice = railChoices.find((choice) => choice.recipeLabel === "Sky Pierce");
assert.equal(railFinisherChoice, undefined);

const prismBuild = game.createInitialBuild("relay_oath");
prismBuild.coreId = "ricochet";
prismBuild.attunedCoreId = "ricochet";
prismBuild.pendingCores = [];
prismBuild.attunedCopies = 4;
prismBuild.bastionDoctrineId = "mirror_hunt";
prismBuild.architectureForecastId = "mirror_hunt";
const prismChoices = game.buildForgeChoices(prismBuild, () => 0, 180);
const prismFinisherChoice = prismChoices.find((choice) => choice.recipeLabel === "Prism Cascade");
assert.equal(prismFinisherChoice, undefined);

const midrunChaseBuild = game.createInitialBuild("scrap_pact");
midrunChaseBuild.coreId = "scatter";
midrunChaseBuild.attunedCoreId = "scatter";
midrunChaseBuild.pendingCores = [];
midrunChaseBuild.attunedCopies = 1;
const genericForgeChoices = game.buildForgeChoices(midrunChaseBuild, () => 0, 180);
assert.ok(!genericForgeChoices.some((choice) => choice.recipeLabel === "Kiln Bloom"));
const waveTwoForgeChoices = game.buildForgeChoices(midrunChaseBuild, () => 0, 180, { nextWave: 2 });
assert.equal(waveTwoForgeChoices.length, 2);
assert.deepEqual(new Set(Array.from(waveTwoForgeChoices, (choice) => choice.contractRole)), new Set(["headline", "rider"]));
assert.ok(!waveTwoForgeChoices.some((choice) => choice.type === "system"));
assert.ok(!waveTwoForgeChoices.some((choice) => choice.recipeLabel === "Kiln Bloom"));
const waveThreeForgeChoices = game.buildForgeChoices(midrunChaseBuild, () => 0, 180, { nextWave: 3 });
const waveThreeEvolutionChoice = waveThreeForgeChoices.find(
  (choice) => choice.contractRole === "headline" && choice.type === "evolution"
);
assert.ok(waveThreeEvolutionChoice);
assert.equal(waveThreeEvolutionChoice.coreId, "scatter");
assert.equal(waveThreeEvolutionChoice.evolutionTier, 1);
assert.equal(waveThreeForgeChoices.length, 2);
assert.equal(
  waveThreeForgeChoices.map((choice) => choice.contractRole).join("|"),
  "headline|rider"
);
assert.ok(waveThreeForgeChoices.every((choice) => choice.laneLabel !== "보조 시스템"));
assert.ok(waveThreeForgeChoices.every((choice) => choice.laneLabel !== "생존/경제"));
assert.equal(game.shouldUseFieldGrant({ nextWave: 3, finalForge: false }), false);
const architectureDraftChoices = game.buildArchitectureDraftChoices(game.createInitialBuild("relay_oath"));
assert.equal(architectureDraftChoices.length, 3);
assert.ok(architectureDraftChoices.every((choice) => choice.action === "architecture_forecast"));
assert.ok(architectureDraftChoices.every((choice) => choice.cost === 0));
assert.ok(architectureDraftChoices.every((choice) => choice.weaponChoice));
assert.ok(architectureDraftChoices.every((choice) => choice.doctrineCapstoneLabel));
assert.ok(architectureDraftChoices.every((choice) => !choice.systemChoice));
assert.ok(architectureDraftChoices.every((choice) => !choice.chassisId));
assert.ok(architectureDraftChoices.every((choice) => choice.breakpointLabel));
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
  architectureRun.build.upgrades.some((upgrade) => upgrade.startsWith("Wave 3 무기 도약: "))
);
assert.equal(architectureRun.build.coreId, "ricochet");
assert.equal(game.computeWeaponStats(architectureRun.build).evolutionTier, 0);
assert.equal(architectureRun.build.supportSystems.length, 0);
assert.equal(game.getSupportBayCapacity(architectureRun.build), 1);
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
assert.ok(bastionOvercommitChoices.every((choice) => choice.action === "bastion_bay_forge"));
assert.ok(bastionOvercommitChoices.every((choice) => choice.bayUnlock));
assert.ok(bastionOvercommitChoices.every((choice) => choice.systemChoice?.systemTier === 1));
game.applyForgeChoice(architectureRun, bastionOvercommitChoices[0]);
assert.equal(game.getSupportBayCapacity(architectureRun.build), 2);
assert.equal(architectureRun.build.auxiliaryJunctionLevel, 1);
assert.equal(architectureRun.build.wave6ChassisBreakpoint, true);
assert.equal(architectureRun.build.supportSystems.length, 1);
assert.equal(architectureRun.build.bastionDoctrineId, architectureRun.build.architectureForecastId);
assert.equal(architectureRun.build.doctrinePursuitCommitted, false);
assert.equal(architectureRun.build.doctrinePursuitProgress, 0);
assert.equal(architectureRun.build.doctrineChaseClaimed, false);
assert.ok(
  architectureRun.build.upgrades.some((upgrade) =>
    upgrade.startsWith("유틸리티 섀시:")
  )
);
assert.ok(
  architectureRun.build.upgrades.includes("Chassis Breakpoint: hidden support junction opened under the frame lock")
);
assert.equal(game.shouldSkipOwnershipAdminStop(architectureRun.build, 9), false);
assert.equal(game.unlockLateSupportBay(architectureRun.build), true);
assert.equal(game.getSupportBayCapacity(architectureRun.build), 3);
assert.equal(game.doctrineAllowsSystemInstall(architectureRun.build, "seeker_array", 8), true);
assert.equal(game.doctrineAllowsSystemInstall(architectureRun.build, "volt_drones", 8), false);
assert.equal(game.doctrineAllowsSystemInstall(architectureRun.build, "aegis_halo"), false);
assert.equal(game.doctrineAllowsSystemInstall(architectureRun.build, "ember_ring", 8), false);
assert.ok(game.doctrineAllowsSystemInstall(architectureRun.build, "seeker_array", 9));
assert.equal(
  JSON.stringify(game.getVisibleSupportOfferSystemIds(architectureRun.build, 8).sort()),
  JSON.stringify(["seeker_array"])
);
assert.equal(
  JSON.stringify(game.getVisibleSupportOfferSystemIds(architectureRun.build, 9).sort()),
  JSON.stringify(["seeker_array"])
);
const postChaseChoices = game.buildForgeChoices(
  architectureRun.build,
  () => 0,
  180,
  { nextWave: 5, finalForge: false }
);
assert.ok(!postChaseChoices.some((choice) => choice.type === "utility" && choice.action === "doctrine_chase"));
assert.equal(game.shouldUseFieldGrant({ nextWave: 5, finalForge: false }), false);
assert.equal(game.shouldUseFieldGrant({ nextWave: 9, finalForge: false }), false);
assert.equal(game.shouldUseConsolidatedLateFormForge({ nextWave: 9, finalForge: false }), true);
const lateFormTransition = game.getBaseRoutePostWaveTransition(
  {
    waveIndex: 7,
    wave: { completesRun: false },
    build: {
      ...architectureRun.build,
      wave6ChassisBreakpoint: true,
      doctrineChaseClaimed: true,
    },
  },
  9
);
assert.equal(lateFormTransition.action, "victory_lap");
assert.equal(lateFormTransition.label, "승리 랩");
const earlyMutationTransition = game.getBaseRoutePostWaveTransition(
  {
    waveIndex: 3,
    wave: { completesRun: false },
    build: architectureRun.build,
  },
  5
);
assert.equal(earlyMutationTransition.action, "forge");
assert.equal(earlyMutationTransition.label, "주력 변이");
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
catalystBuild.coreId = "scatter";
catalystBuild.attunedCoreId = "scatter";
catalystBuild.finisherCatalysts = ["scatter"];
assert.equal(
  game.shouldRunCatalystDraft(
    { nextWave: game.ACT3_CATALYST_DRAFT_WAVE, finalForge: false },
    catalystBuild
  ),
  false
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
assert.equal(bastionDoctrineChoice.doctrineChoice.title, "Ricochet Coil");
game.applyForgeChoice(
  { build: bastionDoctrineBuild, player: null, resources: { scrap: 999 }, stats: {} },
  bastionDoctrineChoice
);
assert.equal(bastionDoctrineBuild.bastionDoctrineId, "mirror_hunt");
assert.ok(bastionDoctrineBuild.upgrades.includes("교리 채택: Mirror Hunt Doctrine"));
assert.equal(game.computeWeaponStats(bastionDoctrineBuild).evolutionLabel, null);
const doctrinePrimaryChoices = game.buildForgeChoices(
  bastionDoctrineBuild,
  () => 0.99,
  180,
  { nextWave: 8, finalForge: false }
);
assert.ok(!doctrinePrimaryChoices.some((choice) => choice.type === "system"));
const doctrineCommitChoice = doctrinePrimaryChoices.find((choice) => choice.contractRole === "headline");
assert.ok(doctrineCommitChoice);
const doctrineWave7RiderChoice = doctrinePrimaryChoices.find((choice) => choice.contractRole === "rider");
assert.ok(doctrineWave7RiderChoice);
assert.notEqual(doctrineWave7RiderChoice.type, "system");
const doctrineWave8Choices = game.buildForgeChoices(
  bastionDoctrineBuild,
  () => 0.99,
  180,
  { nextWave: 8, finalForge: false }
);
assert.ok(
  !doctrineWave8Choices.some(
    (choice) => choice.type === "system"
  )
);
const doctrineFollowupChoices = game.buildForgeFollowupChoices(
  bastionDoctrineBuild,
  () => 0,
  180,
  { nextWave: 7, finalForge: false },
  doctrineCommitChoice
);
assert.ok(doctrineFollowupChoices.every((choice) => choice.contractRole !== "headline"));
assert.equal(doctrineFollowupChoices.length, 1);
assert.notEqual(doctrineFollowupChoices[0].type, "system");
const doctrineCapstoneBuild = game.createInitialBuild("relay_oath");
doctrineCapstoneBuild.pendingCores = [];
const mirrorArchitectureChoice = game
  .buildArchitectureDraftChoices(doctrineCapstoneBuild)
  .find((choice) => choice.title === "Ricochet Coil");
assert.ok(mirrorArchitectureChoice);
assert.ok(mirrorArchitectureChoice.description.includes("Wave 3"));
assert.ok(mirrorArchitectureChoice.description.includes("첫 주포 도약"));
assert.ok(!mirrorArchitectureChoice.description.includes("support bay"));
assert.ok(!mirrorArchitectureChoice.description.includes("marked elite shard"));
game.applyForgeChoice(
  { build: doctrineCapstoneBuild, player: null, resources: { scrap: 999 }, stats: {} },
  mirrorArchitectureChoice
);
game.applyForgeChoice(
  { build: doctrineCapstoneBuild, player: null, resources: { scrap: 999 }, stats: {} },
  { type: "system", systemId: "volt_drones", systemTier: 1, cost: 0 }
);
const mirrorWaveThreeWeapon = game.computeWeaponStats(doctrineCapstoneBuild);
assert.equal(mirrorWaveThreeWeapon.doctrineFormLabel, null);
assert.equal(mirrorWaveThreeWeapon.doctrineStage, 0);
assert.equal(mirrorWaveThreeWeapon.doctrineFirePattern, null);
doctrineCapstoneBuild.bastionDoctrineId = "mirror_hunt";
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
assert.equal(
  doctrineLateArmoryChoices.some((choice) => choice.action === "doctrine_capstone"),
  false
);
const doctrineCapstoneChoice = {
  type: "utility",
  action: "doctrine_capstone",
  doctrineCapstoneId: "relay_storm_lattice",
};
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
assert.equal(
  JSON.stringify(game.getVisibleSupportOfferSystemIds(doctrineCapstoneBuild, 8).sort()),
  JSON.stringify(["volt_drones"])
);
assert.equal(
  JSON.stringify(game.getVisibleSupportOfferSystemIds(doctrineCapstoneBuild, 9).sort()),
  JSON.stringify(["seeker_array"])
);
const artilleryDoctrineBuild = game.createInitialBuild("rail_zeal");
artilleryDoctrineBuild.pendingCores = [];
const artilleryArchitectureChoice = game
  .buildArchitectureDraftChoices(artilleryDoctrineBuild)
  .find((choice) => choice.title === "Lance Rail");
assert.ok(artilleryArchitectureChoice);
assert.equal(
  artilleryArchitectureChoice.doctrineCapstoneLabel,
  "Sky Lance Battery / Stormspire Needle"
);
game.applyForgeChoice(
  { build: artilleryDoctrineBuild, player: null, resources: { scrap: 999 }, stats: {} },
  artilleryArchitectureChoice
);
const artilleryWaveThreeWeapon = game.computeWeaponStats(artilleryDoctrineBuild);
assert.equal(artilleryWaveThreeWeapon.evolutionLabel, null);
assert.equal(artilleryWaveThreeWeapon.doctrineFormLabel, null);
assert.equal(artilleryWaveThreeWeapon.doctrineTraitLabel, null);
assert.equal(artilleryWaveThreeWeapon.doctrineFirePattern, null);
Object.assign(artilleryDoctrineBuild, { overcommitUnlocked: true, overcommitResolved: true });
const artilleryAscensionChoice = game
  .buildBastionDraftChoices(artilleryDoctrineBuild, () => 0, 6)
  .find((choice) => choice.action === "bastion_bay_forge" && choice.chassisId === "vector_thrusters");
assert.ok(artilleryAscensionChoice);
assert.ok(artilleryAscensionChoice.description.includes("Wave 6"));
assert.ok(!artilleryAscensionChoice.description.includes("Wave 8"));
assert.ok(artilleryAscensionChoice.description.includes("증명하는"));
assert.equal(artilleryAscensionChoice.systemChoice?.systemId, "ember_ring");
assert.ok(!artilleryAscensionChoice.description.includes("contraband salvage"));
game.applyForgeChoice(
  { build: artilleryDoctrineBuild, player: null, resources: { scrap: 999 }, stats: {} },
  artilleryAscensionChoice
);
assert.equal(artilleryDoctrineBuild.supportSystems.length, 1);
assert.equal(game.doctrineAllowsSystemInstall(artilleryDoctrineBuild, "seeker_array", 7), false);
assert.equal(game.doctrineAllowsSystemInstall(artilleryDoctrineBuild, "ember_ring", 7), false);
assert.equal(game.doctrineAllowsSystemInstall(artilleryDoctrineBuild, "seeker_array", 8), true);
assert.equal(game.doctrineAllowsSystemInstall(artilleryDoctrineBuild, "ember_ring", 8), false);
assert.equal(
  JSON.stringify(game.getVisibleSupportOfferSystemIds(artilleryDoctrineBuild, 7).sort()),
  JSON.stringify([])
);
assert.ok(game.doctrineAllowsSystemInstall(artilleryDoctrineBuild, "seeker_array", 9));
assert.equal(
  JSON.stringify(game.getVisibleSupportOfferSystemIds(artilleryDoctrineBuild, 8).sort()),
  JSON.stringify(["seeker_array"])
);
assert.equal(
  JSON.stringify(game.getVisibleSupportOfferSystemIds(artilleryDoctrineBuild, 9).sort()),
  JSON.stringify(["seeker_array"])
);
const artilleryWaveFiveWeapon = game.computeWeaponStats(artilleryDoctrineBuild);
assert.equal(artilleryDoctrineBuild.bastionDoctrineId, "storm_artillery");
assert.equal(artilleryDoctrineBuild.doctrinePursuitCommitted, false);
assert.equal(artilleryDoctrineBuild.doctrinePursuitProgress, 0);
assert.equal(artilleryWaveFiveWeapon.doctrineFormLabel, "Siege Frame");
assert.equal(artilleryWaveFiveWeapon.doctrineStage, 1);
assert.equal(artilleryWaveFiveWeapon.chain, 0);
assert.ok(artilleryWaveFiveWeapon.doctrineFirePattern);
artilleryDoctrineBuild.doctrineChaseClaimed = true;
const artilleryWaveSevenWeapon = game.computeWeaponStats(artilleryDoctrineBuild);
assert.equal(artilleryWaveSevenWeapon.doctrineFormLabel, "Thunder Rack");
assert.equal(artilleryWaveSevenWeapon.doctrineStage, 2);
assert.ok(artilleryWaveSevenWeapon.doctrineFirePattern);
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
assert.equal(artilleryAfterburnWave.afterburnAscension, null);
assert.equal(artilleryAfterburnWave.finaleMutation, null);
const recurringFinaleBuild = game.createInitialBuild("relay_oath");
const afterburnStageOne = game.createPostCapstoneWave(0, recurringFinaleBuild);
const afterburnStageTwo = game.createPostCapstoneWave(1, recurringFinaleBuild);
assert.equal(afterburnStageOne.finaleMutation, null);
assert.equal(afterburnStageTwo.finaleMutation, null);
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
assert.ok(fortressFollowupChoices.length >= 1);
assert.ok(fortressFollowupChoices.every((choice) => ["fallback", "evolution", "utility", "mod", "affix"].includes(choice.type)));
assert.ok(!fortressFollowupChoices.some((choice) => choice.laneLabel === "Support Rider"));
const fieldGrantBuild = game.createInitialBuild("relay_oath");
fieldGrantBuild.pendingCores = [];
const fieldGrantChoices = game.buildFieldGrantChoices(fieldGrantBuild, () => 0, 4);
assert.equal(fieldGrantChoices.length, 2);
assert.equal(
  JSON.stringify(fieldGrantChoices.map((choice) => choice.contractLabel)),
  JSON.stringify(["주력", "버팀"])
);
assert.ok(
  fieldGrantChoices.every((choice) =>
    ["evolution", "system", "affix", "mod", "fallback", "utility"].includes(choice.type)
  )
);
assert.ok(fieldGrantChoices.every((choice) => choice.fieldGrant === true));
assert.ok(fieldGrantChoices.every((choice) => choice.type !== "core"));
assert.ok(!fieldGrantChoices.some((choice) => choice.type === "utility" && choice.action === "field_greed"));
assert.ok(
  fieldGrantChoices
    .filter((choice) => choice.type !== "fallback" && choice.cost > 0)
    .every((choice) => (choice.originalCost || 0) === 0 || choice.originalCost > choice.cost)
);
const afterglowGrantBuild = game.createInitialBuild("relay_oath");
afterglowGrantBuild.pendingCores = [];
const afterglowGrantChoices = game.buildFieldGrantChoices(afterglowGrantBuild, () => 0, 5);
const afterglowGrantHeadline =
  afterglowGrantChoices.find((choice) => choice.contractRole === "headline") ||
  afterglowGrantChoices[0];
assert.equal(afterglowGrantHeadline.action, "afterglow_mutation");
game.applyForgeChoice(
  { build: afterglowGrantBuild, player: null, resources: { scrap: 999 }, stats: {} },
  afterglowGrantHeadline
);
const afterglowWeapon = game.computeWeaponStats(afterglowGrantBuild);
assert.equal(afterglowWeapon.afterglowMutationLabel, "Afterglow Fork");
assert.equal(afterglowWeapon.afterglowMutationTraitLabel, "외곽 점화 날개");
assert.ok(afterglowWeapon.afterglowMutationFirePattern);
assert.equal(afterglowWeapon.chain, 0);

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
assert.equal(evolvedWeapon.evolutionLabel, "Fork Array");
assert.equal(evolvedWeapon.evolutionTraitLabel, "삼열 점화");
assert.equal(JSON.stringify(evolvedWeapon.evolutionFirePattern.offsets), JSON.stringify([-0.16, 0.16]));
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
assert.equal(apexEvolvedWeapon.evolutionLabel, "Solar Crown");
assert.equal(apexEvolvedWeapon.evolutionTraitLabel, "칠열 왕관 점화");
assert.equal(
  JSON.stringify(apexEvolvedWeapon.evolutionFirePattern.offsets),
  JSON.stringify([-0.32, -0.2, -0.1, 0.1, 0.2, 0.32])
);

const scatterEvolutionBuild = game.createInitialBuild("scrap_pact");
scatterEvolutionBuild.coreId = "scatter";
scatterEvolutionBuild.attunedCoreId = "scatter";
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
  (choice) => choice.contractRole === "headline"
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
  false
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
assert.equal(
  packageFollowupChoices.map((choice) => choice.contractRole).join("|"),
  "headline|rider"
);
assert.ok(!packageFollowupChoices.some((choice) => choice.type === "system"));
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
aegisBuild.supportBayCap = 2;
const aegisInstallChoices = game.buildForgeFollowupChoices(
  aegisBuild,
  () => 0.99,
  180,
  { nextWave: 8, finalForge: false },
  packagePrimaryChoice
);
assert.ok(aegisInstallChoices.every((choice) => choice.contractRole !== "headline"));
assert.ok(aegisInstallChoices.length >= 1);
const sentryBuild = game.createInitialBuild("relay_oath");
sentryBuild.pendingCores = [];
sentryBuild.supportBayCap = 2;
game.applyForgeChoice(
  { build: sentryBuild, player: null, resources: { scrap: 999 }, stats: {} },
  { type: "system", systemId: "kiln_sentry", systemTier: 1 }
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
  .buildForgeFollowupChoices(sentryBuild, () => 0, 180, { nextWave: 9, finalForge: false }, packagePrimaryChoice)
  .find((choice) => choice.type === "system" && choice.systemId === "aegis_halo");
assert.ok(sentryTierTwoChoice);
assert.equal(sentryTierTwoChoice.systemTier, 2);
game.applyForgeChoice(
  { build: sentryBuild, player: null, resources: { scrap: 999 }, stats: {} },
  sentryTierTwoChoice
);
const sentryTierTwo = game.computeSupportSystemStats(sentryBuild);
assert.ok(sentryTierTwo.interceptRange > 0);
assert.ok(sentryTierTwo.interceptPulseDamage > 0);
const aegisTierOne = game.computeSupportSystemStats(aegisBuild);
assert.equal(aegisTierOne, null);

const aegisUpgradeChoices = game.buildForgeFollowupChoices(
  aegisBuild,
  () => 0,
  180,
  { nextWave: 9, finalForge: false },
  packagePrimaryChoice
);
assert.equal(
  JSON.stringify(aegisUpgradeChoices.map((choice) => choice.laneLabel)),
  JSON.stringify(["Defense / Utility", "Support Rider"])
);
const secondSupportBayChoice = game
  .buildForgeFollowupChoices(aegisBuild, () => 0, 180, { nextWave: 9, finalForge: false }, packagePrimaryChoice)
  .find(
    (choice) =>
      choice.laneLabel === "Support Rider" &&
      choice.type === "system" &&
      choice.systemId === "seeker_array"
  );
assert.ok(secondSupportBayChoice);
assert.equal(secondSupportBayChoice.systemTier, 1);
game.applyForgeChoice(
  { build: aegisBuild, player: null, resources: { scrap: 999 }, stats: {} },
  secondSupportBayChoice
);
const aegisTierOnePlusArsenal = game.computeSupportSystemStats(aegisBuild);
assert.ok(aegisTierOnePlusArsenal.orbitCount >= 1);
assert.ok(aegisTierOnePlusArsenal.interceptRange >= 0);
assert.ok(aegisTierOnePlusArsenal.shotCooldown > 0);
const aegisTierTwoChoice = game
  .buildForgeFollowupChoices(aegisBuild, () => 0, 180, { nextWave: 10, finalForge: false }, packagePrimaryChoice)
  .find(
    (choice) =>
      choice.laneLabel === "Defense / Utility" &&
      choice.type === "system" &&
      choice.systemId === "aegis_halo"
  );
assert.ok(aegisTierTwoChoice);
assert.equal(aegisTierTwoChoice.systemTier, 1);
const aegisTierTwoPreviewRows = game.createForgePreviewRows(aegisTierTwoChoice);
assert.equal(aegisTierTwoPreviewRows[0].label, "방호 고리");
assert.equal(aegisTierTwoPreviewRows[1].value, "탄막 절개 + 방호 파동");
game.applyForgeChoice(
  { build: aegisBuild, player: null, resources: { scrap: 999 }, stats: {} },
  aegisTierTwoChoice
);
const aegisTierTwo = game.computeSupportSystemStats(aegisBuild);
assert.ok(aegisTierTwo.orbitCount >= aegisTierOnePlusArsenal.orbitCount);
assert.ok(aegisTierTwo.interceptRange >= aegisTierOnePlusArsenal.interceptRange);
assert.ok(aegisTierTwo.interceptPulseDamage > 0);

const actTwoModuleBuild = game.createInitialBuild("relay_oath");
actTwoModuleBuild.pendingCores = [];
const actBreakArmoryChoices = game.buildForgeChoices(
  actTwoModuleBuild,
  () => 0,
  180,
  { nextWave: 5, finalForge: false }
);
assert.equal(actBreakArmoryChoices.length, 2);
assert.equal(
  actBreakArmoryChoices.map((choice) => choice.contractRole).join("|"),
  "headline|rider"
);
const armoryFirstPick = actBreakArmoryChoices.find((choice) => choice.contractRole === "headline");
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
assert.equal(
  actBreakFollowupChoices.map((choice) => choice.contractRole).join("|"),
  "headline|rider"
);
assert.ok(!actBreakFollowupChoices.some((choice) => choice.id === armoryFirstPick.id));
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
assert.equal(lateArmoryChoices.length, 3);
assert.ok(lateArmoryChoices.some((choice) => choice.laneLabel === "Main Weapon Mutation"));
assert.ok(lateArmoryChoices.some((choice) => choice.laneLabel === "Defense / Utility"));
assert.ok(lateArmoryChoices.some((choice) => choice.laneLabel === "Greed Contract"));
const thirdBayChoice = lateArmoryChoices.find((choice) => choice.laneLabel === "Defense / Utility");
assert.ok(thirdBayChoice);
game.applyForgeChoice(
  { build: lateArmoryBuild, player: null, resources: { scrap: 999 }, stats: {} },
  thirdBayChoice
);
const lateArmorySystems = game.computeSupportSystemStats(lateArmoryBuild);
assert.ok(lateArmoryBuild.lateFieldAegisLevel >= 2);
assert.ok(lateArmorySystems.interceptRange >= 0);
const actModuleFollowupBuild = game.createInitialBuild("relay_oath");
actModuleFollowupBuild.pendingCores = [];
const actOneModuleFollowup = game.buildForgeFollowupChoices(
  actModuleFollowupBuild,
  () => 0,
  180,
  { nextWave: 3, finalForge: false },
  packagePrimaryChoice
);
assert.equal(
  actOneModuleFollowup.map((choice) => choice.contractRole).join("|"),
  "rider"
);
const actTwoModuleFollowup = game.buildForgeFollowupChoices(
  actModuleFollowupBuild,
  () => 0,
  180,
  { nextWave: 4, finalForge: false },
  packagePrimaryChoice
);
assert.equal(
  actTwoModuleFollowup.map((choice) => choice.contractRole).join("|"),
  "rider"
);
const seekerInstallChoice = game
  .buildForgeFollowupChoices(
    actModuleFollowupBuild,
    () => 0,
    180,
    { nextWave: 8, finalForge: false },
    packagePrimaryChoice
  )
  .find((choice) => choice.laneLabel === "Support Rider" && choice.systemId === "seeker_array");
assert.equal(seekerInstallChoice, undefined);
const seekerTierOne = game.computeSupportSystemStats(actModuleFollowupBuild);
assert.equal(seekerTierOne, null);
const voltInstallChoice = game
  .buildForgeFollowupChoices(
    actModuleFollowupBuild,
    () => 0,
    180,
    { nextWave: 9, finalForge: false },
    packagePrimaryChoice
  )
  .find((choice) => choice.laneLabel === "Support Rider" && choice.systemId === "seeker_array");
assert.ok(voltInstallChoice);
assert.equal(voltInstallChoice.systemTier, 1);
game.applyForgeChoice(
  { build: actModuleFollowupBuild, player: null, resources: { scrap: 999 }, stats: {} },
  voltInstallChoice
);
const dualOffenseStats = game.computeSupportSystemStats(actModuleFollowupBuild);
assert.ok(dualOffenseStats.orbitCount >= 1);
const actTwoUpgradeChoices = game.buildForgeFollowupChoices(
  actModuleFollowupBuild,
  () => 0,
  180,
  { nextWave: 10, finalForge: false },
  packagePrimaryChoice
);
assert.ok(actTwoUpgradeChoices.some((choice) => choice.laneLabel === "Support Rider"));

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
assert.equal(emberFailSoftFinalChoices[0].finalePreview.label, game.WAVE_CONFIG[11].label);
assert.equal(emberFailSoftFinalChoices[1].action, "cashout_support");
assert.equal(emberFailSoftFinalChoices[1].cost, 0);
assert.equal(emberFailSoftFinalChoices[1].finalePreview.label, game.WAVE_CONFIG[11].label);
assert.equal(
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
assert.equal(emberFinalChoices[1].finalePreview.label, game.WAVE_CONFIG[11].label);
assert.equal(emberFinalChoices[2].action, "cashout_support");
assert.equal(emberFinalChoices[2].supportLabel, "Pilot Light");
assert.ok(emberFinalChoices[2].finalePreview.hazard.includes(game.WAVE_CONFIG[11].hazard.label));
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
catalystGateBuild.coreId = "scatter";
catalystGateBuild.attunedCoreId = "scatter";
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
assert.ok(!catalystReadyChoices.some((choice) => choice.affixId === "hotshot"));
const catalystReforgeChoice = catalystReadyChoices.find(
  (choice) => choice.action === "catalyst_reforge"
);
if (catalystReforgeChoice) {
  assert.equal(catalystReforgeChoice.capstoneLabel, "Flash Temper");
}

const finalForgeChoices = game.buildForgeChoices(catalystGateBuild, () => 0, 180, { finalForge: true });
assert.equal(finalForgeChoices.length, 3);
assert.equal(
  JSON.stringify(finalForgeChoices.map((choice) => choice.laneLabel)),
  JSON.stringify(["완성", "촉매 연소", "안정화"])
);
assert.ok(finalForgeChoices.every((choice) => choice.finalePreview));
assert.ok(!finalForgeChoices.some((choice) => choice.action === "reforge" || choice.action === "affix_reforge"));
assert.equal(finalForgeChoices[0].affixId, "hotshot");
assert.equal(finalForgeChoices[0].finalePreview.label, game.WAVE_CONFIG[11].label);
assert.equal(finalForgeChoices[1].action, "catalyst_reforge");
assert.equal(finalForgeChoices[1].finalePreview.label, game.WAVE_CONFIG[11].label);
assert.equal(finalForgeChoices[2].action, "cashout_support");
assert.equal(finalForgeChoices[2].supportLabel, "Quench Loop");
assert.equal(finalForgeChoices[2].cost, 0);
assert.equal(finalForgeChoices[2].finalePreview.label, game.WAVE_CONFIG[11].label);
assert.ok(finalForgeChoices[2].finalePreview.hazard.includes(game.WAVE_CONFIG[11].hazard.label));
assert.ok(finalForgeChoices[2].finalePreview.tempo.includes("Wave 12 최종전"));
const finalForgePreviewRows = game.createForgePreviewRows(finalForgeChoices[0]);
assert.ok(finalForgePreviewRows.every((row) => row.label !== "시험" && row.label !== "압박"));
const finalForgeTransformation = game.getForgeChoiceTransformation(finalForgeChoices[0]);
assert.ok(!finalForgeTransformation.proof.includes(finalForgeChoices[0].finalePreview.label));
assert.ok(!finalForgeTransformation.proof.includes(finalForgeChoices[0].finalePreview.hazard));
const lowScrapFinalChoices = game.buildForgeChoices(catalystGateBuild, () => 0, 0, { finalForge: true });
assert.ok(lowScrapFinalChoices.some((choice) => choice.action === "cashout_support" && choice.cost === 0));
game.applyForgeChoice(blockedRun, finalForgeChoices[0]);
assert.ok(catalystGateBuild.affixes.includes("hotshot"));
assert.equal(game.hasFinisherCatalyst(catalystGateBuild, "scatter"), false);

const missedCatalystFinalBuild = game.createInitialBuild("scrap_pact");
missedCatalystFinalBuild.coreId = "scatter";
missedCatalystFinalBuild.attunedCoreId = "scatter";
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
assert.equal(missedCatalystFinalChoices[0].finalePreview.label, game.WAVE_CONFIG[11].label);
assert.equal(missedCatalystFinalChoices[1].action, "cashout_support");
assert.equal(missedCatalystFinalChoices[1].cost, 0);
assert.equal(missedCatalystFinalChoices[1].laneLabel, "안정화");
assert.equal(missedCatalystFinalChoices[1].failSoft, true);
assert.equal(missedCatalystFinalChoices[1].finalePreview.label, game.WAVE_CONFIG[11].label);
assert.ok(
  !missedCatalystFinalChoices.some(
    (choice) => choice.action === "reforge" || choice.action === "affix_reforge"
  )
);

const supportBuild = game.createInitialBuild("scrap_pact");
supportBuild.coreId = "scatter";
supportBuild.attunedCoreId = "scatter";
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
catalystPivotBuild.coreId = "scatter";
catalystPivotBuild.attunedCoreId = "scatter";
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
const catalystPivotChoices = game.buildForgeChoices(catalystPivotBuild, () => 0, 180, {
  finalForge: true,
});
const flashTemperChoice = catalystPivotChoices.find(
  (choice) => choice.action === "catalyst_reforge"
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
stormRailBuild.coreId = "lance";
stormRailBuild.attunedCoreId = "lance";
stormRailBuild.pendingCores = [];
stormRailBuild.attunedCopies = 4;
stormRailBuild.affixes = ["phase_rounds", "arc_link"];
stormRailBuild.finisherCatalysts = ["lance"];
const stormRailChoice = game
  .buildForgeChoices(stormRailBuild, () => 0, 180, { finalForge: true })
  .find((choice) => choice.action === "catalyst_reforge");
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
mirrorSpiralBuild.coreId = "ricochet";
mirrorSpiralBuild.attunedCoreId = "ricochet";
mirrorSpiralBuild.pendingCores = [];
mirrorSpiralBuild.attunedCopies = 4;
mirrorSpiralBuild.affixes = ["arc_link", "overclock"];
mirrorSpiralBuild.finisherCatalysts = ["ricochet"];
const mirrorSpiralChoice = game
  .buildForgeChoices(mirrorSpiralBuild, () => 0, 180, { finalForge: true })
  .find((choice) => choice.action === "catalyst_reforge");
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
  false
);
assert.equal(
  game.shouldFinishAfterForge({ pendingFinalForge: false, waveIndex: game.MAX_WAVES - 1 }),
  false
);
assert.equal(
  game.shouldFinishAfterForge({ pendingFinalForge: true, waveIndex: game.MAX_WAVES - 2 }),
  false
);
const finalCashoutBaseWave = game.resolveWaveConfig(game.MAX_WAVES - 1);
const finalCashoutWave = game.createFinalCashoutWave(game.MAX_WAVES - 1);
assert.equal(finalCashoutWave.duration, finalCashoutBaseWave.duration);
assert.equal(finalCashoutWave.completesRun, true);
assert.equal(finalCashoutWave.awaitingForge, undefined);
assert.ok(finalCashoutWave.spawnBudget > 0);
assert.equal(finalCashoutWave.activeCap, finalCashoutBaseWave.activeCap);
assert.equal(finalCashoutWave.hazard.interval, finalCashoutBaseWave.hazard.interval);
assert.equal(finalCashoutWave.label, finalCashoutBaseWave.label);
assert.equal(finalCashoutWave.postCapstoneTotal, undefined);

const finalAfterburnWave = game.createPostCapstoneWave(game.POST_CAPSTONE_WAVE_COUNT - 1, catalystPivotBuild);
assert.equal(finalAfterburnWave.completesRun, true);
assert.equal(finalAfterburnWave.postCapstoneStage, game.POST_CAPSTONE_WAVE_COUNT);
assert.ok(finalAfterburnWave.label.includes("Afterburn VII"));

const temperCashoutWave = game.createFinalCashoutWave(game.MAX_WAVES - 1, flashTemperChoice ? catalystPivotBuild : null);
assert.equal(
  temperCashoutWave.label,
  game.resolveWaveConfig(game.MAX_WAVES - 1, flashTemperChoice ? catalystPivotBuild : null).label
);
assert.equal(temperCashoutWave.completesRun, true);

const railCashoutWave = game.createFinalCashoutWave(game.MAX_WAVES - 1, stormRailBuild);
assert.equal(
  railCashoutWave.label,
  game.resolveWaveConfig(game.MAX_WAVES - 1, stormRailBuild).label
);
assert.equal(railCashoutWave.completesRun, true);

const mirrorCashoutWave = game.createFinalCashoutWave(game.MAX_WAVES - 1, mirrorSpiralBuild);
assert.equal(
  mirrorCashoutWave.label,
  game.resolveWaveConfig(game.MAX_WAVES - 1, mirrorSpiralBuild).label
);
assert.equal(mirrorCashoutWave.completesRun, true);

const quenchCashoutWave = game.createFinalCashoutWave(game.MAX_WAVES - 1, supportBuild);
assert.equal(
  quenchCashoutWave.label,
  game.resolveWaveConfig(game.MAX_WAVES - 1, supportBuild).label
);
assert.ok(quenchCashoutWave.activeCap > 0);
assert.equal(game.getFinalCashoutTransitionProfile(supportBuild).preserveArenaState, true);
assert.equal(game.getFinalCashoutTransitionProfile(supportBuild).refillDash, false);

const emberHaloCashoutWave = game.createFinalCashoutWave(game.MAX_WAVES - 1, emberCapstoneBuild);
assert.equal(
  emberHaloCashoutWave.label,
  game.resolveWaveConfig(game.MAX_WAVES - 1, emberCapstoneBuild).label
);

assert.equal(game.getFinalCashoutTransitionProfile(emberCapstoneBuild).preserveArenaState, false);
assert.equal(game.getFinalCashoutTransitionProfile(emberCapstoneBuild).refillDash, true);

const emberPilotCashoutWave = game.createFinalCashoutWave(game.MAX_WAVES - 1, emberSupportBuild);
assert.equal(
  emberPilotCashoutWave.label,
  game.resolveWaveConfig(game.MAX_WAVES - 1, emberSupportBuild).label
);

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
assert.equal(supportTransition, null);
assert.equal(supportTransitionRun.phase, "forge");
assert.equal(supportTransitionRun.pendingFinalForge, true);
assert.equal(supportTransitionRun.waveIndex, game.MAX_WAVES - 1);
assert.equal(supportTransitionRun.postCapstone, undefined);
assert.equal(supportTransitionRun.enemies.length, 1);
assert.equal(supportTransitionRun.drops.length, 1);
assert.equal(supportTransitionRun.hazards.length, 1);
assert.equal(supportTransitionRun.projectiles.length, 1);
assert.equal(supportTransitionRun.particles.length, 1);
assert.equal(supportTransitionRun.player.x, 180);
assert.equal(supportTransitionRun.player.y, 220);
assert.equal(supportTransitionRun.player.heat, 52);
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
assert.equal(capstoneTransition, null);
assert.equal(capstoneTransitionRun.waveIndex, game.MAX_WAVES - 1);
assert.equal(capstoneTransitionRun.postCapstone, undefined);
assert.equal(capstoneTransitionRun.enemies.length, 1);
assert.equal(capstoneTransitionRun.drops.length, 1);
assert.equal(capstoneTransitionRun.hazards.length, 1);
assert.equal(capstoneTransitionRun.projectiles.length, 1);
assert.equal(capstoneTransitionRun.particles.length, 1);
assert.equal(capstoneTransitionRun.player.x, 120);
assert.equal(capstoneTransitionRun.player.y, 140);
assert.equal(capstoneTransitionRun.player.heat, 33);
assert.equal(capstoneTransitionRun.player.dashCharges, 0);
assert.equal(capstoneTransitionRun.player.dashCooldownTimer, 2.4);

const affixBuild = game.createInitialBuild("relay_oath");
game.applyForgeChoice(
  { build: affixBuild, player: null, resources: { scrap: 999 }, stats: {} },
  { type: "affix", affixId: "arc_link" }
);
assert.ok(affixBuild.affixes.includes("arc_link"));

const lowBankChoices = game.buildForgeChoices(build, rng, 0);
assert.ok(lowBankChoices.some((choice) => choice.contractRole === "gamble"));
assert.ok(lowBankChoices.some((choice) => choice.cost === 0));

const hazardConfig = game.WAVE_CONFIG[9].hazard;
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
assert.ok(fallbackChoices.some((choice) => choice.contractRole === "gamble"));
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
run.build.coreId = "scatter";
run.build.attunedCoreId = "scatter";
run.build.attunedCopies = 1;

run.build.pendingCores = game.sanitizeBenchCoreIds(run.build.pendingCores.concat(["scatter"]));
const sameCoreChoice = {
  type: "core",
  coreId: "scatter",
  benchCopies: 1,
  directOffer: false,
};
game.applyForgeChoice(run, sameCoreChoice);
assert.equal(run.build.coreId, "scatter");
assert.equal(run.build.attunedCopies, 2);
assert.equal(game.computeWeaponStats(run.build).benchSyncLevel, 1);
assert.equal(game.getBenchCount(run.build, "scatter"), 0);

run.build.pendingCores = game.sanitizeBenchCoreIds(run.build.pendingCores.concat(["scatter"]));
const secondScatterChoice = {
  type: "core",
  coreId: "scatter",
  benchCopies: 1,
  directOffer: false,
};
game.applyForgeChoice(run, secondScatterChoice);
assert.equal(run.build.attunedCopies, 3);
assert.equal(game.computeWeaponStats(run.build).benchSyncLevel, 2);
assert.equal(game.getBenchCount(run.build, "scatter"), 0);

game.applyForgeChoice(run, {
  type: "affix",
  affixId: "thermal_weave",
});
game.applyForgeChoice(run, {
  type: "affix",
  affixId: "phase_rounds",
});
assert.equal(game.computeWeaponStats(run.build).tierLabel, "Epic");
assert.equal(game.computeWeaponStats(run.build).pellets, 6);
assert.ok(game.computeWeaponStats(run.build).affixLabels.includes("Phase Rounds"));
assert.equal(game.computeWeaponStats(run.build).affixLabels.length, 2);

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
assert.equal(playerStats.pickupRadius, 42);
assert.equal(playerStats.maxHp, 100);
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

const actTwoLadder = game.WAVE_CONFIG.slice(4, 8);
assert.equal(
  actTwoLadder.map((wave) => wave.pressureFamily).join("|"),
  "domination|breach|domination|domination"
);
assert.equal(
  actTwoLadder.map((wave) => (wave.hazard ? wave.hazard.type : "none")).join("|"),
  "none|relay|drift|territory"
);
assert.ok(actTwoLadder[1].arena.width > actTwoLadder[0].arena.width);
assert.ok(actTwoLadder[1].arena.height > actTwoLadder[0].arena.height);
assert.ok(actTwoLadder[2].arena.width > actTwoLadder[1].arena.width);
assert.ok(actTwoLadder[2].arena.height > actTwoLadder[1].arena.height);
assert.ok(actTwoLadder[2].activeCap < actTwoLadder[3].activeCap);
assert.ok(actTwoLadder[1].note.includes("shared breach cell"));
assert.ok(actTwoLadder[2].note.includes("shared domination sweep cell"));
assert.ok(actTwoLadder[3].note.includes("shared domination proof cell"));

const lateBreakSmokeBuild = game.createInitialBuild("scrap_pact");
lateBreakSmokeBuild.bastionDoctrineId = "kiln_bastion";
assert.equal(game.shouldUseFieldGrant({ nextWave: 10, finalForge: false }), false);
assert.equal(game.getCombatCacheChoicesForWave(lateBreakSmokeBuild, 10).length, 0);
const lateBreakSmokeChoices = game.buildForgeChoices(lateBreakSmokeBuild, () => 0, 999, {
  nextWave: 9,
  finalForge: false,
  packageStep: 1,
});
assert.equal(lateBreakSmokeChoices.length, 3);
assert.ok(lateBreakSmokeChoices.some((choice) => choice.title === "Cataclysm Arsenal"));
assert.ok(lateBreakSmokeChoices.some((choice) => choice.title === "Warplate Halo"));
assert.ok(lateBreakSmokeChoices.some((choice) => choice.title === "Black Ledger Heist"));
const lateBreakMutation = lateBreakSmokeChoices.find((choice) => choice.title === "Cataclysm Arsenal");
const lateBreakDefense = lateBreakSmokeChoices.find((choice) => choice.title === "Warplate Halo");
const lateBreakGreed = lateBreakSmokeChoices.find((choice) => choice.title === "Black Ledger Heist");
assert.equal(lateBreakMutation.laneLabel, "Main Weapon Mutation");
assert.equal(lateBreakDefense.laneLabel, "Defense / Utility");
assert.equal(lateBreakGreed.laneLabel, "Greed Contract");
assert.ok(lateBreakMutation.slotText.includes("열린 lane 절단"));
assert.ok(lateBreakDefense.slotText.includes("bastion hull"));
assert.ok(lateBreakGreed.slotText.includes("twin tow fork"));
const lateBreakGreedTransform = game.getForgeChoiceTransformation(lateBreakGreed);
assert.ok(lateBreakGreedTransform.promise.includes("tow fork"));
assert.ok(lateBreakGreedTransform.proof.includes("Wave 8 완성 시험"));
assert.ok(!lateBreakGreedTransform.proof.includes("Wave 9"));
const lateBreakPreviewRows = game.createForgePreviewRows(lateBreakGreed);
assert.equal(
  JSON.stringify(lateBreakPreviewRows),
  JSON.stringify([
    { label: "분기", value: "Greed Contract" },
    { label: "Wave 8", value: "완성 시험" },
    { label: "그 뒤", value: "짧은 승리 랩" },
  ])
);
const lateBreakRun = {
  build: lateBreakSmokeBuild,
  resources: { scrap: 0 },
  stats: { scrapCollected: 0, scrapSpent: 0 },
  player: { hp: 100, maxHp: 100, heat: 0, overheated: false },
};
game.applyForgeChoice(lateBreakRun, lateBreakGreed);
assert.equal(lateBreakRun.build.blackLedgerRaidWaves, 2);
assert.equal(lateBreakRun.build.lateBreakProfileId, "ledger");
const lateBreakLedgerWeapon = game.computeWeaponStats(lateBreakRun.build);
assert.equal(lateBreakLedgerWeapon.headlineFormLabel, "Black Ledger Heist");
assert.ok(lateBreakLedgerWeapon.lateBreakLedgerFirePattern);
assert.ok(lateBreakLedgerWeapon.lateBreakStatusNote.includes("twin tow fork"));
assert.ok(lateBreakLedgerWeapon.lateBreakStatusNote.includes("완성 시험"));
assert.ok(lateBreakLedgerWeapon.lateBreakStatusNote.includes("짧은 승리 랩"));
assert.ok(!lateBreakLedgerWeapon.lateBreakStatusNote.includes("Wave 9"));
const lateBreakDebt = game.createBlackLedgerDebtState(lateBreakRun.build, 12);
assert.ok(lateBreakDebt);
assert.equal(lateBreakDebt.stacks, 0);
game.applyBlackLedgerDebtSurge(lateBreakDebt, "missed_caravan");
game.applyBlackLedgerDebtSurge(lateBreakDebt, "missed_payload");
assert.equal(lateBreakDebt.stacks, 2);
assert.ok(lateBreakDebt.enemySpeedMultiplier > 1);
assert.ok(lateBreakDebt.hazardRateMultiplier > 1);
assert.ok(lateBreakDebt.activeCapBonus >= 4);

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

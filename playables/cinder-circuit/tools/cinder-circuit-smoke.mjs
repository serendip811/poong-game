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
assert.equal(game.getActLabelForWave(13).shortLabel, "Act 3");
assert.equal(game.getActLabelForWave(19).shortLabel, "Act 3");
assert.equal(game.getPlayerFacingActLabelForWave(9).shortLabel, "Act 3");
assert.equal(game.getPlayerFacingActLabelForWave(13).shortLabel, "Act 3");
assert.equal(game.getPlayerFacingActLabelForWave(19).shortLabel, "Act 3");
assert.equal(game.POST_CAPSTONE_WAVE_COUNT, 7);
assert.equal(game.shouldAllowCombatRewardDrops(), false);
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
assert.equal(
  game.getBaseRoutePostWaveTransition({ waveIndex: 4, wave: { completesRun: false } }, 6).action,
  "forge"
);
assert.equal(
  game.getBaseRoutePostWaveTransition({ waveIndex: 8, wave: { completesRun: false } }, 10).action,
  "forge"
);
assert.ok(game.WAVE_CONFIG[0].spawnBudget < game.WAVE_CONFIG[2].spawnBudget);
assert.equal(game.WAVE_CONFIG[0].arena.width, 1080);
assert.equal(game.WAVE_CONFIG[1].arena.width, 1160);
assert.equal(game.WAVE_CONFIG[2].arena.width, 1220);
assert.equal(game.WAVE_CONFIG[3].arena.width, 1260);
assert.ok(game.WAVE_CONFIG[3].arena.width > game.WAVE_CONFIG[0].arena.width);
assert.ok(game.WAVE_CONFIG[3].activeCap < 30);
assert.ok(game.WAVE_CONFIG[3].spawnBudget < 120);
assert.ok(game.WAVE_CONFIG[4].hazard);
assert.ok(game.WAVE_CONFIG[3].hazard.damage > game.WAVE_CONFIG[4].hazard.damage);
assert.ok(game.WAVE_CONFIG[4].driveGainFactor > game.WAVE_CONFIG[3].driveGainFactor);
assert.equal(game.WAVE_CONFIG[4].arena.width, 1280);
assert.equal(game.WAVE_CONFIG[4].arena.height, 720);
assert.ok(game.WAVE_CONFIG[8].arena.width > game.WAVE_CONFIG[4].arena.width);
assert.ok(game.WAVE_CONFIG[8].arena.height > game.WAVE_CONFIG[4].arena.height);
assert.equal(game.WAVE_CONFIG[4].hazard.type, "territory");
assert.ok(game.WAVE_CONFIG[4].hazard.coreHp > 0);
assert.ok(game.WAVE_CONFIG[4].activeCap < game.WAVE_CONFIG[3].activeCap);
assert.ok(game.WAVE_CONFIG[4].hazard.count <= game.WAVE_CONFIG[3].hazard.count);
assert.ok(game.WAVE_CONFIG[4].spawnBudget < game.WAVE_CONFIG[5].spawnBudget);
assert.ok(game.WAVE_CONFIG[4].hazard.interval > game.WAVE_CONFIG[5].hazard.interval);
assert.equal(game.WAVE_CONFIG[5].hazard.type, "relay");
assert.ok(game.WAVE_CONFIG[5].activeCap > game.WAVE_CONFIG[4].activeCap);
assert.ok(game.WAVE_CONFIG[5].hazard.count <= game.WAVE_CONFIG[4].hazard.count);
assert.ok(game.WAVE_CONFIG[5].arena.width > game.WAVE_CONFIG[4].arena.width);
assert.equal(game.WAVE_CONFIG[4].label, "Wave 5 · Payoff Run");
assert.equal(game.WAVE_CONFIG[5].label, "Wave 6 · Crown Breach");
assert.equal(game.WAVE_CONFIG[6].label, "Wave 7 · Payoff Sweep");
assert.equal(game.WAVE_CONFIG[7].label, "Wave 8 · Crown Proof");
assert.equal(game.WAVE_CONFIG[8].label, "Wave 9 · Payoff Run+");
assert.equal(game.WAVE_CONFIG[9].label, "Wave 10 · Crown Proof+");
assert.equal(game.WAVE_CONFIG[4].directive, "가장 넓은 flank부터 비우고 열린 lane 둘 중 하나를 오래 붙든다.");
assert.equal(game.WAVE_CONFIG[5].directive, "가장 먼 relay를 먼저 끊고 뚫린 corridor 하나를 길게 지킨다.");
assert.equal(game.WAVE_CONFIG[6].directive, "한 flank를 먼저 비운 뒤 반대 lane으로 짧게 갈아타며 sweep 폭을 유지한다.");
assert.equal(game.WAVE_CONFIG[7].directive, "가장 얇은 입구를 짧게 찢고 열린 crownline을 오래 붙든다.");
assert.equal(game.WAVE_CONFIG[5].mix.mortar || 0, 0);
assert.ok(game.WAVE_CONFIG[5].mix.lancer > game.WAVE_CONFIG[5].mix.brute);
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
assert.equal(game.createWildcardProtocolChoice(roadmapBuild, 4), null);
assert.equal(game.createWildcardProtocolChoice(roadmapBuild, 7), null);
assert.equal(game.createWildcardProtocolChoice(roadmapBuild, 10), null);
const wave5ForgeChoices = game.buildForgeChoices(roadmapBuild, Math.random, 999, {
  nextWave: 5,
  finalForge: false,
});
assert.ok(wave5ForgeChoices.every((choice) => !(choice.type === "utility" && choice.action === "preview_support")));
assert.equal(wave5ForgeChoices.find((choice) => choice.contractRole === "headline")?.action, "afterglow_mutation");
const cappedHeadlineBuild = game.createInitialBuild("rail_zeal");
cappedHeadlineBuild.weaponEvolutions[cappedHeadlineBuild.coreId] = 3;
cappedHeadlineBuild.chassisId = "vector_thrusters";
cappedHeadlineBuild.pendingCores = ["ember", "scatter"];
const wave8HeadlineChoices = game.buildForgeChoices(cappedHeadlineBuild, () => 0, 999, {
  nextWave: 8,
  finalForge: false,
});
const wave8HeadlineChoice = wave8HeadlineChoices.find((choice) => choice.contractRole === "headline");
assert.equal(wave8HeadlineChoice?.type, "core");
assert.ok(wave8HeadlineChoice?.coreId && wave8HeadlineChoice.coreId !== cappedHeadlineBuild.coreId);
assert.notEqual(wave8HeadlineChoice?.title, "Overclock");
const earlyRoadmap = game.getBuildRoadmap(roadmapBuild, game.computeWeaponStats(roadmapBuild), 1);
assert.equal(earlyRoadmap.steps.length, 3);
assert.equal(earlyRoadmap.steps[0].title, "Twin Spine");
assert.ok(earlyRoadmap.steps[1].title.includes("Sky Lance"));
assert.ok(earlyRoadmap.steps[1].detail.includes("Wave 6 몸체 도약"));
assert.ok(earlyRoadmap.steps[1].detail.includes("weapon/body leap"));
assert.equal(earlyRoadmap.steps[2].title, "Crown Break");
roadmapBuild.bastionDoctrineId = "storm_artillery";
roadmapBuild.overcommitUnlocked = true;
roadmapBuild.previewSupportSystemId = "volt_drones";
roadmapBuild.wildcardProtocolIds = ["rogue_lattice"];
assert.equal(game.computeSupportSystemStats(roadmapBuild), null);
const primedRoadmap = game.getBuildRoadmap(roadmapBuild, game.computeWeaponStats(roadmapBuild), 6);
assert.equal(primedRoadmap.steps[0].title, "Siege Frame");
assert.equal(primedRoadmap.steps[0].state, "locked");
assert.ok(primedRoadmap.steps[1].title.includes("Sky Lance Battery"));
assert.equal(primedRoadmap.steps[1].state, "primed");
assert.ok(primedRoadmap.steps[1].detail.includes("중반 도약"));
assert.ok(!primedRoadmap.steps[1].detail.includes("Field Cache"));
assert.equal(primedRoadmap.steps[2].title, "Crown Break");
roadmapBuild.lateBreakProfileId = "mutation";
const consolidatedLateRoadmap = game.getBuildRoadmap(
  roadmapBuild,
  game.computeWeaponStats(roadmapBuild),
  9
);
assert.ok(consolidatedLateRoadmap.steps[2].detail.includes("Wave 9-12"));
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
assert.ok(lockgridRoadmap.prompt.includes("form track"));
assert.ok(lockgridRoadmap.note.includes("->"));
const eraOnePlan = game.getForgeEraPlan(roadmapBuild, game.computeWeaponStats(roadmapBuild), null, 1);
assert.equal(eraOnePlan.length, 3);
assert.equal(eraOnePlan[0].waveLabel, "Wave 1-4");
assert.equal(eraOnePlan[1].waveLabel, "Wave 5-8");
assert.equal(eraOnePlan[2].waveLabel, "Wave 9-12");
assert.equal(eraOnePlan[0].state, "live");
assert.equal(eraOnePlan[1].state, "planned");
assert.equal(eraOnePlan[2].state, "planned");
assert.ok(eraOnePlan[0].proofLabel.length > 0);
const eraThreePlan = game.getForgeEraPlan(roadmapBuild, game.computeWeaponStats(roadmapBuild), null, 9);
assert.equal(eraThreePlan[0].state, "locked");
assert.equal(eraThreePlan[1].state, "locked");
assert.equal(eraThreePlan[2].state, "live");
assert.ok(eraThreePlan[2].proofLabel.length > 0);
const inspectMarkup = game.createTabInspectBoardMarkup({
  dominantForm: { label: "Sky Lance" },
  spotlightValue: "Cataclysm Arsenal",
  scrapValue: "42",
  hintChipText: "다음 포지 Sky Splitter",
  mainSummary: {
    label: "주력 변이",
    value: "Sky Lance",
    note: "긴 레일로 열린 복도를 먼저 찢는다.",
    tone: "main",
  },
  supportSummary: {
    label: "방호·보조",
    value: "Bare Hull",
    note: "보조 결은 아직 조용하다.",
    tone: "support",
  },
  gambleSummary: {
    label: "판돈·유틸",
    value: "잠잠",
    note: "판돈 라인은 아직 비어 있다.",
    tone: "gamble",
  },
});
assert.ok(inspectMarkup.includes("보유 고철"));
assert.ok(inspectMarkup.includes("현재 형태"));
assert.ok(inspectMarkup.includes("다음 전장"));
assert.ok(inspectMarkup.includes("Cataclysm Arsenal"));
assert.ok(inspectMarkup.includes("42"));
assert.ok(inspectMarkup.includes("다음 포지 Sky Splitter"));
assert.ok(!inspectMarkup.includes("비용·대가"));
assert.ok(inspectMarkup.includes("inspect-board__hero"));
assert.ok(inspectMarkup.includes("inspect-board__lane--main"));
assert.ok(inspectMarkup.includes("inspect-board__lane--support"));
assert.ok(inspectMarkup.includes("inspect-board__lane--gamble"));
assert.ok(inspectMarkup.includes("inspect-board__chip"));
assert.equal((inspectMarkup.match(/class="inspect-board__chip"/g) || []).length, 1);
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
const forgeContextMarkup = game.createBaseRouteForgeContextMarkup({
  eyebrow: "주력 변이",
  title: "Prism Crown",
  prompt: "Prism Crown 하나로 다음 전투의 화면을 바꾼다.",
  waveAskLabel: "Refuge Run",
  riderLabel: "Ember Ring",
  riderTone: "cool",
});
assert.ok(forgeContextMarkup.includes("주력 변이"));
assert.ok(forgeContextMarkup.includes("Prism Crown"));
assert.ok(forgeContextMarkup.includes("다음 시험"));
assert.ok(forgeContextMarkup.includes("Refuge Run"));
assert.ok(forgeContextMarkup.includes("forge-focus__proof"));
assert.ok(!forgeContextMarkup.includes("forge-contract-strip"));
assert.ok(!forgeContextMarkup.includes("forge-card__pivot--bill"));
assert.ok(!forgeContextMarkup.includes("세 장 중 하나만"));
assert.ok(!forgeContextMarkup.includes("Prism Crown 하나로 다음 전투의 화면을 바꾼다."));
assert.ok(!forgeContextMarkup.includes("보조 결"));
assert.ok(!forgeContextMarkup.includes("Ember Ring"));
const forgeBillMarkup = game.createBaseRouteForgeBillMarkup("고철 18");
assert.ok(forgeBillMarkup.includes("고철 18"));
assert.ok(!forgeBillMarkup.includes("비용·대가"));
const minimalHudVisibility = game.getMinimalBaseRouteHudVisibility({
  hudInspect: false,
  paused: false,
});
assert.equal(minimalHudVisibility.minimal, true);
assert.equal(minimalHudVisibility.showWave, false);
assert.equal(minimalHudVisibility.showDash, false);
assert.equal(minimalHudVisibility.showTimer, false);
assert.equal(minimalHudVisibility.showScrap, false);
assert.equal(minimalHudVisibility.showRoadmap, false);
const expandedHudVisibility = game.getMinimalBaseRouteHudVisibility({
  hudInspect: true,
  paused: false,
});
assert.equal(expandedHudVisibility.minimal, false);
assert.equal(expandedHudVisibility.showWave, true);
assert.equal(expandedHudVisibility.showDash, true);
assert.equal(expandedHudVisibility.showTimer, true);
assert.equal(expandedHudVisibility.showRoadmap, true);
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
assert.deepEqual(Array.from(game.getVisibleSupportOfferSystemIds(genericWave7Build, 7)), []);
const genericWave7Choices = game.buildForgeChoices(genericWave7Build, () => 0.1, 999, {
  nextWave: 7,
  finalForge: false,
  build: genericWave7Build,
});
const genericWave7RiderChoice = genericWave7Choices.find((choice) => choice.contractRole === "rider");
assert.ok(genericWave7RiderChoice);
assert.notEqual(genericWave7RiderChoice.type, "system");
const midrunSupportBuild = game.createInitialBuild("rail_zeal");
midrunSupportBuild.architectureForecastId = "mirror_hunt";
midrunSupportBuild.bastionDoctrineId = "mirror_hunt";
midrunSupportBuild.chassisId = "vector_thrusters";
assert.deepEqual(Array.from(game.getVisibleSupportOfferSystemIds(midrunSupportBuild, 7)), []);
assert.deepEqual(Array.from(game.getVisibleSupportOfferSystemIds(midrunSupportBuild, 8)), []);
assert.deepEqual(Array.from(game.getVisibleSupportOfferSystemIds(midrunSupportBuild, 9)), ["seeker_array"]);
const wave7ForgeChoices = game.buildForgeChoices(midrunSupportBuild, () => 0.1, 999, {
  nextWave: 7,
  finalForge: false,
});
assert.equal(game.createWildcardProtocolChoice(midrunSupportBuild, 7), null);
const wave7RiderChoice = wave7ForgeChoices.find((choice) => choice.contractRole === "rider");
assert.ok(wave7RiderChoice);
assert.notEqual(wave7RiderChoice.type, "system");
assert.ok(["mod", "affix", "fallback"].includes(wave7RiderChoice.type));
const wave8ForgeChoices = game.buildForgeChoices(midrunSupportBuild, () => 0.1, 999, {
  nextWave: 8,
  finalForge: false,
});
assert.ok(
  !wave8ForgeChoices.some(
    (choice) => choice.type === "utility" && choice.action === "wildcard_protocol"
  )
);
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
  "forge"
);
assert.equal(game.shouldUseFieldGrant({ nextWave: 6, finalForge: false, build: roadmapBuild }), false);
const recurringWave3Choices = game.buildForgeChoices(roadmapBuild, Math.random, 40, {
  nextWave: 3,
  finalForge: false,
  build: roadmapBuild,
});
assert.equal(recurringWave3Choices.length, 3);
assert.equal(
  recurringWave3Choices.map((choice) => choice.contractRole).join("|"),
  "headline|rider|gamble"
);
assert.equal(
  recurringWave3Choices.map((choice) => choice.contractLabel).join("|"),
  "주력 변이|방호·보조|판돈·유틸"
);
const recurringWave3HeadlineTransform =
  game.getBaseRouteForgeChoiceTransformation(recurringWave3Choices[0]);
assert.equal(recurringWave3HeadlineTransform.previewLabel, "진화");
assert.ok(recurringWave3HeadlineTransform.previewValue.length > 0);
assert.ok(recurringWave3HeadlineTransform.previewValue.includes("레일"));
assert.ok(recurringWave3HeadlineTransform.promise.includes("보조 레일"));
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
assert.ok(recurringWave3CardMarkup.includes("다음 시험"));
assert.ok(recurringWave3CardMarkup.includes("forge-card__proof"));
assert.ok(recurringWave3CardMarkup.includes(recurringWave3HeadlineTransform.previewValue));
assert.ok(!recurringWave3CardMarkup.includes("forge-card__hero-copy"));
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
assert.ok(recurringWave3RiderMarkup.includes(recurringWave3RiderTransform.previewValue));
assert.ok(!recurringWave3RiderMarkup.includes("forge-card__hero-copy"));
assert.ok(!recurringWave3RiderMarkup.includes("forge-card__proof"));
const wave5MutationBuild = game.createInitialBuild("relay_oath");
wave5MutationBuild.pendingCores = [];
const recurringWave5Choices = game.buildForgeChoices(wave5MutationBuild, Math.random, 40, {
  nextWave: 5,
  finalForge: false,
  build: wave5MutationBuild,
});
assert.equal(recurringWave5Choices.length, 3);
assert.equal(
  recurringWave5Choices.map((choice) => choice.contractRole).join("|"),
  "headline|rider|gamble"
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
assert.notEqual(recurringWave5RiderChoice.action, "preview_support");
const recurringWave5RiderTransform =
  game.getBaseRouteForgeChoiceTransformation(recurringWave5RiderChoice);
assert.equal(recurringWave5RiderTransform.tone, "defense");
assert.equal(recurringWave5RiderTransform.previewLabel, "버팀");
assert.ok(/다음 전투|회복선|열 여유|공간/.test(recurringWave5RiderTransform.proof));
const recurringWave5Run = {
  build: wave5MutationBuild,
  player: null,
};
game.applyForgeChoice(recurringWave5Run, recurringWave5RiderChoice);
assert.equal(recurringWave5Run.build.supportSystems.length, 0);
assert.equal(recurringWave5Run.build.previewSupportSystemId ?? null, null);
assert.equal(game.computeSupportSystemStats(recurringWave5Run.build), null);
const mirrorPrimerBuild = game.createInitialBuild("relay_oath");
mirrorPrimerBuild.pendingCores = [];
mirrorPrimerBuild.bastionDoctrineId = "mirror_hunt";
const mirrorWave5Choices = game.buildForgeChoices(mirrorPrimerBuild, Math.random, 40, {
  nextWave: 5,
  finalForge: false,
  build: mirrorPrimerBuild,
});
const mirrorWave5RiderChoice =
  mirrorWave5Choices.find((choice) => choice.contractRole === "rider") || mirrorWave5Choices[1];
assert.ok(mirrorWave5RiderChoice);
assert.notEqual(mirrorWave5RiderChoice.action, "preview_support");
const mirrorWave5Transform = game.getBaseRouteForgeChoiceTransformation(mirrorWave5RiderChoice);
assert.equal(mirrorWave5Transform.tone, "defense");
assert.equal(mirrorWave5Transform.previewLabel, "버팀");
assert.ok(/다음 전투|회복선|열 여유|공간/.test(mirrorWave5Transform.proof));
const mirrorPrimerRun = {
  build: mirrorPrimerBuild,
  player: null,
};
game.applyForgeChoice(mirrorPrimerRun, mirrorWave5RiderChoice);
assert.equal(mirrorPrimerRun.build.previewSupportSystemId ?? null, null);
assert.equal(game.computeSupportSystemStats(mirrorPrimerRun.build), null);
assert.equal(game.getPreviewSupportFrameProfile(mirrorPrimerRun.build), null);
const mirrorWave7Choices = game.buildForgeChoices(mirrorPrimerRun.build, Math.random, 64, {
  nextWave: 7,
  finalForge: false,
  build: mirrorPrimerRun.build,
});
const mirrorWave7RiderChoice =
  mirrorWave7Choices.find((choice) => choice.contractRole === "rider") || mirrorWave7Choices[1];
assert.ok(mirrorWave7RiderChoice);
assert.equal(mirrorWave7RiderChoice.type, "mod");
assert.equal(mirrorWave7RiderChoice.modId, "step_servos");
assert.equal(mirrorWave7RiderChoice.title, "Step Servos");
assert.ok(!/예열 완성/.test(mirrorWave7RiderChoice.slotText));
game.applyForgeChoice(mirrorPrimerRun, mirrorWave7RiderChoice);
assert.equal(game.computeSupportSystemStats(mirrorPrimerRun.build), null);
const mirrorWave8Choices = game.buildForgeChoices(mirrorPrimerRun.build, Math.random, 64, {
  nextWave: 8,
  finalForge: false,
  build: mirrorPrimerRun.build,
});
const mirrorWave8RiderChoice =
  mirrorWave8Choices.find((choice) => choice.contractRole === "rider") || mirrorWave8Choices[1];
assert.ok(mirrorWave8RiderChoice);
assert.notEqual(mirrorWave8RiderChoice.type, "system");
game.applyForgeChoice(mirrorPrimerRun, mirrorWave8RiderChoice);
const mirrorWave8SupportStats = game.computeSupportSystemStats(mirrorPrimerRun.build);
assert.equal(mirrorWave8SupportStats, null);
assert.equal(mirrorPrimerRun.build.previewSupportSystemId ?? null, null);
assert.equal(game.getPreviewSupportFrameProfile(mirrorPrimerRun.build), null);
const shippingLadderWave4 = game.getShippingLadderSteps(roadmapBuild, null, 4);
assert.equal(shippingLadderWave4.length, 4);
assert.equal(shippingLadderWave4.map((step) => step.label).join("|"), "START|도약|방호|점화");
assert.ok(
  !shippingLadderWave4.some(
    (step) => /Wave 5|작은 변이|사격 조율/i.test(`${step.label} ${step.title} ${step.detail}`)
  )
);
const shippingLadderFocusWave4 = game.getShippingLadderFocus(roadmapBuild, null, 4);
assert.equal(shippingLadderFocusWave4.label, "방호");
assert.ok(/Wave 6|몸체|방호/.test(shippingLadderFocusWave4.detail));
const recurringWave6Choices = game.buildForgeChoices(roadmapBuild, Math.random, 40, {
  nextWave: 6,
  finalForge: false,
  build: roadmapBuild,
});
const wave6DefenseChoice = recurringWave6Choices.find((choice) => choice.contractRole === "rider");
assert.ok(wave6DefenseChoice);
assert.equal(wave6DefenseChoice.action, "bastion_bay_forge");
assert.equal(wave6DefenseChoice.bayUnlock, false);
const wave6DefenseTransform = game.getBaseRouteForgeChoiceTransformation(wave6DefenseChoice);
assert.ok(wave6DefenseTransform.previewLabel.length > 0);
assert.ok(/충격파|탄막|돌격/.test(wave6DefenseTransform.promise));
assert.ok(
  !/armory|bay|junction|uplink|무기고|정션|업링크/i.test(wave6DefenseTransform.proof)
);
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
assert.equal(crownfireWave7Headline.title, "Sky Splitter");
assert.equal(crownfireWave7Headline.previewText, "측선 레일 6줄");
const crownfireWave7Transform = game.getBaseRouteForgeChoiceTransformation(crownfireWave7Headline);
assert.equal(crownfireWave7Transform.previewLabel, "형태");
assert.ok(/측선 레일|open-lane|절개/.test(crownfireWave7Transform.promise));
assert.ok(/Wave 6 몸체 break|open-lane 교전|공격적으로/.test(crownfireWave7Transform.proof));
game.applyForgeChoice({ build: crownfireBuild, player: null }, crownfireWave7Headline);
const crownfireWeapon = game.computeWeaponStats(crownfireBuild);
assert.equal(crownfireWeapon.crownfireOverdriveLabel, "Sky Splitter");
assert.deepEqual(
  Array.from(crownfireWeapon.crownfireOverdriveFirePattern.offsets),
  [-0.32, -0.2, -0.08, 0.08, 0.2, 0.32]
);
assert.equal(crownfireWeapon.pierce >= 4, true);
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
const recurringWave3GambleChoice =
  recurringWave3Choices.find((choice) => choice.contractRole === "gamble") ||
  recurringWave3Choices[2];
const recurringWave3GambleTransform =
  game.getBaseRouteForgeChoiceTransformation(recurringWave3GambleChoice);
assert.ok(["판돈", "효과", "버팀", "속성"].includes(recurringWave3GambleTransform.previewLabel));
assert.ok(recurringWave3GambleTransform.previewValue.length > 0);
if (recurringWave3GambleTransform.previewLabel === "판돈") {
  assert.ok(recurringWave3GambleTransform.previewValue.includes("고철 +"));
  assert.ok(!recurringWave3GambleTransform.previewValue.includes("Siege Debt"));
}
assert.ok(!recurringWave3GambleTransform.proof.includes("Siege Debt"));
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
const pollutedWave5Choices = game.buildForgeChoices(pollutedShippingBuild, Math.random, 40, {
  nextWave: 5,
  finalForge: false,
  build: pollutedShippingBuild,
});
assert.equal(pollutedShippingBuild.previewSupportSystemId ?? null, null);
assert.equal(pollutedShippingBuild.wildcardProtocolIds.length, 0);
assert.ok(
  !pollutedWave5Choices.some(
    (choice) =>
      choice.action === "preview_support" || choice.action === "wildcard_protocol"
  )
);
assert.equal(game.computeSupportSystemStats(pollutedShippingBuild), null);
assert.ok(game.WAVE_CONFIG[7].spawnBudget > game.WAVE_CONFIG[4].spawnBudget);
assert.ok(game.WAVE_CONFIG[7].mix.warden > 0);
assert.equal(game.WAVE_CONFIG[7].mix.mortar || 0, 0);
assert.ok(game.WAVE_CONFIG[7].hazard.coreHp > 0);
assert.equal(game.WAVE_CONFIG[7].hazard.type, "relay");
assert.ok(game.WAVE_CONFIG[7].hazard.relayWidth > 0);
assert.ok(game.WAVE_CONFIG[7].activeCap > game.WAVE_CONFIG[5].activeCap);
assert.equal(game.WAVE_CONFIG[7].hazard.count, 1);
assert.equal(game.WAVE_CONFIG[8].arena.width, 1700);
assert.equal(game.WAVE_CONFIG[8].hazard, undefined);
assert.ok(game.WAVE_CONFIG[8].mix.skimmer > game.WAVE_CONFIG[8].mix.warden);
assert.ok(game.WAVE_CONFIG[8].mix.lancer > game.WAVE_CONFIG[8].mix.mortar);
assert.ok(game.WAVE_CONFIG[8].activeCap <= game.WAVE_CONFIG[7].activeCap);
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
assert.equal(afterglowWindow.hazard.type, "territory");
assert.equal(breaklineFollowthrough.hazard.type, "relay");
assert.equal(crownfireSpike.pressureFamily, "crossfire");
assert.equal(crownfireSpike.hazard, undefined);
assert.equal(forgecrossSpike.hazard.type, "relay");
assert.ok(afterglowWindow.activeCap < breaklineFollowthrough.activeCap);
assert.ok(crownfireSpike.activeCap < breaklineFollowthrough.activeCap);
assert.ok(crownfireSpike.activeCap < forgecrossSpike.activeCap);
assert.ok(breaklineFollowthrough.hazard.count <= afterglowWindow.hazard.count + 1);
assert.ok(afterglowWindow.arena.width < breaklineFollowthrough.arena.width);
assert.ok(crownfireSpike.arena.width >= forgecrossSpike.arena.width);
assert.ok(crownfireSpike.mix.skimmer > crownfireSpike.mix.brute);
assert.ok(forgecrossSpike.mix.warden > 0);
const lateCacheBuild = game.createInitialBuild("relay_oath");
lateCacheBuild.chassisId = "vector_thrusters";
lateCacheBuild.supportBayCap = 3;
lateCacheBuild.supportSystems = [{ id: "volt_drones", tier: 1 }];
lateCacheBuild.blackLedgerRaidWaves = 1;
lateCacheBuild.lateFieldMutationLevel = 2;
const lockgridPayoff = game.resolveWaveConfig(8, lateCacheBuild);
const lockgridEscalation = game.resolveWaveConfig(9, lateCacheBuild);
assert.equal(lockgridPayoff.bandId, "late_payoff_run");
assert.equal(lockgridEscalation.bandId, "crownhold_proof");
assert.equal(lockgridEscalation.pressureFamily, "breach");
assert.ok(lockgridPayoff.activeCap < lockgridEscalation.activeCap);
assert.ok(lockgridPayoff.spawnBudget < lockgridEscalation.spawnBudget);
assert.equal(lockgridPayoff.pressureFamily, "domination");
assert.equal(lockgridPayoff.hazard, null);
assert.equal(lockgridEscalation.hazard.type, "relay");
assert.ok(lockgridEscalation.hazard.count >= 1);
assert.ok(lockgridPayoff.arena.width > lockgridEscalation.arena.width);
const lateRoutePayoffBeat = game.getStandardLateRouteBeatSummary(lateCacheBuild, 9);
const lateRouteProofBeat = game.getStandardLateRouteBeatSummary(lateCacheBuild, 11);
const lateRouteFinaleBeat = game.getStandardLateRouteBeatSummary(lateCacheBuild, 12);
assert.equal(lateRoutePayoffBeat.label, "Payoff Band");
assert.ok(lateRoutePayoffBeat.detail.includes("Payoff Run+"));
assert.equal(lateRouteProofBeat.label, "Refuge Run");
assert.ok(lateRouteProofBeat.detail.includes("Refuge Run"));
assert.equal(lateRouteFinaleBeat.label, "Finale");
assert.ok(lateRouteFinaleBeat.detail.includes("Final Stand"));
const lateRouteProofWindow = game.getImmediateProofWindowSummary(lateCacheBuild, 11);
assert.equal(lateRouteProofWindow.label, "Refuge Run");
assert.ok(lateRouteProofWindow.detail.includes("Refuge Run"));

const mutationLateBandBuild = game.createInitialBuild("scrap_pact");
const mutationLateBreakChoices = game.buildForgeChoices(mutationLateBandBuild, Math.random, 999, { nextWave: 9 });
const cataclysmChoice = mutationLateBreakChoices.find((choice) => choice.action === "field_mutation");
assert.ok(cataclysmChoice);
assert.equal(cataclysmChoice.title, "Cataclysm Arsenal");
assert.equal(cataclysmChoice.lateFieldMutationLevel, 4);
assert.ok(cataclysmChoice.roadmapDetail.includes("Wave 9 open-lane"));
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
assert.ok(Math.max(mutationPayoffOne.activeCap, mutationPayoffTwo.activeCap) < Math.min(mutationSpikeOne.activeCap, mutationSpikeTwo.activeCap));
assert.ok(Math.max(mutationPayoffOne.spawnBudget, mutationPayoffTwo.spawnBudget) < Math.min(mutationSpikeOne.spawnBudget, mutationSpikeTwo.spawnBudget));
assert.ok(mutationPayoffOne.arena.width < mutationPayoffTwo.arena.width);
assert.ok(mutationPayoffTwo.arena.width > mutationPayoffOne.arena.width);
assert.equal(mutationPayoffOne.pressureFamily, "domination");
assert.equal(mutationPayoffOne.hazard, null);
assert.equal(mutationPayoffTwo.hazard.type, "relay");
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
assert.ok(lateBreakArmoryChoices.every((choice) => choice.roadmapDetail?.includes("Wave 9")));
assert.ok(
  lateBreakArmoryChoices.every(
    (choice) =>
      choice.roadmapDetail?.includes("Wave 10") || choice.roadmapDetail?.includes("Wave 9-10")
  )
);
assert.ok(lateBreakArmoryChoices.every((choice) => choice.roadmapDetail?.includes("Wave 11")));
assert.ok(lateBreakArmoryChoices.every((choice) => choice.roadmapDetail?.includes("Wave 12")));
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
  "headline|rider|gamble"
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
  "headline|rider|gamble"
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
mirrorStageOneBuild.bastionDoctrineId = "mirror_hunt";
const mirrorStageOneWeapon = game.computeWeaponStats(mirrorStageOneBuild);
const mirrorStageOneBody = game.getDoctrineBodyForm(mirrorStageOneBuild);
const mirrorStageOneStats = game.computePlayerStats(mirrorStageOneBuild);
assert.equal(mirrorStageOneWeapon.doctrineFormLabel, "Hunt Frame");
assert.equal(mirrorStageOneBody.label, "Hunt Wing Rig");
assert.ok((mirrorStageOneWeapon.doctrineFirePattern?.offsets || []).length >= 3);
assert.ok(mirrorStageOneStats.moveSpeed > mirrorBaseStats.moveSpeed);
const mirrorChaseBuild = game.createInitialBuild("relay_oath");
mirrorChaseBuild.bastionDoctrineId = "mirror_hunt";
mirrorChaseBuild.doctrineChaseClaimed = true;
const mirrorBodyForm = game.getDoctrineBodyForm(mirrorChaseBuild);
const mirrorChaseStats = game.computePlayerStats(mirrorChaseBuild);
assert.equal(mirrorBodyForm.label, "Stormglass Pursuit Frame");
assert.ok(mirrorChaseStats.moveSpeed > mirrorBaseStats.moveSpeed);
assert.ok(mirrorChaseStats.pickupRadius > mirrorBaseStats.pickupRadius);
const stormBaseStats = game.computePlayerStats(game.createInitialBuild("rail_zeal"));
const stormStageOneBuild = game.createInitialBuild("rail_zeal");
stormStageOneBuild.bastionDoctrineId = "storm_artillery";
const stormStageOneWeapon = game.computeWeaponStats(stormStageOneBuild);
const stormStageOneBody = game.getDoctrineBodyForm(stormStageOneBuild);
const stormStageOneStats = game.computePlayerStats(stormStageOneBuild);
assert.equal(stormStageOneWeapon.doctrineFormLabel, "Siege Frame");
assert.equal(stormStageOneBody.label, "Siege Rack Carriage");
assert.ok((stormStageOneWeapon.doctrineFirePattern?.offsets || []).length >= 3);
assert.ok(stormStageOneStats.coolRate > stormBaseStats.coolRate);
const stormChaseBuild = game.createInitialBuild("rail_zeal");
stormChaseBuild.bastionDoctrineId = "storm_artillery";
stormChaseBuild.doctrineChaseClaimed = true;
const stormBodyForm = game.getDoctrineBodyForm(stormChaseBuild);
const stormChaseStats = game.computePlayerStats(stormChaseBuild);
assert.equal(stormBodyForm.label, "Thunder Rack Carriage");
assert.ok(stormChaseStats.coolRate > stormBaseStats.coolRate);
assert.ok(stormChaseStats.moveSpeed < stormBaseStats.moveSpeed);
const kilnBaseStats = game.computePlayerStats(game.createInitialBuild("scrap_pact"));
const kilnStageOneBuild = game.createInitialBuild("scrap_pact");
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
assert.equal(game.getSupportBayCapacity(architecturePreviewRun.build), 2);
assert.equal(architecturePreviewRun.build.supportSystems.length, 0);
const wave6DoctrineChoices = game.buildBastionDraftChoices(architecturePreviewRun.build, () => 0, 6);
assert.equal(wave6DoctrineChoices.length, 3);
assert.ok(wave6DoctrineChoices.every((choice) => choice.action === "bastion_bay_forge"));
assert.ok(wave6DoctrineChoices.every((choice) => !choice.bayUnlock));
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
assert.ok(wave6ChassisPackages.every((choice) => !choice.bayUnlock));
assert.ok(wave6ChassisPackages.every((choice) => !choice.skipNextAdminStop));
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
const fallbackWave6AscensionChoices = game.buildBastionDraftChoices(wave6AscensionRun.build, () => 0, 6);
assert.ok(fallbackWave6AscensionChoices.every((choice) => choice.action === "wave6_ascension"));
game.applyForgeChoice(wave6AscensionRun, fallbackWave6AscensionChoices[0]);
assert.equal(wave6AscensionRun.build.bastionDoctrineId, fallbackWave6AscensionChoices[0].doctrineId);
assert.equal(wave6AscensionRun.build.wave6ChassisBreakpoint, false);
assert.equal(wave6AscensionRun.build.supportBayCap, 2);
assert.equal(wave6AscensionRun.build.chassisId, fallbackWave6AscensionChoices[0].chassisId);
assert.equal(game.shouldSkipOwnershipAdminStop(wave6AscensionRun.build, 9), false);
chassisRun.build.bastionDoctrineId = "kiln_bastion";
game.applyForgeChoice(chassisRun, wave6ChassisPackages[0]);
assert.equal(chassisRun.build.wave6ChassisBreakpoint, false);
assert.equal(chassisRun.build.supportBayCap, 2);
assert.equal(chassisRun.build.chassisId, wave6ChassisPackages[0].chassisId);
assert.equal(game.shouldSkipOwnershipAdminStop(chassisRun.build, 9), false);
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
assert.equal(game.SUPPORT_SYSTEM_DEFS.aegis_halo.forgeWaveMin, 9);
assert.equal(game.SUPPORT_SYSTEM_DEFS.ember_ring.forgeWaveMin, 9);
assert.equal(game.SUPPORT_SYSTEM_DEFS.volt_drones.forgeWaveMin, 9);
assert.equal(game.SUPPORT_SYSTEM_DEFS.kiln_sentry.forgeWaveMin, 9);
assert.equal(game.SUPPORT_SYSTEM_DEFS.seeker_array.forgeWaveMin, 9);
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
assert.equal(signatureBuild.maxHpBonus, 4);
assert.equal(signatureBuild.pickupBonus, 10);
assert.equal(signatureBuild.scrapMultiplier, 1.04);
assert.equal(signatureBuild.supportBayCap, 2);
assert.equal(JSON.stringify(signatureBuild.affixes), JSON.stringify([]));
assert.equal(JSON.stringify(signatureBuild.pendingCores), JSON.stringify([]));

const relayStartBuild = game.createInitialBuild("relay_oath");
assert.equal(relayStartBuild.driveGainBonus, 0.08);
assert.equal(relayStartBuild.overdriveDurationBonus, 0.2);
assert.equal(JSON.stringify(relayStartBuild.pendingCores), JSON.stringify([]));

const railStartBuild = game.createInitialBuild("rail_zeal");
assert.equal(railStartBuild.damageBonus, 2);
assert.equal(railStartBuild.coolRateBonus, 3);
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
assert.equal(
  JSON.stringify(choices.map((choice) => choice.contractLabel)),
  JSON.stringify([
    "주력 변이",
    "방호·보조",
    "판돈·유틸",
  ])
);
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
assert.equal(directPivotOfferChoices.length, 3);
assert.deepEqual(
  Array.from(directPivotOfferChoices, (choice) => choice.contractRole),
  ["headline", "rider", "gamble"]
);
assert.ok(
  directPivotOfferChoices.some(
    (choice) => choice.contractRole === "headline" && choice.type === "core"
  )
);
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
assert.equal(scatterHeadlinePivot.type, "core");
assert.notEqual(scatterHeadlinePivot.coreId, directPivotBuild.coreId);

const railBuild = game.createInitialBuild("rail_zeal");
railBuild.pendingCores = [];
railBuild.attunedCopies = 4;
const railChoices = game.buildForgeChoices(railBuild, () => 0, 180);
const railFinisherChoice = railChoices.find((choice) => choice.recipeLabel === "Sky Pierce");
assert.ok(railFinisherChoice);
assert.equal(railFinisherChoice.type, "affix");
assert.equal(railFinisherChoice.affixId, "phase_rounds");

const prismBuild = game.createInitialBuild("relay_oath");
prismBuild.pendingCores = [];
prismBuild.attunedCopies = 4;
const prismChoices = game.buildForgeChoices(prismBuild, () => 0, 180);
const prismFinisherChoice = prismChoices.find((choice) => choice.recipeLabel === "Prism Cascade");
assert.ok(prismFinisherChoice);
assert.equal(prismFinisherChoice.type, "affix");
assert.equal(prismFinisherChoice.affixId, "arc_link");

const midrunChaseBuild = game.createInitialBuild("scrap_pact");
midrunChaseBuild.pendingCores = [];
midrunChaseBuild.attunedCopies = 1;
const genericForgeChoices = game.buildForgeChoices(midrunChaseBuild, () => 0, 180);
assert.ok(!genericForgeChoices.some((choice) => choice.recipeLabel === "Kiln Bloom"));
const waveTwoForgeChoices = game.buildForgeChoices(midrunChaseBuild, () => 0, 180, { nextWave: 2 });
assert.equal(waveTwoForgeChoices.length, 3);
assert.deepEqual(
  Array.from(waveTwoForgeChoices, (choice) => choice.contractRole),
  ["headline", "rider", "gamble"]
);
assert.ok(!waveTwoForgeChoices.some((choice) => choice.type === "system"));
assert.ok(waveTwoForgeChoices.some((choice) => choice.recipeLabel === "Kiln Bloom"));
const waveThreeForgeChoices = game.buildForgeChoices(midrunChaseBuild, () => 0, 180, { nextWave: 3 });
const waveThreeEvolutionChoice = waveThreeForgeChoices.find(
  (choice) => choice.contractRole === "headline" && choice.type === "evolution"
);
assert.ok(waveThreeEvolutionChoice);
assert.equal(waveThreeEvolutionChoice.coreId, "scatter");
assert.equal(waveThreeEvolutionChoice.evolutionTier, 1);
assert.equal(waveThreeForgeChoices.length, 3);
assert.equal(
  waveThreeForgeChoices.map((choice) => choice.contractRole).join("|"),
  "headline|rider|gamble"
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
assert.equal(game.computeWeaponStats(architectureRun.build).evolutionTier, 1);
assert.equal(architectureRun.build.supportSystems.length, 0);
assert.equal(game.getSupportBayCapacity(architectureRun.build), 2);
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
assert.ok(bastionOvercommitChoices.every((choice) => !choice.bayUnlock));
game.applyForgeChoice(architectureRun, bastionOvercommitChoices[0]);
assert.equal(game.getSupportBayCapacity(architectureRun.build), 2);
assert.equal(architectureRun.build.auxiliaryJunctionLevel, 0);
assert.equal(architectureRun.build.wave6ChassisBreakpoint, false);
assert.equal(architectureRun.build.supportSystems.length, 0);
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
  !architectureRun.build.upgrades.includes("Chassis Breakpoint: flex bay +1 now, auto Wave 8 uplink")
);
assert.equal(game.shouldSkipOwnershipAdminStop(architectureRun.build, 9), false);
assert.equal(game.unlockLateSupportBay(architectureRun.build), true);
assert.equal(game.getSupportBayCapacity(architectureRun.build), 3);
assert.equal(game.doctrineAllowsSystemInstall(architectureRun.build, "seeker_array", 8), false);
assert.equal(game.doctrineAllowsSystemInstall(architectureRun.build, "volt_drones", 8), false);
assert.equal(game.doctrineAllowsSystemInstall(architectureRun.build, "aegis_halo"), false);
assert.equal(game.doctrineAllowsSystemInstall(architectureRun.build, "ember_ring", 8), false);
assert.ok(game.doctrineAllowsSystemInstall(architectureRun.build, "seeker_array", 9));
assert.equal(
  JSON.stringify(game.getVisibleSupportOfferSystemIds(architectureRun.build, 8).sort()),
  JSON.stringify([])
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
assert.equal(lateFormTransition.action, "forge");
assert.equal(lateFormTransition.label, "마무리");
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
assert.ok(
  !doctrinePrimaryChoices.some(
    (choice) => choice.type === "system" && choice.systemId === "volt_drones"
  )
);
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
assert.ok(doctrineFollowupChoices.some((choice) => choice.contractRole === "gamble"));
const doctrineCapstoneBuild = game.createInitialBuild("relay_oath");
doctrineCapstoneBuild.pendingCores = [];
const mirrorArchitectureChoice = game
  .buildArchitectureDraftChoices(doctrineCapstoneBuild)
  .find((choice) => choice.title === "Prism Crown");
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
  JSON.stringify([])
);
assert.equal(
  JSON.stringify(game.getVisibleSupportOfferSystemIds(doctrineCapstoneBuild, 9).sort()),
  JSON.stringify(["seeker_array"])
);
const artilleryDoctrineBuild = game.createInitialBuild("rail_zeal");
artilleryDoctrineBuild.pendingCores = [];
const artilleryArchitectureChoice = game
  .buildArchitectureDraftChoices(artilleryDoctrineBuild)
  .find((choice) => choice.title === "Twin Spine");
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
assert.equal(artilleryWaveThreeWeapon.evolutionLabel, "Twin Spine");
assert.equal(artilleryWaveThreeWeapon.doctrineFormLabel, null);
assert.equal(artilleryWaveThreeWeapon.doctrineTraitLabel, null);
assert.equal(artilleryWaveThreeWeapon.doctrineFirePattern, null);
Object.assign(artilleryDoctrineBuild, { overcommitUnlocked: true, overcommitResolved: true });
const artilleryAscensionChoice = game
  .buildBastionDraftChoices(artilleryDoctrineBuild, () => 0, 6)
  .find((choice) => choice.action === "bastion_bay_forge" && choice.chassisId === "vector_thrusters");
assert.ok(artilleryAscensionChoice);
assert.ok(artilleryAscensionChoice.description.includes("이번 Wave 6은 차체 break만 잠그고 끝낸다"));
assert.ok(!artilleryAscensionChoice.description.includes("support bay"));
assert.ok(!artilleryAscensionChoice.description.includes("contraband salvage"));
game.applyForgeChoice(
  { build: artilleryDoctrineBuild, player: null, resources: { scrap: 999 }, stats: {} },
  artilleryAscensionChoice
);
assert.equal(game.doctrineAllowsSystemInstall(artilleryDoctrineBuild, "seeker_array", 8), false);
assert.equal(game.doctrineAllowsSystemInstall(artilleryDoctrineBuild, "ember_ring", 8), false);
assert.ok(game.doctrineAllowsSystemInstall(artilleryDoctrineBuild, "seeker_array", 9));
assert.equal(
  JSON.stringify(game.getVisibleSupportOfferSystemIds(artilleryDoctrineBuild, 8).sort()),
  JSON.stringify([])
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
assert.equal(
  JSON.stringify(artilleryWaveFiveWeapon.doctrineFirePattern.offsets),
  JSON.stringify([-0.26, 0, 0.26])
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
assert.ok(fortressFollowupChoices.some((choice) => choice.contractRole === "headline"));
assert.ok(fortressFollowupChoices.some((choice) => choice.contractRole === "gamble"));
assert.ok(!fortressFollowupChoices.some((choice) => choice.laneLabel === "Support Rider"));
const fieldGrantBuild = game.createInitialBuild("relay_oath");
fieldGrantBuild.pendingCores = [];
const fieldGrantChoices = game.buildFieldGrantChoices(fieldGrantBuild, () => 0, 4);
assert.equal(fieldGrantChoices.length, 3);
assert.equal(
  JSON.stringify(fieldGrantChoices.map((choice) => choice.contractLabel)),
  JSON.stringify([
    "주력 변이",
    "방호·보조",
    "판돈·유틸",
  ])
);
assert.ok(
  fieldGrantChoices.every((choice) =>
    ["evolution", "system", "affix", "mod", "fallback", "utility"].includes(choice.type)
  )
);
assert.ok(fieldGrantChoices.every((choice) => choice.fieldGrant === true));
assert.ok(fieldGrantChoices.every((choice) => choice.type !== "core"));
assert.ok(
  fieldGrantChoices.some(
    (choice) =>
      choice.type === "utility" &&
      choice.action === "field_greed"
  )
);
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
assert.equal(afterglowWeapon.afterglowMutationLabel, "Afterglow Prism");
assert.equal(afterglowWeapon.afterglowMutationTraitLabel, "중심 반사 프리즘");
assert.ok(afterglowWeapon.afterglowMutationFirePattern);
assert.equal(afterglowWeapon.chain, 1);

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
  "headline|rider|gamble"
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
const aegisInstallChoices = game.buildForgeFollowupChoices(
  aegisBuild,
  () => 0.99,
  180,
  { nextWave: 8, finalForge: false },
  packagePrimaryChoice
);
assert.ok(aegisInstallChoices.every((choice) => choice.contractRole !== "headline"));
assert.ok(aegisInstallChoices.some((choice) => choice.contractRole === "gamble"));
const sentryBuild = game.createInitialBuild("relay_oath");
sentryBuild.pendingCores = [];
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
game.applyForgeChoice(
  { build: aegisBuild, player: null, resources: { scrap: 999 }, stats: {} },
  aegisTierTwoChoice
);
const aegisTierTwo = game.computeSupportSystemStats(aegisBuild);
assert.ok(aegisTierTwo.orbitCount >= aegisTierOnePlusArsenal.orbitCount);
assert.ok(aegisTierTwo.interceptRange >= aegisTierOnePlusArsenal.interceptRange);
assert.ok(aegisTierTwo.interceptPulseDamage >= 0);

const actTwoModuleBuild = game.createInitialBuild("relay_oath");
actTwoModuleBuild.pendingCores = [];
const actBreakArmoryChoices = game.buildForgeChoices(
  actTwoModuleBuild,
  () => 0,
  180,
  { nextWave: 5, finalForge: false }
);
assert.equal(actBreakArmoryChoices.length, 3);
assert.equal(
  actBreakArmoryChoices.map((choice) => choice.contractRole).join("|"),
  "headline|rider|gamble"
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
  "headline|rider|gamble"
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
  "rider|gamble"
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
  "rider|gamble"
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
assert.equal(playerStats.pickupRadius, 52);
assert.equal(playerStats.maxHp, 104);
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
  "domination|breach|crossfire|breach"
);
assert.equal(
  actTwoLadder.map((wave) => (wave.hazard ? wave.hazard.type : "none")).join("|"),
  "territory|relay|none|relay"
);
assert.ok(actTwoLadder[2].arena.width >= actTwoLadder[1].arena.width);
assert.ok(actTwoLadder[2].arena.height >= actTwoLadder[1].arena.height);
assert.ok(actTwoLadder[2].activeCap < actTwoLadder[3].activeCap);
assert.ok(actTwoLadder[2].note.includes("shared sweep cell"));
assert.ok(actTwoLadder[3].note.includes("shared proof cell"));

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
assert.ok(lateBreakGreedTransform.proof.includes("Wave 9 vaultline"));
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
assert.ok(lateBreakLedgerWeapon.lateBreakStatusNote.includes("vaultline"));
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

(function () {
  const GAME_TITLE = "Cinder Circuit";
  const ARENA_WIDTH = 960;
  const ARENA_HEIGHT = 540;
  const PLAYER_RADIUS = 12;
  const SECOND_ACT_ARENA = {
    width: 1280,
    height: 720,
  };
  const THIRD_ACT_ARENA = {
    width: 1520,
    height: 880,
  };
  const THIRD_ACT_PAYOFF_ARENA = {
    width: 1700,
    height: 980,
  };
  const THIRD_ACT_PROOF_ARENA = {
    width: 1640,
    height: 940,
  };
  const AFTERBURN_ENDURANCE_ARENA = {
    width: 1560,
    height: 900,
  };
  const ILLEGAL_OVERCLOCK_WAVE = 9;
  const ILLEGAL_MUTATION_START_WAVE = 10;
  const LATE_ASCENSION_START_WAVE = 10;
  const ILLEGAL_OVERCLOCK_DROP_LIFE = 12;
  const LATE_ASCENSION_DROP_LIFE = 13;
  const MAX_ILLEGAL_OVERCLOCK_MUTATIONS = 3;
  const CATALYST_CRUCIBLE_DROP_LIFE = 12;
  const CATALYST_CRUCIBLE_OBJECTIVE = {
    label: "Catalyst Crucible",
    radius: 132,
    telegraph: 0.95,
    duration: 18,
    damage: 14,
    coreHp: 110,
    coreRadius: 21,
    turretInterval: 0.88,
    turretDamage: 11,
    turretSpeed: 238,
    enemyPullRadius: 188,
  };
  const CATALYST_CRUCIBLE_STRESS = {
    maxHpPenalty: 12,
    moveSpeedPenalty: 10,
    coolRatePenalty: 6,
    hazardPenalty: 0.05,
  };
  const APEX_PREDATOR_START_WAVE = 11;
  const MAX_APEX_MUTATION_LEVEL = 3;
  const APEX_PREDATOR_SPAWN_DELAY = 12;
  const WAVE6_ASCENSION_SURGE_DURATION = 4.6;
  const WAVE6_ASCENSION_ONLINE_SURGE_DURATION = 7.4;
  const LATE_FIELD_CACHE_START_WAVE = 10;
  const LATE_FIELD_CACHE_INTERVAL = 2;
  const MAX_LATE_FIELD_MUTATION_LEVEL = 7;
  const MAX_LATE_FIELD_AEGIS_LEVEL = 5;
  const LATE_FIELD_BREAKPOINT_INTERVAL = 4;
  const BLACK_LEDGER_RAID_OVERLAY = {
    brander: 0.34,
    lancer: 0.24,
    shrike: 0.24,
    binder: 0.08,
    mortar: 0.1,
  };
  const LATE_BREAK_ENCOUNTER_PROFILES = {
    mutation: {
      label: "Wave 9 · Breakpoint Overdrive",
      bandId: "breakpoint_overdrive",
      bandLabel: "Breakpoint Overdrive",
      pressureFamily: "crossfire",
      note: "Late Break에서 주포 변이를 집었다면 첫 late bracket은 단일 open-lane payoff rung로 열려야 한다. 전장을 더 크게 벌리고 구조물 upkeep를 걷어내, 방금 증설한 배럴과 보조 포문이 열린 lane 둘 이상을 얼마나 깊게 찢는지 먼저 즐기게 만든다.",
      directive:
        "overdrive gallery. 구조물 코어보다 열린 사선과 marked elite 절개가 우선이다. skimmer 훑기를 얇게 만든 뒤 lancer charge를 정면 화망으로 자르며 새 주포 실루엣을 바로 시험해야 한다.",
      arena: {
        width: 1820,
        height: 1020,
      },
      activeCap: 24,
      spawnBudget: 144,
      baseSpawnInterval: 0.438,
      spawnIntervalMin: 0.126,
      eliteEvery: 4,
      mix: {
        scuttler: 0.06,
        brute: 0.12,
        shrike: 0.14,
        skimmer: 0.34,
        lancer: 0.24,
        mortar: 0.02,
        warden: 0.08,
      },
      mixWeight: 0.62,
      hazard: {
        label: "Overdrive Surge",
        interval: 11.2,
        count: 1,
        radius: 68,
        telegraph: 0.92,
        duration: 3.7,
        damage: 14,
      },
    },
    aegis: {
      label: "Wave 9 · Halo Run",
      bandId: "halo_run",
      bandLabel: "Halo Run",
      pressureFamily: "crossfire",
      note: "Warplate Halo를 집었더라도 첫 late bracket의 주연은 여전히 headline form이어야 한다. 첫 판은 open-lane payoff로 유지하고, halo는 깊게 밀어 넣을 때 한 번 더 오래 사선을 소유하게 만드는 rider로만 작동한다.",
      directive:
        "halo run. 열린 외곽 lane을 먼저 먹고 lancer charge를 흘린 뒤, plate를 터뜨려 한 번 더 깊게 밀어 넣어야 한다. halo는 주포가 먹은 공간을 잠깐 더 길게 버티게 만드는 rider다.",
      arena: {
        width: 1740,
        height: 990,
      },
      activeCap: 23,
      spawnBudget: 140,
      baseSpawnInterval: 0.446,
      spawnIntervalMin: 0.128,
      eliteEvery: 4,
      mix: {
        scuttler: 0.06,
        brute: 0.16,
        shrike: 0.18,
        skimmer: 0.2,
        lancer: 0.22,
        binder: 0.06,
        mortar: 0.04,
        warden: 0.08,
      },
      mixWeight: 0.58,
      hazard: {
        label: "Halo Surge",
        interval: 10.8,
        count: 1,
        radius: 70,
        telegraph: 0.88,
        duration: 3.8,
        damage: 14,
      },
    },
    ledger: {
      label: "Wave 9 · Ledger Heist",
      bandId: "ledger_heist",
      bandLabel: "Ledger Heist",
      pressureFamily: "crossfire",
      note: "Black Ledger 계약을 집었더라도 첫 late bracket은 greed 운영보다 headline form payoff가 먼저여야 한다. 첫 판은 open-lane kill race로 유지하고, ledger는 deeper dive를 허용하는 greed rider로만 남겨 주무기 변신이 화면을 먼저 먹게 만든다.",
      directive:
        "ledger heist. 열린 lane에서 marked elite와 skimmer sweep를 먼저 찢고, payout 욕심은 비워 낸 사선 안에서만 짧게 챙겨야 한다. greed는 화망이 연 공간을 넓히는 rider이지 main ask가 아니다.",
      arena: {
        width: 1780,
        height: 1000,
      },
      activeCap: 24,
      spawnBudget: 146,
      baseSpawnInterval: 0.432,
      spawnIntervalMin: 0.124,
      eliteEvery: 4,
      mix: {
        scuttler: 0.06,
        brute: 0.14,
        shrike: 0.16,
        skimmer: 0.24,
        lancer: 0.2,
        brander: 0.08,
        binder: 0.06,
        mortar: 0.04,
        warden: 0.02,
      },
      mixWeight: 0.58,
      hazard: {
        label: "Ledger Surge",
        interval: 10.5,
        count: 1,
        radius: 70,
        telegraph: 0.86,
        duration: 3.9,
        damage: 14,
      },
    },
  };
  const LATE_BREAK_FOLLOWTHROUGH_PROFILES = {
    mutation: {
      label: "Wave 10 · Overdrive Breach",
      bandId: "overdrive_breach",
      bandLabel: "Overdrive Breach",
      pressureFamily: "breach",
      note: "Cataclysm Arsenal을 골랐다면 두 번째 판은 여전히 breach proof지만, 아직 victory lap의 결을 끊으면 안 된다. corridor는 하나만 늦게 닫고 arena를 더 크게 벌려, 방금 증설한 포문이 열린 flank 둘을 오래 누른 뒤 마지막 한 줄만 직접 찢게 만든다.",
      directive:
        "overdrive breach. relay crown이 얇은 corridor 하나만 늦게 잠근다. 가장 넓은 pocket을 먼저 잡고 split volley로 flank 둘을 오래 눌러 지배 시간을 만든 뒤, 닫히는 회랑 한 줄만 마지막에 찢어 breach 창을 직접 늘려야 한다.",
      arena: {
        width: 2020,
        height: 1140,
      },
      activeCap: 25,
      spawnBudget: 148,
      baseSpawnInterval: 0.422,
      spawnIntervalMin: 0.126,
      eliteEvery: 4,
      mix: {
        scuttler: 0.08,
        brute: 0.12,
        shrike: 0.14,
        skimmer: 0.26,
        lancer: 0.24,
        binder: 0.04,
        mortar: 0.02,
        warden: 0.08,
        brander: 0.02,
      },
      mixWeight: 0.58,
      hazard: {
        label: "Overdrive Crown",
        type: "relay",
        interval: 10,
        count: 1,
        radius: 82,
        telegraph: 0.88,
        duration: 4.9,
        damage: 15,
        coreHp: 60,
        coreRadius: 18,
        relayRange: 520,
        relayWidth: 26,
        relayDamage: 14,
      },
    },
    aegis: {
      label: "Wave 10 · Halo Breach",
      bandId: "halo_breach",
      bandLabel: "Halo Breach",
      pressureFamily: "breach",
      note: "Warplate Halo를 골랐다면 두 번째 판도 halo upkeep가 아니라 late-form breach proof여야 한다. relay corridor가 한 줄만 늦게 닫히는 동안 plate를 믿고 한 번 깊게 파고들어, 주포가 연 창을 rider가 얼마나 오래 붙잡는지 바로 보여 준다.",
      directive:
        "halo breach. relay crown이 닫히기 전에 plate를 태워 corridor 한 줄을 밀고, 오래 욕심내지 말고 비워 낸 pocket으로 짧게 갈아타야 한다. halo는 정면 교환이 아니라 breach 시간을 늘리는 rider다.",
      arena: {
        width: 1840,
        height: 1040,
      },
      activeCap: 26,
      spawnBudget: 154,
      baseSpawnInterval: 0.414,
      spawnIntervalMin: 0.122,
      eliteEvery: 4,
      mix: {
        scuttler: 0.04,
        brute: 0.2,
        shrike: 0.18,
        skimmer: 0.06,
        lancer: 0.16,
        binder: 0.1,
        mortar: 0.04,
        warden: 0.12,
        brander: 0.1,
      },
      mixWeight: 0.56,
      hazard: {
        label: "Halo Crown",
        type: "relay",
        interval: 9.4,
        count: 1,
        radius: 88,
        telegraph: 0.84,
        duration: 5.5,
        damage: 14,
        coreHp: 64,
        coreRadius: 18,
        relayRange: 506,
        relayWidth: 28,
        relayDamage: 13,
      },
    },
    ledger: {
      label: "Wave 10 · Jackpot Breach",
      bandId: "jackpot_breach",
      bandLabel: "Jackpot Breach",
      pressureFamily: "breach",
      note: "Black Ledger Heist를 골랐다면 두 번째 판도 greed chase의 반복이 아니라 breach proof여야 한다. relay corridor가 payout pocket 하나만 잠그는 동안, 먼저 주포로 탈출구를 만든 뒤 그 안에서만 짧게 cash-out하도록 강제해 greed를 rider 위치에 묶는다.",
      directive:
        "jackpot breach. relay crown이 payout pocket을 좁히고 brander가 뒤를 태운다. 먼저 corridor를 찢어 살아남을 창을 만든 뒤, 그 안에서만 greed line을 짧게 챙겨야 한다.",
      arena: {
        width: 1900,
        height: 1040,
      },
      activeCap: 27,
      spawnBudget: 160,
      baseSpawnInterval: 0.406,
      spawnIntervalMin: 0.12,
      eliteEvery: 4,
      mix: {
        scuttler: 0.04,
        brute: 0.12,
        shrike: 0.14,
        skimmer: 0.12,
        lancer: 0.18,
        brander: 0.16,
        binder: 0.1,
        mortar: 0.06,
        warden: 0.08,
      },
      mixWeight: 0.58,
      hazard: {
        label: "Jackpot Crown",
        type: "relay",
        interval: 9,
        count: 1,
        radius: 88,
        telegraph: 0.82,
        duration: 5.6,
        damage: 15,
        coreHp: 68,
        coreRadius: 18,
        relayRange: 520,
        relayWidth: 28,
        relayDamage: 14,
      },
    },
  };
  const ARSENAL_BREAKPOINT_ENCOUNTER_PROFILES = {
    mutation: {
      bandLabel: "Arsenal Overdrive",
      note:
        "Arsenal Breakpoint에서 화력 변이를 골랐다면 다음 전투는 upkeep 검사가 아니라 open-lane firing test로 접혀야 한다. arena를 더 벌리고 구조물 세금을 줄여, 방금 늘어난 배럴과 split volley가 lane 둘 이상을 동시에 먹는지 즉시 드러나게 만든다.",
      directive:
        "arsenal overdrive. pocket 유지보다 긴 사선과 mortar perch 절개가 먼저다. 새 화망으로 flank 둘을 같이 긁으며 marked elite까지 같은 각도에서 녹여야 한다.",
      arena: {
        width: 1800,
        height: 990,
      },
      activeCap: 30,
      spawnBudget: 198,
      baseSpawnInterval: 0.348,
      spawnIntervalMin: 0.102,
      eliteEvery: 4,
      mix: {
        scuttler: 0.04,
        brute: 0.1,
        shrike: 0.14,
        skimmer: 0.24,
        lancer: 0.24,
        mortar: 0.12,
        warden: 0.08,
        brander: 0.04,
      },
      mixWeight: 0.54,
      hazard: {
        label: "Arsenal Crossfire",
        interval: 9.2,
        count: 1,
        radius: 74,
        telegraph: 0.72,
        duration: 4,
        damage: 15,
      },
    },
    aegis: {
      bandLabel: "Citadel Reset",
      note:
        "Arsenal Breakpoint에서 방호층을 골랐다면 다음 전투는 회복 pocket을 캐는 reset 시험이어야 한다. drift wake는 더 굵게 닫히지만 적 점유는 잠시 낮춰, plate를 믿고 깊게 들어갔다 빠지는 cadence를 바로 요구한다.",
      directive:
        "citadel reset. drift wake가 닫히기 전에 plate를 태워 전열 한 줄을 비우고 즉시 refuge pocket으로 빠져야 한다. 오래 버티기보다 진입-이탈 타이밍이 핵심이다.",
      arena: {
        width: 1680,
        height: 980,
      },
      activeCap: 27,
      spawnBudget: 188,
      baseSpawnInterval: 0.372,
      spawnIntervalMin: 0.11,
      eliteEvery: 4,
      mix: {
        scuttler: 0.04,
        brute: 0.18,
        shrike: 0.16,
        skimmer: 0.08,
        lancer: 0.1,
        binder: 0.14,
        mortar: 0.06,
        warden: 0.14,
        brander: 0.1,
      },
      mixWeight: 0.52,
      hazard: {
        label: "Citadel Drift",
        type: "drift",
        interval: 8.6,
        count: 2,
        radius: 102,
        telegraph: 0.8,
        duration: 6.6,
        damage: 15,
        driftSpeed: 126,
        driftOrbit: 0.36,
      },
    },
    ledger: {
      bandLabel: "Jackpot Vaultline",
      note:
        "Arsenal Breakpoint에서 탐욕 계약을 골랐다면 다음 전투는 바로 cash-out routing으로 비틀려야 한다. 점거 대신 금고 pocket이 크게 열리고 외곽 chase lane이 넓어져, payout을 뜯을지 안전한 회전을 택할지 다시 갈라진다.",
      directive:
        "jackpot vaultline. 열린 vault를 빠르게 찢고 곧바로 이탈할 cash-out window를 직접 정해야 한다. pocket 안 체류 시간이 길수록 brander와 lancer가 퇴로를 먼저 닫는다.",
      arena: {
        width: 1780,
        height: 980,
      },
      activeCap: 29,
      spawnBudget: 202,
      baseSpawnInterval: 0.356,
      spawnIntervalMin: 0.104,
      eliteEvery: 4,
      mix: {
        scuttler: 0.04,
        brute: 0.1,
        shrike: 0.14,
        skimmer: 0.12,
        lancer: 0.16,
        brander: 0.22,
        binder: 0.1,
        mortar: 0.06,
        warden: 0.06,
      },
      mixWeight: 0.56,
      hazard: {
        label: "Jackpot Vaults",
        type: "salvage",
        interval: 8.2,
        count: 2,
        radius: 88,
        telegraph: 0.76,
        duration: 6.8,
        damage: 15,
        coreHp: 98,
        coreRadius: 19,
        salvageScrap: 30,
        salvageBurstCount: 6,
        salvageBurstRadius: 72,
        salvageDropLife: 9.6,
      },
    },
  };
  const LATE_BREAK_CROWN_PROFILES = {
    mutation: {
      10: {
        label: "Wave 11 · Crownbreaker Gallery",
        bandId: "crownbreaker_gallery",
        bandLabel: "Crownbreaker Gallery",
        pressureFamily: "crossfire",
        note: "Cataclysm Arsenal branch의 세 번째 rung은 finale 직전 domination lap이다. relay upkeep를 걷어내고 kill lane만 넓게 남겨, 커진 배럴이 corridor 하나가 아니라 전장 폭 전체를 오래 찢는 시간을 먼저 준다.",
        directive:
          "crownbreaker gallery. relay pylon보다 mortar perch와 marked elite 절개가 먼저다. 열린 사선 둘을 동시에 비우며 새 split volley가 어느 lane까지 덮는지 증명해야 한다.",
        arena: {
          width: 1940,
          height: 1080,
        },
        activeCap: 28,
        spawnBudget: 174,
        baseSpawnInterval: 0.372,
        spawnIntervalMin: 0.112,
        eliteEvery: 4,
        mix: {
          scuttler: 0.04,
          brute: 0.12,
          shrike: 0.14,
          skimmer: 0.22,
          lancer: 0.22,
          mortar: 0.12,
          warden: 0.1,
          brander: 0.04,
        },
        mixWeight: 0.56,
        hazard: {
          label: "Gallery Breakers",
          type: null,
          interval: 9.4,
          count: 1,
          radius: 74,
          telegraph: 0.82,
          duration: 4.1,
          damage: 15,
        },
      },
      11: {
        label: "Wave 12 · Cataclysm Crownline",
        bandId: "cataclysm_crownline",
        bandLabel: "Cataclysm Crownline",
        pressureFamily: "breach",
        note: "무장 branch의 마지막 판은 Wave 11 gallery에서 벌어 둔 ownership를 닫는 단일 crownline breach다. relay corridor만 남기고 binder·brander 세금을 줄여, 막 완성한 화망으로 직접 돌파 창을 찢는 결산으로 마무리한다.",
        directive:
          "cataclysm crownline. relay crown이 드문 대신 더 길게 열린다. 가장 얇은 corridor를 먼저 찢어 split fire로 양측 flank를 같이 억누르며 직접 breach window를 연장해야 한다.",
        arena: {
          width: 1840,
          height: 1030,
        },
        activeCap: 35,
        spawnBudget: 208,
        baseSpawnInterval: 0.334,
        spawnIntervalMin: 0.1,
        eliteEvery: 4,
        mix: {
          scuttler: 0.04,
          brute: 0.14,
          shrike: 0.12,
          skimmer: 0.12,
          lancer: 0.22,
          brander: 0.08,
          mortar: 0.06,
          warden: 0.1,
        },
        mixWeight: 0.54,
        hazard: {
          label: "Cataclysm Crownline",
          type: "relay",
          interval: 7.8,
          count: 2,
          radius: 90,
          telegraph: 0.72,
          duration: 5.1,
          damage: 16,
          coreHp: 80,
          coreRadius: 19,
          relayRange: 548,
          relayWidth: 30,
          relayDamage: 15,
        },
      },
    },
    aegis: {
      10: {
        label: "Wave 11 · Halo Refuge",
        bandId: "halo_refuge",
        bandLabel: "Halo Refuge",
        pressureFamily: "pursuit",
        note: "Warplate Halo branch의 세 번째 rung은 finale 직전 refuge lap이다. drift wake가 전장을 접더라도 적 점유를 한 박자 늦춰, plate를 믿고 깊게 들어간 뒤 살아서 빠져나오는 cadence를 먼저 즐기게 만든다.",
        directive:
          "halo refuge. drift wake가 닫히기 전에 한 lane을 비우고 오래 욕심내지 말고 reset pocket으로 빠져야 한다. 버티기보다 plate timing과 retreat cadence가 중요하다.",
        arena: {
          width: 1780,
          height: 1020,
        },
        activeCap: 27,
        spawnBudget: 170,
        baseSpawnInterval: 0.382,
        spawnIntervalMin: 0.11,
        eliteEvery: 4,
        mix: {
          scuttler: 0.04,
          brute: 0.18,
          shrike: 0.18,
          skimmer: 0.06,
          lancer: 0.1,
          binder: 0.1,
          mortar: 0.04,
          warden: 0.14,
          brander: 0.16,
        },
        mixWeight: 0.52,
        hazard: {
          label: "Halo Refuge Drift",
          type: "drift",
          interval: 9.6,
          count: 1,
          radius: 94,
          telegraph: 0.82,
          duration: 5.8,
          damage: 15,
          driftSpeed: 120,
          driftOrbit: 0.28,
        },
      },
      11: {
        label: "Wave 12 · Citadel Stand",
        bandId: "citadel_stand",
        bandLabel: "Citadel Stand",
        pressureFamily: "territory",
        note: "방호 branch의 마지막 판은 Wave 11 refuge cadence를 결산하는 stand-off다. 작은 bastion 코어 두 곳만 잠깐 열어 두고 pursuit tax를 걷어, plate와 복구를 어디에 쓰는지 build 판단이 선명하게 드러나게 만든다.",
        directive:
          "citadel stand. 모든 거점을 지키려 하지 말고 한 pocket만 짧게 열어 체력과 dash를 회수한 뒤 바로 다른 flank로 갈아타야 한다. halo가 없는 정면 교환은 오래 버티지 못한다.",
        arena: {
          width: 1720,
          height: 1000,
        },
        activeCap: 34,
        spawnBudget: 204,
        baseSpawnInterval: 0.338,
        spawnIntervalMin: 0.102,
        eliteEvery: 4,
        mix: {
          scuttler: 0.04,
          brute: 0.2,
          shrike: 0.16,
          lancer: 0.12,
          binder: 0.1,
          mortar: 0.04,
          warden: 0.12,
          brander: 0.08,
        },
        mixWeight: 0.5,
        hazard: {
          label: "Citadel Pocket",
          type: "territory",
          interval: 8.1,
          count: 2,
          radius: 96,
          telegraph: 0.82,
          duration: 8.2,
          damage: 14,
          coreHp: 76,
          coreRadius: 18,
          turretInterval: 0.96,
          turretDamage: 11,
          turretSpeed: 240,
          enemyPullRadius: 152,
        },
      },
    },
    ledger: {
      10: {
        label: "Wave 11 · Kingpin Vaultline",
        bandId: "kingpin_vaultline",
        bandLabel: "Kingpin Vaultline",
        pressureFamily: "raid",
        note: "Black Ledger branch의 세 번째 rung은 finale 직전 cash-out lap이다. 고정 corridor 대신 흩어진 contraband vault만 크게 던져, 어디까지 chase하고 언제 이탈할지 greed 판단을 한 판 더 즐기게 만든다.",
        directive:
          "kingpin vaultline. 외곽과 중앙에 흩어진 vault 중 하나만 오래 쫓을 수 있다. jackpot을 노리면 brander와 binder가 회수선을 찢으니, payout line을 정하고 빨리 이탈해야 한다.",
        arena: {
          width: 1860,
          height: 1040,
        },
        activeCap: 28,
        spawnBudget: 178,
        baseSpawnInterval: 0.364,
        spawnIntervalMin: 0.108,
        eliteEvery: 4,
        mix: {
          scuttler: 0.04,
          brute: 0.14,
          shrike: 0.14,
          skimmer: 0.14,
          lancer: 0.14,
          brander: 0.18,
          binder: 0.08,
          mortar: 0.08,
          warden: 0.06,
        },
        mixWeight: 0.54,
        hazard: {
          label: "Kingpin Vaultline",
          type: "salvage",
          interval: 9,
          count: 2,
          radius: 78,
          telegraph: 0.8,
          duration: 7.2,
          damage: 14,
          coreHp: 86,
          coreRadius: 19,
          salvageScrap: 24,
          salvageBurstCount: 6,
          salvageBurstRadius: 62,
          salvageDropLife: 8.8,
        },
      },
      11: {
        label: "Wave 12 · Grand Blackout Run",
        bandId: "grand_blackout_run",
        bandLabel: "Grand Blackout Run",
        pressureFamily: "raid",
        note: "탐욕 branch의 마지막 판은 Wave 11 vaultline을 키운 최종 caravan chase다. 거대한 contraband train 하나만 오래 열어 payout 판단을 밀어붙이게 하고, binder·mortar 세금은 덜어 cash-out 종결 타이밍을 스스로 정하게 만든다.",
        directive:
          "grand blackout run. caravan이 더 크고 더 오래 열린다. 끝까지 쫓으면 payout이 폭증하지만 escape lane도 함께 닫히므로, 언제 jackpot을 확정하고 언제 버릴지 마지막까지 직접 계산해야 한다.",
        arena: {
          width: 1820,
          height: 1020,
        },
        activeCap: 35,
        spawnBudget: 212,
        baseSpawnInterval: 0.33,
        spawnIntervalMin: 0.1,
        eliteEvery: 4,
        mix: {
          scuttler: 0.04,
          brute: 0.14,
          shrike: 0.16,
          skimmer: 0.1,
          lancer: 0.18,
          brander: 0.18,
          binder: 0.08,
          mortar: 0.06,
        },
        mixWeight: 0.56,
        hazard: {
          label: "Grand Blackout Caravan",
          type: "caravan",
          interval: 7.6,
          count: 2,
          radius: 88,
          telegraph: 0.76,
          duration: 8.4,
          damage: 16,
          coreHp: 102,
          coreRadius: 20,
          salvageScrap: 34,
          salvageBurstCount: 7,
          salvageBurstRadius: 74,
          salvageDropLife: 10.2,
          driftSpeed: 138,
          driftOrbit: 0.26,
        },
      },
    },
  };

  const WAVE_CONFIG = [
    {
      id: "ignition",
      label: "Wave 1 · Ignition",
      duration: 56,
      spawnBudget: 48,
      activeCap: 18,
      baseSpawnInterval: 0.92,
      spawnIntervalMin: 0.28,
      spawnAcceleration: 0.42,
      eliteEvery: 12,
      mix: {
        scuttler: 0.7,
        brute: 0.22,
        shrike: 0.08,
      },
      note: "기본 회피와 첫 포지를 여는 구간.",
      directive: "폭주 지형 없음. 과열과 드랍 회수 감각부터 익힌다.",
      hazard: null,
    },
    {
      id: "pressure",
      label: "Wave 2 · Pressure",
      duration: 60,
      spawnBudget: 68,
      activeCap: 22,
      baseSpawnInterval: 0.76,
      spawnIntervalMin: 0.24,
      spawnAcceleration: 0.38,
      eliteEvery: 10,
      mix: {
        scuttler: 0.52,
        brute: 0.28,
        shrike: 0.2,
      },
      note: "첫 제련 폭주가 진입 각도를 잘라내기 시작한다.",
      directive: "단일 Cinder Surge. 안전 지대를 계속 옮겨야 한다.",
      hazard: {
        label: "Cinder Surge I",
        interval: 14,
        count: 1,
        radius: 52,
        telegraph: 1.05,
        duration: 3.2,
        damage: 9,
      },
    },
    {
      id: "fracture",
      label: "Wave 3 · Fracture",
      duration: 64,
      spawnBudget: 86,
      activeCap: 26,
      baseSpawnInterval: 0.65,
      spawnIntervalMin: 0.2,
      spawnAcceleration: 0.34,
      eliteEvery: 8,
      mix: {
        scuttler: 0.44,
        brute: 0.28,
        shrike: 0.28,
      },
      note: "엘리트 빈도와 잔불 지형이 함께 올라간다.",
      directive: "빠른 엘리트 순환과 단일 강화 Cinder Surge.",
      hazard: {
        label: "Cinder Surge II",
        interval: 11.5,
        count: 1,
        radius: 60,
        telegraph: 0.95,
        duration: 3.8,
        damage: 11,
      },
    },
    {
      id: "meltdown",
      label: "Wave 4 · Meltdown",
      duration: 74,
      spawnBudget: 126,
      activeCap: 32,
      baseSpawnInterval: 0.49,
      spawnIntervalMin: 0.16,
      spawnAcceleration: 0.33,
      eliteEvery: 7,
      mix: {
        scuttler: 0.28,
        brute: 0.28,
        shrike: 0.44,
      },
      note: "첫 전투 구간의 결산. 압축된 작업장에서 이중 폭주와 엘리트 돌파를 버텨야 첫 Armory가 값어치를 만든다.",
      directive: "Meltdown Surges. 좁은 방에서 화력 창을 억지로 열고, Wave 5 Act Break Armory 전까지 돌파 루트를 직접 만든다.",
      driveGainFactor: 1.16,
      hazard: {
        label: "Meltdown Surge",
        interval: 8.9,
        count: 2,
        radius: 70,
        telegraph: 0.9,
        duration: 4.1,
        damage: 13,
      },
    },
    {
      id: "afterglow",
      label: "Wave 5 · Afterglow",
      duration: 76,
      spawnBudget: 118,
      activeCap: 27,
      baseSpawnInterval: 0.54,
      spawnIntervalMin: 0.156,
      spawnAcceleration: 0.27,
      eliteEvery: 9,
      mix: {
        scuttler: 0.26,
        brute: 0.28,
        shrike: 0.46,
      },
      note: "첫 Armory 직후의 payoff window. 넓어진 작업장과 느슨한 bastion anchor 한두 개만 남겨, 막 커진 차체와 주포가 외곽 회전선 전체를 바로 먹는 시간을 먼저 준다.",
      directive:
        "afterglow window. 점거 코어를 오래 관리하기보다 얇은 anchor를 빠르게 찢고 넓어진 외곽 lane을 길게 점유해야 한다. 새 form이 한 번에 얼마나 넓게 space를 소유하는지 먼저 증명하는 판이다.",
      driveGainFactor: 1.22,
      arena: SECOND_ACT_ARENA,
      hazard: {
        label: "Afterglow Bastion",
        type: "territory",
        interval: 11.2,
        count: 1,
        radius: 90,
        telegraph: 1.08,
        duration: 7.6,
        damage: 10,
        coreHp: 34,
        coreRadius: 16,
        turretInterval: 1.36,
        turretDamage: 8,
        turretSpeed: 198,
        enemyPullRadius: 132,
      },
    },
    {
      id: "breakline",
      label: "Wave 6 · Breakline",
      pressureFamily: "breach",
      duration: 80,
      spawnBudget: 136,
      activeCap: 30,
      baseSpawnInterval: 0.486,
      spawnIntervalMin: 0.14,
      spawnAcceleration: 0.28,
      eliteEvery: 7,
      mix: {
        scuttler: 0.12,
        brute: 0.18,
        shrike: 0.22,
        skimmer: 0.14,
        lancer: 0.18,
        binder: 0.08,
        mortar: 0.02,
        warden: 0.06,
      },
      note: "Act 2 staircase의 두 번째 판은 더 이상 같은 domination 반복이 아니다. 열린 lane으로 맛본 ownership를 얇은 relay corridor 위에서 바로 다시 밀어붙이게 만들어, headline midform이 실제 breach window를 얼마나 오래 버는지 시험한다.",
      directive:
        "breakline breach. relay crown이 가장 얇은 corridor 하나만 길게 잠근다. skimmer sweep보다 먼저 찢을 회랑을 고르고, 새 form으로 flank 둘을 같이 눌러 돌파 창을 직접 길게 유지해야 한다.",
      driveGainFactor: 1.24,
      arena: {
        width: 1360,
        height: 760,
      },
      hazard: {
        label: "Breakline Crown",
        type: "relay",
        interval: 9.3,
        count: 1,
        radius: 82,
        telegraph: 0.86,
        duration: 5.6,
        damage: 11,
        coreHp: 46,
        coreRadius: 17,
        relayRange: 448,
        relayWidth: 28,
        relayDamage: 12,
      },
    },
    {
      id: "crownfire",
      label: "Wave 7 · Crownfire",
      pressureFamily: "pursuit",
      duration: 86,
      spawnBudget: 132,
      activeCap: 28,
      baseSpawnInterval: 0.468,
      spawnIntervalMin: 0.132,
      spawnAcceleration: 0.26,
      eliteEvery: 7,
      mix: {
        scuttler: 0.14,
        brute: 0.18,
        shrike: 0.24,
        skimmer: 0.22,
        lancer: 0.14,
        binder: 0.04,
        mortar: 0.02,
      },
      note: "Act 2 후반의 짧은 domination lap. drift furnace는 남기되 binder와 mortar upkeep를 한 번 걷어내, 방금 커진 form이 열린 lane 두 개를 실제로 오래 들고 밀어붙이는 시간을 먼저 준다.",
      directive:
        "crownfire victory lap. drifting furnace가 lane 하나를 천천히 접지만 corridor tax는 아직 얇다. 가장 넓은 pocket을 먼저 잡고 새 form의 split fire로 flank 둘을 오래 눌러, 다음 breach 전에 space ownership를 크게 벌어야 한다.",
      driveGainFactor: 1.28,
      arena: {
        width: 1440,
        height: 780,
      },
      hazard: {
        label: "Crownfire Drift",
        type: "drift",
        interval: 10.2,
        count: 1,
        radius: 96,
        telegraph: 0.9,
        duration: 5.1,
        damage: 11,
        driftSpeed: 102,
        driftOrbit: 0.28,
      },
    },
    {
      id: "forgecross",
      label: "Wave 8 · Forgecross",
      pressureFamily: "breach",
      duration: 90,
      spawnBudget: 154,
      activeCap: 32,
      baseSpawnInterval: 0.424,
      spawnIntervalMin: 0.124,
      spawnAcceleration: 0.29,
      eliteEvery: 6,
      mix: {
        scuttler: 0.08,
        brute: 0.2,
        shrike: 0.2,
        lancer: 0.24,
        binder: 0.1,
        mortar: 0.04,
        warden: 0.1,
      },
      note: "Act 2 결산은 이제 maintenance stack이 아니라 단일 breach test다. 늦게 닫히는 relay crown 하나와 flank bruiser가 겹쳐, Crownfire에서 벌어 둔 space ownership를 마지막 한 번의 돌파 각으로 바꾸게 만든다.",
      directive:
        "forgecross breach. relay crown 하나가 늦게 but hard하게 corridor를 닫고, lancer wedge와 warden wall이 탈출각을 시험한다. 먼저 찢을 lane을 스스로 고른 뒤 짧은 burst로 문을 열고 바로 빠져나와 Late Break Armory 직전 돌파를 완성해야 한다.",
      driveGainFactor: 1.34,
      arena: {
        width: 1440,
        height: 800,
      },
      hazard: {
        label: "Forgecross Relay Crown",
        type: "relay",
        interval: 8.7,
        count: 1,
        radius: 108,
        telegraph: 0.9,
        duration: 6.4,
        damage: 12,
        coreHp: 56,
        coreRadius: 18,
        relayRange: 516,
        relayWidth: 30,
        relayDamage: 14,
      },
    },
    {
      id: "lockgrid",
      label: "Wave 9 · Lockgrid",
      pressureFamily: "crossfire",
      duration: 90,
      spawnBudget: 146,
      activeCap: 28,
      baseSpawnInterval: 0.446,
      spawnIntervalMin: 0.12,
      spawnAcceleration: 0.24,
      eliteEvery: 5,
      mix: {
        scuttler: 0.08,
        brute: 0.14,
        shrike: 0.14,
        skimmer: 0.28,
        lancer: 0.2,
        mortar: 0.06,
        warden: 0.1,
      },
      note: "Late Breakpoint 직후의 첫 payoff window는 이제 진짜 domination lap으로 열린다. arena를 더 크게 벌리고 active cap을 크게 낮춰, 방금 완성한 late chassis/weapon form이 열린 lane 둘을 길게 점유하는 시간이 먼저 보이게 만든다.",
      directive:
        "lockgrid crossfire. skimmer가 외곽 회전선에 쐐기를 박고 lancer가 직선 돌진으로 중앙을 꿰뚫지만, 이번 판의 ask는 upkeep가 아니라 lane ownership이다. 후열 청소보다 먼저 넓은 측면을 비우고 charge 각을 흘려 headline form의 sweep 폭을 오래 유지해야 한다.",
      driveGainFactor: 1.38,
      arena: THIRD_ACT_PAYOFF_ARENA,
      hazard: {
        label: "Lockgrid Surge",
        interval: 11.6,
        count: 1,
        radius: 60,
        telegraph: 0.98,
        duration: 3.4,
        damage: 12,
      },
    },
    {
      id: "crownhold_proof",
      label: "Wave 10 · Crownhold Proof",
      pressureFamily: "breach",
      duration: 94,
      spawnBudget: 162,
      activeCap: 30,
      baseSpawnInterval: 0.402,
      spawnIntervalMin: 0.114,
      spawnAcceleration: 0.284,
      eliteEvery: 5,
      mix: {
        scuttler: 0.06,
        brute: 0.14,
        shrike: 0.16,
        skimmer: 0.2,
        lancer: 0.22,
        brander: 0.08,
        binder: 0.04,
        mortar: 0.02,
        warden: 0.08,
      },
      note: "Act 3 두 번째 rung은 caravan greed detour 대신 single crownline proof로 붙인다. relay crown 하나만 더 크게 열어, Wave 9에서 벌어 둔 lane ownership를 같은 late form으로 직접 찢고 오래 지키는지 즉시 확인하게 만든다.",
      directive:
        "crownhold proof. relay crown 하나가 넓은 측면 pocket을 늦게 but hard하게 조인다. skimmer sweep와 lancer wedge가 열린 복도를 흔들기 전에 가장 얇은 flank를 먼저 찢고, headline form의 sweep 폭으로 breach lane을 오래 고정해야 한다.",
      driveGainFactor: 1.42,
      arena: THIRD_ACT_PROOF_ARENA,
      ascensionCarrierType: "binder",
      hazard: {
        label: "Crownhold Relay",
        type: "relay",
        interval: 9.6,
        count: 1,
        radius: 92,
        telegraph: 0.84,
        duration: 5.6,
        damage: 13,
        coreHp: 60,
        coreRadius: 18,
        relayRange: 500,
        relayWidth: 30,
        relayDamage: 14,
      },
    },
    {
      id: "starforge",
      label: "Wave 11 · Starforge",
      pressureFamily: "crossfire",
      duration: 96,
      spawnBudget: 176,
      activeCap: 30,
      baseSpawnInterval: 0.386,
      spawnIntervalMin: 0.116,
      spawnAcceleration: 0.28,
      eliteEvery: 5,
      mix: {
        scuttler: 0.08,
        brute: 0.14,
        shrike: 0.16,
        skimmer: 0.18,
        lancer: 0.2,
        brander: 0.12,
        binder: 0.04,
        mortar: 0.02,
        warden: 0.04,
      },
      note: "두 웨이브 payoff band 뒤의 숨 고르기 lap이다. drift furnace 하나만 남기고 binder·mortar 세금을 크게 걷어, headline late form이 열린 gallery를 실제로 오래 소유하는 시간을 먼저 준다.",
      directive:
        "starforge gallery. drifting furnace 하나가 lane 하나만 천천히 접는다. 가장 넓은 pocket을 먼저 먹고 split fire로 flank 둘을 오래 눌러, final breach 전에 late form의 sweep 폭을 마음껏 누려야 한다.",
      driveGainFactor: 1.44,
      arena: THIRD_ACT_PAYOFF_ARENA,
      ascensionCarrierType: "binder",
      hazard: {
        label: "Starforge Drift",
        type: "drift",
        interval: 11.2,
        count: 1,
        radius: 88,
        telegraph: 0.88,
        duration: 4.6,
        damage: 13,
        driftSpeed: 96,
        driftOrbit: 0.24,
      },
    },
    {
      id: "cindercrown",
      label: "Wave 12 · Cinder Crown",
      pressureFamily: "breach",
      duration: 104,
      spawnBudget: 190,
      activeCap: 35,
      baseSpawnInterval: 0.344,
      spawnIntervalMin: 0.104,
      spawnAcceleration: 0.31,
      eliteEvery: 5,
      mix: {
        scuttler: 0.06,
        brute: 0.18,
        shrike: 0.16,
        skimmer: 0.1,
        lancer: 0.22,
        brander: 0.1,
        binder: 0.04,
        mortar: 0.02,
        warden: 0.06,
      },
      note: "최종 전장은 더 이상 tax return이 아니다. 긴 crownline corridor 하나만 남기고 binder·mortar upkeep를 크게 덜어, Wave 11에서 벌어 둔 lane ownership를 마지막 돌파 창으로 직접 결산하게 만든다.",
      directive:
        "cinder crown crownline breach. 가장 얇은 relay corridor를 먼저 찢고 lancer wedge를 흘리며 열린 pocket을 오래 지켜야 한다. 먼 pylon만 보는 대신 split fire로 양측 flank를 같이 눌러 breach window를 직접 연장해야 한다.",
      driveGainFactor: 1.52,
      arena: AFTERBURN_ENDURANCE_ARENA,
      ascensionCarrierType: "binder",
      hazard: {
        label: "Cinder Crown Crownline",
        type: "relay",
        interval: 8.8,
        count: 2,
        radius: 84,
        telegraph: 0.78,
        duration: 4.8,
        damage: 15,
        coreHp: 68,
        coreRadius: 19,
        relayRange: 536,
        relayWidth: 32,
        relayDamage: 14,
      },
      completesRun: true,
    },
  ];

  const SHARED_LATE_ACT_ENCOUNTER_POOL = {
    8: {
      label: "Wave 9 · Lockgrid Gallery",
      bandId: "lockgrid_gallery",
      bandLabel: "Lockgrid Gallery",
      bandFocusId: "doctrine_capstone",
      pressureFamily: "crossfire",
      note: "Act 3 첫 밴드는 doctrine breakpoint 직후의 deliberate payoff window다. 첫 판은 truly open-lane gallery로 열어, 막 굳은 body/gun form이 측면 sweep와 lancer 돌입을 얼마나 넓게 잘라내는지 upkeep 없이 먼저 즐기게 만든다.",
      directive:
        "lockgrid gallery. skimmer가 외곽 회전선을 긁고 lancer가 직선 charge로 중앙을 찌르지만, ask는 절차가 아니라 lane ownership이다. 가장 넓은 flank를 먼저 비우고 charge 각을 흘리며 새 late form의 sweep 폭을 오래 유지해야 한다.",
      driveGainFactor: 1.4,
      arena: THIRD_ACT_PAYOFF_ARENA,
      activeCap: 28,
      spawnBudget: 150,
      mix: {
        scuttler: 0.08,
        brute: 0.14,
        shrike: 0.16,
        skimmer: 0.3,
        lancer: 0.22,
        mortar: 0.04,
        warden: 0.08,
      },
      hazard: {
        label: "Lockgrid Gallery Surge",
        type: null,
        interval: 10.8,
        count: 1,
        radius: 70,
        telegraph: 0.92,
        duration: 3.8,
        damage: 13,
      },
    },
    9: {
      label: "Wave 10 · Crownhold Proof",
      bandId: "crownhold_proof",
      bandLabel: "Crownhold Proof",
      bandFocusId: "doctrine_capstone",
      pressureFamily: "breach",
      note: "두 번째 판은 caravan chase가 아니라 single crownline proof다. Lockgrid Gallery에서 벌어 둔 ownership를 그대로 들고 와 relay crown 하나를 찢어야 하므로, late form이 lane을 얼마나 길게 잠그는지가 직접 드러난다.",
      directive:
        "crownhold proof. relay crown 하나가 proof lane을 늦게 but hard하게 조인다. skimmer sweep와 lancer wedge가 열린 복도를 흔들기 전에 가장 얇은 flank를 먼저 찢고 breach hold를 길게 유지해야 한다.",
      driveGainFactor: 1.44,
      arena: THIRD_ACT_PROOF_ARENA,
      activeCap: 30,
      spawnBudget: 162,
      mix: {
        scuttler: 0.06,
        brute: 0.14,
        shrike: 0.16,
        skimmer: 0.2,
        lancer: 0.22,
        binder: 0.04,
        mortar: 0.04,
        warden: 0.08,
        brander: 0.08,
      },
      hazard: {
        label: "Crownhold Relay",
        type: "relay",
        interval: 9.6,
        count: 1,
        radius: 92,
        telegraph: 0.84,
        duration: 5.6,
        damage: 13,
        coreHp: 60,
        coreRadius: 18,
        relayRange: 500,
        relayWidth: 30,
        relayDamage: 14,
      },
    },
    10: {
      label: "Wave 11 · Starforge Gallery",
      bandId: "starforge_gallery",
      bandLabel: "Starforge Gallery",
      bandFocusId: "late_form",
      pressureFamily: "crossfire",
      note: "두 칸짜리 payoff band 뒤의 domination lap이다. drift furnace 하나만 남기고 upkeep 세금을 크게 걷어, 방금 잠긴 chassis/weapon leap가 넓은 lane 둘을 오래 지우는 감각을 먼저 즐기게 만든다.",
      directive:
        "starforge gallery. drifting furnace 하나가 lane 하나만 느리게 접는다. 가장 넓은 pocket을 먼저 먹고 split fire로 flank 둘을 오래 눌러, final crown breach 전에 새 form의 전장 점유 시간을 크게 벌어야 한다.",
      driveGainFactor: 1.44,
      arena: THIRD_ACT_PAYOFF_ARENA,
      activeCap: 30,
      spawnBudget: 176,
      mix: {
        scuttler: 0.08,
        brute: 0.14,
        shrike: 0.16,
        skimmer: 0.18,
        lancer: 0.2,
        brander: 0.12,
        binder: 0.04,
        mortar: 0.02,
        warden: 0.04,
      },
      hazard: {
        label: "Starforge Drift",
        type: "drift",
        interval: 11.2,
        count: 1,
        radius: 88,
        telegraph: 0.88,
        duration: 4.6,
        damage: 13,
        driftSpeed: 96,
        driftOrbit: 0.24,
      },
    },
    11: {
      pressureFamily: "breach",
      label: "Wave 12 · Cinder Crown",
      bandId: "cinder_crown_break",
      bandLabel: "Cinder Crown",
      bandFocusId: "late_form",
      note: "추격 시험 다음엔 최종 crown breach 한 판만 남긴다. 긴 relay corridor 하나만 남기고 upkeep tax를 덜어, headline form이 lane을 찢는 힘과 rider 축이 버티는 시간이 같은 전투 안에서 함께 드러나게 만든다.",
      directive:
        "cinder crown crownline breach. relay pylon을 멀리서만 끊을 수는 없다. 가장 얇은 corridor를 직접 찢고 rider 생존축으로 열린 pocket을 오래 버텨 breach window를 연장해야 한다.",
      driveGainFactor: 1.56,
      arena: AFTERBURN_ENDURANCE_ARENA,
      activeCap: 35,
      spawnBudget: 190,
      mix: {
        scuttler: 0.08,
        brute: 0.18,
        shrike: 0.16,
        lancer: 0.22,
        brander: 0.1,
        binder: 0.04,
        mortar: 0.02,
        warden: 0.06,
      },
      hazard: {
        label: "Cinder Crown Crownline",
        type: "relay",
        interval: 8.8,
        count: 2,
        radius: 84,
        telegraph: 0.78,
        duration: 4.8,
        damage: 15,
        coreHp: 68,
        coreRadius: 19,
        relayRange: 536,
        relayWidth: 32,
        relayDamage: 14,
      },
    },
  };

  const MAX_WAVES = WAVE_CONFIG.length;
  const POST_WAVE_LOOT_GRACE = 2.4;
  const COMBAT_CACHE_DROP_LIFE = 14;
  const PREDATOR_BAIT_START_WAVE = 9;
  const POST_CAPSTONE_WAVE_COUNT = 7;
  const RISK_MUTATION_START_WAVE = 9;
  const MAX_RISK_MUTATION_LEVEL = 6;
  const FINAL_CASHOUT_DURATION = 12;
  const FINAL_CASHOUT_SPAWN_BUDGET = 26;
  const POST_CAPSTONE_WAVE_LABELS = [
    "Afterburn I",
    "Afterburn II",
    "Afterburn III",
    "Afterburn IV",
    "Afterburn V",
    "Afterburn VI",
    "Afterburn VII",
  ];
  const POST_CAPSTONE_ENCOUNTER_POOL = [
    {
      waveIndex: 8,
      pressureFamily: "crossfire",
      arena: AFTERBURN_ENDURANCE_ARENA,
      note: "첫 afterburn은 완성된 doctrine form을 바로 오래 몰게 만드는 endurance band의 입구다. relay나 territory upkeep를 치우고 살아 있는 교차 압박만 남겨, 넓어진 금지 구역에서 flank sweep과 greed dive를 몇 번이나 연속으로 해낼 수 있는지 먼저 묻는다.",
      directive:
        "afterburn surge gauntlet. 구조물 코어 없이 다중 surge와 skimmer 훑기, lancer 돌입만 계속 겹친다. route repair보다 먼저 어느 lane을 비우고 어느 scrap line까지 greed할지 연속으로 결정해야 한다.",
      mix: {
        scuttler: 0.08,
        brute: 0.14,
        shrike: 0.16,
        skimmer: 0.26,
        lancer: 0.22,
        mortar: 0.04,
        warden: 0.1,
      },
      mixWeight: 0.52,
      ascensionCarrierType: "binder",
      hazard: {
        label: "Afterburn Surge Gauntlet",
        interval: 7.6,
        count: 4,
        radius: 86,
        telegraph: 0.72,
        duration: 4.9,
        damage: 15,
      },
    },
    {
      waveIndex: 10,
      pressureFamily: "pursuit",
      arena: AFTERBURN_ENDURANCE_ARENA,
      note: "두 번째 afterburn도 아직 upkeep보다 추격 압박 쪽에 무게를 둔다. drifting furnace와 재진입 무리가 전장을 크게 휘게 만들 뿐 고정 코어는 거의 없어서, 완성된 차체가 긴 사선과 대시 회복을 실제로 얼마나 오래 살리는지 드러난다.",
      directive:
        "afterburn reentry pursuit. drift core가 lane을 밀어내는 동안 shrike와 lancer가 바깥에서 다시 접속한다. 추격 덩어리를 크게 꺾으며 긴 화선을 유지할지, 중앙으로 찢고 짧게 회전할지 매번 갈라진다.",
      mix: {
        scuttler: 0.06,
        brute: 0.18,
        shrike: 0.24,
        skimmer: 0.16,
        lancer: 0.18,
        binder: 0.04,
        mortar: 0.08,
        warden: 0.08,
      },
      mixWeight: 0.5,
      ascensionCarrierType: "binder",
      hazard: {
        label: "Afterburn Reentry Drift",
        type: "drift",
        interval: 7.4,
        count: 3,
        radius: 92,
        telegraph: 0.68,
        duration: 6.4,
        damage: 15,
        driftSpeed: 132,
        driftOrbit: 0.48,
      },
    },
    {
      waveIndex: 8,
      pressureFamily: "crossfire",
      arena: AFTERBURN_ENDURANCE_ARENA,
      note: "세 번째 afterburn도 아직은 전투-first band를 유지한다. objective core 없이 skimmer 회전선, shrike 재진입, warder 차폐가 겹쳐 넓은 공방 한가운데에서 '지금 밀어붙일지, 바깥을 먼저 깎을지'를 반복해서 시험한다.",
      directive:
        "afterburn crosswind. 구조물 대신 교차 진입선이 길게 겹친다. skimmer 외곽 sweep를 먼저 접을지, lancer charge 각을 bait하며 중앙 화선을 유지할지 직접 선택해야 한다.",
      mix: {
        scuttler: 0.06,
        brute: 0.16,
        shrike: 0.18,
        skimmer: 0.22,
        lancer: 0.2,
        mortar: 0.04,
        warden: 0.14,
      },
      mixWeight: 0.54,
      ascensionCarrierType: "binder",
      hazard: {
        label: "Afterburn Crosswind",
        interval: 7.1,
        count: 5,
        radius: 88,
        telegraph: 0.7,
        duration: 4.8,
        damage: 16,
      },
    },
    {
      waveIndex: 10,
      pressureFamily: "caravan",
      arena: AFTERBURN_ENDURANCE_ARENA,
      note: "네 번째 afterburn은 밀도를 잠깐 덜어 주는 대신 움직이는 greed target을 던진다. contraband caravan이 외곽 lane을 따라 도망치므로, 완성된 form이 chase angle을 만들지 압박 덩어리만 계속 정리할지 선택해야 late-run spacing이 달라진다.",
      directive:
        "afterburn smuggler run. contraband caravan이 외곽 arc를 따라 도망친다. chase를 걸면 큰 scrap burst를 얻지만 flank sweep를 깊게 받아내야 하므로, 지금 greed line을 밟을지 pressure clump부터 접을지 직접 정해야 한다.",
      activeCap: 40,
      spawnBudget: 228,
      mix: {
        scuttler: 0.06,
        brute: 0.16,
        shrike: 0.18,
        skimmer: 0.2,
        lancer: 0.16,
        brander: 0.14,
        mortar: 0.06,
        warden: 0.04,
      },
      mixWeight: 0.42,
      hazard: {
        label: "Afterburn Smuggler Run",
        type: "caravan",
        interval: 8.4,
        count: 2,
        radius: 82,
        telegraph: 0.76,
        duration: 7.8,
        damage: 14,
        coreHp: 88,
        coreRadius: 18,
        salvageScrap: 26,
        salvageBurstCount: 6,
        salvageBurstRadius: 62,
        salvageDropLife: 8.8,
        driftSpeed: 128,
        driftOrbit: 0.34,
      },
    },
    {
      waveIndex: 10,
      pressureFamily: "caravan",
      arena: AFTERBURN_ENDURANCE_ARENA,
      note: "다섯 번째 afterburn도 같은 caravan ecology를 한 번 더 유지하되 추격선과 후열 포격을 더 키운다. 밀도는 직전 교차전보다 조금 비워 두고, moving vault를 끝까지 쫓아 자를 build인지 아닌지를 더 명확하게 갈라낸다.",
      directive:
        "afterburn smuggler run. caravan이 더 빠르게 도망치고 mortar 후열이 chase lane을 압박한다. 금고를 잡으러 깊게 들어가 late scrap를 긁을지, 카라반을 버리고 안전한 외곽 회전으로 다음 bracket을 볼지 판단해야 한다.",
      activeCap: 42,
      spawnBudget: 244,
      mix: {
        scuttler: 0.04,
        brute: 0.18,
        shrike: 0.22,
        skimmer: 0.16,
        lancer: 0.16,
        brander: 0.08,
        mortar: 0.1,
        warden: 0.06,
      },
      mixWeight: 0.48,
      hazard: {
        label: "Afterburn Smuggler Run",
        type: "caravan",
        interval: 7.8,
        count: 3,
        radius: 86,
        telegraph: 0.7,
        duration: 8.2,
        damage: 15,
        coreHp: 96,
        coreRadius: 19,
        salvageScrap: 30,
        salvageBurstCount: 7,
        salvageBurstRadius: 66,
        salvageDropLife: 8.8,
        driftSpeed: 138,
        driftOrbit: 0.4,
      },
    },
    {
      waveIndex: 10,
      pressureFamily: "pursuit",
      note: "여섯 번째 afterburn은 pursuit grammar를 다시 끌어올리되 더 공격적으로 뒤섞는다. pressure clump가 빠르게 다시 생기므로, 한 번 강한 dive로 길을 열 수 있는 build일수록 오래 산다.",
      directive:
        "starforge reentry. drifting furnace가 더 자주 갈아 끼워지고 shrike 재진입과 mortar 탄막이 퇴로를 겹쳐 닫는다. overextend를 감수해도 압박 덩어리를 먼저 찢는 편이 살아남기 쉽다.",
      mix: {
        scuttler: 0.06,
        brute: 0.18,
        shrike: 0.3,
        mortar: 0.22,
        warden: 0.24,
      },
      mixWeight: 0.5,
      hazard: {
        label: "Starforge Reentry",
        type: "drift",
        interval: 7.8,
        count: 3,
        radius: 92,
        telegraph: 0.66,
        duration: 6.2,
        damage: 16,
        driftSpeed: 126,
        driftOrbit: 0.45,
      },
    },
    {
      waveIndex: 10,
      pressureFamily: "crossfire",
      arena: AFTERBURN_ENDURANCE_ARENA,
      note: "마지막 afterburn도 더는 territory hold로 닫히지 않는다. 구조물 upkeep 없이 drifting furnace, 재진입 추격선, ignition pocket만 남겨 completed doctrine이 열린 금지 구역에서 몇 분 더 자신의 endform만 믿고 버티게 만든다.",
      directive:
        "afterburn endform run. drift wake와 ignition pocket, shrike 재진입이 넓은 공방 전역을 계속 다시 섞는다. 코어 repair 없이 가장 얇은 flank를 먼저 찢고, greed line을 언제까지 유지할지 끝까지 직접 결정해야 한다.",
      mix: {
        scuttler: 0.04,
        brute: 0.14,
        shrike: 0.24,
        skimmer: 0.14,
        lancer: 0.18,
        brander: 0.16,
        mortar: 0.05,
        warden: 0.05,
      },
      mixWeight: 0.58,
      hazard: {
        label: "Afterburn Endform Run",
        type: "drift",
        interval: 6.6,
        count: 4,
        radius: 102,
        telegraph: 0.62,
        duration: 6.8,
        damage: 17,
        driftSpeed: 144,
        driftOrbit: 0.58,
      },
    },
  ];
  const POST_CAPSTONE_ASCENSION_PROFILE = [
    {
      durationBonus: 6,
      spawnBudgetBonus: 24,
      activeCapBonus: 2,
      baseSpawnScale: 0.94,
      minSpawnScale: 0.97,
      hazardIntervalScale: 0.92,
      hazardTelegraphScale: 0.94,
      hazardCountBonus: 0,
      hazardDamageBonus: 2,
      hazardCoreHpBonus: 10,
      hazardRelayDamageBonus: 1,
      driveGainFloor: 1.58,
      apexSpawnTimer: 7.8,
    },
    {
      durationBonus: 10,
      spawnBudgetBonus: 36,
      activeCapBonus: 4,
      baseSpawnScale: 0.89,
      minSpawnScale: 0.93,
      hazardIntervalScale: 0.86,
      hazardTelegraphScale: 0.9,
      hazardCountBonus: 1,
      hazardDamageBonus: 3,
      hazardCoreHpBonus: 18,
      hazardRelayDamageBonus: 2,
      driveGainFloor: 1.68,
      apexSpawnTimer: 6.9,
    },
    {
      durationBonus: 14,
      spawnBudgetBonus: 52,
      activeCapBonus: 6,
      baseSpawnScale: 0.85,
      minSpawnScale: 0.9,
      hazardIntervalScale: 0.82,
      hazardTelegraphScale: 0.86,
      hazardCountBonus: 1,
      hazardDamageBonus: 4,
      hazardCoreHpBonus: 28,
      hazardRelayDamageBonus: 3,
      driveGainFloor: 1.8,
      apexSpawnTimer: 6,
    },
    {
      durationBonus: 18,
      spawnBudgetBonus: 68,
      activeCapBonus: 8,
      baseSpawnScale: 0.82,
      minSpawnScale: 0.88,
      hazardIntervalScale: 0.78,
      hazardTelegraphScale: 0.82,
      hazardCountBonus: 1,
      hazardDamageBonus: 5,
      hazardCoreHpBonus: 36,
      hazardRelayDamageBonus: 4,
      driveGainFloor: 1.9,
      apexSpawnTimer: 5.5,
    },
    {
      durationBonus: 22,
      spawnBudgetBonus: 84,
      activeCapBonus: 9,
      baseSpawnScale: 0.79,
      minSpawnScale: 0.86,
      hazardIntervalScale: 0.74,
      hazardTelegraphScale: 0.78,
      hazardCountBonus: 2,
      hazardDamageBonus: 6,
      hazardCoreHpBonus: 46,
      hazardRelayDamageBonus: 5,
      driveGainFloor: 2,
      apexSpawnTimer: 5.1,
    },
    {
      durationBonus: 26,
      spawnBudgetBonus: 100,
      activeCapBonus: 11,
      baseSpawnScale: 0.76,
      minSpawnScale: 0.84,
      hazardIntervalScale: 0.7,
      hazardTelegraphScale: 0.76,
      hazardCountBonus: 2,
      hazardDamageBonus: 7,
      hazardCoreHpBonus: 56,
      hazardRelayDamageBonus: 6,
      driveGainFloor: 2.08,
      apexSpawnTimer: 4.7,
    },
    {
      durationBonus: 30,
      spawnBudgetBonus: 118,
      activeCapBonus: 12,
      baseSpawnScale: 0.74,
      minSpawnScale: 0.82,
      hazardIntervalScale: 0.68,
      hazardTelegraphScale: 0.72,
      hazardCountBonus: 2,
      hazardDamageBonus: 8,
      hazardCoreHpBonus: 68,
      hazardRelayDamageBonus: 7,
      driveGainFloor: 2.16,
      apexSpawnTimer: 4.4,
    },
  ];
  const ENCOUNTER_PRESSURE_FAMILIES = {
    crossfire: {
      mix: {
        scuttler: 0.06,
        brute: 0.12,
        shrike: 0.12,
        skimmer: 0.34,
        lancer: 0.24,
        mortar: 0.04,
        warden: 0.08,
      },
      mixWeight: 0.58,
      hazard: {
        countBonus: 1,
        telegraphScale: 0.92,
        intervalScale: 0.94,
        radiusBonus: 4,
      },
    },
    raid: {
      mix: {
        scuttler: 0.08,
        brute: 0.14,
        shrike: 0.18,
        skimmer: 0.12,
        lancer: 0.12,
        binder: 0.24,
        mortar: 0.04,
        warden: 0.08,
      },
      mixWeight: 0.56,
      hazard: {
        countBonus: 1,
        telegraphScale: 0.9,
        intervalScale: 0.92,
        durationBonus: 0.8,
        coreHpBonus: -6,
        salvageScrapBonus: 4,
        salvageBurstCountBonus: 1,
        salvageBurstRadiusBonus: 8,
      },
    },
    caravan: {
      mix: {
        scuttler: 0.04,
        brute: 0.14,
        shrike: 0.18,
        skimmer: 0.24,
        lancer: 0.18,
        brander: 0.12,
        mortar: 0.06,
        warden: 0.04,
      },
      mixWeight: 0.54,
      hazard: {
        countBonus: 1,
        telegraphScale: 0.9,
        intervalScale: 0.9,
        durationBonus: 0.8,
        radiusBonus: 4,
        coreHpBonus: 6,
        salvageScrapBonus: 6,
        salvageBurstCountBonus: 1,
        salvageBurstRadiusBonus: 10,
        driftSpeedBonus: 10,
        driftOrbitBonus: 0.06,
      },
    },
    pursuit: {
      mix: {
        scuttler: 0.08,
        brute: 0.16,
        shrike: 0.2,
        skimmer: 0.1,
        lancer: 0.14,
        binder: 0.22,
        mortar: 0.06,
        warden: 0.04,
      },
      mixWeight: 0.58,
      hazard: {
        countBonus: 1,
        telegraphScale: 0.88,
        intervalScale: 0.9,
        radiusBonus: 6,
        durationBonus: 0.6,
        driftSpeedBonus: 14,
        driftOrbitBonus: 0.08,
      },
    },
    breach: {
      mix: {
        scuttler: 0.04,
        brute: 0.18,
        shrike: 0.12,
        skimmer: 0.08,
        lancer: 0.18,
        binder: 0.24,
        mortar: 0.06,
        warden: 0.1,
      },
      mixWeight: 0.6,
      hazard: {
        countBonus: 1,
        telegraphScale: 0.94,
        intervalScale: 0.93,
        coreHpBonus: 8,
        radiusBonus: 6,
        relayRangeBonus: 24,
        relayWidthBonus: 4,
        relayDamageBonus: 1,
      },
    },
    hold: {
      mix: {
        scuttler: 0.04,
        brute: 0.24,
        shrike: 0.1,
        skimmer: 0.08,
        lancer: 0.08,
        binder: 0.22,
        mortar: 0.08,
        warden: 0.16,
      },
      mixWeight: 0.62,
      hazard: {
        countBonus: 1,
        telegraphScale: 0.94,
        intervalScale: 0.92,
        durationBonus: 0.8,
        radiusBonus: 6,
        coreHpBonus: 12,
        turretIntervalBonus: -0.08,
        turretDamageBonus: 1,
        enemyPullRadiusBonus: 16,
      },
    },
  };
  const RISK_MUTATION_CORE_DEFS = {
    ember: {
      title: "Ember Talon Molt",
      tag: "TALON",
      traitLabel: "talon rack",
      description:
        "주포 위에 발화 갈퀴 포대를 덧대 정면 사선에 split talon volley를 얹는다. 고를수록 다음 웨이브 spawn 압박과 hazard 세금도 함께 뛰어오른다.",
      slotText: "split talon 증설 · 다음 웨이브 압박 과세",
      bodyLabel: "Talon Rack Hull",
      bodyText: "상부 갈퀴 포문과 측면 배기관이 열려 직선 교전을 더 공격적으로 밀어붙이는 과열 선체다.",
      color: "#ffb56b",
    },
    scatter: {
      title: "Shrapnel Bloom Molt",
      tag: "BLOOM",
      traitLabel: "bloom rack",
      description:
        "산탄 코어 바깥에 추가 bloom rack을 벌려 측면 파편 salvo를 덧댄다. 대신 다음 웨이브는 더 많은 적과 거친 hazard로 판돈을 청구한다.",
      slotText: "bloom rack 증설 · 다음 웨이브 압박 과세",
      bodyLabel: "Bloom Rack Hull",
      bodyText: "옆구리에 파편 꽃잎 포문이 열린 근접 압박 선체다.",
      color: "#ffd38a",
    },
    lance: {
      title: "Vector Fork Molt",
      tag: "FORK",
      traitLabel: "fork lattice",
      description:
        "주포 앞에 vector fork 격자를 덧대 주빔 양옆으로 보조 lance를 흘린다. 더 깊게 고를수록 다음 웨이브가 더 빨리 닫힌다.",
      slotText: "fork lattice 증설 · 다음 웨이브 압박 과세",
      bodyLabel: "Fork Lattice Frame",
      bodyText: "전면 fork 레일이 자라 먼 코어와 후열을 동시에 찢는 추격 프레임이다.",
      color: "#9fe7ff",
    },
    ricochet: {
      title: "Mirror Lash Molt",
      tag: "LASH",
      traitLabel: "mirror lash",
      description:
        "반사 코어 옆에 mirror lash 송신기를 붙여 갈라지는 보조 탄을 추가한다. 대신 다음 웨이브는 봉쇄선과 폭주가 함께 더 난폭해진다.",
      slotText: "mirror lash 증설 · 다음 웨이브 압박 과세",
      bodyLabel: "Mirror Lash Frame",
      bodyText: "후미 안테나가 뻗어 반사각을 더 공격적으로 벌리는 교란 프레임이다.",
      color: "#7dd0c5",
    },
  };
  const KILN_BASTION_FIELD_BASE = {
    radiusFactor: 0.24,
    enemyDamage: 7,
    coreDamage: 8,
    enemySlow: 0.82,
    repairInterval: 1.15,
    repairAmount: 2.5,
    drivePerSecond: 1.4,
    heatFactor: 1.45,
    damageMitigation: 0.18,
  };
  const KILN_BASTION_FIELD_CAPSTONE = {
    radiusFactor: 0.32,
    enemyDamage: 12,
    coreDamage: 13,
    enemySlow: 0.7,
    repairInterval: 0.72,
    repairAmount: 4.5,
    drivePerSecond: 2.4,
    heatFactor: 1.9,
    damageMitigation: 0.32,
  };
  const RELAY_HAZARD_DOCTRINE_BONUS = {
    storm_artillery: 1.35,
    kiln_bastion: 0.85,
  };
  const RELAY_HAZARD_CAPSTONE_BONUS = {
    sky_lance_battery: 1.35,
    stormspire_needle: 1.55,
  };
  const AFTERBURN_ASCENSION_DROP_LIFE = 14;
  const AFTERBURN_OVERDRIVE_START_STAGE = 3;
  const AFTERBURN_OVERDRIVE_DROP_LIFE = 14;
  const AFTERBURN_DOMINION_START_STAGE = 4;
  const AFTERBURN_DOMINION_DROP_LIFE = 14;
  const STORM_ARTILLERY_AFTERBURN_ENDFORM_DEFS = {
    sky_lance_battery: {
      bodyLabel: "Vector Battery Frame",
      bodyText: "dash stock +1 · dash recovery +0.42s · move speed +16",
      statusNote:
        "Sky Lance Battery가 차체를 벡터 포대 프레임으로 갈아 끼워 더 자주 lane을 넘나들며 넓은 천공망을 직접 깐다.",
      applyPlayer(stats) {
        stats.moveSpeed += 16;
        stats.dashMax += 1;
        stats.dashCooldown = clamp(stats.dashCooldown - 0.42, 1.2, 3.2);
      },
    },
    stormspire_needle: {
      bodyLabel: "Siege Spine Frame",
      bodyText: "max HP +18 · hazard mitigation +8% · move speed -10",
      statusNote:
        "Stormspire Needle이 차체를 공성 척추 프레임으로 바꿔 느려지는 대신 더 두껍게 버티며 정지 사격 각을 길게 잡게 만든다.",
      applyPlayer(stats) {
        stats.maxHp += 18;
        stats.moveSpeed -= 10;
        stats.hazardMitigation = clamp(stats.hazardMitigation + 0.08, 0, 0.45);
      },
    },
  };
  const AFTERBURN_DOMINION_DEFS = {
    ember: {
      id: "ember",
      tag: "DOMINION",
      title: "Cinder Dominion",
      label: "Cinder Dominion",
      traitLabel: "sovereign crown",
      description:
        "Wave 12 이후 endurance 변형에서 뜯어낼 수 있는 dominion splice다. Ember 코어 위에 왕관 포문과 측면 열배기관을 붙여 주포가 더 넓은 지배 화망으로 다시 벌어진다.",
      slotText: "왕관 포문 +4 · 다음 웨이브 Dominion Run",
      bodyLabel: "Sovereign Crown Frame",
      bodyText: "전방 왕관 포문과 측면 열배기관이 동시에 열려 정면 압박을 밀어붙이는 endform 차체다.",
      color: "#ffb56b",
    },
    scatter: {
      id: "scatter",
      tag: "DOMINION",
      title: "Shrapnel Dominion",
      label: "Shrapnel Dominion",
      traitLabel: "bloom throne",
      description:
        "Wave 12 이후 endurance 변형에서 뜯어낼 수 있는 dominion splice다. Scatter 코어 바깥에 bloom throne 포문을 더 붙여 근중거리 전체를 파편 왕관으로 덮는다.",
      slotText: "왕관 파편열 +5 · 다음 웨이브 Dominion Run",
      bodyLabel: "Bloom Throne Hull",
      bodyText: "양옆 bloom rack과 상부 파편 포문이 같이 벌어져 근접 지배 구간을 만들어 내는 endform 차체다.",
      color: "#ffd38a",
    },
    lance: {
      id: "lance",
      tag: "DOMINION",
      title: "Vector Dominion",
      label: "Vector Dominion",
      traitLabel: "fork throne",
      description:
        "Wave 12 이후 endurance 변형에서 뜯어낼 수 있는 dominion splice다. Lance 코어 앞에 fork throne 레일을 세워 직선 천공이 세 줄 dominance cut으로 바뀐다.",
      slotText: "fork beam +2 · 다음 웨이브 Dominion Run",
      bodyLabel: "Fork Throne Frame",
      bodyText: "전방 삼중 레일과 측면 stabilizer spine이 자라 lane 하나를 통째로 지워 버리는 endform 차체다.",
      color: "#9fe7ff",
    },
    ricochet: {
      id: "ricochet",
      tag: "DOMINION",
      title: "Mirror Dominion",
      label: "Mirror Dominion",
      traitLabel: "lash throne",
      description:
        "Wave 12 이후 endurance 변형에서 뜯어낼 수 있는 dominion splice다. Ricochet 코어에 lash throne 송신기를 붙여 갈라진 탄들이 더 깊게 튀며 추적을 지배한다.",
      slotText: "lash volley +3 · 다음 웨이브 Dominion Run",
      bodyLabel: "Lash Throne Frame",
      bodyText: "후미 송신기와 측면 거울판이 길게 뻗어 반사 탄막을 주인공 화력으로 끌어올리는 endform 차체다.",
      color: "#7dd0c5",
    },
  };

  function getAfterburnDominionDef(buildOrId) {
    if (!buildOrId) {
      return null;
    }
    const dominionId =
      typeof buildOrId === "object" ? buildOrId.afterburnDominionId || null : buildOrId;
    return dominionId ? AFTERBURN_DOMINION_DEFS[dominionId] || null : null;
  }

  function shouldOfferAfterburnDominion(build, stageIndex) {
    if (
      !build ||
      build.afterburnDominionId ||
      !Number.isFinite(stageIndex) ||
      stageIndex < AFTERBURN_DOMINION_START_STAGE ||
      stageIndex >= POST_CAPSTONE_WAVE_COUNT - 1
    ) {
      return false;
    }
    return Boolean(
      build.afterburnOverdriveId ||
      getSelectedFinaleVariant(build) ||
      build.lateAscensionId ||
      build.doctrineCapstoneId ||
      build.lateFieldConvergenceId
    );
  }

  function getAfterburnDominionChoices(build) {
    const dominion = build ? AFTERBURN_DOMINION_DEFS[build.coreId] || null : null;
    if (!build || !dominion || !shouldOfferAfterburnDominion(build, AFTERBURN_DOMINION_START_STAGE)) {
      return [];
    }
    return [
      {
        type: "utility",
        action: "afterburn_dominion",
        id: `utility:afterburn_dominion:${dominion.id}`,
        verb: "강림",
        tag: dominion.tag,
        title: dominion.title,
        description: dominion.description,
        slotText: dominion.slotText,
        cost: 0,
        afterburnDominionId: dominion.id,
        bodyLabel: dominion.bodyLabel,
        bodyText: dominion.bodyText,
        laneLabel: "Dominion Break",
        forgeLaneLabel: "Dominion Break",
      },
    ];
  }

  function getDoctrineLiveAscensionBody(capstoneOrId) {
    const capstone =
      typeof capstoneOrId === "object" ? capstoneOrId : getDoctrineCapstoneDef(capstoneOrId);
    if (!capstone) {
      return { bodyLabel: null, bodyText: null };
    }
    if (capstone.id === "relay_storm_lattice") {
      return {
        bodyLabel: "Stormglass Rake Frame",
        bodyText: "측면 분광 익판과 전방 절개 척추가 붙어 반사 벽과 직접 조준을 한 몸처럼 밀어붙이는 추격 섀시다.",
      };
    }
    if (capstone.id === "bulwark_foundry") {
      return {
        bodyLabel: "Foundry Carapace",
        bodyText: "거점장 안에서 냉각과 복구가 크게 강화되고, 남은 late waves도 이 pocket-chassis 위에서 이어진다.",
      };
    }
    const stormEndform = getStormArtilleryAfterburnEndform(capstone.id);
    return stormEndform
      ? {
          bodyLabel: stormEndform.bodyLabel,
          bodyText: stormEndform.bodyText,
        }
      : { bodyLabel: null, bodyText: null };
  }

  function getArenaSize(config = null) {
    const arena =
      config && config.arena
        ? config.arena
        : config && Number.isFinite(config.width) && Number.isFinite(config.height)
          ? config
          : null;
    return {
      width: arena && Number.isFinite(arena.width) ? arena.width : ARENA_WIDTH,
      height: arena && Number.isFinite(arena.height) ? arena.height : ARENA_HEIGHT,
    };
  }

  function sanitizeHazardForType(hazard) {
    if (!hazard) {
      return hazard;
    }
    const nextHazard = { ...hazard };
    const clearFields = (fields) => {
      fields.forEach((field) => {
        delete nextHazard[field];
      });
    };
    if (nextHazard.type === "territory") {
      clearFields([
        "relayRange",
        "relayWidth",
        "relayDamage",
        "driftSpeed",
        "driftOrbit",
        "salvageScrap",
        "salvageBurstCount",
        "salvageBurstRadius",
        "salvageDropLife",
      ]);
      return nextHazard;
    }
    if (nextHazard.type === "relay") {
      clearFields([
        "turretInterval",
        "turretDamage",
        "turretSpeed",
        "enemyPullRadius",
        "driftSpeed",
        "driftOrbit",
        "salvageScrap",
        "salvageBurstCount",
        "salvageBurstRadius",
        "salvageDropLife",
      ]);
      return nextHazard;
    }
    if (nextHazard.type === "salvage") {
      clearFields([
        "turretInterval",
        "turretDamage",
        "turretSpeed",
        "enemyPullRadius",
        "relayRange",
        "relayWidth",
        "relayDamage",
        "driftSpeed",
        "driftOrbit",
      ]);
      return nextHazard;
    }
    if (nextHazard.type === "caravan") {
      clearFields([
        "turretInterval",
        "turretDamage",
        "turretSpeed",
        "enemyPullRadius",
        "relayRange",
        "relayWidth",
        "relayDamage",
      ]);
      return nextHazard;
    }
    if (nextHazard.type === "drift") {
      clearFields([
        "coreHp",
        "coreRadius",
        "turretInterval",
        "turretDamage",
        "turretSpeed",
        "enemyPullRadius",
        "relayRange",
        "relayWidth",
        "relayDamage",
        "salvageScrap",
        "salvageBurstCount",
        "salvageBurstRadius",
        "salvageDropLife",
      ]);
      return nextHazard;
    }
    clearFields([
      "coreHp",
      "coreRadius",
      "turretInterval",
      "turretDamage",
      "turretSpeed",
      "enemyPullRadius",
      "relayRange",
      "relayWidth",
      "relayDamage",
      "driftSpeed",
      "driftOrbit",
      "salvageScrap",
      "salvageBurstCount",
      "salvageBurstRadius",
      "salvageDropLife",
    ]);
    return nextHazard;
  }

  function getLateBreakEncounterProfile(build) {
    if (!build || !build.lateBreakProfileId) {
      return null;
    }
    return LATE_BREAK_ENCOUNTER_PROFILES[build.lateBreakProfileId] || null;
  }

  function getLateBreakFollowthroughProfile(build) {
    if (!build || !build.lateBreakProfileId) {
      return null;
    }
    return LATE_BREAK_FOLLOWTHROUGH_PROFILES[build.lateBreakProfileId] || null;
  }

  function getLateBreakCrownProfile(build, index) {
    if (!build || !build.lateBreakProfileId) {
      return null;
    }
    const branchProfiles = LATE_BREAK_CROWN_PROFILES[build.lateBreakProfileId];
    if (!branchProfiles) {
      return null;
    }
    return branchProfiles[index] || null;
  }

  function getLateBreakCadenceSummary(profileId) {
    if (profileId === "mutation") {
      return {
        label: "Cataclysm cadence",
        detail:
          "Wave 9는 열린 firing gallery payoff, Wave 10은 light breach proof, Wave 11은 Crownbreaker victory lap, Wave 12는 final crownline breach다.",
      };
    }
    if (profileId === "aegis") {
      return {
        label: "Warplate cadence",
        detail:
          "Wave 9는 open-lane payoff, Wave 10은 Halo breach proof, Wave 11은 Halo refuge lap, Wave 12는 Citadel final stand다.",
      };
    }
    if (profileId === "ledger") {
      return {
        label: "Ledger cadence",
        detail:
          "Wave 9는 open-lane payoff, Wave 10은 Jackpot breach proof, Wave 11은 Kingpin cash-out lap, Wave 12는 blackout finale다.",
      };
    }
    return {
      label: "Late Break cadence",
      detail:
        "Wave 9는 payoff window, Wave 10은 breach proof, Wave 11은 domination lap, Wave 12는 escalation finale다.",
    };
  }

  function getLateBreakHeadline(profileId) {
    if (profileId === "mutation") {
      return {
        title: "Cataclysm Arsenal",
        detail:
          "Wave 9는 열린 firing gallery payoff, Wave 10은 light breach proof, Wave 11은 Crownbreaker victory lap, Wave 12는 final crownline breach로 고정된다.",
      };
    }
    if (profileId === "aegis") {
      return {
        title: "Warplate Halo",
        detail:
          "Wave 9는 open-lane payoff, Wave 10은 Halo breach proof, Wave 11은 Halo refuge lap, Wave 12는 Citadel final stand로 고정된다.",
      };
    }
    if (profileId === "ledger") {
      return {
        title: "Black Ledger Heist",
        detail:
          "Wave 9는 open-lane payoff, Wave 10은 Jackpot breach proof, Wave 11은 Kingpin cash-out lap, Wave 12는 blackout finale로 고정된다.",
      };
    }
    return null;
  }

  function getArsenalBreakpointEncounterProfile(build, waveNumber) {
    if (
      !build ||
      !build.arsenalBreakpointProfileId ||
      !Number.isFinite(waveNumber) ||
      !isArsenalBreakpointWave(waveNumber)
    ) {
      return null;
    }
    return ARSENAL_BREAKPOINT_ENCOUNTER_PROFILES[build.arsenalBreakpointProfileId] || null;
  }

  function applyEncounterOverride(config, override) {
    if (!config || !override) {
      return config;
    }
    return {
      ...config,
      ...override,
      arena: override.arena || config.arena,
      mix: override.mix ? { ...override.mix } : { ...config.mix },
      hazard: sanitizeHazardForType(
        override.hazard
          ? {
              ...(config.hazard || {}),
              ...override.hazard,
            }
          : config.hazard
            ? { ...config.hazard }
            : null
      ),
    };
  }

  function resolveWaveConfig(index, build = null) {
    const baseConfig = WAVE_CONFIG[clamp(index, 0, MAX_WAVES - 1)];
    if (!baseConfig || index < LATE_BREAK_ARMORY_WAVE - 1 || !build) {
      return applyEncounterPressureFamily(baseConfig);
    }
    const override = SHARED_LATE_ACT_ENCOUNTER_POOL[index] || null;
    if (!override) {
      return applyEncounterPressureFamily(baseConfig);
    }
    let config = {
      ...baseConfig,
      ...override,
      mix: override.mix ? { ...override.mix } : { ...baseConfig.mix },
      hazard: sanitizeHazardForType(
        override.hazard
          ? {
              ...(baseConfig.hazard || {}),
              ...override.hazard,
            }
          : baseConfig.hazard
            ? { ...baseConfig.hazard }
            : null
      ),
    };
    if (index === LATE_BREAK_ARMORY_WAVE - 1) {
      const lateBreakProfile = getLateBreakEncounterProfile(build);
      if (lateBreakProfile) {
        config = {
          ...config,
          ...lateBreakProfile,
          arena: lateBreakProfile.arena || config.arena,
          mix: lateBreakProfile.mix ? { ...lateBreakProfile.mix } : { ...config.mix },
          hazard: sanitizeHazardForType(
            lateBreakProfile.hazard
              ? {
                  ...(config.hazard || {}),
                  ...lateBreakProfile.hazard,
                }
              : config.hazard
                ? { ...config.hazard }
                : null
          ),
        };
      }
    } else if (index === LATE_BREAK_ARMORY_WAVE) {
      const lateBreakFollowthrough = getLateBreakFollowthroughProfile(build);
      if (lateBreakFollowthrough) {
        config = {
          ...config,
          ...lateBreakFollowthrough,
          arena: lateBreakFollowthrough.arena || config.arena,
          mix: lateBreakFollowthrough.mix
            ? { ...lateBreakFollowthrough.mix }
            : { ...config.mix },
          hazard: sanitizeHazardForType(
            lateBreakFollowthrough.hazard
              ? {
                  ...(config.hazard || {}),
                  ...lateBreakFollowthrough.hazard,
                }
              : config.hazard
                ? { ...config.hazard }
            : null
          ),
        };
      }
    } else if (index > LATE_BREAK_ARMORY_WAVE) {
      const lateBreakCrownProfile = getLateBreakCrownProfile(build, index);
      if (lateBreakCrownProfile) {
        config = applyEncounterOverride(config, lateBreakCrownProfile);
      }
    }
    const arsenalBreakpointProfile = getArsenalBreakpointEncounterProfile(build, index + 1);
    if (arsenalBreakpointProfile) {
      config = applyEncounterOverride(config, arsenalBreakpointProfile);
    }
    return applyEncounterPressureFamily(config);
  }

  function getActLabelForWave(waveNumber) {
    const act = ACT_LABELS.find((entry) => waveNumber >= entry.start && waveNumber <= entry.end);
    return act || ACT_LABELS[ACT_LABELS.length - 1];
  }

  function isHazardCoreTarget(hazard) {
    return Boolean(
      hazard &&
        (hazard.type === "territory" ||
          hazard.type === "relay" ||
          hazard.type === "salvage" ||
          hazard.type === "caravan") &&
        hazard.telegraphTime <= 0 &&
        hazard.activeTime > 0 &&
        hazard.coreHp > 0 &&
        hazard.coreRadius > 0
    );
  }

  function getHazardCoreDamageMultiplier(hazard) {
    if (!hazard || hazard.type !== "relay") {
      return 1;
    }
    const doctrine = getBastionDoctrineDef(state.build);
    const capstone = getDoctrineCapstoneDef(state.build);
    let multiplier = 1;
    if (doctrine && RELAY_HAZARD_DOCTRINE_BONUS[doctrine.id]) {
      multiplier *= RELAY_HAZARD_DOCTRINE_BONUS[doctrine.id];
    }
    if (capstone && RELAY_HAZARD_CAPSTONE_BONUS[capstone.id]) {
      multiplier *= RELAY_HAZARD_CAPSTONE_BONUS[capstone.id];
    }
    return multiplier;
  }

  function getRelayLinksForHazard(hazard, hazards = state.hazards) {
    if (!hazard || hazard.type !== "relay" || hazard.telegraphTime > 0 || hazard.activeTime <= 0) {
      return [];
    }
    const links = [];
    const range = hazard.relayRange || 0;
    if (range <= 0) {
      return links;
    }
    for (const other of hazards) {
      if (other === hazard || other.type !== "relay" || other.telegraphTime > 0 || other.activeTime <= 0) {
        continue;
      }
      const distance = Math.hypot(other.x - hazard.x, other.y - hazard.y);
      if (distance <= range && hazard.x <= other.x) {
        links.push({ other, distance });
      }
    }
    links.sort((left, right) => left.distance - right.distance);
    return links.slice(0, 2).map((entry) => entry.other);
  }

  function distanceToSegment(px, py, ax, ay, bx, by) {
    const abx = bx - ax;
    const aby = by - ay;
    const lengthSq = abx * abx + aby * aby;
    if (lengthSq <= 0.0001) {
      return Math.hypot(px - ax, py - ay);
    }
    const t = clamp(((px - ax) * abx + (py - ay) * aby) / lengthSq, 0, 1);
    const closestX = ax + abx * t;
    const closestY = ay + aby * t;
    return Math.hypot(px - closestX, py - closestY);
  }

  const ENEMY_DEFS = {
    scuttler: {
      label: "Scuttler",
      color: "#ff8c42",
      radius: 12,
      hp: 28,
      speed: 86,
      damage: 10,
      scrap: 1,
      particleColor: "#ffab67",
    },
    brute: {
      label: "Brute",
      color: "#ef5d43",
      radius: 18,
      hp: 84,
      speed: 50,
      damage: 15,
      scrap: 3,
      particleColor: "#ff7a63",
    },
    shrike: {
      label: "Shrike",
      color: "#7dd0c5",
      radius: 13,
      hp: 38,
      speed: 74,
      damage: 12,
      scrap: 2,
      particleColor: "#a7fff4",
    },
    mortar: {
      label: "Mortar",
      color: "#9cc7ff",
      radius: 15,
      hp: 52,
      speed: 58,
      damage: 11,
      scrap: 3,
      particleColor: "#d7ebff",
    },
    skimmer: {
      label: "Skimmer",
      color: "#6ff3c8",
      radius: 13,
      hp: 46,
      speed: 98,
      damage: 11,
      scrap: 2,
      particleColor: "#baffeb",
    },
    brander: {
      label: "Brander",
      color: "#ffb347",
      radius: 16,
      hp: 70,
      speed: 66,
      damage: 13,
      scrap: 4,
      particleColor: "#ffe0ad",
    },
    binder: {
      label: "Binder",
      color: "#d8ff7d",
      radius: 15,
      hp: 58,
      speed: 72,
      damage: 12,
      scrap: 3,
      particleColor: "#f1ffc8",
    },
    lancer: {
      label: "Lancer",
      color: "#ff9d6b",
      radius: 17,
      hp: 76,
      speed: 74,
      damage: 16,
      scrap: 4,
      particleColor: "#ffd3ae",
    },
    warden: {
      label: "Warden",
      color: "#ff6b9a",
      radius: 16,
      hp: 64,
      speed: 68,
      damage: 14,
      scrap: 3,
      particleColor: "#ff9aba",
    },
    elite: {
      label: "Elite Husk",
      color: "#ffd166",
      radius: 22,
      hp: 138,
      speed: 58,
      damage: 18,
      scrap: 5,
      particleColor: "#ffe3a4",
    },
    apex: {
      label: "Cinder Maw",
      color: "#ff9f59",
      radius: 28,
      hp: 310,
      speed: 82,
      damage: 22,
      scrap: 9,
      particleColor: "#ffd7a8",
    },
  };

  const CORE_DEFS = {
    ember: {
      id: "ember",
      label: "Ember Spindle",
      short: "Ember",
      tag: "BASE",
      description: "정밀하고 균형 잡힌 단발. 안정적인 기본 회로.",
      pellets: 1,
      spread: 0.02,
      damageFactor: 1,
      cooldownFactor: 1,
      heatFactor: 1,
      speedFactor: 1,
      pierce: 0,
      bounce: 0,
      color: "#ffd166",
      cost: 28,
    },
    scatter: {
      id: "scatter",
      label: "Scatter Prism",
      short: "Scatter",
      tag: "CLOSE",
      description: "짧은 간격의 다발 산탄. 근거리 압박에 강하다.",
      pellets: 5,
      spread: 0.28,
      damageFactor: 0.42,
      cooldownFactor: 1.08,
      heatFactor: 1.16,
      speedFactor: 0.82,
      pierce: 0,
      bounce: 0,
      color: "#ff8c42",
      cost: 42,
    },
    lance: {
      id: "lance",
      label: "Lance Rail",
      short: "Lance",
      tag: "PIERCE",
      description: "느리지만 강한 관통 탄. 정면 돌파용 코어.",
      pellets: 1,
      spread: 0.012,
      damageFactor: 1.82,
      cooldownFactor: 1.32,
      heatFactor: 1.22,
      speedFactor: 1.24,
      pierce: 2,
      bounce: 0,
      color: "#7dd0c5",
      cost: 52,
    },
    ricochet: {
      id: "ricochet",
      label: "Ricochet Coil",
      short: "Ricochet",
      tag: "BOUNCE",
      description: "양갈래 분광탄이 벽을 한 번 튕겨 재진입한다.",
      pellets: 2,
      spread: 0.12,
      damageFactor: 0.72,
      cooldownFactor: 1.06,
      heatFactor: 1.08,
      speedFactor: 0.96,
      pierce: 0,
      bounce: 1,
      color: "#d8a0ff",
      cost: 46,
    },
  };

  const DROPPABLE_CORE_IDS = ["scatter", "lance", "ricochet"];
  const MAX_BENCH_COPIES_PER_CORE = 4;
  const BASE_AFFIX_CAP = 2;
  const LEGENDARY_AFFIX_CAP = 3;
  const CORE_OVERFLOW_SCRAP = 6;

  const MOD_DEFS = {
    heat_sink: {
      id: "heat_sink",
      label: "Heat Sink Veins",
      tag: "COOLING",
      verb: "IMPROVE",
      cost: 34,
      description: "사격 열 발생이 줄고 열 배출량이 늘어난다.",
      apply(build) {
        build.heatFactor *= 0.8;
        build.coolRateBonus += 10;
      },
    },
    arc_array: {
      id: "arc_array",
      label: "Arc Array",
      tag: "CHAIN",
      verb: "IMPROVE",
      cost: 44,
      description: "타격 후 가까운 적으로 전류가 튄다. 냉각도 조금 빨라진다.",
      apply(build) {
        build.chainBonus += 1;
        build.coolRateBonus += 4;
      },
    },
    shock_lens: {
      id: "shock_lens",
      label: "Shock Lens",
      tag: "POWER",
      verb: "IMPROVE",
      cost: 46,
      description: "탄환 위력이 오른다. 후반 브루트 처리 속도가 빨라진다.",
      apply(build) {
        build.damageBonus += 6;
      },
    },
    pulse_gate: {
      id: "pulse_gate",
      label: "Pulse Gate",
      tag: "RATE",
      verb: "IMPROVE",
      cost: 42,
      description: "연사 속도가 오른다. 대신 약간 더 달아오른다.",
      apply(build) {
        build.cooldownBonus += 0.028;
        build.heatFactor *= 1.08;
      },
    },
    rail_sleeve: {
      id: "rail_sleeve",
      label: "Rail Sleeve",
      tag: "PEN",
      verb: "IMPROVE",
      cost: 38,
      description: "기본 관통력이 추가된다. 뭉친 무리를 밀어낼 때 좋다.",
      apply(build) {
        build.pierceBonus += 1;
      },
    },
    step_servos: {
      id: "step_servos",
      label: "Step Servos",
      tag: "MOBILITY",
      verb: "IMPROVE",
      cost: 34,
      description: "이동과 대시 복구가 빨라진다.",
      apply(build) {
        build.moveSpeedBonus += 22;
        build.dashCooldownBonus += 0.35;
      },
    },
    magnet_rig: {
      id: "magnet_rig",
      label: "Magnet Rig",
      tag: "SALVAGE",
      verb: "IMPROVE",
      cost: 30,
      description: "픽업 반경이 늘고 고철 획득량이 늘어난다.",
      apply(build) {
        build.pickupBonus += 26;
        build.scrapMultiplier += 0.12;
      },
    },
    coolant_purge: {
      id: "coolant_purge",
      label: "Coolant Purge",
      tag: "STABILITY",
      verb: "IMPROVE",
      cost: 24,
      description: "즉시 체력을 회복하고 과열을 크게 식힌다.",
      apply(build, run) {
        if (run && run.player) {
          const healAmount = 22;
          run.player.hp = Math.min(run.player.maxHp, run.player.hp + healAmount);
          run.player.heat = Math.max(0, run.player.heat - 55);
          run.player.overheated = false;
        }
      },
    },
    armor_mesh: {
      id: "armor_mesh",
      label: "Armor Mesh",
      tag: "ARMOR",
      verb: "IMPROVE",
      cost: 48,
      description: "최대 체력이 늘고 폭주 지형 피해가 줄어든다.",
      apply(build) {
        build.maxHpBonus += 20;
        build.hazardMitigation += 0.18;
      },
    },
    drive_sync: {
      id: "drive_sync",
      label: "Drive Sync",
      tag: "DRIVE",
      verb: "IMPROVE",
      cost: 50,
      description: "드라이브 충전 속도와 오버드라이브 지속시간이 늘어난다.",
      apply(build) {
        build.driveGainBonus += 0.35;
        build.overdriveDurationBonus += 1.2;
      },
    },
    reactor_cap: {
      id: "reactor_cap",
      label: "Reactor Cap",
      tag: "FLOW",
      verb: "IMPROVE",
      cost: 40,
      description: "대시 충전량이 늘고 냉각이 조금 빨라진다.",
      apply(build) {
        build.dashMaxBonus += 1;
        build.coolRateBonus += 6;
      },
    },
  };

  const MAX_SUPPORT_SYSTEM_TIER = 3;
  const MAX_SUPPORT_BAYS = 2;
  const MAX_SUPPORT_BAY_LIMIT = 4;
  const SUPPORT_SYSTEM_START_WAVE = 8;
  const SUPPORT_SYSTEM_DEFS = {
    ember_ring: {
      id: "ember_ring",
      forgeWaveMin: SUPPORT_SYSTEM_START_WAVE,
      forgeLane: "보조 시스템",
      tag: "SYSTEM",
      color: "#ffd166",
      orbitColor: "rgba(255, 209, 102, 0.18)",
      strokeColor: "rgba(255, 241, 168, 0.6)",
      renderShape: "orb",
      tiers: {
        1: {
          tier: 1,
          label: "Ember Ring",
          title: "Ember Ring",
          cost: 36,
          description:
            "플레이어 주위를 도는 화염 위성 1기를 설치한다. 근접 요격으로 전열을 비집고 지나갈 공간을 만든다.",
          slotText: "보조 시스템 설치 · 위성 1기",
          orbitCount: 1,
          orbitRadius: 52,
          orbitSpeed: 1.9,
          satelliteRadius: 8,
          touchDamage: 16,
          touchCooldown: 0.28,
          shotCooldown: 0,
          shotRange: 0,
          shotDamage: 0,
          shotSpeed: 0,
          interceptRange: 0,
          interceptCooldown: 0,
          interceptPulseDamage: 0,
          interceptPulseRadius: 0,
          previewText: "근접 요격 위성",
          statusNote: "Ember Ring이 플레이어 주위를 돌며 근접 적을 긁어 안전 반경을 만든다.",
        },
        2: {
          tier: 2,
          label: "Ember Ring Mk.II",
          title: "Ember Ring Mk.II",
          cost: 52,
          description:
            "Ember Ring을 2기 편대로 증설한다. 위성이 더 넓게 회전하며 주기적으로 근처 적에게 자동 점화 볼트를 발사한다.",
          slotText: "보조 시스템 증설 · 위성 2기 + 자동 볼트",
          orbitCount: 2,
          orbitRadius: 64,
          orbitSpeed: 2.25,
          satelliteRadius: 8.5,
          touchDamage: 20,
          touchCooldown: 0.22,
          shotCooldown: 1.15,
          shotRange: 248,
          shotDamage: 12,
          shotSpeed: 540,
          interceptRange: 0,
          interceptCooldown: 0,
          interceptPulseDamage: 0,
          interceptPulseRadius: 0,
          previewText: "위성 2기 + 자동 볼트",
          statusNote: "Ember Ring Mk.II가 두 갈래 궤도로 전열을 긁고 자동 점화 볼트까지 보탠다.",
        },
        3: {
          tier: 3,
          label: "Ember Ring Mk.III",
          title: "Ember Ring Mk.III",
          cost: 68,
          description:
            "Ember Ring을 3기 삼각 편대로 증설한다. 궤도가 한층 넓어지고 자동 점화 볼트 주기가 짧아져 근접 전열과 측면 잔당을 동시에 태운다.",
          slotText: "보조 시스템 증설 · 위성 3기 + 연쇄 자동 볼트",
          orbitCount: 3,
          orbitRadius: 74,
          orbitSpeed: 2.5,
          satelliteRadius: 9,
          touchDamage: 24,
          touchCooldown: 0.18,
          shotCooldown: 0.78,
          shotRange: 288,
          shotDamage: 15,
          shotSpeed: 620,
          interceptRange: 0,
          interceptCooldown: 0,
          interceptPulseDamage: 0,
          interceptPulseRadius: 0,
          previewText: "위성 3기 + 고속 볼트",
          statusNote: "Ember Ring Mk.III가 3기 편대로 외곽을 태우며 더 빠른 자동 볼트를 쏟아낸다.",
        },
      },
    },
    aegis_halo: {
      id: "aegis_halo",
      forgeWaveMin: SUPPORT_SYSTEM_START_WAVE,
      forgeLane: "보조 시스템",
      tag: "SYSTEM",
      color: "#8ae7ff",
      orbitColor: "rgba(138, 231, 255, 0.2)",
      strokeColor: "rgba(226, 251, 255, 0.72)",
      renderShape: "shield",
      tiers: {
        1: {
          tier: 1,
          label: "Aegis Halo",
          title: "Aegis Halo",
          cost: 34,
          description:
            "요격 위성 1기를 설치한다. 위성이 플레이어 주변을 돌며 날아오는 적 탄환을 먼저 지워 위험한 사격 각을 끊는다.",
          slotText: "보조 시스템 설치 · 요격 위성 1기",
          orbitCount: 1,
          orbitRadius: 44,
          orbitSpeed: 1.7,
          satelliteRadius: 9,
          touchDamage: 8,
          touchCooldown: 0.34,
          shotCooldown: 0,
          shotRange: 0,
          shotDamage: 0,
          shotSpeed: 0,
          interceptRange: 26,
          interceptCooldown: 0.16,
          interceptPulseDamage: 0,
          interceptPulseRadius: 0,
          previewText: "요격 위성",
          statusNote: "Aegis Halo가 들어오는 탄환을 먼저 지워 사격 압박을 끊는다.",
        },
        2: {
          tier: 2,
          label: "Aegis Halo Mk.II",
          title: "Aegis Halo Mk.II",
          cost: 50,
          description:
            "Aegis Halo를 2기 편대로 증설한다. 요격 범위가 넓어지고 탄환을 끊을 때마다 짧은 방호 충격파로 근접 적까지 밀어낸다.",
          slotText: "보조 시스템 증설 · 요격 위성 2기 + 방호 파동",
          orbitCount: 2,
          orbitRadius: 52,
          orbitSpeed: 1.95,
          satelliteRadius: 9.5,
          touchDamage: 10,
          touchCooldown: 0.28,
          shotCooldown: 0,
          shotRange: 0,
          shotDamage: 0,
          shotSpeed: 0,
          interceptRange: 34,
          interceptCooldown: 0.12,
          interceptPulseDamage: 14,
          interceptPulseRadius: 48,
          previewText: "요격 2기 + 방호 파동",
          statusNote: "Aegis Halo Mk.II가 탄환을 끊을 때마다 방호 파동을 터뜨려 근접 압박까지 밀어낸다.",
        },
        3: {
          tier: 3,
          label: "Aegis Halo Mk.III",
          title: "Aegis Halo Mk.III",
          cost: 66,
          description:
            "Aegis Halo를 3기 삼각 방호진으로 증설한다. 요격 범위와 반응 속도가 다시 늘고, 파동이 더 멀리 퍼져 탄막과 근접 적을 함께 비운다.",
          slotText: "보조 시스템 증설 · 요격 3기 + 확장 방호 파동",
          orbitCount: 3,
          orbitRadius: 58,
          orbitSpeed: 2.15,
          satelliteRadius: 10,
          touchDamage: 12,
          touchCooldown: 0.22,
          shotCooldown: 0,
          shotRange: 0,
          shotDamage: 0,
          shotSpeed: 0,
          interceptRange: 42,
          interceptCooldown: 0.09,
          interceptPulseDamage: 20,
          interceptPulseRadius: 62,
          previewText: "요격 3기 + 대형 파동",
          statusNote: "Aegis Halo Mk.III가 삼각 방호진으로 탄막을 지우고 더 큰 파동으로 주변 적까지 밀어낸다.",
        },
      },
    },
    kiln_sentry: {
      id: "kiln_sentry",
      forgeWaveMin: SUPPORT_SYSTEM_START_WAVE,
      forgeLane: "보조 시스템",
      tag: "SENTRY",
      color: "#ffb86b",
      orbitColor: "rgba(255, 184, 107, 0.14)",
      strokeColor: "rgba(255, 235, 209, 0.74)",
      renderShape: "turret",
      tiers: {
        1: {
          tier: 1,
          label: "Kiln Sentry",
          title: "Kiln Sentry",
          cost: 32,
          description:
            "플레이어 전방에 고정 포탑 1기를 자동 전개한다. 포탑이 그 자리를 점유하며 좁은 진입로를 대신 지켜 첫 포지 직후에도 싸울 지점을 만든다.",
          slotText: "보조 시스템 설치 · 전방 포탑 1기",
          orbitCount: 0,
          orbitRadius: 0,
          orbitSpeed: 0,
          satelliteRadius: 0,
          touchDamage: 0,
          touchCooldown: 0,
          shotCooldown: 0,
          shotRange: 0,
          shotDamage: 0,
          shotSpeed: 0,
          interceptRange: 0,
          interceptCooldown: 0,
          interceptPulseDamage: 0,
          interceptPulseRadius: 0,
          deployCount: 1,
          deployCooldown: 0.55,
          deployDistance: 126,
          deployDuration: 10.5,
          deployRadius: 13,
          deployShotCooldown: 0.84,
          deployShotRange: 246,
          deployShotDamage: 15,
          deployShotSpeed: 470,
          deployBurstCount: 1,
          deployBurstSpread: 0,
          previewText: "전방 고정 포탑",
          statusNote: "Kiln Sentry가 전방 거점을 먼저 세워 추격선 대신 한쪽 공간을 붙잡아 준다.",
        },
        2: {
          tier: 2,
          label: "Kiln Sentry Mk.II",
          title: "Kiln Sentry Mk.II",
          cost: 48,
          description:
            "Kiln Sentry를 2기 전개로 증설한다. 포탑 유지시간이 늘고 교차 사격을 열어, 플레이어가 포탑 사이를 오가며 밀린 전열을 다시 찢을 수 있다.",
          slotText: "보조 시스템 증설 · 포탑 2기 + 교차 사격",
          orbitCount: 0,
          orbitRadius: 0,
          orbitSpeed: 0,
          satelliteRadius: 0,
          touchDamage: 0,
          touchCooldown: 0,
          shotCooldown: 0,
          shotRange: 0,
          shotDamage: 0,
          shotSpeed: 0,
          interceptRange: 0,
          interceptCooldown: 0,
          interceptPulseDamage: 0,
          interceptPulseRadius: 0,
          deployCount: 2,
          deployCooldown: 0.42,
          deployDistance: 138,
          deployDuration: 12.4,
          deployRadius: 13.8,
          deployShotCooldown: 0.64,
          deployShotRange: 278,
          deployShotDamage: 17,
          deployShotSpeed: 510,
          deployBurstCount: 2,
          deployBurstSpread: 0.16,
          previewText: "포탑 2기 교차 사격",
          statusNote: "Kiln Sentry Mk.II가 두 개의 고정 거점을 남겨 교차 사격으로 전장을 두 갈래로 지킨다.",
        },
        3: {
          tier: 3,
          label: "Kiln Sentry Mk.III",
          title: "Kiln Sentry Mk.III",
          cost: 64,
          description:
            "Kiln Sentry를 3기 릴레이 망으로 확장한다. 포탑이 더 빨리 세워지고 삼중 탄막을 깔아 플레이어가 포탑 전선을 따라 전장을 밀어붙일 수 있다.",
          slotText: "보조 시스템 증설 · 포탑 3기 + 릴레이 탄막",
          orbitCount: 0,
          orbitRadius: 0,
          orbitSpeed: 0,
          satelliteRadius: 0,
          touchDamage: 0,
          touchCooldown: 0,
          shotCooldown: 0,
          shotRange: 0,
          shotDamage: 0,
          shotSpeed: 0,
          interceptRange: 0,
          interceptCooldown: 0,
          interceptPulseDamage: 0,
          interceptPulseRadius: 0,
          deployCount: 3,
          deployCooldown: 0.34,
          deployDistance: 148,
          deployDuration: 14.6,
          deployRadius: 14.5,
          deployShotCooldown: 0.48,
          deployShotRange: 308,
          deployShotDamage: 19,
          deployShotSpeed: 560,
          deployBurstCount: 3,
          deployBurstSpread: 0.2,
          previewText: "포탑 3기 릴레이",
          statusNote: "Kiln Sentry Mk.III가 전방에 3기 릴레이 포탑을 세워 플레이어 이동선 자체를 전선으로 바꾼다.",
        },
      },
    },
    seeker_array: {
      id: "seeker_array",
      forgeWaveMin: SUPPORT_SYSTEM_START_WAVE,
      forgeLane: "공세 모듈",
      tag: "ORDNANCE",
      color: "#ff9b54",
      orbitColor: "rgba(255, 155, 84, 0.2)",
      strokeColor: "rgba(255, 224, 191, 0.72)",
      renderShape: "missile",
      tiers: {
        1: {
          tier: 1,
          label: "Seeker Array",
          title: "Seeker Array",
          cost: 46,
          description:
            "Wave 8 Late Break Armory부터 해금되는 추적 미사일 랙 1기를 설치한다. 멀리 벌어진 적에게 자동 사격을 꽂아 열린 작업장에서 화력 회수를 돕는다.",
          slotText: "공세 모듈 설치 · 추적 미사일 랙",
          orbitCount: 1,
          orbitRadius: 76,
          orbitSpeed: 1.42,
          satelliteRadius: 9,
          touchDamage: 10,
          touchCooldown: 0.32,
          shotCooldown: 1.35,
          shotRange: 340,
          shotDamage: 26,
          shotSpeed: 430,
          interceptRange: 0,
          interceptCooldown: 0,
          interceptPulseDamage: 0,
          interceptPulseRadius: 0,
          previewText: "추적 미사일",
          statusNote: "Seeker Array가 멀리 벌어진 적에게 추적 미사일을 꽂아 외곽 정리선을 만든다.",
        },
        2: {
          tier: 2,
          label: "Seeker Array Mk.II",
          title: "Seeker Array Mk.II",
          cost: 60,
          description:
            "Seeker Array를 2기 편대로 증설한다. 미사일 발사 간격이 짧아지고 두 갈래 탄막이 측면 교차 화선을 먼저 정리한다.",
          slotText: "공세 모듈 증설 · 미사일 랙 2기",
          orbitCount: 2,
          orbitRadius: 88,
          orbitSpeed: 1.58,
          satelliteRadius: 9.5,
          touchDamage: 12,
          touchCooldown: 0.24,
          shotCooldown: 0.96,
          shotRange: 384,
          shotDamage: 24,
          shotSpeed: 470,
          interceptRange: 0,
          interceptCooldown: 0,
          interceptPulseDamage: 0,
          interceptPulseRadius: 0,
          previewText: "미사일 랙 2기",
          statusNote: "Seeker Array Mk.II가 두 갈래 자동 미사일로 측면 교차 화선을 먼저 찢는다.",
        },
        3: {
          tier: 3,
          label: "Seeker Array Mk.III",
          title: "Seeker Array Mk.III",
          cost: 74,
          description:
            "Seeker Array를 3기 포격 고리로 확장한다. 넓은 외곽을 돌며 짧은 간격으로 미사일을 쏟아 후반부 잔당과 사격진을 동시에 무너뜨린다.",
          slotText: "공세 모듈 증설 · 삼중 미사일 포격",
          orbitCount: 3,
          orbitRadius: 98,
          orbitSpeed: 1.7,
          satelliteRadius: 10,
          touchDamage: 14,
          touchCooldown: 0.2,
          shotCooldown: 0.72,
          shotRange: 420,
          shotDamage: 25,
          shotSpeed: 510,
          interceptRange: 0,
          interceptCooldown: 0,
          interceptPulseDamage: 0,
          interceptPulseRadius: 0,
          previewText: "삼중 미사일 고리",
          statusNote: "Seeker Array Mk.III가 외곽을 도는 삼중 포격 고리로 후반부 잔당과 사격진을 함께 무너뜨린다.",
        },
      },
    },
    volt_drones: {
      id: "volt_drones",
      forgeWaveMin: SUPPORT_SYSTEM_START_WAVE,
      forgeLane: "공세 모듈",
      tag: "DRONE",
      color: "#7fffd4",
      orbitColor: "rgba(127, 255, 212, 0.18)",
      strokeColor: "rgba(221, 255, 247, 0.7)",
      renderShape: "drone",
      tiers: {
        1: {
          tier: 1,
          label: "Volt Drones",
          title: "Volt Drones",
          cost: 44,
          description:
            "자율 공격 드론 2기를 띄운다. 드론이 플레이어 주변을 넓게 돌며 자동 전격탄으로 후방 추격선을 끊는다.",
          slotText: "공세 모듈 설치 · 자율 드론 2기",
          orbitCount: 2,
          orbitRadius: 66,
          orbitSpeed: 1.84,
          satelliteRadius: 8.5,
          touchDamage: 14,
          touchCooldown: 0.24,
          shotCooldown: 1.08,
          shotRange: 272,
          shotDamage: 14,
          shotSpeed: 560,
          interceptRange: 0,
          interceptCooldown: 0,
          interceptPulseDamage: 0,
          interceptPulseRadius: 0,
          previewText: "자율 드론 2기",
          statusNote: "Volt Drones가 후방 추격선을 자동 전격탄으로 끊어 회전 복귀를 쉽게 만든다.",
        },
        2: {
          tier: 2,
          label: "Volt Drones Mk.II",
          title: "Volt Drones Mk.II",
          cost: 58,
          description:
            "드론 편대를 3기로 늘리고 사격 주기를 압축한다. 회전 경로가 두꺼워져 플레이어가 외곽을 더 공격적으로 가를 수 있다.",
          slotText: "공세 모듈 증설 · 드론 3기 + 고속 전격탄",
          orbitCount: 3,
          orbitRadius: 74,
          orbitSpeed: 2.02,
          satelliteRadius: 8.8,
          touchDamage: 16,
          touchCooldown: 0.2,
          shotCooldown: 0.8,
          shotRange: 294,
          shotDamage: 16,
          shotSpeed: 600,
          interceptRange: 0,
          interceptCooldown: 0,
          interceptPulseDamage: 0,
          interceptPulseRadius: 0,
          previewText: "드론 3기 편대",
          statusNote: "Volt Drones Mk.II가 더 두꺼운 편대로 외곽 회전선을 자동 사격으로 지킨다.",
        },
        3: {
          tier: 3,
          label: "Volt Drones Mk.III",
          title: "Volt Drones Mk.III",
          cost: 72,
          description:
            "드론을 4기로 증설하고 궤도를 더 빠르게 감는다. 플레이어 주위에 움직이는 자동 화력 막이 생겨 후반부 측면 재진입을 더 과감하게 열어 준다.",
          slotText: "공세 모듈 증설 · 드론 4기 + 과충전 전격망",
          orbitCount: 4,
          orbitRadius: 82,
          orbitSpeed: 2.18,
          satelliteRadius: 9.1,
          touchDamage: 18,
          touchCooldown: 0.16,
          shotCooldown: 0.62,
          shotRange: 316,
          shotDamage: 18,
          shotSpeed: 640,
          interceptRange: 0,
          interceptCooldown: 0,
          interceptPulseDamage: 0,
          interceptPulseRadius: 0,
          previewText: "드론 4기 전격망",
          statusNote: "Volt Drones Mk.III가 플레이어 주위를 감는 자동 전격망으로 측면 재진입을 더 과감하게 연다.",
        },
      },
    },
  };

  const CHASSIS_BREAKPOINT_DEFS = {
    vector_thrusters: {
      id: "vector_thrusters",
      label: "Vector Thrusters",
      title: "Vector Thrusters",
      tag: "VECTOR",
      description:
        "대시 착지 때 충격파를 내며 탄막을 걷어내고, slipstream 동안 양옆 strafe pod가 열려 주포가 쐐기형 돌격 사격으로 변한다. 위험한 lane을 직접 찢고 반대편으로 다시 파고드는 돌격 섀시다.",
      slotText: "대시 충격파 + strafe pod wedge",
      statusNote: "대시 뒤 slipstream 동안 주포가 양옆 strafe pod까지 켜져 빈 lane을 쐐기 돌격으로 연다.",
      apply(build) {
        build.moveSpeedBonus += 12;
        build.dashCooldownBonus += 0.22;
      },
    },
    bulwark_treads: {
      id: "bulwark_treads",
      label: "Bulwark Treads",
      title: "Bulwark Treads",
      tag: "BULWARK",
      description:
        "한 지점을 잠시 붙잡으면 섀시가 자동으로 anchor 상태에 들어가 방호가 두꺼워지고, 주포가 삼연장 siege head로 재배열된다. 느리게 밀리더라도 정면 화력으로 전선을 고정하는 공성 섀시다.",
      slotText: "정지 anchor + 삼연장 siege head",
      statusNote: "한 지점을 지키면 siege head가 펼쳐져 hold-ground 운영이 주포 자체로 보인다.",
      apply(build) {
        build.maxHpBonus += 14;
        build.hazardMitigation += 0.08;
      },
    },
    salvage_winch: {
      id: "salvage_winch",
      label: "Salvage Winch",
      title: "Salvage Winch",
      tag: "WINCH",
      description:
        "고철이나 특수 회수를 물면 바로 chassis surge가 걸려 이동과 사격 템포가 치솟고, 주포가 tow fork fan으로 갈라져 전방을 갈퀴처럼 훑는다. drop route를 전투 루트로 바꾸는 회수 섀시다.",
      slotText: "pickup surge + tow fork fan",
      statusNote: "drop route를 밟을수록 tow fork fan이 이어져 회수 자체가 공격 리듬이 된다.",
      apply(build) {
        build.pickupBonus += 20;
        build.driveGainBonus += 0.14;
      },
    },
  };

  const WILDCARD_PROTOCOL_WAVES = [4, 7, 10];
  const WILDCARD_PROTOCOL_ORDER = ["smuggler_winch", "nullplate_halo", "rogue_lattice"];
  const WILDCARD_PROTOCOL_DEFS = {
    smuggler_winch: {
      id: "smuggler_winch",
      tag: "WILD",
      title: "Smuggler Winch",
      wave: 4,
      laneLabel: "Wildcard Protocol",
      description:
        "교리 선호를 무시하고 Salvage Winch를 불법 접속한다. 회수 동선이 곧 가속선이 되어 scrap payout과 drive 회전이 같이 치솟고, 비어 있는 flex bay도 즉시 뚫린다.",
      slotText: "Salvage Winch + 회수 폭주 + flex bay",
      roadmapDetail: "Wave 4 field cache가 회수/기동 프로토콜을 열어 교리 밖 경제 동선을 런 축으로 바꿀 수 있다.",
      apply(build, run) {
        applyAuxiliaryJunction(build);
        applyChassisBreakpoint(build, "salvage_winch", run);
        build.scrapMultiplier += 0.1;
        build.pickupBonus += 16;
        build.moveSpeedBonus += 10;
        build.dashCooldownBonus += 0.12;
      },
    },
    nullplate_halo: {
      id: "nullplate_halo",
      tag: "WILD",
      title: "Nullplate Halo",
      wave: 7,
      laneLabel: "Wildcard Protocol",
      description:
        "교리 예약 lane과 무관하게 Bulwark Treads와 Aegis Halo를 직결한다. 큰 한 방을 씹는 null plate와 탄막 요격 고리가 같이 붙어, 평소 방호 약점이던 빌드도 갑자기 정면전이 가능해진다.",
      slotText: "Bulwark Treads + Aegis Halo + field plate",
      roadmapDetail: "Wave 7 cache가 방호 계열 와일드카드를 열어 원래 약한 빌드도 정면 hold form으로 꺾을 수 있다.",
      apply(build, run) {
        applyAuxiliaryJunction(build);
        build.supportBayCap = Math.max(getSupportBayCapacity(build), MAX_SUPPORT_BAY_LIMIT);
        applyChassisBreakpoint(build, "bulwark_treads", run);
        build.lateFieldAegisLevel = Math.max(getLateFieldAegisLevel(build), 1);
        const haloChoice = createSupportSystemTierChoice("aegis_halo", 1);
        if (haloChoice) {
          applyForgeChoice(run, { ...haloChoice, cost: 0 });
        }
      },
    },
    rogue_lattice: {
      id: "rogue_lattice",
      tag: "WILD",
      title: "Rogue Lattice",
      wave: 10,
      laneLabel: "Wildcard Protocol",
      description:
        "교리 밖 rogue lattice를 current chassis와 불법 직결해 즉시 convergence form으로 굳힌다. 남은 런은 support가 주역이 아니라 증폭기로 내려앉고, 주포/차체 자체가 새 갈퀴 프레임으로 접혀 원래 계획보다 훨씬 난폭한 lane-owner 머신으로 꺾일 수 있다.",
      slotText: "illegal convergence + chassis hijack + 배럴 jump",
      roadmapDetail: "Wave 10 arsenal cache가 rogue convergence를 열어 남은 bracket을 off-doctrine body/gun form으로 납치할 수 있다.",
      apply(build, run) {
        applyAuxiliaryJunction(build);
        build.supportBayCap = Math.max(getSupportBayCapacity(build), MAX_SUPPORT_BAY_LIMIT);
        const chassisId = getRogueLatticeChassisId(build);
        if (chassisId) {
          applyChassisBreakpoint(build, chassisId, run);
        }
        build.lateFieldMutationLevel = Math.max(getLateFieldMutationLevel(build), 2);
        const convergenceDef = getRogueLatticeConvergenceDef(build, chassisId);
        if (convergenceDef) {
          build.lateFieldConvergenceId = convergenceDef.id;
        }
        const preferredSystemId = getRogueLatticeSupportSystemId(build, chassisId);
        const systemChoice = createSupportSystemTierChoice(preferredSystemId, 1);
        if (systemChoice) {
          applyForgeChoice(run, { ...systemChoice, cost: 0 });
        }
      },
    },
  };

  const WAVE6_ASCENSION_DEFS = {
    mirror_hunt: {
      id: "mirror_hunt",
      tag: "ASCEND",
      title: "Mirror Hunt Ascension",
      chassisId: "vector_thrusters",
      preferredSystemId: "aegis_halo",
      laneLabel: "Ascension Draft",
      summary:
        "Hunt Frame을 즉시 켜 주포를 쌍익 추적 분광으로 바꾸고, Vector Thrusters와 off-doctrine 방호 lane까지 한 번에 접속한다.",
    },
    kiln_bastion: {
      id: "kiln_bastion",
      tag: "ASCEND",
      title: "Kiln Bastion Ascension",
      chassisId: "salvage_winch",
      preferredSystemId: "volt_drones",
      laneLabel: "Ascension Draft",
      summary:
        "Kiln Frame을 즉시 켜 산탄 사이에 용광 씨앗을 박고, Salvage Winch와 off-doctrine 추적 lane까지 한 번에 접속한다.",
    },
    storm_artillery: {
      id: "storm_artillery",
      tag: "ASCEND",
      title: "Storm Artillery Ascension",
      chassisId: "bulwark_treads",
      preferredSystemId: "aegis_halo",
      laneLabel: "Ascension Draft",
      summary:
        "Siege Frame을 즉시 켜 외곽 공성선을 붙이고, Bulwark Treads와 off-doctrine 방호 lane까지 한 번에 접속한다.",
    },
  };

  const AFFIX_DEFS = {
    hotshot: {
      id: "hotshot",
      label: "Hotshot",
      tag: "POWER",
      cost: 38,
      description: "무기 위력이 크게 오르지만 열도 더 오른다.",
      applyWeapon(stats) {
        stats.damage *= 1.26;
        stats.heatPerShot *= 1.16;
        stats.projectileSpeed *= 1.08;
      },
    },
    overclock: {
      id: "overclock",
      label: "Overclock",
      tag: "RATE",
      cost: 36,
      description: "연사가 빨라지고 드라이브 순환도 조금 빨라진다.",
      applyWeapon(stats) {
        stats.cooldown *= 0.82;
        if (stats.core.id === "scatter") {
          stats.pellets += 1;
        }
        if (stats.core.id === "ricochet") {
          stats.bounce += 1;
        }
      },
      applyPlayer(stats) {
        stats.driveGainMultiplier += 0.18;
      },
    },
    phase_rounds: {
      id: "phase_rounds",
      label: "Phase Rounds",
      tag: "PIERCE",
      cost: 34,
      description: "탄속과 관통이 늘어 전열을 더 깊게 찢는다.",
      applyWeapon(stats) {
        stats.pierce += 1;
        stats.projectileSpeed *= 1.18;
        stats.damage *= 1.08;
      },
    },
    arc_link: {
      id: "arc_link",
      label: "Arc Link",
      tag: "CHAIN",
      cost: 40,
      description: "연쇄 전류가 추가되어 군집 처리력이 오른다.",
      applyWeapon(stats) {
        stats.chain += 1;
        stats.chainRange += 44;
        if (stats.core.id === "ricochet") {
          stats.bounce += 1;
        }
      },
    },
    thermal_weave: {
      id: "thermal_weave",
      label: "Thermal Weave",
      tag: "COOL",
      cost: 32,
      description: "발열이 줄고 냉각이 빨라져 오래 버틴다.",
      applyWeapon(stats) {
        stats.heatPerShot *= 0.72;
        stats.cooldown *= 0.94;
      },
      applyPlayer(stats) {
        stats.coolRate += 10;
      },
    },
    salvage_link: {
      id: "salvage_link",
      label: "Salvage Link",
      tag: "SALVAGE",
      cost: 30,
      description: "고철 회수력과 픽업 반경이 늘어 경제가 좋아진다.",
      applyPlayer(stats) {
        stats.pickupRadius += 24;
        stats.scrapMultiplier += 0.22;
        stats.driveGainMultiplier += 0.08;
      },
    },
  };

  const ILLEGAL_OVERCLOCK_DEFS = {
    glass_broadside: {
      id: "glass_broadside",
      label: "Glass Broadside",
      title: "Glass Broadside",
      tag: "ILLEGAL",
      color: "#8fe4ff",
      description:
        "측면에 금지 포대를 용접해 주포가 쌍선 broadside까지 같이 분사된다. 대신 외피를 뜯어내 최대 체력과 hazard buffer를 버린다.",
      slotText: "쌍선 broadside · 최대 체력/완충 손실",
      traitLabel: "쌍선 broadside",
      statusNote: "주포 양옆 금지 포대가 항상 같이 열려 전방 lane을 더 넓게 찢지만, 외피가 얇아져 맞교환이 급격히 위험해진다.",
      apply(build) {
        build.maxHpBonus -= 18;
        build.hazardMitigation -= 0.06;
      },
      applyWeapon(stats, build) {
        const mutationLevel = getIllegalOverclockMutationLevel(build);
        stats.illegalOverclockFirePattern = {
          kind: "broadside",
          offsets: getGlassBroadsideOffsets(mutationLevel),
          speedMultiplier: 1.08 + mutationLevel * 0.03,
          radius: 5.2 + mutationLevel * 0.18,
          damageMultiplier: Math.max(0.42, 0.62 - mutationLevel * 0.03),
          life: 0.9 + mutationLevel * 0.06,
          pierceBonus: 0,
          bounceBonus: 0,
          chainBonus: 0,
          color: "#8fe4ff",
        };
      },
      applyMutation(build) {
        build.maxHpBonus -= 8;
        build.hazardMitigation -= 0.025;
        build.moveSpeedBonus -= 4;
      },
    },
    meltdown_cycler: {
      id: "meltdown_cycler",
      label: "Meltdown Cycler",
      title: "Meltdown Cycler",
      tag: "ILLEGAL",
      color: "#ff9f59",
      description:
        "냉각 회로를 찢고 발사 주기를 불법으로 당긴다. 주포는 훨씬 빨라지고 산탄/반사 계열은 한 단계 더 넘치지만, 열 안정성이 무너져 오래 붙들고 쏘기 어렵다.",
      slotText: "연사 폭주 · 냉각/안정성 손실",
      traitLabel: "연사 폭주",
      statusNote: "냉각보다 발사 주기가 먼저 앞질러 장전을 미친 듯이 당긴다. 대신 과열이 더 빨리 쌓여 안정적인 난사가 불가능해진다.",
      apply(build) {
        build.coolRateBonus -= 10;
        build.heatFactor *= 1.22;
      },
      applyWeapon(stats, build) {
        const mutationLevel = getIllegalOverclockMutationLevel(build);
        stats.cooldown = clamp(stats.cooldown * 0.8, 0.08, 0.4);
        stats.damage = round(stats.damage * 1.08, 1);
        if (mutationLevel > 0) {
          stats.cooldown = clamp(stats.cooldown * (1 - mutationLevel * 0.05), 0.08, 0.4);
          stats.damage = round(stats.damage * (1 + mutationLevel * 0.04), 1);
          stats.heatPerShot = round(stats.heatPerShot * (1 + mutationLevel * 0.1), 1);
          stats.illegalOverclockFirePattern = {
            kind: "crown",
            offsets:
              mutationLevel >= 3
                ? [-0.34, -0.18, 0.18, 0.34]
                : mutationLevel === 2
                  ? [-0.24, -0.08, 0.08, 0.24]
                  : [-0.18, 0.18],
            speedMultiplier: 1.18,
            radius: 4.3,
            damageMultiplier: 0.34 + mutationLevel * 0.03,
            life: 0.6,
            pierceBonus: 0,
            bounceBonus: 0,
            chainBonus: 0,
            color: "#ffb277",
          };
        }
        if (stats.core.id === "scatter") {
          stats.pellets += 1;
        }
        if (stats.core.id === "ricochet") {
          stats.bounce += 1;
        }
      },
      applyMutation(build) {
        build.coolRateBonus -= 6;
        build.heatFactor *= 1.1;
        build.moveSpeedBonus -= 6;
      },
    },
    rupture_crown: {
      id: "rupture_crown",
      label: "Rupture Crown",
      title: "Rupture Crown",
      tag: "ILLEGAL",
      color: "#ffd7a6",
      description:
        "주포 위에 파열 crown을 얹어 전방 fan burst를 계속 덧발사한다. 대신 장갑과 냉각을 같이 희생해 오래 버티는 운영을 포기해야 한다.",
      slotText: "전방 crown fan · 체력/냉각 손실",
      traitLabel: "crown fan",
      statusNote: "앞머리에 파열 crown이 붙어 얇은 fan burst가 계속 겹친다. 폭이 넓어진 대신 몸체와 냉각이 얇아져 무리한 유지전이 위험하다.",
      apply(build) {
        build.maxHpBonus -= 14;
        build.coolRateBonus -= 6;
      },
      applyWeapon(stats, build) {
        const mutationLevel = getIllegalOverclockMutationLevel(build);
        stats.illegalOverclockFirePattern = {
          kind: "crown",
          offsets: getRuptureCrownOffsets(mutationLevel),
          speedMultiplier: 0.96 + mutationLevel * 0.03,
          radius: 4.8 + mutationLevel * 0.14,
          damageMultiplier: Math.max(0.28, 0.4 - mutationLevel * 0.02),
          life: 0.74 + mutationLevel * 0.04,
          pierceBonus: 0,
          bounceBonus: 0,
          chainBonus: 0,
          color: "#ffd7a6",
        };
      },
      applyMutation(build) {
        build.maxHpBonus -= 6;
        build.coolRateBonus -= 4;
        build.dashCooldownBonus -= 0.08;
      },
    },
  };

  const SIGNATURE_DEFS = {
    relay_oath: {
      id: "relay_oath",
      label: "Relay Oath",
      tag: "RICOCHET",
      short: "반사·드라이브",
      description: "벽 반사와 오버드라이브 회전을 빠르게 여는 시동 회로.",
      perkText: "Ricochet 보관 x2 · Drive +18% · Overdrive +0.6s",
      startCoreId: "ricochet",
      startAffixes: ["phase_rounds"],
      seedCores: ["ricochet", "ricochet"],
      apply(build) {
        build.driveGainBonus += 0.18;
        build.overdriveDurationBonus += 0.6;
      },
      onRunStart(run) {
        run.player.drive = 24;
      },
    },
    scrap_pact: {
      id: "scrap_pact",
      label: "Salvage Pact",
      tag: "SALVAGE",
      short: "회수·지속",
      description: "고철 회수와 근거리 압박을 안정적으로 여는 수거 회로.",
      perkText: "Scatter 보관 x2 · 고철 +8% · Pickup +18",
      startCoreId: "scatter",
      startAffixes: ["salvage_link"],
      seedCores: ["scatter", "scatter"],
      apply(build) {
        build.scrapMultiplier += 0.08;
        build.pickupBonus += 18;
        build.maxHpBonus += 8;
      },
      onRunStart(run) {
        run.resources.scrap += 10;
      },
    },
    rail_zeal: {
      id: "rail_zeal",
      label: "Rail Zeal",
      tag: "LANCE",
      short: "연쇄·냉각",
      description: "관통탄에 연쇄 전류를 얹어 후반 돌파 라인을 여는 냉각 회로.",
      perkText: "Lance 보관 x2 · Chain +1 · Cool +4",
      startCoreId: "lance",
      startAffixes: ["thermal_weave"],
      seedCores: ["lance", "lance"],
      apply(build) {
        build.chainBonus += 1;
        build.coolRateBonus += 4;
      },
      onRunStart(run) {
        run.player.heat = Math.max(0, run.player.heat - 12);
      },
    },
  };

  const BASTION_DOCTRINE_DEFS = {
    relay_oath: {
      id: "mirror_hunt",
      signatureId: "relay_oath",
      label: "Mirror Hunt Doctrine",
      tag: "HUNT",
      short: "추적 미사일 · 드라이브 압박",
      branchFamilyLabel: "추적 드론",
      starterSystemId: "volt_drones",
      description:
        "반사 코어를 추적 압박 회로에 묶는다. Act 2부터 외곽 정리와 드라이브 순환을 함께 밀어붙이는 사냥형 운영을 강제한다.",
      perkText: "Drive +12% · Move +14 · Volt Drones 즉시 설치 · 이후 포지가 추적/연쇄 라인을 먼저 민다.",
      preferredSystemIds: ["seeker_array", "volt_drones"],
      preferredModIds: ["drive_sync", "arc_array", "step_servos"],
      preferredAffixIds: ["arc_link", "overclock"],
      reservedLane: "공세 모듈",
      reserveText:
        "초반 두 support bay는 공세 모듈 쪽으로 강하게 기울고, Late Break Armory에서 열린 마지막 bay 1칸만 방호/거점 시스템까지 우회 장착할 수 있다.",
      favoredCoreId: "ricochet",
      lateCapstoneId: "relay_storm_lattice",
      apply(build) {
        build.driveGainBonus += 0.12;
        build.moveSpeedBonus += 14;
      },
    },
    scrap_pact: {
      id: "kiln_bastion",
      signatureId: "scrap_pact",
      label: "Kiln Bastion Doctrine",
      tag: "FORT",
      short: "전방 포탑 · 회수 거점",
      branchFamilyLabel: "전방 포탑",
      starterSystemId: "kiln_sentry",
      description:
        "수거 회로를 전방 거점 운영으로 굳힌다. Kiln Sentry가 머무를 이유가 있는 회수 거점을 펼쳐, 같은 구역을 다시 밟으며 밀린 전열을 되찾는 운영을 요구한다.",
      perkText: "Max HP +14 · Hazard Mitigation +8% · Kiln Sentry 거점장 즉시 설치 · 이후 포지가 포탑/방호 라인을 먼저 민다.",
      preferredSystemIds: ["kiln_sentry", "aegis_halo"],
      preferredModIds: ["armor_mesh", "magnet_rig", "reactor_cap"],
      preferredAffixIds: ["salvage_link", "thermal_weave"],
      reservedLane: "보조 시스템",
      reserveText:
        "초반 두 support bay는 포탑/방호 쪽으로 강하게 기울고, Late Break Armory에서 열린 마지막 bay 1칸만 공세 모듈까지 우회 장착할 수 있다.",
      favoredCoreId: "scatter",
      lateCapstoneId: "bulwark_foundry",
      apply(build) {
        build.maxHpBonus += 14;
        build.hazardMitigation += 0.08;
      },
    },
    rail_zeal: {
      id: "storm_artillery",
      signatureId: "rail_zeal",
      label: "Storm Artillery Doctrine",
      tag: "SIEGE",
      short: "돌파 포격 · 냉각 압박",
      branchFamilyLabel: "추적 포격",
      starterSystemId: "seeker_array",
      description:
        "관통 냉각 회로를 장거리 포격 교리로 고정한다. 관통/연쇄 보강과 자율 포격을 더 자주 밀어 올려 긴 사선을 끝까지 유지하게 만든다.",
      perkText: "Damage +4 · Cool +6 · Seeker Array 즉시 설치 · 이후 포지가 관통/포격 라인을 먼저 민다.",
      preferredSystemIds: ["seeker_array", "ember_ring"],
      preferredModIds: ["rail_sleeve", "arc_array", "heat_sink"],
      preferredAffixIds: ["phase_rounds", "arc_link"],
      reservedLane: "공세 모듈",
      reserveText:
        "초반 두 support bay는 포격 모듈 쪽으로 강하게 기울고, Late Break Armory에서 열린 마지막 bay 1칸만 방호/거점 시스템까지 우회 장착할 수 있다.",
      favoredCoreId: "lance",
      lateCapstoneIds: ["sky_lance_battery", "stormspire_needle"],
      apply(build) {
        build.damageBonus += 4;
        build.coolRateBonus += 6;
      },
    },
  };

  const DOCTRINE_CAPSTONE_DEFS = {
    mirror_hunt: {
      id: "relay_storm_lattice",
      doctrineId: "mirror_hunt",
      label: "Relay Storm Lattice",
      title: "Relay Storm Lattice",
      slotText: "교리 완성 · 추적 릴레이 폭풍",
      cost: 78,
      laneLabel: "Doctrine Apex",
      summary: "Ricochet 주포가 칠익 릴레이 벽으로 완성되어, 플레이어가 직접 쓸 때 적열과 외곽 추적선을 한 번에 찢는다.",
      statusNote: "Relay Storm Lattice가 Ricochet를 칠익 릴레이 벽으로 완성해, 직접 각을 잡을수록 외곽 적열이 연쇄 절단된다.",
      description:
        "Mirror Hunt 전용 최종 교리 카드. Ricochet를 칠익 릴레이 벽으로 완성해 첫 적중점에서 추적 분광이 옆 열까지 갈라지고, 벽 반사와 직접 조준이 같은 순간 외곽 추적선을 같이 찢는 플레이어 주도 monster form으로 바꾼다.",
    },
    kiln_bastion: {
      id: "bulwark_foundry",
      doctrineId: "kiln_bastion",
      label: "Bulwark Foundry",
      title: "Bulwark Foundry",
      slotText: "교리 완성 · 회수 요새 주조",
      cost: 80,
      laneLabel: "Doctrine Apex",
      summary: "Scatter가 적중 지점마다 전방 용광 분화를 다시 토해 pocket 입구를 직접 찢고, sentry는 그 뒤를 잠그는 증폭기로만 남는다.",
      statusNote: "Bulwark Foundry가 Scatter를 전방 연쇄 분화 주포로 완성해 플레이어가 직접 pocket 입구를 갈라 낸다.",
      description:
        "Kiln Bastion 전용 최종 교리 카드. Scatter가 적중 지점마다 전방 용광 분화 파편을 다시 토해 pocket 입구 자체를 직접 절단하고, Kiln Sentry 거점은 그 뒤를 고정하는 증폭층으로만 남겨 플레이어가 자기 몸과 주포로 전열을 다시 그리게 만든다.",
    },
    storm_artillery: {
      id: "sky_lance_battery",
      doctrineId: "storm_artillery",
      label: "Sky Lance Battery",
      title: "Sky Lance Battery",
      slotText: "교리 완성 · 광역 천공망",
      cost: 82,
      laneLabel: "Doctrine Apex",
      summary: "주 레일이 화면 폭으로 벌어진 천공망으로 완성되어, 멀리서 쓸어도 후열과 차폐선을 동시에 찢는다.",
      statusNote: "Sky Lance Battery가 넓은 천공망을 펼쳐 후열 전체를 직접 베어 넘긴다.",
      description:
        "Storm Artillery 전용 최종 교리 카드. Lance를 넓은 배터리 사격 형태로 완성해 플레이어가 직접 후열과 측면을 가르는 화면 폭 공성선이 된다. Seeker Array는 빈 사선을 정리하는 보조층으로만 남는다.",
    },
    stormspire_needle: {
      id: "stormspire_needle",
      doctrineId: "storm_artillery",
      label: "Stormspire Needle",
      title: "Stormspire Needle",
      slotText: "교리 완성 · 집중 천공 첨탑",
      cost: 82,
      laneLabel: "Doctrine Apex",
      summary: "주 레일이 좁고 거대한 첨탑 사격으로 압축되어, 적열이나 코어를 정확히 꿰면 전도 파편이 옆 열까지 찢는다.",
      statusNote: "Stormspire Needle이 좁은 과관통 첨탑 사격으로 코어와 엘리트를 꿰뚫고 옆 열까지 갈라낸다.",
      description:
        "Storm Artillery 전용 최종 교리 카드. Lance를 소수의 초중량 첨탑 사격으로 압축해, 플레이어가 직접 적열과 코어를 일직선으로 세워야 최대 화력이 나온다. Seeker Array는 빗나간 측면만 정리하는 보조층으로 남는다.",
    },
  };

  const DOCTRINE_FORGE_PURSUIT_DEFS = {
    mirror_hunt: {
      id: "mirror_hunt",
      label: "Relay Storm Frame",
      shortLabel: "Storm Frame",
      goal: 2,
      shardLabel: "relay shard",
      description:
        "Wave 6-8 marked elite가 relay shard를 떨어뜨린다. 두 개를 회수하면 Mirror Hunt 장기 추격이 완성되어 주무장과 추적층이 한 번에 폭주한다.",
      failureText:
        "Wave 8이 끝날 때까지 relay shard를 다 못 모으면 이번 런의 Relay Storm Frame은 미완성으로 끝난다.",
    },
    kiln_bastion: {
      id: "kiln_bastion",
      label: "Bulwark Frame",
      shortLabel: "Bulwark Frame",
      goal: 2,
      shardLabel: "bulwark shard",
      description:
        "Wave 6-8 marked elite가 bulwark shard를 떨어뜨린다. 두 개를 회수하면 Kiln Bastion 장기 추격이 완성되어 영역 장악 화력과 거점층이 함께 닫힌다.",
      failureText:
        "Wave 8이 끝날 때까지 bulwark shard를 다 못 모으면 이번 런의 Bulwark Frame은 미완성으로 끝난다.",
    },
    storm_artillery: {
      id: "storm_artillery",
      label: "Sky Lance Frame",
      shortLabel: "Sky Lance Frame",
      goal: 2,
      shardLabel: "lance shard",
      description:
        "Wave 6-8 marked elite가 lance shard를 떨어뜨린다. 두 개를 회수하면 Storm Artillery 장기 추격이 완성되어 공성 레일과 포격층이 함께 열린다.",
      failureText:
        "Wave 8이 끝날 때까지 lance shard를 다 못 모으면 이번 런의 Sky Lance Frame은 미완성으로 끝난다.",
    },
  };

  const DOCTRINE_WEAPON_LADDER_DEFS = {
    mirror_hunt: {
      coreId: "ricochet",
      stages: {
        1: {
          label: "Hunt Frame",
          traitLabel: "삼익 추적 분광",
          statusNote:
            "Hunt Frame이 중앙 주포 양옆에 추적 분광 날개를 더해, 교리 잠금 직후부터 반사 진입과 측면 스윕이 동시에 보이는 사냥 차체가 된다.",
          damageBonus: 5,
          cooldownMultiplier: 0.94,
          firePattern: {
            offsets: [-0.28, 0, 0.28],
            damageMultiplier: 0.58,
            speedMultiplier: 1.08,
            radius: 4.3,
            life: 1.2,
            pierceBonus: 0,
            bounceBonus: 1,
            chainBonus: 0,
            color: "#f5e2ff",
          },
        },
        2: {
          label: "Relay Storm Frame",
          traitLabel: "오익 사냥 격자",
          statusNote:
            "Relay Storm Frame이 다섯 갈래 추적 격자를 깔고 반사 연쇄까지 물어, 플레이어가 직접 열린 외곽을 순식간에 갈아 버린다.",
          damageBonus: 8,
          cooldownMultiplier: 0.9,
          chainBonus: 1,
          chainRangeBonus: 30,
          firePattern: {
            offsets: [-0.34, -0.17, 0, 0.17, 0.34],
            damageMultiplier: 0.46,
            speedMultiplier: 1.1,
            radius: 4,
            life: 1.22,
            pierceBonus: 0,
            bounceBonus: 1,
            chainBonus: 1,
            color: "#fff0ff",
          },
        },
        3: {
          variants: {
            relay_storm_lattice: {
              label: "Relay Storm Lattice",
              traitLabel: "칠익 릴레이 벽",
              statusNote:
                "Relay Storm Lattice가 일곱 갈래 릴레이 벽을 펼치고 첫 적중점마다 추적 분광 둘을 더 갈라, 플레이어가 직접 외곽 적열을 연쇄 절단하는 monster form이 된다.",
              damageBonus: 11,
              cooldownMultiplier: 0.86,
              chainBonus: 1,
              chainRangeBonus: 40,
              firePattern: {
                offsets: [-0.42, -0.28, -0.14, 0, 0.14, 0.28, 0.42],
                damageMultiplier: 0.5,
                speedMultiplier: 1.14,
                radius: 4.2,
                life: 1.28,
                pierceBonus: 0,
                bounceBonus: 1,
                chainBonus: 1,
                color: "#ffffff",
              },
              onHit: {
                kind: "mirror_reave",
                burstCount: 2,
                range: 176,
                damageMultiplier: 0.58,
                speedMultiplier: 1.06,
                color: "#c7fbff",
              },
            },
          },
        },
      },
    },
    kiln_bastion: {
      coreId: "scatter",
      stages: {
        1: {
          label: "Kiln Frame",
          traitLabel: "쌍중 용광 씨앗",
          statusNote:
            "Kiln Frame이 산탄 사이에 이중 용광 씨앗을 함께 박아, 초반부터 sentry보다 플레이어 본체가 pocket 입구를 먼저 태워 여는 공성형 차체가 된다.",
          damageBonus: 5,
          cooldownMultiplier: 0.95,
          firePattern: {
            kind: "slag_seed",
            count: 2,
            spread: 0.14,
            speedMultiplier: 0.7,
            radius: 6.6,
            life: 0.72,
            damageMultiplier: 0.76,
            blastRadius: 58,
            blastDamageMultiplier: 0.78,
            poolRadius: 68,
            poolDuration: 1.58,
            poolTickInterval: 0.32,
            poolDamageMultiplier: 0.17,
            color: "#ffd59b",
            poolColor: "rgba(255, 163, 84, 0.28)",
          },
        },
        2: {
          label: "Crucible Scatter",
          traitLabel: "삼중 용광 도랑",
          statusNote:
            "Crucible Scatter가 전방 삼중 용광 씨앗으로 되찾은 pocket 가장자리를 직접 봉쇄해, 전열을 다시 같은 구역으로 유도한다.",
          damageBonus: 6,
          cooldownMultiplier: 0.94,
          pierceBonus: 1,
          firePattern: {
            kind: "slag_seed",
            count: 3,
            spread: 0.2,
            speedMultiplier: 0.72,
            radius: 6.8,
            life: 0.74,
            damageMultiplier: 0.68,
            blastRadius: 62,
            blastDamageMultiplier: 0.82,
            poolRadius: 74,
            poolDuration: 1.7,
            poolTickInterval: 0.3,
            poolDamageMultiplier: 0.18,
            color: "#ffe1b0",
            poolColor: "rgba(255, 170, 92, 0.32)",
          },
        },
        3: {
          variants: {
            bulwark_foundry: {
              label: "Bulwark Furnace",
              traitLabel: "오중 분화 요새",
              statusNote:
                "Bulwark Furnace가 오중 용광 화구에 적중 분화까지 덧대 pocket 입구를 직접 갈라 버리고, sentry 거점장은 그 뒤를 굳히는 증폭층으로만 남는다.",
              damageBonus: 10,
              cooldownMultiplier: 0.9,
              pierceBonus: 1,
              firePattern: {
                kind: "slag_seed",
                count: 5,
                spread: 0.17,
                speedMultiplier: 0.76,
                radius: 7.2,
                life: 0.78,
                damageMultiplier: 0.72,
                blastRadius: 68,
                blastDamageMultiplier: 0.9,
                poolRadius: 82,
                poolDuration: 1.95,
                poolTickInterval: 0.28,
                poolDamageMultiplier: 0.2,
                color: "#fff0c2",
                poolColor: "rgba(255, 188, 104, 0.34)",
              },
              onHit: {
                kind: "foundry_shatter",
                burstCount: 3,
                spread: 0.24,
                speedMultiplier: 0.88,
                damageMultiplier: 0.46,
                radius: 5.4,
                life: 0.2,
                color: "#ffe1b0",
                slagSeed: {
                  blastRadius: 42,
                  blastDamageMultiplier: 0.36,
                  poolRadius: 36,
                  poolDuration: 1.15,
                  poolTickInterval: 0.26,
                  poolDamageMultiplier: 0.12,
                  poolColor: "rgba(255, 176, 92, 0.3)",
                },
              },
            },
          },
        },
      },
    },
    storm_artillery: {
      coreId: "lance",
      stages: {
        1: {
          label: "Siege Frame",
          traitLabel: "삼연 외곽 공성선",
          statusNote:
            "Siege Frame이 중앙 레일 양옆에 장거리 공성선을 더해, doctrine 잠금 직후부터 본체가 화면 폭 사선을 먼저 장악하는 포격 차체가 된다.",
          damageBonus: 5,
          cooldownMultiplier: 0.94,
          firePattern: {
            offsets: [-0.26, 0, 0.26],
            damageMultiplier: 0.6,
            speedMultiplier: 1.16,
            radius: 5.2,
            life: 1.22,
            pierceBonus: 1,
            bounceBonus: 0,
            chainBonus: 0,
            color: "#d8fbff",
          },
        },
        2: {
          label: "Thunder Rack",
          traitLabel: "오연 공성선",
          statusNote:
            "Thunder Rack이 넓은 다중 공성선을 펼치고 relay pylon 적중 시 과전도 절개를 뿌려 회랑을 연쇄 절단한다.",
          damageBonus: 6,
          cooldownMultiplier: 0.92,
          pierceBonus: 1,
          chainBonus: 1,
          chainRangeBonus: 22,
          onHazardHit: {
            kind: "relay_sever",
            burstCount: 1,
            range: 236,
            damageMultiplier: 0.8,
            speedMultiplier: 1.14,
            color: "#dffcff",
          },
          firePattern: {
            offsets: [-0.3, -0.12, 0.12, 0.3],
            damageMultiplier: 0.54,
            speedMultiplier: 1.18,
            radius: 5,
            life: 1.24,
            pierceBonus: 1,
            bounceBonus: 0,
            chainBonus: 1,
            color: "#eefeff",
          },
        },
        3: {
          variants: {
            sky_lance_battery: {
              label: "Sky Lance Battery",
              traitLabel: "칠연 천공망",
              statusNote:
                "Sky Lance Battery가 화면 폭의 천공망을 깔고 relay pylon마다 추가 천공 절개를 뿌려 후열과 회랑을 동시에 찢는다.",
              damageBonus: 10,
              cooldownMultiplier: 0.88,
              pierceBonus: 2,
              chainBonus: 1,
              chainRangeBonus: 38,
              onHazardHit: {
                kind: "relay_sever",
                burstCount: 2,
                range: 284,
                damageMultiplier: 0.88,
                speedMultiplier: 1.18,
                color: "#ffffff",
              },
              firePattern: {
                offsets: [-0.36, -0.22, -0.08, 0.08, 0.22, 0.36],
                damageMultiplier: 0.56,
                speedMultiplier: 1.22,
                radius: 5.2,
                life: 1.28,
                pierceBonus: 2,
                bounceBonus: 0,
                chainBonus: 1,
                color: "#ffffff",
              },
            },
            stormspire_needle: {
              label: "Stormspire Needle",
              traitLabel: "삼중 첨탑 관통",
              statusNote:
                "Stormspire Needle이 좁은 삼중 첨탑 레일로 코어와 엘리트를 꿰고, relay pylon 적중 시 절개 파편이 linked pylon까지 꿰뚫는다.",
              damageBonus: 16,
              cooldownMultiplier: 0.94,
              pierceBonus: 4,
              chainBonus: 1,
              chainRangeBonus: 18,
              onHazardHit: {
                kind: "relay_sever",
                burstCount: 2,
                range: 264,
                damageMultiplier: 1.05,
                speedMultiplier: 1.22,
                color: "#fff5dd",
              },
              firePattern: {
                offsets: [-0.08, 0.08],
                damageMultiplier: 0.78,
                speedMultiplier: 1.28,
                radius: 6.3,
                life: 1.34,
                pierceBonus: 3,
                bounceBonus: 0,
                chainBonus: 0,
                color: "#fff5dd",
              },
              onHit: {
                kind: "stormspire_branch",
                burstCount: 2,
                range: 172,
                damageMultiplier: 0.66,
                speedMultiplier: 1.05,
                color: "#a6f3ff",
              },
            },
          },
        },
      },
    },
  };

  const DOCTRINE_BODY_LADDER_DEFS = {
    mirror_hunt: {
      1: {
        label: "Hunt Wing Rig",
        statusNote:
          "Hunt Wing Rig가 측면 익판을 먼저 펼쳐, 교리 잠금 직후부터 짧은 flank cut과 shard 회수를 본체 기동으로 여는 차체가 된다.",
        applyPlayer(stats) {
          stats.moveSpeed += 10;
          stats.pickupRadius += 8;
          stats.dashCooldown = clamp(stats.dashCooldown - 0.08, 1.2, 3.2);
        },
      },
      2: {
        label: "Stormglass Pursuit Frame",
        statusNote:
          "Stormglass Pursuit Frame이 측면 익판과 절개 척추를 벌려, 열린 외곽을 더 길게 물고 늘어지는 추격 차체가 된다.",
        applyPlayer(stats) {
          stats.moveSpeed += 16;
          stats.pickupRadius += 14;
          stats.dashCooldown = clamp(stats.dashCooldown - 0.16, 1.15, 3.2);
        },
      },
    },
    kiln_bastion: {
      1: {
        label: "Kiln Mantlet",
        statusNote:
          "Kiln Mantlet가 전방 방열판과 어깨 차폐를 먼저 닫아, 웨이브 3-5부터 본체가 sentry보다 앞에서 pocket 입구를 버티며 태우는 차체가 된다.",
        applyPlayer(stats) {
          stats.maxHp += 10;
          stats.coolRate += 4;
          stats.hazardMitigation = clamp(stats.hazardMitigation + 0.04, 0, 0.45);
        },
      },
      2: {
        label: "Bulwark Carapace",
        statusNote:
          "Bulwark Carapace가 전방 방열판과 용광 어깨를 닫아, reclaimed pocket 안에서 더 오래 버티며 정면 압박을 밀어내는 차체가 된다.",
        applyPlayer(stats) {
          stats.maxHp += 18;
          stats.coolRate += 6;
          stats.hazardMitigation = clamp(stats.hazardMitigation + 0.08, 0, 0.45);
        },
      },
    },
    storm_artillery: {
      1: {
        label: "Siege Rack Carriage",
        statusNote:
          "Siege Rack Carriage가 등판 배터리와 앞포신을 먼저 잠가, 웨이브 3-5부터 긴 사선을 기체 실루엣 자체로 읽히게 만든다.",
        applyPlayer(stats) {
          stats.maxHp += 6;
          stats.coolRate += 4;
          stats.pickupRadius += 6;
        },
      },
      2: {
        label: "Thunder Rack Carriage",
        statusNote:
          "Thunder Rack Carriage가 등판 배터리와 길어진 포신을 잠가, 이동은 조금 굼떠져도 공성 사선과 냉각 여유를 더 길게 확보한다.",
        applyPlayer(stats) {
          stats.maxHp += 10;
          stats.moveSpeed -= 6;
          stats.coolRate += 8;
          stats.pickupRadius += 10;
        },
      },
    },
  };

  const DEFAULT_SIGNATURE_ID = "relay_oath";
  const ARCHITECTURE_DRAFT_WAVE = 3;
  const FORGE_PACKAGE_START_WAVE = 3;
  const ACT_BREAK_ARMORY_WAVE = 5;
  const LATE_BREAK_ARMORY_WAVE = 9;
  const CONSOLIDATED_12_WAVE_ROUTE = true;
  const ACT3_CATALYST_DRAFT_WAVE = 10;
  const OVERCOMMIT_TRIAL_WAVE = 5;
  const OVERCOMMIT_SALVAGE_REQUIRED = 3;
  const OVERCOMMIT_SALVAGE_LIFE = 7.5;
  const ACT_LABELS = [
    { start: 1, end: 4, label: "Act 1 · Ignition", shortLabel: "Act 1" },
    { start: 5, end: 8, label: "Act 2 · Bastion Run", shortLabel: "Act 2" },
    { start: 9, end: 12, label: "Act 3 · Crown Siege", shortLabel: "Act 3" },
    { start: 13, end: 19, label: "Act 4 · Afterburn", shortLabel: "Act 4" },
  ];
  const FIELD_GRANT_MAX_COST = 48;
  const FIELD_GRANT_DISCOUNT_MULTIPLIER = 0.65;
  const FIELD_GRANT_MIN_COST = 10;
  const ACT_BREAK_ARMORY_MAX_CHOICES = 6;
  const ACT_BREAK_CHASSIS_MOD_IDS = [
    "drive_sync",
    "armor_mesh",
    "heat_sink",
    "reactor_cap",
    "step_servos",
    "magnet_rig",
  ];
  const MAX_WEAPON_EVOLUTION_TIER = 3;
  const WEAPON_EVOLUTION_DEFS = {
    ember: {
      tiers: {
        1: {
          tier: 1,
          title: "Fork Array",
          label: "Fork Array",
          tag: "EVOLVE",
          cost: 44,
          description:
            "주 총열 양옆에 보조 점화 총열을 더한다. 정면 단일선 대신 얇은 삼중 화선을 깔아 중반 측면 진입선을 함께 긁는다.",
          slotText: "주무장 진화 · 삼열 점화",
          previewText: "보조 총열 2기",
          traitLabel: "삼열 점화",
          statusNote: "Fork Array가 주탄 양옆으로 점화선을 더 깔아 측면 진입선을 함께 긁는다.",
          firePattern: {
            offsets: [-0.16, 0.16],
            damageMultiplier: 0.62,
            speedMultiplier: 1.04,
            radius: 4.4,
            life: 1.12,
            pierceBonus: 0,
            bounceBonus: 0,
            chainBonus: 0,
            color: "#ffe08a",
          },
        },
        2: {
          tier: 2,
          title: "Sunspoke Manifold",
          label: "Sunspoke Manifold",
          tag: "EVOLVE",
          cost: 62,
          description:
            "Fork Array를 4개 보조 총열로 증설한다. 정면 조준만 해도 넓은 부채꼴 화선이 열려 후반 웨이브의 측면 재진입을 훨씬 빨리 긁어낸다.",
          slotText: "주무장 진화 · 오열 점화",
          previewText: "보조 총열 4기",
          traitLabel: "오열 점화",
          statusNote: "Sunspoke Manifold가 넓은 부채꼴 화선을 열어 정면과 측면을 함께 태운다.",
          firePattern: {
            offsets: [-0.22, -0.08, 0.08, 0.22],
            damageMultiplier: 0.58,
            speedMultiplier: 1.06,
            radius: 4.4,
            life: 1.14,
            pierceBonus: 0,
            bounceBonus: 0,
            chainBonus: 0,
            color: "#fff1a8",
          },
        },
        3: {
          tier: 3,
          title: "Solar Crown",
          label: "Solar Crown",
          tag: "EVOLVE",
          cost: 80,
          description:
            "Sunspoke Manifold를 왕관형 점화망으로 완성한다. 중앙 조준만 유지해도 일곱 갈래 화선이 전방과 대각 재진입선을 함께 잠가 후반 진입 각을 통째로 태운다.",
          slotText: "주무장 진화 · 칠열 왕관 점화",
          previewText: "왕관 보조 총열 6기",
          traitLabel: "칠열 왕관 점화",
          statusNote: "Solar Crown이 일곱 갈래 왕관 화선으로 전방과 대각 진입선을 한 번에 잠근다.",
          firePattern: {
            offsets: [-0.32, -0.2, -0.1, 0.1, 0.2, 0.32],
            damageMultiplier: 0.54,
            speedMultiplier: 1.08,
            radius: 4.5,
            life: 1.16,
            pierceBonus: 0,
            bounceBonus: 0,
            chainBonus: 0,
            color: "#fff6c9",
          },
        },
      },
    },
    scatter: {
      tiers: {
        1: {
          tier: 1,
          title: "Cinder Mines",
          label: "Cinder Mines",
          tag: "EVOLVE",
          cost: 42,
          description:
            "산탄 끝에 느린 용광 씨앗을 덧댄다. 씨앗은 전방에서 폭발해 짧은 화염 지대를 남기므로 근접 폭딜 무기가 전방 점거형 무기로 변한다.",
          slotText: "주무장 진화 · 용광 지뢰",
          previewText: "전방 화염 지대",
          traitLabel: "용광 지뢰 x1",
          statusNote: "Cinder Mines가 전방에 용광 씨앗을 심어 추격선과 재진입 각을 잠시 봉쇄한다.",
          firePattern: {
            kind: "slag_seed",
            count: 1,
            spread: 0,
            speedMultiplier: 0.54,
            radius: 6.2,
            life: 0.6,
            damageMultiplier: 0.56,
            blastRadius: 54,
            blastDamageMultiplier: 0.7,
            poolRadius: 62,
            poolDuration: 1.35,
            poolTickInterval: 0.32,
            poolDamageMultiplier: 0.16,
            color: "#ffbd73",
            poolColor: "rgba(255, 125, 46, 0.3)",
          },
        },
        2: {
          tier: 2,
          title: "Kiln Minefield",
          label: "Kiln Minefield",
          tag: "EVOLVE",
          cost: 60,
          description:
            "용광 씨앗을 두 발로 늘리고 폭발 반경과 화염 지대 유지 시간을 키운다. 조준선 앞에 이중 지뢰대를 깔아 추격과 측면 스윕을 동시에 예고할 수 있다.",
          slotText: "주무장 진화 · 이중 용광 지뢰",
          previewText: "이중 화염 지대",
          traitLabel: "용광 지뢰 x2",
          statusNote: "Kiln Minefield가 두 갈래 용광 지뢰대로 전방 회랑을 잠가 적 움직임을 미리 꺾는다.",
          firePattern: {
            kind: "slag_seed",
            count: 2,
            spread: 0.18,
            speedMultiplier: 0.56,
            radius: 6.6,
            life: 0.68,
            damageMultiplier: 0.6,
            blastRadius: 60,
            blastDamageMultiplier: 0.78,
            poolRadius: 72,
            poolDuration: 1.7,
            poolTickInterval: 0.3,
            poolDamageMultiplier: 0.18,
            color: "#ffce8b",
            poolColor: "rgba(255, 150, 62, 0.32)",
          },
        },
        3: {
          tier: 3,
          title: "Caldera Verge",
          label: "Caldera Verge",
          tag: "EVOLVE",
          cost: 78,
          description:
            "용광 씨앗을 세 발로 묶어 더 멀리 심고, 폭발 뒤 남는 칼데라 지대를 크게 키운다. 산탄이 근접 청소기에서 전방 진입로를 직접 설계하는 영역 장악 무기로 완성된다.",
          slotText: "주무장 진화 · 칼데라 지뢰망",
          previewText: "삼중 칼데라 지대",
          traitLabel: "칼데라 지뢰 x3",
          statusNote: "Caldera Verge가 삼중 칼데라 지대로 전방 회랑과 추격선을 함께 태워 이동 경로 자체를 재배치한다.",
          firePattern: {
            kind: "slag_seed",
            count: 3,
            spread: 0.22,
            speedMultiplier: 0.6,
            radius: 7,
            life: 0.74,
            damageMultiplier: 0.64,
            blastRadius: 66,
            blastDamageMultiplier: 0.88,
            poolRadius: 84,
            poolDuration: 2.05,
            poolTickInterval: 0.28,
            poolDamageMultiplier: 0.2,
            color: "#ffe1b0",
            poolColor: "rgba(255, 175, 88, 0.34)",
          },
        },
      },
    },
    lance: {
      tiers: {
        1: {
          tier: 1,
          title: "Twin Spine",
          label: "Twin Spine",
          tag: "EVOLVE",
          cost: 46,
          description:
            "주 레일 옆으로 보조 레일 두 줄을 깐다. 정면 절개에만 묶이지 않고 엘리트 옆 라인까지 동시에 찢는 이중 레일이 열린다.",
          slotText: "주무장 진화 · 이중 보조 레일",
          previewText: "보조 레일 2줄",
          traitLabel: "삼중 레일",
          statusNote: "Twin Spine이 메인 레일 옆으로 보조 레일을 깔아 얇은 전열 셋을 한 번에 찢는다.",
          firePattern: {
            offsets: [-0.08, 0.08],
            damageMultiplier: 0.68,
            speedMultiplier: 1.08,
            radius: 5.4,
            life: 1.14,
            pierceBonus: 1,
            bounceBonus: 0,
            chainBonus: 0,
            color: "#b6f4ff",
          },
        },
        2: {
          tier: 2,
          title: "Trident Rail",
          label: "Trident Rail",
          tag: "EVOLVE",
          cost: 64,
          description:
            "보조 레일을 다시 증설해 삼지창처럼 펼친다. 단일 관통선이 여러 진입 라인을 동시에 꿰뚫는 후반용 화면 장악기로 변한다.",
          slotText: "주무장 진화 · 확장 삼지창 레일",
          previewText: "확장 보조 레일",
          traitLabel: "오연 레일",
          statusNote: "Trident Rail이 넓게 벌어진 보조 레일로 복수의 진입 라인을 동시에 관통한다.",
          firePattern: {
            offsets: [-0.16, -0.05, 0.05, 0.16],
            damageMultiplier: 0.62,
            speedMultiplier: 1.12,
            radius: 5.2,
            life: 1.16,
            pierceBonus: 1,
            bounceBonus: 0,
            chainBonus: 0,
            color: "#d8fbff",
          },
        },
        3: {
          tier: 3,
          title: "Aurora Lattice",
          label: "Aurora Lattice",
          tag: "EVOLVE",
          cost: 82,
          description:
            "Trident Rail을 격자형 돌파선으로 확장한다. 일곱 줄 레일이 얇은 장벽처럼 깔려 엘리트 전열과 측면 추격선을 동시에 꿰뚫는 후반 진입 차단기로 완성된다.",
          slotText: "주무장 진화 · 칠연 격자 레일",
          previewText: "격자 보조 레일",
          traitLabel: "칠연 격자 레일",
          statusNote: "Aurora Lattice가 일곱 줄 레일 장벽으로 전열과 측면 추격선을 함께 꿰뚫는다.",
          firePattern: {
            offsets: [-0.24, -0.14, -0.06, 0.06, 0.14, 0.24],
            damageMultiplier: 0.58,
            speedMultiplier: 1.14,
            radius: 5.1,
            life: 1.18,
            pierceBonus: 2,
            bounceBonus: 0,
            chainBonus: 0,
            color: "#eefeff",
          },
        },
      },
    },
    ricochet: {
      tiers: {
        1: {
          tier: 1,
          title: "Prism Crown",
          label: "Prism Crown",
          tag: "EVOLVE",
          cost: 43,
          description:
            "중앙 분광탄 한 발을 더해 반사 진입 각을 더 쉽게 잡는다. 양갈래 총열이 세 갈래 팬으로 넓어지며 측면 스윕이 분명해진다.",
          slotText: "주무장 진화 · 중앙 분광탄",
          previewText: "분광탄 1발 추가",
          traitLabel: "삼중 분광탄",
          statusNote: "Prism Crown이 중앙 분광탄을 더해 벽 반사 각을 더 안정적으로 건다.",
          firePattern: {
            offsets: [0],
            damageMultiplier: 0.74,
            speedMultiplier: 1,
            radius: 4.3,
            life: 1.18,
            pierceBonus: 0,
            bounceBonus: 1,
            chainBonus: 0,
            color: "#f0d4ff",
          },
        },
        2: {
          tier: 2,
          title: "Glass Choir",
          label: "Glass Choir",
          tag: "EVOLVE",
          cost: 61,
          description:
            "분광탄을 다섯 갈래 합창으로 확장한다. 벽을 스치기만 해도 여러 입사각이 동시에 생겨 후반의 측면 정리와 연쇄 진입이 크게 쉬워진다.",
          slotText: "주무장 진화 · 오중 분광탄",
          previewText: "분광탄 3발 추가",
          traitLabel: "오중 분광탄",
          statusNote: "Glass Choir가 다섯 갈래 분광탄으로 벽 반사 각을 넓게 깐다.",
          firePattern: {
            offsets: [-0.18, 0, 0.18],
            damageMultiplier: 0.66,
            speedMultiplier: 1.02,
            radius: 4.2,
            life: 1.2,
            pierceBonus: 0,
            bounceBonus: 1,
            chainBonus: 0,
            color: "#f7e6ff",
          },
        },
        3: {
          tier: 3,
          title: "Mirror Cathedral",
          label: "Mirror Cathedral",
          tag: "EVOLVE",
          cost: 79,
          description:
            "Glass Choir를 일곱 갈래 거울 합창으로 완성한다. 벽을 스치는 순간 더 많은 입사각이 퍼져 후반 외곽 재진입과 중앙 반사 청소가 동시에 열린다.",
          slotText: "주무장 진화 · 칠중 분광탄",
          previewText: "분광탄 5발 추가",
          traitLabel: "칠중 분광탄",
          statusNote: "Mirror Cathedral이 일곱 갈래 분광탄으로 벽 반사 각을 화면 폭만큼 넓힌다.",
          firePattern: {
            offsets: [-0.28, -0.18, -0.08, 0.08, 0.18, 0.28],
            damageMultiplier: 0.6,
            speedMultiplier: 1.04,
            radius: 4.1,
            life: 1.22,
            pierceBonus: 0,
            bounceBonus: 1,
            chainBonus: 0,
            color: "#fcf2ff",
          },
        },
      },
    },
  };
  const FINISHER_RECIPE_DEFS = {
    ember: {
      label: "Crown Pyre",
      summary: "기본 회로를 고속 관통 화선으로 압축하는 정밀 starter-core 피니셔.",
      steps: [
        {
          type: "affix",
          affixId: "overclock",
          title: "Relay Spool",
          slotText: "연사 예열",
        },
        {
          type: "affix",
          affixId: "phase_rounds",
          title: "Needle Core",
          slotText: "직선 관통",
        },
        {
          type: "affix",
          affixId: "hotshot",
          title: "Crown Pyre",
          slotText: "종결 화선",
        },
      ],
    },
    scatter: {
      label: "Kiln Bloom",
      summary: "근거리 과열 산탄을 끝까지 밀어 붙이는 전설 산탄 레시피.",
      steps: [
        {
          type: "core",
          minCopies: 4,
          title: "Legendary Sync",
          slotText: "전설 동기화",
        },
        {
          type: "affix",
          affixId: "overclock",
          title: "Bloom Chamber",
          slotText: "탄막 증폭",
        },
        {
          type: "affix",
          affixId: "thermal_weave",
          title: "Coolant Lattice",
          slotText: "발열 제어",
        },
        {
          type: "affix",
          affixId: "hotshot",
          title: "Cinder Bloom",
          slotText: "마무리 화력",
        },
      ],
    },
    lance: {
      label: "Sky Pierce",
      summary: "관통선과 연쇄를 한 줄로 묶어 엘리트 전열을 찢는 레일 레시피.",
      steps: [
        {
          type: "core",
          minCopies: 4,
          title: "Legendary Rail",
          slotText: "전설 레일 동조",
        },
        {
          type: "affix",
          affixId: "phase_rounds",
          title: "Needle Stack",
          slotText: "심화 관통",
        },
        {
          type: "affix",
          affixId: "arc_link",
          title: "Breaker Arc",
          slotText: "연쇄 돌파",
        },
        {
          type: "affix",
          affixId: "thermal_weave",
          title: "Cold Spur",
          slotText: "지속 발사 안정화",
        },
      ],
    },
    ricochet: {
      label: "Prism Cascade",
      summary: "반사, 연쇄, 속사를 엮어 웨이브 정리를 가속하는 분광 레시피.",
      steps: [
        {
          type: "core",
          minCopies: 4,
          title: "Legendary Prism",
          slotText: "전설 반사 동조",
        },
        {
          type: "affix",
          affixId: "arc_link",
          title: "Cascade Link",
          slotText: "연쇄 반사 결합",
        },
        {
          type: "affix",
          affixId: "overclock",
          title: "Split Accelerator",
          slotText: "반사 회전 가속",
        },
        {
          type: "affix",
          affixId: "phase_rounds",
          title: "Glass Spear",
          slotText: "재진입 관통",
        },
      ],
    },
  };

  const CATALYST_REFORGE_DEFS = {
    ember: {
      id: "sear_halo",
      coreId: "ember",
      label: "Sear Halo",
      title: "Sear Halo",
      slotText: "촉매 재구성 · 에코 화선",
      description:
        "Crown Pyre 촉매를 태워 주탄 양옆에 에코 볼트를 덧댄다. 단일 종결 화력 대신 얇은 다중 라인을 길게 유지하는 쪽을 택한다.",
      apply(build) {
        build.cooldownBonus += 0.018;
        build.driveGainBonus += 0.2;
        build.moveSpeedBonus += 10;
        build.catalystCapstoneId = "sear_halo";
      },
      applyWeapon(stats) {
        stats.capstoneTraitLabel = "쌍선 에코 볼트";
        stats.capstoneStatusNote = "주탄 양옆으로 에코 볼트가 벌어져 측면 진입선을 함께 훑는다.";
        stats.capstoneFire = {
          kind: "ember_echo",
          projectileCount: 2,
          spread: 0.11,
          damageMultiplier: 0.62,
          speedMultiplier: 1.06,
          radius: 4.6,
          color: "#ffe08a",
        };
      },
    },
    scatter: {
      id: "flash_temper",
      coreId: "scatter",
      label: "Flash Temper",
      title: "Flash Temper",
      slotText: "촉매 재구성 · 관통 산탄",
      description:
        "Kiln Bloom 촉매를 태워 매 발마다 중심 관통 슬러그를 함께 박아 넣는다. 완성형 화력 대신 전열 절개와 드라이브 순환을 택한다.",
      apply(build) {
        build.damageBonus += 6;
        build.pierceBonus += 1;
        build.driveGainBonus += 0.22;
        build.catalystCapstoneId = "flash_temper";
      },
      applyWeapon(stats) {
        stats.capstoneTraitLabel = "중앙 관통 슬러그";
        stats.capstoneStatusNote = "주탄막 사이로 고속 슬러그가 함께 나가 전열을 곧게 찢는다.";
        stats.capstoneFire = {
          kind: "temper_slug",
          damageMultiplier: 1.55,
          pierceBonus: 2,
          speedMultiplier: 1.2,
          radius: 5.6,
          color: "#ffd166",
        };
      },
    },
    lance: {
      id: "storm_rail",
      coreId: "lance",
      label: "Storm Rail",
      title: "Storm Rail",
      slotText: "촉매 재구성 · 연쇄 레일",
      description:
        "Sky Pierce 촉매를 태워 명중점에서 연쇄 분기 레일을 터뜨린다. 엘리트 관통선 대신 광역 전도 압박을 고른다.",
      apply(build) {
        build.chainBonus += 1;
        build.cooldownBonus += 0.024;
        build.coolRateBonus += 6;
        build.catalystCapstoneId = "storm_rail";
      },
      applyWeapon(stats) {
        stats.capstoneTraitLabel = "충격 분기 레일";
        stats.capstoneStatusNote = "레일이 적중한 자리에서 주변 적 둘까지 전도 분기가 추가로 뻗는다.";
        stats.capstoneOnHit = {
          kind: "storm_branch",
          burstCount: 2,
          range: 188,
          damageMultiplier: 0.58,
          speedMultiplier: 1.08,
          color: "#8ae7ff",
        };
      },
    },
    ricochet: {
      id: "mirror_spiral",
      coreId: "ricochet",
      label: "Mirror Spiral",
      title: "Mirror Spiral",
      slotText: "촉매 재구성 · 속사 분광",
      description:
        "Prism Cascade 촉매를 태워 첫 반사 시 거울 파편 둘로 갈라진다. 완성 레시피 대신 더 빠른 회전과 연쇄로 밀어 붙인다.",
      apply(build) {
        build.damageBonus += 5;
        build.cooldownBonus += 0.028;
        build.chainBonus += 1;
        build.catalystCapstoneId = "mirror_spiral";
      },
      applyWeapon(stats) {
        stats.capstoneTraitLabel = "반사 분열 파편";
        stats.capstoneStatusNote = "첫 벽 반사 때 탄이 둘로 갈라져 측면까지 훑는다.";
        stats.capstoneOnBounce = {
          kind: "mirror_split",
          splitCount: 2,
          spread: 0.24,
          damageMultiplier: 0.62,
          speedMultiplier: 0.96,
          color: "#b6f4ff",
        };
      },
    },
  };
  const CATALYST_REFORGE_BY_ID = Object.values(CATALYST_REFORGE_DEFS).reduce(
    (map, def) => {
      map[def.id] = def;
      return map;
    },
    {}
  );
  const FINAL_CASHOUT_CAPSTONE_VARIANTS = {
    sear_halo: {
      cashoutLabel: "Halo Trial",
      bannerLabel: "Sear Halo Trial",
      note: "Sear Halo cash-out은 중앙 주탄과 좌우 에코 볼트로 다중 진입선을 동시에 지우는지 시험한다.",
      directive: "얇은 세 줄 압박과 빠른 측면 재진입. 정면 고정 사격보다 라인 스위프 유지가 중요하다.",
      spawnBudget: FINAL_CASHOUT_SPAWN_BUDGET + 3,
      activeCap: 23,
      baseSpawnInterval: 0.23,
      spawnIntervalMin: 0.1,
      eliteEvery: 4,
      driveGainFactor: 1.25,
      mix: {
        scuttler: 0.4,
        brute: 0.14,
        shrike: 0.46,
      },
      hazard: {
        label: "Halo Lanes",
        interval: 6.1,
        count: 3,
        radius: 56,
        telegraph: 0.76,
        duration: 3.4,
        damage: 12,
        timerFactor: 0.47,
      },
    },
    flash_temper: {
      cashoutLabel: "Temper Trial",
      bannerLabel: "Flash Temper Trial",
      note: "Flash Temper cash-out은 브루트 전열을 찢고 중심 슬러그 각을 유지해야 안정적으로 정리된다.",
      directive: "단일 대구경 surge와 무거운 전열. 정면 절개와 드라이브 회전을 강하게 요구한다.",
      spawnBudget: FINAL_CASHOUT_SPAWN_BUDGET + 2,
      activeCap: 21,
      baseSpawnInterval: 0.3,
      spawnIntervalMin: 0.11,
      eliteEvery: 4,
      driveGainFactor: 1.28,
      mix: {
        scuttler: 0.22,
        brute: 0.48,
        shrike: 0.3,
      },
      hazard: {
        label: "Temper Breaker",
        interval: 7.1,
        count: 1,
        radius: 82,
        telegraph: 0.78,
        duration: 4.5,
        damage: 14,
        timerFactor: 0.5,
      },
    },
    storm_rail: {
      cashoutLabel: "Rail Trial",
      bannerLabel: "Storm Rail Trial",
      note: "Storm Rail cash-out은 얇은 전열보다 분기 레일 각을 열 수 있는 다중 타겟 정리에 무게를 둔다.",
      directive: "세 갈래 surge와 잦은 엘리트 침투. 연쇄 적중을 굴려 화면 전반을 비워야 한다.",
      spawnBudget: FINAL_CASHOUT_SPAWN_BUDGET + 4,
      activeCap: 24,
      baseSpawnInterval: 0.24,
      spawnIntervalMin: 0.1,
      eliteEvery: 4,
      driveGainFactor: 1.26,
      mix: {
        scuttler: 0.46,
        brute: 0.16,
        shrike: 0.38,
      },
      hazard: {
        label: "Storm Lattice",
        interval: 6.4,
        count: 3,
        radius: 58,
        telegraph: 0.74,
        duration: 3.4,
        damage: 12,
        timerFactor: 0.48,
      },
    },
    mirror_spiral: {
      cashoutLabel: "Mirror Trial",
      bannerLabel: "Mirror Spiral Trial",
      note: "Mirror Spiral cash-out은 반사 분열이 측면 압박을 지우는지 시험하도록 빠른 측면 교차 화력을 깐다.",
      directive: "짧은 간격의 crossfire surge와 가벼운 추적 무리. 벽 반사 각과 측면 정리가 핵심이다.",
      spawnBudget: FINAL_CASHOUT_SPAWN_BUDGET + 5,
      activeCap: 25,
      baseSpawnInterval: 0.22,
      spawnIntervalMin: 0.1,
      eliteEvery: 5,
      driveGainFactor: 1.24,
      mix: {
        scuttler: 0.34,
        brute: 0.12,
        shrike: 0.54,
      },
      hazard: {
        label: "Mirror Crossfire",
        interval: 5.9,
        count: 2,
        radius: 64,
        telegraph: 0.7,
        duration: 3.5,
        damage: 12,
        timerFactor: 0.44,
      },
    },
  };
  const FINAL_CASHOUT_SUPPORT_DEFS = {
    ember: {
      id: "pilot_light",
      coreId: "ember",
      label: "Pilot Light",
      title: "Pilot Light",
      slotText: "촉매 안정화 · 드라이브 여유",
      description:
        "Crown Pyre 촉매를 파일럿 라이트로 태워 drive 회전과 냉각 복구를 안정화한다. 종결 화선 대신 오버드라이브 창을 더 자주 여는 운영을 고른다.",
      apply(build, run) {
        build.driveGainBonus += 0.26;
        build.overdriveDurationBonus += 1.1;
        build.coolRateBonus += 8;
        build.cashoutSupportId = "pilot_light";
        if (run && run.player) {
          run.player.drive = Math.min(100, run.player.drive + 22);
        }
      },
      cashoutLabel: "Pilot Trial",
      bannerLabel: "Pilot Light Trial",
      note: "Pilot Light cash-out은 오버드라이브 창을 더 자주 열 수 있는 대신, 그 창마다 엘리트와 측면 압박을 빨리 비워야 한다.",
      directive: "짧은 교전 파형과 잦은 엘리트 침투. drive 타이밍과 냉각 복구를 굴려 전장을 비워야 한다.",
      spawnBudget: FINAL_CASHOUT_SPAWN_BUDGET + 1,
      activeCap: 20,
      baseSpawnInterval: 0.27,
      spawnIntervalMin: 0.11,
      eliteEvery: 4,
      driveGainFactor: 1.3,
      mix: {
        scuttler: 0.28,
        brute: 0.24,
        shrike: 0.48,
      },
      hazard: {
        label: "Pilot Rings",
        interval: 6.9,
        count: 2,
        radius: 62,
        telegraph: 0.9,
        duration: 3,
        damage: 11,
        timerFactor: 0.58,
      },
    },
    scatter: {
      id: "quench_loop",
      coreId: "scatter",
      label: "Quench Loop",
      title: "Quench Loop",
      slotText: "촉매 안정화 · 열 배기",
      description:
        "Kiln Bloom 촉매를 냉각 루프로 태워 heat 관리와 지속 사격을 안정화한다. 완성형 폭딜 대신 더 긴 발화 각과 넓은 telegraph를 고른다.",
      apply(build, run) {
        build.heatFactor *= 0.76;
        build.coolRateBonus += 14;
        build.cashoutSupportId = "quench_loop";
        if (run && run.player) {
          run.player.heat = Math.max(0, run.player.heat - 28);
          run.player.overheated = false;
        }
      },
      cashoutLabel: "Quench Trial",
      bannerLabel: "Quench Loop Trial",
      note: "Quench Loop cash-out은 더 긴 냉각 여유로 정면 교전을 유지하는 대신, 적 밀도를 조금 더 오래 끌고 가며 절개 각을 만든다.",
      directive: "넓어진 surge telegraph와 느린 압박. 발열 관리로 중앙 사선을 오래 유지하는지가 핵심이다.",
      spawnBudget: FINAL_CASHOUT_SPAWN_BUDGET - 1,
      activeCap: 18,
      baseSpawnInterval: 0.32,
      spawnIntervalMin: 0.12,
      eliteEvery: 5,
      driveGainFactor: 1.18,
      mix: {
        scuttler: 0.26,
        brute: 0.42,
        shrike: 0.32,
      },
      hazard: {
        label: "Quench Lanes",
        interval: 7.6,
        count: 1,
        radius: 76,
        telegraph: 0.94,
        duration: 3.2,
        damage: 10,
        timerFactor: 0.62,
      },
    },
    lance: {
      id: "vector_relay",
      coreId: "lance",
      label: "Vector Relay",
      title: "Vector Relay",
      slotText: "촉매 안정화 · 대시 경제",
      description:
        "Sky Pierce 촉매를 벡터 릴레이로 태워 dash stock과 복구를 끌어올린다. 완성형 관통 대신 위험한 레인 사이를 더 자주 넘는 운영을 고른다.",
      apply(build) {
        build.moveSpeedBonus += 16;
        build.dashCooldownBonus += 0.42;
        build.dashMaxBonus += 1;
        build.cashoutSupportId = "vector_relay";
      },
      cashoutLabel: "Relay Trial",
      bannerLabel: "Vector Relay Trial",
      note: "Vector Relay cash-out은 다중 레인을 dash로 넘기며 각을 다시 잡는지 시험한다.",
      directive: "교차 surge 레인이 자주 열리지만 복구 간격이 길다. dash stock과 위치 교정 판단이 중요하다.",
      spawnBudget: FINAL_CASHOUT_SPAWN_BUDGET + 1,
      activeCap: 20,
      baseSpawnInterval: 0.28,
      spawnIntervalMin: 0.11,
      eliteEvery: 5,
      driveGainFactor: 1.2,
      mix: {
        scuttler: 0.4,
        brute: 0.18,
        shrike: 0.42,
      },
      hazard: {
        label: "Relay Lattice",
        interval: 6.8,
        count: 2,
        radius: 60,
        telegraph: 0.88,
        duration: 3.1,
        damage: 11,
        timerFactor: 0.58,
      },
    },
    ricochet: {
      id: "phase_anchor",
      coreId: "ricochet",
      label: "Phase Anchor",
      title: "Phase Anchor",
      slotText: "촉매 안정화 · 회전 제어",
      description:
        "Prism Cascade 촉매를 위상 앵커로 태워 냉각과 회전 복구를 끌어올린다. 완성형 탄막 대신 측면 정리 각을 더 자주 다시 여는 운영을 택한다.",
      apply(build) {
        build.coolRateBonus += 10;
        build.cooldownBonus += 0.014;
        build.moveSpeedBonus += 14;
        build.cashoutSupportId = "phase_anchor";
      },
      cashoutLabel: "Anchor Trial",
      bannerLabel: "Phase Anchor Trial",
      note: "Phase Anchor cash-out은 측면 압박을 천천히 풀어 주는 대신 더 오래 회전 각을 유지해야 한다.",
      directive: "넓은 측면 진입과 느린 crossfire. 냉각을 굴리며 벽 반사 각을 반복해서 다시 세워야 한다.",
      spawnBudget: FINAL_CASHOUT_SPAWN_BUDGET,
      activeCap: 19,
      baseSpawnInterval: 0.27,
      spawnIntervalMin: 0.11,
      eliteEvery: 5,
      driveGainFactor: 1.19,
      mix: {
        scuttler: 0.3,
        brute: 0.14,
        shrike: 0.56,
      },
      hazard: {
        label: "Anchor Crossfire",
        interval: 6.6,
        count: 2,
        radius: 60,
        telegraph: 0.9,
        duration: 3,
        damage: 10,
        timerFactor: 0.6,
      },
    },
  };
  const FINAL_CASHOUT_FAILSOFT_DEFS = {
    ember: {
      id: "ember_wake",
      coreId: "ember",
      label: "Ember Wake",
      title: "Ember Wake",
      slotText: "fail-soft 점화 · 과열 경주",
      description:
        "촉매 대신 고철과 잔열을 태워 Ember Wake를 억지 점화한다. 화력과 drive를 당겨 받는 대신 더 날카로운 압박을 견뎌야 한다.",
      cost: 18,
      apply(build, run) {
        build.damageBonus += 0.2;
        build.driveGainBonus += 0.14;
        build.cashoutFailSoftId = "ember_wake";
        if (run && run.player) {
          run.player.drive = Math.min(100, run.player.drive + 16);
          run.player.heat = Math.min(100, run.player.heat + 12);
        }
      },
      cashoutLabel: "Wake Trial",
      bannerLabel: "Ember Wake Trial",
      note: "Ember Wake cash-out은 억지로 끌어올린 화력을 유지하는 대신, 더 빠른 측면 압박과 잦은 브루트 진입을 버티는지 시험한다.",
      directive: "짧은 템포의 압박과 뜨거운 재진입. 당겨 받은 drive를 바로 써서 화면을 비워야 한다.",
      spawnBudget: FINAL_CASHOUT_SPAWN_BUDGET + 3,
      activeCap: 22,
      baseSpawnInterval: 0.24,
      spawnIntervalMin: 0.1,
      eliteEvery: 4,
      driveGainFactor: 1.24,
      mix: {
        scuttler: 0.32,
        brute: 0.28,
        shrike: 0.4,
      },
      hazard: {
        label: "Wake Flares",
        interval: 6.1,
        count: 2,
        radius: 60,
        telegraph: 0.76,
        duration: 3.1,
        damage: 12,
        timerFactor: 0.49,
      },
    },
    scatter: {
      id: "slag_burst",
      coreId: "scatter",
      label: "Slag Burst",
      title: "Slag Burst",
      slotText: "fail-soft 분사 · 근접 절개",
      description:
        "촉매 대신 예비 노즐을 찢어 Slag Burst를 강행한다. 산탄 화력과 관통을 밀어 올리지만 압박도 더 가까워진다.",
      cost: 18,
      apply(build, run) {
        build.damageBonus += 0.18;
        build.pierceBonus += 1;
        build.cashoutFailSoftId = "slag_burst";
        if (run && run.player) {
          run.player.heat = Math.min(100, run.player.heat + 10);
        }
      },
      cashoutLabel: "Slag Trial",
      bannerLabel: "Slag Burst Trial",
      note: "Slag Burst cash-out은 두꺼운 전열을 더 가까이 받아내며 근접 절개 각을 만들어 내는지 시험한다.",
      directive: "좁은 간격의 전열과 무거운 브루트 파형. 짧은 사거리 압박을 뚫어야 한다.",
      spawnBudget: FINAL_CASHOUT_SPAWN_BUDGET + 2,
      activeCap: 21,
      baseSpawnInterval: 0.27,
      spawnIntervalMin: 0.11,
      eliteEvery: 4,
      driveGainFactor: 1.2,
      mix: {
        scuttler: 0.2,
        brute: 0.5,
        shrike: 0.3,
      },
      hazard: {
        label: "Slag Wells",
        interval: 6.8,
        count: 2,
        radius: 68,
        telegraph: 0.82,
        duration: 3.4,
        damage: 12,
        timerFactor: 0.53,
      },
    },
    lance: {
      id: "rail_sprint",
      coreId: "lance",
      label: "Rail Sprint",
      title: "Rail Sprint",
      slotText: "fail-soft 돌파 · 관통 질주",
      description:
        "촉매 대신 예비 축전기를 태워 Rail Sprint를 건다. 이동과 관통을 끌어올리지만 교차 레인이 더 촘촘해진다.",
      cost: 18,
      apply(build) {
        build.moveSpeedBonus += 18;
        build.pierceBonus += 1;
        build.cashoutFailSoftId = "rail_sprint";
      },
      cashoutLabel: "Sprint Trial",
      bannerLabel: "Rail Sprint Trial",
      note: "Rail Sprint cash-out은 빠른 위치 교정으로 얇은 레인을 연속 돌파하는지 시험한다.",
      directive: "촘촘한 교차 레인과 잦은 측면 찌르기. 이동 판단과 관통 각이 중요하다.",
      spawnBudget: FINAL_CASHOUT_SPAWN_BUDGET + 3,
      activeCap: 22,
      baseSpawnInterval: 0.23,
      spawnIntervalMin: 0.1,
      eliteEvery: 4,
      driveGainFactor: 1.22,
      mix: {
        scuttler: 0.42,
        brute: 0.16,
        shrike: 0.42,
      },
      hazard: {
        label: "Sprint Lanes",
        interval: 6.2,
        count: 3,
        radius: 56,
        telegraph: 0.78,
        duration: 3,
        damage: 12,
        timerFactor: 0.47,
      },
    },
    ricochet: {
      id: "glass_arc",
      coreId: "ricochet",
      label: "Glass Arc",
      title: "Glass Arc",
      slotText: "fail-soft 반사 · 측면 붕괴",
      description:
        "촉매 대신 반사 코일을 과부하시켜 Glass Arc를 연다. 연쇄와 기동을 밀어 올리지만 측면 교차 화력이 더 빨라진다.",
      cost: 18,
      apply(build) {
        build.chainBonus += 1;
        build.moveSpeedBonus += 12;
        build.cashoutFailSoftId = "glass_arc";
      },
      cashoutLabel: "Glass Trial",
      bannerLabel: "Glass Arc Trial",
      note: "Glass Arc cash-out은 빠른 측면 교차 화력 속에서도 반사 연쇄를 끊기지 않게 유지하는지 시험한다.",
      directive: "빠른 crossfire와 가벼운 측면 파형. 반사 각을 즉시 다시 세워야 한다.",
      spawnBudget: FINAL_CASHOUT_SPAWN_BUDGET + 3,
      activeCap: 23,
      baseSpawnInterval: 0.22,
      spawnIntervalMin: 0.1,
      eliteEvery: 5,
      driveGainFactor: 1.21,
      mix: {
        scuttler: 0.34,
        brute: 0.12,
        shrike: 0.54,
      },
      hazard: {
        label: "Glass Crossfire",
        interval: 5.8,
        count: 2,
        radius: 60,
        telegraph: 0.72,
        duration: 3.1,
        damage: 12,
        timerFactor: 0.45,
      },
    },
  };

  const BASE_BUILD = {
    signatureId: DEFAULT_SIGNATURE_ID,
    coreId: "ember",
    attunedCoreId: "ember",
    attunedCopies: 1,
    affixes: [],
    finisherCatalysts: [],
    catalystCapstoneId: null,
    cashoutSupportId: null,
    cashoutFailSoftId: null,
    act3CatalystDraftSeen: false,
    architectureForecastId: null,
    bastionDoctrineId: null,
    doctrineCapstoneId: null,
    afterburnAscensionOffered: false,
    afterburnOverdriveId: null,
    afterburnDominionId: null,
    afterburnDominionVictoryLapWaves: 0,
    lateAscensionId: null,
    lateAscensionOffered: false,
    doctrineChaseClaimed: false,
    doctrinePursuitCommitted: false,
    doctrinePursuitProgress: 0,
    doctrinePursuitExpired: false,
    overcommitUnlocked: false,
    overcommitResolved: false,
    illegalOverclockId: null,
    illegalOverclockOffered: false,
    illegalOverclockMutationLevel: 0,
    riskMutationLevel: 0,
    riskMutationQueuedLevel: 0,
    apexMutationLevel: 0,
    predatorBaitCharges: 0,
    wildcardProtocolIds: [],
    lateFieldMutationLevel: 0,
    lateFieldAegisLevel: 0,
    lateFieldConvergenceId: null,
    lateBreakProfileId: null,
    arsenalBreakpointProfileId: null,
    blackLedgerRaidWaves: 0,
    bastionPactDebtWaves: 0,
    wave6ChassisBreakpoint: false,
    chassisId: null,
    supportBayCap: 2,
    auxiliaryJunctionLevel: 0,
    supportSystemId: null,
    supportSystemTier: 0,
    supportSystems: [],
    weaponEvolutions: {},
    pendingCores: [],
    upgrades: [],
    damageBonus: 0,
    cooldownBonus: 0,
    pierceBonus: 0,
    chainBonus: 0,
    heatFactor: 1,
    coolRateBonus: 0,
    moveSpeedBonus: 0,
    pickupBonus: 0,
    dashCooldownBonus: 0,
    dashMaxBonus: 0,
    maxHpBonus: 0,
    scrapMultiplier: 1,
    driveGainBonus: 0,
    overdriveDurationBonus: 0,
    hazardMitigation: 0,
  };

  const LATE_ASCENSION_DEFS = {
    crownsplitter_array: {
      id: "crownsplitter_array",
      tag: "CROWN",
      strokeColor: "rgba(214, 246, 255, 0.98)",
      fillColor: "rgba(159, 231, 255, 0.92)",
      label: "Crownsplitter Array",
      title: "Crownsplitter Array",
      traitLabel: "wing battery",
      description:
        "주포 양옆에 분할 포대를 영구 증설해 발사마다 wing volley를 덧댄다. 기본 실루엣만으로도 열린 회랑 둘을 직접 찢고, support uplink는 이미 열린 날개의 빈틈만 다듬는다.",
      slotText: "주포 split volley · 완성형 wing battery",
      bodyLabel: "Split-Wing Chassis",
      bodyText: "측면 포대와 전방 가늠자가 붙어 주포가 직접 회랑을 찢는 추격 섀시다.",
      statusNote:
        "주포가 split wing battery로 변해 support 없이도 넓은 정면 라인을 직접 찢는다. 추가 rider는 자동 처리보다 이 날개 화망의 틈을 메우는 보조선으로만 붙는다.",
      apply(build, run) {
        build.damageBonus += 4;
        build.pierceBonus += 1;
        build.moveSpeedBonus += 8;
        build.maxHpBonus -= 4;
        if (run && run.player) {
          run.player.heat = Math.max(0, run.player.heat - 10);
          run.player.overheated = false;
        }
      },
      getFirePattern(supportLevel) {
        const offsets = [-0.62, -0.28, -0.1, 0.1, 0.28, 0.62];
        if (supportLevel >= 2) {
          offsets.unshift(-0.94);
          offsets.push(0.94);
        }
        if (supportLevel >= 3) {
          offsets.unshift(-1.24);
          offsets.push(1.24);
        }
        return {
          kind: "split_wing",
          offsets,
          speedMultiplier: 1.08,
          radius: 4.6,
          damageMultiplier: 0.34 + supportLevel * 0.03,
          life: 1,
          pierceBonus: supportLevel >= 2 ? 1 : 0,
          bounceBonus: 0,
          chainBonus: 0,
          color: "#9fe7ff",
        };
      },
    },
    slagburst_drive: {
      id: "slagburst_drive",
      tag: "SLAG",
      strokeColor: "rgba(255, 229, 184, 0.98)",
      fillColor: "rgba(255, 159, 89, 0.94)",
      label: "Slagburst Drive",
      title: "Slagburst Drive",
      traitLabel: "impact seed",
      description:
        "주포에 slag seed를 박아 발사마다 폭압성 충격탄을 흘린다. 기본 포문만으로도 교전 지점에 폭발과 잔불 구획을 깔고, support uplink는 그 압착 폭만 더 두껍게 만든다.",
      slotText: "slag seed 장착 · 완성형 impact seed",
      bodyLabel: "Kiln-Drive Hull",
      bodyText: "복부 용광 코일이 달린 돌입 섀시로, 교전 지점에 직접 잔불 구획을 남긴다.",
      statusNote:
        "주포가 slagburst drive로 바뀌어 support 없이도 발사 궤적 끝에 폭발과 잔불 구획을 남긴다. 추가 rider는 seed 수와 잔불 폭만 더해 이 몸체의 교전 장악력을 다듬는다.",
      apply(build, run) {
        build.damageBonus += 2;
        build.maxHpBonus += 6;
        build.moveSpeedBonus += 4;
        build.heatFactor *= 1.05;
        if (run && run.player) {
          run.player.heat = Math.max(0, run.player.heat - 6);
          run.player.overheated = false;
        }
      },
      getFirePattern(supportLevel) {
        return {
          kind: "slag_seed",
          count: 3 + Math.floor(supportLevel / 2),
          spread: 0.24,
          speedMultiplier: 0.84,
          radius: 5.4,
          damageMultiplier: 0.31 + supportLevel * 0.025,
          life: 0.98,
          blastRadius: 46 + supportLevel * 4,
          blastDamageMultiplier: 0.34 + supportLevel * 0.025,
          poolRadius: 42 + supportLevel * 3,
          poolDuration: 3 + supportLevel * 0.28,
          poolTickInterval: 0.34,
          poolDamageMultiplier: 0.14 + supportLevel * 0.018,
          poolColor: "#ff9f59",
          color: "#ffd6a8",
        };
      },
    },
    voltspine_lattice: {
      id: "voltspine_lattice",
      tag: "VOLT",
      strokeColor: "rgba(213, 225, 255, 0.98)",
      fillColor: "rgba(120, 170, 255, 0.94)",
      label: "Voltspine Lattice",
      title: "Voltspine Lattice",
      traitLabel: "arc spine",
      description:
        "동체 위로 전극 spine을 영구 전개해 발사마다 전방 lattice arc를 덧댄다. 기본 lattice만으로도 후열을 전도성 그물로 묶고, support uplink는 그물의 길이와 밀도만 더 늘린다.",
      slotText: "arc lattice salvo · 완성형 arc spine",
      bodyLabel: "Stormspine Hull",
      bodyText: "등뼈형 전극 spine과 측면 방전 깃이 자라 후열을 직접 감전시키는 전도 섀시다.",
      statusNote:
        "주포가 voltspine lattice로 변해 support 없이도 전방 lattice arc와 연쇄 범위로 후열을 직접 절단한다. 추가 rider는 spine 밀도와 연쇄 길이만 더 키운다.",
      apply(build, run) {
        build.damageBonus += 1;
        build.moveSpeedBonus += 6;
        build.chainBonus += 1;
        build.dashCooldownBonus += 0.14;
        build.maxHpBonus -= 2;
        if (run && run.player) {
          run.player.heat = Math.max(0, run.player.heat - 8);
          run.player.overheated = false;
        }
      },
      getFirePattern(supportLevel) {
        const offsets =
          supportLevel >= 3
            ? [-0.72, -0.5, -0.28, -0.08, 0.08, 0.28, 0.5, 0.72]
            : supportLevel >= 2
              ? [-0.6, -0.34, -0.12, 0.12, 0.34, 0.6]
              : [-0.48, -0.22, 0, 0.22, 0.48];
        return {
          kind: "split_wing",
          offsets,
          speedMultiplier: 1.18,
          radius: 4.7,
          damageMultiplier: 0.27 + supportLevel * 0.028,
          life: 0.94,
          pierceBonus: 0,
          bounceBonus: 0,
          chainBonus: 1 + Math.floor((supportLevel + 1) / 2),
          color: "#95b8ff",
        };
      },
    },
    anvil_prism: {
      id: "anvil_prism",
      tag: "ANVIL",
      strokeColor: "rgba(255, 234, 206, 0.98)",
      fillColor: "rgba(255, 122, 92, 0.94)",
      label: "Anvil Prism",
      title: "Anvil Prism",
      traitLabel: "breach ram",
      description:
        "주포 하부에 breach ram을 박아 발사마다 두꺼운 prism salvo를 밀어 넣는다. 기본 ram만으로도 brute/warden 전열을 비집고, support uplink는 열린 돌파선만 더 두껍게 고정한다.",
      slotText: "breach prism salvo · 완성형 breach ram",
      bodyLabel: "Anvil-Ram Hull",
      bodyText: "전면 ram prong과 복부 냉각 지느러미가 돌출된 정면 돌파 섀시다.",
      statusNote:
        "주포가 anvil prism으로 바뀌어 support 없이도 짧고 두꺼운 breach salvo를 겹쳐 밀어 넣는다. 추가 rider는 ram 포문과 관통 여유만 더 열어 전면 파쇄력을 보조한다.",
      apply(build, run) {
        build.damageBonus += 5;
        build.maxHpBonus += 4;
        build.moveSpeedBonus += 2;
        build.heatFactor *= 1.06;
        if (run && run.player) {
          run.player.heat = Math.max(0, run.player.heat - 12);
          run.player.overheated = false;
        }
      },
      getFirePattern(supportLevel) {
        const offsets =
          supportLevel >= 3
            ? [-0.56, -0.38, -0.2, 0, 0.2, 0.38, 0.56]
            : supportLevel >= 2
              ? [-0.46, -0.22, 0, 0.22, 0.46]
              : [-0.36, -0.16, 0, 0.16, 0.36];
        return {
          kind: "split_wing",
          offsets,
          speedMultiplier: 0.94,
          radius: 5.8,
          damageMultiplier: 0.32 + supportLevel * 0.04,
          life: 0.88,
          pierceBonus: supportLevel >= 2 ? 1 : 0,
          bounceBonus: 0,
          chainBonus: 0,
          color: "#ff8d73",
        };
      },
    },
  };

  const LATE_FIELD_CONVERGENCE_DEFS = {
    vector_thrusters: {
      id: "slipstream_talons",
      chassisId: "vector_thrusters",
      tag: "SYNC",
      title: "Slipstream Talons",
      traitLabel: "thruster wing battery",
      color: "#9fe7ff",
      description:
        "Vector Thrusters, flex support bay, greed route가 한 회로로 묶여 사격마다 측면 talon volley를 뿜는다. support uplink가 많을수록 날개가 벌어지고, 빚이 남아 있으면 raid pressure를 화력으로 되받아친다.",
      bodyText:
        "추진 포드와 support uplink가 붙어 slipstream 날개가 벌어진 추격형 convergence다.",
      getFirePattern(build, core) {
        const supportLevel = Math.max(1, getSupportBayCapacity(build) - 1);
        const greedLevel = getLateFieldGreedPressure(build);
        const count = Math.min(6, 2 + supportLevel + Math.min(1, greedLevel));
        const spacing =
          core.id === "scatter" ? 0.18 : core.id === "lance" ? 0.1 : core.id === "ricochet" ? 0.2 : 0.14;
        const half = (count - 1) / 2;
        return {
          kind: "late_field_convergence",
          offsets: Array.from({ length: count }, (_, index) => (index - half) * spacing),
          speedMultiplier: core.id === "lance" ? 1.18 : 1.12,
          radius: core.id === "lance" ? 5.9 : 4.8,
          damageMultiplier: 0.26 + supportLevel * 0.025 + greedLevel * 0.02,
          life: 0.8 + supportLevel * 0.04,
          pierceBonus: core.id === "lance" ? 1 : 0,
          bounceBonus: 0,
          chainBonus: core.id === "ricochet" ? 1 : 0,
          color: this.color,
        };
      },
      applyWeapon(stats, build, core) {
        const supportLevel = Math.max(1, getSupportBayCapacity(build) - 1);
        const greedLevel = getLateFieldGreedPressure(build);
        stats.damage += 2 + supportLevel + greedLevel;
        stats.cooldown = clamp(stats.cooldown * (1 - 0.02 * supportLevel), 0.08, 0.4);
        if (core.id !== "scatter") {
          stats.projectileSpeed += 12 + supportLevel * 6;
        }
      },
    },
    bulwark_treads: {
      id: "citadel_spindle",
      chassisId: "bulwark_treads",
      tag: "SYNC",
      title: "Citadel Spindle",
      traitLabel: "halo siege spindle",
      color: "#fff0c9",
      description:
        "Bulwark Treads, guard plate, support brace가 한 몸처럼 엮여 전방 siege spindle salvo를 발사한다. 남은 빚이나 raid pressure가 있으면 살수 밀도가 더 올라가 전면 장악 시간이 선명해진다.",
      bodyText:
        "warplate 고리와 전면 spindle 포문이 붙어 짧은 dominance window를 강제하는 거점형 convergence다.",
      getFirePattern(build, core) {
        const supportLevel = Math.max(1, getInstalledSupportSystems(build).length || getSupportBayCapacity(build) - 1);
        const greedLevel = getLateFieldGreedPressure(build);
        const offsets = greedLevel > 0 ? [-0.14, 0, 0.14] : [-0.1, 0.1];
        return {
          kind: "late_field_convergence",
          offsets: core.id === "lance" ? offsets.map((offset) => offset * 0.72) : offsets,
          speedMultiplier: 0.98 + supportLevel * 0.03,
          radius: core.id === "lance" ? 6.2 : 5.1,
          damageMultiplier: 0.42 + supportLevel * 0.03,
          life: 0.9 + greedLevel * 0.08,
          pierceBonus: core.id === "lance" ? 1 : 0,
          bounceBonus: 0,
          chainBonus: 0,
          color: this.color,
        };
      },
      applyWeapon(stats, build, core) {
        const aegisLevel = Math.max(1, getLateFieldAegisLevel(build));
        const supportLevel = Math.max(1, getInstalledSupportSystems(build).length || getSupportBayCapacity(build) - 1);
        stats.damage += 3 + aegisLevel * 2;
        stats.heatPerShot = round(Math.max(6, stats.heatPerShot - supportLevel * 0.3), 1);
        if (core.id === "lance") {
          stats.pierce += 1;
        }
      },
    },
    salvage_winch: {
      id: "towchain_reaver",
      chassisId: "salvage_winch",
      tag: "SYNC",
      title: "Towchain Reaver",
      traitLabel: "reaver fork spread",
      color: "#9fffcf",
      description:
        "Salvage Winch가 support bay hardpoint와 greed 회수 루트를 씹어 먹어 양갈래 tow fork salvo로 바뀐다. raid debt가 붙은 상태일수록 발사 갈퀴가 더 넓어져 회수선 자체가 전투선이 된다.",
      bodyText:
        "견인 포크와 bay hardpoint가 엮여 회수선을 직접 절개하는 약탈형 convergence다.",
      getFirePattern(build, core) {
        const supportLevel = Math.max(1, getInstalledSupportSystems(build).length || getSupportBayCapacity(build) - 1);
        const greedLevel = Math.max(1, getLateFieldGreedPressure(build));
        const laneCount = Math.min(5, 2 + greedLevel + (supportLevel >= 3 ? 1 : 0));
        const spacing = core.id === "lance" ? 0.13 : core.id === "scatter" ? 0.2 : 0.18;
        const half = (laneCount - 1) / 2;
        return {
          kind: "late_field_convergence",
          offsets: Array.from({ length: laneCount }, (_, index) => (index - half) * spacing),
          speedMultiplier: 1.04 + greedLevel * 0.03,
          radius: core.id === "lance" ? 5.7 : 4.9,
          damageMultiplier: 0.28 + supportLevel * 0.02 + greedLevel * 0.03,
          life: 0.82 + greedLevel * 0.06,
          pierceBonus: core.id === "lance" ? 1 : 0,
          bounceBonus: core.id === "ricochet" ? 1 : 0,
          chainBonus: 0,
          color: this.color,
        };
      },
      applyWeapon(stats, build, core) {
        const greedLevel = getLateFieldGreedPressure(build);
        stats.damage += 2 + greedLevel * 2;
        stats.cooldown = clamp(stats.cooldown * (1 - greedLevel * 0.015), 0.08, 0.4);
        if (core.id === "ricochet") {
          stats.bounce += 1;
        }
      },
    },
  };
  const AFTERBURN_OVERDRIVE_DEFS = {
    cataclysm_crown: {
      id: "cataclysm_crown",
      tag: "CROWN",
      color: "#ffd4a3",
      label: "Cataclysm Crown",
      title: "Cataclysm Crown",
      traitLabel: "crown barrage",
      description:
        "완성된 endform 위에 crown battery를 다시 덧씌워 주포 주변에 왕관형 보조 포문을 영구 전개한다. support uplink가 많을수록 crown lane이 더 벌어져 후열과 측면 pocket을 동시에 긁는다.",
      slotText: "왕관 보조 포문 증설 · support가 crown lane 증폭",
      bodyLabel: "Cataclysm Crown Frame",
      bodyText:
        "주포 둘레에 금속 왕관 포문이 솟아 정면 교전과 측면 갈라치기를 동시에 거는 afterburn endform이다.",
      statusNote:
        "Afterburn overdrive가 crown battery를 얹어 남은 endurance를 더 넓은 왕관 화망으로 밀어붙인다.",
      applyPlayer(stats) {
        stats.moveSpeed += 10;
        stats.dashCooldown = clamp(stats.dashCooldown - 0.14, 1.15, 3.2);
      },
      applyWeapon(stats, build, core) {
        const supportLevel = Math.max(1, getInstalledSupportSystems(build).length);
        stats.damage += 4 + supportLevel;
        stats.cooldown = clamp(stats.cooldown * 0.92, 0.08, 0.4);
        stats.projectileSpeed += 8 + supportLevel * 5;
        if (core.id === "lance") {
          stats.pierce += 1;
        }
      },
      getFirePattern(build, core) {
        const supportLevel = Math.max(1, getInstalledSupportSystems(build).length);
        const greedLevel = getLateFieldGreedPressure(build);
        const offsets =
          supportLevel >= 3
            ? [-0.7, -0.46, -0.22, 0, 0.22, 0.46, 0.7]
            : supportLevel >= 2
              ? [-0.5, -0.18, 0.18, 0.5]
              : [-0.36, -0.12, 0.12, 0.36];
        return {
          kind: "afterburn_overdrive",
          offsets,
          speedMultiplier: core.id === "lance" ? 1.2 : 1.1,
          radius: core.id === "lance" ? 5.4 : 4.9,
          damageMultiplier: 0.28 + supportLevel * 0.03 + greedLevel * 0.015,
          life: 0.92,
          pierceBonus: core.id === "lance" ? 1 : 0,
          bounceBonus: core.id === "ricochet" && supportLevel >= 2 ? 1 : 0,
          chainBonus: core.id === "ricochet" ? 1 : 0,
          color: this.color,
        };
      },
    },
    bastion_lattice: {
      id: "bastion_lattice",
      tag: "HALO",
      color: "#dff7ff",
      label: "Bastion Lattice",
      title: "Bastion Lattice",
      traitLabel: "aegis lance halo",
      description:
        "warplate, shield halo, body splice를 한 층 더 엮어 전방 lattice lance와 방어 고리를 함께 굳힌다. hazard-heavy afterburn에서도 멈춰 서서 살수각을 잡을 근거를 다시 만들어 준다.",
      slotText: "전방 lattice lance · aegis halo 강화",
      bodyLabel: "Lattice Bastion Hull",
      bodyText:
        "전면 lance prong과 둘레 보호 고리가 함께 잠겨 위험 구간에서 짧은 지배 창을 만드는 방벽형 endform이다.",
      statusNote:
        "Afterburn overdrive가 halo lattice를 잠가 남은 bracket을 더 두껍고 느린 dominance window로 바꾼다.",
      applyPlayer(stats) {
        stats.maxHp += 18;
        stats.dashMax += 1;
        stats.hazardMitigation = clamp(stats.hazardMitigation + 0.08, 0, 0.45);
      },
      applyWeapon(stats, build, core) {
        const supportLevel = Math.max(1, getInstalledSupportSystems(build).length);
        stats.damage += 3 + supportLevel;
        stats.heatPerShot = round(Math.max(6, stats.heatPerShot - 0.6 - supportLevel * 0.3), 1);
        stats.projectileSpeed += 6 + supportLevel * 4;
        if (core.id === "lance") {
          stats.pierce += 1;
        }
      },
      getFirePattern(build, core) {
        const supportLevel = Math.max(1, getInstalledSupportSystems(build).length);
        const offsets =
          supportLevel >= 3 ? [-0.22, -0.1, 0, 0.1, 0.22] : [-0.16, 0, 0.16];
        return {
          kind: "afterburn_overdrive",
          offsets: core.id === "lance" ? offsets.map((offset) => offset * 0.7) : offsets,
          speedMultiplier: 1.02 + supportLevel * 0.04,
          radius: core.id === "lance" ? 6.1 : 5.2,
          damageMultiplier: 0.34 + supportLevel * 0.035,
          life: 1.02,
          pierceBonus: core.id === "lance" ? 1 : 0,
          bounceBonus: 0,
          chainBonus: 0,
          color: this.color,
        };
      },
    },
    reaver_wake: {
      id: "reaver_wake",
      tag: "REAVER",
      color: "#9fffd2",
      label: "Reaver Wake",
      title: "Reaver Wake",
      traitLabel: "thruster scythes",
      description:
        "thruster wake와 greed-routing 잔향을 몸체에 다시 접합해 측면 scythe wake를 남긴다. 빠르게 각을 바꿔 같은 웨이브 안에서 두 번 전장을 찢는 추격형 overdrive다.",
      slotText: "측면 wake scythe · greed가 추격 화망 증폭",
      bodyLabel: "Wake-Reaver Frame",
      bodyText:
        "후미 wake fin과 측면 절개날이 자라나 회전하며 lanes를 갈라먹는 추격 endform이다.",
      statusNote:
        "Afterburn overdrive가 wake scythe를 잠가 남은 escalation 전체를 더 빠른 절개 각도로 뒤튼다.",
      applyPlayer(stats, build) {
        const greedLevel = getLateFieldGreedPressure(build);
        stats.moveSpeed += 14 + greedLevel * 4;
        stats.pickupRadius += 12 + greedLevel * 4;
        stats.dashCooldown = clamp(stats.dashCooldown - 0.22, 1.05, 3.2);
      },
      applyWeapon(stats, build, core) {
        const greedLevel = Math.max(1, getLateFieldGreedPressure(build) || 1);
        stats.damage += 2 + greedLevel * 2;
        stats.cooldown = clamp(stats.cooldown * 0.94, 0.08, 0.4);
        stats.projectileSpeed += 12 + greedLevel * 6;
        if (core.id === "ricochet") {
          stats.chain += 1;
          stats.bounce += 1;
          stats.chainRange = Math.max(stats.chainRange || 0, 188 + greedLevel * 8);
        }
      },
      getFirePattern(build, core) {
        const greedLevel = Math.max(1, getLateFieldGreedPressure(build) || 1);
        const supportLevel = Math.max(1, getInstalledSupportSystems(build).length);
        const offsets =
          greedLevel >= 2
            ? [-0.62, -0.36, -0.12, 0.12, 0.36, 0.62]
            : [-0.46, -0.16, 0.16, 0.46];
        return {
          kind: "afterburn_overdrive",
          offsets,
          speedMultiplier: 1.16 + greedLevel * 0.03,
          radius: core.id === "lance" ? 5.6 : 4.8,
          damageMultiplier: 0.24 + greedLevel * 0.03 + supportLevel * 0.02,
          life: 0.86,
          pierceBonus: core.id === "lance" && greedLevel >= 2 ? 1 : 0,
          bounceBonus: core.id === "ricochet" ? 1 : 0,
          chainBonus: core.id === "ricochet" ? 1 : 0,
          color: this.color,
        };
      },
    },
  };

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function getChassisBreakpointDef(buildOrId) {
    const chassisId =
      typeof buildOrId === "string"
        ? buildOrId
        : buildOrId && typeof buildOrId === "object"
          ? buildOrId.chassisId
          : null;
    return chassisId ? CHASSIS_BREAKPOINT_DEFS[chassisId] || null : null;
  }

  function getIllegalOverclockDef(buildOrId) {
    const overclockId =
      typeof buildOrId === "string"
        ? buildOrId
        : buildOrId && typeof buildOrId === "object"
          ? buildOrId.illegalOverclockId
          : null;
    return overclockId ? ILLEGAL_OVERCLOCK_DEFS[overclockId] || null : null;
  }

  function getIllegalOverclockMutationLevel(build) {
    return clamp(
      Math.round((build && build.illegalOverclockMutationLevel) || 0),
      0,
      MAX_ILLEGAL_OVERCLOCK_MUTATIONS
    );
  }

  function getIllegalMutationTierLabel(level) {
    return `MOLT ${clamp(Math.round(level || 0), 1, MAX_ILLEGAL_OVERCLOCK_MUTATIONS)}`;
  }

  function getDominantMutationOverclockId(build) {
    if (!build) {
      return "meltdown_cycler";
    }
    return build.coreId === "lance"
      ? "rupture_crown"
      : build.coreId === "ricochet"
        ? "glass_broadside"
        : "meltdown_cycler";
  }

  function getRiskMutationCoreDef(buildOrId) {
    const coreId =
      typeof buildOrId === "string"
        ? buildOrId
        : buildOrId && typeof buildOrId === "object"
          ? buildOrId.coreId
          : null;
    return coreId ? RISK_MUTATION_CORE_DEFS[coreId] || RISK_MUTATION_CORE_DEFS.ember : RISK_MUTATION_CORE_DEFS.ember;
  }

  function getRiskMutationLevel(build) {
    return clamp(
      Math.round((build && build.riskMutationLevel) || 0),
      0,
      MAX_RISK_MUTATION_LEVEL
    );
  }

  function getRiskMutationTierLabel(level) {
    return `RISK ${clamp(Math.round(level || 0), 1, MAX_RISK_MUTATION_LEVEL)}`;
  }

  function getRiskMutationQueuedLevel(build) {
    return clamp(
      Math.round((build && build.riskMutationQueuedLevel) || 0),
      0,
      MAX_RISK_MUTATION_LEVEL
    );
  }

  function getRiskMutationOffsets(level) {
    const boundedLevel = clamp(level, 1, MAX_RISK_MUTATION_LEVEL);
    const offsets = [-0.22, 0.22];
    if (boundedLevel >= 2) {
      offsets.unshift(-0.46);
      offsets.push(0.46);
    }
    if (boundedLevel >= 4) {
      offsets.unshift(-0.72);
      offsets.push(0.72);
    }
    if (boundedLevel >= 6) {
      offsets.unshift(-0.96);
      offsets.push(0.96);
    }
    return offsets;
  }

  function applyRiskTaxMix(baseMix, queuedLevel) {
    const mix = { ...(baseMix || {}) };
    if (queuedLevel <= 0) {
      return mix;
    }
    mix.warden = (mix.warden || 0) + 0.04 + queuedLevel * 0.01;
    mix.mortar = (mix.mortar || 0) + 0.03 + queuedLevel * 0.008;
    mix.scuttler = Math.max(0.02, (mix.scuttler || 0) - 0.02);
    let total = 0;
    Object.keys(mix).forEach((key) => {
      total += mix[key];
    });
    if (total <= 0) {
      return baseMix || {};
    }
    Object.keys(mix).forEach((key) => {
      mix[key] = mix[key] / total;
    });
    return mix;
  }

  function applyRiskMutationPressureTax(config, build) {
    if (!config) {
      return config;
    }
    const queuedLevel = getRiskMutationQueuedLevel(build);
    if (queuedLevel <= 0) {
      return config;
    }
    const taxed = {
      ...config,
      spawnBudget: Math.max(0, (config.spawnBudget || 0) + 12 + queuedLevel * 4),
      activeCap: Math.max(1, (config.activeCap || 0) + 2 + Math.ceil(queuedLevel / 2)),
      baseSpawnInterval: Math.max(
        config.spawnIntervalMin || 0.08,
        (config.baseSpawnInterval || 0.2) * Math.max(0.78, 0.94 - queuedLevel * 0.03)
      ),
      mix: applyRiskTaxMix(config.mix, queuedLevel),
      note: `${config.note} Risk Mutation ${getRiskMutationTierLabel(queuedLevel)}가 다음 웨이브 압박세를 열어 적 밀도와 봉쇄 사선이 한 단계 더 거칠게 들어온다.`,
      directive: `${config.directive} Risk tax active: 적 예산과 hazard count가 함께 올라 greed로 받은 청구서를 바로 치러야 한다.`,
    };
    if (config.hazard) {
      taxed.hazard = {
        ...config.hazard,
        interval: Math.max(4.4, (config.hazard.interval || 6) * Math.max(0.78, 0.92 - queuedLevel * 0.025)),
        count: Math.max(1, (config.hazard.count || 1) + Math.floor((queuedLevel + 1) / 2)),
        damage: (config.hazard.damage || 0) + 1 + queuedLevel,
        coreHp: Number.isFinite(config.hazard.coreHp)
          ? config.hazard.coreHp + queuedLevel * 8
          : config.hazard.coreHp,
        relayDamage: Number.isFinite(config.hazard.relayDamage)
          ? config.hazard.relayDamage + Math.ceil(queuedLevel / 2)
          : config.hazard.relayDamage,
        salvageScrap: Number.isFinite(config.hazard.salvageScrap)
          ? config.hazard.salvageScrap + queuedLevel * 2
          : config.hazard.salvageScrap,
      };
    }
    return taxed;
  }

  function getApexMutationLevel(build) {
    return clamp(
      Math.round((build && build.apexMutationLevel) || 0),
      0,
      MAX_APEX_MUTATION_LEVEL
    );
  }

  function getApexMutationTierLabel(level) {
    return `PRED ${clamp(Math.round(level || 0), 1, MAX_APEX_MUTATION_LEVEL)}`;
  }

  function getApexSpineOffsets(level) {
    if (level >= 3) {
      return [-0.6, -0.34, -0.14, 0.14, 0.34, 0.6];
    }
    if (level === 2) {
      return [-0.48, -0.18, 0.18, 0.48];
    }
    return [-0.32, 0.32];
  }

  function getGlassBroadsideOffsets(level) {
    if (level >= 3) {
      return [-0.76, -0.5, -0.24, -0.08, 0.08, 0.24, 0.5, 0.76];
    }
    if (level === 2) {
      return [-0.66, -0.38, -0.14, 0.14, 0.38, 0.66];
    }
    if (level === 1) {
      return [-0.54, -0.18, 0.18, 0.54];
    }
    return [-0.34, 0.34];
  }

  function getRuptureCrownOffsets(level) {
    if (level >= 3) {
      return [-0.78, -0.52, -0.28, -0.1, 0.1, 0.28, 0.52, 0.78];
    }
    if (level === 2) {
      return [-0.68, -0.4, -0.14, 0.14, 0.4, 0.68];
    }
    if (level === 1) {
      return [-0.58, -0.22, 0, 0.22, 0.58];
    }
    return [-0.52, -0.18, 0.18, 0.52];
  }

  function getChassisSummary(build) {
    const chassis = getChassisBreakpointDef(build);
    return chassis ? `${chassis.label} · ${chassis.statusNote}` : "유틸리티 섀시 없음";
  }

  function round(value, digits) {
    const amount = 10 ** digits;
    return Math.round(value * amount) / amount;
  }

  function pickWeighted(weightMap, rng) {
    const entries = Object.entries(weightMap);
    const total = entries.reduce((sum, [, weight]) => sum + weight, 0);
    let roll = rng() * total;
    for (const [key, weight] of entries) {
      roll -= weight;
      if (roll <= 0) {
        return key;
      }
    }
    return entries[entries.length - 1][0];
  }

  function shuffle(array, rng) {
    const next = array.slice();
    for (let index = next.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(rng() * (index + 1));
      const temp = next[index];
      next[index] = next[swapIndex];
      next[swapIndex] = temp;
    }
    return next;
  }

  function uniqueCoreQueue(coreIds) {
    const seen = new Set();
    return coreIds.filter((coreId) => {
      if (seen.has(coreId)) {
        return false;
      }
      seen.add(coreId);
      return true;
    });
  }

  function sanitizeBenchCoreIds(coreIds) {
    const counts = {};
    const next = [];
    for (const coreId of coreIds) {
      if (!CORE_DEFS[coreId]) {
        continue;
      }
      const current = counts[coreId] || 0;
      if (current >= MAX_BENCH_COPIES_PER_CORE) {
        continue;
      }
      counts[coreId] = current + 1;
      next.push(coreId);
    }
    return next;
  }

  function sanitizeCatalystCoreIds(coreIds) {
    const seen = new Set();
    const next = [];
    for (const coreId of coreIds || []) {
      if (!FINISHER_RECIPE_DEFS[coreId] || seen.has(coreId)) {
        continue;
      }
      seen.add(coreId);
      next.push(coreId);
    }
    return next;
  }

  function getAffixCapacity(build) {
    if (build && build.coreId === "ember") {
      return LEGENDARY_AFFIX_CAP;
    }
    const attunedCopies =
      build &&
      build.attunedCoreId === build.coreId
        ? Math.max(1, build.attunedCopies || 1)
        : 1;
    return attunedCopies >= MAX_BENCH_COPIES_PER_CORE
      ? LEGENDARY_AFFIX_CAP
      : BASE_AFFIX_CAP;
  }

  function sanitizeAffixIds(affixIds, maxCount = BASE_AFFIX_CAP) {
    const next = [];
    const seen = new Set();
    for (const affixId of affixIds || []) {
      if (!AFFIX_DEFS[affixId] || seen.has(affixId)) {
        continue;
      }
      seen.add(affixId);
      next.push(affixId);
      if (next.length >= maxCount) {
        break;
      }
    }
    return next;
  }

  function getAffixDefs(build) {
    return sanitizeAffixIds(
      build && build.affixes,
      getAffixCapacity(build)
    ).map((affixId) => AFFIX_DEFS[affixId]);
  }

  function hasFinisherCatalyst(build, coreId) {
    return sanitizeCatalystCoreIds(build && build.finisherCatalysts).includes(coreId);
  }

  function getCatalystCapstone(build, coreId = build && build.coreId) {
    if (!build || !build.catalystCapstoneId) {
      return null;
    }
    const capstone = CATALYST_REFORGE_BY_ID[build.catalystCapstoneId];
    if (!capstone || (coreId && capstone.coreId !== coreId)) {
      return null;
    }
    return capstone;
  }

  function getRecipeAffixIds(recipe) {
    return (recipe && recipe.steps ? recipe.steps : [])
      .filter((step) => step.type === "affix")
      .map((step) => step.affixId);
  }

  function getRemainingRecipeAffixIds(build, recipe, affixIds) {
    const currentAffixIds = sanitizeAffixIds(
      affixIds || (build && build.affixes),
      getAffixCapacity(build)
    );
    return getRecipeAffixIds(recipe).filter((affixId) => !currentAffixIds.includes(affixId));
  }

  function isRecipeCoreReady(build, recipe) {
    if (!build || !recipe) {
      return false;
    }
    const coreStep = recipe.steps.find((step) => step.type === "core");
    return !coreStep || (build.attunedCopies || 1) >= coreStep.minCopies;
  }

  function buildCanEarnFinisherCatalyst(build) {
    if (!build) {
      return false;
    }
    const recipe = FINISHER_RECIPE_DEFS[build.coreId];
    if (!recipe || !isRecipeCoreReady(build, recipe) || hasFinisherCatalyst(build, build.coreId)) {
      return false;
    }
    return getRemainingRecipeAffixIds(build, recipe).length === 1;
  }

  function canApplyAffixChoice(build, affixId, replaceTarget) {
    if (!build || !AFFIX_DEFS[affixId]) {
      return false;
    }
    const recipe = FINISHER_RECIPE_DEFS[build.coreId];
    if (!recipe || !isRecipeCoreReady(build, recipe)) {
      return true;
    }
    const currentAffixIds = sanitizeAffixIds(build.affixes, getAffixCapacity(build));
    const nextAffixIds = replaceTarget
      ? sanitizeAffixIds(
          currentAffixIds.map((currentAffixId) =>
            currentAffixId === replaceTarget ? affixId : currentAffixId
          ),
          getAffixCapacity(build)
        )
      : sanitizeAffixIds(currentAffixIds.concat(affixId), getAffixCapacity(build));
    const remainingBefore = getRemainingRecipeAffixIds(build, recipe, currentAffixIds);
    if (
      remainingBefore.length === 1 &&
      remainingBefore[0] === affixId &&
      getRemainingRecipeAffixIds(build, recipe, nextAffixIds).length === 0 &&
      !hasFinisherCatalyst(build, build.coreId)
    ) {
      return false;
    }
    return true;
  }

  function getWeaponTierLabel(attunedCopies) {
    if (attunedCopies >= 4) {
      return "Legendary";
    }
    if (attunedCopies >= 3) {
      return "Epic";
    }
    if (attunedCopies >= 2) {
      return "Rare";
    }
    return "Standard";
  }

  function getSupportSystemDef(build) {
    const installedSystems = getInstalledSupportSystems(build);
    if (installedSystems.length === 0) {
      return null;
    }
    return SUPPORT_SYSTEM_DEFS[installedSystems[0].id] || null;
  }

  function getSupportBayCapacity(build) {
    if (!build) {
      return MAX_SUPPORT_BAYS;
    }
    return clamp(
      Math.round(build.supportBayCap || MAX_SUPPORT_BAYS),
      MAX_SUPPORT_BAYS,
      MAX_SUPPORT_BAY_LIMIT
    );
  }

  function getSupportSystemForgeLane(systemId) {
    const system = SUPPORT_SYSTEM_DEFS[systemId];
    return system && system.forgeLane ? system.forgeLane : "보조 시스템";
  }

  function isSupportSystemUnlocked(systemId, nextWave = 0) {
    const system = SUPPORT_SYSTEM_DEFS[systemId];
    if (!system) {
      return false;
    }
    const unlockWave = Number.isFinite(system.forgeWaveMin)
      ? system.forgeWaveMin
      : FORGE_PACKAGE_START_WAVE;
    return nextWave >= unlockWave;
  }

  function sanitizeSupportSystems(systems, build = null) {
    if (!Array.isArray(systems)) {
      return [];
    }
    const bayCap = getSupportBayCapacity(build);
    const next = [];
    const seen = new Set();
    for (const entry of systems) {
      if (!entry || !SUPPORT_SYSTEM_DEFS[entry.id] || seen.has(entry.id)) {
        continue;
      }
      seen.add(entry.id);
      next.push({
        id: entry.id,
        tier: clamp(Math.round(entry.tier || 1), 1, MAX_SUPPORT_SYSTEM_TIER),
      });
      if (next.length >= bayCap) {
        break;
      }
    }
    return next;
  }

  function getInstalledSupportSystems(build) {
    if (!build) {
      return [];
    }
    const normalized = sanitizeSupportSystems(build.supportSystems, build);
    if (normalized.length > 0) {
      return normalized;
    }
    if (build.supportSystemId && SUPPORT_SYSTEM_DEFS[build.supportSystemId]) {
      return [
        {
          id: build.supportSystemId,
          tier: clamp(build.supportSystemTier || 1, 1, MAX_SUPPORT_SYSTEM_TIER),
        },
      ];
    }
    return [];
  }

  function computeSupportSystemStats(build) {
    const installedSystems = getInstalledSupportSystems(build);
    const doctrineCapstone = getDoctrineCapstoneDef(build);
    if (installedSystems.length === 0) {
      return null;
    }
    const systems = installedSystems
      .map((entry, systemIndex) => {
        const system = SUPPORT_SYSTEM_DEFS[entry.id];
        const tierDef = system && system.tiers[entry.tier];
        if (!system || !tierDef) {
          return null;
        }
        return {
          id: system.id,
          tier: entry.tier,
          label: tierDef.label,
          title: tierDef.title,
          color: system.color,
          orbitColor: system.orbitColor,
          strokeColor: system.strokeColor,
          renderShape: system.renderShape,
          systemIndex,
          ...tierDef,
        };
      })
      .filter(Boolean);
    if (systems.length === 0) {
      return null;
    }
    const deployableSystems = systems
      .filter((system) => system.deployCount > 0)
      .map((system) => ({
        systemId: system.id,
        systemIndex: system.systemIndex,
        label: system.label,
        title: system.title,
        color: system.color,
        strokeColor: system.strokeColor,
        renderShape: system.renderShape,
        deployCount: system.deployCount,
        deployCooldown: system.deployCooldown,
        deployDistance: system.deployDistance,
        deployDuration: system.deployDuration,
        deployRadius: system.deployRadius,
        deployShotCooldown: system.deployShotCooldown,
        deployShotRange: system.deployShotRange,
        deployShotDamage: system.deployShotDamage,
        deployShotSpeed: system.deployShotSpeed,
        deployBurstCount: system.deployBurstCount,
        deployBurstSpread: system.deployBurstSpread,
      }));
    const satellites = [];
    systems.forEach((system, systemIndex) => {
      for (let index = 0; index < system.orbitCount; index += 1) {
        satellites.push({
          systemId: system.id,
          systemIndex,
          color: system.color,
          strokeColor: system.strokeColor,
          renderShape: system.renderShape,
          orbitRadius: system.orbitRadius,
          orbitSpeed: system.orbitSpeed,
          satelliteRadius: system.satelliteRadius,
          touchDamage: system.touchDamage,
          touchCooldown: system.touchCooldown,
          shotCooldown: system.shotCooldown,
          shotRange: system.shotRange,
          shotDamage: system.shotDamage,
          shotSpeed: system.shotSpeed,
          interceptRange: system.interceptRange,
          interceptCooldown: system.interceptCooldown,
          interceptPulseDamage: system.interceptPulseDamage,
          interceptPulseRadius: system.interceptPulseRadius,
          localIndex: index,
          localCount: system.orbitCount,
        });
      }
    });
    const primarySystem = systems[0];
    const satelliteCount = satellites.length;
    const deployCount = deployableSystems.reduce(
      (sum, system) => sum + Math.max(0, system.deployCount || 0),
      0
    );
    return {
      id: primarySystem.id,
      label: systems.map((system) => system.label).join(" + "),
      tier: Math.max(...systems.map((system) => system.tier)),
      orbitCount: satelliteCount,
      orbitRadius:
        satelliteCount > 0
          ? round(
              satellites.reduce((sum, satellite) => sum + satellite.orbitRadius, 0) / satelliteCount,
              1
            )
          : 0,
      orbitSpeed:
        satelliteCount > 0
          ? round(
              satellites.reduce((sum, satellite) => sum + satellite.orbitSpeed, 0) / satelliteCount,
              2
            )
          : 0,
      satelliteRadius:
        satelliteCount > 0 ? Math.max(...satellites.map((satellite) => satellite.satelliteRadius)) : 0,
      touchDamage: satellites.reduce((sum, satellite) => sum + satellite.touchDamage, 0),
      touchCooldown:
        satelliteCount > 0 ? Math.min(...satellites.map((satellite) => satellite.touchCooldown)) : 0,
      shotCooldown: systems.some((system) => system.shotCooldown > 0)
        ? Math.min(...systems.filter((system) => system.shotCooldown > 0).map((system) => system.shotCooldown))
        : 0,
      shotRange: Math.max(0, ...systems.map((system) => system.shotRange)),
      shotDamage: systems.reduce((sum, system) => sum + system.shotDamage, 0),
      shotSpeed: Math.max(0, ...systems.map((system) => system.shotSpeed)),
      interceptRange: Math.max(0, ...systems.map((system) => system.interceptRange)),
      interceptCooldown: systems.some((system) => system.interceptCooldown > 0)
        ? Math.min(...systems.filter((system) => system.interceptCooldown > 0).map((system) => system.interceptCooldown))
        : 0,
      interceptPulseDamage: systems.reduce((sum, system) => sum + system.interceptPulseDamage, 0),
      interceptPulseRadius: Math.max(0, ...systems.map((system) => system.interceptPulseRadius)),
      color: primarySystem.color,
      orbitColor: primarySystem.orbitColor,
      strokeColor: primarySystem.strokeColor,
      renderShape: primarySystem.renderShape,
      deployCount,
      doctrineId: build && build.bastionDoctrineId ? build.bastionDoctrineId : null,
      doctrineCapstoneId: doctrineCapstone ? doctrineCapstone.id : null,
      doctrineCapstoneLabel: doctrineCapstone ? doctrineCapstone.label : null,
      doctrineCapstoneStatusNote: doctrineCapstone ? doctrineCapstone.statusNote : null,
      statusNote: [systems.map((system) => system.statusNote).join(" "), doctrineCapstone ? doctrineCapstone.statusNote : null]
        .filter(Boolean)
        .join(" "),
      systems,
      satellites,
      deployableSystems,
    };
  }

  function createSupportSystemChoices(build, rng, options = null) {
    if (!build) {
      return [];
    }
    const random = typeof rng === "function" ? rng : Math.random;
    const nextWave = options && Number.isFinite(options.nextWave) ? options.nextWave : 0;
    const installedSystems = getInstalledSupportSystems(build);
    const supportBayCap = getSupportBayCapacity(build);
    const installedMap = new Map(installedSystems.map((entry) => [entry.id, entry]));
    const doctrine = build && build.bastionDoctrineId ? getBastionDoctrineDef(build) : null;
    const installChoices = shuffle(
      Object.keys(SUPPORT_SYSTEM_DEFS).filter(
        (systemId) =>
          !installedMap.has(systemId) &&
          isSupportSystemUnlocked(systemId, nextWave) &&
          doctrineAllowsSystemInstall(build, systemId)
      ),
      random
    )
      .map((systemId) => {
        if (installedSystems.length >= supportBayCap) {
          return null;
        }
        const system = SUPPORT_SYSTEM_DEFS[systemId];
        const tierDef = system && system.tiers[1];
        if (!system || !tierDef) {
          return null;
        }
        return {
          type: "system",
          id: `system:${system.id}:install`,
          verb: "설치",
          tag: "SYSTEM",
          title: tierDef.title,
          description:
            installedSystems.length > 0
              ? `${tierDef.description} 기존 ${installedSystems.map((entry) => SUPPORT_SYSTEM_DEFS[entry.id].tiers[entry.tier].label).join(" + ")}와 병렬 베이에 탑재된다.${doctrine ? ` ${doctrine.reserveText}` : ""}`
              : tierDef.description,
          slotText:
            installedSystems.length > 0
              ? `빈 베이 설치 · ${tierDef.slotText}`
              : tierDef.slotText,
          systemId: system.id,
          systemTier: 1,
          bayAction: "install",
          forgeLaneLabel: getSupportSystemForgeLane(system.id),
          cost: tierDef.cost,
        };
      })
      .filter(Boolean);
    const upgradeChoices = shuffle(installedSystems, random)
      .map((entry) => {
        if (entry.tier >= MAX_SUPPORT_SYSTEM_TIER) {
          return null;
        }
        const nextTier = entry.tier + 1;
        const system = SUPPORT_SYSTEM_DEFS[entry.id];
        const tierDef = system && system.tiers[nextTier];
        if (!system || !tierDef) {
          return null;
        }
        return {
          type: "system",
          id: `system:${system.id}:t${tierDef.tier}`,
          verb: "증설",
          tag: "SYSTEM",
          title: tierDef.title,
          description: tierDef.description,
          slotText: `기존 베이 증설 · ${tierDef.slotText}`,
          systemId: system.id,
          systemTier: tierDef.tier,
          bayAction: "upgrade",
          forgeLaneLabel: getSupportSystemForgeLane(system.id),
          cost: tierDef.cost,
        };
      })
      .filter(Boolean);
    return [...installChoices, ...upgradeChoices];
  }

  function shouldOfferSupportSystem(build, options) {
    if (!build || (options && options.finalForge)) {
      return false;
    }
    const nextWave = options && Number.isFinite(options.nextWave) ? options.nextWave : 0;
    const unlockedSupportExists = Object.keys(SUPPORT_SYSTEM_DEFS).some((systemId) =>
      isSupportSystemUnlocked(systemId, nextWave)
    );
    if (!unlockedSupportExists) {
      return false;
    }
    const installedSystems = getInstalledSupportSystems(build);
    const supportBayCap = getSupportBayCapacity(build);
    return (
      installedSystems.length < supportBayCap ||
      installedSystems.some((entry) => entry.tier < MAX_SUPPORT_SYSTEM_TIER)
    );
  }

  function shouldForceForgePackage(options) {
    if (!options || options.finalForge || options.fastGrant) {
      return false;
    }
    return (options.nextWave || 0) >= FORGE_PACKAGE_START_WAVE;
  }

  function shouldRunActBreakArmory(options) {
    if (!options || options.finalForge) {
      return false;
    }
    const nextWave = options.nextWave || 0;
    return nextWave === ACT_BREAK_ARMORY_WAVE || nextWave === LATE_BREAK_ARMORY_WAVE;
  }

  function shouldUseCompactActBreakCache(options) {
    if (!options || options.finalForge) {
      return false;
    }
    return (options.nextWave || 0) === ACT_BREAK_ARMORY_WAVE;
  }

  function shouldRunArchitectureDraft(options) {
    if (!options || options.finalForge) {
      return false;
    }
    return (options.nextWave || 0) === ARCHITECTURE_DRAFT_WAVE;
  }

  function isLateBreakArmory(options) {
    if (!options) {
      return false;
    }
    return (options.nextWave || 0) === LATE_BREAK_ARMORY_WAVE;
  }

  function getArmoryLabel(options) {
    return isLateBreakArmory(options) ? "Late Break Armory" : "Act Break Armory";
  }

  function shouldRunBastionDraft(options) {
    if (!options || options.finalForge) {
      return false;
    }
    return false;
  }

  function shouldRunCatalystDraft(options, build) {
    if (!options || options.finalForge || !build) {
      return false;
    }
    const nextWave = options.nextWave || 0;
    return (
      nextWave >= ACT3_CATALYST_DRAFT_WAVE &&
      nextWave <= MAX_WAVES &&
      hasFinisherCatalyst(build, build.coreId) &&
      !build.catalystCapstoneId &&
      !build.cashoutSupportId &&
      !build.act3CatalystDraftSeen
    );
  }

  function shouldUseFieldGrant(options) {
    if (!options || options.finalForge) {
      return false;
    }
    const nextWave = options.nextWave || 0;
    return (
      nextWave >= FORGE_PACKAGE_START_WAVE &&
      !shouldRunArchitectureDraft(options) &&
      !shouldRunActBreakArmory(options) &&
      !shouldRunBastionDraft(options)
    );
  }

  function shouldUseLateFieldCache(nextWave) {
    return (
      Number.isFinite(nextWave) &&
      nextWave >= LATE_FIELD_CACHE_START_WAVE &&
      (nextWave - LATE_FIELD_CACHE_START_WAVE) % LATE_FIELD_CACHE_INTERVAL === 0
    );
  }

  function isArsenalBreakpointWave(nextWave) {
    return (
      shouldUseLateFieldCache(nextWave) &&
      Number.isFinite(nextWave) &&
      (nextWave - LATE_FIELD_CACHE_START_WAVE) % LATE_FIELD_BREAKPOINT_INTERVAL === 0
    );
  }

  function getLateFieldBreakpointRank(nextWave) {
    if (!isArsenalBreakpointWave(nextWave)) {
      return 0;
    }
    return Math.floor((nextWave - LATE_FIELD_CACHE_START_WAVE) / LATE_FIELD_BREAKPOINT_INTERVAL) + 1;
  }

  function getLateFieldMutationLevel(build) {
    return clamp(
      build && Number.isFinite(build.lateFieldMutationLevel) ? build.lateFieldMutationLevel : 0,
      0,
      MAX_LATE_FIELD_MUTATION_LEVEL
    );
  }

  function getLateFieldAegisLevel(build) {
    return clamp(
      build && Number.isFinite(build.lateFieldAegisLevel) ? build.lateFieldAegisLevel : 0,
      0,
      MAX_LATE_FIELD_AEGIS_LEVEL
    );
  }

  function getLateFieldMutationTierLabel(level) {
    const labels = [
      "Twin Battery",
      "Broadside Rack",
      "Siege Bloom",
      "War Crown",
      "Endline Array",
      "Cataclysm Rack",
      "Dreadnova Array",
    ];
    return labels[Math.max(0, Math.min(labels.length - 1, level - 1))] || "Twin Battery";
  }

  function getLateFieldAegisTierLabel(level) {
    const labels = [
      "Aegis Ring",
      "Bastion Halo",
      "Intercept Halo",
      "Warplate Halo",
      "Citadel Halo",
    ];
    return labels[Math.max(0, Math.min(labels.length - 1, level - 1))] || "Aegis Ring";
  }

  function getLateFieldAegisCooldown(level) {
    return Math.max(2.6, 5.2 - level * 0.55);
  }

  function getLateFieldAegisReduction(level) {
    return clamp(0.32 + level * 0.1, 0.32, 0.72);
  }

  function getLateFieldAegisMaxCharges(build) {
    const level = getLateFieldAegisLevel(build);
    if (level >= 4) {
      return 2;
    }
    return level > 0 ? 1 : 0;
  }

  function getLateFieldGreedPressure(build) {
    if (!build) {
      return 0;
    }
    return Math.max(
      Number.isFinite(build.blackLedgerRaidWaves) ? build.blackLedgerRaidWaves : 0,
      Number.isFinite(build.bastionPactDebtWaves) ? build.bastionPactDebtWaves : 0
    );
  }

  function getLateFieldConvergenceDef(buildOrId) {
    const convergenceId =
      typeof buildOrId === "string"
        ? buildOrId
        : buildOrId && buildOrId.lateFieldConvergenceId
          ? buildOrId.lateFieldConvergenceId
          : null;
    return convergenceId
      ? Object.values(LATE_FIELD_CONVERGENCE_DEFS).find((def) => def.id === convergenceId) || null
      : null;
  }

  function canOfferLateFieldConvergence(build) {
    if (!build || build.lateFieldConvergenceId || !build.chassisId) {
      return false;
    }
    const supportCount = getInstalledSupportSystems(build).length;
    if (getSupportBayCapacity(build) < 3 || supportCount <= 0) {
      return false;
    }
    return Boolean(
      getLateFieldGreedPressure(build) > 0 ||
      getLateFieldMutationLevel(build) > 0 ||
      getLateFieldAegisLevel(build) > 0 ||
      getLateAscensionDef(build)
    );
  }

  function unlockLateSupportBay(build) {
    if (!build) {
      return false;
    }
    const targetCap =
      build.auxiliaryJunctionLevel > 0 ? MAX_SUPPORT_BAY_LIMIT : MAX_SUPPORT_BAYS + 1;
    if (getSupportBayCapacity(build) >= targetCap) {
      return false;
    }
    build.supportBayCap = targetCap;
    return true;
  }

  function shouldSkipOwnershipAdminStop(build, nextWave = 0) {
    if (CONSOLIDATED_12_WAVE_ROUTE && nextWave === LATE_BREAK_ARMORY_WAVE) {
      return false;
    }
    return Boolean(
      build &&
      build.wave6ChassisBreakpoint &&
      Number.isFinite(nextWave) &&
      nextWave === LATE_BREAK_ARMORY_WAVE
    );
  }

  function applyAuxiliaryJunction(build) {
    if (!build) {
      return false;
    }
    build.auxiliaryJunctionLevel = Math.max(1, Math.round(build.auxiliaryJunctionLevel || 0));
    if (getSupportBayCapacity(build) < MAX_SUPPORT_BAYS + 1) {
      build.supportBayCap = MAX_SUPPORT_BAYS + 1;
    }
    return true;
  }

  function applyChassisBreakpoint(build, chassisId, run) {
    if (!build || !chassisId || build.chassisId === chassisId) {
      return false;
    }
    const chassis = getChassisBreakpointDef(chassisId);
    if (!chassis) {
      return false;
    }
    build.chassisId = chassis.id;
    if (typeof chassis.apply === "function") {
      chassis.apply(build, run);
    }
    if (run && run.player) {
      run.player.chassisVectorTime = 0;
      run.player.chassisSalvageBurstTime = 0;
      run.player.chassisPickupPulseCooldown = 0;
      run.player.chassisAnchorCharge = 0;
      run.player.chassisAnchorPulseCooldown = 0;
      run.player.chassisAnchorActiveTime = 0;
    }
    return true;
  }

  function autoCommitDoctrinePursuit(build) {
    const pursuit = getDoctrineForgePursuitDef(build);
    if (
      !build ||
      !build.overcommitUnlocked ||
      build.doctrinePursuitCommitted ||
      build.doctrineChaseClaimed ||
      !pursuit
    ) {
      return null;
    }
    build.doctrinePursuitCommitted = true;
    build.doctrinePursuitProgress = 0;
    build.doctrinePursuitExpired = false;
    build.upgrades.push(`교리 추격 자동 점화: ${pursuit.label}`);
    return pursuit;
  }

  function getForgeDraftType(options) {
    if (options && options.finalForge) {
      return "final";
    }
    if (shouldRunActBreakArmory(options)) {
      return "armory";
    }
    if (shouldRunArchitectureDraft(options)) {
      return "architecture_draft";
    }
    if (shouldRunBastionDraft(options)) {
      return "bastion_draft";
    }
    if (shouldRunCatalystDraft(options, options.build)) {
      return "catalyst_draft";
    }
    if (shouldForceForgePackage(options)) {
      return "package";
    }
    return "single";
  }

  function sanitizeWeaponEvolutionState(weaponEvolutions) {
    const normalized = {};
    const source =
      weaponEvolutions && typeof weaponEvolutions === "object" ? weaponEvolutions : {};
    Object.keys(WEAPON_EVOLUTION_DEFS).forEach((coreId) => {
      normalized[coreId] = clamp(
        Number.isFinite(source[coreId]) ? Math.floor(source[coreId]) : 0,
        0,
        MAX_WEAPON_EVOLUTION_TIER
      );
    });
    return normalized;
  }

  function getWeaponEvolutionTier(build, coreId) {
    if (!build || !WEAPON_EVOLUTION_DEFS[coreId]) {
      return 0;
    }
    return sanitizeWeaponEvolutionState(build.weaponEvolutions)[coreId] || 0;
  }

  function createWeaponEvolutionChoice(build, options) {
    if (!build || !WEAPON_EVOLUTION_DEFS[build.coreId] || (options && options.finalForge)) {
      return null;
    }
    const nextWave = options && Number.isFinite(options.nextWave) ? options.nextWave : 0;
    if (nextWave < FORGE_PACKAGE_START_WAVE) {
      return null;
    }
    const currentTier = getWeaponEvolutionTier(build, build.coreId);
    const nextTier = currentTier + 1;
    const tierDef = WEAPON_EVOLUTION_DEFS[build.coreId].tiers[nextTier];
    if (!tierDef) {
      return null;
    }
    return {
      type: "evolution",
      id: `evolution:${build.coreId}:t${nextTier}`,
      verb: "진화",
      tag: tierDef.tag || "EVOLVE",
      title: tierDef.title,
      description: tierDef.description,
      slotText: tierDef.slotText,
      coreId: build.coreId,
      evolutionTier: nextTier,
      previewText: tierDef.previewText,
      cost: tierDef.cost,
    };
  }

  function shouldSurfaceForgeFinalePreview(choice) {
    return Boolean(choice && choice.finalePreview && !CONSOLIDATED_12_WAVE_ROUTE);
  }

  function getLateBreakRoutePreview(choice) {
    if (!choice || !choice.lateBreakProfileId) {
      return [];
    }
    const wave11Profile = getLateBreakCrownProfile({ lateBreakProfileId: choice.lateBreakProfileId }, 10);
    const wave12Profile = getLateBreakCrownProfile({ lateBreakProfileId: choice.lateBreakProfileId }, 11);
    const routeRows = [];
    if (wave11Profile) {
      routeRows.push({ label: "Wave 11", value: wave11Profile.bandLabel || wave11Profile.label });
    }
    if (wave12Profile) {
      routeRows.push({ label: "Wave 12", value: wave12Profile.bandLabel || wave12Profile.label });
    }
    return routeRows;
  }

  function createForgePreviewRows(choice) {
    if (!choice) {
      return [];
    }
    const finaleRows = shouldSurfaceForgeFinalePreview(choice)
      ? [
          { label: "시험", value: choice.finalePreview.label },
          { label: "압박", value: choice.finalePreview.hazard },
        ]
      : [];
    if (choice.type === "core") {
      return [
        { label: "결과", value: `${CORE_DEFS[choice.coreId].short} / ${getWeaponTierLabel(choice.resultingCopies)} / ${formatSyncLabel(choice.syncLevel)}` },
        {
          label: choice.benchCopies > 0 ? "소모" : "전환",
          value: choice.benchCopies > 0 ? `보관 ${choice.benchCopies}개` : "포지 직행 장착",
        },
        ...finaleRows,
      ];
    }
    if (choice.type === "affix") {
      return [
        { label: "속성", value: AFFIX_DEFS[choice.affixId].label },
        { label: "방식", value: choice.replaceTarget ? `교체 ${AFFIX_DEFS[choice.replaceTarget].label}` : "새 속성 추가" },
        ...finaleRows,
      ];
    }
    if (choice.type === "mod") {
      return [
        { label: "분류", value: MOD_DEFS[choice.modId].tag },
        { label: "효과", value: "현재 무기 직접 강화" },
        ...finaleRows,
      ];
    }
    if (choice.type === "evolution") {
      return [
        { label: "무기", value: CORE_DEFS[choice.coreId].short },
        { label: "진화", value: `T${choice.evolutionTier} · ${choice.previewText}` },
        ...finaleRows,
      ];
    }
    if (choice.type === "utility" && choice.action === "reforge") {
      return [
        { label: "보관", value: "코어 구성 재조합" },
        { label: "무기", value: "현재 무기 유지" },
        ...finaleRows,
      ];
    }
    if (choice.type === "utility" && choice.action === "catalyst_reforge") {
      return [
        { label: "촉매", value: `${choice.recipeLabel} 포기` },
        { label: "결과", value: choice.capstoneLabel },
        ...finaleRows,
      ];
    }
    if (choice.type === "utility" && choice.action === "affix_reforge") {
      return [
        { label: "교체", value: AFFIX_DEFS[choice.targetAffixId].label },
        { label: "신규", value: AFFIX_DEFS[choice.nextAffixId].label },
        ...finaleRows,
      ];
    }
    if (choice.type === "utility" && choice.action === "recycle") {
      return [
        { label: "획득", value: `고철 ${choice.scrapValue}` },
        { label: "대상", value: "보관 코어 전체" },
        ...finaleRows,
      ];
    }
    if (choice.type === "utility" && choice.action === "architecture_forecast") {
      return [
        { label: "교리", value: choice.doctrineLabel || "아키텍처" },
        {
          label: "무기",
          value: choice.weaponChoice ? choice.weaponChoice.title : "주무장 재배선",
        },
        {
          label: "형태",
          value: choice.doctrineFormTrait || choice.doctrineFormLabel || "monster form",
        },
        {
          label: "다음 몸체",
          value: choice.breakpointLabel || "Wave 6 Chassis Break",
        },
        {
          label: "support",
          value: "Wave 8 Late Break Armory",
        },
        ...finaleRows,
      ];
    }
    if (choice.type === "utility" && choice.action === "doctrine_chase") {
      return [
        {
          label: "추격",
          value: choice.pursuitLabel || "Forge Pursuit",
        },
        {
          label: "웨이브",
          value: "Wave 6-8 marked elite",
        },
        {
          label: "목표",
          value: `${choice.pursuitGoal || 2} shards`,
        },
        ...finaleRows,
      ];
    }
    if (choice.type === "utility" && choice.action === "bastion_bay_forge") {
      return [
        {
          label: "섀시",
          value: choice.chassisTitle || "유틸리티 레이어",
        },
        {
          label: "베이",
          value: choice.bayUnlock ? "즉시 +1" : "Wave 8 rider",
        },
        {
          label: "시스템",
          value: choice.systemChoice ? choice.systemChoice.title : choice.bayUnlock ? "조기 해금" : "Wave 8 선택",
        },
        ...finaleRows,
      ];
    }
    if (choice.type === "utility" && choice.action === "wave6_ascension") {
      return [
        {
          label: "교리",
          value: choice.doctrineLabel || "Ascension",
        },
        {
          label: "변형",
          value: choice.doctrineFormTrait || choice.doctrineFormLabel || "주포 변이",
        },
        {
          label: "섀시",
          value: choice.chassisTitle || "utility chassis",
        },
        {
          label: "support",
          value: "Wave 8 Late Break Armory",
        },
        ...finaleRows,
      ];
    }
    if (choice.type === "utility" && choice.action === "field_convergence") {
      return [
        { label: "형태", value: choice.title || "Convergence" },
        { label: "섀시", value: choice.chassisTitle || "late chassis" },
        {
          label: "연료",
          value:
            choice.greedPressure > 0
              ? `greed pressure ${choice.greedPressure}`
              : `support ${choice.supportCount || 0}`,
        },
        ...finaleRows,
      ];
    }
    if (
      choice.type === "utility" &&
      (choice.action === "field_mutation" || choice.action === "field_aegis" || choice.action === "field_greed") &&
      choice.lateBreakProfileId
    ) {
      return [
        { label: "분기", value: choice.forgeLaneLabel || choice.laneLabel || choice.title || "Late Break" },
        ...getLateBreakRoutePreview(choice),
      ];
    }
    if (choice.type === "system") {
      const systemDef = SUPPORT_SYSTEM_DEFS[choice.systemId];
      const tierDef = systemDef && systemDef.tiers[choice.systemTier];
      return [
        { label: "계층", value: choice.systemTier === 1 ? "설치" : `Mk.${choice.systemTier}` },
        {
          label: "효과",
          value: tierDef ? tierDef.previewText : "보조 시스템 증설",
        },
        ...finaleRows,
      ];
    }
    return [{ label: "효과", value: choice.slotText || choice.description || "선택" }, ...finaleRows];
  }

  function splitForgeSentences(text) {
    if (!text) {
      return [];
    }
    return String(text)
      .split(/(?<=[.!?])\s+/)
      .map((sentence) => sentence.trim())
      .filter(Boolean);
  }

  function getForgeChoiceTone(choice) {
    const laneText = `${choice?.forgeLaneLabel || ""} ${choice?.laneLabel || ""} ${choice?.tag || ""} ${choice?.action || ""}`.toLowerCase();
    if (laneText.includes("greed") || laneText.includes("ledger") || laneText.includes("pact")) {
      return "greed";
    }
    if (
      laneText.includes("defense") ||
      laneText.includes("support") ||
      laneText.includes("utility") ||
      laneText.includes("halo") ||
      laneText.includes("bay")
    ) {
      return "defense";
    }
    return "main";
  }

  function getForgeRecommendedRiderPlan(choice) {
    const tone = getForgeChoiceTone(choice);
    if (tone === "defense") {
      return {
        laneLabel: "Support Rider",
        note: "안정화된 pocket 위에 자동 화력을 얹어 다음 전투 소유권을 더 빠르게 넓힌다.",
      };
    }
    if (tone === "greed") {
      return {
        laneLabel: "Defense / Utility",
        note: "탐욕 계약 직후의 debt와 진입 리스크를 바로 상쇄해 다음 웨이브를 버틴다.",
      };
    }
    return {
      laneLabel: "Defense / Utility",
      note: "커진 주포 실루엣이 바로 숨 쉴 공간을 갖도록 shell과 회복 여지를 먼저 붙인다.",
    };
  }

  function scoreForgeRiderChoice(choice, previousChoice) {
    if (!choice) {
      return -1;
    }
    const recommendedLane = getForgeRecommendedRiderPlan(previousChoice).laneLabel;
    const riderLane = choice.laneLabel || choice.forgeLaneLabel || "";
    const tone = getForgeChoiceTone(previousChoice);
    let score = 0;
    if (riderLane === recommendedLane) {
      score += 120;
    } else if (riderLane === "Support Rider") {
      score += tone === "main" ? 78 : tone === "greed" ? 72 : 54;
    } else if (riderLane === "Defense / Utility") {
      score += tone === "defense" ? 42 : 84;
    } else if (riderLane === "Greed Contract") {
      score += tone === "defense" ? 70 : 36;
    }
    if ((choice.cost || 0) <= 0) {
      score += 8;
    }
    return score;
  }

  function curateForgeRiderChoices(riderChoices, previousChoice) {
    if (!Array.isArray(riderChoices) || riderChoices.length <= 2) {
      return riderChoices || [];
    }
    return [...riderChoices]
      .sort((left, right) => scoreForgeRiderChoice(right, previousChoice) - scoreForgeRiderChoice(left, previousChoice))
      .slice(0, 2);
  }

  function getForgeChoiceTransformation(choice) {
    if (!choice) {
      return {
        laneLabel: "Forge",
        title: "Unknown",
        tone: "main",
        promise: "다음 전투 실루엣을 크게 바꾸는 선택이다.",
        proof: "선택 직후 전장 규칙이 즉시 바뀐다.",
        riderLabel: "Defense / Utility",
        riderNote: "다음 전투 진입을 안전하게 다듬는다.",
      };
    }
    const descriptionSentences = splitForgeSentences(choice.description);
    const previewRows = createForgePreviewRows(choice).filter(Boolean);
    const primaryPreview = previewRows[0];
    const secondaryPreview = previewRows[1];
    const riderPlan = getForgeRecommendedRiderPlan(choice);
    const proofText =
      choice.roadmapDetail ||
      (shouldSurfaceForgeFinalePreview(choice)
        ? `${choice.finalePreview.label} · ${choice.finalePreview.hazard}`
        : descriptionSentences[1] ||
          (secondaryPreview ? `${secondaryPreview.label} ${secondaryPreview.value}` : "") ||
          choice.slotText ||
          "다음 전투에서 변형이 즉시 드러난다.");
    const promiseText =
      descriptionSentences[0] ||
      (primaryPreview ? `${primaryPreview.label} ${primaryPreview.value}` : "") ||
      choice.slotText ||
      "실루엣을 바꾸는 선택";
    return {
      laneLabel: choice.forgeLaneLabel || choice.laneLabel || "Forge Lane",
      title: choice.title || choice.slotText || "Unnamed Shift",
      tone: getForgeChoiceTone(choice),
      promise: promiseText,
      proof: proofText,
      riderLabel: riderPlan.laneLabel,
      riderNote: riderPlan.note,
      accent: primaryPreview ? `${primaryPreview.label} ${primaryPreview.value}` : choice.slotText || "",
    };
  }

  function createForgeSpotlightMarkup(choices) {
    if (!Array.isArray(choices) || choices.length === 0) {
      return "";
    }
    return `
      <div class="forge-spotlight-grid">
        ${choices
          .slice(0, 3)
          .map((choice) => {
            const transformation = getForgeChoiceTransformation(choice);
            return `
              <article class="forge-spotlight forge-spotlight--${transformation.tone}">
                <p class="panel__eyebrow">${choice.contractLabel || transformation.laneLabel}</p>
                <strong>${transformation.title}</strong>
                <p class="forge-spotlight__promise">${transformation.promise}</p>
                <p class="summary-note">${transformation.proof}</p>
                <p class="summary-note">추천 rider · ${transformation.riderLabel}</p>
              </article>
            `;
          })
          .join("")}
      </div>
    `;
  }

  function clonePreviewBuild(build) {
    return build ? JSON.parse(JSON.stringify(build)) : null;
  }

  function createForgePreviewRun(build) {
    if (!build) {
      return null;
    }
    const previewBuild = clonePreviewBuild(build);
    return {
      build: previewBuild,
      resources: { scrap: 999, scrapCollected: 0, scrapSpent: 0 },
      stats: { kills: 0, coresCollected: 0, scrapCollected: 0, scrapSpent: 0 },
      player: {
        hp: Math.max(1, 100 + (previewBuild.maxHpBonus || 0)),
        maxHp: Math.max(1, 100 + (previewBuild.maxHpBonus || 0)),
        heat: 0,
        overheated: false,
        invulnerableTime: 0,
      },
    };
  }

  function getWeaponFormLabel(weapon) {
    if (!weapon) {
      return "Unknown Form";
    }
    return getPresentationHeadlineLabel(weapon);
  }

  function shouldUseShippingRoutePresentation(waveNumber = 1) {
    const boundedWave = clamp(
      Math.round(waveNumber || 1),
      1,
      MAX_WAVES + POST_CAPSTONE_WAVE_COUNT
    );
    return CONSOLIDATED_12_WAVE_ROUTE && boundedWave <= MAX_WAVES;
  }

  function getPresentationHeadlineLabel(weapon, waveNumber = 1) {
    if (!weapon) {
      return "Unknown Form";
    }
    if (shouldUseShippingRoutePresentation(waveNumber)) {
      return (
        weapon.headlineFormLabel ||
        weapon.lateAscensionLabel ||
        weapon.capstoneLabel ||
        weapon.doctrineFormLabel ||
        weapon.evolutionLabel ||
        (weapon.core ? weapon.core.label : "Base Frame")
      );
    }
    return (
      weapon.headlineFormLabel ||
      weapon.afterburnDominionLabel ||
      weapon.afterburnOverdriveLabel ||
      weapon.lateAscensionLabel ||
      weapon.lateFieldConvergenceLabel ||
      weapon.capstoneLabel ||
      weapon.doctrineFormLabel ||
      weapon.evolutionLabel ||
      (weapon.core ? weapon.core.label : "Base Frame")
    );
  }

  function getPresentationFormDetail(build, weapon, waveNumber = 1) {
    const activeCore = CORE_DEFS[build.coreId];
    if (shouldUseShippingRoutePresentation(waveNumber)) {
      return (
        weapon.lateAscensionStatusNote ||
        (getClaimedWildcardProtocolIds(build).includes("rogue_lattice")
          ? weapon.lateFieldConvergenceStatusNote || weapon.lateFieldMutationStatusNote
          : null) ||
        weapon.capstoneStatusNote ||
        weapon.doctrineStatusNote ||
        weapon.evolutionStatusNote ||
        `${activeCore.label} ${weapon.tierLabel} 프레임이 현재 주력이다.`
      );
    }
    return (
      weapon.afterburnDominionStatusNote ||
      weapon.afterburnOverdriveStatusNote ||
      weapon.lateAscensionStatusNote ||
      (getClaimedWildcardProtocolIds(build).includes("rogue_lattice")
        ? weapon.lateFieldConvergenceStatusNote || weapon.lateFieldMutationStatusNote
        : null) ||
      weapon.capstoneStatusNote ||
      weapon.doctrineStatusNote ||
      weapon.evolutionStatusNote ||
      `${activeCore.label} ${weapon.tierLabel} 프레임이 현재 주력이다.`
    );
  }

  function getWeaponEchoCount(weapon) {
    if (!weapon) {
      return 0;
    }
    const patternCounts = [
      weapon.lateFieldMutationFirePattern &&
      Array.isArray(weapon.lateFieldMutationFirePattern.offsets)
        ? weapon.lateFieldMutationFirePattern.offsets.length
        : 0,
      weapon.riskMutationFirePattern &&
      Array.isArray(weapon.riskMutationFirePattern.offsets)
        ? weapon.riskMutationFirePattern.offsets.length
        : 0,
      weapon.apexMutationFirePattern &&
      Array.isArray(weapon.apexMutationFirePattern.offsets)
        ? weapon.apexMutationFirePattern.offsets.length
        : 0,
      weapon.afterburnDominionFirePattern &&
      Array.isArray(weapon.afterburnDominionFirePattern.offsets)
        ? weapon.afterburnDominionFirePattern.offsets.length
        : 0,
    ];
    return Math.max(...patternCounts, 0);
  }

  function describeWeaponVolley(weapon) {
    if (!weapon || !weapon.core) {
      return "화망 미확인";
    }
    if (weapon.core.id === "scatter") {
      return `${weapon.pellets}펠릿 확산`;
    }
    if (weapon.core.id === "lance") {
      return `관통 ${weapon.pierce} 레일`;
    }
    if (weapon.core.id === "ricochet") {
      return `반사 ${weapon.bounce} / 연쇄 ${weapon.chain}`;
    }
    return `연사 ${(1 / Math.max(weapon.cooldown || 1, 0.08)).toFixed(1)}/s`;
  }

  function describeWeaponBattery(weapon) {
    if (!weapon) {
      return "보조 포문 없음";
    }
    if (weapon.lateFieldBroadsideConfig) {
      return `브로드사이드 포드 ${weapon.lateFieldBroadsideConfig.podCount}`;
    }
    const echoCount = getWeaponEchoCount(weapon);
    if (echoCount > 0) {
      return `에코 배럴 ${echoCount}`;
    }
    if (weapon.chain > 0) {
      return `연쇄 반경 ${Math.round(weapon.chainRange || 0)}`;
    }
    return `탄속 ${Math.round(weapon.projectileSpeed || 0)}`;
  }

  function formatHeadlineDeltaRow(label, beforeValue, afterValue) {
    if (!beforeValue && !afterValue) {
      return null;
    }
    return {
      label,
      value:
        beforeValue && beforeValue !== afterValue
          ? `${beforeValue} -> ${afterValue}`
          : afterValue || beforeValue,
    };
  }

  function getForgeHeadlineShowcase(choice, build, waveNumber = 1) {
    if (!choice || !build) {
      return null;
    }
    const previewRun = createForgePreviewRun(build);
    if (!previewRun) {
      return null;
    }
    const beforeWeapon = computeWeaponStats(build);
    const beforeSupport = getForgeSupportTrackSnapshot(build);
    const appliedChoice = applyForgeChoice(previewRun, {
      ...choice,
      cost: 0,
    });
    if (!appliedChoice) {
      return null;
    }
    const afterWeapon = computeWeaponStats(previewRun.build);
    const afterSupport = getForgeSupportTrackSnapshot(previewRun.build);
    const transformation = getForgeChoiceTransformation(choice);
    const nextProof = getImmediateProofWindowSummary(previewRun.build, waveNumber);
    const rows = [
      formatHeadlineDeltaRow("Form", getWeaponFormLabel(beforeWeapon), getWeaponFormLabel(afterWeapon)),
      formatHeadlineDeltaRow("Volley", describeWeaponVolley(beforeWeapon), describeWeaponVolley(afterWeapon)),
      formatHeadlineDeltaRow("Battery", describeWeaponBattery(beforeWeapon), describeWeaponBattery(afterWeapon)),
      formatHeadlineDeltaRow("Rider", beforeSupport.label, afterSupport.label),
    ]
      .filter(Boolean)
      .slice(0, 3);
    const headlineChanged = rows.some((row) => row.value.includes("->"));
    const score =
      (getForgeChoiceTone(choice) === "main" ? 1000 : 0) +
      (headlineChanged ? 180 : 0) +
      Math.abs((afterWeapon.pellets || 0) - (beforeWeapon.pellets || 0)) * 120 +
      Math.abs((afterWeapon.pierce || 0) - (beforeWeapon.pierce || 0)) * 100 +
      Math.abs((afterWeapon.chain || 0) - (beforeWeapon.chain || 0)) * 90 +
      Math.abs((afterWeapon.bounce || 0) - (beforeWeapon.bounce || 0)) * 90 +
      Math.abs(getWeaponEchoCount(afterWeapon) - getWeaponEchoCount(beforeWeapon)) * 70 +
      Math.abs(
        ((afterWeapon.lateFieldBroadsideConfig && afterWeapon.lateFieldBroadsideConfig.podCount) || 0) -
          ((beforeWeapon.lateFieldBroadsideConfig && beforeWeapon.lateFieldBroadsideConfig.podCount) || 0)
      ) *
        120;
    return {
      choice,
      transformation,
      rows,
      proofLabel: nextProof.label,
      proofDetail: nextProof.detail,
      score,
    };
  }

  function pickForgeHeadlineShowcase(choices, build, waveNumber = 1) {
    if (!Array.isArray(choices) || choices.length === 0 || !build) {
      return null;
    }
    return choices
      .map((choice) => getForgeHeadlineShowcase(choice, build, waveNumber))
      .filter(Boolean)
      .sort((left, right) => right.score - left.score)[0] || null;
  }

  function createForgeHeadlineShowcaseMarkup(showcase) {
    if (!showcase) {
      return "";
    }
    return `
      <article class="forge-headline-showcase forge-headline-showcase--${showcase.transformation.tone}">
        <div class="forge-headline-showcase__header">
          <p class="panel__eyebrow">Monster Form Promise</p>
          <span class="forge-headline-showcase__tag">${showcase.choice.contractLabel || showcase.transformation.laneLabel}</span>
        </div>
        <strong>${showcase.choice.title}</strong>
        <p class="forge-headline-showcase__promise">${showcase.transformation.promise}</p>
        <div class="forge-headline-showcase__grid">
          ${showcase.rows
            .map(
              (row) => `
                <article class="forge-headline-showcase__cell">
                  <span>${row.label}</span>
                  <strong>${row.value}</strong>
                </article>
              `
            )
            .join("")}
        </div>
        <p class="summary-note">${showcase.proofLabel}. ${showcase.transformation.proof}</p>
      </article>
    `;
  }

  function getForgeFeaturedChoice(choices, build, waveNumber = 1) {
    const showcase = pickForgeHeadlineShowcase(choices, build, waveNumber);
    if (!showcase) {
      return { showcase: null, featuredIndex: -1 };
    }
    const featuredIndex = Array.isArray(choices)
      ? choices.findIndex(
          (choice) =>
            choice === showcase.choice ||
            (choice && showcase.choice && choice.id && choice.id === showcase.choice.id)
        )
      : -1;
    return {
      showcase,
      featuredIndex,
    };
  }

  function getBenchCount(build, coreId) {
    if (!build || !Array.isArray(build.pendingCores)) {
      return 0;
    }
    return build.pendingCores.reduce(
      (total, storedCoreId) => total + (storedCoreId === coreId ? 1 : 0),
      0
    );
  }

  function getBenchSyncLevel(build, coreId) {
    return clamp(getBenchCount(build, coreId) - 1, 0, 3);
  }

  function formatSyncLabel(level) {
    if (level >= 3) {
      return "3강";
    }
    if (level >= 2) {
      return "2강";
    }
    if (level >= 1) {
      return "1강";
    }
    return "0강";
  }

  function getBenchEntries(build) {
    const counts = {};
    const benchCoreIds = sanitizeBenchCoreIds(
      build && Array.isArray(build.pendingCores) ? build.pendingCores : []
    );
    for (const coreId of benchCoreIds) {
      counts[coreId] = (counts[coreId] || 0) + 1;
    }
    return Object.entries(counts)
      .map(([coreId, copies]) => ({
        coreId,
        copies,
        syncLevel: getBenchSyncLevel({ pendingCores: benchCoreIds }, coreId),
      }))
      .sort((left, right) => {
        if (right.copies !== left.copies) {
          return right.copies - left.copies;
        }
        return CORE_DEFS[left.coreId].label.localeCompare(CORE_DEFS[right.coreId].label);
      });
  }

  function summarizeBenchCoreIds(coreIds) {
    const counts = {};
    for (const coreId of sanitizeBenchCoreIds(coreIds)) {
      counts[coreId] = (counts[coreId] || 0) + 1;
    }
    return Object.entries(counts)
      .map(([coreId, copies]) => `${CORE_DEFS[coreId].short} x${copies}`)
      .join(" / ");
  }

  function addBenchCore(build, coreId) {
    if (!build || !CORE_DEFS[coreId]) {
      return false;
    }
    if (getBenchCount(build, coreId) >= MAX_BENCH_COPIES_PER_CORE) {
      return false;
    }
    build.pendingCores = sanitizeBenchCoreIds(build.pendingCores.concat(coreId));
    return true;
  }

  function removeBenchCopies(build, coreId, count) {
    if (!build || !Array.isArray(build.pendingCores) || !CORE_DEFS[coreId]) {
      return 0;
    }
    let remaining = Math.max(0, count || 0);
    let removed = 0;
    const next = [];
    for (const storedCoreId of build.pendingCores) {
      if (storedCoreId === coreId && remaining > 0) {
        remaining -= 1;
        removed += 1;
        continue;
      }
      next.push(storedCoreId);
    }
    build.pendingCores = sanitizeBenchCoreIds(next);
    return removed;
  }

  function createInitialBuild(signatureId = DEFAULT_SIGNATURE_ID) {
    return applySignatureToBuild(
      {
        signatureId: BASE_BUILD.signatureId,
        coreId: BASE_BUILD.coreId,
        attunedCoreId: BASE_BUILD.attunedCoreId,
        attunedCopies: BASE_BUILD.attunedCopies,
        affixes: BASE_BUILD.affixes.slice(),
        finisherCatalysts: BASE_BUILD.finisherCatalysts.slice(),
        catalystCapstoneId: BASE_BUILD.catalystCapstoneId,
        cashoutSupportId: BASE_BUILD.cashoutSupportId,
        cashoutFailSoftId: BASE_BUILD.cashoutFailSoftId,
        act3CatalystDraftSeen: BASE_BUILD.act3CatalystDraftSeen,
        architectureForecastId: BASE_BUILD.architectureForecastId,
        bastionDoctrineId: BASE_BUILD.bastionDoctrineId,
        doctrineCapstoneId: BASE_BUILD.doctrineCapstoneId,
        afterburnAscensionOffered: BASE_BUILD.afterburnAscensionOffered,
        afterburnOverdriveId: BASE_BUILD.afterburnOverdriveId,
        afterburnDominionId: BASE_BUILD.afterburnDominionId,
        afterburnDominionVictoryLapWaves: BASE_BUILD.afterburnDominionVictoryLapWaves,
        lateAscensionId: BASE_BUILD.lateAscensionId,
        lateAscensionOffered: BASE_BUILD.lateAscensionOffered,
        doctrineChaseClaimed: BASE_BUILD.doctrineChaseClaimed,
        doctrinePursuitCommitted: BASE_BUILD.doctrinePursuitCommitted,
        doctrinePursuitProgress: BASE_BUILD.doctrinePursuitProgress,
        doctrinePursuitExpired: BASE_BUILD.doctrinePursuitExpired,
        overcommitUnlocked: BASE_BUILD.overcommitUnlocked,
        overcommitResolved: BASE_BUILD.overcommitResolved,
        illegalOverclockId: BASE_BUILD.illegalOverclockId,
        illegalOverclockOffered: BASE_BUILD.illegalOverclockOffered,
        illegalOverclockMutationLevel: BASE_BUILD.illegalOverclockMutationLevel,
        riskMutationLevel: BASE_BUILD.riskMutationLevel,
        riskMutationQueuedLevel: BASE_BUILD.riskMutationQueuedLevel,
        apexMutationLevel: BASE_BUILD.apexMutationLevel,
        predatorBaitCharges: BASE_BUILD.predatorBaitCharges,
        wildcardProtocolIds: BASE_BUILD.wildcardProtocolIds.slice(),
        lateFieldMutationLevel: BASE_BUILD.lateFieldMutationLevel,
        lateFieldAegisLevel: BASE_BUILD.lateFieldAegisLevel,
        lateFieldConvergenceId: BASE_BUILD.lateFieldConvergenceId,
        lateBreakProfileId: BASE_BUILD.lateBreakProfileId,
        arsenalBreakpointProfileId: BASE_BUILD.arsenalBreakpointProfileId,
        blackLedgerRaidWaves: BASE_BUILD.blackLedgerRaidWaves,
        bastionPactDebtWaves: BASE_BUILD.bastionPactDebtWaves,
        wave6ChassisBreakpoint: BASE_BUILD.wave6ChassisBreakpoint,
        chassisId: BASE_BUILD.chassisId,
        supportBayCap: BASE_BUILD.supportBayCap,
        auxiliaryJunctionLevel: BASE_BUILD.auxiliaryJunctionLevel,
        supportSystemId: BASE_BUILD.supportSystemId,
        supportSystemTier: BASE_BUILD.supportSystemTier,
        supportSystems: BASE_BUILD.supportSystems.slice(),
        weaponEvolutions: { ...BASE_BUILD.weaponEvolutions },
        pendingCores: [],
        upgrades: [],
        damageBonus: BASE_BUILD.damageBonus,
        cooldownBonus: BASE_BUILD.cooldownBonus,
        pierceBonus: BASE_BUILD.pierceBonus,
        chainBonus: BASE_BUILD.chainBonus,
        heatFactor: BASE_BUILD.heatFactor,
        coolRateBonus: BASE_BUILD.coolRateBonus,
        moveSpeedBonus: BASE_BUILD.moveSpeedBonus,
        pickupBonus: BASE_BUILD.pickupBonus,
        dashCooldownBonus: BASE_BUILD.dashCooldownBonus,
        dashMaxBonus: BASE_BUILD.dashMaxBonus,
        maxHpBonus: BASE_BUILD.maxHpBonus,
        scrapMultiplier: BASE_BUILD.scrapMultiplier,
        driveGainBonus: BASE_BUILD.driveGainBonus,
        overdriveDurationBonus: BASE_BUILD.overdriveDurationBonus,
        hazardMitigation: BASE_BUILD.hazardMitigation,
      },
      signatureId
    );
  }

  function applySignatureToBuild(build, signatureId) {
    const nextBuild = build || {};
    const signature =
      SIGNATURE_DEFS[signatureId] || SIGNATURE_DEFS[DEFAULT_SIGNATURE_ID];
    nextBuild.signatureId = signature.id;
    nextBuild.coreId = signature.startCoreId || nextBuild.coreId || BASE_BUILD.coreId;
    nextBuild.attunedCoreId = nextBuild.coreId;
    nextBuild.attunedCopies = 1;
    nextBuild.affixes = sanitizeAffixIds(
      (Array.isArray(nextBuild.affixes) ? nextBuild.affixes : []).concat(
        signature.startAffixes || []
      ),
      getAffixCapacity(nextBuild)
    );
    nextBuild.pendingCores = sanitizeBenchCoreIds(
      (Array.isArray(nextBuild.pendingCores) ? nextBuild.pendingCores : []).concat(
        signature.seedCores || []
      )
    );
    if (typeof signature.apply === "function") {
      signature.apply(nextBuild);
    }
    nextBuild.upgrades = [`시그니처: ${signature.label}`].concat(
      Array.isArray(nextBuild.upgrades) ? nextBuild.upgrades : []
    );
    return nextBuild;
  }

  function getSignatureDef(signatureId) {
    return SIGNATURE_DEFS[signatureId] || SIGNATURE_DEFS[DEFAULT_SIGNATURE_ID];
  }

  function getBastionDoctrineDef(buildOrSignatureId) {
    if (!buildOrSignatureId) {
      return null;
    }
    if (typeof buildOrSignatureId === "object" && buildOrSignatureId.bastionDoctrineId) {
      const adoptedDoctrine = Object.values(BASTION_DOCTRINE_DEFS).find(
        (doctrine) => doctrine.id === buildOrSignatureId.bastionDoctrineId
      );
      if (adoptedDoctrine) {
        return adoptedDoctrine;
      }
    }
    if (typeof buildOrSignatureId === "object" && buildOrSignatureId.architectureForecastId) {
      const forecastDoctrine = Object.values(BASTION_DOCTRINE_DEFS).find(
        (doctrine) => doctrine.id === buildOrSignatureId.architectureForecastId
      );
      if (forecastDoctrine) {
        return forecastDoctrine;
      }
    }
    if (typeof buildOrSignatureId === "string") {
      const directDoctrine = Object.values(BASTION_DOCTRINE_DEFS).find(
        (doctrine) => doctrine.id === buildOrSignatureId
      );
      if (directDoctrine) {
        return directDoctrine;
      }
    }
    const signatureId =
      typeof buildOrSignatureId === "string"
        ? buildOrSignatureId
        : buildOrSignatureId.signatureId || null;
    return signatureId ? BASTION_DOCTRINE_DEFS[signatureId] || null : null;
  }

  function getDoctrineCapstoneDef(buildOrCapstoneId) {
    if (!buildOrCapstoneId) {
      return null;
    }
    if (typeof buildOrCapstoneId === "object") {
      return buildOrCapstoneId.doctrineCapstoneId
        ? Object.values(DOCTRINE_CAPSTONE_DEFS).find(
            (capstone) => capstone.id === buildOrCapstoneId.doctrineCapstoneId
          ) || null
        : null;
    }
    return (
      Object.values(DOCTRINE_CAPSTONE_DEFS).find((capstone) => capstone.id === buildOrCapstoneId) ||
      DOCTRINE_CAPSTONE_DEFS[buildOrCapstoneId] ||
      null
    );
  }

  function getDoctrineLateCapstoneDefs(buildOrDoctrine) {
    const doctrine = getBastionDoctrineDef(buildOrDoctrine);
    if (!doctrine) {
      return [];
    }
    const capstoneIds = Array.isArray(doctrine.lateCapstoneIds) && doctrine.lateCapstoneIds.length > 0
      ? doctrine.lateCapstoneIds
      : doctrine.lateCapstoneId
        ? [doctrine.lateCapstoneId]
        : [];
    return capstoneIds
      .map((capstoneId) => getDoctrineCapstoneDef(capstoneId))
      .filter(Boolean);
  }

  function getDoctrineLateCapstoneLabel(buildOrDoctrine) {
    const capstones = getDoctrineLateCapstoneDefs(buildOrDoctrine);
    if (capstones.length === 0) {
      return null;
    }
    return capstones.map((capstone) => capstone.title).join(" / ");
  }

  function getDoctrinePursuitCapstoneDef(buildOrDoctrine) {
    const doctrine = getBastionDoctrineDef(buildOrDoctrine);
    const capstones = getDoctrineLateCapstoneDefs(doctrine);
    if (!doctrine || capstones.length === 0) {
      return null;
    }
    if (capstones.length === 1) {
      return capstones[0];
    }
    if (doctrine.id === "storm_artillery") {
      const build = typeof buildOrDoctrine === "object" ? buildOrDoctrine : null;
      const affixes = build && Array.isArray(build.affixes) ? build.affixes : [];
      const pierceWeight =
        (build && (build.pierceBonus || 0)) +
        (affixes.includes("phase_rounds") ? 2 : 0) +
        ((build && build.coreId === "lance") ? 1 : 0);
      return (
        getDoctrineCapstoneDef(pierceWeight >= 3 ? "stormspire_needle" : "sky_lance_battery") ||
        capstones[0]
      );
    }
    return capstones[0];
  }

  function getDoctrineForgePursuitDef(buildOrDoctrineId) {
    if (!buildOrDoctrineId) {
      return null;
    }
    const doctrineId =
      typeof buildOrDoctrineId === "object"
        ? buildOrDoctrineId.bastionDoctrineId || buildOrDoctrineId.id
        : buildOrDoctrineId;
    return doctrineId ? DOCTRINE_FORGE_PURSUIT_DEFS[doctrineId] || null : null;
  }

  function getStormArtilleryAfterburnEndform(buildOrCapstoneId) {
    const capstone = getDoctrineCapstoneDef(buildOrCapstoneId);
    if (!capstone || capstone.doctrineId !== "storm_artillery") {
      return null;
    }
    return STORM_ARTILLERY_AFTERBURN_ENDFORM_DEFS[capstone.id] || null;
  }

  function createRoadmapStep(label, title, detail, stateName = "planned") {
    return {
      label,
      title,
      detail,
      state: stateName,
    };
  }

  function getBuildRoadmap(build, weapon = null, waveNumber = 1) {
    const boundedWave = clamp(Math.round(waveNumber || 1), 1, MAX_WAVES + POST_CAPSTONE_WAVE_COUNT);
    const doctrine = getBastionDoctrineDef(build);
    const pursuit = getDoctrineForgePursuitDef(doctrine || build);
    const currentWeapon = weapon || computeWeaponStats(build);
    const doctrineBodyForm = getDoctrineBodyForm(build);
    const doctrineForm = currentWeapon && currentWeapon.doctrineFormLabel ? currentWeapon.doctrineFormLabel : null;
    const lateBreakHeadline = getLateBreakHeadline(build && build.lateBreakProfileId);
    const activeForm =
      getPresentationHeadlineLabel(currentWeapon, boundedWave) ||
      (currentWeapon && currentWeapon.lateFieldConvergenceLabel) ||
      doctrineForm ||
      CORE_DEFS[build.coreId].label;
    const activeBodyLabel = doctrineBodyForm ? doctrineBodyForm.label : null;
    const pathLabel = doctrine
      ? `${doctrine.label} · ${activeForm}${activeBodyLabel ? ` / ${activeBodyLabel}` : ""}`
      : `${CORE_DEFS[build.coreId].label} · ${activeForm}`;
    const stageOneTitle = doctrine ? doctrine.label : "Monster Form Lock";
    const stageOneDetail = build.bastionDoctrineId
      ? `${currentWeapon.doctrineFormLabel || activeForm}${
          activeBodyLabel ? ` / ${activeBodyLabel}` : ""
        }이(가) 현재 body/gun 실루엣이다. 이후 포지는 이 형태를 더 과격하게 밀거나 약점을 메우는 쪽으로만 열린다.`
      : `Wave ${ARCHITECTURE_DRAFT_WAVE}에서 교리를 잠가 첫 monster form과 chassis lane을 연다.`;
    const stageOneState = build.bastionDoctrineId
      ? "locked"
      : boundedWave >= ARCHITECTURE_DRAFT_WAVE
        ? "primed"
        : "planned";

    const stageTwoTitle =
      (currentWeapon && currentWeapon.capstoneLabel) ||
      getDoctrineLateCapstoneLabel(doctrine) ||
      (doctrine ? `${doctrine.label} Apex` : "Midform Spike");
    let stageTwoDetail = "중반 marked elite를 따라 다음 weapon/body break를 강제로 연다.";
    let stageTwoState = "planned";
    if (build.doctrineCapstoneId) {
      stageTwoDetail = `${stageTwoTitle}이(가) 이미 잠겼다. Wave 9-12는 새 규칙 학습보다 이 중간 형태로 lane을 찢고 elite를 추적하는 구간이다.`;
      stageTwoState = "locked";
    } else if (build.doctrineChaseClaimed) {
      stageTwoDetail = `다음 live ascension cache가 ${stageTwoTitle} 완성 직전까지 열려 있다. marked elite를 먼저 찢어 body splice를 회수해야 한다.`;
      stageTwoState = "primed";
    } else if (build.doctrinePursuitCommitted && pursuit) {
      stageTwoDetail = `Wave 6-8 marked elite에서 ${pursuit.shardLabel} ${build.doctrinePursuitProgress}/${pursuit.goal}개를 회수하면 ${stageTwoTitle}이(가) 즉시 당겨진다.`;
      stageTwoState = "live";
    } else if (build.overcommitUnlocked && pursuit) {
      stageTwoDetail = `contraband salvage를 전부 챙겼다. 이제 다음 Field Cache의 greed 대신 ${stageTwoTitle} pursuit를 걸면 marked elite ${pursuit.goal}회로 조기 완성을 노릴 수 있다.`;
      stageTwoState = "primed";
    } else if (build.overcommitResolved) {
      stageTwoDetail = `${stageTwoTitle} 조기 chase는 닫혔다. 남은 런에서는 live ascension cache로만 안전하게 끌어와야 한다.`;
      stageTwoState = "missed";
    } else if (pursuit) {
      stageTwoDetail = `Wave 5 contraband salvage를 전부 회수하면 ${stageTwoTitle} pursuit가 열린다. 실패하면 중반 break는 뒤로 밀린다.`;
    }

    const stageThreeTitle =
      (CONSOLIDATED_12_WAVE_ROUTE
        ? (currentWeapon && currentWeapon.lateAscensionLabel) || null
        : (currentWeapon && currentWeapon.afterburnDominionLabel) ||
          (currentWeapon && currentWeapon.afterburnOverdriveLabel) ||
          (currentWeapon && currentWeapon.lateAscensionLabel) ||
          null) ||
      (lateBreakHeadline && lateBreakHeadline.title) ||
      "Crown Break";
    let stageThreeDetail = lateBreakHeadline
      ? CONSOLIDATED_12_WAVE_ROUTE
        ? `${lateBreakHeadline.detail} Wave 9-12는 이 late staircase 하나만 증명하는 고정 finale다.`
        : `${lateBreakHeadline.detail} Wave 8 이후에는 이 계단 하나만 남고 live ascension이나 Afterburn 예외는 열리지 않는다.`
      : "Wave 8 Late Break Armory에서 하나의 late-form staircase를 고르면 Wave 9-10 payoff band -> Wave 11 domination lap -> Wave 12 finale로 고정된다.";
    let stageThreeState = boundedWave >= LATE_BREAK_ARMORY_WAVE ? "primed" : "planned";
    if (build.afterburnDominionId) {
      stageThreeDetail = CONSOLIDATED_12_WAVE_ROUTE
        ? `${stageThreeTitle}이(가) 이미 최종 형태로 잠겼다. 남은 Wave 9-12는 새 예외 없이 이 실루엣으로 space ownership를 증명하는 finale다.`
        : `${stageThreeTitle}이(가) 이미 최종 지배 형태로 잠겼다. 남은 bracket은 판돈보다 압도감이 먼저 오는 victory lap이다.`;
      stageThreeState = "locked";
    } else if (build.afterburnOverdriveId) {
      stageThreeDetail = CONSOLIDATED_12_WAVE_ROUTE
        ? `${stageThreeTitle}이(가) 마지막 headline jump로 잠겼다. 남은 finale는 이 body/gun form이 열린 lane을 얼마나 오래 지키는지 증명하는 구간이다.`
        : `${stageThreeTitle} overdrive가 켜졌다. 다음 Dominion Break만 회수하면 마지막 bracket 하나가 승리 랩으로 재편된다.`;
      stageThreeState = "live";
    } else if (build.lateAscensionId) {
      stageThreeDetail = CONSOLIDATED_12_WAVE_ROUTE
        ? `${stageThreeTitle} body split이 잠겼다. 이제 남은 Wave 9-12는 추가 branch 없이 이 headline form을 바로 시험하는 고정 late staircase다.`
        : `${stageThreeTitle} body split이 잠겼다. Afterburn elite cache로 남은 endurance를 overdrive 실루엣까지 더 밀 수 있다.`;
      stageThreeState =
        CONSOLIDATED_12_WAVE_ROUTE ? "locked" : boundedWave > MAX_WAVES ? "live" : "locked";
    } else if (lateBreakHeadline) {
      stageThreeState =
        boundedWave >= MAX_WAVES
          ? "locked"
          : boundedWave >= LATE_BREAK_ARMORY_WAVE
            ? "live"
            : "primed";
    }

    const steps = [
      createRoadmapStep("I", stageOneTitle, stageOneDetail, stageOneState),
      createRoadmapStep("II", stageTwoTitle, stageTwoDetail, stageTwoState),
      createRoadmapStep("III", stageThreeTitle, stageThreeDetail, stageThreeState),
    ];
    const nextStep = steps.find((step) => step.state !== "locked") || steps[2];
    const prompt =
      nextStep && nextStep.state !== "locked"
        ? `${pathLabel}. 현재 form track의 다음 점프는 ${nextStep.title}이며, ${nextStep.detail}`
        : `${pathLabel}. 세 단계 form track이 모두 잠겨 남은 연전은 현재 endform을 오래 증명하는 구간이다.`;
    return {
      pathLabel,
      activeForm,
      doctrineTag: doctrine ? doctrine.tag : "CORE",
      prompt,
      note: `${steps[0].title} -> ${steps[1].title} -> ${steps[2].title}`,
      steps,
    };
  }

  function createRoadmapMarkup(roadmap) {
    if (!roadmap) {
      return "";
    }
    const steps = roadmap.steps.length
      ? roadmap.steps
          .map(
            (step) => `
              <article class="roadmap-step" data-state="${step.state}">
                <span class="roadmap-step__state">${step.label}</span>
                <div>
                  <strong>${step.title}</strong>
                  <p>${step.detail}</p>
                </div>
              </article>
            `
          )
          .join("")
      : `
        <article class="roadmap-step" data-state="locked">
          <span class="roadmap-step__state">LIVE</span>
          <div>
            <strong>${roadmap.activeForm}</strong>
            <p>주요 breakpoint가 모두 잠겨 남은 연전은 현재 형태를 실제 전장에서 증명하는 구간이다.</p>
          </div>
        </article>
      `;
    return `
      <div class="summary-head">
        <strong>Build Roadmap</strong>
        <span class="summary-chip ${roadmap.steps[0] && roadmap.steps[0].state === "primed" ? "summary-chip--hot" : roadmap.steps.length === 0 ? "summary-chip--cool" : ""}">${roadmap.doctrineTag}</span>
      </div>
      <p class="summary-copy roadmap-card__path">${roadmap.pathLabel}</p>
      <div class="roadmap-card__steps">${steps}</div>
      <p class="summary-note">${roadmap.note}</p>
    `;
  }

  function getShippingLadderSteps(build, weapon = null, waveNumber = 1) {
    const boundedWave = clamp(Math.round(waveNumber || 1), 1, MAX_WAVES);
    const currentWeapon = weapon || computeWeaponStats(build);
    const dominantForm = getDominantFormSummary(build, currentWeapon, boundedWave);
    const nextBreakpoint = getNextBreakpointSummary(build, currentWeapon, boundedWave);
    const lateBreakHeadline = getLateBreakHeadline(build && build.lateBreakProfileId);
    const chassis = getChassisBreakpointDef(build);
    const stageState = (start, end = start) => {
      if (boundedWave > end) {
        return "locked";
      }
      if (boundedWave >= start) {
        return "live";
      }
      return boundedWave + 1 >= start ? "primed" : "planned";
    };
    return [
      {
        label: "W3",
        title: "Core Lock",
        state: stageState(3),
        detail:
          boundedWave >= 3
            ? `${dominantForm.label}로 초반 주포 실루엣을 잠갔다.`
            : `${nextBreakpoint.label} 한 장으로 초반 주포 실루엣을 먼저 고정한다.`,
      },
      {
        label: "W6",
        title: "Chassis Break",
        state: stageState(6),
        detail: chassis
          ? `${chassis.label} 차체로 hold, dive, exit 리듬을 갈라 놓는다.`
          : "Wave 6에서 첫 차체 break를 붙여 근접 압박을 버티는 몸을 만든다.",
      },
      {
        label: "W8",
        title: "Late Form",
        state: stageState(8),
        detail: lateBreakHeadline
          ? `${lateBreakHeadline.title} 하나만 크게 골라 후반 실루엣을 고정한다.`
          : "Wave 8에서 oversized late-form 하나만 골라 후반 실루엣을 고정한다.",
      },
      {
        label: "W9-10",
        title: "Proof",
        state: stageState(9, 10),
        detail: "새 화망과 차체가 화면 점유 시간을 실제로 늘리는지 바로 증명한다.",
      },
      {
        label: "W11-12",
        title: "Finish",
        state: stageState(11, 12),
        detail: "같은 형태를 유지한 채 마지막 압박을 닫고 런을 봉인한다.",
      },
    ];
  }

  function getShippingLadderFocus(build, weapon = null, waveNumber = 1) {
    const steps = getShippingLadderSteps(build, weapon, waveNumber);
    return (
      steps.find((step) => step.state === "live") ||
      steps.find((step) => step.state === "primed") ||
      steps[steps.length - 1]
    );
  }

  function createShippingLadderMarkup(build, weapon = null, waveNumber = 1) {
    const boundedWave = clamp(Math.round(waveNumber || 1), 1, MAX_WAVES);
    const act = getActLabelForWave(boundedWave);
    const steps = getShippingLadderSteps(build, weapon, boundedWave);
    const focus = getShippingLadderFocus(build, weapon, boundedWave);
    return `
      <div class="summary-head">
        <strong>12-Wave Contract</strong>
        <span class="summary-chip ${focus.state === "live" ? "summary-chip--hot" : ""}">${act.shortLabel}</span>
      </div>
      <p class="summary-copy roadmap-card__path">Wave 3 core lock -> Wave 6 chassis break -> Wave 8 late form -> Wave 9-10 proof -> Wave 11-12 finish.</p>
      <div class="roadmap-card__steps">
        ${steps
          .map(
            (step) => `
              <article class="roadmap-step" data-state="${step.state}">
                <span class="roadmap-step__state">${step.label}</span>
                <div>
                  <strong>${step.title}</strong>
                  <p>${step.detail}</p>
                </div>
              </article>
            `
          )
          .join("")}
      </div>
      <p class="summary-note">${focus.title}: ${focus.detail}</p>
    `;
  }

  function getNextLateFieldBreakpointWave(waveNumber, offset = 0) {
    let candidate = Math.max(
      LATE_FIELD_CACHE_START_WAVE,
      clamp(Math.round(waveNumber || 1), 1, MAX_WAVES + POST_CAPSTONE_WAVE_COUNT)
    );
    while (!isArsenalBreakpointWave(candidate)) {
      candidate += 1;
    }
    while (offset > 0) {
      candidate += LATE_FIELD_BREAKPOINT_INTERVAL;
      offset -= 1;
    }
    return candidate;
  }

  function createEvolutionLanePayoff(label, title, detail, state = "planned") {
    return {
      label,
      title,
      detail,
      state,
    };
  }

  function getInstalledSupportSnapshot(build) {
    const installedSupport = getInstalledSupportSystems(build);
    if (installedSupport.length === 0) {
      return null;
    }
    const primarySupport = installedSupport[0];
    const systemDef = primarySupport ? SUPPORT_SYSTEM_DEFS[primarySupport.id] : null;
    const tierDef = systemDef && systemDef.tiers ? systemDef.tiers[primarySupport.tier] : null;
    return {
      entries: installedSupport,
      primary: primarySupport,
      systemDef,
      tierDef,
    };
  }

  function getForgeEvolutionLadder(build, weapon = null, supportSystem = null, waveNumber = 1) {
    const boundedWave = clamp(Math.round(waveNumber || 1), 1, MAX_WAVES + POST_CAPSTONE_WAVE_COUNT);
    const currentWeapon = weapon || computeWeaponStats(build);
    const roadmap = getBuildRoadmap(build, currentWeapon, boundedWave);
    const doctrine = getBastionDoctrineDef(build);
    const supportTrack = getForgeSupportTrackSnapshot(build, supportSystem);
    const supportSnapshot = getInstalledSupportSnapshot(build);
    const ascensionDef = doctrine ? WAVE6_ASCENSION_DEFS[doctrine.id] || null : null;
    const ascensionChassis = ascensionDef ? getChassisBreakpointDef(ascensionDef.chassisId) : null;
    const preferredSupportSystem =
      ascensionDef && ascensionDef.preferredSystemId
        ? SUPPORT_SYSTEM_DEFS[ascensionDef.preferredSystemId] || null
        : null;
    const activeChassis = getChassisBreakpointDef(build);
    const activeConvergence = getLateFieldConvergenceDef(build);
    const futureConvergence =
      activeChassis && LATE_FIELD_CONVERGENCE_DEFS[activeChassis.id]
        ? LATE_FIELD_CONVERGENCE_DEFS[activeChassis.id]
        : ascensionChassis && LATE_FIELD_CONVERGENCE_DEFS[ascensionChassis.id]
          ? LATE_FIELD_CONVERGENCE_DEFS[ascensionChassis.id]
          : null;
    const roadmapFutureSteps = roadmap.steps.filter((step) => step.state !== "locked");
    const mainPayoffs = [
      roadmapFutureSteps[0] || roadmap.steps[1] || roadmap.steps[0],
      roadmapFutureSteps[1] || roadmap.steps[2] || roadmap.steps[roadmap.steps.length - 1],
    ]
      .filter(Boolean)
      .map((step, index) =>
        createEvolutionLanePayoff(
          index === 0 ? "Next" : "Then",
          step.title,
          step.detail,
          step.state || "planned"
        )
      );

    const supportCurrentLabel =
      (supportSystem && supportSystem.label) ||
      (supportSnapshot &&
      supportSnapshot.entries.length > 1
        ? `${supportSnapshot.entries.length} Bay Package`
        : supportTrack.label);
    const supportCurrentDetail =
      (supportSystem && supportSystem.statusNote) ||
      (supportSnapshot && supportSnapshot.tierDef && supportSnapshot.tierDef.statusNote) ||
      supportTrack.detail;
    let defensePrimaryPayoff;
    if (build.chassisId) {
      if (getLateFieldAegisLevel(build) > 0) {
        const nextHaloLevel = Math.min(MAX_LATE_FIELD_AEGIS_LEVEL, getLateFieldAegisLevel(build) + 1);
        defensePrimaryPayoff = createEvolutionLanePayoff(
          "Next",
          getLateFieldAegisTierLabel(nextHaloLevel),
          "재충전식 guard plate를 한 단계 더 끌어올려 큰 한 방을 지우고, 판 전체를 버티는 방호 창을 더 길게 만든다.",
          getLateFieldAegisLevel(build) >= MAX_LATE_FIELD_AEGIS_LEVEL ? "locked" : "live"
        );
      } else {
        defensePrimaryPayoff = createEvolutionLanePayoff(
          "Next",
          "Warplate Halo",
          "중후반 생존 브레이크포인트. 재충전식 plate를 켜 다음 dive-reset 구간을 버틸 수 있는 방호 실루엣으로 바꾼다.",
          boundedWave >= LATE_BREAK_ARMORY_WAVE ? "live" : boundedWave + 1 >= LATE_BREAK_ARMORY_WAVE ? "primed" : "planned"
        );
      }
    } else if (ascensionChassis || preferredSupportSystem) {
      defensePrimaryPayoff = createEvolutionLanePayoff(
        "Next",
        `${ascensionChassis ? ascensionChassis.title : "Support Uplink"}${preferredSupportSystem ? ` + ${preferredSupportSystem.tiers[1].title}` : ""}`,
        ascensionDef ? ascensionDef.summary : "첫 chassis와 support 패키지를 열어 생존 rail을 본격적으로 켠다.",
        boundedWave >= 6 ? "live" : boundedWave + 1 >= 6 ? "primed" : "planned"
      );
    } else {
      defensePrimaryPayoff = createEvolutionLanePayoff(
        "Next",
        "First Support Package",
        "첫 chassis나 위성/드론/미사일 패키지를 열어 빈 hull을 생존형 실루엣으로 바꾼다.",
        boundedWave >= FORGE_PACKAGE_START_WAVE ? "live" : "planned"
      );
    }
    const defenseSecondaryPayoff = futureConvergence
      ? createEvolutionLanePayoff(
          "Then",
          futureConvergence.title,
          futureConvergence.description,
          activeConvergence && activeConvergence.id === futureConvergence.id
            ? "locked"
            : boundedWave >= LATE_FIELD_CACHE_START_WAVE
              ? "live"
              : boundedWave + 1 >= LATE_FIELD_CACHE_START_WAVE
                ? "primed"
                : "planned"
        )
      : preferredSupportSystem
        ? createEvolutionLanePayoff(
            "Then",
            preferredSupportSystem.tiers[3].title,
            preferredSupportSystem.tiers[3].description,
            supportSnapshot &&
            supportSnapshot.primary &&
            supportSnapshot.primary.id === preferredSupportSystem.id &&
            supportSnapshot.primary.tier >= 3
              ? "locked"
              : "planned"
          )
        : createEvolutionLanePayoff(
            "Then",
            "Citadel Halo",
            "방호 레인을 끝까지 밀면 더 큰 요격층과 회복 창으로 후반 교전을 오래 버티는 요새형 실루엣으로 간다.",
            "planned"
          );

    const greedPressure = getLateFieldGreedPressure(build);
    const nextGreedBreak =
      boundedWave < LATE_BREAK_ARMORY_WAVE
        ? createLateBreakGreedContractChoice(build, LATE_BREAK_ARMORY_WAVE)
        : boundedWave < LATE_FIELD_CACHE_START_WAVE
          ? createLateFieldGreedContractChoice(build, LATE_FIELD_CACHE_START_WAVE)
          : createLateFieldGreedContractChoice(build, getNextLateFieldBreakpointWave(boundedWave));
    const laterGreedBreak = createLateFieldGreedContractChoice(
      build,
      getNextLateFieldBreakpointWave(
        boundedWave < LATE_FIELD_CACHE_START_WAVE ? LATE_FIELD_CACHE_START_WAVE : boundedWave,
        1
      )
    );
    const greedCurrentLabel =
      build.blackLedgerRaidWaves > 0
        ? "Black Ledger Route"
        : build.overcommitUnlocked || greedPressure > 0
          ? "Contraband Route"
          : "Cold Ledger";
    const greedCurrentDetail =
      build.blackLedgerRaidWaves > 0
        ? `raid/debt ${greedPressure}웨이브가 남아 있어 payout을 노릴수록 바로 청구서도 커진다.`
        : build.overcommitUnlocked
          ? "회수 루트가 열린 상태다. 지금부터는 payout을 당길지 안정성을 지킬지 계속 스스로 결정해야 한다."
          : "아직 탐욕 라인이 조용하다. salvage와 payout을 당기기 시작하면 다음 계약이 바로 성격을 바꾼다.";
    const greedPayoffs = [
      createEvolutionLanePayoff(
        "Next",
        nextGreedBreak ? nextGreedBreak.title : "Black Ledger Heist",
        nextGreedBreak
          ? nextGreedBreak.description
          : "첫 greed 계약. payout을 먼저 당기지만 다음 전투 objective와 spacing도 즉시 뒤틀린다.",
        build.lateBreakProfileId === "ledger" || build.blackLedgerRaidWaves > 0
          ? "locked"
          : boundedWave >= LATE_BREAK_ARMORY_WAVE
            ? "live"
            : boundedWave + 1 >= LATE_BREAK_ARMORY_WAVE
              ? "primed"
              : "planned"
      ),
      createEvolutionLanePayoff(
        "Then",
        laterGreedBreak ? laterGreedBreak.title : "Black Ledger Catastrophe",
        laterGreedBreak
          ? laterGreedBreak.description
          : "탐욕 레인을 계속 밀면 한 번 더 큰 payout과 더 무거운 debt가 같이 오는 장기 계약으로 굳어진다.",
        boundedWave >= LATE_FIELD_CACHE_START_WAVE ? "live" : "planned"
      ),
    ];

    return [
      {
        id: "main",
        laneLabel: "Main Weapon / Body",
        title: "Assault Ladder",
        currentLabel: roadmap.activeForm || CORE_DEFS[build.coreId].label,
        currentDetail: roadmap.prompt,
        payoffs: mainPayoffs,
      },
      {
        id: "defense",
        laneLabel: "Defense / Support",
        title: "Bulwark Ladder",
        currentLabel: supportCurrentLabel,
        currentDetail: supportCurrentDetail,
        payoffs: [defensePrimaryPayoff, defenseSecondaryPayoff],
      },
      {
        id: "greed",
        laneLabel: "Greed Contract",
        title: "Ledger Ladder",
        currentLabel: greedCurrentLabel,
        currentDetail: greedCurrentDetail,
        payoffs: greedPayoffs,
      },
    ];
  }

  function createEvolutionLadderMarkup(lanes) {
    if (!lanes || lanes.length === 0) {
      return "";
    }
    return lanes
      .map(
        (lane) => `
          <article class="evolution-lane evolution-lane--${lane.id}">
            <div class="evolution-lane__header">
              <span>${lane.laneLabel}</span>
              <strong>${lane.title}</strong>
            </div>
            <div class="evolution-lane__current">
              <p class="panel__eyebrow">Current</p>
              <strong>${lane.currentLabel}</strong>
              <p>${lane.currentDetail}</p>
            </div>
            <div class="evolution-lane__payoffs">
              ${lane.payoffs
                .map(
                  (payoff) => `
                    <article class="evolution-payoff" data-state="${payoff.state}">
                      <span class="evolution-payoff__label">${payoff.label}</span>
                      <div>
                        <strong>${payoff.title}</strong>
                        <p>${payoff.detail}</p>
                      </div>
                    </article>
                  `
                )
                .join("")}
            </div>
          </article>
        `
      )
      .join("");
  }

  function getForgeSupportTrackSnapshot(build, supportSystem = null) {
    const chassis = getChassisBreakpointDef(build);
    const installedSupport = getInstalledSupportSystems(build);
    const wildcardIds = getClaimedWildcardProtocolIds(build);
    const catalystReady = hasFinisherCatalyst(build, build.coreId);
    const catalystRecipe = FINISHER_RECIPE_DEFS[build.coreId];
    if (supportSystem) {
      return {
        label: supportSystem.label,
        detail: getSupportSystemSummary(supportSystem),
      };
    }
    if (wildcardIds.length > 0) {
      return {
        label: "Wildcard Rail",
        detail: getWildcardProtocolSummary(build),
      };
    }
    if (installedSupport.length > 0) {
      return {
        label: `${installedSupport.length} Bay Package`,
        detail: `${installedSupport.map((system) => system.shortLabel || system.label).join(" + ")} · support bay 확장 중`,
      };
    }
    if (catalystReady && catalystRecipe) {
      return {
        label: `${catalystRecipe.label} Catalyst`,
        detail: `${catalystRecipe.label} 촉매 확보 · 남은 포지는 연소 리스크보다 유지력을 어디서 챙길지 고르는 단계다.`,
      };
    }
    if (chassis) {
      return {
        label: chassis.label,
        detail: chassis.statusNote,
      };
    }
    return {
      label: "Bare Hull",
      detail: "보조 생존/유틸 축이 아직 비어 있다. 첫 chassis나 support bay를 확보하면 회복 루트가 열린다.",
    };
  }

  function getForgeEraPlan(build, weapon = null, supportSystem = null, waveNumber = 1) {
    const boundedWave = clamp(Math.round(waveNumber || 1), 1, MAX_WAVES + POST_CAPSTONE_WAVE_COUNT);
    const currentWeapon = weapon || computeWeaponStats(build);
    const roadmap = getBuildRoadmap(build, currentWeapon, boundedWave);
    const doctrine = getBastionDoctrineDef(build);
    const supportTrack = getForgeSupportTrackSnapshot(build, supportSystem);
    const lateBreakHeadline = getLateBreakHeadline(build && build.lateBreakProfileId);
    const primaryOpenLabel =
      currentWeapon.doctrineFormLabel ||
      currentWeapon.evolutionLabel ||
      CORE_DEFS[build.coreId].label;
    const primaryBreakLabel =
      currentWeapon.capstoneLabel ||
      currentWeapon.doctrineFormLabel ||
      getDoctrineLateCapstoneLabel(doctrine) ||
      (doctrine ? `${doctrine.label} Apex` : "Midform Spike");
    const primaryEndformLabel =
      currentWeapon.afterburnDominionLabel ||
      currentWeapon.afterburnOverdriveLabel ||
      currentWeapon.lateAscensionLabel ||
      (lateBreakHeadline && lateBreakHeadline.title) ||
      "Crown Break";
    const ignitionSupportDetail = supportTrack.detail;
    const siegeSupportDetail =
      supportSystem && supportSystem.statusNote
        ? supportSystem.statusNote
        : `${supportTrack.detail} mid-run에서는 이 축이 weakness cover와 greed recovery를 맡는다.`;
    const crownSupportDetail = lateBreakHeadline
      ? `${supportTrack.detail} Act 3에서는 이 축이 ${lateBreakHeadline.title} 계단을 버티는 마지막 survival rail로 남는다.`
      : `${supportTrack.detail} Act 3에서는 이 축이 마지막 survival rail로 남는다.`;
    const getEraProofWindow = (proofWave, fallbackLabel, fallbackDetail) => {
      const resolvedWave = resolveWaveConfig(clamp(proofWave, 1, MAX_WAVES) - 1, build);
      return {
        label: resolvedWave.bandLabel || resolvedWave.label || fallbackLabel,
        detail: resolvedWave.directive || resolvedWave.note || fallbackDetail,
      };
    };
    const getEraState = (start, end) => {
      if (boundedWave > end) {
        return "locked";
      }
      if (boundedWave >= start) {
        return "live";
      }
      return boundedWave + 1 >= start ? "primed" : "planned";
    };
    const eraOneProof = getEraProofWindow(
      4,
      "First Proof Window",
      "Wave 4에서 첫 doctrine/body lock이 실제 lane ownership으로 이어지는지 증명한다."
    );
    const eraTwoProof = getEraProofWindow(
      5,
      "Act II Proof Window",
      "Wave 5의 open-lane payoff와 Wave 6의 breach proof에서 headline midform이 space ownership를 실제 돌파 창으로 바꾸는지 확인한다."
    );
    const eraThreeProof = getEraProofWindow(
      9,
      "Act III Proof Window",
      "Wave 9의 open-lane payoff와 Wave 10의 breach proof에서 마지막 headline form이 pressure 재상승 전에 먼저 전장을 소유하는지 확인한다."
    );
    return [
      {
        label: "Era I",
        title: "Ignition Frame",
        waveLabel: "Wave 1-4",
        state: getEraState(1, 4),
        primaryLabel: primaryOpenLabel,
        primaryDetail: roadmap.steps[0] ? roadmap.steps[0].detail : "첫 변신 실루엣을 잠그는 구간.",
        secondaryLabel: supportTrack.label,
        secondaryDetail: ignitionSupportDetail,
        proofLabel: eraOneProof.label,
        proofDetail: eraOneProof.detail,
      },
      {
        label: "Era II",
        title: "Siege Break",
        waveLabel: "Wave 5-8",
        state: getEraState(5, 8),
        primaryLabel: primaryBreakLabel,
        primaryDetail: roadmap.steps[1] ? roadmap.steps[1].detail : "중반 break를 앞당겨 doctrine form을 전장에 고정한다.",
        secondaryLabel: supportTrack.label,
        secondaryDetail: siegeSupportDetail,
        proofLabel: eraTwoProof.label,
        proofDetail: eraTwoProof.detail,
      },
      {
        label: "Era III",
        title: "Crown Break",
        waveLabel: "Wave 9-12",
        state: getEraState(9, MAX_WAVES),
        primaryLabel: primaryEndformLabel,
        primaryDetail:
          roadmap.steps[2] ? roadmap.steps[2].detail : "후반 split cache에서 마지막 body/gun form을 잠그는 구간.",
        secondaryLabel: supportTrack.label,
        secondaryDetail: crownSupportDetail,
        proofLabel: eraThreeProof.label,
        proofDetail: eraThreeProof.detail,
      },
    ];
  }

  function createForgeEraMarkup(eras) {
    if (!eras || eras.length === 0) {
      return "";
    }
    const stateLabelMap = {
      planned: "PLANNED",
      primed: "PRIMED",
      live: "LIVE",
      locked: "LOCKED",
      missed: "MISSED",
    };
    return eras
      .map(
        (era) => `
          <article class="forge-era" data-state="${era.state}">
            <div class="forge-era__header">
              <span class="forge-era__state">${stateLabelMap[era.state] || era.state}</span>
              <div class="forge-era__title">
                <p>${era.label} · ${era.waveLabel || ""}</p>
                <strong>${era.title}</strong>
              </div>
            </div>
            <div class="forge-era__tracks">
              <div class="forge-era__track">
                <span>Headline Form</span>
                <strong>${era.primaryLabel}</strong>
                <p>${era.primaryDetail}</p>
              </div>
              <div class="forge-era__track">
                <span>Survival Rider</span>
                <strong>${era.secondaryLabel}</strong>
                <p>${era.secondaryDetail}</p>
              </div>
              <div class="forge-era__track">
                <span>Proof Band</span>
                <strong>${era.proofLabel}</strong>
                <p>${era.proofDetail}</p>
              </div>
            </div>
          </article>
        `
      )
      .join("");
  }

  function createEraContractPanelMarkup(build, weapon = null, supportSystem = null, waveNumber = 1) {
    const eras = getForgeEraPlan(build, weapon, supportSystem, waveNumber);
    if (!eras || eras.length === 0) {
      return "";
    }
    const currentEra =
      eras.find((era) => era.state === "live") ||
      eras.find((era) => era.state === "primed") ||
      eras[eras.length - 1];
    const act = getActLabelForWave(clamp(Math.round(waveNumber || 1), 1, MAX_WAVES));
    return `
      <div class="summary-head">
        <strong>12-Wave Contract</strong>
        <span class="summary-chip ${currentEra.state === "live" ? "summary-chip--hot" : ""}">${act.shortLabel}</span>
      </div>
      <p class="summary-copy roadmap-card__path">세 시대 모두 form 하나, rider 하나, proof 하나만 먼저 판다.</p>
      <div class="status-list">
        ${eras
          .map(
            (era) =>
              createStatusRow(
                `${era.label} ${era.waveLabel}`,
                `${era.primaryLabel} -> ${era.proofLabel}`
              )
          )
          .join("")}
      </div>
      <p class="summary-note">${currentEra.label} ${currentEra.title}: ${currentEra.primaryLabel}을(를) 전면에 세우고 ${currentEra.secondaryLabel}로 버틴 뒤 ${currentEra.proofLabel}에서 바로 증명한다.</p>
    `;
  }

  function createHeadlineRiderFocusMarkup(
    build,
    weapon = null,
    supportSystem = null,
    waveNumber = 1,
    options = {}
  ) {
    const boundedWave = clamp(Math.round(waveNumber || 1), 1, MAX_WAVES);
    if (CONSOLIDATED_12_WAVE_ROUTE) {
      return createShippingLadderMarkup(build, weapon, boundedWave);
    }
    const currentWeapon = weapon || computeWeaponStats(build);
    const dominantForm = getDominantFormSummary(build, currentWeapon, boundedWave);
    const nextBreakpoint = getNextBreakpointSummary(build, currentWeapon, boundedWave);
    const supportTrack = getForgeSupportTrackSnapshot(build, supportSystem);
    const proofWindow = getImmediateProofWindowSummary(build, boundedWave);
    const act = getActLabelForWave(boundedWave);
    const title = options.title || "Next Mutation";
    const chipLabel = options.chipLabel || act.shortLabel;
    const notePrefix = options.notePrefix || `${dominantForm.label}에서 ${nextBreakpoint.label}(으)로 뛴다.`;
    return `
      <div class="summary-head">
        <strong>${title}</strong>
        <span class="summary-chip ${options.hotChip ? "summary-chip--hot" : ""}">${chipLabel}</span>
      </div>
      <p class="summary-copy roadmap-card__path">지금은 headline form 하나와 rider 하나만 먼저 판다.</p>
      <div class="status-list">
        ${createStatusRow("Headline Mutation", nextBreakpoint.label)}
        ${createStatusRow("Secondary Rider", supportTrack.label)}
        ${createStatusRow("Immediate Ask", proofWindow.label)}
      </div>
      <p class="summary-note">${notePrefix} ${supportTrack.label}는 rider로만 남기고, 다음 증명은 ${proofWindow.label} 하나에만 걸어 둔다.</p>
    `;
  }

  function createRouteContractMarkup({
    eyebrow = "12-Wave Contract",
    chipLabel = "",
    title,
    prompt,
    headlineLabel,
    riderLabel,
    proofLabel,
    note = "",
    compact = false,
  }) {
    return `
      <div class="summary-head">
        <strong>${eyebrow}</strong>
        ${
          chipLabel
            ? `<span class="summary-chip ${compact ? "" : "summary-chip--hot"}">${chipLabel}</span>`
            : ""
        }
      </div>
      <p class="summary-copy roadmap-card__path">${prompt}</p>
      <strong class="route-contract__title">${title}</strong>
      <div class="contract-strip ${compact ? "contract-strip--compact" : ""}">
        <article class="contract-strip__item contract-strip__item--headline">
          <span class="contract-strip__label">Headline</span>
          <strong class="contract-strip__value">${headlineLabel}</strong>
        </article>
        <article class="contract-strip__item">
          <span class="contract-strip__label">Rider</span>
          <strong class="contract-strip__value">${riderLabel}</strong>
        </article>
        <article class="contract-strip__item">
          <span class="contract-strip__label">Proof</span>
          <strong class="contract-strip__value">${proofLabel}</strong>
        </article>
      </div>
      ${note ? `<p class="summary-note">${note}</p>` : ""}
    `;
  }

  function createBaseRouteFocusMarkup({
    eyebrow = "12-Wave Contract",
    chipLabel = "",
    title,
    prompt,
    currentFormLabel,
    mainLeapLabel,
    proofLabel,
    supportLabel = "",
    note = "",
    compact = false,
  }) {
    return `
      <div class="summary-head">
        <strong>${eyebrow}</strong>
        ${
          chipLabel
            ? `<span class="summary-chip ${compact ? "" : "summary-chip--hot"}">${chipLabel}</span>`
            : ""
        }
      </div>
      <p class="summary-copy roadmap-card__path">${prompt}</p>
      <strong class="route-contract__title">${title}</strong>
      <div class="status-list">
        ${createStatusRow("Current Form", currentFormLabel)}
        ${createStatusRow("Main Leap", mainLeapLabel)}
        ${createStatusRow("Next Proof", proofLabel)}
      </div>
      ${
        supportLabel
          ? `<p class="summary-copy roadmap-card__path">Support rider: ${supportLabel}</p>`
          : ""
      }
      ${note ? `<p class="summary-note">${note}</p>` : ""}
    `;
  }

  function shouldUseMinimalBaseRouteHud(run = state) {
    return Boolean(run && CONSOLIDATED_12_WAVE_ROUTE && !run.hudInspect && !run.paused);
  }

  function getCombatBandState(build, weapon = null, waveNumber = 1) {
    const boundedWave = clamp(Math.round(waveNumber || 1), 1, MAX_WAVES + POST_CAPSTONE_WAVE_COUNT);
    if (boundedWave < 9 || boundedWave > MAX_WAVES) {
      return null;
    }
    const currentWeapon = weapon || computeWeaponStats(build);
    const doctrine = getBastionDoctrineDef(build);
    const capstoneTitle = doctrine
      ? getDoctrineLateCapstoneLabel(doctrine) || `${doctrine.label} Apex`
      : "Doctrine Capstone";
    if (boundedWave <= 10) {
      const lockedTitle =
        (currentWeapon && currentWeapon.capstoneLabel) ||
        (currentWeapon && currentWeapon.doctrineFormLabel) ||
        capstoneTitle;
      if (boundedWave === 9) {
        return build && build.doctrineCapstoneId
          ? {
              label: "Breakpoint Payoff",
              headline: lockedTitle,
              detail:
                "Wave 9는 열린 lane을 먹는 payoff rung다. 이미 잠근 doctrine form으로 긴 사선과 flank sweep를 먼저 정리하며 headline shape가 얼마나 넓게 space를 소유하는지 드러내는 구간이다.",
            }
          : {
              label: "Breakpoint Payoff",
              headline: capstoneTitle,
              detail:
                "Wave 9는 open-lane payoff다. 새 계약을 늘리기보다 같은 pressure 안에서 marked elite cache를 깊게 찢어 doctrine capstone을 당기는 데 집중하는 첫 rung다.",
            };
      }
      return build && build.doctrineCapstoneId
        ? {
            label: "Breakpoint Proof",
            headline: lockedTitle,
            detail:
              "Wave 10은 caravan chase가 아니라 single crownline proof다. relay crown 하나를 찢고 열린 breach lane을 오래 붙잡아야 하므로, 방금 잠근 doctrine form이 실제로 얼마나 긴 ownership window를 만드는지 바로 확인하게 만든다.",
          }
        : {
            label: "Breakpoint Proof",
            headline: capstoneTitle,
            detail:
              "Wave 10은 capstone 직전 single crownline proof다. open-lane payoff에서 벌어 둔 공간을 relay breach hold로 바꾸며, marked elite cache를 챙길 마지막 창을 어느 flank에서 열지 직접 골라야 한다.",
          };
    }
    if (build && build.lateBreakProfileId) {
      if (build.lateBreakProfileId === "mutation") {
        return {
          label: boundedWave === 11 ? "Crownbreaker Lap" : "Cataclysm Crownline",
          headline:
            (currentWeapon && currentWeapon.headlineFormLabel) ||
            (currentWeapon && currentWeapon.capstoneLabel) ||
            "Cataclysm Arsenal",
          detail:
            boundedWave === 11
              ? "Wave 11은 반복 crown이 아니라 domination lap이다. 열린 gallery에서 lane 폭을 먼저 먹고 split volley가 전장 폭 전체를 얼마나 오래 잠그는지 즐기게 만든다."
              : "Wave 12는 Cataclysm branch의 최종 crownline breach다. Wave 11에서 벌어 둔 lane ownership를 실제 돌파 창으로 바꾸며 마지막 corridor를 직접 찢어야 한다.",
        };
      }
      if (build.lateBreakProfileId === "aegis") {
        return {
          label: boundedWave === 11 ? "Halo Refuge" : "Citadel Stand",
          headline: "Warplate Halo",
          detail:
            boundedWave === 11
              ? "Wave 11은 refuge lap이다. drift pocket에서 회복 창을 캐며 plate timing과 짧은 retreat cadence로 넓은 pocket을 오래 버티게 만든다."
              : "Wave 12는 최종 Citadel stand다. Wave 11에서 벌어 둔 회복 리듬을 바탕으로 어느 거점을 잠깐 열고 버릴지 마지막으로 결정해야 한다.",
        };
      }
      if (build.lateBreakProfileId === "ledger") {
        return {
          label: boundedWave === 11 ? "Kingpin Vaultline" : "Grand Blackout Run",
          headline: "Black Ledger",
          detail:
            boundedWave === 11
              ? "Wave 11은 cash-out lap이다. 분산 vault를 넓게 찢으며 chase line과 이탈 타이밍을 greed 판단으로 한 번 더 벌 수 있다."
              : "Wave 12는 blackout finale다. 대형 caravan chase가 payout과 퇴로를 동시에 흔드므로, 직전에 벌어 둔 greed 리듬을 끝까지 유지해야 한다.",
        };
      }
    }
    if (build && !build.doctrineCapstoneId) {
      return {
        label: "Starforge Gallery",
        headline: capstoneTitle,
        detail:
          "Wave 11은 반복 crown 대신 gallery lap이다. doctrine capstone cache를 회수했다면 drift furnace 하나만 비껴 가며 새 폼이 열린 lane 둘을 얼마나 오래 지우는지 먼저 즐기게 만든다.",
      };
    }
    if (build && !build.lateAscensionId) {
      return {
        label: boundedWave === 11 ? "Starforge Gallery" : "Cinder Crown",
        headline: "Ascension Core",
        detail:
          boundedWave === 11
            ? "Wave 11은 late ascension split 직후의 domination lap이다. drift furnace 하나만 비껴 돌며 첫 elite split cache를 회수하고, headline body jump가 열린 lane 소유 시간을 실제로 얼마나 늘리는지 먼저 느끼게 만든다."
            : "Wave 12는 headline target을 Ascension Core 하나로 좁힌 단일 crownline breach다. 가장 얇은 relay corridor를 직접 찢고 rider 생존축으로 열린 pocket을 오래 버텨야 한다.",
      };
    }
    if (boundedWave === 11) {
      return {
        label: "Victory Lap",
        headline:
          (currentWeapon && currentWeapon.lateAscensionLabel) ||
          (currentWeapon && currentWeapon.capstoneLabel) ||
          "Late Form",
        detail:
          "Wave 11은 반복 crown이 아니라 late-form domination lap이다. drift furnace 하나만 비껴 가며 방금 잠긴 body/gun leap가 열린 lane 둘을 얼마나 오래 소유하는지 먼저 보여 준다.",
      };
    }
    return {
      label: "Cinder Crown",
      headline:
        (currentWeapon && currentWeapon.lateAscensionLabel) ||
        (currentWeapon && currentWeapon.capstoneLabel) ||
        "Late Form",
      detail:
        "Wave 12는 headline late form의 최종 crownline breach다. 긴 relay corridor 하나만 남긴 결산 전투라, 방금 완성한 form과 rider 생존축이 전장 소유 시간을 얼마나 늘리는지 더 또렷하게 드러난다.",
    };
  }

  function shouldOfferStormArtilleryAfterburnAscension(build) {
    return Boolean(
      build &&
      build.bastionDoctrineId === "storm_artillery" &&
      build.doctrineChaseClaimed &&
      !build.doctrineCapstoneId
    );
  }

  function getStormArtilleryAfterburnAscensionChoices(build) {
    const doctrine = getBastionDoctrineDef(build);
    if (!shouldOfferStormArtilleryAfterburnAscension(build) || !doctrine) {
      return [];
    }
    return getDoctrineLateCapstoneDefs(doctrine).map((capstone) => {
      const endform = getStormArtilleryAfterburnEndform(capstone);
      return {
        type: "utility",
        action: "doctrine_capstone",
        id: `utility:afterburn_ascension:${capstone.id}`,
        verb: "ascend",
        tag: capstone.id === "sky_lance_battery" ? "SKY" : "SPIRE",
        title: capstone.title,
        description: `${capstone.description} ${endform ? endform.statusNote : ""}`,
        slotText: `Afterburn Ascension · ${capstone.slotText}`,
        cost: 0,
        laneLabel: "Afterburn Ascension",
        forgeLaneLabel: "Afterburn Ascension",
        doctrineId: doctrine.id,
        doctrineLabel: doctrine.label,
        doctrineCapstoneId: capstone.id,
        capstoneLabel: capstone.label,
        bodyLabel: endform ? endform.bodyLabel : null,
        bodyText: endform ? endform.bodyText : null,
      };
    });
  }

  function getLateAscensionDef(buildOrAscensionId) {
    if (!buildOrAscensionId) {
      return null;
    }
    const ascensionId =
      typeof buildOrAscensionId === "object" ? buildOrAscensionId.lateAscensionId : buildOrAscensionId;
    return ascensionId ? LATE_ASCENSION_DEFS[ascensionId] || null : null;
  }

  function getAfterburnOverdriveDef(buildOrId) {
    if (!buildOrId) {
      return null;
    }
    const overdriveId =
      typeof buildOrId === "object" ? buildOrId.afterburnOverdriveId : buildOrId;
    return overdriveId ? AFTERBURN_OVERDRIVE_DEFS[overdriveId] || null : null;
  }

  function shouldOfferAfterburnOverdrive(build, stageIndex) {
    if (
      !build ||
      build.afterburnOverdriveId ||
      !Number.isFinite(stageIndex) ||
      stageIndex < AFTERBURN_OVERDRIVE_START_STAGE
    ) {
      return false;
    }
    return Boolean(
      getSelectedFinaleVariant(build) ||
      build.lateAscensionId ||
      build.doctrineCapstoneId ||
      build.lateFieldConvergenceId
    );
  }

  function getAfterburnOverdriveChoices(build) {
    if (!shouldOfferAfterburnOverdrive(build, AFTERBURN_OVERDRIVE_START_STAGE)) {
      return [];
    }
    const finaleVariant = getSelectedFinaleVariant(build);
    return Object.values(AFTERBURN_OVERDRIVE_DEFS).map((overdrive) => ({
      type: "utility",
      action: "afterburn_overdrive",
      id: `utility:afterburn_overdrive:${overdrive.id}`,
      verb: "과승천",
      tag: overdrive.tag,
      title: overdrive.title,
      description: `${overdrive.description}${
        finaleVariant ? ` 현재 ${finaleVariant.title || finaleVariant.label} 위에 다시 접합된다.` : ""
      }`,
      slotText: `Afterburn Overdrive · ${overdrive.slotText}`,
      cost: 0,
      laneLabel: "Endform Overdrive",
      forgeLaneLabel: "Endform Overdrive",
      afterburnOverdriveId: overdrive.id,
      bodyLabel: overdrive.bodyLabel,
      bodyText: overdrive.bodyText,
    }));
  }

  function getLateAscensionSupportLevel(build) {
    return clamp(getInstalledSupportSystems(build).length, 0, MAX_SUPPORT_BAY_LIMIT);
  }

  function getLateAscensionSupportStatusNote(lateAscension, supportLevel, headlineTierLabel) {
    if (!lateAscension) {
      return "";
    }
    if (supportLevel <= 0) {
      return `${lateAscension.statusNote} 현재 ${headlineTierLabel} ascension form은 support uplink 없이도 완성형으로 고정되어 있다.`;
    }
    return `${lateAscension.statusNote} 현재 support uplink ${supportLevel}칸은 ${headlineTierLabel} ascension form의 빈틈을 메우는 보조선으로만 붙어 있다.`;
  }

  function getHeadlineFormTier(build) {
    if (!build) {
      return 0;
    }
    if (build.afterburnDominionId) {
      return 4;
    }
    if (build.afterburnOverdriveId) {
      return 3;
    }
    if (build.lateAscensionId) {
      return 2;
    }
    if (build.doctrineCapstoneId || build.lateFieldConvergenceId || getDoctrineWeaponStage(build) >= 2) {
      return 1;
    }
    return 0;
  }

  function getHeadlineFormTierLabel(tier) {
    return `FORM ${clamp(Math.round(tier || 0), 1, 4)}`;
  }

  function shouldOfferLateAscension(build, waveNumber) {
    return Boolean(
      build &&
      !build.lateAscensionId &&
      Number.isFinite(waveNumber) &&
      waveNumber >= LATE_ASCENSION_START_WAVE &&
      (!CONSOLIDATED_12_WAVE_ROUTE || waveNumber > MAX_WAVES)
    );
  }

  function createLateAscensionChoices(build) {
    const ascensionWaveSample = CONSOLIDATED_12_WAVE_ROUTE ? MAX_WAVES + 1 : LATE_ASCENSION_START_WAVE;
    if (!shouldOfferLateAscension(build, ascensionWaveSample)) {
      return [];
    }
    return Object.values(LATE_ASCENSION_DEFS).map((ascension) => ({
      type: "utility",
      action: "late_ascension",
      id: `utility:late_ascension:${ascension.id}`,
      verb: "상승",
      tag: ascension.tag,
      title: ascension.title,
      description: ascension.description,
      slotText: ascension.slotText,
      cost: 0,
      lateAscensionId: ascension.id,
      lateAscensionLabel: ascension.label,
      bodyLabel: ascension.bodyLabel,
      bodyText: ascension.bodyText,
      laneLabel: "Ascension Core",
      forgeLaneLabel: "Ascension Core",
    }));
  }

  function getDoctrineWeaponStage(build, doctrine = null) {
    if (!build) {
      return 0;
    }
    const activeDoctrine = doctrine || getBastionDoctrineDef(build);
    if (!activeDoctrine) {
      return 0;
    }
    let stage = 1;
    if (build.doctrineChaseClaimed) {
      stage = 2;
    }
    if (
      build.doctrineCapstoneId &&
      getDoctrineLateCapstoneDefs(activeDoctrine).some((capstone) => capstone.id === build.doctrineCapstoneId)
    ) {
      stage = 3;
    }
    return stage;
  }

  function getClaimedWildcardProtocolIds(build) {
    if (!build || !Array.isArray(build.wildcardProtocolIds)) {
      return [];
    }
    return build.wildcardProtocolIds.filter((protocolId) => WILDCARD_PROTOCOL_DEFS[protocolId]);
  }

  function getWildcardProtocolForWave(nextWave) {
    const index = WILDCARD_PROTOCOL_WAVES.indexOf(nextWave);
    if (index < 0) {
      return null;
    }
    const protocolId = WILDCARD_PROTOCOL_ORDER[index];
    return protocolId ? WILDCARD_PROTOCOL_DEFS[protocolId] || null : null;
  }

  function getUpcomingWildcardProtocol(build, waveNumber) {
    const claimedIds = new Set(getClaimedWildcardProtocolIds(build));
    for (let index = 0; index < WILDCARD_PROTOCOL_WAVES.length; index += 1) {
      const scheduledWave = WILDCARD_PROTOCOL_WAVES[index];
      const protocolId = WILDCARD_PROTOCOL_ORDER[index];
      if (!protocolId || claimedIds.has(protocolId) || scheduledWave < waveNumber) {
        continue;
      }
      const protocol = WILDCARD_PROTOCOL_DEFS[protocolId];
      if (!protocol) {
        continue;
      }
      return {
        ...protocol,
        waveNumber: scheduledWave,
      };
    }
    return null;
  }

  function getWildcardProtocolSummary(build) {
    const labels = getClaimedWildcardProtocolIds(build).map(
      (protocolId) => WILDCARD_PROTOCOL_DEFS[protocolId].title
    );
    return labels.length > 0 ? `Wildcard ${labels.join(" + ")}` : "Wildcard 없음";
  }

  function getRogueLatticeChassisId(build) {
    if (build && build.chassisId && LATE_FIELD_CONVERGENCE_DEFS[build.chassisId]) {
      return build.chassisId;
    }
    const doctrine = getBastionDoctrineDef(build);
    const ascension = doctrine ? WAVE6_ASCENSION_DEFS[doctrine.id] || null : null;
    if (ascension && ascension.chassisId && LATE_FIELD_CONVERGENCE_DEFS[ascension.chassisId]) {
      return ascension.chassisId;
    }
    const fallbackChassisIdByCore = {
      ember: "vector_thrusters",
      scatter: "bulwark_treads",
      lance: "vector_thrusters",
      ricochet: "salvage_winch",
    };
    return fallbackChassisIdByCore[build && build.coreId] || "vector_thrusters";
  }

  function getRogueLatticeConvergenceDef(build, chassisId = null) {
    const resolvedChassisId = chassisId || getRogueLatticeChassisId(build);
    return resolvedChassisId ? LATE_FIELD_CONVERGENCE_DEFS[resolvedChassisId] || null : null;
  }

  function getRogueLatticeSupportSystemId(build, chassisId = null) {
    const resolvedChassisId = chassisId || getRogueLatticeChassisId(build);
    if (resolvedChassisId === "bulwark_treads") {
      return "aegis_halo";
    }
    if (resolvedChassisId === "salvage_winch") {
      return "seeker_array";
    }
    return build && build.coreId === "lance" ? "seeker_array" : "volt_drones";
  }

  function getDoctrineWeaponForm(build, coreId) {
    if (!build || !coreId) {
      return null;
    }
    const doctrine = getBastionDoctrineDef(build);
    if (!doctrine) {
      return null;
    }
    const ladder = DOCTRINE_WEAPON_LADDER_DEFS[doctrine.id];
    if (!ladder || ladder.coreId !== coreId) {
      return null;
    }
    let stage = getDoctrineWeaponStage(build, doctrine);
    let stageDef = ladder.stages[stage];
    while (stage > 0 && !stageDef) {
      stage -= 1;
      stageDef = ladder.stages[stage];
    }
    const form =
      stageDef && stageDef.variants && build.doctrineCapstoneId
        ? stageDef.variants[build.doctrineCapstoneId] || null
        : stageDef;
    return form
      ? {
          stage,
          ...form,
        }
      : null;
  }

  function getDoctrineBodyForm(build) {
    if (!build || !build.bastionDoctrineId || build.doctrineCapstoneId) {
      return null;
    }
    const doctrine = getBastionDoctrineDef(build);
    if (!doctrine) {
      return null;
    }
    const ladder = DOCTRINE_BODY_LADDER_DEFS[doctrine.id];
    if (!ladder) {
      return null;
    }
    let stage = getDoctrineWeaponStage(build, doctrine);
    while (stage > 0) {
      const form = ladder[stage];
      if (form) {
        return {
          stage,
          doctrineId: doctrine.id,
          ...form,
        };
      }
      stage -= 1;
    }
    return null;
  }

  function getDoctrinePreferredSystemIds(doctrine) {
    if (!doctrine) {
      return [];
    }
    return Array.from(
      new Set(
        [doctrine.starterSystemId, ...(Array.isArray(doctrine.preferredSystemIds) ? doctrine.preferredSystemIds : [])]
          .filter(Boolean)
      )
    );
  }

  function getDoctrineWildcardSystemAllowance(build) {
    if (!build || !build.bastionDoctrineId) {
      return 0;
    }
    return Math.max(0, getSupportBayCapacity(build) - MAX_SUPPORT_BAYS);
  }

  function countDoctrineWildcardSystems(build, doctrine = null) {
    if (!build) {
      return 0;
    }
    const activeDoctrine = doctrine || getBastionDoctrineDef(build);
    if (!activeDoctrine) {
      return 0;
    }
    const preferredSystemIds = new Set(getDoctrinePreferredSystemIds(activeDoctrine));
    return getInstalledSupportSystems(build).reduce(
      (count, entry) => count + (preferredSystemIds.has(entry.id) ? 0 : 1),
      0
    );
  }

  function doctrineAllowsSystemInstall(build, systemId) {
    const doctrine = build && build.bastionDoctrineId ? getBastionDoctrineDef(build) : null;
    const preferredSystemIds = getDoctrinePreferredSystemIds(doctrine);
    if (!doctrine || preferredSystemIds.length === 0) {
      return true;
    }
    if (preferredSystemIds.includes(systemId)) {
      return true;
    }
    return countDoctrineWildcardSystems(build, doctrine) < getDoctrineWildcardSystemAllowance(build);
  }

  function doctrineAllowsModChoice(build, modId) {
    const doctrine = build && build.bastionDoctrineId ? getBastionDoctrineDef(build) : null;
    if (!doctrine || !Array.isArray(doctrine.preferredModIds) || doctrine.preferredModIds.length === 0) {
      return true;
    }
    return doctrine.preferredModIds.includes(modId);
  }

  function doctrineAllowsAffixChoice(build, affixId) {
    const doctrine = build && build.bastionDoctrineId ? getBastionDoctrineDef(build) : null;
    if (!doctrine || !Array.isArray(doctrine.preferredAffixIds) || doctrine.preferredAffixIds.length === 0) {
      return true;
    }
    return doctrine.preferredAffixIds.includes(affixId);
  }

  function computePlayerStats(build) {
    const stats = {
      maxHp: 100 + build.maxHpBonus,
      moveSpeed: 248 + build.moveSpeedBonus,
      dashMax: 2 + build.dashMaxBonus,
      dashCooldown: clamp(3 - build.dashCooldownBonus, 1.4, 3.2),
      pickupRadius: 42 + build.pickupBonus,
      coolRate: 28 + build.coolRateBonus,
      scrapMultiplier: build.scrapMultiplier,
      driveGainMultiplier: 1 + build.driveGainBonus,
      overdriveDuration: 5.5 + build.overdriveDurationBonus,
      hazardMitigation: clamp(build.hazardMitigation, 0, 0.45),
    };
    const lateFieldAegisLevel = getLateFieldAegisLevel(build);
    if (lateFieldAegisLevel > 0) {
      stats.maxHp += 6 + lateFieldAegisLevel * 4;
      stats.moveSpeed += lateFieldAegisLevel * 4;
      stats.dashCooldown = clamp(stats.dashCooldown - lateFieldAegisLevel * 0.08, 1.25, 3.2);
      stats.hazardMitigation = clamp(stats.hazardMitigation + lateFieldAegisLevel * 0.04, 0, 0.45);
    }
    const riskMutationLevel = getRiskMutationLevel(build);
    if (riskMutationLevel > 0) {
      stats.moveSpeed += 5 + riskMutationLevel * 2;
      stats.pickupRadius += 4 + riskMutationLevel * 2;
      stats.maxHp -= Math.max(0, Math.ceil(riskMutationLevel / 2) * 2);
    }
    const doctrineBodyForm = getDoctrineBodyForm(build);
    if (doctrineBodyForm && typeof doctrineBodyForm.applyPlayer === "function") {
      doctrineBodyForm.applyPlayer(stats, build);
    }
    const stormArtilleryEndform = getStormArtilleryAfterburnEndform(build);
    if (stormArtilleryEndform && typeof stormArtilleryEndform.applyPlayer === "function") {
      stormArtilleryEndform.applyPlayer(stats, build);
    }
    const afterburnOverdrive = getAfterburnOverdriveDef(build);
    if (afterburnOverdrive && typeof afterburnOverdrive.applyPlayer === "function") {
      afterburnOverdrive.applyPlayer(stats, build);
    }
    const afterburnDominion = getAfterburnDominionDef(build);
    if (afterburnDominion) {
      stats.moveSpeed += 10;
      stats.pickupRadius += 12;
      stats.maxHp += 14;
      stats.dashCooldown = clamp(stats.dashCooldown - 0.18, 1.15, 3.2);
    }
    getAffixDefs(build).forEach((affix) => {
      if (typeof affix.applyPlayer === "function") {
        affix.applyPlayer(stats, build);
      }
    });
    stats.scrapMultiplier = round(stats.scrapMultiplier, 2);
    stats.driveGainMultiplier = round(stats.driveGainMultiplier, 2);
    return stats;
  }

  function computeWeaponStats(build) {
    const core = CORE_DEFS[build.coreId] || CORE_DEFS.ember;
    const baseDamage = 24 + build.damageBonus;
    const baseCooldown = clamp(0.28 - build.cooldownBonus, 0.12, 0.4);
    const attunedCopies =
      build.attunedCoreId === core.id ? Math.max(1, build.attunedCopies || 1) : 1;
    const benchCopies = getBenchCount(build, core.id);
    const benchSyncLevel = clamp(attunedCopies - 1, 0, 3);
    const apexActive = benchSyncLevel >= 3;
    const syncedBaseCooldown = clamp(
      baseCooldown - benchSyncLevel * 0.012 - (apexActive ? 0.01 : 0),
      0.12,
      0.4
    );
    const syncedHeatFactor = clamp(
      1 - benchSyncLevel * 0.06 - (apexActive ? 0.04 : 0),
      0.72,
      1
    );
    const stats = {
      core,
      benchCopies,
      attunedCopies,
      benchSyncLevel,
      benchSyncLabel: formatSyncLabel(benchSyncLevel),
      tierLabel: getWeaponTierLabel(attunedCopies),
      affixIds: sanitizeAffixIds(build.affixes, getAffixCapacity(build)),
      damage: round((baseDamage + benchSyncLevel * 3 + (apexActive ? 6 : 0)) * core.damageFactor, 1),
      cooldown: round(syncedBaseCooldown * core.cooldownFactor, 3),
      heatPerShot: round(14 * build.heatFactor * core.heatFactor * syncedHeatFactor, 1),
      projectileSpeed: round(460 * core.speedFactor, 1),
      pellets:
        core.pellets +
        (core.id === "scatter" && benchSyncLevel >= 2 ? 1 : 0) +
        (core.id === "scatter" && apexActive ? 1 : 0),
      spread:
        core.id === "scatter" && apexActive ? round(core.spread * 0.82, 3) : core.spread,
      pierce:
        core.pierce +
        build.pierceBonus +
        (core.id === "lance" && benchSyncLevel >= 1 ? 1 : 0) +
        (core.id === "lance" && apexActive ? 1 : 0),
      bounce:
        core.bounce +
        (core.id === "ricochet" && benchSyncLevel >= 1 ? 1 : 0) +
        (core.id === "ricochet" && apexActive ? 1 : 0),
      chain: build.chainBonus + (core.id === "ricochet" && apexActive ? 1 : 0),
      chainRange:
        build.chainBonus > 0 || (core.id === "ricochet" && apexActive)
          ? (core.id === "lance" ? 188 + (apexActive ? 28 : 0) : 164)
          : 0,
      color: core.color,
      capstoneId: null,
      capstoneLabel: null,
      capstoneTraitLabel: null,
      capstoneStatusNote: null,
      evolutionTier: 0,
      evolutionLabel: null,
      evolutionTraitLabel: null,
      evolutionStatusNote: null,
      evolutionFirePattern: null,
      doctrineStage: 0,
      doctrineFormLabel: null,
      doctrineTraitLabel: null,
      doctrineStatusNote: null,
      doctrineFirePattern: null,
      doctrineOnHit: null,
      doctrineOnHazardHit: null,
      capstoneFire: null,
      capstoneOnHit: null,
      capstoneOnBounce: null,
      illegalOverclockId: null,
      illegalOverclockLabel: null,
      illegalOverclockTraitLabel: null,
      illegalOverclockStatusNote: null,
      illegalOverclockFirePattern: null,
      riskMutationLevel: 0,
      riskMutationLabel: null,
      riskMutationTraitLabel: null,
      riskMutationStatusNote: null,
      riskMutationFirePattern: null,
      apexMutationLevel: 0,
      apexMutationLabel: null,
      apexMutationTraitLabel: null,
      apexMutationStatusNote: null,
      apexMutationFirePattern: null,
      lateAscensionId: null,
      lateAscensionLabel: null,
      lateAscensionTraitLabel: null,
      lateAscensionStatusNote: null,
      lateAscensionFirePattern: null,
      headlineFormTier: 0,
      headlineFormLabel: null,
      lateFieldMutationLevel: 0,
      lateFieldMutationLabel: null,
      lateFieldMutationTraitLabel: null,
      lateFieldMutationStatusNote: null,
      lateFieldMutationFirePattern: null,
      lateFieldBroadsideConfig: null,
      lateBreakCataclysmFirePattern: null,
      lateFieldConvergenceId: null,
      lateFieldConvergenceLabel: null,
      lateFieldConvergenceTraitLabel: null,
      lateFieldConvergenceStatusNote: null,
      lateFieldConvergenceFirePattern: null,
      afterburnOverdriveId: null,
      afterburnOverdriveLabel: null,
      afterburnOverdriveTraitLabel: null,
      afterburnOverdriveStatusNote: null,
      afterburnOverdriveFirePattern: null,
      afterburnDominionId: null,
      afterburnDominionLabel: null,
      afterburnDominionTraitLabel: null,
      afterburnDominionStatusNote: null,
      afterburnDominionFirePattern: null,
    };
    getAffixDefs(build).forEach((affix) => {
      if (typeof affix.applyWeapon === "function") {
        affix.applyWeapon(stats, build);
      }
    });
    const evolutionTier = getWeaponEvolutionTier(build, core.id);
    const evolutionDef =
      WEAPON_EVOLUTION_DEFS[core.id] && WEAPON_EVOLUTION_DEFS[core.id].tiers[evolutionTier];
    if (evolutionDef) {
      stats.evolutionTier = evolutionTier;
      stats.evolutionLabel = evolutionDef.label;
      stats.evolutionTraitLabel = evolutionDef.traitLabel;
      stats.evolutionStatusNote = evolutionDef.statusNote;
      stats.evolutionFirePattern = evolutionDef.firePattern;
    }
    const catalystCapstone = getCatalystCapstone(build, core.id);
    if (catalystCapstone) {
      stats.capstoneId = catalystCapstone.id;
      stats.capstoneLabel = catalystCapstone.label;
      if (typeof catalystCapstone.applyWeapon === "function") {
        catalystCapstone.applyWeapon(stats, build);
      }
    }
    const doctrineWeaponForm = getDoctrineWeaponForm(build, core.id);
    if (doctrineWeaponForm) {
      stats.doctrineStage = doctrineWeaponForm.stage;
      stats.doctrineFormLabel = doctrineWeaponForm.label;
      stats.doctrineTraitLabel = doctrineWeaponForm.traitLabel;
      stats.doctrineStatusNote = doctrineWeaponForm.statusNote;
      stats.doctrineFirePattern = doctrineWeaponForm.firePattern;
      stats.doctrineOnHit = doctrineWeaponForm.onHit || null;
      stats.doctrineOnHazardHit = doctrineWeaponForm.onHazardHit || null;
      stats.damage += doctrineWeaponForm.damageBonus || 0;
      stats.cooldown = clamp(
        stats.cooldown * (doctrineWeaponForm.cooldownMultiplier || 1),
        0.08,
        0.4
      );
      stats.pierce += doctrineWeaponForm.pierceBonus || 0;
      stats.chain += doctrineWeaponForm.chainBonus || 0;
      if (stats.chain > 0) {
        const baseChainRange = core.id === "lance" ? 188 : 164;
        stats.chainRange = Math.max(
          stats.chainRange || 0,
          baseChainRange + (doctrineWeaponForm.chainRangeBonus || 0)
        );
      }
    }
    const lateAscension = getLateAscensionDef(build);
    if (lateAscension) {
      const supportLevel = getLateAscensionSupportLevel(build);
      const headlineTier = Math.max(2, getHeadlineFormTier(build));
      const headlineTierLabel = getHeadlineFormTierLabel(headlineTier);
      stats.lateAscensionId = lateAscension.id;
      stats.lateAscensionLabel = lateAscension.label;
      stats.lateAscensionTraitLabel = `${headlineTierLabel} · ${lateAscension.traitLabel} · CORE ENDFORM`;
      stats.lateAscensionStatusNote = getLateAscensionSupportStatusNote(
        lateAscension,
        supportLevel,
        headlineTierLabel
      );
      stats.headlineFormTier = headlineTier;
      stats.headlineFormLabel = `${headlineTierLabel} · ${lateAscension.label}`;
      stats.lateAscensionFirePattern =
        typeof lateAscension.getFirePattern === "function"
          ? lateAscension.getFirePattern(supportLevel, build, core)
          : null;
      if (lateAscension.id === "crownsplitter_array") {
        stats.projectileSpeed += 18 + supportLevel * 8;
      } else if (lateAscension.id === "slagburst_drive") {
        stats.damage += 4 + supportLevel * 2;
        stats.heatPerShot = round(stats.heatPerShot * (1.05 + supportLevel * 0.015), 1);
      } else if (lateAscension.id === "voltspine_lattice") {
        stats.cooldown = clamp(stats.cooldown * (1 - 0.018 * supportLevel), 0.08, 0.4);
        stats.chain += 1 + Math.floor(supportLevel / 2);
        stats.chainRange = Math.max(stats.chainRange || 0, 174 + supportLevel * 18);
        stats.projectileSpeed += 10 + supportLevel * 6;
      } else if (lateAscension.id === "anvil_prism") {
        stats.damage += 3 + supportLevel * 2;
        stats.pierce += supportLevel >= 2 ? 1 : 0;
        stats.heatPerShot = round(stats.heatPerShot * (1.04 + supportLevel * 0.01), 1);
        stats.projectileSpeed += 4 + supportLevel * 3;
      }
    }
    const illegalOverclock = getIllegalOverclockDef(build);
    if (illegalOverclock) {
      const mutationLevel = getIllegalOverclockMutationLevel(build);
      stats.illegalOverclockId = illegalOverclock.id;
      stats.illegalOverclockLabel = illegalOverclock.label;
      stats.illegalOverclockTraitLabel =
        mutationLevel > 0
          ? `${illegalOverclock.traitLabel} · ${getIllegalMutationTierLabel(mutationLevel)}`
          : illegalOverclock.traitLabel;
      stats.illegalOverclockStatusNote =
        mutationLevel > 0
          ? `${illegalOverclock.statusNote} 현재 ${getIllegalMutationTierLabel(mutationLevel)}로 금지 무장이 한 단계 더 넓어졌다.`
          : illegalOverclock.statusNote;
      if (typeof illegalOverclock.applyWeapon === "function") {
        illegalOverclock.applyWeapon(stats, build);
      }
    }
    const riskMutationLevel = getRiskMutationLevel(build);
    if (riskMutationLevel > 0) {
      const mutation = getRiskMutationCoreDef(build);
      stats.riskMutationLevel = riskMutationLevel;
      stats.riskMutationLabel = mutation.title;
      stats.riskMutationTraitLabel = `${mutation.traitLabel} · ${getRiskMutationTierLabel(riskMutationLevel)}`;
      stats.riskMutationStatusNote =
        `${mutation.bodyText} 현재 ${getRiskMutationTierLabel(riskMutationLevel)}로 보조 포문이 열려 다음 greed pick을 계속 부른다.`;
      stats.riskMutationFirePattern = {
        kind: "risk_mutation",
        offsets: getRiskMutationOffsets(riskMutationLevel),
        speedMultiplier: 1.04 + riskMutationLevel * 0.015,
        radius: 4.6 + riskMutationLevel * 0.08,
        damageMultiplier: 0.24 + riskMutationLevel * 0.025,
        life: 0.82 + riskMutationLevel * 0.03,
        pierceBonus: build.coreId === "lance" && riskMutationLevel >= 3 ? 1 : 0,
        bounceBonus: build.coreId === "ricochet" && riskMutationLevel >= 4 ? 1 : 0,
        chainBonus: build.coreId === "ricochet" && riskMutationLevel >= 2 ? 1 : 0,
        color: mutation.color,
      };
      if (build.coreId === "ember") {
        stats.cooldown = clamp(stats.cooldown * (1 - riskMutationLevel * 0.03), 0.08, 0.4);
        stats.damage += riskMutationLevel * 1.5;
      } else if (build.coreId === "scatter") {
        stats.pellets += Math.floor((riskMutationLevel + 1) / 2);
        stats.spread = round(stats.spread * Math.max(0.7, 1 - riskMutationLevel * 0.04), 3);
      } else if (build.coreId === "lance") {
        stats.projectileSpeed += riskMutationLevel * 18;
        stats.pierce += Math.floor((riskMutationLevel + 1) / 2);
      } else if (build.coreId === "ricochet") {
        stats.damage += riskMutationLevel;
        stats.chain += Math.floor((riskMutationLevel + 1) / 3);
        stats.bounce += riskMutationLevel >= 3 ? 1 : 0;
        stats.chainRange = Math.max(stats.chainRange || 0, 176 + riskMutationLevel * 6);
      }
    }
    const apexMutationLevel = getApexMutationLevel(build);
    if (apexMutationLevel > 0) {
      stats.apexMutationLevel = apexMutationLevel;
      stats.apexMutationLabel = "Predator Molt";
      stats.apexMutationTraitLabel = `Cinder Maw · ${getApexMutationTierLabel(apexMutationLevel)}`;
      stats.apexMutationStatusNote = `Cinder Maw를 사냥해 주무장과 차체가 함께 변이했다. 현재 ${getApexMutationTierLabel(apexMutationLevel)}로 추가 배럴과 돌진 프레임이 열려 있다.`;
      stats.apexMutationFirePattern = {
        kind: "apex_spines",
        offsets: getApexSpineOffsets(apexMutationLevel),
        speedMultiplier: 1.06 + apexMutationLevel * 0.03,
        radius: 4.8,
        damageMultiplier: 0.3 + apexMutationLevel * 0.04,
        life: 0.72 + apexMutationLevel * 0.06,
        pierceBonus: core.id === "lance" && apexMutationLevel >= 2 ? 1 : 0,
        bounceBonus: 0,
        chainBonus: 0,
        color: "#ffb36b",
      };
      stats.damage += apexMutationLevel * 2;
      if (core.id === "ember") {
        stats.cooldown = clamp(stats.cooldown * (1 - apexMutationLevel * 0.035), 0.08, 0.4);
      } else if (core.id === "scatter") {
        stats.pellets += apexMutationLevel;
        stats.spread = round(stats.spread * (1 - apexMutationLevel * 0.05), 3);
      } else if (core.id === "lance") {
        stats.pierce += Math.ceil(apexMutationLevel / 2);
        stats.projectileSpeed += apexMutationLevel * 22;
      } else if (core.id === "ricochet") {
        stats.chain += 1;
        stats.chainRange = Math.max(stats.chainRange || 0, 182);
        if (apexMutationLevel >= 2) {
          stats.bounce += 1;
        }
      }
    }
    const lateFieldMutationLevel = getLateFieldMutationLevel(build);
    if (lateFieldMutationLevel > 0) {
      const offsetCount = Math.min(8, 2 + lateFieldMutationLevel);
      const spacing =
        core.id === "scatter"
          ? 0.14
          : core.id === "ricochet"
            ? 0.18
            : core.id === "lance"
              ? 0.09
              : 0.11;
      const half = (offsetCount - 1) / 2;
      const offsets = Array.from({ length: offsetCount }, (_, index) => (index - half) * spacing);
      stats.lateFieldMutationLevel = lateFieldMutationLevel;
      stats.lateFieldMutationLabel = getLateFieldMutationTierLabel(lateFieldMutationLevel);
      stats.lateFieldMutationTraitLabel = `Field Arsenal · MK ${lateFieldMutationLevel}`;
      stats.lateFieldMutationStatusNote =
        `후반 현장 패키지가 주포를 ${stats.lateFieldMutationLabel} 형태로 밀어 올렸다. 추가 배럴이 실제로 열려 매 2웨이브마다 더 넓은 화망을 강요한다.`;
      stats.lateFieldMutationFirePattern = {
        kind: "late_field_mutation",
        offsets,
        speedMultiplier: core.id === "lance" ? 1.16 : core.id === "ricochet" ? 1.04 : 1.08,
        radius:
          core.id === "lance"
            ? 5.7 + lateFieldMutationLevel * 0.18
            : 4.9 + lateFieldMutationLevel * 0.12,
        damageMultiplier: 0.22 + lateFieldMutationLevel * 0.03,
        life: 0.84 + lateFieldMutationLevel * 0.04,
        pierceBonus: core.id === "lance" ? Math.ceil(lateFieldMutationLevel / 2) : 0,
        bounceBonus: core.id === "ricochet" && lateFieldMutationLevel >= 2 ? 1 : 0,
        chainBonus: core.id === "ricochet" ? Math.floor((lateFieldMutationLevel + 1) / 2) : 0,
        color: "#ffe1ac",
      };
      if (lateFieldMutationLevel >= 2) {
        const podCount = Math.min(4, 1 + Math.floor(lateFieldMutationLevel / 2));
        const fanCount =
          core.id === "scatter"
            ? 2
            : lateFieldMutationLevel >= 6
              ? 3
              : lateFieldMutationLevel >= 4
                ? 2
                : 1;
        stats.lateFieldBroadsideConfig = {
          podCount,
          fanCount,
          cooldown: Math.max(1.55, 2.7 - lateFieldMutationLevel * 0.16),
          range: 400 + lateFieldMutationLevel * 30,
          speedMultiplier: core.id === "lance" ? 1.22 : 1.12,
          radius: core.id === "lance" ? 5.4 : 4.8,
          damageMultiplier:
            (core.id === "scatter" ? 0.26 : 0.36) + lateFieldMutationLevel * 0.025,
          life: 0.76 + lateFieldMutationLevel * 0.03,
          pierceBonus: core.id === "lance" ? Math.ceil(lateFieldMutationLevel / 3) : 0,
          bounceBonus: core.id === "ricochet" && lateFieldMutationLevel >= 4 ? 1 : 0,
          chainBonus: core.id === "ricochet" ? Math.floor(lateFieldMutationLevel / 3) : 0,
          fanSpread:
            core.id === "scatter" ? 0.18 : core.id === "lance" ? 0.08 : 0.12,
          color: "#ffe0ac",
        };
      }
      stats.damage += 2 + lateFieldMutationLevel * 2;
      stats.cooldown = clamp(stats.cooldown * (1 - lateFieldMutationLevel * 0.022), 0.08, 0.4);
      if (core.id === "ember") {
        stats.projectileSpeed += lateFieldMutationLevel * 12;
      } else if (core.id === "scatter") {
        stats.pellets += lateFieldMutationLevel >= 2 ? 1 : 0;
        stats.pellets += lateFieldMutationLevel >= 4 ? 1 : 0;
        stats.spread = round(stats.spread * Math.max(0.72, 1 - lateFieldMutationLevel * 0.04), 3);
      } else if (core.id === "lance") {
        stats.pierce += Math.ceil(lateFieldMutationLevel / 2);
        stats.projectileSpeed += lateFieldMutationLevel * 18;
      } else if (core.id === "ricochet") {
        stats.chain += Math.ceil(lateFieldMutationLevel / 2);
        stats.chainRange = Math.max(stats.chainRange || 0, 172 + lateFieldMutationLevel * 10);
        if (lateFieldMutationLevel >= 3) {
          stats.bounce += 1;
        }
      }
      if (build.lateBreakProfileId === "mutation" && lateFieldMutationLevel >= 4) {
        const cataclysmOffsets =
          core.id === "scatter"
            ? [-0.34, -0.18, 0, 0.18, 0.34]
            : core.id === "lance"
              ? [-0.34, -0.18, 0, 0.18, 0.34]
              : core.id === "ricochet"
                ? [-0.58, -0.28, 0, 0.28, 0.58]
                : [-0.62, -0.4, -0.18, 0.18, 0.4, 0.62];
        stats.lateFieldMutationTraitLabel = `Cataclysm Arsenal · MK ${lateFieldMutationLevel}`;
        stats.lateFieldMutationStatusNote =
          `Wave 8 Cataclysm Arsenal이 주포 전면 갈퀴와 측면 포드를 한 번에 잠가 support 없이도 firing geometry가 바뀌었다. Wave 9-10 payoff band는 이 primary fan이 lane 둘을 동시에 오래 잠그는지 바로 증명한다.`;
        stats.lateBreakCataclysmFirePattern = {
          kind: "late_break_cataclysm",
          offsets: cataclysmOffsets,
          speedMultiplier: core.id === "lance" ? 1.26 : core.id === "ricochet" ? 1.1 : 1.14,
          radius: core.id === "lance" ? 6.1 : core.id === "scatter" ? 5.2 : 5,
          damageMultiplier:
            core.id === "scatter"
              ? 0.22 + lateFieldMutationLevel * 0.02
              : 0.28 + lateFieldMutationLevel * 0.025,
          life: core.id === "lance" ? 0.98 : 0.86,
          pierceBonus: core.id === "lance" ? 1 : 0,
          bounceBonus: core.id === "ricochet" ? 1 : 0,
          chainBonus: core.id === "ricochet" ? 1 : 0,
          color: "#fff0c9",
        };
        stats.damage += 4;
        stats.cooldown = clamp(stats.cooldown * 0.94, 0.08, 0.4);
        if (core.id === "ember") {
          stats.projectileSpeed += 20;
        } else if (core.id === "scatter") {
          stats.pellets += 1;
          stats.spread = round(stats.spread * 0.92, 3);
        } else if (core.id === "lance") {
          stats.pierce += 1;
          stats.projectileSpeed += 28;
        } else if (core.id === "ricochet") {
          stats.chain += 1;
          stats.bounce += 1;
          stats.chainRange = Math.max(stats.chainRange || 0, 192);
        }
      }
    }
    const lateFieldConvergence = getLateFieldConvergenceDef(build);
    if (lateFieldConvergence) {
      stats.lateFieldConvergenceId = lateFieldConvergence.id;
      stats.lateFieldConvergenceLabel = lateFieldConvergence.title;
      stats.lateFieldConvergenceTraitLabel = lateFieldConvergence.traitLabel;
      stats.lateFieldConvergenceStatusNote =
        `${lateFieldConvergence.bodyText} support bay ${getInstalledSupportSystems(build).length}/${getSupportBayCapacity(build)}와 greed pressure ${getLateFieldGreedPressure(build)}가 이 convergence를 밀고 있다.`;
      stats.lateFieldConvergenceFirePattern = lateFieldConvergence.getFirePattern(build, core);
      if (typeof lateFieldConvergence.applyWeapon === "function") {
        lateFieldConvergence.applyWeapon(stats, build, core);
      }
    }
    const afterburnOverdrive = getAfterburnOverdriveDef(build);
    if (afterburnOverdrive) {
      const headlineTier = Math.max(3, getHeadlineFormTier(build));
      stats.afterburnOverdriveId = afterburnOverdrive.id;
      stats.afterburnOverdriveLabel = afterburnOverdrive.title;
      stats.afterburnOverdriveTraitLabel = `${getHeadlineFormTierLabel(headlineTier)} · ${afterburnOverdrive.traitLabel}`;
      stats.afterburnOverdriveStatusNote = `${afterburnOverdrive.statusNote} ${getHeadlineFormTierLabel(headlineTier)}가 열려 이전 ascension frame 위에 두 번째 포문 jump가 겹친다.`;
      stats.headlineFormTier = headlineTier;
      stats.headlineFormLabel = `${getHeadlineFormTierLabel(headlineTier)} · ${afterburnOverdrive.title}`;
      stats.afterburnOverdriveFirePattern =
        typeof afterburnOverdrive.getFirePattern === "function"
          ? afterburnOverdrive.getFirePattern(build, core)
          : null;
      if (typeof afterburnOverdrive.applyWeapon === "function") {
        afterburnOverdrive.applyWeapon(stats, build, core);
      }
    }
    const afterburnDominion = getAfterburnDominionDef(build);
    if (afterburnDominion) {
      const headlineTier = Math.max(4, getHeadlineFormTier(build));
      const offsets =
        core.id === "scatter"
          ? [-0.54, -0.33, -0.12, 0.12, 0.33, 0.54]
          : core.id === "lance"
            ? [-0.28, -0.1, 0.1, 0.28]
            : core.id === "ricochet"
              ? [-0.4, -0.2, 0, 0.2, 0.4]
              : [-0.46, -0.28, -0.1, 0.1, 0.28, 0.46];
      stats.afterburnDominionId = afterburnDominion.id;
      stats.afterburnDominionLabel = afterburnDominion.title;
      stats.afterburnDominionTraitLabel = `${getHeadlineFormTierLabel(headlineTier)} · ${afterburnDominion.traitLabel}`;
      stats.afterburnDominionStatusNote =
        `${afterburnDominion.bodyText} ${getHeadlineFormTierLabel(headlineTier)}가 완성되어 Afterburn 지배 구간이 열리고, 다음 한 웨이브는 목적지 세금보다 압도감이 먼저 온다.`;
      stats.headlineFormTier = headlineTier;
      stats.headlineFormLabel = `${getHeadlineFormTierLabel(headlineTier)} · ${afterburnDominion.title}`;
      stats.afterburnDominionFirePattern = {
        kind: "afterburn_dominion",
        offsets,
        speedMultiplier: core.id === "lance" ? 1.24 : 1.1,
        radius: core.id === "lance" ? 5.8 : 5.1,
        damageMultiplier: core.id === "scatter" ? 0.28 : 0.36,
        life: 0.9,
        pierceBonus: core.id === "lance" ? 2 : 0,
        bounceBonus: core.id === "ricochet" ? 1 : 0,
        chainBonus: core.id === "ricochet" ? 1 : 0,
        color: afterburnDominion.color,
      };
      stats.damage += 8;
      stats.cooldown = clamp(stats.cooldown * 0.88, 0.08, 0.4);
      if (core.id === "ember") {
        stats.damage += 5;
        stats.projectileSpeed += 18;
      } else if (core.id === "scatter") {
        stats.pellets += 2;
        stats.spread = round(stats.spread * 0.82, 3);
      } else if (core.id === "lance") {
        stats.pierce += 2;
        stats.projectileSpeed += 42;
      } else if (core.id === "ricochet") {
        stats.chain += 2;
        stats.bounce += 1;
        stats.chainRange = Math.max(stats.chainRange || 0, 198);
      }
    }
    stats.damage = round(stats.damage, 1);
    stats.cooldown = round(stats.cooldown, 3);
    stats.heatPerShot = round(stats.heatPerShot, 1);
    stats.projectileSpeed = round(stats.projectileSpeed, 1);
    stats.affixLabels = stats.affixIds.map((affixId) => AFFIX_DEFS[affixId].label);
    return stats;
  }

  function pickPivotFuelEntry(build, targetCoreId) {
    const benchEntries = getBenchEntries(build);
    if (benchEntries.length === 0) {
      return null;
    }
    return (
      benchEntries.find((entry) => entry.coreId !== targetCoreId) ||
      benchEntries[0]
    );
  }

  function createCoreChoice(coreId, build, options = {}) {
    const core = CORE_DEFS[coreId];
    const directOffer = options.directOffer === true;
    const pivotFuelEntry = directOffer ? pickPivotFuelEntry(build, coreId) : null;
    if (directOffer && !pivotFuelEntry) {
      return null;
    }
    const benchCopies = getBenchCount(build, coreId);
    const baseAttunedCopies =
      build.coreId === coreId ? Math.max(1, build.attunedCopies || 1) : 0;
    const resultingCopies = clamp(baseAttunedCopies + benchCopies, 1, MAX_BENCH_COPIES_PER_CORE);
    const syncLevel = clamp(resultingCopies - 1, 0, 3);
    const syncLabel = formatSyncLabel(syncLevel);
    const discountedCost = Math.max(18, core.cost - syncLevel * 8);
    const directOfferText =
      !directOffer || build.coreId === coreId
        ? `즉시 재장착 · 최종 ${syncLabel}`
        : `보관 ${CORE_DEFS[pivotFuelEntry.coreId].short} 1개 연소 · 최종 ${syncLabel}`;
    return {
      type: "core",
      id: `core:${coreId}`,
      verb: "장착",
      tag: "장착",
      title: core.label,
      description:
        benchCopies > 0
          ? `${core.description} 보관 코어 x${benchCopies}. 장착 시 보관분을 소모해 최종 ${syncLabel} 무기로 맞춘다.`
          : directOffer && pivotFuelEntry
            ? `${core.description} 보관 ${CORE_DEFS[pivotFuelEntry.coreId].short} 1개를 태워 이번 포지에서 바로 갈아탈 수 있다. 최종 ${syncLabel} 무기로 재배선한다.`
            : `${core.description} 아직 보관 코어가 없어도 기본 등급으로 다시 맞춰 쓸 수 있다.`,
      slotText:
        benchCopies > 0
          ? build.coreId === coreId
            ? `현재 무기 강화 · x${benchCopies} 소모 · 최종 ${syncLabel}`
            : `보관분 소모 장착 · x${benchCopies} · 최종 ${syncLabel}`
          : directOffer
            ? directOfferText
            : `기본 장착 · 최종 ${syncLabel}`,
      coreId,
      benchCopies,
      resultingCopies,
      syncLevel,
      directOffer,
      pivotFuelCoreId: pivotFuelEntry ? pivotFuelEntry.coreId : null,
      pivotFuelCopies: pivotFuelEntry ? 1 : 0,
      cost: benchCopies > 0 && !directOffer ? discountedCost : Math.max(22, core.cost - 4),
    };
  }

  function markForgeLane(choice, laneLabel) {
    if (!choice) {
      return null;
    }
    return {
      ...choice,
      laneLabel,
    };
  }

  function markForgeContract(choice, contractRole, contractLabel) {
    if (!choice) {
      return null;
    }
    return {
      ...choice,
      contractRole,
      contractLabel,
    };
  }

  function pushChoiceIfOpen(list, choice, seenIds) {
    if (!choice || seenIds.has(choice.id)) {
      return;
    }
    seenIds.add(choice.id);
    list.push(choice);
  }

  function takeFirstAvailableChoice(candidates, takenIds, laneLabel) {
    for (const choice of candidates) {
      if (!choice || takenIds.has(choice.id)) {
        continue;
      }
      takenIds.add(choice.id);
      return markForgeLane(choice, laneLabel);
    }
    return null;
  }

  function createModChoice(modId) {
    const mod = MOD_DEFS[modId];
    return {
      type: "mod",
      id: `mod:${modId}`,
      verb: mod.verb || "강화",
      tag: mod.verb || "강화",
      title: mod.label,
      description: mod.description,
      slotText: `직접 성능 보강 · ${mod.tag}`,
      modId,
      cost: mod.cost,
    };
  }

  function createAffixChoice(affixId, build) {
    const affix = AFFIX_DEFS[affixId];
    const affixCapacity = getAffixCapacity(build);
    const currentAffixes = sanitizeAffixIds(build.affixes, affixCapacity);
    const willReplace = currentAffixes.length >= affixCapacity;
    const replaceTarget = willReplace ? currentAffixes[0] : null;
    const addingSlotText =
      affixCapacity >= 3 && currentAffixes.length === 2
        ? `세 번째 속성 추가 · ${affix.tag}`
        : `속성 추가 · ${affix.tag}`;
    return {
      type: "affix",
      id: `affix:${affixId}`,
      verb: "각인",
      tag: "각인",
      title: affix.label,
      description: willReplace
        ? `${affix.description} 현재 첫 속성 ${AFFIX_DEFS[replaceTarget].label} 대신 새 각인을 새긴다.`
        : affixCapacity >= 3 && currentAffixes.length === 2
          ? `${affix.description} 전설 등급 무기에 세 번째 속성을 추가한다.`
          : `${affix.description} 현재 무기에 새 속성을 추가한다.`,
      slotText: willReplace ? `속성 교체 · ${AFFIX_DEFS[replaceTarget].label} -> ${affix.label}` : addingSlotText,
      affixId,
      replaceTarget,
      cost: affix.cost,
    };
  }

  function markRecipeChoice(choice, build, recipe, step) {
    if (!choice || !recipe || !step) {
      return choice;
    }
    const baseDescription = choice.description || "";
    const detail =
      step.type === "core"
        ? `${recipe.label} 레시피의 첫 단계. ${recipe.summary}`
        : `${recipe.label} 레시피의 다음 조각. ${AFFIX_DEFS[step.affixId].label} 각인을 채워 완성형으로 수렴한다.`;
    return {
      ...choice,
      verb: "완성",
      tag: "FINISHER",
      title: step.title || choice.title,
      description: `${detail} ${baseDescription}`.trim(),
      slotText: `${recipe.label} · ${step.slotText || choice.slotText}`,
      recipeLabel: recipe.label,
      recipeStepType: step.type,
      recipeTargetId: step.type === "affix" ? step.affixId : build.coreId,
      consumesCatalyst: Boolean(step.requiresCatalyst),
    };
  }

  function createRecipeFinisherChoice(build, options = null) {
    if (!build || !FINISHER_RECIPE_DEFS[build.coreId]) {
      return null;
    }
    const recipe = FINISHER_RECIPE_DEFS[build.coreId];
    const currentAffixIds = sanitizeAffixIds(build.affixes, getAffixCapacity(build));
    const remainingAffixIds = getRemainingRecipeAffixIds(build, recipe, currentAffixIds);
    for (const step of recipe.steps) {
      if (step.type === "core") {
        if ((build.attunedCopies || 1) >= step.minCopies) {
          continue;
        }
        const coreChoice = createCoreChoice(build.coreId, build);
        const allowDirectCoreOffer = Boolean(options && options.allowDirectCoreOffer);
        if (coreChoice && (coreChoice.benchCopies > 0 || allowDirectCoreOffer)) {
          return markRecipeChoice(coreChoice, build, recipe, step);
        }
        return null;
      }
      if (step.type === "affix") {
        if (currentAffixIds.includes(step.affixId)) {
          continue;
        }
        if (
          remainingAffixIds.length === 1 &&
          remainingAffixIds[0] === step.affixId &&
          !hasFinisherCatalyst(build, build.coreId)
        ) {
          return null;
        }
        return markRecipeChoice(
          createAffixChoice(step.affixId, build),
          build,
          recipe,
          remainingAffixIds.length === 1 && remainingAffixIds[0] === step.affixId
            ? { ...step, requiresCatalyst: true }
            : step
        );
      }
    }
    return null;
  }

  function shouldGuaranteeMidrunChase(options) {
    if (!options || options.finalForge) {
      return false;
    }
    const nextWave = Number.isFinite(options.nextWave) ? options.nextWave : null;
    return nextWave >= 2 && nextWave <= 4;
  }

  function createGuaranteedChaseChoice(build) {
    if (!build) {
      return null;
    }
    const finisherChoice = createRecipeFinisherChoice(build, { allowDirectCoreOffer: true });
    if (finisherChoice) {
      return finisherChoice;
    }
    const recipe = FINISHER_RECIPE_DEFS[build.coreId];
    if (!recipe) {
      return createCoreChoice(build.coreId, build);
    }
    const currentAffixIds = sanitizeAffixIds(build.affixes, getAffixCapacity(build));
    const missingAffixIds = getRemainingRecipeAffixIds(build, recipe, currentAffixIds);
    for (const affixId of missingAffixIds) {
      const affixChoice = createAffixChoice(affixId, build);
      if (affixChoice && canApplyAffixChoice(build, affixId, affixChoice.replaceTarget)) {
        return markRecipeChoice(
          affixChoice,
          build,
          recipe,
          recipe.steps.find((step) => step.type === "affix" && step.affixId === affixId)
        );
      }
    }
    return createCoreChoice(build.coreId, build);
  }

  function createSupportSystemTierChoice(systemId, targetTier) {
    const system = SUPPORT_SYSTEM_DEFS[systemId];
    const tierDef = system && system.tiers[targetTier];
    if (!system || !tierDef) {
      return null;
    }
    return {
      type: "system",
      id: `system:${system.id}:t${targetTier}`,
      verb: targetTier > 1 ? "증설" : "설치",
      tag: system.tag || "SYSTEM",
      title: tierDef.title,
      description: tierDef.description,
      slotText:
        targetTier > 1 ? `기존 베이 증설 · ${tierDef.slotText}` : tierDef.slotText,
      systemId: system.id,
      systemTier: targetTier,
      bayAction: targetTier > 1 ? "upgrade" : "install",
      forgeLaneLabel: getSupportSystemForgeLane(system.id),
      cost: tierDef.cost,
    };
  }

  function createDoctrineChaseSystemChoice(build, doctrine, options = null) {
    if (!build || !doctrine) {
      return null;
    }
    const nextWave = options && Number.isFinite(options.nextWave) ? options.nextWave : 0;
    const installedSystems = getInstalledSupportSystems(build);
    const supportBayCap = getSupportBayCapacity(build);
    const installedMap = new Map(installedSystems.map((entry) => [entry.id, entry]));
    const preferredSystemIds = [
      doctrine.starterSystemId,
      ...(Array.isArray(doctrine.preferredSystemIds) ? doctrine.preferredSystemIds : []),
    ].filter(Boolean);
    for (const systemId of preferredSystemIds) {
      const installed = installedMap.get(systemId);
      if (installed && installed.tier < 2) {
        return createSupportSystemTierChoice(systemId, installed.tier + 1);
      }
      if (
        !installed &&
        installedSystems.length < supportBayCap &&
        isSupportSystemUnlocked(systemId, nextWave)
      ) {
        return createSupportSystemTierChoice(systemId, 1);
      }
    }
    return null;
  }

  function createDoctrineChaseWeaponChoice(build, doctrine, options = null) {
    if (!build || !doctrine || !doctrine.favoredCoreId || !CORE_DEFS[doctrine.favoredCoreId]) {
      return null;
    }
    if (build.coreId === doctrine.favoredCoreId) {
      const evolutionChoice = createWeaponEvolutionChoice(build, options);
      if (evolutionChoice && evolutionChoice.coreId === doctrine.favoredCoreId) {
        return evolutionChoice;
      }
      const reinforcementChoice = createCoreChoice(doctrine.favoredCoreId, build);
      if (
        reinforcementChoice &&
        reinforcementChoice.resultingCopies > Math.max(1, build.attunedCopies || 1)
      ) {
        return reinforcementChoice;
      }
    }
    return (
      createCoreChoice(doctrine.favoredCoreId, build, { directOffer: true }) ||
      createCoreChoice(doctrine.favoredCoreId, build)
    );
  }

  function shouldOfferDoctrineChase(build, options = null) {
    if (
      !build ||
      !build.bastionDoctrineId ||
      build.doctrineCapstoneId ||
      build.doctrineChaseClaimed ||
      build.doctrinePursuitCommitted ||
      !build.overcommitUnlocked ||
      !options ||
      options.finalForge
    ) {
      return false;
    }
    const nextWave = Number.isFinite(options.nextWave) ? options.nextWave : 0;
    return nextWave >= 4 && nextWave <= 8;
  }

  function shouldRunOvercommitTrial(build, waveNumber) {
    if (!build || !build.bastionDoctrineId || build.doctrineChaseClaimed || build.overcommitResolved) {
      return false;
    }
    return waveNumber === OVERCOMMIT_TRIAL_WAVE;
  }

  function createDoctrineChaseChoice(build, options = null) {
    if (!shouldOfferDoctrineChase(build, options)) {
      return null;
    }
    const doctrine = getBastionDoctrineDef(build);
    const capstoneLabel = getDoctrineLateCapstoneLabel(doctrine);
    const pursuit = getDoctrineForgePursuitDef(doctrine);
    if (!doctrine || !pursuit) {
      return null;
    }
    return {
      type: "utility",
      action: "doctrine_chase",
      id: `utility:doctrine_chase:${doctrine.id}`,
      verb: "계약",
      tag: "CHASE",
      title: pursuit.label,
      description:
        `${doctrine.label}의 장기 forge pursuit. ${pursuit.description}${capstoneLabel ? ` 완성에 성공하면 ${capstoneLabel} 계열 monster form이 즉시 잠겨 남은 전투를 그 형태로 바로 소모한다.` : ""}`,
      slotText: `Forge Pursuit 개시 · ${pursuit.goal} shards 필요 · Wave 6-8 marked elite`,
      cost: 0,
      laneLabel: "교리 추격",
      forgeLaneLabel: "교리 추격",
      doctrineId: doctrine.id,
      doctrineLabel: doctrine.label,
      doctrineCapstoneId: null,
      capstoneLabel: capstoneLabel,
      pursuitLabel: pursuit.label,
      pursuitGoal: pursuit.goal,
      pursuitShardLabel: pursuit.shardLabel,
    };
  }

  function createAffixReforgeChoice(build, rng) {
    const currentAffixes = sanitizeAffixIds(build.affixes, getAffixCapacity(build));
    if (currentAffixes.length === 0) {
      return null;
    }
    const random = typeof rng === "function" ? rng : Math.random;
    const targetId = currentAffixes[Math.floor(random() * currentAffixes.length)];
    const candidateIds = shuffle(
      Object.keys(AFFIX_DEFS).filter((affixId) => affixId !== targetId && !currentAffixes.includes(affixId)),
      random
    );
    const nextAffixId = candidateIds[0];
    if (!nextAffixId) {
      return null;
    }
    return {
      type: "utility",
      action: "affix_reforge",
      id: "utility:affix_reforge",
      verb: "재각인",
      tag: "재각인",
      title: "Signal Reforge",
      description: `${AFFIX_DEFS[targetId].label}를 ${AFFIX_DEFS[nextAffixId].label}(으)로 바꿔 무기 결을 튼다.`,
      slotText: `속성 재굴림 · ${AFFIX_DEFS[targetId].tag} -> ${AFFIX_DEFS[nextAffixId].tag}`,
      cost: 22,
      targetAffixId: targetId,
      nextAffixId,
    };
  }

  function getPendingCoreIds(build) {
    return getBenchEntries(build).map((entry) => entry.coreId);
  }

  function canReforgePendingCores(build) {
    return Array.isArray(build.pendingCores) && build.pendingCores.length > 0;
  }

  function rerollPendingCoreIds(build, rng) {
    const random = typeof rng === "function" ? rng : Math.random;
    const benchEntries = getBenchEntries(build);
    if (benchEntries.length === 0) {
      return [];
    }

    const next = [];
    for (const entry of benchEntries) {
      for (let copy = 0; copy < entry.copies; copy += 1) {
        const pool = shuffle(
          DROPPABLE_CORE_IDS.filter((coreId) => coreId !== entry.coreId),
          random
        );
        let nextCoreId = pool[0];
        for (const candidateId of pool) {
          if (
            next.filter((storedCoreId) => storedCoreId === candidateId).length <
            MAX_BENCH_COPIES_PER_CORE
          ) {
            nextCoreId = candidateId;
            break;
          }
        }
        next.push(nextCoreId);
      }
    }
    return sanitizeBenchCoreIds(next);
  }

  function createReforgeChoice(build, rng) {
    if (!canReforgePendingCores(build)) {
      return null;
    }
    const nextCoreIds = rerollPendingCoreIds(build, rng);
    const preview = summarizeBenchCoreIds(nextCoreIds);
    return {
      type: "utility",
      action: "reforge",
      id: "utility:flux_reforge",
      verb: "재구성",
      tag: "재구성",
      title: "Flux Reforge",
      description: `보관 코어 구성을 ${preview}(으)로 재조합한다. 현재 무기는 유지된다.`,
      slotText: "보관 코어 재조합",
      cost: 18,
      nextCoreIds,
    };
  }

  function createIllegalOverclockChoices(build) {
    if (!build || build.illegalOverclockId) {
      return [];
    }
    return Object.values(ILLEGAL_OVERCLOCK_DEFS).map((overclock) => ({
      type: "utility",
      action: "illegal_overclock",
      id: `utility:illegal_overclock:${overclock.id}`,
      verb: "과투입",
      tag: overclock.tag,
      title: overclock.title,
      description: overclock.description,
      slotText: overclock.slotText,
      cost: 0,
      illegalOverclockId: overclock.id,
      laneLabel: "불법 과투입",
      forgeLaneLabel: "불법 과투입",
    }));
  }

  function createIllegalOverclockMutationChoice(build) {
    if (!build || !build.illegalOverclockId) {
      return null;
    }
    const overclock = getIllegalOverclockDef(build);
    const currentLevel = getIllegalOverclockMutationLevel(build);
    if (!overclock || currentLevel >= MAX_ILLEGAL_OVERCLOCK_MUTATIONS) {
      return null;
    }
    const nextLevel = currentLevel + 1;
    return {
      type: "utility",
      action: "illegal_overclock_mutation",
      id: `utility:illegal_overclock_mutation:${overclock.id}:${nextLevel}`,
      verb: "변이",
      tag: getIllegalMutationTierLabel(nextLevel),
      title: `${overclock.title} ${getIllegalMutationTierLabel(nextLevel)}`,
      description:
        overclock.id === "glass_broadside"
          ? "측면 금지 포대를 더 증설해 broadside를 여러 줄로 벌린다. 대신 외피와 기동 여유를 더 찢어 hazard와 맞교환이 훨씬 위험해진다."
          : overclock.id === "meltdown_cycler"
            ? "찢어진 냉각 코일 사이에 추가 vent spur를 박아 발사 사이마다 불법 보조 사선을 뿜는다. 대신 냉각과 이동 제어가 더 무너진다."
            : "파열 crown을 다시 벌려 fan burst를 한 단계 더 넓힌다. 대신 냉각과 회피 여유를 더 뜯어내 오래 버티는 운영이 급격히 약해진다.",
      slotText:
        overclock.id === "glass_broadside"
          ? "추가 broadside 열 · 외피/기동 손실"
          : overclock.id === "meltdown_cycler"
            ? "vent spur 증설 · 냉각/기동 손실"
            : "확장 crown fan · 냉각/회피 손실",
      cost: 0,
      illegalOverclockId: overclock.id,
      mutationLevel: nextLevel,
      laneLabel: "Contraband Molt",
      forgeLaneLabel: "Contraband Molt",
    };
  }

  function createPredatorBaitChoice(build, nextWave) {
    if (
      !build ||
      !Number.isFinite(nextWave) ||
      nextWave < PREDATOR_BAIT_START_WAVE ||
      getApexMutationLevel(build) >= MAX_APEX_MUTATION_LEVEL
    ) {
      return null;
    }
    const nextLevel = getApexMutationLevel(build) + 1;
    return {
      type: "utility",
      action: "predator_bait",
      id: `utility:predator_bait:${nextWave}:${nextLevel}`,
      verb: "유인",
      tag: "MAW",
      title: `Predator Bait ${getApexMutationTierLabel(nextLevel)}`,
      description:
        "다음 웨이브 초반에 Cinder Maw를 강제로 끌어들여 body splice를 노린다. 대신 적 예산, active cap, hazard 강도가 전부 한 단계 더 올라 안전 운영이 크게 줄어든다.",
      slotText: "다음 웨이브 조기 apex hunt · 압박 증폭",
      cost: 0,
      laneLabel: "Predator Bait",
      forgeLaneLabel: "Predator Bait",
      nextApexLevel: nextLevel,
      nextWave,
    };
  }

  function createRiskMutationChoice(build, nextWave) {
    if (!build || !Number.isFinite(nextWave) || nextWave < RISK_MUTATION_START_WAVE) {
      return null;
    }
    const currentLevel = getRiskMutationLevel(build);
    if (currentLevel >= MAX_RISK_MUTATION_LEVEL) {
      return null;
    }
    const nextLevel = currentLevel + 1;
    const mutation = getRiskMutationCoreDef(build);
    return {
      type: "utility",
      action: "risk_mutation",
      id: `utility:risk_mutation:${build.coreId}:${nextLevel}:${nextWave}`,
      verb: "변이",
      tag: mutation.tag,
      title: `${mutation.title} ${getRiskMutationTierLabel(nextLevel)}`,
      description: `${
        mutation.description
      } ${
        !build.illegalOverclockId
          ? "첫 접합에서는 금지 성장선까지 자동으로 묶어 late reward를 한 개의 monster lane으로 고정한다. "
          : ""
      }다음 Wave ${nextWave}는 spawn budget, active cap, hazard count가 함께 오른다.`,
      slotText: `${mutation.slotText}${!build.illegalOverclockId ? " · contraband splice 동봉" : ""} · Wave ${nextWave} 압박세`,
      cost: 0,
      laneLabel: "Dominant Mutation",
      forgeLaneLabel: "Dominant Mutation",
      riskMutationLevel: nextLevel,
      riskMutationWave: nextWave,
    };
  }

  function createDominantMutationChoice(build, nextWave) {
    const riskMutationChoice = createRiskMutationChoice(build, nextWave);
    if (riskMutationChoice) {
      return riskMutationChoice;
    }
    return createPredatorBaitChoice(build, nextWave);
  }

  function createCatalystReforgeChoice(build) {
    if (!build || !hasFinisherCatalyst(build, build.coreId)) {
      return null;
    }
    const capstone = CATALYST_REFORGE_DEFS[build.coreId];
    const recipe = FINISHER_RECIPE_DEFS[build.coreId];
    if (!capstone || !recipe) {
      return null;
    }
    return {
      type: "utility",
      action: "catalyst_reforge",
      id: `utility:catalyst_reforge:${build.coreId}`,
      verb: "재구성",
      tag: "CAPSTONE",
      title: capstone.title,
      description: `${capstone.description} 현재 속성과 코어는 유지되지만 촉매는 소모된다.`,
      slotText: capstone.slotText,
      cost: 30,
      capstoneLabel: capstone.label,
      recipeLabel: recipe.label,
      catalystCoreId: build.coreId,
    };
  }

  function createCashoutSupportChoice(build, options = null) {
    if (!build) {
      return null;
    }
    const support = FINAL_CASHOUT_SUPPORT_DEFS[build.coreId];
    const recipe = FINISHER_RECIPE_DEFS[build.coreId];
    if (!support || !recipe) {
      return null;
    }
    const hasCatalyst = hasFinisherCatalyst(build, build.coreId);
    const allowWithoutCatalyst = Boolean(options && options.allowWithoutCatalyst);
    if (!hasCatalyst && !allowWithoutCatalyst) {
      return null;
    }
    const failSoft = !hasCatalyst;
    const costOverride = options && Number.isFinite(options.costOverride) ? options.costOverride : null;
    return {
      type: "utility",
      action: "cashout_support",
      id: `utility:cashout_support:${build.coreId}`,
      verb: "안정화",
      tag: "TRIAL",
      title: support.title,
      description: failSoft
        ? `${support.description} 촉매가 없어도 예비 회로를 열어 fail-soft cash-out으로 진입한다.`
        : `${support.description} 현재 코어는 유지되지만 촉매는 소모된다.`,
      slotText: failSoft ? `fail-soft 진입 · ${support.slotText}` : support.slotText,
      cost: costOverride ?? 28,
      supportLabel: support.label,
      recipeLabel: recipe.label,
      supportCoreId: build.coreId,
      failSoft,
    };
  }

  function createFailSoftOverrideChoice(build) {
    if (!build || hasFinisherCatalyst(build, build.coreId)) {
      return null;
    }
    const failSoft = FINAL_CASHOUT_FAILSOFT_DEFS[build.coreId];
    if (!failSoft) {
      return null;
    }
    return {
      type: "utility",
      action: "cashout_failsoft",
      id: `utility:cashout_failsoft:${build.coreId}`,
      verb: "점화",
      tag: "FAIL-SOFT",
      title: failSoft.title,
      description: `${failSoft.description} 촉매 없이도 다른 cash-out 시험으로 판돈을 건다.`,
      slotText: failSoft.slotText,
      cost: failSoft.cost,
      failSoftLabel: failSoft.label,
      supportCoreId: build.coreId,
      failSoft: true,
    };
  }

  function getFinalCashoutPreview(overrides = null) {
    const wave = createFinalCashoutWave(
      MAX_WAVES - 1,
      overrides
        ? {
            catalystCapstoneId: overrides.catalystCapstoneId || null,
            cashoutSupportId: overrides.cashoutSupportId || null,
            cashoutFailSoftId: overrides.cashoutFailSoftId || null,
          }
        : null
    );
    return {
      label: wave.bannerLabel || wave.label,
      directive: wave.directive,
      hazard: wave.hazard ? `${wave.hazard.label} x${wave.hazard.count}` : "Hazard 없음",
      tempo: `${POST_CAPSTONE_WAVE_COUNT}연전 시작 · 적 상한 ${wave.activeCap}`,
    };
  }

  function annotateFinaleChoice(choice, preview, overrides = {}) {
    if (!choice) {
      return null;
    }
    return {
      ...choice,
      ...overrides,
      finalePreview: preview,
    };
  }

  function buildFinalForgeChoices(build) {
    const capstone = CATALYST_REFORGE_DEFS[build.coreId];
    const support = FINAL_CASHOUT_SUPPORT_DEFS[build.coreId];
    const failSoftOverride = FINAL_CASHOUT_FAILSOFT_DEFS[build.coreId];
    if (!capstone || !support) {
      return null;
    }
    const stabilizeChoice = annotateFinaleChoice(
      createCashoutSupportChoice(build, { allowWithoutCatalyst: true, costOverride: 0 }),
      getFinalCashoutPreview({ cashoutSupportId: support.id })
    );
    if (!stabilizeChoice) {
      return null;
    }
    const choices = [];
    const finisherChoice = createRecipeFinisherChoice(build);
    if (finisherChoice) {
      choices.push(
        markForgeLane(annotateFinaleChoice(finisherChoice, getFinalCashoutPreview()), "완성")
      );
    }
    const catalystChoice = createCatalystReforgeChoice(build);
    if (catalystChoice) {
      choices.push(
        markForgeLane(
          annotateFinaleChoice(
            catalystChoice,
            getFinalCashoutPreview({ catalystCapstoneId: capstone.id })
          ),
          "촉매 연소"
        )
      );
    }
    const failSoftChoice = createFailSoftOverrideChoice(build);
    if (failSoftChoice && failSoftOverride) {
      choices.push(
        markForgeLane(
          annotateFinaleChoice(
            failSoftChoice,
            getFinalCashoutPreview({ cashoutFailSoftId: failSoftOverride.id })
          ),
          "비상 점화"
        )
      );
    }
    choices.push(markForgeLane(stabilizeChoice, "안정화"));
    return choices;
  }

  function shouldOfferFinaleMutation(build) {
    return Boolean(build && !getSelectedFinaleVariant(build));
  }

  function buildFinaleMutationChoices(build) {
    if (!shouldOfferFinaleMutation(build)) {
      return [];
    }
    return (buildFinalForgeChoices(build) || []).map((choice) => ({
      ...choice,
      cost: 0,
      slotText: `Act 4 live splice · ${choice.slotText}`,
      description: `${
        choice.description
      } 마지막 포지 정지 대신 Afterburn elite breach에서 회수해야 남은 escalation이 이 splice로 굳는다.`,
    }));
  }

  function buildActBreakArmoryChoices(build, rng, scrapBank, options = null, excludedChoiceIds = null) {
    if (!build) {
      return [];
    }
    const random = typeof rng === "function" ? rng : Math.random;
    const excludedIds = new Set(
      excludedChoiceIds instanceof Set
        ? Array.from(excludedChoiceIds)
        : Array.isArray(excludedChoiceIds)
          ? excludedChoiceIds
          : []
    );
    const choiceCatalog = new Set(excludedIds);
    const evolutionCandidates = [];
    const offensiveSpikeCandidates = [];
    const offensiveModuleCandidates = [];
    const subsystemCandidates = [];
    const chassisCandidates = [];
    const doctrineCapstoneChoices = createDoctrineCapstoneChoices(build, options);
    const supportSystemChoices = shouldOfferSupportSystem(build, options)
      ? createSupportSystemChoices(build, random, options)
      : [];
    const lateBreakTriadChoices = isLateBreakArmory(options)
      ? [
          createLateBreakMutationChoice(build, options && options.nextWave),
          createLateBreakAegisChoice(build, options && options.nextWave),
          createLateBreakGreedContractChoice(build, options && options.nextWave),
        ].filter(Boolean)
      : [];
    if (isLateBreakArmory(options)) {
      return lateBreakTriadChoices;
    }
    const currentAffixIds = sanitizeAffixIds(build.affixes, getAffixCapacity(build));
    const offensiveModChoices = shuffle(
      ["shock_lens", "pulse_gate", "arc_array", "rail_sleeve"]
        .filter((modId) => MOD_DEFS[modId])
        .map((modId) => createModChoice(modId)),
      random
    );
    const currentCoreChoice = createCoreChoice(build.coreId, build);
    const finisherChoice = createRecipeFinisherChoice(build);
    const chassisAffixChoices = [
      "thermal_weave",
      "salvage_link",
    ]
      .filter((affixId) => !currentAffixIds.includes(affixId))
      .map((affixId) => createAffixChoice(affixId, build))
      .filter((choice) => choice && canApplyAffixChoice(build, choice.affixId, choice.replaceTarget));

    pushChoiceIfOpen(evolutionCandidates, createWeaponEvolutionChoice(build, options), choiceCatalog);
    doctrineCapstoneChoices.forEach((choice) => {
      pushChoiceIfOpen(offensiveSpikeCandidates, choice, choiceCatalog);
    });
    pushChoiceIfOpen(offensiveSpikeCandidates, finisherChoice, choiceCatalog);
    if (currentCoreChoice && currentCoreChoice.benchCopies > 0) {
      pushChoiceIfOpen(offensiveSpikeCandidates, currentCoreChoice, choiceCatalog);
    }
    offensiveModChoices.forEach((choice) => {
      pushChoiceIfOpen(offensiveSpikeCandidates, choice, choiceCatalog);
    });
    supportSystemChoices.forEach((choice) => {
      if (choice.forgeLaneLabel === "공세 모듈") {
        pushChoiceIfOpen(offensiveModuleCandidates, choice, choiceCatalog);
      } else {
        pushChoiceIfOpen(subsystemCandidates, choice, choiceCatalog);
      }
    });
    shuffle(
      ACT_BREAK_CHASSIS_MOD_IDS.filter((modId) => MOD_DEFS[modId]).map((modId) => createModChoice(modId)),
      random
    ).forEach((choice) => {
      pushChoiceIfOpen(chassisCandidates, choice, choiceCatalog);
    });
    shuffle(chassisAffixChoices, random).forEach((choice) => {
      pushChoiceIfOpen(chassisCandidates, choice, choiceCatalog);
    });

    const takeArmoryChoice = (candidates, takenIds, laneLabel) => {
      for (const choice of candidates) {
        if (!choice || takenIds.has(choice.id)) {
          continue;
        }
        takenIds.add(choice.id);
        return markForgeLane(choice, choice.laneLabel === "Doctrine Apex" ? choice.laneLabel : laneLabel);
      }
      return null;
    };
    const choices = [];
    const takenIds = new Set(excludedIds);
    const primarySpikePool = [...evolutionCandidates, ...offensiveModuleCandidates, ...offensiveSpikeCandidates];
    const hedgePool = [...subsystemCandidates, ...chassisCandidates];
    const flexPool = [...primarySpikePool, ...hedgePool];
    lateBreakTriadChoices.forEach((choice) => {
      if (!choice || takenIds.has(choice.id)) {
        return;
      }
      takenIds.add(choice.id);
      choices.push(choice);
    });
    if (isLateBreakArmory(options) && doctrineCapstoneChoices.length > 0) {
      const apexChoice = doctrineCapstoneChoices[0];
      if (apexChoice && !takenIds.has(apexChoice.id)) {
        takenIds.add(apexChoice.id);
        choices.push(markForgeLane(apexChoice, apexChoice.laneLabel || "Doctrine Apex"));
      }
    }
    [
      takeArmoryChoice(evolutionCandidates, takenIds, "주무장 진화"),
      takeArmoryChoice(offensiveModuleCandidates, takenIds, "공세 모듈"),
      takeArmoryChoice(primarySpikePool, takenIds, "대형 화력"),
      takeArmoryChoice(primarySpikePool, takenIds, "대형 화력"),
      takeArmoryChoice(hedgePool, takenIds, "방호/유틸 차체"),
    ]
      .filter(Boolean)
      .forEach((choice) => choices.push(choice));

    const extraChoicePool = flexPool;
    for (const choice of extraChoicePool) {
      if (choices.length >= ACT_BREAK_ARMORY_MAX_CHOICES) {
        break;
      }
      if (!choice || takenIds.has(choice.id)) {
        continue;
      }
      takenIds.add(choice.id);
      choices.push(
        markForgeLane(
          choice,
          choice.type === "evolution"
              ? "주무장 진화"
              : choice.type === "system"
                ? choice.forgeLaneLabel || "보조 시스템"
                : choice.action === "doctrine_capstone"
                  ? "Doctrine Apex"
                : choice.type === "core" || choice.type === "affix"
                  ? "대형 화력"
                  : hedgePool.includes(choice)
                    ? "방호/유틸 차체"
                    : "대형 화력"
        )
      );
    }

    if (
      Number.isFinite(scrapBank) &&
      choices.length > 0 &&
      choices.every((choice) => choice.cost > scrapBank)
    ) {
      choices[choices.length - 1] = markForgeLane(
        {
          type: "fallback",
          id: "fallback:emergency_vent",
          tag: "무료",
          title: "Emergency Vent",
          description: "Armory draft가 전부 너무 비싸 무료 안정화 카드 1장을 끼워 넣는다.",
          slotText: "비상 안정화",
          cost: 0,
        },
        "방호/유틸 차체"
      );
    }

    return shuffle(choices.slice(0, ACT_BREAK_ARMORY_MAX_CHOICES), random);
  }

  function buildCompactActBreakCacheChoices(build, rng, scrapBank) {
    const random = typeof rng === "function" ? rng : Math.random;
    const armoryChoices = buildActBreakArmoryChoices(
      build,
      random,
      scrapBank,
      { nextWave: ACT_BREAK_ARMORY_WAVE, finalForge: false }
    );
    if (armoryChoices.length <= 3) {
      return armoryChoices.slice(0, 3);
    }
    const picks = [];
    const pickedIds = new Set();
    const laneGroups = [
      ["주무장 진화", "대형 화력"],
      ["공세 모듈", "방호/유틸 차체", "보조 시스템"],
    ];
    laneGroups.forEach((labels) => {
      const match = armoryChoices.find(
        (choice) => choice && !pickedIds.has(choice.id) && labels.includes(choice.laneLabel)
      );
      if (match) {
        pickedIds.add(match.id);
        picks.push(match);
      }
    });
    armoryChoices.forEach((choice) => {
      if (!choice || pickedIds.has(choice.id) || picks.length >= 3) {
        return;
      }
      pickedIds.add(choice.id);
      picks.push(choice);
    });
    return picks.slice(0, 3);
  }

  function getRecycleValue(build) {
    return sanitizeBenchCoreIds(build.pendingCores).reduce(
      (total, coreId) => total + Math.max(10, Math.round(CORE_DEFS[coreId].cost * 0.35)),
      0
    );
  }

  function createRecycleChoice(build) {
    const pending = sanitizeBenchCoreIds(build.pendingCores);
    if (pending.length === 0) {
      return null;
    }
    const scrapValue = getRecycleValue(build);
    return {
      type: "utility",
      action: "recycle",
      id: "utility:scrap_reclaimer",
      verb: "분해",
      tag: "분해",
      title: "고철 회수",
      description: `보관 코어 ${pending.length}개를 분해해 고철 +${scrapValue}를 얻고 열을 식힌다.`,
      slotText: "보관 코어 분해",
      cost: 0,
      scrapValue,
    };
  }

  function buildForgeChoices(build, rng, scrapBank, options = null) {
    if (options && options.finalForge) {
      const finalChoices = buildFinalForgeChoices(build);
      if (finalChoices) {
        return finalChoices;
      }
    }
    if (shouldRunActBreakArmory(options)) {
      return buildActBreakArmoryChoices(build, rng, scrapBank, options);
    }
    const random = typeof rng === "function" ? rng : Math.random;
    const pending = getPendingCoreIds(build);
    const choiceCatalog = new Set();
    const evolutionCandidates = [];
    const commitCandidates = [];
    const pivotCandidates = [];
    const offensiveModuleCandidates = [];
    const subsystemCandidates = [];
    const sustainCandidates = [];
    const gambleCandidates = [];
    const currentAffixIds = sanitizeAffixIds(build.affixes, getAffixCapacity(build));
    const nextWave = options && Number.isFinite(options.nextWave) ? options.nextWave : 0;
    const catalystReforgeChoice = createCatalystReforgeChoice(build);
    const recycleChoice = createRecycleChoice(build);
    const reforgeChoice = catalystReforgeChoice || createReforgeChoice(build, random);
    const affixReforgeChoice = createAffixReforgeChoice(build, random);
    const finisherChoice = createRecipeFinisherChoice(build);
    const weaponEvolutionChoice = createWeaponEvolutionChoice(build, options);
    const doctrineChaseChoice = createDoctrineChaseChoice(build, options);
    const wildcardChoice = createWildcardProtocolChoice(build, nextWave);
    const greedContractChoice = createFieldGreedContractChoice(build, nextWave);
    const supportSystemChoices = shouldOfferSupportSystem(build, options)
      ? createSupportSystemChoices(build, random, options)
      : [];
    const doctrine = build && build.bastionDoctrineId ? getBastionDoctrineDef(build) : null;
    const guaranteedMidrunChase = shouldGuaranteeMidrunChase(options)
      ? createGuaranteedChaseChoice(build)
      : null;
    const packagePrimary = shouldForceForgePackage(options) && (options.packageStep || 1) === 1;
    pushChoiceIfOpen(evolutionCandidates, weaponEvolutionChoice, choiceCatalog);
    pushChoiceIfOpen(commitCandidates, doctrineChaseChoice, choiceCatalog);
    pushChoiceIfOpen(commitCandidates, guaranteedMidrunChase || finisherChoice, choiceCatalog);
    pushChoiceIfOpen(gambleCandidates, wildcardChoice, choiceCatalog);
    pushChoiceIfOpen(gambleCandidates, greedContractChoice, choiceCatalog);
    pushChoiceIfOpen(gambleCandidates, recycleChoice, choiceCatalog);
    pushChoiceIfOpen(gambleCandidates, reforgeChoice, choiceCatalog);
    pushChoiceIfOpen(gambleCandidates, affixReforgeChoice, choiceCatalog);

    const sameCoreChoice = createCoreChoice(build.coreId, build);
    if (sameCoreChoice.benchCopies > 0) {
      pushChoiceIfOpen(commitCandidates, sameCoreChoice, choiceCatalog);
    }

    shuffle(
      Object.keys(AFFIX_DEFS)
        .filter(
          (affixId) =>
            !currentAffixIds.includes(affixId) && doctrineAllowsAffixChoice(build, affixId)
        )
        .map((affixId) => createAffixChoice(affixId, build))
        .filter((choice) => choice && canApplyAffixChoice(build, choice.affixId, choice.replaceTarget)),
      random
    ).forEach((choice) => {
      pushChoiceIfOpen(commitCandidates, choice, choiceCatalog);
    });

    shuffle(
      ["shock_lens", "pulse_gate", "arc_array", "rail_sleeve", "drive_sync", "heat_sink", "reactor_cap"]
        .filter((modId) => MOD_DEFS[modId] && doctrineAllowsModChoice(build, modId))
        .map((modId) => createModChoice(modId)),
      random
    ).forEach((choice) => {
      pushChoiceIfOpen(commitCandidates, choice, choiceCatalog);
    });

    shuffle(uniqueCoreQueue(pending.filter((coreId) => coreId !== build.coreId)), random)
      .map((coreId) => createCoreChoice(coreId, build))
      .forEach((choice) => {
        pushChoiceIfOpen(pivotCandidates, choice, choiceCatalog);
      });

    shuffle(DROPPABLE_CORE_IDS.filter((coreId) => coreId !== build.coreId), random)
      .map((coreId) => createCoreChoice(coreId, build, { directOffer: true }))
      .forEach((choice) => {
        pushChoiceIfOpen(pivotCandidates, choice, choiceCatalog);
      });

    supportSystemChoices.forEach((choice) => {
      if (choice.forgeLaneLabel === "공세 모듈") {
        pushChoiceIfOpen(offensiveModuleCandidates, choice, choiceCatalog);
      } else {
        pushChoiceIfOpen(subsystemCandidates, choice, choiceCatalog);
      }
    });

    [createModChoice("coolant_purge"), createModChoice("magnet_rig"), createModChoice("armor_mesh"), createModChoice("step_servos")]
      .filter(Boolean)
      .forEach((choice) => pushChoiceIfOpen(sustainCandidates, choice, choiceCatalog));

    shuffle(
      ["thermal_weave", "salvage_link"]
        .filter(
          (affixId) =>
            !currentAffixIds.includes(affixId) && doctrineAllowsAffixChoice(build, affixId)
        )
        .map((affixId) => createAffixChoice(affixId, build))
        .filter((choice) => choice && canApplyAffixChoice(build, choice.affixId, choice.replaceTarget)),
      random
    ).forEach((choice) => pushChoiceIfOpen(sustainCandidates, choice, choiceCatalog));

    sortChoicesForDoctrine(evolutionCandidates, doctrine);
    sortChoicesForDoctrine(commitCandidates, doctrine);
    sortChoicesForDoctrine(offensiveModuleCandidates, doctrine);
    sortChoicesForDoctrine(subsystemCandidates, doctrine);
    sortChoicesForDoctrine(sustainCandidates, doctrine);

    if (sustainCandidates.length === 0) {
      sustainCandidates.push({
        type: "fallback",
        id: "fallback:emergency_vent",
        tag: "무료",
        title: "Emergency Vent",
        description: "무료 안정화. 열을 크게 빼고 체력을 조금 회복한다.",
        slotText: "무료 정비",
        cost: 0,
      });
    }

    if (packagePrimary) {
      const choices = [];
      const takenIds = new Set();
      const primaryChoices = [
        takeFirstAvailableChoice(evolutionCandidates, takenIds, "주무장 진화"),
        takeFirstAvailableChoice(commitCandidates, takenIds, "빌드 고정"),
        takeFirstAvailableChoice(pivotCandidates, takenIds, "전환"),
      ].filter(Boolean);
      choices.push(...primaryChoices);
      const extraPrimaryPool = [...evolutionCandidates, ...commitCandidates, ...pivotCandidates];
      for (const choice of extraPrimaryPool) {
        if (choices.length >= 3) {
          break;
        }
        if (!choice || takenIds.has(choice.id)) {
          continue;
        }
        takenIds.add(choice.id);
        choices.push(markForgeLane(choice, choice.type === "core" ? "전환" : "빌드 고정"));
      }
      if (
        Number.isFinite(scrapBank) &&
        choices.length > 0 &&
        choices.every((choice) => choice.cost > scrapBank)
      ) {
        choices[choices.length - 1] = markForgeLane({
          type: "fallback",
          id: "fallback:emergency_vent",
          tag: "무료",
          title: "Emergency Vent",
          description: "패키지 첫 슬롯이 모두 너무 비싸 무료 안정화 1장을 끼워 넣는다.",
          slotText: "패키지 보정",
          cost: 0,
        }, "생존/경제");
      }
      return shuffle(choices.slice(0, 3), random);
    }

    if (shouldForceForgePackage(options) && (options.packageStep || 1) === 2) {
      const choices = [];
      const takenIds = new Set();
      const secondaryChoices = [
        takeFirstAvailableChoice(offensiveModuleCandidates, takenIds, "공세 모듈"),
        takeFirstAvailableChoice(subsystemCandidates, takenIds, "보조 시스템"),
        takeFirstAvailableChoice(sustainCandidates, takenIds, "생존/경제"),
      ].filter(Boolean);
      choices.push(...secondaryChoices);
      const extraSecondaryPool = [
        ...offensiveModuleCandidates,
        ...subsystemCandidates,
        ...sustainCandidates,
      ];
      for (const choice of extraSecondaryPool) {
        if (choices.length >= 3) {
          break;
        }
        if (!choice || takenIds.has(choice.id)) {
          continue;
        }
        takenIds.add(choice.id);
        choices.push(
          markForgeLane(
            choice,
            choice.type === "system"
              ? choice.forgeLaneLabel || "보조 시스템"
              : "생존/경제"
          )
        );
      }
      if (
        Number.isFinite(scrapBank) &&
        choices.length > 0 &&
        choices.every((choice) => choice.cost > scrapBank)
      ) {
        choices[choices.length - 1] = markForgeLane({
          type: "fallback",
          id: "fallback:emergency_vent",
          tag: "무료",
          title: "Emergency Vent",
          description: "패키지 마감 슬롯이 모두 너무 비싸 무료 안정화로 마감한다.",
          slotText: "패키지 보정",
          cost: 0,
        }, "생존/경제");
      }
      return shuffle(choices.slice(0, 3), random);
    }

    const takenIds = new Set();
    const choices = [
      markForgeContract(
        takeFirstAvailableChoice(
          [
            ...evolutionCandidates,
            ...commitCandidates,
            ...offensiveModuleCandidates,
            ...pivotCandidates,
          ],
          takenIds,
          "주력 변신"
        ),
        "headline",
        "Headline Mutation"
      ),
      markForgeContract(
        takeFirstAvailableChoice(
          [...subsystemCandidates, ...sustainCandidates],
          takenIds,
          "보조/방호"
        ),
        "rider",
        "Support / Defense Rider"
      ),
      markForgeContract(
        takeFirstAvailableChoice(
          [
            ...gambleCandidates,
            ...pivotCandidates,
            ...sustainCandidates,
            ...offensiveModuleCandidates,
          ],
          takenIds,
          "탐욕/유틸"
        ),
        "gamble",
        "Greed / Utility Gamble"
      ),
    ].filter(Boolean);

    [
      ["headline", "Headline Mutation", "주력 변신"],
      ["rider", "Support / Defense Rider", "보조/방호"],
      ["gamble", "Greed / Utility Gamble", "탐욕/유틸"],
    ]
      .filter(([role]) => !choices.some((choice) => choice.contractRole === role))
      .forEach(([role, label, laneLabel], index) => {
        choices.push(
          markForgeContract(
            markForgeLane(
              {
                type: "fallback",
                id: `fallback:contract_fill:${nextWave}:${role}:${index}`,
                tag: "VENT",
                title: "Emergency Vent",
                description: "빈 계약 슬롯은 무료 안정화로 대체해 다음 웨이브 진입 각만 정리한다.",
                slotText: "무료 정비",
                cost: 0,
              },
              laneLabel
            ),
            role,
            label
          )
        );
      });

    if (
      Number.isFinite(scrapBank) &&
      choices.length > 0 &&
      choices.every((choice) => choice.cost > scrapBank)
    ) {
      choices[choices.length - 1] = markForgeContract(
        markForgeLane(
          {
            type: "fallback",
            id: "fallback:emergency_vent",
            tag: "무료",
            title: "Emergency Vent",
            description: "세 계약이 전부 너무 비싸 무료 안정화 카드 1장을 끼워 넣는다.",
            slotText: "무료 정비",
            cost: 0,
          },
          "탐욕/유틸"
        ),
        "gamble",
        "Greed / Utility Gamble"
      );
    }

    return choices.slice(0, 3);
  }

  function shouldOpenForgePackage(run, choice) {
    if (!run || !choice || run.pendingFinalForge) {
      return false;
    }
    const nextWave = Number.isFinite(run.waveIndex) ? run.waveIndex + 2 : 0;
    if (nextWave === LATE_BREAK_ARMORY_WAVE) {
      return false;
    }
    return nextWave >= FORGE_PACKAGE_START_WAVE;
  }

  function isEligibleFieldGrantChoice(choice) {
    if (!choice) {
      return false;
    }
    if (choice.type === "utility" && choice.action === "risk_mutation") {
      return true;
    }
    if (choice.type === "fallback") {
      return true;
    }
    if (choice.type === "utility" && choice.action === "predator_bait") {
      return true;
    }
    if (!["evolution", "system", "affix", "mod"].includes(choice.type)) {
      return false;
    }
    return Number.isFinite(choice.cost) ? choice.cost <= FIELD_GRANT_MAX_COST : false;
  }

  function scoreFieldGrantChoice(choice) {
    if (!choice) {
      return -1;
    }
    if (choice.type === "utility" && choice.action === "risk_mutation") {
      return 560 + ((choice.riskMutationLevel || 1) * 14);
    }
    if (choice.type === "evolution") {
      return 500 + (choice.evolutionTier || 0) * 10;
    }
    if (choice.type === "system") {
      const laneBonus = choice.forgeLaneLabel === "공세 모듈" ? 40 : 20;
      return 420 + laneBonus + (choice.systemTier || 0) * 8;
    }
    if (choice.type === "affix") {
      return 320;
    }
    if (choice.type === "mod") {
      const offensiveBonus = ["shock_lens", "pulse_gate", "arc_array", "rail_sleeve"].includes(choice.modId)
        ? 30
        : 0;
      return 260 + offensiveBonus;
    }
    if (choice.type === "fallback") {
      return 20;
    }
    if (choice.type === "utility" && choice.action === "predator_bait") {
      return 470 + ((choice.nextApexLevel || 1) * 12);
    }
    return 0;
  }

  function getFieldGrantChoiceBucket(choice) {
    if (!choice) {
      return "fallback";
    }
    if (choice.type === "utility" && choice.action === "field_convergence") {
      return "field_convergence";
    }
    if (choice.type === "utility" && choice.action === "risk_mutation") {
      return "risk_mutation";
    }
    if (choice.type === "system") {
      return choice.forgeLaneLabel || "system";
    }
    if (choice.type === "evolution") {
      return `evolution:${choice.coreId || "active"}`;
    }
    if (choice.type === "affix") {
      return "affix";
    }
    if (choice.type === "mod") {
      return choice.modId || "mod";
    }
    if (choice.type === "utility" && choice.action === "predator_bait") {
      return "predator_bait";
    }
    return choice.type || "choice";
  }

  function isFieldGrantSurvivalChoice(choice) {
    if (!choice) {
      return false;
    }
    if (choice.type === "fallback") {
      return true;
    }
    if (choice.type === "system") {
      return choice.forgeLaneLabel !== "공세 모듈";
    }
    if (choice.type === "affix") {
      return ["thermal_weave", "salvage_link"].includes(choice.affixId);
    }
    if (choice.type === "mod") {
      return ["coolant_purge", "magnet_rig", "armor_mesh", "step_servos"].includes(choice.modId);
    }
    return false;
  }

  function getFieldGrantLaneLabel(choice) {
    if (!choice) {
      return "Field Cache";
    }
    if (choice.type === "system" && choice.fieldGrantHighlight === "autonomous_arsenal") {
      return "Autonomous Arsenal";
    }
    if (choice.type === "utility" && choice.action === "field_convergence") {
      return "Convergence Form";
    }
    if (choice.type === "utility" && choice.action === "wildcard_protocol") {
      return "Wildcard Protocol";
    }
    if (
      choice.type === "evolution" ||
      (choice.type === "utility" && (choice.action === "risk_mutation" || choice.action === "predator_bait"))
    ) {
      return "Main Weapon Mutation";
    }
    if (choice.type === "utility" && choice.action === "field_greed") {
      return "Greed Contract";
    }
    if (isFieldGrantSurvivalChoice(choice)) {
      return "Defense / Utility";
    }
    return choice.laneLabel || "Field Cache";
  }

  function scoreFieldGrantDefenseChoice(choice) {
    if (!choice) {
      return -1;
    }
    if (choice.type === "system") {
      const installBonus = choice.bayAction === "install" ? 180 : 110;
      const visualBonus =
        choice.systemId === "aegis_halo"
          ? 52
          : choice.systemId === "ember_ring"
            ? 44
            : choice.systemId === "kiln_sentry"
              ? 38
              : 24;
      return 900 + installBonus + visualBonus + (choice.systemTier || 1) * 10;
    }
    if (choice.type === "affix") {
      return choice.affixId === "thermal_weave" ? 250 : 220;
    }
    if (choice.type === "mod") {
      return choice.modId === "armor_mesh"
        ? 210
        : choice.modId === "step_servos"
          ? 190
          : choice.modId === "coolant_purge"
            ? 180
            : choice.modId === "magnet_rig"
              ? 170
              : 120;
    }
    if (choice.type === "fallback") {
      return 0;
    }
    return -1;
  }

  function createFieldGrantDefenseChoice(build, rng, nextWave, fallbackPool = []) {
    const random = typeof rng === "function" ? rng : Math.random;
    const visibleDefenseChoices = createSupportSystemChoices(build, random, {
      nextWave,
      finalForge: false,
    })
      .filter((choice) => choice && isFieldGrantSurvivalChoice(choice))
      .sort((left, right) => scoreFieldGrantDefenseChoice(right) - scoreFieldGrantDefenseChoice(left));
    if (visibleDefenseChoices.length > 0) {
      return visibleDefenseChoices[0];
    }
    return fallbackPool.find((choice) => choice && isFieldGrantSurvivalChoice(choice)) || null;
  }

  function scoreLateFieldSystemChoice(choice) {
    if (!choice || choice.type !== "system") {
      return -1;
    }
    const installBonus = choice.bayAction === "install" ? 110 : 64;
    const familyBonus =
      choice.systemId === "seeker_array"
        ? 96
        : choice.systemId === "volt_drones"
          ? 88
          : choice.systemId === "ember_ring"
            ? 74
            : choice.systemId === "kiln_sentry"
              ? 68
              : 20;
    return 780 + installBonus + familyBonus + (choice.systemTier || 1) * 12;
  }

  function createLateFieldSystemChoice(build, rng, nextWave) {
    const random = typeof rng === "function" ? rng : Math.random;
    return (
      createSupportSystemChoices(build, random, {
        nextWave,
        finalForge: false,
      })
        .filter(
          (choice) =>
            choice &&
            choice.type === "system" &&
            choice.systemId !== "aegis_halo" &&
            (choice.forgeLaneLabel === "공세 모듈" ||
              choice.systemId === "ember_ring" ||
              choice.systemId === "kiln_sentry")
        )
        .sort((left, right) => scoreLateFieldSystemChoice(right) - scoreLateFieldSystemChoice(left))
        .map((choice) => ({
          ...choice,
          fieldGrantHighlight: "autonomous_arsenal",
          description: `${choice.description} late cache에서는 주포/방호/탐욕과 같은 급의 autonomous branch payoff로 취급되어, 다음 bracket부터 미사일 랙·드론·오비탈·포탑 실루엣이 바로 붙는다.`,
          slotText:
            choice.bayAction === "install"
              ? `late support branch · ${choice.slotText}`
              : `late support overdrive · ${choice.slotText}`,
        }))[0] || null
    );
  }

  function createFieldGrantCard(choice) {
    if (!choice) {
      return null;
    }
    const originalCost = Math.max(0, choice.cost || 0);
    const fieldGrantCost =
      choice.type === "fallback" ||
      (choice.type === "utility" && choice.action === "field_greed")
        ? 0
        : Math.max(
            FIELD_GRANT_MIN_COST,
            Math.round(originalCost * FIELD_GRANT_DISCOUNT_MULTIPLIER)
          );
    return {
      ...choice,
      cost: fieldGrantCost,
      originalCost,
      laneLabel: getFieldGrantLaneLabel(choice),
      forgeLaneLabel: getFieldGrantLaneLabel(choice),
      slotText:
        choice.type === "utility" && choice.action === "field_greed"
          ? "현장 계약"
          : choice.type === "fallback"
          ? choice.slotText || "현장 안정화"
          : `${choice.slotText || "현장 장착"} · 할인 ${Math.max(0, originalCost - fieldGrantCost)}`,
      fieldGrant: true,
    };
  }

  function createForgeRiderCard(choice, laneLabel) {
    if (!choice) {
      return null;
    }
    const riderChoice = createFieldGrantCard(choice);
    if (!riderChoice) {
      return null;
    }
    return {
      ...riderChoice,
      laneLabel,
      forgeLaneLabel: laneLabel,
      riderSlot: true,
      slotText: `Rider Slot · ${riderChoice.slotText || "현장 장착"}`,
      description: `${riderChoice.description} 이번 포지의 headline 변신 뒤에 얹는 소형 rider slot이다.`,
    };
  }

  function createWildcardProtocolChoice(build, nextWave) {
    const protocol = getWildcardProtocolForWave(nextWave);
    if (!build || !protocol) {
      return null;
    }
    if (getClaimedWildcardProtocolIds(build).includes(protocol.id)) {
      return null;
    }
    return {
      type: "utility",
      action: "wildcard_protocol",
      id: `utility:wildcard_protocol:${protocol.id}:${nextWave}`,
      verb: "탈취",
      tag: protocol.tag,
      title: protocol.title,
      description: protocol.description,
      slotText: protocol.slotText,
      cost: 0,
      laneLabel: protocol.laneLabel,
      forgeLaneLabel: protocol.laneLabel,
      wildcardProtocolId: protocol.id,
      wildcardWave: protocol.wave,
      roadmapDetail: protocol.roadmapDetail,
    };
  }

  function createFieldGreedContractChoice(build, nextWave) {
    if (!build || !Number.isFinite(nextWave) || nextWave < FORGE_PACKAGE_START_WAVE) {
      return null;
    }
    return {
      type: "utility",
      action: "field_greed",
      id: `utility:field_greed:${nextWave}`,
      verb: "계약",
      tag: "PACT",
      title: "Greed Contract",
      description:
        "현장에서 바로 scrap credit를 당겨 고철과 회수 효율을 먼저 챙긴다. 대신 다음 웨이브 하나는 Siege Debt가 붙어 적 밀도와 hazard가 함께 거칠어지고, 몸체도 조금 찢긴 채 들어간다.",
      slotText: "고철 +34 · 회수 +10% · 1웨이브 Siege Debt",
      cost: 0,
      scrapGain: 34,
      scrapMultiplierGain: 0.1,
      pickupBonus: 10,
      hpLoss: 10,
      maxHpPenalty: 8,
      debtWaves: 1,
    };
  }

  function createForgeRiderSupportChoice(build, rng, nextWave, excludedChoiceId = null) {
    const random = typeof rng === "function" ? rng : Math.random;
    const wildcardChoice = createWildcardProtocolChoice(build, nextWave);
    if (wildcardChoice && wildcardChoice.id !== excludedChoiceId) {
      return createForgeRiderCard(wildcardChoice, "Support Rider");
    }
    const supportPool = createSupportSystemChoices(build, random, {
      nextWave,
      finalForge: false,
    })
      .filter(Boolean)
      .sort((left, right) => {
        const supportScore = (choice) => {
          if (!choice) {
            return -1;
          }
          if (choice.forgeLaneLabel === "공세 모듈") {
            return 420 + (choice.systemTier || 1) * 12;
          }
          if (choice.systemId === "volt_drones") {
            return 408;
          }
          if (choice.systemId === "seeker_array") {
            return 396;
          }
          if (choice.systemId === "kiln_sentry") {
            return 384;
          }
          if (choice.systemId === "ember_ring") {
            return 372;
          }
          return 320 + (choice.systemTier || 1) * 8;
        };
        return supportScore(right) - supportScore(left);
      });
    const supportChoice = supportPool.find((choice) => choice.id !== excludedChoiceId) || null;
    return createForgeRiderCard(supportChoice, "Support Rider");
  }

  function createForgeRiderDefenseChoice(build, rng, nextWave) {
    const defenseChoice =
      createFieldGrantDefenseChoice(build, rng, nextWave) || {
        type: "fallback",
        id: `forge-rider:defense_fallback:${nextWave}`,
        tag: "VENT",
        title: "Emergency Vent",
        description: "열을 크게 빼고 체력을 조금 회복해 다음 웨이브 진입 각을 정리한다.",
        slotText: "무료 안정화",
        cost: 0,
      };
    return createForgeRiderCard(defenseChoice, "Defense / Utility");
  }

  function createForgeRiderGreedChoice(build, nextWave) {
    return createForgeRiderCard(createFieldGreedContractChoice(build, nextWave), "Greed Contract");
  }

  function buildForgeRiderChoices(build, rng, nextWave, previousChoice = null) {
    const riderChoices = [
      createForgeRiderSupportChoice(build, rng, nextWave, previousChoice ? previousChoice.id : null),
      createForgeRiderDefenseChoice(build, rng, nextWave),
      createForgeRiderGreedChoice(build, nextWave),
    ].filter((choice) => choice && (!previousChoice || choice.id !== previousChoice.id));
    return curateForgeRiderChoices(riderChoices, previousChoice);
  }

  function createLateFieldMutationChoice(build, nextWave) {
    const breakpointWave = isArsenalBreakpointWave(nextWave);
    const breakpointRank = getLateFieldBreakpointRank(nextWave);
    const nextLevel = Math.min(
      MAX_LATE_FIELD_MUTATION_LEVEL,
      getLateFieldMutationLevel(build) + (breakpointWave ? 2 : 1)
    );
    const barrelCount = Math.min(8, 2 + nextLevel);
    const breakpointTitle =
      breakpointRank >= 3
        ? "Overdrive Arsenal Cataclysm"
        : breakpointRank === 2
          ? "Overdrive Arsenal Overlord"
          : "Overdrive Arsenal Prime";
    return {
      type: "utility",
      action: "field_mutation",
      id: `utility:field_mutation:${build.coreId}:${nextWave}:${nextLevel}`,
      verb: "변이",
      tag: "MUTATE",
      title: breakpointWave ? breakpointTitle : `Overdrive Arsenal ${nextLevel}`,
      description:
        breakpointWave
          ? `Wave ${nextWave} breakpoint용 주포 변이. ${CORE_DEFS[build.coreId].label}에 측면 배럴과 과열 포문을 한 번에 증설해 바로 ${getLateFieldMutationTierLabel(nextLevel)} 화망으로 점프한다. 이번 등급은 다음 late cache 전까지 주포 실루엣 자체를 다시 갈아엎는다.`
          : `후반 전장용 주포 증설 패키지. ${CORE_DEFS[build.coreId].label}에 추가 배럴과 보조 포문을 바로 붙여 ${getLateFieldMutationTierLabel(nextLevel)} 화망으로 바꾼다.`,
      slotText: breakpointWave
        ? `추가 배럴 +${barrelCount} · breakpoint rank ${breakpointRank}`
        : `추가 배럴 +${barrelCount} · MK ${nextLevel} 화망`,
      cost: 0,
      laneLabel: "Main Weapon Mutation",
      forgeLaneLabel: "Main Weapon Mutation",
      lateFieldMutationLevel: nextLevel,
      arsenalBreakpointProfileId: breakpointWave ? "mutation" : null,
    };
  }

  function createLateFieldConvergenceChoice(build, nextWave) {
    if (
      !build ||
      !Number.isFinite(nextWave) ||
      nextWave < LATE_FIELD_CACHE_START_WAVE ||
      !canOfferLateFieldConvergence(build)
    ) {
      return null;
    }
    const def = LATE_FIELD_CONVERGENCE_DEFS[build.chassisId];
    if (!def) {
      return null;
    }
    const supportCount = getInstalledSupportSystems(build).length;
    const supportCap = getSupportBayCapacity(build);
    const greedPressure = getLateFieldGreedPressure(build);
    const fuelLabel =
      greedPressure > 0
        ? `raid/debt ${greedPressure}웨이브`
        : getLateFieldMutationLevel(build) > 0
          ? `arsenal MK ${getLateFieldMutationLevel(build)}`
          : `guard plate MK ${getLateFieldAegisLevel(build)}`;
    return {
      type: "utility",
      action: "field_convergence",
      id: `utility:field_convergence:${def.id}:${nextWave}`,
      verb: "융합",
      tag: def.tag,
      title: def.title,
      description: `${def.description} 이번 pick은 새 카테고리가 아니라 이미 쌓은 chassis, support, greed, field layer를 하나의 branch form으로 용접한다.`,
      slotText: `support ${supportCount}/${supportCap} · ${fuelLabel} · ${CORE_DEFS[build.coreId].label} 융합`,
      cost: 0,
      laneLabel: "Convergence Form",
      forgeLaneLabel: "Convergence Form",
      lateFieldConvergenceId: def.id,
      chassisTitle: getChassisBreakpointDef(build)?.title || def.chassisId,
      supportCount,
      greedPressure,
    };
  }

  function createLateFieldAegisChoice(build, nextWave) {
    const breakpointWave = isArsenalBreakpointWave(nextWave);
    const breakpointRank = getLateFieldBreakpointRank(nextWave);
    const nextLevel = Math.min(
      MAX_LATE_FIELD_AEGIS_LEVEL,
      getLateFieldAegisLevel(build) + (breakpointWave ? 2 : 1)
    );
    const breakpointTitle =
      breakpointRank >= 3
        ? "Citadel Halo"
        : breakpointRank === 2
          ? "Bulwark Halo"
          : "Warplate Halo";
    return {
      type: "utility",
      action: "field_aegis",
      id: `utility:field_aegis:${nextWave}:${nextLevel}`,
      verb: "장착",
      tag: breakpointWave ? "HALO" : "AEGIS",
      title: breakpointWave ? breakpointTitle : getLateFieldAegisTierLabel(nextLevel),
      description:
        breakpointWave
          ? `Wave ${nextWave} 생존 브레이크포인트. 재충전식 plate 층을 즉시 두 단계 끌어올려 큰 한 방을 지우고, 발동 순간 주변 탄막과 추격선까지 함께 뜯어낸다. 이후 남은 bracket은 이 plate 실루엣을 더 오래 굴리는 시험이 된다.`
          : "후반 생존층 패키지. 재충전식 guard plate를 달아 큰 한 방을 깎아내고, 발동 순간 근처 탄막까지 함께 털어낸다.",
      slotText: breakpointWave
        ? `plate ${getLateFieldAegisMaxCharges({ lateFieldAegisLevel: nextLevel })}충전 · rank ${breakpointRank} 완충`
        : `guard plate ${getLateFieldAegisMaxCharges({ lateFieldAegisLevel: nextLevel })}충전 · 피해 ${Math.round(getLateFieldAegisReduction(nextLevel) * 100)}% 완충`,
      cost: 0,
      laneLabel: "Defense / Utility",
      forgeLaneLabel: "Defense / Utility",
      lateFieldAegisLevel: nextLevel,
      arsenalBreakpointProfileId: breakpointWave ? "aegis" : null,
    };
  }

  function createLateFieldGreedContractChoice(build, nextWave) {
    const waveScale = Math.max(0, nextWave - LATE_FIELD_CACHE_START_WAVE);
    const breakpointWave = isArsenalBreakpointWave(nextWave);
    const breakpointRank = getLateFieldBreakpointRank(nextWave);
    return {
      type: "utility",
      action: "field_greed",
      id: `utility:field_greed:late:${nextWave}`,
      verb: "계약",
      tag: "PACT",
      title: breakpointWave
        ? breakpointRank >= 3
          ? "Black Ledger Catastrophe"
          : breakpointRank === 2
            ? "Black Ledger Grand Raid"
            : "Black Ledger Raid"
        : "Black Ledger Contract",
      description:
        breakpointWave
          ? `Wave ${nextWave} greed breakpoint. 다음 ${breakpointRank >= 2 ? "두" : "한"} 웨이브를 불법 금고 습격으로 비틀어 contraband vault와 payout을 키우지만, 전장 밀도와 청구서도 즉시 같이 끌어올린다.`
          : "후반용 탐욕 계약. 다음 웨이브를 바로 Black Ledger raid로 비틀고, 다음 대형 cache 전까지 쓸 고철과 회수율을 크게 당겨오지만 즉시 체력 청구서와 Siege Debt도 같이 붙는다.",
      slotText: breakpointWave
        ? `고철 +58 · 회수 +18% · raid ${breakpointRank >= 2 ? "x2" : "x1"} · 2웨이브 Siege Debt`
        : `고철 +${46 + waveScale * 4} · 회수 +${14 + waveScale * 2}% · 다음 웨이브 raid`,
      cost: 0,
      scrapGain: breakpointWave ? 58 : 46 + waveScale * 4,
      scrapMultiplierGain: breakpointWave ? 0.18 : 0.14 + waveScale * 0.01,
      pickupBonus: breakpointWave ? 18 : 14 + waveScale * 2,
      hpLoss: breakpointWave ? 16 : 14 + waveScale,
      maxHpPenalty: breakpointWave ? 12 : 10 + Math.floor(waveScale / 2),
      debtWaves: 2,
      blackLedgerRaidWaves: breakpointWave ? (breakpointRank >= 2 ? 2 : 1) : 1,
      arsenalBreakpointProfileId: breakpointWave ? "ledger" : null,
    };
  }

  function createLateBreakMutationChoice(build, nextWave) {
    if (!build || !Number.isFinite(nextWave) || nextWave < LATE_BREAK_ARMORY_WAVE) {
      return null;
    }
    const nextLevel = Math.min(
      MAX_LATE_FIELD_MUTATION_LEVEL,
      Math.max(4, getLateFieldMutationLevel(build) + 3)
    );
    const barrelCount = Math.min(8, 2 + nextLevel);
    return {
      type: "utility",
      action: "field_mutation",
      id: `utility:latebreak_mutation:${build.coreId}:${nextWave}:${nextLevel}`,
      verb: "변이",
      tag: "ARSENAL",
      title: "Cataclysm Arsenal",
      description: `${CORE_DEFS[build.coreId].label}에 전면 cataclysm fan과 측면 브로드사이드 포드를 한 번에 잠가 support 없이도 주포 firing geometry를 monster form으로 갈아엎는다. 이번 pick의 rider는 보조 증폭일 뿐이고, 진짜 payoff는 Wave 9-10에서 주포가 열린 lane 둘을 동시에 잠그는 새 화망 자체다.`,
      roadmapDetail: "Wave 9-10 payoff band -> Wave 11 domination lap -> Wave 12 final breach",
      slotText: "cataclysm fan + 브로드사이드 포드 · 주포 우선 payoff band -> lap -> finale",
      cost: 34,
      laneLabel: "Main Weapon Mutation",
      forgeLaneLabel: "Main Weapon Mutation",
      lateFieldMutationLevel: nextLevel,
      lateBreakProfileId: "mutation",
    };
  }

  function createLateBreakAegisChoice(build, nextWave) {
    if (!build || !Number.isFinite(nextWave) || nextWave < LATE_BREAK_ARMORY_WAVE) {
      return null;
    }
    const nextLevel = Math.min(
      MAX_LATE_FIELD_AEGIS_LEVEL,
      Math.max(2, getLateFieldAegisLevel(build) + 2)
    );
    return {
      type: "utility",
      action: "field_aegis",
      id: `utility:latebreak_aegis:${nextWave}:${nextLevel}`,
      verb: "장착",
      tag: "HALO",
      title: "Warplate Halo",
      description:
        "Act 3 진입 전에 재충전식 warplate를 두 겹까지 예열해 큰 한 방을 지우고, plate가 터질 때마다 주변 탄막과 추격선을 같이 뜯어낸다. Wave 9-10은 headline form이 전장을 먼저 먹는 payoff band로 유지되고, Wave 11은 Halo refuge lap에서 방금 붙인 생존층으로 넓은 pocket을 얼마나 오래 지키는지 먼저 누리게 만든다. Wave 12에서만 Citadel final stand를 버티게 만든다.",
      roadmapDetail: "Wave 9-10 payoff band -> Wave 11 Halo refuge lap -> Wave 12 final stand",
      slotText: `warplate ${getLateFieldAegisMaxCharges({ lateFieldAegisLevel: nextLevel })}충전 · payoff band -> refuge lap -> finale`,
      cost: 26,
      laneLabel: "Defense / Utility",
      forgeLaneLabel: "Defense / Utility",
      lateFieldAegisLevel: nextLevel,
      lateBreakProfileId: "aegis",
    };
  }

  function createLateBreakGreedContractChoice(build, nextWave) {
    if (!build || !Number.isFinite(nextWave) || nextWave < LATE_BREAK_ARMORY_WAVE) {
      return null;
    }
    return {
      type: "utility",
      action: "field_greed",
      id: `utility:latebreak_greed:${nextWave}`,
      verb: "계약",
      tag: "LEDGER",
      title: "Black Ledger Heist",
      description:
        "Act 3 개막 자금을 먼저 당겨 고철과 회수 효율을 크게 올린다. 대신 첫 두 rung은 headline form이 전장을 먹는 payoff band로 유지되고, Wave 11은 Kingpin cash-out lap에서 greed를 rider 위치에 묶은 채 넓은 vault line을 한 판 더 누리게 하며, Wave 12에서만 blackout finale로 큰 payout 압박을 정면으로 받게 만든다.",
      roadmapDetail: "Wave 9-10 payoff band -> Wave 11 Kingpin cash-out lap -> Wave 12 blackout finale",
      slotText: "고철 +52 · 회수 +16% · payoff band -> cash-out lap -> finale · 2웨이브 Siege Debt",
      cost: 0,
      scrapGain: 52,
      scrapMultiplierGain: 0.16,
      pickupBonus: 16,
      hpLoss: 14,
      maxHpPenalty: 10,
      debtWaves: 2,
      blackLedgerRaidWaves: 2,
      laneLabel: "Greed Contract",
      forgeLaneLabel: "Greed Contract",
      lateBreakProfileId: "ledger",
    };
  }

  function applyBlackLedgerRaidConfig(config, build, waveNumber) {
    if (
      !config ||
      !build ||
      !Number.isFinite(build.blackLedgerRaidWaves) ||
      build.blackLedgerRaidWaves <= 0
    ) {
      return config;
    }
    const salvageWave =
      config.hazard && (config.hazard.type === "salvage" || config.hazard.type === "caravan");
    const nextConfig = {
      ...config,
      hazard: config.hazard ? { ...config.hazard } : null,
      mix: blendEnemyMix(config.mix, BLACK_LEDGER_RAID_OVERLAY, salvageWave ? 0.46 : 0.24),
    };
    nextConfig.spawnBudget += salvageWave ? 28 : 20;
    nextConfig.activeCap += salvageWave ? 5 : 3;
    nextConfig.baseSpawnInterval = Math.max(
      nextConfig.spawnIntervalMin,
      nextConfig.baseSpawnInterval * (salvageWave ? 0.84 : 0.9)
    );
    nextConfig.eliteEvery = Math.max(3, nextConfig.eliteEvery - 1);
    nextConfig.driveGainFactor = Math.max(nextConfig.driveGainFactor || 1, 1.18);
    if (nextConfig.hazard) {
      nextConfig.hazard.interval = Math.max(
        4.2,
        nextConfig.hazard.interval * (salvageWave ? 0.74 : 0.86)
      );
      nextConfig.hazard.damage += salvageWave ? 4 : 2;
      if (salvageWave) {
        nextConfig.hazard.label = "Black Ledger Vaults";
        nextConfig.hazard.salvageScrap = Math.max(
          22,
          (nextConfig.hazard.salvageScrap || 0) + 26
        );
        nextConfig.hazard.salvageBurstCount = Math.max(
          4,
          (nextConfig.hazard.salvageBurstCount || 0) + 2
        );
        nextConfig.hazard.salvageBurstRadius = Math.max(
          76,
          (nextConfig.hazard.salvageBurstRadius || 0) + 14
        );
        nextConfig.hazard.coreHp = Math.max(48, (nextConfig.hazard.coreHp || 0) + 22);
      }
    }
    nextConfig.note = salvageWave
      ? "black ledger raid. 금고 pocket이 더 자주 크게 열리고 고철 폭발도 커지지만, brander와 lancer가 바로 파고들어 오래 머무르면 greed payout보다 먼저 전장이 닫힌다."
      : `${config.note} Black Ledger raid가 남아 있어 이번 웨이브는 payout을 미끼로 적 밀도와 hazard가 같이 빨라진다.`;
    nextConfig.directive = salvageWave
      ? "금고를 빨리 찢고 곧바로 이탈하는 cash-out window를 직접 골라야 한다. pocket 안 체류 시간이 길수록 청구서도 같이 커진다."
      : `${config.directive} greed payout 때문에 전장 템포가 더 빨라져 pocket 유지보다 즉시 절개가 중요하다.`;
    nextConfig.blackLedgerRaid = {
      waveNumber,
      salvageWave,
      payoutScrap: salvageWave
        ? nextConfig.hazard && nextConfig.hazard.salvageScrap
        : Math.round(20 + (waveNumber - LATE_FIELD_CACHE_START_WAVE) * 4),
      note: salvageWave
        ? "Black Ledger Raid가 금고 objective를 jackpot 돌진으로 바꿨다. 금고를 찢어 payout을 캐낼수록 brander/lancer 압박도 같이 올라온다."
        : "Black Ledger Raid 후유증으로 이번 웨이브 템포가 빨라졌다. payout을 노릴지 안전하게 lane을 비울지 계속 갈라진다.",
    };
    return nextConfig;
  }

  function createBastionDraftSpikeChoice(build, rng, nextWave) {
    const random = typeof rng === "function" ? rng : Math.random;
    const spikePool = buildActBreakArmoryChoices(build, random, Number.POSITIVE_INFINITY, {
      nextWave,
      finalForge: false,
    }).filter(
      (choice) =>
        choice &&
        (choice.laneLabel === "주무장 진화" ||
          choice.laneLabel === "공세 모듈" ||
          choice.laneLabel === "대형 화력")
    );
    if (spikePool.length === 0) {
      return null;
    }
    const rankedPool = spikePool.sort((left, right) => {
      const typeScore = (choice) => {
        if (choice.type === "evolution") {
          return 4;
        }
        if (choice.type === "system" && choice.forgeLaneLabel === "공세 모듈") {
          return 3;
        }
        if (choice.type === "core" || choice.type === "affix") {
          return 2;
        }
        return 1;
      };
      const scoreDelta = typeScore(right) - typeScore(left);
      if (scoreDelta !== 0) {
        return scoreDelta;
      }
      return (right.cost || 0) - (left.cost || 0);
    });
    const choice = rankedPool[0];
    return {
      ...choice,
      id: `bastion:${choice.id}`,
      tag: "SPIKE",
      laneLabel: "Bastion Spike",
      forgeLaneLabel: choice.forgeLaneLabel || choice.laneLabel || "대형 화력",
      cost: Math.max(18, Math.round((choice.cost || 0) * 0.72)),
      originalCost: choice.cost || 0,
      slotText: `Act 2 spike · ${choice.slotText || choice.description}`,
      description: `Act 2용 과투입 카드. ${choice.description} 지금 평소보다 일찍 잠그는 대신, 다음 큰 포지 전까지 이 라인에 더 깊게 묶인다.`,
    };
  }

  function createDoctrineCapstoneChoices(build, options = null) {
    if (!build || !isLateBreakArmory(options) || build.doctrineCapstoneId) {
      return [];
    }
    const doctrine = getBastionDoctrineDef(build);
    if (doctrine && doctrine.id === "storm_artillery") {
      return [];
    }
    const capstones = getDoctrineLateCapstoneDefs(doctrine);
    if (!doctrine || capstones.length === 0) {
      return [];
    }
    return capstones.map((capstone) => ({
      type: "utility",
      action: "doctrine_capstone",
      id: `utility:doctrine_capstone:${capstone.id}`,
      verb: "완성",
      tag: "APEX",
      title: capstone.title,
      description: `${capstone.description} ${capstone.summary}`,
      slotText: capstone.slotText,
      cost: capstone.cost,
      laneLabel: capstone.laneLabel,
      forgeLaneLabel: capstone.laneLabel,
      doctrineId: doctrine.id,
      doctrineLabel: doctrine.label,
      doctrineCapstoneId: capstone.id,
      capstoneLabel: capstone.label,
    }));
  }

  function getDoctrinePreferenceScore(choice, doctrine) {
    if (!choice || !doctrine) {
      return 0;
    }
    if (choice.type === "utility" && choice.action === "bastion_doctrine") {
      return choice.doctrineId === doctrine.id ? 640 : 0;
    }
    if (choice.type === "utility" && choice.action === "doctrine_chase") {
      return 520;
    }
    if (choice.type === "system") {
      const index = doctrine.preferredSystemIds.indexOf(choice.systemId);
      return index >= 0 ? 320 - index * 24 + (choice.systemTier || 1) * 6 : 0;
    }
    if (choice.type === "mod") {
      const index = doctrine.preferredModIds.indexOf(choice.modId);
      return index >= 0 ? 220 - index * 16 : 0;
    }
    if (choice.type === "affix") {
      const index = doctrine.preferredAffixIds.indexOf(choice.affixId);
      return index >= 0 ? 190 - index * 14 : 0;
    }
    if (choice.type === "evolution" && choice.coreId === doctrine.favoredCoreId) {
      return 170 + (choice.evolutionTier || 1) * 10;
    }
    return 0;
  }

  function sortChoicesForDoctrine(candidates, doctrine) {
    if (!Array.isArray(candidates) || candidates.length <= 1 || !doctrine) {
      return candidates;
    }
    candidates.sort((left, right) => {
      const scoreDelta =
        getDoctrinePreferenceScore(right, doctrine) - getDoctrinePreferenceScore(left, doctrine);
      if (scoreDelta !== 0) {
        return scoreDelta;
      }
      return (right.cost || 0) - (left.cost || 0);
    });
    return candidates;
  }

  function createBastionDoctrineChoice(build, doctrineOrRng, nextWaveOrDoctrine, maybeNextWave) {
    const doctrine =
      typeof doctrineOrRng === "object" && doctrineOrRng && doctrineOrRng.id
        ? doctrineOrRng
        : typeof nextWaveOrDoctrine === "object" && nextWaveOrDoctrine && nextWaveOrDoctrine.id
          ? nextWaveOrDoctrine
          : getBastionDoctrineDef(build);
    const rng =
      typeof doctrineOrRng === "function"
        ? doctrineOrRng
        : typeof nextWaveOrDoctrine === "function"
          ? nextWaveOrDoctrine
          : Math.random;
    const nextWave =
      Number.isFinite(maybeNextWave)
        ? maybeNextWave
        : Number.isFinite(nextWaveOrDoctrine)
          ? nextWaveOrDoctrine
          : 0;
    const weaponChoice = createDoctrineChaseWeaponChoice(build, doctrine, { nextWave, finalForge: false });
    const lateCapstoneLabel = getDoctrineLateCapstoneLabel(doctrine);
    if (!doctrine || !weaponChoice) {
      return createBastionDraftSpikeChoice(build, rng, nextWave);
    }
    const forecastConfirmed =
      !!build &&
      !!build.architectureForecastId &&
      build.architectureForecastId === doctrine.id &&
      !build.bastionDoctrineId;
    return {
      type: "utility",
      action: "bastion_doctrine",
      id: `utility:bastion_doctrine:${doctrine.id}`,
      verb: "채택",
      tag: "DOCTRINE",
      title: doctrine.label,
      description:
        `${doctrine.description} 즉시 ${weaponChoice.title}을(를) 할인 장착하고, ${doctrine.reserveText} 이어지는 Chassis Breakpoint가 flex bay를 열어 진짜 body plan까지 잠근다.${forecastConfirmed ? " Wave 3 forecast와 맞아 더 싸게 확정된다." : ""}${lateCapstoneLabel ? ` 이후 Wave 6-8 marked elite shard를 모으는 장기 forge pursuit가 열리고, 완성 시 ${lateCapstoneLabel} 계열 교리 monster form이 즉시 잠긴다.` : ""}`,
      slotText: `교리 채택 · ${weaponChoice.title} · ${doctrine.short} · ${doctrine.reservedLane}`,
      cost: Math.max(0, Math.round((weaponChoice.cost || 0) * (forecastConfirmed ? 0.45 : 0.72))),
      laneLabel: "교리 채택",
      forgeLaneLabel: "교리 채택",
      doctrineId: doctrine.id,
      doctrineLabel: doctrine.label,
      doctrineChoice: {
        ...weaponChoice,
        cost: 0,
      },
      forecastConfirmed,
    };
  }

  function createWave6AscensionSystemChoice(build, doctrine, preferredSystemId, nextWave) {
    if (!build || !doctrine) {
      return null;
    }
    const expandedBuild = {
      ...build,
      bastionDoctrineId: doctrine.id,
      supportBayCap: Math.min(MAX_SUPPORT_BAY_LIMIT, Math.max(getSupportBayCapacity(build), MAX_SUPPORT_BAYS + 1)),
      auxiliaryJunctionLevel: Math.max(1, Math.round(build.auxiliaryJunctionLevel || 0)),
    };
    const preferredSystemIds = new Set(getDoctrinePreferredSystemIds(doctrine));
    const offDoctrineChoices = createSupportSystemChoices(expandedBuild, Math.random, {
      nextWave,
      finalForge: false,
    }).filter(
      (choice) =>
        choice &&
        choice.bayAction === "install" &&
        !preferredSystemIds.has(choice.systemId)
    );
    if (preferredSystemId) {
      const preferredChoice = offDoctrineChoices.find((choice) => choice.systemId === preferredSystemId);
      if (preferredChoice) {
        return preferredChoice;
      }
    }
    return offDoctrineChoices[0] || null;
  }

  function createWave6AscensionChoice(build, doctrine, nextWave) {
    if (!build || !doctrine) {
      return null;
    }
    const ascensionDef = WAVE6_ASCENSION_DEFS[doctrine.id];
    const weaponChoice = createDoctrineChaseWeaponChoice(build, doctrine, {
      nextWave,
      finalForge: false,
    });
    if (!ascensionDef || !weaponChoice) {
      return null;
    }
    const chassis = getChassisBreakpointDef(ascensionDef.chassisId);
    const doctrineForm = getDoctrineWeaponForm(
      {
        ...build,
        bastionDoctrineId: doctrine.id,
        doctrineChaseClaimed: false,
        doctrineCapstoneId: null,
      },
      doctrine.favoredCoreId
    );
    const autoPursuitReady = Boolean(build.overcommitUnlocked);
    return {
      type: "utility",
      action: "wave6_ascension",
      id: `utility:wave6_ascension:${doctrine.id}`,
      verb: "승천",
      tag: ascensionDef.tag,
      title: ascensionDef.title,
      description: `${ascensionDef.summary} ${doctrine.description} ${weaponChoice.title}을(를) 즉시 무료 접속하고 ${chassis ? chassis.title : "utility chassis"}까지 함께 잠가 mid-run body plan을 굳힌다. support bay 확장과 off-doctrine flex lane은 Wave 8 Late Break Armory까지 미뤄 초반 실루엣을 lean하게 유지한다.${autoPursuitReady ? " Wave 5 contraband salvage를 챙겼다면 Forge Pursuit도 여기서 즉시 점화된다." : ""}`,
      slotText: `${doctrine.label} · ${weaponChoice.title} · ${chassis ? chassis.title : "utility chassis"}`,
      cost: Math.max(0, Math.round((weaponChoice.cost || 0) * 0.48)),
      laneLabel: ascensionDef.laneLabel,
      forgeLaneLabel: ascensionDef.laneLabel,
      doctrineId: doctrine.id,
      doctrineLabel: doctrine.label,
      doctrineChoice: {
        ...weaponChoice,
        cost: 0,
      },
      doctrineFormLabel: doctrineForm ? doctrineForm.label : doctrine.label,
      doctrineFormTrait: doctrineForm ? doctrineForm.traitLabel : null,
      autoPursuitReady,
      chassisId: ascensionDef.chassisId,
      chassisTitle: chassis ? chassis.title : ascensionDef.chassisId,
    };
  }

  function buildWave6AscensionChoices(build, nextWave) {
    const choices = Object.values(BASTION_DOCTRINE_DEFS)
      .map((doctrine) => createWave6AscensionChoice(build, doctrine, nextWave))
      .filter(Boolean);
    const forecastDoctrine =
      build && build.architectureForecastId ? getBastionDoctrineDef(build.architectureForecastId) : null;
    if (forecastDoctrine) {
      choices.sort((left, right) => {
        const leftForecast = left.doctrineId === forecastDoctrine.id ? 1 : 0;
        const rightForecast = right.doctrineId === forecastDoctrine.id ? 1 : 0;
        if (rightForecast !== leftForecast) {
          return rightForecast - leftForecast;
        }
        return (left.cost || 0) - (right.cost || 0);
      });
    }
    return choices;
  }

  function createArchitectureDoctrineWeaponChoice(build, doctrine) {
    if (!build || !doctrine || !doctrine.favoredCoreId || !CORE_DEFS[doctrine.favoredCoreId]) {
      return null;
    }
    if (build.coreId === doctrine.favoredCoreId) {
      const evolutionChoice = createWeaponEvolutionChoice(build, { nextWave: ARCHITECTURE_DRAFT_WAVE });
      return evolutionChoice && evolutionChoice.coreId === doctrine.favoredCoreId
        ? {
            ...evolutionChoice,
            cost: 0,
          }
        : null;
    }
    const pivotChoice = createCoreChoice(doctrine.favoredCoreId, build);
    return pivotChoice
      ? {
          ...pivotChoice,
          cost: 0,
        }
      : null;
  }

  function createArchitectureDoctrineChoice(doctrine, build = null) {
    if (!doctrine) {
      return null;
    }
    const weaponChoice = createArchitectureDoctrineWeaponChoice(build, doctrine);
    const ascensionDef = WAVE6_ASCENSION_DEFS[doctrine.id];
    const chassis = ascensionDef ? getChassisBreakpointDef(ascensionDef.chassisId) : null;
    const doctrineForm = build
      ? getDoctrineWeaponForm(
          {
            ...build,
            bastionDoctrineId: doctrine.id,
            doctrineChaseClaimed: false,
            doctrineCapstoneId: null,
          },
          doctrine.favoredCoreId
        )
      : null;
    const lateCapstoneLabel = getDoctrineLateCapstoneLabel(doctrine);
    if (!weaponChoice || !ascensionDef) {
      return null;
    }
    return {
      type: "utility",
      action: "architecture_forecast",
      id: `utility:architecture_doctrine:${doctrine.id}`,
      verb: "잠금",
      tag: "ARCH",
      title: doctrine.label,
      description:
        `${doctrine.description} Wave 3에서는 ${weaponChoice.title}만 먼저 무료 접속해 core gun lock을 고정한다. ${chassis ? chassis.title : "Chassis Breakpoint"}와 support bay 확장, off-doctrine flex lane은 뒤로 미뤄 Wave 6에서 body plan, Wave 8 Late Break Armory에서 support spectacle이 차례로 열리게 만든다.${lateCapstoneLabel ? ` 이후 Wave 6-8 marked elite shard를 모아 ${lateCapstoneLabel} 계열 후반 분기를 밀 수 있다.` : ""}`,
      slotText: `monster form lock · ${weaponChoice.title}`,
      cost: 0,
      laneLabel: "Monster Form Lock",
      forgeLaneLabel: "Monster Form Lock",
      doctrineId: doctrine.id,
      doctrineLabel: doctrine.label,
      doctrineCapstoneLabel: lateCapstoneLabel,
      weaponChoice,
      doctrineFormLabel: doctrineForm ? doctrineForm.label : doctrine.label,
      doctrineFormTrait: doctrineForm ? doctrineForm.traitLabel : null,
      breakpointLabel: chassis ? chassis.title : ascensionDef.chassisId,
    };
  }

  function buildArchitectureDraftChoices(build = null) {
    return Object.values(BASTION_DOCTRINE_DEFS)
      .map((doctrine) => createArchitectureDoctrineChoice(doctrine, build))
      .filter(Boolean);
  }

  function createBastionDraftPactChoice() {
    return {
      type: "utility",
      action: "bastion_pact",
      id: "utility:bastion_pact",
      verb: "계약",
      tag: "PACT",
      title: "Siege Salvage Pact",
      description:
        "즉시 고철 +56과 회수 효율 +12%를 얻지만, 최대 체력 -22와 현재 체력 18 피해를 영구적으로 감수한다. 이후 3개 웨이브 동안 적 밀도와 incoming damage가 같이 오르는 Siege Debt를 짊어진다.",
      slotText: "고철 +56 · 회수 +12% · 3웨이브 Siege Debt",
      cost: 0,
      scrapGain: 56,
      scrapMultiplierGain: 0.12,
      maxHpPenalty: 22,
      hpLoss: 18,
      debtWaves: 3,
      laneLabel: "Siege Pact",
      forgeLaneLabel: "고통 계약",
    };
  }

  function createBastionSystemsForgeChoice(build, rng, nextWave) {
    if (!build) {
      return null;
    }
    const random = typeof rng === "function" ? rng : Math.random;
    const doctrine = getBastionDoctrineDef(build);
    const supportChoices = createSupportSystemChoices(build, random, {
      nextWave,
      finalForge: false,
    });
    sortChoicesForDoctrine(supportChoices, doctrine);
    const systemChoice = supportChoices[0];
    if (!systemChoice) {
      return {
        type: "utility",
        action: "bastion_bay_forge",
        id: "utility:bastion_bay_forge:unlock",
        verb: "확장",
        tag: "BAY",
        title: "Auxiliary Junction",
        description:
          "보조 섀시를 영구 증설해 세 번째 support bay를 지금 바로 열고, Wave 8 Late Break Armory에서 네 번째 bay까지 보장한다. 추가로 열린 bay 중 최소 1칸은 교리 reserve와 무관한 flex lane으로 유지된다.",
        slotText: "섀시 증설 · support bay +1 now, +1 at Wave 8",
        cost: 0,
        laneLabel: "시스템 포지",
        forgeLaneLabel: "시스템 포지",
        bayUnlock: true,
      };
    }
    return {
      type: "utility",
      action: "bastion_bay_forge",
      id: `utility:bastion_bay_forge:${systemChoice.id}`,
      verb: "주조",
      tag: "BAY",
      title: "Auxiliary Junction",
      description: `보조 섀시를 영구 증설해 세 번째 support bay를 Wave 6부터 즉시 열고 ${systemChoice.title}을(를) 꽂아 넣는다. ${systemChoice.description} 이후 Wave 8 Late Break Armory에서 네 번째 bay가 추가로 열려 교리 reserve에 묶이지 않는 flex lane까지 확보한다.`,
      slotText: `섀시 증설 · ${systemChoice.title} + Wave 8 bay`,
      cost: Math.max(16, Math.round((systemChoice.cost || 0) * 0.7)),
      originalCost: systemChoice.cost || 0,
      laneLabel: "시스템 포지",
      forgeLaneLabel: "시스템 포지",
      bayUnlock: true,
      systemChoice,
    };
  }

  function buildWave6BreakpointPrimaryChoices(build, rng, nextWave) {
    const random = typeof rng === "function" ? rng : Math.random;
    const doctrine = getBastionDoctrineDef(build);
    const choices = [];
    const takenIds = new Set();
    const pushUniqueChoice = (choice) => {
      if (!choice || takenIds.has(choice.id)) {
        return;
      }
      takenIds.add(choice.id);
      choices.push(choice);
    };

    pushUniqueChoice(createDoctrineChaseChoice(build, { nextWave, finalForge: false }));
    pushUniqueChoice(createWeaponEvolutionChoice(build, { nextWave, finalForge: false }));
    pushUniqueChoice(createBastionDraftSpikeChoice(build, random, nextWave));
    sortChoicesForDoctrine(choices, doctrine);
    pushUniqueChoice(createBastionDraftPactChoice());
    if (choices.length < 3) {
      pushUniqueChoice({
        type: "fallback",
        id: "bastion:holdfire",
        tag: "무료",
        title: "Holdfire Purge",
        description: "열을 크게 빼고 체력을 조금 회복한 뒤, 필수 섀시 breakpoint 두 번째 픽으로 넘어간다.",
        slotText: "무료 안정화 · breakpoint 유지",
        cost: 0,
        laneLabel: "안정화",
        forgeLaneLabel: "안정화",
      });
    }
    return choices.slice(0, 3);
  }

  function buildWave6ChassisBreakpointChoices(build, rng, nextWave, excludedChoiceIds = null) {
    if (!build) {
      return [];
    }
    if (CONSOLIDATED_12_WAVE_ROUTE) {
      return Object.values(CHASSIS_BREAKPOINT_DEFS).map((chassisDef) => ({
        type: "utility",
        action: "bastion_bay_forge",
        id: `utility:bastion_chassis_break:${chassisDef.id}:lean`,
        verb: "접합",
        tag: chassisDef.tag,
        title: chassisDef.title,
        description: `${chassisDef.description} 이번 Wave 6은 차체 break만 잠그고 끝낸다. support rider와 flex lane은 아직 닫아 둔 채 Wave 8 Late Break Armory에서 첫 late divergence로 한 번에 연다.`,
        slotText: `섀시 breakpoint · ${chassisDef.slotText}`,
        cost: 0,
        laneLabel: "섀시 breakpoint",
        forgeLaneLabel: "섀시 breakpoint",
        bayUnlock: false,
        chassisId: chassisDef.id,
        chassisTitle: chassisDef.title,
      }));
    }
    const random = typeof rng === "function" ? rng : Math.random;
    const doctrine = getBastionDoctrineDef(build);
    const preferredSystemIds = new Set(getDoctrinePreferredSystemIds(doctrine));
    const expandedBuild = {
      ...build,
      supportBayCap: Math.min(MAX_SUPPORT_BAY_LIMIT, Math.max(getSupportBayCapacity(build), MAX_SUPPORT_BAYS + 1)),
      auxiliaryJunctionLevel: Math.max(1, Math.round(build.auxiliaryJunctionLevel || 0)),
    };
    const excludedIds = new Set(
      excludedChoiceIds instanceof Set
        ? Array.from(excludedChoiceIds)
        : Array.isArray(excludedChoiceIds)
          ? excludedChoiceIds
          : []
    );
    const installChoices = createSupportSystemChoices(expandedBuild, random, {
      nextWave,
      finalForge: false,
    })
      .filter((choice) => choice && choice.bayAction === "install" && !excludedIds.has(choice.id));
    const wildcardChoices = installChoices.filter((choice) => !preferredSystemIds.has(choice.systemId));
    const doctrineChoices = installChoices.filter((choice) => preferredSystemIds.has(choice.systemId));
    sortChoicesForDoctrine(wildcardChoices, doctrine);
    sortChoicesForDoctrine(doctrineChoices, doctrine);
    const ordered = [];
    const takenIds = new Set();
    const pushChoice = (choice) => {
      if (!choice || takenIds.has(choice.id)) {
        return;
      }
      takenIds.add(choice.id);
      ordered.push(choice);
    };
    pushChoice(wildcardChoices[0]);
    pushChoice(doctrineChoices[0]);
    [...wildcardChoices.slice(1), ...doctrineChoices.slice(1)].forEach(pushChoice);
    const chassisDefs = Object.values(CHASSIS_BREAKPOINT_DEFS);
    const fallbackSystemChoice = ordered[0] || null;
    const chassisChoices = chassisDefs.map((chassisDef, index) => {
      const choice = ordered[index] || fallbackSystemChoice;
      return {
        type: "utility",
        action: "bastion_bay_forge",
        id: `utility:bastion_chassis_break:${chassisDef.id}:${choice ? choice.systemId : "flex_unlock"}`,
        verb: "접합",
        tag: chassisDef.tag,
        title: chassisDef.title,
        description: `${chassisDef.description} 세 번째 support bay는 즉시 교리 reserve를 무시하는 flex lane으로 열리고${choice ? ` ${choice.title}을(를) 함께 직결한다.` : " flex subsystem lane만 먼저 확보한다."} Wave 8에서는 정지 없이 네 번째 bay까지 자동 uplink되어 Late Break Armory를 건너뛴다.`,
        slotText: `섀시 breakpoint · ${chassisDef.slotText}${choice ? ` · ${choice.title}` : ""}`,
        cost: Math.max(12, Math.round(((choice && choice.cost) || 0) * 0.7)),
        originalCost: (choice && choice.cost) || 0,
        laneLabel: "섀시 breakpoint",
        forgeLaneLabel: "섀시 breakpoint",
        bayUnlock: true,
        chassisId: chassisDef.id,
        chassisTitle: chassisDef.title,
        systemChoice: choice,
        skipNextAdminStop: true,
      };
    });
    if (chassisChoices.length > 0) {
      return chassisChoices;
    }
    return [{
      type: "utility",
      action: "bastion_bay_forge",
      id: "utility:bastion_chassis_break:flex_unlock",
      verb: "접합",
      tag: CHASSIS_BREAKPOINT_DEFS.vector_thrusters.tag,
      title: CHASSIS_BREAKPOINT_DEFS.vector_thrusters.title,
      description:
        "대시 충격파와 slipstream을 여는 Vector Thrusters를 장착하고, 세 번째 support bay를 즉시 교리 reserve와 무관한 flex lane으로 확보한다. Wave 8에서는 전장 정지 없이 네 번째 bay까지 자동 uplink되어 ownership bracket을 이어 간다.",
      slotText: "섀시 breakpoint · Vector Thrusters · flex bay 즉시 개방",
      cost: 0,
      laneLabel: "섀시 breakpoint",
      forgeLaneLabel: "섀시 breakpoint",
      bayUnlock: true,
      chassisId: CHASSIS_BREAKPOINT_DEFS.vector_thrusters.id,
      chassisTitle: CHASSIS_BREAKPOINT_DEFS.vector_thrusters.title,
      skipNextAdminStop: true,
    }];
  }

  function buildBastionDraftChoices(build, rng, nextWave) {
    if (nextWave === 6 && build && !build.bastionDoctrineId) {
      return buildWave6AscensionChoices(build, nextWave);
    }
    if (nextWave === 6 && build && build.bastionDoctrineId) {
      return buildWave6BreakpointPrimaryChoices(build, rng, nextWave);
    }
    if (build && !build.bastionDoctrineId) {
      const doctrineChoices = Object.values(BASTION_DOCTRINE_DEFS)
        .map((doctrine) => createBastionDoctrineChoice(build, doctrine, rng, nextWave))
        .filter(Boolean);
      const forecastDoctrine =
        build.architectureForecastId ? getBastionDoctrineDef(build.architectureForecastId) : null;
      sortChoicesForDoctrine(doctrineChoices, forecastDoctrine);
      return doctrineChoices.slice(0, 3);
    }
    const spikeChoice = createDoctrineChaseChoice(build, { nextWave, finalForge: false }) ||
      createBastionDraftSpikeChoice(build, rng, nextWave);
    const choices = [];
    if (spikeChoice) {
      choices.push(spikeChoice);
    }
    choices.push(createBastionDraftPactChoice());
    choices.push({
      type: "fallback",
      id: "bastion:emergency_vent",
      tag: "VENT",
      title: "Emergency Vent",
      description: "Act 2 draft를 거절하고 열과 체력만 정리한 채 다음 웨이브로 바로 넘긴다.",
      slotText: "무료 안정화",
      cost: 0,
      laneLabel: "안정화",
    });
    return choices;
  }

  function buildFieldGrantChoices(build, rng, nextWave) {
    const wildcardChoice = createWildcardProtocolChoice(build, nextWave);
    if (shouldUseLateFieldCache(nextWave)) {
      if (isArsenalBreakpointWave(nextWave)) {
        return [
          createFieldGrantCard(createLateFieldMutationChoice(build, nextWave)),
          createFieldGrantCard(createLateFieldAegisChoice(build, nextWave)),
          createFieldGrantCard(createLateFieldGreedContractChoice(build, nextWave)),
        ]
          .filter(Boolean)
          .map((choice, index) =>
            markForgeContract(
              choice,
              index === 0 ? "headline" : index === 1 ? "rider" : "gamble",
              index === 0
                ? "Headline Mutation"
                : index === 1
                  ? "Support / Defense Rider"
                  : "Greed / Utility Gamble"
            )
          );
      }
      const convergenceChoice = createLateFieldConvergenceChoice(build, nextWave);
      const systemChoice = createLateFieldSystemChoice(build, rng, nextWave);
      const riderChoice = systemChoice || createLateFieldAegisChoice(build, nextWave);
      const gambleChoice = wildcardChoice || createLateFieldGreedContractChoice(build, nextWave);
      return [
        createFieldGrantCard(convergenceChoice || createLateFieldMutationChoice(build, nextWave)),
        createFieldGrantCard(riderChoice),
        createFieldGrantCard(gambleChoice),
      ]
        .filter(Boolean)
        .map((choice, index) =>
          markForgeContract(
            choice,
            index === 0 ? "headline" : index === 1 ? "rider" : "gamble",
            index === 0
              ? "Headline Mutation"
              : index === 1
                ? "Support / Defense Rider"
                : "Greed / Utility Gamble"
          )
        );
    }
    const pool = buildForgeChoices(build, rng, FIELD_GRANT_MAX_COST, {
      nextWave,
      finalForge: false,
      fastGrant: true,
    })
      .filter(isEligibleFieldGrantChoice)
      .sort((left, right) => {
        const scoreDelta = scoreFieldGrantChoice(right) - scoreFieldGrantChoice(left);
        if (scoreDelta !== 0) {
          return scoreDelta;
        }
        return (right.cost || 0) - (left.cost || 0);
      });
    const dominantMutationChoice =
      createDominantMutationChoice(build, nextWave) ||
      pool.find(
        (choice) =>
          choice &&
          (choice.type === "evolution" ||
            (choice.type === "utility" && choice.action === "predator_bait"))
      ) ||
      null;
    const survivalChoice =
      createFieldGrantDefenseChoice(build, rng, nextWave, pool) || {
      type: "fallback",
      id: "fieldgrant:emergency_vent",
      tag: "CACHE",
      title: "Emergency Vent",
      description: "고철을 쓰지 않고 열과 체력만 정리한 채 다음 웨이브로 바로 넘긴다.",
      slotText: "현장 보급",
      cost: 0,
      laneLabel: "Defense / Utility",
    };
    const greedChoice = createFieldGreedContractChoice(build, nextWave);
    const gambleChoice = wildcardChoice || greedChoice;
    const choices = [
      dominantMutationChoice
        ? createFieldGrantCard(dominantMutationChoice)
        : createFieldGrantCard({
            type: "fallback",
            id: "fieldgrant:mutation_fallback",
            tag: "CACHE",
            title: "Emergency Vent",
            description: "이번 캐시는 변이 회로가 비어 있어 상태만 정리한다.",
            slotText: "현장 보급",
            cost: 0,
            laneLabel: "Main Weapon Mutation",
          }),
      createFieldGrantCard(survivalChoice),
      gambleChoice
        ? createFieldGrantCard(gambleChoice)
        : createFieldGrantCard({
            type: "fallback",
            id: `fieldgrant:gamble_fallback:${nextWave}`,
            tag: "CACHE",
            title: "Emergency Vent",
            description: "이번 캐시는 탐욕/유틸 카드가 비어 있어 열과 체력만 정리한다.",
            slotText: "현장 보급",
            cost: 0,
            laneLabel: "Greed / Utility",
          }),
    ]
      .filter(Boolean)
      .map((choice, index) =>
        markForgeContract(
          choice,
          index === 0 ? "headline" : index === 1 ? "rider" : "gamble",
          index === 0
            ? "Headline Mutation"
            : index === 1
              ? "Support / Defense Rider"
              : "Greed / Utility Gamble"
        )
      );
    return choices;
  }

  function buildCatalystDraftChoices(build) {
    if (!build) {
      return [];
    }
    const capstone = CATALYST_REFORGE_DEFS[build.coreId];
    const support = FINAL_CASHOUT_SUPPORT_DEFS[build.coreId];
    const choices = [];
    if (capstone) {
      const capstoneChoice = createCatalystReforgeChoice(build);
      if (capstoneChoice) {
        choices.push(
          markForgeLane(
            annotateFinaleChoice(
              {
                ...capstoneChoice,
                cost: 0,
                tag: "IGNITE",
                slotText: `Act 3 점화 · ${capstoneChoice.slotText}`,
                description: `${capstoneChoice.description} 지금 점화하면 남은 Act 3 웨이브 전체를 ${capstone.label} 형태로 싸운다.`,
              },
              getFinalCashoutPreview({ catalystCapstoneId: capstone.id })
            ),
            "촉매 점화"
          )
        );
      }
    }
    if (support) {
      const supportChoice = createCashoutSupportChoice(build, {
        allowWithoutCatalyst: false,
        costOverride: 0,
      });
      if (supportChoice) {
        choices.push(
          markForgeLane(
            annotateFinaleChoice(
              {
                ...supportChoice,
                tag: "STABILIZE",
                slotText: `Act 3 안정화 · ${supportChoice.slotText}`,
                description: `${supportChoice.description} 지금 안정화하면 남은 Act 3 웨이브를 이 운영형 회로로 미리 시험한다.`,
              },
              getFinalCashoutPreview({ cashoutSupportId: support.id })
            ),
            "촉매 안정화"
          )
        );
      }
    }
    choices.push(
      markForgeLane(
        {
          type: "fallback",
          id: "catalyst:emergency_vent",
          tag: "VENT",
          title: "Emergency Vent",
          description: "촉매는 보관한 채 열과 체력만 정리하고 다음 웨이브로 넘긴다. 이후 일반 포지에서도 촉매 카드는 다시 뜰 수 있다.",
          slotText: "촉매 보류",
          cost: 0,
        },
        "보류"
      )
    );
    return choices;
  }

  function enterArchitectureDraft() {
    state.phase = "forge";
    state.pendingFinalForge = false;
    state.forgeStep = 1;
    state.forgeMaxSteps = 1;
    state.forgeDraftType = "architecture_draft";
    state.forgeChoices = buildArchitectureDraftChoices(state.build);
    pushCombatFeed(
      CONSOLIDATED_12_WAVE_ROUTE
        ? "Core Lock 개시. 이번 정지에서는 주포 실루엣 하나만 먼저 잠근다. 차체 점프는 Wave 6, 더 큰 지원 연출은 Wave 8 이후로 미뤄 opening을 lean하게 유지한다."
        : "Architecture Draft 개시. 이제 Wave 3에서는 세 장기 교리 중 하나를 골라 주포 mutation만 먼저 잠근다. utility chassis는 Wave 6, support bay와 off-doctrine flex lane은 Wave 8 Late Break Armory에서 열려 opening run이 과하게 완성되지 않는다.",
      "ARCH"
    );
    setBanner(CONSOLIDATED_12_WAVE_ROUTE ? "Core Lock" : "Architecture Draft", 0.95);
    renderForgeOverlay();
    updateHUD();
  }

  function enterFieldGrant() {
    const nextWave = state.waveIndex + 2;
    const wildcardProtocol = getWildcardProtocolForWave(nextWave);
    state.phase = "forge";
    state.pendingFinalForge = false;
    state.forgeStep = 1;
    state.forgeMaxSteps = 1;
    state.forgeDraftType = "field_grant";
    state.forgeChoices = buildFieldGrantChoices(state.build, Math.random, nextWave);
    pushCombatFeed(
      shouldUseLateFieldCache(nextWave)
        ? CONSOLIDATED_12_WAVE_ROUTE
          ? isArsenalBreakpointWave(nextWave)
            ? "Late Form 개시. 이번 정지에는 세 장만 뜬다. 화면을 넓게 먹는 main leap 하나, 오래 버티게 하는 rider 하나, 판돈을 키우는 gamble 하나뿐이다."
            : "Field Break 개시. 세 장 중 하나만 집고 바로 다음 웨이브로 밀어붙인다. 큰 form jump가 먼저고, rider와 gamble은 그 다음이다."
          : isArsenalBreakpointWave(nextWave)
          ? `Arsenal Breakpoint 확보. 이번 Wave ${nextWave} 직전 캐시는 후반부 재상승 판돈으로 승격되어, 과격한 주포 변이, 생존형 halo, 금고 습격 계약 중 하나를 즉시 잠근다.`
          : "Arsenal Cache 확보. Wave 10 이후 짝수 late wave마다 대형 현장 패키지가 열려 주포 변이, 재충전 방어층, 즉시 raid를 여는 블랙마켓 계약 중 하나를 잠근다."
        : nextWave >= RISK_MUTATION_START_WAVE
        ? "Field Cache 확보. 이제 현장 선택은 Main Weapon Mutation, Defense / Utility, Greed Contract 세 욕구만 남기고 바로 다음 웨이브로 밀어붙인다."
        : "Field Cache 확보. 이제 현장 선택은 주포 변이, 생존층, 탐욕 계약 세 장으로만 나와 즉시 판돈을 고르게 한다.",
      "CACHE"
    );
    if (wildcardProtocol && !CONSOLIDATED_12_WAVE_ROUTE) {
      pushCombatFeed(
        `${wildcardProtocol.title} 프로토콜 감지. 이번 캐시에서는 교리 예약 lane 바깥의 불법 차체/시스템 패키지가 섞여 들어와, 런 축 자체를 옆으로 꺾을 수 있다.`,
        "WILD"
      );
    }
    setBanner(
      CONSOLIDATED_12_WAVE_ROUTE
        ? nextWave >= 9
          ? "Late Form"
          : "Field Break"
        : shouldUseLateFieldCache(nextWave)
        ? isArsenalBreakpointWave(nextWave)
          ? "Arsenal Breakpoint"
          : "Arsenal Cache"
        : "Field Cache",
      0.95
    );
    renderForgeOverlay();
    updateHUD();
  }

  function getCombatCacheChoicesForWave(build, nextWave, scrapBank = Number.POSITIVE_INFINITY) {
    if (shouldUseCompactActBreakCache({ nextWave, finalForge: false })) {
      return buildCompactActBreakCacheChoices(build, Math.random, scrapBank);
    }
    return buildFieldGrantChoices(build, Math.random, nextWave).slice(0, 3);
  }

  function deployCombatCache(enemy) {
    const combatCache = state.wave && state.wave.combatCache;
    if (!combatCache || combatCache.deployed || combatCache.claimed) {
      return;
    }
    const choices = Array.isArray(combatCache.choices) ? combatCache.choices.filter(Boolean) : [];
    if (choices.length === 0) {
      combatCache.deployed = true;
      combatCache.claimed = true;
      return;
    }
    combatCache.deployed = true;
    combatCache.groupId = `combat-cache-${state.waveIndex + 1}-${state.stats.kills}`;
    const spreadRadius = choices.length === 1 ? 0 : 34;
    choices.forEach((choice, index) => {
      const angle = (index / choices.length) * Math.PI * 2 - Math.PI / 2;
      state.drops.push({
        kind: "combat_cache",
        x: enemy.x + Math.cos(angle) * spreadRadius,
        y: enemy.y + Math.sin(angle) * spreadRadius,
        life: COMBAT_CACHE_DROP_LIFE,
        choice,
        groupId: combatCache.groupId,
      });
    });
    const cacheSummary = choices
      .map((choice) => `${choice.tag} ${choice.title}${choice.cost > 0 ? `(${choice.cost})` : ""}`)
      .join(" / ");
    const hasDominantMutation = choices.some(
      (choice) => choice.action === "risk_mutation" || choice.action === "predator_bait"
    );
    const compactActBreak = combatCache.variant === "act_break_cache";
    pushCombatFeed(
      compactActBreak
        ? `Act Break Cache 노출. ${cacheSummary} 중 하나만 집고 Wave 5로 바로 밀어붙인다. 초반 armory 2픽 대신 현장에서 주력 스파이크를 직접 잠그는 전투형 breakpoint다.`
        : hasDominantMutation
        ? `Mutation Cache 노출. ${cacheSummary} 중 한 장만 집을 수 있으며, 가장 큰 카드는 late monster form을 다음 웨이브까지 직접 끌고 간다.`
        : `Combat Cache 노출. ${cacheSummary} 중 하나를 전장에서 직접 회수하면 다음 웨이브로 즉시 연결된다.`,
      "CACHE"
    );
    setBanner(compactActBreak ? "Act Break Cache" : "Combat Cache", 0.9);
  }

  function deployStormArtilleryAfterburnAscension(enemy) {
    const ascension = state.wave && state.wave.afterburnAscension;
    if (!ascension || ascension.deployed || ascension.claimed) {
      return;
    }
    const choices = Array.isArray(ascension.choices) ? ascension.choices.filter(Boolean) : [];
    if (choices.length === 0) {
      ascension.deployed = true;
      ascension.claimed = true;
      return;
    }
    ascension.deployed = true;
    ascension.groupId = `afterburn-ascension-${state.waveIndex + 1}-${state.stats.kills}`;
    state.build.afterburnAscensionOffered = true;
    const spreadRadius = choices.length === 1 ? 0 : 44;
    choices.forEach((choice, index) => {
      const angle = (index / choices.length) * Math.PI - Math.PI / 2;
      state.drops.push({
        kind: "afterburn_ascension_cache",
        x: enemy.x + Math.cos(angle) * spreadRadius,
        y: enemy.y + Math.sin(angle) * spreadRadius,
        life: AFTERBURN_ASCENSION_DROP_LIFE,
        choice,
        groupId: ascension.groupId,
      });
    });
    pushCombatFeed(
      "Afterburn split 노출. Storm Artillery가 두 endform으로 갈라졌다. 압박 속에서 하나만 회수하면 남은 afterburn이 그 몸으로 굳는다.",
      "ASCEND"
    );
    setBanner("Afterburn Ascension", 0.95);
  }

  function deployFinaleMutation(enemy) {
    const finaleMutation = state.wave && state.wave.finaleMutation;
    if (!finaleMutation || finaleMutation.deployed || finaleMutation.claimed) {
      return;
    }
    const choices = Array.isArray(finaleMutation.choices)
      ? finaleMutation.choices.filter(Boolean)
      : [];
    if (choices.length === 0) {
      finaleMutation.deployed = true;
      finaleMutation.claimed = true;
      return;
    }
    finaleMutation.deployed = true;
    finaleMutation.groupId = `finale-mutation-${state.waveIndex + 1}-${state.stats.kills}`;
    const spreadRadius = choices.length === 1 ? 0 : 46;
    choices.forEach((choice, index) => {
      const angle = (index / choices.length) * Math.PI * 2 - Math.PI / 2;
      state.drops.push({
        kind: "finale_mutation_cache",
        x: enemy.x + Math.cos(angle) * spreadRadius,
        y: enemy.y + Math.sin(angle) * spreadRadius,
        life: COMBAT_CACHE_DROP_LIFE,
        choice,
        groupId: finaleMutation.groupId,
      });
    });
    pushCombatFeed(
      "Act 4 mutation cache 노출. 마지막 포지 없이 하나의 splice만 전장에서 집어 남은 Afterburn escalation을 고정한다.",
      "LAST"
    );
    setBanner("Act 4 Splice", 0.95);
  }

  function deployAfterburnOverdrive(enemy) {
    const overdrive = state.wave && state.wave.afterburnOverdrive;
    if (!overdrive || overdrive.deployed || overdrive.claimed) {
      return;
    }
    const choices = Array.isArray(overdrive.choices) ? overdrive.choices.filter(Boolean) : [];
    if (choices.length === 0) {
      overdrive.deployed = true;
      overdrive.claimed = true;
      return;
    }
    overdrive.deployed = true;
    overdrive.groupId = `afterburn-overdrive-${state.waveIndex + 1}-${state.stats.kills}`;
    const spreadRadius = choices.length === 1 ? 0 : 54;
    choices.forEach((choice, index) => {
      const angle = (index / choices.length) * Math.PI * 2 - Math.PI / 2;
      state.drops.push({
        kind: "afterburn_overdrive_cache",
        x: enemy.x + Math.cos(angle) * spreadRadius,
        y: enemy.y + Math.sin(angle) * spreadRadius,
        life: AFTERBURN_OVERDRIVE_DROP_LIFE,
        choice,
        groupId: overdrive.groupId,
      });
    });
    pushCombatFeed(
      "Endform Overdrive 노출. Afterburn 중반 elite가 세 개의 최종 body splice를 떨궜다. 하나만 회수하면 남은 endurance가 새 endform jump로 다시 굳는다.",
      "OVR"
    );
    setBanner("Endform Overdrive", 0.95);
  }

  function deployAfterburnDominion(enemy) {
    const dominion = state.wave && state.wave.afterburnDominion;
    if (!dominion || dominion.deployed || dominion.claimed) {
      return;
    }
    const choices = Array.isArray(dominion.choices) ? dominion.choices.filter(Boolean) : [];
    if (choices.length === 0) {
      dominion.deployed = true;
      dominion.claimed = true;
      return;
    }
    dominion.deployed = true;
    dominion.groupId = `afterburn-dominion-${state.waveIndex + 1}-${state.stats.kills}`;
    choices.forEach((choice) => {
      state.drops.push({
        kind: "afterburn_dominion_cache",
        x: enemy.x,
        y: enemy.y,
        life: AFTERBURN_DOMINION_DROP_LIFE,
        choice,
        groupId: dominion.groupId,
      });
    });
    pushCombatFeed(
      "Dominion Break 노출. 이번 elite가 주무장 전용 endform cache를 떨궜다. 회수하면 다음 bracket 하나가 승리 랩으로 재구성된다.",
      "DOM"
    );
    setBanner("Dominion Break", 0.95);
  }

  function deployLateAscension(enemy) {
    const ascension = state.wave && state.wave.lateAscension;
    if (!ascension || ascension.deployed || ascension.claimed) {
      return;
    }
    const choices = Array.isArray(ascension.choices) ? ascension.choices.filter(Boolean) : [];
    if (choices.length === 0) {
      ascension.deployed = true;
      ascension.claimed = true;
      return;
    }
    ascension.deployed = true;
    ascension.groupId = `late-ascension-${state.waveIndex + 1}-${state.stats.kills}`;
    state.build.lateAscensionOffered = true;
    const spreadRadius = choices.length === 1 ? 0 : 42;
    choices.forEach((choice, index) => {
      const angle = (index / choices.length) * Math.PI - Math.PI / 2;
      state.drops.push({
        kind: "late_ascension_cache",
        x: enemy.x + Math.cos(angle) * spreadRadius,
        y: enemy.y + Math.sin(angle) * spreadRadius,
        life: LATE_ASCENSION_DROP_LIFE,
        choice,
        groupId: ascension.groupId,
      });
    });
    pushCombatFeed(
      "Ascension Core 노출. 주포/차체가 두 금지 형태로 갈라졌다. 하나만 회수하면 이후 late waves 전체가 그 몸으로 굳는다.",
      "ASCEND"
    );
    setBanner("Ascension Core", 0.95);
  }

  function getBastionDraftIntroText(build) {
    if (!build || !build.bastionDoctrineId) {
      return "아직 doctrine lock이 비어 있다. 이번 Bastion Draft는 fallback 상태지만 원래는 Wave 3에서 monster form이 먼저 잠겨야 한다.";
    }
    if (build.overcommitUnlocked && !build.doctrineChaseClaimed) {
      return "방금 회수한 contraband salvage가 열려 있다. 이번 Bastion Draft에서는 이미 잠근 monster form 위에 장기 Forge Pursuit 계약, 고통 계약, 무료 안정화 중 하나를 얹어 Act 2 greed를 직접 결정한다.";
    }
    if (!build.overcommitResolved) {
      return "아직 overcommit salvage를 못 챙겼다. 이번 초반 교전에서 marked elite를 부숴 contraband salvage를 전부 회수해야만 이미 잠긴 monster form의 pursuit branch가 열린다.";
    }
    return "이미 잠긴 monster form 위에 추가 spike 1장, 고통 계약 1장, 무료 안정화 1장 중 하나로 Act 2 greed를 더 밀어붙인다.";
  }

  function enterBastionDraft() {
    const nextWave = state.waveIndex + 2;
    const wave6AscensionDraft =
      nextWave === 6 &&
      state.build &&
      !state.build.bastionDoctrineId;
    state.phase = "forge";
    state.pendingFinalForge = false;
    state.forgeStep = 1;
    state.forgeMaxSteps = 1;
    state.forgeDraftType = "bastion_draft";
    state.forgeChoices = buildBastionDraftChoices(state.build, Math.random, nextWave);
    pushCombatFeed(
      CONSOLIDATED_12_WAVE_ROUTE
        ? wave6AscensionDraft
          ? "Chassis Break 개시. 이번 정지는 Act 2에서 오래 끌 body plan을 고르는 순간이다. support bay와 외도 lane은 아직 닫아 두고 core gun/body만 먼저 굳힌다."
          : "Forge Break 개시. 이번 브레이크는 이미 키운 주력 위에 더 큰 leap 하나를 얹거나, 숨통을 틔울 rider 하나를 더하거나, 판돈을 욕심내는 셋 중 하나만 고르게 한다."
        : wave6AscensionDraft
          ? "Wave 6 Ascension Draft 개시. 세 장기 교리 중 하나를 irreversible form으로 잠그면 주포 mutation과 utility chassis까지만 먼저 굳힌다. support bay와 doctrine-free flex lane은 아직 열지 않고 Wave 8 Late Break Armory까지 늦춰 mid-run 실루엣을 lean하게 유지한다."
          : `Bastion Draft 개시. ${getBastionDraftIntroText(state.build)}`,
      "DRAFT"
    );
    setBanner(
      CONSOLIDATED_12_WAVE_ROUTE
        ? wave6AscensionDraft
          ? "Chassis Break"
          : "Forge Break"
        : wave6AscensionDraft
          ? "Ascension Draft"
          : "Bastion Draft",
      0.95
    );
    renderForgeOverlay();
    updateHUD();
  }

  function enterCatalystDraft() {
    state.phase = "forge";
    state.pendingFinalForge = false;
    state.forgeStep = 1;
    state.forgeMaxSteps = 1;
    state.forgeDraftType = "catalyst_draft";
    state.build.act3CatalystDraftSeen = true;
    state.forgeChoices = buildCatalystDraftChoices(state.build);
    pushCombatFeed(
      CONSOLIDATED_12_WAVE_ROUTE
        ? "Late Form 개시. 여기서 고르는 한 장이 남은 9-12웨이브의 주력 실루엣을 사실상 결정한다. 먼저 main leap를 고르고, 곧바로 그 형태가 화면을 얼마나 먹는지 증명한다."
        : "Catalyst Crucible 개시. 회수한 촉매를 지금 점화해 Act 3 본편을 괴물 형태로 싸울지, 안정화 회로로 남은 bracket을 운영형으로 비틀지 정한다.",
      "CAT"
    );
    setBanner(CONSOLIDATED_12_WAVE_ROUTE ? "Late Form" : "Catalyst Crucible", 0.95);
    renderForgeOverlay();
    updateHUD();
  }

  function getActiveForgeModeLabel() {
    if (state.pendingFinalForge) {
      return CONSOLIDATED_12_WAVE_ROUTE ? "Wave 12 Seal" : "Final Forge";
    }
    if (CONSOLIDATED_12_WAVE_ROUTE && state.phase === "forge") {
      return getBaseRouteForgeStage(state).label;
    }
    if (state.forgeDraftType === "architecture_draft") {
      return "Architecture Draft";
    }
    if (state.forgeDraftType === "field_grant") {
      return shouldUseLateFieldCache(state.waveIndex + 2) ? "Arsenal Cache" : "Field Cache";
    }
    if (state.forgeDraftType === "bastion_draft") {
      return "Bastion Draft";
    }
    if (state.forgeDraftType === "catalyst_draft") {
      return "Catalyst Crucible";
    }
    if (state.forgeDraftType === "armory") {
      return getArmoryLabel({
        finalForge: state.pendingFinalForge,
        nextWave: state.waveIndex + 2,
        build: state.build,
      });
    }
    if (state.forgeMaxSteps > 1 && state.forgeStep === 2) {
      return "Rider Slot";
    }
    return "Three-Lane Forge";
  }

  function shouldUseBaseRouteForgeContract(run = state) {
    return Boolean(
      CONSOLIDATED_12_WAVE_ROUTE &&
        run &&
        run.phase === "forge" &&
        (run.pendingFinalForge || run.waveIndex < MAX_WAVES)
    );
  }

  function getBaseRouteForgeStage(run = state, nextWave = null) {
    if (!run) {
      return { id: "forge_break", label: "Forge Break" };
    }
    if (run.pendingFinalForge) {
      return { id: "final_seal", label: "Final Seal" };
    }
    if (run.phase === "forge" && run.forgeMaxSteps > 1 && run.forgeStep === 2) {
      return { id: "proof_loadout", label: "Proof Loadout" };
    }
    const upcomingWave = Number.isFinite(nextWave) ? nextWave : run.waveIndex + 2;
    if (shouldRunArchitectureDraft({ nextWave: upcomingWave, finalForge: false })) {
      return { id: "core_lock", label: "Core Lock" };
    }
    if (shouldUseCompactActBreakCache({ nextWave: upcomingWave, finalForge: false })) {
      return { id: "chassis_break", label: "Chassis Break" };
    }
    if (shouldRunCatalystDraft({ nextWave: upcomingWave, finalForge: false }, run.build)) {
      return { id: "late_form", label: "Late Form" };
    }
    if (shouldUseFieldGrant({ nextWave: upcomingWave, finalForge: false })) {
      return upcomingWave >= LATE_BREAK_ARMORY_WAVE
        ? { id: "proof_loadout", label: "Proof Loadout" }
        : { id: "field_break", label: "Field Break" };
    }
    return upcomingWave >= LATE_BREAK_ARMORY_WAVE
      ? { id: "late_form", label: "Late Form" }
      : { id: "forge_break", label: "Forge Break" };
  }

  function getBaseRouteForgeContractLabel(role, choice, riderStep = false) {
    if (riderStep) {
      return getBaseRouteForgeStage(state).label;
    }
    return getBaseRouteForgeStage(state).label;
  }

  function getBaseRouteForgeBannerLabel(run = state) {
    return getBaseRouteForgeStage(run).label;
  }

  function getForgeDisplayModeLabel() {
    if (shouldUseBaseRouteForgeContract()) {
      return getBaseRouteForgeStage(state).label;
    }
    return getActiveForgeModeLabel();
  }

  function buildForgeFollowupChoices(build, rng, scrapBank, options = null, previousChoice = null) {
    const random = typeof rng === "function" ? rng : Math.random;
    const nextWave = options && Number.isFinite(options.nextWave) ? options.nextWave : 0;
    if (shouldRunActBreakArmory(options)) {
      const riderChoices = buildForgeRiderChoices(build, random, nextWave, previousChoice);
      if (riderChoices.length > 0) {
        return riderChoices;
      }
    }
    const packageFollowup = shouldForceForgePackage(options);
    const choices = packageFollowup
      ? buildForgeRiderChoices(build, random, nextWave, previousChoice)
      : buildForgeChoices(build, random, scrapBank, options).filter((choice) => {
          if (!choice || choice.type === "system") {
            return false;
          }
          if (previousChoice && choice.id === previousChoice.id) {
            return false;
          }
          return true;
        });
    if (choices.length > 0) {
      return choices;
    }
    return [
      markForgeLane(
        {
          type: "fallback",
          id: "fallback:emergency_vent",
          tag: "무료",
          title: "Emergency Vent",
          description: "headline 변신 뒤 남은 rider slot을 무료 안정화로 마감한다.",
          slotText: "패키지 보정",
          cost: 0,
        },
        "생존/경제"
      ),
    ];
  }

  function applyForgeChoice(run, choice) {
    if (!run || !run.build || !choice) {
      return null;
    }

    if (choice.type === "core") {
      const pivotFuelSpent =
        choice.directOffer && choice.pivotFuelCoreId
          ? removeBenchCopies(run.build, choice.pivotFuelCoreId, choice.pivotFuelCopies || 1)
          : 0;
      const consumedCopies = Math.max(
        1,
        removeBenchCopies(run.build, choice.coreId, choice.benchCopies)
      );
      const existingCopies =
        run.build.coreId === choice.coreId ? Math.max(1, run.build.attunedCopies || 1) : 0;
      const totalCopies = clamp(existingCopies + consumedCopies, 1, MAX_BENCH_COPIES_PER_CORE);
      const previousCoreId = run.build.coreId;
      run.build.coreId = choice.coreId;
      run.build.attunedCoreId = choice.coreId;
      run.build.attunedCopies = totalCopies;
      if (previousCoreId !== choice.coreId) {
        run.build.catalystCapstoneId = null;
        run.build.cashoutSupportId = null;
        run.build.cashoutFailSoftId = null;
      }
      run.build.upgrades.push(
        choice.directOffer && choice.pivotFuelCoreId && pivotFuelSpent > 0
          ? `무기 전환: ${CORE_DEFS[choice.coreId].label} · ${CORE_DEFS[choice.pivotFuelCoreId].short} 연소 · ${formatSyncLabel(clamp(totalCopies - 1, 0, 3))}`
          : `무기 장착: ${CORE_DEFS[choice.coreId].label} · ${formatSyncLabel(clamp(totalCopies - 1, 0, 3))}`
      );
      if (run.player) {
        run.player.heat = Math.max(0, run.player.heat - 18);
        run.player.overheated = false;
      }
      return choice;
    }

    if (choice.type === "mod") {
      const mod = MOD_DEFS[choice.modId];
      mod.apply(run.build, run);
      run.build.upgrades.push(mod.label);
      return choice;
    }

    if (choice.type === "evolution") {
      const nextWeaponEvolutions = sanitizeWeaponEvolutionState(run.build.weaponEvolutions);
      nextWeaponEvolutions[choice.coreId] = Math.max(
        nextWeaponEvolutions[choice.coreId] || 0,
        choice.evolutionTier || 1
      );
      run.build.weaponEvolutions = nextWeaponEvolutions;
      run.build.upgrades.push(`주무장 진화: ${choice.title}`);
      return choice;
    }

    if (choice.type === "system") {
      const system = SUPPORT_SYSTEM_DEFS[choice.systemId];
      const tierDef = system && system.tiers[choice.systemTier];
      if (!system || !tierDef) {
        return null;
      }
      const installedSystems = getInstalledSupportSystems(run.build);
      const existingIndex = installedSystems.findIndex((entry) => entry.id === choice.systemId);
      let nextSystems;
      if (existingIndex >= 0) {
        nextSystems = installedSystems.slice();
        nextSystems[existingIndex] = {
          ...nextSystems[existingIndex],
          tier: Math.max(nextSystems[existingIndex].tier || 1, choice.systemTier || 1),
        };
      } else {
        nextSystems = installedSystems.concat({
          id: choice.systemId,
          tier: choice.systemTier || 1,
        });
      }
      run.build.supportSystems = sanitizeSupportSystems(nextSystems, run.build);
      run.build.supportSystemId = choice.systemId;
      run.build.supportSystemTier = choice.systemTier || 1;
      run.build.upgrades.push(
        `${existingIndex >= 0 ? "시스템 증설" : "시스템 설치"}: ${tierDef.label}`
      );
      return choice;
    }

    if (choice.type === "affix") {
      if (!canApplyAffixChoice(run.build, choice.affixId, choice.replaceTarget)) {
        return null;
      }
      const currentAffixes = sanitizeAffixIds(run.build.affixes, getAffixCapacity(run.build));
      run.build.affixes = choice.replaceTarget
        ? sanitizeAffixIds(
            currentAffixes.map((affixId) =>
              affixId === choice.replaceTarget ? choice.affixId : affixId
            ),
            getAffixCapacity(run.build)
          )
        : sanitizeAffixIds(currentAffixes.concat(choice.affixId), getAffixCapacity(run.build));
      if (choice.consumesCatalyst) {
        run.build.finisherCatalysts = sanitizeCatalystCoreIds(
          (run.build.finisherCatalysts || []).filter((coreId) => coreId !== run.build.coreId)
        );
      }
      run.build.cashoutSupportId = null;
      run.build.cashoutFailSoftId = null;
      run.build.upgrades.push(`속성 각인: ${AFFIX_DEFS[choice.affixId].label}`);
      return choice;
    }

    if (choice.type === "utility" && choice.action === "reforge") {
      if (Array.isArray(choice.nextCoreIds) && choice.nextCoreIds.length > 0) {
        run.build.pendingCores = sanitizeBenchCoreIds(choice.nextCoreIds);
        run.build.upgrades.push(`Reforge: ${summarizeBenchCoreIds(choice.nextCoreIds)}`);
        if (run.player) {
          run.player.heat = Math.max(0, run.player.heat - 24);
          run.player.overheated = false;
        }
      }
      return choice;
    }

    if (choice.type === "utility" && choice.action === "catalyst_reforge") {
      const capstone = CATALYST_REFORGE_DEFS[choice.catalystCoreId || run.build.coreId];
      if (!capstone) {
        return null;
      }
      capstone.apply(run.build, run);
      run.build.cashoutSupportId = null;
      run.build.cashoutFailSoftId = null;
      run.build.finisherCatalysts = sanitizeCatalystCoreIds(
        (run.build.finisherCatalysts || []).filter(
          (coreId) => coreId !== (choice.catalystCoreId || run.build.coreId)
        )
      );
      run.build.upgrades.push(`재구성: ${capstone.label}`);
      if (choice.liveCrucible && choice.crucibleStress) {
        const stress = choice.crucibleStress;
        run.build.maxHpBonus -= Math.max(0, stress.maxHpPenalty || 0);
        run.build.moveSpeedBonus -= Math.max(0, stress.moveSpeedPenalty || 0);
        run.build.coolRateBonus -= Math.max(0, stress.coolRatePenalty || 0);
        run.build.hazardMitigation -= Math.max(0, stress.hazardPenalty || 0);
        run.build.upgrades.push(
          `Catalyst Molt: 최대 체력 -${Math.max(0, stress.maxHpPenalty || 0)} / 이동 -${Math.max(0, stress.moveSpeedPenalty || 0)} / 냉각 -${Math.max(0, stress.coolRatePenalty || 0)} / hazard 완충 -${Math.round(Math.max(0, stress.hazardPenalty || 0) * 100)}%`
        );
      }
      return choice;
    }

    if (choice.type === "utility" && choice.action === "catalyst_crucible_ascension") {
      if (choice.mutationChoice) {
        applyForgeChoice(run, choice.mutationChoice);
      }
      if (choice.systemsBetChoice) {
        applyForgeChoice(run, {
          ...choice.systemsBetChoice,
          cost: 0,
        });
      }
      return choice;
    }

    if (choice.type === "utility" && choice.action === "cashout_support") {
      const support = FINAL_CASHOUT_SUPPORT_DEFS[choice.supportCoreId || run.build.coreId];
      if (!support) {
        return null;
      }
      run.build.catalystCapstoneId = null;
      run.build.cashoutFailSoftId = null;
      support.apply(run.build, run);
      run.build.finisherCatalysts = sanitizeCatalystCoreIds(
        (run.build.finisherCatalysts || []).filter(
          (coreId) => coreId !== (choice.supportCoreId || run.build.coreId)
        )
      );
      run.build.upgrades.push(`안정화: ${support.label}`);
      return choice;
    }

    if (choice.type === "utility" && choice.action === "cashout_failsoft") {
      const failSoft = FINAL_CASHOUT_FAILSOFT_DEFS[choice.supportCoreId || run.build.coreId];
      if (!failSoft) {
        return null;
      }
      run.build.catalystCapstoneId = null;
      run.build.cashoutSupportId = null;
      failSoft.apply(run.build, run);
      run.build.upgrades.push(`비상 점화: ${failSoft.label}`);
      return choice;
    }

    if (choice.type === "utility" && choice.action === "affix_reforge") {
      run.build.affixes = sanitizeAffixIds(
        (run.build.affixes || []).map((affixId) =>
          affixId === choice.targetAffixId ? choice.nextAffixId : affixId
        ),
        getAffixCapacity(run.build)
      );
      run.build.upgrades.push(
        `재각인: ${AFFIX_DEFS[choice.targetAffixId].label} -> ${AFFIX_DEFS[choice.nextAffixId].label}`
      );
      return choice;
    }

    if (choice.type === "utility" && choice.action === "risk_mutation") {
      const nextLevel = Number.isFinite(choice.riskMutationLevel)
        ? choice.riskMutationLevel
        : getRiskMutationLevel(run.build) + 1;
      run.build.riskMutationLevel = Math.max(getRiskMutationLevel(run.build), nextLevel);
      run.build.riskMutationQueuedLevel = Math.max(getRiskMutationQueuedLevel(run.build), nextLevel);
      let bundledIllegalNote = "";
      if (!run.build.illegalOverclockId) {
        const overclockId = getDominantMutationOverclockId(run.build);
        const overclock = getIllegalOverclockDef(overclockId);
        if (overclock) {
          run.build.illegalOverclockId = overclock.id;
          run.build.illegalOverclockOffered = true;
          if (typeof overclock.apply === "function") {
            overclock.apply(run.build, run);
          }
          bundledIllegalNote = ` / contraband splice ${overclock.label}`;
          run.build.upgrades.push(`Dominant Mutation splice: ${overclock.label}`);
        }
      }
      const targetIllegalMutationLevel = Math.min(
        MAX_ILLEGAL_OVERCLOCK_MUTATIONS,
        Math.floor(nextLevel / 2)
      );
      if (run.build.illegalOverclockId) {
        const overclock = getIllegalOverclockDef(run.build);
        while (getIllegalOverclockMutationLevel(run.build) < targetIllegalMutationLevel) {
          const illegalNextLevel = getIllegalOverclockMutationLevel(run.build) + 1;
          run.build.illegalOverclockMutationLevel = illegalNextLevel;
          if (overclock && typeof overclock.applyMutation === "function") {
            overclock.applyMutation(run.build, run, illegalNextLevel);
          }
          bundledIllegalNote = `${bundledIllegalNote} / ${getIllegalMutationTierLabel(illegalNextLevel)}`;
          run.build.upgrades.push(`Dominant Mutation molt ${illegalNextLevel}: ${(overclock && overclock.label) || "Contraband"}`);
        }
      }
      run.build.upgrades.push(
        `Dominant Mutation: ${choice.title}${bundledIllegalNote} / 다음 Wave ${choice.riskMutationWave || "?"} 압박세`
      );
      if (run.player) {
        run.player.heat = Math.max(0, run.player.heat - 12);
        run.player.overheated = false;
      }
      return choice;
    }

    if (choice.type === "utility" && choice.action === "recycle") {
      const scrapValue = Math.max(0, choice.scrapValue || 0);
      run.build.pendingCores = [];
      if (run.resources) {
        run.resources.scrap += scrapValue;
      }
      if (run.stats) {
        run.stats.scrapCollected += scrapValue;
      }
      run.build.upgrades.push(`분해: 고철 +${scrapValue}`);
      if (run.player) {
        run.player.hp = Math.min(run.player.maxHp, run.player.hp + 10);
        run.player.heat = Math.max(0, run.player.heat - 35);
        run.player.overheated = false;
      }
      return choice;
    }

    if (choice.type === "utility" && choice.action === "bastion_pact") {
      if (run.resources) {
        run.resources.scrap += Math.max(0, choice.scrapGain || 0);
      }
      if (run.stats) {
        run.stats.scrapCollected += Math.max(0, choice.scrapGain || 0);
      }
      run.build.scrapMultiplier += choice.scrapMultiplierGain || 0;
      run.build.maxHpBonus -= Math.max(0, choice.maxHpPenalty || 0);
      run.build.bastionPactDebtWaves = Math.max(
        run.build.bastionPactDebtWaves || 0,
        Math.max(0, choice.debtWaves || 0)
      );
      run.build.upgrades.push(
        `Bastion Pact: 고철 +${Math.max(0, choice.scrapGain || 0)} / 최대 체력 -${Math.max(0, choice.maxHpPenalty || 0)} / Siege Debt ${Math.max(0, choice.debtWaves || 0)}웨이브`
      );
      if (run.player) {
        run.player.hp = Math.max(1, run.player.hp - Math.max(0, choice.hpLoss || 0));
        run.player.heat = Math.max(0, run.player.heat - 24);
        run.player.overheated = false;
      }
      return choice;
    }

    if (choice.type === "utility" && choice.action === "bastion_bay_forge") {
      if (choice.bayUnlock) {
        applyAuxiliaryJunction(run.build);
        run.build.upgrades.push(
          choice.skipNextAdminStop
            ? "Chassis Breakpoint: flex bay +1 now, auto Wave 8 uplink"
            : "Auxiliary Junction: support bay +1 now, reserve Wave 8 bay"
        );
        if (choice.skipNextAdminStop) {
          run.build.wave6ChassisBreakpoint = true;
        }
      }
      if (choice.chassisId && applyChassisBreakpoint(run.build, choice.chassisId, run)) {
        const chassis = getChassisBreakpointDef(choice.chassisId);
        run.build.upgrades.push(`유틸리티 섀시: ${(chassis && chassis.label) || choice.chassisTitle || choice.chassisId}`);
        if (!choice.bayUnlock && CONSOLIDATED_12_WAVE_ROUTE) {
          run.build.upgrades.push("Chassis Breakpoint: support rider held for Wave 8");
        }
      }
      if (choice.systemChoice) {
        applyForgeChoice(run, {
          ...choice.systemChoice,
          cost: 0,
        });
      }
      return choice;
    }

    if (choice.type === "utility" && choice.action === "wave6_ascension") {
      applyForgeChoice(run, {
        type: "utility",
        action: "bastion_doctrine",
        doctrineId: choice.doctrineId,
        doctrineChoice: choice.doctrineChoice,
      });
      if (choice.chassisId && applyChassisBreakpoint(run.build, choice.chassisId, run)) {
        const chassis = getChassisBreakpointDef(choice.chassisId);
        run.build.upgrades.push(`유틸리티 섀시: ${(chassis && chassis.label) || choice.chassisTitle || choice.chassisId}`);
      }
      const pursuit = autoCommitDoctrinePursuit(run.build);
      const surgeProfile = activateWave6AscensionSurge(run, WAVE6_ASCENSION_ONLINE_SURGE_DURATION);
      run.build.upgrades.push(`Wave 6 Ascension: ${choice.title}`);
      if (surgeProfile) {
        run.build.upgrades.push(`Ascension Surge: ${choice.doctrineLabel || surgeProfile.id}`);
      }
      if (pursuit) {
        run.build.upgrades.push(`Ascension Relay: ${pursuit.shortLabel} 즉시 활성화`);
      }
      return choice;
    }

    if (choice.type === "utility" && choice.action === "bastion_doctrine") {
      const doctrine = getBastionDoctrineDef(choice.doctrineId || run.build);
      if (doctrine && run.build.bastionDoctrineId !== doctrine.id) {
        run.build.bastionDoctrineId = doctrine.id;
        run.build.architectureForecastId = doctrine.id;
        run.build.doctrineCapstoneId = null;
        run.build.afterburnAscensionOffered = false;
        run.build.doctrineChaseClaimed = false;
        doctrine.apply(run.build, run);
        run.build.upgrades.push(`교리 채택: ${doctrine.label}`);
      }
      if (choice.doctrineChoice) {
        applyForgeChoice(run, choice.doctrineChoice);
      }
      return choice;
    }

    if (choice.type === "utility" && choice.action === "architecture_forecast") {
      const doctrine = getBastionDoctrineDef(choice.doctrineId || run.build);
      if (!doctrine) {
        return choice;
      }
      run.build.architectureForecastId = doctrine.id;
      run.build.bastionDoctrineId = doctrine.id;
      run.build.doctrineCapstoneId = null;
      run.build.afterburnAscensionOffered = false;
      run.build.doctrineChaseClaimed = false;
      run.build.doctrinePursuitCommitted = false;
      run.build.doctrinePursuitProgress = 0;
      run.build.doctrinePursuitExpired = false;
      doctrine.apply(run.build, run);
      run.build.upgrades.push(`Monster Form Lock: ${doctrine.label}`);
      if (choice.weaponChoice) {
        applyForgeChoice(run, choice.weaponChoice);
      }
      return choice;
    }

    if (choice.type === "utility" && choice.action === "doctrine_chase") {
      const pursuit = getDoctrineForgePursuitDef(run.build);
      run.build.doctrinePursuitCommitted = true;
      run.build.doctrinePursuitProgress = 0;
      run.build.doctrinePursuitExpired = false;
      run.build.upgrades.push(
        `교리 추격 개시: ${(pursuit && pursuit.label) || choice.pursuitLabel || choice.capstoneLabel || choice.doctrineLabel || "Doctrine Frame"}`
      );
      return choice;
    }

    if (choice.type === "utility" && choice.action === "doctrine_capstone") {
      const capstone = getDoctrineCapstoneDef(choice.doctrineCapstoneId || run.build);
      if (!capstone) {
        return null;
      }
      run.build.doctrineCapstoneId = capstone.id;
      run.build.upgrades.push(`교리 완성: ${capstone.label}`);
      return choice;
    }

    if (choice.type === "utility" && choice.action === "late_ascension") {
      const ascension = getLateAscensionDef(choice.lateAscensionId || run.build);
      if (!ascension || run.build.lateAscensionId) {
        return null;
      }
      run.build.lateAscensionId = ascension.id;
      run.build.lateAscensionOffered = true;
      if (typeof ascension.apply === "function") {
        ascension.apply(run.build, run);
      }
      run.build.upgrades.push(`Ascension Core: ${ascension.label}`);
      if (run.player) {
        run.player.hp = Math.min(
          Math.max(1, run.player.hp),
          Math.max(1, 100 + run.build.maxHpBonus)
        );
      }
      return choice;
    }

    if (choice.type === "utility" && choice.action === "illegal_overclock") {
      if (run.build.illegalOverclockId) {
        return null;
      }
      const overclock = getIllegalOverclockDef(choice.illegalOverclockId);
      if (!overclock) {
        return null;
      }
      run.build.illegalOverclockId = overclock.id;
      run.build.illegalOverclockOffered = true;
      if (typeof overclock.apply === "function") {
        overclock.apply(run.build, run);
      }
      run.build.upgrades.push(`불법 과투입: ${overclock.label}`);
      if (run.player) {
        run.player.hp = Math.min(
          Math.max(1, run.player.hp),
          Math.max(1, 100 + run.build.maxHpBonus)
        );
        run.player.heat = Math.max(0, run.player.heat - 12);
        run.player.overheated = false;
      }
      return choice;
    }

    if (choice.type === "utility" && choice.action === "illegal_overclock_mutation") {
      const overclock = getIllegalOverclockDef(run.build);
      const nextLevel = Number.isFinite(choice.mutationLevel)
        ? choice.mutationLevel
        : getIllegalOverclockMutationLevel(run.build) + 1;
      if (
        !overclock ||
        run.build.illegalOverclockId !== choice.illegalOverclockId ||
        nextLevel <= getIllegalOverclockMutationLevel(run.build) ||
        nextLevel > MAX_ILLEGAL_OVERCLOCK_MUTATIONS
      ) {
        return null;
      }
      run.build.illegalOverclockMutationLevel = nextLevel;
      if (typeof overclock.applyMutation === "function") {
        overclock.applyMutation(run.build, run, nextLevel);
      }
      run.build.upgrades.push(`금지 변이 ${nextLevel}: ${overclock.label}`);
      if (run.player) {
        run.player.hp = Math.min(
          Math.max(1, run.player.hp),
          Math.max(1, 100 + run.build.maxHpBonus)
        );
        run.player.heat = Math.max(0, run.player.heat - 8);
        run.player.overheated = false;
      }
      return choice;
    }

    if (choice.type === "utility" && choice.action === "predator_bait") {
      if (getApexMutationLevel(run.build) >= MAX_APEX_MUTATION_LEVEL) {
        return null;
      }
      run.build.predatorBaitCharges = Math.max(1, (run.build.predatorBaitCharges || 0) + 1);
      run.build.upgrades.push(
        "Predator Bait: 다음 웨이브 조기 Cinder Maw / 적 예산 +24 / active cap +5"
      );
      if (run.player) {
        run.player.heat = Math.max(0, run.player.heat - 10);
        run.player.overheated = false;
      }
      return choice;
    }

    if (choice.type === "utility" && choice.action === "afterburn_overdrive") {
      const overdrive = getAfterburnOverdriveDef(choice.afterburnOverdriveId || run.build);
      if (!overdrive || run.build.afterburnOverdriveId) {
        return null;
      }
      run.build.afterburnOverdriveId = overdrive.id;
      run.build.upgrades.push(`Endform Overdrive: ${overdrive.label}`);
      if (run.player) {
        run.player.heat = Math.max(0, run.player.heat - 18);
        run.player.overheated = false;
        run.player.hp = Math.min(
          Math.max(1, run.player.hp + 8),
          Math.max(1, 100 + run.build.maxHpBonus)
        );
      }
      return choice;
    }

    if (choice.type === "utility" && choice.action === "afterburn_dominion") {
      const dominion = getAfterburnDominionDef(choice.afterburnDominionId || run.build);
      if (!dominion || run.build.afterburnDominionId) {
        return null;
      }
      run.build.afterburnDominionId = dominion.id;
      run.build.afterburnDominionVictoryLapWaves = Math.max(
        run.build.afterburnDominionVictoryLapWaves || 0,
        1
      );
      run.build.upgrades.push(`Dominion Break: ${dominion.label}`);
      if (run.player) {
        run.player.heat = Math.max(0, run.player.heat - 24);
        run.player.overheated = false;
        run.player.hp = Math.min(
          Math.max(1, run.player.hp + 14),
          Math.max(1, 100 + run.build.maxHpBonus)
        );
        run.player.invulnerableTime = Math.max(run.player.invulnerableTime || 0, 0.28);
      }
      return choice;
    }

    if (choice.type === "utility" && choice.action === "field_mutation") {
      const nextLevel = Math.max(getLateFieldMutationLevel(run.build), choice.lateFieldMutationLevel || 1);
      run.build.lateFieldMutationLevel = nextLevel;
      if (choice.arsenalBreakpointProfileId) {
        run.build.arsenalBreakpointProfileId = choice.arsenalBreakpointProfileId;
      }
      if (choice.lateBreakProfileId) {
        run.build.lateBreakProfileId = choice.lateBreakProfileId;
      }
      run.build.upgrades.push(`Field Arsenal MK ${nextLevel}: ${getLateFieldMutationTierLabel(nextLevel)}`);
      if (run.player) {
        run.player.heat = Math.max(0, run.player.heat - 16);
        run.player.overheated = false;
        run.player.lateFieldBroadsideCooldown = 0.16;
      }
      return choice;
    }

    if (choice.type === "utility" && choice.action === "field_aegis") {
      const nextLevel = Math.max(getLateFieldAegisLevel(run.build), choice.lateFieldAegisLevel || 1);
      run.build.lateFieldAegisLevel = nextLevel;
      if (choice.arsenalBreakpointProfileId) {
        run.build.arsenalBreakpointProfileId = choice.arsenalBreakpointProfileId;
      }
      if (choice.lateBreakProfileId) {
        run.build.lateBreakProfileId = choice.lateBreakProfileId;
      }
      run.build.upgrades.push(`Field Aegis MK ${nextLevel}: ${getLateFieldAegisTierLabel(nextLevel)}`);
      if (run.player) {
        run.player.fieldAegisCharge = getLateFieldAegisMaxCharges(run.build);
        run.player.fieldAegisCooldown = 0;
        run.player.invulnerableTime = Math.max(run.player.invulnerableTime || 0, 0.18);
      }
      return choice;
    }

    if (choice.type === "utility" && choice.action === "field_convergence") {
      if (run.build.lateFieldConvergenceId === choice.lateFieldConvergenceId) {
        return null;
      }
      const convergence = getLateFieldConvergenceDef(choice.lateFieldConvergenceId);
      run.build.lateFieldConvergenceId = choice.lateFieldConvergenceId;
      run.build.upgrades.push(
        `${choice.title || "Convergence Form"}: ${convergence ? convergence.traitLabel : "late branch form"}`
      );
      if (run.player) {
        run.player.heat = Math.max(0, run.player.heat - 20);
        run.player.overheated = false;
        run.player.invulnerableTime = Math.max(run.player.invulnerableTime || 0, 0.2);
      }
      return choice;
    }

    if (choice.type === "utility" && choice.action === "wildcard_protocol") {
      const protocol = WILDCARD_PROTOCOL_DEFS[choice.wildcardProtocolId];
      if (!protocol) {
        return null;
      }
      const claimedIds = new Set(getClaimedWildcardProtocolIds(run.build));
      if (claimedIds.has(protocol.id)) {
        return null;
      }
      if (typeof protocol.apply === "function") {
        protocol.apply(run.build, run);
      }
      run.build.wildcardProtocolIds = getClaimedWildcardProtocolIds(run.build).concat(protocol.id);
      run.build.upgrades.push(`Wildcard Protocol: ${protocol.title}`);
      if (run.player) {
        run.player.hp = Math.min(
          Math.max(1, run.player.hp + 8),
          Math.max(1, 100 + run.build.maxHpBonus)
        );
        run.player.heat = Math.max(0, run.player.heat - 18);
        run.player.overheated = false;
        run.player.invulnerableTime = Math.max(run.player.invulnerableTime || 0, 0.18);
      }
      return choice;
    }

    if (choice.type === "utility" && choice.action === "field_greed") {
      if (run.resources) {
        run.resources.scrap += Math.max(0, choice.scrapGain || 0);
      }
      if (run.stats) {
        run.stats.scrapCollected += Math.max(0, choice.scrapGain || 0);
      }
      run.build.scrapMultiplier += choice.scrapMultiplierGain || 0;
      run.build.pickupBonus += choice.pickupBonus || 0;
      run.build.blackLedgerRaidWaves = Math.max(
        run.build.blackLedgerRaidWaves || 0,
        Math.max(0, choice.blackLedgerRaidWaves || 0)
      );
      run.build.maxHpBonus -= Math.max(0, choice.maxHpPenalty || 0);
      run.build.bastionPactDebtWaves = Math.max(
        run.build.bastionPactDebtWaves || 0,
        Math.max(0, choice.debtWaves || 0)
      );
      if (choice.arsenalBreakpointProfileId) {
        run.build.arsenalBreakpointProfileId = choice.arsenalBreakpointProfileId;
      }
      if (choice.lateBreakProfileId) {
        run.build.lateBreakProfileId = choice.lateBreakProfileId;
      }
      run.build.upgrades.push(
        `${choice.title || "Greed Contract"}: 고철 +${Math.max(0, choice.scrapGain || 0)} / 회수 +${Math.round((choice.scrapMultiplierGain || 0) * 100)}%${choice.blackLedgerRaidWaves ? " / Black Ledger Raid" : ""} / Siege Debt ${Math.max(0, choice.debtWaves || 0)}웨이브`
      );
      if (run.player) {
        run.player.hp = Math.max(1, run.player.hp - Math.max(0, choice.hpLoss || 0));
        run.player.heat = Math.max(0, run.player.heat - 22);
        run.player.overheated = false;
      }
      return choice;
    }

    if (choice.type === "fallback" && run.player) {
      run.player.hp = Math.min(run.player.maxHp, run.player.hp + 16);
      run.player.heat = Math.max(0, run.player.heat - 60);
      run.player.overheated = false;
      run.build.upgrades.push("Emergency Vent");
      return choice;
    }

    return null;
  }

  function applyApexPredatorMutation(run) {
    if (!run || !run.build) {
      return null;
    }
    const currentLevel = getApexMutationLevel(run.build);
    if (currentLevel >= MAX_APEX_MUTATION_LEVEL) {
      return null;
    }
    const nextLevel = currentLevel + 1;
    run.build.apexMutationLevel = nextLevel;
    run.build.damageBonus += 3;
    run.build.moveSpeedBonus += 12;
    run.build.dashCooldownBonus += 0.14;
    run.build.maxHpBonus -= 5;
    run.build.coolRateBonus -= 2;
    run.build.upgrades.push(`Predator Molt ${nextLevel}: Cinder Maw`);
    let illegalMutationApplied = false;
    if (run.build.illegalOverclockId) {
      const illegalMutationChoice = createIllegalOverclockMutationChoice(run.build);
      if (illegalMutationChoice) {
        applyForgeChoice(run, illegalMutationChoice);
        illegalMutationApplied = true;
      }
    }
    if (run.player) {
      run.player.hp = Math.min(
        Math.max(1, run.player.hp),
        Math.max(1, 100 + run.build.maxHpBonus)
      );
      run.player.heat = Math.max(0, run.player.heat - 10);
      run.player.overheated = false;
    }
    return { nextLevel, illegalMutationApplied };
  }

  function createParticle(x, y, color, scale) {
    const speed = 40 + Math.random() * 120;
    const angle = Math.random() * Math.PI * 2;
    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 0.35 + Math.random() * 0.35,
      maxLife: 0.7,
      radius: (2 + Math.random() * 3) * (scale || 1),
      color,
    };
  }

  const exported = {
    GAME_TITLE,
    MAX_WAVES,
    WAVE_CONFIG,
    resolveWaveConfig,
    POST_CAPSTONE_WAVE_COUNT,
    FINAL_CASHOUT_DURATION,
    ENEMY_DEFS,
    CORE_DEFS,
    AFFIX_DEFS,
    MOD_DEFS,
    SUPPORT_SYSTEM_DEFS,
    CHASSIS_BREAKPOINT_DEFS,
    ILLEGAL_OVERCLOCK_DEFS,
    MAX_APEX_MUTATION_LEVEL,
    DOCTRINE_CAPSTONE_DEFS,
    SIGNATURE_DEFS,
    DEFAULT_SIGNATURE_ID,
    ACT_BREAK_ARMORY_WAVE,
    LATE_BREAK_ARMORY_WAVE,
    ACT3_CATALYST_DRAFT_WAVE,
    createInitialBuild,
    getSignatureDef,
    getActLabelForWave,
    computePlayerStats,
    computeWeaponStats,
    computeSupportSystemStats,
    getBenchEntries,
    getBenchCount,
    getBenchSyncLevel,
    sanitizeBenchCoreIds,
    hasFinisherCatalyst,
    buildCanEarnFinisherCatalyst,
    shouldFinishAfterForge,
    createPostCapstoneWave,
    createFinalCashoutWave,
    getFinalCashoutTransitionProfile,
    applyFinalCashoutTransition,
    chooseHazardSpawn,
    buildHazardCandidates,
    buildForgeChoices,
    buildForgeFollowupChoices,
    getCombatCacheChoicesForWave,
    buildArchitectureDraftChoices,
    buildFieldGrantChoices,
    createWildcardProtocolChoice,
    createLateFieldConvergenceChoice,
    buildBastionDraftChoices,
    buildWave6ChassisBreakpointChoices,
    createLateAscensionChoices,
    getAfterburnOverdriveDef,
    getAfterburnOverdriveChoices,
    createIllegalOverclockChoices,
    createIllegalOverclockMutationChoice,
    createPredatorBaitChoice,
    getApexMutationLevel,
    applyApexPredatorMutation,
    buildCatalystDraftChoices,
    applyForgeChoice,
    applyChassisBreakpoint,
    getSupportBayCapacity,
    getChassisBreakpointDef,
    getIllegalOverclockDef,
    doctrineAllowsSystemInstall,
    unlockLateSupportBay,
    shouldSkipOwnershipAdminStop,
    shouldUseFieldGrant,
    isArsenalBreakpointWave,
    shouldRunCatalystDraft,
    applyBlackLedgerRaidConfig,
    getDoctrineWeaponForm,
    getDoctrineBodyForm,
    getDoctrineCapstoneDef,
    getBuildRoadmap,
    getForgeEraPlan,
    getImmediateProofWindowSummary,
    getLateAscensionDef,
    getStandardLateRouteBeatSummary,
    getDoctrinePursuitCapstoneDef,
    getCatalystCapstone,
    shouldOpenForgePackage,
    getForgeHeadlineShowcase,
    createForgePreviewRows,
    getForgeChoiceTransformation,
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = exported;
  }

  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  window.CinderCircuitCore = exported;

  const elements = {
    titleScreen: document.getElementById("title-screen"),
    gameScreen: document.getElementById("game-screen"),
    resultScreen: document.getElementById("result-screen"),
    startRun: document.getElementById("start-run"),
    cycleSignature: document.getElementById("cycle-signature"),
    restartRun: document.getElementById("restart-run"),
    backToTitle: document.getElementById("back-to-title"),
    signatureCards: document.getElementById("signature-cards"),
    signatureSpotlight: document.getElementById("signature-spotlight"),
    arenaStage: document.getElementById("arena-stage"),
    waveLabel: document.getElementById("wave-label"),
    hpMeter: document.getElementById("hp-meter"),
    hpStat: document.getElementById("hp-stat"),
    hpFill: document.getElementById("hp-fill"),
    heatMeter: document.getElementById("heat-meter"),
    heatStat: document.getElementById("heat-stat"),
    heatFill: document.getElementById("heat-fill"),
    dashStat: document.getElementById("dash-stat"),
    driveMeter: document.getElementById("drive-meter"),
    driveStat: document.getElementById("drive-stat"),
    driveFill: document.getElementById("drive-fill"),
    timerStat: document.getElementById("timer-stat"),
    scrapStat: document.getElementById("scrap-stat"),
    activeCore: document.getElementById("active-core"),
    pendingCores: document.getElementById("pending-cores"),
    upgradeList: document.getElementById("upgrade-list"),
    buildRoadmap: document.getElementById("build-roadmap"),
    waveObjective: document.getElementById("wave-objective"),
    liveReadout: document.getElementById("live-readout"),
    forgeOverlay: document.getElementById("forge-overlay"),
    forgeSubtitle: document.getElementById("forge-subtitle"),
    forgeContext: document.getElementById("forge-context"),
    forgeCards: document.getElementById("forge-cards"),
    pauseOverlay: document.getElementById("pause-overlay"),
    resumeRun: document.getElementById("resume-run"),
    pauseRestart: document.getElementById("pause-restart"),
    pauseTitle: document.getElementById("pause-title"),
    runTrackLabel: document.getElementById("run-track-label"),
    waveTrack: document.getElementById("wave-track"),
    combatFeed: document.getElementById("combat-feed"),
    messageBanner: document.getElementById("message-banner"),
    resultTitle: document.getElementById("result-title"),
    resultCopy: document.getElementById("result-copy"),
    resultStats: document.getElementById("result-stats"),
    resultBuild: document.getElementById("result-build"),
    canvas: document.getElementById("game-canvas"),
  };

  const context = elements.canvas.getContext("2d");

  const input = {
    keys: new Set(),
    pointer: {
      x: ARENA_WIDTH / 2,
      y: ARENA_HEIGHT / 2,
      inside: false,
    },
  };

  let selectedSignatureId = DEFAULT_SIGNATURE_ID;
  let state = createAppState(selectedSignatureId);
  let lastFrameTime = 0;

  function setFill(element, ratio) {
    if (!element) {
      return;
    }
    element.style.width = `${clamp(ratio, 0, 1) * 100}%`;
  }

  function setTone(element, tone) {
    if (!element) {
      return;
    }
    element.dataset.state = tone;
  }

  function syncBodyState() {
    document.body.dataset.screen = state.screen;
    document.body.dataset.phase = state.phase;
    document.body.dataset.overdrive =
      state.player && state.player.overdriveActiveTime > 0 ? "true" : "false";
  }

  function createStatusRow(label, value) {
    return `<div class="status-list__row"><span>${label}</span><strong>${value}</strong></div>`;
  }

  function createMiniPill(label, value, modifier = "") {
    const className = modifier ? ` mini-pill--${modifier}` : "";
    return `<span class="mini-pill${className}"><span>${label}</span><strong>${value}</strong></span>`;
  }

  function describeHazardState(currentState = state) {
    const wave = currentState && currentState.wave;
    if (!wave || !wave.hazard || currentState.phase !== "wave") {
      return {
        chipLabel: "Hazard Idle",
        detailLabel: "폭주",
        detailValue: "없음",
        note: "현재 웨이브에는 잔불 폭주가 없다.",
        tone: "",
      };
    }

    if (currentState.hazards.length > 0) {
      const territoryHazards = currentState.hazards.filter(
        (hazard) =>
          hazard.type === "territory" &&
          hazard.telegraphTime <= 0 &&
          hazard.activeTime > 0
      );
      if (territoryHazards.length > 0) {
        return {
          chipLabel: `${wave.hazard.label} LIVE`,
          detailLabel: "점거 코어",
          detailValue: `${territoryHazards.length}개 활성`,
          note: `${territoryHazards.length}개 점거 코어가 화염 구역을 유지 중이다. 코어를 파괴하면 구역이 즉시 해제된다.`,
          tone: "summary-chip--hot",
        };
      }
      const relayHazards = currentState.hazards.filter(
        (hazard) => hazard.type === "relay" && hazard.telegraphTime <= 0 && hazard.activeTime > 0
      );
      if (relayHazards.length > 0) {
        return {
          chipLabel: `${wave.hazard.label} LIVE`,
          detailLabel: "relay pylon",
          detailValue: `${relayHazards.length}개 링크 중`,
          note: `${relayHazards.length}개 relay pylon이 화염 회랑을 엮고 있다. 먼 pylon 하나만 먼저 끊어도 연결선이 무너져 회전 루트가 열린다.`,
          tone: "summary-chip--hot",
        };
      }
      const driftHazards = currentState.hazards.filter(
        (hazard) => hazard.type === "drift" && hazard.telegraphTime <= 0 && hazard.activeTime > 0
      );
      if (driftHazards.length > 0) {
        return {
          chipLabel: `${wave.hazard.label} LIVE`,
          detailLabel: "추적 화구",
          detailValue: `${driftHazards.length}개 추격 중`,
          note: `${driftHazards.length}개 추적 화구가 현재 위치를 감아 들어온다. 한 lane에 고정되지 말고 크게 회전하며 압박 덩어리를 끊어야 한다.`,
          tone: "summary-chip--hot",
        };
      }
      const salvageHazards = currentState.hazards.filter(
        (hazard) => hazard.type === "salvage" && hazard.telegraphTime <= 0 && hazard.activeTime > 0
      );
      if (salvageHazards.length > 0) {
        return {
          chipLabel: `${wave.hazard.label} LIVE`,
          detailLabel: "contraband vault",
          detailValue: `${salvageHazards.length}개 노출`,
          note: `${salvageHazards.length}개 contraband vault가 열려 있다. 부수면 큰 scrap burst가 나오지만, 시간을 끌면 보상 없이 닫힌다.`,
          tone: "summary-chip--hot",
        };
      }
      const caravanHazards = currentState.hazards.filter(
        (hazard) => hazard.type === "caravan" && hazard.telegraphTime <= 0 && hazard.activeTime > 0
      );
      if (caravanHazards.length > 0) {
        return {
          chipLabel: `${wave.hazard.label} LIVE`,
          detailLabel: "smuggler caravan",
          detailValue: `${caravanHazards.length}개 도주 중`,
          note: `${caravanHazards.length}개 contraband caravan이 외곽 lane을 따라 도주 중이다. 쫓아가 파괴하면 큰 scrap burst가 나오지만 chase 동안 flank가 더 얇아진다.`,
          tone: "summary-chip--hot",
        };
      }
      return {
        chipLabel: `${wave.hazard.label} LIVE`,
        detailLabel: "폭주",
        detailValue: "활성",
        note: `${currentState.hazards.length}개 구역이 활성화됐다. 붉은 원에서 즉시 이탈해야 한다.`,
        tone: "summary-chip--hot",
      };
    }

    const nextWindow = Math.max(0, wave.hazardTimer || 0);
    const detailLabel =
      wave.hazard.type === "territory"
        ? "다음 점거"
        : wave.hazard.type === "relay"
          ? "다음 relay"
        : wave.hazard.type === "drift"
          ? "다음 추적"
        : wave.hazard.type === "salvage"
          ? "다음 금고"
        : wave.hazard.type === "caravan"
          ? "다음 caravan"
          : "다음 폭주";
    const note =
      wave.hazard.type === "territory"
        ? `${wave.hazard.count}개 점거 코어가 ${wave.hazard.telegraph.toFixed(1)}초 예고 후 전장을 봉쇄한다.`
        : wave.hazard.type === "relay"
          ? `${wave.hazard.count}개 relay pylon이 ${wave.hazard.telegraph.toFixed(1)}초 예고 후 화염 회랑을 엮는다. 긴 사선으로 먼 pylon을 먼저 끊어야 한다.`
        : wave.hazard.type === "drift"
          ? `${wave.hazard.count}개 추적 화구가 ${wave.hazard.telegraph.toFixed(1)}초 예고 후 플레이어 동선을 따라붙는다.`
          : wave.hazard.type === "salvage"
            ? `${wave.hazard.count}개 contraband vault가 ${wave.hazard.telegraph.toFixed(1)}초 예고 후 잠시 열린다. 부수면 큰 scrap burst가 나오지만, 욕심내다 퇴로를 잃을 수 있다.`
            : wave.hazard.type === "caravan"
              ? `${wave.hazard.count}개 contraband caravan이 ${wave.hazard.telegraph.toFixed(1)}초 예고 후 외곽 lane으로 도주한다. chase를 걸면 큰 scrap burst를 얻지만 lane 전체가 얇아진다.`
          : `${wave.hazard.count}개 구역이 ${wave.hazard.telegraph.toFixed(1)}초 예고 후 폭주한다.`;
    return {
      chipLabel: wave.hazard.label,
      detailLabel,
      detailValue: `${nextWindow.toFixed(1)}s`,
      note,
      tone: nextWindow <= 2.5 ? "summary-chip--hot" : "",
    };
  }

  function getWeaponTraitLabels(weapon) {
    return [
      weapon.pierce > 0 ? `관통 ${weapon.pierce}` : null,
      weapon.bounce > 0 ? `반사 ${weapon.bounce}` : null,
      weapon.chain > 0 ? `연쇄 ${weapon.chain}` : null,
      weapon.evolutionTraitLabel ? weapon.evolutionTraitLabel : null,
      weapon.lateAscensionTraitLabel ? weapon.lateAscensionTraitLabel : null,
      weapon.afterburnOverdriveTraitLabel ? weapon.afterburnOverdriveTraitLabel : null,
      weapon.illegalOverclockTraitLabel ? weapon.illegalOverclockTraitLabel : null,
      weapon.riskMutationTraitLabel ? weapon.riskMutationTraitLabel : null,
      weapon.apexMutationTraitLabel ? weapon.apexMutationTraitLabel : null,
      weapon.capstoneTraitLabel ? weapon.capstoneTraitLabel : null,
    ].filter(Boolean);
  }

  function getSupportSystemSummary(systemStats) {
    if (!systemStats) {
      return "보조 시스템 없음";
    }
    const capstoneSuffix = systemStats.doctrineCapstoneLabel
      ? ` · ${systemStats.doctrineCapstoneLabel}`
      : "";
    const describeSystemCount = (system) =>
      system.deployCount > 0 ? `포탑 ${system.deployCount}기` : `위성 ${system.orbitCount}기`;
    if (Array.isArray(systemStats.systems) && systemStats.systems.length > 1) {
      const familySummary = systemStats.systems
        .map((system) => `${system.label} ${describeSystemCount(system)}`)
        .join(" + ");
      const traits = [
        systemStats.systems.some((system) => system.shotCooldown > 0) ? "자동 볼트" : null,
        systemStats.systems.some((system) => system.interceptRange > 0) ? "탄환 요격" : null,
        systemStats.systems.some((system) => system.interceptPulseDamage > 0) ? "방호 파동" : null,
        systemStats.systems.some((system) => system.deployCount > 0) ? "전방 거점" : null,
        systemStats.doctrineId === "kiln_bastion" ? "회수 거점장" : null,
      ]
        .filter(Boolean)
        .join(" + ");
      return traits ? `${familySummary} · ${traits}${capstoneSuffix}` : `${familySummary}${capstoneSuffix}`;
    }
    if (systemStats.deployCount > 0) {
      return systemStats.tier >= 2
        ? `${systemStats.label} · 포탑 ${systemStats.deployCount}기 · ${systemStats.doctrineId === "kiln_bastion" ? "회수 거점장" : "전방 거점"}${capstoneSuffix}`
        : `${systemStats.label} · 포탑 ${systemStats.deployCount}기${systemStats.doctrineId === "kiln_bastion" ? " · 회수 거점장" : ""}${capstoneSuffix}`;
    }
    if (systemStats.interceptRange > 0) {
      return systemStats.interceptPulseDamage > 0
        ? `${systemStats.label} · 위성 ${systemStats.orbitCount}기 · 탄환 요격 + 방호 파동${capstoneSuffix}`
        : `${systemStats.label} · 위성 ${systemStats.orbitCount}기 · 탄환 요격${capstoneSuffix}`;
    }
    return systemStats.tier >= 2
      ? `${systemStats.label} · 위성 ${systemStats.orbitCount}기 · 자동 볼트${capstoneSuffix}`
      : `${systemStats.label} · 위성 ${systemStats.orbitCount}기${capstoneSuffix}`;
  }

  function getDominantFormSummary(build, weapon, waveNumber = 1) {
    const roadmap = getBuildRoadmap(build, weapon, waveNumber);
    const activeCore = CORE_DEFS[build.coreId];
    const doctrineBodyForm = getDoctrineBodyForm(build);
    const activeForm = roadmap.activeForm || activeCore.label;
    const dominantForm = doctrineBodyForm ? `${activeForm} / ${doctrineBodyForm.label}` : activeForm;
    return {
      label: dominantForm,
      detail: getPresentationFormDetail(build, weapon, waveNumber),
    };
  }

  function getNextBreakpointSummary(build, weapon, waveNumber = 1) {
    const roadmap = getBuildRoadmap(build, weapon, waveNumber);
    const activeCore = CORE_DEFS[build.coreId];
    const nextStep = roadmap.steps.find((step) => step.state !== "locked") || roadmap.steps[2] || null;
    return {
      label: nextStep ? nextStep.title : roadmap.activeForm || activeCore.label,
      detail: nextStep ? nextStep.detail : roadmap.prompt,
    };
  }

  function getImmediateProofWindowSummary(build, waveNumber = 1) {
    const boundedWave = clamp(Math.round(waveNumber || 1), 1, MAX_WAVES);
    const lateRouteBeat = getStandardLateRouteBeatSummary(build, boundedWave);
    if (lateRouteBeat) {
      return {
        label: lateRouteBeat.label,
        detail: lateRouteBeat.detail,
      };
    }
    const resolvedWave = resolveWaveConfig(boundedWave - 1, build);
    return {
      label: resolvedWave.bandLabel || resolvedWave.label,
      detail: resolvedWave.directive || resolvedWave.note || "다음 전투에서 변형이 바로 증명된다.",
    };
  }

  function getStandardLateRouteBeatSummary(build, waveNumber = 1) {
    if (!CONSOLIDATED_12_WAVE_ROUTE) {
      return null;
    }
    const boundedWave = clamp(Math.round(waveNumber || 1), 1, MAX_WAVES);
    if (boundedWave < 9 || boundedWave > 12) {
      return null;
    }
    const resolvedWave = resolveWaveConfig(boundedWave - 1, build);
    const bandLabel = resolvedWave.bandLabel || resolvedWave.label;
    if (boundedWave <= 10) {
      return {
        label: "Payoff Band",
        detail: `${bandLabel}에서 잠근 late form이 lane ownership을 넓히고 첫 crownline hold를 증명한다.`,
      };
    }
    if (boundedWave === 11) {
      return {
        label: "Victory Lap",
        detail: `${bandLabel}에서 locked form이 열린 lane을 얼마나 오래 소유하는지 먼저 누리게 만든다.`,
      };
    }
    return {
      label: "Finale",
      detail: `${bandLabel}에서 이번 run의 마지막 breach를 닫는다.`,
    };
  }

  function getLiveSideBetSummary(currentState = state) {
    const pursuit = getDoctrineForgePursuitDef(currentState.build);
    if (currentState.catalystCrucible.active) {
      return {
        label: "Catalyst Crucible",
        status: currentState.catalystCrucible.cacheDropped ? "cache live" : "core breach",
        note: currentState.catalystCrucible.cacheDropped
          ? "세 갈래 splice cache 중 하나만 집는 순간 나머지 bet는 닫힌다."
          : "점거 코어를 먼저 깨야 splice cache가 열린다.",
      };
    }
    if (currentState.phase === "wave" && currentState.wave && currentState.wave.doctrineAscension) {
      const ascension = currentState.wave.doctrineAscension;
      return {
        label: "Live Ascension",
        status: ascension.claimed ? "claimed" : ascension.deployed ? "split live" : "elite trigger",
        note: ascension.deployed
          ? "전장에 떨어진 cache 중 하나만 회수할 수 있다."
          : "이번 웨이브 첫 elite가 doctrine ascension cache를 떨어뜨린다.",
      };
    }
    if (currentState.phase === "wave" && currentState.wave && currentState.wave.afterburnAscension) {
      const ascension = currentState.wave.afterburnAscension;
      return {
        label: "Afterburn Ascension",
        status: ascension.claimed ? "claimed" : ascension.deployed ? "split live" : "elite trigger",
        note: ascension.deployed
          ? "둘 중 하나를 집는 순간 남은 endform split은 닫힌다."
          : "이번 afterburn 첫 elite가 endform split cache를 떨어뜨린다.",
      };
    }
    if (currentState.phase === "wave" && currentState.wave && currentState.wave.lateAscension) {
      const lateAscension = currentState.wave.lateAscension;
      return {
        label: "Ascension Core",
        status: lateAscension.claimed ? "claimed" : lateAscension.deployed ? "split live" : "elite trigger",
        note: lateAscension.deployed
          ? "둘 중 하나를 회수해야 남은 run의 주포/차체가 굳는다."
          : "이번 late wave 첫 elite가 Ascension Core split을 떨어뜨린다.",
      };
    }
    if (currentState.phase === "wave" && currentState.wave && currentState.wave.afterburnOverdrive) {
      const overdrive = currentState.wave.afterburnOverdrive;
      return {
        label: "Endform Overdrive",
        status: overdrive.claimed ? "claimed" : overdrive.deployed ? "cache live" : "elite trigger",
        note: overdrive.deployed
          ? "전장 cache 하나만 집어 마지막 jump를 잠가야 한다."
          : "중반 afterburn elite가 마지막 jump cache를 떨어뜨린다.",
      };
    }
    if (currentState.phase === "wave" && currentState.wave && currentState.wave.afterburnDominion) {
      const dominion = currentState.wave.afterburnDominion;
      return {
        label: "Dominion Break",
        status: dominion.claimed ? "claimed" : dominion.deployed ? "cache live" : "elite trigger",
        note: dominion.deployed
          ? "cache를 집으면 다음 bracket 하나가 victory lap으로 바뀐다."
          : "이번 전투 첫 elite가 dominion cache를 떨어뜨린다.",
      };
    }
    if (currentState.phase === "wave" && currentState.wave && currentState.wave.combatCache) {
      const combatCache = currentState.wave.combatCache;
      return {
        label: shouldUseLateFieldCache(currentState.waveIndex + 2) ? "Arsenal Cache" : "Combat Cache",
        status: combatCache.claimed ? "claimed" : combatCache.deployed ? "live" : "elite trigger",
        note: combatCache.deployed
          ? "현장 cache 하나를 집으면 다음 웨이브가 포지 정지 없이 직결된다."
          : "이번 웨이브 첫 elite가 live cache를 떨어뜨린다.",
      };
    }
    if (currentState.phase === "wave" && currentState.wave && currentState.wave.blackLedgerRaid) {
      return {
        label: "Black Ledger Raid",
        status: currentState.wave.blackLedgerRaid.salvageWave ? "jackpot live" : "tempo live",
        note: currentState.wave.blackLedgerRaid.note,
      };
    }
    if (currentState.phase === "wave" && currentState.wave && currentState.wave.bastionPactDebt) {
      return {
        label: "Siege Debt",
        status: `${currentState.wave.bastionPactDebt.wavesRemaining} left`,
        note: "greed 청구서가 활성화되어 적 밀도와 위험이 같이 올라간다.",
      };
    }
    if (currentState.overcommit.active) {
      return {
        label: "Overcommit",
        status: currentState.overcommit.targetDefeated ? "salvage sweep" : "marked elite hunt",
        note: currentState.overcommit.targetDefeated
          ? "흩어진 contraband salvage를 전부 주워야 pursuit 계약이 열린다."
          : "먼저 marked elite를 부숴 contraband salvage를 떨어뜨려야 한다.",
      };
    }
    if (
      currentState.build.doctrinePursuitCommitted &&
      pursuit &&
      !currentState.build.doctrineChaseClaimed
    ) {
      return {
        label: pursuit.shortLabel,
        status: `${currentState.build.doctrinePursuitProgress}/${pursuit.goal}`,
        note: currentState.doctrinePursuit.active
          ? `이번 웨이브 marked elite를 잡고 ${pursuit.shardLabel}를 회수해야 한다.`
          : "남은 웨이브 안에 shard를 못 모으면 조기 monster form이 닫힌다.",
      };
    }
    if (
      currentState.phase === "wave" &&
      currentState.wave &&
      currentState.wave.apexPredator &&
      !currentState.wave.apexPredator.defeated
    ) {
      return {
        label: "Apex Predator",
        status: currentState.wave.apexPredator.spawned ? "live" : "inbound",
        note: currentState.wave.apexPredator.spawned
          ? "roaming apex가 구조물 없이 옆구리를 찌르므로 rotate route를 길게 유지해야 한다."
          : "웨이브 후반 apex가 난입한다. 미리 회전선을 확보해야 한다.",
      };
    }
    if (getRiskMutationQueuedLevel(currentState.build) > 0) {
      return {
        label: "Risk Tax",
        status: getRiskMutationTierLabel(getRiskMutationQueuedLevel(currentState.build)),
        note: "다음 웨이브에 적 예산, active cap, hazard count가 함께 오른다.",
      };
    }
    return null;
  }

  function getRunGrade(result) {
    if (result.victory && result.scrapBanked >= 28 && result.overdrivesUsed >= 2) {
      return { grade: "S", note: "압박 구간을 안정적으로 봉인한 러닝." };
    }
    if (result.victory) {
      return { grade: "A", note: "핵심 판단을 유지하며 회로를 닫은 러닝." };
    }
    if (result.wavesCleared >= 6) {
      return { grade: "B", note: "확장된 후반부까지 빌드 축을 유지했다." };
    }
    if (result.wavesCleared >= 3) {
      return { grade: "C", note: "중반부 전개는 읽혔지만 후반 대응이 부족했다." };
    }
    return { grade: "D", note: "초기 포지 이전 안정화가 우선이다." };
  }

  function createAppState(signatureId = selectedSignatureId) {
    const build = createInitialBuild(signatureId);
    return {
      screen: "title",
      phase: "title",
      build,
      player: null,
      arena: getArenaSize(),
      waveIndex: 0,
      wave: null,
      waveClearTimer: 0,
      pendingFinalForge: false,
      postCapstone: {
        active: false,
        stageIndex: 0,
        total: POST_CAPSTONE_WAVE_COUNT,
      },
      enemies: [],
      projectiles: [],
      drops: [],
      hazards: [],
      slagPools: [],
      particles: [],
      forgeChoices: [],
      forgeStep: 1,
      forgeMaxSteps: 1,
      forgeDraftType: "single",
      resources: {
        scrap: 0,
      },
      stats: {
        kills: 0,
        scrapCollected: 0,
        scrapSpent: 0,
        wavesCleared: 0,
        coresCollected: 0,
        overdrivesUsed: 0,
      },
      banner: {
        text: "",
        time: 0,
      },
      shake: 0,
      result: null,
      paused: false,
      hudInspect: false,
      feed: [],
      overcommit: {
        active: false,
        status: "idle",
        targetSpawned: false,
        targetDefeated: false,
        salvageCollected: 0,
        salvageRequired: OVERCOMMIT_SALVAGE_REQUIRED,
        expired: false,
      },
      doctrinePursuit: {
        active: false,
        targetSpawned: false,
      },
      catalystCrucible: {
        active: false,
        status: "idle",
        cacheDropped: false,
        cacheCollected: false,
      },
      weapon: computeWeaponStats(build),
      playerStats: computePlayerStats(build),
      supportSystem: computeSupportSystemStats(build),
      supportSystemRuntime: {
        angle: 0,
        shotCooldowns: [],
        touchCooldowns: [],
        interceptCooldowns: [],
        deployCooldowns: [],
        doctrineCapstoneCooldown: 0,
      },
      supportDeployables: [],
    };
  }

  function resetOvercommitState(run) {
    if (!run) {
      return;
    }
    run.overcommit = {
      active: false,
      status: "idle",
      targetSpawned: false,
      targetDefeated: false,
      salvageCollected: 0,
      salvageRequired: OVERCOMMIT_SALVAGE_REQUIRED,
      expired: false,
    };
  }

  function resetDoctrinePursuitState(run) {
    if (!run) {
      return;
    }
    run.doctrinePursuit = {
      active: false,
      targetSpawned: false,
    };
  }

  function resetCatalystCrucibleState(run) {
    if (!run) {
      return;
    }
    run.catalystCrucible = {
      active: false,
      status: "idle",
      cacheDropped: false,
      cacheCollected: false,
    };
  }

  function shouldRunCatalystCrucibleObjective(build, waveNumber) {
    return shouldRunCatalystDraft({ nextWave: waveNumber, finalForge: false }, build);
  }

  function shouldRunDoctrineLiveAscension(build, waveNumber) {
    if (CONSOLIDATED_12_WAVE_ROUTE) {
      return false;
    }
    return Boolean(
      build &&
      build.bastionDoctrineId &&
      build.doctrineChaseClaimed &&
      !build.doctrineCapstoneId &&
      waveNumber >= 9 &&
      waveNumber <= MAX_WAVES
    );
  }

  function createDoctrineLiveAscensionChoices(build) {
    const doctrine = getBastionDoctrineDef(build);
    if (!doctrine || !shouldRunDoctrineLiveAscension(build, 9)) {
      return [];
    }
    return getDoctrineLateCapstoneDefs(doctrine).map((capstone) => {
      const liveBody = getDoctrineLiveAscensionBody(capstone);
      return {
        type: "utility",
        action: "doctrine_capstone",
        id: `utility:doctrine_live_ascension:${capstone.id}`,
        verb: "ascend",
        tag:
          capstone.id === "relay_storm_lattice"
            ? "LATTICE"
            : capstone.id === "bulwark_foundry"
              ? "FOUNDRY"
              : capstone.id === "stormspire_needle"
                ? "SPIRE"
                : "SKY",
        title: capstone.title,
        description: `${capstone.description} Wave 9 첫 marked elite가 떨군 live ascension cache를 직접 회수해야 주포와 차체가 이 형태로 굳는다.`,
        slotText: `Live Ascension · ${capstone.slotText}`,
        cost: 0,
        laneLabel: "Live Ascension",
        forgeLaneLabel: "Live Ascension",
        doctrineId: doctrine.id,
        doctrineLabel: doctrine.label,
        doctrineCapstoneId: capstone.id,
        capstoneLabel: capstone.label,
        bodyLabel: liveBody.bodyLabel,
        bodyText: liveBody.bodyText,
      };
    });
  }

  function createCatalystCrucibleLiveChoice(build) {
    const capstoneChoice = createCatalystReforgeChoice(build);
    if (!capstoneChoice) {
      return null;
    }
    return {
      ...capstoneChoice,
      cost: 0,
      liveCrucible: true,
      tag: "MOLT",
      slotText: `전장 점화 · ${capstoneChoice.slotText}`,
      description: `${capstoneChoice.description} 대신 몸체가 금이 가 최대 체력, 냉각, 기동, hazard 여유를 영구로 잃는다.`,
      crucibleStress: { ...CATALYST_CRUCIBLE_STRESS },
    };
  }

  function createCatalystCrucibleSystemsBetChoice(build, systemIds, fallbackModId) {
    if (!build) {
      return null;
    }
    const installedSystems = getInstalledSupportSystems(build);
    const installedMap = new Map(installedSystems.map((entry) => [entry.id, entry]));
    const supportBayCap = getSupportBayCapacity(build);
    for (const systemId of systemIds) {
      if (!systemId) {
        continue;
      }
      const installed = installedMap.get(systemId);
      if (installed && installed.tier < MAX_SUPPORT_SYSTEM_TIER) {
        return createSupportSystemTierChoice(systemId, installed.tier + 1);
      }
      if (
        !installed &&
        installedSystems.length < supportBayCap &&
        isSupportSystemUnlocked(systemId, ACT3_CATALYST_DRAFT_WAVE)
      ) {
        return createSupportSystemTierChoice(systemId, 1);
      }
    }
    return fallbackModId ? createModChoice(fallbackModId) : null;
  }

  function createCatalystCrucibleAscensionChoices(build) {
    const mutationChoice = createCatalystCrucibleLiveChoice(build);
    if (!mutationChoice) {
      return [];
    }
    const doctrine = getBastionDoctrineDef(build);
    const offensiveBet = createCatalystCrucibleSystemsBetChoice(
      build,
      doctrine && doctrine.id === "mirror_hunt"
        ? ["volt_drones", "seeker_array"]
        : doctrine && doctrine.id === "kiln_bastion"
          ? ["seeker_array", "volt_drones"]
          : ["seeker_array", "volt_drones"],
      "shock_lens"
    );
    const defensiveBet = createCatalystCrucibleSystemsBetChoice(
      build,
      doctrine && doctrine.id === "kiln_bastion"
        ? ["kiln_sentry", "aegis_halo", "ember_ring"]
        : ["aegis_halo", "ember_ring", "kiln_sentry"],
      "armor_mesh"
    );
    const mobilityBet =
      createModChoice(doctrine && doctrine.id === "storm_artillery" ? "drive_sync" : "reactor_cap") ||
      createModChoice("step_servos");
    return [
      {
        type: "utility",
        action: "catalyst_crucible_ascension",
        id: `utility:catalyst_crucible_ascension:offense:${build.coreId}`,
        verb: "splice",
        tag: "SIEGE",
        title: "Siege Splice",
        description: `${mutationChoice.title}를 즉시 점화하고 ${
          offensiveBet ? offensiveBet.title : "Shock Lens"
        } bet까지 함께 묶는다. 남은 Act 3를 공격형 압박으로 밀어붙이지만 다른 splice lane은 이번 웨이브에서 닫힌다.`,
        slotText: `Live Ascension · ${mutationChoice.capstoneLabel || mutationChoice.title} + ${
          offensiveBet ? offensiveBet.title : "Shock Lens"
        }`,
        cost: 0,
        laneLabel: "Catalyst Siege",
        forgeLaneLabel: "Catalyst Siege",
        mutationChoice,
        systemsBetChoice: offensiveBet,
      },
      {
        type: "utility",
        action: "catalyst_crucible_ascension",
        id: `utility:catalyst_crucible_ascension:defense:${build.coreId}`,
        verb: "splice",
        tag: "AEGIS",
        title: "Bulwark Splice",
        description: `${mutationChoice.title}를 즉시 점화하고 ${
          defensiveBet ? defensiveBet.title : "Armor Mesh"
        } 안정화 bet를 함께 건다. 화력은 그대로 뜯어 올리되 남은 bracket을 방호/거점 회로 위에서 버티게 만든다.`,
        slotText: `Live Ascension · ${mutationChoice.capstoneLabel || mutationChoice.title} + ${
          defensiveBet ? defensiveBet.title : "Armor Mesh"
        }`,
        cost: 0,
        laneLabel: "Catalyst Bulwark",
        forgeLaneLabel: "Catalyst Bulwark",
        mutationChoice,
        systemsBetChoice: defensiveBet,
      },
      {
        type: "utility",
        action: "catalyst_crucible_ascension",
        id: `utility:catalyst_crucible_ascension:mobility:${build.coreId}`,
        verb: "splice",
        tag: "VECTOR",
        title: "Vector Splice",
        description: `${mutationChoice.title}를 즉시 점화하고 ${
          mobilityBet ? mobilityBet.title : "Reactor Cap"
        } 기동 bet를 함께 잠근다. 몸체는 금이 가지만 대시/drive 쪽 여유를 벌려 위험 구간을 더 길게 소모하게 만든다.`,
        slotText: `Live Ascension · ${mutationChoice.capstoneLabel || mutationChoice.title} + ${
          mobilityBet ? mobilityBet.title : "Reactor Cap"
        }`,
        cost: 0,
        laneLabel: "Catalyst Vector",
        forgeLaneLabel: "Catalyst Vector",
        mutationChoice,
        systemsBetChoice: mobilityBet,
      },
    ];
  }

  function deployCatalystCrucibleObjective() {
    const choices = createCatalystCrucibleAscensionChoices(state.build).filter(Boolean);
    if (choices.length === 0) {
      resetCatalystCrucibleState(state);
      return;
    }
    state.build.act3CatalystDraftSeen = true;
    state.catalystCrucible = {
      active: true,
      status: "breach",
      cacheDropped: false,
      cacheCollected: false,
    };
    spawnHazard({
      ...CATALYST_CRUCIBLE_OBJECTIVE,
      type: "territory",
      liveChoices: choices,
      objectiveTag: "catalyst_crucible",
    });
    pushCombatFeed(
      "Catalyst Crucible 활성화. 붉은 점거 코어를 직접 깨면 세 개의 ascension cache가 흩어진다. 하나만 집는 순간 촉매 변이와 systems bet가 같이 잠기고, 나머지 splice lane은 즉시 닫힌다.",
      "MOLT"
    );
    setBanner("Catalyst Crucible", 0.95);
  }

  function deployDoctrineLiveAscension(enemy) {
    const ascension = state.wave && state.wave.doctrineAscension;
    if (!ascension || ascension.deployed || ascension.claimed) {
      return;
    }
    const choices = Array.isArray(ascension.choices) ? ascension.choices.filter(Boolean) : [];
    if (choices.length === 0) {
      ascension.deployed = true;
      ascension.claimed = true;
      return;
    }
    ascension.deployed = true;
    ascension.groupId = `doctrine-ascension-${state.waveIndex + 1}-${state.stats.kills}`;
    const spreadRadius = choices.length === 1 ? 0 : 44;
    choices.forEach((choice, index) => {
      const angle = (index / choices.length) * Math.PI - Math.PI / 2;
      state.drops.push({
        kind: "afterburn_ascension_cache",
        x: enemy.x + Math.cos(angle) * spreadRadius,
        y: enemy.y + Math.sin(angle) * spreadRadius,
        life: AFTERBURN_ASCENSION_DROP_LIFE,
        choice,
        groupId: ascension.groupId,
      });
    });
    pushCombatFeed(
      choices.length > 1
        ? "Live ascension split 노출. 교리 완성이 둘로 갈라졌다. 압박 속에서 하나만 회수하면 주포와 차체가 그 형태로 즉시 굳는다."
        : "Live ascension cache 노출. Late Break Armory 대신 교리 완성 cache가 열렸다. 압박 속에서 회수하면 주포와 차체가 즉시 monster form으로 굳는다.",
      "ASCEND"
    );
    setBanner("Live Ascension", 0.95);
  }

  function armOvercommitTrial(run) {
    if (!run) {
      return;
    }
    run.overcommit = {
      active: true,
      status: "hunt",
      targetSpawned: false,
      targetDefeated: false,
      salvageCollected: 0,
      salvageRequired: OVERCOMMIT_SALVAGE_REQUIRED,
      expired: false,
    };
  }

  function failOvercommitTrial(reasonText = "") {
    if (!state.build || state.build.overcommitResolved || state.build.overcommitUnlocked) {
      return;
    }
    state.build.overcommitResolved = true;
    state.overcommit.active = false;
    state.overcommit.status = "failed";
    state.overcommit.expired = true;
    if (reasonText) {
      pushCombatFeed(reasonText, "RISK");
    }
  }

  function unlockOvercommitTrial() {
    if (!state.build || state.build.overcommitUnlocked) {
      return;
    }
    state.build.overcommitUnlocked = true;
    state.build.overcommitResolved = true;
    state.overcommit.active = false;
    state.overcommit.status = "ready";
    state.build.upgrades.push("Contraband Overcommit");
    pushCombatFeed(
      "Contraband salvage 확보. 다음 Bastion Draft에서 장기 Forge Pursuit 계약이 열린다.",
      "RISK"
    );
    setBanner("Overcommit 준비", 0.9);
  }

  function shouldRunDoctrinePursuitWave(build, waveNumber) {
    return (
      !!build &&
      !!build.bastionDoctrineId &&
      !!build.doctrinePursuitCommitted &&
      !build.doctrineChaseClaimed &&
      !build.doctrinePursuitExpired &&
      waveNumber >= 6 &&
      waveNumber <= 8
    );
  }

  function failDoctrinePursuit() {
    const pursuit = getDoctrineForgePursuitDef(state.build);
    if (!state.build || state.build.doctrineChaseClaimed || state.build.doctrinePursuitExpired) {
      return;
    }
    state.build.doctrinePursuitExpired = true;
    state.doctrinePursuit.active = false;
    if (pursuit) {
      pushCombatFeed(pursuit.failureText, "FRAME");
    }
  }

  function completeDoctrinePursuit() {
    if (!state.build || state.build.doctrineChaseClaimed) {
      return;
    }
    const doctrine = getBastionDoctrineDef(state.build);
    const pursuit = getDoctrineForgePursuitDef(state.build);
    const weaponChoice = createDoctrineChaseWeaponChoice(state.build, doctrine, {
      nextWave: state.waveIndex + 2,
      finalForge: false,
    });
    const systemChoice = createDoctrineChaseSystemChoice(state.build, doctrine, {
      nextWave: state.waveIndex + 2,
      finalForge: false,
    });
    if (weaponChoice) {
      applyForgeChoice(state, weaponChoice);
    }
    if (systemChoice) {
      applyForgeChoice(state, systemChoice);
    }
    const capstone = getDoctrinePursuitCapstoneDef(state.build);
    if (capstone) {
      applyForgeChoice(state, {
        type: "utility",
        action: "doctrine_capstone",
        doctrineCapstoneId: capstone.id,
      });
    }
    state.build.doctrineChaseClaimed = true;
    const bodyForm = getDoctrineBodyForm(state.build);
    state.doctrinePursuit.active = false;
    state.build.upgrades.push(
      `교리 추격 완성: ${(pursuit && pursuit.shortLabel) || (doctrine && doctrine.label) || "Doctrine Frame"}`
    );
    pushCombatFeed(
      `${(pursuit && pursuit.label) || "Forge Pursuit"} 완성. ${
        bodyForm ? `${bodyForm.label}가 즉시 닫히고 ` : ""
      }${capstone ? `${capstone.title}까지 바로 잠겼다.` : "교리 apex가 즉시 잠겼다."} Wave 9-12는 live ascension 예외 없이 이 형태를 바로 증명하는 고정 late staircase다.`,
      "FRAME"
    );
    setBanner(capstone ? capstone.title : "Doctrine Apex Locked", 0.9);
    refreshDerivedStats(false);
  }

  function renderHudPanels() {
    if (!elements.arenaStage) {
      return;
    }
    const expanded = state.hudInspect || state.paused;
    elements.arenaStage.classList.toggle("arena-stage--hud-detail", expanded);
  }

  function pushCombatFeed(text, stamp) {
    if (!text) {
      return;
    }
    const nextStamp = stamp || (state.phase === "forge" ? "FORGE" : state.wave ? `W${state.waveIndex + 1}` : "RUN");
    state.feed = [{ stamp: nextStamp, text }, ...state.feed].slice(0, 4);
  }

  function renderCombatFeed() {
    if (!elements.combatFeed) {
      return;
    }
    const items = state.feed.length
      ? state.feed
      : [{ stamp: "BOOT", text: "시동 회로를 고르면 전개 로그가 여기에 누적된다." }];
    elements.combatFeed.innerHTML = items
      .map(
        (entry) => `
          <article class="combat-feed__row">
            <span class="combat-feed__stamp">${entry.stamp}</span>
            <div class="combat-feed__text">${entry.text}</div>
          </article>
        `
      )
      .join("");
  }

  function renderWaveTrack() {
    if (!elements.waveTrack || !elements.runTrackLabel) {
      return;
    }
    const currentWaveNumber = Math.max(1, state.waveIndex + 1);
    const currentAct = getActLabelForWave(currentWaveNumber);
    const totalTrackWaves =
      MAX_WAVES +
      (state.postCapstone && state.postCapstone.active
        ? state.postCapstone.total
        : state.phase === "result" && state.stats.wavesCleared > MAX_WAVES
          ? POST_CAPSTONE_WAVE_COUNT
          : 0);
    const label =
      state.phase === "forge"
        ? `Forge Stop · ${currentAct.shortLabel} · Wave ${state.waveIndex + 1}`
        : state.phase === "result"
          ? "Run Complete"
          : `${currentAct.shortLabel} · Wave ${state.waveIndex + 1} / ${totalTrackWaves}`;
    elements.runTrackLabel.textContent = label;
    const trackEntries = WAVE_CONFIG.map((wave, index) => ({
      waveNumber: index + 1,
      act: getActLabelForWave(index + 1),
      id: wave.id.toUpperCase(),
      note: wave.note,
    }));
    for (let index = 0; index < totalTrackWaves - MAX_WAVES; index += 1) {
      const waveNumber = MAX_WAVES + index + 1;
      trackEntries.push({
        waveNumber,
        act: getActLabelForWave(waveNumber),
        id: POST_CAPSTONE_WAVE_LABELS[index].toUpperCase(),
        note: "최종 포지 이후 relay, pursuit, bastion, surge grammar가 다시 섞이며 완성형 빌드가 실제 전장을 더 오래 점유하는 post-capstone afterburn ladder.",
      });
    }
    elements.waveTrack.innerHTML = trackEntries.map((entry, index) => {
      const stateName =
        state.phase === "result"
          ? index < state.stats.wavesCleared
            ? "done"
            : "upcoming"
          : index < state.waveIndex
            ? "done"
            : index === state.waveIndex
              ? "current"
              : "upcoming";
      return `
        <article class="wave-track__node" data-state="${stateName}">
          <p class="panel__eyebrow">${entry.act.shortLabel} · Wave ${entry.waveNumber}</p>
          <strong>${entry.id}</strong>
          <p>${entry.note}</p>
        </article>
      `;
    }).join("");
  }

  function renderPauseOverlay() {
    if (!elements.pauseOverlay) {
      return;
    }
    elements.pauseOverlay.classList.toggle("hidden", !state.paused);
  }

  function togglePause(force) {
    if (state.screen !== "game" || state.phase === "result") {
      return;
    }
    state.paused = typeof force === "boolean" ? force : !state.paused;
    if (state.paused) {
      input.keys.clear();
      input.pointer.inside = false;
      pushCombatFeed("전투 시뮬레이션 정지. 재개 명령을 기다린다.", "PAUSE");
    }
    renderPauseOverlay();
    renderHudPanels();
    updateHUD();
  }

  function createPlayer(build) {
    const playerStats = computePlayerStats(build);
    const arena = getArenaSize();
    return {
      x: arena.width / 2,
      y: arena.height / 2,
      radius: PLAYER_RADIUS,
      hp: playerStats.maxHp,
      maxHp: playerStats.maxHp,
      moveSpeed: playerStats.moveSpeed,
      pickupRadius: playerStats.pickupRadius,
      dashMax: playerStats.dashMax,
      dashCharges: playerStats.dashMax,
      dashCooldown: playerStats.dashCooldown,
      dashCooldownTimer: 0,
      coolRate: playerStats.coolRate,
      scrapMultiplier: playerStats.scrapMultiplier,
      driveGainMultiplier: playerStats.driveGainMultiplier,
      overdriveDuration: playerStats.overdriveDuration,
      hazardMitigation: playerStats.hazardMitigation,
      fireCooldown: 0,
      lateFieldBroadsideCooldown: 0,
      heat: 0,
      overheated: false,
      drive: 0,
      overdriveActiveTime: 0,
      invulnerableTime: 0,
      bastionFieldTime: 0,
      bastionRepairCooldown: 0,
      bastionDamageMitigation: 0,
      bastionHeatFactor: 1,
      chassisVectorTime: 0,
      chassisSalvageBurstTime: 0,
      chassisPickupPulseCooldown: 0,
      chassisAnchorCharge: 0,
      chassisAnchorPulseCooldown: 0,
      chassisAnchorActiveTime: 0,
      wave6AscensionSurgeTime: 0,
      moveIntentMagnitude: 0,
      dashTrail: 0,
      facing: 0,
    };
  }

  function getCurrentArenaSize(currentState = state) {
    if (currentState && currentState.arena) {
      return getArenaSize(currentState.arena);
    }
    return getArenaSize(currentState && currentState.wave ? currentState.wave : null);
  }

  function syncArenaCanvas() {
    const arena = getCurrentArenaSize();
    elements.canvas.width = arena.width;
    elements.canvas.height = arena.height;
    input.pointer.x = clamp(input.pointer.x, 0, arena.width);
    input.pointer.y = clamp(input.pointer.y, 0, arena.height);
  }

  function refreshDerivedStats(preserveRatio) {
    state.weapon = computeWeaponStats(state.build);
    state.playerStats = computePlayerStats(state.build);
    state.supportSystem = computeSupportSystemStats(state.build);
    syncSupportSystemRuntime();
    if (!state.player) {
      return;
    }
    const previousMax = state.player.maxHp || state.playerStats.maxHp;
    const hpRatio = previousMax > 0 ? state.player.hp / previousMax : 1;
    state.player.maxHp = state.playerStats.maxHp;
    state.player.moveSpeed = state.playerStats.moveSpeed;
    state.player.pickupRadius = state.playerStats.pickupRadius;
    state.player.dashMax = state.playerStats.dashMax;
    state.player.coolRate = state.playerStats.coolRate;
    state.player.scrapMultiplier = state.playerStats.scrapMultiplier;
    state.player.driveGainMultiplier = state.playerStats.driveGainMultiplier;
    state.player.overdriveDuration = state.playerStats.overdriveDuration;
    state.player.hazardMitigation = state.playerStats.hazardMitigation;
    state.player.dashCooldown = state.playerStats.dashCooldown;
    state.player.bastionDamageMitigation = Math.max(0, state.player.bastionDamageMitigation || 0);
    state.player.bastionHeatFactor = Math.max(1, state.player.bastionHeatFactor || 1);
    state.player.chassisVectorTime = Math.max(0, state.player.chassisVectorTime || 0);
    state.player.chassisSalvageBurstTime = Math.max(0, state.player.chassisSalvageBurstTime || 0);
    state.player.chassisPickupPulseCooldown = Math.max(0, state.player.chassisPickupPulseCooldown || 0);
    state.player.chassisAnchorCharge = clamp(state.player.chassisAnchorCharge || 0, 0, 1);
    state.player.chassisAnchorPulseCooldown = Math.max(0, state.player.chassisAnchorPulseCooldown || 0);
    state.player.chassisAnchorActiveTime = Math.max(0, state.player.chassisAnchorActiveTime || 0);
    state.player.wave6AscensionSurgeTime = Math.max(0, state.player.wave6AscensionSurgeTime || 0);
    state.player.lateFieldBroadsideCooldown = Math.max(
      0,
      state.player.lateFieldBroadsideCooldown || 0
    );
    state.player.fieldAegisCooldown = Math.max(0, state.player.fieldAegisCooldown || 0);
    state.player.fieldAegisCharge = clamp(
      state.player.fieldAegisCharge || 0,
      0,
      getLateFieldAegisMaxCharges(state.build)
    );
    if (preserveRatio) {
      state.player.hp = Math.max(1, Math.round(state.player.maxHp * hpRatio));
    } else {
      state.player.hp = Math.min(state.player.maxHp, state.player.hp);
    }
    state.player.dashCharges = clamp(
      state.player.dashCharges,
      0,
      state.player.dashMax
    );
  }

  function getChassisMoveSpeedBonus() {
    const chassis = getChassisBreakpointDef(state.build);
    if (!state.player || !chassis) {
      return 0;
    }
    const ascensionProfile = getWave6AscensionProfile();
    const ascensionSurging = state.player.wave6AscensionSurgeTime > 0;
    if (ascensionSurging && ascensionProfile?.id === "mirror_hunt") {
      return 74;
    }
    if (ascensionSurging && ascensionProfile?.id === "kiln_bastion") {
      return 54;
    }
    if (chassis.id === "vector_thrusters" && state.player.chassisVectorTime > 0) {
      return 54;
    }
    if (chassis.id === "salvage_winch" && state.player.chassisSalvageBurstTime > 0) {
      return 42;
    }
    return 0;
  }

  function getChassisCooldownFactor() {
    const chassis = getChassisBreakpointDef(state.build);
    if (!state.player || !chassis) {
      return 1;
    }
    const ascensionProfile = getWave6AscensionProfile();
    const ascensionSurging = state.player.wave6AscensionSurgeTime > 0;
    if (ascensionSurging && ascensionProfile?.id === "mirror_hunt") {
      return 1.28;
    }
    if (ascensionSurging && ascensionProfile?.id === "kiln_bastion") {
      return 1.18;
    }
    if (ascensionSurging && ascensionProfile?.id === "storm_artillery") {
      return 1.16;
    }
    if (chassis.id === "vector_thrusters" && state.player.chassisVectorTime > 0) {
      return 1.18;
    }
    if (chassis.id === "bulwark_treads" && state.player.chassisAnchorActiveTime > 0) {
      return 1.12;
    }
    if (chassis.id === "salvage_winch" && state.player.chassisSalvageBurstTime > 0) {
      return 1.14;
    }
    return 1;
  }

  function getOffsetPoint(originX, originY, angle, forward = 0, lateral = 0) {
    return {
      x: originX + Math.cos(angle) * forward - Math.sin(angle) * lateral,
      y: originY + Math.sin(angle) * forward + Math.cos(angle) * lateral,
    };
  }

  function createOffsetPlayerProjectile(angle, weapon, driveActive, config = {}) {
    const spawnAngle = Number.isFinite(config.spawnAngle) ? config.spawnAngle : angle;
    const origin = getOffsetPoint(
      state.player.x,
      state.player.y,
      spawnAngle,
      config.forward ?? 16,
      config.lateral ?? 0
    );
    return createPlayerProjectile(angle, weapon, driveActive, {
      x: origin.x,
      y: origin.y,
      ...config.overrides,
    });
  }

  function getPlayerMoveIntentMagnitude() {
    return clamp(state.player?.moveIntentMagnitude || 0, 0, 1);
  }

  function getWave6AscensionProfile(build = state.build) {
    if (!build) {
      return null;
    }
    const doctrine = getBastionDoctrineDef(build);
    const chassis = getChassisBreakpointDef(build);
    if (!doctrine || !chassis) {
      return null;
    }
    if (doctrine.id === "mirror_hunt" && chassis.id === "vector_thrusters") {
      return {
        id: "mirror_hunt",
        color: "#9fe7ff",
      };
    }
    if (doctrine.id === "kiln_bastion" && chassis.id === "salvage_winch") {
      return {
        id: "kiln_bastion",
        color: "#ffb36b",
      };
    }
    if (doctrine.id === "storm_artillery" && chassis.id === "bulwark_treads") {
      return {
        id: "storm_artillery",
        color: "#fff0c9",
      };
    }
    return null;
  }

  function activateWave6AscensionSurge(run = state, duration = WAVE6_ASCENSION_SURGE_DURATION) {
    if (!run || !run.player || duration <= 0) {
      return null;
    }
    const profile = getWave6AscensionProfile(run.build);
    if (!profile) {
      return null;
    }
    run.player.wave6AscensionSurgeTime = Math.max(run.player.wave6AscensionSurgeTime || 0, duration);

    if (profile.id === "mirror_hunt") {
      run.player.dashCharges = Math.min(run.player.dashMax, (run.player.dashCharges || 0) + 1);
      run.player.chassisVectorTime = Math.max(run.player.chassisVectorTime || 0, duration * 0.8);
      run.player.invulnerableTime = Math.max(run.player.invulnerableTime || 0, 0.16);
    } else if (profile.id === "kiln_bastion") {
      run.player.bastionFieldTime = Math.max(run.player.bastionFieldTime || 0, duration);
      run.player.bastionDamageMitigation = Math.max(run.player.bastionDamageMitigation || 0, 0.18);
      run.player.bastionHeatFactor = Math.max(run.player.bastionHeatFactor || 1, 1.24);
      run.player.chassisSalvageBurstTime = Math.max(run.player.chassisSalvageBurstTime || 0, duration);
      run.player.chassisPickupPulseCooldown = 0;
    } else if (profile.id === "storm_artillery") {
      run.player.chassisAnchorCharge = 1;
      run.player.chassisAnchorActiveTime = Math.max(run.player.chassisAnchorActiveTime || 0, duration);
      run.player.invulnerableTime = Math.max(run.player.invulnerableTime || 0, 0.2);
    }

    if (Array.isArray(run.particles)) {
      for (let index = 0; index < 10; index += 1) {
        run.particles.push(createParticle(run.player.x, run.player.y, profile.color, 0.95));
      }
    }

    run.shake = Math.max(run.shake || 0, 6);
    return profile;
  }

  function fireWave6AscensionVolley(weapon, baseAngle, driveActive) {
    const profile = getWave6AscensionProfile();
    if (!state.player || !profile) {
      return { cooldownMultiplier: 1, heatMultiplier: 1 };
    }
    const surging = state.player.wave6AscensionSurgeTime > 0;

    if (profile.id === "mirror_hunt") {
      [-1, 1].forEach((direction) => {
        state.projectiles.push(
          createOffsetPlayerProjectile(baseAngle + 0.1 * direction, weapon, driveActive, {
            lateral: 21 * direction,
            forward: 18,
            overrides: {
              vx: Math.cos(baseAngle + 0.1 * direction) * weapon.projectileSpeed * 1.08,
              vy: Math.sin(baseAngle + 0.1 * direction) * weapon.projectileSpeed * 1.08,
              damage: round((weapon.damage + (driveActive ? 8 : 0)) * 0.4, 1),
              radius: Math.max(4.1, weapon.core.id === "lance" ? 5.2 : 4.3),
              life: 1.02,
              color: "#9fe7ff",
            },
          })
        );
      });
      if (surging) {
        [-1, 1].forEach((direction) => {
          state.projectiles.push(
            createOffsetPlayerProjectile(baseAngle + 0.22 * direction, weapon, driveActive, {
              lateral: 28 * direction,
              forward: 20,
              overrides: {
                vx: Math.cos(baseAngle + 0.22 * direction) * weapon.projectileSpeed * 1.18,
                vy: Math.sin(baseAngle + 0.22 * direction) * weapon.projectileSpeed * 1.18,
                damage: round((weapon.damage + (driveActive ? 8 : 0)) * 0.42, 1),
                radius: weapon.core.id === "lance" ? 5.6 : 4.7,
                life: 1.08,
                bounce: weapon.bounce + 1,
                color: "#f2fbff",
              },
            })
          );
        });
      }
      if (getPlayerMoveIntentMagnitude() > 0.55 || state.player.chassisVectorTime > 0) {
        state.projectiles.push(
          createOffsetPlayerProjectile(baseAngle, weapon, driveActive, {
            forward: 28,
            overrides: {
              vx:
                Math.cos(baseAngle) *
                weapon.projectileSpeed *
                (surging ? 1.34 : 1.22) *
                (driveActive ? 1.08 : 1),
              vy:
                Math.sin(baseAngle) *
                weapon.projectileSpeed *
                (surging ? 1.34 : 1.22) *
                (driveActive ? 1.08 : 1),
              damage: round((weapon.damage + (driveActive ? 8 : 0)) * (surging ? 0.82 : 0.64), 1),
              radius: weapon.core.id === "lance" ? (surging ? 6 : 5.6) : surging ? 5.2 : 4.8,
              life: surging ? 1.04 : 0.94,
              pierce: weapon.pierce + (surging ? 2 : 1),
              color: "#d8fbff",
            },
          })
        );
      }
      return surging
        ? { cooldownMultiplier: 0.9, heatMultiplier: 1.08 }
        : { cooldownMultiplier: 0.96, heatMultiplier: 1.05 };
    }

    if (profile.id === "kiln_bastion") {
      [-1, 1].forEach((direction) => {
        state.projectiles.push(
          createOffsetPlayerProjectile(baseAngle + 0.14 * direction, weapon, driveActive, {
            lateral: 18 * direction,
            forward: 14,
            overrides: {
              vx: Math.cos(baseAngle + 0.14 * direction) * weapon.projectileSpeed * 0.84,
              vy: Math.sin(baseAngle + 0.14 * direction) * weapon.projectileSpeed * 0.84,
              damage: round((weapon.damage + (driveActive ? 8 : 0)) * 0.46, 1),
              radius: 5.4,
              life: 0.96,
              color: "#ffb36b",
            },
          })
        );
      });
      if (surging) {
        [-1, 1].forEach((direction) => {
          state.projectiles.push(
            createOffsetPlayerProjectile(baseAngle + 0.24 * direction, weapon, driveActive, {
              lateral: 22 * direction,
              forward: 18,
              overrides: {
                vx: Math.cos(baseAngle + 0.24 * direction) * weapon.projectileSpeed * 0.8,
                vy: Math.sin(baseAngle + 0.24 * direction) * weapon.projectileSpeed * 0.8,
                damage: round((weapon.damage + (driveActive ? 8 : 0)) * 0.52, 1),
                radius: 6.2,
                life: 1.18,
                pierce: weapon.pierce + 1,
                color: "#fff0c2",
              },
            })
          );
        });
      }
      state.projectiles.push(
        createOffsetPlayerProjectile(baseAngle, weapon, driveActive, {
          forward: 24,
          overrides: {
            vx: Math.cos(baseAngle) * weapon.projectileSpeed * (surging ? 0.94 : 0.86),
            vy: Math.sin(baseAngle) * weapon.projectileSpeed * (surging ? 0.94 : 0.86),
            damage: round((weapon.damage + (driveActive ? 8 : 0)) * (surging ? 0.9 : 0.7), 1),
            radius: surging ? 6.8 : 6,
            life: surging ? 1.2 : 1.08,
            pierce: weapon.pierce + (surging ? 2 : 1),
            color: "#ffd6a8",
          },
        })
      );
      return surging
        ? { cooldownMultiplier: 0.96, heatMultiplier: 1.12 }
        : { cooldownMultiplier: 1.04, heatMultiplier: 1.08 };
    }

    if (profile.id === "storm_artillery") {
      [-1, 1].forEach((direction) => {
        state.projectiles.push(
          createOffsetPlayerProjectile(baseAngle + 0.05 * direction, weapon, driveActive, {
            lateral: 16 * direction,
            forward: 20,
            overrides: {
              vx: Math.cos(baseAngle + 0.05 * direction) * weapon.projectileSpeed * 0.96,
              vy: Math.sin(baseAngle + 0.05 * direction) * weapon.projectileSpeed * 0.96,
              damage: round((weapon.damage + (driveActive ? 8 : 0)) * 0.48, 1),
              radius: weapon.core.id === "lance" ? 5.8 : 5,
              life: 1.12,
              pierce: weapon.pierce + 1,
              color: "#ffe0af",
            },
          })
        );
      });
      if (surging) {
        [-1, 1].forEach((direction) => {
          state.projectiles.push(
            createOffsetPlayerProjectile(baseAngle + 0.14 * direction, weapon, driveActive, {
              lateral: 24 * direction,
              forward: 28,
              overrides: {
                vx: Math.cos(baseAngle + 0.14 * direction) * weapon.projectileSpeed * 1.08,
                vy: Math.sin(baseAngle + 0.14 * direction) * weapon.projectileSpeed * 1.08,
                damage: round((weapon.damage + (driveActive ? 8 : 0)) * 0.58, 1),
                radius: weapon.core.id === "lance" ? 6.2 : 5.4,
                life: 1.22,
                pierce: weapon.pierce + 2,
                color: "#ffffff",
              },
            })
          );
        });
      }
      state.projectiles.push(
        createOffsetPlayerProjectile(baseAngle, weapon, driveActive, {
          forward: 30,
          overrides: {
            vx: Math.cos(baseAngle) * weapon.projectileSpeed * (surging ? 1.16 : 1.06),
            vy: Math.sin(baseAngle) * weapon.projectileSpeed * (surging ? 1.16 : 1.06),
            damage: round((weapon.damage + (driveActive ? 8 : 0)) * (surging ? 1.02 : 0.82), 1),
            radius: weapon.core.id === "lance" ? (surging ? 7.1 : 6.6) : surging ? 6.2 : 5.8,
            life: surging ? 1.3 : 1.2,
            pierce: weapon.pierce + (surging ? 3 : 2),
            color: "#fff0c9",
          },
        })
      );
      return surging
        ? { cooldownMultiplier: 0.98, heatMultiplier: 1.14 }
        : { cooldownMultiplier: 1.06, heatMultiplier: 1.1 };
    }

    return { cooldownMultiplier: 1, heatMultiplier: 1 };
  }

  function fireChassisWeaponPosture(weapon, baseAngle, driveActive) {
    const chassis = getChassisBreakpointDef(state.build);
    if (!state.player || !chassis) {
      return { cooldownMultiplier: 1, heatMultiplier: 1 };
    }

    if (chassis.id === "vector_thrusters") {
      const moveIntent = getPlayerMoveIntentMagnitude();
      if (moveIntent < 0.2 && state.player.chassisVectorTime <= 0) {
        return { cooldownMultiplier: 1, heatMultiplier: 1 };
      }
      const wedgeSpread = state.player.chassisVectorTime > 0 ? 0.11 : 0.07;
      const wingDamage = state.player.chassisVectorTime > 0 ? 0.54 : 0.42;
      [-1, 1].forEach((direction) => {
        state.projectiles.push(
          createOffsetPlayerProjectile(
            baseAngle + wedgeSpread * direction,
            weapon,
            driveActive,
            {
              lateral: 15 * direction,
              forward: 15,
              overrides: {
                damage: round((weapon.damage + (driveActive ? 8 : 0)) * wingDamage, 1),
                radius: Math.max(3.8, weapon.core.id === "lance" ? 5 : 4),
                life: weapon.core.id === "lance" ? 0.92 : 1.05,
                color: "#8ae7ff",
              },
            }
          )
        );
      });
      if (state.player.chassisVectorTime > 0) {
        state.projectiles.push(
          createOffsetPlayerProjectile(baseAngle, weapon, driveActive, {
            forward: 26,
            overrides: {
              vx: Math.cos(baseAngle) * weapon.projectileSpeed * 1.3 * (driveActive ? 1.12 : 1),
              vy: Math.sin(baseAngle) * weapon.projectileSpeed * 1.3 * (driveActive ? 1.12 : 1),
              damage: round((weapon.damage + (driveActive ? 8 : 0)) * 0.78, 1),
              radius: weapon.core.id === "lance" ? 5.4 : 4.6,
              life: 0.92,
              pierce: weapon.pierce + 1,
              color: "#d5fbff",
            },
          })
        );
        return { cooldownMultiplier: 0.88, heatMultiplier: 1.08 };
      }
      return { cooldownMultiplier: 0.96, heatMultiplier: 1.04 };
    }

    if (chassis.id === "bulwark_treads") {
      if (state.player.chassisAnchorActiveTime <= 0) {
        return { cooldownMultiplier: 1, heatMultiplier: 1 };
      }
      [-1, 1].forEach((direction) => {
        state.projectiles.push(
          createOffsetPlayerProjectile(baseAngle + 0.045 * direction, weapon, driveActive, {
            lateral: 18 * direction,
            forward: 18,
            overrides: {
              vx: Math.cos(baseAngle + 0.045 * direction) * weapon.projectileSpeed * 0.9,
              vy: Math.sin(baseAngle + 0.045 * direction) * weapon.projectileSpeed * 0.9,
              damage: round((weapon.damage + (driveActive ? 8 : 0)) * 0.86, 1),
              radius: (weapon.core.id === "lance" ? 6.1 : 5.2) + 0.4,
              life: weapon.core.id === "lance" ? 1.18 : 1.24,
              pierce: weapon.pierce + 1,
              color: "#ffd59f",
            },
          })
        );
      });
      state.projectiles.push(
        createOffsetPlayerProjectile(baseAngle, weapon, driveActive, {
          forward: 24,
          overrides: {
            vx: Math.cos(baseAngle) * weapon.projectileSpeed * 0.82,
            vy: Math.sin(baseAngle) * weapon.projectileSpeed * 0.82,
            damage: round((weapon.damage + (driveActive ? 8 : 0)) * 1.18, 1),
            radius: (weapon.core.id === "lance" ? 6.4 : 5.4) + 0.6,
            life: weapon.core.id === "lance" ? 1.28 : 1.34,
            pierce: weapon.pierce + 2,
            color: "#fff0c9",
          },
        })
      );
      return { cooldownMultiplier: 1.08, heatMultiplier: 1.12 };
    }

    if (chassis.id === "salvage_winch") {
      if (state.player.chassisSalvageBurstTime <= 0) {
        return { cooldownMultiplier: 1, heatMultiplier: 1 };
      }
      [-1, 1].forEach((direction) => {
        state.projectiles.push(
          createOffsetPlayerProjectile(baseAngle + 0.16 * direction, weapon, driveActive, {
            lateral: 14 * direction,
            forward: 14,
            overrides: {
              vx: Math.cos(baseAngle + 0.16 * direction) * weapon.projectileSpeed * 1.06,
              vy: Math.sin(baseAngle + 0.16 * direction) * weapon.projectileSpeed * 1.06,
              damage: round((weapon.damage + (driveActive ? 8 : 0)) * 0.56, 1),
              radius: Math.max(3.9, weapon.core.id === "lance" ? 5 : 4.1),
              life: 1,
              chain: weapon.chain + 1,
              chainRange: Math.max(weapon.chainRange || 0, 124),
              color: "#9fffcf",
            },
          })
        );
      });
      return { cooldownMultiplier: 0.9, heatMultiplier: 1.06 };
    }

    return { cooldownMultiplier: 1, heatMultiplier: 1 };
  }

  function triggerChassisPulse(x, y, radius, damage, color, options = {}) {
    applyPlayerAreaDamage(x, y, radius, damage, {
      hazardDamageFactor: Number.isFinite(options.hazardDamageFactor)
        ? options.hazardDamageFactor
        : 0.65,
    });
    if (options.clearEnemyShots) {
      state.projectiles.forEach((projectile) => {
        if (projectile.owner !== "enemy") {
          return;
        }
        const distance = Math.hypot(projectile.x - x, projectile.y - y);
        if (distance <= radius + projectile.radius) {
          projectile.life = 0;
        }
      });
    }
    state.shake = Math.max(state.shake, options.shake || 4);
    for (let index = 0; index < 10; index += 1) {
      state.particles.push(createParticle(x, y, color, 0.9));
    }
  }

  function triggerSalvageWinchSurge(duration = 1.4, pulseDamage = 0) {
    if (!state.player) {
      return;
    }
    state.player.chassisSalvageBurstTime = Math.max(state.player.chassisSalvageBurstTime || 0, duration);
    if (pulseDamage > 0 && state.player.chassisPickupPulseCooldown <= 0) {
      state.player.chassisPickupPulseCooldown = 0.45;
      triggerChassisPulse(state.player.x, state.player.y, 74, pulseDamage, "#9fffcf", {
        hazardDamageFactor: 0.45,
        clearEnemyShots: false,
        shake: 2,
      });
    }
  }

  function updatePlayerChassisState(dt, moveMagnitude) {
    const chassis = getChassisBreakpointDef(state.build);
    if (!state.player || !chassis) {
      return;
    }
    const ascensionProfile = getWave6AscensionProfile();
    state.player.wave6AscensionSurgeTime = Math.max(0, (state.player.wave6AscensionSurgeTime || 0) - dt);
    state.player.chassisVectorTime = Math.max(0, state.player.chassisVectorTime - dt);
    state.player.chassisSalvageBurstTime = Math.max(0, state.player.chassisSalvageBurstTime - dt);
    state.player.chassisPickupPulseCooldown = Math.max(0, state.player.chassisPickupPulseCooldown - dt);
    state.player.chassisAnchorPulseCooldown = Math.max(0, state.player.chassisAnchorPulseCooldown - dt);
    state.player.chassisAnchorActiveTime = Math.max(0, state.player.chassisAnchorActiveTime - dt);
    if (state.player.wave6AscensionSurgeTime > 0 && ascensionProfile) {
      if (ascensionProfile.id === "mirror_hunt") {
        state.player.chassisVectorTime = Math.max(state.player.chassisVectorTime, 0.14);
      } else if (ascensionProfile.id === "kiln_bastion") {
        state.player.chassisSalvageBurstTime = Math.max(state.player.chassisSalvageBurstTime, 0.18);
      } else if (ascensionProfile.id === "storm_artillery") {
        state.player.chassisAnchorCharge = 1;
        state.player.chassisAnchorActiveTime = Math.max(state.player.chassisAnchorActiveTime, 0.22);
      }
    }
    if (chassis.id !== "bulwark_treads") {
      state.player.chassisAnchorCharge = 0;
      return;
    }
    if (moveMagnitude < 0.2) {
      state.player.chassisAnchorCharge = Math.min(1, state.player.chassisAnchorCharge + dt / 0.48);
    } else {
      state.player.chassisAnchorCharge = Math.max(0, state.player.chassisAnchorCharge - dt * 2.6);
    }
    if (state.player.chassisAnchorCharge >= 1) {
      state.player.chassisAnchorActiveTime = Math.max(state.player.chassisAnchorActiveTime, 0.18);
      if (state.player.chassisAnchorPulseCooldown <= 0) {
        state.player.chassisAnchorPulseCooldown = 1.2;
        triggerChassisPulse(state.player.x, state.player.y, 86, 18, "#ffd59f", {
          hazardDamageFactor: 0.5,
          clearEnemyShots: false,
          shake: 3,
        });
      }
    }
  }

  function syncSupportSystemRuntime() {
    if (!state) {
      return;
    }
    if (!state.supportSystemRuntime) {
      state.supportSystemRuntime = {
        angle: 0,
        shotCooldowns: [],
        touchCooldowns: [],
        interceptCooldowns: [],
        deployCooldowns: [],
        doctrineCapstoneCooldown: 0,
      };
    }
    const orbitCount = state.supportSystem && state.supportSystem.satellites
      ? state.supportSystem.satellites.length
      : 0;
    const shotSystemCount = state.supportSystem && state.supportSystem.systems
      ? state.supportSystem.systems.length
      : 0;
    state.supportSystemRuntime.touchCooldowns = Array.from(
      { length: orbitCount },
      (_, index) => Math.max(0, state.supportSystemRuntime.touchCooldowns[index] || 0)
    );
    state.supportSystemRuntime.interceptCooldowns = Array.from(
      { length: orbitCount },
      (_, index) => Math.max(0, state.supportSystemRuntime.interceptCooldowns[index] || 0)
    );
    state.supportSystemRuntime.shotCooldowns = Array.from({ length: shotSystemCount }, (_, index) => {
      const current = Math.max(0, state.supportSystemRuntime.shotCooldowns[index] || 0);
      const system = state.supportSystem && state.supportSystem.systems
        ? state.supportSystem.systems[index]
        : null;
      if (!system || system.shotCooldown <= 0) {
        return 0;
      }
      return current > 0 ? current : system.shotCooldown * 0.55;
    });
    state.supportSystemRuntime.deployCooldowns = Array.from({ length: shotSystemCount }, (_, index) => {
      const current = Math.max(0, state.supportSystemRuntime.deployCooldowns[index] || 0);
      const system = state.supportSystem && state.supportSystem.systems
        ? state.supportSystem.systems[index]
        : null;
      if (!system || system.deployCount <= 0) {
        return 0;
      }
      return current;
    });
    state.supportSystemRuntime.doctrineCapstoneCooldown = Math.max(
      0,
      state.supportSystemRuntime.doctrineCapstoneCooldown || 0
    );
    const validSystemIds = new Set(
      state.supportSystem && Array.isArray(state.supportSystem.deployableSystems)
        ? state.supportSystem.deployableSystems.map((system) => system.systemId)
        : []
    );
    state.supportDeployables = Array.isArray(state.supportDeployables)
      ? state.supportDeployables.filter((deployable) => validSystemIds.has(deployable.systemId))
      : [];
  }

  function getSupportSystemSatellites() {
    if (!state || !state.player || !state.supportSystem || !Array.isArray(state.supportSystem.satellites)) {
      return [];
    }
    const runtime = state.supportSystemRuntime || { angle: 0 };
    return state.supportSystem.satellites.map((satellite) => {
      const angle =
        runtime.angle * satellite.orbitSpeed +
        (satellite.localIndex / satellite.localCount) * Math.PI * 2 +
        satellite.systemIndex * 0.48;
      return {
        ...satellite,
        x: state.player.x + Math.cos(angle) * satellite.orbitRadius,
        y: state.player.y + Math.sin(angle) * satellite.orbitRadius,
        radius: satellite.satelliteRadius,
        angle,
      };
    });
  }

  function showScreen(name) {
    [
      ["title", elements.titleScreen],
      ["game", elements.gameScreen],
      ["result", elements.resultScreen],
    ].forEach(([screenName, element]) => {
      const active = name === screenName;
      element.classList.toggle("hidden", !active);
      element.classList.toggle("screen--active", active);
    });
    syncBodyState();
  }

  function renderSignaturePicker() {
    if (!elements.signatureCards) {
      return;
    }
    elements.signatureCards.innerHTML = Object.values(SIGNATURE_DEFS)
      .map(
        (signature, index) => `
          <button
            type="button"
            class="signature-card ${selectedSignatureId === signature.id ? "signature-card--active" : ""}"
            data-signature-id="${signature.id}"
            aria-pressed="${selectedSignatureId === signature.id ? "true" : "false"}"
          >
            <div class="signature-card__top">
              <p class="signal-card__eyebrow">${signature.tag}</p>
              <span class="signature-card__hotkey">0${index + 1}</span>
            </div>
            <h3>${signature.label}</h3>
            <p>${signature.description}</p>
            <div class="signature-card__chips">
              <span class="micro-chip">${signature.short}</span>
              <span class="micro-chip">${summarizeBenchCoreIds(signature.seedCores)}</span>
            </div>
            <p class="signature-card__perk">${signature.perkText}</p>
          </button>
        `
      )
      .join("");
  }

  function renderSignatureSpotlight() {
    if (!elements.signatureSpotlight) {
      return;
    }
    const signature = getSignatureDef(selectedSignatureId);
    const seededCore = CORE_DEFS[signature.seedCores[0]];
    elements.signatureSpotlight.innerHTML = `
      <div class="signature-spotlight__header">
        <div>
          <p class="panel__eyebrow">${signature.tag}</p>
          <h3>${signature.label}</h3>
        </div>
        <span class="summary-chip summary-chip--cool">${signature.short}</span>
      </div>
      <p class="signature-spotlight__summary">${signature.perkText}</p>
      <div class="signature-spotlight__grid">
        <article class="signature-spotlight__card">
          <p class="panel__eyebrow">SEED CORE</p>
          <strong>${seededCore.label}</strong>
          <p>${summarizeBenchCoreIds(signature.seedCores)}</p>
        </article>
        <article class="signature-spotlight__card">
          <p class="panel__eyebrow">START</p>
          <strong>초기 보너스</strong>
          <p>${signature.description}</p>
        </article>
      </div>
      <div class="mini-pill-row">
        ${signature.seedCores
          .map((coreId) => createMiniPill("보관", CORE_DEFS[coreId].short, "accent"))
          .join("")}
      </div>
    `;
  }

  function selectSignature(signatureId) {
    if (!SIGNATURE_DEFS[signatureId]) {
      return;
    }
    selectedSignatureId = signatureId;
    renderSignaturePicker();
    renderSignatureSpotlight();
  }

  function startRun() {
    state = createAppState(selectedSignatureId);
    state.screen = "game";
    state.phase = "wave";
    state.paused = false;
    state.player = createPlayer(state.build);
    refreshDerivedStats(false);
    const signature = getSignatureDef(selectedSignatureId);
    if (typeof signature.onRunStart === "function") {
      signature.onRunStart(state);
    }
    pushCombatFeed(`${signature.label} 투입 승인. 제련 회로를 연다.`, "DROP");
    showScreen("game");
    renderPauseOverlay();
    beginWave(0);
  }

  function deployIllegalOverclockChoices() {
    if (!state.build || state.build.illegalOverclockId || state.build.illegalOverclockOffered) {
      return;
    }
    const choices = createIllegalOverclockChoices(state.build);
    if (choices.length === 0) {
      return;
    }
    state.build.illegalOverclockOffered = true;
    const spreadRadius = 56;
    const groupId = `illegal-overclock-${state.waveIndex + 1}`;
    choices.forEach((choice, index) => {
      const angle = (index / choices.length) * Math.PI * 2 - Math.PI / 2;
      state.drops.push({
        kind: "illegal_overclock_cache",
        x: state.player.x + Math.cos(angle) * spreadRadius,
        y: state.player.y + Math.sin(angle) * spreadRadius,
        life: ILLEGAL_OVERCLOCK_DROP_LIFE,
        choice,
        groupId,
      });
    });
    pushCombatFeed(
      "Wave 9 black-site uplink 개시. 불법 과투입 3종 중 하나를 전장에서 직접 집으면 남은 런 전체를 위해 무기를 금지 성장선으로 밀어 올린다. 대신 체력이나 냉각 안정성을 영구로 버린다.",
      "ILLEGAL"
    );
    setBanner("Black-Site Uplink", 0.9);
  }

  function deployIllegalMutationCache() {
    if (!state.build || !state.build.illegalOverclockId) {
      return;
    }
    const choice = createIllegalOverclockMutationChoice(state.build);
    if (!choice) {
      return;
    }
    const angle = -Math.PI / 2;
    state.drops.push({
      kind: "illegal_overclock_cache",
      x: state.player.x + Math.cos(angle) * 60,
      y: state.player.y + Math.sin(angle) * 60,
      life: ILLEGAL_OVERCLOCK_DROP_LIFE,
      choice,
      groupId: `illegal-molt-${state.waveIndex + 1}-${choice.mutationLevel}`,
    });
    pushCombatFeed(
      `${choice.title} 투하. 집으면 ${choice.slotText}를 영구로 감수하고 금지 무장을 한 단계 더 괴물 형태로 밀어 올린다. 무시하면 이번 웨이브는 안전하게 넘길 수 있다.`,
      "MOLT"
    );
    setBanner(choice.tag, 0.8);
  }

  function shouldSpawnApexPredator(build, waveNumber) {
    return (
      !!build &&
      waveNumber >= APEX_PREDATOR_START_WAVE &&
      getApexMutationLevel(build) < MAX_APEX_MUTATION_LEVEL
    );
  }

  function beginWave(index) {
    const resolvedConfig = resolveWaveConfig(index, state.build);
    let config = applyRiskMutationPressureTax(
      {
        ...resolvedConfig,
        hazard: resolvedConfig.hazard ? { ...resolvedConfig.hazard } : null,
      },
      state.build
    );
    const waveNumber = index + 1;
    config = applyBlackLedgerRaidConfig(config, state.build, waveNumber);
    const arena = getArenaSize(config);
    const pactDebtWavesBefore = Math.max(0, state.build.bastionPactDebtWaves || 0);
    const pactDebtActive = pactDebtWavesBefore > 0;
    const blackLedgerRaidActive = Boolean(config.blackLedgerRaid);
    const predatorBaitArmed =
      (state.build.predatorBaitCharges || 0) > 0 &&
      getApexMutationLevel(state.build) < MAX_APEX_MUTATION_LEVEL;
    if (pactDebtActive) {
      config.spawnBudget += 18;
      config.activeCap += 4;
      config.baseSpawnInterval = Math.max(config.spawnIntervalMin, config.baseSpawnInterval * 0.92);
      if (config.hazard) {
        config.hazard.interval = Math.max(4.8, config.hazard.interval * 0.86);
        config.hazard.damage += 3;
      }
    }
    if (predatorBaitArmed) {
      config.spawnBudget += 24;
      config.activeCap += 5;
      config.baseSpawnInterval = Math.max(config.spawnIntervalMin, config.baseSpawnInterval * 0.9);
      if (config.hazard) {
        config.hazard.interval = Math.max(4.6, config.hazard.interval * 0.88);
        config.hazard.damage += 2;
        if (Number.isFinite(config.hazard.count)) {
          config.hazard.count += 1;
        }
        if (Number.isFinite(config.hazard.coreHp)) {
          config.hazard.coreHp += 10;
        }
      }
    }
    state.waveIndex = index;
    state.phase = "wave";
    state.pendingFinalForge = false;
    state.postCapstone.active = false;
    state.postCapstone.stageIndex = 0;
    state.arena = arena;
    state.wave = {
      index,
      timeLeft: config.duration,
      spawnBudget: config.spawnBudget,
      spawned: 0,
      spawnTimer: 0.45,
      label: config.label,
      note: config.note,
      activeCap: config.activeCap,
      baseSpawnInterval: config.baseSpawnInterval,
      spawnIntervalMin: config.spawnIntervalMin,
      spawnAcceleration: config.spawnAcceleration,
      eliteEvery: config.eliteEvery,
      mix: config.mix,
      cleanupPhase: false,
      awaitingForge: false,
      completesRun: Boolean(config.completesRun),
      driveGainFactor: config.driveGainFactor || 1,
      hazard: config.hazard,
      hazardTimer: config.hazard ? config.hazard.interval * 0.8 : Number.POSITIVE_INFINITY,
      blackLedgerRaid: config.blackLedgerRaid || null,
      bastionPactDebt: pactDebtActive
        ? {
            wavesRemaining: Math.max(0, pactDebtWavesBefore - 1),
            damageTakenMultiplier: 1.24,
            enemySpeedMultiplier: 1.1,
            spawnBudgetBonus: 18,
            activeCapBonus: 4,
          }
        : null,
      combatCache:
        shouldUseCompactActBreakCache({ nextWave: waveNumber + 1, finalForge: false }) ||
        shouldUseFieldGrant({ nextWave: waveNumber + 1, finalForge: false })
        ? {
            armed: true,
            deployed: false,
            claimed: false,
            groupId: null,
            variant: shouldUseCompactActBreakCache({ nextWave: waveNumber + 1, finalForge: false })
              ? "act_break_cache"
              : "field_cache",
            choices: getCombatCacheChoicesForWave(
              state.build,
              waveNumber + 1,
              state.resources && Number.isFinite(state.resources.scrap)
                ? state.resources.scrap
                : Number.POSITIVE_INFINITY
            ),
          }
        : null,
      lateAscension: shouldOfferLateAscension(state.build, waveNumber)
        ? {
            deployed: false,
            claimed: false,
            groupId: null,
            choices: createLateAscensionChoices(state.build),
          }
        : null,
      lateAscensionCarrierType: config.ascensionCarrierType || null,
      lateAscensionCarrierSpawned: false,
      doctrineAscension: shouldRunDoctrineLiveAscension(state.build, waveNumber)
        ? {
            deployed: false,
            claimed: false,
            groupId: null,
            choices: createDoctrineLiveAscensionChoices(state.build),
          }
        : null,
      apexPredator: shouldSpawnApexPredator(state.build, waveNumber)
        ? {
            spawned: false,
            defeated: false,
            spawnTimer: Math.min(APEX_PREDATOR_SPAWN_DELAY, Math.max(8, config.duration * 0.24)),
          }
        : null,
    };
    state.waveClearTimer = 0;
    state.enemies = [];
    state.projectiles = [];
    state.drops = [];
    state.hazards = [];
    state.slagPools = [];
    state.particles = [];
    state.supportDeployables = [];
    if (pactDebtActive) {
      state.build.bastionPactDebtWaves = Math.max(0, pactDebtWavesBefore - 1);
      pushCombatFeed(
        `Siege Debt 활성화. 이번 웨이브는 적 예산 +18, active cap +4, incoming damage +24%로 열린다. 남은 debt ${state.build.bastionPactDebtWaves}웨이브.`,
        "PACT"
      );
    }
    if (blackLedgerRaidActive) {
      state.build.blackLedgerRaidWaves = Math.max(0, (state.build.blackLedgerRaidWaves || 0) - 1);
      pushCombatFeed(
        config.blackLedgerRaid && config.blackLedgerRaid.salvageWave
          ? "Black Ledger Raid 활성화. Scrapline pocket payout이 커졌지만, brander/lancer가 greed pocket을 곧바로 덮친다."
          : "Black Ledger Raid 활성화. 이번 웨이브는 payout을 미끼로 적 밀도와 hazard 템포가 같이 올라간다.",
        "LEDGER"
      );
    }
    if (predatorBaitArmed) {
      state.build.predatorBaitCharges = Math.max(0, (state.build.predatorBaitCharges || 0) - 1);
      if (state.wave.apexPredator) {
        state.wave.apexPredator.spawnTimer = Math.min(6.8, Math.max(4.8, config.duration * 0.14));
        state.wave.apexPredator.contractArmed = true;
      } else {
        state.wave.apexPredator = {
          spawned: false,
          defeated: false,
          spawnTimer: Math.min(6.8, Math.max(4.8, config.duration * 0.14)),
          contractArmed: true,
        };
      }
      pushCombatFeed(
        "Predator Bait 점화. 이번 웨이브는 적 밀도와 hazard가 더 거칠게 열리고, 조기 Cinder Maw를 잘라내면 Predator Molt가 즉시 한 단계 더 잠긴다.",
        "MAW"
      );
    }
    if (getRiskMutationQueuedLevel(state.build) > 0) {
      pushCombatFeed(
        `${getRiskMutationTierLabel(getRiskMutationQueuedLevel(state.build))} 압박세 활성화. 이번 웨이브는 greed 변이 대가로 적 밀도와 hazard가 함께 증폭된다.`,
        "RISK"
      );
      state.build.riskMutationQueuedLevel = 0;
    }
    resetDoctrinePursuitState(state);
    resetCatalystCrucibleState(state);
    if (shouldRunOvercommitTrial(state.build, waveNumber)) {
      armOvercommitTrial(state);
      pushCombatFeed(
        "Overcommit trial 시작. marked elite를 파괴하고 흩어진 contraband salvage 3개를 전부 회수하면 Wave 6 Bastion Draft에서 Forge Pursuit 계약이 열린다.",
        "RISK"
      );
    } else {
      resetOvercommitState(state);
      if (state.build.overcommitUnlocked) {
        state.overcommit.status = "ready";
      } else if (state.build.overcommitResolved) {
        state.overcommit.status = "failed";
      }
    }
    if (shouldRunDoctrinePursuitWave(state.build, waveNumber)) {
      state.doctrinePursuit.active = true;
      const pursuit = getDoctrineForgePursuitDef(state.build);
      pushCombatFeed(
        `${(pursuit && pursuit.label) || "Forge Pursuit"} 활성화. 이번 웨이브 marked elite를 추적해 shard를 회수해야 한다.`,
        "FRAME"
      );
    } else if (waveNumber > 8 && state.build.doctrinePursuitCommitted && !state.build.doctrineChaseClaimed) {
      failDoctrinePursuit();
    }
    if (shouldRunCatalystCrucibleObjective(state.build, waveNumber)) {
      deployCatalystCrucibleObjective();
    }
    syncArenaCanvas();
    state.player.x = arena.width / 2;
    state.player.y = arena.height / 2;
    state.player.heat = Math.max(0, state.player.heat - 20);
    state.player.overheated = false;
    state.player.fireCooldown = 0;
    state.player.dashCharges = state.player.dashMax;
    state.player.dashCooldownTimer = 0;
    pushCombatFeed(`${config.label} 진입. ${config.note}`, `W${index + 1}`);
    if (blackLedgerRaidActive) {
      setBanner("Black Ledger Raid", 0.9);
    }
    if (state.wave.combatCache) {
      pushCombatFeed(
        state.wave.combatCache.variant === "act_break_cache"
          ? "첫 elite가 Act Break Cache를 떨어뜨린다. 여기서 하나만 집으면 Wave 5는 Armory 정지 없이 바로 시작되고, 초반 2픽 대신 전장 한복판에서 주력 카드 하나를 잠근다."
          : "첫 elite가 Combat Cache를 떨어뜨린다. 현장에서 하나를 회수하면 Field Cache 정지 없이 바로 다음 웨이브로 이어진다.",
        "CACHE"
      );
    }
    if (state.wave.lateAscension) {
      pushCombatFeed(
        "Ascension Core 활성화. 이번 late wave 첫 elite가 split core를 떨어뜨리며, 회수하면 남은 run이 새 주포/차체 형태로 잠긴다.",
        "ASCEND"
      );
    }
    if (state.wave.doctrineAscension) {
      pushCombatFeed(
        state.wave.doctrineAscension.choices.length > 1
          ? "Live doctrine ascension 활성화. 이번 웨이브 첫 marked elite가 split cache를 떨어뜨리며, 회수한 쪽의 주포/차체가 바로 남은 late waves를 고정한다."
          : "Live doctrine ascension 활성화. 이번 웨이브 첫 marked elite가 교리 완성 cache를 떨어뜨리며, 회수하면 주포와 차체가 바로 monster form으로 굳는다.",
        "ASCEND"
      );
    }
    setBanner(config.label, 1.4);
    renderForgeOverlay();
    updateHUD();
  }

  function enterForge() {
    const isFinalForge = state.waveIndex >= MAX_WAVES - 1;
    const forgeOptions = {
      finalForge: isFinalForge,
      nextWave: state.waveIndex + 2,
      build: state.build,
      packageStep: 1,
    };
    const draftType = getForgeDraftType(forgeOptions);
    const armoryLabel = getArmoryLabel(forgeOptions);
    const startsPackage =
      draftType === "package" || (draftType === "armory" && !isLateBreakArmory(forgeOptions));
    state.phase = "forge";
    state.pendingFinalForge = isFinalForge;
    state.forgeStep = 1;
    state.forgeMaxSteps = startsPackage ? 2 : 1;
    state.forgeDraftType = draftType;
    if (!isFinalForge && isLateBreakArmory(forgeOptions) && unlockLateSupportBay(state.build)) {
      state.build.upgrades.push(
        state.build.auxiliaryJunctionLevel > 0 ? "Aux Bay Uplink: support bay +1" : "Aux Bay Uplink"
      );
      pushCombatFeed(
        CONSOLIDATED_12_WAVE_ROUTE
          ? "Wave 8 돌파. 이제 첫 rider bay가 열려 Late Form 뒤에 support, defense, greed 중 한 갈래를 처음으로 붙일 수 있다."
          : state.build.bastionDoctrineId
            ? state.build.auxiliaryJunctionLevel > 0
              ? "Wave 8 돌파. Late Break Armory가 열리며 네 번째 support bay와 추가 교리 우회 flex bay가 함께 해금된다."
              : "Wave 8 돌파. Late Break Armory가 열리며 세 번째 support bay와 교리 우회 베이 1칸이 함께 해금된다."
            : state.build.auxiliaryJunctionLevel > 0
              ? "Wave 8 돌파. Late Break Armory가 열리며 네 번째 support bay가 해금된다."
              : "Wave 8 돌파. Late Break Armory가 열리며 세 번째 support bay가 해금된다.",
        "ARMORY"
      );
    }
    state.forgeChoices = buildForgeChoices(
      state.build,
      Math.random,
      state.resources.scrap,
      forgeOptions
    );
    state.hazards = [];
    state.enemies = [];
    state.projectiles = [];
    state.slagPools = [];
    state.supportDeployables = [];
    state.player.heat = Math.max(0, state.player.heat - 20);
    state.player.overheated = false;
    const lateRoutePayoff = getStandardLateRouteBeatSummary(state.build, 9);
    const lateRouteProof = getStandardLateRouteBeatSummary(state.build, 11);
    const lateRouteFinale = getStandardLateRouteBeatSummary(state.build, 12);
    pushCombatFeed(
      isFinalForge
        ? CONSOLIDATED_12_WAVE_ROUTE
          ? "최종 웨이브 정리 완료. 마지막 포지는 Current Form만 봉인하고 이번 12-wave run을 닫는다."
          : "최종 웨이브 정리 완료. 마지막 포지에서 최종 각인과 7연속 afterburn survival ladder의 시작 형태를 마감한다."
        : isLateBreakArmory(forgeOptions)
          ? CONSOLIDATED_12_WAVE_ROUTE
            ? `Wave 8 돌파. 이번 포지는 Current Form 위에 Main Leap 하나만 크게 올린다. 이후 ${lateRoutePayoff ? lateRoutePayoff.label : "Payoff Band"}를 지나 ${lateRouteProof ? lateRouteProof.label : "Victory Lap"}, ${lateRouteFinale ? lateRouteFinale.label : "Finale"}로 곧장 꺾인다.`
            : state.build.auxiliaryJunctionLevel > 0
              ? "Wave 8 돌파. Late Break Armory를 단일 breakpoint로 재절단했다. 이제 정확히 세 장만 뜨며, Cataclysm Arsenal, Warplate Halo, Black Ledger Heist 중 하나를 고르면 Wave 9-10은 payoff band, Wave 11은 그 선택 전용 proof, Wave 12는 최종 finale로 꺾인다."
              : "Wave 8 돌파. Late Break Armory를 단일 breakpoint로 재절단했다. 이제 정확히 세 장만 뜨며, Cataclysm Arsenal, Warplate Halo, Black Ledger Heist 중 하나를 고르면 Wave 9-10은 payoff band, Wave 11은 그 선택 전용 proof, Wave 12는 최종 finale로 꺾인다."
          : draftType === "armory"
          ? CONSOLIDATED_12_WAVE_ROUTE
            ? "Wave 4 돌파. 이번 브레이크는 Current Form을 확인하고 Main Leap 하나를 고른 뒤 바로 Next Proof로 밀어 넣는다."
            : "Wave 4 돌파. Act Break Armory는 이제 headline breakpoint 1장 뒤에 support/defense/greed rider 1장을 얹어, Act 2 빌드 정체성을 더 빨리 조립하게 만든다."
          : CONSOLIDATED_12_WAVE_ROUTE
            ? "웨이브 종료. Current Form을 확인하고 Main Leap 하나를 고른 뒤 바로 Next Proof로 이어진다."
            : "웨이브 종료. 먼저 headline 변신을 고르고, 이어서 작은 rider slot으로 support/defense/greed를 한 장 더 얹는다.",
      "FORGE"
    );
    setBanner(
      CONSOLIDATED_12_WAVE_ROUTE
        ? getBaseRouteForgeBannerLabel(state)
        : isFinalForge
          ? "최종 포지"
          : draftType === "armory"
            ? armoryLabel
            : "포지 정지",
      1.2
    );
    renderForgeOverlay();
    updateHUD();
  }

  function shouldFinishAfterForge(run) {
    return Boolean(run && run.pendingFinalForge && run.waveIndex >= MAX_WAVES - 1);
  }

  function getFinalCashoutCapstoneVariant(build) {
    if (!build || !build.catalystCapstoneId) {
      return null;
    }
    return FINAL_CASHOUT_CAPSTONE_VARIANTS[build.catalystCapstoneId] || null;
  }

  function getFinalCashoutSupportVariant(build) {
    if (!build || !build.cashoutSupportId) {
      return null;
    }
    return (
      Object.values(FINAL_CASHOUT_SUPPORT_DEFS).find(
        (support) => support.id === build.cashoutSupportId
      ) || null
    );
  }

  function getFinalCashoutFailSoftVariant(build) {
    if (!build || !build.cashoutFailSoftId) {
      return null;
    }
    return (
      Object.values(FINAL_CASHOUT_FAILSOFT_DEFS).find(
        (failSoft) => failSoft.id === build.cashoutFailSoftId
      ) || null
    );
  }

  function getSelectedFinaleVariant(build) {
    return (
      getFinalCashoutFailSoftVariant(build) ||
      getFinalCashoutSupportVariant(build) ||
      getFinalCashoutCapstoneVariant(build)
    );
  }

  function blendEnemyMix(baseMix, overlayMix, overlayWeight = 0.3) {
    const keys = Array.from(new Set([...Object.keys(baseMix || {}), ...Object.keys(overlayMix || {})]));
    if (keys.length === 0) {
      return {};
    }
    const blended = {};
    let total = 0;
    keys.forEach((key) => {
      const value =
        (baseMix && Number.isFinite(baseMix[key]) ? baseMix[key] * (1 - overlayWeight) : 0) +
        (overlayMix && Number.isFinite(overlayMix[key]) ? overlayMix[key] * overlayWeight : 0);
      blended[key] = value;
      total += value;
    });
    if (total <= 0) {
      const share = 1 / keys.length;
      keys.forEach((key) => {
        blended[key] = share;
      });
      return blended;
    }
    keys.forEach((key) => {
      blended[key] = blended[key] / total;
    });
    return blended;
  }

  function applyEncounterPressureFamily(config) {
    if (!config || !config.pressureFamily) {
      return config;
    }
    const family = ENCOUNTER_PRESSURE_FAMILIES[config.pressureFamily];
    if (!family) {
      return config;
    }
    const nextConfig = {
      ...config,
      mix: blendEnemyMix(config.mix || {}, family.mix || {}, family.mixWeight || 0.5),
    };
    if (config.hazard && family.hazard) {
      nextConfig.hazard = { ...config.hazard };
      const adjustments = family.hazard;
      if (Number.isFinite(nextConfig.hazard.count)) {
        nextConfig.hazard.count = Math.max(1, nextConfig.hazard.count + (adjustments.countBonus || 0));
      }
      if (Number.isFinite(nextConfig.hazard.interval)) {
        nextConfig.hazard.interval = Math.max(
          4.4,
          nextConfig.hazard.interval * (adjustments.intervalScale || 1)
        );
      }
      if (Number.isFinite(nextConfig.hazard.telegraph)) {
        nextConfig.hazard.telegraph = Math.max(
          0.58,
          nextConfig.hazard.telegraph * (adjustments.telegraphScale || 1)
        );
      }
      if (Number.isFinite(nextConfig.hazard.duration)) {
        nextConfig.hazard.duration = Math.max(
          2.8,
          nextConfig.hazard.duration + (adjustments.durationBonus || 0)
        );
      }
      if (Number.isFinite(nextConfig.hazard.radius)) {
        nextConfig.hazard.radius = Math.max(
          52,
          nextConfig.hazard.radius + (adjustments.radiusBonus || 0)
        );
      }
      if (Number.isFinite(nextConfig.hazard.coreHp)) {
        nextConfig.hazard.coreHp = Math.max(
          24,
          nextConfig.hazard.coreHp + (adjustments.coreHpBonus || 0)
        );
      }
      if (Number.isFinite(nextConfig.hazard.salvageScrap)) {
        nextConfig.hazard.salvageScrap = Math.max(
          8,
          nextConfig.hazard.salvageScrap + (adjustments.salvageScrapBonus || 0)
        );
      }
      if (Number.isFinite(nextConfig.hazard.salvageBurstCount)) {
        nextConfig.hazard.salvageBurstCount = Math.max(
          1,
          nextConfig.hazard.salvageBurstCount + (adjustments.salvageBurstCountBonus || 0)
        );
      }
      if (Number.isFinite(nextConfig.hazard.salvageBurstRadius)) {
        nextConfig.hazard.salvageBurstRadius = Math.max(
          32,
          nextConfig.hazard.salvageBurstRadius + (adjustments.salvageBurstRadiusBonus || 0)
        );
      }
      if (Number.isFinite(nextConfig.hazard.driftSpeed)) {
        nextConfig.hazard.driftSpeed = Math.max(
          90,
          nextConfig.hazard.driftSpeed + (adjustments.driftSpeedBonus || 0)
        );
      }
      if (Number.isFinite(nextConfig.hazard.driftOrbit)) {
        nextConfig.hazard.driftOrbit += adjustments.driftOrbitBonus || 0;
      }
      if (Number.isFinite(nextConfig.hazard.relayRange)) {
        nextConfig.hazard.relayRange = Math.max(
          320,
          nextConfig.hazard.relayRange + (adjustments.relayRangeBonus || 0)
        );
      }
      if (Number.isFinite(nextConfig.hazard.relayWidth)) {
        nextConfig.hazard.relayWidth = Math.max(
          24,
          nextConfig.hazard.relayWidth + (adjustments.relayWidthBonus || 0)
        );
      }
      if (Number.isFinite(nextConfig.hazard.relayDamage)) {
        nextConfig.hazard.relayDamage += adjustments.relayDamageBonus || 0;
      }
      if (Number.isFinite(nextConfig.hazard.turretInterval)) {
        nextConfig.hazard.turretInterval = Math.max(
          0.55,
          nextConfig.hazard.turretInterval + (adjustments.turretIntervalBonus || 0)
        );
      }
      if (Number.isFinite(nextConfig.hazard.turretDamage)) {
        nextConfig.hazard.turretDamage += adjustments.turretDamageBonus || 0;
      }
      if (Number.isFinite(nextConfig.hazard.enemyPullRadius)) {
        nextConfig.hazard.enemyPullRadius += adjustments.enemyPullRadiusBonus || 0;
      }
    }
    return nextConfig;
  }

  function createPostCapstoneWave(stageIndex = 0, build = null) {
    const boundedStage = clamp(stageIndex, 0, POST_CAPSTONE_WAVE_COUNT - 1);
    const waveNumber = MAX_WAVES + boundedStage + 1;
    const dominionVictoryLapActive = Boolean(
      build && build.afterburnDominionId && (build.afterburnDominionVictoryLapWaves || 0) > 0
    );
    const encounter =
      POST_CAPSTONE_ENCOUNTER_POOL[boundedStage] ||
      POST_CAPSTONE_ENCOUNTER_POOL[POST_CAPSTONE_ENCOUNTER_POOL.length - 1];
    const baseWaveIndex = clamp(
      encounter && Number.isFinite(encounter.waveIndex) ? encounter.waveIndex : MAX_WAVES - 1,
      0,
      MAX_WAVES - 1
    );
    const baseConfig = resolveWaveConfig(baseWaveIndex, build);
    let encounterConfig = applyEncounterPressureFamily({
      ...baseConfig,
      ...(encounter || {}),
      arena: encounter && encounter.arena ? encounter.arena : baseConfig.arena,
      mix:
        encounter && encounter.mix
          ? blendEnemyMix(baseConfig.mix, encounter.mix, encounter.mixWeight || 0.45)
          : { ...baseConfig.mix },
      hazard: encounter && encounter.hazard
        ? {
            ...(baseConfig.hazard || {}),
            ...encounter.hazard,
          }
        : baseConfig.hazard
          ? { ...baseConfig.hazard }
          : null,
    });
    const arsenalBreakpointProfile = getArsenalBreakpointEncounterProfile(build, waveNumber);
    if (arsenalBreakpointProfile) {
      encounterConfig = applyEncounterOverride(encounterConfig, arsenalBreakpointProfile);
    }
    const escalation =
      POST_CAPSTONE_ASCENSION_PROFILE[boundedStage] ||
      POST_CAPSTONE_ASCENSION_PROFILE[POST_CAPSTONE_ASCENSION_PROFILE.length - 1];
    const variant = getSelectedFinaleVariant(build);
    const spawnBias = variant
      ? clamp((variant.spawnBudget - FINAL_CASHOUT_SPAWN_BUDGET) * 4, -8, 24)
      : 0;
    const capBias = variant
      ? clamp(Math.round((variant.activeCap - 18) * 0.7), -2, 6)
      : 0;
    const hazard = encounterConfig.hazard
      ? sanitizeHazardForType({
          ...encounterConfig.hazard,
          ...(variant && variant.hazard ? variant.hazard : {}),
          interval: Math.max(
            4.8,
            (variant && variant.hazard && Number.isFinite(variant.hazard.interval)
              ? variant.hazard.interval
              : encounterConfig.hazard.interval) * escalation.hazardIntervalScale
          ),
          telegraph: Math.max(
            0.56,
            (variant && variant.hazard && Number.isFinite(variant.hazard.telegraph)
              ? variant.hazard.telegraph
              : encounterConfig.hazard.telegraph) * escalation.hazardTelegraphScale
          ),
          count: Math.max(
            1,
            (variant && variant.hazard && Number.isFinite(variant.hazard.count)
              ? variant.hazard.count
              : encounterConfig.hazard.count || 1) + escalation.hazardCountBonus
          ),
          damage:
            (variant && variant.hazard && Number.isFinite(variant.hazard.damage)
              ? variant.hazard.damage
              : encounterConfig.hazard.damage || 0) + escalation.hazardDamageBonus,
          coreHp: Number.isFinite(encounterConfig.hazard.coreHp)
            ? (variant && variant.hazard && Number.isFinite(variant.hazard.coreHp)
                ? variant.hazard.coreHp
                : encounterConfig.hazard.coreHp) + escalation.hazardCoreHpBonus
            : encounterConfig.hazard.coreHp,
          relayDamage: Number.isFinite(encounterConfig.hazard.relayDamage)
            ? (variant && variant.hazard && Number.isFinite(variant.hazard.relayDamage)
                ? variant.hazard.relayDamage
                : encounterConfig.hazard.relayDamage) + escalation.hazardRelayDamageBonus
            : encounterConfig.hazard.relayDamage,
        })
      : null;
    const wave = applyRiskMutationPressureTax({
      index: MAX_WAVES + boundedStage,
      timeLeft:
        encounterConfig.duration +
        escalation.durationBonus +
        (dominionVictoryLapActive ? -6 : 0),
      spawnBudget: Math.max(
        encounterConfig.spawnBudget + 16,
        encounterConfig.spawnBudget + escalation.spawnBudgetBonus + spawnBias
      ) + (dominionVictoryLapActive ? -34 : 0),
      spawned: 0,
      spawnTimer: 0.35,
      label: `Wave ${waveNumber} · ${POST_CAPSTONE_WAVE_LABELS[boundedStage]}${variant ? ` · ${variant.cashoutLabel}` : ""}${dominionVictoryLapActive ? " · Dominion Run" : ""}`,
      bannerLabel: dominionVictoryLapActive
        ? "Dominion Run"
        : `${variant ? variant.bannerLabel || variant.cashoutLabel : "Afterburn"} · ${POST_CAPSTONE_WAVE_LABELS[boundedStage]}`,
      note: variant
        ? `${variant.note} ${
            dominionVictoryLapActive
              ? "방금 뜯어낸 Dominion 차체가 objective clutter를 잠시 밀어내 한 웨이브 동안 지배 화력을 시험하게 만든다."
              : "이제는 짧은 시험이 아니라 late-act shared pool이 계속 뒤섞이는 forbidden-territory bracket이며, roaming apex를 잡아 마지막 body splice를 뜯어내는 post-capstone ascent다."
          }`
        : dominionVictoryLapActive
          ? "방금 뜯어낸 Dominion 차체가 전장을 잠시 비워냈다. 이번 bracket은 새로운 endform을 즐기게 하려고 드랍 목표와 추가 세금이 한 박자 늦는다."
          : encounterConfig.note,
      directive: dominionVictoryLapActive
        ? "이번 Dominion Run에서는 새 차체를 믿고 전장을 가로질러도 된다. 목표 세금보다 우월 화력의 폭을 직접 누르는 짧은 victory lap이다."
        : `${variant ? variant.directive : encounterConfig.directive} Afterburn에서는 relay, pursuit, bastion, surge grammar가 다시 섞여 돌아오므로 한 가지 route repair 답으로는 끝까지 버틸 수 없다.`,
      activeCap: Math.max(
        encounterConfig.activeCap + 2,
        encounterConfig.activeCap + escalation.activeCapBonus + capBias
      ) + (dominionVictoryLapActive ? -8 : 0),
      baseSpawnInterval: Math.max(
        0.074,
        encounterConfig.baseSpawnInterval * escalation.baseSpawnScale * (dominionVictoryLapActive ? 1.12 : 1)
      ),
      spawnIntervalMin: Math.max(
        0.076,
        encounterConfig.spawnIntervalMin * escalation.minSpawnScale * (dominionVictoryLapActive ? 1.08 : 1)
      ),
      spawnAcceleration: encounterConfig.spawnAcceleration,
      eliteEvery: Math.max(3, encounterConfig.eliteEvery - 1 - (boundedStage > 0 ? 1 : 0)),
      mix: blendEnemyMix(encounterConfig.mix, variant ? variant.mix : null, 0.3 + boundedStage * 0.04),
      cleanupPhase: false,
      awaitingForge: false,
      completesRun: boundedStage >= POST_CAPSTONE_WAVE_COUNT - 1,
      driveGainFactor: Math.max(encounterConfig.driveGainFactor || 1, escalation.driveGainFloor),
      arena: getArenaSize(encounterConfig),
      hazard,
      hazardTimer: hazard ? hazard.interval * 0.72 : Number.POSITIVE_INFINITY,
      postCapstoneStage: boundedStage + 1,
      postCapstoneTotal: POST_CAPSTONE_WAVE_COUNT,
      dominionVictoryLapActive,
      skipForgeOnClear: boundedStage < POST_CAPSTONE_WAVE_COUNT - 1,
      lateAscension: shouldOfferLateAscension(build, MAX_WAVES + boundedStage + 1)
        ? {
            deployed: false,
            claimed: false,
            groupId: null,
            choices: createLateAscensionChoices(build),
          }
        : null,
      lateAscensionCarrierType: encounterConfig.ascensionCarrierType || null,
      lateAscensionCarrierSpawned: false,
      afterburnAscension: shouldOfferStormArtilleryAfterburnAscension(build)
        ? {
            deployed: false,
            claimed: false,
            groupId: null,
            choices: getStormArtilleryAfterburnAscensionChoices(build),
          }
        : null,
      combatCache:
        boundedStage < POST_CAPSTONE_WAVE_COUNT - 1 &&
        build &&
        Array.isArray(build.pendingCores)
          ? {
              armed: true,
              deployed: false,
              claimed: false,
              groupId: null,
              choices: getCombatCacheChoicesForWave(build, waveNumber + 1),
            }
          : null,
      finaleMutation: shouldOfferFinaleMutation(build)
        ? {
            deployed: false,
            claimed: false,
            groupId: null,
            choices: buildFinaleMutationChoices(build),
          }
        : null,
      afterburnOverdrive: shouldOfferAfterburnOverdrive(build, boundedStage)
        ? {
            deployed: false,
            claimed: false,
            groupId: null,
            choices: getAfterburnOverdriveChoices(build),
          }
        : null,
      afterburnDominion: shouldOfferAfterburnDominion(build, boundedStage)
        ? {
            deployed: false,
            claimed: false,
            groupId: null,
            choices: getAfterburnDominionChoices(build),
          }
        : null,
      apexPredator: shouldSpawnApexPredator(build, MAX_WAVES + boundedStage + 1)
        ? {
            spawned: false,
            defeated: false,
            spawnTimer: Math.min(
              escalation.apexSpawnTimer,
              Math.max(5.6, encounterConfig.duration * 0.16)
            ),
          }
        : null,
    }, build);
    if (dominionVictoryLapActive) {
      if (wave.hazard) {
        wave.hazard.count = Math.max(1, (wave.hazard.count || 1) - 1);
        if (Number.isFinite(wave.hazard.interval)) {
          wave.hazard.interval *= 1.16;
        }
        if (Number.isFinite(wave.hazard.telegraph)) {
          wave.hazard.telegraph *= 1.1;
        }
      }
      wave.combatCache = null;
      wave.finaleMutation = null;
      wave.afterburnOverdrive = null;
      wave.afterburnAscension = null;
      wave.lateAscension = null;
      wave.apexPredator = null;
    }
    return wave;
  }

  function createFinalCashoutWave(index = MAX_WAVES - 1, build = null) {
    return createPostCapstoneWave(0, build);
  }

  function getFinalCashoutTransitionProfile(build = null) {
    if (build && build.cashoutSupportId) {
      return {
        preserveArenaState: true,
        clearProjectiles: true,
        clearParticles: true,
        recenterPlayer: false,
        heatTrim: 8,
        refillDash: false,
      };
    }
    return {
      preserveArenaState: false,
      clearProjectiles: true,
      clearParticles: true,
      recenterPlayer: true,
      heatTrim: 16,
      refillDash: true,
    };
  }

  function applyFinalCashoutTransition(run) {
    if (!run) {
      return null;
    }
    const profile = getFinalCashoutTransitionProfile(run.build);
    run.phase = "wave";
    run.pendingFinalForge = false;
    run.postCapstone = {
      active: true,
      stageIndex: 0,
      total: POST_CAPSTONE_WAVE_COUNT,
    };
    run.waveIndex = MAX_WAVES;
    run.wave = createFinalCashoutWave(run.waveIndex, run.build);
    run.arena = getArenaSize(run.wave);
    run.waveClearTimer = 0;
    run.build.riskMutationQueuedLevel = 0;
    if (!profile.preserveArenaState) {
      run.enemies = [];
      run.drops = [];
      run.hazards = [];
    }
    if (profile.clearProjectiles) {
      run.projectiles = [];
    }
    if (profile.clearParticles) {
      run.particles = [];
    }
    if (run.player) {
      if (profile.recenterPlayer) {
        run.player.x = run.arena.width / 2;
        run.player.y = run.arena.height / 2;
      }
      run.player.heat = Math.max(0, run.player.heat - profile.heatTrim);
      run.player.overheated = false;
      run.player.fireCooldown = 0;
      if (profile.refillDash) {
        run.player.dashCharges = run.player.dashMax;
        run.player.dashCooldownTimer = 0;
      }
    }
    return profile;
  }

  function beginFinalCashout() {
    const transition = applyFinalCashoutTransition(state);
    syncArenaCanvas();
    pushCombatFeed(`Wave 12 crown 붕괴. 포지 정지 없이 ${state.wave.note}`, "LAST");
    if (state.wave.finaleMutation) {
      pushCombatFeed(
        "Final splice live. 이번 Afterburn 첫 elite가 Act 4 mutation cache를 떨어뜨리며, 회수한 각인이 남은 escalation 전체를 다시 꺾는다.",
        "LAST"
      );
    }
    if (state.wave.combatCache) {
      pushCombatFeed(
        "Afterburn cache 활성화. 이번 bracket 첫 elite가 현장 장착 캐시를 뿌리며, Predator Bait까지 포함해 다음 금지 구간의 압박과 변이를 직접 고를 수 있다.",
        "CACHE"
      );
    }
    if (state.wave.afterburnAscension) {
      pushCombatFeed(
        "Storm Artillery endform lane 개방. 이번 afterburn 첫 elite가 Sky Lance / Stormspire split cache를 뱉는다.",
        "ASCEND"
      );
    }
    if (state.wave.lateAscension) {
      pushCombatFeed(
        "Ascension Core 재개방. 이번 forbidden-territory bracket 첫 elite를 잡아 아직 미완성인 주포/차체 형태 하나를 직접 잠가야 한다.",
        "ASCEND"
      );
    }
    setBanner(
      transition && transition.preserveArenaState
        ? `${state.wave.bannerLabel || "Afterburn"} · 압박 유지`
        : state.wave.bannerLabel || "Afterburn",
      1.2
    );
    renderForgeOverlay();
    updateHUD();
  }

  function beginNextPostCapstoneWave() {
    if (!state.postCapstone || !state.postCapstone.active) {
      return;
    }
    const nextStage = state.postCapstone.stageIndex + 1;
    if (nextStage >= state.postCapstone.total) {
      finishRun(true);
      return;
    }
    state.postCapstone.stageIndex = nextStage;
    state.waveIndex = MAX_WAVES + nextStage;
    state.phase = "wave";
    state.wave = createPostCapstoneWave(nextStage, state.build);
    if ((state.build.afterburnDominionVictoryLapWaves || 0) > 0 && state.wave.dominionVictoryLapActive) {
      state.build.afterburnDominionVictoryLapWaves = Math.max(
        0,
        state.build.afterburnDominionVictoryLapWaves - 1
      );
    }
    state.arena = getArenaSize(state.wave);
    state.waveClearTimer = 0;
    state.build.riskMutationQueuedLevel = 0;
    state.enemies = [];
    state.projectiles = [];
    state.drops = [];
    state.hazards = [];
    state.slagPools = [];
    state.particles = [];
    state.supportDeployables = [];
    resetOvercommitState(state);
    resetDoctrinePursuitState(state);
    syncArenaCanvas();
    state.player.x = state.arena.width / 2;
    state.player.y = state.arena.height / 2;
    state.player.heat = Math.max(0, state.player.heat - 18);
    state.player.overheated = false;
    state.player.fireCooldown = 0;
    state.player.dashCharges = state.player.dashMax;
    state.player.dashCooldownTimer = 0;
    pushCombatFeed(`${state.wave.label} 진입. ${state.wave.note}`, `W${state.waveIndex + 1}`);
    if (state.wave.finaleMutation) {
      pushCombatFeed(
        "Act 4 splice 재개방. 아직 마지막 변이를 못 골랐다면 이번 Afterburn 첫 elite를 다시 잘라 mutation cache를 직접 회수해야 한다.",
        "LAST"
      );
    }
    if (state.wave.combatCache) {
      pushCombatFeed(
        "Afterburn cache 재가동. 이번 웨이브 첫 elite가 다음 금지 구간으로 이어질 현장 장착 캐시를 다시 떨어뜨린다.",
        "CACHE"
      );
    }
    if (state.wave.afterburnAscension) {
      pushCombatFeed(
        "Storm Artillery endform lane 재개방. 이번 웨이브 첫 elite를 잡아 남은 Afterburn body split 중 하나를 뜯어내야 한다.",
        "ASCEND"
      );
    }
    if (state.wave.afterburnDominion) {
      pushCombatFeed(
        "Dominion Break 개방. 이번 Afterburn elite가 주무장 전용 endform cache를 떨어뜨리며, 회수하면 다음 bracket 하나가 domination run으로 재편된다.",
        "DOM"
      );
    }
    if (state.wave.lateAscension) {
      pushCombatFeed(
        "Ascension Core 재가동. 이번 웨이브 첫 elite가 split core를 떨어뜨리며, 회수하면 남은 late waves의 주포/차체가 확정된다.",
        "ASCEND"
      );
    }
    if (state.wave.dominionVictoryLapActive) {
      pushCombatFeed(
        "Dominion Run 활성화. 이번 웨이브는 추가 캐시와 apex 목표를 잠시 걷어 내 새 endform을 억지 없이 누르는 승리 랩으로 열린다.",
        "DOM"
      );
    }
    setBanner(state.wave.bannerLabel || state.wave.label, 1.2);
    renderForgeOverlay();
    updateHUD();
  }

  function finishRun(victory) {
    const signature = getSignatureDef(state.build.signatureId);
    const benchEntries = getBenchEntries(state.build);
    state.screen = "result";
    state.phase = "result";
    state.pendingFinalForge = false;
    state.postCapstone.active = false;
    state.result = {
      victory,
      wavesCleared: state.stats.wavesCleared,
      kills: state.stats.kills,
      scrapCollected: Math.round(state.stats.scrapCollected),
      scrapSpent: Math.round(state.stats.scrapSpent),
      scrapBanked: Math.round(state.resources.scrap),
      overdrivesUsed: state.stats.overdrivesUsed,
      signature: signature.short,
      core: CORE_DEFS[state.build.coreId].label,
      tier: state.weapon.tierLabel,
    };
    const grade = getRunGrade(state.result);
    elements.resultTitle.textContent = victory
      ? "회로 봉인 성공"
      : "회로 붕괴";
    elements.resultCopy.textContent = victory
      ? "최종 폭주 구간을 넘기고 회로를 닫았다. 최종 코어와 보강 조합은 아래에 기록된다."
      : "열과 밀도를 버티지 못했다. 이동 경로와 포지 선택을 다시 정리해야 한다.";
    elements.resultStats.innerHTML = [
      createResultStat("Waves", String(state.result.wavesCleared)),
      createResultStat("Kills", String(state.result.kills)),
      createResultStat("고철+", String(state.result.scrapCollected)),
      createResultStat("Spent", String(state.result.scrapSpent)),
      createResultStat("Drive", String(state.result.overdrivesUsed)),
      createResultStat("Sig", state.result.signature),
      createResultStat("Core", state.result.core),
    ].join("");
    elements.resultBuild.innerHTML = `
      <p class="panel__eyebrow">FINAL LOADOUT</p>
      <div class="result-build__grade">${grade.grade}</div>
      <strong>${signature.label} / ${CORE_DEFS[state.build.coreId].label} / ${state.weapon.tierLabel}</strong>
      <p>${grade.note}</p>
      <div class="result-build__chips">
        <span class="micro-chip">남은 고철 ${state.result.scrapBanked}</span>
        <span class="micro-chip">Drive ${state.result.overdrivesUsed}회</span>
        <span class="micro-chip">${state.weapon.affixLabels.join(" · ") || "속성 없음"}</span>
        <span class="micro-chip">${
          benchEntries.length ? summarizeBenchCoreIds(state.build.pendingCores) : "보관 코어 없음"
        }</span>
      </div>
      <div class="mini-pill-row">
        ${state.build.upgrades
          .slice(-4)
          .map((upgrade) => createMiniPill("MOD", upgrade))
          .join("")}
      </div>
      <div class="status-list">
        ${createStatusRow("잔여 고철", String(state.result.scrapBanked))}
        ${createStatusRow("Overdrive", String(state.result.overdrivesUsed))}
      </div>
    `;
    pushCombatFeed(
      victory ? "최종 회로 봉인 성공. 전술 기록을 결과 패널로 이관한다." : "회로 붕괴. 손실 보고를 마친 뒤 재투입 가능.",
      victory ? "CLEAR" : "FAIL"
    );
    showScreen("result");
  }

  function createResultStat(label, value) {
    return `<article><span class="result-grid__label">${label}</span><strong>${value}</strong></article>`;
  }

  function setBanner(text, duration) {
    state.banner.text = text;
    state.banner.time = duration;
    elements.messageBanner.textContent = text;
    elements.messageBanner.classList.toggle("hidden", !text);
  }

  function clearBanner() {
    state.banner.text = "";
    state.banner.time = 0;
    elements.messageBanner.classList.add("hidden");
  }

  function handleForgeSelection(index) {
    if (state.phase !== "forge") {
      return;
    }
    const choice = state.forgeChoices[index];
    if (!choice) {
      return;
    }
    const wave6AscensionDraft =
      state.forgeDraftType === "bastion_draft" &&
      state.build &&
      !state.build.bastionDoctrineId &&
      state.waveIndex + 2 === 6;
    const instantDraft =
      state.forgeDraftType === "architecture_draft" ||
      state.forgeDraftType === "field_grant" ||
      state.forgeDraftType === "bastion_draft" ||
      state.forgeDraftType === "catalyst_draft";
    if (state.resources.scrap < choice.cost) {
      setBanner("고철 부족", 0.8);
      return;
    }
    if (choice.cost > 0) {
      state.resources.scrap -= choice.cost;
      state.stats.scrapSpent += choice.cost;
    }
    applyForgeChoice(state, choice);
    if (instantDraft) {
      const grantLabel = choice.forgeLaneLabel || choice.laneLabel || choice.tag || "CACHE";
      pushCombatFeed(
        state.forgeDraftType === "architecture_draft"
          ? choice.action === "architecture_forecast"
            ? `${choice.doctrineLabel} 잠금 적용. ${choice.weaponChoice ? choice.weaponChoice.title : "주포 mutation"}만 먼저 고정해 다음 웨이브부터 lean한 core form으로 싸운다. ${choice.breakpointLabel || "Wave 6 Chassis Break"}는 다음 form break에서, support bay와 flex lane은 Wave 8 Late Break Armory에서 늦게 열린다.`
            : `${grantLabel} 적용. 아키텍처 방향을 기울인 채 다음 웨이브를 연다.`
        : state.forgeDraftType === "bastion_draft"
          ? choice.type === "fallback"
            ? `${grantLabel} 적용. Bastion Draft를 안정화로 넘기고 다음 웨이브를 바로 연다.`
            : choice.action === "bastion_pact"
              ? `${grantLabel} 적용. 최대 체력을 깎아 고철을 쥔 대신 3웨이브 Siege Debt를 떠안고 다음 웨이브를 연다.`
              : choice.action === "wave6_ascension"
                ? `${grantLabel} 적용. ${choice.doctrineLabel}를 irreversible form으로 잠가 ${choice.doctrineChoice ? choice.doctrineChoice.title : "주포 mutation"}과 ${choice.chassisTitle || "utility chassis"}까지만 먼저 켰다.${choice.autoPursuitReady ? " 준비된 contraband salvage도 즉시 pursuit로 점화된다." : ""} support bay와 off-doctrine flex lane은 아직 열지 않고 Wave 8 Late Break Armory까지 보류한다.`
                : choice.action === "bastion_bay_forge"
                ? !choice.bayUnlock && CONSOLIDATED_12_WAVE_ROUTE
                  ? `${grantLabel} 적용. ${choice.chassisTitle || "유틸리티 섀시"}만 먼저 잠가 hold, dive, exit 리듬을 바꿨다. support rider와 flex lane은 아직 열지 않고 Wave 8 Late Break Armory까지 묶어 둔다.`
                  : wave6AscensionDraft || choice.skipNextAdminStop
                  ? `${grantLabel} 적용. ${choice.chassisTitle || "유틸리티 섀시"}를 잠그고 세 번째 support bay를 flex lane으로 즉시 열어 ${choice.systemChoice ? choice.systemChoice.title : "시스템 회로"}를 장착했다. Wave 8에서는 정지 없이 네 번째 bay가 자동 uplink되어 Wave 6-9 bracket을 그대로 이어 간다.`
                  : `${grantLabel} 적용. ${choice.chassisTitle || "유틸리티 섀시"}와 함께 세 번째 support bay를 즉시 열고 ${choice.systemChoice ? choice.systemChoice.title : "시스템 회로"}를 먼저 장착한 채, Wave 8 네 번째 bay까지 예약하고 다음 웨이브를 연다.`
                : choice.action === "bastion_doctrine"
                ? `${choice.doctrineLabel} 적용. 즉시 ${choice.doctrineChoice ? choice.doctrineChoice.title : "spike"}를 확보하고 이후 포지를 해당 교리 쪽으로 기울인 채 다음 웨이브를 연다.`
              : `${grantLabel} 적용. 고철 ${choice.cost}을 태워 ${choice.title}을 일찍 확보하고 다음 웨이브를 강행한다.`
          : state.forgeDraftType === "catalyst_draft"
            ? choice.type === "fallback"
              ? `${grantLabel} 적용. 촉매는 쥔 채로 상태만 정리하고 다음 웨이브를 연다.`
              : choice.action === "catalyst_reforge"
                ? `${choice.capstoneLabel} 점화. 남은 Act 3 웨이브를 촉매 괴물 형태로 바로 연다.`
                : `${choice.supportLabel || choice.title} 안정화. 남은 Act 3 웨이브를 이 회로 운영으로 먼저 시험한다.`
          : choice.type === "fallback"
            ? `${grantLabel} 현장 보급 적용. 고철은 아낀 채 ${choice.title}로 상태만 정리하고 다음 웨이브를 즉시 연다.`
            : choice.action === "field_convergence"
              ? `${grantLabel} 적용. ${choice.chassisTitle || "chassis"}와 support bay, 누적 greed pressure가 ${choice.title}로 융합됐다. 이제 generic late mutation 대신 이 branch form이 사격 실루엣과 압박 처리 방식을 바꾼다.`
            : choice.action === "field_greed"
              ? choice.blackLedgerRaidWaves > 0
                ? `${grantLabel} 적용. 고철과 회수 효율을 먼저 당기고 다음 웨이브를 Black Ledger Raid로 비틀었다. contraband vault payout이 커지는 대신 pocket 체류 시간이 곧 청구서가 된다.`
                : `${grantLabel} 적용. 고철과 회수 효율을 먼저 당기는 대신 다음 웨이브 하나에 Siege Debt를 붙여 greed 청구서를 바로 받는다.`
            : `${grantLabel} 현장 보급 적용. 고철 ${choice.cost}을 태워 ${choice.title}을 잠그고 다음 웨이브를 즉시 밀어붙인다.`,
        state.forgeDraftType === "architecture_draft"
          ? "ARCH"
          : state.forgeDraftType === "bastion_draft"
            ? "DRAFT"
            : state.forgeDraftType === "catalyst_draft"
              ? "CAT"
            : "CACHE"
      );
      refreshDerivedStats(false);
      beginWave(state.waveIndex + 1);
      return;
    }
    const opensPackage = shouldOpenForgePackage(state, choice) && state.forgeStep === 1;
    if (opensPackage) {
      state.forgeStep = 2;
      state.forgeMaxSteps = 2;
      state.forgeChoices = buildForgeFollowupChoices(
        state.build,
        Math.random,
        state.resources.scrap,
        { finalForge: false, nextWave: state.waveIndex + 2 },
        choice
      );
      pushCombatFeed(
        state.forgeDraftType === "armory"
          ? `${choice.tag} · ${choice.title} 적용. ${getArmoryLabel({ nextWave: state.waveIndex + 2 })} rider slot에서 support, defense, greed 중 소형 카드 1장을 더 고른다.`
          : `${choice.tag} · ${choice.title} 적용. rider slot에서 support, defense, greed 중 하나를 얹어 다음 웨이브 intent를 마감한다.`,
        "FORGE"
      );
      refreshDerivedStats(false);
      renderForgeOverlay();
      updateHUD();
      return;
    }
    pushCombatFeed(`${choice.tag} · ${choice.title} 적용.`, "FORGE");
    if (state.waveIndex + 2 === LATE_BREAK_ARMORY_WAVE && choice.lateBreakProfileId) {
      const profile = getLateBreakEncounterProfile(state.build);
      const cadence = getLateBreakCadenceSummary(choice.lateBreakProfileId);
      pushCombatFeed(
        profile
          ? `${profile.bandLabel} 고정. ${cadence.detail} 다음 두 웨이브는 ${profile.label}에서 숨을 트고, 마지막 두 웨이브는 branch 전용 spike로 닫힌다. ${profile.directive}`
          : `Late breakpoint 적용. ${cadence.detail}`,
        "BREAK"
      );
    }
    refreshDerivedStats(false);
    if (shouldFinishAfterForge(state)) {
      beginFinalCashout();
      return;
    }
    beginWave(state.waveIndex + 1);
  }

  function spawnEnemy(typeId) {
    const def = ENEMY_DEFS[typeId];
    const arena = getCurrentArenaSize();
    const edge = Math.floor(Math.random() * 4);
    let x = 0;
    let y = 0;
    const padding = 32;
    if (edge === 0) {
      x = -padding;
      y = Math.random() * arena.height;
    } else if (edge === 1) {
      x = arena.width + padding;
      y = Math.random() * arena.height;
    } else if (edge === 2) {
      x = Math.random() * arena.width;
      y = -padding;
    } else {
      x = Math.random() * arena.width;
      y = arena.height + padding;
    }
    const enemy = {
      type: typeId,
      x,
      y,
      hp: def.hp * (1 + state.waveIndex * 0.08),
      radius: def.radius,
      contactCooldown: 0,
      attackCooldown: Math.random() * 0.8,
      wobble: Math.random() * Math.PI * 2,
      orbitDirection: Math.random() > 0.5 ? 1 : -1,
      defeated: false,
      overcommitTarget: false,
      doctrinePursuitTarget: false,
    };
    if (typeId === "apex") {
      enemy.hp = def.hp * (1 + state.waveIndex * 0.12);
      enemy.attackCooldown = 0.75;
      enemy.apexChargeCooldown = 1.6 + Math.random() * 0.6;
      enemy.apexChargeTime = 0;
      enemy.apexChargeVector = { x: 1, y: 0 };
    } else if (typeId === "lancer") {
      enemy.attackCooldown = 0.55;
      enemy.lancerChargeCooldown = 1.8 + Math.random() * 0.8;
      enemy.lancerChargeTime = 0;
      enemy.lancerChargeVector = { x: 1, y: 0 };
    } else if (typeId === "brander") {
      enemy.attackCooldown = 0.95;
      enemy.branderPulseCooldown = 2.2 + Math.random() * 0.8;
      enemy.branderPulseCharge = 0;
    } else if (typeId === "binder") {
      enemy.attackCooldown = 0.8;
      enemy.binderCastTime = 0;
      enemy.binderTetherTime = 0;
      enemy.binderPulseCooldown = 0;
    }
    if (
      state.wave &&
      typeId === state.wave.lateAscensionCarrierType &&
      state.wave.lateAscension &&
      !state.wave.lateAscension.deployed &&
      !state.wave.lateAscension.claimed &&
      !state.wave.lateAscensionCarrierSpawned
    ) {
      enemy.lateAscensionCarrier = true;
      enemy.hp *= 1.22;
      state.wave.lateAscensionCarrierSpawned = true;
      pushCombatFeed(
        "Ascension Carrier 감지. Binder 핵심 개체가 dragline 아래에 Ascension Core를 싣고 들어왔다. 먼저 잘라내면 주포/차체 변이를 즉시 잠글 수 있다.",
        "ASCEND"
      );
      setBanner("Ascension Carrier", 0.85);
    }
    if (
      typeId === "elite" &&
      state.doctrinePursuit.active &&
      !state.doctrinePursuit.targetSpawned &&
      state.build.doctrinePursuitCommitted &&
      !state.build.doctrineChaseClaimed
    ) {
      enemy.doctrinePursuitTarget = true;
      enemy.hp *= 1.28;
      enemy.attackCooldown = 0.15;
      state.doctrinePursuit.targetSpawned = true;
      pushCombatFeed(
        "Forge pursuit marked elite 감지. 처치 후 떨어지는 frame shard를 회수해야 한다.",
        "FRAME"
      );
      setBanner("Frame Target", 0.8);
    } else if (
      typeId === "elite" &&
      state.overcommit.active &&
      !state.overcommit.targetSpawned &&
      !state.build.overcommitResolved &&
      !state.build.overcommitUnlocked
    ) {
      enemy.overcommitTarget = true;
      enemy.hp *= 1.35;
      enemy.attackCooldown = 0.18;
      state.overcommit.targetSpawned = true;
      state.overcommit.status = "hunt";
      pushCombatFeed(
        "Marked elite 감지. 처치 후 흩어지는 contraband salvage를 전부 회수해야 한다.",
        "RISK"
      );
      setBanner("Marked Elite", 0.8);
    }
    state.enemies.push(enemy);
  }

  function maybeSpawnEnemies(dt) {
    if (state.phase !== "wave" || !state.wave) {
      return;
    }
    const wave = state.wave;
    wave.timeLeft = Math.max(0, wave.timeLeft - dt);
    wave.cleanupPhase = wave.timeLeft <= 0;
    wave.spawnTimer -= dt;

    const progress = wave.spawnBudget > 0 ? wave.spawned / wave.spawnBudget : 1;
    const interval = wave.cleanupPhase
      ? 0.08
      : clamp(
          wave.baseSpawnInterval - progress * wave.spawnAcceleration,
          wave.spawnIntervalMin,
          wave.baseSpawnInterval
        );
    const activeCap = wave.cleanupPhase ? wave.activeCap + 10 : wave.activeCap;

    if (
      wave.apexPredator &&
      !wave.cleanupPhase &&
      !wave.apexPredator.spawned
    ) {
      wave.apexPredator.spawnTimer -= dt;
      if (wave.apexPredator.spawnTimer <= 0 && !state.enemies.some((enemy) => enemy.type === "apex")) {
        spawnEnemy("apex");
        wave.apexPredator.spawned = true;
        pushCombatFeed(
          "Cinder Maw 돌입. 구조물 대신 직접 옆구리를 파고들며 돌진한다. 한 lane을 오래 붙잡지 말고 먼저 회전해 charge를 흘려야 한다.",
          "APEX"
        );
        setBanner("Cinder Maw", 0.9);
      }
    }

    while (
      wave.spawnTimer <= 0 &&
      wave.spawned < wave.spawnBudget &&
      state.enemies.length < activeCap
    ) {
      const shouldSpawnElite =
        wave.spawned > 0 && wave.spawned % wave.eliteEvery === 0;
      const typeId = shouldSpawnElite
        ? "elite"
        : pickWeighted(wave.mix, Math.random);
      spawnEnemy(typeId);
      wave.spawned += 1;
      wave.spawnTimer += interval;
    }
  }

  function maybeSpawnHazards(dt) {
    if (
      state.phase !== "wave" ||
      !state.wave ||
      !state.wave.hazard ||
      state.wave.awaitingForge
    ) {
      return;
    }

    state.wave.hazardTimer -= dt;
    while (state.wave.hazardTimer <= 0) {
      for (let count = 0; count < state.wave.hazard.count; count += 1) {
        spawnHazard(state.wave.hazard);
      }
      state.wave.hazardTimer += state.wave.hazard.interval;
    }
  }

  function normalizeVector(x, y, fallbackX = 1, fallbackY = 0) {
    const magnitude = Math.hypot(x, y);
    if (magnitude <= 0.001) {
      return { x: fallbackX, y: fallbackY };
    }
    return {
      x: x / magnitude,
      y: y / magnitude,
    };
  }

  function clampHazardAnchor(x, y, radius, arenaWidth = ARENA_WIDTH, arenaHeight = ARENA_HEIGHT) {
    const margin = radius + 24;
    return {
      x: clamp(x, margin, arenaWidth - margin),
      y: clamp(y, margin, arenaHeight - margin),
    };
  }

  function getHazardHeading(context) {
    const player = context.player || { x: ARENA_WIDTH / 2, y: ARENA_HEIGHT / 2 };
    if (context.moveVector) {
      return normalizeVector(context.moveVector.x, context.moveVector.y, 1, 0);
    }
    if (context.aimVector) {
      return normalizeVector(context.aimVector.x, context.aimVector.y, 1, 0);
    }
    const threats = (context.enemies || []).filter((enemy) => !enemy.defeated);
    if (threats.length > 0) {
      const nearest = threats.reduce((closest, enemy) => {
        if (!closest) {
          return enemy;
        }
        const closestDistance = Math.hypot(closest.x - player.x, closest.y - player.y);
        const nextDistance = Math.hypot(enemy.x - player.x, enemy.y - player.y);
        return nextDistance < closestDistance ? enemy : closest;
      }, null);
      if (nearest) {
        return normalizeVector(nearest.x - player.x, nearest.y - player.y, 1, 0);
      }
    }
    return { x: 1, y: 0 };
  }

  function buildHazardCandidates(config, context) {
    const player = context.player || { x: ARENA_WIDTH / 2, y: ARENA_HEIGHT / 2 };
    const heading = getHazardHeading(context);
    const perpendicular = { x: -heading.y, y: heading.x };
    const routeDistance = clamp(config.radius * 0.9 + 42, 82, 148);
    const laneOffset = clamp(config.radius * 0.55, 24, 44);
    const projectedRoute = {
      x: player.x + heading.x * routeDistance,
      y: player.y + heading.y * routeDistance,
    };
    const candidates = [
      {
        x: projectedRoute.x,
        y: projectedRoute.y,
        weight: 5.8,
        tag: "route",
      },
      {
        x: projectedRoute.x + perpendicular.x * laneOffset,
        y: projectedRoute.y + perpendicular.y * laneOffset,
        weight: 4.9,
        tag: "route-left",
      },
      {
        x: projectedRoute.x - perpendicular.x * laneOffset,
        y: projectedRoute.y - perpendicular.y * laneOffset,
        weight: 4.9,
        tag: "route-right",
      },
    ];

    for (const enemy of context.enemies || []) {
      if (enemy.defeated || enemy.type !== "elite") {
        continue;
      }
      const distance = Math.hypot(enemy.x - player.x, enemy.y - player.y);
      if (distance > 320) {
        continue;
      }
      candidates.push({
        x: enemy.x,
        y: enemy.y,
        weight: 7.1 - distance / 160,
        tag: "elite",
      });
      candidates.push({
        x: (enemy.x + projectedRoute.x) / 2,
        y: (enemy.y + projectedRoute.y) / 2,
        weight: 5.7 - distance / 220,
        tag: "elite-route",
      });
    }

    for (const drop of context.drops || []) {
      if (
        drop.life <= 0 ||
        (drop.kind !== "scrap" && drop.kind !== "core" && drop.kind !== "catalyst")
      ) {
        continue;
      }
      const distance = Math.hypot(drop.x - player.x, drop.y - player.y);
      if (distance > 260) {
        continue;
      }
      const isCore = drop.kind === "core";
      const isCatalyst = drop.kind === "catalyst";
      candidates.push({
        x: drop.x,
        y: drop.y,
        weight: (isCatalyst ? 7.1 : isCore ? 6.4 : 5.6) - distance / 180,
        tag: isCatalyst ? "catalyst-drop" : isCore ? "core-drop" : "scrap-drop",
      });
    }

    return candidates.map((candidate) => ({
      ...candidate,
      ...clampHazardAnchor(candidate.x, candidate.y, config.radius, context.arenaWidth, context.arenaHeight),
    }));
  }

  function scoreHazardCandidate(candidate, config, context) {
    const player = context.player || { x: ARENA_WIDTH / 2, y: ARENA_HEIGHT / 2 };
    const routeFocus = context.routeFocus || candidate;
    const distanceToPlayer = Math.hypot(candidate.x - player.x, candidate.y - player.y);
    const distanceToRoute = Math.hypot(candidate.x - routeFocus.x, candidate.y - routeFocus.y);
    let score = candidate.weight;

    score += clamp(1.4 - distanceToRoute / 180, -1.8, 1.4);
    score += clamp(1.1 - Math.abs(distanceToPlayer - config.radius * 1.1) / 140, -1.4, 1.1);
    if (candidate.tag === "elite") {
      score += 1.1;
    } else if (candidate.tag === "elite-route") {
      score += 0.55;
    } else if (candidate.tag === "core-drop") {
      score += 0.95;
    } else if (candidate.tag === "scrap-drop") {
      score += 0.5;
    }

    for (const hazard of context.hazards || []) {
      const distance = Math.hypot(candidate.x - hazard.x, candidate.y - hazard.y);
      const minDistance = config.radius + hazard.radius + 18;
      if (distance < minDistance) {
        score -= (minDistance - distance) / 18;
      }
    }

    return score;
  }

  function chooseHazardSpawn(config, context, rng = Math.random) {
    const player = context.player || { x: ARENA_WIDTH / 2, y: ARENA_HEIGHT / 2 };
    const heading = getHazardHeading(context);
    const routeFocus = {
      x: player.x + heading.x * clamp(config.radius * 0.9 + 42, 82, 148),
      y: player.y + heading.y * clamp(config.radius * 0.9 + 42, 82, 148),
    };
    const baseCandidates = buildHazardCandidates(config, {
      ...context,
      routeFocus,
    });
    const jitterRadius = Math.max(18, config.radius * 0.32);
    let bestCandidate = null;
    let bestScore = Number.NEGATIVE_INFINITY;

    for (const candidate of baseCandidates) {
      for (let sample = 0; sample < 3; sample += 1) {
        const offsetAngle = rng() * Math.PI * 2;
        const offsetDistance = sample === 0 ? 0 : rng() * jitterRadius;
        const positioned = clampHazardAnchor(
          candidate.x + Math.cos(offsetAngle) * offsetDistance,
          candidate.y + Math.sin(offsetAngle) * offsetDistance,
          config.radius,
          context.arenaWidth,
          context.arenaHeight
        );
        const score =
          scoreHazardCandidate(
            {
              ...candidate,
              ...positioned,
            },
            config,
            {
              ...context,
              routeFocus,
            }
          ) + rng() * 0.22;
        if (score > bestScore) {
          bestScore = score;
          bestCandidate = positioned;
        }
      }
    }

    if (bestCandidate) {
      return bestCandidate;
    }

    return clampHazardAnchor(
      player.x + heading.x * config.radius,
      player.y + heading.y * config.radius,
      config.radius,
      context.arenaWidth,
      context.arenaHeight
    );
  }

  function spawnHazard(config) {
    const arena = getCurrentArenaSize();
    const moveVector = {
      x: (input.keys.has("KeyD") ? 1 : 0) - (input.keys.has("KeyA") ? 1 : 0),
      y: (input.keys.has("KeyS") ? 1 : 0) - (input.keys.has("KeyW") ? 1 : 0),
    };
    const aimVector = getAimVector();
    const position = chooseHazardSpawn(
      config,
      {
        arenaWidth: arena.width,
        arenaHeight: arena.height,
        player: state.player,
        moveVector,
        aimVector,
        enemies: state.enemies,
        drops: state.drops,
        hazards: state.hazards,
      },
      Math.random
    );

    state.hazards.push({
      x: position.x,
      y: position.y,
      radius: config.radius,
      type: config.type || "pulse",
      telegraphTime: config.telegraph,
      activeTime: config.duration,
      damage: config.damage,
      pulseTimer: 0.18,
      label: config.label,
      coreHp: Number.isFinite(config.coreHp) ? config.coreHp : 0,
      coreMaxHp: Number.isFinite(config.coreHp) ? config.coreHp : 0,
      coreRadius: Number.isFinite(config.coreRadius) ? config.coreRadius : 0,
      turretInterval: Number.isFinite(config.turretInterval) ? config.turretInterval : 0,
      turretCooldown: Number.isFinite(config.turretInterval) ? config.turretInterval * 0.6 : 0,
      turretDamage: Number.isFinite(config.turretDamage) ? config.turretDamage : 0,
      turretSpeed: Number.isFinite(config.turretSpeed) ? config.turretSpeed : 0,
      enemyPullRadius: Number.isFinite(config.enemyPullRadius) ? config.enemyPullRadius : config.radius + 42,
      salvageScrap: Number.isFinite(config.salvageScrap) ? config.salvageScrap : 0,
      salvageBurstCount: Number.isFinite(config.salvageBurstCount) ? config.salvageBurstCount : 0,
      salvageBurstRadius: Number.isFinite(config.salvageBurstRadius) ? config.salvageBurstRadius : 0,
      salvageDropLife: Number.isFinite(config.salvageDropLife) ? config.salvageDropLife : 10,
      salvageReleased: false,
      relayRange: Number.isFinite(config.relayRange) ? config.relayRange : 0,
      relayWidth: Number.isFinite(config.relayWidth) ? config.relayWidth : 0,
      relayDamage: Number.isFinite(config.relayDamage) ? config.relayDamage : config.damage,
      driftSpeed: Number.isFinite(config.driftSpeed) ? config.driftSpeed : 0,
      driftOrbit: Number.isFinite(config.driftOrbit) ? config.driftOrbit : 0.34,
      orbitDirection: Math.random() < 0.5 ? -1 : 1,
      liveChoice: config.liveChoice || null,
      objectiveTag: config.objectiveTag || null,
    });
  }

  function spawnHazardShot(hazard) {
    const dx = state.player.x - hazard.x;
    const dy = state.player.y - hazard.y;
    const distance = Math.hypot(dx, dy) || 1;
    const speed = hazard.turretSpeed || 208;
    state.projectiles.push({
      owner: "enemy",
      x: hazard.x,
      y: hazard.y,
      vx: (dx / distance) * speed,
      vy: (dy / distance) * speed,
      radius: 6,
      damage: hazard.turretDamage || 8,
      life: 2.8,
      color: "#ffb36b",
    });
  }

  function spawnScrapBurst(x, y, totalValue, count = 3, radius = 36, life = 10) {
    const dropCount = Math.max(1, Math.round(count || 1));
    const burstRadius = Math.max(0, radius || 0);
    const total = Math.max(0, Math.round(totalValue || 0));
    const baseValue = Math.floor(total / dropCount);
    let remainder = Math.max(0, total - baseValue * dropCount);
    for (let index = 0; index < dropCount; index += 1) {
      const angle = (index / dropCount) * Math.PI * 2 + Math.random() * 0.35;
      const distance = dropCount === 1 ? 0 : burstRadius * (0.35 + Math.random() * 0.65);
      const value = Math.max(1, baseValue + (remainder > 0 ? 1 : 0));
      remainder = Math.max(0, remainder - 1);
      state.drops.push({
        kind: "scrap",
        x: x + Math.cos(angle) * distance,
        y: y + Math.sin(angle) * distance,
        value,
        life,
      });
    }
  }

  function destroyHazard(hazard, reason = "expired") {
    hazard.telegraphTime = 0;
    hazard.activeTime = 0;
    if (reason === "destroyed") {
      if (
        hazard.objectiveTag === "catalyst_crucible" &&
        Array.isArray(hazard.liveChoices) &&
        hazard.liveChoices.length > 0
      ) {
        const groupId = `catalyst-crucible-${state.waveIndex + 1}-${state.stats.kills}`;
        const spreadRadius = hazard.liveChoices.length === 1 ? 0 : 42;
        hazard.liveChoices.forEach((choice, index) => {
          const angle = (index / hazard.liveChoices.length) * Math.PI * 2 - Math.PI / 2;
          state.drops.push({
            kind: "catalyst_crucible_cache",
            x: hazard.x + Math.cos(angle) * spreadRadius,
            y: hazard.y + Math.sin(angle) * spreadRadius,
            life: CATALYST_CRUCIBLE_DROP_LIFE,
            choice,
            groupId,
          });
        });
        if (state.catalystCrucible) {
          state.catalystCrucible.status = "ignite";
          state.catalystCrucible.cacheDropped = true;
        }
        pushCombatFeed(
          `${hazard.label} 균열. 세 갈래 ascension cache가 흩어졌다. 하나만 회수하면 촉매 변이와 systems bet가 함께 잠기고 나머지 splice는 닫힌다.`,
          "MOLT"
        );
      }
      if (!hazard.salvageReleased && hazard.salvageScrap > 0) {
        spawnScrapBurst(
          hazard.x,
          hazard.y,
          hazard.salvageScrap,
          hazard.salvageBurstCount,
          hazard.salvageBurstRadius,
          hazard.salvageDropLife
        );
        hazard.salvageReleased = true;
        pushCombatFeed(
          hazard.type === "caravan"
            ? `${hazard.label} 격추. contraband payload가 흩어졌다.`
            : `${hazard.label} 붕괴. salvage pocket이 열렸다.`,
          "SALV"
        );
      }
      state.shake = Math.max(state.shake, 5);
      for (let index = 0; index < 10; index += 1) {
        state.particles.push(createParticle(hazard.x, hazard.y, "#ffd7a6", 1));
      }
      pushCombatFeed(
        hazard.type === "relay"
          ? `${hazard.label} 절단. 화염 회랑이 붕괴했다.`
          : hazard.type === "caravan"
            ? `${hazard.label} 차단 성공. 도주 payload가 arena에 쏟아진다.`
          : hazard.type === "salvage"
            ? `${hazard.label} 탈취 성공. contraband burst가 흩어진다.`
          : `${hazard.label} 코어 파괴. 점거 구역이 붕괴했다.`,
        "CORE"
      );
    } else if (hazard.objectiveTag === "catalyst_crucible" && state.catalystCrucible.active) {
      state.catalystCrucible.active = false;
      state.catalystCrucible.status = "failed";
      pushCombatFeed(
        "Catalyst Crucible이 식었다. 이번 웨이브 splice 셋은 놓쳤지만 촉매는 마지막 포지까지 보관된다.",
        "MOLT"
      );
    }
  }

  function updateHazards(dt) {
    if (state.hazards.length === 0) {
      return;
    }

    const nextHazards = [];
    for (const hazard of state.hazards) {
      if (hazard.telegraphTime > 0) {
        hazard.telegraphTime -= dt;
      } else {
        hazard.activeTime -= dt;
        hazard.pulseTimer -= dt;
        if ((hazard.type === "drift" || hazard.type === "caravan") && hazard.driftSpeed > 0) {
          const chaseVector =
            hazard.type === "caravan"
              ? normalizeVector(hazard.x - state.player.x, hazard.y - state.player.y, 1, 0)
              : normalizeVector(state.player.x - hazard.x, state.player.y - hazard.y, 1, 0);
          const orbitVector = {
            x: -chaseVector.y * hazard.orbitDirection,
            y: chaseVector.x * hazard.orbitDirection,
          };
          const driftVector = normalizeVector(
            chaseVector.x + orbitVector.x * hazard.driftOrbit,
            chaseVector.y + orbitVector.y * hazard.driftOrbit,
            chaseVector.x,
            chaseVector.y
          );
          const arena = getCurrentArenaSize();
          const nextPosition = clampHazardAnchor(
            hazard.x + driftVector.x * hazard.driftSpeed * dt,
            hazard.y + driftVector.y * hazard.driftSpeed * dt,
            hazard.radius,
            arena.width,
            arena.height
          );
          hazard.x = nextPosition.x;
          hazard.y = nextPosition.y;
        }
        if (hazard.pulseTimer <= 0) {
          const distance = Math.hypot(state.player.x - hazard.x, state.player.y - hazard.y);
          let hitPlayer =
            distance < hazard.radius + state.player.radius && state.player.invulnerableTime <= 0;
          if (!hitPlayer && hazard.type === "relay" && hazard.relayWidth > 0) {
            for (const linkedHazard of getRelayLinksForHazard(hazard)) {
              const linkDistance = distanceToSegment(
                state.player.x,
                state.player.y,
                hazard.x,
                hazard.y,
                linkedHazard.x,
                linkedHazard.y
              );
              if (linkDistance <= hazard.relayWidth + state.player.radius) {
                hitPlayer = true;
                break;
              }
            }
          }
          if (hitPlayer) {
            takePlayerDamage(
              hazard.type === "relay" ? hazard.relayDamage || hazard.damage : hazard.damage,
              "hazard"
            );
          }
          hazard.pulseTimer = 0.35;
        }
        if (hazard.type === "territory" && hazard.turretInterval > 0) {
          hazard.turretCooldown -= dt;
          if (hazard.turretCooldown <= 0) {
            spawnHazardShot(hazard);
            hazard.turretCooldown += hazard.turretInterval;
          }
        }
        if (Math.random() < 0.3) {
          state.particles.push(createParticle(hazard.x, hazard.y, "#ff8c42", 0.9));
        }
      }

      if (isHazardCoreTarget(hazard) && hazard.coreHp <= 0 && hazard.activeTime > 0) {
        destroyHazard(hazard, "destroyed");
      }

      if (hazard.telegraphTime > 0 || hazard.activeTime > 0) {
        nextHazards.push(hazard);
      }
    }

    state.hazards = nextHazards;
  }

  function gainDrive(amount) {
    if (!state.player || amount <= 0) {
      return;
    }
    const waveDriveFactor =
      state.phase === "wave" && state.wave ? state.wave.driveGainFactor || 1 : 1;
    state.player.drive = clamp(
      state.player.drive + amount * waveDriveFactor * state.player.driveGainMultiplier,
      0,
      100
    );
  }

  function activateOverdrive() {
    if (
      state.phase !== "wave" ||
      !state.player ||
      state.player.overdriveActiveTime > 0 ||
      state.player.drive < 100
    ) {
      return;
    }

    state.player.drive = 0;
    state.player.overdriveActiveTime = state.player.overdriveDuration;
    state.player.heat = Math.max(0, state.player.heat - 28);
    state.player.overheated = false;
    state.stats.overdrivesUsed += 1;
    const ascensionProfile = activateWave6AscensionSurge(state);
    pushCombatFeed(
      ascensionProfile
        ? `${getBastionDoctrineDef(state.build)?.label || "Ascension"} 재점화. 오버드라이브 동안 승천 차체와 주포가 다시 한 번 fully opened 상태로 폭주한다.`
        : "오버드라이브 점화. 짧은 화력 창을 최대한 밀어붙인다.",
      "DRIVE"
    );
    setBanner("OVERDRIVE", 1);
    state.shake = Math.max(state.shake, 7);
  }

  function ventHeat() {
    if (
      state.phase !== "wave" ||
      !state.player ||
      state.player.drive < 24 ||
      state.player.heat < 18
    ) {
      return;
    }
    state.player.drive = Math.max(0, state.player.drive - 24);
    state.player.heat = Math.max(0, state.player.heat - 44);
    state.player.overheated = false;
    state.player.fireCooldown = Math.max(state.player.fireCooldown, 0.24);
    pushCombatFeed("수동 벤트 실행. 드라이브를 태워 과열을 진정시켰다.", "VENT");
    setBanner("벤트", 0.55);
  }

  function createPlayerProjectile(angle, weapon, driveActive, overrides = {}) {
    return {
      x: state.player.x + Math.cos(angle) * 16,
      y: state.player.y + Math.sin(angle) * 16,
      vx: Math.cos(angle) * weapon.projectileSpeed * (driveActive ? 1.12 : 1),
      vy: Math.sin(angle) * weapon.projectileSpeed * (driveActive ? 1.12 : 1),
      radius: weapon.core.id === "lance" ? 5.8 : driveActive ? 4.8 : 4.2,
      damage: weapon.damage + (driveActive ? 8 : 0),
      life: weapon.core.id === "lance" ? 1.1 : 1.4,
      pierce: weapon.pierce,
      bounce: weapon.bounce,
      chain: weapon.chain,
      chainRange: weapon.chainRange,
      color: weapon.color,
      doctrineOnHit: weapon.doctrineOnHit
        ? {
            ...weapon.doctrineOnHit,
            remainingBursts: weapon.doctrineOnHit.burstCount,
          }
        : null,
      doctrineOnHazardHit: weapon.doctrineOnHazardHit
        ? {
            ...weapon.doctrineOnHazardHit,
            remainingBursts: weapon.doctrineOnHazardHit.burstCount,
          }
        : null,
      capstoneOnHit: weapon.capstoneOnHit
        ? {
            ...weapon.capstoneOnHit,
            remainingBursts: weapon.capstoneOnHit.burstCount,
          }
        : null,
      capstoneOnBounce: weapon.capstoneOnBounce
        ? {
            ...weapon.capstoneOnBounce,
          }
        : null,
      ...overrides,
    };
  }

  function createDerivedProjectile(projectile, angle, overrides = {}) {
    const speed = overrides.speed || Math.hypot(projectile.vx, projectile.vy) || 1;
    return {
      ...projectile,
      x: overrides.x ?? projectile.x,
      y: overrides.y ?? projectile.y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      ...overrides,
    };
  }

  function applyPlayerAreaDamage(x, y, radius, damage, options = {}) {
    if (!(damage > 0) || !(radius > 0)) {
      return;
    }
    const hazardDamageFactor = Number.isFinite(options.hazardDamageFactor)
      ? options.hazardDamageFactor
      : 1;
    for (const enemy of state.enemies) {
      if (enemy.defeated || enemy.hp <= 0) {
        continue;
      }
      const distance = Math.hypot(enemy.x - x, enemy.y - y);
      if (distance > radius + enemy.radius) {
        continue;
      }
      enemy.hp -= damage;
      if (enemy.hp <= 0) {
        destroyEnemy(enemy);
      }
    }
    for (const hazard of state.hazards) {
      if (!isHazardCoreTarget(hazard)) {
        continue;
      }
      const distance = Math.hypot(hazard.x - x, hazard.y - y);
      if (distance > radius + hazard.coreRadius) {
        continue;
      }
      hazard.coreHp -= damage * hazardDamageFactor * getHazardCoreDamageMultiplier(hazard);
    }
  }

  function detonateSlagSeed(projectile) {
    const slagSeed = projectile && projectile.slagSeed;
    if (!slagSeed || projectile.slagDetonated) {
      return;
    }
    projectile.slagDetonated = true;
    applyPlayerAreaDamage(projectile.x, projectile.y, slagSeed.blastRadius, slagSeed.blastDamage, {
      hazardDamageFactor: 0.8,
    });
    state.slagPools.push({
      x: projectile.x,
      y: projectile.y,
      radius: slagSeed.poolRadius,
      life: slagSeed.poolDuration,
      maxLife: slagSeed.poolDuration,
      tickInterval: slagSeed.poolTickInterval,
      tickCooldown: 0.04,
      damage: slagSeed.poolDamage,
      color: slagSeed.poolColor,
    });
    state.shake = Math.max(state.shake, 3);
    for (let index = 0; index < 8; index += 1) {
      state.particles.push(createParticle(projectile.x, projectile.y, slagSeed.particleColor, 0.95));
    }
  }

  function createSupportSystemProjectile(origin, target, systemStats) {
    const dx = target.x - origin.x;
    const dy = target.y - origin.y;
    const magnitude = Math.hypot(dx, dy) || 1;
    return {
      owner: "player",
      x: origin.x,
      y: origin.y,
      vx: (dx / magnitude) * systemStats.shotSpeed,
      vy: (dy / magnitude) * systemStats.shotSpeed,
      radius: 3.8,
      damage: systemStats.shotDamage,
      life: 0.8,
      pierce: 0,
      bounce: 0,
      chain: 0,
      chainRange: 0,
      color: systemStats.color,
      capstoneOnHit: null,
      capstoneOnBounce: null,
    };
  }

  function createSupportSystemProjectileAtAngle(origin, angle, systemStats, overrides = {}) {
    return {
      owner: "player",
      x: origin.x,
      y: origin.y,
      vx: Math.cos(angle) * systemStats.shotSpeed,
      vy: Math.sin(angle) * systemStats.shotSpeed,
      radius: 3.8,
      damage: systemStats.shotDamage,
      life: 0.82,
      pierce: 0,
      bounce: 0,
      chain: 0,
      chainRange: 0,
      color: systemStats.color,
      capstoneOnHit: null,
      capstoneOnBounce: null,
      ...overrides,
    };
  }

  function findNearestEnemy(origin, maxRange) {
    let target = null;
    let bestDistance = maxRange;
    for (const enemy of state.enemies) {
      if (enemy.defeated || enemy.hp <= 0) {
        continue;
      }
      const distance = Math.hypot(enemy.x - origin.x, enemy.y - origin.y);
      if (distance < bestDistance) {
        bestDistance = distance;
        target = enemy;
      }
    }
    return target;
  }

  function findLateFieldBroadsideTarget(maxRange) {
    const origin = state.player;
    if (!origin) {
      return null;
    }
    let target = null;
    let bestScore = Number.NEGATIVE_INFINITY;
    for (const enemy of state.enemies) {
      if (enemy.defeated || enemy.hp <= 0) {
        continue;
      }
      const distance = Math.hypot(enemy.x - origin.x, enemy.y - origin.y);
      if (distance > maxRange) {
        continue;
      }
      let nearbyCount = 0;
      for (const neighbor of state.enemies) {
        if (neighbor === enemy || neighbor.defeated || neighbor.hp <= 0) {
          continue;
        }
        if (Math.hypot(neighbor.x - enemy.x, neighbor.y - enemy.y) <= 120) {
          nearbyCount += 1;
        }
      }
      const score =
        (enemy.type === "elite" ? 3.4 : 0) +
        nearbyCount * 0.85 +
        clamp(1.9 - distance / maxRange, 0, 1.9);
      if (score > bestScore) {
        bestScore = score;
        target = enemy;
      }
    }
    return target;
  }

  function fireLateFieldBroadside() {
    if (
      state.phase !== "wave" ||
      !state.player ||
      !state.weapon ||
      !state.weapon.lateFieldBroadsideConfig ||
      state.player.overheated ||
      state.enemies.length === 0
    ) {
      return;
    }
    if ((state.player.lateFieldBroadsideCooldown || 0) > 0) {
      return;
    }
    const broadside = state.weapon.lateFieldBroadsideConfig;
    const target = findLateFieldBroadsideTarget(broadside.range);
    if (!target) {
      return;
    }

    const baseAngle = Math.atan2(target.y - state.player.y, target.x - state.player.x);
    const lateralAngles = [-Math.PI / 2, Math.PI / 2];
    const podCount = Math.max(1, broadside.podCount || 1);
    const half = (podCount - 1) / 2;

    lateralAngles.forEach((lateralAngle) => {
      const lateralX = Math.cos(baseAngle + lateralAngle);
      const lateralY = Math.sin(baseAngle + lateralAngle);
      for (let podIndex = 0; podIndex < podCount; podIndex += 1) {
        const laneOffset = (podIndex - half) * 11;
        const originX =
          state.player.x +
          Math.cos(baseAngle) * 6 +
          lateralX * (state.player.radius + 12 + laneOffset);
        const originY =
          state.player.y +
          Math.sin(baseAngle) * 6 +
          lateralY * (state.player.radius + 12 + laneOffset);
        const fanCount = Math.max(1, broadside.fanCount || 1);
        const fanHalf = (fanCount - 1) / 2;
        for (let fanIndex = 0; fanIndex < fanCount; fanIndex += 1) {
          const angle = baseAngle + (fanIndex - fanHalf) * (broadside.fanSpread || 0);
          state.projectiles.push(
            createPlayerProjectile(angle, state.weapon, false, {
              x: originX,
              y: originY,
              vx: Math.cos(angle) * state.weapon.projectileSpeed * broadside.speedMultiplier,
              vy: Math.sin(angle) * state.weapon.projectileSpeed * broadside.speedMultiplier,
              radius: broadside.radius,
              damage: round(state.weapon.damage * broadside.damageMultiplier, 1),
              life: broadside.life,
              pierce: state.weapon.pierce + (broadside.pierceBonus || 0),
              bounce: state.weapon.bounce + (broadside.bounceBonus || 0),
              chain: state.weapon.chain + (broadside.chainBonus || 0),
              chainRange: state.weapon.chainRange,
              color: broadside.color,
            })
          );
        }
      }
    });

    state.player.lateFieldBroadsideCooldown = broadside.cooldown;
    state.shake = Math.max(state.shake, 3);
    for (let index = 0; index < 10; index += 1) {
      state.particles.push(createParticle(target.x, target.y, broadside.color, 0.7));
    }
  }

  function fireWeaponPattern(pattern, weapon, baseAngle, driveActive) {
    if (!pattern) {
      return;
    }
    if (pattern.kind === "slag_seed") {
      const count = Math.max(1, pattern.count || 1);
      const half = (count - 1) / 2;
      for (let seedIndex = 0; seedIndex < count; seedIndex += 1) {
        const offset = (seedIndex - half) * (pattern.spread || 0);
        const angle = baseAngle + offset;
        state.projectiles.push(
          createPlayerProjectile(angle, weapon, driveActive, {
            vx:
              Math.cos(angle) *
              weapon.projectileSpeed *
              pattern.speedMultiplier *
              (driveActive ? 1.12 : 1),
            vy:
              Math.sin(angle) *
              weapon.projectileSpeed *
              pattern.speedMultiplier *
              (driveActive ? 1.12 : 1),
            radius: pattern.radius,
            damage: round(
              (weapon.damage + (driveActive ? 8 : 0)) * pattern.damageMultiplier,
              1
            ),
            life: pattern.life,
            pierce: 0,
            bounce: 0,
            chain: 0,
            chainRange: 0,
            color: pattern.color,
            slagSeed: {
              blastRadius: pattern.blastRadius,
              blastDamage: round(
                (weapon.damage + (driveActive ? 8 : 0)) * pattern.blastDamageMultiplier,
                1
              ),
              poolRadius: pattern.poolRadius,
              poolDuration: pattern.poolDuration,
              poolTickInterval: pattern.poolTickInterval,
              poolDamage: round(
                (weapon.damage + (driveActive ? 8 : 0)) * pattern.poolDamageMultiplier,
                1
              ),
              poolColor: pattern.poolColor,
              particleColor: pattern.color,
            },
          })
        );
      }
      return;
    }
    pattern.offsets.forEach((offset) => {
      const angle = baseAngle + offset;
      state.projectiles.push(
        createPlayerProjectile(angle, weapon, driveActive, {
          vx:
            Math.cos(angle) *
            weapon.projectileSpeed *
            pattern.speedMultiplier *
            (driveActive ? 1.12 : 1),
          vy:
            Math.sin(angle) *
            weapon.projectileSpeed *
            pattern.speedMultiplier *
            (driveActive ? 1.12 : 1),
          radius: pattern.radius,
          damage: round((weapon.damage + (driveActive ? 8 : 0)) * pattern.damageMultiplier, 1),
          life: pattern.life,
          pierce: weapon.pierce + pattern.pierceBonus,
          bounce: weapon.bounce + pattern.bounceBonus,
          chain: weapon.chain + pattern.chainBonus,
          chainRange: weapon.chainRange,
          color: pattern.color,
        })
      );
    });
  }

  function emitCapstoneLinkParticles(from, to, color, steps = 5) {
    if (!from || !to) {
      return;
    }
    for (let index = 0; index <= steps; index += 1) {
      const ratio = steps === 0 ? 1 : index / steps;
      state.particles.push(
        createParticle(
          from.x + (to.x - from.x) * ratio,
          from.y + (to.y - from.y) * ratio,
          color,
          0.55
        )
      );
    }
  }

  function triggerMirrorHuntCapstone() {
    const livingEnemies = state.enemies.filter((enemy) => !enemy.defeated && enemy.hp > 0);
    if (livingEnemies.length === 0) {
      return false;
    }
    const orderedTargets = livingEnemies
      .slice()
      .sort(
        (left, right) =>
          Math.hypot(right.x - state.player.x, right.y - state.player.y) -
          Math.hypot(left.x - state.player.x, left.y - state.player.y)
      )
      .slice(0, 3);
    const damage = 24 + Math.max(0, state.supportSystem.systems.length - 1) * 8;
    let previousPoint = { x: state.player.x, y: state.player.y };
    orderedTargets.forEach((enemy) => {
      emitCapstoneLinkParticles(previousPoint, enemy, "#7fffd4", 6);
      enemy.hp -= damage;
      previousPoint = enemy;
      if (enemy.hp <= 0) {
        destroyEnemy(enemy);
      }
    });
    pushCombatFeed("Relay Storm Lattice가 외곽 적을 자동 추적해 릴레이 폭풍을 엮었다.");
    return orderedTargets.length > 0;
  }

  function triggerStormArtilleryCapstone() {
    const livingEnemies = state.enemies.filter((enemy) => !enemy.defeated && enemy.hp > 0);
    if (livingEnemies.length === 0) {
      return false;
    }
    const primaryTarget = livingEnemies
      .slice()
      .sort(
        (left, right) =>
          Math.hypot(right.x - state.player.x, right.y - state.player.y) -
          Math.hypot(left.x - state.player.x, left.y - state.player.y)
      )[0];
    if (!primaryTarget) {
      return false;
    }
    const blastRadius = 132;
    const damage = 38 + Math.max(0, state.supportSystem.systems.length - 1) * 10;
    state.particles.push(createParticle(primaryTarget.x, primaryTarget.y, "#ffd7a8", 1.2));
    state.particles.push(createParticle(primaryTarget.x, primaryTarget.y, "#fff4d7", 0.95));
    emitCapstoneLinkParticles(
      { x: primaryTarget.x, y: 0 },
      primaryTarget,
      "#ffbf72",
      7
    );
    for (const enemy of livingEnemies) {
      const distance = Math.hypot(enemy.x - primaryTarget.x, enemy.y - primaryTarget.y);
      if (distance > blastRadius + enemy.radius) {
        continue;
      }
      enemy.hp -= distance < 22 ? damage * 1.2 : damage;
      if (enemy.hp <= 0) {
        destroyEnemy(enemy);
      }
    }
    pushCombatFeed("Sky Lance Grid가 후열 무리에 자동 천공 포격을 호출했다.");
    return true;
  }

  function updateBulwarkFoundryDeployables(nextDeployable, dt) {
    const capstone = getDoctrineCapstoneDef(state.build);
    if (!capstone || capstone.id !== "bulwark_foundry") {
      return nextDeployable;
    }
    const pulseRadius = nextDeployable.shotRange * 0.28;
    nextDeployable.doctrinePulseCooldown = Math.max(0, nextDeployable.doctrinePulseCooldown - dt);
    if (nextDeployable.doctrinePulseCooldown > 0) {
      return nextDeployable;
    }
    nextDeployable.doctrinePulseCooldown = 1.65;
    const damage = 20 + Math.max(0, state.supportSystem.deployCount - 1) * 4;
    for (const enemy of state.enemies) {
      if (enemy.defeated || enemy.hp <= 0) {
        continue;
      }
      const distance = Math.hypot(enemy.x - nextDeployable.x, enemy.y - nextDeployable.y);
      if (distance > pulseRadius + enemy.radius) {
        continue;
      }
      enemy.hp -= damage;
      state.particles.push(createParticle(enemy.x, enemy.y, "#ffb261", 0.65));
      if (enemy.hp <= 0) {
        destroyEnemy(enemy);
      }
    }
    state.particles.push(createParticle(nextDeployable.x, nextDeployable.y, "#ffe0b0", 1));
    return nextDeployable;
  }

  function getKilnBastionFieldConfig() {
    const doctrine = getBastionDoctrineDef(state.build);
    if (!doctrine || doctrine.id !== "kiln_bastion") {
      return null;
    }
    const capstone = getDoctrineCapstoneDef(state.build);
    return capstone && capstone.id === "bulwark_foundry"
      ? KILN_BASTION_FIELD_CAPSTONE
      : KILN_BASTION_FIELD_BASE;
  }

  function updateKilnBastionDeployableField(nextDeployable, dt) {
    const fieldConfig = getKilnBastionFieldConfig();
    if (!fieldConfig) {
      nextDeployable.kilnFieldRadius = 0;
      nextDeployable.kilnFieldTickCooldown = 0;
      return nextDeployable;
    }
    const fieldRadius = nextDeployable.shotRange * fieldConfig.radiusFactor;
    nextDeployable.kilnFieldRadius = fieldRadius;
    nextDeployable.kilnFieldTickCooldown = Math.max(
      0,
      (nextDeployable.kilnFieldTickCooldown || 0) - dt
    );

    const playerDistance = Math.hypot(
      state.player.x - nextDeployable.x,
      state.player.y - nextDeployable.y
    );
    if (playerDistance <= fieldRadius + state.player.radius) {
      state.player.bastionFieldTime = Math.max(state.player.bastionFieldTime || 0, 0.18);
      state.player.bastionDamageMitigation = Math.max(
        state.player.bastionDamageMitigation || 0,
        fieldConfig.damageMitigation
      );
      state.player.bastionHeatFactor = Math.max(
        state.player.bastionHeatFactor || 1,
        fieldConfig.heatFactor
      );
      gainDrive(fieldConfig.drivePerSecond * dt);
    }

    if (nextDeployable.kilnFieldTickCooldown > 0) {
      return nextDeployable;
    }
    nextDeployable.kilnFieldTickCooldown = 0.34;

    for (const enemy of state.enemies) {
      if (enemy.defeated || enemy.hp <= 0) {
        continue;
      }
      const distance = Math.hypot(enemy.x - nextDeployable.x, enemy.y - nextDeployable.y);
      if (distance > fieldRadius + enemy.radius) {
        continue;
      }
      enemy.hp -= fieldConfig.enemyDamage;
      enemy.kilnFieldSlowMultiplier = Math.min(
        enemy.kilnFieldSlowMultiplier || 1,
        fieldConfig.enemySlow
      );
      enemy.kilnFieldSlowTime = Math.max(enemy.kilnFieldSlowTime || 0, 0.42);
      state.particles.push(createParticle(enemy.x, enemy.y, "#ffb261", 0.5));
      if (enemy.hp <= 0) {
        destroyEnemy(enemy);
      }
    }

    for (const hazard of state.hazards) {
      if (
        hazard.type !== "territory" ||
        hazard.telegraphTime > 0 ||
        hazard.activeTime <= 0 ||
        hazard.coreHp <= 0
      ) {
        continue;
      }
      const distance = Math.hypot(hazard.x - nextDeployable.x, hazard.y - nextDeployable.y);
      if (distance > fieldRadius + hazard.coreRadius) {
        continue;
      }
      hazard.coreHp = Math.max(0, hazard.coreHp - fieldConfig.coreDamage);
      state.particles.push(createParticle(hazard.x, hazard.y, "#ffd7a6", 0.65));
    }
    return nextDeployable;
  }

  function updateDoctrineCapstone(dt) {
    const capstone = getDoctrineCapstoneDef(state.build);
    if (!capstone || !state.supportSystem) {
      return;
    }
    if (capstone.id === "relay_storm_lattice") {
      return;
    }
    state.supportSystemRuntime.doctrineCapstoneCooldown = Math.max(
      0,
      state.supportSystemRuntime.doctrineCapstoneCooldown - dt
    );
    if (state.supportSystemRuntime.doctrineCapstoneCooldown > 0) {
      return;
    }
    let activated = false;
    if (capstone.id === "relay_storm_lattice") {
      activated = triggerMirrorHuntCapstone();
      state.supportSystemRuntime.doctrineCapstoneCooldown = 4.2;
    }
    if (!activated) {
      state.supportSystemRuntime.doctrineCapstoneCooldown = 1.2;
    }
  }

  function createSupportDeployable(system) {
    const aimTarget = findNearestEnemy(state.player, 420);
    const baseAngle = aimTarget
      ? Math.atan2(aimTarget.y - state.player.y, aimTarget.x - state.player.x)
      : state.player.facing || 0;
    const deployedForSystem = (state.supportDeployables || []).filter(
      (deployable) => deployable.systemId === system.systemId
    );
    const slotIndex = deployedForSystem.length;
    const side = slotIndex % 2 === 0 ? 1 : -1;
    const spreadIndex = Math.floor(slotIndex / 2) + (slotIndex > 0 ? 1 : 0);
    const angleOffset = slotIndex === 0 ? 0 : side * spreadIndex * 0.5;
    const deployAngle = baseAngle + angleOffset;
    const arena = getCurrentArenaSize();
    const radius = system.deployRadius || 12;
    const x = clamp(
      state.player.x + Math.cos(deployAngle) * system.deployDistance,
      radius + 12,
      arena.width - radius - 12
    );
    const y = clamp(
      state.player.y + Math.sin(deployAngle) * system.deployDistance,
      radius + 12,
      arena.height - radius - 12
    );
    return {
      systemId: system.systemId,
      systemIndex: system.systemIndex,
      x,
      y,
      radius,
      life: system.deployDuration,
      maxLife: system.deployDuration,
      shotCooldown: 0.12,
      doctrinePulseCooldown: 0.9,
      shotInterval: system.deployShotCooldown,
      shotRange: system.deployShotRange,
      shotDamage: system.deployShotDamage,
      shotSpeed: system.deployShotSpeed,
      burstCount: system.deployBurstCount,
      burstSpread: system.deployBurstSpread,
      color: system.color,
      strokeColor: system.strokeColor,
      renderShape: system.renderShape,
    };
  }

  function updateSupportDeployables(dt) {
    if (!Array.isArray(state.supportDeployables) || state.supportDeployables.length === 0) {
      state.supportDeployables = [];
      return;
    }
    const nextDeployables = [];
    for (const deployable of state.supportDeployables) {
      const nextDeployable = {
        ...deployable,
        life: deployable.life - dt,
        shotCooldown: Math.max(0, deployable.shotCooldown - dt),
      };
      if (nextDeployable.life <= 0) {
        state.particles.push(createParticle(deployable.x, deployable.y, deployable.color, 0.75));
        continue;
      }
      if (nextDeployable.shotCooldown <= 0) {
        const target = findNearestEnemy(nextDeployable, nextDeployable.shotRange);
        if (target) {
          const baseAngle = Math.atan2(target.y - nextDeployable.y, target.x - nextDeployable.x);
          const half = (nextDeployable.burstCount - 1) / 2;
          for (let index = 0; index < nextDeployable.burstCount; index += 1) {
            const angleOffset = (index - half) * nextDeployable.burstSpread;
            state.projectiles.push(
              createSupportSystemProjectileAtAngle(
                nextDeployable,
                baseAngle + angleOffset,
                {
                  color: nextDeployable.color,
                  shotDamage: nextDeployable.shotDamage,
                  shotSpeed: nextDeployable.shotSpeed,
                },
                {
                  radius: 4.1,
                  life: 0.92,
                }
              )
            );
          }
          nextDeployable.shotCooldown = nextDeployable.shotInterval;
          state.particles.push(createParticle(nextDeployable.x, nextDeployable.y, "#ffe7c4", 0.6));
        }
      }
      updateKilnBastionDeployableField(nextDeployable, dt);
      updateBulwarkFoundryDeployables(nextDeployable, dt);
      nextDeployables.push(nextDeployable);
    }
    state.supportDeployables = nextDeployables;
  }

  function updateSlagPools(dt) {
    if (!Array.isArray(state.slagPools) || state.slagPools.length === 0) {
      state.slagPools = [];
      return;
    }
    const nextPools = [];
    for (const pool of state.slagPools) {
      const nextPool = {
        ...pool,
        life: pool.life - dt,
        tickCooldown: pool.tickCooldown - dt,
      };
      if (nextPool.tickCooldown <= 0) {
        applyPlayerAreaDamage(nextPool.x, nextPool.y, nextPool.radius, nextPool.damage, {
          hazardDamageFactor: 0.45,
        });
        nextPool.tickCooldown += nextPool.tickInterval;
        if (Math.random() < 0.7) {
          state.particles.push(createParticle(nextPool.x, nextPool.y, "#ffbf72", 0.55));
        }
      }
      if (nextPool.life > 0) {
        nextPools.push(nextPool);
      }
    }
    state.slagPools = nextPools;
  }

  function emitStormRailBursts(projectile, sourceEnemy) {
    const onHit = projectile && projectile.capstoneOnHit;
    if (!onHit || onHit.kind !== "storm_branch" || onHit.remainingBursts <= 0) {
      return;
    }
    let emitted = 0;
    for (const enemy of state.enemies) {
      if (
        enemy === sourceEnemy ||
        enemy.defeated ||
        enemy.hp <= 0 ||
        emitted >= onHit.remainingBursts
      ) {
        continue;
      }
      const distance = Math.hypot(enemy.x - sourceEnemy.x, enemy.y - sourceEnemy.y);
      if (distance > onHit.range) {
        continue;
      }
      const angle = Math.atan2(enemy.y - sourceEnemy.y, enemy.x - sourceEnemy.x);
      state.projectiles.push(
        createDerivedProjectile(projectile, angle, {
          x: sourceEnemy.x,
          y: sourceEnemy.y,
          speed: (Math.hypot(projectile.vx, projectile.vy) || 1) * onHit.speedMultiplier,
          radius: Math.max(projectile.radius - 0.2, 4.8),
          damage: round(projectile.damage * onHit.damageMultiplier, 1),
          life: 0.32,
          pierce: 0,
          bounce: 0,
          chain: 0,
          chainRange: 0,
          color: onHit.color,
          capstoneOnHit: null,
          capstoneOnBounce: null,
        })
      );
      emitted += 1;
    }
    onHit.remainingBursts = 0;
  }

  function emitStormspireNeedleBursts(projectile, sourceEnemy) {
    const onHit = projectile && projectile.doctrineOnHit;
    if (!onHit || onHit.kind !== "stormspire_branch" || onHit.remainingBursts <= 0) {
      return;
    }
    let emitted = 0;
    for (const enemy of state.enemies) {
      if (
        enemy === sourceEnemy ||
        enemy.defeated ||
        enemy.hp <= 0 ||
        emitted >= onHit.remainingBursts
      ) {
        continue;
      }
      const distance = Math.hypot(enemy.x - sourceEnemy.x, enemy.y - sourceEnemy.y);
      if (distance > onHit.range) {
        continue;
      }
      const angle = Math.atan2(enemy.y - sourceEnemy.y, enemy.x - sourceEnemy.x);
      state.projectiles.push(
        createDerivedProjectile(projectile, angle, {
          x: sourceEnemy.x,
          y: sourceEnemy.y,
          speed: (Math.hypot(projectile.vx, projectile.vy) || 1) * onHit.speedMultiplier,
          radius: Math.max(projectile.radius - 0.1, 5),
          damage: round(projectile.damage * onHit.damageMultiplier, 1),
          life: 0.28,
          pierce: 1,
          bounce: 0,
          chain: 0,
          chainRange: 0,
          color: onHit.color,
          doctrineOnHit: null,
          capstoneOnHit: null,
          capstoneOnBounce: null,
        })
      );
      emitted += 1;
    }
    onHit.remainingBursts = 0;
  }

  function emitMirrorReaveBursts(projectile, sourceEnemy) {
    const onHit = projectile && projectile.doctrineOnHit;
    if (!onHit || onHit.kind !== "mirror_reave" || onHit.remainingBursts <= 0) {
      return;
    }
    let emitted = 0;
    for (const enemy of state.enemies) {
      if (
        enemy === sourceEnemy ||
        enemy.defeated ||
        enemy.hp <= 0 ||
        emitted >= onHit.remainingBursts
      ) {
        continue;
      }
      const distance = Math.hypot(enemy.x - sourceEnemy.x, enemy.y - sourceEnemy.y);
      if (distance > onHit.range) {
        continue;
      }
      const angle = Math.atan2(enemy.y - sourceEnemy.y, enemy.x - sourceEnemy.x);
      state.projectiles.push(
        createDerivedProjectile(projectile, angle, {
          x: sourceEnemy.x,
          y: sourceEnemy.y,
          speed: (Math.hypot(projectile.vx, projectile.vy) || 1) * onHit.speedMultiplier,
          radius: Math.max(projectile.radius - 0.2, 4.2),
          damage: round(projectile.damage * onHit.damageMultiplier, 1),
          life: 0.34,
          pierce: 0,
          bounce: 1,
          chain: 1,
          chainRange: Math.max(projectile.chainRange || 0, 152),
          color: onHit.color,
          doctrineOnHit: null,
          doctrineOnHazardHit: null,
          capstoneOnHit: null,
          capstoneOnBounce: null,
        })
      );
      emitted += 1;
    }
    onHit.remainingBursts = 0;
  }

  function emitBulwarkFoundryBursts(projectile, sourceEnemy) {
    const onHit = projectile && projectile.doctrineOnHit;
    if (!onHit || onHit.kind !== "foundry_shatter" || onHit.remainingBursts <= 0) {
      return;
    }
    const baseAngle = Math.atan2(projectile.vy, projectile.vx);
    const half = (onHit.remainingBursts - 1) / 2;
    for (let index = 0; index < onHit.remainingBursts; index += 1) {
      const offset = (index - half) * onHit.spread;
      const angle = baseAngle + offset;
      state.projectiles.push(
        createDerivedProjectile(projectile, angle, {
          x: sourceEnemy.x + Math.cos(angle) * (sourceEnemy.radius + 8),
          y: sourceEnemy.y + Math.sin(angle) * (sourceEnemy.radius + 8),
          speed: (Math.hypot(projectile.vx, projectile.vy) || 1) * onHit.speedMultiplier,
          radius: onHit.radius,
          damage: round(projectile.damage * onHit.damageMultiplier, 1),
          life: onHit.life,
          pierce: 0,
          bounce: 0,
          chain: 0,
          chainRange: 0,
          color: onHit.color,
          doctrineOnHit: null,
          doctrineOnHazardHit: null,
          capstoneOnHit: null,
          capstoneOnBounce: null,
          slagSeed: {
            blastRadius: onHit.slagSeed.blastRadius,
            blastDamage: round(projectile.damage * onHit.slagSeed.blastDamageMultiplier, 1),
            poolRadius: onHit.slagSeed.poolRadius,
            poolDuration: onHit.slagSeed.poolDuration,
            poolTickInterval: onHit.slagSeed.poolTickInterval,
            poolDamage: round(projectile.damage * onHit.slagSeed.poolDamageMultiplier, 1),
            poolColor: onHit.slagSeed.poolColor,
            particleColor: onHit.color,
          },
        })
      );
    }
    onHit.remainingBursts = 0;
  }

  function emitRelaySeverBursts(projectile, sourceHazard) {
    const onHazardHit = projectile && projectile.doctrineOnHazardHit;
    if (
      !sourceHazard ||
      !onHazardHit ||
      onHazardHit.kind !== "relay_sever" ||
      onHazardHit.remainingBursts <= 0 ||
      sourceHazard.type !== "relay"
    ) {
      return;
    }
    const relayTargets = getRelayLinksForHazard(sourceHazard)
      .filter((hazard) => isHazardCoreTarget(hazard) && hazard.coreHp > 0)
      .slice(0, onHazardHit.remainingBursts);
    if (relayTargets.length < onHazardHit.remainingBursts) {
      const fallbackTargets = state.hazards
        .filter(
          (hazard) =>
            hazard !== sourceHazard &&
            !relayTargets.includes(hazard) &&
            isHazardCoreTarget(hazard) &&
            hazard.type === "relay" &&
            hazard.coreHp > 0 &&
            Math.hypot(hazard.x - sourceHazard.x, hazard.y - sourceHazard.y) <= onHazardHit.range
        )
        .sort(
          (left, right) =>
            Math.hypot(left.x - sourceHazard.x, left.y - sourceHazard.y) -
            Math.hypot(right.x - sourceHazard.x, right.y - sourceHazard.y)
        )
        .slice(0, onHazardHit.remainingBursts - relayTargets.length);
      relayTargets.push(...fallbackTargets);
    }
    for (const hazard of relayTargets) {
      const angle = Math.atan2(hazard.y - sourceHazard.y, hazard.x - sourceHazard.x);
      const launchOffset = sourceHazard.coreRadius + projectile.radius + 4;
      state.projectiles.push(
        createDerivedProjectile(projectile, angle, {
          x: sourceHazard.x + Math.cos(angle) * launchOffset,
          y: sourceHazard.y + Math.sin(angle) * launchOffset,
          speed: (Math.hypot(projectile.vx, projectile.vy) || 1) * onHazardHit.speedMultiplier,
          radius: Math.max(projectile.radius - 0.1, 5),
          damage: round(projectile.damage * onHazardHit.damageMultiplier, 1),
          life: 0.34,
          pierce: 1,
          bounce: 0,
          chain: 0,
          chainRange: 0,
          color: onHazardHit.color,
          doctrineOnHit: null,
          doctrineOnHazardHit: null,
          capstoneOnHit: null,
          capstoneOnBounce: null,
        })
      );
    }
    onHazardHit.remainingBursts = 0;
  }

  function emitMirrorSplit(projectile) {
    const onBounce = projectile && projectile.capstoneOnBounce;
    if (!onBounce || onBounce.kind !== "mirror_split" || onBounce.splitCount <= 0) {
      return;
    }
    const baseAngle = Math.atan2(projectile.vy, projectile.vx);
    const speed = (Math.hypot(projectile.vx, projectile.vy) || 1) * onBounce.speedMultiplier;
    const half = (onBounce.splitCount - 1) / 2;
    for (let index = 0; index < onBounce.splitCount; index += 1) {
      const offset = (index - half) * onBounce.spread;
      state.projectiles.push(
        createDerivedProjectile(projectile, baseAngle + offset, {
          speed,
          radius: Math.max(projectile.radius - 0.4, 3.8),
          damage: round(projectile.damage * onBounce.damageMultiplier, 1),
          life: Math.max(projectile.life, 0.38),
          color: onBounce.color,
          capstoneOnBounce: null,
          capstoneOnHit: null,
        })
      );
    }
    projectile.capstoneOnBounce = null;
  }

  function updateSupportSystem(dt) {
    if (state.phase !== "wave" || !state.player || !state.supportSystem) {
      return;
    }
    syncSupportSystemRuntime();
    state.supportSystemRuntime.angle += dt * state.supportSystem.orbitSpeed;
    state.supportSystemRuntime.touchCooldowns = state.supportSystemRuntime.touchCooldowns.map((cooldown) =>
      Math.max(0, cooldown - dt)
    );
    state.supportSystemRuntime.interceptCooldowns = state.supportSystemRuntime.interceptCooldowns.map(
      (cooldown) => Math.max(0, cooldown - dt)
    );
    state.supportSystemRuntime.shotCooldowns = state.supportSystemRuntime.shotCooldowns.map((cooldown) =>
      Math.max(0, cooldown - dt)
    );
    state.supportSystemRuntime.deployCooldowns = state.supportSystemRuntime.deployCooldowns.map((cooldown) =>
      Math.max(0, cooldown - dt)
    );
    updateSupportDeployables(dt);
    updateDoctrineCapstone(dt);
    (state.supportSystem.deployableSystems || []).forEach((system) => {
      const activeCount = state.supportDeployables.filter(
        (deployable) => deployable.systemId === system.systemId
      ).length;
      if (
        activeCount >= system.deployCount ||
        state.supportSystemRuntime.deployCooldowns[system.systemIndex] > 0
      ) {
        return;
      }
      state.supportDeployables.push(createSupportDeployable(system));
      state.supportSystemRuntime.deployCooldowns[system.systemIndex] = system.deployCooldown;
      state.particles.push(
        createParticle(
          state.supportDeployables[state.supportDeployables.length - 1].x,
          state.supportDeployables[state.supportDeployables.length - 1].y,
          system.color,
          0.85
        )
      );
    });
    const satellites = getSupportSystemSatellites();

    satellites.forEach((satellite, index) => {
      if (satellite.interceptRange <= 0 || state.supportSystemRuntime.interceptCooldowns[index] > 0) {
        return;
      }
      const hostileProjectile = state.projectiles.find((projectile) => {
        if (projectile.owner !== "enemy" || projectile.life <= 0) {
          return false;
        }
        const distance = Math.hypot(projectile.x - satellite.x, projectile.y - satellite.y);
        return distance <= satellite.interceptRange + projectile.radius + satellite.radius;
      });
      if (!hostileProjectile) {
        return;
      }
      hostileProjectile.life = 0;
      state.supportSystemRuntime.interceptCooldowns[index] = satellite.interceptCooldown;
      state.particles.push(createParticle(hostileProjectile.x, hostileProjectile.y, satellite.color, 1));
      state.particles.push(createParticle(satellite.x, satellite.y, "#f3feff", 0.8));
      if (satellite.interceptPulseDamage > 0 && satellite.interceptPulseRadius > 0) {
        for (const enemy of state.enemies) {
          if (enemy.defeated || enemy.hp <= 0) {
            continue;
          }
          const distance = Math.hypot(enemy.x - hostileProjectile.x, enemy.y - hostileProjectile.y);
          if (distance > satellite.interceptPulseRadius + enemy.radius) {
            continue;
          }
          enemy.hp -= satellite.interceptPulseDamage;
          state.particles.push(createParticle(enemy.x, enemy.y, "#c7fbff", 0.6));
          if (enemy.hp <= 0) {
            destroyEnemy(enemy);
          }
        }
      }
    });

    satellites.forEach((satellite, index) => {
      for (const enemy of state.enemies) {
        if (enemy.defeated || enemy.hp <= 0) {
          continue;
        }
        const distance = Math.hypot(enemy.x - satellite.x, enemy.y - satellite.y);
        if (
          distance < enemy.radius + satellite.radius &&
          state.supportSystemRuntime.touchCooldowns[index] <= 0
        ) {
          enemy.hp -= satellite.touchDamage;
          state.supportSystemRuntime.touchCooldowns[index] = satellite.touchCooldown;
          state.particles.push(createParticle(satellite.x, satellite.y, satellite.color, 0.8));
          if (enemy.hp <= 0) {
            destroyEnemy(enemy);
          }
          break;
        }
      }
    });

    state.supportSystem.systems.forEach((system, systemIndex) => {
      if (system.shotCooldown <= 0 || state.supportSystemRuntime.shotCooldowns[systemIndex] > 0) {
        return;
      }
      let fired = false;
      satellites
        .filter((satellite) => satellite.systemIndex === systemIndex && satellite.shotCooldown > 0)
        .forEach((satellite) => {
          let target = null;
          let bestDistance = satellite.shotRange;
          for (const enemy of state.enemies) {
            if (enemy.defeated || enemy.hp <= 0) {
              continue;
            }
            const distance = Math.hypot(enemy.x - satellite.x, enemy.y - satellite.y);
            if (distance < bestDistance) {
              bestDistance = distance;
              target = enemy;
            }
          }
          if (target) {
            state.projectiles.push(createSupportSystemProjectile(satellite, target, satellite));
            state.particles.push(createParticle(satellite.x, satellite.y, "#fff0c9", 0.55));
            fired = true;
          }
        });
      if (fired) {
        state.supportSystemRuntime.shotCooldowns[systemIndex] = system.shotCooldown;
      }
    });
  }

  function fireWeapon() {
    if (state.phase !== "wave") {
      return;
    }
    if (state.player.overheated || state.enemies.length === 0) {
      return;
    }
    if (state.player.fireCooldown > 0) {
      return;
    }

    const weapon = state.weapon;
    const driveActive = state.player.overdriveActiveTime > 0;
    const aim = getAimVector();
    const baseAngle = Math.atan2(aim.y, aim.x);
    state.player.facing = baseAngle;

    for (let pellet = 0; pellet < weapon.pellets; pellet += 1) {
      const pelletOffset =
        weapon.pellets === 1
          ? 0
          : ((pellet / (weapon.pellets - 1)) * 2 - 1) * weapon.spread;
      const angle = baseAngle + pelletOffset;
      state.projectiles.push(createPlayerProjectile(angle, weapon, driveActive));
    }

    fireWeaponPattern(weapon.evolutionFirePattern, weapon, baseAngle, driveActive);
    fireWeaponPattern(weapon.doctrineFirePattern, weapon, baseAngle, driveActive);
    fireWeaponPattern(weapon.lateAscensionFirePattern, weapon, baseAngle, driveActive);
    fireWeaponPattern(weapon.afterburnOverdriveFirePattern, weapon, baseAngle, driveActive);
    fireWeaponPattern(weapon.afterburnDominionFirePattern, weapon, baseAngle, driveActive);
    fireWeaponPattern(weapon.lateFieldMutationFirePattern, weapon, baseAngle, driveActive);
    fireWeaponPattern(weapon.lateBreakCataclysmFirePattern, weapon, baseAngle, driveActive);
    fireWeaponPattern(weapon.lateFieldConvergenceFirePattern, weapon, baseAngle, driveActive);
    fireWeaponPattern(weapon.illegalOverclockFirePattern, weapon, baseAngle, driveActive);
    fireWeaponPattern(weapon.riskMutationFirePattern, weapon, baseAngle, driveActive);
    fireWeaponPattern(weapon.apexMutationFirePattern, weapon, baseAngle, driveActive);
    const ascensionFireProfile = fireWave6AscensionVolley(weapon, baseAngle, driveActive);
    const chassisFireProfile = fireChassisWeaponPosture(weapon, baseAngle, driveActive);

    if (weapon.capstoneFire) {
      if (weapon.capstoneFire.kind === "temper_slug") {
        state.projectiles.push(
          createPlayerProjectile(baseAngle, weapon, driveActive, {
            vx:
              Math.cos(baseAngle) *
              weapon.projectileSpeed *
              weapon.capstoneFire.speedMultiplier *
              (driveActive ? 1.12 : 1),
            vy:
              Math.sin(baseAngle) *
              weapon.projectileSpeed *
              weapon.capstoneFire.speedMultiplier *
              (driveActive ? 1.12 : 1),
            radius: weapon.capstoneFire.radius,
            damage: round(
              (weapon.damage + (driveActive ? 8 : 0)) * weapon.capstoneFire.damageMultiplier,
              1
            ),
            life: 1.18,
            pierce: weapon.pierce + weapon.capstoneFire.pierceBonus,
            bounce: 0,
            chain: 0,
            chainRange: 0,
            color: weapon.capstoneFire.color,
          })
        );
      } else if (weapon.capstoneFire.kind === "ember_echo") {
        const half = (weapon.capstoneFire.projectileCount - 1) / 2;
        for (
          let projectileIndex = 0;
          projectileIndex < weapon.capstoneFire.projectileCount;
          projectileIndex += 1
        ) {
          const echoOffset =
            (projectileIndex - half) * weapon.capstoneFire.spread;
          const echoAngle = baseAngle + echoOffset;
          state.projectiles.push(
            createPlayerProjectile(echoAngle, weapon, driveActive, {
              vx:
                Math.cos(echoAngle) *
                weapon.projectileSpeed *
                weapon.capstoneFire.speedMultiplier *
                (driveActive ? 1.12 : 1),
              vy:
                Math.sin(echoAngle) *
                weapon.projectileSpeed *
                weapon.capstoneFire.speedMultiplier *
                (driveActive ? 1.12 : 1),
              radius: weapon.capstoneFire.radius,
              damage: round(
                (weapon.damage + (driveActive ? 8 : 0)) * weapon.capstoneFire.damageMultiplier,
                1
              ),
              life: 1.08,
              pierce: weapon.pierce,
              bounce: 0,
              chain: 0,
              chainRange: 0,
              color: weapon.capstoneFire.color,
            })
          );
        }
      }
    }

    state.player.heat = clamp(
      state.player.heat +
        weapon.heatPerShot *
          (driveActive ? 0.58 : 1) *
          (ascensionFireProfile.heatMultiplier || 1) *
          (chassisFireProfile.heatMultiplier || 1),
      0,
      100
    );
    state.player.fireCooldown =
      weapon.cooldown *
      (driveActive ? 0.6 : 1) *
      (ascensionFireProfile.cooldownMultiplier || 1) *
      (chassisFireProfile.cooldownMultiplier || 1);
    if (state.player.heat >= 100) {
      state.player.overheated = true;
      pushCombatFeed("과열 발생. 사격 회복 전까지 회피와 냉각이 우선이다.", "HEAT");
      setBanner("과열", 0.7);
    }
  }

  function getAimVector() {
    if (input.pointer.inside) {
      const dx = input.pointer.x - state.player.x;
      const dy = input.pointer.y - state.player.y;
      const distance = Math.hypot(dx, dy) || 1;
      return {
        x: dx / distance,
        y: dy / distance,
      };
    }

    if (state.enemies.length > 0) {
      const target = state.enemies.reduce((closest, enemy) => {
        if (!closest) {
          return enemy;
        }
        const enemyDistance = Math.hypot(enemy.x - state.player.x, enemy.y - state.player.y);
        const closestDistance = Math.hypot(
          closest.x - state.player.x,
          closest.y - state.player.y
        );
        return enemyDistance < closestDistance ? enemy : closest;
      }, null);
      const dx = target.x - state.player.x;
      const dy = target.y - state.player.y;
      const distance = Math.hypot(dx, dy) || 1;
      return {
        x: dx / distance,
        y: dy / distance,
      };
    }

    return { x: 1, y: 0 };
  }

  function updatePlayer(dt) {
    const arena = getCurrentArenaSize();
    const fieldConfig = getKilnBastionFieldConfig();
    state.player.bastionFieldTime = Math.max(0, (state.player.bastionFieldTime || 0) - dt);
    state.player.bastionRepairCooldown = Math.max(0, (state.player.bastionRepairCooldown || 0) - dt);
    state.player.bastionDamageMitigation =
      state.player.bastionFieldTime > 0 ? state.player.bastionDamageMitigation || 0 : 0;
    state.player.bastionHeatFactor =
      state.player.bastionFieldTime > 0 ? Math.max(1, state.player.bastionHeatFactor || 1) : 1;
    const move = { x: 0, y: 0 };
    if (input.keys.has("KeyW")) {
      move.y -= 1;
    }
    if (input.keys.has("KeyS")) {
      move.y += 1;
    }
    if (input.keys.has("KeyA")) {
      move.x -= 1;
    }
    if (input.keys.has("KeyD")) {
      move.x += 1;
    }

    const magnitude = Math.hypot(move.x, move.y) || 1;
    const moveIntentMagnitude = clamp(Math.hypot(move.x, move.y), 0, 1);
    state.player.moveIntentMagnitude = moveIntentMagnitude;
    updatePlayerChassisState(dt, Math.hypot(move.x, move.y));
    let speed =
      state.player.moveSpeed + getChassisMoveSpeedBonus() + (state.player.overdriveActiveTime > 0 ? 34 : 0);
    let binderSlow = 0;
    let binderDashSlow = 0;
    for (const enemy of state.enemies) {
      if (enemy.type !== "binder" || enemy.defeated || enemy.hp <= 0 || (enemy.binderTetherTime || 0) <= 0) {
        continue;
      }
      const distanceToBinder = Math.hypot(state.player.x - enemy.x, state.player.y - enemy.y);
      if (distanceToBinder > 520) {
        continue;
      }
      binderSlow += enemy.lateAscensionCarrier ? 0.22 : 0.16;
      binderDashSlow += enemy.lateAscensionCarrier ? 0.26 : 0.18;
    }
    if (binderSlow > 0) {
      speed *= clamp(1 - binderSlow, 0.46, 1);
    }
    const chassis = getChassisBreakpointDef(state.build);
    const ascensionProfile = getWave6AscensionProfile();
    const stormAscensionSurging =
      ascensionProfile?.id === "storm_artillery" && state.player.wave6AscensionSurgeTime > 0;
    if (chassis && chassis.id === "bulwark_treads") {
      if (state.player.chassisAnchorActiveTime > 0) {
        speed *= stormAscensionSurging ? 0.72 : 0.52;
      } else if (state.player.chassisAnchorCharge > 0.45) {
        speed *= 0.78;
      }
    }
    state.player.x += (move.x / magnitude) * speed * dt;
    state.player.y += (move.y / magnitude) * speed * dt;

    state.player.x = clamp(state.player.x, 18, arena.width - 18);
    state.player.y = clamp(state.player.y, 18, arena.height - 18);

    state.player.fireCooldown = Math.max(0, state.player.fireCooldown - dt * getChassisCooldownFactor());
    state.player.lateFieldBroadsideCooldown = Math.max(
      0,
      (state.player.lateFieldBroadsideCooldown || 0) - dt
    );
    state.player.invulnerableTime = Math.max(0, state.player.invulnerableTime - dt);
    state.player.heat = Math.max(
      0,
      state.player.heat -
        state.player.coolRate *
          dt *
          (state.player.overdriveActiveTime > 0 ? 1.5 : 1) *
          state.player.bastionHeatFactor
    );
    if (getLateFieldAegisLevel(state.build) > 0) {
      state.player.fieldAegisCooldown = Math.max(0, state.player.fieldAegisCooldown - dt);
      if (
        state.player.fieldAegisCharge < getLateFieldAegisMaxCharges(state.build) &&
        state.player.fieldAegisCooldown <= 0
      ) {
        state.player.fieldAegisCharge += 1;
        state.player.fieldAegisCooldown = getLateFieldAegisCooldown(getLateFieldAegisLevel(state.build));
        state.particles.push(createParticle(state.player.x, state.player.y, "#8bf0ff", 0.9));
      }
    }
    if (state.player.overheated && state.player.heat < 45) {
      state.player.overheated = false;
    }

    if (
      fieldConfig &&
      state.player.bastionFieldTime > 0 &&
      state.player.bastionRepairCooldown <= 0 &&
      state.player.hp < state.player.maxHp
    ) {
      state.player.hp = Math.min(state.player.maxHp, state.player.hp + fieldConfig.repairAmount);
      state.player.bastionRepairCooldown = fieldConfig.repairInterval;
      state.particles.push(createParticle(state.player.x, state.player.y, "#ffd7a6", 0.85));
    }

    state.player.overdriveActiveTime = Math.max(
      0,
      state.player.overdriveActiveTime - dt
    );

    if (state.player.dashCharges < state.player.dashMax) {
      state.player.dashCooldownTimer += dt * clamp(1 - binderDashSlow, 0.42, 1);
      if (state.player.dashCooldownTimer >= state.player.dashCooldown) {
        state.player.dashCharges += 1;
        state.player.dashCooldownTimer = 0;
      }
    }

    state.player.dashTrail = Math.max(0, state.player.dashTrail - dt * 3);

    fireWeapon();
    fireLateFieldBroadside();
  }

  function dashPlayer() {
    if (state.phase !== "wave" || !state.player || state.player.dashCharges <= 0) {
      return;
    }

    const arena = getCurrentArenaSize();
    const move = { x: 0, y: 0 };
    if (input.keys.has("KeyW")) {
      move.y -= 1;
    }
    if (input.keys.has("KeyS")) {
      move.y += 1;
    }
    if (input.keys.has("KeyA")) {
      move.x -= 1;
    }
    if (input.keys.has("KeyD")) {
      move.x += 1;
    }

    let dashX = move.x;
    let dashY = move.y;
    if (dashX === 0 && dashY === 0) {
      const aim = getAimVector();
      dashX = aim.x;
      dashY = aim.y;
    }

    const magnitude = Math.hypot(dashX, dashY) || 1;
    state.player.x += (dashX / magnitude) * 120;
    state.player.y += (dashY / magnitude) * 120;
    state.player.x = clamp(state.player.x, 24, arena.width - 24);
    state.player.y = clamp(state.player.y, 24, arena.height - 24);
    state.player.dashCharges -= 1;
    state.player.dashCooldownTimer = 0;
    state.player.invulnerableTime = 0.22;
    state.player.dashTrail = 0.8;
    state.shake = Math.max(state.shake, 6);
    for (let index = 0; index < 10; index += 1) {
      state.particles.push(createParticle(state.player.x, state.player.y, "#ffd166", 1.1));
    }
    const chassis = getChassisBreakpointDef(state.build);
    if (chassis && chassis.id === "vector_thrusters") {
      state.player.chassisVectorTime = 1.2;
      triggerChassisPulse(state.player.x, state.player.y, 84, 22, "#8ae7ff", {
        hazardDamageFactor: 0.55,
        clearEnemyShots: true,
        shake: 5,
      });
    }
  }

  function spawnEnemyShot(enemy, heavyOrConfig) {
    const config =
      heavyOrConfig && typeof heavyOrConfig === "object"
        ? heavyOrConfig
        : {
            speed: heavyOrConfig ? 218 : 192,
            radius: heavyOrConfig ? 7 : 5,
            damage: heavyOrConfig ? 12 : 8,
            life: heavyOrConfig ? 2.6 : 2.2,
            color: heavyOrConfig ? "#ffd166" : "#8ae7ff",
            count: 1,
            spread: 0,
          };
    const targetX = Number.isFinite(config.targetX) ? config.targetX : state.player.x;
    const targetY = Number.isFinite(config.targetY) ? config.targetY : state.player.y;
    const dx = targetX - enemy.x;
    const dy = targetY - enemy.y;
    const distance = Math.hypot(dx, dy) || 1;
    const baseAngle = Math.atan2(dy, dx);
    const count = Math.max(1, Math.round(config.count || 1));
    const spread = count > 1 ? config.spread || 0 : 0;
    for (let index = 0; index < count; index += 1) {
      const offset = (index - (count - 1) / 2) * spread;
      const angle = baseAngle + offset;
      state.projectiles.push({
        owner: "enemy",
        x: enemy.x,
        y: enemy.y,
        vx: Math.cos(angle) * config.speed,
        vy: Math.sin(angle) * config.speed,
        radius: config.radius,
        damage: config.damage,
        life: config.life,
        color: config.color,
      });
    }
  }

  function updateEnemies(dt) {
    for (const enemy of state.enemies) {
      if (enemy.defeated) {
        continue;
      }
      const def = ENEMY_DEFS[enemy.type];
      let dx = state.player.x - enemy.x;
      let dy = state.player.y - enemy.y;
      let angle = Math.atan2(dy, dx);
      let speedMultiplier = 1;
      enemy.kilnFieldSlowTime = Math.max(0, (enemy.kilnFieldSlowTime || 0) - dt);
      if (enemy.kilnFieldSlowTime > 0) {
        speedMultiplier *= enemy.kilnFieldSlowMultiplier || 0.82;
      } else {
        enemy.kilnFieldSlowMultiplier = 1;
      }

      const territoryHazard = state.hazards.find((hazard) => {
        if (hazard.type !== "territory" || hazard.telegraphTime > 0 || hazard.activeTime <= 0) {
          return false;
        }
        const distance = Math.hypot(enemy.x - hazard.x, enemy.y - hazard.y);
        return distance < (hazard.enemyPullRadius || hazard.radius + 42);
      });
      if (territoryHazard) {
        const hazardDistance = Math.hypot(enemy.x - territoryHazard.x, enemy.y - territoryHazard.y) || 1;
        if (hazardDistance > territoryHazard.radius * 0.58) {
          dx = territoryHazard.x - enemy.x;
          dy = territoryHazard.y - enemy.y;
          angle = Math.atan2(dy, dx);
        }
        if (hazardDistance < territoryHazard.radius) {
          speedMultiplier = 1.18;
        }
      }

      if (enemy.type === "shrike") {
        enemy.wobble += dt * 5;
        angle += Math.sin(enemy.wobble) * 0.6;
      } else if (enemy.type === "skimmer") {
        enemy.wobble += dt * 6.2;
        const distanceToPlayer = Math.hypot(state.player.x - enemy.x, state.player.y - enemy.y);
        const preferredRange = 176;
        if (distanceToPlayer < preferredRange * 0.76) {
          angle += Math.PI * 0.94 + Math.sin(enemy.wobble) * 0.28;
          speedMultiplier *= 1.28;
        } else if (distanceToPlayer <= preferredRange * 1.22) {
          angle += enemy.orbitDirection * 1.38 + Math.sin(enemy.wobble) * 0.26;
          speedMultiplier *= 1.18;
        } else {
          speedMultiplier *= 1.24;
        }
      } else if (enemy.type === "brander") {
        enemy.wobble += dt * 3.4;
        const previousChargeTime = enemy.branderPulseCharge || 0;
        enemy.branderPulseCharge = Math.max(0, previousChargeTime - dt);
        enemy.branderPulseCooldown = Math.max(0, (enemy.branderPulseCooldown || 0) - dt);
        const distanceToPlayer = Math.hypot(state.player.x - enemy.x, state.player.y - enemy.y);
        const preferredRange = 244;
        if (previousChargeTime > 0 && enemy.branderPulseCharge <= 0) {
          const pulseRadius = 136;
          const pulseDamage = 14;
          if (
            distanceToPlayer < pulseRadius + state.player.radius &&
            state.player.invulnerableTime <= 0
          ) {
            takePlayerDamage(pulseDamage, "hazard");
          }
          state.shake = Math.max(state.shake, 4);
          for (let index = 0; index < 9; index += 1) {
            const burstAngle = (Math.PI * 2 * index) / 9;
            state.projectiles.push({
              owner: "enemy",
              x: enemy.x,
              y: enemy.y,
              vx: Math.cos(burstAngle) * 214,
              vy: Math.sin(burstAngle) * 214,
              radius: 4.8,
              damage: 8,
              life: 1.25,
              color: "#ffe0ad",
            });
          }
          for (let index = 0; index < 10; index += 1) {
            state.particles.push(createParticle(enemy.x, enemy.y, "#ffd591", 0.95));
          }
        }
        if (enemy.branderPulseCharge > 0) {
          angle += enemy.orbitDirection * 0.18;
          speedMultiplier *= 0.34;
        } else if (distanceToPlayer < preferredRange * 0.74) {
          angle += Math.PI * 0.96 + Math.sin(enemy.wobble) * 0.14;
          speedMultiplier *= 1.08;
        } else if (distanceToPlayer <= preferredRange * 1.2) {
          angle += enemy.orbitDirection * 0.94 + Math.sin(enemy.wobble) * 0.18;
          speedMultiplier *= 0.88;
        } else {
          speedMultiplier *= 1.04;
        }
        if (enemy.branderPulseCooldown <= 0 && enemy.branderPulseCharge <= 0 && distanceToPlayer < 360) {
          enemy.branderPulseCharge = 0.82;
          enemy.branderPulseCooldown = 4.8;
          enemy.attackCooldown = Math.max(enemy.attackCooldown, 1.15);
        }
      } else if (enemy.type === "binder") {
        enemy.wobble += dt * 4.2;
        const previousCastTime = enemy.binderCastTime || 0;
        enemy.binderCastTime = Math.max(0, previousCastTime - dt);
        enemy.binderTetherTime = Math.max(0, (enemy.binderTetherTime || 0) - dt);
        enemy.binderPulseCooldown = Math.max(0, (enemy.binderPulseCooldown || 0) - dt);
        const distanceToPlayer = Math.hypot(state.player.x - enemy.x, state.player.y - enemy.y);
        const tetherActive = enemy.binderTetherTime > 0 && distanceToPlayer < 520;
        if (previousCastTime > 0 && enemy.binderCastTime <= 0 && distanceToPlayer < 440) {
          enemy.binderTetherTime = 2.8;
          enemy.binderPulseCooldown = 0.55;
          state.particles.push(createParticle(enemy.x, enemy.y, "#f6ffb5", 0.95));
          state.particles.push(createParticle(state.player.x, state.player.y, "#f6ffb5", 0.85));
        }
        const preferredRange = tetherActive ? 248 : 286;
        if (enemy.binderCastTime > 0) {
          angle += enemy.orbitDirection * 0.28;
          speedMultiplier *= 0.58;
        } else if (tetherActive) {
          if (distanceToPlayer < preferredRange * 0.82) {
            angle += Math.PI * 0.96;
            speedMultiplier *= 1.06;
          } else if (distanceToPlayer <= preferredRange * 1.18) {
            angle += enemy.orbitDirection * 1.22 + Math.sin(enemy.wobble) * 0.18;
            speedMultiplier *= 0.92;
          } else {
            speedMultiplier *= 1.14;
          }
        } else if (distanceToPlayer < preferredRange * 0.78) {
          angle += Math.PI * 0.92;
          speedMultiplier *= 1.12;
        } else if (distanceToPlayer <= preferredRange * 1.18) {
          angle += enemy.orbitDirection * 1.06 + Math.sin(enemy.wobble) * 0.24;
          speedMultiplier *= 0.96;
        } else {
          speedMultiplier *= 1.08;
        }
        if (
          enemy.attackCooldown <= 0 &&
          enemy.binderCastTime <= 0 &&
          enemy.binderTetherTime <= 0 &&
          distanceToPlayer < 430
        ) {
          enemy.binderCastTime = 0.68;
          enemy.attackCooldown = 4.1;
        }
      } else if (enemy.type === "lancer") {
        enemy.wobble += dt * 3.8;
        enemy.lancerChargeCooldown = Math.max(0, (enemy.lancerChargeCooldown || 0) - dt);
        enemy.lancerChargeTime = Math.max(0, (enemy.lancerChargeTime || 0) - dt);
        const distanceToPlayer = Math.hypot(state.player.x - enemy.x, state.player.y - enemy.y);
        if (enemy.lancerChargeTime > 0) {
          angle = Math.atan2(enemy.lancerChargeVector.y, enemy.lancerChargeVector.x);
          speedMultiplier *= 3.15;
        } else {
          const preferredRange = 220;
          if (distanceToPlayer < preferredRange * 0.72) {
            angle += Math.PI * 0.9;
            speedMultiplier *= 1.18;
          } else if (distanceToPlayer <= preferredRange * 1.18) {
            angle += enemy.orbitDirection * 1.1 + Math.sin(enemy.wobble) * 0.18;
            speedMultiplier *= 1.04;
          } else {
            speedMultiplier *= 1.2;
          }
          if (enemy.lancerChargeCooldown <= 0 && distanceToPlayer < 380) {
            enemy.lancerChargeCooldown = 4.4;
            enemy.lancerChargeTime = 0.56;
            enemy.lancerChargeVector = normalizeVector(
              state.player.x - enemy.x,
              state.player.y - enemy.y,
              1,
              0
            );
            angle = Math.atan2(enemy.lancerChargeVector.y, enemy.lancerChargeVector.x);
            speedMultiplier *= 2.2;
          }
        }
      } else if (enemy.type === "apex") {
        enemy.wobble += dt * 3.6;
        enemy.apexChargeCooldown = Math.max(0, (enemy.apexChargeCooldown || 0) - dt);
        enemy.apexChargeTime = Math.max(0, (enemy.apexChargeTime || 0) - dt);
        const distanceToPlayer = Math.hypot(state.player.x - enemy.x, state.player.y - enemy.y);
        if (enemy.apexChargeTime > 0) {
          angle = Math.atan2(enemy.apexChargeVector.y, enemy.apexChargeVector.x);
          speedMultiplier *= 2.7;
        } else {
          const preferredRange = 248;
          if (distanceToPlayer < preferredRange * 0.72) {
            angle += Math.PI * 0.92;
            speedMultiplier *= 1.24;
          } else if (distanceToPlayer <= preferredRange * 1.24) {
            angle += enemy.orbitDirection * 1.34 + Math.sin(enemy.wobble) * 0.18;
            speedMultiplier *= 1.08;
          } else {
            speedMultiplier *= 1.18;
          }
          if (enemy.apexChargeCooldown <= 0) {
            enemy.apexChargeCooldown = 4.2;
            enemy.apexChargeTime = 0.78;
            enemy.apexChargeVector = normalizeVector(
              state.player.x - enemy.x,
              state.player.y - enemy.y,
              1,
              0
            );
            angle = Math.atan2(enemy.apexChargeVector.y, enemy.apexChargeVector.x);
            speedMultiplier *= 2.2;
          }
        }
      } else if (enemy.type === "mortar") {
        enemy.wobble += dt * 2.4;
        const distanceToPlayer = Math.hypot(state.player.x - enemy.x, state.player.y - enemy.y);
        const preferredRange = 320;
        if (distanceToPlayer < preferredRange * 0.74) {
          angle += Math.PI + Math.sin(enemy.wobble) * 0.2;
          speedMultiplier *= 1.08;
        } else if (distanceToPlayer <= preferredRange * 1.12) {
          angle += enemy.orbitDirection * 0.84 + Math.sin(enemy.wobble) * 0.18;
          speedMultiplier *= 0.82;
        } else {
          speedMultiplier *= 0.94;
        }
      } else if (enemy.type === "warden") {
        enemy.wobble += dt * 2.6;
        const distanceToPlayer = Math.hypot(state.player.x - enemy.x, state.player.y - enemy.y);
        const preferredRange = 230;
        if (distanceToPlayer < preferredRange * 0.82) {
          angle += Math.PI;
        } else if (distanceToPlayer <= preferredRange * 1.18) {
          angle += enemy.orbitDirection * 1.08 + Math.sin(enemy.wobble) * 0.22;
          speedMultiplier *= 0.9;
        } else {
          speedMultiplier *= 1.05;
        }
      }

      const pactSpeedMultiplier =
        state.wave && state.wave.bastionPactDebt
          ? state.wave.bastionPactDebt.enemySpeedMultiplier || 1
          : 1;
      const speed = def.speed * (1 + state.waveIndex * 0.06) * speedMultiplier * pactSpeedMultiplier;
      enemy.x += Math.cos(angle) * speed * dt;
      enemy.y += Math.sin(angle) * speed * dt;
      enemy.contactCooldown = Math.max(0, enemy.contactCooldown - dt);
      enemy.attackCooldown = Math.max(0, enemy.attackCooldown - dt);

      const distance = Math.hypot(state.player.x - enemy.x, state.player.y - enemy.y);
      if ((enemy.type === "shrike" || enemy.type === "elite") && enemy.attackCooldown <= 0) {
        const projectileRange = enemy.type === "elite" ? 260 : 220;
        if (distance < projectileRange) {
          spawnEnemyShot(enemy, enemy.type === "elite");
          enemy.attackCooldown = enemy.type === "elite" ? 1.6 : 2.1;
        }
      } else if (enemy.type === "skimmer" && enemy.attackCooldown <= 0) {
        if (distance < 320) {
          spawnEnemyShot(enemy, {
            speed: 252,
            radius: 4.5,
            damage: 8,
            life: 2.4,
            color: "#baffeb",
            count: 2,
            spread: 0.12,
          });
          enemy.attackCooldown = 1.4;
        }
      } else if (enemy.type === "brander" && enemy.attackCooldown <= 0) {
        if (distance < 380 && enemy.branderPulseCharge <= 0) {
          spawnEnemyShot(enemy, {
            speed: 224,
            radius: 5.4,
            damage: 9,
            life: 2.9,
            color: "#ffe0ad",
            count: 3,
            spread: 0.22,
          });
          enemy.attackCooldown = 2.4;
        }
      } else if (enemy.type === "lancer" && enemy.attackCooldown <= 0) {
        if (distance < 340 && enemy.lancerChargeTime <= 0) {
          spawnEnemyShot(enemy, {
            speed: 276,
            radius: 5.5,
            damage: 10,
            life: 2.8,
            color: "#ffd3ae",
            count: 2,
            spread: 0.08,
          });
          enemy.attackCooldown = 2.05;
        }
      } else if (enemy.type === "binder" && enemy.attackCooldown <= 0) {
        if (distance < 360 && enemy.binderCastTime <= 0) {
          spawnEnemyShot(enemy, {
            speed: 236,
            radius: 5,
            damage: 9,
            life: 2.6,
            color: "#f1ffc8",
            count: 3,
            spread: 0.18,
          });
          enemy.attackCooldown = 2.8;
        }
      } else if (enemy.type === "apex" && enemy.attackCooldown <= 0) {
        if (distance < 430) {
          spawnEnemyShot(enemy, {
            speed: enemy.apexChargeTime > 0 ? 228 : 208,
            radius: enemy.apexChargeTime > 0 ? 7 : 6,
            damage: enemy.apexChargeTime > 0 ? 14 : 11,
            life: 3.1,
            color: "#ffbf72",
            count: enemy.apexChargeTime > 0 ? 5 : 3,
            spread: enemy.apexChargeTime > 0 ? 0.2 : 0.3,
          });
          enemy.attackCooldown = enemy.apexChargeTime > 0 ? 1.45 : 2.2;
        }
      } else if (enemy.type === "mortar" && enemy.attackCooldown <= 0) {
        if (distance < 460) {
          spawnEnemyShot(enemy, {
            speed: state.waveIndex >= 9 ? 182 : 170,
            radius: state.waveIndex >= 9 ? 9 : 8,
            damage: state.waveIndex >= 9 ? 11 : 9,
            life: 4.4,
            color: "#cfe6ff",
            count: state.waveIndex >= 9 ? 4 : 3,
            spread: state.waveIndex >= 9 ? 0.24 : 0.32,
          });
          enemy.attackCooldown = state.waveIndex >= 9 ? 2.55 : 2.9;
        }
      } else if (enemy.type === "warden" && enemy.attackCooldown <= 0) {
        if (distance < 360) {
          spawnEnemyShot(enemy, {
            speed: 228,
            radius: 5,
            damage: 9,
            life: 3.1,
            color: "#ff9aba",
            count: state.waveIndex >= 9 ? 5 : 3,
            spread: state.waveIndex >= 9 ? 0.16 : 0.28,
          });
          enemy.attackCooldown = state.waveIndex >= 9 ? 2.35 : 2.75;
        }
      }
      if (
        distance < enemy.radius + state.player.radius &&
        enemy.contactCooldown <= 0 &&
        state.player.invulnerableTime <= 0
      ) {
        takePlayerDamage(def.damage);
        enemy.contactCooldown = 0.42;
      }
    }
  }

  function takePlayerDamage(amount, source) {
    const pactAdjusted =
      state.wave && state.wave.bastionPactDebt
        ? amount * (state.wave.bastionPactDebt.damageTakenMultiplier || 1)
        : amount;
    const hazardMitigated =
      source === "hazard"
        ? pactAdjusted * (1 - state.player.hazardMitigation)
        : pactAdjusted;
    const chassisMitigation =
      getChassisBreakpointDef(state.build)?.id === "bulwark_treads" &&
      state.player.chassisAnchorActiveTime > 0
        ? 0.24
        : 0;
    let mitigated =
      hazardMitigated *
      (1 - (state.player.bastionDamageMitigation || 0)) *
      (1 - chassisMitigation);
    const lateFieldAegisLevel = getLateFieldAegisLevel(state.build);
    if (lateFieldAegisLevel > 0 && (state.player.fieldAegisCharge || 0) > 0) {
      state.player.fieldAegisCharge -= 1;
      state.player.fieldAegisCooldown = getLateFieldAegisCooldown(lateFieldAegisLevel);
      mitigated *= 1 - getLateFieldAegisReduction(lateFieldAegisLevel);
      triggerChassisPulse(state.player.x, state.player.y, 82 + lateFieldAegisLevel * 10, 10 + lateFieldAegisLevel * 4, "#8bf0ff", {
        hazardDamageFactor: 0.35,
        clearEnemyShots: true,
        shake: 3,
      });
      state.player.invulnerableTime = Math.max(state.player.invulnerableTime || 0, 0.5);
    }
    state.player.hp = Math.max(0, state.player.hp - mitigated);
    state.player.invulnerableTime = 0.36;
    state.shake = Math.max(state.shake, 8);
    for (let index = 0; index < 12; index += 1) {
      state.particles.push(createParticle(state.player.x, state.player.y, "#ff5a4d", 1.2));
    }
    if (state.player.hp <= 0) {
      finishRun(false);
    }
  }

  function updateProjectiles(dt) {
    const arena = getCurrentArenaSize();
    const nextProjectiles = [];

    for (const projectile of state.projectiles) {
      projectile.x += projectile.vx * dt;
      projectile.y += projectile.vy * dt;
      projectile.life -= dt;

      let bounced = false;
      if (projectile.x <= 0 || projectile.x >= arena.width) {
        if (projectile.bounce > 0) {
          projectile.vx *= -1;
          projectile.bounce -= 1;
          bounced = true;
        } else {
          projectile.life = 0;
        }
      }
      if (projectile.y <= 0 || projectile.y >= arena.height) {
        if (projectile.bounce > 0) {
          projectile.vy *= -1;
          projectile.bounce -= 1;
          bounced = true;
        } else {
          projectile.life = 0;
        }
      }
      if (bounced) {
        projectile.x = clamp(projectile.x, 4, arena.width - 4);
        projectile.y = clamp(projectile.y, 4, arena.height - 4);
        emitMirrorSplit(projectile);
      }

      let consumed = false;
      if (projectile.owner === "enemy") {
        const distance = Math.hypot(projectile.x - state.player.x, projectile.y - state.player.y);
        if (distance < projectile.radius + state.player.radius && state.player.invulnerableTime <= 0) {
          takePlayerDamage(projectile.damage, "shot");
          consumed = true;
        }
      } else {
        for (const enemy of state.enemies) {
          if (consumed) {
            break;
          }
          if (enemy.defeated) {
            continue;
          }
          const distance = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);
          if (distance < projectile.radius + enemy.radius) {
            enemy.hp -= projectile.damage;
            if (enemy.hp <= 0) {
              destroyEnemy(enemy);
            }
            emitMirrorReaveBursts(projectile, enemy);
            emitBulwarkFoundryBursts(projectile, enemy);
            emitStormspireNeedleBursts(projectile, enemy);
            emitStormRailBursts(projectile, enemy);
            const chained = tryChainProjectile(projectile, enemy);
            if (chained) {
              if (projectile.pierce > 0) {
                projectile.pierce -= 1;
              }
              break;
            }
            if (projectile.pierce > 0) {
              projectile.pierce -= 1;
            } else {
              consumed = true;
            }
          }
        }
        if (!consumed) {
          for (const hazard of state.hazards) {
            if (!isHazardCoreTarget(hazard)) {
              continue;
            }
            const distance = Math.hypot(projectile.x - hazard.x, projectile.y - hazard.y);
            if (distance < projectile.radius + hazard.coreRadius) {
              hazard.coreHp -= projectile.damage * getHazardCoreDamageMultiplier(hazard);
              emitRelaySeverBursts(projectile, hazard);
              state.particles.push(createParticle(projectile.x, projectile.y, "#ffd7a6", 0.7));
              if (projectile.pierce > 0) {
                projectile.pierce -= 1;
              } else {
                consumed = true;
              }
              break;
            }
          }
        }
      }

      if (projectile.owner === "player" && projectile.slagSeed && (consumed || projectile.life <= 0)) {
        detonateSlagSeed(projectile);
        consumed = true;
      }

      if (!consumed && projectile.life > 0) {
        nextProjectiles.push(projectile);
      }
    }

    state.projectiles = nextProjectiles;
    state.enemies = state.enemies.filter(
      (enemy) => enemy.hp > 0 && !enemy.defeated
    );
  }

  function tryChainProjectile(projectile, sourceEnemy) {
    if (!projectile || projectile.chain <= 0 || projectile.chainRange <= 0) {
      return false;
    }

    let target = null;
    let bestDistance = projectile.chainRange;
    for (const enemy of state.enemies) {
      if (enemy === sourceEnemy || enemy.defeated || enemy.hp <= 0) {
        continue;
      }
      const distance = Math.hypot(enemy.x - sourceEnemy.x, enemy.y - sourceEnemy.y);
      if (distance < bestDistance) {
        bestDistance = distance;
        target = enemy;
      }
    }

    if (!target) {
      return false;
    }

    const speed = Math.hypot(projectile.vx, projectile.vy) || 1;
    const dx = target.x - sourceEnemy.x;
    const dy = target.y - sourceEnemy.y;
    const magnitude = Math.hypot(dx, dy) || 1;
    projectile.x = sourceEnemy.x;
    projectile.y = sourceEnemy.y;
    projectile.vx = (dx / magnitude) * speed * 1.04;
    projectile.vy = (dy / magnitude) * speed * 1.04;
    projectile.chain -= 1;
    projectile.damage = round(projectile.damage * 0.84, 1);
    projectile.life = Math.max(projectile.life, 0.16);
    state.particles.push(createParticle(sourceEnemy.x, sourceEnemy.y, "#7dd0c5", 1));
    return true;
  }

  function destroyEnemy(enemy) {
    if (enemy.defeated || enemy.hp > 0) {
      return;
    }

    enemy.defeated = true;
    state.stats.kills += 1;
    gainDrive(
      enemy.type === "apex"
        ? 34
        : enemy.type === "elite"
        ? 24
        : enemy.type === "lancer"
          ? 13
        : enemy.type === "binder"
          ? 12
        : enemy.type === "skimmer"
          ? 9
        : enemy.type === "brute"
          ? 10
          : enemy.type === "mortar"
            ? 11
          : enemy.type === "warden"
            ? 12
            : 7
    );
    const def = ENEMY_DEFS[enemy.type];
    for (let index = 0; index < 8; index += 1) {
      state.particles.push(createParticle(enemy.x, enemy.y, def.particleColor, 1.1));
    }

    const scrapAmount = def.scrap;
    state.drops.push({
      kind: "scrap",
      x: enemy.x,
      y: enemy.y,
      value: scrapAmount,
      life: 10,
    });

    if (enemy.type === "apex") {
      const apexReward = applyApexPredatorMutation(state);
      if (state.wave && state.wave.apexPredator) {
        state.wave.apexPredator.defeated = true;
      }
      if (apexReward) {
        refreshDerivedStats(false);
        pushCombatFeed(
          apexReward.illegalMutationApplied
            ? `Cinder Maw 격추. ${getApexMutationTierLabel(apexReward.nextLevel)} body splice와 금지 무장 변이가 함께 잠겨 남은 웨이브를 다시 상승 곡선으로 밀어 올린다.`
            : `Cinder Maw 격추. ${getApexMutationTierLabel(apexReward.nextLevel)} body splice가 잠겨 주무장 보조 배럴과 돌진 차체가 즉시 열렸다.`,
          "APEX"
        );
        setBanner(`Predator Molt ${apexReward.nextLevel}`, 0.9);
      }
    }

    if (enemy.lateAscensionCarrier) {
      deployLateAscension(enemy);
    }

    if (enemy.type === "elite" || enemy.type === "apex") {
      const nextCore =
        DROPPABLE_CORE_IDS[Math.floor(Math.random() * DROPPABLE_CORE_IDS.length)];
      state.drops.push({
        kind: "core",
        x: enemy.x + 10,
        y: enemy.y - 10,
        coreId: nextCore,
        life: 12,
      });
      if (
        enemy.type !== "apex" &&
        state.waveIndex >= LATE_BREAK_ARMORY_WAVE - 1 &&
        buildCanEarnFinisherCatalyst(state.build) &&
        !state.drops.some(
          (drop) => drop.kind === "catalyst" && drop.coreId === state.build.coreId && drop.life > 0
        )
      ) {
        state.drops.push({
          kind: "catalyst",
          x: enemy.x - 12,
          y: enemy.y + 12,
          coreId: state.build.coreId,
          life: 12,
        });
        pushCombatFeed(
          `${FINISHER_RECIPE_DEFS[state.build.coreId].label} 촉매 노출. 회수하면 다음 포지에서 Act 3 변환 각인이 열린다.`,
          "CAT"
        );
      }
      if (enemy.type === "elite") {
        deployFinaleMutation(enemy);
        deployAfterburnOverdrive(enemy);
        deployAfterburnDominion(enemy);
        deployCombatCache(enemy);
        deployLateAscension(enemy);
        deployDoctrineLiveAscension(enemy);
        deployStormArtilleryAfterburnAscension(enemy);
      }
      if (enemy.overcommitTarget && state.overcommit.active) {
        state.overcommit.targetDefeated = true;
        state.overcommit.status = "salvage";
        for (let index = 0; index < state.overcommit.salvageRequired; index += 1) {
          const angle =
            (index / state.overcommit.salvageRequired) * Math.PI * 2 + Math.random() * 0.25;
          const distance = 28 + Math.random() * 34;
          state.drops.push({
            kind: "overcommit_salvage",
            x: enemy.x + Math.cos(angle) * distance,
            y: enemy.y + Math.sin(angle) * distance,
            value: 8,
            life: OVERCOMMIT_SALVAGE_LIFE,
          });
        }
        pushCombatFeed(
          "Contraband salvage 방출. 전부 회수하면 다음 Bastion Draft가 Forge Pursuit 계약으로 변한다.",
          "SALV"
        );
        setBanner("Salvage 회수", 0.8);
      } else if (enemy.doctrinePursuitTarget && state.doctrinePursuit.active) {
        const pursuit = getDoctrineForgePursuitDef(state.build);
        state.drops.push({
          kind: "doctrine_pursuit_shard",
          x: enemy.x,
          y: enemy.y,
          value: 10,
          life: OVERCOMMIT_SALVAGE_LIFE + 1.5,
        });
        pushCombatFeed(
          `${(pursuit && pursuit.shardLabel) || "frame shard"} 방출. 회수하면 forge pursuit가 전진한다.`,
          "FRAME"
        );
        setBanner((pursuit && pursuit.shortLabel) || "Frame Shard", 0.8);
      }
    }

    state.shake = Math.max(state.shake, enemy.type === "elite" || enemy.type === "apex" ? 10 : 4);
  }

  function updateDrops(dt) {
    const nextDrops = [];
    const chassis = getChassisBreakpointDef(state.build);
    const winchBurstActive =
      chassis &&
      chassis.id === "salvage_winch" &&
      state.player &&
      state.player.chassisSalvageBurstTime > 0;
    for (const drop of state.drops) {
      drop.life -= dt;
      const distance = Math.hypot(state.player.x - drop.x, state.player.y - drop.y);
      const pullRadius = winchBurstActive ? state.player.pickupRadius + 84 : state.player.pickupRadius;
      if (distance < pullRadius) {
        const pull = clamp((winchBurstActive ? 460 : 280) * dt, 0, distance || 0);
        if (distance > 0) {
          drop.x += ((state.player.x - drop.x) / distance) * pull;
          drop.y += ((state.player.y - drop.y) / distance) * pull;
        }
      }

      if (distance < state.player.radius + 10) {
        if (!collectDrop(drop) && drop.life > 0) {
          nextDrops.push(drop);
        }
      } else if (drop.life <= 0 && drop.kind === "overcommit_salvage") {
        failOvercommitTrial(
          "Contraband salvage가 식어 버렸다. 이번 런의 Forge Pursuit 계약 창구가 닫혔다."
        );
      } else if (drop.life <= 0 && drop.kind === "doctrine_pursuit_shard") {
        pushCombatFeed("Frame shard가 식었다. 이번 웨이브 pursuit 진전이 사라졌다.", "FRAME");
      } else if (drop.life <= 0 && drop.kind === "catalyst_crucible_cache") {
        if (state.catalystCrucible.active && !state.catalystCrucible.cacheCollected) {
          state.catalystCrucible.active = false;
          state.catalystCrucible.status = "failed";
          pushCombatFeed(
            "Catalyst splice cache가 식었다. 이번 웨이브 변이와 systems bet는 놓쳤고 촉매는 마지막 포지까지 남는다.",
            "MOLT"
          );
        }
      } else if (drop.life <= 0 && drop.kind === "late_ascension_cache") {
        if (state.wave && state.wave.lateAscension && !state.wave.lateAscension.claimed) {
          pushCombatFeed(
            "Ascension Core가 식었다. 이번 웨이브 변형은 놓쳤지만 다음 late wave에서 다시 찢어낼 수 있다.",
            "ASCEND"
          );
          state.wave.lateAscension.claimed = true;
        }
      } else if (drop.life <= 0 && drop.kind === "afterburn_ascension_cache") {
        if (state.wave && state.wave.doctrineAscension && !state.wave.doctrineAscension.claimed) {
          pushCombatFeed(
            "Live doctrine cache가 식었다. 이번 웨이브 ascension은 놓쳤지만 다음 late wave에서 다시 찢어낼 수 있다.",
            "ASCEND"
          );
          state.wave.doctrineAscension.claimed = true;
        } else if (
          state.wave &&
          state.wave.afterburnAscension &&
          !state.wave.afterburnAscension.claimed
        ) {
          pushCombatFeed(
            "Afterburn split이 닫혔다. 이번 웨이브의 endform 선택권은 사라졌지만 다음 afterburn에서 다시 찢어낼 수 있다.",
            "ASCEND"
          );
          state.wave.afterburnAscension.claimed = true;
        }
      } else if (drop.life <= 0 && drop.kind === "finale_mutation_cache") {
        if (state.wave && state.wave.finaleMutation && !state.wave.finaleMutation.claimed) {
          pushCombatFeed(
            "Act 4 mutation cache가 식었다. 이번 웨이브 splice는 놓쳤지만 다음 Afterburn escalation에서 다시 찢어낼 수 있다.",
            "LAST"
          );
          state.wave.finaleMutation.claimed = true;
        }
      } else if (drop.life <= 0 && drop.kind === "afterburn_overdrive_cache") {
        if (state.wave && state.wave.afterburnOverdrive && !state.wave.afterburnOverdrive.claimed) {
          pushCombatFeed(
            "Endform Overdrive가 식었다. 이번 웨이브 jump는 놓쳤지만 다음 Afterburn elite에서 다시 찢어낼 수 있다.",
            "OVR"
          );
          state.wave.afterburnOverdrive.claimed = true;
        }
      } else if (drop.life <= 0 && drop.kind === "afterburn_dominion_cache") {
        if (state.wave && state.wave.afterburnDominion && !state.wave.afterburnDominion.claimed) {
          pushCombatFeed(
            "Dominion Break가 식었다. 이번 지배 구간은 놓쳤지만 다음 Afterburn elite에서 다시 한 번만 뜯어낼 수 있다.",
            "DOM"
          );
          state.wave.afterburnDominion.claimed = true;
        }
      } else if (drop.life > 0) {
        nextDrops.push(drop);
      }
    }
    state.drops = nextDrops;
  }

  function collectDrop(drop) {
    const chassis = getChassisBreakpointDef(state.build);
    if (drop.kind === "scrap") {
      const value = round(drop.value * state.player.scrapMultiplier, 0);
      state.resources.scrap += value;
      state.stats.scrapCollected += value;
      gainDrive(value * 0.24);
      if (chassis && chassis.id === "salvage_winch") {
        triggerSalvageWinchSurge(1.35, 16);
      }
      setBanner(`고철 +${value}`, 0.45);
      return true;
    }

    if (drop.kind === "core") {
      const stored = addBenchCore(state.build, drop.coreId);
      if (stored) {
        state.stats.coresCollected += 1;
        refreshDerivedStats(false);
        pushCombatFeed(`${CORE_DEFS[drop.coreId].label} 확보. 보관 코어 선택지가 늘었다.`, "CORE");
        setBanner(
          `${CORE_DEFS[drop.coreId].short} 보관 x${getBenchCount(
            state.build,
            drop.coreId
          )}`,
          0.8
        );
      } else {
        state.resources.scrap += CORE_OVERFLOW_SCRAP;
        state.stats.scrapCollected += CORE_OVERFLOW_SCRAP;
        gainDrive(CORE_OVERFLOW_SCRAP * 0.24);
        setBanner(`${CORE_DEFS[drop.coreId].short} 초과분 분해 +${CORE_OVERFLOW_SCRAP}`, 0.8);
      }
      if (chassis && chassis.id === "salvage_winch") {
        triggerSalvageWinchSurge(1.6, 0);
      }
      return true;
    }

    if (drop.kind === "catalyst") {
      if (!hasFinisherCatalyst(state.build, drop.coreId)) {
        state.build.finisherCatalysts = sanitizeCatalystCoreIds(
          (state.build.finisherCatalysts || []).concat(drop.coreId)
        );
        pushCombatFeed(
          `${FINISHER_RECIPE_DEFS[drop.coreId].label} 촉매 확보. 마지막 완성 단계가 해금되었다.`,
          "CAT"
        );
        setBanner(`${CORE_DEFS[drop.coreId].short} 촉매 확보`, 0.9);
      }
      if (chassis && chassis.id === "salvage_winch") {
        triggerSalvageWinchSurge(1.6, 0);
      }
      return true;
    }

    if (drop.kind === "catalyst_crucible_cache") {
      const choice = drop.choice;
      if (!choice || state.build.catalystCapstoneId) {
        return true;
      }
      applyForgeChoice(state, choice);
      refreshDerivedStats(false);
      if (state.catalystCrucible) {
        state.catalystCrucible.active = false;
        state.catalystCrucible.status = "claimed";
        state.catalystCrucible.cacheCollected = true;
      }
      state.drops.forEach((entry) => {
        if (entry.kind === "catalyst_crucible_cache" && entry.groupId === drop.groupId) {
          entry.life = 0;
        }
      });
      pushCombatFeed(
        `${choice.title} 접합. ${
          choice.mutationChoice ? choice.mutationChoice.title : "촉매 변이"
        }와 ${
          choice.systemsBetChoice ? choice.systemsBetChoice.title : "systems bet"
        }가 함께 잠겨 남은 Act 3를 이 방향으로만 밀어붙이게 된다.`,
        "MOLT"
      );
      setBanner(choice.title, 0.85);
      if (chassis && chassis.id === "salvage_winch") {
        triggerSalvageWinchSurge(1.65, 0);
      }
      return true;
    }

    if (drop.kind === "overcommit_salvage") {
      const value = round(drop.value * state.player.scrapMultiplier, 0);
      state.resources.scrap += value;
      state.stats.scrapCollected += value;
      state.overcommit.salvageCollected += 1;
      gainDrive(value * 0.3);
      if (chassis && chassis.id === "salvage_winch") {
        triggerSalvageWinchSurge(1.45, 18);
      }
      setBanner(
        `Contraband ${state.overcommit.salvageCollected}/${state.overcommit.salvageRequired}`,
        0.55
      );
      if (state.overcommit.salvageCollected >= state.overcommit.salvageRequired) {
        unlockOvercommitTrial();
      }
      return true;
    }

    if (drop.kind === "doctrine_pursuit_shard") {
      const value = round(drop.value * state.player.scrapMultiplier, 0);
      const pursuit = getDoctrineForgePursuitDef(state.build);
      state.resources.scrap += value;
      state.stats.scrapCollected += value;
      state.build.doctrinePursuitProgress += 1;
      gainDrive(value * 0.34);
      if (chassis && chassis.id === "salvage_winch") {
        triggerSalvageWinchSurge(1.45, 18);
      }
      setBanner(
        `${(pursuit && pursuit.shortLabel) || "Frame"} ${state.build.doctrinePursuitProgress}/${(pursuit && pursuit.goal) || 2}`,
        0.65
      );
      if (state.build.doctrinePursuitProgress >= ((pursuit && pursuit.goal) || 2)) {
        completeDoctrinePursuit();
      }
      return true;
    }

    if (drop.kind === "combat_cache") {
      const combatCache = state.wave && state.wave.combatCache;
      const choice = drop.choice;
      if (!combatCache || combatCache.claimed || !choice) {
        return true;
      }
      if (state.resources.scrap < choice.cost) {
        setBanner(`고철 ${choice.cost} 필요`, 0.45);
        return false;
      }
      if (choice.cost > 0) {
        state.resources.scrap -= choice.cost;
        state.stats.scrapSpent += choice.cost;
      }
      applyForgeChoice(state, choice);
      refreshDerivedStats(false);
      combatCache.claimed = true;
      state.drops.forEach((entry) => {
        if (entry.kind === "combat_cache" && entry.groupId === drop.groupId) {
          entry.life = 0;
        }
      });
      const grantLabel = choice.forgeLaneLabel || choice.laneLabel || choice.tag || "CACHE";
      const compactActBreak = combatCache.variant === "act_break_cache";
      const nextWave = state.waveIndex + 2;
      const arsenalBreakpointProfile = getArsenalBreakpointEncounterProfile(state.build, nextWave);
      pushCombatFeed(
        compactActBreak
          ? choice.type === "fallback"
            ? `${grantLabel} 현장 회수. 초반 armory 정지 대신 상태만 정리하고 Wave 5를 바로 연다.`
            : `${grantLabel} 현장 회수. ${choice.title}${choice.cost > 0 ? `(${choice.cost})` : ""}을(를) 전장 한복판에서 잠그고 Act Break Armory를 생략한 채 Wave 5 압박으로 곧장 이어 간다.`
          : choice.type === "fallback"
            ? `${grantLabel} 현장 회수. 상태만 정리하고 Field Cache 정지 없이 다음 웨이브로 밀어붙인다.`
            : arsenalBreakpointProfile
              ? `${grantLabel} 현장 회수. ${choice.title}${choice.cost > 0 ? `(${choice.cost})` : ""}을(를) 전장 한복판에서 잠그고 다음 Arsenal Breakpoint를 ${arsenalBreakpointProfile.bandLabel} 규칙으로 바로 꺾는다.`
              : `${grantLabel} 현장 회수. ${choice.title}${choice.cost > 0 ? `(${choice.cost})` : ""}을(를) 전장 한복판에서 잠그고 다음 웨이브까지 압박을 이어 간다.`,
        "CACHE"
      );
      setBanner(compactActBreak ? `Act Break · ${choice.tag}` : `${choice.tag} 확보`, 0.8);
      return true;
    }

    if (drop.kind === "late_ascension_cache") {
      const ascension = state.wave && state.wave.lateAscension;
      const choice = drop.choice;
      if (!ascension || ascension.claimed || !choice || state.build.lateAscensionId) {
        return true;
      }
      applyForgeChoice(state, choice);
      refreshDerivedStats(false);
      ascension.claimed = true;
      state.drops.forEach((entry) => {
        if (entry.kind === "late_ascension_cache" && entry.groupId === drop.groupId) {
          entry.life = 0;
        }
      });
      pushCombatFeed(
        `${choice.title} 접합. ${choice.bodyLabel || "새 차체"}가 함께 잠겨 ${choice.bodyText || "남은 late waves가 새 weapon/body rule로 고정된다."}`,
        "ASCEND"
      );
      setBanner(choice.title, 0.9);
      return true;
    }

    if (drop.kind === "afterburn_ascension_cache") {
      const ascension = state.wave && state.wave.afterburnAscension;
      const doctrineAscension = state.wave && state.wave.doctrineAscension;
      const choice = drop.choice;
      if (
        !choice ||
        state.build.doctrineCapstoneId ||
        ((ascension && ascension.claimed) || (doctrineAscension && doctrineAscension.claimed))
      ) {
        return true;
      }
      applyForgeChoice(state, choice);
      refreshDerivedStats(false);
      if (ascension) {
        ascension.claimed = true;
      }
      if (doctrineAscension) {
        doctrineAscension.claimed = true;
      }
      state.drops.forEach((entry) => {
        if (entry.kind === "afterburn_ascension_cache" && entry.groupId === drop.groupId) {
          entry.life = 0;
        }
      });
      pushCombatFeed(
        state.wave && state.wave.doctrineAscension
          ? `${choice.title} 접합. ${choice.bodyLabel || "차체 변형"}가 함께 잠겨 ${choice.bodyText || "남은 late waves가 이 교리 body plan으로 고정된다."}`
          : `${choice.title} 접합. ${choice.bodyLabel || "차체 변형"}가 함께 잠겨 ${
              getStormArtilleryAfterburnEndform(choice.doctrineCapstoneId)?.statusNote ||
              "남은 afterburn이 새 body plan으로 고정된다."
            }`,
        "ASCEND"
      );
      setBanner(choice.title, 0.9);
      return true;
    }

    if (drop.kind === "finale_mutation_cache") {
      const finaleMutation = state.wave && state.wave.finaleMutation;
      const choice = drop.choice;
      if (!finaleMutation || finaleMutation.claimed || !choice || getSelectedFinaleVariant(state.build)) {
        return true;
      }
      applyForgeChoice(state, choice);
      refreshDerivedStats(false);
      finaleMutation.claimed = true;
      state.drops.forEach((entry) => {
        if (entry.kind === "finale_mutation_cache" && entry.groupId === drop.groupId) {
          entry.life = 0;
        }
      });
      pushCombatFeed(
        `${choice.title} 접합. 마지막 포지 없이 전장 한복판에서 splice를 잠가 남은 Afterburn bracket을 이 형태로 다시 비튼다.`,
        "LAST"
      );
      setBanner(choice.title, 0.9);
      return true;
    }

    if (drop.kind === "afterburn_overdrive_cache") {
      const overdrive = state.wave && state.wave.afterburnOverdrive;
      const choice = drop.choice;
      if (!overdrive || overdrive.claimed || !choice || state.build.afterburnOverdriveId) {
        return true;
      }
      applyForgeChoice(state, choice);
      refreshDerivedStats(false);
      overdrive.claimed = true;
      state.drops.forEach((entry) => {
        if (entry.kind === "afterburn_overdrive_cache" && entry.groupId === drop.groupId) {
          entry.life = 0;
        }
      });
      pushCombatFeed(
        `${choice.title} 접합. ${choice.bodyLabel || "새 endform"}가 함께 잠겨 남은 Afterburn 전체가 이 overdrive silhouette 위에서 다시 가속된다.`,
        "OVR"
      );
      setBanner(choice.title, 0.9);
      return true;
    }

    if (drop.kind === "afterburn_dominion_cache") {
      const dominion = state.wave && state.wave.afterburnDominion;
      const choice = drop.choice;
      if (!dominion || dominion.claimed || !choice || state.build.afterburnDominionId) {
        return true;
      }
      applyForgeChoice(state, choice);
      refreshDerivedStats(false);
      dominion.claimed = true;
      state.drops.forEach((entry) => {
        if (entry.kind === "afterburn_dominion_cache" && entry.groupId === drop.groupId) {
          entry.life = 0;
        }
      });
      pushCombatFeed(
        `${choice.title} 접합. ${choice.bodyLabel || "새 지배 차체"}가 잠겨 다음 bracket 하나가 objective clutter 없이 이 endform을 과시하는 Dominion Run으로 바뀐다.`,
        "DOM"
      );
      setBanner(choice.title, 0.95);
      return true;
    }

    if (drop.kind === "illegal_overclock_cache") {
      const choice = drop.choice;
      if (
        !choice ||
        (choice.action === "illegal_overclock" && state.build.illegalOverclockId) ||
        (choice.action === "illegal_overclock_mutation" &&
          getIllegalOverclockMutationLevel(state.build) >= (choice.mutationLevel || 0))
      ) {
        return true;
      }
      applyForgeChoice(state, choice);
      refreshDerivedStats(false);
      state.drops.forEach((entry) => {
        if (entry.kind === "illegal_overclock_cache" && entry.groupId === drop.groupId) {
          entry.life = 0;
        }
      });
      const overclock = getIllegalOverclockDef(state.build);
      pushCombatFeed(
        choice.action === "illegal_overclock_mutation"
          ? `${choice.title} 접합. ${(overclock && overclock.statusNote) || "금지 변이가 무장을 더 넓히는 대신 몸체를 더 거칠게 찢는다."}`
          : `${(overclock && overclock.label) || choice.title} 접속. ${(overclock && overclock.statusNote) || "불법 과투입이 남은 런 전체를 덮는다."}`,
        "ILLEGAL"
      );
      setBanner(
        choice.action === "illegal_overclock_mutation"
          ? choice.tag || "MOLT"
          : (overclock && overclock.label) || "ILLEGAL",
        0.8
      );
      return true;
    }

    return false;
  }

  function updateParticles(dt) {
    state.particles = state.particles.filter((particle) => {
      particle.x += particle.vx * dt;
      particle.y += particle.vy * dt;
      particle.vx *= 0.94;
      particle.vy *= 0.94;
      particle.life -= dt;
      return particle.life > 0;
    });
    state.shake = Math.max(0, state.shake - dt * 18);
  }

  function maybeAdvancePhase(dt) {
    if (state.phase !== "wave" || !state.wave) {
      return;
    }
    if (state.wave.spawned >= state.wave.spawnBudget && state.enemies.length === 0) {
      if (!state.wave.awaitingForge) {
        if (
          state.overcommit.active &&
          !state.build.overcommitUnlocked &&
          !state.build.overcommitResolved
        ) {
          failOvercommitTrial(
            state.overcommit.targetDefeated
              ? "남은 salvage를 다 못 주웠다. 조기 Frame 추격은 이번 런에서 봉인된다."
              : "Marked elite를 놓쳤다. 조기 Frame 추격은 이번 런에서 봉인된다."
          );
        }
        state.wave.awaitingForge = true;
        state.wave.cleanupPhase = true;
        state.waveClearTimer = POST_WAVE_LOOT_GRACE;
        state.hazards = [];
        state.stats.wavesCleared = state.waveIndex + 1;
        const nextWave = state.waveIndex + 2;
        const enteringAfterburn =
          !CONSOLIDATED_12_WAVE_ROUTE && state.waveIndex >= MAX_WAVES - 1;
        const nextBaseRouteForgeStage = getBaseRouteForgeStage(state, nextWave);
        const nextPhaseLabel = state.wave.completesRun
          ? "결과 패널"
          : CONSOLIDATED_12_WAVE_ROUTE
            ? shouldUseCompactActBreakCache({ nextWave, finalForge: false }) ||
              state.wave.skipForgeOnClear ||
              shouldRunCatalystCrucibleObjective(state.build, nextWave) ||
              shouldRunDoctrineLiveAscension(state.build, nextWave) ||
              shouldSkipOwnershipAdminStop(state.build, nextWave) ||
              shouldUseFieldGrant({ nextWave, finalForge: false })
              ? nextBaseRouteForgeStage.label
              : "포지 브레이크"
            : enteringAfterburn
              ? "Act 4 · Afterburn"
              : shouldUseCompactActBreakCache({ nextWave, finalForge: false })
                ? `Wave ${nextWave}`
                : state.wave.skipForgeOnClear
                  ? `Wave ${nextWave}`
                  : shouldRunCatalystCrucibleObjective(state.build, nextWave)
                    ? `Wave ${nextWave}`
                    : shouldRunDoctrineLiveAscension(state.build, nextWave)
                      ? `Wave ${nextWave}`
                      : shouldSkipOwnershipAdminStop(state.build, nextWave)
                        ? `Wave ${nextWave}`
                        : shouldRunActBreakArmory({ nextWave, finalForge: false })
                          ? getArmoryLabel({ nextWave })
                          : shouldRunBastionDraft({ nextWave, finalForge: false })
                            ? "Bastion Draft"
                            : shouldRunArchitectureDraft({ nextWave, finalForge: false })
                              ? "Architecture Draft"
                              : shouldUseFieldGrant({ nextWave, finalForge: false })
                                ? "다음 웨이브"
                                : "포지";
        setBanner("전장 정리", 0.9);
        pushCombatFeed(
          CONSOLIDATED_12_WAVE_ROUTE
            ? state.wave.completesRun
              ? "적 반응 정지. 남은 고철을 회수하면 이번 12-wave 계약의 결과가 열린다."
              : `적 반응 정지. 남은 고철을 회수하면 ${nextPhaseLabel} 하나만 거친 뒤 바로 다음 증명으로 이어진다.`
            : `적 반응 정지. 남은 고철을 회수한 뒤 ${nextPhaseLabel}로 이어진다.`,
          "CLEAR"
        );
        return;
      }

      state.waveClearTimer = Math.max(0, state.waveClearTimer - dt);
      if (state.waveClearTimer <= 0) {
        if (state.wave.completesRun) {
          finishRun(true);
        } else if (state.waveIndex >= MAX_WAVES - 1) {
          beginFinalCashout();
        } else if (shouldUseCompactActBreakCache({ nextWave: state.waveIndex + 2, finalForge: false })) {
          beginWave(state.waveIndex + 1);
        } else if (state.wave.skipForgeOnClear) {
          beginNextPostCapstoneWave();
        } else if (shouldRunCatalystCrucibleObjective(state.build, state.waveIndex + 2)) {
          beginWave(state.waveIndex + 1);
        } else if (shouldRunDoctrineLiveAscension(state.build, state.waveIndex + 2)) {
          const doctrine = getBastionDoctrineDef(state.build);
          const liveCapstones = createDoctrineLiveAscensionChoices(state.build);
          const liveLabel =
            liveCapstones.length > 1
              ? `${liveCapstones.map((choice) => choice.title).join(" / ")} split`
              : liveCapstones[0]
                ? liveCapstones[0].title
                : doctrine
                  ? doctrine.label
                  : "Live Ascension";
          const unlocked = unlockLateSupportBay(state.build);
          if (unlocked) {
            state.build.upgrades.push("Live Ascension Uplink: support bay +1 without armory stop");
          }
          pushCombatFeed(
            unlocked
              ? CONSOLIDATED_12_WAVE_ROUTE
                ? `${liveLabel} 잠금 완료. 이번 정지 없이 Late Form이 즉시 연결되고, 다음 웨이브 marked elite가 남은 body splice를 떨어뜨린다.`
                : state.build.auxiliaryJunctionLevel > 0
                  ? `Wave 8 돌파. Late Break Armory를 ${liveLabel} live ascension lane으로 교체했다. 네 번째 support bay와 추가 flex lane은 즉시 uplink되고, Wave 9 marked elite가 doctrine cache를 떨어뜨린다.`
                  : `Wave 8 돌파. Late Break Armory를 ${liveLabel} live ascension lane으로 교체했다. 세 번째 support bay와 교리 우회 flex lane은 즉시 uplink되고, Wave 9 marked elite가 doctrine cache를 떨어뜨린다.`
              : CONSOLIDATED_12_WAVE_ROUTE
                ? `${liveLabel} 추격 개시. Late Form 정지 없이 Wave 9로 밀어붙이고, marked elite를 잘라 body splice를 직접 회수해야 한다.`
                : `Wave 8 돌파. Late Break Armory를 건너뛰고 ${liveLabel} live ascension lane으로 진입한다. Wave 9 marked elite를 추적해 doctrine cache를 직접 회수해야 한다.`,
            "ASCEND"
          );
          refreshDerivedStats(false);
          beginWave(state.waveIndex + 1);
        } else if (shouldSkipOwnershipAdminStop(state.build, state.waveIndex + 2)) {
          const unlocked = unlockLateSupportBay(state.build);
          if (unlocked) {
            state.build.upgrades.push("Ownership Relay: Wave 8 bay uplink without armory stop");
          }
          pushCombatFeed(
            unlocked
              ? CONSOLIDATED_12_WAVE_ROUTE
                ? "Late Form uplink 완료. 추가 support bay가 즉시 연결됐고, 정지 없이 Wave 9 payoff 구간으로 바로 진입한다."
                : state.build.auxiliaryJunctionLevel > 0
                  ? "Wave 8 돌파. Ownership Relay가 네 번째 support bay와 두 번째 교리 우회 flex lane을 전장 정지 없이 연결한다. Late Break Armory는 건너뛰고 Wave 9로 바로 진입한다."
                  : "Wave 8 돌파. Ownership Relay가 세 번째 support bay와 교리 우회 flex lane을 전장 정지 없이 연결한다. Late Break Armory는 건너뛰고 Wave 9로 바로 진입한다."
              : CONSOLIDATED_12_WAVE_ROUTE
                ? "Late Form 정지를 생략하고 Wave 9 payoff 구간으로 바로 진입한다."
                : "Wave 8 돌파. Late Break Armory를 생략하고 ownership bracket을 유지한 채 Wave 9로 바로 진입한다.",
            "ARMORY"
          );
          refreshDerivedStats(false);
          beginWave(state.waveIndex + 1);
        } else if (shouldRunArchitectureDraft({ nextWave: state.waveIndex + 2, finalForge: false })) {
          enterArchitectureDraft();
        } else if (shouldRunBastionDraft({ nextWave: state.waveIndex + 2, finalForge: false })) {
          enterBastionDraft();
        } else if (shouldUseFieldGrant({ nextWave: state.waveIndex + 2, finalForge: false })) {
          beginWave(state.waveIndex + 1);
        } else {
          enterForge();
        }
      }
    }
  }

  function updateHUD() {
    if (!state.player) {
      return;
    }
    const waveConfig = state.wave || resolveWaveConfig(state.waveIndex, state.build);
    const activeForgeLabel = state.phase === "forge" ? getForgeDisplayModeLabel() : "";
    const baseRouteForgeActive = shouldUseBaseRouteForgeContract();
    const minimalBaseRouteHud = shouldUseMinimalBaseRouteHud(state);
    const baseRouteForgeStage = baseRouteForgeActive
      ? getBaseRouteForgeStage(state, state.waveIndex + 2)
      : null;
    const waveLabel =
      state.phase === "forge"
        ? `${waveConfig.label} · ${baseRouteForgeActive ? getBaseRouteForgeBannerLabel(state) : activeForgeLabel}`
        : waveConfig.label;
    const hpRatio = state.player.maxHp > 0 ? state.player.hp / state.player.maxHp : 0;
    const heatRatio = state.player.heat / 100;
    const driveRatio =
      state.player.overdriveActiveTime > 0
        ? state.player.overdriveActiveTime / Math.max(0.1, state.player.overdriveDuration)
        : state.player.drive / 100;
    const hazardStatus = describeHazardState(state);

    elements.waveLabel.textContent = waveLabel;
    elements.hpStat.textContent = `${Math.ceil(state.player.hp)} / ${state.player.maxHp}`;
    elements.heatStat.textContent = `${Math.round(state.player.heat)}%`;
    elements.dashStat.textContent = `${state.player.dashCharges} / ${state.player.dashMax}`;
    elements.driveStat.textContent =
      state.player.overdriveActiveTime > 0
        ? `${state.player.overdriveActiveTime.toFixed(1)}s`
        : `${Math.round(state.player.drive)}%`;
    elements.timerStat.textContent = state.wave
      ? `${state.wave.timeLeft.toFixed(1)}s`
      : "--";
    elements.scrapStat.textContent = String(Math.round(state.resources.scrap));
    setFill(elements.hpFill, hpRatio);
    setFill(elements.heatFill, heatRatio);
    setFill(elements.driveFill, driveRatio);
    setTone(
      elements.hpMeter,
      hpRatio <= 0.28 ? "critical" : hpRatio <= 0.55 ? "warning" : "stable"
    );
    setTone(
      elements.heatMeter,
      state.player.overheated || heatRatio >= 0.9
        ? "critical"
        : heatRatio >= 0.65
          ? "warning"
          : "stable"
    );
    setTone(
      elements.driveMeter,
      state.player.overdriveActiveTime > 0
        ? "active"
        : state.player.drive >= 100
          ? "ready"
          : "stable"
    );
    setTone(
      elements.dashStat.parentElement,
      state.player.dashCharges === 0 ? "warning" : "stable"
    );
    setTone(
      elements.timerStat.parentElement,
      state.wave && state.wave.timeLeft <= 12 ? "warning" : "stable"
    );
    setTone(
      elements.scrapStat.parentElement,
      state.resources.scrap >= 40 ? "ready" : "stable"
    );

    const activeCore = CORE_DEFS[state.build.coreId];
    const weapon = state.weapon;
    const dominantForm = getDominantFormSummary(state.build, weapon, state.waveIndex + 1);
    const nextBreakpoint = getNextBreakpointSummary(state.build, weapon, state.waveIndex + 1);
    const proofWindow = getImmediateProofWindowSummary(state.build, state.waveIndex + 1);
    const supportTrack = getForgeSupportTrackSnapshot(state.build, state.supportSystem);
    const ladderFocus = getShippingLadderFocus(state.build, weapon, state.waveIndex + 1);
    const headlineLabel = getPresentationHeadlineLabel(weapon, state.waveIndex + 1);
    if (elements.activeCore) {
      elements.activeCore.innerHTML = `
        <div class="summary-head">
          <div>
            <p class="forge-card__tag">${activeCore.tag}</p>
            <h3>${dominantForm.label}</h3>
          </div>
          <span class="summary-chip ${
            weapon.benchSyncLevel > 0 ? "summary-chip--hot" : ""
          }">${weapon.tierLabel}</span>
        </div>
        ${
          minimalBaseRouteHud
            ? `<div class="status-list">${createStatusRow("Current Form", dominantForm.label)}${createStatusRow("Next Proof", proofWindow.label)}</div><p class="summary-note">${dominantForm.label} 실루엣을 전면에 두고 ${proofWindow.label} 하나만 먼저 본다.</p>`
            : `<div class="mini-pill-row">${
                baseRouteForgeActive
                  ? createMiniPill("Current Form", dominantForm.label, "hot") +
                    createMiniPill("Next Proof", proofWindow.label, "cool")
                  : createMiniPill(getHeadlineFormTierLabel(getHeadlineFormTier(state.build)), headlineLabel, "hot") +
                    createMiniPill("Rider", supportTrack.label, "cool")
              }</div>
              <p class="summary-note">${
                baseRouteForgeActive
                  ? `${ladderFocus.title}. ${dominantForm.label}를 전면에 두고 ${proofWindow.label}만 먼저 본다.`
                  : `${nextBreakpoint.label}이 다음 monster-form jump다. ${supportTrack.label}는 rider로만 짧게 남기고, ${proofWindow.label}에서 바로 space ownership를 증명한다.`
              }</p>`
        }
      `;
    }

    const benchEntries = getBenchEntries(state.build);
    if (elements.pendingCores) {
      elements.pendingCores.classList.toggle("hidden", minimalBaseRouteHud);
      elements.pendingCores.innerHTML = benchEntries.length
        ? benchEntries
            .map(
              (entry) => `
                <span class="chip ${entry.coreId === state.build.coreId ? "chip--active" : ""}">
                  <strong>${CORE_DEFS[entry.coreId].short}</strong>
                  <span class="chip__count">x${entry.copies}</span>
                  <span class="chip__sync">${formatSyncLabel(entry.syncLevel)}</span>
                </span>
              `
            )
            .join("")
        : `<span class="chip">없음</span>`;
    }

    if (elements.upgradeList) {
      elements.upgradeList.classList.toggle("hidden", minimalBaseRouteHud);
      elements.upgradeList.innerHTML = state.build.upgrades.length
        ? state.build.upgrades
            .slice(-4)
            .map((upgrade) => `<li>${upgrade}</li>`)
            .join("")
        : `<li>아직 포지 보강이 없다.</li>`;
    }

    if (elements.buildRoadmap) {
      elements.buildRoadmap.classList.toggle("roadmap-card--contract", minimalBaseRouteHud);
      elements.buildRoadmap.innerHTML = minimalBaseRouteHud
        ? createBaseRouteFocusMarkup({
            eyebrow: "12-Wave Contract",
            chipLabel: ladderFocus.label,
            title: dominantForm.label,
            prompt:
              state.phase === "forge"
                ? `${baseRouteForgeStage ? baseRouteForgeStage.label : "Forge Break"}에서는 main leap 하나를 먼저 잠그고 바로 다음 증명으로 복귀한다.`
                : `${ladderFocus.title} 구간이다. 지금은 현재 실루엣으로 전장을 점유하고 다음 관문만 본다.`,
            currentFormLabel: dominantForm.label,
            mainLeapLabel: nextBreakpoint.label,
            proofLabel: proofWindow.label,
            supportLabel: supportTrack.label,
            note: `${supportTrack.label}는 보조선에만 남기고, 이번 읽기는 ${proofWindow.label} 하나에 묶는다.`,
            compact: true,
          })
        : createHeadlineRiderFocusMarkup(
            state.build,
            state.weapon,
            state.supportSystem,
            state.waveIndex + 1
          );
    }

    const enemiesLeft = Math.max(0, state.wave ? state.wave.spawnBudget - state.wave.spawned : 0);
    if (elements.waveObjective) {
      const combatBand = getCombatBandState(state.build, state.weapon, state.waveIndex + 1);
      const objectiveNote = hazardStatus.note || (combatBand ? combatBand.detail : nextBreakpoint.detail);
      elements.waveObjective.innerHTML = `
        <div class="summary-head">
          <strong>${waveConfig.label}</strong>
          <span class="summary-chip ${hazardStatus.tone}">
            ${hazardStatus.chipLabel}
          </span>
        </div>
        <div class="status-list">
          ${createStatusRow("Immediate Threat", `${hazardStatus.detailLabel} ${hazardStatus.detailValue}`)}
          ${createStatusRow(baseRouteForgeActive ? "Next Proof" : "Combat Ask", combatBand ? combatBand.label : proofWindow.label)}
        </div>
        <p class="summary-note">${
          minimalBaseRouteHud
            ? `${proofWindow.label} 하나만 보면 된다. ${objectiveNote}`
            : baseRouteForgeActive
              ? `${baseRouteForgeStage ? baseRouteForgeStage.label : "Forge Break"} 이후 곧바로 ${proofWindow.label}를 증명한다. ${combatBand ? `${combatBand.headline}. ` : ""}${objectiveNote}`
              : `${nextBreakpoint.label} + ${supportTrack.label}. ${combatBand ? `${combatBand.headline}. ` : ""}${objectiveNote}`
        }</p>
      `;
    }

    if (elements.liveReadout) {
      elements.liveReadout.classList.toggle("hidden", minimalBaseRouteHud);
      const forgeReadoutLabel = shouldUseBaseRouteForgeContract()
        ? `${getBaseRouteForgeStage(state, state.waveIndex + 2).label} 선택 중`
        : state.forgeDraftType === "architecture_draft"
          ? "Architecture Draft 선택 중"
          : state.forgeDraftType === "field_grant"
            ? "Field Cache 선택 중"
            : state.forgeDraftType === "bastion_draft"
              ? "Bastion Draft 선택 중"
              : state.forgeDraftType === "catalyst_draft"
                ? "Catalyst Crucible 선택 중"
                : state.forgeMaxSteps > 1 && state.forgeStep === 2
                  ? "세 갈래 포지 rider 선택 중"
                  : "세 갈래 포지 headline 선택 중";
      elements.liveReadout.innerHTML = `
        <div class="summary-head">
          <strong>${
            state.phase === "forge" ? forgeReadoutLabel : "전투 진행 중"
          }</strong>
          <span class="summary-chip ${
            state.player.overdriveActiveTime > 0 || state.player.drive >= 100
              ? "summary-chip--cool"
              : ""
          }">${
            state.player.overdriveActiveTime > 0
              ? "Drive Live"
              : state.player.drive >= 100
                ? "Drive Ready"
                : "Drive Charge"
          }</span>
        </div>
        <div class="status-list">
          ${createStatusRow("처치", String(state.stats.kills))}
          ${createStatusRow("코어 수집", String(state.stats.coresCollected))}
          ${createStatusRow("쓴 고철", String(Math.round(state.stats.scrapSpent)))}
          ${createStatusRow(hazardStatus.detailLabel, hazardStatus.detailValue)}
          ${createStatusRow("벤트", "Q / 24 Drive")}
        </div>
        <p class="summary-note ${
          state.player.overheated ? "summary-note--danger" : ""
        }">${
          state.player.overheated
            ? "사격 정지: 열을 비워야 한다."
            : `${dominantForm.detail} ${hazardStatus.note} 자동 사격은 과열 전까지 유지된다.`
        }</p>
      `;
    }

    renderWaveTrack();
    renderCombatFeed();
    renderPauseOverlay();
    renderHudPanels();
    syncBodyState();
  }

  function renderForgeOverlay() {
    const active = state.phase === "forge";
    elements.forgeOverlay.classList.toggle("hidden", !active);
    if (!active) {
      return;
    }
    const activeSupportTrack = getForgeSupportTrackSnapshot(state.build, state.supportSystem);
    const dominantFormSummary = getDominantFormSummary(state.build, state.weapon, state.waveIndex + 2);
    const nextFormStep = getNextBreakpointSummary(state.build, state.weapon, state.waveIndex + 2);
    const proofWindow = getImmediateProofWindowSummary(state.build, state.waveIndex + 2);
    const riderStep = state.forgeMaxSteps > 1 && state.forgeStep === 2;
    const featuredForgeChoice = riderStep
      ? { showcase: null, featuredIndex: -1 }
      : getForgeFeaturedChoice(state.forgeChoices, state.build, state.waveIndex + 2);
    const showcase = featuredForgeChoice.showcase;
    const featuredIndex = featuredForgeChoice.featuredIndex;
    const featuredChoice = featuredIndex >= 0 ? state.forgeChoices[featuredIndex] : null;
    const useBaseRouteContract = shouldUseBaseRouteForgeContract();
    const forgeModeLabel = getForgeDisplayModeLabel();
    const baseRouteForgeStage = useBaseRouteContract
      ? getBaseRouteForgeStage(state, state.waveIndex + 2)
      : null;
    const focusEyebrow = useBaseRouteContract
      ? "12-Wave Contract"
      : state.pendingFinalForge
        ? "Final Form"
        : riderStep
          ? "Secondary Rider"
          : "Main Leap";
    const focusTitle = state.pendingFinalForge
      ? useBaseRouteContract
        ? dominantFormSummary.label
        : nextFormStep.label
      : riderStep
        ? activeSupportTrack.label
        : (featuredChoice && featuredChoice.title) || nextFormStep.label;
    const focusPrompt = useBaseRouteContract
      ? state.pendingFinalForge
        ? `${baseRouteForgeStage ? baseRouteForgeStage.label : "Final Seal"}로 ${dominantFormSummary.label}를 이번 런의 마지막 실루엣으로 고정한다.`
        : riderStep
          ? `${baseRouteForgeStage ? baseRouteForgeStage.label : "Proof Loadout"}에서는 ${proofWindow.label} 전에 버틸 rider 한 장만 얹는다.`
          : `${baseRouteForgeStage ? baseRouteForgeStage.label : "Forge Break"}에서는 ${focusTitle} 하나만 먼저 고른다.`
      : state.pendingFinalForge
        ? `${dominantFormSummary.label}를 이번 12-wave spine의 최종 실루엣으로 봉인한다.`
        : riderStep
          ? `${dominantFormSummary.label} 위에 rider 한 장만 얹고 바로 다음 전투 ask를 버틴다.`
          : `${dominantFormSummary.label} 다음에 가장 크게 전장을 바꿀 변이 하나만 먼저 고른다.`;
    elements.forgeSubtitle.textContent = useBaseRouteContract
      ? `${baseRouteForgeStage ? baseRouteForgeStage.label : "Forge Break"} · 고철 ${Math.round(state.resources.scrap)}`
      : state.pendingFinalForge
        ? `${forgeModeLabel} · ${focusTitle} · 고철 ${Math.round(state.resources.scrap)}`
        : riderStep
          ? `${forgeModeLabel} · ${proofWindow.label} 대비 rider 선택 · 고철 ${Math.round(state.resources.scrap)}`
          : `${forgeModeLabel} · ${focusTitle} 먼저 · 고철 ${Math.round(state.resources.scrap)}`;
    elements.forgeContext.innerHTML = useBaseRouteContract
      ? `
        <article class="forge-focus forge-focus--${riderStep ? "rider" : "headline"} forge-context__card forge-context__card--span-two">
          ${createBaseRouteFocusMarkup({
            eyebrow: focusEyebrow,
            chipLabel: baseRouteForgeStage ? baseRouteForgeStage.label : "Forge Break",
            title: focusTitle,
            prompt: focusPrompt,
            currentFormLabel: dominantFormSummary.label,
            mainLeapLabel: riderStep ? dominantFormSummary.label : focusTitle,
            proofLabel: proofWindow.label,
            supportLabel: riderStep ? focusTitle : activeSupportTrack.label,
            note: state.pendingFinalForge
              ? `${dominantFormSummary.label}를 이번 런의 마지막 실루엣으로 봉인한다.`
              : riderStep
                ? `${focusTitle}는 보조 rider로만 얹고 ${proofWindow.label}에서 바로 버티는지 본다.`
                : `${proofWindow.label}에서 바로 전장 소유 시간을 증명한다. rider는 보조선으로만 남긴다.`,
          })}
        </article>
      `
      : `
        <article class="forge-focus forge-focus--${riderStep ? "rider" : "headline"} forge-context__card forge-context__card--span-two">
          <div class="forge-focus__header">
            <p class="panel__eyebrow">${focusEyebrow}</p>
            <span class="forge-focus__mode">${forgeModeLabel}</span>
          </div>
          <strong>${focusTitle}</strong>
          <p>${focusPrompt}</p>
          <div class="status-list">
            ${createStatusRow(
              "Headline Mutation",
              riderStep || state.pendingFinalForge ? dominantFormSummary.label : focusTitle
            )}
            ${createStatusRow("Secondary Rider", riderStep ? focusTitle : activeSupportTrack.label)}
            ${createStatusRow("Immediate Ask", proofWindow.label)}
          </div>
          <p class="forge-focus__proof"><span>${
            state.pendingFinalForge ? "Route Payoff" : "Next Proof"
          }</span>${
            state.pendingFinalForge
              ? `${dominantFormSummary.label}를 메인 12-wave route의 최종 실루엣으로 봉인한다.`
              : riderStep
                ? `${focusTitle}는 rider로만 남고, 가치는 ${proofWindow.label}에서 얼마나 오래 버티는지로 바로 드러난다.`
                : `${focusTitle}를 먼저 집고 ${activeSupportTrack.label}는 rider로만 남긴다. 다음 ask는 ${proofWindow.label} 하나다.`
          }</p>
        </article>
      `;
    elements.forgeCards.innerHTML = state.forgeChoices
      .map(
        (choice, index) => {
          const kind =
            choice.type === "utility" ? choice.action || "utility" : choice.type || "choice";
          const transformation = getForgeChoiceTransformation(choice);
          const contractLabel = useBaseRouteContract
            ? getBaseRouteForgeContractLabel(choice.contractRole, choice, riderStep)
            : choice.contractLabel || transformation.laneLabel;
          const compactPreviewRow = createForgePreviewRows(choice)[0];
          const previewRows = createForgePreviewRows(choice)
            .slice(0, riderStep ? 1 : 2)
            .map(
              (row) => `
                <div class="forge-card__row">
                  <span>${row.label}</span>
                  <strong>${row.value}</strong>
                </div>
              `
            )
            .join("");
          const slotLabel =
            state.resources.scrap < choice.cost
              ? "고철 부족"
              : choice.cost > 0
                ? `고철 ${choice.cost}`
                : choice.action === "bastion_pact"
                  ? "체력 대가"
                  : choice.type === "fallback"
                    ? "보류"
                    : "무료";
          const isFeaturedHeadline = !riderStep && index === featuredIndex;
          if (riderStep) {
            return `
          <button
            type="button"
            class="forge-card forge-card--rider forge-card--${choice.tag.toLowerCase()}"
            data-kind="${kind}"
            data-contract="${choice.contractRole || "rider"}"
            data-index="${index}"
            data-tone="${transformation.tone}"
            data-verb="${choice.verb}"
            ${state.resources.scrap < choice.cost ? "disabled" : ""}
          >
            <span class="forge-card__tag">${contractLabel}</span>
            <h3>${choice.title}</h3>
            <p class="forge-card__hero-copy">${transformation.promise}</p>
            ${previewRows ? `<div class="forge-card__preview forge-card__preview--compact">${previewRows}</div>` : ""}
            <span class="forge-card__slot">${slotLabel}</span>
          </button>
        `;
          }
          if (!isFeaturedHeadline) {
            return `
          <button
            type="button"
            class="forge-card forge-card--compact forge-card--${choice.tag.toLowerCase()}"
            data-kind="${kind}"
            data-contract="${choice.contractRole || "open"}"
            data-index="${index}"
            data-tone="${transformation.tone}"
            data-verb="${choice.verb}"
            ${state.resources.scrap < choice.cost ? "disabled" : ""}
          >
            <span class="forge-card__tag">${contractLabel}</span>
            <h3>${choice.title}</h3>
            <p class="forge-card__hero-copy">${transformation.promise}</p>
            ${
              compactPreviewRow
                ? `<p class="forge-card__pivot"><span>${compactPreviewRow.label}</span><strong>${compactPreviewRow.value}</strong></p>`
                : ""
            }
            <p class="forge-card__side-note">${transformation.proof}</p>
            <span class="forge-card__slot">${slotLabel}</span>
          </button>
        `;
          }
          return `
          <button
            type="button"
            class="forge-card forge-card--featured forge-card--${choice.tag.toLowerCase()}"
            data-kind="${kind}"
            data-contract="${choice.contractRole || "open"}"
            data-index="${index}"
            data-tone="${transformation.tone}"
            data-verb="${choice.verb}"
            ${state.resources.scrap < choice.cost ? "disabled" : ""}
          >
            <span class="forge-card__badge">${
              useBaseRouteContract && baseRouteForgeStage
                ? baseRouteForgeStage.label
                : useBaseRouteContract
                  ? "Forge Break"
                  : "Headline Mutation"
            }</span>
            <div class="forge-card__hero forge-card__hero--${transformation.tone}">
              <span class="forge-card__hero-label">${contractLabel}</span>
              <h3>${choice.title}</h3>
              <p class="forge-card__hero-copy">${transformation.promise}</p>
            </div>
            <p class="forge-card__proof"><span>다음 전투 증명</span>${transformation.proof}</p>
            <div class="forge-card__preview">${previewRows}</div>
            ${
              showcase && showcase.choice === choice
                ? `<div class="forge-card__impact-strip">${showcase.rows
                    .map(
                      (row) => `
                        <article class="forge-card__impact">
                          <span>${row.label}</span>
                          <strong>${row.value}</strong>
                        </article>
                      `
                    )
                    .join("")}</div>`
                : ""
            }
            <span class="forge-card__slot">${slotLabel}</span>
          </button>
        `;
        }
      )
      .join("");
  }

  function drawPolygon(ctx, x, y, radius, sides, rotation) {
    ctx.beginPath();
    for (let index = 0; index < sides; index += 1) {
      const angle = rotation + (index / sides) * Math.PI * 2;
      const px = x + Math.cos(angle) * radius;
      const py = y + Math.sin(angle) * radius;
      if (index === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.closePath();
  }

  function renderGame() {
    const arena = getCurrentArenaSize();
    context.clearRect(0, 0, arena.width, arena.height);
    context.save();
    if (state.shake > 0) {
      context.translate(
        (Math.random() - 0.5) * state.shake,
        (Math.random() - 0.5) * state.shake
      );
    }

    const background = context.createLinearGradient(0, 0, 0, arena.height);
    background.addColorStop(0, "#151110");
    background.addColorStop(1, "#090807");
    context.fillStyle = background;
    context.fillRect(0, 0, arena.width, arena.height);

    context.strokeStyle = "rgba(255,255,255,0.05)";
    context.lineWidth = 1;
    for (let x = 24; x < arena.width; x += 48) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, arena.height);
      context.stroke();
    }
    for (let y = 24; y < arena.height; y += 48) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(arena.width, y);
      context.stroke();
    }

    context.strokeStyle = "rgba(255, 140, 66, 0.15)";
    context.lineWidth = 2;
    context.strokeRect(20, 20, arena.width - 40, arena.height - 40);
    context.beginPath();
    context.arc(arena.width / 2, arena.height / 2, 110, 0, Math.PI * 2);
    context.stroke();
    context.beginPath();
    context.arc(arena.width / 2, arena.height / 2, 190, 0, Math.PI * 2);
    context.stroke();

    for (const hazard of state.hazards) {
      const telegraphRatio =
        hazard.telegraphTime > 0
          ? clamp(1 - hazard.telegraphTime / 1.1, 0, 1)
          : 1;
      if (hazard.telegraphTime > 0) {
        context.strokeStyle = `rgba(255, 90, 77, ${0.35 + telegraphRatio * 0.4})`;
        context.lineWidth = 3;
        context.beginPath();
        context.arc(hazard.x, hazard.y, hazard.radius, 0, Math.PI * 2);
        context.stroke();
        context.fillStyle = "rgba(255, 90, 77, 0.08)";
        context.beginPath();
        context.arc(hazard.x, hazard.y, hazard.radius * telegraphRatio, 0, Math.PI * 2);
        context.fill();
      } else {
        const activeAlpha = clamp(hazard.activeTime / 4.4, 0.15, 0.38);
        context.fillStyle =
          hazard.type === "territory"
            ? `rgba(255, 128, 79, ${clamp(activeAlpha + 0.08, 0.18, 0.46)})`
            : hazard.type === "relay"
              ? `rgba(255, 185, 92, ${clamp(activeAlpha + 0.08, 0.2, 0.48)})`
            : hazard.type === "drift"
              ? `rgba(255, 151, 79, ${clamp(activeAlpha + 0.1, 0.22, 0.5)})`
            : hazard.type === "salvage"
              ? `rgba(255, 208, 104, ${clamp(activeAlpha + 0.1, 0.24, 0.52)})`
            : hazard.type === "caravan"
              ? `rgba(255, 224, 122, ${clamp(activeAlpha + 0.08, 0.22, 0.5)})`
            : `rgba(255, 104, 61, ${activeAlpha})`;
        context.beginPath();
        context.arc(hazard.x, hazard.y, hazard.radius, 0, Math.PI * 2);
        context.fill();
        context.strokeStyle = "rgba(255, 211, 169, 0.45)";
        context.lineWidth = 2;
        context.beginPath();
        context.arc(hazard.x, hazard.y, hazard.radius * 0.72, 0, Math.PI * 2);
        context.stroke();
        if (hazard.type === "territory") {
          const hpRatio =
            hazard.coreMaxHp > 0 ? clamp(hazard.coreHp / hazard.coreMaxHp, 0, 1) : 0;
          context.save();
          context.translate(hazard.x, hazard.y);
          context.rotate(performance.now() * 0.0014);
          context.fillStyle = "rgba(255, 228, 191, 0.9)";
          context.strokeStyle = "rgba(255, 110, 61, 0.95)";
          context.lineWidth = 2;
          context.beginPath();
          context.moveTo(0, -hazard.coreRadius);
          context.lineTo(hazard.coreRadius, 0);
          context.lineTo(0, hazard.coreRadius);
          context.lineTo(-hazard.coreRadius, 0);
          context.closePath();
          context.fill();
          context.stroke();
          context.restore();

          context.strokeStyle = "rgba(255, 238, 212, 0.9)";
          context.lineWidth = 3;
          context.beginPath();
          context.arc(
            hazard.x,
            hazard.y,
            hazard.coreRadius + 8,
            -Math.PI / 2,
            -Math.PI / 2 + Math.PI * 2 * hpRatio
          );
          context.stroke();
        } else if (hazard.type === "relay") {
          const hpRatio =
            hazard.coreMaxHp > 0 ? clamp(hazard.coreHp / hazard.coreMaxHp, 0, 1) : 0;
          for (const linkedHazard of getRelayLinksForHazard(hazard)) {
            context.strokeStyle = "rgba(255, 240, 188, 0.72)";
            context.lineWidth = Math.max(2, (hazard.relayWidth || 24) * 0.2);
            context.beginPath();
            context.moveTo(hazard.x, hazard.y);
            context.lineTo(linkedHazard.x, linkedHazard.y);
            context.stroke();
            context.strokeStyle = "rgba(255, 124, 61, 0.32)";
            context.lineWidth = Math.max(8, (hazard.relayWidth || 24) * 0.95);
            context.beginPath();
            context.moveTo(hazard.x, hazard.y);
            context.lineTo(linkedHazard.x, linkedHazard.y);
            context.stroke();
          }
          context.save();
          context.translate(hazard.x, hazard.y);
          context.rotate(performance.now() * 0.0017 * hazard.orbitDirection);
          context.fillStyle = "rgba(255, 239, 207, 0.94)";
          context.strokeStyle = "rgba(255, 164, 84, 0.96)";
          context.lineWidth = 2.2;
          drawPolygon(context, 0, 0, hazard.coreRadius, 6, Math.PI / 6);
          context.fill();
          context.stroke();
          context.restore();
          context.strokeStyle = "rgba(255, 246, 224, 0.92)";
          context.lineWidth = 3;
          context.beginPath();
          context.arc(
            hazard.x,
            hazard.y,
            hazard.coreRadius + 8,
            -Math.PI / 2,
            -Math.PI / 2 + Math.PI * 2 * hpRatio
          );
          context.stroke();
        } else if (hazard.type === "drift") {
          const orbitAngle = performance.now() * 0.0022 * hazard.orbitDirection;
          context.save();
          context.translate(hazard.x, hazard.y);
          context.rotate(orbitAngle);
          context.strokeStyle = "rgba(255, 245, 214, 0.82)";
          context.lineWidth = 3;
          context.beginPath();
          context.arc(0, 0, hazard.radius * 0.48, -Math.PI * 0.2, Math.PI * 0.65);
          context.stroke();
          context.beginPath();
          context.arc(0, 0, hazard.radius * 0.3, Math.PI * 0.45, Math.PI * 1.3);
          context.stroke();
          context.fillStyle = "rgba(255, 223, 184, 0.92)";
          context.beginPath();
          context.arc(hazard.radius * 0.18, -hazard.radius * 0.18, 7, 0, Math.PI * 2);
          context.fill();
          context.restore();
        } else if (hazard.type === "salvage") {
          const hpRatio =
            hazard.coreMaxHp > 0 ? clamp(hazard.coreHp / hazard.coreMaxHp, 0, 1) : 0;
          context.save();
          context.translate(hazard.x, hazard.y);
          context.rotate(performance.now() * 0.0015);
          context.fillStyle = "rgba(255, 246, 210, 0.94)";
          context.strokeStyle = "rgba(255, 194, 84, 0.98)";
          context.lineWidth = 2.2;
          drawPolygon(context, 0, 0, hazard.coreRadius + 2, 8, Math.PI / 8);
          context.fill();
          context.stroke();
          context.strokeStyle = "rgba(255, 164, 72, 0.85)";
          context.lineWidth = 2;
          context.beginPath();
          context.moveTo(-hazard.coreRadius * 0.46, 0);
          context.lineTo(hazard.coreRadius * 0.46, 0);
          context.moveTo(0, -hazard.coreRadius * 0.46);
          context.lineTo(0, hazard.coreRadius * 0.46);
          context.stroke();
          context.restore();
          context.strokeStyle = "rgba(255, 246, 224, 0.92)";
          context.lineWidth = 3;
          context.beginPath();
          context.arc(
            hazard.x,
            hazard.y,
            hazard.coreRadius + 9,
            -Math.PI / 2,
            -Math.PI / 2 + Math.PI * 2 * hpRatio
          );
          context.stroke();
        } else if (hazard.type === "caravan") {
          const hpRatio =
            hazard.coreMaxHp > 0 ? clamp(hazard.coreHp / hazard.coreMaxHp, 0, 1) : 0;
          context.save();
          context.translate(hazard.x, hazard.y);
          context.rotate(Math.atan2(hazard.y - state.player.y, hazard.x - state.player.x));
          context.fillStyle = "rgba(255, 243, 197, 0.95)";
          context.strokeStyle = "rgba(255, 193, 74, 0.98)";
          context.lineWidth = 2.2;
          context.beginPath();
          context.moveTo(hazard.coreRadius + 6, 0);
          context.lineTo(-hazard.coreRadius * 0.85, -hazard.coreRadius * 0.58);
          context.lineTo(-hazard.coreRadius * 0.48, 0);
          context.lineTo(-hazard.coreRadius * 0.85, hazard.coreRadius * 0.58);
          context.closePath();
          context.fill();
          context.stroke();
          context.strokeStyle = "rgba(255, 234, 167, 0.9)";
          context.beginPath();
          context.moveTo(-hazard.coreRadius * 0.2, -hazard.coreRadius * 0.34);
          context.lineTo(-hazard.coreRadius * 0.72, -hazard.coreRadius * 0.34);
          context.moveTo(-hazard.coreRadius * 0.2, hazard.coreRadius * 0.34);
          context.lineTo(-hazard.coreRadius * 0.72, hazard.coreRadius * 0.34);
          context.stroke();
          context.restore();
          context.strokeStyle = "rgba(255, 248, 224, 0.94)";
          context.lineWidth = 3;
          context.beginPath();
          context.arc(
            hazard.x,
            hazard.y,
            hazard.coreRadius + 9,
            -Math.PI / 2,
            -Math.PI / 2 + Math.PI * 2 * hpRatio
          );
          context.stroke();
        }
      }
    }

    for (const drop of state.drops) {
      const maxLife =
        drop.kind === "core" || drop.kind === "catalyst"
          ? 12
          : drop.kind === "catalyst_crucible_cache"
            ? CATALYST_CRUCIBLE_DROP_LIFE
          : drop.kind === "overcommit_salvage" || drop.kind === "doctrine_pursuit_shard"
            ? OVERCOMMIT_SALVAGE_LIFE
          : drop.kind === "late_ascension_cache"
            ? LATE_ASCENSION_DROP_LIFE
          : drop.kind === "illegal_overclock_cache"
              ? ILLEGAL_OVERCLOCK_DROP_LIFE
          : drop.kind === "afterburn_ascension_cache"
              ? AFTERBURN_ASCENSION_DROP_LIFE
            : drop.kind === "afterburn_overdrive_cache"
              ? AFTERBURN_OVERDRIVE_DROP_LIFE
            : drop.kind === "afterburn_dominion_cache"
              ? AFTERBURN_DOMINION_DROP_LIFE
            : drop.kind === "combat_cache"
              ? COMBAT_CACHE_DROP_LIFE
            : 10;
      const fadeRatio = clamp(drop.life / maxLife, 0, 1);
      const blink = drop.life < 2.2 ? 0.45 + Math.abs(Math.sin(performance.now() * 0.02)) * 0.55 : 1;
      context.globalAlpha = clamp(fadeRatio * blink, 0.18, 1);
      if (drop.kind === "scrap") {
        context.fillStyle = "rgba(255, 209, 102, 0.9)";
        context.fillRect(drop.x - 4, drop.y - 4, 8, 8);
      } else if (drop.kind === "illegal_overclock_cache") {
        const choice = drop.choice || {};
        const overclock = getIllegalOverclockDef(choice.illegalOverclockId);
        context.strokeStyle = "rgba(255, 189, 122, 0.95)";
        context.lineWidth = 2.6;
        context.beginPath();
        context.arc(drop.x, drop.y, 14, 0, Math.PI * 2);
        context.stroke();
        context.fillStyle = overclock ? overclock.color : "rgba(255, 152, 78, 0.92)";
        context.beginPath();
        drawPolygon(context, drop.x, drop.y, 9, 6, performance.now() * 0.0024);
        context.fill();
        context.fillStyle = "rgba(22, 10, 4, 0.92)";
        context.font = "bold 10px monospace";
        context.textAlign = "center";
        context.fillText(choice.tag || "ILLEGAL", drop.x, drop.y + 28);
      } else if (drop.kind === "catalyst_crucible_cache") {
        const choice = drop.choice || {};
        context.strokeStyle = "rgba(255, 244, 179, 0.98)";
        context.lineWidth = 2.8;
        context.beginPath();
        context.arc(drop.x, drop.y, 15, 0, Math.PI * 2);
        context.stroke();
        context.fillStyle = "rgba(255, 138, 68, 0.94)";
        context.beginPath();
        drawPolygon(context, drop.x, drop.y, 10, 4, Math.PI / 4 + performance.now() * 0.002);
        context.fill();
        context.strokeStyle = "rgba(255, 214, 138, 0.88)";
        context.lineWidth = 2;
        context.beginPath();
        context.arc(drop.x, drop.y, 7, 0, Math.PI * 2);
        context.stroke();
        context.fillStyle = "rgba(22, 10, 4, 0.92)";
        context.font = "bold 10px monospace";
        context.textAlign = "center";
        context.fillText(choice.tag || "MOLT", drop.x, drop.y + 28);
      } else if (drop.kind === "combat_cache") {
        const choice = drop.choice || {};
        context.strokeStyle = choice.type === "fallback" ? "rgba(136, 229, 198, 0.95)" : "rgba(255, 212, 122, 0.95)";
        context.lineWidth = 2.5;
        context.beginPath();
        context.arc(drop.x, drop.y, 13, 0, Math.PI * 2);
        context.stroke();
        context.fillStyle = choice.type === "fallback" ? "rgba(60, 176, 145, 0.88)" : "rgba(255, 161, 72, 0.92)";
        context.beginPath();
        context.moveTo(drop.x, drop.y - 8);
        context.lineTo(drop.x + 8, drop.y);
        context.lineTo(drop.x, drop.y + 8);
        context.lineTo(drop.x - 8, drop.y);
        context.closePath();
        context.fill();
        context.fillStyle = "rgba(22, 10, 4, 0.92)";
        context.font = "bold 10px monospace";
        context.textAlign = "center";
        context.fillText(choice.tag || "CACHE", drop.x, drop.y + 26);
      } else if (drop.kind === "late_ascension_cache") {
        const choice = drop.choice || {};
        const ascensionDef = getLateAscensionDef(choice.lateAscensionId);
        const palette = {
          stroke: (ascensionDef && ascensionDef.strokeColor) || "rgba(214, 246, 255, 0.98)",
          fill: (ascensionDef && ascensionDef.fillColor) || "rgba(159, 231, 255, 0.92)",
        };
        context.strokeStyle = palette.stroke;
        context.lineWidth = 2.7;
        context.beginPath();
        context.arc(drop.x, drop.y, 15, 0, Math.PI * 2);
        context.stroke();
        context.fillStyle = palette.fill;
        context.beginPath();
        drawPolygon(context, drop.x, drop.y, 10, 5, -Math.PI / 2 + performance.now() * 0.002);
        context.fill();
        context.fillStyle = "rgba(22, 10, 4, 0.92)";
        context.font = "bold 10px monospace";
        context.textAlign = "center";
        context.fillText(choice.tag || "ASCEND", drop.x, drop.y + 28);
      } else if (drop.kind === "afterburn_overdrive_cache") {
        const choice = drop.choice || {};
        const overdrive = getAfterburnOverdriveDef(choice.afterburnOverdriveId);
        context.strokeStyle = overdrive ? overdrive.color : "rgba(255, 212, 163, 0.96)";
        context.lineWidth = 2.8;
        context.beginPath();
        context.arc(drop.x, drop.y, 16, 0, Math.PI * 2);
        context.stroke();
        context.fillStyle = overdrive ? overdrive.color : "rgba(255, 212, 163, 0.92)";
        context.beginPath();
        drawPolygon(context, drop.x, drop.y, 11, 8, performance.now() * 0.0028);
        context.fill();
        context.strokeStyle = "rgba(255, 246, 232, 0.88)";
        context.lineWidth = 2;
        context.beginPath();
        context.arc(drop.x, drop.y, 7, 0, Math.PI * 2);
        context.stroke();
        context.fillStyle = "rgba(22, 10, 4, 0.92)";
        context.font = "bold 10px monospace";
        context.textAlign = "center";
        context.fillText(choice.tag || "OVR", drop.x, drop.y + 29);
      } else if (drop.kind === "afterburn_dominion_cache") {
        const choice = drop.choice || {};
        const dominion = getAfterburnDominionDef(choice.afterburnDominionId);
        context.strokeStyle = dominion ? dominion.color : "rgba(255, 219, 163, 0.96)";
        context.lineWidth = 3;
        context.beginPath();
        context.arc(drop.x, drop.y, 17, 0, Math.PI * 2);
        context.stroke();
        context.fillStyle = dominion ? dominion.color : "rgba(255, 188, 116, 0.92)";
        context.beginPath();
        drawPolygon(context, drop.x, drop.y, 11, 5, -Math.PI / 2 + performance.now() * 0.0024);
        context.fill();
        context.strokeStyle = "rgba(255, 245, 228, 0.88)";
        context.lineWidth = 2;
        context.beginPath();
        context.arc(drop.x, drop.y, 8, 0, Math.PI * 2);
        context.stroke();
        context.fillStyle = "rgba(22, 10, 4, 0.92)";
        context.font = "bold 10px monospace";
        context.textAlign = "center";
        context.fillText(choice.tag || "DOM", drop.x, drop.y + 30);
      } else if (drop.kind === "afterburn_ascension_cache") {
        const choice = drop.choice || {};
        const ascensionPalette =
          choice.doctrineCapstoneId === "stormspire_needle"
            ? {
                stroke: "rgba(255, 234, 180, 0.98)",
                fill: "rgba(255, 184, 116, 0.94)",
              }
            : choice.doctrineCapstoneId === "bulwark_foundry"
              ? {
                  stroke: "rgba(255, 232, 182, 0.98)",
                  fill: "rgba(255, 171, 84, 0.94)",
                }
              : {
                  stroke: "rgba(203, 247, 255, 0.98)",
                  fill: "rgba(138, 231, 255, 0.92)",
                };
        context.strokeStyle = ascensionPalette.stroke;
        context.lineWidth = 2.7;
        context.beginPath();
        context.arc(drop.x, drop.y, 15, 0, Math.PI * 2);
        context.stroke();
        context.fillStyle = ascensionPalette.fill;
        context.beginPath();
        drawPolygon(context, drop.x, drop.y, 10, 3, -Math.PI / 2 + performance.now() * 0.0022);
        context.fill();
        context.fillStyle = "rgba(22, 10, 4, 0.92)";
        context.font = "bold 10px monospace";
        context.textAlign = "center";
        context.fillText(choice.tag || "ASCEND", drop.x, drop.y + 28);
      } else if (drop.kind === "overcommit_salvage") {
        context.strokeStyle = "rgba(255, 231, 130, 0.95)";
        context.lineWidth = 2;
        context.beginPath();
        context.arc(drop.x, drop.y, 9, 0, Math.PI * 2);
        context.stroke();
        context.fillStyle = "rgba(255, 170, 72, 0.95)";
        context.beginPath();
        context.moveTo(drop.x, drop.y - 6);
        context.lineTo(drop.x + 5, drop.y);
        context.lineTo(drop.x, drop.y + 6);
        context.lineTo(drop.x - 5, drop.y);
        context.closePath();
        context.fill();
      } else if (drop.kind === "doctrine_pursuit_shard") {
        context.strokeStyle = "rgba(181, 246, 255, 0.96)";
        context.lineWidth = 2.2;
        context.beginPath();
        context.arc(drop.x, drop.y, 10, 0, Math.PI * 2);
        context.stroke();
        context.fillStyle = "rgba(108, 214, 255, 0.94)";
        context.beginPath();
        context.moveTo(drop.x, drop.y - 7);
        context.lineTo(drop.x + 6, drop.y);
        context.lineTo(drop.x, drop.y + 7);
        context.lineTo(drop.x - 6, drop.y);
        context.closePath();
        context.fill();
      } else if (drop.kind === "catalyst") {
        context.strokeStyle = "#fff1a8";
        context.lineWidth = 2;
        context.beginPath();
        context.arc(drop.x, drop.y, 10, 0, Math.PI * 2);
        context.stroke();
        context.fillStyle = CORE_DEFS[drop.coreId].color;
        context.beginPath();
        context.arc(drop.x, drop.y, 5.5, 0, Math.PI * 2);
        context.fill();
      } else {
        context.fillStyle = CORE_DEFS[drop.coreId].color;
        context.save();
        context.translate(drop.x, drop.y);
        context.rotate(Math.PI / 4);
        context.fillRect(-8, -8, 16, 16);
        context.restore();
      }
      context.globalAlpha = 1;
    }

    if (state.player && state.supportSystem) {
      for (const system of state.supportSystem.systems || []) {
        if (system.orbitRadius <= 0) {
          continue;
        }
        context.strokeStyle = system.orbitColor;
        context.lineWidth = 1.5;
        context.beginPath();
        context.arc(state.player.x, state.player.y, system.orbitRadius, 0, Math.PI * 2);
        context.stroke();
      }
      for (const deployable of state.supportDeployables || []) {
        const lifeRatio =
          deployable.maxLife > 0 ? clamp(deployable.life / deployable.maxLife, 0, 1) : 1;
        const doctrineCapstone = getDoctrineCapstoneDef(state.build);
        context.save();
        context.globalAlpha = lifeRatio < 0.24 ? 0.5 + Math.abs(Math.sin(performance.now() * 0.02)) * 0.4 : 1;
        context.strokeStyle = `${deployable.strokeColor}`;
        context.lineWidth = 1.4;
        context.beginPath();
        context.arc(deployable.x, deployable.y, deployable.shotRange * 0.32, 0, Math.PI * 2);
        context.stroke();
        if (doctrineCapstone && doctrineCapstone.id === "bulwark_foundry") {
          context.globalAlpha = 0.35 + (1 - Math.min(1, deployable.doctrinePulseCooldown || 0)) * 0.2;
          context.strokeStyle = "rgba(255, 190, 120, 0.85)";
          context.lineWidth = 2.2;
          context.beginPath();
          context.arc(deployable.x, deployable.y, deployable.shotRange * 0.28, 0, Math.PI * 2);
          context.stroke();
        }
        if (deployable.kilnFieldRadius > 0) {
          const pulseAlpha =
            doctrineCapstone && doctrineCapstone.id === "bulwark_foundry" ? 0.18 : 0.11;
          context.globalAlpha = pulseAlpha;
          context.fillStyle = doctrineCapstone && doctrineCapstone.id === "bulwark_foundry"
            ? "rgba(255, 170, 92, 0.65)"
            : "rgba(255, 196, 128, 0.5)";
          context.beginPath();
          context.arc(deployable.x, deployable.y, deployable.kilnFieldRadius, 0, Math.PI * 2);
          context.fill();
          context.globalAlpha = 0.55;
          context.strokeStyle = doctrineCapstone && doctrineCapstone.id === "bulwark_foundry"
            ? "rgba(255, 213, 166, 0.92)"
            : "rgba(255, 222, 184, 0.72)";
          context.lineWidth = doctrineCapstone && doctrineCapstone.id === "bulwark_foundry" ? 2.4 : 1.6;
          context.beginPath();
          context.arc(deployable.x, deployable.y, deployable.kilnFieldRadius, 0, Math.PI * 2);
          context.stroke();
        }
        context.translate(deployable.x, deployable.y);
        context.fillStyle = deployable.color;
        context.strokeStyle = deployable.strokeColor;
        context.beginPath();
        context.rect(-deployable.radius, -deployable.radius * 0.7, deployable.radius * 2, deployable.radius * 1.4);
        context.fill();
        context.stroke();
        context.beginPath();
        context.moveTo(0, -deployable.radius - 4);
        context.lineTo(deployable.radius * 0.8, -deployable.radius * 0.18);
        context.lineTo(-deployable.radius * 0.8, -deployable.radius * 0.18);
        context.closePath();
        context.fill();
        context.stroke();
        context.restore();
      }
      for (const satellite of getSupportSystemSatellites()) {
        context.fillStyle = satellite.color;
        context.strokeStyle = satellite.strokeColor;
        context.lineWidth = 1.4;
        if (satellite.renderShape === "shield") {
          context.save();
          context.translate(satellite.x, satellite.y);
          context.rotate(satellite.angle + Math.PI / 4);
          context.beginPath();
          context.rect(-satellite.radius, -satellite.radius, satellite.radius * 2, satellite.radius * 2);
          context.fill();
          context.stroke();
          context.restore();
          context.beginPath();
          context.arc(
            satellite.x,
            satellite.y,
            satellite.radius + satellite.interceptRange * 0.45,
            0,
            Math.PI * 2
          );
          context.stroke();
        } else if (satellite.renderShape === "missile") {
          context.save();
          context.translate(satellite.x, satellite.y);
          context.rotate(satellite.angle + Math.PI / 2);
          context.beginPath();
          context.moveTo(0, -satellite.radius - 2);
          context.lineTo(satellite.radius * 0.9, satellite.radius + 1);
          context.lineTo(0, satellite.radius * 0.45);
          context.lineTo(-satellite.radius * 0.9, satellite.radius + 1);
          context.closePath();
          context.fill();
          context.stroke();
          context.restore();
        } else if (satellite.renderShape === "drone") {
          context.save();
          context.translate(satellite.x, satellite.y);
          context.rotate(satellite.angle);
          context.beginPath();
          context.moveTo(0, -satellite.radius - 1);
          context.lineTo(satellite.radius + 1, 0);
          context.lineTo(0, satellite.radius + 1);
          context.lineTo(-satellite.radius - 1, 0);
          context.closePath();
          context.fill();
          context.stroke();
          context.restore();
        } else {
          context.beginPath();
          context.arc(satellite.x, satellite.y, satellite.radius, 0, Math.PI * 2);
          context.fill();
          context.beginPath();
          context.arc(satellite.x, satellite.y, satellite.radius + 3, 0, Math.PI * 2);
          context.stroke();
        }
      }
    }

    for (const projectile of state.projectiles) {
      context.fillStyle = projectile.color;
      context.beginPath();
      context.arc(projectile.x, projectile.y, projectile.radius, 0, Math.PI * 2);
      context.fill();
      if (projectile.owner === "enemy") {
        context.strokeStyle = "rgba(255,255,255,0.38)";
        context.lineWidth = 1.5;
        context.stroke();
      }
    }

    for (const pool of state.slagPools || []) {
      const alpha = clamp(pool.life / pool.maxLife, 0, 1);
      context.globalAlpha = alpha * 0.85;
      context.fillStyle = pool.color;
      context.beginPath();
      context.arc(pool.x, pool.y, pool.radius, 0, Math.PI * 2);
      context.fill();
      context.globalAlpha = alpha;
      context.strokeStyle = "rgba(255, 214, 146, 0.55)";
      context.lineWidth = 2;
      context.beginPath();
      context.arc(pool.x, pool.y, pool.radius * 0.72, 0, Math.PI * 2);
      context.stroke();
      context.globalAlpha = 1;
    }

    for (const enemy of state.enemies) {
      const def = ENEMY_DEFS[enemy.type];
      context.fillStyle = def.color;
      if (enemy.type === "brute") {
        context.fillRect(
          enemy.x - enemy.radius,
          enemy.y - enemy.radius,
          enemy.radius * 2,
          enemy.radius * 2
        );
      } else if (enemy.type === "mortar") {
        drawPolygon(context, enemy.x, enemy.y, enemy.radius, 6, Math.PI / 6 + enemy.wobble * 0.08);
        context.fill();
        context.strokeStyle = "rgba(231, 244, 255, 0.82)";
        context.lineWidth = 2;
        context.beginPath();
        context.arc(enemy.x, enemy.y, enemy.radius * 0.48, 0, Math.PI * 2);
        context.stroke();
      } else if (enemy.type === "skimmer") {
        drawPolygon(context, enemy.x, enemy.y, enemy.radius, 5, Math.PI / 5 + enemy.wobble * 0.16);
        context.fill();
        context.strokeStyle = "rgba(219, 255, 241, 0.88)";
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(enemy.x - enemy.radius * 1.1, enemy.y);
        context.lineTo(enemy.x + enemy.radius * 1.1, enemy.y);
        context.stroke();
      } else if (enemy.type === "brander") {
        drawPolygon(context, enemy.x, enemy.y, enemy.radius, 4, Math.PI / 4 + enemy.wobble * 0.08);
        context.fill();
        context.strokeStyle =
          enemy.branderPulseCharge > 0 ? "rgba(255, 246, 214, 0.96)" : "rgba(255, 223, 173, 0.86)";
        context.lineWidth = enemy.branderPulseCharge > 0 ? 3 : 2;
        context.beginPath();
        context.arc(enemy.x, enemy.y, enemy.radius * 0.58, 0, Math.PI * 2);
        context.stroke();
        if (enemy.branderPulseCharge > 0) {
          const chargeRatio = 1 - clamp(enemy.branderPulseCharge / 0.82, 0, 1);
          context.strokeStyle = `rgba(255, 216, 142, ${0.35 + chargeRatio * 0.45})`;
          context.lineWidth = 2.5;
          context.beginPath();
          context.arc(enemy.x, enemy.y, 46 + chargeRatio * 90, 0, Math.PI * 2);
          context.stroke();
        }
      } else if (enemy.type === "binder") {
        drawPolygon(context, enemy.x, enemy.y, enemy.radius, 6, Math.PI / 6 + enemy.wobble * 0.08);
        context.fill();
        context.strokeStyle =
          enemy.binderTetherTime > 0 ? "rgba(247, 255, 205, 0.96)" : "rgba(238, 255, 172, 0.86)";
        context.lineWidth = enemy.binderTetherTime > 0 ? 3 : 2;
        context.beginPath();
        context.moveTo(enemy.x - enemy.radius * 0.9, enemy.y);
        context.lineTo(enemy.x + enemy.radius * 0.9, enemy.y);
        context.moveTo(enemy.x, enemy.y - enemy.radius * 0.9);
        context.lineTo(enemy.x, enemy.y + enemy.radius * 0.9);
        context.stroke();
        if (enemy.binderCastTime > 0 || enemy.binderTetherTime > 0) {
          context.strokeStyle =
            enemy.binderTetherTime > 0 ? "rgba(245, 255, 181, 0.82)" : "rgba(245, 255, 181, 0.48)";
          context.lineWidth = enemy.binderTetherTime > 0 ? 3 : 1.5;
          context.beginPath();
          context.moveTo(enemy.x, enemy.y);
          context.lineTo(state.player.x, state.player.y);
          context.stroke();
        }
        if (enemy.lateAscensionCarrier) {
          context.strokeStyle = "rgba(255, 245, 194, 0.92)";
          context.lineWidth = 3;
          context.beginPath();
          context.arc(enemy.x, enemy.y, enemy.radius + 6, 0, Math.PI * 2);
          context.stroke();
        }
      } else if (enemy.type === "lancer") {
        drawPolygon(context, enemy.x, enemy.y, enemy.radius, 3, Math.PI / 2 + enemy.wobble * 0.06);
        context.fill();
        context.strokeStyle =
          enemy.lancerChargeTime > 0 ? "rgba(255, 242, 214, 0.96)" : "rgba(255, 216, 188, 0.86)";
        context.lineWidth = enemy.lancerChargeTime > 0 ? 3 : 2;
        context.beginPath();
        context.arc(enemy.x, enemy.y, enemy.radius * 0.72, 0, Math.PI * 2);
        context.stroke();
      } else if (enemy.type === "shrike") {
        drawPolygon(context, enemy.x, enemy.y, enemy.radius, 3, enemy.wobble);
        context.fill();
      } else if (enemy.type === "elite") {
        drawPolygon(context, enemy.x, enemy.y, enemy.radius, 6, Math.PI / 6);
        context.fill();
        if (enemy.overcommitTarget) {
          context.strokeStyle = "rgba(255, 229, 126, 0.95)";
          context.lineWidth = 3;
          context.beginPath();
          context.arc(enemy.x, enemy.y, enemy.radius + 6, 0, Math.PI * 2);
          context.stroke();
        } else if (enemy.doctrinePursuitTarget) {
          context.strokeStyle = "rgba(152, 241, 255, 0.95)";
          context.lineWidth = 3;
          context.beginPath();
          context.arc(enemy.x, enemy.y, enemy.radius + 6, 0, Math.PI * 2);
          context.stroke();
        }
      } else if (enemy.type === "apex") {
        drawPolygon(context, enemy.x, enemy.y, enemy.radius, 8, Math.PI / 8 + enemy.wobble * 0.08);
        context.fill();
        context.strokeStyle = "rgba(255, 223, 186, 0.92)";
        context.lineWidth = 3;
        context.beginPath();
        context.arc(enemy.x, enemy.y, enemy.radius + 7, 0, Math.PI * 2);
        context.stroke();
        context.lineWidth = 2;
        context.beginPath();
        context.arc(enemy.x, enemy.y, enemy.radius * 0.52, 0, Math.PI * 2);
        context.stroke();
      } else if (enemy.type === "warden") {
        drawPolygon(context, enemy.x, enemy.y, enemy.radius, 4, Math.PI / 4 + enemy.wobble * 0.12);
        context.fill();
        context.strokeStyle = "rgba(255, 212, 227, 0.85)";
        context.lineWidth = 2;
        context.beginPath();
        context.arc(enemy.x, enemy.y, enemy.radius + 4, 0, Math.PI * 2);
        context.stroke();
      } else {
        context.beginPath();
        context.arc(enemy.x, enemy.y, enemy.radius, 0, Math.PI * 2);
        context.fill();
      }

      context.fillStyle = "rgba(0,0,0,0.35)";
      context.fillRect(enemy.x - enemy.radius, enemy.y + enemy.radius + 2, enemy.radius * 2, 4);
    }

    for (const particle of state.particles) {
      const alpha = clamp(particle.life / particle.maxLife, 0, 1);
      context.globalAlpha = alpha;
      context.fillStyle = particle.color;
      context.beginPath();
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fill();
      context.globalAlpha = 1;
    }

    if (state.player) {
      if (state.player.dashTrail > 0) {
        context.globalAlpha = state.player.dashTrail * 0.4;
        context.fillStyle = "#ffd166";
        context.beginPath();
        context.arc(state.player.x, state.player.y, 18, 0, Math.PI * 2);
        context.fill();
        context.globalAlpha = 1;
      }

      const ascensionProfile =
        state.player.wave6AscensionSurgeTime > 0 ? getWave6AscensionProfile() : null;
      if (ascensionProfile) {
        const surgeRadius =
          state.player.radius + 20 + Math.sin(performance.now() * 0.024) * 2 + state.player.wave6AscensionSurgeTime;
        context.globalAlpha = 0.68;
        context.strokeStyle = ascensionProfile.color;
        context.lineWidth = 4;
        context.beginPath();
        context.arc(state.player.x, state.player.y, surgeRadius, 0, Math.PI * 2);
        context.stroke();
        context.globalAlpha = 1;
      }

      if (state.player.chassisVectorTime > 0) {
        context.strokeStyle = "rgba(138, 231, 255, 0.65)";
        context.lineWidth = 3;
        context.beginPath();
        context.arc(
          state.player.x,
          state.player.y,
          state.player.radius + 16 + Math.sin(performance.now() * 0.03) * 2,
          0,
          Math.PI * 2
        );
        context.stroke();
      }

      if (state.player.chassisAnchorActiveTime > 0) {
        context.strokeStyle = "rgba(255, 213, 159, 0.7)";
        context.lineWidth = 4;
        context.beginPath();
        context.arc(state.player.x, state.player.y, state.player.radius + 18, 0, Math.PI * 2);
        context.stroke();
      } else if (state.player.chassisAnchorCharge > 0.08) {
        context.strokeStyle = "rgba(255, 213, 159, 0.38)";
        context.lineWidth = 2;
        context.beginPath();
        context.arc(
          state.player.x,
          state.player.y,
          state.player.radius + 14,
          -Math.PI / 2,
          -Math.PI / 2 + Math.PI * 2 * state.player.chassisAnchorCharge
        );
        context.stroke();
      }

      if (state.player.chassisSalvageBurstTime > 0) {
        context.strokeStyle = "rgba(159, 255, 207, 0.62)";
        context.lineWidth = 3;
        context.beginPath();
        context.arc(
          state.player.x,
          state.player.y,
          state.player.radius + 12 + Math.sin(performance.now() * 0.02) * 1.5,
          0,
          Math.PI * 2
        );
        context.stroke();
      }

      if (state.player.overdriveActiveTime > 0) {
        context.strokeStyle = "rgba(125, 208, 197, 0.55)";
        context.lineWidth = 4;
        context.beginPath();
        context.arc(
          state.player.x,
          state.player.y,
          state.player.radius + 14 + Math.sin(performance.now() * 0.02) * 2,
          0,
          Math.PI * 2
        );
        context.stroke();
      }

      context.fillStyle =
        state.player.invulnerableTime > 0 ? "#fff0c9" : state.weapon.color;
      drawPlayerWave6AscensionFrame(context);
      drawPlayerChassisFrame(context);
      drawPlayerDoctrineFrame(context);
      drawPlayerLateFieldMutationFrame(context);
      drawPlayerLateFieldConvergenceFrame(context);
      drawPlayerLateFieldAegisFrame(context);
      drawPlayerDoctrineCapstoneFrame(context);
      drawPlayerLateAscensionFrame(context);
      drawPlayerAfterburnOverdriveFrame(context);
      drawPlayerAfterburnDominionFrame(context);
      drawPlayerRiskMutationFrame(context);
      drawPlayerApexFrame(context);
      drawPlayerIllegalOverclockFrame(context);
      context.beginPath();
      context.arc(state.player.x, state.player.y, state.player.radius, 0, Math.PI * 2);
      context.fill();

      context.strokeStyle = state.player.overheated ? "#ff5a4d" : "#ffe3a4";
      context.lineWidth = 3;
      context.beginPath();
      context.arc(
        state.player.x,
        state.player.y,
        state.player.radius + 8,
        state.player.facing - 0.6,
        state.player.facing + 0.6
      );
      context.stroke();

      context.strokeStyle = "rgba(255,255,255,0.12)";
      context.beginPath();
      context.arc(
        state.player.x,
        state.player.y,
        state.player.pickupRadius,
        0,
        Math.PI * 2
      );
      context.stroke();
    }

    if (input.pointer.inside) {
      context.strokeStyle = "rgba(255,255,255,0.6)";
      context.lineWidth = 1.5;
      context.beginPath();
      context.arc(input.pointer.x, input.pointer.y, 10, 0, Math.PI * 2);
      context.stroke();
      context.beginPath();
      context.moveTo(input.pointer.x - 14, input.pointer.y);
      context.lineTo(input.pointer.x + 14, input.pointer.y);
      context.moveTo(input.pointer.x, input.pointer.y - 14);
      context.lineTo(input.pointer.x, input.pointer.y + 14);
      context.stroke();
    }

    context.restore();
  }

  function drawPlayerChassisFrame(context) {
    const chassis = getChassisBreakpointDef(state.build);
    if (!state.player || !chassis) {
      return;
    }
    const facing = state.player.facing || 0;
    if (chassis.id === "vector_thrusters") {
      [-1, 1].forEach((direction) => {
        const pod = getOffsetPoint(state.player.x, state.player.y, facing, 4, 15 * direction);
        context.fillStyle =
          state.player.chassisVectorTime > 0 ? "rgba(138, 231, 255, 0.92)" : "rgba(79, 155, 176, 0.82)";
        context.beginPath();
        context.moveTo(pod.x + Math.cos(facing) * 8, pod.y + Math.sin(facing) * 8);
        context.lineTo(
          pod.x - Math.cos(facing) * 5 - Math.sin(facing) * 4 * direction,
          pod.y - Math.sin(facing) * 5 + Math.cos(facing) * 4 * direction
        );
        context.lineTo(
          pod.x - Math.cos(facing) * 5 + Math.sin(facing) * 4 * direction,
          pod.y - Math.sin(facing) * 5 - Math.cos(facing) * 4 * direction
        );
        context.closePath();
        context.fill();
      });
      return;
    }

    if (chassis.id === "bulwark_treads") {
      [-1, 0, 1].forEach((lane) => {
        const barrel = getOffsetPoint(state.player.x, state.player.y, facing, 10, lane * 8);
        context.fillStyle =
          state.player.chassisAnchorActiveTime > 0 ? "rgba(255, 240, 201, 0.96)" : "rgba(176, 144, 99, 0.86)";
        context.fillRect(
          barrel.x - 3 - Math.sin(facing) * 2,
          barrel.y - 3 + Math.cos(facing) * 2,
          6,
          6
        );
      });
      return;
    }

    if (chassis.id === "salvage_winch") {
      [-1, 1].forEach((direction) => {
        const fork = getOffsetPoint(state.player.x, state.player.y, facing, 8, 13 * direction);
        context.strokeStyle =
          state.player.chassisSalvageBurstTime > 0 ? "rgba(159, 255, 207, 0.95)" : "rgba(90, 176, 138, 0.84)";
        context.lineWidth = 2.5;
        context.beginPath();
        context.moveTo(state.player.x + Math.cos(facing) * 4, state.player.y + Math.sin(facing) * 4);
        context.lineTo(fork.x, fork.y);
        context.lineTo(
          fork.x + Math.cos(facing + 0.18 * direction) * 8,
          fork.y + Math.sin(facing + 0.18 * direction) * 8
        );
        context.stroke();
      });
    }
  }

  function drawPlayerWave6AscensionFrame(context) {
    const profile = getWave6AscensionProfile();
    if (!state.player || !profile) {
      return;
    }
    const facing = state.player.facing || 0;

    if (profile.id === "mirror_hunt") {
      [-1, 1].forEach((direction) => {
        const wingRoot = getOffsetPoint(state.player.x, state.player.y, facing, 2, 18 * direction);
        const wingTip = getOffsetPoint(state.player.x, state.player.y, facing, 20, 26 * direction);
        context.fillStyle = "rgba(159, 231, 255, 0.28)";
        context.beginPath();
        context.moveTo(wingRoot.x, wingRoot.y);
        context.lineTo(wingTip.x, wingTip.y);
        context.lineTo(
          wingRoot.x - Math.cos(facing) * 8 + Math.sin(facing) * 5 * direction,
          wingRoot.y - Math.sin(facing) * 8 - Math.cos(facing) * 5 * direction
        );
        context.closePath();
        context.fill();
      });
      context.strokeStyle = "rgba(216, 251, 255, 0.84)";
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(
        state.player.x + Math.cos(facing) * 10,
        state.player.y + Math.sin(facing) * 10
      );
      context.lineTo(
        state.player.x + Math.cos(facing) * 24,
        state.player.y + Math.sin(facing) * 24
      );
      context.stroke();
      return;
    }

    if (profile.id === "kiln_bastion") {
      [-1, 1].forEach((direction) => {
        const furnace = getOffsetPoint(state.player.x, state.player.y, facing, -2, 16 * direction);
        context.fillStyle = "rgba(255, 179, 107, 0.3)";
        context.beginPath();
        context.arc(furnace.x, furnace.y, 8, 0, Math.PI * 2);
        context.fill();
      });
      context.strokeStyle = "rgba(255, 214, 168, 0.82)";
      context.lineWidth = 2.4;
      context.beginPath();
      context.arc(
        state.player.x + Math.cos(facing) * 8,
        state.player.y + Math.sin(facing) * 8,
        state.player.radius + 4,
        facing - 0.72,
        facing + 0.72
      );
      context.stroke();
      return;
    }

    if (profile.id === "storm_artillery") {
      [-1, 0, 1].forEach((lane) => {
        const barrel = getOffsetPoint(state.player.x, state.player.y, facing, 18, lane * 10);
        context.fillStyle = "rgba(255, 240, 201, 0.78)";
        context.fillRect(
          barrel.x - 3 - Math.sin(facing) * 4,
          barrel.y - 3 + Math.cos(facing) * 4,
          6,
          12
        );
      });
      context.strokeStyle = "rgba(255, 224, 175, 0.68)";
      context.lineWidth = 2;
      context.beginPath();
      context.arc(state.player.x, state.player.y, state.player.radius + 14, 0, Math.PI * 2);
      context.stroke();
    }
  }

  function drawPlayerApexFrame(context) {
    if (!state.player || getApexMutationLevel(state.build) <= 0) {
      return;
    }
    const level = getApexMutationLevel(state.build);
    const facing = state.player.facing || 0;
    const laneOffsets =
      level >= 3 ? [-1.4, -0.7, 0.7, 1.4] : level === 2 ? [-1.1, -0.5, 0.5, 1.1] : [-0.8, 0.8];
    laneOffsets.forEach((lane) => {
      const fin = getOffsetPoint(state.player.x, state.player.y, facing, -2, 15 * lane);
      context.strokeStyle = "rgba(255, 191, 114, 0.86)";
      context.lineWidth = 2.2;
      context.beginPath();
      context.moveTo(fin.x, fin.y);
      context.lineTo(
        fin.x - Math.cos(facing) * (8 + level * 1.5),
        fin.y - Math.sin(facing) * (8 + level * 1.5)
      );
      context.stroke();
    });
    context.strokeStyle = "rgba(255, 223, 186, 0.7)";
    context.lineWidth = 2;
    context.beginPath();
    context.arc(state.player.x, state.player.y, state.player.radius + 11 + level * 1.5, 0, Math.PI * 2);
    context.stroke();
  }

  function drawPlayerDoctrineFrame(context) {
    if (!state.player || !state.build || state.build.doctrineCapstoneId) {
      return;
    }
    const bodyForm = getDoctrineBodyForm(state.build);
    if (!bodyForm) {
      return;
    }
    const facing = state.player.facing || 0;
    if (bodyForm.doctrineId === "mirror_hunt") {
      const lanes = bodyForm.stage >= 2 ? [-1.2, -0.55, 0.55, 1.2] : [-0.95, 0.95];
      lanes.forEach((lane) => {
        const fin = getOffsetPoint(state.player.x, state.player.y, facing, -2, 15 * lane);
        context.fillStyle = "rgba(210, 244, 255, 0.72)";
        context.beginPath();
        context.moveTo(
          fin.x + Math.cos(facing) * (bodyForm.stage >= 2 ? 10 : 8),
          fin.y + Math.sin(facing) * (bodyForm.stage >= 2 ? 10 : 8)
        );
        context.lineTo(
          fin.x - Math.cos(facing) * (bodyForm.stage >= 2 ? 6 : 5) - Math.sin(facing) * 7 * Math.sign(lane || 1),
          fin.y - Math.sin(facing) * (bodyForm.stage >= 2 ? 6 : 5) + Math.cos(facing) * 7 * Math.sign(lane || 1)
        );
        context.lineTo(
          fin.x - Math.cos(facing) * (bodyForm.stage >= 2 ? 11 : 8.5) + Math.sin(facing) * 5 * Math.sign(lane || 1),
          fin.y - Math.sin(facing) * (bodyForm.stage >= 2 ? 11 : 8.5) - Math.cos(facing) * 5 * Math.sign(lane || 1)
        );
        context.closePath();
        context.fill();
      });
      context.strokeStyle = "rgba(231, 250, 255, 0.68)";
      context.lineWidth = 2;
      context.beginPath();
      context.arc(state.player.x, state.player.y, state.player.radius + (bodyForm.stage >= 2 ? 12 : 9), 0, Math.PI * 2);
      context.stroke();
      return;
    }
    if (bodyForm.doctrineId === "kiln_bastion") {
      [-1, 1].forEach((direction) => {
        const shoulder = getOffsetPoint(
          state.player.x,
          state.player.y,
          facing,
          -3,
          (bodyForm.stage >= 2 ? 18 : 15) * direction
        );
        context.fillStyle = "rgba(255, 201, 142, 0.78)";
        context.fillRect(
          shoulder.x - (bodyForm.stage >= 2 ? 4 : 3.6) - Math.sin(facing) * 4,
          shoulder.y - (bodyForm.stage >= 2 ? 4 : 3.6) + Math.cos(facing) * 4,
          bodyForm.stage >= 2 ? 8 : 7.2,
          bodyForm.stage >= 2 ? 11 : 9.4
        );
      });
      const prow = getOffsetPoint(state.player.x, state.player.y, facing, bodyForm.stage >= 2 ? 13 : 11, 0);
      context.strokeStyle = "rgba(255, 229, 192, 0.72)";
      context.lineWidth = 2.4;
      context.beginPath();
      context.moveTo(
        prow.x - Math.sin(facing) * (bodyForm.stage >= 2 ? 8 : 6.5),
        prow.y + Math.cos(facing) * (bodyForm.stage >= 2 ? 8 : 6.5)
      );
      context.lineTo(
        prow.x + Math.cos(facing) * (bodyForm.stage >= 2 ? 10 : 8),
        prow.y + Math.sin(facing) * (bodyForm.stage >= 2 ? 10 : 8)
      );
      context.lineTo(
        prow.x + Math.sin(facing) * (bodyForm.stage >= 2 ? 8 : 6.5),
        prow.y - Math.cos(facing) * (bodyForm.stage >= 2 ? 8 : 6.5)
      );
      context.stroke();
      context.beginPath();
      context.arc(state.player.x, state.player.y, state.player.radius + (bodyForm.stage >= 2 ? 12 : 9), 0, Math.PI * 2);
      context.stroke();
      return;
    }
    if (bodyForm.doctrineId === "storm_artillery") {
      const lanes = bodyForm.stage >= 2 ? [-1.2, -0.4, 0.4, 1.2] : [-0.8, 0, 0.8];
      lanes.forEach((lane) => {
        const barrel = getOffsetPoint(
          state.player.x,
          state.player.y,
          facing,
          bodyForm.stage >= 2 ? 12 : 10,
          lane * (bodyForm.stage >= 2 ? 10 : 9)
        );
        context.fillStyle = "rgba(241, 251, 255, 0.8)";
        context.fillRect(
          barrel.x - (bodyForm.stage >= 2 ? 2.5 : 2.2) - Math.sin(facing) * 5,
          barrel.y - (bodyForm.stage >= 2 ? 2.5 : 2.2) + Math.cos(facing) * 5,
          bodyForm.stage >= 2 ? 5 : 4.4,
          bodyForm.stage >= 2 ? 13 : 10.5
        );
      });
      context.strokeStyle = "rgba(255, 243, 214, 0.7)";
      context.lineWidth = 2;
      context.beginPath();
      context.arc(state.player.x, state.player.y, state.player.radius + (bodyForm.stage >= 2 ? 11 : 9), 0, Math.PI * 2);
      context.stroke();
    }
  }

  function drawPlayerDoctrineCapstoneFrame(context) {
    if (!state.player || !state.build || !state.build.doctrineCapstoneId) {
      return;
    }
    const capstone = getDoctrineCapstoneDef(state.build);
    if (!capstone) {
      return;
    }
    const facing = state.player.facing || 0;
    if (capstone.id === "relay_storm_lattice") {
      [-1.5, -0.9, -0.35, 0.35, 0.9, 1.5].forEach((lane) => {
        const wing = getOffsetPoint(state.player.x, state.player.y, facing, -2, 15 * lane);
        context.fillStyle = "rgba(199, 251, 255, 0.82)";
        context.beginPath();
        context.moveTo(
          wing.x + Math.cos(facing) * 11,
          wing.y + Math.sin(facing) * 11
        );
        context.lineTo(
          wing.x - Math.cos(facing) * 5 - Math.sin(facing) * 6 * Math.sign(lane || 1),
          wing.y - Math.sin(facing) * 5 + Math.cos(facing) * 6 * Math.sign(lane || 1)
        );
        context.lineTo(
          wing.x - Math.cos(facing) * 11 + Math.sin(facing) * 6 * Math.sign(lane || 1),
          wing.y - Math.sin(facing) * 11 - Math.cos(facing) * 6 * Math.sign(lane || 1)
        );
        context.closePath();
        context.fill();
      });
      context.strokeStyle = "rgba(237, 254, 255, 0.74)";
      context.lineWidth = 2;
      context.beginPath();
      context.arc(state.player.x, state.player.y, state.player.radius + 14, 0, Math.PI * 2);
      context.stroke();
      return;
    }
    if (capstone.id === "bulwark_foundry") {
      [-1, 1].forEach((direction) => {
        const coil = getOffsetPoint(state.player.x, state.player.y, facing, -5, 18 * direction);
        context.strokeStyle = "rgba(255, 209, 152, 0.82)";
        context.lineWidth = 2.4;
        context.beginPath();
        context.arc(coil.x, coil.y, 8, 0, Math.PI * 2);
        context.stroke();
      });
      context.strokeStyle = "rgba(255, 234, 195, 0.72)";
      context.lineWidth = 2.6;
      context.beginPath();
      context.arc(state.player.x, state.player.y, state.player.radius + 15, 0, Math.PI * 2);
      context.stroke();
      return;
    }
    if (capstone.id === "sky_lance_battery") {
      [-2, -1, 1, 2].forEach((lane) => {
        const barrel = getOffsetPoint(state.player.x, state.player.y, facing, 16, lane * 8);
        context.fillStyle = "rgba(255, 248, 224, 0.82)";
        context.fillRect(
          barrel.x - 3 - Math.sin(facing) * 5,
          barrel.y - 3 + Math.cos(facing) * 5,
          6,
          14
        );
      });
      context.strokeStyle = "rgba(255, 238, 204, 0.68)";
      context.lineWidth = 2.2;
      context.beginPath();
      context.arc(state.player.x, state.player.y, state.player.radius + 15, 0, Math.PI * 2);
      context.stroke();
      return;
    }
    if (capstone.id === "stormspire_needle") {
      [-0.55, 0, 0.55].forEach((lane) => {
        const spine = getOffsetPoint(state.player.x, state.player.y, facing, 6, 18 * lane);
        context.strokeStyle = "rgba(255, 241, 214, 0.86)";
        context.lineWidth = 2.6;
        context.beginPath();
        context.moveTo(
          spine.x - Math.cos(facing) * 4,
          spine.y - Math.sin(facing) * 4
        );
        context.lineTo(
          spine.x + Math.cos(facing) * 16,
          spine.y + Math.sin(facing) * 16
        );
        context.stroke();
      });
      context.strokeStyle = "rgba(255, 228, 178, 0.72)";
      context.lineWidth = 2;
      context.beginPath();
      context.arc(state.player.x, state.player.y, state.player.radius + 13, 0, Math.PI * 2);
      context.stroke();
    }
  }

  function drawPlayerRiskMutationFrame(context) {
    if (!state.player || !state.weapon || !state.weapon.riskMutationLevel) {
      return;
    }
    const mutation = getRiskMutationCoreDef(state.build);
    const facing = state.player.facing || 0;
    const shardLanes = getRiskMutationOffsets(state.weapon.riskMutationLevel);
    shardLanes.forEach((offset, index) => {
      const fin = getOffsetPoint(
        state.player.x,
        state.player.y,
        facing,
        -2,
        offset * 28
      );
      const length = 10 + state.weapon.riskMutationLevel * 1.4 - index * 0.35;
      context.strokeStyle = mutation.color;
      context.lineWidth = 1.8;
      context.beginPath();
      context.moveTo(
        fin.x - Math.cos(facing) * 4,
        fin.y - Math.sin(facing) * 4
      );
      context.lineTo(
        fin.x + Math.cos(facing) * length,
        fin.y + Math.sin(facing) * length
      );
      context.stroke();
    });
    context.strokeStyle = "rgba(255, 226, 166, 0.78)";
    context.lineWidth = 2;
    context.beginPath();
    context.arc(
      state.player.x,
      state.player.y,
      state.player.radius + 10 + Math.sin(performance.now() * 0.02) * 1.4,
      0,
      Math.PI * 2
    );
    context.stroke();
  }

  function drawPlayerLateFieldMutationFrame(context) {
    if (!state.player || !state.weapon || !state.weapon.lateFieldMutationLevel) {
      return;
    }
    const facing = state.player.facing || 0;
    const level = state.weapon.lateFieldMutationLevel;
    const finCount = Math.min(8, 2 + level);
    const half = (finCount - 1) / 2;
    const broadside = state.weapon.lateFieldBroadsideConfig;
    const broadsideReady =
      broadside && broadside.cooldown > 0
        ? 1 - clamp((state.player.lateFieldBroadsideCooldown || 0) / broadside.cooldown, 0, 1)
        : 0;
    for (let index = 0; index < finCount; index += 1) {
      const fin = getOffsetPoint(state.player.x, state.player.y, facing, 3, (index - half) * 11);
      context.strokeStyle = `rgba(255, 225, 172, ${0.86 - index * 0.06})`;
      context.lineWidth = 2.2;
      context.beginPath();
      context.moveTo(
        fin.x - Math.cos(facing) * 4,
        fin.y - Math.sin(facing) * 4
      );
      context.lineTo(
        fin.x + Math.cos(facing) * (12 + level * 1.5),
        fin.y + Math.sin(facing) * (12 + level * 1.5)
      );
      context.stroke();
    }
    if (state.weapon.lateBreakCataclysmFirePattern) {
      const cataclysmLanes = state.weapon.lateBreakCataclysmFirePattern.offsets || [];
      cataclysmLanes.forEach((offset, index) => {
        const lane = getOffsetPoint(
          state.player.x,
          state.player.y,
          facing,
          state.player.radius + 6,
          offset * 34
        );
        if (state.weapon.core.id === "lance") {
          context.fillStyle = `rgba(255, 240, 201, ${0.82 - index * 0.08})`;
          context.fillRect(
            lane.x - 2.8 - Math.sin(facing) * 6,
            lane.y - 2.8 + Math.cos(facing) * 6,
            5.6,
            14 + level
          );
          return;
        }
        if (state.weapon.core.id === "ricochet") {
          context.strokeStyle = `rgba(255, 238, 194, ${0.84 - index * 0.08})`;
          context.lineWidth = 2;
          context.beginPath();
          context.arc(lane.x, lane.y, 4.5 + level * 0.25, 0, Math.PI * 2);
          context.stroke();
          return;
        }
        context.fillStyle = `rgba(255, 240, 201, ${0.8 - index * 0.06})`;
        context.beginPath();
        context.moveTo(
          lane.x + Math.cos(facing) * (12 + level * 1.2),
          lane.y + Math.sin(facing) * (12 + level * 1.2)
        );
        context.lineTo(
          lane.x - Math.cos(facing) * 4 - Math.sin(facing) * 4 * Math.sign(offset || 1),
          lane.y - Math.sin(facing) * 4 + Math.cos(facing) * 4 * Math.sign(offset || 1)
        );
        context.lineTo(
          lane.x - Math.cos(facing) * 9 + Math.sin(facing) * 4 * Math.sign(offset || 1),
          lane.y - Math.sin(facing) * 9 - Math.cos(facing) * 4 * Math.sign(offset || 1)
        );
        context.closePath();
        context.fill();
      });
      context.strokeStyle = "rgba(255, 244, 214, 0.76)";
      context.lineWidth = 2.2;
      context.beginPath();
      context.arc(
        state.player.x,
        state.player.y,
        state.player.radius + 18 + Math.sin(performance.now() * 0.022) * 1.4,
        facing - 0.92,
        facing + 0.92
      );
      context.stroke();
    }
    if (broadside) {
      [-1, 1].forEach((side) => {
        for (let podIndex = 0; podIndex < broadside.podCount; podIndex += 1) {
          const lane = podIndex - (broadside.podCount - 1) / 2;
          const pod = getOffsetPoint(
            state.player.x,
            state.player.y,
            facing,
            1,
            side * (state.player.radius + 12 + lane * 11)
          );
          context.fillStyle = `rgba(255, 235, 188, ${0.28 + broadsideReady * 0.44})`;
          context.beginPath();
          context.arc(pod.x, pod.y, 2.6 + broadsideReady * 0.7, 0, Math.PI * 2);
          context.fill();
        }
      });
      context.strokeStyle = `rgba(255, 232, 194, ${0.2 + broadsideReady * 0.5})`;
      context.lineWidth = 1.8;
      context.beginPath();
      context.arc(
        state.player.x,
        state.player.y,
        state.player.radius + 15 + Math.sin(performance.now() * 0.018) * (0.7 + broadsideReady),
        0,
        Math.PI * 2
      );
      context.stroke();
    }
  }

  function drawPlayerLateFieldConvergenceFrame(context) {
    if (!state.player || !state.weapon || !state.weapon.lateFieldConvergenceId) {
      return;
    }
    const convergence = getLateFieldConvergenceDef(state.weapon.lateFieldConvergenceId);
    if (!convergence) {
      return;
    }
    const facing = state.player.facing || 0;
    const pulse = Math.sin(performance.now() * 0.018) * 1.3;
    if (convergence.id === "slipstream_talons") {
      [-1.25, -0.65, 0.65, 1.25].forEach((lane) => {
        const wing = getOffsetPoint(state.player.x, state.player.y, facing, 1, 16 * lane);
        context.strokeStyle = "rgba(159, 231, 255, 0.82)";
        context.lineWidth = 2.1;
        context.beginPath();
        context.moveTo(wing.x - Math.cos(facing) * 3, wing.y - Math.sin(facing) * 3);
        context.lineTo(
          wing.x + Math.cos(facing) * (12 + pulse),
          wing.y + Math.sin(facing) * (12 + pulse)
        );
        context.stroke();
      });
      return;
    }
    if (convergence.id === "citadel_spindle") {
      context.strokeStyle = "rgba(255, 240, 201, 0.74)";
      context.lineWidth = 2.4;
      context.beginPath();
      context.arc(
        state.player.x,
        state.player.y,
        state.player.radius + 16 + pulse,
        facing - 0.62,
        facing + 0.62
      );
      context.stroke();
      [-0.4, 0, 0.4].forEach((lane) => {
        const barrel = getOffsetPoint(state.player.x, state.player.y, facing, 14, lane * 16);
        context.fillStyle = "rgba(255, 224, 175, 0.82)";
        context.fillRect(
          barrel.x - 2.8 - Math.sin(facing) * 3,
          barrel.y - 2.8 + Math.cos(facing) * 3,
          5.6,
          10
        );
      });
      return;
    }
    if (convergence.id === "towchain_reaver") {
      [-1, 1].forEach((direction) => {
        const fork = getOffsetPoint(state.player.x, state.player.y, facing, 10, 15 * direction);
        context.strokeStyle = "rgba(159, 255, 207, 0.84)";
        context.lineWidth = 2.4;
        context.beginPath();
        context.moveTo(state.player.x, state.player.y);
        context.lineTo(fork.x, fork.y);
        context.lineTo(
          fork.x + Math.cos(facing + direction * 0.22) * (9 + pulse),
          fork.y + Math.sin(facing + direction * 0.22) * (9 + pulse)
        );
        context.stroke();
      });
    }
  }

  function drawPlayerLateFieldAegisFrame(context) {
    if (!state.player) {
      return;
    }
    const level = getLateFieldAegisLevel(state.build);
    if (level <= 0) {
      return;
    }
    const charges = Math.max(0, state.player.fieldAegisCharge || 0);
    const pulse = Math.sin(performance.now() * 0.014) * 1.5;
    for (let index = 0; index < Math.max(1, charges); index += 1) {
      context.strokeStyle = `rgba(139, 240, 255, ${charges > 0 ? 0.75 - index * 0.12 : 0.26})`;
      context.lineWidth = 2.4;
      context.beginPath();
      context.arc(
        state.player.x,
        state.player.y,
        state.player.radius + 14 + level * 2 + index * 6 + pulse,
        index * 0.5,
        index * 0.5 + Math.PI * 1.35
      );
      context.stroke();
    }
  }

  function drawPlayerLateAscensionFrame(context) {
    if (!state.player || !state.weapon || !state.weapon.lateAscensionId) {
      return;
    }
    const facing = state.player.facing || 0;
    const supportLevel = getLateAscensionSupportLevel(state.build);
    if (state.weapon.lateAscensionId === "crownsplitter_array") {
      const wingLanes =
        supportLevel >= 3
          ? [-1.95, -1.45, -0.9, -0.35, 0.35, 0.9, 1.45, 1.95]
          : supportLevel >= 2
            ? [-1.55, -0.9, -0.35, 0.35, 0.9, 1.55]
            : [-1.3, -0.75, -0.28, 0.28, 0.75, 1.3];
      wingLanes.forEach((lane) => {
        const wing = getOffsetPoint(state.player.x, state.player.y, facing, 5, 17 * lane);
        context.fillStyle = "rgba(159, 231, 255, 0.9)";
        context.beginPath();
        context.moveTo(wing.x + Math.cos(facing) * 9, wing.y + Math.sin(facing) * 9);
        context.lineTo(
          wing.x - Math.cos(facing) * 5 - Math.sin(facing) * 5 * Math.sign(lane || 1),
          wing.y - Math.sin(facing) * 5 + Math.cos(facing) * 5 * Math.sign(lane || 1)
        );
        context.lineTo(
          wing.x - Math.cos(facing) * 8 + Math.sin(facing) * 5 * Math.sign(lane || 1),
          wing.y - Math.sin(facing) * 8 - Math.cos(facing) * 5 * Math.sign(lane || 1)
        );
        context.closePath();
        context.fill();
      });
      context.strokeStyle = "rgba(214, 246, 255, 0.72)";
      context.lineWidth = 2;
      context.beginPath();
      context.arc(state.player.x, state.player.y, state.player.radius + 12 + supportLevel, 0, Math.PI * 2);
      context.stroke();
      return;
    }
    if (state.weapon.lateAscensionId === "slagburst_drive") {
      const coilCount = 3 + Math.max(0, supportLevel - 1);
      for (let index = 0; index < coilCount; index += 1) {
        const angle = facing + Math.PI + ((index / Math.max(1, coilCount - 1)) * 2 - 1) * 0.45;
        context.strokeStyle = `rgba(255, 180, 116, ${0.8 - index * 0.08})`;
        context.lineWidth = 2.4;
        context.beginPath();
        context.moveTo(
          state.player.x + Math.cos(angle) * (state.player.radius + 2),
          state.player.y + Math.sin(angle) * (state.player.radius + 2)
        );
        context.lineTo(
          state.player.x + Math.cos(angle) * (state.player.radius + 14 + supportLevel * 1.8),
          state.player.y + Math.sin(angle) * (state.player.radius + 14 + supportLevel * 1.8)
        );
        context.stroke();
      }
      context.strokeStyle = "rgba(255, 214, 156, 0.68)";
      context.lineWidth = 2.4;
      context.beginPath();
      context.arc(
        state.player.x,
        state.player.y,
        state.player.radius + 11 + Math.sin(performance.now() * 0.018) * 1.4,
        0,
        Math.PI * 2
      );
      context.stroke();
      return;
    }
    if (state.weapon.lateAscensionId === "voltspine_lattice") {
      const spineCount = 5 + supportLevel;
      for (let index = 0; index < spineCount; index += 1) {
        const lateral = ((index / Math.max(1, spineCount - 1)) * 2 - 1) * 11;
        const base = getOffsetPoint(state.player.x, state.player.y, facing + Math.PI / 2, 0, lateral);
        const tip = getOffsetPoint(base.x, base.y, facing - 0.1 * Math.sign(lateral || 1), state.player.radius + 13 + supportLevel * 1.5, 0);
        context.strokeStyle = `rgba(149, 184, 255, ${0.86 - index * 0.08})`;
        context.lineWidth = 2.2;
        context.beginPath();
        context.moveTo(base.x, base.y);
        context.lineTo(tip.x, tip.y);
        context.stroke();
      }
      context.strokeStyle = "rgba(220, 229, 255, 0.72)";
      context.lineWidth = 2;
      context.beginPath();
      context.arc(
        state.player.x,
        state.player.y,
        state.player.radius + 10 + pulse,
        facing - 0.42,
        facing + 0.42
      );
      context.stroke();
      return;
    }
    if (state.weapon.lateAscensionId === "anvil_prism") {
      const ramLanes =
        supportLevel >= 3
          ? [-1.35, -0.7, -0.2, 0.2, 0.7, 1.35]
          : supportLevel >= 2
            ? [-1.05, -0.45, 0, 0.45, 1.05]
            : [-0.82, -0.28, 0.28, 0.82];
      ramLanes.forEach((lane, index) => {
        const ram = getOffsetPoint(state.player.x, state.player.y, facing, state.player.radius + 3, lane * 8);
        context.fillStyle = `rgba(255, 141, 115, ${0.88 - index * 0.12})`;
        context.beginPath();
        context.moveTo(ram.x + Math.cos(facing) * (12 + pulse), ram.y + Math.sin(facing) * (12 + pulse));
        context.lineTo(
          ram.x - Math.cos(facing) * 3 - Math.sin(facing) * 4 * Math.sign(lane || 1),
          ram.y - Math.sin(facing) * 3 + Math.cos(facing) * 4 * Math.sign(lane || 1)
        );
        context.lineTo(
          ram.x - Math.cos(facing) * 7 + Math.sin(facing) * 4 * Math.sign(lane || 1),
          ram.y - Math.sin(facing) * 7 - Math.cos(facing) * 4 * Math.sign(lane || 1)
        );
        context.closePath();
        context.fill();
      });
      context.strokeStyle = "rgba(255, 228, 208, 0.68)";
      context.lineWidth = 2.2;
      context.beginPath();
      context.arc(state.player.x, state.player.y, state.player.radius + 9 + pulse * 0.8, 0, Math.PI * 2);
      context.stroke();
    }
  }

  function drawPlayerAfterburnOverdriveFrame(context) {
    if (!state.player || !state.weapon || !state.weapon.afterburnOverdriveId) {
      return;
    }
    const overdrive = getAfterburnOverdriveDef(state.weapon.afterburnOverdriveId);
    if (!overdrive) {
      return;
    }
    const facing = state.player.facing || 0;
    const pulse = Math.sin(performance.now() * 0.016) * 1.5;
    if (overdrive.id === "cataclysm_crown") {
      [-1.3, -0.65, 0, 0.65, 1.3].forEach((lane, index) => {
        const crown = getOffsetPoint(state.player.x, state.player.y, facing, 6, lane * 12);
        context.strokeStyle = `rgba(255, 212, 163, ${0.82 - index * 0.08})`;
        context.lineWidth = 2.1;
        context.beginPath();
        context.moveTo(crown.x, crown.y);
        context.lineTo(
          crown.x + Math.cos(facing) * (10 + pulse),
          crown.y + Math.sin(facing) * (10 + pulse)
        );
        context.stroke();
      });
      context.strokeStyle = "rgba(255, 233, 206, 0.68)";
      context.lineWidth = 2.2;
      context.beginPath();
      context.arc(state.player.x, state.player.y, state.player.radius + 15 + pulse, 0, Math.PI * 2);
      context.stroke();
      return;
    }
    if (overdrive.id === "bastion_lattice") {
      context.strokeStyle = "rgba(223, 247, 255, 0.78)";
      context.lineWidth = 2.5;
      context.beginPath();
      context.arc(
        state.player.x,
        state.player.y,
        state.player.radius + 16 + pulse,
        facing - 0.7,
        facing + 0.7
      );
      context.stroke();
      [-0.28, 0, 0.28].forEach((lane) => {
        const prong = getOffsetPoint(state.player.x, state.player.y, facing, state.player.radius + 4, lane * 10);
        context.fillStyle = "rgba(199, 242, 255, 0.86)";
        context.beginPath();
        context.moveTo(prong.x + Math.cos(facing) * (11 + pulse), prong.y + Math.sin(facing) * (11 + pulse));
        context.lineTo(
          prong.x - Math.cos(facing) * 4 - Math.sin(facing) * 4 * Math.sign(lane || 1),
          prong.y - Math.sin(facing) * 4 + Math.cos(facing) * 4 * Math.sign(lane || 1)
        );
        context.lineTo(
          prong.x - Math.cos(facing) * 7 + Math.sin(facing) * 4 * Math.sign(lane || 1),
          prong.y - Math.sin(facing) * 7 - Math.cos(facing) * 4 * Math.sign(lane || 1)
        );
        context.closePath();
        context.fill();
      });
      return;
    }
    if (overdrive.id === "reaver_wake") {
      [-1, 1].forEach((direction, index) => {
        const wake = getOffsetPoint(state.player.x, state.player.y, facing + Math.PI, 5, direction * 12);
        context.strokeStyle = `rgba(159, 255, 210, ${0.82 - index * 0.1})`;
        context.lineWidth = 2.3;
        context.beginPath();
        context.moveTo(state.player.x, state.player.y);
        context.lineTo(wake.x, wake.y);
        context.lineTo(
          wake.x + Math.cos(facing + direction * 0.34) * (12 + pulse),
          wake.y + Math.sin(facing + direction * 0.34) * (12 + pulse)
        );
        context.stroke();
      });
      context.strokeStyle = "rgba(215, 255, 234, 0.62)";
      context.lineWidth = 2;
      context.beginPath();
      context.arc(state.player.x, state.player.y, state.player.radius + 11 + pulse * 0.6, 0, Math.PI * 2);
      context.stroke();
    }
  }

  function drawPlayerAfterburnDominionFrame(context) {
    if (!state.player || !state.weapon || !state.weapon.afterburnDominionId) {
      return;
    }
    const dominion = getAfterburnDominionDef(state.weapon.afterburnDominionId);
    if (!dominion) {
      return;
    }
    const facing = state.player.facing || 0;
    const pulse = Math.sin(performance.now() * 0.02) * 1.8;
    context.strokeStyle = "rgba(255, 246, 229, 0.72)";
    context.lineWidth = 2.4;
    context.beginPath();
    context.arc(state.player.x, state.player.y, state.player.radius + 17 + pulse, 0, Math.PI * 2);
    context.stroke();
    if (dominion.id === "lance") {
      [-0.42, 0, 0.42].forEach((lane) => {
        const rail = getOffsetPoint(state.player.x, state.player.y, facing, 7, lane * 16);
        context.strokeStyle = "rgba(180, 236, 255, 0.9)";
        context.lineWidth = 2.4;
        context.beginPath();
        context.moveTo(rail.x - Math.cos(facing) * 4, rail.y - Math.sin(facing) * 4);
        context.lineTo(
          rail.x + Math.cos(facing) * (16 + pulse),
          rail.y + Math.sin(facing) * (16 + pulse)
        );
        context.stroke();
      });
      return;
    }
    if (dominion.id === "ricochet") {
      [-1.2, 0, 1.2].forEach((lane) => {
        const lash = getOffsetPoint(state.player.x, state.player.y, facing, -2, lane * 14);
        context.strokeStyle = "rgba(162, 233, 219, 0.88)";
        context.lineWidth = 2.2;
        context.beginPath();
        context.moveTo(lash.x, lash.y);
        context.lineTo(
          lash.x + Math.cos(facing) * (10 + pulse),
          lash.y + Math.sin(facing) * (10 + pulse)
        );
        context.lineTo(
          lash.x + Math.cos(facing + 0.34 * Math.sign(lane || 1)) * (14 + pulse),
          lash.y + Math.sin(facing + 0.34 * Math.sign(lane || 1)) * (14 + pulse)
        );
        context.stroke();
      });
      return;
    }
    const lanes = dominion.id === "scatter" ? [-1.6, -0.8, 0, 0.8, 1.6] : [-1.4, -0.65, 0, 0.65, 1.4];
    lanes.forEach((lane, index) => {
      const fin = getOffsetPoint(state.player.x, state.player.y, facing, 5, lane * 12);
      context.fillStyle = `rgba(255, 221, 172, ${0.9 - index * 0.08})`;
      context.beginPath();
      context.moveTo(fin.x + Math.cos(facing) * (12 + pulse), fin.y + Math.sin(facing) * (12 + pulse));
      context.lineTo(
        fin.x - Math.cos(facing) * 4 - Math.sin(facing) * 4 * Math.sign(lane || 1),
        fin.y - Math.sin(facing) * 4 + Math.cos(facing) * 4 * Math.sign(lane || 1)
      );
      context.lineTo(
        fin.x - Math.cos(facing) * 8 + Math.sin(facing) * 4 * Math.sign(lane || 1),
        fin.y - Math.sin(facing) * 8 - Math.cos(facing) * 4 * Math.sign(lane || 1)
      );
      context.closePath();
      context.fill();
    });
  }

  function drawPlayerIllegalOverclockFrame(context) {
    if (!state.player || !state.weapon || !state.weapon.illegalOverclockId) {
      return;
    }
    const facing = state.player.facing || 0;
    const mutationLevel = getIllegalOverclockMutationLevel(state.build);
    if (state.weapon.illegalOverclockId === "glass_broadside") {
      const wingLanes =
        mutationLevel >= 3
          ? [-1.6, -1, -0.45, 0.45, 1, 1.6]
          : mutationLevel === 2
            ? [-1.3, -0.6, 0.6, 1.3]
            : mutationLevel === 1
              ? [-1, -0.45, 0.45, 1]
              : [-1, 1];
      wingLanes.forEach((lane) => {
        const wing = getOffsetPoint(state.player.x, state.player.y, facing, 2, 19 * lane);
        context.fillStyle = "rgba(143, 228, 255, 0.86)";
        context.beginPath();
        context.moveTo(wing.x + Math.cos(facing) * 10, wing.y + Math.sin(facing) * 10);
        context.lineTo(
          wing.x - Math.cos(facing) * 4 - Math.sin(facing) * 5 * Math.sign(lane || 1),
          wing.y - Math.sin(facing) * 4 + Math.cos(facing) * 5 * Math.sign(lane || 1)
        );
        context.lineTo(
          wing.x - Math.cos(facing) * 8 + Math.sin(facing) * 5 * Math.sign(lane || 1),
          wing.y - Math.sin(facing) * 8 - Math.cos(facing) * 5 * Math.sign(lane || 1)
        );
        context.closePath();
        context.fill();
      });
      return;
    }
    if (state.weapon.illegalOverclockId === "meltdown_cycler") {
      const ringCount = 1 + mutationLevel;
      for (let ringIndex = 0; ringIndex < ringCount; ringIndex += 1) {
        context.strokeStyle = `rgba(255, 159, 89, ${0.78 - ringIndex * 0.12})`;
        context.lineWidth = Math.max(1.3, 2.5 - ringIndex * 0.35);
        context.beginPath();
        context.arc(
          state.player.x,
          state.player.y,
          state.player.radius + 13 + ringIndex * 5 + Math.sin(performance.now() * 0.026 + ringIndex) * 1.2,
          0,
          Math.PI * 2
        );
        context.stroke();
      }
      return;
    }
    if (state.weapon.illegalOverclockId === "rupture_crown") {
      getRuptureCrownOffsets(mutationLevel).forEach((offset) => {
        const angle = facing + offset;
        context.strokeStyle = "rgba(255, 215, 166, 0.84)";
        context.lineWidth = 2.2;
        context.beginPath();
        context.moveTo(
          state.player.x + Math.cos(angle) * (state.player.radius + 2),
          state.player.y + Math.sin(angle) * (state.player.radius + 2)
        );
        context.lineTo(
          state.player.x + Math.cos(angle) * (state.player.radius + 12),
          state.player.y + Math.sin(angle) * (state.player.radius + 12)
        );
        context.stroke();
      });
    }
  }

  function tick(dt) {
    if (state.banner.time > 0) {
      state.banner.time -= dt;
      if (state.banner.time <= 0) {
        clearBanner();
      }
    }

    if (state.screen !== "game" || state.phase === "result") {
      return;
    }

    if (state.paused) {
      return;
    }

    if (state.phase === "wave") {
      updatePlayer(dt);
      updateSupportSystem(dt);
      maybeSpawnEnemies(dt);
      maybeSpawnHazards(dt);
      updateEnemies(dt);
      updateProjectiles(dt);
      updateSlagPools(dt);
      updateDrops(dt);
      updateHazards(dt);
      updateParticles(dt);
      maybeAdvancePhase(dt);
    } else if (state.phase === "forge") {
      state.player.heat = Math.max(0, state.player.heat - state.player.coolRate * dt * 1.4);
      updateParticles(dt);
    }

    updateHUD();
    renderGame();
  }

  function frame(time) {
    const dt = Math.min(0.033, (time - lastFrameTime) / 1000 || 0);
    lastFrameTime = time;
    tick(dt);
    requestAnimationFrame(frame);
  }

  function canvasPositionFromEvent(event) {
    const arena = getCurrentArenaSize();
    const rect = elements.canvas.getBoundingClientRect();
    const scaleX = arena.width / rect.width;
    const scaleY = arena.height / rect.height;
    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY,
    };
  }

  elements.startRun.addEventListener("pointerdown", () => {
    startRun();
  });

  elements.restartRun.addEventListener("pointerdown", () => {
    startRun();
  });

  if (elements.cycleSignature) {
    elements.cycleSignature.addEventListener("pointerdown", () => {
      const signatureIds = Object.keys(SIGNATURE_DEFS);
      const currentIndex = signatureIds.indexOf(selectedSignatureId);
      const nextSignatureId = signatureIds[(currentIndex + 1) % signatureIds.length];
      selectSignature(nextSignatureId);
    });
  }

  elements.backToTitle.addEventListener("pointerdown", () => {
    state = createAppState(selectedSignatureId);
    syncArenaCanvas();
    renderSignaturePicker();
    renderSignatureSpotlight();
    showScreen("title");
  });

  elements.resumeRun.addEventListener("pointerdown", () => {
    togglePause(false);
  });

  elements.pauseRestart.addEventListener("pointerdown", () => {
    startRun();
  });

  elements.pauseTitle.addEventListener("pointerdown", () => {
    state = createAppState(selectedSignatureId);
    syncArenaCanvas();
    renderSignaturePicker();
    renderSignatureSpotlight();
    showScreen("title");
  });

  elements.signatureCards.addEventListener("pointerdown", (event) => {
    const card = event.target.closest("[data-signature-id]");
    if (!card) {
      return;
    }
    selectSignature(card.dataset.signatureId);
  });

  elements.forgeCards.addEventListener("pointerdown", (event) => {
    const card = event.target.closest("[data-index]");
    if (!card) {
      return;
    }
    handleForgeSelection(Number(card.dataset.index));
  });

  elements.canvas.addEventListener("pointermove", (event) => {
    input.pointer = {
      ...canvasPositionFromEvent(event),
      inside: true,
    };
  });

  elements.canvas.addEventListener("pointerleave", () => {
    input.pointer.inside = false;
  });

  document.addEventListener("keydown", (event) => {
    if ((event.code === "Escape" || event.code === "KeyP") && state.screen === "game") {
      event.preventDefault();
      togglePause();
      return;
    }
    if (event.code === "Space") {
      event.preventDefault();
      if (!event.repeat) {
        dashPlayer();
      }
    }
    if (event.code === "Tab") {
      event.preventDefault();
      state.hudInspect = true;
      renderHudPanels();
    }
    if (event.code === "KeyF" && !event.repeat) {
      activateOverdrive();
    }
    if (event.code === "KeyQ" && !event.repeat) {
      ventHeat();
    }
    if (event.code === "Enter" && state.screen !== "game") {
      startRun();
    }
    if (event.code === "KeyR" && state.screen !== "title") {
      startRun();
    }
    if (state.paused) {
      return;
    }
    if (
      state.screen === "title" &&
      ["Digit1", "Digit2", "Digit3"].includes(event.code)
    ) {
      const signatureIds = Object.keys(SIGNATURE_DEFS);
      const nextSignatureId =
        signatureIds[Number(event.code.replace("Digit", "")) - 1];
      if (nextSignatureId) {
        selectSignature(nextSignatureId);
      }
    }
    if (
      state.phase === "forge" &&
      ["Digit1", "Digit2", "Digit3"].includes(event.code)
    ) {
      handleForgeSelection(Number(event.code.replace("Digit", "")) - 1);
    }
    input.keys.add(event.code);
  });

  document.addEventListener("keyup", (event) => {
    if (event.code === "Tab") {
      state.hudInspect = false;
      renderHudPanels();
    }
    input.keys.delete(event.code);
  });

  renderSignaturePicker();
  renderSignatureSpotlight();
  syncArenaCanvas();
  showScreen("title");
  requestAnimationFrame(frame);
})();

(function () {
  const GAME_TITLE = "Cinder Circuit";
  const ARENA_WIDTH = 960;
  const ARENA_HEIGHT = 540;
  const PLAYER_RADIUS = 12;

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
      id: "overload",
      label: "Wave 4 · Overload",
      duration: 68,
      spawnBudget: 104,
      activeCap: 28,
      baseSpawnInterval: 0.57,
      spawnIntervalMin: 0.19,
      spawnAcceleration: 0.31,
      eliteEvery: 8,
      mix: {
        scuttler: 0.32,
        brute: 0.32,
        shrike: 0.36,
      },
      note: "브루트 전열과 이중 폭주가 겹치며 sustain과 이동 판단을 동시에 시험한다.",
      directive: "Twin Surges. 오래 버티는 적을 끊고 안전 지대를 짧게 갈아타야 한다.",
      driveGainFactor: 1.08,
      hazard: {
        label: "Twin Surges",
        interval: 10.2,
        count: 2,
        radius: 62,
        telegraph: 0.98,
        duration: 3.9,
        damage: 12,
      },
    },
    {
      id: "meltdown",
      label: "Wave 5 · Meltdown",
      duration: 74,
      spawnBudget: 127,
      activeCap: 33,
      baseSpawnInterval: 0.48,
      spawnIntervalMin: 0.15,
      spawnAcceleration: 0.33,
      eliteEvery: 7,
      mix: {
        scuttler: 0.3,
        brute: 0.27,
        shrike: 0.43,
      },
      note: "최종 웨이브는 엘리트 돌파와 짧은 화력 창을 연결해야 안정적으로 정리된다.",
      directive: "Twin Surges + elite breach. 오버드라이브를 돌파 타이밍에 맞춰 써야 한다.",
      driveGainFactor: 1.18,
      hazard: {
        label: "Meltdown Surge",
        interval: 8.4,
        count: 2,
        radius: 70,
        telegraph: 0.88,
        duration: 4,
        damage: 13,
      },
    },
  ];

  const MAX_WAVES = WAVE_CONFIG.length;
  const POST_WAVE_LOOT_GRACE = 2.4;
  const FINAL_CASHOUT_DURATION = 12;
  const FINAL_CASHOUT_SPAWN_BUDGET = 26;

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
  const SUPPORT_SYSTEM_DEFS = {
    ember_ring: {
      id: "ember_ring",
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

  const DEFAULT_SIGNATURE_ID = "relay_oath";
  const FORGE_PACKAGE_START_WAVE = 3;
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
    supportSystemId: null,
    supportSystemTier: 0,
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

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
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
    if (!build || !build.supportSystemId) {
      return null;
    }
    return SUPPORT_SYSTEM_DEFS[build.supportSystemId] || null;
  }

  function computeSupportSystemStats(build) {
    const system = getSupportSystemDef(build);
    if (!system) {
      return null;
    }
    const tier = clamp(build.supportSystemTier || 0, 0, MAX_SUPPORT_SYSTEM_TIER);
    const tierDef = system.tiers[tier];
    if (!tierDef) {
      return null;
    }
    return {
      id: system.id,
      label: tierDef.label,
      tier,
      orbitCount: tierDef.orbitCount,
      orbitRadius: tierDef.orbitRadius,
      orbitSpeed: tierDef.orbitSpeed,
      satelliteRadius: tierDef.satelliteRadius,
      touchDamage: tierDef.touchDamage,
      touchCooldown: tierDef.touchCooldown,
      shotCooldown: tierDef.shotCooldown,
      shotRange: tierDef.shotRange,
      shotDamage: tierDef.shotDamage,
      shotSpeed: tierDef.shotSpeed,
      interceptRange: tierDef.interceptRange,
      interceptCooldown: tierDef.interceptCooldown,
      interceptPulseDamage: tierDef.interceptPulseDamage,
      interceptPulseRadius: tierDef.interceptPulseRadius,
      color: system.color,
      orbitColor: system.orbitColor,
      strokeColor: system.strokeColor,
      renderShape: system.renderShape,
      statusNote: tierDef.statusNote,
    };
  }

  function createSupportSystemChoices(build, rng) {
    if (!build) {
      return [];
    }
    const random = typeof rng === "function" ? rng : Math.random;
    const currentSystem = getSupportSystemDef(build);
    const candidateIds = currentSystem ? [currentSystem.id] : shuffle(Object.keys(SUPPORT_SYSTEM_DEFS), random);
    return candidateIds
      .map((systemId) => {
        const system = SUPPORT_SYSTEM_DEFS[systemId];
        const nextTier = currentSystem
          ? clamp((build.supportSystemTier || 0) + 1, 0, MAX_SUPPORT_SYSTEM_TIER)
          : 1;
        const tierDef = system && system.tiers[nextTier];
        if (
          !system ||
          !tierDef ||
          (build.supportSystemId === system.id && (build.supportSystemTier || 0) >= nextTier)
        ) {
          return null;
        }
        return {
          type: "system",
          id: `system:${system.id}:t${tierDef.tier}`,
          verb: build.supportSystemId === system.id ? "증설" : "설치",
          tag: "SYSTEM",
          title: tierDef.title,
          description: tierDef.description,
          slotText: tierDef.slotText,
          systemId: system.id,
          systemTier: tierDef.tier,
          cost: tierDef.cost,
        };
      })
      .filter(Boolean);
  }

  function shouldOfferSupportSystem(build, options) {
    if (!build || (options && options.finalForge)) {
      return false;
    }
    const nextWave = options && Number.isFinite(options.nextWave) ? options.nextWave : 0;
    if (nextWave < FORGE_PACKAGE_START_WAVE) {
      return false;
    }
    if (!build.supportSystemId) {
      return true;
    }
    return (build.supportSystemTier || 0) < MAX_SUPPORT_SYSTEM_TIER && nextWave >= 4;
  }

  function shouldForceForgePackage(options) {
    if (!options || options.finalForge) {
      return false;
    }
    return (options.nextWave || 0) >= FORGE_PACKAGE_START_WAVE;
  }

  function createForgePreviewRows(choice) {
    if (!choice) {
      return [];
    }
    const finaleRows = choice.finalePreview
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
        supportSystemId: BASE_BUILD.supportSystemId,
        supportSystemTier: BASE_BUILD.supportSystemTier,
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
      capstoneFire: null,
      capstoneOnHit: null,
      capstoneOnBounce: null,
    };
    getAffixDefs(build).forEach((affix) => {
      if (typeof affix.applyWeapon === "function") {
        affix.applyWeapon(stats, build);
      }
    });
    const catalystCapstone = getCatalystCapstone(build, core.id);
    if (catalystCapstone) {
      stats.capstoneId = catalystCapstone.id;
      stats.capstoneLabel = catalystCapstone.label;
      if (typeof catalystCapstone.applyWeapon === "function") {
        catalystCapstone.applyWeapon(stats, build);
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
      tempo: `${wave.timeLeft}초 · 적 상한 ${wave.activeCap}`,
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
    const random = typeof rng === "function" ? rng : Math.random;
    const pending = getPendingCoreIds(build);
    const choiceCatalog = new Set();
    const commitCandidates = [];
    const pivotCandidates = [];
    const subsystemCandidates = [];
    const sustainCandidates = [];
    const currentAffixIds = sanitizeAffixIds(build.affixes, getAffixCapacity(build));
    const catalystReforgeChoice = createCatalystReforgeChoice(build);
    const recycleChoice = createRecycleChoice(build);
    const reforgeChoice = catalystReforgeChoice || createReforgeChoice(build, random);
    const affixReforgeChoice = createAffixReforgeChoice(build, random);
    const finisherChoice = createRecipeFinisherChoice(build);
    const supportSystemChoices = shouldOfferSupportSystem(build, options)
      ? createSupportSystemChoices(build, random)
      : [];
    const guaranteedMidrunChase = shouldGuaranteeMidrunChase(options)
      ? createGuaranteedChaseChoice(build)
      : null;
    const packagePrimary = shouldForceForgePackage(options) && (options.packageStep || 1) === 1;
    pushChoiceIfOpen(commitCandidates, guaranteedMidrunChase || finisherChoice, choiceCatalog);

    const sameCoreChoice = createCoreChoice(build.coreId, build);
    if (sameCoreChoice.benchCopies > 0) {
      pushChoiceIfOpen(commitCandidates, sameCoreChoice, choiceCatalog);
    }

    shuffle(
      Object.keys(AFFIX_DEFS)
        .filter((affixId) => !currentAffixIds.includes(affixId))
        .map((affixId) => createAffixChoice(affixId, build))
        .filter((choice) => choice && canApplyAffixChoice(build, choice.affixId, choice.replaceTarget)),
      random
    ).forEach((choice) => {
      pushChoiceIfOpen(commitCandidates, choice, choiceCatalog);
    });

    shuffle(
      ["shock_lens", "pulse_gate", "arc_array", "rail_sleeve", "drive_sync", "heat_sink", "reactor_cap"]
        .filter((modId) => MOD_DEFS[modId])
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

    [reforgeChoice, affixReforgeChoice].forEach((choice) => {
      pushChoiceIfOpen(pivotCandidates, choice, choiceCatalog);
    });

    supportSystemChoices.forEach((choice) => {
      pushChoiceIfOpen(subsystemCandidates, choice, choiceCatalog);
    });

    if (Number.isFinite(scrapBank) && scrapBank < 32 && recycleChoice) {
      pushChoiceIfOpen(sustainCandidates, recycleChoice, choiceCatalog);
    }

    [recycleChoice, createModChoice("coolant_purge"), createModChoice("magnet_rig"), createModChoice("armor_mesh"), createModChoice("step_servos")]
      .filter(Boolean)
      .forEach((choice) => pushChoiceIfOpen(sustainCandidates, choice, choiceCatalog));

    shuffle(
      ["thermal_weave", "salvage_link"]
        .filter((affixId) => !currentAffixIds.includes(affixId))
        .map((affixId) => createAffixChoice(affixId, build))
        .filter((choice) => choice && canApplyAffixChoice(build, choice.affixId, choice.replaceTarget)),
      random
    ).forEach((choice) => pushChoiceIfOpen(sustainCandidates, choice, choiceCatalog));

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
        takeFirstAvailableChoice(commitCandidates, takenIds, "빌드 고정"),
        takeFirstAvailableChoice(pivotCandidates, takenIds, "전환"),
      ].filter(Boolean);
      choices.push(...primaryChoices);
      const extraPrimaryPool = [...commitCandidates, ...pivotCandidates];
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
        takeFirstAvailableChoice(subsystemCandidates, takenIds, "보조 시스템"),
        takeFirstAvailableChoice(sustainCandidates, takenIds, "생존/경제"),
      ].filter(Boolean);
      choices.push(...secondaryChoices);
      const extraSecondaryPool = [...subsystemCandidates, ...sustainCandidates];
      for (const choice of extraSecondaryPool) {
        if (choices.length >= 3) {
          break;
        }
        if (!choice || takenIds.has(choice.id)) {
          continue;
        }
        takenIds.add(choice.id);
        choices.push(markForgeLane(choice, choice.type === "system" ? "보조 시스템" : "생존/경제"));
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
    const laneChoices = [
      takeFirstAvailableChoice(commitCandidates, takenIds, "빌드 고정"),
      takeFirstAvailableChoice(pivotCandidates, takenIds, "전환"),
      takeFirstAvailableChoice(subsystemCandidates, takenIds, "보조 시스템"),
      takeFirstAvailableChoice(sustainCandidates, takenIds, "생존/경제"),
    ].filter(Boolean);
    const choices = !build.supportSystemId && subsystemCandidates.length > 1
      ? laneChoices.filter((choice) => choice.laneLabel !== "생존/경제")
      : laneChoices;
    const maxChoices = subsystemCandidates.length > 0 ? 4 : 3;
    const extraChoicePool = !build.supportSystemId && subsystemCandidates.length > 1
      ? [...subsystemCandidates, ...commitCandidates, ...pivotCandidates, ...sustainCandidates]
      : [...commitCandidates, ...pivotCandidates, ...subsystemCandidates, ...sustainCandidates];

    for (const choice of extraChoicePool) {
      if (choices.length >= maxChoices) {
        break;
      }
      if (takenIds.has(choice.id)) {
        continue;
      }
      takenIds.add(choice.id);
      choices.push(markForgeLane(choice, choice.type === "system" ? "보조 시스템" : "예비"));
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
        description: "무료 안정화. 열을 크게 빼고 체력을 조금 회복한다.",
        slotText: "무료 정비",
        cost: 0,
      }, "생존/경제");
    }

    return shuffle(choices.slice(0, maxChoices), random);
  }

  function shouldOpenForgePackage(run, choice) {
    if (!run || !choice || run.pendingFinalForge) {
      return false;
    }
    const nextWave = Number.isFinite(run.waveIndex) ? run.waveIndex + 2 : 0;
    return nextWave >= FORGE_PACKAGE_START_WAVE;
  }

  function buildForgeFollowupChoices(build, rng, scrapBank, options = null, previousChoice = null) {
    const random = typeof rng === "function" ? rng : Math.random;
    const packageFollowup = shouldForceForgePackage(options);
    const choices = packageFollowup
      ? buildForgeChoices(build, random, scrapBank, { ...options, packageStep: 2 }).filter((choice) => {
          if (
            !choice ||
            (choice.laneLabel !== "보조 시스템" && choice.laneLabel !== "생존/경제")
          ) {
            return false;
          }
          if (previousChoice && choice.id === previousChoice.id) {
            return false;
          }
          return true;
        })
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
          description: "보조 시스템을 고정한 뒤 남은 패키지 슬롯을 무료 안정화로 마감한다.",
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

    if (choice.type === "system") {
      const system = SUPPORT_SYSTEM_DEFS[choice.systemId];
      const tierDef = system && system.tiers[choice.systemTier];
      if (!system || !tierDef) {
        return null;
      }
      run.build.supportSystemId = choice.systemId;
      run.build.supportSystemTier = Math.max(run.build.supportSystemTier || 0, choice.systemTier || 1);
      run.build.upgrades.push(
        `${choice.systemTier > 1 ? "시스템 증설" : "시스템 설치"}: ${tierDef.label}`
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

    if (choice.type === "fallback" && run.player) {
      run.player.hp = Math.min(run.player.maxHp, run.player.hp + 16);
      run.player.heat = Math.max(0, run.player.heat - 60);
      run.player.overheated = false;
      run.build.upgrades.push("Emergency Vent");
      return choice;
    }

    return null;
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
    FINAL_CASHOUT_DURATION,
    ENEMY_DEFS,
    CORE_DEFS,
    AFFIX_DEFS,
    MOD_DEFS,
    SUPPORT_SYSTEM_DEFS,
    SIGNATURE_DEFS,
    DEFAULT_SIGNATURE_ID,
    createInitialBuild,
    getSignatureDef,
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
    createFinalCashoutWave,
    getFinalCashoutTransitionProfile,
    applyFinalCashoutTransition,
    chooseHazardSpawn,
    buildHazardCandidates,
    buildForgeChoices,
    buildForgeFollowupChoices,
    applyForgeChoice,
    getCatalystCapstone,
    shouldOpenForgePackage,
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
      return {
        chipLabel: `${wave.hazard.label} LIVE`,
        detailLabel: "폭주",
        detailValue: "활성",
        note: `${currentState.hazards.length}개 구역이 활성화됐다. 붉은 원에서 즉시 이탈해야 한다.`,
        tone: "summary-chip--hot",
      };
    }

    const nextWindow = Math.max(0, wave.hazardTimer || 0);
    return {
      chipLabel: wave.hazard.label,
      detailLabel: "다음 폭주",
      detailValue: `${nextWindow.toFixed(1)}s`,
      note: `${wave.hazard.count}개 구역이 ${wave.hazard.telegraph.toFixed(1)}초 예고 후 폭주한다.`,
      tone: nextWindow <= 2.5 ? "summary-chip--hot" : "",
    };
  }

  function getWeaponTraitLabels(weapon) {
    return [
      weapon.pierce > 0 ? `관통 ${weapon.pierce}` : null,
      weapon.bounce > 0 ? `반사 ${weapon.bounce}` : null,
      weapon.chain > 0 ? `연쇄 ${weapon.chain}` : null,
      weapon.capstoneTraitLabel ? weapon.capstoneTraitLabel : null,
    ].filter(Boolean);
  }

  function getSupportSystemSummary(systemStats) {
    if (!systemStats) {
      return "보조 시스템 없음";
    }
    if (systemStats.interceptRange > 0) {
      return systemStats.interceptPulseDamage > 0
        ? `${systemStats.label} · 위성 ${systemStats.orbitCount}기 · 탄환 요격 + 방호 파동`
        : `${systemStats.label} · 위성 ${systemStats.orbitCount}기 · 탄환 요격`;
    }
    return systemStats.tier >= 2
      ? `${systemStats.label} · 위성 ${systemStats.orbitCount}기 · 자동 볼트`
      : `${systemStats.label} · 위성 ${systemStats.orbitCount}기`;
  }

  function getRunGrade(result) {
    if (result.victory && result.scrapBanked >= 28 && result.overdrivesUsed >= 2) {
      return { grade: "S", note: "압박 구간을 안정적으로 봉인한 러닝." };
    }
    if (result.victory) {
      return { grade: "A", note: "핵심 판단을 유지하며 회로를 닫은 러닝." };
    }
    if (result.wavesCleared >= 4) {
      return { grade: "B", note: "최종 압박 직전까지는 빌드 축이 살아 있었다." };
    }
    if (result.wavesCleared >= 2) {
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
      waveIndex: 0,
      wave: null,
      waveClearTimer: 0,
      pendingFinalForge: false,
      enemies: [],
      projectiles: [],
      drops: [],
      hazards: [],
      particles: [],
      forgeChoices: [],
      forgeStep: 1,
      forgeMaxSteps: 1,
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
      weapon: computeWeaponStats(build),
      playerStats: computePlayerStats(build),
      supportSystem: computeSupportSystemStats(build),
      supportSystemRuntime: {
        angle: 0,
        shotCooldown: 0,
        touchCooldowns: [],
      },
    };
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
    const label =
      state.phase === "forge"
        ? `Forge Stop · Wave ${state.waveIndex + 1}`
        : state.phase === "result"
          ? "Run Complete"
          : `Wave ${state.waveIndex + 1} / ${MAX_WAVES}`;
    elements.runTrackLabel.textContent = label;
    elements.waveTrack.innerHTML = WAVE_CONFIG.map((wave, index) => {
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
          <p class="panel__eyebrow">Wave ${index + 1}</p>
          <strong>${wave.id.toUpperCase()}</strong>
          <p>${wave.note}</p>
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
    return {
      x: ARENA_WIDTH / 2,
      y: ARENA_HEIGHT / 2,
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
      heat: 0,
      overheated: false,
      drive: 0,
      overdriveActiveTime: 0,
      invulnerableTime: 0,
      dashTrail: 0,
      facing: 0,
    };
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

  function syncSupportSystemRuntime() {
    if (!state) {
      return;
    }
    if (!state.supportSystemRuntime) {
      state.supportSystemRuntime = {
        angle: 0,
        shotCooldown: 0,
        touchCooldowns: [],
        interceptCooldowns: [],
      };
    }
    const orbitCount = state.supportSystem ? state.supportSystem.orbitCount : 0;
    state.supportSystemRuntime.touchCooldowns = Array.from(
      { length: orbitCount },
      (_, index) => Math.max(0, state.supportSystemRuntime.touchCooldowns[index] || 0)
    );
    state.supportSystemRuntime.interceptCooldowns = Array.from(
      { length: orbitCount },
      (_, index) => Math.max(0, state.supportSystemRuntime.interceptCooldowns[index] || 0)
    );
    if (!state.supportSystem || state.supportSystem.shotCooldown <= 0) {
      state.supportSystemRuntime.shotCooldown = 0;
    } else if (state.supportSystemRuntime.shotCooldown <= 0) {
      state.supportSystemRuntime.shotCooldown = state.supportSystem.shotCooldown * 0.55;
    }
  }

  function getSupportSystemSatellites() {
    if (!state || !state.player || !state.supportSystem) {
      return [];
    }
    const runtime = state.supportSystemRuntime || { angle: 0 };
    return Array.from({ length: state.supportSystem.orbitCount }, (_, index) => {
      const angle = runtime.angle + (index / state.supportSystem.orbitCount) * Math.PI * 2;
      return {
        x: state.player.x + Math.cos(angle) * state.supportSystem.orbitRadius,
        y: state.player.y + Math.sin(angle) * state.supportSystem.orbitRadius,
        radius: state.supportSystem.satelliteRadius,
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

  function beginWave(index) {
    const config = WAVE_CONFIG[index];
    state.waveIndex = index;
    state.phase = "wave";
    state.pendingFinalForge = false;
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
      driveGainFactor: config.driveGainFactor || 1,
      hazard: config.hazard,
      hazardTimer: config.hazard ? config.hazard.interval * 0.8 : Number.POSITIVE_INFINITY,
    };
    state.waveClearTimer = 0;
    state.enemies = [];
    state.projectiles = [];
    state.drops = [];
    state.hazards = [];
    state.particles = [];
    state.player.x = ARENA_WIDTH / 2;
    state.player.y = ARENA_HEIGHT / 2;
    state.player.heat = Math.max(0, state.player.heat - 20);
    state.player.overheated = false;
    state.player.fireCooldown = 0;
    state.player.dashCharges = state.player.dashMax;
    state.player.dashCooldownTimer = 0;
    pushCombatFeed(`${config.label} 진입. ${config.note}`, `W${index + 1}`);
    setBanner(config.label, 1.4);
    renderForgeOverlay();
    updateHUD();
  }

  function enterForge() {
    const isFinalForge = state.waveIndex >= MAX_WAVES - 1;
    const startsPackage = !isFinalForge && state.waveIndex + 2 >= FORGE_PACKAGE_START_WAVE;
    state.phase = "forge";
    state.pendingFinalForge = isFinalForge;
    state.forgeStep = 1;
    state.forgeMaxSteps = startsPackage ? 2 : 1;
    state.forgeChoices = buildForgeChoices(
      state.build,
      Math.random,
      state.resources.scrap,
      { finalForge: isFinalForge, nextWave: state.waveIndex + 2, packageStep: 1 }
    );
    state.hazards = [];
    state.enemies = [];
    state.projectiles = [];
    state.player.heat = Math.max(0, state.player.heat - 20);
    state.player.overheated = false;
    pushCombatFeed(
      isFinalForge
        ? "Meltdown 정리 완료. 마지막 포지에서 최종 각인과 화력 배치를 마감한다."
        : "웨이브 종료. 포지 카드로 다음 화력 축을 고른다.",
      "FORGE"
    );
    setBanner(isFinalForge ? "최종 포지" : "포지 정지", 1.2);
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

  function createFinalCashoutWave(index = MAX_WAVES - 1, build = null) {
    const baseConfig = WAVE_CONFIG[clamp(index, 0, MAX_WAVES - 1)];
    const variant =
      getFinalCashoutFailSoftVariant(build) ||
      getFinalCashoutSupportVariant(build) ||
      getFinalCashoutCapstoneVariant(build);
    const defaultHazard = baseConfig.hazard
      ? {
          ...baseConfig.hazard,
          interval: Math.max(6.2, baseConfig.hazard.interval * 0.82),
          telegraph: Math.max(0.72, baseConfig.hazard.telegraph * 0.92),
        }
      : null;
    const hazard = variant && defaultHazard
      ? {
          ...defaultHazard,
          ...variant.hazard,
        }
      : defaultHazard;
    return {
      index,
      timeLeft: FINAL_CASHOUT_DURATION,
      spawnBudget: variant ? variant.spawnBudget : FINAL_CASHOUT_SPAWN_BUDGET,
      spawned: 0,
      spawnTimer: 0.2,
      label: `${baseConfig.label} · ${variant ? variant.cashoutLabel : "Cash-Out"}`,
      bannerLabel: variant ? variant.bannerLabel : "Meltdown Cash-Out",
      note: variant
        ? variant.note
        : "완성된 무기로 마지막 폭주 압박을 직접 정리하는 구간.",
      directive: variant ? variant.directive : baseConfig.directive,
      activeCap: variant
        ? variant.activeCap
        : Math.max(18, Math.round(baseConfig.activeCap * 0.7)),
      baseSpawnInterval: variant
        ? variant.baseSpawnInterval
        : Math.max(0.22, baseConfig.baseSpawnInterval * 0.74),
      spawnIntervalMin: variant
        ? variant.spawnIntervalMin
        : Math.max(0.1, baseConfig.spawnIntervalMin * 0.9),
      spawnAcceleration: baseConfig.spawnAcceleration,
      eliteEvery: variant ? variant.eliteEvery : Math.max(5, baseConfig.eliteEvery - 1),
      mix: variant ? { ...variant.mix } : { ...baseConfig.mix },
      cleanupPhase: false,
      awaitingForge: false,
      completesRun: true,
      driveGainFactor: variant
        ? variant.driveGainFactor
        : Math.max(baseConfig.driveGainFactor || 1, 1.22),
      hazard,
      hazardTimer: hazard
        ? hazard.interval * (variant && variant.hazard ? variant.hazard.timerFactor : 0.55)
        : Number.POSITIVE_INFINITY,
    };
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
    run.wave = createFinalCashoutWave(run.waveIndex, run.build);
    run.waveClearTimer = 0;
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
        run.player.x = ARENA_WIDTH / 2;
        run.player.y = ARENA_HEIGHT / 2;
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
    pushCombatFeed(`최종 포지 완료. ${state.wave.note}`, "LAST");
    setBanner(
      transition && transition.preserveArenaState
        ? `${state.wave.bannerLabel || "Meltdown Cash-Out"} · 압박 유지`
        : state.wave.bannerLabel || "Meltdown Cash-Out",
      1.2
    );
    renderForgeOverlay();
    updateHUD();
  }

  function finishRun(victory) {
    const signature = getSignatureDef(state.build.signatureId);
    const benchEntries = getBenchEntries(state.build);
    state.screen = "result";
    state.phase = "result";
    state.pendingFinalForge = false;
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
      ? "다섯 번째 폭주 구간을 넘기고 회로를 닫았다. 최종 코어와 보강 조합은 아래에 기록된다."
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
    if (state.resources.scrap < choice.cost) {
      setBanner("고철 부족", 0.8);
      return;
    }
    state.resources.scrap -= choice.cost;
    state.stats.scrapSpent += choice.cost;
    applyForgeChoice(state, choice);
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
        `${choice.tag} · ${choice.title} 적용. 패키지 마감 슬롯에서 보조 시스템 또는 안정화 카드를 1장 더 고른다.`,
        "FORGE"
      );
      refreshDerivedStats(false);
      renderForgeOverlay();
      updateHUD();
      return;
    }
    pushCombatFeed(`${choice.tag} · ${choice.title} 적용.`, "FORGE");
    refreshDerivedStats(false);
    if (shouldFinishAfterForge(state)) {
      beginFinalCashout();
      return;
    }
    beginWave(state.waveIndex + 1);
  }

  function spawnEnemy(typeId) {
    const def = ENEMY_DEFS[typeId];
    const edge = Math.floor(Math.random() * 4);
    let x = 0;
    let y = 0;
    const padding = 32;
    if (edge === 0) {
      x = -padding;
      y = Math.random() * ARENA_HEIGHT;
    } else if (edge === 1) {
      x = ARENA_WIDTH + padding;
      y = Math.random() * ARENA_HEIGHT;
    } else if (edge === 2) {
      x = Math.random() * ARENA_WIDTH;
      y = -padding;
    } else {
      x = Math.random() * ARENA_WIDTH;
      y = ARENA_HEIGHT + padding;
    }
    state.enemies.push({
      type: typeId,
      x,
      y,
      hp: def.hp * (1 + state.waveIndex * 0.08),
      radius: def.radius,
      contactCooldown: 0,
      attackCooldown: Math.random() * 0.8,
      wobble: Math.random() * Math.PI * 2,
      defeated: false,
    });
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
    const moveVector = {
      x: (input.keys.has("KeyD") ? 1 : 0) - (input.keys.has("KeyA") ? 1 : 0),
      y: (input.keys.has("KeyS") ? 1 : 0) - (input.keys.has("KeyW") ? 1 : 0),
    };
    const aimVector = getAimVector();
    const position = chooseHazardSpawn(
      config,
      {
        arenaWidth: ARENA_WIDTH,
        arenaHeight: ARENA_HEIGHT,
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
      telegraphTime: config.telegraph,
      activeTime: config.duration,
      damage: config.damage,
      pulseTimer: 0.18,
      label: config.label,
    });
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
        if (hazard.pulseTimer <= 0) {
          const distance = Math.hypot(state.player.x - hazard.x, state.player.y - hazard.y);
          if (
            distance < hazard.radius + state.player.radius &&
            state.player.invulnerableTime <= 0
          ) {
            takePlayerDamage(hazard.damage, "hazard");
          }
          hazard.pulseTimer = 0.35;
        }
        if (Math.random() < 0.3) {
          state.particles.push(createParticle(hazard.x, hazard.y, "#ff8c42", 0.9));
        }
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
    pushCombatFeed("오버드라이브 점화. 짧은 화력 창을 최대한 밀어붙인다.", "DRIVE");
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
    const satellites = getSupportSystemSatellites();

    if (state.supportSystem.interceptRange > 0) {
      satellites.forEach((satellite, index) => {
        if (state.supportSystemRuntime.interceptCooldowns[index] > 0) {
          return;
        }
        const hostileProjectile = state.projectiles.find((projectile) => {
          if (projectile.owner !== "enemy" || projectile.life <= 0) {
            return false;
          }
          const distance = Math.hypot(projectile.x - satellite.x, projectile.y - satellite.y);
          return distance <= state.supportSystem.interceptRange + projectile.radius + satellite.radius;
        });
        if (!hostileProjectile) {
          return;
        }
        hostileProjectile.life = 0;
        state.supportSystemRuntime.interceptCooldowns[index] = state.supportSystem.interceptCooldown;
        state.particles.push(createParticle(hostileProjectile.x, hostileProjectile.y, state.supportSystem.color, 1));
        state.particles.push(createParticle(satellite.x, satellite.y, "#f3feff", 0.8));
        if (state.supportSystem.interceptPulseDamage > 0 && state.supportSystem.interceptPulseRadius > 0) {
          for (const enemy of state.enemies) {
            if (enemy.defeated || enemy.hp <= 0) {
              continue;
            }
            const distance = Math.hypot(enemy.x - hostileProjectile.x, enemy.y - hostileProjectile.y);
            if (distance > state.supportSystem.interceptPulseRadius + enemy.radius) {
              continue;
            }
            enemy.hp -= state.supportSystem.interceptPulseDamage;
            state.particles.push(createParticle(enemy.x, enemy.y, "#c7fbff", 0.6));
            if (enemy.hp <= 0) {
              destroyEnemy(enemy);
            }
          }
        }
      });
    }

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
          enemy.hp -= state.supportSystem.touchDamage;
          state.supportSystemRuntime.touchCooldowns[index] = state.supportSystem.touchCooldown;
          state.particles.push(createParticle(satellite.x, satellite.y, state.supportSystem.color, 0.8));
          if (enemy.hp <= 0) {
            destroyEnemy(enemy);
          }
          break;
        }
      }
    });

    if (state.supportSystem.shotCooldown <= 0) {
      return;
    }

    state.supportSystemRuntime.shotCooldown = Math.max(
      0,
      state.supportSystemRuntime.shotCooldown - dt
    );
    if (state.supportSystemRuntime.shotCooldown > 0) {
      return;
    }

    let fired = false;
    satellites.forEach((satellite) => {
      let target = null;
      let bestDistance = state.supportSystem.shotRange;
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
        state.projectiles.push(createSupportSystemProjectile(satellite, target, state.supportSystem));
        state.particles.push(createParticle(satellite.x, satellite.y, "#fff0c9", 0.55));
        fired = true;
      }
    });

    if (fired) {
      state.supportSystemRuntime.shotCooldown = state.supportSystem.shotCooldown;
    }
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
      state.player.heat + weapon.heatPerShot * (driveActive ? 0.58 : 1),
      0,
      100
    );
    state.player.fireCooldown = weapon.cooldown * (driveActive ? 0.6 : 1);
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
    const speed =
      state.player.moveSpeed + (state.player.overdriveActiveTime > 0 ? 34 : 0);
    state.player.x += (move.x / magnitude) * speed * dt;
    state.player.y += (move.y / magnitude) * speed * dt;

    state.player.x = clamp(state.player.x, 18, ARENA_WIDTH - 18);
    state.player.y = clamp(state.player.y, 18, ARENA_HEIGHT - 18);

    state.player.fireCooldown = Math.max(0, state.player.fireCooldown - dt);
    state.player.invulnerableTime = Math.max(0, state.player.invulnerableTime - dt);
    state.player.heat = Math.max(
      0,
      state.player.heat -
        state.player.coolRate * dt * (state.player.overdriveActiveTime > 0 ? 1.5 : 1)
    );
    if (state.player.overheated && state.player.heat < 45) {
      state.player.overheated = false;
    }

    state.player.overdriveActiveTime = Math.max(
      0,
      state.player.overdriveActiveTime - dt
    );

    if (state.player.dashCharges < state.player.dashMax) {
      state.player.dashCooldownTimer += dt;
      if (state.player.dashCooldownTimer >= state.player.dashCooldown) {
        state.player.dashCharges += 1;
        state.player.dashCooldownTimer = 0;
      }
    }

    state.player.dashTrail = Math.max(0, state.player.dashTrail - dt * 3);

    fireWeapon();
  }

  function dashPlayer() {
    if (state.phase !== "wave" || !state.player || state.player.dashCharges <= 0) {
      return;
    }

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
    state.player.x = clamp(state.player.x, 24, ARENA_WIDTH - 24);
    state.player.y = clamp(state.player.y, 24, ARENA_HEIGHT - 24);
    state.player.dashCharges -= 1;
    state.player.dashCooldownTimer = 0;
    state.player.invulnerableTime = 0.22;
    state.player.dashTrail = 0.8;
    state.shake = Math.max(state.shake, 6);
    for (let index = 0; index < 10; index += 1) {
      state.particles.push(createParticle(state.player.x, state.player.y, "#ffd166", 1.1));
    }
  }

  function spawnEnemyShot(enemy, heavy) {
    const dx = state.player.x - enemy.x;
    const dy = state.player.y - enemy.y;
    const distance = Math.hypot(dx, dy) || 1;
    const speed = heavy ? 218 : 192;
    state.projectiles.push({
      owner: "enemy",
      x: enemy.x,
      y: enemy.y,
      vx: (dx / distance) * speed,
      vy: (dy / distance) * speed,
      radius: heavy ? 7 : 5,
      damage: heavy ? 12 : 8,
      life: heavy ? 2.6 : 2.2,
      color: heavy ? "#ffd166" : "#8ae7ff",
    });
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

      if (enemy.type === "shrike") {
        enemy.wobble += dt * 5;
        angle += Math.sin(enemy.wobble) * 0.6;
      }

      const speed = def.speed * (1 + state.waveIndex * 0.06);
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
    const mitigated =
      source === "hazard"
        ? amount * (1 - state.player.hazardMitigation)
        : amount;
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
    const nextProjectiles = [];

    for (const projectile of state.projectiles) {
      projectile.x += projectile.vx * dt;
      projectile.y += projectile.vy * dt;
      projectile.life -= dt;

      let bounced = false;
      if (projectile.x <= 0 || projectile.x >= ARENA_WIDTH) {
        if (projectile.bounce > 0) {
          projectile.vx *= -1;
          projectile.bounce -= 1;
          bounced = true;
        } else {
          projectile.life = 0;
        }
      }
      if (projectile.y <= 0 || projectile.y >= ARENA_HEIGHT) {
        if (projectile.bounce > 0) {
          projectile.vy *= -1;
          projectile.bounce -= 1;
          bounced = true;
        } else {
          projectile.life = 0;
        }
      }
      if (bounced) {
        projectile.x = clamp(projectile.x, 4, ARENA_WIDTH - 4);
        projectile.y = clamp(projectile.y, 4, ARENA_HEIGHT - 4);
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
    gainDrive(enemy.type === "elite" ? 24 : enemy.type === "brute" ? 10 : 7);
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

    if (enemy.type === "elite") {
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
        state.waveIndex === MAX_WAVES - 1 &&
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
        pushCombatFeed(`${FINISHER_RECIPE_DEFS[state.build.coreId].label} 촉매 노출. 회수해야 최종 각인이 열린다.`, "CAT");
      }
    }

    state.shake = Math.max(state.shake, enemy.type === "elite" ? 10 : 4);
  }

  function updateDrops(dt) {
    const nextDrops = [];
    for (const drop of state.drops) {
      drop.life -= dt;
      const distance = Math.hypot(state.player.x - drop.x, state.player.y - drop.y);
      if (distance < state.player.pickupRadius) {
        const pull = clamp(280 * dt, 0, distance || 0);
        if (distance > 0) {
          drop.x += ((state.player.x - drop.x) / distance) * pull;
          drop.y += ((state.player.y - drop.y) / distance) * pull;
        }
      }

      if (distance < state.player.radius + 10) {
        collectDrop(drop);
      } else if (drop.life > 0) {
        nextDrops.push(drop);
      }
    }
    state.drops = nextDrops;
  }

  function collectDrop(drop) {
    if (drop.kind === "scrap") {
      const value = round(drop.value * state.player.scrapMultiplier, 0);
      state.resources.scrap += value;
      state.stats.scrapCollected += value;
      gainDrive(value * 0.24);
      setBanner(`고철 +${value}`, 0.45);
      return;
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
      return;
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
      return;
    }
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
        state.wave.awaitingForge = true;
        state.wave.cleanupPhase = true;
        state.waveClearTimer = POST_WAVE_LOOT_GRACE;
        state.hazards = [];
        state.stats.wavesCleared = state.waveIndex + 1;
        setBanner("전장 정리", 0.9);
        pushCombatFeed("적 반응 정지. 남은 고철을 회수할 짧은 여유가 생겼다.", "CLEAR");
        return;
      }

      state.waveClearTimer = Math.max(0, state.waveClearTimer - dt);
      if (state.waveClearTimer <= 0) {
        if (state.wave.completesRun) {
          finishRun(true);
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
    const waveConfig = state.wave || WAVE_CONFIG[state.waveIndex];
    const waveLabel =
      state.phase === "forge" ? `${waveConfig.label} · Forge` : waveConfig.label;
    const hpRatio = state.player.maxHp > 0 ? state.player.hp / state.player.maxHp : 0;
    const heatRatio = state.player.heat / 100;
    const driveRatio =
      state.player.overdriveActiveTime > 0
        ? state.player.overdriveActiveTime / Math.max(0.1, state.player.overdriveDuration)
        : state.player.drive / 100;
    const traitLabels = getWeaponTraitLabels(state.weapon);
    const hazardStatus = describeHazardState(state);
    const supportSystemSummary = getSupportSystemSummary(state.supportSystem);

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
    const traitSummary = traitLabels.join(" · ");
    const affixSummary = weapon.affixLabels.length ? weapon.affixLabels.join(" · ") : "속성 없음";
    const capstoneSummary = weapon.capstoneLabel
      ? `${weapon.capstoneLabel} · ${weapon.capstoneTraitLabel}`
      : null;
    if (elements.activeCore) {
      elements.activeCore.innerHTML = `
        <div class="summary-head">
          <div>
            <p class="forge-card__tag">${activeCore.tag}</p>
            <h3>${activeCore.label}</h3>
          </div>
          <span class="summary-chip ${
            weapon.benchSyncLevel > 0 ? "summary-chip--hot" : ""
          }">${weapon.tierLabel}</span>
        </div>
        <div class="status-list">
          ${createStatusRow("위력", String(weapon.damage))}
          ${createStatusRow("연사", `${weapon.cooldown}s`)}
          ${createStatusRow("발열", String(weapon.heatPerShot))}
          ${createStatusRow("등급", `${weapon.tierLabel} / ${weapon.benchSyncLabel}`)}
        </div>
        <div class="mini-pill-row">
          ${
            traitLabels.length
              ? traitLabels.map((label) => createMiniPill("TRAIT", label, "accent")).join("")
              : createMiniPill("TRAIT", "직선 탄도")
          }
          ${capstoneSummary ? createMiniPill("CAP", weapon.capstoneLabel, "hot") : ""}
          ${state.supportSystem ? createMiniPill("SYS", state.supportSystem.label, "accent") : ""}
          ${weapon.affixLabels.map((label) => createMiniPill("속성", label, "cool")).join("")}
        </div>
        <p class="summary-note">${[affixSummary, capstoneSummary, supportSystemSummary, `보관 ${weapon.benchCopies}개 대기`].filter(Boolean).join(" · ")}</p>
      `;
    }

    const benchEntries = getBenchEntries(state.build);
    if (elements.pendingCores) {
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
      elements.upgradeList.innerHTML = state.build.upgrades.length
        ? state.build.upgrades
            .slice(-4)
            .map((upgrade) => `<li>${upgrade}</li>`)
            .join("")
        : `<li>아직 포지 보강이 없다.</li>`;
    }

    const enemiesLeft = Math.max(0, state.wave ? state.wave.spawnBudget - state.wave.spawned : 0);
    if (elements.waveObjective) {
      elements.waveObjective.innerHTML = `
        <div class="summary-head">
          <strong>${waveConfig.label}</strong>
          <span class="summary-chip ${hazardStatus.tone}">
            ${hazardStatus.chipLabel}
          </span>
        </div>
        <div class="status-list">
          ${createStatusRow("남은 스폰", String(enemiesLeft))}
          ${createStatusRow("현재 적", String(state.enemies.length))}
          ${createStatusRow("드랍", String(state.drops.length))}
          ${createStatusRow(hazardStatus.detailLabel, hazardStatus.detailValue)}
        </div>
        <p class="summary-note">${hazardStatus.note}</p>
      `;
    }

    if (elements.liveReadout) {
      elements.liveReadout.innerHTML = `
        <div class="summary-head">
          <strong>${state.phase === "forge" ? "포지 선택 중" : "전투 진행 중"}</strong>
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
            : `${weapon.capstoneStatusNote ? `${weapon.capstoneStatusNote} ` : ""}${state.supportSystem ? `${state.supportSystem.statusNote} ` : ""}${hazardStatus.note} 자동 사격은 과열 전까지 유지된다.`
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
    const activeCore = CORE_DEFS[state.build.coreId];
    const traitSummary = getWeaponTraitLabels(state.weapon).join(" · ") || "직선 탄도";
    const affixSummary = state.weapon.affixLabels.length
      ? state.weapon.affixLabels.join(" · ")
      : "속성 없음";
    const capstoneSummary = state.weapon.capstoneLabel
      ? `${state.weapon.capstoneLabel} · ${state.weapon.capstoneTraitLabel}`
      : "활성 촉매 재구성 없음";
    const forgeSystemSummary = getSupportSystemSummary(state.supportSystem);
    const benchEntries = getBenchEntries(state.build);
    const benchSummary = benchEntries.length
      ? benchEntries
          .map(
            (entry) =>
              `${CORE_DEFS[entry.coreId].short} x${entry.copies} ${formatSyncLabel(entry.syncLevel)}`
          )
          .join(" · ")
      : "보관 코어 없음";
    const catalystReady = hasFinisherCatalyst(state.build, state.build.coreId);
    const catalystEligible = buildCanEarnFinisherCatalyst(state.build) || catalystReady;
    const catalystSummary = catalystEligible
      ? catalystReady
        ? `${FINISHER_RECIPE_DEFS[state.build.coreId].label} 촉매 확보`
        : `${FINISHER_RECIPE_DEFS[state.build.coreId].label} 촉매 필요`
      : "촉매 조건 미도달";
    const packageSummary =
      state.forgeMaxSteps > 1
        ? `패키지 ${state.forgeStep}/${state.forgeMaxSteps} · 1슬롯 화력/전환, 2슬롯 시스템/안정화`
        : state.waveIndex + 2 >= FORGE_PACKAGE_START_WAVE && !state.pendingFinalForge
          ? "Wave 3+ 포지는 두 슬롯으로 진행된다: 먼저 화력/전환, 다음 시스템/안정화"
          : "단일 포지 선택";
    elements.forgeSubtitle.textContent = state.pendingFinalForge
      ? catalystReady
        ? `고철 ${Math.round(state.resources.scrap)} 보유. 최종 포지다. 세 장은 완성, 촉매 연소, 안정화로 고정되며 각 카드가 바로 이어질 12초 cash-out 시험을 미리 보여준다.`
        : `고철 ${Math.round(state.resources.scrap)} 보유. 최종 포지다. 촉매가 없어도 비상 점화와 안정화 fail-soft 카드가 열리며, 각 카드가 다른 12초 cash-out 시험으로 바로 이어진다.`
      : `고철 ${Math.round(state.resources.scrap)} 보유. 장착은 무기 등급을 올리거나 바꾸고, 각인은 속성을 붙이며, 재구성/분해는 보관 코어를 정리한다. ${packageSummary}.`;
    elements.forgeContext.innerHTML = `
      <article class="forge-context__card">
        <p class="panel__eyebrow">현재 무기</p>
        <strong>${activeCore.label}</strong>
        <p>${state.weapon.tierLabel} · ${state.weapon.benchSyncLabel} · ${traitSummary}</p>
      </article>
      <article class="forge-context__card">
        <p class="panel__eyebrow">속성 / 시스템</p>
        <strong>${affixSummary}</strong>
        <p>${capstoneSummary} · ${forgeSystemSummary} · 보관 ${benchEntries.length}종 · ${catalystSummary} · 분해 예상 고철 ${getRecycleValue(state.build)}</p>
      </article>
    `;
    elements.forgeCards.innerHTML = state.forgeChoices
      .map(
        (choice, index) => {
          const kind =
            choice.type === "utility" ? choice.action || "utility" : choice.type || "choice";
          const previewRows = createForgePreviewRows(choice)
            .map(
              (row) => `
                <div class="forge-card__row">
                  <span>${row.label}</span>
                  <strong>${row.value}</strong>
                </div>
              `
            )
            .join("");
          return `
          <button
            type="button"
            class="forge-card forge-card--${choice.tag.toLowerCase()}"
            data-kind="${kind}"
            data-index="${index}"
            data-verb="${choice.verb}"
            ${state.resources.scrap < choice.cost ? "disabled" : ""}
          >
            <span class="forge-card__tag">${choice.laneLabel ? `${choice.laneLabel} · ${choice.tag}` : choice.tag}</span>
            <h3>${choice.title}</h3>
            <p>${choice.description}</p>
            <div class="forge-card__preview">${previewRows}</div>
            <span class="forge-card__meta">${choice.slotText}</span>
            <span class="forge-card__slot">${
              state.resources.scrap < choice.cost
                ? `${index + 1}번 선택 · 고철 부족`
                : `${index + 1}번 선택 · 고철 ${choice.cost}`
            }</span>
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
    context.clearRect(0, 0, ARENA_WIDTH, ARENA_HEIGHT);
    context.save();
    if (state.shake > 0) {
      context.translate(
        (Math.random() - 0.5) * state.shake,
        (Math.random() - 0.5) * state.shake
      );
    }

    const background = context.createLinearGradient(0, 0, 0, ARENA_HEIGHT);
    background.addColorStop(0, "#151110");
    background.addColorStop(1, "#090807");
    context.fillStyle = background;
    context.fillRect(0, 0, ARENA_WIDTH, ARENA_HEIGHT);

    context.strokeStyle = "rgba(255,255,255,0.05)";
    context.lineWidth = 1;
    for (let x = 24; x < ARENA_WIDTH; x += 48) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, ARENA_HEIGHT);
      context.stroke();
    }
    for (let y = 24; y < ARENA_HEIGHT; y += 48) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(ARENA_WIDTH, y);
      context.stroke();
    }

    context.strokeStyle = "rgba(255, 140, 66, 0.15)";
    context.lineWidth = 2;
    context.strokeRect(20, 20, ARENA_WIDTH - 40, ARENA_HEIGHT - 40);
    context.beginPath();
    context.arc(ARENA_WIDTH / 2, ARENA_HEIGHT / 2, 110, 0, Math.PI * 2);
    context.stroke();
    context.beginPath();
    context.arc(ARENA_WIDTH / 2, ARENA_HEIGHT / 2, 190, 0, Math.PI * 2);
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
        context.fillStyle = `rgba(255, 104, 61, ${activeAlpha})`;
        context.beginPath();
        context.arc(hazard.x, hazard.y, hazard.radius, 0, Math.PI * 2);
        context.fill();
        context.strokeStyle = "rgba(255, 211, 169, 0.45)";
        context.lineWidth = 2;
        context.beginPath();
        context.arc(hazard.x, hazard.y, hazard.radius * 0.72, 0, Math.PI * 2);
        context.stroke();
      }
    }

    for (const drop of state.drops) {
      const maxLife = drop.kind === "core" || drop.kind === "catalyst" ? 12 : 10;
      const fadeRatio = clamp(drop.life / maxLife, 0, 1);
      const blink = drop.life < 2.2 ? 0.45 + Math.abs(Math.sin(performance.now() * 0.02)) * 0.55 : 1;
      context.globalAlpha = clamp(fadeRatio * blink, 0.18, 1);
      if (drop.kind === "scrap") {
        context.fillStyle = "rgba(255, 209, 102, 0.9)";
        context.fillRect(drop.x - 4, drop.y - 4, 8, 8);
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
      context.strokeStyle = state.supportSystem.orbitColor;
      context.lineWidth = 1.5;
      context.beginPath();
      context.arc(state.player.x, state.player.y, state.supportSystem.orbitRadius, 0, Math.PI * 2);
      context.stroke();
      for (const satellite of getSupportSystemSatellites()) {
        context.fillStyle = state.supportSystem.color;
        context.strokeStyle = state.supportSystem.strokeColor;
        context.lineWidth = 1.4;
        if (state.supportSystem.renderShape === "shield") {
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
            satellite.radius + state.supportSystem.interceptRange * 0.45,
            0,
            Math.PI * 2
          );
          context.stroke();
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
      } else if (enemy.type === "shrike") {
        drawPolygon(context, enemy.x, enemy.y, enemy.radius, 3, enemy.wobble);
        context.fill();
      } else if (enemy.type === "elite") {
        drawPolygon(context, enemy.x, enemy.y, enemy.radius, 6, Math.PI / 6);
        context.fill();
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
    const rect = elements.canvas.getBoundingClientRect();
    const scaleX = ARENA_WIDTH / rect.width;
    const scaleY = ARENA_HEIGHT / rect.height;
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
  showScreen("title");
  requestAnimationFrame(frame);
})();

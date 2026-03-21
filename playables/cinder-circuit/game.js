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
    width: 1440,
    height: 820,
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
      duration: 78,
      spawnBudget: 138,
      activeCap: 34,
      baseSpawnInterval: 0.46,
      spawnIntervalMin: 0.14,
      spawnAcceleration: 0.3,
      eliteEvery: 7,
      mix: {
        scuttler: 0.26,
        brute: 0.28,
        shrike: 0.46,
      },
      note: "두 번째 전투 구간의 시작. Armory 직후 넓어진 작업장에서 측면 회피와 드랍 우회 수집이 다시 살아난다.",
      directive: "넓은 작업장 + bastion anchor. 점거 구역의 코어를 빨리 부숴야 외곽 회전 루트가 다시 열린다.",
      driveGainFactor: 1.22,
      arena: SECOND_ACT_ARENA,
      hazard: {
        label: "Afterglow Bastion",
        type: "territory",
        interval: 9.3,
        count: 2,
        radius: 92,
        telegraph: 1,
        duration: 8.4,
        damage: 10,
        coreHp: 42,
        coreRadius: 16,
        turretInterval: 1.15,
        turretDamage: 8,
        turretSpeed: 208,
        enemyPullRadius: 142,
      },
    },
    {
      id: "breakline",
      label: "Wave 6 · Breakline",
      duration: 82,
      spawnBudget: 154,
      activeCap: 36,
      baseSpawnInterval: 0.43,
      spawnIntervalMin: 0.13,
      spawnAcceleration: 0.31,
      eliteEvery: 6,
      mix: {
        scuttler: 0.24,
        brute: 0.3,
        shrike: 0.46,
      },
      note: "Act 2 중반. 넓어진 공간을 오래 점유하는 적이 늘어나 고철 경로를 끊임없이 다시 골라야 한다.",
      directive: "anchor crossfire. 점거 코어를 끊지 않으면 엘리트와 고철 루트가 동시에 막힌다.",
      driveGainFactor: 1.26,
      arena: SECOND_ACT_ARENA,
      hazard: {
        label: "Breakline Bastion",
        type: "territory",
        interval: 8.2,
        count: 3,
        radius: 96,
        telegraph: 0.96,
        duration: 8.8,
        damage: 11,
        coreHp: 50,
        coreRadius: 17,
        turretInterval: 1.02,
        turretDamage: 9,
        turretSpeed: 220,
        enemyPullRadius: 152,
      },
    },
    {
      id: "crownfire",
      label: "Wave 7 · Crownfire",
      duration: 86,
      spawnBudget: 172,
      activeCap: 39,
      baseSpawnInterval: 0.39,
      spawnIntervalMin: 0.12,
      spawnAcceleration: 0.32,
      eliteEvery: 6,
      mix: {
        scuttler: 0.2,
        brute: 0.28,
        shrike: 0.34,
        mortar: 0.18,
      },
      note: "Act 2 후반의 정점. 첫 mortar 포격조가 bastion 뒤에서 느린 탄막을 깔기 시작해, 넓은 전장에서도 회전 경로와 요격 가치가 같이 올라간다.",
      directive:
        "crown bastions. 점거 코어를 방치하면 전장 중앙이 닫히고, 뒤쪽 mortar 포격이 접근 각을 덮는다. 코어 돌입과 포격조 끊기 순서를 함께 읽어야 한다.",
      driveGainFactor: 1.32,
      arena: SECOND_ACT_ARENA,
      hazard: {
        label: "Crownfire Bastion Grid",
        type: "territory",
        interval: 7.5,
        count: 3,
        radius: 102,
        telegraph: 0.92,
        duration: 9.2,
        damage: 12,
        coreHp: 58,
        coreRadius: 18,
        turretInterval: 0.92,
        turretDamage: 10,
        turretSpeed: 232,
        enemyPullRadius: 164,
      },
    },
    {
      id: "forgecross",
      label: "Wave 8 · Forgecross",
      duration: 90,
      spawnBudget: 184,
      activeCap: 41,
      baseSpawnInterval: 0.375,
      spawnIntervalMin: 0.115,
      spawnAcceleration: 0.33,
      eliteEvery: 5,
      mix: {
        scuttler: 0.16,
        brute: 0.26,
        shrike: 0.28,
        mortar: 0.16,
        warden: 0.14,
      },
      note: "두 번째 전투 구간의 결산. 첫 warden 사선에 mortar 포격까지 겹쳐, 이제 마지막 Act 2 답은 단순 라인 절단이 아니라 포격원과 점거 코어 우선순위까지 포함한다.",
      directive:
        "forgecross lockout. 고정 포대만 먼저 자를지, bastion 코어를 먼저 부술지, 뒤쪽 mortar 포격을 먼저 끊을지 즉시 판단해야 Wave 9 Late Break Armory 직전 숨통이 열린다.",
      driveGainFactor: 1.36,
      arena: SECOND_ACT_ARENA,
      hazard: {
        label: "Forgecross Bastion Grid",
        type: "territory",
        interval: 7.4,
        count: 3,
        radius: 106,
        telegraph: 0.88,
        duration: 9.4,
        damage: 12,
        coreHp: 62,
        coreRadius: 18,
        turretInterval: 0.9,
        turretDamage: 10,
        turretSpeed: 236,
        enemyPullRadius: 168,
      },
    },
    {
      id: "lockgrid",
      label: "Wave 9 · Lockgrid",
      duration: 90,
      spawnBudget: 186,
      activeCap: 41,
      baseSpawnInterval: 0.37,
      spawnIntervalMin: 0.11,
      spawnAcceleration: 0.34,
      eliteEvery: 5,
      mix: {
        scuttler: 0.12,
        brute: 0.18,
        shrike: 0.2,
        mortar: 0.18,
        warden: 0.32,
      },
      note: "세 번째 전투 구간의 시작. 바깥 봉쇄선만 자르면 끝나지 않는다. 뒤쪽 mortar가 느린 포격을 쌓아 회수선과 방어 시스템의 가치를 함께 시험한다.",
      directive:
        "lockgrid crossfire. warden 사선으로 길을 열면서도, 살아남은 mortar 포격이 안전 루트에 느린 탄벽을 쌓기 전에 포격원을 잘라야 한다.",
      driveGainFactor: 1.38,
      arena: THIRD_ACT_ARENA,
      hazard: {
        label: "Lockgrid Surge",
        interval: 9.1,
        count: 3,
        radius: 74,
        telegraph: 0.82,
        duration: 4.3,
        damage: 14,
      },
    },
    {
      id: "emberward",
      label: "Wave 10 · Ember Ward",
      duration: 94,
      spawnBudget: 198,
      activeCap: 43,
      baseSpawnInterval: 0.35,
      spawnIntervalMin: 0.105,
      spawnAcceleration: 0.35,
      eliteEvery: 5,
      mix: {
        scuttler: 0.1,
        brute: 0.2,
        shrike: 0.18,
        mortar: 0.18,
        warden: 0.34,
      },
      note: "warden이 점거 코어를 지키는 동안 mortar 포격이 돌입 루트를 덮는다. 외곽 사선만 끊는 것으로는 부족하고, 포격 압박 속에서 봉쇄 구역 자체를 부숴야 다시 회전이 열린다.",
      directive:
        "warden bastions. 점거 코어를 부수지 않으면 외곽 회수선과 탈출 각이 동시에 잠기고, 뒤쪽 mortar 포격이 돌입각을 천천히 지워버린다. 사선 정리와 코어 돌입 순서를 함께 판단해야 한다.",
      driveGainFactor: 1.42,
      arena: THIRD_ACT_ARENA,
      hazard: {
        label: "Ember Ward Bastion",
        type: "territory",
        interval: 8.6,
        count: 2,
        radius: 112,
        telegraph: 0.84,
        duration: 9.4,
        damage: 13,
        coreHp: 66,
        coreRadius: 18,
        turretInterval: 0.88,
        turretDamage: 11,
        turretSpeed: 236,
        enemyPullRadius: 176,
      },
    },
    {
      id: "starforge",
      label: "Wave 11 · Starforge",
      duration: 98,
      spawnBudget: 216,
      activeCap: 46,
      baseSpawnInterval: 0.32,
      spawnIntervalMin: 0.095,
      spawnAcceleration: 0.36,
      eliteEvery: 5,
      mix: {
        scuttler: 0.12,
        brute: 0.22,
        shrike: 0.24,
        mortar: 0.2,
        warden: 0.22,
      },
      note: "세 번째 구간의 답을 다시 바꾼다. 움직이는 제련 폭주에 mortar 포격이 겹쳐, 단순 포대 정리보다 이동 경로를 갈아타며 느린 탄막과 추격조를 함께 찢어야 한다.",
      directive:
        "starforge pursuit. 추적 화구가 현재 위치를 따라붙는 동안 mortar 포격이 탈출 루트에 늦게 도착한다. 한 lane에 오래 머물 수 없고, 이동 경로를 계속 갈아타며 압박 덩어리를 찢어야 한다.",
      driveGainFactor: 1.46,
      arena: THIRD_ACT_ARENA,
      hazard: {
        label: "Starforge Pursuit",
        type: "drift",
        interval: 8.7,
        count: 2,
        radius: 84,
        telegraph: 0.74,
        duration: 5.8,
        damage: 15,
        driftSpeed: 112,
        driftOrbit: 0.42,
      },
    },
    {
      id: "cindercrown",
      label: "Wave 12 · Cinder Crown",
      duration: 104,
      spawnBudget: 232,
      activeCap: 48,
      baseSpawnInterval: 0.295,
      spawnIntervalMin: 0.09,
      spawnAcceleration: 0.37,
      eliteEvery: 4,
      mix: {
        scuttler: 0.08,
        brute: 0.16,
        shrike: 0.16,
        mortar: 0.18,
        warden: 0.42,
      },
      note: "최종 전장은 라인 소유권과 탄막 관리 둘 다 끝까지 유지해야 버틴다. 세 번째 support bay까지 열린 빌드가 없으면 외곽과 중앙, 그리고 누적 포격 궤도까지 동시에 감당하기 어렵다.",
      directive:
        "forge lattice. 사중 폭주가 퇴로를 끊는 동안 warden 사선과 mortar 포격이 겹쳐 들어온다. 외곽 정리와 즉시 돌파를 반복하며 마지막 전장을 억지로 열어야 한다.",
      driveGainFactor: 1.52,
      arena: THIRD_ACT_ARENA,
      hazard: {
        label: "Cinder Crown Surge",
        interval: 7.6,
        count: 4,
        radius: 88,
        telegraph: 0.72,
        duration: 4.9,
        damage: 16,
      },
    },
  ];

  const MAX_WAVES = WAVE_CONFIG.length;
  const POST_WAVE_LOOT_GRACE = 2.4;
  const FINAL_CASHOUT_DURATION = 12;
  const FINAL_CASHOUT_SPAWN_BUDGET = 26;

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

  function getActLabelForWave(waveNumber) {
    const act = ACT_LABELS.find((entry) => waveNumber >= entry.start && waveNumber <= entry.end);
    return act || ACT_LABELS[ACT_LABELS.length - 1];
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
  const MAX_SUPPORT_BAY_LIMIT = 3;
  const SUPPORT_SYSTEM_DEFS = {
    ember_ring: {
      id: "ember_ring",
      forgeWaveMin: 3,
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
      forgeWaveMin: 3,
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
      forgeWaveMin: 2,
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
      forgeWaveMin: 4,
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
            "Wave 4 forge bracket부터 해금되는 추적 미사일 랙 1기를 설치한다. 멀리 벌어진 적에게 자동 사격을 꽂아 넓은 작업장에서 화력 회수를 돕는다.",
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
      forgeWaveMin: 4,
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

  const BASTION_DOCTRINE_DEFS = {
    relay_oath: {
      id: "mirror_hunt",
      signatureId: "relay_oath",
      label: "Mirror Hunt Doctrine",
      tag: "HUNT",
      short: "추적 미사일 · 드라이브 압박",
      description:
        "반사 코어를 추적 압박 회로에 묶는다. Act 2부터 외곽 정리와 드라이브 순환을 함께 밀어붙이는 사냥형 운영을 강제한다.",
      perkText: "Drive +12% · Move +14 · 이후 포지가 추적/연쇄 라인을 먼저 민다.",
      preferredSystemIds: ["seeker_array", "volt_drones"],
      preferredModIds: ["drive_sync", "arc_array", "step_servos"],
      preferredAffixIds: ["arc_link", "overclock"],
      favoredCoreId: "ricochet",
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
      short: "전방 포탑 · 회수 요새",
      description:
        "수거 회로를 전방 거점 운영으로 굳힌다. 포탑과 방호 차체를 더 자주 밀어 올려, Act 2 전장을 회수 가능한 요새로 바꾸게 만든다.",
      perkText: "Max HP +14 · Hazard Mitigation +8% · 이후 포지가 포탑/방호 라인을 먼저 민다.",
      preferredSystemIds: ["kiln_sentry", "aegis_halo"],
      preferredModIds: ["armor_mesh", "magnet_rig", "reactor_cap"],
      preferredAffixIds: ["salvage_link", "thermal_weave"],
      favoredCoreId: "scatter",
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
      description:
        "관통 냉각 회로를 장거리 포격 교리로 고정한다. 관통/연쇄 보강과 자율 포격을 더 자주 밀어 올려 긴 사선을 끝까지 유지하게 만든다.",
      perkText: "Damage +4 · Cool +6 · 이후 포지가 관통/포격 라인을 먼저 민다.",
      preferredSystemIds: ["volt_drones", "seeker_array"],
      preferredModIds: ["rail_sleeve", "arc_array", "heat_sink"],
      preferredAffixIds: ["phase_rounds", "arc_link"],
      favoredCoreId: "lance",
      apply(build) {
        build.damageBonus += 4;
        build.coolRateBonus += 6;
      },
    },
  };

  const DEFAULT_SIGNATURE_ID = "relay_oath";
  const FORGE_PACKAGE_START_WAVE = 3;
  const ACT_BREAK_ARMORY_WAVE = 5;
  const LATE_BREAK_ARMORY_WAVE = 9;
  const ACT_LABELS = [
    { start: 1, end: 4, label: "Act 1 · Ignition", shortLabel: "Act 1" },
    { start: 5, end: 8, label: "Act 2 · Bastion Run", shortLabel: "Act 2" },
    { start: 9, end: 12, label: "Act 3 · Crown Siege", shortLabel: "Act 3" },
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
    bastionDoctrineId: null,
    supportBayCap: 2,
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
      statusNote: systems.map((system) => system.statusNote).join(" "),
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
    const installChoices = shuffle(
      Object.keys(SUPPORT_SYSTEM_DEFS).filter(
        (systemId) => !installedMap.has(systemId) && isSupportSystemUnlocked(systemId, nextWave)
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
              ? `${tierDef.description} 기존 ${installedSystems.map((entry) => SUPPORT_SYSTEM_DEFS[entry.id].tiers[entry.tier].label).join(" + ")}와 병렬 베이에 탑재된다.`
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
    const nextWave = options.nextWave || 0;
    return nextWave === 6 || nextWave === 8;
  }

  function shouldUseFieldGrant(options) {
    if (!options || options.finalForge) {
      return false;
    }
    const nextWave = options.nextWave || 0;
    return (
      nextWave >= FORGE_PACKAGE_START_WAVE &&
      !shouldRunActBreakArmory(options) &&
      !shouldRunBastionDraft(options)
    );
  }

  function unlockLateSupportBay(build) {
    if (!build || getSupportBayCapacity(build) >= MAX_SUPPORT_BAY_LIMIT) {
      return false;
    }
    build.supportBayCap = MAX_SUPPORT_BAY_LIMIT;
    return true;
  }

  function getForgeDraftType(options) {
    if (options && options.finalForge) {
      return "final";
    }
    if (shouldRunActBreakArmory(options)) {
      return "armory";
    }
    if (shouldRunBastionDraft(options)) {
      return "bastion_draft";
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
        bastionDoctrineId: BASE_BUILD.bastionDoctrineId,
        supportBayCap: BASE_BUILD.supportBayCap,
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
    const signatureId =
      typeof buildOrSignatureId === "string"
        ? buildOrSignatureId
        : buildOrSignatureId.signatureId || null;
    return signatureId ? BASTION_DOCTRINE_DEFS[signatureId] || null : null;
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
      evolutionTier: 0,
      evolutionLabel: null,
      evolutionTraitLabel: null,
      evolutionStatusNote: null,
      evolutionFirePattern: null,
      capstoneFire: null,
      capstoneOnHit: null,
      capstoneOnBounce: null,
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
    const supportSystemChoices = shouldOfferSupportSystem(build, options)
      ? createSupportSystemChoices(build, random, options)
      : [];
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
        return markForgeLane(choice, laneLabel);
      }
      return null;
    };
    const choices = [];
    const takenIds = new Set(excludedIds);
    const primarySpikePool = [...evolutionCandidates, ...offensiveModuleCandidates, ...offensiveSpikeCandidates];
    const hedgePool = [...subsystemCandidates, ...chassisCandidates];
    const flexPool = [...primarySpikePool, ...hedgePool];
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
    const currentAffixIds = sanitizeAffixIds(build.affixes, getAffixCapacity(build));
    const catalystReforgeChoice = createCatalystReforgeChoice(build);
    const recycleChoice = createRecycleChoice(build);
    const reforgeChoice = catalystReforgeChoice || createReforgeChoice(build, random);
    const affixReforgeChoice = createAffixReforgeChoice(build, random);
    const finisherChoice = createRecipeFinisherChoice(build);
    const weaponEvolutionChoice = createWeaponEvolutionChoice(build, options);
    const supportSystemChoices = shouldOfferSupportSystem(build, options)
      ? createSupportSystemChoices(build, random, options)
      : [];
    const doctrine = build && build.bastionDoctrineId ? getBastionDoctrineDef(build) : null;
    const guaranteedMidrunChase = shouldGuaranteeMidrunChase(options)
      ? createGuaranteedChaseChoice(build)
      : null;
    const packagePrimary = shouldForceForgePackage(options) && (options.packageStep || 1) === 1;
    pushChoiceIfOpen(evolutionCandidates, weaponEvolutionChoice, choiceCatalog);
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
      if (choice.forgeLaneLabel === "공세 모듈") {
        pushChoiceIfOpen(offensiveModuleCandidates, choice, choiceCatalog);
      } else {
        pushChoiceIfOpen(subsystemCandidates, choice, choiceCatalog);
      }
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

    const nextWave = options && Number.isFinite(options.nextWave) ? options.nextWave : 0;
    if (nextWave < FORGE_PACKAGE_START_WAVE && subsystemCandidates.length > 0) {
      const takenIds = new Set();
      return [
        takeFirstAvailableChoice(evolutionCandidates, takenIds, "주무장 진화"),
        takeFirstAvailableChoice(commitCandidates, takenIds, "빌드 고정"),
        takeFirstAvailableChoice(pivotCandidates, takenIds, "전환"),
        takeFirstAvailableChoice(subsystemCandidates, takenIds, "보조 시스템"),
      ].filter(Boolean);
    }

    const takenIds = new Set();
    const laneChoices = [
      takeFirstAvailableChoice(evolutionCandidates, takenIds, "주무장 진화"),
      takeFirstAvailableChoice(commitCandidates, takenIds, "빌드 고정"),
      takeFirstAvailableChoice(pivotCandidates, takenIds, "전환"),
      takeFirstAvailableChoice(offensiveModuleCandidates, takenIds, "공세 모듈"),
      takeFirstAvailableChoice(subsystemCandidates, takenIds, "보조 시스템"),
      takeFirstAvailableChoice(sustainCandidates, takenIds, "생존/경제"),
    ].filter(Boolean);
    const choices = getInstalledSupportSystems(build).length === 0 && subsystemCandidates.length > 1
      ? laneChoices.filter((choice) => choice.laneLabel !== "생존/경제")
      : laneChoices;
    const maxChoices =
      subsystemCandidates.length > 0 || offensiveModuleCandidates.length > 0 ? 6 : 4;
    const extraChoicePool = getInstalledSupportSystems(build).length === 0 && subsystemCandidates.length > 1
      ? [
          ...offensiveModuleCandidates,
          ...subsystemCandidates,
          ...evolutionCandidates,
          ...commitCandidates,
          ...pivotCandidates,
          ...sustainCandidates,
        ]
      : [
          ...evolutionCandidates,
          ...commitCandidates,
          ...pivotCandidates,
          ...offensiveModuleCandidates,
          ...subsystemCandidates,
          ...sustainCandidates,
        ];

    for (const choice of extraChoicePool) {
      if (choices.length >= maxChoices) {
        break;
      }
      if (takenIds.has(choice.id)) {
        continue;
      }
      takenIds.add(choice.id);
      choices.push(
        markForgeLane(
          choice,
          choice.type === "system" ? choice.forgeLaneLabel || "보조 시스템" : "예비"
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

  function isEligibleFieldGrantChoice(choice) {
    if (!choice) {
      return false;
    }
    if (choice.type === "fallback") {
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
    return 0;
  }

  function getFieldGrantChoiceBucket(choice) {
    if (!choice) {
      return "fallback";
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
    return choice.type || "choice";
  }

  function createFieldGrantCard(choice) {
    if (!choice) {
      return null;
    }
    const originalCost = Math.max(0, choice.cost || 0);
    const fieldGrantCost =
      choice.type === "fallback"
        ? 0
        : Math.max(
            FIELD_GRANT_MIN_COST,
            Math.round(originalCost * FIELD_GRANT_DISCOUNT_MULTIPLIER)
          );
    return {
      ...choice,
      cost: fieldGrantCost,
      originalCost,
      slotText:
        choice.type === "fallback"
          ? "현장 안정화"
          : `현장 장착 · 할인 ${Math.max(0, originalCost - fieldGrantCost)}`,
      fieldGrant: true,
    };
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

  function getDoctrinePreferenceScore(choice, doctrine) {
    if (!choice || !doctrine) {
      return 0;
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

  function createBastionDoctrineChoice(build, rng, nextWave) {
    const doctrine = getBastionDoctrineDef(build);
    const spikeChoice = createBastionDraftSpikeChoice(build, rng, nextWave);
    if (!doctrine || !spikeChoice) {
      return spikeChoice;
    }
    return {
      type: "utility",
      action: "bastion_doctrine",
      id: `utility:bastion_doctrine:${doctrine.id}`,
      verb: "채택",
      tag: "DOCTRINE",
      title: doctrine.label,
      description:
        `${doctrine.description} 즉시 ${spikeChoice.title}을(를) 할인 장착하고, 이후 포지 후보가 ${doctrine.short} 방향으로 기울어진다.`,
      slotText: `교리 채택 · ${spikeChoice.title} · ${doctrine.short}`,
      cost: spikeChoice.cost,
      laneLabel: "교리 채택",
      forgeLaneLabel: "교리 채택",
      doctrineId: doctrine.id,
      doctrineLabel: doctrine.label,
      doctrineChoice: spikeChoice,
    };
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
        "즉시 고철 +56과 회수 효율 +12%를 얻지만, 최대 체력 -22와 현재 체력 18 피해를 영구적으로 감수한다. 다음 Armory까지 greed를 강제하는 Act 2 계약.",
      slotText: "고철 +56 · 회수 +12% · 최대 체력 -22",
      cost: 0,
      scrapGain: 56,
      scrapMultiplierGain: 0.12,
      maxHpPenalty: 22,
      hpLoss: 18,
      laneLabel: "Siege Pact",
      forgeLaneLabel: "고통 계약",
    };
  }

  function buildBastionDraftChoices(build, rng, nextWave) {
    const spikeChoice = build && build.bastionDoctrineId
      ? createBastionDraftSpikeChoice(build, rng, nextWave)
      : createBastionDoctrineChoice(build, rng, nextWave);
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
    if (pool.length === 0) {
      return [createFieldGrantCard({
        type: "fallback",
        id: "fieldgrant:emergency_vent",
        tag: "CACHE",
        title: "Emergency Vent",
        description: "전장 보급품이 냉각제와 간이 수복만 남겼다. 고철은 아끼고 다음 웨이브로 바로 간다.",
        slotText: "현장 보급",
        cost: 0,
        laneLabel: "회수",
      })];
    }
    const choices = [];
    const takenIds = new Set();
    const takenBuckets = new Set();
    for (const choice of pool) {
      const bucket = getFieldGrantChoiceBucket(choice);
      if (takenBuckets.has(bucket)) {
        continue;
      }
      choices.push(createFieldGrantCard(choice));
      takenIds.add(choice.id);
      takenBuckets.add(bucket);
      if (choices.length >= 2) {
        break;
      }
    }
    for (const choice of pool) {
      if (choices.length >= 2) {
        break;
      }
      if (takenIds.has(choice.id)) {
        continue;
      }
      choices.push(createFieldGrantCard(choice));
      takenIds.add(choice.id);
    }
    choices.push(createFieldGrantCard({
      type: "fallback",
      id: "fieldgrant:emergency_vent",
      tag: "CACHE",
      title: "Emergency Vent",
      description: "고철을 쓰지 않고 열과 체력만 정리한 채 다음 웨이브로 바로 넘긴다.",
      slotText: "현장 보급",
      cost: 0,
      laneLabel: "회수",
    }));
    return choices;
  }

  function enterFieldGrant() {
    const nextWave = state.waveIndex + 2;
    state.phase = "forge";
    state.pendingFinalForge = false;
    state.forgeStep = 1;
    state.forgeMaxSteps = 1;
    state.forgeDraftType = "field_grant";
    state.forgeChoices = buildFieldGrantChoices(state.build, Math.random, nextWave);
    pushCombatFeed(
      "Field Cache 확보. 할인 장착으로 지금 고철을 태우거나, Emergency Vent로 자원을 아낀 채 전장을 다시 가동한다.",
      "CACHE"
    );
    setBanner("Field Cache", 0.95);
    renderForgeOverlay();
    updateHUD();
  }

  function getBastionDraftIntroText(build) {
    if (!build || !build.bastionDoctrineId) {
      const doctrine = getBastionDoctrineDef(build);
      return doctrine
        ? `${doctrine.label} 교리 1장, 고통 계약 1장, 무료 안정화 1장 중 하나로 Act 2 운영을 직접 비튼다.`
        : "할인 spike 1장, 고통 계약 1장, 무료 안정화 1장 중 하나로 Act 2 운영을 직접 비튼다.";
    }
    return "이미 채택한 교리 위에 추가 spike 1장, 고통 계약 1장, 무료 안정화 1장 중 하나로 Act 2 greed를 더 밀어붙인다.";
  }

  function enterBastionDraft() {
    const nextWave = state.waveIndex + 2;
    state.phase = "forge";
    state.pendingFinalForge = false;
    state.forgeStep = 1;
    state.forgeMaxSteps = 1;
    state.forgeDraftType = "bastion_draft";
    state.forgeChoices = buildBastionDraftChoices(state.build, Math.random, nextWave);
    pushCombatFeed(
      `Bastion Draft 개시. ${getBastionDraftIntroText(state.build)}`,
      "DRAFT"
    );
    setBanner("Bastion Draft", 0.95);
    renderForgeOverlay();
    updateHUD();
  }

  function getForgeDraftDisplayName(draftType) {
    if (draftType === "field_grant") {
      return "Field Cache";
    }
    if (draftType === "bastion_draft") {
      return "Bastion Draft";
    }
    return "Forge";
  }

  function buildForgeFollowupChoices(build, rng, scrapBank, options = null, previousChoice = null) {
    const random = typeof rng === "function" ? rng : Math.random;
    if (shouldRunActBreakArmory(options)) {
      return buildActBreakArmoryChoices(
        build,
        random,
        scrapBank,
        options,
        previousChoice ? new Set([previousChoice.id]) : null
      );
    }
    const packageFollowup = shouldForceForgePackage(options);
    const choices = packageFollowup
      ? buildForgeChoices(build, random, scrapBank, { ...options, packageStep: 2 }).filter((choice) => {
          if (
            !choice ||
            (
              choice.laneLabel !== "공세 모듈" &&
              choice.laneLabel !== "보조 시스템" &&
              choice.laneLabel !== "생존/경제"
            )
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

    if (choice.type === "utility" && choice.action === "bastion_pact") {
      if (run.resources) {
        run.resources.scrap += Math.max(0, choice.scrapGain || 0);
      }
      if (run.stats) {
        run.stats.scrapCollected += Math.max(0, choice.scrapGain || 0);
      }
      run.build.scrapMultiplier += choice.scrapMultiplierGain || 0;
      run.build.maxHpBonus -= Math.max(0, choice.maxHpPenalty || 0);
      run.build.upgrades.push(
        `Bastion Pact: 고철 +${Math.max(0, choice.scrapGain || 0)} / 최대 체력 -${Math.max(0, choice.maxHpPenalty || 0)}`
      );
      if (run.player) {
        run.player.hp = Math.max(1, run.player.hp - Math.max(0, choice.hpLoss || 0));
        run.player.heat = Math.max(0, run.player.heat - 24);
        run.player.overheated = false;
      }
      return choice;
    }

    if (choice.type === "utility" && choice.action === "bastion_doctrine") {
      const doctrine = getBastionDoctrineDef(run.build);
      if (doctrine && run.build.bastionDoctrineId !== doctrine.id) {
        run.build.bastionDoctrineId = doctrine.id;
        doctrine.apply(run.build, run);
        run.build.upgrades.push(`교리 채택: ${doctrine.label}`);
      }
      if (choice.doctrineChoice) {
        applyForgeChoice(run, choice.doctrineChoice);
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
    ACT_BREAK_ARMORY_WAVE,
    LATE_BREAK_ARMORY_WAVE,
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
    createFinalCashoutWave,
    getFinalCashoutTransitionProfile,
    applyFinalCashoutTransition,
    chooseHazardSpawn,
    buildHazardCandidates,
    buildForgeChoices,
    buildForgeFollowupChoices,
    buildFieldGrantChoices,
    buildBastionDraftChoices,
    applyForgeChoice,
    shouldUseFieldGrant,
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
        : wave.hazard.type === "drift"
          ? "다음 추적"
          : "다음 폭주";
    const note =
      wave.hazard.type === "territory"
        ? `${wave.hazard.count}개 점거 코어가 ${wave.hazard.telegraph.toFixed(1)}초 예고 후 전장을 봉쇄한다.`
        : wave.hazard.type === "drift"
          ? `${wave.hazard.count}개 추적 화구가 ${wave.hazard.telegraph.toFixed(1)}초 예고 후 플레이어 동선을 따라붙는다.`
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
      weapon.capstoneTraitLabel ? weapon.capstoneTraitLabel : null,
    ].filter(Boolean);
  }

  function getSupportSystemSummary(systemStats) {
    if (!systemStats) {
      return "보조 시스템 없음";
    }
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
      ]
        .filter(Boolean)
        .join(" + ");
      return traits ? `${familySummary} · ${traits}` : familySummary;
    }
    if (systemStats.deployCount > 0) {
      return systemStats.tier >= 2
        ? `${systemStats.label} · 포탑 ${systemStats.deployCount}기 · 전방 거점`
        : `${systemStats.label} · 포탑 ${systemStats.deployCount}기`;
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
      weapon: computeWeaponStats(build),
      playerStats: computePlayerStats(build),
      supportSystem: computeSupportSystemStats(build),
      supportSystemRuntime: {
        angle: 0,
        shotCooldowns: [],
        touchCooldowns: [],
        interceptCooldowns: [],
        deployCooldowns: [],
      },
      supportDeployables: [],
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
    const currentWaveNumber = clamp(state.waveIndex + 1, 1, MAX_WAVES);
    const currentAct = getActLabelForWave(currentWaveNumber);
    const label =
      state.phase === "forge"
        ? `Forge Stop · ${currentAct.shortLabel} · Wave ${state.waveIndex + 1}`
        : state.phase === "result"
          ? "Run Complete"
          : `${currentAct.shortLabel} · Wave ${state.waveIndex + 1} / ${MAX_WAVES}`;
    elements.runTrackLabel.textContent = label;
    elements.waveTrack.innerHTML = WAVE_CONFIG.map((wave, index) => {
      const waveNumber = index + 1;
      const act = getActLabelForWave(waveNumber);
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
          <p class="panel__eyebrow">${act.shortLabel} · Wave ${waveNumber}</p>
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
      heat: 0,
      overheated: false,
      drive: 0,
      overdriveActiveTime: 0,
      invulnerableTime: 0,
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
        shotCooldowns: [],
        touchCooldowns: [],
        interceptCooldowns: [],
        deployCooldowns: [],
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

  function beginWave(index) {
    const config = WAVE_CONFIG[index];
    const arena = getArenaSize(config);
    state.waveIndex = index;
    state.phase = "wave";
    state.pendingFinalForge = false;
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
      driveGainFactor: config.driveGainFactor || 1,
      hazard: config.hazard,
      hazardTimer: config.hazard ? config.hazard.interval * 0.8 : Number.POSITIVE_INFINITY,
    };
    state.waveClearTimer = 0;
    state.enemies = [];
    state.projectiles = [];
    state.drops = [];
    state.hazards = [];
    state.slagPools = [];
    state.particles = [];
    state.supportDeployables = [];
    syncArenaCanvas();
    state.player.x = arena.width / 2;
    state.player.y = arena.height / 2;
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
    const forgeOptions = {
      finalForge: isFinalForge,
      nextWave: state.waveIndex + 2,
      packageStep: 1,
    };
    const draftType = getForgeDraftType(forgeOptions);
    const armoryLabel = getArmoryLabel(forgeOptions);
    const startsPackage = draftType === "package" || draftType === "armory";
    state.phase = "forge";
    state.pendingFinalForge = isFinalForge;
    state.forgeStep = 1;
    state.forgeMaxSteps = startsPackage ? 2 : 1;
    state.forgeDraftType = draftType;
    if (!isFinalForge && isLateBreakArmory(forgeOptions) && unlockLateSupportBay(state.build)) {
      state.build.upgrades.push("Aux Bay Uplink");
      pushCombatFeed(
        "Wave 8 돌파. Late Break Armory가 열리며 세 번째 support bay가 해금된다.",
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
    pushCombatFeed(
      isFinalForge
        ? "최종 웨이브 정리 완료. 마지막 포지에서 최종 각인과 화력 배치를 마감한다."
        : isLateBreakArmory(forgeOptions)
          ? "Wave 8 돌파. Late Break Armory에서 6장 중 대형 카드 두 장을 골라 세 번째 베이까지 포함한 4웨이브짜리 Act 3 화력 틀을 잠근다."
        : draftType === "armory"
          ? "Wave 4 돌파. Act Break Armory에서 6장 중 대형 카드 두 장을 골라 4웨이브짜리 Act 2 빌드 정체성을 일찍 고정한다."
          : "웨이브 종료. 포지 카드로 다음 화력 축을 고른다.",
      "FORGE"
    );
    setBanner(
      isFinalForge ? "최종 포지" : draftType === "armory" ? armoryLabel : "포지 정지",
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
      arena: getArenaSize(baseConfig),
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
    run.arena = getArenaSize(run.wave);
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
    const instantDraft =
      state.forgeDraftType === "field_grant" || state.forgeDraftType === "bastion_draft";
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
        state.forgeDraftType === "bastion_draft"
          ? choice.type === "fallback"
            ? `${grantLabel} 적용. Bastion Draft를 안정화로 넘기고 다음 웨이브를 바로 연다.`
            : choice.action === "bastion_pact"
              ? `${grantLabel} 적용. 최대 체력을 깎아 고철을 쥐고 다음 웨이브를 연다.`
              : choice.action === "bastion_doctrine"
                ? `${choice.doctrineLabel} 적용. 즉시 ${choice.doctrineChoice ? choice.doctrineChoice.title : "spike"}를 잠그고 이후 포지를 해당 교리 쪽으로 기울인 채 다음 웨이브를 연다.`
              : `${grantLabel} 적용. 고철 ${choice.cost}을 태워 ${choice.title}을 일찍 잠그고 다음 웨이브를 강행한다.`
          : choice.type === "fallback"
            ? `${grantLabel} 현장 보급 적용. 고철은 아낀 채 ${choice.title}로 상태만 정리하고 다음 웨이브를 즉시 연다.`
            : `${grantLabel} 현장 보급 적용. 고철 ${choice.cost}을 태워 ${choice.title}을 잠그고 다음 웨이브를 즉시 밀어붙인다.`,
        state.forgeDraftType === "bastion_draft" ? "DRAFT" : "CACHE"
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
          ? `${choice.tag} · ${choice.title} 적용. ${getArmoryLabel({ nextWave: state.waveIndex + 2 })} 두 번째 장에서 남은 대형 화력/차체 카드 1장을 더 고른다.`
          : `${choice.tag} · ${choice.title} 적용. 패키지 마감 슬롯에서 보조 시스템 또는 안정화 카드를 1장 더 고른다.`,
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
    state.enemies.push({
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
      driftSpeed: Number.isFinite(config.driftSpeed) ? config.driftSpeed : 0,
      driftOrbit: Number.isFinite(config.driftOrbit) ? config.driftOrbit : 0.34,
      orbitDirection: Math.random() < 0.5 ? -1 : 1,
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

  function destroyHazard(hazard, reason = "expired") {
    hazard.telegraphTime = 0;
    hazard.activeTime = 0;
    if (reason === "destroyed") {
      state.shake = Math.max(state.shake, 5);
      for (let index = 0; index < 10; index += 1) {
        state.particles.push(createParticle(hazard.x, hazard.y, "#ffd7a6", 1));
      }
      pushCombatFeed(`${hazard.label} 코어 파괴. 점거 구역이 붕괴했다.`, "CORE");
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
        if (hazard.type === "drift" && hazard.driftSpeed > 0) {
          const chaseVector = normalizeVector(
            state.player.x - hazard.x,
            state.player.y - hazard.y,
            1,
            0
          );
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
          if (
            distance < hazard.radius + state.player.radius &&
            state.player.invulnerableTime <= 0
          ) {
            takePlayerDamage(hazard.damage, "hazard");
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

      if (hazard.type === "territory" && hazard.coreHp <= 0 && hazard.activeTime > 0) {
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
      if (
        hazard.type !== "territory" ||
        hazard.telegraphTime > 0 ||
        hazard.activeTime <= 0 ||
        hazard.coreHp <= 0
      ) {
        continue;
      }
      const distance = Math.hypot(hazard.x - x, hazard.y - y);
      if (distance > radius + hazard.coreRadius) {
        continue;
      }
      hazard.coreHp -= damage * hazardDamageFactor;
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

    if (weapon.evolutionFirePattern) {
      if (weapon.evolutionFirePattern.kind === "slag_seed") {
        const count = Math.max(1, weapon.evolutionFirePattern.count || 1);
        const half = (count - 1) / 2;
        for (let seedIndex = 0; seedIndex < count; seedIndex += 1) {
          const offset = (seedIndex - half) * (weapon.evolutionFirePattern.spread || 0);
          const angle = baseAngle + offset;
          state.projectiles.push(
            createPlayerProjectile(angle, weapon, driveActive, {
              vx:
                Math.cos(angle) *
                weapon.projectileSpeed *
                weapon.evolutionFirePattern.speedMultiplier *
                (driveActive ? 1.12 : 1),
              vy:
                Math.sin(angle) *
                weapon.projectileSpeed *
                weapon.evolutionFirePattern.speedMultiplier *
                (driveActive ? 1.12 : 1),
              radius: weapon.evolutionFirePattern.radius,
              damage: round(
                (weapon.damage + (driveActive ? 8 : 0)) *
                  weapon.evolutionFirePattern.damageMultiplier,
                1
              ),
              life: weapon.evolutionFirePattern.life,
              pierce: 0,
              bounce: 0,
              chain: 0,
              chainRange: 0,
              color: weapon.evolutionFirePattern.color,
              slagSeed: {
                blastRadius: weapon.evolutionFirePattern.blastRadius,
                blastDamage: round(
                  (weapon.damage + (driveActive ? 8 : 0)) *
                    weapon.evolutionFirePattern.blastDamageMultiplier,
                  1
                ),
                poolRadius: weapon.evolutionFirePattern.poolRadius,
                poolDuration: weapon.evolutionFirePattern.poolDuration,
                poolTickInterval: weapon.evolutionFirePattern.poolTickInterval,
                poolDamage: round(
                  (weapon.damage + (driveActive ? 8 : 0)) *
                    weapon.evolutionFirePattern.poolDamageMultiplier,
                  1
                ),
                poolColor: weapon.evolutionFirePattern.poolColor,
                particleColor: weapon.evolutionFirePattern.color,
              },
            })
          );
        }
      } else {
        weapon.evolutionFirePattern.offsets.forEach((offset) => {
          const angle = baseAngle + offset;
          state.projectiles.push(
            createPlayerProjectile(angle, weapon, driveActive, {
              vx:
                Math.cos(angle) *
                weapon.projectileSpeed *
                weapon.evolutionFirePattern.speedMultiplier *
                (driveActive ? 1.12 : 1),
              vy:
                Math.sin(angle) *
                weapon.projectileSpeed *
                weapon.evolutionFirePattern.speedMultiplier *
                (driveActive ? 1.12 : 1),
              radius: weapon.evolutionFirePattern.radius,
              damage: round(
                (weapon.damage + (driveActive ? 8 : 0)) *
                  weapon.evolutionFirePattern.damageMultiplier,
                1
              ),
              life: weapon.evolutionFirePattern.life,
              pierce: weapon.pierce + weapon.evolutionFirePattern.pierceBonus,
              bounce: weapon.bounce + weapon.evolutionFirePattern.bounceBonus,
              chain: weapon.chain + weapon.evolutionFirePattern.chainBonus,
              chainRange: weapon.chainRange,
              color: weapon.evolutionFirePattern.color,
            })
          );
        });
      }
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

    const magnitude = Math.hypot(move.x, move.y) || 1;
    const speed =
      state.player.moveSpeed + (state.player.overdriveActiveTime > 0 ? 34 : 0);
    state.player.x += (move.x / magnitude) * speed * dt;
    state.player.y += (move.y / magnitude) * speed * dt;

    state.player.x = clamp(state.player.x, 18, arena.width - 18);
    state.player.y = clamp(state.player.y, 18, arena.height - 18);

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

      const speed = def.speed * (1 + state.waveIndex * 0.06) * speedMultiplier;
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
            if (
              hazard.type !== "territory" ||
              hazard.telegraphTime > 0 ||
              hazard.activeTime <= 0 ||
              hazard.coreHp <= 0
            ) {
              continue;
            }
            const distance = Math.hypot(projectile.x - hazard.x, projectile.y - hazard.y);
            if (distance < projectile.radius + hazard.coreRadius) {
              hazard.coreHp -= projectile.damage;
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
      enemy.type === "elite"
        ? 24
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
        const nextWave = state.waveIndex + 2;
        const nextPhaseLabel = state.wave.completesRun
          ? "최종 포지"
          : shouldRunActBreakArmory({ nextWave, finalForge: false })
            ? getArmoryLabel({ nextWave })
            : shouldRunBastionDraft({ nextWave, finalForge: false })
              ? "Bastion Draft"
            : shouldUseFieldGrant({ nextWave, finalForge: false })
              ? "Field Cache"
              : "포지";
        setBanner("전장 정리", 0.9);
        pushCombatFeed(
          `적 반응 정지. 남은 고철을 회수한 뒤 ${nextPhaseLabel}로 이어진다.`,
          "CLEAR"
        );
        return;
      }

      state.waveClearTimer = Math.max(0, state.waveClearTimer - dt);
      if (state.waveClearTimer <= 0) {
        if (state.wave.completesRun) {
          finishRun(true);
        } else if (shouldRunBastionDraft({ nextWave: state.waveIndex + 2, finalForge: false })) {
          enterBastionDraft();
        } else if (shouldUseFieldGrant({ nextWave: state.waveIndex + 2, finalForge: false })) {
          enterFieldGrant();
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
      state.phase === "forge"
        ? `${waveConfig.label} · ${getForgeDraftDisplayName(state.forgeDraftType)}`
        : waveConfig.label;
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
    const evolutionSummary = weapon.evolutionLabel
      ? `${weapon.evolutionLabel} · ${weapon.evolutionTraitLabel}`
      : null;
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
          ${weapon.evolutionLabel ? createMiniPill("EVO", weapon.evolutionLabel, "accent") : ""}
          ${capstoneSummary ? createMiniPill("CAP", weapon.capstoneLabel, "hot") : ""}
          ${state.supportSystem ? createMiniPill("SYS", state.supportSystem.label, "accent") : ""}
          ${weapon.affixLabels.map((label) => createMiniPill("속성", label, "cool")).join("")}
        </div>
        <p class="summary-note">${[affixSummary, evolutionSummary, capstoneSummary, supportSystemSummary, `보관 ${weapon.benchCopies}개 대기`].filter(Boolean).join(" · ")}</p>
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
          <strong>${
            state.phase === "forge"
              ? state.forgeDraftType === "field_grant"
                ? "Field Cache 선택 중"
                : state.forgeDraftType === "bastion_draft"
                  ? "Bastion Draft 선택 중"
                  : "포지 선택 중"
              : "전투 진행 중"
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
            : `${weapon.evolutionStatusNote ? `${weapon.evolutionStatusNote} ` : ""}${weapon.capstoneStatusNote ? `${weapon.capstoneStatusNote} ` : ""}${state.supportSystem ? `${state.supportSystem.statusNote} ` : ""}${hazardStatus.note} 자동 사격은 과열 전까지 유지된다.`
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
    const evolutionSummary = state.weapon.evolutionLabel
      ? `${state.weapon.evolutionLabel} · ${state.weapon.evolutionTraitLabel}`
      : "주무장 진화 없음";
    const capstoneSummary = state.weapon.capstoneLabel
      ? `${state.weapon.capstoneLabel} · ${state.weapon.capstoneTraitLabel}`
      : "활성 촉매 재구성 없음";
    const forgeSystemSummary = getSupportSystemSummary(state.supportSystem);
    const supportBaySummary = `${getInstalledSupportSystems(state.build).length}/${getSupportBayCapacity(state.build)} 베이`;
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
    const forgeOptions = {
      finalForge: state.pendingFinalForge,
      nextWave: state.waveIndex + 2,
    };
    const armoryLabel = getArmoryLabel(forgeOptions);
    const packageSummary =
      state.forgeDraftType === "field_grant"
        ? "Field Cache · 할인 장착 2장과 무료 회수 1장 중 1픽, 지금 고철을 태울지 아낄지 고른다"
        : state.forgeDraftType === "bastion_draft"
        ? state.build.bastionDoctrineId
          ? "Bastion Draft · 기존 교리 위에 추가 spike 또는 고통 계약을 더 얹어 Act 2 greed를 강제한다"
          : "Bastion Draft · 시그니처 교리 1장, 고통 계약 1장, 무료 안정화 1장 중 1픽으로 Act 2 posture를 잠근다"
        : state.forgeDraftType === "armory"
        ? isLateBreakArmory(forgeOptions)
          ? `${armoryLabel} ${state.forgeStep}/${state.forgeMaxSteps} · 6장 중 2픽, 세 번째 베이까지 열린 상태에서 마지막 과투입을 강제한다`
          : `${armoryLabel} ${state.forgeStep}/${state.forgeMaxSteps} · 6장 중 2픽, 대형 화력이 과투입되어 안전한 lane 보장이 없다`
        : state.forgeMaxSteps > 1
        ? `패키지 ${state.forgeStep}/${state.forgeMaxSteps} · 1슬롯 화력/전환, 2슬롯 시스템/안정화`
        : state.waveIndex + 2 >= FORGE_PACKAGE_START_WAVE && !state.pendingFinalForge
          ? "Wave 3+ 포지는 두 슬롯으로 진행된다: 먼저 화력/전환, 다음 시스템/안정화"
          : "단일 포지 선택";
    elements.forgeSubtitle.textContent = state.pendingFinalForge
      ? catalystReady
        ? `고철 ${Math.round(state.resources.scrap)} 보유. 최종 포지다. 세 장은 완성, 촉매 연소, 안정화로 고정되며 각 카드가 바로 이어질 12초 cash-out 시험을 미리 보여준다.`
        : `고철 ${Math.round(state.resources.scrap)} 보유. 최종 포지다. 촉매가 없어도 비상 점화와 안정화 fail-soft 카드가 열리며, 각 카드가 다른 12초 cash-out 시험으로 바로 이어진다.`
      : state.forgeDraftType === "field_grant"
        ? `고철 ${Math.round(state.resources.scrap)} 보유. Field Cache다. 할인된 즉시 장착 2장과 무료 Emergency Vent 중 하나를 고른다. 지금 스파이크를 사서 당길지, 고철을 쥐고 다음 큰 포지까지 버틸지 직접 판단해야 한다.`
        : state.forgeDraftType === "bastion_draft"
        ? state.build.bastionDoctrineId
          ? `고철 ${Math.round(state.resources.scrap)} 보유. Bastion Draft다. 이미 채택한 교리 위에 추가 spike 1장과 Siege Salvage Pact, 무료 안정화가 다시 뜬다. 지금 더 깊게 묶일지, 체력을 태워 greed를 당길지 결정한다.`
          : `고철 ${Math.round(state.resources.scrap)} 보유. Bastion Draft다. 한 장은 시그니처 전용 교리라 즉시 spike를 잠그면서 이후 포지 후보까지 비틀고, 한 장은 최대 체력을 깎고 고철을 당겨오는 Siege Salvage Pact, 마지막 한 장은 무료 안정화다. Act 2 posture를 잠글지, 더 아프게 탐욕할지 직접 정한다.`
        : state.forgeDraftType === "armory"
        ? isLateBreakArmory(forgeOptions)
          ? `고철 ${Math.round(state.resources.scrap)} 보유. Wave 8을 넘기며 ${armoryLabel}가 열린다. 세 번째 support bay가 해금됐고, 이번 포지는 6장 중 2장을 골라 4웨이브짜리 최종 전투 구간 전체를 버틸 과한 조합을 잠근다.`
          : `고철 ${Math.round(state.resources.scrap)} 보유. Wave 4를 넘기면 일반 패키지 대신 ${armoryLabel}가 열린다. 이번 포지는 6장 중 2장을 고르며, 주무장 진화와 공세 카드가 여러 장 겹쳐 떠 4웨이브짜리 Act 2 운영을 일찍 잠근다.`
      : `고철 ${Math.round(state.resources.scrap)} 보유. 장착은 무기 등급을 올리거나 바꾸고, 각인은 속성을 붙이며, 재구성/분해는 보관 코어를 정리한다. ${packageSummary}.`;
    elements.forgeContext.innerHTML = `
      <article class="forge-context__card">
        <p class="panel__eyebrow">현재 무기</p>
        <strong>${activeCore.label}</strong>
        <p>${state.weapon.tierLabel} · ${state.weapon.benchSyncLabel} · ${traitSummary}</p>
      </article>
      <article class="forge-context__card">
        <p class="panel__eyebrow">속성 / 진화 / 시스템</p>
        <strong>${affixSummary}</strong>
        <p>${evolutionSummary} · ${capstoneSummary} · ${forgeSystemSummary} · ${supportBaySummary} · 보관 ${benchEntries.length}종 · ${catalystSummary} · 분해 예상 고철 ${getRecycleValue(state.build)}</p>
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
              state.forgeDraftType === "field_grant"
                ? state.resources.scrap < choice.cost
                  ? `${index + 1}번 선택 · 고철 부족`
                  : choice.cost > 0
                    ? `${index + 1}번 선택 · 현장 고철 ${choice.cost}`
                    : `${index + 1}번 선택 · 무료 회수`
                : state.forgeDraftType === "bastion_draft"
                  ? state.resources.scrap < choice.cost
                    ? `${index + 1}번 선택 · 고철 부족`
                    : choice.action === "bastion_pact"
                      ? `${index + 1}번 선택 · 체력 대가 계약`
                      : choice.cost > 0
                        ? `${index + 1}번 선택 · spike 고철 ${choice.cost}`
                        : `${index + 1}번 선택 · 무료 안정화`
                : state.resources.scrap < choice.cost
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
            : hazard.type === "drift"
              ? `rgba(255, 151, 79, ${clamp(activeAlpha + 0.1, 0.22, 0.5)})`
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
        }
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
        context.save();
        context.globalAlpha = lifeRatio < 0.24 ? 0.5 + Math.abs(Math.sin(performance.now() * 0.02)) * 0.4 : 1;
        context.strokeStyle = `${deployable.strokeColor}`;
        context.lineWidth = 1.4;
        context.beginPath();
        context.arc(deployable.x, deployable.y, deployable.shotRange * 0.32, 0, Math.PI * 2);
        context.stroke();
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
      } else if (enemy.type === "shrike") {
        drawPolygon(context, enemy.x, enemy.y, enemy.radius, 3, enemy.wobble);
        context.fill();
      } else if (enemy.type === "elite") {
        drawPolygon(context, enemy.x, enemy.y, enemy.radius, 6, Math.PI / 6);
        context.fill();
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

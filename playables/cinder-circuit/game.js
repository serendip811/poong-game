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
  const MAX_BENCH_COPIES_PER_CORE = 3;
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
      description: "픽업 반경이 늘고 스크랩 획득량이 늘어난다.",
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

  const SIGNATURE_DEFS = {
    relay_oath: {
      id: "relay_oath",
      label: "Relay Oath",
      tag: "RICOCHET",
      short: "반사·드라이브",
      description: "벽 반사와 오버드라이브 회전을 빠르게 여는 시동 회로.",
      perkText: "Ricochet 벤치 x2 · Drive +18% · Overdrive +0.6s",
      startCoreId: "ricochet",
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
      label: "Scrap Pact",
      tag: "SALVAGE",
      short: "회수·지속",
      description: "스크랩 회수와 근거리 압박을 안정적으로 여는 수거 회로.",
      perkText: "Scatter 벤치 x2 · Scrap +8% · Pickup +18",
      startCoreId: "scatter",
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
      perkText: "Lance 벤치 x2 · Chain +1 · Cool +4",
      startCoreId: "lance",
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

  const BASE_BUILD = {
    signatureId: DEFAULT_SIGNATURE_ID,
    coreId: "ember",
    attunedCoreId: "ember",
    attunedCopies: 1,
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
    return clamp(getBenchCount(build, coreId) - 1, 0, 2);
  }

  function formatSyncLabel(level) {
    if (level >= 2) {
      return "SYNC II";
    }
    if (level >= 1) {
      return "SYNC I";
    }
    return "SYNC 0";
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
    return {
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
  }

  function computeWeaponStats(build) {
    const core = CORE_DEFS[build.coreId] || CORE_DEFS.ember;
    const baseDamage = 24 + build.damageBonus;
    const baseCooldown = clamp(0.28 - build.cooldownBonus, 0.12, 0.4);
    const attunedCopies =
      build.attunedCoreId === core.id ? Math.max(1, build.attunedCopies || 1) : 1;
    const benchCopies = getBenchCount(build, core.id);
    const benchSyncLevel = clamp(attunedCopies - 1, 0, 2);
    const syncedBaseCooldown = clamp(baseCooldown - benchSyncLevel * 0.012, 0.12, 0.4);
    const syncedHeatFactor = 1 - benchSyncLevel * 0.06;
    return {
      core,
      benchCopies,
      attunedCopies,
      benchSyncLevel,
      benchSyncLabel: formatSyncLabel(benchSyncLevel),
      damage: round((baseDamage + benchSyncLevel * 3) * core.damageFactor, 1),
      cooldown: round(syncedBaseCooldown * core.cooldownFactor, 3),
      heatPerShot: round(14 * build.heatFactor * core.heatFactor * syncedHeatFactor, 1),
      projectileSpeed: round(460 * core.speedFactor, 1),
      pellets: core.pellets + (core.id === "scatter" && benchSyncLevel >= 2 ? 1 : 0),
      spread: core.spread,
      pierce: core.pierce + build.pierceBonus + (core.id === "lance" && benchSyncLevel >= 1 ? 1 : 0),
      bounce: core.bounce + (core.id === "ricochet" && benchSyncLevel >= 1 ? 1 : 0),
      chain: build.chainBonus,
      chainRange: build.chainBonus > 0 ? (core.id === "lance" ? 188 : 164) : 0,
      color: core.color,
    };
  }

  function createCoreChoice(coreId, build) {
    const core = CORE_DEFS[coreId];
    const benchCopies = getBenchCount(build, coreId);
    const syncLevel = getBenchSyncLevel(build, coreId);
    const syncLabel = formatSyncLabel(syncLevel);
    const discountedCost = Math.max(18, core.cost - syncLevel * 8);
    return {
      type: "core",
      id: `core:${coreId}`,
      verb: "INFUSE",
      tag: "INFUSE",
      title: core.label,
      description: `${core.description} 벤치 x${benchCopies}. 접속 시 벤치 복제본을 소모해 ${syncLabel} 위력을 굳힌다.`,
      slotText:
        build.coreId === coreId
          ? `현재 코어 재조율 · x${benchCopies} 소모 · ${syncLabel}`
          : `벤치 소모 접속 · x${benchCopies} · ${syncLabel}`,
      coreId,
      benchCopies,
      syncLevel,
      cost: discountedCost,
    };
  }

  function createModChoice(modId) {
    const mod = MOD_DEFS[modId];
    return {
      type: "mod",
      id: `mod:${modId}`,
      verb: mod.verb || "IMPROVE",
      tag: mod.verb || "IMPROVE",
      title: mod.label,
      description: mod.description,
      slotText: `직접 성능 보강 · ${mod.tag}`,
      modId,
      cost: mod.cost,
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
      verb: "REFORGE",
      tag: "REFORGE",
      title: "Flux Reforge",
      description: `무기 벤치 구성을 ${preview}(으)로 재조합한다. 현재 장착 코어는 유지된다.`,
      slotText: "무기 벤치 재조합",
      cost: 18,
      nextCoreIds,
    };
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
      verb: "RECYCLE",
      tag: "RECYCLE",
      title: "Scrap Reclaimer",
      description: `무기 벤치 코어 ${pending.length}개를 분해해 Scrap +${scrapValue}를 얻고 열을 식힌다.`,
      slotText: "무기 벤치 분해",
      cost: 0,
      scrapValue,
    };
  }

  function buildForgeChoices(build, rng, scrapBank) {
    const random = typeof rng === "function" ? rng : Math.random;
    const pending = getPendingCoreIds(build);
    const choices = [];

    shuffle(pending, random)
      .slice(0, 2)
      .forEach((coreId) => {
        choices.push(createCoreChoice(coreId, build));
      });

    const supportChoices = [];
    const recycleChoice = createRecycleChoice(build);
    const reforgeChoice = createReforgeChoice(build, random);
    if (recycleChoice || reforgeChoice) {
      const utilityChoices = [recycleChoice, reforgeChoice].filter(Boolean);
      if (Number.isFinite(scrapBank) && scrapBank < 32 && recycleChoice) {
        supportChoices.push(recycleChoice);
        utilityChoices
          .filter((choice) => choice.id !== recycleChoice.id)
          .forEach((choice) => supportChoices.push(choice));
      } else {
        shuffle(utilityChoices, random).forEach((choice) => supportChoices.push(choice));
      }
    }

    shuffle(Object.keys(MOD_DEFS), random)
      .map((modId) => createModChoice(modId))
      .forEach((choice) => supportChoices.push(choice));

    for (const choice of supportChoices) {
      if (choices.length >= 3) {
        break;
      }
      choices.push(choice);
    }

    if (
      Number.isFinite(scrapBank) &&
      choices.length > 0 &&
      choices.every((choice) => choice.cost > scrapBank)
    ) {
      choices[choices.length - 1] = {
        type: "fallback",
        id: "fallback:emergency_vent",
        tag: "FREE",
        title: "Emergency Vent",
        description: "무료 안정화. 열을 크게 빼고 체력을 조금 회복한다.",
        slotText: "무료 정비",
        cost: 0,
      };
    }

    return shuffle(choices.slice(0, 3), random);
  }

  function applyForgeChoice(run, choice) {
    if (!run || !run.build || !choice) {
      return null;
    }

    if (choice.type === "core") {
      const consumedCopies = Math.max(1, removeBenchCopies(run.build, choice.coreId, choice.benchCopies));
      run.build.coreId = choice.coreId;
      run.build.attunedCoreId = choice.coreId;
      run.build.attunedCopies = consumedCopies;
      run.build.upgrades.push(
        `코어 접속: ${CORE_DEFS[choice.coreId].label} · ${formatSyncLabel(clamp(consumedCopies - 1, 0, 2))}`
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

    if (choice.type === "utility" && choice.action === "recycle") {
      const scrapValue = Math.max(0, choice.scrapValue || 0);
      run.build.pendingCores = [];
      if (run.resources) {
        run.resources.scrap += scrapValue;
      }
      if (run.stats) {
        run.stats.scrapCollected += scrapValue;
      }
      run.build.upgrades.push(`Recycle: Scrap +${scrapValue}`);
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
    ENEMY_DEFS,
    CORE_DEFS,
    MOD_DEFS,
    SIGNATURE_DEFS,
    DEFAULT_SIGNATURE_ID,
    createInitialBuild,
    getSignatureDef,
    computePlayerStats,
    computeWeaponStats,
    getBenchEntries,
    getBenchCount,
    getBenchSyncLevel,
    sanitizeBenchCoreIds,
    buildForgeChoices,
    applyForgeChoice,
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

  function getWeaponTraitLabels(weapon) {
    return [
      weapon.pierce > 0 ? `관통 ${weapon.pierce}` : null,
      weapon.bounce > 0 ? `반사 ${weapon.bounce}` : null,
      weapon.chain > 0 ? `연쇄 ${weapon.chain}` : null,
    ].filter(Boolean);
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
      enemies: [],
      projectiles: [],
      drops: [],
      hazards: [],
      particles: [],
      forgeChoices: [],
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
      hudDetailUntil: 0,
      hudInspect: false,
      feed: [],
      weapon: computeWeaponStats(build),
      playerStats: computePlayerStats(build),
    };
  }

  function expandHudDetail(duration = 2.4) {
    state.hudDetailUntil = Math.max(state.hudDetailUntil, duration);
    renderHudPanels();
  }

  function renderHudPanels() {
    if (!elements.arenaStage) {
      return;
    }
    const expanded = state.hudInspect || state.hudDetailUntil > 0 || state.paused;
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
          .map((coreId) => createMiniPill("BENCH", CORE_DEFS[coreId].short, "accent"))
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
    expandHudDetail(3.2);
    pushCombatFeed(`${signature.label} 투입 승인. 제련 회로를 연다.`, "DROP");
    showScreen("game");
    renderPauseOverlay();
    beginWave(0);
  }

  function beginWave(index) {
    const config = WAVE_CONFIG[index];
    state.waveIndex = index;
    state.phase = "wave";
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
    expandHudDetail(2.8);
    pushCombatFeed(`${config.label} 진입. ${config.note}`, `W${index + 1}`);
    setBanner(config.label, 1.4);
    renderForgeOverlay();
    updateHUD();
  }

  function enterForge() {
    state.phase = "forge";
    state.forgeChoices = buildForgeChoices(
      state.build,
      Math.random,
      state.resources.scrap
    );
    state.hazards = [];
    state.enemies = [];
    state.projectiles = [];
    state.player.heat = Math.max(0, state.player.heat - 20);
    state.player.overheated = false;
    pushCombatFeed("웨이브 종료. 포지 카드로 다음 화력 축을 고른다.", "FORGE");
    setBanner("포지 정지", 1.2);
    renderForgeOverlay();
    updateHUD();
  }

  function finishRun(victory) {
    const signature = getSignatureDef(state.build.signatureId);
    const benchEntries = getBenchEntries(state.build);
    state.screen = "result";
    state.phase = "result";
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
      createResultStat("Scrap+", String(state.result.scrapCollected)),
      createResultStat("Spent", String(state.result.scrapSpent)),
      createResultStat("Drive", String(state.result.overdrivesUsed)),
      createResultStat("Sig", state.result.signature),
      createResultStat("Core", state.result.core),
    ].join("");
    elements.resultBuild.innerHTML = `
      <p class="panel__eyebrow">FINAL LOADOUT</p>
      <div class="result-build__grade">${grade.grade}</div>
      <strong>${signature.label} / ${CORE_DEFS[state.build.coreId].label}</strong>
      <p>${grade.note}</p>
      <div class="result-build__chips">
        <span class="micro-chip">Bank ${state.result.scrapBanked} Scrap</span>
        <span class="micro-chip">Drive ${state.result.overdrivesUsed}회</span>
        <span class="micro-chip">${
          benchEntries.length ? summarizeBenchCoreIds(state.build.pendingCores) : "EMPTY BENCH"
        }</span>
      </div>
      <div class="mini-pill-row">
        ${state.build.upgrades
          .slice(-4)
          .map((upgrade) => createMiniPill("MOD", upgrade))
          .join("")}
      </div>
      <div class="status-list">
        ${createStatusRow("잔여 Scrap", String(state.result.scrapBanked))}
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
      setBanner("스크랩 부족", 0.8);
      return;
    }
    state.resources.scrap -= choice.cost;
    state.stats.scrapSpent += choice.cost;
    applyForgeChoice(state, choice);
    pushCombatFeed(`${choice.tag} · ${choice.title} 적용.`, "FORGE");
    refreshDerivedStats(false);
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
    const config = WAVE_CONFIG[state.waveIndex];
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
    const activeCap = wave.cleanupPhase ? config.activeCap + 10 : config.activeCap;

    while (
      wave.spawnTimer <= 0 &&
      wave.spawned < wave.spawnBudget &&
      state.enemies.length < activeCap
    ) {
      const shouldSpawnElite =
        wave.spawned > 0 && wave.spawned % wave.eliteEvery === 0;
      const typeId = shouldSpawnElite
        ? "elite"
        : pickWeighted(config.mix, Math.random);
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

  function spawnHazard(config) {
    const margin = config.radius + 40;
    let x = ARENA_WIDTH / 2;
    let y = ARENA_HEIGHT / 2;

    for (let attempt = 0; attempt < 12; attempt += 1) {
      const candidateX = margin + Math.random() * (ARENA_WIDTH - margin * 2);
      const candidateY = margin + Math.random() * (ARENA_HEIGHT - margin * 2);
      const distance = Math.hypot(candidateX - state.player.x, candidateY - state.player.y);
      if (distance > config.radius + 70) {
        x = candidateX;
        y = candidateY;
        break;
      }
      x = candidateX;
      y = candidateY;
    }

    state.hazards.push({
      x,
      y,
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
    expandHudDetail(2.2);
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
    expandHudDetail(2.2);
    pushCombatFeed("수동 벤트 실행. 드라이브를 태워 과열을 진정시켰다.", "VENT");
    setBanner("벤트", 0.55);
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
      state.projectiles.push({
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
      });
    }

    state.player.heat = clamp(
      state.player.heat + weapon.heatPerShot * (driveActive ? 0.58 : 1),
      0,
      100
    );
    state.player.fireCooldown = weapon.cooldown * (driveActive ? 0.6 : 1);
    if (state.player.heat >= 100) {
      state.player.overheated = true;
      expandHudDetail(2.4);
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
      setBanner(`Scrap +${value}`, 0.45);
      return;
    }

    if (drop.kind === "core") {
      const stored = addBenchCore(state.build, drop.coreId);
      if (stored) {
        state.stats.coresCollected += 1;
        refreshDerivedStats(false);
        expandHudDetail(3);
        pushCombatFeed(`${CORE_DEFS[drop.coreId].label} 확보. 벤치 접속 옵션이 확장됐다.`, "CORE");
        setBanner(
          `${CORE_DEFS[drop.coreId].short} 벤치 x${getBenchCount(
            state.build,
            drop.coreId
          )}`,
          0.8
        );
      } else {
        state.resources.scrap += CORE_OVERFLOW_SCRAP;
        state.stats.scrapCollected += CORE_OVERFLOW_SCRAP;
        gainDrive(CORE_OVERFLOW_SCRAP * 0.24);
        setBanner(
          `${CORE_DEFS[drop.coreId].short} 초과분 분해 +${CORE_OVERFLOW_SCRAP}`,
          0.8
        );
      }
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
        expandHudDetail(2.8);
        setBanner("전장 정리", 0.9);
        pushCombatFeed("적 반응 정지. 남은 스크랩을 회수할 짧은 여유가 생겼다.", "CLEAR");
        return;
      }

      state.waveClearTimer = Math.max(0, state.waveClearTimer - dt);
      if (state.waveClearTimer <= 0) {
        if (state.waveIndex >= MAX_WAVES - 1) {
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
    if (elements.activeCore) {
      elements.activeCore.innerHTML = `
        <div class="summary-head">
          <div>
            <p class="forge-card__tag">${activeCore.tag}</p>
            <h3>${activeCore.label}</h3>
          </div>
          <span class="summary-chip ${
            weapon.benchSyncLevel > 0 ? "summary-chip--hot" : ""
          }">${weapon.benchSyncLabel}</span>
        </div>
        <div class="status-list">
          ${createStatusRow("위력", String(weapon.damage))}
          ${createStatusRow("연사", `${weapon.cooldown}s`)}
          ${createStatusRow("발열", String(weapon.heatPerShot))}
          ${createStatusRow("동조", `${weapon.attunedCopies} Commit`)}
        </div>
        <div class="mini-pill-row">
          ${
            traitLabels.length
              ? traitLabels.map((label) => createMiniPill("TRAIT", label, "accent")).join("")
              : createMiniPill("TRAIT", "직선 탄도")
          }
        </div>
        <p class="summary-note">${getSignatureDef(state.build.signatureId).short} · 벤치 ${weapon.benchCopies}개 대기</p>
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
          <span class="summary-chip ${state.hazards.length > 0 ? "summary-chip--hot" : ""}">
            Hazard ${state.hazards.length}
          </span>
        </div>
        <div class="status-list">
          ${createStatusRow("남은 스폰", String(enemiesLeft))}
          ${createStatusRow("현재 적", String(state.enemies.length))}
          ${createStatusRow("드랍", String(state.drops.length))}
        </div>
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
          ${createStatusRow("사용 Scrap", String(Math.round(state.stats.scrapSpent)))}
          ${createStatusRow("벤트", "Q / 24 Drive")}
        </div>
        <p class="summary-note ${
          state.player.overheated ? "summary-note--danger" : ""
        }">${state.player.overheated ? "사격 정지: 열을 비워야 한다." : "과열 전까지 자동 사격 유지."}</p>
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
    const benchEntries = getBenchEntries(state.build);
    const benchSummary = benchEntries.length
      ? benchEntries
          .map(
            (entry) =>
              `${CORE_DEFS[entry.coreId].short} x${entry.copies} ${formatSyncLabel(entry.syncLevel)}`
          )
          .join(" · ")
      : "EMPTY BENCH";
    elements.forgeSubtitle.textContent =
      `스크랩 ${Math.round(state.resources.scrap)} 보유. INFUSE는 벤치 복제본을 소모해 현재 코어를 확정하고, IMPROVE는 직접 강화, REFORGE/RECYCLE은 벤치 재편이다.`;
    elements.forgeContext.innerHTML = `
      <article class="forge-context__card">
        <p class="panel__eyebrow">ACTIVE CORE</p>
        <strong>${activeCore.label}</strong>
        <p>${traitSummary} · ${state.weapon.benchSyncLabel} · Commit ${state.weapon.attunedCopies}</p>
      </article>
      <article class="forge-context__card">
        <p class="panel__eyebrow">BENCH SYNC</p>
        <strong>${benchSummary}</strong>
        <p>Recycle 예상 ${getRecycleValue(state.build)} Scrap · 벤치 ${benchEntries.length}종</p>
      </article>
    `;
    elements.forgeCards.innerHTML = state.forgeChoices
      .map(
        (choice, index) => `
          <button
            type="button"
            class="forge-card forge-card--${choice.tag.toLowerCase()}"
            data-index="${index}"
            data-verb="${choice.verb}"
            ${state.resources.scrap < choice.cost ? "disabled" : ""}
          >
            <span class="forge-card__tag">${choice.tag}</span>
            <h3>${choice.title}</h3>
            <p>${choice.description}</p>
            <span class="forge-card__meta">${choice.slotText}</span>
            <span class="forge-card__slot">${
              state.resources.scrap < choice.cost
                ? `${index + 1}번 선택 · Scrap 부족`
                : `${index + 1}번 선택 · ${choice.cost} Scrap`
            }</span>
          </button>
        `
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
      if (drop.kind === "scrap") {
        context.fillStyle = "rgba(255, 209, 102, 0.9)";
        context.fillRect(drop.x - 4, drop.y - 4, 8, 8);
      } else {
        context.fillStyle = CORE_DEFS[drop.coreId].color;
        context.save();
        context.translate(drop.x, drop.y);
        context.rotate(Math.PI / 4);
        context.fillRect(-8, -8, 16, 16);
        context.restore();
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

    if (state.hudDetailUntil > 0) {
      state.hudDetailUntil = Math.max(0, state.hudDetailUntil - dt);
      if (state.hudDetailUntil <= 0) {
        renderHudPanels();
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

(function () {
  const GAME_TITLE = "Hexfall March";
  const MAX_ENERGY = 3;
  const HAND_SIZE = 5;
  const STARTING_HP = 68;

  const CARD_DEFS = {
    slash: {
      id: "slash",
      label: "Sever",
      type: "attack",
      rarity: "starter",
      cost: 1,
      description: "6 피해를 준다.",
      actions: [{ type: "damage", amount: 6 }],
      upgrade: {
        description: "9 피해를 준다.",
        actions: [{ type: "damage", amount: 9 }],
      },
    },
    guard: {
      id: "guard",
      label: "Guard",
      type: "skill",
      rarity: "starter",
      cost: 1,
      description: "6 블록을 얻는다.",
      actions: [{ type: "block", amount: 6 }],
      upgrade: {
        description: "9 블록을 얻는다.",
        actions: [{ type: "block", amount: 9 }],
      },
    },
    scout: {
      id: "scout",
      label: "Scout Ink",
      type: "skill",
      rarity: "starter",
      cost: 0,
      description: "카드 1장을 뽑고 에너지 1을 얻는다.",
      actions: [
        { type: "draw", amount: 1 },
        { type: "energy", amount: 1 },
      ],
      upgrade: {
        description: "카드 2장을 뽑고 에너지 1을 얻는다.",
        actions: [
          { type: "draw", amount: 2 },
          { type: "energy", amount: 1 },
        ],
      },
    },
    pry: {
      id: "pry",
      label: "Pry Sigil",
      type: "attack",
      rarity: "starter",
      cost: 1,
      description: "5 피해를 주고 Expose 1을 건다.",
      actions: [
        { type: "damage", amount: 5 },
        { type: "expose", amount: 1 },
      ],
      upgrade: {
        description: "7 피해를 주고 Expose 2를 건다.",
        actions: [
          { type: "damage", amount: 7 },
          { type: "expose", amount: 2 },
        ],
      },
    },
    cleave: {
      id: "cleave",
      label: "Twin Cut",
      type: "attack",
      rarity: "reward",
      cost: 1,
      description: "4 피해를 두 번 준다.",
      actions: [{ type: "damage", amount: 4, hits: 2 }],
      upgrade: {
        description: "4 피해를 세 번 준다.",
        actions: [{ type: "damage", amount: 4, hits: 3 }],
      },
    },
    bulwark: {
      id: "bulwark",
      label: "Bulwark",
      type: "skill",
      rarity: "reward",
      cost: 1,
      description: "11 블록을 얻는다.",
      actions: [{ type: "block", amount: 11 }],
      upgrade: {
        description: "15 블록을 얻는다.",
        actions: [{ type: "block", amount: 15 }],
      },
    },
    rally: {
      id: "rally",
      label: "War Chorus",
      type: "power",
      rarity: "reward",
      cost: 1,
      description: "4 블록을 얻고 Strength 1을 얻는다.",
      actions: [
        { type: "block", amount: 4 },
        { type: "strength", amount: 1 },
      ],
      upgrade: {
        description: "6 블록을 얻고 Strength 2를 얻는다.",
        actions: [
          { type: "block", amount: 6 },
          { type: "strength", amount: 2 },
        ],
      },
    },
    gash: {
      id: "gash",
      label: "Rift Strike",
      type: "attack",
      rarity: "reward",
      cost: 2,
      description: "15 피해를 준다.",
      actions: [{ type: "damage", amount: 15 }],
      upgrade: {
        description: "20 피해를 준다.",
        actions: [{ type: "damage", amount: 20 }],
      },
    },
    mend: {
      id: "mend",
      label: "Mend Script",
      type: "skill",
      rarity: "reward",
      cost: 1,
      description: "HP 4를 회복하고 4 블록을 얻는다.",
      actions: [
        { type: "heal", amount: 4 },
        { type: "block", amount: 4 },
      ],
      upgrade: {
        description: "HP 6을 회복하고 6 블록을 얻는다.",
        actions: [
          { type: "heal", amount: 6 },
          { type: "block", amount: 6 },
        ],
      },
    },
    brand: {
      id: "brand",
      label: "Brand Mark",
      type: "attack",
      rarity: "reward",
      cost: 1,
      description: "3 피해를 주고 Expose 2를 건다.",
      actions: [
        { type: "damage", amount: 3 },
        { type: "expose", amount: 2 },
      ],
      upgrade: {
        description: "5 피해를 주고 Expose 3을 건다.",
        actions: [
          { type: "damage", amount: 5 },
          { type: "expose", amount: 3 },
        ],
      },
    },
    feint: {
      id: "feint",
      label: "Feint",
      type: "attack",
      rarity: "reward",
      cost: 0,
      description: "4 피해를 주고 카드 1장을 뽑는다.",
      actions: [
        { type: "damage", amount: 4 },
        { type: "draw", amount: 1 },
      ],
      upgrade: {
        description: "6 피해를 주고 카드 1장을 뽑는다.",
        actions: [
          { type: "damage", amount: 6 },
          { type: "draw", amount: 1 },
        ],
      },
    },
    wardstep: {
      id: "wardstep",
      label: "Wardstep",
      type: "skill",
      rarity: "reward",
      cost: 0,
      description: "5 블록을 얻고 카드 1장을 뽑는다.",
      actions: [
        { type: "block", amount: 5 },
        { type: "draw", amount: 1 },
      ],
      upgrade: {
        description: "7 블록을 얻고 카드 1장을 뽑는다.",
        actions: [
          { type: "block", amount: 7 },
          { type: "draw", amount: 1 },
        ],
      },
    },
  };

  const RELIC_DEFS = {
    "iron-script": {
      id: "iron-script",
      label: "Iron Script",
      short: "IRON",
      description: "전투 시작 시 블록 6을 얻는다.",
    },
    "lantern-shard": {
      id: "lantern-shard",
      label: "Lantern Shard",
      short: "DRAW",
      description: "첫 턴에 카드를 1장 더 뽑는다.",
    },
    "march-medallion": {
      id: "march-medallion",
      label: "March Medallion",
      short: "HEAL",
      description: "전투 승리 후 HP 4를 회복한다.",
    },
    "omen-spike": {
      id: "omen-spike",
      label: "Omen Spike",
      short: "EDGE",
      description: "매 턴 첫 공격이 피해를 2 더 준다.",
    },
  };

  const ENEMY_DEFS = {
    "ash-scout": {
      id: "ash-scout",
      label: "Ash Scout",
      sigil: "A",
      hp: 30,
      description: "짧은 간격으로 찌르고, 틈이 보이면 몸을 낮춰 다음 박자를 준비한다.",
      intents: [
        { damage: 7, note: "잿빛 송곳 찌르기." },
        { gainBlock: 5, note: "몸을 낮추며 다음 베기를 준비한다." },
        { damage: 10, note: "깊게 파고드는 단일 강타." },
      ],
    },
    "glass-hound": {
      id: "glass-hound",
      label: "Glass Hound",
      sigil: "G",
      hp: 36,
      description: "다단 히트로 블록을 찢고, 틈이 열리면 도약해 물어뜯는다.",
      intents: [
        { damage: 4, hits: 2, note: "유리 송곳니 연타." },
        { damage: 12, note: "도약 강타." },
        { gainBlock: 6, gainStrength: 1, note: "파편 껍질을 두르고 힘을 모은다." },
      ],
    },
    "crypt-scribe": {
      id: "crypt-scribe",
      label: "Crypt Scribe",
      sigil: "C",
      hp: 34,
      description: "먹빛 문장을 덧그리며 상처를 봉합하는, 느리지만 성가신 기록자다.",
      intents: [
        { damage: 6, note: "먹빛 찌르기." },
        { gainBlock: 4, heal: 4, note: "문장을 봉합하며 시간을 번다." },
        { damage: 11, note: "깊숙이 찢는 획." },
      ],
    },
    "banner-knight": {
      id: "banner-knight",
      label: "Banner Knight",
      sigil: "B",
      hp: 54,
      description: "방패와 깃발을 함께 세워 템포를 꼬는 엘리트. 오래 둘수록 힘이 오른다.",
      intents: [
        { gainBlock: 7, note: "방패 각도를 세운다." },
        { damage: 8, hits: 2, note: "기수 돌진." },
        { gainStrength: 2, note: "깃발 아래 힘을 끌어올린다." },
        { damage: 16, note: "깃발 압쇄." },
      ],
    },
    "vault-warden": {
      id: "vault-warden",
      label: "Vault Warden",
      sigil: "V",
      hp: 88,
      description: "문을 걸어 잠그고, 연타와 강타를 섞어 덱의 안정성을 시험하는 최종 수문장.",
      intents: [
        { gainBlock: 8, note: "문을 걸어 잠근다." },
        { damage: 7, hits: 2, note: "봉인 봉 연타." },
        { gainStrength: 2, note: "문양이 붉게 달아오른다." },
        { damage: 18, note: "수문장 강타." },
        { damage: 5, hits: 3, note: "쇠사슬 난타." },
      ],
    },
  };

  const ROUTE_TEMPLATE = [
    {
      id: "threshold",
      label: "Step 1",
      title: "Threshold Duel",
      note: "첫 의도 읽기 전투. 기본 공격과 블록 감각을 익힌다.",
      options: [
        {
          id: "threshold-scout",
          type: "skirmish",
          label: "Skirmish",
          summary: "Ash Scout가 길을 막는다. 안정적인 첫 전투.",
          enemyId: "ash-scout",
        },
      ],
    },
    {
      id: "ember-fork",
      label: "Step 2",
      title: "Ember Fork",
      note: "체력을 다듬을지, 카드를 먼저 벼릴지 정하는 분기.",
      options: [
        {
          id: "rest-basin",
          type: "rest",
          label: "Rest",
          summary: "상처를 봉합하거나 정신을 다잡아 최대 HP를 늘린다.",
        },
        {
          id: "forge-desk",
          type: "forge",
          label: "Forge",
          summary: "덱 카드 1장을 강화해 다음 전투 곡선을 밀어 올린다.",
        },
      ],
    },
    {
      id: "broken-court",
      label: "Step 3",
      title: "Broken Court",
      note: "안정적인 전투와 위험한 엘리트 중 무엇을 밟을지 선택한다.",
      options: [
        {
          id: "court-hound",
          type: "skirmish",
          label: "Skirmish",
          summary: "Glass Hound와의 교전. 다단 히트를 견뎌야 한다.",
          enemyId: "glass-hound",
        },
        {
          id: "court-banner",
          type: "elite",
          label: "Elite",
          summary: "Banner Knight를 쓰러뜨리면 유물을 얻는다.",
          enemyId: "banner-knight",
        },
      ],
    },
    {
      id: "scribe-lane",
      label: "Step 4",
      title: "Scribe Lane",
      note: "전투를 더 밟아 보상 카드를 챙기거나, 안전하게 대장간으로 빠질 수 있다.",
      options: [
        {
          id: "lane-scribe",
          type: "skirmish",
          label: "Skirmish",
          summary: "Crypt Scribe를 돌파하고 카드 보상 1장을 더 챙긴다.",
          enemyId: "crypt-scribe",
        },
        {
          id: "lane-forge",
          type: "forge",
          label: "Forge",
          summary: "지금 가진 카드의 품질을 올리는 보수적 선택.",
        },
      ],
    },
    {
      id: "scar-landing",
      label: "Step 5",
      title: "Scar Landing",
      note: "최종전에 앞서 마지막 회복 기회 또는 추가 유물 기회를 고른다.",
      options: [
        {
          id: "landing-rest",
          type: "rest",
          label: "Rest",
          summary: "HP를 메우거나 최대 HP를 늘리고 마지막 문으로 향한다.",
        },
        {
          id: "landing-elite",
          type: "elite",
          label: "Elite",
          summary: "두 번째 Banner Knight를 눌러 추가 유물을 노린다.",
          enemyId: "banner-knight",
        },
      ],
    },
    {
      id: "sealed-gate",
      label: "Step 6",
      title: "Sealed Gate",
      note: "Vault Warden이 마지막 문을 지킨다.",
      options: [
        {
          id: "final-warden",
          type: "boss",
          label: "Boss",
          summary: "수문장을 돌파하면 행군이 끝난다.",
          enemyId: "vault-warden",
        },
      ],
    },
  ];

  const REWARD_CARD_IDS = Object.values(CARD_DEFS)
    .filter((card) => card.rarity === "reward")
    .map((card) => card.id);

  let cardUid = 1;

  function createCardInstance(cardId, upgraded = false) {
    return {
      uid: `${cardId}-${cardUid++}`,
      cardId,
      upgraded,
    };
  }

  function getCardBlueprint(card) {
    const definition = CARD_DEFS[card.cardId];
    const variant = card.upgraded ? definition.upgrade : definition;

    return {
      id: definition.id,
      label: `${definition.label}${card.upgraded ? "+" : ""}`,
      type: definition.type,
      rarity: definition.rarity,
      cost: definition.cost,
      description: variant.description,
      actions: variant.actions,
      upgraded: card.upgraded,
    };
  }

  function createStarterDeck() {
    return [
      createCardInstance("slash"),
      createCardInstance("slash"),
      createCardInstance("slash"),
      createCardInstance("slash"),
      createCardInstance("guard"),
      createCardInstance("guard"),
      createCardInstance("guard"),
      createCardInstance("guard"),
      createCardInstance("scout"),
      createCardInstance("scout"),
      createCardInstance("pry"),
      createCardInstance("pry"),
    ];
  }

  function buildRoute() {
    return ROUTE_TEMPLATE.map((step) => ({
      ...step,
      options: step.options.map((option) => ({ ...option })),
      chosenOptionId: null,
      completed: false,
    }));
  }

  function createInitialRun() {
    return {
      phase: "route",
      route: buildRoute(),
      routeIndex: 0,
      pendingNode: null,
      deck: createStarterDeck(),
      relics: [],
      rewardChoices: [],
      pendingRelic: null,
      hp: STARTING_HP,
      maxHp: STARTING_HP,
      block: 0,
      energy: 0,
      strength: 0,
      combat: null,
      result: null,
      log: ["회랑 입구가 열린다. 첫 결투를 준비하라."],
      stats: {
        turns: 0,
        combatsWon: 0,
        elitesWon: 0,
        cardsAdded: 0,
        damageTaken: 0,
      },
    };
  }

  function shuffle(items, rng = Math.random) {
    const copy = [...items];
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(rng() * (index + 1));
      [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
    }
    return copy;
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function isCombatType(type) {
    return type === "skirmish" || type === "elite" || type === "boss";
  }

  function getCurrentStep(run) {
    return run.route[run.routeIndex] ?? null;
  }

  function getCurrentIntent(run) {
    if (!run.combat) {
      return null;
    }

    const { enemy } = run.combat;
    return enemy.intents[enemy.intentIndex % enemy.intents.length] ?? null;
  }

  function hasRelic(run, relicId) {
    return run.relics.some((relic) => relic.id === relicId);
  }

  function pushLog(run, message) {
    run.log.unshift(message);
    run.log = run.log.slice(0, 8);
  }

  function createCombatState(enemyId, encounterType, deck, rng = Math.random) {
    const enemyDef = ENEMY_DEFS[enemyId];

    return {
      type: encounterType,
      turn: 1,
      enemy: {
        ...enemyDef,
        hp: enemyDef.hp,
        maxHp: enemyDef.hp,
        block: 0,
        strength: 0,
        expose: 0,
        intentIndex: 0,
        intents: enemyDef.intents.map((intent) => ({ ...intent })),
      },
      drawPile: shuffle(deck, rng),
      discardPile: [],
      hand: [],
      firstAttackThisTurn: true,
    };
  }

  function drawCards(run, amount, rng = Math.random) {
    if (!run.combat) {
      return;
    }

    for (let count = 0; count < amount; count += 1) {
      if (run.combat.drawPile.length === 0) {
        if (run.combat.discardPile.length === 0) {
          return;
        }
        run.combat.drawPile = shuffle(run.combat.discardPile, rng);
        run.combat.discardPile = [];
      }

      const nextCard = run.combat.drawPile.shift();
      run.combat.hand.push(nextCard);
    }
  }

  function startPlayerTurn(run, rng = Math.random) {
    if (!run.combat) {
      return;
    }

    const drawBonus =
      run.combat.turn === 1 && hasRelic(run, "lantern-shard") ? 1 : 0;

    run.energy = MAX_ENERGY;
    run.combat.hand = [];
    run.combat.firstAttackThisTurn = true;
    run.stats.turns += 1;
    drawCards(run, HAND_SIZE + drawBonus, rng);
  }

  function prepareCombat(run, option, rng = Math.random) {
    run.phase = "combat";
    run.pendingNode = option;
    run.rewardChoices = [];
    run.pendingRelic = null;
    run.block = 0;
    run.energy = 0;
    run.strength = 0;
    run.combat = createCombatState(option.enemyId, option.type, run.deck, rng);

    if (hasRelic(run, "iron-script")) {
      run.block += 6;
    }

    pushLog(run, `${ENEMY_DEFS[option.enemyId].label}이 길을 막는다.`);
    startPlayerTurn(run, rng);
    return option;
  }

  function takePlayerDamage(run, amount) {
    const incoming = Math.max(0, amount);
    const blocked = Math.min(run.block, incoming);
    run.block -= blocked;
    const damage = incoming - blocked;

    if (damage > 0) {
      run.hp = Math.max(0, run.hp - damage);
      run.stats.damageTaken += damage;
    }

    return damage;
  }

  function takeEnemyDamage(run, amount) {
    if (!run.combat) {
      return 0;
    }

    const enemy = run.combat.enemy;
    const incoming = Math.max(0, amount);
    const blocked = Math.min(enemy.block, incoming);
    enemy.block -= blocked;
    const damage = incoming - blocked;
    enemy.hp = Math.max(0, enemy.hp - damage);
    return damage;
  }

  function getAttackBonus(run) {
    if (run.combat?.firstAttackThisTurn && hasRelic(run, "omen-spike")) {
      return 2;
    }
    return 0;
  }

  function dealDamageToEnemy(run, baseAmount, hits = 1) {
    if (!run.combat) {
      return 0;
    }

    let totalDealt = 0;
    for (let index = 0; index < hits; index += 1) {
      if (run.combat.enemy.hp <= 0) {
        break;
      }

      let damage = baseAmount + run.strength + getAttackBonus(run);
      if (run.combat.enemy.expose > 0) {
        damage += run.combat.enemy.expose * 2;
        run.combat.enemy.expose = Math.max(0, run.combat.enemy.expose - 1);
      }

      totalDealt += takeEnemyDamage(run, damage);
      run.combat.firstAttackThisTurn = false;
    }

    return totalDealt;
  }

  function performCardAction(run, action, rng = Math.random) {
    if (!run.combat) {
      return;
    }

    switch (action.type) {
      case "damage": {
        const dealt = dealDamageToEnemy(run, action.amount, action.hits || 1);
        if (dealt > 0) {
          pushLog(run, `${dealt} 피해를 밀어 넣었다.`);
        }
        break;
      }
      case "block":
        run.block += action.amount;
        pushLog(run, `블록 ${action.amount} 확보.`);
        break;
      case "draw":
        drawCards(run, action.amount, rng);
        pushLog(run, `카드 ${action.amount}장 드로우.`);
        break;
      case "energy":
        run.energy += action.amount;
        pushLog(run, `에너지 ${action.amount} 회복.`);
        break;
      case "heal": {
        const before = run.hp;
        run.hp = Math.min(run.maxHp, run.hp + action.amount);
        pushLog(run, `HP ${run.hp - before} 회복.`);
        break;
      }
      case "strength":
        run.strength += action.amount;
        pushLog(run, `Strength ${action.amount} 상승.`);
        break;
      case "expose":
        run.combat.enemy.expose += action.amount;
        pushLog(run, `적에게 Expose ${action.amount}.`);
        break;
      default:
        break;
    }
  }

  function finishRun(run, won, reason) {
    run.phase = "result";
    run.combat = null;
    run.block = 0;
    run.energy = 0;
    run.result = {
      won,
      reason,
      stepReached: clamp(run.routeIndex + 1, 1, run.route.length),
      deckSize: run.deck.length,
      relics: run.relics.length,
      hp: run.hp,
    };
  }

  function grantRandomRelic(run, rng = Math.random) {
    const available = Object.values(RELIC_DEFS).filter(
      (relic) => !hasRelic(run, relic.id)
    );
    if (available.length === 0) {
      return null;
    }

    const relic = shuffle(available, rng)[0];
    run.relics.push(relic);
    pushLog(run, `유물 획득: ${relic.label}.`);
    return relic;
  }

  function buildRewardChoices(deck, rng = Math.random) {
    const available = shuffle(REWARD_CARD_IDS, rng).slice(0, 3);
    return available.map((cardId) => ({
      cardId,
      preview: getCardBlueprint({ cardId, upgraded: false }),
      deckCount: deck.filter((card) => card.cardId === cardId).length,
    }));
  }

  function completeCurrentStep(run) {
    const step = getCurrentStep(run);
    if (step) {
      step.completed = true;
    }

    run.pendingNode = null;
    run.pendingRelic = null;
    run.routeIndex += 1;

    if (run.routeIndex >= run.route.length) {
      finishRun(run, true, "마지막 문을 열고 인장을 끝까지 운반했다.");
      return;
    }

    run.phase = "route";
  }

  function handleCombatVictory(run, rng = Math.random) {
    const node = run.pendingNode;
    run.stats.combatsWon += 1;
    if (node?.type === "elite") {
      run.stats.elitesWon += 1;
    }

    if (hasRelic(run, "march-medallion")) {
      const before = run.hp;
      run.hp = Math.min(run.maxHp, run.hp + 4);
      pushLog(run, `March Medallion이 HP ${run.hp - before}를 회복시켰다.`);
    }

    if (node?.type === "boss") {
      run.routeIndex = run.route.length;
      finishRun(run, true, "Vault Warden을 무너뜨리고 봉인 문을 열었다.");
      return;
    }

    if (node?.type === "elite") {
      run.pendingRelic = grantRandomRelic(run, rng);
    }

    run.rewardChoices = buildRewardChoices(run.deck, rng);
    run.phase = "reward";
    run.combat = null;
    run.block = 0;
    run.energy = 0;
    run.strength = 0;
    pushLog(run, "전투 승리. 덱에 새 인장을 더할 수 있다.");
  }

  function resolveEnemyIntent(run) {
    if (!run.combat) {
      return;
    }

    const intent = getCurrentIntent(run);
    if (!intent) {
      return;
    }

    const enemy = run.combat.enemy;

    if (intent.gainBlock) {
      enemy.block += intent.gainBlock;
      pushLog(run, `${enemy.label}이 블록 ${intent.gainBlock} 확보.`);
    }

    if (intent.heal) {
      const before = enemy.hp;
      enemy.hp = Math.min(enemy.maxHp, enemy.hp + intent.heal);
      pushLog(run, `${enemy.label}이 HP ${enemy.hp - before} 회복.`);
    }

    if (intent.gainStrength) {
      enemy.strength += intent.gainStrength;
      pushLog(run, `${enemy.label}이 Strength ${intent.gainStrength} 상승.`);
    }

    if (intent.damage) {
      const hits = intent.hits || 1;
      let total = 0;
      for (let index = 0; index < hits; index += 1) {
        total += takePlayerDamage(run, intent.damage + enemy.strength);
        if (run.hp <= 0) {
          break;
        }
      }
      pushLog(run, `${enemy.label}의 공격으로 ${total} 피해.`);
    } else {
      pushLog(run, `${enemy.label}: ${intent.note}`);
    }
  }

  function playCard(run, cardUidValue, rng = Math.random) {
    if (run.phase !== "combat" || !run.combat) {
      return false;
    }

    const cardIndex = run.combat.hand.findIndex((card) => card.uid === cardUidValue);
    if (cardIndex < 0) {
      return false;
    }

    const [card] = run.combat.hand.splice(cardIndex, 1);
    const blueprint = getCardBlueprint(card);

    if (blueprint.cost > run.energy) {
      run.combat.hand.splice(cardIndex, 0, card);
      return false;
    }

    run.energy -= blueprint.cost;
    pushLog(run, `${blueprint.label} 사용.`);

    for (const action of blueprint.actions) {
      performCardAction(run, action, rng);
      if (run.combat?.enemy.hp <= 0) {
        break;
      }
    }

    if (run.combat) {
      run.combat.discardPile.push(card);
    }

    if (run.combat?.enemy.hp <= 0) {
      handleCombatVictory(run, rng);
    }

    return true;
  }

  function endTurn(run, rng = Math.random) {
    if (run.phase !== "combat" || !run.combat) {
      return false;
    }

    run.combat.discardPile.push(...run.combat.hand);
    run.combat.hand = [];
    resolveEnemyIntent(run);

    if (run.hp <= 0) {
      finishRun(run, false, `${run.pendingNode ? ENEMY_DEFS[run.pendingNode.enemyId].label : "적"}에게 무너졌다.`);
      return true;
    }

    run.block = 0;
    run.combat.enemy.intentIndex =
      (run.combat.enemy.intentIndex + 1) % run.combat.enemy.intents.length;
    run.combat.turn += 1;
    startPlayerTurn(run, rng);
    return true;
  }

  function upgradeCard(card) {
    if (!card || card.upgraded) {
      return false;
    }

    card.upgraded = true;
    return true;
  }

  function applyForgeChoice(run, cardUidValue) {
    if (run.phase !== "forge") {
      return false;
    }

    if (!cardUidValue) {
      pushLog(run, "강화할 카드가 없어 대장간을 지나친다.");
      completeCurrentStep(run);
      return true;
    }

    const card = run.deck.find((entry) => entry.uid === cardUidValue);
    if (!card || !upgradeCard(card)) {
      return false;
    }

    pushLog(run, `${getCardBlueprint(card).label} 강화 완료.`);
    completeCurrentStep(run);
    return true;
  }

  function applyRestChoice(run, choiceId) {
    if (run.phase !== "rest") {
      return false;
    }

    if (choiceId === "recover") {
      const before = run.hp;
      run.hp = Math.min(run.maxHp, run.hp + 18);
      pushLog(run, `휴식으로 HP ${run.hp - before} 회복.`);
    } else if (choiceId === "steel-nerve") {
      run.maxHp += 5;
      run.hp = Math.min(run.maxHp, run.hp + 5);
      pushLog(run, "Steel Nerve로 최대 HP +5.");
    } else {
      return false;
    }

    completeCurrentStep(run);
    return true;
  }

  function chooseReward(run, index) {
    if (run.phase !== "reward") {
      return false;
    }

    if (index >= 0 && run.rewardChoices[index]) {
      const cardId = run.rewardChoices[index].cardId;
      const instance = createCardInstance(cardId);
      run.deck.push(instance);
      run.stats.cardsAdded += 1;
      pushLog(run, `보상 카드 획득: ${getCardBlueprint(instance).label}.`);
    } else {
      pushLog(run, "보상 카드를 넘기고 덱을 유지했다.");
    }

    completeCurrentStep(run);
    return true;
  }

  function selectRouteOption(run, optionIndex, rng = Math.random) {
    if (run.phase !== "route") {
      return false;
    }

    const step = getCurrentStep(run);
    const option = step?.options?.[optionIndex];
    if (!option) {
      return false;
    }

    step.chosenOptionId = option.id;
    run.pendingNode = option;

    if (isCombatType(option.type)) {
      prepareCombat(run, option, rng);
      return option;
    }

    if (option.type === "rest") {
      run.phase = "rest";
      pushLog(run, "짧게 숨을 고를 수 있는 구역에 도착했다.");
      return option;
    }

    if (option.type === "forge") {
      run.phase = "forge";
      pushLog(run, "이동식 대장간을 발견했다. 카드 하나를 벼릴 수 있다.");
      return option;
    }

    return false;
  }

  function describeIntent(intent) {
    if (!intent) {
      return "다음 노드를 고르라.";
    }

    const fragments = [];
    if (intent.damage) {
      fragments.push(
        `${intent.damage}${intent.hits ? ` x ${intent.hits}` : ""} 공격`
      );
    }
    if (intent.gainBlock) {
      fragments.push(`블록 ${intent.gainBlock}`);
    }
    if (intent.gainStrength) {
      fragments.push(`Strength +${intent.gainStrength}`);
    }
    if (intent.heal) {
      fragments.push(`HP ${intent.heal} 회복`);
    }

    return fragments.length > 0 ? fragments.join(" · ") : intent.note;
  }

  function summarizeCardActions(actions) {
    return actions
      .map((action) => {
        switch (action.type) {
          case "damage":
            return `${action.amount}${action.hits ? `x${action.hits}` : ""} 피해`;
          case "block":
            return `블록 ${action.amount}`;
          case "draw":
            return `드로우 ${action.amount}`;
          case "energy":
            return `에너지 +${action.amount}`;
          case "heal":
            return `회복 ${action.amount}`;
          case "strength":
            return `Strength +${action.amount}`;
          case "expose":
            return `Expose ${action.amount}`;
          default:
            return null;
        }
      })
      .filter(Boolean);
  }

  function getRouteOptionBenefits(option) {
    if (option.type === "skirmish") {
      return ["카드 보상 1장", "중간 위험"];
    }
    if (option.type === "elite") {
      return ["카드 보상 1장", "유물 1개", "높은 위험"];
    }
    if (option.type === "rest") {
      return ["HP 회복", "최대 HP +5"];
    }
    if (option.type === "forge") {
      return ["카드 1장 강화", "전투 없음"];
    }
    if (option.type === "boss") {
      return ["최종 승리", "가장 위험"];
    }
    return [];
  }

  function getIncomingDamage(run) {
    if (!run.combat) {
      return 0;
    }

    const intent = getCurrentIntent(run);
    if (!intent?.damage) {
      return 0;
    }

    return (intent.damage + run.combat.enemy.strength) * (intent.hits || 1);
  }

  function getCoachData(run) {
    if (run.phase === "route") {
      return {
        label: "지금 할 일",
        title: "노드 하나를 골라 다음 방 성격을 결정한다",
        summary:
          "전투는 카드 보상, 엘리트는 카드와 유물, 휴식은 회복, 대장간은 카드 질 개선을 준다.",
        chips: [
          { label: "Step", value: `${run.routeIndex + 1} / ${run.route.length}` },
          { label: "HP", value: `${run.hp} / ${run.maxHp}` },
          { label: "Deck", value: `${run.deck.length} cards` },
        ],
        steps: [
          "빨간 전투 노드는 보상을 늘리고, 파란 지원 노드는 러닝을 안정화한다.",
          "체력이 낮으면 Rest, 자주 쓰는 카드가 약하면 Forge를 우선 본다.",
          "엘리트는 유물을 주지만 손해가 크면 이후 전투 전체가 흔들릴 수 있다.",
        ],
      };
    }

    if (run.phase === "combat") {
      const incoming = getIncomingDamage(run);
      const neededBlock = Math.max(0, incoming - run.block);
      const summary =
        incoming > 0
          ? neededBlock > 0
            ? `적이 다음 턴 총 ${incoming} 피해를 예고했다. 지금 블록 ${run.block}이므로 ${neededBlock}만 더 쌓으면 전부 막는다.`
            : `이미 블록 ${run.block}이 있어 다음 ${incoming} 피해를 막을 수 있다. 남는 에너지는 공격에 써도 된다.`
          : "이번 적 intent는 직접 공격이 아니다. 블록보다 공격 카드로 템포를 당겨도 된다.";

      return {
        label: "전투 순서",
        title: "Intent를 읽고, 막을 만큼 막은 뒤 남는 에너지로 민다",
        summary,
        chips: [
          { label: "Incoming", value: incoming },
          { label: "Need Block", value: neededBlock },
          { label: "Energy", value: `${run.energy} / ${MAX_ENERGY}` },
          { label: "Hand", value: run.combat.hand.length },
        ],
        steps: [
          "위 Intent와 중앙 적 카드에서 다음 턴 피해량을 먼저 본다.",
          "아래 손패에서 Skill로 블록을 만들고, 남는 에너지로 Attack/Power를 쓴다.",
          "쓸 카드가 없거나 계산이 끝났으면 E로 턴 종료한다.",
        ],
      };
    }

    if (run.phase === "reward") {
      return {
        label: "보상 선택",
        title: "이번 전투를 더 쉽게 만들 카드 한 장만 더한다",
        summary:
          "덱이 이미 무거우면 Skip도 괜찮다. 지금 부족한 역할을 메우는 카드인지 먼저 본다.",
        chips: [
          { label: "Deck", value: `${run.deck.length} cards` },
          { label: "Rewards", value: run.rewardChoices.length },
          { label: "Relic", value: run.pendingRelic ? "획득함" : "없음" },
        ],
        steps: [
          "막기가 부족하면 Skill, 마무리가 약하면 Attack, 전투가 길면 Power를 본다.",
          "지금 덱에 이미 많은 역할 카드는 과감히 Skip해서 밀도를 유지한다.",
          "엘리트 뒤라면 새 유물과 맞물리는 카드가 있는지 먼저 확인한다.",
        ],
      };
    }

    if (run.phase === "rest") {
      return {
        label: "휴식 선택",
        title: "지금 HP를 메울지, 최대 HP를 늘릴지 고른다",
        summary:
          run.hp <= Math.ceil(run.maxHp * 0.55)
            ? "현재 체력이 낮다. 당장 다음 전투 생존이 불안하면 Recover가 더 안전하다."
            : "체력이 아직 버틸 만하다. 장기적으로는 Steel Nerve가 더 큰 보험이 될 수 있다.",
        chips: [
          { label: "HP", value: `${run.hp} / ${run.maxHp}` },
          { label: "Next", value: `${Math.min(run.routeIndex + 2, run.route.length)} step` },
        ],
        steps: [
          "Recover는 즉시 HP를 채워 다음 전투 실패를 줄인다.",
          "Steel Nerve는 최대 HP를 키워 남은 러닝 전체의 여유를 만든다.",
          "보스가 가깝고 체력이 충분하면 최대 HP 투자를 고려할 만하다.",
        ],
      };
    }

    if (run.phase === "forge") {
      return {
        label: "대장간 선택",
        title: "가장 자주 쓰는 카드 한 장을 올려 전투 흐름을 바꾼다",
        summary:
          "초반 핵심 카드를 강화하는 편이 고코스트 카드 하나를 올리는 것보다 체감이 큰 경우가 많다.",
        chips: [
          {
            label: "Upgradable",
            value: run.deck.filter((card) => !card.upgraded).length,
          },
          { label: "Deck", value: `${run.deck.length} cards` },
        ],
        steps: [
          "매 전투 손에 잡히면 바로 쓰는 카드부터 강화한다.",
          "막기가 부족하면 방어 카드, 마무리가 약하면 공격 카드 강화를 본다.",
          "이미 충분히 센 카드보다 러닝 내내 자주 도는 카드가 보통 더 값지다.",
        ],
      };
    }

    return {
      label: "런 가이드",
      title: GAME_TITLE,
      summary: "",
      chips: [],
      steps: [],
    };
  }

  function renderCoachPanel(run) {
    const coach = getCoachData(run);
    const quickActions =
      run.phase === "route"
        ? ["길 선택", "보상 칩 확인", "1-3 또는 클릭"]
        : run.phase === "combat"
          ? ["Intent 읽기", "1-5 카드 사용", "E 턴 종료"]
          : run.phase === "reward"
            ? ["보상 1장", "덱 과밀 체크", "Skip 가능"]
            : run.phase === "rest"
              ? ["회복", "최대 HP", "다음 방 준비"]
              : run.phase === "forge"
                ? ["주력 카드", "1장 강화", "즉시 진행"]
                : [];

    return `
      <article class="coach-strip">
        <div class="coach-strip__lead">
          <div>
            <p class="coach-strip__eyebrow">${escapeHtml(coach.label)}</p>
            <h3 class="coach-strip__title">${escapeHtml(coach.title)}</h3>
          </div>
        </div>
        <div class="coach-strip__chips">
          ${quickActions
            .map(
              (action, index) => `
                <span class="coach-action-pill">${index + 1}. ${escapeHtml(action)}</span>
              `
            )
            .join("")}
        </div>
        <div class="coach-strip__chips coach-strip__chips--stats">
            ${coach.chips
              .map(
                (chip) => `
                  <span class="coach-stat-pill">
                    <span>${escapeHtml(chip.label)}</span>
                    <strong>${escapeHtml(chip.value)}</strong>
                  </span>
                `
              )
              .join("")}
        </div>
      </article>
    `;
  }

  function summarizeDeck(deck) {
    const grouped = new Map();
    for (const card of deck) {
      const blueprint = getCardBlueprint(card);
      const key = blueprint.label;
      grouped.set(key, {
        label: blueprint.label,
        type: blueprint.type,
        description: blueprint.description,
        count: (grouped.get(key)?.count || 0) + 1,
      });
    }
    return [...grouped.values()].sort((left, right) => left.label.localeCompare(right.label));
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  const exported = {
    GAME_TITLE,
    MAX_ENERGY,
    HAND_SIZE,
    STARTING_HP,
    CARD_DEFS,
    RELIC_DEFS,
    ENEMY_DEFS,
    ROUTE_TEMPLATE,
    createStarterDeck,
    buildRoute,
    createInitialRun,
    createCombatState,
    getCardBlueprint,
    buildRewardChoices,
    upgradeCard,
    selectRouteOption,
    prepareCombat,
    playCard,
    endTurn,
    chooseReward,
    applyRestChoice,
    applyForgeChoice,
    describeIntent,
    summarizeCardActions,
    getIncomingDamage,
    summarizeDeck,
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = exported;
  }

  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  window.HexfallMarchCore = exported;

  const elements = {
    titleScreen: document.getElementById("title-screen"),
    gameScreen: document.getElementById("game-screen"),
    resultScreen: document.getElementById("result-screen"),
    startRun: document.getElementById("start-run"),
    restartRun: document.getElementById("restart-run"),
    backToTitle: document.getElementById("back-to-title"),
    phasePill: document.getElementById("phase-pill"),
    stepStat: document.getElementById("step-stat"),
    hpStat: document.getElementById("hp-stat"),
    blockStat: document.getElementById("block-stat"),
    energyStat: document.getElementById("energy-stat"),
    pileStat: document.getElementById("pile-stat"),
    intentStat: document.getElementById("intent-stat"),
    phaseTitle: document.getElementById("phase-title"),
    phaseCopy: document.getElementById("phase-copy"),
    coachPanel: document.getElementById("coach-panel"),
    routePanel: document.getElementById("route-panel"),
    relicPanel: document.getElementById("relic-panel"),
    stageView: document.getElementById("stage-view"),
    overlayPanel: document.getElementById("overlay-panel"),
    deckPanel: document.getElementById("deck-panel"),
    intelPanel: document.getElementById("intel-panel"),
    logPanel: document.getElementById("log-panel"),
    handShell: document.querySelector(".hand-shell"),
    handPanel: document.getElementById("hand-panel"),
    resultTitle: document.getElementById("result-title"),
    resultCopy: document.getElementById("result-copy"),
    resultStats: document.getElementById("result-stats"),
  };

  const app = {
    screen: "title",
    run: null,
  };

  function startRun() {
    app.run = createInitialRun();
    syncScreen();
    render();
  }

  function backToTitle() {
    app.run = null;
    app.screen = "title";
    render();
  }

  function syncScreen() {
    if (!app.run) {
      app.screen = "title";
      return;
    }

    app.screen = app.run.phase === "result" ? "result" : "game";
  }

  function getPhaseView(run) {
    switch (run.phase) {
      case "route":
        return {
          pill: "ROUTE",
          title: "다음 경로를 선택하라",
          copy: "보상 칩을 보고 이번 런에 필요한 방을 고른다.",
        };
      case "combat":
        return {
          pill: run.pendingNode?.type?.toUpperCase?.() || "COMBAT",
          title: `${run.combat.enemy.label}과 대치 중`,
          copy: "적 intent를 읽고 필요한 만큼 막은 뒤 남는 에너지로 민다.",
        };
      case "reward":
        return {
          pill: "REWARD",
          title: "새 인장을 고를 시간",
          copy: "카드 1장 추가 또는 Skip.",
        };
      case "rest":
        return {
          pill: "REST",
          title: "숨을 고를 틈",
          copy: "회복 또는 최대 HP 상승.",
        };
      case "forge":
        return {
          pill: "FORGE",
          title: "카드 하나를 벼려라",
          copy: "자주 쓰는 카드 1장을 강화한다.",
        };
      default:
        return {
          pill: "RUN",
          title: GAME_TITLE,
          copy: "",
        };
    }
  }

  function renderRouteProgress(run) {
    return `
      <div class="route-progress">
        ${run.route
          .map((step, index) => {
            const stateClass =
              index < run.routeIndex
                ? "route-progress__node route-progress__node--done"
                : index === run.routeIndex && run.phase !== "result"
                  ? "route-progress__node route-progress__node--current"
                  : "route-progress__node";

            return `
              <span class="${stateClass}" title="${escapeHtml(step.title)}">${index + 1}</span>
            `;
          })
          .join("")}
      </div>
    `;
  }

  function renderSceneSummary(run) {
    return `
      <div class="scene-modal__stats">
        <span class="summary-pill"><strong>${run.hp}/${run.maxHp}</strong>HP</span>
        <span class="summary-pill"><strong>${run.deck.length}</strong>Deck</span>
        <span class="summary-pill"><strong>${run.relics.length}</strong>Relic</span>
        <span class="summary-pill"><strong>${Math.min(run.routeIndex + 1, run.route.length)}</strong>Step</span>
        ${run.pendingRelic ? `<span class="summary-pill"><strong>Elite</strong>${escapeHtml(run.pendingRelic.label)}</span>` : ""}
      </div>
      ${
        run.relics.length
          ? `
            <div class="scene-modal__relics">
              ${run.relics
                .slice(-5)
                .map((relic) => `<span class="meta-chip">${escapeHtml(relic.short)}</span>`)
                .join("")}
            </div>
          `
          : ""
      }
    `;
  }

  function renderAmbientStage(run) {
    const phaseView = getPhaseView(run);
    const currentStep = getCurrentStep(run);

    return `
      <article class="arena-card arena-card--ambient">
        <div class="arena-stage arena-stage--ambient">
          <div class="ambient-scene__relics">
            ${
              run.relics.length
                ? run.relics
                    .slice(-4)
                    .map((relic) => `<span class="meta-chip">${escapeHtml(relic.short)}</span>`)
                    .join("")
                : '<span class="meta-chip">Relic 0</span>'
            }
          </div>
          <section class="combat-unit combat-unit--ambient">
            <div class="combat-unit__figure combat-unit__figure--player">
              <span class="combat-unit__glyph">HX</span>
            </div>
            <div class="combat-unit__plate">
              <p class="combat-unit__role">Marcher</p>
              <h3>Hexbearer</h3>
            </div>
          </section>
          <div class="ambient-scene__focus">
            <p class="arena-centerline__eyebrow">${escapeHtml(phaseView.pill)}</p>
            <h3>${escapeHtml(currentStep?.title || phaseView.title)}</h3>
            <p>${escapeHtml(phaseView.copy)}</p>
          </div>
          <div class="ambient-scene__gate">
            <span class="ambient-scene__gate-mark">
              ${escapeHtml(currentStep?.label || phaseView.pill.slice(0, 1))}
            </span>
          </div>
        </div>
      </article>
    `;
  }

  function renderRoutePanel(run) {
    return run.route
      .map((step, index) => {
        const stateClass =
          index < run.routeIndex
            ? "route-step route-step--done"
            : index === run.routeIndex && run.phase !== "result"
              ? "route-step route-step--current"
              : "route-step";

        const stateLabel =
          index < run.routeIndex
            ? '<span class="route-step__state route-step__state--done">done</span>'
            : index === run.routeIndex && run.phase !== "result"
              ? '<span class="route-step__state route-step__state--current">now</span>'
              : '<span class="route-step__state">next</span>';

        const chosen = step.chosenOptionId
          ? step.options.find((option) => option.id === step.chosenOptionId)?.label
          : null;

        return `
          <article class="${stateClass}">
            <div class="route-step__top">
              <span class="route-step__index">${escapeHtml(step.label)}</span>
              ${stateLabel}
            </div>
            <h3 class="route-step__title">${escapeHtml(step.title)}</h3>
            ${
              chosen
                ? `<p class="route-step__choice">${escapeHtml(chosen)}</p>`
                : ""
            }
          </article>
        `;
      })
      .join("");
  }

  function renderRelics(run) {
    if (run.relics.length === 0) {
      return `
        <article class="empty-card">
          <h3 class="empty-card__title">아직 유물이 없다</h3>
          <p class="empty-card__copy">엘리트를 밟으면 유물을 얻는다.</p>
        </article>
      `;
    }

    return run.relics
      .map(
        (relic) => `
          <article class="relic-chip">
            <div class="relic-chip__title">
              <h3>${escapeHtml(relic.label)}</h3>
              <span class="relic-chip__tag">${escapeHtml(relic.short)}</span>
            </div>
            <p class="relic-chip__copy">${escapeHtml(relic.short)}</p>
          </article>
        `
      )
      .join("");
  }

  function renderRouteChoices(run) {
    const step = getCurrentStep(run);
    const options = step?.options ?? [];

    return `
      <section class="phase-banner phase-banner--route">
        <p class="phase-banner__eyebrow">March Gate</p>
        <h3>${escapeHtml(step?.title || "다음 단계")}</h3>
        <p>${escapeHtml(step?.note || "다음 길을 고르라.")}</p>
      </section>
      <div class="choice-grid">
        ${options
          .map((option, index) => {
            const styleClass =
              option.type === "elite" || option.type === "boss"
                ? "choice-card choice-card--danger"
                : option.type === "rest" || option.type === "forge"
                  ? "choice-card choice-card--support"
                  : "choice-card";

            return `
              <button
                class="${styleClass}"
                style="--delay:${index * 0.06}s"
                data-action="route-option"
                data-index="${index}"
                type="button"
              >
                <div class="choice-card__title">
                  <h3>${escapeHtml(option.label)}</h3>
                  <span class="card-tile__tag">${escapeHtml(option.type)}</span>
                </div>
                <p class="choice-card__copy">${escapeHtml(option.summary)}</p>
                <div class="choice-card__meta">
                  ${getRouteOptionBenefits(option)
                    .map((entry) => `<span class="meta-chip">${escapeHtml(entry)}</span>`)
                    .join("")}
                </div>
                <div class="choice-card__actions">
                  <span class="choice-card__hotkey">${index + 1}</span>
                  <span class="choice-card__button">선택</span>
                </div>
              </button>
            `;
          })
          .join("")}
      </div>
    `;
  }

  function renderCombatStage(run) {
    const enemy = run.combat.enemy;
    const intent = getCurrentIntent(run);
    const incoming = getIncomingDamage(run);
    const neededBlock = Math.max(0, incoming - run.block);
    const playerHpPercent = Math.max(6, (run.hp / run.maxHp) * 100);
    const enemyHpPercent = Math.max(6, (enemy.hp / enemy.maxHp) * 100);

    return `
      <article class="arena-card">
        <div class="arena-stage">
          <div class="battlefield-hud">
            <div class="battlefield-hud__cluster">
              <span class="battlefield-chip">HP ${run.hp}/${run.maxHp}</span>
              <span class="battlefield-chip">Block ${run.block}</span>
              <span class="battlefield-chip">Energy ${run.energy}/${MAX_ENERGY}</span>
            </div>
            <div class="battlefield-hud__cluster battlefield-hud__cluster--center">
              <span class="battlefield-chip battlefield-chip--accent">${escapeHtml(enemy.label)}</span>
              <span class="battlefield-chip">${escapeHtml(describeIntent(intent))}</span>
            </div>
            <div class="battlefield-hud__cluster battlefield-hud__cluster--end">
              <span class="battlefield-chip">Need Block ${neededBlock}</span>
              <span class="battlefield-chip">Step ${run.routeIndex + 1}/${run.route.length}</span>
            </div>
          </div>
          <section class="combat-unit combat-unit--player">
            <div class="combat-unit__figure combat-unit__figure--player">
              <span class="combat-unit__glyph">HX</span>
            </div>
            <div class="combat-unit__plate">
              <p class="combat-unit__role">Bearer</p>
              <h3>Hexbearer</h3>
            </div>
            <div class="combat-status-row">
              <span class="combat-status-chip">Block ${run.block}</span>
              <span class="combat-status-chip">Strength ${run.strength}</span>
              <span class="combat-status-chip">Energy ${run.energy}/${MAX_ENERGY}</span>
            </div>
            <div class="combat-healthbar">
              <div class="combat-healthbar__fill" style="width:${playerHpPercent}%"></div>
              <strong>${run.hp} / ${run.maxHp}</strong>
            </div>
          </section>

          <section class="arena-centerline">
            <p class="arena-centerline__eyebrow">TURN READ</p>
            <h3>${escapeHtml(describeIntent(intent))}</h3>
            <p>${neededBlock > 0 ? `이번 턴 블록 ${neededBlock}가 더 필요하다.` : "지금 블록이면 다음 공격을 버틴다."}</p>
          </section>

          <section class="combat-unit combat-unit--enemy">
            <div class="combat-intent-pill">${escapeHtml(describeIntent(intent))}</div>
            <div class="combat-unit__figure combat-unit__figure--enemy">
              <span class="combat-unit__glyph">${escapeHtml(enemy.sigil)}</span>
            </div>
            <div class="combat-unit__plate">
              <p class="combat-unit__role">${escapeHtml(run.pendingNode.type)}</p>
              <div class="enemy-card__title">
                <h3>${escapeHtml(enemy.label)}</h3>
                <span class="enemy-card__tag">${escapeHtml(run.pendingNode.type)}</span>
              </div>
            </div>
            <div class="combat-status-row combat-status-row--enemy">
              <span class="combat-status-chip">Block ${enemy.block}</span>
              <span class="combat-status-chip">Strength ${enemy.strength}</span>
              <span class="combat-status-chip">Expose ${enemy.expose}</span>
            </div>
            <div class="combat-healthbar combat-healthbar--enemy">
              <div class="combat-healthbar__fill" style="width:${enemyHpPercent}%"></div>
              <strong>${enemy.hp} / ${enemy.maxHp}</strong>
            </div>
          </section>
        </div>

        <div class="enemy-meta enemy-meta--coach arena-readout">
          <div class="enemy-meta__item enemy-meta__item--accent">
            <span>Incoming</span>
            <strong>${incoming}</strong>
          </div>
          <div class="enemy-meta__item ${neededBlock > 0 ? "enemy-meta__item--warn" : "enemy-meta__item--safe"}">
            <span>Need Block</span>
            <strong>${neededBlock}</strong>
          </div>
          <div class="enemy-meta__item">
            <span>Draw / Discard</span>
            <strong>${run.combat.drawPile.length} / ${run.combat.discardPile.length}</strong>
          </div>
          <div class="enemy-meta__item">
            <span>Step</span>
            <strong>${run.routeIndex + 1} / ${run.route.length}</strong>
          </div>
        </div>
      </article>
    `;
  }

  function renderRewardStage(run) {
    return `
      <section class="phase-banner phase-banner--reward">
        <p class="phase-banner__eyebrow">Spoils</p>
        <h3>전투 흔적이 카드가 된다</h3>
        <p>
          이번 전투의 여유를 어떤 인장으로 바꿀지 결정한다.
          ${
            run.pendingRelic
              ? ` 엘리트 보상으로 ${escapeHtml(run.pendingRelic.label)}도 확보했다.`
              : ""
          }
        </p>
      </section>
      <div class="reward-grid">
        ${run.rewardChoices
          .map(
            (choice, index) => `
              <button
                class="choice-card"
                style="--delay:${index * 0.06}s"
                data-action="reward-choice"
                data-index="${index}"
                type="button"
              >
                <div class="choice-card__title">
                  <h3>${escapeHtml(choice.preview.label)}</h3>
                  <span class="card-tile__tag">${escapeHtml(choice.preview.type)}</span>
                </div>
                <p class="choice-card__copy">${escapeHtml(choice.preview.description)}</p>
                <div class="choice-card__meta">
                  <span class="meta-chip">Cost ${choice.preview.cost}</span>
                  <span class="meta-chip">현재 ${choice.deckCount}장</span>
                </div>
                <div class="choice-card__actions">
                  <span class="choice-card__hotkey">${index + 1}</span>
                  <span class="choice-card__button">덱에 추가</span>
                </div>
              </button>
            `
          )
          .join("")}
      </div>
      <button class="choice-card choice-card--support" data-action="reward-skip" type="button">
        <div class="choice-card__title">
          <h3>Skip</h3>
          <span class="card-tile__tag">hold</span>
        </div>
        <p class="choice-card__copy">지금 덱이 충분히 안정적이라면 이번 보상은 넘길 수 있다.</p>
        <div class="choice-card__actions">
          <span class="choice-card__button">덱 유지</span>
        </div>
      </button>
    `;
  }

  function renderRestStage() {
    return `
      <section class="phase-banner phase-banner--rest">
        <p class="phase-banner__eyebrow">Sanctuary</p>
        <h3>숨이 붙은 동안 방향을 고른다</h3>
        <p>당장 HP를 메우거나, 긴 러닝을 위해 최대 HP를 올릴 수 있다.</p>
      </section>
      <div class="rest-grid">
        <button class="choice-card choice-card--support" data-action="rest-choice" data-id="recover" type="button">
          <div class="choice-card__title">
            <h3>Recover</h3>
            <span class="card-tile__tag">heal</span>
          </div>
          <p class="choice-card__copy">HP를 18 회복하고 안정적으로 다음 방에 들어간다.</p>
          <div class="choice-card__actions">
            <span class="choice-card__hotkey">1</span>
            <span class="choice-card__button">회복</span>
          </div>
        </button>
        <button class="choice-card" data-action="rest-choice" data-id="steel-nerve" type="button">
          <div class="choice-card__title">
            <h3>Steel Nerve</h3>
            <span class="card-tile__tag">max hp</span>
          </div>
          <p class="choice-card__copy">최대 HP +5. 현재 HP도 5만큼 함께 오른다.</p>
          <div class="choice-card__actions">
            <span class="choice-card__hotkey">2</span>
            <span class="choice-card__button">정신 고정</span>
          </div>
        </button>
      </div>
    `;
  }

  function renderForgeStage(run) {
    const upgradable = run.deck.filter((card) => !card.upgraded);
    if (upgradable.length === 0) {
      return `
        <section class="phase-banner phase-banner--forge">
          <p class="phase-banner__eyebrow">Forge</p>
          <h3>더 벼를 카드가 없다</h3>
          <p>지금은 지나가도 된다. 이미 모든 카드가 강화돼 있다.</p>
        </section>
        <button class="choice-card choice-card--support" data-action="forge-skip" type="button">
          <div class="choice-card__title">
            <h3>Continue</h3>
            <span class="card-tile__tag">skip</span>
          </div>
          <p class="choice-card__copy">대장간을 지나치고 다음 단계로 이동한다.</p>
        </button>
      `;
    }

    return `
      <section class="phase-banner phase-banner--forge">
        <p class="phase-banner__eyebrow">Forge</p>
        <h3>강화할 카드를 고르라</h3>
        <p>이번 러닝에서 가장 자주 쓸 카드를 한 장만 정확하게 올린다.</p>
      </section>
      <div class="forge-grid">
        ${upgradable
          .map((card, index) => {
            const current = getCardBlueprint(card);
            const upgraded = getCardBlueprint({ ...card, upgraded: true });

            return `
              <button
                class="choice-card"
                style="--delay:${(index % 6) * 0.04}s"
                data-action="forge-choice"
                data-card-id="${escapeHtml(card.uid)}"
                type="button"
              >
                <div class="choice-card__title">
                  <h3>${escapeHtml(current.label)}</h3>
                  <span class="card-tile__tag">${escapeHtml(current.type)}</span>
                </div>
                <p class="choice-card__copy">${escapeHtml(current.description)}</p>
                <div class="choice-card__meta">
                  <span class="meta-chip">현재 ${current.cost}</span>
                  <span class="meta-chip">강화 후 ${upgraded.label}</span>
                </div>
                <p class="choice-card__copy">강화 후: ${escapeHtml(upgraded.description)}</p>
                <div class="choice-card__actions">
                  <span class="choice-card__hotkey">${(index % 9) + 1}</span>
                  <span class="choice-card__button">강화</span>
                </div>
              </button>
            `;
          })
          .join("")}
      </div>
    `;
  }

  function renderDeckPanel(run) {
    const entries = summarizeDeck(run.deck);
    const attackCount = entries
      .filter((entry) => entry.type === "Attack")
      .reduce((sum, entry) => sum + entry.count, 0);
    const skillCount = entries
      .filter((entry) => entry.type === "Skill")
      .reduce((sum, entry) => sum + entry.count, 0);
    const powerCount = entries
      .filter((entry) => entry.type === "Power")
      .reduce((sum, entry) => sum + entry.count, 0);
    const upgradedCount = run.deck.filter((card) => card.upgraded).length;

    return `
      <div class="summary-strip">
        <span class="summary-pill"><strong>${run.deck.length}</strong>Deck</span>
        <span class="summary-pill"><strong>${attackCount}</strong>Atk</span>
        <span class="summary-pill"><strong>${skillCount}</strong>Skill</span>
        <span class="summary-pill"><strong>${powerCount}</strong>Power</span>
        <span class="summary-pill"><strong>${upgradedCount}</strong>Up</span>
      </div>
      <div class="ledger-list">
        ${entries
          .map(
            (entry) => `
              <div class="ledger-item">
                <span>${escapeHtml(entry.type)}</span>
                <strong>${escapeHtml(entry.label)} x ${entry.count}</strong>
              </div>
            `
          )
          .join("")}
      </div>
    `;
  }

  function renderIntelPanel(run) {
    const intent = getCurrentIntent(run);
    const items =
      run.phase === "combat" && run.combat
        ? [
            { label: "Enemy", value: run.combat.enemy.label },
            { label: "Intent", value: describeIntent(intent) },
            { label: "Player Strength", value: run.strength },
            { label: "Enemy Strength", value: run.combat.enemy.strength },
          ]
        : [
            {
              label: "Current Phase",
              value: getPhaseView(run).pill,
            },
            {
              label: "Route Step",
              value: `${Math.min(run.routeIndex + 1, run.route.length)} / ${run.route.length}`,
            },
            {
              label: "Deck",
              value: `${run.deck.length} cards`,
            },
            {
              label: "Tip",
              value: run.pendingRelic
                ? `${run.pendingRelic.label} 확보`
                : "엘리트는 유물을 준다",
            },
          ];

    return `
      <div class="intel-list">
        ${items
          .map(
            (entry) => `
              <div class="intel-item">
                <span>${escapeHtml(entry.label)}</span>
                <strong>${escapeHtml(entry.value)}</strong>
              </div>
            `
          )
          .join("")}
      </div>
      <div class="summary-strip summary-strip--controls">
        <span class="summary-pill">1-5 카드</span>
        <span class="summary-pill">E 턴 종료</span>
        <span class="summary-pill">Attack 피해</span>
        <span class="summary-pill">Skill 방어</span>
      </div>
    `;
  }

  function renderLogs(run) {
    return [...run.log]
      .slice(-4)
      .reverse()
      .map((entry) => `<li class="log-entry">${escapeHtml(entry)}</li>`)
      .join("");
  }

  function renderHand(run) {
    if (run.phase !== "combat" || !run.combat) {
      return "";
    }

    return `
      <div class="hand-grid">
        ${run.combat.hand
          .map((card, index) => {
            const blueprint = getCardBlueprint(card);
            const disabled = blueprint.cost > run.energy;
            const spread = index - (run.combat.hand.length - 1) / 2;
            const angle = spread * 3.6;
            const lift = Math.abs(spread) * 10;
            return `
              <button
                class="hand-card hand-card--${escapeHtml(blueprint.type)}${disabled ? " hand-card--disabled" : ""}"
                style="--angle:${angle}deg; --lift:${lift}px"
                data-action="play-card"
                data-card-id="${escapeHtml(card.uid)}"
                type="button"
              >
                <div class="hand-card__title">
                  <div class="hand-card__cost">${blueprint.cost}</div>
                  <div>
                    <h3>${escapeHtml(blueprint.label)}</h3>
                    <span class="card-tile__tag">${escapeHtml(blueprint.type)}</span>
                  </div>
                  <span class="hand-card__index">${index + 1}</span>
                </div>
                <p class="hand-card__description">${escapeHtml(blueprint.description)}</p>
                <div class="hand-card__footer-row">
                  <span class="meta-chip">${disabled ? "에너지 부족" : "사용 가능"}</span>
                </div>
              </button>
            `;
          })
          .join("")}
      </div>
      <div class="hand-footer">
        <div class="hand-hint">
          <span class="summary-pill">Energy ${run.energy}/${MAX_ENERGY}</span>
          <span class="summary-pill">Block ${run.block}</span>
          <span class="summary-pill">블록은 적 턴 뒤 대부분 사라짐</span>
        </div>
        <div class="hand-actions">
          <button class="end-turn-button" data-action="end-turn" type="button">턴 종료 · E</button>
        </div>
      </div>
    `;
  }

  function renderOverlayPanel(run) {
    if (run.phase === "combat") {
      return "";
    }

    const phaseView = getPhaseView(run);
    const body =
      run.phase === "route"
        ? renderRouteChoices(run)
        : run.phase === "reward"
          ? renderRewardStage(run)
          : run.phase === "rest"
            ? renderRestStage(run)
            : run.phase === "forge"
              ? renderForgeStage(run)
              : "";
    const inputHint =
      run.phase === "route"
        ? "1-3 또는 클릭"
        : run.phase === "reward"
          ? "1-3 보상 선택, Skip 클릭 가능"
          : run.phase === "rest"
            ? "1-2 또는 클릭"
            : run.phase === "forge"
              ? "카드 클릭 또는 숫자"
              : "";

    return `
      <article class="scene-modal scene-modal--${escapeHtml(run.phase)}">
        <div class="scene-modal__header">
          <p class="scene-modal__eyebrow">${escapeHtml(phaseView.pill)}</p>
          <h3>${escapeHtml(phaseView.title)}</h3>
          <p class="scene-modal__copy">${escapeHtml(phaseView.copy)}</p>
        </div>
        <div class="scene-modal__meta">
          ${renderRouteProgress(run)}
          ${renderSceneSummary(run)}
        </div>
        <div class="scene-modal__body">
          ${body}
        </div>
        <div class="scene-modal__footer">
          <span class="scene-modal__hint">${escapeHtml(inputHint)}</span>
        </div>
      </article>
    `;
  }

  function renderStage(run) {
    switch (run.phase) {
      case "combat":
        return renderCombatStage(run);
      default:
        return renderAmbientStage(run);
    }
  }

  function renderResult(run) {
    elements.resultTitle.textContent = run.result.won
      ? "행군 성공"
      : "행군 중단";
    elements.resultCopy.textContent = run.result.reason;
    elements.resultStats.innerHTML = [
      { label: "도달 단계", value: `${run.result.stepReached} / ${run.route.length}` },
      { label: "남은 HP", value: run.result.hp },
      { label: "덱 크기", value: run.result.deckSize },
      { label: "유물", value: run.result.relics },
    ]
      .map(
        (entry) => `
          <article class="result-stat">
            <strong>${escapeHtml(entry.value)}</strong>
            <p>${escapeHtml(entry.label)}</p>
          </article>
        `
      )
      .join("");
  }

  function render() {
    elements.titleScreen.classList.toggle("hidden", app.screen !== "title");
    elements.gameScreen.classList.toggle("hidden", app.screen !== "game");
    elements.resultScreen.classList.toggle("hidden", app.screen !== "result");

    if (!app.run) {
      return;
    }

    const phaseView = getPhaseView(app.run);
    const stepValue =
      app.run.phase === "result"
        ? `${app.run.route.length} / ${app.run.route.length}`
        : `${Math.min(app.run.routeIndex + 1, app.run.route.length)} / ${app.run.route.length}`;

    elements.phasePill.textContent = phaseView.pill;
    elements.stepStat.textContent = stepValue;
    elements.hpStat.textContent = `${app.run.hp} / ${app.run.maxHp}`;
    elements.blockStat.textContent = String(app.run.block);
    elements.energyStat.textContent = `${app.run.energy} / ${MAX_ENERGY}`;

    if (app.run.combat) {
      elements.pileStat.textContent = `Draw ${app.run.combat.drawPile.length} · Discard ${app.run.combat.discardPile.length}`;
      elements.intentStat.textContent = describeIntent(getCurrentIntent(app.run));
    } else {
      elements.pileStat.textContent = `Deck ${app.run.deck.length} · Relic ${app.run.relics.length}`;
      elements.intentStat.textContent = getCurrentStep(app.run)?.note || "다음 노드를 고르라.";
    }

    elements.phaseTitle.textContent = phaseView.title;
    elements.phaseCopy.textContent = phaseView.copy;
    elements.coachPanel.innerHTML = renderCoachPanel(app.run);
    elements.routePanel.innerHTML = renderRoutePanel(app.run);
    elements.relicPanel.innerHTML = renderRelics(app.run);
    elements.stageView.innerHTML = renderStage(app.run);
    elements.overlayPanel.innerHTML = renderOverlayPanel(app.run);
    elements.overlayPanel.classList.toggle("overlay-panel--visible", app.run.phase !== "combat");
    elements.deckPanel.innerHTML = renderDeckPanel(app.run);
    elements.intelPanel.innerHTML = renderIntelPanel(app.run);
    elements.logPanel.innerHTML = renderLogs(app.run);
    elements.handShell.classList.toggle("hidden", app.run.phase !== "combat");
    elements.handPanel.innerHTML = renderHand(app.run);

    if (app.run.phase === "result") {
      renderResult(app.run);
    }
  }

  function commit() {
    syncScreen();
    render();
  }

  function handlePointerAction(event) {
    const target = event.target.closest("[data-action]");
    if (!target) {
      return;
    }

    const action = target.dataset.action;

    if (action === "route-option") {
      selectRouteOption(app.run, Number(target.dataset.index));
      commit();
      return;
    }

    if (action === "play-card") {
      playCard(app.run, target.dataset.cardId);
      commit();
      return;
    }

    if (action === "end-turn") {
      endTurn(app.run);
      commit();
      return;
    }

    if (action === "reward-choice") {
      chooseReward(app.run, Number(target.dataset.index));
      commit();
      return;
    }

    if (action === "reward-skip") {
      chooseReward(app.run, -1);
      commit();
      return;
    }

    if (action === "rest-choice") {
      applyRestChoice(app.run, target.dataset.id);
      commit();
      return;
    }

    if (action === "forge-choice") {
      applyForgeChoice(app.run, target.dataset.cardId);
      commit();
      return;
    }

    if (action === "forge-skip") {
      applyForgeChoice(app.run, "");
      commit();
    }
  }

  function handleKeydown(event) {
    if (event.repeat) {
      return;
    }

    if (event.code === "Enter") {
      if (app.screen === "title") {
        startRun();
      } else if (app.screen === "result") {
        startRun();
      }
      return;
    }

    if (event.code === "KeyR" && app.screen !== "title") {
      startRun();
      return;
    }

    if (!app.run) {
      return;
    }

    if (event.code === "KeyE" && app.run.phase === "combat") {
      event.preventDefault();
      endTurn(app.run);
      commit();
      return;
    }

    if (/^Digit[1-9]$/.test(event.code)) {
      const index = Number(event.code.replace("Digit", "")) - 1;

      if (app.run.phase === "combat") {
        const card = app.run.combat.hand[index];
        if (card) {
          playCard(app.run, card.uid);
          commit();
        }
        return;
      }

      if (app.run.phase === "route") {
        if (selectRouteOption(app.run, index)) {
          commit();
        }
        return;
      }

      if (app.run.phase === "reward") {
        if (app.run.rewardChoices[index]) {
          chooseReward(app.run, index);
          commit();
        }
        return;
      }

      if (app.run.phase === "rest") {
        if (index === 0) {
          applyRestChoice(app.run, "recover");
          commit();
        } else if (index === 1) {
          applyRestChoice(app.run, "steel-nerve");
          commit();
        }
        return;
      }

      if (app.run.phase === "forge") {
        const upgradable = app.run.deck.filter((card) => !card.upgraded);
        if (upgradable[index]) {
          applyForgeChoice(app.run, upgradable[index].uid);
          commit();
        }
      }
    }
  }

  elements.startRun.addEventListener("pointerdown", startRun);
  elements.restartRun.addEventListener("pointerdown", startRun);
  elements.backToTitle.addEventListener("pointerdown", backToTitle);
  document.addEventListener("pointerdown", handlePointerAction);
  document.addEventListener("keydown", handleKeydown);

  render();
})();

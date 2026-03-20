const SUPPORTED_LANGUAGES = ["ko", "en"];
const LANGUAGE_STORAGE_KEY = "deadstock-depot-language";
const BRIEFING_STORAGE_KEY = "deadstock-depot-briefing-seen";

const ITEM_DEFS = [
  {
    id: "cans",
    name: { ko: "통조림 식품", en: "Canned Food" },
    short: { ko: "통조림", en: "Cans" },
    buy: 2,
    sell: 5,
    unlockDay: 1,
    rarity: "common",
    tags: ["food", "survival"],
    demandByDay: [0.34, 0.28, 0.22, 0.19, 0.17, 0.16],
    note: {
      ko: "회전이 빠른 생필품이다.",
      en: "Fast moving shelf staple.",
    },
  },
  {
    id: "med",
    name: { ko: "구급 키트", en: "Med Kit" },
    short: { ko: "메디킷", en: "Med" },
    buy: 4,
    sell: 8,
    unlockDay: 1,
    rarity: "uncommon",
    tags: ["medical"],
    demandByDay: [0.2, 0.2, 0.22, 0.23, 0.24, 0.22],
    note: {
      ko: "값은 비싸지만 여유 있게 팔면 팁이 잘 붙는다.",
      en: "Pricy, slow, but worth the tip.",
    },
  },
  {
    id: "battery",
    name: { ko: "배터리 팩", en: "Battery Pack" },
    short: { ko: "배터리", en: "Cell" },
    buy: 3,
    sell: 6,
    unlockDay: 1,
    rarity: "common",
    tags: ["power", "defense"],
    demandByDay: [0.26, 0.24, 0.22, 0.2, 0.18, 0.17],
    note: {
      ko: "수요가 몰려도 마진이 안정적이다.",
      en: "Good middle margin in panic hours.",
    },
  },
  {
    id: "scrap",
    name: { ko: "고철 도구", en: "Scrap Tool" },
    short: { ko: "고철도구", en: "Scrap" },
    buy: 3,
    sell: 7,
    unlockDay: 1,
    rarity: "uncommon",
    tags: ["tools", "defense"],
    demandByDay: [0.2, 0.18, 0.15, 0.13, 0.11, 0.1],
    note: {
      ko: "찾는 손님은 드물지만, 팔리면 수익이 크다.",
      en: "Rare ask, heavy payout.",
    },
  },
  {
    id: "water",
    name: { ko: "생수 팩", en: "Water Pack" },
    short: { ko: "생수", en: "Water" },
    buy: 2,
    sell: 4,
    unlockDay: 2,
    rarity: "common",
    tags: ["food", "survival"],
    demandByDay: [0, 0.22, 0.18, 0.17, 0.15, 0.13],
    note: {
      ko: "값은 낮지만 몰릴 때 가장 빨리 빠진다.",
      en: "Cheap, but vanishes fast during a rush.",
    },
  },
  {
    id: "fuel",
    name: { ko: "연료 캔", en: "Fuel Can" },
    short: { ko: "연료", en: "Fuel" },
    buy: 4,
    sell: 9,
    unlockDay: 3,
    rarity: "uncommon",
    tags: ["power", "defense"],
    demandByDay: [0, 0, 0.16, 0.19, 0.22, 0.24],
    note: {
      ko: "밤 준비 수요가 붙으면 값이 확 뛴다.",
      en: "Night prep demand pushes its value up fast.",
    },
  },
  {
    id: "bandage",
    name: { ko: "붕대 롤", en: "Bandage Roll" },
    short: { ko: "붕대", en: "Bandage" },
    buy: 3,
    sell: 5,
    unlockDay: 4,
    rarity: "common",
    tags: ["medical", "survival"],
    demandByDay: [0, 0, 0, 0.18, 0.17, 0.16],
    note: {
      ko: "응급 처치 수요를 넓게 받아주는 중간 품목이다.",
      en: "A flexible mid-tier pick for emergency demand.",
    },
  },
  {
    id: "ammo",
    name: { ko: "탄약 상자", en: "Ammo Box" },
    short: { ko: "탄약", en: "Ammo" },
    buy: 5,
    sell: 11,
    unlockDay: 5,
    rarity: "rare",
    tags: ["defense", "rare"],
    demandByDay: [0, 0, 0, 0, 0.12, 0.15],
    note: {
      ko: "드물게 찾지만 팔리면 오늘 매출을 끌어올린다.",
      en: "Rare ask, but one sale can swing the whole day.",
    },
  },
];

const DAY_CONFIG = {
  1: {
    stockDuration: 20,
    saleDuration: 40,
    defenseDuration: 30,
    customerPatience: 7.4,
    spawnGap: 0.8,
    nightQuota: 7,
    nightSpeed: 0.13,
    runnerChance: 0.12,
    spawnInterval: 1.35,
  },
  2: {
    stockDuration: 20,
    saleDuration: 46,
    defenseDuration: 30,
    customerPatience: 6.4,
    spawnGap: 0.65,
    nightQuota: 9,
    nightSpeed: 0.16,
    runnerChance: 0.26,
    spawnInterval: 1.12,
  },
  3: {
    stockDuration: 20,
    saleDuration: 52,
    defenseDuration: 30,
    customerPatience: 5.6,
    spawnGap: 0.55,
    nightQuota: 12,
    nightSpeed: 0.19,
    runnerChance: 0.36,
    spawnInterval: 0.9,
  },
  4: {
    stockDuration: 20,
    saleDuration: 56,
    defenseDuration: 31,
    customerPatience: 5.1,
    spawnGap: 0.5,
    nightQuota: 14,
    nightSpeed: 0.2,
    runnerChance: 0.42,
    spawnInterval: 0.84,
  },
  5: {
    stockDuration: 18,
    saleDuration: 60,
    defenseDuration: 33,
    customerPatience: 4.7,
    spawnGap: 0.45,
    nightQuota: 18,
    nightSpeed: 0.22,
    runnerChance: 0.5,
    spawnInterval: 0.72,
  },
  6: {
    stockDuration: 18,
    saleDuration: 64,
    defenseDuration: 35,
    customerPatience: 4.3,
    spawnGap: 0.4,
    nightQuota: 22,
    nightSpeed: 0.24,
    runnerChance: 0.58,
    spawnInterval: 0.64,
  },
};

const MAX_DAY = Math.max(...Object.keys(DAY_CONFIG).map(Number));

const UPGRADE_DEFS = [
  {
    id: "storage-rack",
    name: { ko: "적재 선반", en: "Storage Rack" },
    cost: 10,
    description: {
      ko: "모든 물품의 재고 한도가 2칸 늘어난다.",
      en: "Inventory cap +2 for every item.",
    },
    apply: (currentState) => {
      currentState.inventoryCap += 2;
    },
  },
  {
    id: "hardwood-slats",
    name: { ko: "강화 판재", en: "Hardwood Slats" },
    cost: 12,
    description: {
      ko: "창문 최대 체력 +2, 수리량 +1.",
      en: "Window max health +2 and repair strength +1.",
    },
    apply: (currentState) => {
      currentState.maxWindowHp += 2;
      currentState.repairPower += 1;
    },
  },
  {
    id: "scrap-caster",
    name: { ko: "스크랩 슈터", en: "Scrap Caster" },
    cost: 11,
    description: {
      ko: "공격 피해가 1 증가한다.",
      en: "Attack damage +1.",
    },
    apply: (currentState) => {
      currentState.attackDamage += 1;
    },
  },
  {
    id: "quick-hands",
    name: { ko: "날쌘 손", en: "Quick Hands" },
    cost: 9,
    description: {
      ko: "공격 재사용 대기시간이 0.12초 줄어든다.",
      en: "Attack cooldown drops by 0.12 seconds.",
    },
    apply: (currentState) => {
      currentState.attackCooldownBase = Math.max(
        0.2,
        currentState.attackCooldownBase - 0.12
      );
    },
  },
  {
    id: "tip-jar",
    name: { ko: "팁 통", en: "Tip Jar" },
    cost: 8,
    description: {
      ko: "정상 판매마다 코인을 1 더 받는다.",
      en: "Every clean sale earns +1 extra coin.",
    },
    apply: (currentState) => {
      currentState.tipBonus += 1;
    },
  },
  {
    id: "flash-capacitor",
    name: { ko: "플래시 증폭기", en: "Flash Capacitor" },
    cost: 10,
    description: {
      ko: "플래시 램프 기절 시간이 0.7초 늘어난다.",
      en: "Flash lamp stun duration +0.7 seconds.",
    },
    apply: (currentState) => {
      currentState.stunDuration += 0.7;
    },
  },
];

const CUSTOMER_NAMES = {
  ko: ["도윤", "하늘", "서윤", "민재", "나래", "지후", "수아", "태오", "해솔", "윤서"],
  en: ["Vale", "June", "Iris", "Patch", "Marlow", "Rook", "Dawn", "Kite", "Hale", "Sable"],
};

const ZOMBIE_META = {
  runner: {
    noun: { ko: "러너", en: "runner" },
    chip: { ko: "질주", en: "RUN" },
  },
  walker: {
    noun: { ko: "워커", en: "walker" },
    chip: { ko: "보행", en: "WALK" },
  },
};

const CUSTOMER_TYPES = {
  standard: {
    id: "standard",
    unlockDay: 1,
    weightByDay: [1, 0.78, 0.62, 0.5, 0.42, 0.35],
    name: { ko: "일반 손님", en: "Standard" },
    hint: { ko: "기본 조건으로 주문한다.", en: "Baseline customer." },
    patienceScale: 1,
    tipBonus: 0,
    leavePenalty: 0,
    mistakePenalty: 0,
    allowedRules: ["single_exact", "double_exact", "either_or", "bundle_two", "prep_run"],
  },
  hurried: {
    id: "hurried",
    unlockDay: 2,
    weightByDay: [0, 0.32, 0.31, 0.28, 0.25, 0.23],
    name: { ko: "급한 손님", en: "Hurried" },
    hint: { ko: "인내심 짧음 · 팁 +1", en: "Short patience, +1 tip." },
    patienceScale: 0.72,
    tipBonus: 1,
    leavePenalty: 1,
    mistakePenalty: 0,
    allowedRules: ["single_exact", "double_exact", "either_or"],
  },
  picky: {
    id: "picky",
    unlockDay: 2,
    weightByDay: [0, 0.2, 0.22, 0.2, 0.18, 0.16],
    name: { ko: "까다로운 손님", en: "Picky" },
    hint: { ko: "실수 페널티 큼", en: "Mistakes hurt more." },
    patienceScale: 0.94,
    tipBonus: 0,
    leavePenalty: 0,
    mistakePenalty: 2,
    allowedRules: ["single_exact", "double_exact"],
  },
  regular: {
    id: "regular",
    unlockDay: 3,
    weightByDay: [0, 0, 0.18, 0.21, 0.23, 0.24],
    name: { ko: "단골", en: "Regular" },
    hint: { ko: "인내심 김 · 팁 +2", en: "Patient, +2 tip." },
    patienceScale: 1.18,
    tipBonus: 2,
    leavePenalty: 0,
    mistakePenalty: -1,
    allowedRules: ["single_exact", "either_or", "bundle_two"],
  },
  desperate: {
    id: "desperate",
    unlockDay: 5,
    weightByDay: [0, 0, 0, 0, 0.16, 0.22],
    name: { ko: "다급한 손님", en: "Desperate" },
    hint: { ko: "생존 물자 우선 · 놓치면 압박 +2", en: "Survival demand, miss +2 pressure." },
    patienceScale: 0.88,
    tipBonus: 0,
    leavePenalty: 2,
    mistakePenalty: 0,
    allowedRules: ["single_exact", "prep_run", "either_or"],
  },
};

const ORDER_RULES = {
  single_exact: {
    id: "single_exact",
    unlockDay: 1,
    weightByDay: [1, 1, 0.56, 0.46, 0.36, 0.3],
    name: { ko: "단일 주문", en: "Single Item" },
    hint: { ko: "물건 1개만 정확히 맞춰 주면 된다.", en: "Deliver one exact item." },
    completionTipBonus: 0,
  },
  double_exact: {
    id: "double_exact",
    unlockDay: 3,
    weightByDay: [0, 0, 0.24, 0.24, 0.22, 0.2],
    name: { ko: "수량 주문", en: "Double Order" },
    hint: { ko: "같은 물건 2개를 채워야 끝난다.", en: "Fill the same item twice." },
    completionTipBonus: 1,
  },
  either_or: {
    id: "either_or",
    unlockDay: 3,
    weightByDay: [0, 0, 0.2, 0.22, 0.22, 0.24],
    name: { ko: "대체 주문", en: "Either / Or" },
    hint: { ko: "둘 중 하나만 맞춰 주면 된다.", en: "Either of two items will do." },
    completionTipBonus: 0,
  },
  bundle_two: {
    id: "bundle_two",
    unlockDay: 4,
    weightByDay: [0, 0, 0, 0.18, 0.2, 0.22],
    name: { ko: "복합 주문", en: "Bundle Order" },
    hint: { ko: "서로 다른 2개를 모두 채워야 한다.", en: "Deliver two different items." },
    completionTipBonus: 1,
  },
  prep_run: {
    id: "prep_run",
    unlockDay: 5,
    weightByDay: [0, 0, 0, 0, 0.18, 0.2],
    name: { ko: "밤 준비 주문", en: "Prep Run" },
    hint: { ko: "생존/방어 물자를 더 자주 찾는다.", en: "Favors survival and defense goods." },
    completionTipBonus: 0,
    leavePenalty: 1,
  },
};

const EITHER_OR_PAIRS = [
  ["cans", "water"],
  ["battery", "fuel"],
  ["med", "bandage"],
  ["scrap", "ammo"],
];

const BUNDLE_PAIRS = [
  ["cans", "water"],
  ["battery", "bandage"],
  ["med", "battery"],
  ["fuel", "ammo"],
  ["cans", "bandage"],
  ["scrap", "fuel"],
];

const PHASE_META = {
  title: {
    label: { ko: "대기", en: "Title" },
    title: { ko: "데드스톡 디포", en: "Deadstock Depot" },
    button: { ko: "영업 시작", en: "Open Shop" },
  },
  stock: {
    label: { ko: "준비", en: "Stock" },
    title: { ko: "영업 준비", en: "Morning prep" },
    button: { ko: "영업 시작", en: "Open Shop" },
  },
  sale: {
    label: { ko: "판매", en: "Trade" },
    title: { ko: "손님 응대", en: "Customers on the floor" },
    button: { ko: "영업 중", en: "Sales locked" },
  },
  defense: {
    label: { ko: "방어", en: "Defense" },
    title: { ko: "야간 방어", en: "Nightfall breach" },
    button: { ko: "방어 중", en: "Hold the line" },
  },
  upgrade: {
    label: { ko: "보강", en: "Upgrade" },
    title: { ko: "새벽 정비", en: "Dawn reprieve" },
    button: { ko: "하나 고르기", en: "Choose one" },
  },
  result: {
    label: { ko: "결과", en: "Result" },
    title: { ko: "근무 결산", en: "Run summary" },
    button: { ko: "다시 시작", en: "Restart" },
  },
};

const STRINGS = {
  ko: {
    app: {
      title: "데드스톡 디포",
      language: "언어",
      languageOptions: {
        ko: "한글",
        en: "ENG",
      },
    },
    shared: {
      seconds: "{value}초",
      locked: "사용 불가",
    },
    title: {
      eyebrow: "폐허 속 생존 상점",
      copy:
        "무너진 국도 옆 폐창고를 임시 상점으로 꾸려 버티고 있다. 낮에는 떠돌이 손님에게 물건을 팔아 연료와 판자를 마련하고, 밤에는 불빛을 보고 몰려오는 것들을 막아내야 한다. 6일만 버티면 구호 트럭이 도착한다.",
      loopTitle: "핵심 루프",
      loopCopy: "재고를 채우고, 장사하고, 밤을 버틴다.",
      controlsTitle: "조작",
      controlsCopyHtml:
        "<code>1-8</code>번 물건 구매/판매, <code>Q/W</code> 방어 도구 전환, <code>E</code> 플래시 램프 사용.",
      pressureTitle: "압박",
      pressureCopy: "손님을 놓치거나 엉뚱한 물건을 내주면 밤이 훨씬 버거워진다.",
      signal1Eyebrow: "마지막 거점",
      signal1Copy: "남쪽 검문소가 무너진 뒤, 이 창고는 국도 위 마지막 보급 거점이 됐다.",
      signal2Eyebrow: "낮 근무",
      signal2Copy: "손님이 원하는 물건을 맞춰 팔아 코인을 벌고, 해 지기 전 판자와 장비를 챙겨야 한다.",
      signal3Eyebrow: "밤의 대가",
      signal3Copy: "재고가 비거나 잘못 팔면 밤에 더 큰 대가를 치르게 된다. 6일만 버티면 된다.",
      start: "교대 시작",
      openBriefing: "브리핑 보기",
      note: "원작을 그대로 옮기지 않고, 브라우저 플레이에 맞게 재구성한 버전이다.",
    },
    hud: {
      day: "{day}일차 / {max}일",
      coins: "코인",
      base: "기지",
      phaseTime: "남은 시간",
      nightPressure: "야간 압박",
      defenseEnergy: "방어 에너지",
    },
    panels: {
      inventoryEyebrow: "재고",
      inventoryTitle: "판매 선반",
      feedEyebrow: "상황판",
      logEyebrow: "현장 기록",
      logTitle: "이벤트 로그",
      defenseEyebrow: "야간 방어",
      defenseTitle: "방어 장비",
      upgradesEyebrow: "보강",
      upgradesTitle: "설치된 보강",
    },
    keys: {
      title: "단축키",
      space: "Space: 준비 단계 진행 / 재시작",
      qw: "Q/W: 수리 모드 / 공격 모드",
      e: "E: 플래시 램프 사용",
    },
    modals: {
      between: "새벽 정비",
      chooseUpgrade: "업그레이드 선택",
      skipUpgrade: "건너뛰고 다음 날로",
      restart: "다시 시작",
    },
    briefing: {
      eyebrow: "교대 브리핑",
      title: "불빛이 적을 끌어들이기 전에 준비해라",
      copy:
        "이 디포는 폐허가 된 도로 위 마지막 보급 상점이다. 낮에는 장사를 해 코인과 자재를 모으고, 밤에는 불빛을 보고 몰려오는 것들을 막아내야 한다.",
      card1Tag: "마지막 보급 거점",
      card1Copy: "남쪽 검문소가 무너진 뒤, 이 창고는 길 위 마지막 보급 거점이 됐다.",
      card2Tag: "낮의 규칙",
      card2Copy: "낮에는 재고를 돌려 코인을 벌고, 해 지기 전 창문과 장비를 보강해라.",
      card3Tag: "밤의 비용",
      card3Copy: "손님을 놓칠수록 소문이 퍼지고, 밤이면 더 많은 것들이 불빛을 따라온다. 6일만 버티면 된다.",
      start: "근무 시작",
      dismiss: "나중에 보기",
    },
    items: {
      buyButton: "구매 [{slot}]",
      sellButton: "판매 [{slot}]",
      buyShort: "구매",
      sellShort: "판매",
      buyPrice: "구매 {price}",
      sellPrice: "판매 {price}",
      buyMini: "구 {price}",
      sellMini: "판 {price}",
      unlockDay: "{day}일차 해금",
      stockCount: "{owned} / {cap}",
      availableCount: "사용 가능 {count}",
    },
    sale: {
      empty: "판매 단계가 되면 이 자리가 손님 받는 공간으로 바뀐다.",
      currentCustomer: "현재 손님",
      nextCustomer: "다음 손님",
      lineShuffling: "다음 손님 대기 중",
      nextCustomerCopy: "잠깐 숨을 고르자. 다음 손님이 곧 앞으로 나온다.",
      needs: "{item} 요청",
      patience: "인내심 {time}",
      serveWindow: "남은 인내 시간",
      progress: "주문 진행 {filled}/{total}",
      customerType: "손님 유형",
      orderRule: "주문 규칙",
      failurePenalty: "놓치면 +{leave}, 실수하면 +{mistake}",
      unlockCard: "오늘 해금",
      noUnlocks: "새로 열린 품목 없음",
      waitingIntel: "다음 손님이 들어오면 주문 정보가 표시된다.",
      or: "또는",
      daySales: "판매 수",
      dayRevenue: "매출",
      missedCustomers: "놓친 손님",
      nightForecast: "야간 압박 예상",
      hostiles: "{count}체 예상",
      summaryCopy:
        "손님이 원하는 물건을 정확히 내줄수록 밤 압박이 낮아진다. 재고가 비거나 엉뚱한 물건을 내주면 오늘 밤 창문 앞으로 적이 더 몰려온다.",
    },
    defense: {
      empty: "방어 단계가 되면 이 자리가 야간 레인으로 바뀐다.",
      lane: "{number}번 레인",
      boardHp: "판자 내구도 {current} / {max}",
      incoming: "접근 중 {count}",
      repairButton: "수리",
      attackButton: "공격",
      cooling: "재사용 대기 {time}",
      zombieChip: {
        runner: "러너 {hp}",
        walker: "워커 {hp}",
      },
      actions: {
        repair: {
          name: "판자 보강",
          meta: "창문이나 레인을 눌러 판자 내구도를 회복한다. 에너지 1 소모.",
        },
        attack: {
          name: "고철 사격",
          meta: "좀비나 레인을 눌러 피해 {damage}를 준다. 에너지 1 소모.",
        },
        flash: {
          name: "플래시 램프",
          meta: "보이는 좀비 전체를 {duration} 동안 기절시킨다. 에너지 2 소모.",
        },
      },
    },
    upgrades: {
      none: "아직 설치된 업그레이드가 없다. 밤을 한 번 버텨야 새 장비를 고를 수 있다.",
      noneShort: "아직 없음",
      buy: "{cost}코인으로 구매",
      summary:
        "{day}일차 매출 {revenue}코인, 야간 압박 최고치 {pressure}%. 새벽이 오기 전에 보강 하나를 골라라.",
    },
    results: {
      clearedTag: "방어 성공",
      overTag: "방어 실패",
      clearedTitle: "디포를 지켜냈다",
      overTitle: "디포의 불이 꺼졌다",
      days: "생존 일수",
      revenue: "총 매출",
      accuracy: "판매 정확도",
      upgrades: "설치한 보강",
      reason: {
        victory: "{nights}일 밤을 버텼다. 아직 디포의 불빛은 꺼지지 않았다.",
        collapse: "밤 공세를 막지 못해 전면이 무너졌다.",
      },
    },
    feedback: {
      restock: "보충",
      sold: "판매",
      miss: "잘못 판매",
      empty: "재고 없음",
      repair: "보강",
      drop: "처치",
      hit: "피격",
      baseHit: "기지 피격",
      blind: "섬광",
      pressure: "압박 상승",
      pressureDown: "압박 완화",
      energySpend: "에너지 소모",
    },
    messages: {
      flavor: {
        title: "줄이 몰리기 전에 창문부터 점검하자.",
        stock: "영업 준비 시간이다. 문 열기 전에 코인을 재고에 써라.",
        stockOpening: "무전: 창문부터 막아. 곧 손님 몰린다.",
        sale: "손님이 찾는 물건을 빨리 내줘라. 한 번씩 놓칠 때마다 밤이 더 버거워진다.",
        defense:
          "밤이 내렸다. 창문을 수리하고, 다가오는 적을 막고, 레인이 무너지기 전에 플래시를 터뜨려라.",
      },
    },
    logs: {
      depotQuiet: "지금은 조용하다. 아직은.",
      openingRadio: "무전: 창문부터 막아. 곧 손님 몰린다.",
      dayStart: "셔터를 올렸다. {day}일차가 시작된다.",
      shopOpen: "영업을 시작했다. 손님 줄이 움직이기 시작한다.",
      customerLeft: "{name} 손님이 빈손으로 돌아섰다.",
      saleProgress: "{name} 손님 주문 진행 {filled}/{total}.",
      saleCompleted: "{name} 손님 주문을 처리했다. +{payout}코인.",
      saleSuccess: "{name} 손님이 {item}을 사고 {payout}코인을 냈다.",
      saleNoStock: "{name} 손님 주문 {wanted}을 처리할 재고가 없었다.",
      saleWrongItem: "{name} 손님이 찾던 건 {wanted}인데 {item}을 내줬다.",
      boughtItem: "{item} 재고를 {cost}코인 주고 채웠다.",
      nightPressure: "야간 압박 수치 {threat}. 단단히 준비해라.",
      laneBroken: "{lane}번 레인이 뚫렸다.",
      baseHit: "{lane}번 레인으로 기지가 타격받았다.",
      repairLane: "{lane}번 레인을 보강했다.",
      zombieDropped: "{lane}번 레인의 {type}을 처치했다.",
      zombieHit: "{lane}번 레인의 {type}을 맞혔다.",
      flash: "플래시 램프가 가게 앞을 훑었다.",
      upgradeInstalled: "{upgrade} 설치 완료.",
      dawnBreaks: "{day}일차 새벽이 밝았다.",
    },
  },
  en: {
    app: {
      title: "Deadstock Depot",
      language: "Language",
      languageOptions: {
        ko: "KOR",
        en: "ENG",
      },
    },
    shared: {
      seconds: "{value}s",
      locked: "Locked",
    },
    title: {
      eyebrow: "POST-COLLAPSE SHOPKEEPER",
      copy:
        "You are running a makeshift market out of a ruined roadside depot. Sell supplies by day to buy fuel and boards, then hold back whatever follows your lights at night. Relief arrives in six days.",
      loopTitle: "Core Loop",
      loopCopy: "Stock the shelves. Flip supplies for cash. Survive the night.",
      controlsTitle: "Controls",
      controlsCopyHtml:
        "<code>1-8</code> buy or sell items, <code>Q/W</code> switch defense tools, <code>E</code> flash lamp.",
      pressureTitle: "Pressure",
      pressureCopy: "Angry customers turn into harder nights. Sloppy sales cost blood.",
      signal1Eyebrow: "Final Stop",
      signal1Copy: "After the south checkpoint fell, this depot became the last supply stop on the road.",
      signal2Eyebrow: "Day Shift",
      signal2Copy: "Turn stock into cash and buy enough boards before sundown.",
      signal3Eyebrow: "Night Cost",
      signal3Copy: "Empty shelves and bad sales feed harder nights. Hold for six days and relief arrives.",
      start: "Start Shift",
      openBriefing: "View Briefing",
      note: "Designed as a compact browser adaptation, not a direct copy.",
    },
    hud: {
      day: "Day {day} / {max}",
      coins: "Coins",
      base: "Base",
      phaseTime: "Phase Time",
      nightPressure: "Night pressure",
      defenseEnergy: "Defense energy",
    },
    panels: {
      inventoryEyebrow: "Inventory",
      inventoryTitle: "Trade Rack",
      feedEyebrow: "Floor Feed",
      logEyebrow: "Recent Signals",
      logTitle: "Event Log",
      defenseEyebrow: "Defense",
      defenseTitle: "Night Tools",
      upgradesEyebrow: "Upgrades",
      upgradesTitle: "Installed",
    },
    keys: {
      title: "Quick Keys",
      space: "Space: advance stock or restart",
      qw: "Q/W: repair or attack mode",
      e: "E: flash lamp",
    },
    modals: {
      between: "BETWEEN NIGHTS",
      chooseUpgrade: "Choose one upgrade",
      skipUpgrade: "Skip and face dawn",
      restart: "Run it again",
    },
    briefing: {
      eyebrow: "Shift Briefing",
      title: "Prep before your light starts drawing them in",
      copy:
        "This depot is the last market on the ruined road. Sell supplies by day to buy fuel and boards, then hold off whatever follows your lights at night.",
      card1Tag: "Last Supply Stop",
      card1Copy: "After the south checkpoint fell, this depot became the last supply stop on the road.",
      card2Tag: "Day Rules",
      card2Copy: "Turn stock into cash by day, then reinforce the storefront before sundown.",
      card3Tag: "Night Cost",
      card3Copy: "Miss customers and the rumor spreads; by night, more bodies follow your light. Hold for six days.",
      start: "Start Shift",
      dismiss: "Maybe Later",
    },
    items: {
      buyButton: "Buy [{slot}]",
      sellButton: "Sell [{slot}]",
      buyShort: "Buy",
      sellShort: "Sell",
      buyPrice: "Buy {price}",
      sellPrice: "Sell {price}",
      buyMini: "B {price}",
      sellMini: "S {price}",
      unlockDay: "Unlocks Day {day}",
      stockCount: "{owned} / {cap}",
      availableCount: "{count} free",
    },
    sale: {
      empty: "Sales floor wakes up during the trade phase.",
      currentCustomer: "Current Customer",
      nextCustomer: "Next Customer",
      lineShuffling: "Line shuffling",
      nextCustomerCopy: "Hold steady. Another buyer is stepping up.",
      needs: "Needs {item}",
      patience: "Patience {time}",
      serveWindow: "Window to serve",
      progress: "Order {filled}/{total}",
      customerType: "Customer Type",
      orderRule: "Order Rule",
      failurePenalty: "Miss +{leave}, mistake +{mistake}",
      unlockCard: "Unlocked Today",
      noUnlocks: "No new items today",
      waitingIntel: "Order info appears when the next buyer steps up.",
      or: "or",
      daySales: "Day sales",
      dayRevenue: "Day revenue",
      missedCustomers: "Missed customers",
      nightForecast: "Night forecast",
      hostiles: "{count} hostiles",
      summaryCopy:
        "Clean matches keep the pressure low. Wrong items and empty shelves push more bodies toward the windows tonight.",
    },
    defense: {
      empty: "Night lanes appear during the defense phase.",
      lane: "Lane {number}",
      boardHp: "{current} / {max} board HP",
      incoming: "{count} incoming",
      repairButton: "Repair",
      attackButton: "Attack",
      cooling: "Cooling {time}",
      zombieChip: {
        runner: "RUN {hp}",
        walker: "WALK {hp}",
      },
      actions: {
        repair: {
          name: "Board Up",
          meta: "Click a lane window to restore board HP. Cost: 1 energy.",
        },
        attack: {
          name: "Scrap Shot",
          meta: "Click a zombie or lane to deal {damage} damage. Cost: 1 energy.",
        },
        flash: {
          name: "Flash Lamp",
          meta: "Stun every visible zombie for {duration}. Cost: 2 energy.",
        },
      },
    },
    upgrades: {
      none: "No upgrades installed yet. Survive a night to shop for one.",
      noneShort: "None yet",
      buy: "Buy for {cost}",
      summary:
        "Day {day} revenue: {revenue} coins. Night pressure peaked at {pressure}%. Buy one edge before dawn.",
    },
    results: {
      clearedTag: "RUN CLEARED",
      overTag: "RUN OVER",
      clearedTitle: "The depot held",
      overTitle: "The depot went dark",
      days: "Days",
      revenue: "Revenue",
      accuracy: "Accuracy",
      upgrades: "Upgrades",
      reason: {
        victory: "{nights} nights survived. The depot still burns light into the road.",
        collapse: "The front collapsed under the night rush.",
      },
    },
    feedback: {
      restock: "RESTOCK",
      sold: "SOLD",
      miss: "MISS",
      empty: "EMPTY",
      repair: "PATCHED",
      drop: "DROP",
      hit: "HIT",
      baseHit: "BASE HIT",
      blind: "BLIND",
      pressure: "PRESSURE",
      pressureDown: "STEADY",
      energySpend: "SPEND",
    },
    messages: {
      flavor: {
        title: "Board the windows before the line forms.",
        stock: "Morning prep. Spend coins on stock before the doors open.",
        stockOpening: "Radio: Board up first. The line will form any second.",
        sale: "Serve the right item fast. Angry customers feed the night.",
        defense:
          "Nightfall. Repair windows, shoot stragglers, and flash the lamp before the line breaks.",
      },
    },
    logs: {
      depotQuiet: "The depot is quiet. For now.",
      openingRadio: "Radio: Board up first. The line will form any second.",
      dayStart: "Shutters up. Day {day} begins.",
      shopOpen: "Shop is open. The line starts moving.",
      customerLeft: "{name} stormed out empty-handed.",
      saleProgress: "{name}'s order is now {filled}/{total}.",
      saleCompleted: "{name}'s order cleared. +{payout} coins.",
      saleSuccess: "{name} paid {payout} coins for {item}.",
      saleNoStock: "Shelf miss. Not enough stock left to finish {wanted} for {name}.",
      saleWrongItem: "{name} wanted {wanted}, not {item}.",
      boughtItem: "Bought {item} for {cost} coins.",
      nightPressure: "Night pressure set to {threat}. Brace for impact.",
      laneBroken: "Lane {lane} just broke open.",
      baseHit: "Base hit in lane {lane}.",
      repairLane: "Reinforced lane {lane}.",
      zombieDropped: "Dropped a {type} in lane {lane}.",
      zombieHit: "Hit a {type} in lane {lane}.",
      flash: "Flash lamp burst across the storefront.",
      upgradeInstalled: "Installed {upgrade}.",
      dawnBreaks: "Dawn breaks on Day {day}.",
    },
  },
};

const refs = {
  titleScreen: document.querySelector("#title-screen"),
  gameScreen: document.querySelector("#game-screen"),
  startRun: document.querySelector("#start-run"),
  openBriefing: document.querySelector("#open-briefing"),
  restartRun: document.querySelector("#restart-run"),
  skipUpgrade: document.querySelector("#skip-upgrade"),
  briefingModal: document.querySelector("#briefing-modal"),
  briefingStart: document.querySelector("#briefing-start"),
  briefingDismiss: document.querySelector("#briefing-dismiss"),
  phaseAdvance: document.querySelector("#phase-advance"),
  dayPill: document.querySelector("#day-pill"),
  phasePill: document.querySelector("#phase-pill"),
  coinChip: document.querySelector("#coin-chip"),
  baseChip: document.querySelector("#base-chip"),
  complaintBlock: document.querySelector("#complaint-block"),
  energyBlock: document.querySelector("#energy-block"),
  coinCount: document.querySelector("#coin-count"),
  baseCount: document.querySelector("#base-count"),
  coinBurst: document.querySelector("#coin-burst"),
  baseBurst: document.querySelector("#base-burst"),
  phaseTimer: document.querySelector("#phase-timer"),
  phaseTitle: document.querySelector("#phase-title"),
  complaintValue: document.querySelector("#complaint-value"),
  complaintFill: document.querySelector("#complaint-fill"),
  complaintBurst: document.querySelector("#complaint-burst"),
  energyValue: document.querySelector("#energy-value"),
  energyFill: document.querySelector("#energy-fill"),
  energyBurst: document.querySelector("#energy-burst"),
  flavorText: document.querySelector("#flavor-text"),
  itemList: document.querySelector("#item-list"),
  stageView: document.querySelector("#stage-view"),
  eventLog: document.querySelector("#event-log"),
  actionList: document.querySelector("#action-list"),
  upgradeList: document.querySelector("#upgrade-list"),
  upgradeModal: document.querySelector("#upgrade-modal"),
  upgradeSummary: document.querySelector("#upgrade-summary"),
  upgradeOptions: document.querySelector("#upgrade-options"),
  resultModal: document.querySelector("#result-modal"),
  resultTag: document.querySelector("#result-tag"),
  resultTitle: document.querySelector("#result-title"),
  resultCopy: document.querySelector("#result-copy"),
  resultStats: document.querySelector("#result-stats"),
};

const DEFAULT_LANGUAGE = detectPreferredLanguage();

let state = createInitialState(DEFAULT_LANGUAGE);
let animationFrameId = 0;
let lastFrameTime = 0;
let renderedLanguage = "";

function createInitialState(language = DEFAULT_LANGUAGE) {
  const briefingSeen = readBriefingSeen();
  return {
    language,
    phase: "title",
    showBriefing: !briefingSeen,
    briefingSeen,
    day: 1,
    coins: 22,
    baseHealth: 12,
    inventory: Object.fromEntries(ITEM_DEFS.map((item) => [item.id, 0])),
    inventoryCap: 5,
    complaint: 0,
    complaintPeak: 0,
    activeCustomer: null,
    customerGap: 0,
    phaseTimeLeft: 0,
    flavor: message("messages.flavor.title"),
    log: [message("logs.depotQuiet")],
    feedback: createFeedbackState(),
    totalRevenue: 0,
    totalSales: 0,
    totalCustomers: 0,
    missedCustomers: 0,
    dayRevenue: 0,
    daySales: 0,
    dayMissed: 0,
    dayThreat: 0,
    zombies: [],
    windows: [],
    spawnedThisNight: 0,
    spawnTimer: 0,
    actionEnergy: 0,
    maxEnergy: 3.5,
    energyRegenRate: 0.85,
    currentAction: "repair",
    attackDamage: 2,
    attackCooldown: 0,
    attackCooldownBase: 0.54,
    stunCooldown: 0,
    stunDuration: 1.8,
    repairPower: 4,
    maxWindowHp: 9,
    tipBonus: 0,
    upgradesOwned: [],
    pendingUpgradeChoices: [],
    nightConfig: null,
    result: null,
    customerCounter: 0,
    zombieCounter: 0,
    running: false,
  };
}

function createFeedbackState() {
  return {
    items: {},
    sale: { kind: "", label: "", until: 0, requestUntil: 0 },
    lanes: Array.from({ length: 3 }, () => ({ kind: "", label: "", until: 0 })),
    zombies: {},
    hud: {
      coins: { kind: "", label: "", until: 0 },
      base: { kind: "", label: "", until: 0 },
      complaint: { kind: "", label: "", until: 0 },
      energy: { kind: "", label: "", until: 0 },
    },
    screen: {
      lampUntil: 0,
      damageUntil: 0,
      shakeUntil: 0,
    },
  };
}

function message(key, params = {}) {
  return { key, params };
}

function getUnlockedItems(day = state.day) {
  return ITEM_DEFS.filter((item) => item.unlockDay <= day);
}

function getNewlyUnlockedItems(day = state.day) {
  return ITEM_DEFS.filter((item) => item.unlockDay === day);
}

function isItemUnlocked(itemOrId, day = state.day) {
  const item =
    typeof itemOrId === "string" ? findItem(itemOrId) : itemOrId;
  return Boolean(item && item.unlockDay <= day);
}

function getDemandWeight(item, day = state.day) {
  return item?.demandByDay?.[day - 1] ?? item?.demand ?? 0;
}

function getCustomerType(id) {
  return CUSTOMER_TYPES[id];
}

function getOrderRule(id) {
  return ORDER_RULES[id];
}

function getCustomerTypeWeight(type, day = state.day) {
  return type?.weightByDay?.[day - 1] ?? 0;
}

function getOrderRuleWeight(rule, day = state.day) {
  return rule?.weightByDay?.[day - 1] ?? 0;
}

function getCustomerTypesForDay(day = state.day) {
  return Object.values(CUSTOMER_TYPES).filter(
    (type) => type.unlockDay <= day && getCustomerTypeWeight(type, day) > 0
  );
}

function getOrderRulesForCustomer(day, customerType) {
  return customerType.allowedRules
    .map((id) => getOrderRule(id))
    .filter((rule) => rule && rule.unlockDay <= day && getOrderRuleWeight(rule, day) > 0);
}

function pickCustomerType(day = state.day) {
  return weightedPick(getCustomerTypesForDay(day), (type) => getCustomerTypeWeight(type, day));
}

function pickOrderRule(day, customerType) {
  return weightedPick(
    getOrderRulesForCustomer(day, customerType),
    (rule) => getOrderRuleWeight(rule, day)
  );
}

function makeOrderSlot(acceptedItemIds, mode = "exact") {
  return {
    acceptedItemIds: [...acceptedItemIds],
    mode,
    fulfilledBy: null,
  };
}

function pickOrderPair(options, day) {
  const unlockedPairs = options.filter(([first, second]) =>
    isItemUnlocked(first, day) && isItemUnlocked(second, day)
  );

  if (unlockedPairs.length === 0) {
    return null;
  }

  return weightedPick(unlockedPairs, ([first, second]) => {
    const firstItem = findItem(first);
    const secondItem = findItem(second);
    return getDemandWeight(firstItem, day) + getDemandWeight(secondItem, day);
  });
}

function buildCustomerOrder(day, customerType, rule) {
  const unlockedItems = getUnlockedItems(day);
  const pickItem = (items) =>
    weightedPick(items.length > 0 ? items : unlockedItems, (item) => getDemandWeight(item, day));
  const pickTaggedItem = (tags) =>
    pickItem(unlockedItems.filter((item) => item.tags.some((tag) => tags.includes(tag))));

  if (rule.id === "single_exact") {
    const item = pickItem(unlockedItems);
    return [makeOrderSlot([item.id])];
  }

  if (rule.id === "double_exact") {
    const item = pickItem(unlockedItems.filter((entry) => entry.rarity !== "rare"));
    return [makeOrderSlot([item.id]), makeOrderSlot([item.id])];
  }

  if (rule.id === "either_or") {
    const pair = pickOrderPair(EITHER_OR_PAIRS, day);
    if (pair) {
      return [makeOrderSlot(pair, "choice")];
    }

    const fallback = pickItem(unlockedItems);
    return [makeOrderSlot([fallback.id])];
  }

  if (rule.id === "bundle_two") {
    const pair = pickOrderPair(BUNDLE_PAIRS, day);
    if (pair) {
      return [makeOrderSlot([pair[0]]), makeOrderSlot([pair[1]])];
    }

    const fallback = shuffle(unlockedItems).slice(0, 2);
    return fallback.map((item) => makeOrderSlot([item.id]));
  }

  if (rule.id === "prep_run") {
    const prepItems = unlockedItems.filter((item) =>
      item.tags.some((tag) => ["defense", "survival", "power"].includes(tag))
    );
    const prepPick = prepItems.length > 0 ? prepItems : unlockedItems;
    const prepPair = pickOrderPair(
      EITHER_OR_PAIRS.filter(([first, second]) => {
        const firstItem = findItem(first);
        const secondItem = findItem(second);
        return (
          firstItem?.tags.some((tag) => ["defense", "survival", "power"].includes(tag)) ||
          secondItem?.tags.some((tag) => ["defense", "survival", "power"].includes(tag))
        );
      }),
      day
    );

    if (prepPair && Math.random() < 0.4) {
      return [makeOrderSlot(prepPair, "choice")];
    }

    const item = pickTaggedItem(["defense", "survival", "power"]) ?? pickItem(prepPick);
    return [makeOrderSlot([item.id])];
  }

  const fallback = pickItem(unlockedItems);
  return [makeOrderSlot([fallback.id])];
}

function getReservedCount(customer, itemId) {
  if (!customer) {
    return 0;
  }

  return customer.orderSlots.filter((slot) => slot.fulfilledBy === itemId).length;
}

function getAvailableInventoryCount(itemId, customer = state.activeCustomer) {
  return Math.max(0, (state.inventory[itemId] ?? 0) - getReservedCount(customer, itemId));
}

function getOrderProgress(customer) {
  const filled = customer ? customer.orderSlots.filter((slot) => Boolean(slot.fulfilledBy)).length : 0;
  const total = customer?.orderSlots.length ?? 0;
  return { filled, total };
}

function getNextMatchingSlotIndex(customer, itemId) {
  if (!customer) {
    return -1;
  }

  return customer.orderSlots.findIndex(
    (slot) => !slot.fulfilledBy && slot.acceptedItemIds.includes(itemId)
  );
}

function getCustomerTypeText(typeId, field) {
  return translateValue(getCustomerType(typeId)?.[field]);
}

function getOrderRuleText(ruleId, field) {
  return translateValue(getOrderRule(ruleId)?.[field]);
}

function getOrderSlotLabel(slot, field = "name") {
  if (!slot) {
    return "";
  }

  if (slot.acceptedItemIds.length === 1) {
    return getItemText(findItem(slot.acceptedItemIds[0]), field);
  }

  return slot.acceptedItemIds
    .map((itemId) => getItemText(findItem(itemId), field))
    .join(` ${t("sale.or")} `);
}

function getCustomerOrderLabel(customer, field = "short") {
  if (!customer) {
    return "";
  }

  return customer.orderSlots.map((slot) => getOrderSlotLabel(slot, field)).join(" + ");
}

function createEffect(kind, label, duration = 320) {
  const startedAt = nowMs();
  return {
    kind,
    label,
    startedAt,
    duration,
    until: startedAt + duration,
  };
}

function nowMs() {
  if (typeof performance !== "undefined" && typeof performance.now === "function") {
    return performance.now();
  }

  return Date.now();
}

function isEffectActive(entry) {
  return Boolean(entry && entry.until > nowMs());
}

function getEffectProgress(entry) {
  if (!entry) {
    return 0;
  }

  const startedAt = entry.startedAt ?? nowMs();
  const duration = entry.duration ?? Math.max(1, entry.until - startedAt);
  return clamp((nowMs() - startedAt) / duration, 0, 1);
}

function getEffectMotionStyle(entry, { x = "-50%", startY = 8, endY = -14 } = {}) {
  if (!isEffectActive(entry)) {
    return "";
  }

  const progress = getEffectProgress(entry);
  const eased = 1 - (1 - progress) * (1 - progress);
  const fadeIn = Math.min(1, progress / 0.18);
  const fadeOut = Math.max(0, 1 - Math.max(0, progress - 0.18) / 0.82);
  const opacity = Math.min(fadeIn, fadeOut);
  const y = startY + (endY - startY) * eased;
  return `opacity: ${opacity.toFixed(3)}; transform: translate(${x}, ${y.toFixed(1)}px);`;
}

function getZombieChipStyle(effect, left) {
  let opacity = 1;
  let scale = 1;
  let brightness = 1;
  let shadow = "none";

  if (isEffectActive(effect)) {
    const progress = getEffectProgress(effect);
    if (effect.kind === "hit") {
      const pulse = Math.sin(progress * Math.PI);
      scale = 1 + pulse * 0.12;
      brightness = 1 + pulse * 0.4;
      shadow = `0 0 ${(0.55 + pulse * 0.55).toFixed(2)}rem rgba(242, 159, 62, ${(0.12 + pulse * 0.2).toFixed(3)})`;
    } else if (effect.kind === "kill") {
      opacity = Math.max(0, 1 - progress);
      scale = 1 - progress * 0.28;
      shadow = `0 0 0.8rem rgba(136, 194, 124, ${(0.28 * (1 - progress)).toFixed(3)})`;
    }
  }

  return [
    `left: ${left}%`,
    `opacity: ${opacity.toFixed(3)}`,
    `transform: translateX(-50%) scale(${scale.toFixed(3)})`,
    `filter: brightness(${brightness.toFixed(3)})`,
    `box-shadow: ${shadow}`,
  ].join("; ");
}

function setItemFeedback(itemId, kind, label, duration = 320) {
  state.feedback.items[itemId] = createEffect(kind, label, duration);
}

function setSaleFeedback(kind, label, duration = 340, requestDuration = duration) {
  state.feedback.sale = {
    kind,
    label,
    until: nowMs() + duration,
    requestUntil: nowMs() + requestDuration,
  };
}

function setLaneFeedback(index, kind, label, duration = 340) {
  if (!state.feedback.lanes[index]) {
    return;
  }

  state.feedback.lanes[index] = createEffect(kind, label, duration);
}

function setZombieFeedback(id, kind, label, duration = 220) {
  state.feedback.zombies[id] = createEffect(kind, label, duration);
}

function setHudFeedback(target, kind, label, duration = 320) {
  if (!state.feedback.hud[target]) {
    return;
  }

  state.feedback.hud[target] = createEffect(kind, label, duration);
}

function setScreenFeedback({ lamp = 0, damage = 0, shake = 0 } = {}) {
  const current = nowMs();
  if (lamp > 0) {
    state.feedback.screen.lampUntil = current + lamp;
  }
  if (damage > 0) {
    state.feedback.screen.damageUntil = current + damage;
  }
  if (shake > 0) {
    state.feedback.screen.shakeUntil = current + shake;
  }
}

function pruneFeedback() {
  for (const [itemId, effect] of Object.entries(state.feedback.items)) {
    if (!isEffectActive(effect)) {
      delete state.feedback.items[itemId];
    }
  }

  for (const [zombieId, effect] of Object.entries(state.feedback.zombies)) {
    if (!isEffectActive(effect)) {
      delete state.feedback.zombies[zombieId];
    }
  }

  state.feedback.lanes = state.feedback.lanes.map((effect) =>
    isEffectActive(effect) ? effect : { kind: "", label: "", until: 0 }
  );

  for (const key of Object.keys(state.feedback.hud)) {
    if (!isEffectActive(state.feedback.hud[key])) {
      state.feedback.hud[key] = { kind: "", label: "", until: 0 };
    }
  }

  if (!isEffectActive(state.feedback.sale)) {
    state.feedback.sale = { kind: "", label: "", until: 0, requestUntil: 0 };
  }
}

function getHudEffect(target) {
  return isEffectActive(state.feedback.hud[target]) ? state.feedback.hud[target] : null;
}

function getItemEffect(itemId) {
  return isEffectActive(state.feedback.items[itemId]) ? state.feedback.items[itemId] : null;
}

function getLaneEffect(index) {
  return isEffectActive(state.feedback.lanes[index]) ? state.feedback.lanes[index] : null;
}

function getZombieEffect(id) {
  return isEffectActive(state.feedback.zombies[id]) ? state.feedback.zombies[id] : null;
}

function isRequestEffectActive() {
  return state.feedback.sale.requestUntil > nowMs();
}

function openBriefing() {
  if (state.phase !== "title") {
    return;
  }

  state.showBriefing = true;
  render();
}

function dismissBriefing() {
  if (state.phase !== "title") {
    return;
  }

  state.showBriefing = false;
  state.briefingSeen = true;
  storeBriefingSeen(true);
  render();
}

function startRunFromBriefing() {
  state.briefingSeen = true;
  state.showBriefing = false;
  storeBriefingSeen(true);
  startRun();
}

function startRun() {
  const language = state.language;
  state = createInitialState(language);
  state.running = true;
  state.showBriefing = false;
  refs.titleScreen.classList.add("hidden");
  refs.gameScreen.classList.remove("hidden");
  refs.briefingModal.classList.add("hidden");
  refs.upgradeModal.classList.add("hidden");
  refs.resultModal.classList.add("hidden");
  refs.briefingModal.setAttribute("aria-hidden", "true");
  refs.upgradeModal.setAttribute("aria-hidden", "true");
  refs.resultModal.setAttribute("aria-hidden", "true");
  beginDay(1);
  pushLog("logs.dayStart", { day: 1 });
  render();
}

function beginDay(day) {
  state.day = day;
  state.dayRevenue = 0;
  state.daySales = 0;
  state.dayMissed = 0;
  state.complaint = 0;
  state.complaintPeak = 0;
  state.dayThreat = 0;
  state.activeCustomer = null;
  state.customerGap = 0;
  state.zombies = [];
  state.windows = [];
  state.nightConfig = null;
  enterStockPhase();
}

function enterStockPhase() {
  const config = DAY_CONFIG[state.day];
  state.phase = "stock";
  state.phaseTimeLeft = config.stockDuration;
  if (state.day === 1) {
    setFlavor("messages.flavor.stockOpening");
    pushLog("logs.openingRadio");
  } else {
    setFlavor("messages.flavor.stock");
  }
}

function enterSalePhase() {
  const config = DAY_CONFIG[state.day];
  state.phase = "sale";
  state.phaseTimeLeft = config.saleDuration;
  state.activeCustomer = null;
  state.customerGap = 0.2;
  setFlavor("messages.flavor.sale");
  pushLog("logs.shopOpen");
}

function enterDefensePhase() {
  state.phase = "defense";
  state.phaseTimeLeft = DAY_CONFIG[state.day].defenseDuration;
  state.dayThreat = computeThreatValue();
  state.nightConfig = buildNightConfig(state.dayThreat);
  state.spawnedThisNight = 0;
  state.spawnTimer = 0.35;
  state.zombies = [];
  state.windows = Array.from({ length: 3 }, (_, index) => ({
    id: index,
    hp: state.maxWindowHp,
    maxHp: state.maxWindowHp,
  }));
  state.actionEnergy = state.maxEnergy;
  state.attackCooldown = 0;
  state.stunCooldown = 0;
  state.currentAction = "repair";
  setFlavor("messages.flavor.defense");
  pushLog("logs.nightPressure", { threat: state.dayThreat });
}

function computeThreatValue() {
  const config = DAY_CONFIG[state.day];
  return config.nightQuota + Math.floor(state.complaint / 25) * 2;
}

function buildNightConfig(threatValue) {
  const config = DAY_CONFIG[state.day];
  const extraPressure = Math.max(0, threatValue - config.nightQuota);
  return {
    quota: threatValue,
    speed: config.nightSpeed + extraPressure * 0.005,
    runnerChance: Math.min(0.65, config.runnerChance + extraPressure * 0.015),
    spawnInterval: Math.max(0.55, config.spawnInterval - extraPressure * 0.03),
  };
}

function setFlavor(key, params = {}) {
  state.flavor = message(key, params);
}

function pushLog(key, params = {}) {
  state.log.unshift(message(key, params));
  state.log = state.log.slice(0, 6);
}

function adjustComplaint(amount) {
  state.complaint = clamp(state.complaint + amount, 0, 100);
  state.complaintPeak = Math.max(state.complaintPeak, state.complaint);
}

function updatePhase(dt) {
  if (!state.running) {
    return;
  }

  if (state.phase === "upgrade" || state.phase === "result" || state.phase === "title") {
    return;
  }

  state.phaseTimeLeft = Math.max(0, state.phaseTimeLeft - dt);

  if (state.phase === "sale") {
    updateSalePhase(dt);
  } else if (state.phase === "defense") {
    updateDefensePhase(dt);
  }

  if (state.phaseTimeLeft > 0) {
    return;
  }

  if (state.phase === "stock") {
    enterSalePhase();
  } else if (state.phase === "sale") {
    enterDefensePhase();
  } else if (state.phase === "defense") {
    finishNight();
  }
}

function updateSalePhase(dt) {
  if (!state.activeCustomer) {
    state.customerGap -= dt;
    if (state.customerGap <= 0) {
      state.activeCustomer = makeCustomer();
    }
    return;
  }

  state.activeCustomer.patience = Math.max(0, state.activeCustomer.patience - dt);
  if (state.activeCustomer.patience === 0) {
    const current = state.activeCustomer;
    const complaintSpike = current.complaintOnLeave ?? 6;
    state.activeCustomer = null;
    state.customerGap = DAY_CONFIG[state.day].spawnGap;
    state.totalCustomers += 1;
    state.missedCustomers += 1;
    state.dayMissed += 1;
    adjustComplaint(complaintSpike);
    setSaleFeedback("bad", t("feedback.miss"), 360, 360);
    setHudFeedback("complaint", "danger", `+${complaintSpike}`, 360);
    pushLog("logs.customerLeft", { name: customerToken(current.nameId) });
  }
}

function finishSaleAttempt() {
  state.activeCustomer = null;
  state.customerGap = DAY_CONFIG[state.day].spawnGap;
}

function completeCustomerSale(customer, item) {
  const speedBonus = Math.ceil((customer.patience / customer.maxPatience) * 3);
  const subtotal = customer.orderSlots.reduce(
    (sum, slot) => sum + findItem(slot.fulfilledBy)?.sell,
    0
  );
  const payout = subtotal + speedBonus + state.tipBonus + customer.completionTipBonus;

  customer.orderSlots.forEach((slot) => {
    state.inventory[slot.fulfilledBy] -= 1;
  });

  state.coins += payout;
  state.totalRevenue += payout;
  state.dayRevenue += payout;
  state.totalSales += 1;
  state.daySales += 1;
  state.totalCustomers += 1;
  adjustComplaint(-4);
  setItemFeedback(item.id, "sale-hit", `+${payout}`, 360);
  setSaleFeedback("good", `+${payout}`, 360, 120);
  setHudFeedback("coins", "gain", `+${payout}`, 360);
  setHudFeedback("complaint", "cool", "-4", 320);
  pushLog("logs.saleCompleted", {
    name: customerToken(customer.nameId),
    payout,
  });
  finishSaleAttempt();
}

function failCustomerSale(customer, item, reason) {
  const complaintSpike = customer.complaintOnMistake ?? 5;
  state.totalCustomers += 1;
  state.missedCustomers += 1;
  state.dayMissed += 1;
  adjustComplaint(complaintSpike);

  if (reason === "empty") {
    setItemFeedback(item.id, "deny", t("feedback.empty"), 360);
    setSaleFeedback("bad", t("feedback.empty"), 360, 360);
    setHudFeedback("complaint", "danger", `+${complaintSpike}`, 360);
    pushLog("logs.saleNoStock", {
      name: customerToken(customer.nameId),
      wanted: getCustomerOrderLabel(customer, "short"),
    });
  } else {
    setItemFeedback(item.id, "deny", t("feedback.miss"), 360);
    setSaleFeedback("bad", t("feedback.miss"), 360, 360);
    setHudFeedback("complaint", "danger", `+${complaintSpike}`, 360);
    pushLog("logs.saleWrongItem", {
      name: customerToken(customer.nameId),
      wanted: getCustomerOrderLabel(customer, "short"),
      item: itemToken(item.id, "short"),
    });
  }

  finishSaleAttempt();
}

function makeCustomer() {
  const config = DAY_CONFIG[state.day];
  const customerType = pickCustomerType(state.day) ?? CUSTOMER_TYPES.standard;
  const orderRule = pickOrderRule(state.day, customerType) ?? ORDER_RULES.single_exact;
  const orderSlots = buildCustomerOrder(state.day, customerType, orderRule);
  const patienceBase = config.customerPatience * customerType.patienceScale;
  const patience = clamp(
    patienceBase + randomFloat(-0.75, 0.95),
    Math.max(2.8, patienceBase - 1.1),
    patienceBase + 1.15
  );
  const pressureProfile = randomFloat(0.82, 1.2);
  state.customerCounter += 1;
  return {
    id: state.customerCounter,
    nameId: Math.floor(Math.random() * CUSTOMER_NAMES.ko.length),
    typeId: customerType.id,
    ruleId: orderRule.id,
    request: orderSlots[0]?.acceptedItemIds[0],
    orderSlots,
    patience,
    maxPatience: patience,
    complaintOnLeave: Math.max(
      4,
      Math.round(6 * pressureProfile) + customerType.leavePenalty + (orderRule.leavePenalty ?? 0)
    ),
    complaintOnMistake: Math.max(
      3,
      Math.round(5 * pressureProfile) + customerType.mistakePenalty
    ),
    completionTipBonus: customerType.tipBonus + (orderRule.completionTipBonus ?? 0),
  };
}

function sellItem(itemId) {
  if (state.phase !== "sale" || !state.activeCustomer) {
    return;
  }

  const item = findItem(itemId);
  if (!item) {
    return;
  }

  if (!isItemUnlocked(item)) {
    return;
  }

  const customer = state.activeCustomer;
  const matchingSlotIndex = getNextMatchingSlotIndex(customer, itemId);
  const availableCount = getAvailableInventoryCount(itemId, customer);

  if (matchingSlotIndex === -1) {
    failCustomerSale(customer, item, "wrong");
    return;
  }

  if (availableCount <= 0) {
    failCustomerSale(customer, item, "empty");
    return;
  }

  customer.orderSlots[matchingSlotIndex].fulfilledBy = itemId;
  const progress = getOrderProgress(customer);

  if (progress.filled < progress.total) {
    setItemFeedback(item.id, "sale-hit", `${progress.filled}/${progress.total}`, 320);
    setSaleFeedback("good", t("sale.progress", progress), 340, 120);
    pushLog("logs.saleProgress", {
      name: customerToken(customer.nameId),
      filled: progress.filled,
      total: progress.total,
    });
    return;
  }

  completeCustomerSale(customer, item);
}

function buyItem(itemId) {
  if (state.phase !== "stock") {
    return;
  }

  const item = findItem(itemId);
  if (!item || !isItemUnlocked(item)) {
    return;
  }

  if (state.inventory[itemId] >= state.inventoryCap || state.coins < item.buy) {
    return;
  }

  state.inventory[itemId] += 1;
  state.coins -= item.buy;
  setItemFeedback(item.id, "buy-hit", `-${item.buy}`, 320);
  setHudFeedback("coins", "loss", `-${item.buy}`, 320);
  pushLog("logs.boughtItem", {
    item: itemToken(item.id, "short"),
    cost: item.buy,
  });
}

function updateDefensePhase(dt) {
  state.actionEnergy = clamp(state.actionEnergy + dt * state.energyRegenRate, 0, state.maxEnergy);
  state.attackCooldown = Math.max(0, state.attackCooldown - dt);
  state.stunCooldown = Math.max(0, state.stunCooldown - dt);

  if (state.spawnedThisNight < state.nightConfig.quota) {
    state.spawnTimer -= dt;
    if (state.spawnTimer <= 0) {
      spawnZombie();
      state.spawnTimer =
        state.nightConfig.spawnInterval * randomFloat(0.75, 1.15);
    }
  }

  state.zombies.forEach((zombie) => {
    if (zombie.stunned > 0) {
      zombie.stunned = Math.max(0, zombie.stunned - dt);
      return;
    }

    zombie.progress = clamp(zombie.progress + zombie.speed * dt, 0, 1);
    if (zombie.progress < 1) {
      return;
    }

    zombie.attackTimer -= dt;
    if (zombie.attackTimer > 0) {
      return;
    }

    const targetWindow = state.windows[zombie.lane];
    if (!targetWindow) {
      return;
    }

    zombie.attackTimer = zombie.type === "runner" ? 0.8 : 1.15;
    if (targetWindow.hp > 0) {
      targetWindow.hp = Math.max(0, targetWindow.hp - zombie.damage);
      setLaneFeedback(zombie.lane, "impact", `-${zombie.damage}`, 320);
      if (targetWindow.hp === 0) {
        setLaneFeedback(zombie.lane, "impact", t("feedback.hit"), 380);
        pushLog("logs.laneBroken", { lane: zombie.lane + 1 });
      }
    } else {
      state.baseHealth = Math.max(0, state.baseHealth - zombie.damage);
      setLaneFeedback(zombie.lane, "impact", t("feedback.baseHit"), 380);
      setHudFeedback("base", "danger", `-${zombie.damage}`, 360);
      setScreenFeedback({ damage: 320, shake: 240 });
      pushLog("logs.baseHit", { lane: zombie.lane + 1 });
    }
  });

  if (state.baseHealth <= 0 || state.windows.every((windowState) => windowState.hp <= 0)) {
    finishRun(false, "results.reason.collapse");
  }
}

function spawnZombie() {
  const isRunner = Math.random() < state.nightConfig.runnerChance;
  const lane = Math.floor(Math.random() * 3);
  const zombieStats = getZombieStats(state.day, isRunner ? "runner" : "walker");
  state.zombieCounter += 1;
  state.spawnedThisNight += 1;
  state.zombies.push({
    id: state.zombieCounter,
    lane,
    type: isRunner ? "runner" : "walker",
    hp: zombieStats.hp,
    speed: state.nightConfig.speed + (isRunner ? 0.08 : 0),
    damage: zombieStats.damage,
    progress: 0,
    attackTimer: isRunner ? 0.8 : 1.1,
    stunned: 0,
  });
}

function getZombieStats(day, type) {
  if (type === "runner") {
    if (day >= 5) {
      return { hp: 3, damage: 2 };
    }

    return { hp: 2, damage: 1 };
  }

  if (day >= 5) {
    return { hp: 5, damage: 3 };
  }

  return { hp: 3, damage: 2 };
}

function finishNight() {
  if (state.day >= MAX_DAY) {
    finishRun(true, "results.reason.victory");
    return;
  }

  state.phase = "upgrade";
  state.pendingUpgradeChoices = pickUpgradeChoices();
  refs.upgradeModal.classList.remove("hidden");
  refs.upgradeModal.setAttribute("aria-hidden", "false");
}

function pickUpgradeChoices() {
  const available = UPGRADE_DEFS.filter(
    (upgrade) => !state.upgradesOwned.includes(upgrade.id)
  );
  return shuffle(available).slice(0, 3);
}

function applyUpgrade(upgradeId) {
  const upgrade = findUpgrade(upgradeId);
  if (!upgrade || state.upgradesOwned.includes(upgrade.id) || state.coins < upgrade.cost) {
    return;
  }

  state.coins -= upgrade.cost;
  state.upgradesOwned.push(upgrade.id);
  upgrade.apply(state);
  pushLog("logs.upgradeInstalled", {
    upgrade: upgradeToken(upgrade.id),
  });
  continueAfterUpgrade();
}

function continueAfterUpgrade() {
  refs.upgradeModal.classList.add("hidden");
  refs.upgradeModal.setAttribute("aria-hidden", "true");
  beginDay(state.day + 1);
  pushLog("logs.dawnBreaks", { day: state.day });
}

function finishRun(victory, reasonKey) {
  state.running = false;
  state.phase = "result";
  state.result = {
    victory,
    reason: message(reasonKey, { nights: MAX_DAY }),
    accuracy:
      state.totalCustomers > 0
        ? Math.round((state.totalSales / state.totalCustomers) * 100)
        : 0,
  };

  refs.resultModal.classList.remove("hidden");
  refs.resultModal.setAttribute("aria-hidden", "false");
}

function useDefenseAction(targetType, targetId) {
  if (state.phase !== "defense") {
    return;
  }

  if (targetType === "window" && state.currentAction === "repair") {
    repairWindow(Number(targetId));
  } else if (targetType === "lane" && state.currentAction === "repair") {
    repairWindow(Number(targetId));
  } else if (targetType === "zombie" && state.currentAction === "attack") {
    attackZombie(Number(targetId));
  } else if (targetType === "lane" && state.currentAction === "attack") {
    attackLane(Number(targetId));
  }
}

function repairWindow(index) {
  const windowState = state.windows[index];
  if (!windowState || state.actionEnergy < 1) {
    return;
  }

  windowState.hp = clamp(windowState.hp + state.repairPower, 0, windowState.maxHp);
  state.actionEnergy -= 1;
  setLaneFeedback(index, "repair", `+${state.repairPower}`, 320);
  setHudFeedback("energy", "loss", "-1", 260);
  pushLog("logs.repairLane", { lane: index + 1 });
}

function attackZombie(id) {
  if (state.actionEnergy < 1 || state.attackCooldown > 0) {
    return;
  }

  const zombie = state.zombies.find((entry) => entry.id === id);
  if (!zombie) {
    return;
  }

  const damage = Math.min(state.attackDamage, zombie.hp);
  zombie.hp -= state.attackDamage;
  state.actionEnergy -= 1;
  state.attackCooldown = state.attackCooldownBase;
  setZombieFeedback(id, zombie.hp <= 0 ? "kill" : "hit", `-${damage}`, 260);
  setHudFeedback("energy", "loss", "-1", 260);
  if (zombie.hp <= 0) {
    state.zombies = state.zombies.filter((entry) => entry.id !== id);
    setLaneFeedback(zombie.lane, "kill", t("feedback.drop"), 320);
    pushLog("logs.zombieDropped", {
      lane: zombie.lane + 1,
      type: zombieToken(zombie.type),
    });
  } else {
    setLaneFeedback(zombie.lane, "attack", `-${damage}`, 260);
    pushLog("logs.zombieHit", {
      lane: zombie.lane + 1,
      type: zombieToken(zombie.type),
    });
  }
}

function attackLane(laneIndex) {
  const targetZombie = state.zombies
    .filter((entry) => entry.lane === laneIndex)
    .sort((left, right) => right.progress - left.progress || left.hp - right.hp)[0];

  if (!targetZombie) {
    return;
  }

  attackZombie(targetZombie.id);
}

function flashLamp() {
  if (state.phase !== "defense" || state.actionEnergy < 2 || state.stunCooldown > 0) {
    return;
  }

  state.actionEnergy -= 2;
  state.stunCooldown = 6;
  state.zombies.forEach((zombie) => {
    zombie.stunned = state.stunDuration;
  });
  state.feedback.lanes = state.feedback.lanes.map(() =>
    createEffect("flash", t("feedback.blind"), 280)
  );
  setHudFeedback("energy", "loss", "-2", 260);
  setScreenFeedback({ lamp: 280 });
  pushLog("logs.flash");
}

function handleActionSelection(actionId) {
  if (actionId === "flash") {
    flashLamp();
    return;
  }

  state.currentAction = actionId;
}

function handleAdvancePhase() {
  if (state.phase === "stock") {
    enterSalePhase();
  }
}

function findItem(itemId) {
  return ITEM_DEFS.find((item) => item.id === itemId);
}

function findUpgrade(upgradeId) {
  return UPGRADE_DEFS.find((upgrade) => upgrade.id === upgradeId);
}

function frame(timestamp) {
  const dt = Math.min((timestamp - lastFrameTime) / 1000, 0.1) || 0;
  lastFrameTime = timestamp;
  updatePhase(dt);
  render();
  animationFrameId = window.requestAnimationFrame(frame);
}

function render() {
  pruneFeedback();
  if (renderedLanguage !== state.language) {
    renderStaticCopy();
    renderedLanguage = state.language;
  }

  renderHud();
  renderItems();
  renderStageView();
  renderActions();
  renderUpgrades();
  renderLog();
  renderBriefingModal();
  renderUpgradeModal();
  renderResult();
}

function renderStaticCopy() {
  document.documentElement.lang = state.language;
  document.title = t("app.title");

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-html]").forEach((node) => {
    node.innerHTML = t(node.dataset.i18nHtml);
  });

  document.querySelectorAll("[data-language-label]").forEach((node) => {
    node.textContent = t(`app.languageOptions.${node.dataset.languageLabel}`);
  });

  document.querySelectorAll(".locale-switch[role='group']").forEach((node) => {
    node.setAttribute("aria-label", t("app.language"));
  });

  document.querySelectorAll("[data-action='language']").forEach((button) => {
    const selected = button.dataset.language === state.language;
    button.classList.toggle("locale-switch__button--active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
}

function renderHud() {
  const current = nowMs();
  const coinEffect = getHudEffect("coins");
  const baseEffect = getHudEffect("base");
  const complaintEffect = getHudEffect("complaint");
  const energyEffect = getHudEffect("energy");

  refs.dayPill.textContent = t("hud.day", { day: state.day, max: MAX_DAY });
  refs.phasePill.textContent = getPhaseMetaText(state.phase, "label");
  refs.coinCount.textContent = `${state.coins}`;
  refs.baseCount.textContent = `${state.baseHealth}`;
  refs.phaseTimer.textContent = formatSeconds(state.phaseTimeLeft);
  refs.phaseTitle.textContent = getPhaseMetaText(state.phase, "title");
  refs.complaintValue.textContent = `${Math.round(state.complaint)}%`;
  refs.complaintFill.style.width = `${state.complaint}%`;
  refs.energyValue.textContent = `${state.actionEnergy.toFixed(1)} / ${state.maxEnergy}`;
  refs.energyFill.style.width = `${(state.actionEnergy / state.maxEnergy) * 100}%`;
  refs.flavorText.textContent = renderMessage(state.flavor);
  refs.phaseAdvance.textContent = getPhaseMetaText(state.phase, "button");
  refs.phaseAdvance.disabled = state.phase !== "stock";

  refs.gameScreen.classList.toggle("screen--game--lamp", state.feedback.screen.lampUntil > current);
  refs.gameScreen.classList.toggle(
    "screen--game--damage",
    state.feedback.screen.damageUntil > current
  );
  refs.gameScreen.classList.toggle("screen--game--shake", state.feedback.screen.shakeUntil > current);

  applyHudEffectClass(refs.coinChip, coinEffect);
  applyHudEffectClass(refs.baseChip, baseEffect);
  applyMeterEffectClass(refs.complaintBlock, complaintEffect);
  applyMeterEffectClass(refs.energyBlock, energyEffect);
  renderHudBurst(refs.coinBurst, coinEffect);
  renderHudBurst(refs.baseBurst, baseEffect);
  renderHudBurst(refs.complaintBurst, complaintEffect);
  renderHudBurst(refs.energyBurst, energyEffect);
}

function renderItems() {
  refs.itemList.innerHTML = ITEM_DEFS.map((item, index) => {
    const isUnlocked = isItemUnlocked(item);
    const owned = state.inventory[item.id];
    const available = state.phase === "sale" ? getAvailableInventoryCount(item.id) : owned;
    const atCap = owned >= state.inventoryCap;
    const canBuy = isUnlocked && state.phase === "stock" && !atCap && state.coins >= item.buy;
    const canSell = isUnlocked && state.phase === "sale" && state.activeCustomer;
    const itemEffect = getItemEffect(item.id);
    const buttonLabel =
      !isUnlocked
        ? t("shared.locked")
        : state.phase === "stock"
        ? t("items.buyShort")
        : state.phase === "sale"
          ? t("items.sellShort")
          : t("shared.locked");
    const itemEffectClass =
      itemEffect?.kind === "buy-hit"
        ? "item-card--buy-hit"
        : itemEffect?.kind === "sale-hit"
          ? "item-card--sale-hit"
          : itemEffect?.kind === "deny"
            ? "item-card--deny"
            : "";
    const burstClass =
      itemEffect?.kind === "deny"
        ? "fx-burst--bad"
        : "fx-burst--good";
    const burstStyle = itemEffect ? getEffectMotionStyle(itemEffect) : "";
    const stockLabel = isUnlocked
      ? state.phase === "sale"
        ? `${available}`
        : `${owned}/${state.inventoryCap}`
      : `D${item.unlockDay}`;

    return `
      <article class="item-card item-card--shelf ${itemEffectClass} ${isUnlocked ? "" : "item-card--locked"}">
        <div class="item-card__key">
          <span class="mini-tag mini-tag--key">${index + 1}</span>
        </div>
        <div class="item-card__body">
          <div class="item-card__row item-card__row--shelf">
            <div class="item-card__name">${getItemText(item, "short")}</div>
            <span class="mini-tag">${stockLabel}</span>
          </div>
          <div class="item-card__prices">
            ${
              isUnlocked
                ? `
                  <span class="mini-tag">${t("items.buyMini", { price: item.buy })}</span>
                  <span class="mini-tag">${t("items.sellMini", { price: item.sell })}</span>
                `
                : `<span class="mini-tag">${t("items.unlockDay", { day: item.unlockDay })}</span>`
            }
          </div>
        </div>
        <div class="item-card__cta">
          <button
            class="button button--secondary button--item"
            data-action="item"
            data-item-id="${item.id}"
            ${canBuy || canSell ? "" : "disabled"}
          >
            ${buttonLabel}
          </button>
        </div>
        <span class="fx-burst ${itemEffect ? burstClass : ""}" style="${burstStyle}">
          ${itemEffect?.label || ""}
        </span>
      </article>
    `;
  }).join("");
}

function renderStageView() {
  refs.stageView.classList.toggle("mode-card--stock", state.phase !== "sale" && state.phase !== "defense");
  refs.stageView.classList.toggle("mode-card--sale", state.phase === "sale");
  refs.stageView.classList.toggle("mode-card--defense", state.phase === "defense");

  if (state.phase === "stock") {
    refs.stageView.innerHTML = renderStockView();
    return;
  }

  if (state.phase === "sale") {
    refs.stageView.innerHTML = renderSaleView();
    return;
  }

  if (state.phase === "defense") {
    refs.stageView.innerHTML = renderDefenseView();
    return;
  }

  refs.stageView.innerHTML = `
    <div class="empty-state">
      ${renderMessage(state.flavor)}
    </div>
  `;
}

function renderStockView() {
  const unlockedItems = getUnlockedItems();
  const stockedCount = unlockedItems.filter((item) => state.inventory[item.id] > 0).length;
  const newlyUnlocked = getNewlyUnlockedItems(state.day);
  const unlockLabel =
    newlyUnlocked.length > 0
      ? newlyUnlocked.map((item) => getItemText(item, "short")).join(" / ")
      : t("upgrades.noneShort");

  return `
    <div class="stock-focus">
      <p class="panel__eyebrow">${getPhaseMetaText("stock", "label")}</p>
      <div class="stock-focus__value">${stockedCount}/${unlockedItems.length}</div>
      <p class="stock-focus__label">${t("panels.inventoryTitle")}</p>
      <div class="stock-focus__tags">
        <span class="mini-tag">${getPhaseMetaText("stock", "button")} · Space</span>
        <span class="mini-tag">${t("sale.unlockCard")} · ${unlockLabel}</span>
        <span class="mini-tag">${t("sale.hostiles", { count: computeThreatValue() })}</span>
      </div>
    </div>
  `;
}

function renderSaleView() {
  if (state.phase !== "sale") {
    return "";
  }

  const customer = state.activeCustomer;
  const saleEffect = isEffectActive(state.feedback.sale) ? state.feedback.sale : null;
  const patiencePercent = customer
    ? Math.max(0, (customer.patience / customer.maxPatience) * 100)
    : 0;
  const progress = customer ? getOrderProgress(customer) : { filled: 0, total: 0 };
  const customerClass =
    saleEffect?.kind === "good"
      ? "customer-card--sale-good"
      : saleEffect?.kind === "bad"
        ? "customer-card--sale-bad"
        : "";
  const requestClass = isRequestEffectActive() ? "request-chip--bad" : "";
  const saleEffectClass = saleEffect?.kind === "bad" ? "fx-burst--bad" : "fx-burst--good";
  const saleBurstStyle = saleEffect ? getEffectMotionStyle(saleEffect) : "";

  return `
    <div class="sale-layout">
      <article class="customer-card ${customerClass}">
        ${
          customer
            ? `
              <p class="panel__eyebrow">${t("sale.currentCustomer")}</p>
              <div class="customer-card__name">${getCustomerName(customer.nameId)}</div>
              <div class="customer-card__badges">
                <span class="mini-tag">${getCustomerTypeText(customer.typeId, "name")}</span>
                <span class="mini-tag">${getOrderRuleText(customer.ruleId, "name")}</span>
                <span class="mini-tag">${t("sale.progress", progress)}</span>
              </div>
              <div class="request-strip">
                ${customer.orderSlots
                  .map((slot) => `
                    <span class="request-chip ${requestClass} ${slot.mode === "choice" ? "request-chip--choice" : ""} ${slot.fulfilledBy ? "request-chip--filled" : ""}">
                      ${getOrderSlotLabel(slot, "short")}
                    </span>
                  `)
                  .join("")}
              </div>
              <div class="customer-card__badges">
                <span class="mini-tag">${t("sale.failurePenalty", {
                  leave: customer.complaintOnLeave,
                  mistake: customer.complaintOnMistake,
                })}</span>
                <span class="mini-tag">${formatSeconds(customer.patience)}</span>
              </div>
              <div class="customer-portrait"></div>
              <div class="meter">
                <div class="meter__fill meter__fill--cool" style="width: ${patiencePercent}%"></div>
              </div>
            `
            : `
              <p class="panel__eyebrow">${t("sale.nextCustomer")}</p>
              <div class="customer-card__name">${t("sale.lineShuffling")}</div>
              <p class="customer-card__copy">${t("sale.nextCustomerCopy")}</p>
              <div class="customer-portrait"></div>
            `
        }
        <span class="fx-burst fx-burst--sale ${saleEffect ? saleEffectClass : ""}" style="${saleBurstStyle}">${saleEffect?.label || ""}</span>
      </article>
      <article class="sale-summary">
        <div class="sale-summary__row">
          <span>${t("sale.daySales")}</span>
          <strong>${state.daySales}</strong>
        </div>
        <div class="sale-summary__row">
          <span>${t("sale.dayRevenue")}</span>
          <strong>${state.dayRevenue}</strong>
        </div>
        <div class="sale-summary__row">
          <span>${t("sale.missedCustomers")}</span>
          <strong>${state.dayMissed}</strong>
        </div>
        <div class="sale-summary__row">
          <span>${t("sale.nightForecast")}</span>
          <strong>${t("sale.hostiles", { count: computeThreatValue() })}</strong>
        </div>
        <p>${t("sale.summaryCopy")}</p>
      </article>
    </div>
  `;
}

function renderDefenseView() {
  if (state.phase !== "defense") {
    return "";
  }

  return `
    <div class="defense-layout">
      ${state.windows
        .map((windowState, index) => {
          const laneEffect = getLaneEffect(index);
          const laneZombies = state.zombies
            .filter((zombie) => zombie.lane === index)
            .sort((left, right) => right.progress - left.progress);
          const hpPercent = (windowState.hp / windowState.maxHp) * 100;
          const laneClass =
            laneEffect?.kind === "repair"
              ? "window-card--repair"
              : laneEffect?.kind === "attack"
                ? "window-card--attack"
              : laneEffect?.kind === "impact"
                ? "window-card--impact"
                : laneEffect?.kind === "kill"
                  ? "window-card--kill"
                  : "";
          const laneTrackClass =
            laneEffect?.kind === "flash"
              ? "lane-track--flash"
              : laneEffect?.kind === "attack" || laneEffect?.kind === "kill"
                ? "lane-track--attack"
                : "";
          const laneBurstClass =
            laneEffect?.kind === "impact"
              ? "fx-burst--bad"
              : "fx-burst--good";
          const laneBurstStyle = laneEffect ? getEffectMotionStyle(laneEffect) : "";
          const laneButtonLabel =
            state.currentAction === "attack"
              ? t("defense.attackButton")
              : t("defense.repairButton");
          const laneButtonAction =
            state.currentAction === "attack"
              ? `data-action="lane" data-lane-id="${index}"`
              : `data-action="window" data-window-id="${index}"`;

          return `
            <div class="window-card ${state.currentAction === "repair" ? "window-card--active" : ""} ${windowState.hp <= 0 ? "window-card--broken" : ""} ${laneClass}">
              <div class="window-card__row">
                <div class="window-card__title">${t("defense.lane", {
                  number: index + 1,
                })}</div>
                <button
                  class="button button--secondary"
                  ${laneButtonAction}
                >
                  ${laneButtonLabel}
                </button>
              </div>
              <div class="window-meter">
                <div class="window-meter__fill" style="width: ${hpPercent}%"></div>
              </div>
              <div class="window-card__row">
                <span>${t("defense.boardHp", {
                  current: windowState.hp,
                  max: windowState.maxHp,
                })}</span>
                <span>${t("defense.incoming", { count: laneZombies.length })}</span>
              </div>
              <div class="lane-track ${laneTrackClass}" data-action="lane" data-lane-id="${index}">
                ${laneZombies
                  .map((zombie) => {
                    const zombieEffect = getZombieEffect(zombie.id);
                    const left = 10 + zombie.progress * 80;
                    const zombieBurstStyle = zombieEffect ? getEffectMotionStyle(zombieEffect, {
                      startY: 10,
                      endY: -12,
                    }) : "";
                    const zombieBurstClass = zombieEffect?.kind === "kill" ? "zombie-burst--kill" : "";
                    return `
                      <button
                        class="zombie-chip zombie-chip--${zombie.type} ${zombie.stunned > 0 ? "zombie-chip--stunned" : ""}"
                        data-action="zombie"
                        data-zombie-id="${zombie.id}"
                        style="${getZombieChipStyle(zombieEffect, left)}"
                      >
                        ${t(`defense.zombieChip.${zombie.type}`, { hp: zombie.hp })}
                      </button>
                      <span class="zombie-burst ${zombieBurstClass}" style="left: ${left}%; ${zombieBurstStyle}">
                        ${zombieEffect?.label || ""}
                      </span>
                    `;
                  })
                  .join("")}
              </div>
              <span class="fx-burst fx-burst--lane ${laneEffect ? laneBurstClass : ""}" style="${laneBurstStyle}">${laneEffect?.label || ""}</span>
            </div>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderActions() {
  refs.actionList.classList.toggle("action-list--intel", state.phase === "sale");

  if (state.phase === "stock") {
    const newlyUnlocked = getNewlyUnlockedItems(state.day);
    refs.actionList.innerHTML = [
      {
        name: getPhaseMetaText("stock", "button"),
        mode: "Space",
      },
      {
        name: t("sale.unlockCard"),
        mode:
          newlyUnlocked.length > 0
            ? newlyUnlocked.map((item) => getItemText(item, "short")).join(" / ")
            : t("upgrades.noneShort"),
      },
      {
        name: t("sale.nightForecast"),
        mode: t("sale.hostiles", { count: computeThreatValue() }),
      },
    ]
      .map(
        (card) => `
          <article class="action-card action-card--info">
            <div class="action-card__row">
              <span class="action-card__name">${card.name}</span>
              <span class="mini-tag">${card.mode}</span>
            </div>
          </article>
        `
      )
      .join("");
    return;
  }

  if (state.phase === "sale") {
    const customer = state.activeCustomer;
    const newlyUnlocked = getNewlyUnlockedItems(state.day);

    const intelCards = customer
      ? [
          {
            name: t("sale.customerType"),
            mode: getCustomerTypeText(customer.typeId, "name"),
          },
          {
            name: t("sale.orderRule"),
            mode: getOrderRuleText(customer.ruleId, "name"),
          },
          {
            name: t("sale.missedCustomers"),
            mode: `+${customer.complaintOnLeave} / +${customer.complaintOnMistake}`,
          },
          {
            name: t("sale.unlockCard"),
            mode: newlyUnlocked.length > 0 ? newlyUnlocked.map((item) => getItemText(item, "short")).join(" / ") : "0",
          },
        ]
      : [
          {
            name: t("sale.nextCustomer"),
            mode: t("sale.lineShuffling"),
          },
          {
            name: t("sale.unlockCard"),
            mode: newlyUnlocked.length > 0 ? newlyUnlocked.map((item) => getItemText(item, "short")).join(" / ") : "0",
          },
        ];

    refs.actionList.innerHTML = intelCards
      .map(
        (card) => `
          <article class="action-card action-card--info">
            <div class="action-card__row">
              <span class="action-card__name">${card.name}</span>
              <span class="mini-tag">${card.mode}</span>
            </div>
          </article>
        `
      )
      .join("");
    return;
  }

  const actions = [
    {
      id: "repair",
      name: t("defense.actions.repair.name"),
      meta: t("defense.actions.repair.meta"),
      selected: state.currentAction === "repair",
      mode: "Q",
    },
    {
      id: "attack",
      name: t("defense.actions.attack.name"),
      meta: t("defense.actions.attack.meta", { damage: state.attackDamage }),
      selected: state.currentAction === "attack",
      mode:
        state.attackCooldown > 0
          ? t("defense.cooling", { time: formatSeconds(state.attackCooldown) })
          : "W",
    },
    {
      id: "flash",
      name: t("defense.actions.flash.name"),
      meta: t("defense.actions.flash.meta", {
        duration: formatSeconds(state.stunDuration),
      }),
      selected: false,
      mode:
        state.stunCooldown > 0
          ? t("defense.cooling", { time: formatSeconds(state.stunCooldown) })
          : "E",
    },
  ];

  refs.actionList.innerHTML = actions
    .map((action) => {
      const isDisabled =
        state.phase !== "defense" ||
        (action.id === "flash" && (state.actionEnergy < 2 || state.stunCooldown > 0)) ||
        (action.id === "attack" && state.attackCooldown > 0);

      return `
        <button
          class="action-card ${action.selected ? "action-card--selected" : ""}"
          data-action="tool"
          data-tool-id="${action.id}"
          ${isDisabled ? "disabled" : ""}
        >
          <div class="action-card__row">
            <span class="action-card__name">${action.name}</span>
            <span class="mini-tag">${action.mode}</span>
          </div>
          <p class="action-card__meta">${action.meta}</p>
        </button>
      `;
    })
    .join("");
}

function renderUpgrades() {
  if (state.upgradesOwned.length === 0) {
    refs.upgradeList.innerHTML = `
      <div class="empty-state empty-state--compact">
        ${t("upgrades.noneShort")}
      </div>
    `;
    return;
  }

  refs.upgradeList.innerHTML = state.upgradesOwned
    .map((upgradeId) => {
      const upgrade = findUpgrade(upgradeId);
      return `
        <article class="upgrade-chip">
          <strong>${getUpgradeText(upgrade, "name")}</strong>
          <p>${getUpgradeText(upgrade, "description")}</p>
        </article>
      `;
    })
    .join("");
}

function renderLog() {
  refs.eventLog.innerHTML = state.log
    .slice(0, 8)
    .reverse()
    .map((entry) => `<li class="log-entry">${renderMessage(entry)}</li>`)
    .join("");
}

function renderBriefingModal() {
  const shouldShow = state.phase === "title" && state.showBriefing;
  refs.briefingModal.classList.toggle("hidden", !shouldShow);
  refs.briefingModal.setAttribute("aria-hidden", String(!shouldShow));
}

function renderUpgradeModal() {
  if (state.phase !== "upgrade") {
    return;
  }

  refs.upgradeSummary.textContent = t("upgrades.summary", {
    day: state.day,
    revenue: state.dayRevenue,
    pressure: state.complaintPeak,
  });

  refs.upgradeOptions.innerHTML = state.pendingUpgradeChoices
    .map((upgrade) => {
      const affordable = state.coins >= upgrade.cost;
      return `
        <article class="upgrade-offer">
          <div>
            <strong>${getUpgradeText(upgrade, "name")}</strong>
            <p>${getUpgradeText(upgrade, "description")}</p>
          </div>
          <button
            class="button ${affordable ? "button--primary" : "button--ghost"}"
            data-action="upgrade"
            data-upgrade-id="${upgrade.id}"
            ${affordable ? "" : "disabled"}
          >
            ${t("upgrades.buy", { cost: upgrade.cost })}
          </button>
        </article>
      `;
    })
    .join("");
}

function renderResult() {
  if (!state.result) {
    return;
  }

  refs.resultTag.textContent = t(
    state.result.victory ? "results.clearedTag" : "results.overTag"
  );
  refs.resultTitle.textContent = t(
    state.result.victory ? "results.clearedTitle" : "results.overTitle"
  );
  refs.resultCopy.textContent = renderMessage(state.result.reason);

  refs.resultStats.innerHTML = [
    {
      label: t("results.days"),
      value: state.day,
    },
    {
      label: t("results.revenue"),
      value: state.totalRevenue,
    },
    {
      label: t("results.accuracy"),
      value: `${state.result.accuracy}%`,
    },
    {
      label: t("results.upgrades"),
      value: state.upgradesOwned.length,
    },
  ]
    .map(
      (entry) => `
        <article class="result-card">
          <strong>${entry.value}</strong>
          <p>${entry.label}</p>
        </article>
      `
    )
    .join("");
}

function handleActionPointer(event) {
  const actionTarget = event.target?.closest?.("[data-action]");
  if (!actionTarget) {
    return;
  }

  const action = actionTarget.dataset.action;
  if (action === "language") {
    setLanguage(actionTarget.dataset.language);
    return;
  }

  if (action === "item") {
    if (state.phase === "stock") {
      buyItem(actionTarget.dataset.itemId);
    } else if (state.phase === "sale") {
      sellItem(actionTarget.dataset.itemId);
    }
  } else if (action === "window") {
    useDefenseAction("window", actionTarget.dataset.windowId);
  } else if (action === "lane") {
    useDefenseAction("lane", actionTarget.dataset.laneId);
  } else if (action === "zombie") {
    useDefenseAction("zombie", actionTarget.dataset.zombieId);
  } else if (action === "tool") {
    handleActionSelection(actionTarget.dataset.toolId);
  } else if (action === "upgrade") {
    applyUpgrade(actionTarget.dataset.upgradeId);
  }
}

function handleKeydown(event) {
  if (event.repeat) {
    return;
  }

  if (event.code === "Escape" && state.phase === "title" && state.showBriefing) {
    dismissBriefing();
    return;
  }

  if (event.code === "Space") {
    event.preventDefault();
    if (state.phase === "title") {
      if (state.showBriefing) {
        startRunFromBriefing();
      } else {
        startRun();
      }
    } else if (state.phase === "stock") {
      handleAdvancePhase();
    } else if (state.phase === "result") {
      startRun();
    }
    return;
  }

  if (/^Digit[1-8]$/.test(event.code)) {
    const index = Number(event.code.replace("Digit", "")) - 1;
    const item = ITEM_DEFS[index];
    if (item) {
      if (state.phase === "stock") {
        buyItem(item.id);
      } else if (state.phase === "sale") {
        sellItem(item.id);
      }
    }
    return;
  }

  if (state.phase !== "defense") {
    return;
  }

  if (event.code === "KeyQ") {
    state.currentAction = "repair";
  } else if (event.code === "KeyW") {
    state.currentAction = "attack";
  } else if (event.code === "KeyE") {
    flashLamp();
  }
}

function setLanguage(language, { persist = true } = {}) {
  if (!SUPPORTED_LANGUAGES.includes(language)) {
    return;
  }

  state.language = language;
  if (persist) {
    storeLanguage(language);
  }

  renderedLanguage = "";
  render();
}

function renderMessage(entry, extraParams = {}) {
  return t(entry.key, { ...entry.params, ...extraParams });
}

function applyHudEffectClass(node, effect) {
  node.classList.toggle("stat-chip--gain", effect?.kind === "gain");
  node.classList.toggle("stat-chip--loss", effect?.kind === "loss");
  node.classList.toggle("stat-chip--danger", effect?.kind === "danger");
}

function applyMeterEffectClass(node, effect) {
  node.classList.toggle("meter-block--cool", effect?.kind === "cool");
  node.classList.toggle("meter-block--danger", effect?.kind === "danger");
}

function renderHudBurst(node, effect) {
  node.textContent = effect?.label || "";
  node.classList.toggle("hud-burst--active", Boolean(effect));
  node.classList.toggle("hud-burst--loss", effect?.kind === "loss" || effect?.kind === "danger");
}

function t(path, params = {}, language = state.language) {
  const targetLanguage = SUPPORTED_LANGUAGES.includes(language) ? language : "ko";
  const dictionary = STRINGS[targetLanguage];
  const value = path.split(".").reduce((current, segment) => current?.[segment], dictionary);
  if (typeof value !== "string") {
    return path;
  }

  const resolvedParams = resolveTemplateParams(params);
  return value.replace(/\{(\w+)\}/g, (_, key) => {
    const replacement = resolvedParams[key];
    return replacement === undefined ? `{${key}}` : String(replacement);
  });
}

function resolveTemplateParams(params = {}) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => [key, resolveTemplateValue(value)])
  );
}

function resolveTemplateValue(value) {
  if (!value || typeof value !== "object" || !value.kind) {
    return value;
  }

  if (value.kind === "customer") {
    return getCustomerName(value.id);
  }

  if (value.kind === "item") {
    return getItemText(findItem(value.id), value.field || "short");
  }

  if (value.kind === "upgrade") {
    return getUpgradeText(findUpgrade(value.id), value.field || "name");
  }

  if (value.kind === "zombie") {
    return getZombieText(value.id, value.field || "noun");
  }

  return value;
}

function customerToken(id) {
  return { kind: "customer", id };
}

function itemToken(id, field = "short") {
  return { kind: "item", id, field };
}

function upgradeToken(id, field = "name") {
  return { kind: "upgrade", id, field };
}

function zombieToken(id, field = "noun") {
  return { kind: "zombie", id, field };
}

function getCustomerName(index) {
  return CUSTOMER_NAMES[state.language]?.[index] ?? CUSTOMER_NAMES.ko[index] ?? "";
}

function getPhaseMetaText(phase, field) {
  return translateValue(PHASE_META[phase]?.[field]);
}

function getItemText(item, field) {
  return translateValue(item?.[field]);
}

function getUpgradeText(upgrade, field) {
  return translateValue(upgrade?.[field]);
}

function getZombieText(type, field) {
  return translateValue(ZOMBIE_META[type]?.[field]);
}

function translateValue(value, language = state.language) {
  if (typeof value === "string") {
    return value;
  }

  if (!value || typeof value !== "object") {
    return "";
  }

  return value[language] ?? value.ko ?? value.en ?? "";
}

function formatSeconds(value) {
  return t("shared.seconds", { value: value.toFixed(1) });
}

function detectPreferredLanguage() {
  const storedLanguage = readStoredLanguage();
  if (storedLanguage) {
    return storedLanguage;
  }

  const locales = getBrowserLocales();
  if (locales.some(isKoreanLocale)) {
    return "ko";
  }

  if (locales.some((locale) => locale.startsWith("en"))) {
    return "en";
  }

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  if (timezone === "Asia/Seoul") {
    return "ko";
  }

  return "ko";
}

function getBrowserLocales() {
  const locales = Array.isArray(navigator.languages) && navigator.languages.length > 0
    ? navigator.languages
    : [navigator.language];

  return locales
    .filter(Boolean)
    .map((locale) => locale.toLowerCase());
}

function isKoreanLocale(locale) {
  return locale.startsWith("ko") || locale.endsWith("-kr");
}

function readStoredLanguage() {
  try {
    const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return SUPPORTED_LANGUAGES.includes(storedLanguage) ? storedLanguage : null;
  } catch {
    return null;
  }
}

function storeLanguage(language) {
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    // Ignore storage failures and keep the in-memory preference.
  }
}

function readBriefingSeen() {
  try {
    return window.localStorage.getItem(BRIEFING_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

function storeBriefingSeen(value) {
  try {
    window.localStorage.setItem(BRIEFING_STORAGE_KEY, String(value));
  } catch {
    // Ignore storage failures and keep the in-memory preference.
  }
}

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function weightedPick(items, keyOrGetter) {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  const getWeight =
    typeof keyOrGetter === "function"
      ? keyOrGetter
      : (item) => item?.[keyOrGetter] ?? 0;

  const totalWeight = items.reduce((sum, item) => sum + Math.max(0, getWeight(item) || 0), 0);
  if (totalWeight <= 0) {
    return items[items.length - 1];
  }

  let roll = Math.random() * totalWeight;
  for (const item of items) {
    roll -= Math.max(0, getWeight(item) || 0);
    if (roll <= 0) {
      return item;
    }
  }

  return items[items.length - 1];
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

refs.startRun.addEventListener("click", startRun);
refs.openBriefing.addEventListener("click", openBriefing);
refs.briefingStart.addEventListener("click", startRunFromBriefing);
refs.briefingDismiss.addEventListener("click", dismissBriefing);
refs.restartRun.addEventListener("click", startRun);
refs.skipUpgrade.addEventListener("click", continueAfterUpgrade);
refs.phaseAdvance.addEventListener("click", handleAdvancePhase);
document.addEventListener("pointerdown", handleActionPointer);
document.addEventListener("keydown", handleKeydown);

animationFrameId = window.requestAnimationFrame((timestamp) => {
  lastFrameTime = timestamp;
  frame(timestamp);
});

setLanguage(DEFAULT_LANGUAGE, { persist: false });

# Deadstock Depot Content Expansion Design

## Goal

- 목적: `품목이 4개로 고정된 단순함`과 `보고 숫자키만 누르는 판매 루프`를 동시에 완화한다.
- 범위: 현재 6일 캠페인과 단일 화면 구조를 유지한 채, 판매 페이즈의 판단 요소를 늘린다.
- 원칙: 원작의 복잡한 상점 배치/가격/직원 시스템을 그대로 가져오지 않고, 브라우저 프로토타입에 맞는 얇은 의사결정 레이어만 추가한다.

## Design Principles

- Day가 진행될수록 `새 품목`과 `새 주문 규칙`이 같이 열려야 한다.
- 플레이어가 느끼는 깊이는 `암기`가 아니라 `판단`에서 나와야 한다.
- 현재 레이아웃은 유지하고, `왼쪽 상품 패널`, `중앙 손님 카드`, `오른쪽 보조 패널`만 확장한다.
- `워커 / 러너`처럼 익숙한 장르 용어는 유지하고, 설명 문장만 자연스럽게 다듬는다.

## Problem Statement

- 현재는 Day 1부터 Day 6까지 물건 4종이 고정이라, 학습이 너무 빨리 끝난다.
- 현재 손님 응대는 `요청 확인 -> 숫자키 입력`으로 끝나서, 판매 단계가 반사 신경 테스트에 가깝다.
- 밤 난이도는 이미 의미가 있으므로, 다음 확장은 `낮 루프`를 풍성하게 만드는 쪽이 더 효율적이다.

## Expansion Summary

- 품목 수는 `Day 1: 4종 -> Day 5+: 8종`으로 확장한다.
- 손님은 `타입`과 `주문 규칙`이 분리된 구조를 갖는다.
- 판매는 `정답 1회 클릭`에서 `부분 충족 / 대체 허용 / 복합 주문`으로 확장한다.
- UI는 그대로 두고, 중앙 판매 카드와 왼쪽 아이템 리스트를 더 정보성 있게 바꾼다.

## 1. Day-Based Inventory Expansion

### Item Roster Plan

| Day | Active items | Newly unlocked item | Role |
| --- | --- | --- | --- |
| 1 | 4 | 없음 | 기본 판매 루프 학습 |
| 2 | 5 | `생수 팩` | 값은 낮지만 자주 찾는 생활 물자 |
| 3 | 6 | `연료 캔` | 마진이 높고 밤 준비 이미지가 강한 품목 |
| 4 | 7 | `붕대 롤` | 의료 보조 품목, 대체 주문 설계에 유리 |
| 5 | 8 | `탄약 상자` | 희귀하지만 고수익, 후반 압박용 |
| 6 | 8 | 없음 | 신규 품목 대신 주문 복잡도 비중만 증가 |

### Item Data Shape

- 기존 `ITEM_DEFS`는 아래 필드를 추가하는 방향으로 확장한다.
  - `unlockDay`
  - `tags`
  - `demandByDay`
  - `rarity`
- 예시:

```js
{
  id: "water",
  name: { ko: "생수 팩", en: "Water Pack" },
  short: { ko: "생수", en: "Water" },
  buy: 2,
  sell: 4,
  unlockDay: 2,
  tags: ["food", "survival"],
  demandByDay: [0, 0.22, 0.18, 0.16, 0.14, 0.12],
  rarity: "common",
}
```

### Demand Curve Rules

- 품목 수가 늘어나도 초기 물건이 완전히 죽지 않게 해야 한다.
- 기본 방향:
  - `통조림`, `배터리`는 초반 수요가 높고 후반에는 완만하게 내려간다.
  - `구급 키트`, `연료 캔`, `탄약 상자`는 후반 비중이 조금씩 올라간다.
  - `생수 팩`, `붕대 롤`은 중간 다리 역할을 맡는다.
- 구현 주의:
  - 현재 `weightedPick()`는 누적합이 `1`을 넘으면 뒤 아이템이 사실상 죽는다.
  - 다음 턴 패치에서는 `총합 기준 가중 랜덤`으로 바꿔 arbitrary weight를 안전하게 처리한다.

### Recommended Item Roles

| Item | Unlock | Demand shape | Margin role | Tags |
| --- | --- | --- | --- | --- |
| 통조림 식품 | Day 1 | 초반 높음, 후반 중간 | 안정적 저가 | `food`, `survival` |
| 배터리 팩 | Day 1 | 전 구간 안정 | 중간 | `power`, `defense` |
| 구급 키트 | Day 1 | 후반 소폭 상승 | 고가 | `medical` |
| 고철 도구 | Day 1 | 낮은 빈도 유지 | 고마진 | `tools`, `defense` |
| 생수 팩 | Day 2 | 중간~높음 | 저가 회전 | `food`, `survival` |
| 연료 캔 | Day 3 | 중간, 후반 상승 | 고가 | `power`, `defense` |
| 붕대 롤 | Day 4 | 중간 | 보조 마진 | `medical`, `survival` |
| 탄약 상자 | Day 5 | 낮음 | 최고가 | `defense`, `rare` |

## 2. Customer Type Design

### Why Split Type and Order Rule

- `손님 타입`은 성격과 보상/패널티를 만든다.
- `주문 규칙`은 실제로 어떤 입력 판단을 요구하는지를 만든다.
- 이 둘을 분리하면, 콘텐츠 수를 적게 늘리고도 조합 폭을 크게 확보할 수 있다.

### Customer Types

| Type | Unlock | Weight | Effect |
| --- | --- | --- | --- |
| `standard` | Day 1 | 높음 | 기준값 그대로 |
| `hurried` | Day 2 | 중간 | 인내심 `0.72x`, 팁 `+1`, 놓치면 압박 `+1` |
| `picky` | Day 2 | 낮음 | 잘못 주면 압박 `+2`, 대체 주문 불가 |
| `regular` | Day 3 | 낮음 | 인내심 `1.18x`, 팁 `+2`, 실수 패널티 `-1` |
| `desperate` | Day 5 | 낮음 | 방어/생존 태그 주문 가중치 상승, 놓치면 압박 `+2` |

### Customer Type UI Signals

- 손님 카드 상단에 `타입 배지`를 넣는다.
- 예시:
  - `급한 손님`
  - `까다로운 손님`
  - `단골`
  - `다급한 손님`
- 보조 문구로 `팁 +2`, `실수 페널티 큼`, `인내심 짧음` 같은 한 줄 힌트를 보여준다.

## 3. Order Rule Design

### Order Rule Progression

| Day | Newly active rules |
| --- | --- |
| 1 | `single_exact` |
| 2 | `single_exact` only, 대신 타입 다양화 시작 |
| 3 | `double_exact`, `either_or` |
| 4 | `bundle_two` |
| 5 | `prep_run` |
| 6 | 복합 규칙 가중치 상승 |

### Order Rule Definitions

#### 1. `single_exact`

- 가장 단순한 주문
- 한 품목만 정확히 맞춰서 1회 판매
- Day 1 기준 학습 루프용

#### 2. `double_exact`

- 같은 물건 2개를 요구
- 한 번 누를 때마다 `1/2 -> 2/2`로 진행
- 인내심이 다 닳기 전에 2번 다 채워야 완료

#### 3. `either_or`

- 연관된 2개 품목 중 하나를 받으면 만족
- 예:
  - `배터리 팩 또는 연료 캔`
  - `구급 키트 또는 붕대 롤`
- `picky` 타입에게는 등장하지 않는다

#### 4. `bundle_two`

- 서로 다른 2개 품목을 모두 요구
- 예:
  - `통조림 + 생수`
  - `배터리 + 붕대`
- 순서는 상관없다

#### 5. `prep_run`

- 밤 준비 성격이 강한 손님
- `defense` 또는 `survival` 태그를 우선적으로 요청
- 놓치면 일반 손님보다 야간 압박을 더 높인다
- Day 5 이후 후반 압박용으로만 쓴다

## 4. Rule Combination Matrix

- 조합은 아래처럼 제한해 구현 난도를 낮춘다.

| Customer type | Allowed order rules |
| --- | --- |
| `standard` | 전체 허용 |
| `hurried` | `single_exact`, `double_exact`, `either_or` |
| `picky` | `single_exact`, `double_exact` |
| `regular` | `single_exact`, `either_or`, `bundle_two` |
| `desperate` | `single_exact`, `prep_run`, `either_or` |

- 이 제약만 있어도 `말이 되는 주문`만 나온다.
- 예:
  - `까다로운 손님 + either_or`는 금지
  - `다급한 손님 + prep_run`은 허용

## 5. Sale Validation Rules

### Per-Order Resolution

- `single_exact`: 맞는 품목 1회면 완료
- `double_exact`: 같은 품목 2회 필요
- `either_or`: 허용된 품목 중 하나를 주면 즉시 완료
- `bundle_two`: 필요한 2개 슬롯을 모두 채우면 완료
- `prep_run`: exact 또는 either/or 구조를 재사용하되 압박 보정만 더 강하게 준다

### Wrong Sale Handling

- 잘못된 품목을 주면 즉시 주문이 실패한다
- 예외:
  - `either_or`는 허용 목록 안이면 정답 처리
  - `bundle_two`는 이미 채운 슬롯이 아닌 품목이어야만 진행
- `double_exact`와 `bundle_two`는 `부분 성공 상태`를 저장해야 한다

### Complaint / Reward Policy

- 기본 로직은 유지한다
- 추가 보정:
  - `hurried` 놓침: 기본값 +1
  - `picky` 실수: 기본값 +2
  - `desperate` 놓침: 기본값 +2
  - `bundle_two` 완료: 보너스 팁 +1
  - `double_exact` 완료: 보너스 팁 +1

## 6. UI Integration on Current Layout

### Left Panel: Item Rack

- 현재 리스트 구조는 유지하되 `2열 그리드`로 바꾼다
- 아이템 카드에 아래 정보를 추가한다
  - 단축키 배지 `1-8`
  - 품목 태그 아이콘 1개
  - `Day X 해금` 잠금 상태
- 잠긴 품목도 미리 희미하게 보여 주고, 해금 시 짧은 하이라이트를 준다

### Center Panel: Customer Card

- 현재 단일 요청 칩을 `주문 스트립`으로 확장한다
- 구성:
  - 손님 타입 배지
  - 주문 규칙 라벨
  - 요청 칩 1~2개
  - 진행 표시 `1/2`, `2/2`
  - 실패 시 압박 증가 미리보기
- 예:
  - `급한 손님`
  - `복합 주문`
  - `[통조림] [생수]`
  - `남은 인내 시간`

### Right Panel: Sale Intel / Defense Tools Shared

- 현재 오른쪽 패널은 방어 도구 전용처럼 보이지만, 사실 페이즈별 동적 패널로 바꿀 수 있다
- 판매 페이즈에는 `action-list`를 아래 정보 카드로 재사용한다
  - 손님 타입 설명
  - 주문 규칙 설명
  - 놓쳤을 때 압박 수치
  - 오늘 새로 열린 품목
- 방어 페이즈에는 기존 방어 도구 목록으로 되돌린다

### Keyboard and Input

- 숫자키는 `1-8`까지 확장한다
- 마우스 클릭은 계속 유지한다
- 복합 주문이어도 `한 번에 모든 걸 처리`하는 방식이 아니라, 올바른 클릭마다 주문 진행도가 오른다

## 7. Implementation Notes for Next Turn

### Data Layer

- `ITEM_DEFS` 확장
- `CUSTOMER_TYPES` 신설
- `ORDER_RULES` 신설
- `state.activeCustomer`에 아래 필드 추가
  - `typeId`
  - `ruleId`
  - `orderSlots`
  - `fulfilledSlots`
  - `acceptedItemIds`
  - `tipModifier`

### Logic Layer

- `getUnlockedItems(day)`
- `getDemandWeight(item, day)`
- `pickCustomerType(day)`
- `pickOrderRule(day, customerType)`
- `buildCustomerOrder(day, type, rule)`
- `sellItem(itemId)`를 `부분 충족` 가능한 구조로 변경

### Render Layer

- `renderItems()`에서 잠금/해금 상태와 1-8 키 표시
- `renderSaleView()`에서 주문 진행 UI 추가
- `renderActions()`를 판매/방어 페이즈 겸용 패널로 분기
- `handleKeydown()` 숫자키 범위 확장

## 8. Balance Guardrails

- 품목이 늘면 검색 비용이 늘기 때문에 Day 4부터 판매 시간을 `+4초` 정도 늘리는 것을 기본안으로 잡는다
- `bundle_two`와 `double_exact`가 들어오는 날에는 손님 생성 간격을 소폭 완화한다
- 후반 압박 상승은 낮 루프 확장 후 다시 정책 시뮬레이터로 조정한다
- 첫 패치에서는 `동시 손님 수`를 늘리지 않는다

## 9. Explicit Scope Cuts

- 자유 진열 배치 없음
- 가격 흥정 없음
- 손님 여러 명 동시 응대 없음
- 환불/반품 규칙 없음
- 낮 단계 전용 미니게임 없음

## 10. Acceptance Criteria for Next Patch

- [ ] Day 진행에 따라 새 품목이 열린다
- [ ] Day 3부터 단순 주문 외 규칙이 등장한다
- [ ] Day 4부터 2품목 복합 주문이 등장한다
- [ ] 손님 타입이 UI에 표시된다
- [ ] 판매가 더 이상 단순 `보기 -> 숫자키 1회`로 끝나지 않는다
- [ ] 기존 밤 방어 루프는 유지된다

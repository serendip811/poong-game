# Cinder Circuit Design

## Overview

- Working title: `Cinder Circuit`
- Genre: 탑다운 아레나 슈터 + 웨이브 로그라이트
- Platform: Desktop-first Canvas browser game
- Session length: shipped slice 기준 `8웨이브 + 짧은 승리 랩`, `8~10분` 내외
- Core promise: 현재 shipped 러닝은 `Wave 1-8` 동안 `주력 변이`, `방호·보조`, `판돈·유틸` 중 하나를 반복해서 고르고, 직후 전투의 `Proof Window`에서 그 선택이 정말 전장을 먹는지 바로 증명한다.

## Pillars

- 읽히는 회피: 플레이어는 항상 무엇을 피해야 하고 어디로 빠져야 하는지 즉시 알아야 한다.
- 변신의 갈증: 다음 세 웨이브 안에 기계가 얼마나 달라질지 기대하게 만들어야 한다.
- 드랍의 가치: 웨이브 중 얻은 코어와 스크랩이 다음 포지의 headline/rider 선택을 흔들어야 한다.
- 단계 계약: `Wave 1-4`는 lean start와 첫 무기 도약, `Wave 5-8`은 실제 분기와 domination proof를 맡는다.

## Core Fantasy

플레이어는 무너진 제련 회로를 달리는 헌터다. 적을 파쇄해 잔열 코어를 줍고, 웨이브 사이 멈춰 선 포지에서 무기 회로를 갈아 끼우며 더 위험하지만 더 강한 화력을 만든다.

## Player Loop

1. 런 시작 전에 `시동 회로(Signature)`를 골라 초기 벤치 2장과 패시브를 정한다.
2. 아레나를 돌며 적을 피하고 자동 사격으로 잡는다.
3. 스크랩과 코어 드랍을 주워 다음 시대의 `Headline Leap`과 `Survival Rider` 선택지를 넓힌다.
4. 포지 구간에서 스크랩을 써 다음 전투를 바꿀 `Headline Form` 한 장과 필요 시 이를 받칠 `Rider` 한 장을 고른다.
5. 직후 웨이브의 `Proof Window`에서 새 형태가 실제로 lane, pocket, greed route를 얼마나 넓히는지 확인한다.
6. `Wave 8`과 짧은 승리 랩을 닫으면 한 번의 shipped run을 끝내고, 다른 form/rider/greed 조합으로 다시 돈다.

## Match Structure

- shipped route는 총 `Wave 1-8`와 웨이브 사이 포지로 이루어진 한 번의 닫힌 계약이다.
- `Wave 1-4`: 기본 코어로 버티며 첫 무기 도약을 만든다.
- `Wave 5-6`: 주무장/차체 break와 첫 실제 분기를 잠그고 mid-run bracket을 연다.
- `Wave 7-8`: 잠긴 gun/body line과 branch payoff를 domination proof로 길게 증명한다.
- 각 웨이브는 대체로 `50~75초` 내외, 밴드에 따라 아레나 크기와 압박 리듬이 달라진다.
- Wave 8 proof와 짧은 승리 랩 종료 후 생존 시 승리
- HP가 0이 되면 즉시 패배

## Controls

- Mouse:
  - 커서 위치로 조준
  - 포지 카드 선택
- Keyboard:
  - `WASD`: 이동
  - `Space`: 대시
  - `F`: `Overdrive` 발동
  - `1` `2` `3`: 타이틀에서 시동 회로 선택
  - `1` `2` `3`: 포지 카드 단축 선택
  - `Enter`: 시작
  - `R`: 재시작

## Core Systems

### 0. Run Signature

- 런 시작 전 `Relay Oath`, `Scrap Pact`, `Rail Zeal` 중 하나를 고른다.
- 시그니처는 원작의 `character + rune` 압축판으로, 초기 빌드 방향을 먼저 고정한다.
- 각 시그니처는 `초기 벤치 2장 + 작은 영구 패시브` 조합으로 구성한다.
- 목적은 첫 포지 이전부터 이미 다른 러닝 감각을 만드는 것이다.

### 1. Arena Combat

- 플레이어는 아레나 안을 자유롭게 이동한다.
- 무기는 자동으로 발사되며, 기본적으로 마우스 커서를 향해 쏜다.
- 커서가 없으면 가장 가까운 적을 자동 조준한다.
- 공격할수록 `Heat`가 올라가고, 너무 높으면 잠시 과열되어 발사가 막힌다.
- `Space` 대시는 짧은 무적과 거리 벌리기에 쓰인다.
- 적 처치와 스크랩 회수로 `Drive`가 차며, 가득 찼을 때 `F`로 짧은 화력 폭주를 켤 수 있다.

### 2. Scrap and Core Drops

- 적 처치 시 `Scrap`이 떨어지고, 가까이 가면 빨려 들어온다.
- 엘리트 적은 추가로 `Core`를 떨어뜨린다.
- 수집한 코어는 `무기 벤치`에 저장되고, 즉시 장착되지 않는다.
- 같은 코어는 타입마다 최대 `3개`까지 저장되며, 중복은 `SYNC` 레벨과 분해 가치로 변환된다.
- 코어는 짧은 시간 뒤 사라지므로, 주우러 갈 위험을 감수해야 한다.
- 스크랩은 총점이면서 동시에 포지 카드 구매 비용으로도 쓰인다.

### 3. Forge Intermission

- Wave 종료 후 시간이 잠시 멈추고 다음 전투를 바꿀 카드가 열린다.
- 기본 계약은 세 가지다: `Headline Leap`, `Survival Rider`, `Greed/Utility Gamble`.
- 대부분의 정지에서는 `Headline Leap` 한 장을 먼저 고르고, 필요한 경우 그 뒤에 소형 `Rider` 한 장만 얹는다.
- `Headline Leap`은 주무장/차체의 실루엣과 발사 규칙을 크게 바꾸는 선택이다.
- `Survival Rider`는 방호, support, 회수, 기동성처럼 headline leap의 약점을 받쳐 proof window를 길게 즐기게 만든다.
- `Greed/Utility`는 현장 경제나 위험 계약으로 런 노선을 비트는 예외적 선택이다.
- 정규화된 스크랩 경제 기준으로 카드 비용은 대체로 `0~52 Scrap` 안에서 읽히게 유지한다.

### 4. Reactor Pressure

- Wave가 올라갈수록 `Cinder Surge` 같은 폭주 지형이 더 자주 켜진다.
- 폭주 지형은 즉시 피해가 아니라 선고 후 폭발하는 방식으로 읽히게 만든다.
- 후반은 적만 보는 것이 아니라 위험 지형과 적 각도를 같이 읽어야 한다.

### 5. Threat Curve

- 초반은 `Scuttler` 위주로 회피를 익힌다.
- 중반부터 느리지만 버티는 `Brute`와 흔들리는 진입선을 만드는 `Shrike`가 섞이며 첫 ownership window를 시험한다.
- 각 웨이브마다 엘리트가 끼어들어 코어 드랍 기회를 만든다.
- 각 시대의 첫 밴드는 새 form을 즐기는 `payoff/proof` 창, 다음 밴드는 같은 생태에서 압박을 올리는 `escalation` 창으로 읽혀야 한다.
- 현재 shipped slice는 `Wave 5` 분기와 `Wave 6` 차체/support 잠금이 바로 run identity를 바꾸는지 증명해야 하며, 이후 `20-30웨이브` 구조 확장은 이 8-wave appetite loop가 먼저 반복 플레이 가능한지 확인한 뒤 연다.

## Content Scope

- Resources: `HP`, `Heat`, `Dash Charges`, `Drive`, `Scrap`, `Weapon Bench`
- Enemy types: 4종
  - `Scuttler`: 빠른 잡몹
  - `Brute`: 느리지만 단단한 전진형
  - `Shrike`: 측면으로 흔들리며 들어오는 교란형
  - `Elite Husk`: 코어를 떨어뜨리는 강화 개체
- Weapon cores: 4종
  - `Ember`: 기본 정밀 샷
  - `Scatter`: 근거리 다발 사격
  - `Lance`: 느리지만 관통하는 강타
  - `Ricochet`: 벽을 튕기는 분광탄
- Forge mods: 11종
- Hazard type: 1종
  - `Cinder Surge`: 선고 후 터지는 제련 폭주 지형
- Screens: 3개
  - Title
  - Main Game
  - Result

## UI Layout

- Title: 좌측은 게임 판타지와 러닝 루프, 우측은 브리핑 보드와 시그니처 선택을 둔 `mission board` 구성
- Top bar: 웨이브 지시문과 `Hull / Heat / Drive` 3연속 미터, `Dash / Time / Scrap` 보조 칩을 묶은 `command deck`
- Left panel: 시그니처, 활성 코어, 벤치, 누적 보강을 차례로 보여 주는 `arsenal rack`
- Center play space: 상단 `arena feed`와 활성 회로 요약, 중앙 캔버스, 하단 컨트롤 레일을 둔 아레나 프레임
- Right panel: 웨이브 목표와 실시간 텔레메트리, 짧은 입력 힌트만 남긴 `pressure board`
- Overlay: 현재 코어/벤치 상태를 먼저 보여 주고 그 아래 3장 카드를 크게 제시하는 `forge pause`
- End screen: 등급, 핵심 통계, 최종 로드아웃 요약을 함께 보여 주는 `debrief card`

## UI Direction

- 목표 톤은 `industrial command deck`이다. 웹 대시보드가 아니라, 제련 설비를 조작하는 전술 콘솔처럼 읽혀야 한다.
- 정보는 긴 설명문보다 `미터`, `칩`, `짧은 상태 행`을 우선한다. 문장은 페이즈당 한두 곳만 남기고 나머지는 숫자와 라벨로 축약한다.
- 전투 중 가장 먼저 읽혀야 하는 순서는 `생존 자원 -> 현재 웨이브 지시 -> 활성 무기 성격 -> 포지/벤치 상태`다.
- 포지와 결과 화면은 전투 HUD와 시각적으로 분리한다. 전투는 얇고 빠른 HUD, 선택 화면은 큰 카드와 넓은 여백으로 상태 전환이 분명해야 한다.
- 데스크톱 기준으로는 한 화면에서 전투가 끊기지 않게 유지하고, 좁은 폭에서는 `아레나 -> 좌패널 -> 우패널` 순으로 자연스럽게 스택된다.

## Art Direction

- Palette: 숯색 배경, 재빛 주황, 과열 적색, 청록 전류 포인트
- Shapes: 원형 아레나, 두꺼운 실루엣, 절단면이 읽히는 패널, 선명한 투사체와 글로우 링
- Animation style: 짧은 반동, 파편 버스트, 대시 잔상, 미세 화면 흔들림

## Audio Direction

- MVP에서는 외부 오디오 에셋 없이 진행
- 이후 확장 시에는 제련소 금속성 타격과 저주파 드론 중심으로 잡는다.

## Explicit Scope Cuts

- 절차 생성 맵 없음
- 무한 모드 없음
- 상점형 메타 진행 없음
- 장비 인벤토리/드래그 UI 없음
- 보스전과 스토리 컷신 없음

## Alpha Slice Acceptance Criteria

- [ ] 시작, 플레이, 결과 흐름이 끊기지 않는다.
- [ ] `8웨이브 + 짧은 승리 랩` 루프가 완주된다.
- [ ] `주력 변이`, `방호·보조`, `판돈·유틸` 중 적어도 한 실제 분기가 `Wave 5-8` 구간에서 즉시 읽힌다.
- [ ] 최소 3가지 이상 다른 주무장/차체 변신 감각이 실제로 체감된다.
- [ ] 과열과 대시가 단순 장식이 아니라 생존 판단에 영향을 준다.
- [ ] 스크랩 소비와 오버드라이브가 실제 선택 압박을 만든다.
- [ ] 승리와 패배 상태, 재시작 흐름이 있다.

## Implementation Notes

- 메인 전투는 `Canvas 2D`로 렌더링한다.
- HUD와 포지 카드는 DOM 오버레이로 분리해 읽기성을 확보한다.
- 적 수는 화면 가독성을 위해 동시 활성 `30~40` 선에서 묶는다.
- 첫 구현은 저장, 사운드, 메타 진행보다 전투 손맛과 빌드 변화 체감을 우선한다.
- 환경 압박은 복잡한 물리 대신 `텔레그래프 -> 활성 -> 종료` 순환형 위험 지형으로 통일한다.

## Engine and Asset Policy

- Engine:
  - MVP는 외부 JS 게임 엔진 없이 `HTML5 Canvas 2D + requestAnimationFrame`으로 구현한다.
  - 이유는 단일 아레나, 단순 충돌, 제한된 엔티티 수 기준에서 이 구성이 가장 가볍고 오프라인 보존도 쉽기 때문이다.
  - 확장 단계에서 씬 전환, 파티클 파이프라인, 에셋 로딩 복잡도가 커지면 그때 `Phaser 3` 도입을 재검토한다.
- Assets:
  - MVP는 외부 아트/오디오 에셋 없이 도형, 그라디언트, 캔버스 파티클, 텍스트만으로 표현한다.
  - 이유는 원작과의 시각적 거리 확보, 저작권 리스크 축소, 빠른 반복에 있다.
  - 후속 확장에서 외부 에셋이 필요해지면 `CC0` 또는 명시적 상업 이용 가능 라이선스만 사용하고 출처를 별도 문서에 기록한다.

## Next Build Target

현재 구현 목표는 `반복 플레이 가능한 8웨이브 shipped 알파 슬라이스`다.

- 필수: 타이틀, `Wave 1-8`, 반복 포지 계약, 4종 이상 적, 코어/차체/지원 계열 빌드 변화, 드라이브, 폭주 지형, 결과 화면
- 선택: 화면 흔들림, 파편 파티클, 최소한의 합성 사운드, 이후 `Afterburn` 확장 검증

세부 적용 원칙과 밸런스 계획은 [cinder-circuit-source-application.md](/Users/seren.kim/work_personal/poong_game/docs/games/cinder-circuit-source-application.md#L1)에 정리한다.

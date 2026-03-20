# Deadstock Depot Design

## Overview

- Working title: `Deadstock Depot`
- Genre: 탑다운 아케이드 매니지먼트 + 웨이브 디펜스
- Platform: Desktop-first HTML game
- Session length: 5분
- Core promise: 낮 동안 폐허 마트를 운영해 돈을 벌고, 밤에 몰려오는 좀비를 간신히 막아낸다.

## Pillars

- 빠른 판단: 어떤 물건을 먼저 팔고 언제 비축할지 즉시 결정한다.
- 하루 리듬: 판매 시간과 방어 시간이 선명하게 나뉘어 템포가 살아 있어야 한다.
- 절박한 업그레이드: 번 돈을 바로 생존 수단으로 바꾸는 압박이 있어야 한다.

## Core Fantasy

플레이어는 종말 이후 외딴 상점을 운영하는 사장이다. 낮에는 떠돌이 생존자에게 필요한 물건을 팔아 돈을 벌고, 해가 지면 가게 셔터를 내리고 창문을 막아 좀비를 버틴다.

## Player Loop

1. 아침에 제한된 예산으로 재고를 채우고 방어 업그레이드를 선택한다.
2. 낮 동안 손님 요청을 빠르게 처리해 이익을 쌓는다.
3. 늦은 오후에는 남은 재고와 번 돈으로 바리케이드 또는 무기를 준비한다.
4. 밤 웨이브를 버티고 다음 날 더 어려운 운영 라운드로 넘어간다.

## Match Structure

- Day 1 to Day 3 구성
- 각 Day는 `Stock Phase 20초 -> Sale Phase 40~52초 -> Defense Phase 30초`
- Day 3 방어를 넘기면 승리
- 체력 0 또는 핵심 창문 3개 모두 파손 시 패배

## Controls

- Mouse:
  - 상점 UI 클릭
  - 손님 요청 슬롯 클릭
  - 업그레이드 버튼 클릭
  - 방어 단계에서 창문 또는 좀비 클릭
- Keyboard:
  - `1` `2` `3` `4`: 재고 구매 단축키
  - `Q` `W` `E`: 방어 액션 단축키
  - `Space`: 다음 단계 시작 또는 재시작

## Core Systems

### 1. Stock Phase

- 플레이어는 매일 아침 제한된 코인으로 상품을 산다.
- 상품 종류는 4개만 사용한다.
  - Canned Food
  - Med Kit
  - Battery Pack
  - Scrap Tool
- 각 상품은 구매가, 판매가, 수요 빈도가 다르다.
- 재고를 너무 공격적으로 사면 방어 예산이 부족해진다.

### 2. Sale Phase

- 생존자 손님이 한 명씩 들어오며 원하는 상품 아이콘을 표시한다.
- 플레이어는 해당 상품 버튼을 눌러 즉시 판매한다.
- 빠르게 맞게 판매하면 팁 보너스를 받는다.
- 틀린 상품을 주거나 재고가 없으면 불만 게이지가 오른다.
- 불만 게이지가 높을수록 밤 좀비 수가 증가한다.

### 3. Defense Phase

- 상점 전면 창문 3곳이 공격받는다.
- 플레이어는 제한된 액션 포인트로 아래 행동 중 하나를 반복한다.
  - 판자 보강
  - 즉석 공격
  - 비상등 점등으로 짧은 기절
- 창문이 뚫리면 본체 체력이 감소한다.
- 낮 동안 돈을 잘 벌면 더 강한 방어 도구를 구매할 수 있다.

### 4. Upgrade Layer

- Day 종료 시 아래 중 하나를 구매할 수 있다.
  - 재고 슬롯 +1
  - 판자 체력 증가
  - 공격 쿨다운 감소
  - 손님 팁 보너스 증가
- 업그레이드는 총 6개 내에서 닫는다.

## Difficulty Curve

- Day 1: 재고 압박은 배우되, 밤은 대체로 넘길 수 있어야 함
- Day 2: 손님 조합 다양화, 업그레이드 선택이 의미 있게 체감됨
- Day 3: 재고와 밤 방어가 동시에 빡빡해져 실패 지점이 주로 여기서 나와야 함

## Content Scope

- Resources: 4종
- Enemy types: 2종
  - Walker: 느리지만 체력 높음
  - Runner: 빠르지만 약함
- Upgrades: 6개
- Screens: 3개
  - Title
  - Main Game
  - Result

## UI Layout

- Top bar: Day, time bar, coins, base health
- Left panel: 상품 재고와 구매 버튼
- Center play space: 손님 줄 또는 밤 방어 전면부
- Right panel: 요청 아이콘, 불만 게이지, 업그레이드 영역
- End screen: 생존 일수, 총매출, 판매 정확도, 재시작 버튼

## Art Direction

- Palette: 먼지 낀 황색, 녹슨 적갈색, 흐린 청록 포인트
- Shapes: 두껍고 읽기 쉬운 아이콘, 작은 스프라이트, 거친 외곽선
- Animation style: 판매 성공 시 짧은 튐 효과, 밤 공격 시 화면 흔들림 최소 사용

## Audio Direction

- BGM: 낮은 로파이 리듬, 밤에는 타악 강조
- SFX: 계산대 딸깍, 셔터 내리는 소리, 나무판 충돌음

## Explicit Scope Cuts

- 자유 이동 없음
- 대화 분기 없음
- 제작 시스템 없음
- 복수 직원 AI 없음
- 맵 탐사 없음

## MVP Acceptance Criteria

- [x] 시작 화면에서 게임을 시작할 수 있다.
- [x] 재고 구매, 판매, 방어의 3단계가 순환한다.
- [x] Day 6 승리와 중간 패배가 모두 존재한다.
- [x] 판매 성과가 밤 난이도에 영향을 준다.
- [x] 재시작 흐름이 있다.

## Implementation Notes

- 렌더링은 DOM 기반으로도 충분하다.
- 낮과 밤은 같은 메인 화면을 공유하고, 중앙 영역만 상태에 따라 바꾼다.
- 데이터 구조는 `items`, `customers`, `windows`, `upgrades`, `gameState` 정도면 충분하다.
- 첫 구현은 밸런싱보다 흐름 완주를 우선한다.
- 첫 밸런스 패스 기준으로 시작 코인, 재고 상한, 밤 에너지 재생, 불만도 변환식은 Day 1 통과율을 보장하는 쪽으로 완화한다.

## Next Build Target

첫 구현 목표는 `단일 HTML/CSS/JS 프로토타입`이다.

- 필수: Title, 6일 루프, 4종 상품, 2종 좀비, 결과 화면
- 선택: 간단한 사운드와 화면 흔들림

## Follow-up Expansion

- 후속 판매 확장 설계는 [deadstock-depot-content-expansion.md](/Users/seren.kim/work_personal/poong_game/docs/games/deadstock-depot-content-expansion.md#L1)에 정리한다.
- Canvas 2D 창고 방어 포팅 설계는 [deadstock-depot-canvas-port.md](/Users/seren.kim/work_personal/poong_game/docs/games/deadstock-depot-canvas-port.md#L1)에 정리한다.

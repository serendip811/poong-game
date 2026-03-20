# Deadstock Depot Canvas 2D Port Design

## Purpose

- 목표: 현재 `Deadstock Depot`를 `UI 중심 판매/레인 방어 프로토타입`에서 `Canvas 2D 창고 지키기 경영 액션`으로 재구성한다.
- 방향: 원작 `The Walking Trade`의 공개 자료에서 보이는 `공간 운영 + 생존 방어` 감각을 더 직접적으로 가져온다.
- 결과물: 다음 턴부터 바로 구현 범위를 나눌 수 있는 포팅 기준 문서.

## Source Basis

- 분석 기준일: `2026-03-20`
- 공식 공개 자료:
  - Steam 공식 페이지: `https://store.steampowered.com/app/3398110/The_Walking_Trade/`
  - 사용자 제공 플레이 참고 영상: `https://www.youtube.com/watch?v=wpedn95rDGQ`
- Steam 공식 페이지에서 확인되는 축:
  - 좀비 아포칼립스 배경의 상점 운영
  - 상점 설계, 선반 정리, 가격 설정
  - 고객 응대와 생존자 고용
  - 제작대, 바리케이드, 함정, 저장 공간
  - 습격과 호드 방어
  - 평판에 따라 방문자 구성이 달라짐
- 확인되지 않은 것:
  - 공개 GDD나 시스템 상세 문서는 찾지 못했다.
  - 따라서 아래 설계는 `Steam 공식 설명 + 공개 영상 인상`에 근거한 브라우저용 재구성안이다.

## Why Pivot

- 현재 프로토타입은 `낮에는 버튼 판매, 밤에는 3레인 방어`라서 흐름 설명용으로는 충분했지만, 원작의 핵심 인상인 `공간을 운영하고 직접 지킨다`는 감각이 약하다.
- Canvas 2D로 옮기면 아래가 동시에 좋아진다.
  - `가게/창고를 실제 장소`처럼 느끼게 만들 수 있다.
  - 낮과 밤이 같은 맵에서 이어져 몰입감이 올라간다.
  - 손님과 좀비를 `실제 동선`으로 처리할 수 있다.
  - UI 과밀 문제를 줄이고, HUD는 상태 정보만 맡길 수 있다.

## Product Definition

- Working title: `Deadstock Depot`
- Genre: 탑다운 2D 창고 운영 + 실시간 방어 액션
- Platform: Desktop-first browser game
- Rendering: `Canvas 2D playfield + DOM HUD`
- Session length: `8~12분`
- Camera: 고정 탑다운 또는 약한 쿼터뷰 느낌의 2D
- Run structure: `Day 1 ~ Day 6`

## Core Fantasy

플레이어는 국도 옆 폐창고를 마지막 보급 상점으로 꾸려 버티는 관리자다. 낮에는 선반을 채우고 손님을 응대해 현금을 만들고, 밤에는 같은 창고를 뛰어다니며 문과 창문을 막고 좀비를 쏘거나 밀어내며 살아남는다.

## Pillars

- 공간 운영: 메뉴가 아니라 `실제 창고 공간` 안에서 물건과 시설을 관리한다.
- 낮/밤 연결: 같은 장소가 낮에는 상점, 밤에는 요새가 된다.
- 절박한 전환: 낮 수익이 밤 생존력으로 바로 이어져야 한다.
- 손으로 버티기: 밤은 레인 선택이 아니라 직접 움직이며 막는 감각이 있어야 한다.

## What We Keep From Source

- 상점 설계와 선반 운영의 감각
- 고객 응대와 수익/평판의 긴장
- 제작대, 바리케이드, 저장 공간 같은 생존 상점 느낌
- 습격과 호드 방어
- 장사와 생존이 한 장소에서 부딪히는 판타지

## What We Cut For Browser Scope

- 자유로운 3D 건축
- 정교한 물리 시뮬레이션
- 복수 직원 AI의 세부 장비 관리
- 복잡한 가격 전략과 경제 시뮬레이션
- 외부 정착지 파괴/도덕 분기 같은 큰 평판 서사
- FPS 조작

## High-Level Loop

1. 아침: 창고 문을 열기 전 선반을 채우고, 제작대에서 판자/탄약/수리 키트를 만든다.
2. 낮: 손님이 창고에 들어와 원하는 품목 선반으로 이동하고, 플레이어는 진열 상태와 계산대를 관리한다.
3. 해질녘: 남은 시간 동안 셔터, 문, 창문, 함정을 손본다.
4. 밤: 좀비가 여러 진입점으로 몰려오고, 플레이어는 직접 이동/공격/수리/보급을 반복한다.
5. 새벽: 수익 정산, 시설 보강, 다음 날 신규 품목 또는 설비 해금.

## World Model

### Warehouse Layout

- 맵은 `단일 창고` 1개로 고정한다.
- 기본 구획:
  - 정문
  - 계산대
  - 선반 존 4~6칸
  - 보관 구역
  - 제작대
  - 정문 셔터
  - 측문 1개
  - 창문 2~3개
- 중요한 점:
  - 낮과 밤 모두 같은 맵을 쓴다.
  - 낮에는 손님 동선이 핵심이다.
  - 밤에는 진입점 방어와 보급 동선이 핵심이다.

### Recommended Tile Footprint

- Canvas logical resolution: `960 x 540`
- Tile size: `32px`
- Grid: `30 x 16` 또는 `32 x 18`
- 이유:
  - 브라우저에서 읽기 쉽다.
  - 선반/문/창문/작업대/플레이어 동선을 넣기 충분하다.
  - 추후 미니맵 없이도 구조를 이해하기 쉽다.

## Day Phase Design

### 1. Shelf Stocking

- 각 선반은 `담당 품목 1종`만 갖는다.
- 플레이어는 보관 구역에서 재고를 집어 선반에 채운다.
- 브라우저 축약형 규칙:
  - 선반 종류는 4~6개
  - 각 선반은 최대 재고 수량이 있다
  - 같은 품목이 바닥나면 손님 만족도가 깎인다

### 2. Pricing

- 원작의 `가격 설정` 감각은 완전 삭제하지 않고 축약한다.
- 각 선반은 `저가 / 표준 / 고가` 3단계 가격만 가진다.
- 효과:
  - 저가: 손님 만족도 상승, 마진 감소
  - 표준: 기준값
  - 고가: 마진 상승, 떠날 확률/불만 증가
- UI는 숫자 입력이 아니라 선반 클릭 후 토글 3단계만 둔다.

### 3. Customer Flow

- 손님은 창고 안으로 들어와 `필요 품목이 있는 선반`으로 이동한다.
- 플레이어는 다음을 관리한다.
  - 선반에 물건이 남아 있는지
  - 계산대 줄이 밀리는지
  - 잘못된 가격 때문에 화를 내는 손님이 늘지 않는지
- 브라우저판에서는 손님 주문을 텍스트로 받지 않고, `생각 풍선 + 목표 선반` 방식으로 단순화한다.

### 4. Checkout

- 손님은 물건을 집은 뒤 계산대로 간다.
- 계산대는 플레이어가 직접 서거나, 업그레이드 후 보조 인력이 처리한다.
- 계산이 밀리면 줄이 길어지고 불만이 오른다.

### 5. Day Pressure Variables

- `stockout`: 찾는 물건이 없어서 돌아감
- `queueOverflow`: 계산대 줄 과밀
- `priceHeat`: 가격이 과하게 높아 불만 증가
- `theftRisk`: 밤이 가까워질수록 일부 방문자가 훔치고 도망갈 수 있음

## Night Phase Design

### 1. Raid Structure

- 밤은 `3레인`이 아니라 `여러 진입점` 방어다.
- 기본 진입점:
  - 정문 셔터
  - 측문
  - 창문 A
  - 창문 B
- 좀비는 가장 약한 진입점 또는 가장 가까운 틈으로 몰린다.

### 2. Player Actions

- 이동
- 근접 밀치기
- 단발 사격
- 판자 수리
- 함정 설치/재장전
- 제작대 또는 탄약 박스에서 보급

### 3. Defense Resources

- 판자
- 탄약
- 수리 키트
- 배터리 전력
- 함정 충전량

### 4. Zombie Types

- `워커`: 느리고 체력이 높다
- `러너`: 빠르고 문이 열리면 바로 안쪽으로 파고든다
- `브루저`는 후반 또는 확장용으로만 남겨 둔다

### 5. Night Failure States

- 본체 체력 0
- 계산대/발전기 파괴
- 창고 내부 핵심 구역 점령 시간 초과

## Meta Systems

### Reputation

- 원작 공개 자료의 `who comes knocking` 감각만 얇게 가져온다.
- 브라우저판에서는 도덕 분기 대신 아래 2축만 쓴다.
  - `trust`: 표준 가격, 재고 안정, 손님 보호
  - `greed`: 고가 판매, 희귀 품목 우선, 밤 자원 압박 완화
- 효과:
  - `trust`가 높으면 일반 손님과 보급 손님 증가
  - `greed`가 높으면 고수익 손님과 약탈형 손님 증가

### Staff

- MVP에서는 `계산 보조 1명`만 둔다.
- 상세 장비 세팅은 자른다.
- 구현 우선순위:
  - 1차: 플레이어 혼자
  - 2차: 계산대 보조 NPC 1명

### Crafting

- 원작 공개 자료의 제작대 요소는 반드시 가져간다.
- 다만 제작 트리는 얇게 유지한다.
- 제작 가능 목록:
  - 판자 묶음
  - 탄약 상자
  - 수리 키트
  - 플래시 배터리

## UI / UX Direction

### Canvas 영역

- 플레이어, 손님, 좀비, 선반, 문, 창문, 제작대, 함정을 모두 Canvas에 그린다.
- 장면은 실제 창고처럼 보이되, 아이콘과 색으로 읽기 쉬워야 한다.

### DOM HUD

- 상단:
  - Day
  - 코인
  - 평판
  - 남은 시간
  - 전력
- 좌측:
  - 현재 재고 요약
  - 제작 퀵 슬롯
- 우측:
  - 현재 목표
  - 진입점 상태
  - 계산대 줄 상태
- 하단:
  - 최근 로그 4~6줄

### Log Style

- 현재 유저가 원한 것처럼 `콘솔형 텍스트 로그`로 간다.
- 예:
  - `> 정문 셔터 보강 완료`
  - `> 통조림 선반 재고 부족`
  - `> 워커 3체 정문 접근`
  - `> 계산대 줄 과밀`

## Control Scheme

- `WASD`: 이동
- `Mouse`: 조준/상호작용
- `E`: 상호작용
- `R`: 재장전 또는 수리
- `Space`: 근접 밀치기
- `1 2 3 4`: 빠른 아이템/제작 슬롯
- `Tab`: 낮/밤 상태 오버레이

## Technical Architecture

### Render Split

- Canvas:
  - world
  - entities
  - particles
  - hit flashes
- DOM:
  - HUD
  - inventory summary
  - build/craft buttons
  - pause/result overlays
  - localized text

### State Model

- `gameState`
  - `phase`
  - `day`
  - `timeLeft`
  - `coins`
  - `trust`
  - `greed`
  - `power`
- `warehouse`
  - `shelves`
  - `doors`
  - `windows`
  - `workbench`
  - `storage`
- `entities`
  - `player`
  - `customers`
  - `zombies`
  - `staff`
  - `projectiles`

### Implementation Note

- 이 포팅은 DOM 패널 게임보다 `Canvas loop`가 중심이다.
- 따라서 다음 구현부터는 `renderItems()` 같은 좌측 패널 중심 사고보다 `world update -> HUD sync` 구조가 우선이다.

## MVP Scope

### Included

- 단일 창고 맵
- Day 1~3 또는 Day 1~4 러닝
- 선반 4종
- 가격 3단계
- 손님 이동 + 계산대 줄
- 밤 진입점 4곳
- 워커/러너 2종
- 제작대 1개
- 판자/탄약/수리 키트
- 업그레이드 4~6개

### Deferred

- 직원 2명 이상
- 평판 세부 분기
- 함정 종류 다양화
- 정교한 동적 배치
- 희귀 방문자 이벤트
- Day 5~6 후반 콘텐츠

## Milestone Plan

### Milestone 1: Playfield Foundation

- Canvas 카메라와 창고 맵 표시
- 플레이어 이동과 충돌
- 선반, 문, 창문, 제작대 배치

### Milestone 2: Day Loop

- 손님 입장
- 선반 재고 소비
- 계산대 처리
- 가격 단계와 만족도

### Milestone 3: Night Loop

- 진입점 공격
- 좀비 pathing
- 플레이어 공격/수리/보급
- 밤 승패

### Milestone 4: Economy and Progression

- 제작대
- 업그레이드
- 평판 축
- Day progression

## Acceptance Criteria

- [ ] 같은 창고 맵이 낮과 밤 모두에서 사용된다
- [ ] 손님이 실제로 선반과 계산대를 이용한다
- [ ] 밤에 3레인이 아니라 여러 진입점을 직접 방어한다
- [ ] 제작대가 낮/밤 루프를 연결한다
- [ ] DOM HUD 없이도 Canvas 장면만 보고 현재 상황을 대략 이해할 수 있다
- [ ] HUD는 설명문보다 상태 수치 중심이다

## Recommendation

이 포팅 방향은 `기존 Deadstock Depot DOM 프로토타입의 연장`이라기보다 `공간 중심의 새 프로토타입`으로 보는 게 맞다.

- 그대로 유지할 것:
  - 세계관
  - 낮/밤 리듬
  - 장사 성과가 밤 난이도에 반영되는 구조
- 과감히 버릴 것:
  - 숫자키 중심 주문 처리
  - 3레인 방어
  - 좌우 패널에 의존하는 메인 플레이

## Next Turn Build Target

다음 구현 턴의 최소 목표는 `Canvas 2D foundation`이다.

- 필수:
  - 창고 맵 1개
  - 플레이어 이동
  - 선반 4개
  - 정문/측문/창문 4개 진입점
  - 낮/밤 전환
- 선택:
  - 손님 pathing
  - 계산대 줄
  - 로그 스트림

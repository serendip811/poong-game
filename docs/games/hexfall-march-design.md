# Hexfall March Design

## Overview

- Working title: `Hexfall March`
- Genre: 턴제 카드 배틀러 + 짧은 경로 로그라이트
- Platform: Desktop-first HTML game
- Session length: 6분 내외
- Core promise: 저주받은 회랑을 따라 다음 노드를 고르고, 적 의도를 읽으며 카드를 엮어 버티다가 마지막 수문장을 쓰러뜨린다.

## Pillars

- 읽히는 의도: 플레이어는 이번 턴에 왜 막아야 하고 왜 밀어야 하는지 즉시 이해해야 한다.
- 작은 덱 변화의 체감: 전투 후 고르는 카드 1장이 다음 전투 판단을 분명히 바꿔야 한다.
- 짧은 행군: 한 번의 러닝이 6단계 안에서 끝나며, 선택이 매번 남아야 한다.

## Core Fantasy

플레이어는 금지된 인장을 운반하는 전령이다. 무너지는 회랑을 따라 전진하며 적들의 의도를 읽고 인장을 덧그린 카드로 반격한다. 쉬어 갈지, 대장간에서 카드를 벼릴지, 더 위험한 적에게 덤벼 유물을 얻을지 계속 선택해야 한다.

## Player Loop

1. 다음 노드 두 개 중 하나를 골라 전투 또는 보강 방향을 정한다.
2. 전투에 들어가 손패, 에너지, 블록, 적 의도를 읽고 카드를 사용한다.
3. 전투 후 보상 카드 3장 중 1장을 골라 덱을 조금 비튼다.
4. 휴식이나 대장간으로 체력 또는 카드 질을 보강한 뒤 최종 수문장까지 밀어붙인다.

## Match Structure

- 총 `Skirmish -> Rest/Forge -> Skirmish/Elite -> Skirmish/Forge -> Rest/Elite -> Boss`
- 일반 전투는 `3~5턴`, 엘리트와 보스는 `5~7턴` 정도를 목표로 한다.
- 마지막 `Vault Warden`을 쓰러뜨리면 승리
- HP가 0이 되면 즉시 패배

## Controls

- Mouse:
  - 노드 선택
  - 카드 사용
  - 보상 카드, 휴식, 대장간 선택
- Keyboard:
  - `1` `2` `3` `4` `5`: 손패 카드 사용
  - `E`: 턴 종료
  - `Enter`: 시작 / 재시작 / 다음 진행
  - `R`: 즉시 재시작

## Core Systems

### 1. Card Duel

- 매 턴 손패 5장과 에너지 3으로 시작한다.
- 플레이어 카드는 `Attack`, `Skill`, `Power` 3종으로 단순화한다.
- `Block`은 턴 종료 시 대부분 사라진다.
- 적은 매 턴 다음 행동을 명시적으로 보여준다.
- 플레이어와 적 모두 `Strength`를 가질 수 있다.
- 적에게 쌓는 `Expose`는 다음 공격 피해를 키우고 소모된다.

### 2. March Route

- 러닝은 6단계 고정 트랙을 쓴다.
- 분기 노드는 항상 2개 선택지 중 하나만 연다.
- 노드 타입은 아래 5개만 사용한다.
  - `Skirmish`
  - `Elite`
  - `Rest`
  - `Forge`
  - `Boss`
- 노드 선택은 체력 회복, 카드 강화, 유물 획득 타이밍을 바꾼다.

### 3. Reward Draft

- 일반 전투와 엘리트 전투 후 카드 3장 중 1장을 고른다.
- 카드를 고르지 않고 `Skip`할 수도 있다.
- 엘리트 승리 시 카드 보상과 함께 유물 1개를 즉시 얻는다.
- 보상 풀은 10장 안으로 닫아 덱 성격이 빠르게 보이게 만든다.

### 4. Rest and Forge

- `Rest`에서는 `Recover` 또는 `Steel Nerve` 중 하나를 고른다.
  - `Recover`: HP 회복
  - `Steel Nerve`: 최대 HP +5
- `Forge`에서는 덱 카드 1장을 골라 강화한다.
- 강화된 카드는 비용은 유지하되 수치가 분명히 오른다.

### 5. Threat Curve

- 초반은 단순 공격/방어 의도를 읽는 구간이다.
- 중반은 다단 히트, 자가 방어, 힘 증가가 섞여 블록 계산을 흔든다.
- 후반은 보스가 `다단 공격 -> 방어 -> 예열 강타` 리듬으로 덱의 안정성을 시험한다.

## Content Scope

- Resources: `HP`, `Block`, `Energy`, `Strength`, `Expose`, `Draw Pile`, `Discard Pile`
- Enemy types: 4종
  - `Ash Scout`: 기본 공격형
  - `Glass Hound`: 다단 히트형
  - `Banner Knight`: 자가 방어와 힘 증가를 섞는 엘리트
  - `Vault Warden`: 최종 보스
- Cards: 10종 내외
  - Starter 4종
  - Reward 6종
- Relics: 4종
- Screens: 3개
  - Title
  - Main Run
  - Result

## UI Layout

- Top bar: 현재 단계, HP, Block, Energy, Draw/Discard, 현재 적 의도
- Left panel: 루트 진행, 보유 유물, 덱 요약
- Center play space: 현재 노드 설명, 적 카드, 로그, 이벤트 선택 패널
- Bottom area: 손패, 턴 종료 버튼, 단축키 힌트
- End screen: 승패 사유, 도달 단계, 남은 HP, 덱 크기, 획득 유물, 재시작 버튼

## Art Direction

- Palette: 먹빛 배경, 양피지 베이지, 인장 적색, 황동 금색, 푸른 잿빛 포인트
- Shapes: 두꺼운 카드 프레임, 세로 인장 배지, 파편형 노드 마커
- Animation style: 카드 리프트, 적 의도 맥박, 피격 시 짧은 흔들림, 보상 카드 등장 스태거

## Audio Direction

- MVP에서는 외부 오디오 에셋 없이 진행
- 후속 확장 시에는 낮은 타악 드론과 종소리 계열 UI 피드백을 고려한다.

## Explicit Scope Cuts

- 캐릭터 선택 없음
- 포션 없음
- 상점/사건 노드 없음
- 장기 메타 진행 없음
- 코옵 없음
- 다중 적 전투 없음

## MVP Acceptance Criteria

- [ ] 시작, 러닝, 결과 흐름이 끊기지 않는다.
- [ ] 적 의도, 카드 사용, 턴 종료가 한 전투 루프로 읽힌다.
- [ ] 최소 3번 이상의 전투 보상 선택이 실제로 발생한다.
- [ ] 휴식과 대장간 중 어느 쪽을 고를지 고민할 정도의 체력 압박이 있다.
- [ ] 승리와 패배 상태, 재시작 흐름이 있다.
- [ ] 원작의 `의도 읽기 + 덱 성장 + 경로 선택` 훅이 남아 있다.

## Implementation Notes

- 메인 게임은 DOM 렌더 기반으로 충분하다.
- 상태는 `screen`, `phase`, `route`, `deck`, `combat`, `relics` 정도로 닫는다.
- 이벤트 바인딩은 문서 단위 위임으로 두고, 화면은 상태에 따라 부분 갱신한다.
- 첫 구현은 저장, 사운드, 복잡한 상태이상보다 루프 완주와 가독성을 우선한다.
- 스모크 검증에서는 경로 진행, 전투 helper, 카드 강화, 카드 보상 생성을 확인한다.

## Engine and Asset Policy

- Engine:
  - MVP는 외부 JS 게임 엔진 없이 `HTML/CSS/Vanilla JS`로 구현한다.
  - 이유는 카드 배틀과 분기 노드가 캔버스 물리보다 DOM 가독성에 더 잘 맞기 때문이다.
- Assets:
  - MVP는 외부 아트/오디오 에셋 없이 텍스트, CSS, 기본 도형만으로 연출한다.
  - 이유는 원작과의 시각적 거리 확보와 빠른 반복 속도 때문이다.

## Next Build Target

현재 구현 목표는 `단일 HTML/CSS/JS 카드 러닝 프로토타입`이다.

- 필수: 타이틀, 6단계 루트, 4종 적, 10종 안팎 카드, 4종 유물, 결과 화면
- 선택: 추가 보스 패턴, 카드 등장 사운드, 카드 제거 이벤트

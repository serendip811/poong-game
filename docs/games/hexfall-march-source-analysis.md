# Hexfall March Source Analysis

## Basic Info

- Working slug: `hexfall-march`
- Source game title: `Slay the Spire 2`
- Source links:
  - User-provided YouTube link: `https://www.youtube.com/watch?v=Eg8fbmRxKHM`
  - Steam page: `https://store.steampowered.com/app/2868840/Slay_the_Spire_2/`
- Analysis date: `2026-03-20`

## What the Source Appears to Be

- Genre: 턴제 덱빌딩 로그라이트
- Camera: 2D 카드 전투 화면 + 노드 기반 진행 맵
- Core fantasy: 적의 의도를 읽고 카드를 엮어 위험한 등반을 버텨 최상층까지 도달한다.
- Session feel: 매 전투마다 작은 판단을 쌓아 덱을 비틀고, 경로 선택으로 러닝의 리스크를 조정하는 고밀도 전략 루프

## Observable Systems

- 손패, 에너지, 블록, 적 의도 기반의 턴제 카드 전투
- 분기형 맵에서 전투/휴식/보상/엘리트를 고르는 경로 선택
- 전투 후 카드 보상과 덱 성장
- 유물, 강화, 포션 같은 전투 외 보강 요소
- 캐릭터별 카드 풀과 장기 반복 플레이
- 시퀀스마다 다른 적 패턴과 보스전

## What We Keep

- Mechanic: 적 의도를 보고 방어와 공격 타이밍을 맞추는 카드 전투
- Mechanic: 짧은 경로 선택이 다음 전투 난이도와 회복 여유를 바꾸는 구조
- Mechanic: 전투 후 1장씩 덱을 비틀어 러닝의 성격을 바꾸는 보상 드래프트
- Emotional beat: 초반엔 간신히 막고, 후반엔 잘 깎은 덱으로 의도를 역이용하는 감각

## What We Cut

- Cut: 복수 플레이어/코옵
- Cut: 여러 캐릭터와 각 캐릭터 전용 방대한 카드 풀
- Cut: 포션, 상점, 사건 노드, 장기 메타 진행
- Cut: 다층 Act 구조와 장시간 러닝
- Cut: 대형 서사 연출과 원작 고유 적/유물 이름

## Browser Translation

- Target platform: 단일 HTML 브라우저 카드 배틀러
- Control scheme: 마우스 중심 + `1-5` 카드 사용 + `E` 턴 종료
- Session length: 6분 내외
- Visual direction: 타버린 양피지와 붉은 인장 분위기의 단일 화면 러닝 UI

## Naming Directions

- Candidate 1: `Hexfall March`
- Candidate 2: `Ash Ledger`
- Candidate 3: `Ruin Cadence`

## Recommended Direction

`Hexfall March`를 추천한다.

- `Hexfall`이 저주, 몰락, 카드식 전술의 분위기를 함께 준다.
- `March`가 루트 진행과 긴장된 전진 감각을 짧게 전달한다.
- 원작의 등반 리듬은 남기되 `Spire`, `Slay`, `Ascend` 같은 직접적 단어를 피한다.

## Risks

- Production risk: 카드, 적, 노드, 업그레이드를 동시에 늘리면 범위가 빠르게 커진다.
- UX risk: 상태이상과 키워드가 많아지면 첫 판 이해가 급격히 어려워진다.
- IP risk: 탑 등반, 유물명, 카드 명명 방식, 적 실루엣을 원작에 너무 가깝게 두면 안 된다.

## Go / No-Go

- Verdict: `Go`
- Reason: `적 의도 읽기 + 짧은 경로 선택 + 전투 후 카드 1장 보상`만 남겨도 원작의 전략적 쾌감을 충분히 전달할 수 있고, DOM 기반 단일 화면 프로토타입으로 범위를 닫기 좋다.

## Source Notes

2026-03-20 기준 Steam 공개 설명에서는 `Slay the Spire 2`를 새 카드/유물/포션, 매번 달라지는 등반, 복수 캐릭터, 최대 4인 협동을 갖춘 덱빌딩 로그라이트로 소개한다. 이번 문서는 그 전체 구조를 복제하지 않고, 브라우저 MVP에 맞게 `6단계 러닝 + 단일 적 카드 전투 + 제한된 보상 카드 풀`로 강하게 축소하는 전제를 둔다.

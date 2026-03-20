# TODO - Hexfall March

## Current Task

- [x] 원작 분석: `Slay the Spire 2`에서 브라우저에 남길 핵심 루프를 2개 안으로 줄인다.
- [x] 설계 확정: `Hexfall March` 콘셉트, 루트 구조, 카드 전투 범위, 조작을 문서로 고정한다.
- [x] 화면 구조: 타이틀, 메인 러닝, 결과 화면을 만든다.
- [x] 경로 시스템 구현: 단계별 노드 선택과 휴식/대장간 분기를 구현한다.
- [x] 전투 시스템 구현: 카드 드로우, 에너지, 블록, 적 의도, 턴 전환을 구현한다.
- [x] 콘텐츠 구현: 기본 카드, 보상 카드, 적 4종, 유물, 카드 업그레이드를 넣는다.
- [x] 연출 구현: 카드/의도/피격/보상 선택 피드백과 반응형 UI를 다듬는다.
- [x] 검증: 문법 체크와 스모크 검증을 실행한다.
- [x] 리뷰 정리: 구현 결과, 검증 명령, 남은 리스크를 기록한다.

## Review

- `docs/games/hexfall-march-source-analysis.md`, `docs/games/hexfall-march-design.md`를 새로 만들어 `Slay the Spire 2`에서 유지할 축을 `적 의도 읽기 + 짧은 경로 선택 + 전투 후 카드 보상`으로 고정했다.
- 작업 기록은 공용 `tasks/todo.md`를 재사용하지 않고 `tasks/todo-hexfall-march.md`로 분리해 slug 기준 관리 원칙을 지켰다.
- 구현은 `playables/hexfall-march/` 아래 `index.html`, `styles.css`, `game.js`, `tools/hexfall-march-smoke.mjs` 구조로 추가했다.
- UI는 타이틀, 단일 러닝 화면, 결과 화면 3스크린으로 구성했고, 메인 러닝은 `좌측 루트/유물`, `중앙 스테이지`, `우측 덱/인텔/로그`, `하단 손패` 레이아웃으로 잡았다.
- 경로는 `Skirmish -> Rest/Forge -> Skirmish/Elite -> Skirmish/Forge -> Rest/Elite -> Boss` 6단계 고정 트랙으로 구현했다.
- 전투는 손패 5장, 에너지 3, 블록, Strength, Expose, 적 intent 순환을 갖는 단일 적 턴제 카드 전투로 구현했다.
- 콘텐츠는 기본 카드 4종, 보상 카드 8종, 적 5종 정의, 유물 4종, 휴식 2선택, 카드 강화 흐름을 넣었다.
- `playables/hexfall-march/game.js`는 순수 로직을 `module.exports`로 내보내고, 브라우저 환경에서는 DOM 렌더와 이벤트 위임만 얹는 구조로 분리했다.
- 검증은 `node --check playables/hexfall-march/game.js`, `node --check playables/hexfall-march/tools/hexfall-march-smoke.mjs`, `node playables/hexfall-march/tools/hexfall-march-smoke.mjs`로 마쳤다.
- 스모크에서는 starter deck, 보상 카드 생성, 강화 처리, 첫 전투 승리 후 reward 전이, 휴식 전이, 엘리트 승리 후 유물 획득까지 확인했다.
- 후속 수정으로 `playables/hexfall-march/styles.css`의 `.screen.hidden`에 `display: none !important;`를 적용해 `#title-screen`, `#result-screen`, `#game-screen`의 개별 `display` 규칙보다 숨김 상태가 우선하도록 고쳤다.
- 추가 수정으로 손패 섹션을 중앙 `panel--center` 안으로 옮기고 카드 높이를 줄여, 데스크톱 한 화면에서 적 의도와 손패가 동시에 보이도록 레이아웃을 다시 잡았다.
- 추가 수정으로 `body`의 전역 스크롤 잠금을 풀고 `overflow-y: auto`로 바꿔, 레이아웃이 높이를 넘겨도 아래쪽 전투 UI에 접근 가능하도록 했다.
- 이번 UI 개선에서는 타이틀에 `3단계 플레이 흐름`을 추가하고, 게임 화면에는 phase별 코치 패널, route 보상 칩, 전투용 `Incoming/Need Block` 보조 수치, 손패 범례와 카드 효과 요약을 넣어 `지금 뭘 해야 하는지`가 바로 읽히게 바꿨다.
- 이번 전장형 재구성에서는 첨부한 STS 전투/상점/강화 화면을 참고해 `좁은 상단 HUD`, `중앙 좌우 전장`, `체력바와 intent가 붙은 적 표현`, `부채꼴 손패`, `보조 정보 패널` 조합으로 메인 레이아웃을 다시 잡았다.
- 후속 압축 단계에서는 `#game-screen`을 데스크톱 뷰포트 높이에 고정하고, 좌우 패널을 내부 스크롤 레일로 바꿔 페이지 전체가 길어지지 않도록 다시 정리했다.
- 같은 수정에서 큰 코치 카드는 얇은 `coach strip`으로 축소했고, route/relic/deck/intel/log는 긴 설명문 대신 상태 칩과 짧은 행 리스트 위주로 바꿔 텍스트 밀도를 낮췄다.
- 전투 카드도 효과 칩과 상태 문장을 중복 노출하지 않도록 줄이고, 적 설명 문단을 제거해 전장 실루엣과 intent, 체력바, 손패가 먼저 읽히게 조정했다.
- 추가 후속 수정으로 상단 HUD의 `Piles`, `Intent` 칩이 `span 2` 때문에 두 줄로 내려가던 문제를 없앴다. 이제 상단 바는 데스크톱에서 6칸 한 줄, 모바일에서는 한 칸 스택으로만 동작해 중앙 전장 스크롤을 덜 만든다.
- 이번 씬 재구성에서는 좌우 패널을 기본 화면에서 제거하고, 중앙 전장을 메인 씬으로 키운 뒤 `route / reward / rest / forge`를 전투 위에 뜨는 오버레이 모달로 분리했다. 전투는 전장과 손패만 남고, 선택은 끝나면 다시 씬으로 돌아오는 흐름으로 바뀌었다.
- 이번 UI/UX 정제 단계에서는 전투 씬 안에 별도 `battlefield HUD`를 넣어 장면 안에서 필요한 정보만 읽히게 했고, route/reward/rest/forge는 각각 배너와 색조가 다른 인터스티셜 모달처럼 보이도록 전용 스타일을 추가했다.
- 오버레이는 CSS-only `modal-rise`와 fade로만 움직이게 해 과한 웹 전환 없이도 게임 화면 전환처럼 느껴지게 조정했다.
- 검증은 수정 후 다시 `node --check playables/hexfall-march/game.js`와 `node playables/hexfall-march/tools/hexfall-march-smoke.mjs`로 통과했다.
- 남은 리스크는 실제 브라우저 플레이 기준 밸런스와 UI 가독성을 손으로 아직 검증하지 못했다는 점이다. 현재 검증은 문법과 헤드리스 전이 확인까지만 보장한다.

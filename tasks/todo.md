# TODO

## GitHub Pages Task

- [x] 배포 방식 확정: GitHub Pages에서 루트 허브와 `playables/`를 어떤 방식으로 공개할지 정한다.
- [x] 자동 배포 구성: 기본 브랜치 푸시 시 Pages로 배포되는 GitHub Actions 워크플로우를 추가한다.
- [x] 배포 범위 정리: 공개할 정적 파일만 아티팩트에 포함되게 구성한다.
- [x] 검증: 워크플로우 YAML과 배포 대상 구조를 점검한다.
- [x] 리뷰 기록: 실제 배포 전제와 사용자 후속 작업을 정리한다.

### GitHub Pages Review

- [deploy-pages.yml](/Users/seren.kim/work_personal/poong_game/.github/workflows/deploy-pages.yml#L1)을 추가해 `main` 브랜치 push 또는 수동 실행 시 GitHub Pages 배포가 돌도록 구성했다.
- 배포 아티팩트는 루트 [index.html](/Users/seren.kim/work_personal/poong_game/index.html#L1)과 `playables/`만 포함하고, `tasks/`, `docs/` 같은 작업 파일은 공개 페이지에 실리지 않게 분리했다.
- 산출물 생성 단계에서 `.DS_Store`를 제거하고 `.nojekyll`을 추가해 정적 파일만 깔끔하게 올라가게 했다.
- 로컬 검증은 Ruby YAML 파싱으로 워크플로우 문법을 확인했고, 임시 `dist` 생성으로 최종 공개 파일 목록이 `index.html`과 각 게임의 `index.html`/`styles.css`/`game.js`만 남는 것을 확인했다.
- 실제 공개 URL은 프로젝트 Pages 기준으로 `https://serendip811.github.io/poong-game/`가 된다. GitHub 저장소 설정에서 Pages Source를 `GitHub Actions`로 한 번 지정해야 첫 배포가 정상 반영된다.

## Hub Landing Task

- [x] 엔트리 확인: 루트 허브에서 연결할 현재 플레이어블 목록과 상대 경로를 확정한다.
- [x] 허브 구현: 루트 `index.html`에 게임 허브/홈 역할의 랜딩 페이지를 만든다.
- [x] 링크 연결: 각 게임 소개 카드와 진입 링크를 연결한다.
- [x] 검증: 문서 구조와 각 링크 대상 파일 존재 여부를 확인한다.
- [x] 리뷰 기록: 이번 허브 페이지 작업 결과와 확인 내용을 정리한다.

### Hub Landing Review

- 루트 [index.html](/Users/seren.kim/work_personal/poong_game/index.html#L1)에 `Poong Game Hub` 랜딩 페이지를 새로 만들고, 현재 플레이 가능한 4개 프로토타입을 카드형 링크로 연결했다.
- 카드마다 장르, 한 줄 설명, 대표 조작을 붙여 허브에서 바로 성격이 읽히게 했고, 링크는 모두 `./playables/<slug>/index.html` 상대 경로로 통일했다.
- 검증은 `perl` 추출 + 파일 존재 확인으로 `./playables/cinder-circuit/index.html`, `./playables/deadstock-depot/index.html`, `./playables/deadstock-depot-canvas/index.html`, `./playables/hexfall-march/index.html` 4개 링크가 모두 실제 파일로 이어지는 것을 확인했다.

## Current Task

- [x] 구현 계획: `Deadstock Depot` 프로토타입의 범위와 파일 구조를 확정한다.
- [x] 화면 골격: 타이틀, 메인 게임, 업그레이드, 결과 화면을 만든다.
- [x] 스타일링: 포스트아포칼립스 마트 분위기의 반응형 UI를 만든다.
- [x] 시스템 구현: 재고 구매, 판매, 불만도, 밤 방어, 3일 승패 루프를 구현한다.
- [x] 밸런스 구현: 판매 성과가 밤 난이도와 업그레이드 가치에 반영되게 만든다.
- [x] 검증: 스크립트 문법과 기본 실행 경로를 점검한다.
- [x] 난이도 분석: 현재 난이도 수치와 상태 전이를 정리한다.
- [x] 난이도 검증: 봇 시뮬레이션으로 승률과 막히는 구간을 확인한다.
- [x] 난이도 조정: 지나치게 쉬운 구간이나 과한 구간이 있으면 보정한다.
- [x] 리뷰 정리: 현재 난이도 평가와 다음 조정 포인트를 기록한다.
- [x] 입력 버그 분석: 밤 공격 클릭이 왜 먹지 않는지 원인을 특정한다.
- [x] 입력 버그 수정: 좀비 공격 입력이 안정적으로 동작하게 고친다.
- [x] 교훈 기록: 실제 상호작용 버그 재발 방지 규칙을 남긴다.
- [x] 검증: 수정 후 문법과 입력 경로를 다시 점검한다.
- [x] 다국어 설계: 한/영 전환 구조와 기본 언어 결정 규칙을 정리한다.
- [x] 언어 감지 구현: 브라우저 언어와 지역을 기준으로 초기 언어를 잡는다.
- [x] 언어 토글 구현: 사용자가 한글/영문을 즉시 바꿀 수 있게 만든다.
- [x] 문자열 치환: 정적/동적 UI 문자열을 사전 기반으로 교체한다.
- [x] 검증: 문법 확인과 로케일 동작 점검을 마친다.
- [x] 인트로 설계: 게임 시작 전 세계관 설명과 몰입 흐름을 정리한다.
- [x] 피드백 설계: 구매/판매/공격/피격 순간의 화면 리액션 규칙을 정리한다.
- [x] 난이도 재설계: 레벨 수 확장과 곡선 조정 기준을 정리한다.
- [x] 인트로 구현: 시작 연출과 안내 UI를 게임 흐름에 연결한다.
- [x] 리액션 구현: 상호작용별 시각 효과와 상태 피드백을 추가한다.
- [x] 밸런스 구현: 확장된 일차/밤 구성을 반영한다.
- [x] 검증: 시뮬레이션과 문법 확인으로 변경 효과를 점검한다.
- [x] 균형 보조: 현재 3일차 수치를 바탕으로 확장용 시뮬레이션 보조 파일을 만든다.
- [x] 균형 추천: 4-6일차 권장 난이도 테이블과 확장 기준을 확정한다.
- [x] 균형 검증: 보조 파일 실행 결과를 기록한다.
- [x] 교훈 반영: 휴리스틱 난이도 평가가 놓친 빈틈을 정리한다.
- [x] 시뮬레이터 설계: 실제 밤 전투 규칙을 재사용하는 헤드리스 검증 방식을 정한다.
- [x] 시뮬레이터 구현: `공격만`을 포함한 정책 비교 스크립트를 만든다.
- [x] 난이도 분석: 정책별 생존율과 무너지는 구간을 수치로 확인한다.
- [x] 결과 정리: 현재 난이도 문제와 다음 조정 방향을 기록한다.
- [x] 검증: 시뮬레이터 문법과 샘플 실행 결과를 확인한다.
- [x] 기준선 확인: 현재 수치에서 `공격만`과 정상 플레이 정책 차이를 다시 확인한다.
- [x] 밸런스 패치: 초중반 방어를 너무 쉽게 만드는 전투/웨이브 수치를 조정한다.
- [x] 재검증: 정책 시뮬레이터로 패치 전후 승률 변화를 비교한다.
- [x] 결과 기록: 이번 밸런스 패치의 효과와 남은 리스크를 정리한다.
- [x] 이펙트 점검: 공격 시 피드백이 실제로 보이지 않는 원인을 특정한다.
- [x] 원인 추적: `setZombieFeedback`, `setLaneFeedback`, 렌더 타이밍, CSS 애니메이션, DOM 교체 구조를 확인한다.
- [x] 개선안 정리: 코드 수정 없이 가장 가능성 높은 원인과 최소 수정안을 파일/라인 기준으로 정리한다.
- [x] 가변 수치 설계: 손님별 인내 시간과 압박 변동 폭을 가볍게 섞는 규칙을 정한다.
- [x] 스테이지 통합 설계: 판매/야간 영역을 한 컨테이너로 합치는 구조를 정리한다.
- [x] UI/로직 패치: 이펙트, 가변 수치, 공용 스테이지 변경을 반영한다.
- [x] 검증: 문법과 시뮬레이션, 렌더 경로를 다시 점검한다.
- [x] 결과 기록: 이번 UI/시스템 패치 결과를 정리한다.
- [x] 번역 점검: 한글 기본 카피를 전반적으로 읽고 번역투나 어색한 표현을 찾는다.
- [x] 카피 다듬기: 타이틀, 브리핑, HUD, 로그, 아이템/업그레이드 설명을 자연스럽게 수정한다.
- [x] 검증: 문자열 수정 후 스크립트 문법과 주요 문구 반영 위치를 확인한다.
- [x] 2차 카피 점검: 사용자가 지적한 어색한 문장 톤을 다시 훑고 비슷한 표현을 함께 정리한다.
- [x] 확장 방향 정리: 일차별 품목 확장 목표와 현재 한계를 문서 관점에서 정리한다.
- [x] 시스템 설계: 손님 타입, 주문 규칙, 수요 확장 규칙을 구현 가능한 수준으로 구체화한다.
- [x] UI 반영안 정리: 현재 화면 구조에서 무엇을 어떻게 바꿀지 문서로 정리한다.
- [x] 결과 기록: 다음 턴 구현 기준으로 쓸 수 있게 설계 결과를 남긴다.
- [x] 판매 확장 구조 파악: 현재 아이템/손님/주문/렌더 경로에서 어디를 바꿔야 하는지 정리한다.
- [x] 데이터 확장: 신규 품목, 해금일, 손님 타입, 주문 규칙 데이터를 추가한다.
- [x] 판매 로직 확장: 부분 충족, 복합 주문, 타입별 보정이 동작하게 만든다.
- [x] UI 확장: 판매 화면과 상품 패널을 새 주문 구조에 맞게 바꾼다.
- [x] 입력 확장: 숫자키와 클릭 판매를 확장된 품목/주문 구조에 맞춘다.
- [x] 검증: 문법과 헤드리스 스모크 테스트로 새 판매 루프를 확인한다.
- [x] 결과 기록: 구현 결과와 남은 리스크를 정리한다.
- [x] 레이아웃 진단: 데스크톱 한 화면 기준으로 어떤 패널이 높이와 폭을 과도하게 먹는지 정리한다.
- [x] 뼈대 재배치: 상단 HUD와 3컬럼 게임 영역이 한 화면 안에서 접히지 않도록 레이아웃을 다시 잡는다.
- [x] 선반 압축: 좌측 상품 카드를 덜 깨져 보이게 정리하고 카드 밀도를 줄인다.
- [x] 로그 재설계: 이벤트 로그를 별도 큰 섹션 대신 즉시 읽히는 압축형 영역으로 바꾼다.
- [x] 보조 패널 정리: 우측 행동/업그레이드/단축키 영역을 과하게 길어지지 않게 압축한다.
- [x] 검증 및 기록: 문법 확인과 작업 기록, 교훈 업데이트를 마친다.
- [x] 텍스트 밀도 진단: 준비 페이즈 기준으로 어떤 문장들이 중복되고 화면을 시끄럽게 만드는지 정리한다.
- [x] 선반/상황판 단순화: 좌측 상품 카드와 중앙 준비 화면을 숫자/상태 위주로 다시 묶는다.
- [x] 보조 패널 감축: 우측 인텔, 업그레이드 빈 상태, 로그 개수를 줄여 화면 잡음을 줄인다.
- [x] 검증 및 기록: 문법 확인과 헤드리스 스모크 테스트로 텍스트 감축 결과를 확인한다.
- [x] 선반 구조 재점검: 좌측 판매 선반이 왜 여전히 세로로 긴지 마크업 기준으로 다시 확인한다.
- [x] 선반 리스트화: 상품 카드를 행(row) 중심 컴팩트 리스트로 재구성한다.
- [x] 스타일 재정리: 행 리스트 기준으로 버튼/가격/재고 배치를 다시 조정한다.
- [x] 검증 및 기록: 선반 높이 개선용 스모크 테스트와 기록 정리를 마친다.
- [x] 최종 단순화: 판매선반을 한눈형 리스트로 더 줄이고, 이벤트 로그를 텍스트 로그 스트림으로 바꾼다.
- [x] 검증 및 기록: 선반/로그 단순화 결과를 다시 확인하고 작업 기록을 마친다.
- [x] 포팅 근거 확인: `The Walking Trade` 공개 자료 기준으로 Canvas 2D 창고 방어 포팅의 근거를 다시 정리한다.
- [x] 포팅 문서 작성: `Deadstock Depot`의 Canvas 2D 창고 지키기 버전 설계 문서를 작성한다.
- [x] 문서 연결: 기존 설계 문서에서 새 포팅 문서를 바로 찾을 수 있게 연결한다.
- [x] 결과 기록: 다음 구현 턴에서 바로 시작할 수 있게 문서화 결과를 남긴다.

## Analysis Task

- [x] 구조 파악: `playables/deadstock-depot/game.js`에서 손님 인내 시간과 판매 실패 압박 흐름을 추적한다.
- [x] 시뮬레이터 확인: 난이도/정책 시뮬레이터가 관련 상수를 어떻게 쓰는지 점검한다.
- [x] 설계 제안: 사람마다 조금씩 다른 인내 시간과 압박 증가량을 넣는 최소 설계를 정리한다.
- [x] 영향 분석: 기존 밸런스와 시뮬레이터 조정 포인트를 함께 정리한다.

## Playable Pattern Analysis

- [x] 파일 구조 비교: `playables/cinder-circuit/*`, `playables/deadstock-depot/*`의 공통 파일과 도구 구성을 정리한다.
- [x] HTML 뼈대 비교: 새 게임에서 재사용할 수 있는 DOM 셸과 ID 패턴을 추린다.
- [x] `game.js` 흐름 비교: 상태 초기화, 입력 연결, 업데이트/렌더 루프, 공개 API 패턴을 정리한다.
- [x] 도구 패턴 비교: 스모크 테스트와 헤드리스 검증 스크립트 구조를 요약한다.
- [x] 리뷰 기록: 핵심 차이, 추천 starting point, 주의점을 남긴다.

### Playable Pattern Review

- 공통 starting point는 `index.html` + `styles.css` + `game.js` + `tools/`의 자기완결 playable 디렉터리다.
- `Cinder Circuit`는 순수 로직 export와 브라우저 부트를 한 파일에서 분리해, 새 게임의 최소 시작점으로 가장 재사용성이 높다.
- `Deadstock Depot`는 다중 페이즈 DOM 렌더, i18n, 모달, 헤드리스 시뮬레이터까지 포함해 확장형 starting point로 적합하다.
- 도구 패턴은 처음엔 `Cinder Circuit`식 단일 `smoke.mjs`, 복잡해지면 `Deadstock Depot`식 정책/난이도 시뮬레이터를 추가하는 순서가 가장 자연스럽다.

## Review

- 타이틀 화면에 세계관 카피와 `야간 교대 브리핑` 모달을 추가해 첫 진입 시 상황 설명, 낮 규칙, 밤 비용을 3장 카드로 전달하게 했다.
- 구매, 판매, 공격, 처치, 피격, 창문 수리, 플래시 사용에 맞춰 카드 펄스, 버스트 텍스트, 화면 플래시, HUD 흔들림 등 상태 기반 리액션을 넣었다.
- 캠페인은 3일에서 6일로 확장했고, 현재 후반 곡선은 `Day 4: 56s sale / 31s defense / 14 quota`, `Day 5: 60s sale / 33s defense / 18 quota`, `Day 6: 64s sale / 35s defense / 22 quota`로 잡았다.
- 별도 보조 파일 [deadstock-depot-difficulty-sim.mjs](/Users/seren.kim/work_personal/poong_game/playables/deadstock-depot/tools/deadstock-depot-difficulty-sim.mjs#L1)로 현재 설정을 읽어 확장 일차 난이도 지수를 출력하게 했다.
- 새 파일 [deadstock-depot-policy-sim.mjs](/Users/seren.kim/work_personal/poong_game/playables/deadstock-depot/tools/deadstock-depot-policy-sim.mjs#L1)로 `game.js`를 Node `vm`에 그대로 올리고, `Idle`, `Attack Only`, `Balanced` 정책을 실제 밤 전투 규칙 위에서 돌릴 수 있게 했다.
- 패치에서는 기본 전투 자원을 `maxEnergy 3.5`, `energyRegenRate 0.85`, `attackCooldownBase 0.54`로 낮추고, 일차별 웨이브를 `7 / 9 / 12 / 14 / 18 / 22 quota`로 다시 배치했다.
- 또 좀비 강화는 `Day 5+`부터만 붙게 옮겨서, Day 3-4에서 무조건 막히지는 않되 Day 5부터는 확실히 후반 압박이 오도록 조정했다.
- 패치 후 정책 시뮬레이터 기준 `Complaint 25`에서 `Attack Only` 승률은 `Day 1 100%`, `Day 2 100%`, `Day 3 35.6%`, `Day 4 14.4%`, `Day 5 0%`, `Day 6 0%`가 됐다.
- 추가로 `Complaint 0` 기준 `Attack Only` 승률은 `Day 3 89.2%`, `Day 4 45.0%`, `Day 6 0%`이고, 즉석 `수리+공격+플래시` 정책으로는 `Day 3 67/100`, `Day 4 25/100` 생존이 나와 `공격만`보다 정상 플레이가 확실히 낫다는 쪽으로 확인됐다.
- 검증은 `node --check playables/deadstock-depot/game.js`, `node --check playables/deadstock-depot/tools/deadstock-depot-policy-sim.mjs`, `node --check playables/deadstock-depot/tools/deadstock-depot-difficulty-sim.mjs`, `node playables/deadstock-depot/tools/deadstock-depot-policy-sim.mjs --days=1,2,3,4,5,6 --complaints=25 --policies=attack-only,balanced --runs=160`, `node playables/deadstock-depot/tools/deadstock-depot-policy-sim.mjs --days=1,3,4,6 --complaints=0,50 --policies=attack-only --runs=120`, `node playables/deadstock-depot/tools/deadstock-depot-difficulty-sim.mjs`, 그리고 Node `vm` 기반 생존 정책 샘플 실행으로 마쳤다.
- 초기 분석에서는 `temperament` 테이블 방식도 검토했지만, 최종 구현은 [game.js](/Users/seren.kim/work_personal/poong_game/playables/deadstock-depot/game.js#L1135)처럼 인내 시간과 압박 프로필을 연속 난수로 주는 쪽이 더 단순하고 평균 밸런스를 덜 흔들었다.
- 이펙트가 안 보인 핵심 원인은 [game.js](/Users/seren.kim/work_personal/poong_game/playables/deadstock-depot/game.js#L1655) 이후 공유 스테이지를 매 프레임 `innerHTML`로 다시 그리는 구조에서, CSS 애니메이션만으로는 공격 피드백이 충분히 남지 못한 데 있었다.
- 특히 처치 시에는 좀비가 즉시 배열에서 빠져 칩 애니메이션에만 의존하면 화면에 거의 남지 않았기 때문에, [game.js](/Users/seren.kim/work_personal/poong_game/playables/deadstock-depot/game.js#L1820)처럼 별도 `zombie-burst` 텍스트를 함께 렌더하는 방식으로 바꿨다.
- 레인 피드백도 [game.js](/Users/seren.kim/work_personal/poong_game/playables/deadstock-depot/game.js#L1434)와 [styles.css](/Users/seren.kim/work_personal/poong_game/playables/deadstock-depot/styles.css#L811)에서 카드/트랙 애니메이션과 숫자 버스트를 같이 쓰게 해, 단일 작은 배지만 뜨던 때보다 타격감이 훨씬 잘 보이게 했다.
- 이번 패치에서는 판매 화면과 야간 레인을 별도 박스로 두지 않고 [index.html](/Users/seren.kim/work_personal/poong_game/playables/deadstock-depot/index.html#L193) `#stage-view` 하나만 남겨, 현재 페이즈에 따라 판매 카드나 방어 레인을 같은 영역에서 교체 렌더하게 바꿨다.
- 공격 피드백은 [game.js](/Users/seren.kim/work_personal/poong_game/playables/deadstock-depot/game.js#L1420) 이후 `lane` 버스트와 `zombie` 버스트를 모두 남기고, [game.js](/Users/seren.kim/work_personal/poong_game/playables/deadstock-depot/game.js#L795) 시간 기반 인라인 모션으로 DOM 재생성 중에도 이펙트가 보이게 바꿨다.
- 손님은 [game.js](/Users/seren.kim/work_personal/poong_game/playables/deadstock-depot/game.js#L1130) 기준으로 인내 시간 편차와 `complaintOnLeave`, `complaintOnMistake`를 각자 다르게 갖게 해, 같은 일차에서도 판매 압박이 조금씩 흔들리게 했다.
- 검증은 `node --check playables/deadstock-depot/game.js`와 Node `vm` 스모크 테스트로 마쳤고, 공유 `stage-view` 렌더, 공격 버스트 마크업, 손님 편차 분포가 모두 확인됐다.
- 이번 번역 다듬기에서는 [game.js](/Users/seren.kim/work_personal/poong_game/playables/deadstock-depot/game.js#L8) 아이템명/설명, [game.js](/Users/seren.kim/work_personal/poong_game/playables/deadstock-depot/game.js#L130) 업그레이드명/설명, [game.js](/Users/seren.kim/work_personal/poong_game/playables/deadstock-depot/game.js#L224) 페이즈명, [game.js](/Users/seren.kim/work_personal/poong_game/playables/deadstock-depot/game.js#L256) 한국어 문자열 사전을 전반적으로 손봐 직역체를 줄이고 한국어 게임 UI 톤으로 정리했다.
- 2차 카피 점검에서는 `무전: 판자부터 대라`, `빈 선반과 오배송`, `밤이 더 험해진다`처럼 번역투가 강한 표현을 중심으로 다시 다듬었고, 반대로 `워커 / 러너`처럼 장르에서 익숙한 용어는 유지했다.
- 이번 확장 설계에서는 별도 문서 [deadstock-depot-content-expansion.md](/Users/seren.kim/work_personal/poong_game/docs/games/deadstock-depot-content-expansion.md#L1)로 `일차별 품목 확장`, `손님 타입 + 주문 규칙 분리`, `현재 3패널 UI에 얹는 반영안`, `다음 턴 구현 체크리스트`를 정리했다.
- 이번 구현에서는 [game.js](/Users/seren.kim/work_personal/poong_game/playables/deadstock-depot/game.js#L5)에서 품목을 8종으로 늘리고 `unlockDay`, `demandByDay`, `rarity`, `tags`를 붙여 Day 진행에 따라 판매 풀이 넓어지게 했다.
- 손님은 [game.js](/Users/seren.kim/work_personal/poong_game/playables/deadstock-depot/game.js#L280) `CUSTOMER_TYPES`와 [game.js](/Users/seren.kim/work_personal/poong_game/playables/deadstock-depot/game.js#L335) `ORDER_RULES`를 분리해, 같은 날에도 `성급한 손님 + 선택 주문`, `단골 + 묶음 주문` 같은 조합이 나오게 만들었다.
- 판매 판정은 [game.js](/Users/seren.kim/work_personal/poong_game/playables/deadstock-depot/game.js#L1652) 이후 `orderSlots` 기반으로 바꿔, 복합 주문의 부분 충족과 완료 보너스, 예약 재고 계산, 오판매 실패 처리가 한 흐름에서 동작하게 정리했다.
- UI는 [game.js](/Users/seren.kim/work_personal/poong_game/playables/deadstock-depot/game.js#L2082)와 [styles.css](/Users/seren.kim/work_personal/poong_game/playables/deadstock-depot/styles.css#L519) 기준으로 해금 전 상품 카드, `1-8` 키 배지, 손님 타입/주문 규칙 배지, 진행도, 주문 칩을 보여주도록 확장했다.
- 검증은 `node --check playables/deadstock-depot/game.js`, `node --check playables/deadstock-depot/tools/deadstock-depot-policy-sim.mjs`, `node --check playables/deadstock-depot/tools/deadstock-depot-difficulty-sim.mjs`, 그리고 Node `vm` 스모크 테스트로 `Day 1/5 해금 품목`, `bundle_two 부분 판매`, `진행도 UI`, `판매 정보 카드` 렌더까지 확인했다.
- 이번 UI 정리에서는 [styles.css](/Users/seren.kim/work_personal/poong_game/playables/deadstock-depot/styles.css#L498) 기준으로 데스크톱 레이아웃을 `고정 높이 screen + flex 1 layout + min-height 0 panel` 구조로 바꿔, 페이지 전체가 세로로 늘어나는 대신 각 패널이 화면 안에서 역할을 나눠 갖게 했다.
- 좌측 선반은 [game.js](/Users/seren.kim/work_personal/poong_game/playables/deadstock-depot/game.js#L2082)와 [styles.css](/Users/seren.kim/work_personal/poong_game/playables/deadstock-depot/styles.css#L573)에서 카드 마크업을 압축하고, 키 배지/재고/가격/버튼 우선 순서로 정리해 좁은 폭에서도 덜 깨져 보이게 다듬었다.
- 이벤트 로그와 우측 보조 패널은 [game.js](/Users/seren.kim/work_personal/poong_game/playables/deadstock-depot/game.js#L2372), [game.js](/Users/seren.kim/work_personal/poong_game/playables/deadstock-depot/game.js#L2520), [styles.css](/Users/seren.kim/work_personal/poong_game/playables/deadstock-depot/styles.css#L1057) 기준으로 `최근 3개 로그 스트립`, `판매 중 2열 인텔 카드`, `2열 업그레이드 그리드`로 압축해 한 화면에서 바로 읽히게 했다.
- 검증은 `node --check playables/deadstock-depot/game.js`와 Node `vm` 스모크 테스트로 `item-card__meta--note`, `button--item`, `action-list--intel`, `최근 3개 로그만 렌더`까지 확인했다.
- 이번 감축에서는 [game.js](/Users/seren.kim/work_personal/poong_game/playables/deadstock-depot/game.js#L2082) 상품 카드에서 설명 문장과 부제목을 빼고, 이름/재고/가격/입력만 남겨 좌측 선반을 상태판처럼 읽히게 바꿨다.
- 준비 페이즈 중앙은 [game.js](/Users/seren.kim/work_personal/poong_game/playables/deadstock-depot/game.js#L2177) `renderStockView()`를 새로 두어, 빈 박스 대신 `준비 품목 수`, `Space 시작`, `오늘 해금`, `야간 예상`만 보이는 숫자 중심 보드로 교체했다.
- 우측 패널과 로그는 [game.js](/Users/seren.kim/work_personal/poong_game/playables/deadstock-depot/game.js#L2390) stock 카드 단순화, [game.js](/Users/seren.kim/work_personal/poong_game/playables/deadstock-depot/game.js#L2497) 업그레이드 빈 상태 축약, [game.js](/Users/seren.kim/work_personal/poong_game/playables/deadstock-depot/game.js#L2520) 최근 2개 로그만 렌더하는 방식으로 텍스트 잡음을 더 줄였다.
- 검증은 `node --check playables/deadstock-depot/game.js`와 Node `vm` 스모크 테스트로 `stock-focus` 보드, `Space` 퀵 액션, `item-card` 부제목 제거, `최근 2개 로그만 렌더`까지 확인했다.
- 이번 선반 수정에서는 [game.js](/Users/seren.kim/work_personal/poong_game/playables/deadstock-depot/game.js#L2084) 마크업을 카드형에서 `키 / 이름+재고 / 가격 / 액션` 행 리스트 구조로 바꾸고, [styles.css](/Users/seren.kim/work_personal/poong_game/playables/deadstock-depot/styles.css#L541)와 [styles.css](/Users/seren.kim/work_personal/poong_game/playables/deadstock-depot/styles.css#L573)에서 1열 상품 리스트와 컴팩트 버튼 배치로 재정리했다.
- 잠긴 품목도 긴 버튼 라벨 대신 `잠김 + 해금 태그`만 남겨 세로 높이를 더 줄였고, 선반 스모크 테스트에서는 `item-card--shelf` 행 마크업과 기존 높이 유발 블록 제거까지 확인했다.
- 최종 단순화에서는 [game.js](/Users/seren.kim/work_personal/poong_game/playables/deadstock-depot/game.js#L2084)에서 판매선반을 `이름 / 보유량 / 구·판 가격 / 짧은 액션`만 남기는 쪽으로 더 줄였고, 긴 가격 문구는 `구 2`, `판 5`처럼 짧은 태그로 바꿨다.
- 이벤트 로그는 [game.js](/Users/seren.kim/work_personal/poong_game/playables/deadstock-depot/game.js#L2562)에서 최근 8개를 오래된 순으로 쌓게 바꾸고, [styles.css](/Users/seren.kim/work_personal/poong_game/playables/deadstock-depot/styles.css#L1122)에서 카드형 그리드를 없애고 단순 텍스트 로그 스트림처럼 보이게 바꿨다.
- 검증은 `node --check playables/deadstock-depot/game.js`와 Node `vm` 스모크 테스트로 `구 2/판 5` 축약 태그, 짧은 구매 버튼, 5줄 로그 누적 렌더를 확인했다.
- 이번 포팅 문서는 [deadstock-depot-canvas-port.md](/Users/seren.kim/work_personal/poong_game/docs/games/deadstock-depot-canvas-port.md#L1)에 정리했고, 공개 GDD는 찾지 못한 대신 `Steam 공식 페이지`와 사용자 제공 플레이 영상을 기준으로 `공간 운영 + 직접 방어` 축을 브라우저용으로 재구성했다.
- 핵심 결론은 `버튼 판매 + 3레인 방어`에서 더 가지 말고, `Canvas 2D 창고 맵 + 낮/밤 같은 공간 사용 + 여러 진입점 직접 방어`로 새 프로토타입을 시작하는 편이 원작 인상과 훨씬 가깝다는 점이다.
- 실제 구현 계획과 리뷰는 [todo-deadstock-depot-canvas.md](/Users/seren.kim/work_personal/poong_game/tasks/todo-deadstock-depot-canvas.md#L1)에 분리했고, 새 플레이어블은 [deadstock-depot-canvas/index.html](/Users/seren.kim/work_personal/poong_game/playables/deadstock-depot-canvas/index.html#L1), [deadstock-depot-canvas/styles.css](/Users/seren.kim/work_personal/poong_game/playables/deadstock-depot-canvas/styles.css#L1), [deadstock-depot-canvas/game.js](/Users/seren.kim/work_personal/poong_game/playables/deadstock-depot-canvas/game.js#L1) 기준으로 `같은 창고 맵 공유`, `손님 동선`, `다중 진입점 방어`, `작업대 제작`을 연결했다.

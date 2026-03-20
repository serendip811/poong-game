# Deadstock Depot Canvas TODO

## HUD Redesign

- [x] topbar와 중앙 오버레이를 게임 HUD 톤으로 다시 잡는다.
- [x] 좌측 선반/재고 패널을 레이더형 리스트로 압축한다.
- [x] 우측 작업대/진입점/기록 패널을 command deck처럼 재배치한다.
- [x] 데스크톱 한 화면과 모바일 축소 레이아웃을 다시 확인한다.
- [x] 검증 결과와 UI 변경 요약을 기록한다.

## Plan

- [x] 구현 범위 고정: `deadstock-depot-canvas-port.md` 기준 MVP 범위를 코드 단위로 자른다.
- [x] 플레이어블 골격 작성: `playables/deadstock-depot-canvas/`에 `index.html`, `styles.css`, `game.js`를 만든다.
- [x] 월드 파운데이션 구현: 같은 창고 맵, 플레이어 이동, 충돌, 카메라/Canvas 렌더를 구현한다.
- [x] 낮 루프 구현: 선반, 재고 보충, 가격 단계, 손님 이동, 계산대 줄, 코인 수익을 구현한다.
- [x] 밤 루프 구현: 다중 진입점, 좀비 스폰, 직접 사격/밀치기/수리, 코어 방어를 구현한다.
- [x] 작업대 연결: 낮/밤 모두에서 작업대로 판자/탄약/수리 키트를 만들 수 있게 한다.
- [x] HUD/로그 정리: 한 화면 HUD와 콘솔형 로그를 붙인다.
- [x] 검증 및 기록: 문법 확인과 스모크 테스트, 작업 로그 정리를 마친다.

## Review

- 새 플레이어블은 `playables/deadstock-depot-canvas/` 아래에 만들었고, 기존 DOM 버전은 그대로 남겨 비교 가능하게 했다.
- 이번 MVP는 같은 창고 맵을 낮/밤에 공유하고, 낮에는 `선반 재고 + 가격 단계 + 계산대 줄`, 밤에는 `정문/측문/창문 방어 + 직접 사격 + 판자 보강`이 실제 루프로 이어지게 잡았다.
- 작업대는 낮/밤 모두에서 작동하며 `1 판자`, `2 탄약`, `3 수리 키트` 제작으로 경제와 방어 자원을 직접 연결한다.
- HUD는 상태 수치 위주로 두고, 로그는 카드형 대신 콘솔형 텍스트 스트림으로 정리했다.
- 검증은 `node --check playables/deadstock-depot-canvas/game.js`, `node --check playables/deadstock-depot-canvas/tools/smoke.mjs`, `node playables/deadstock-depot-canvas/tools/smoke.mjs`로 마쳤다.
- 로컬 HTTP 서빙은 샌드박스 포트 바인드 제한으로 실행하지 못했다. 브라우저 실제 플레이 감각은 사용자가 직접 열어 확인해야 한다.
- 후속 크기 보정에서는 `canvas-shell`을 폭 기준 `aspect-ratio`에만 맡기지 않고, [game.js](/Users/seren.kim/work_personal/poong_game/playables/deadstock-depot-canvas/game.js#L1617) `syncCanvasShellSize()`에서 중앙 패널의 실제 가용 폭/높이를 계산해 프레임 크기를 맞추도록 바꿨다.
- 진행 매끄러움 점검에서는 [game.js](/Users/seren.kim/work_personal/poong_game/playables/deadstock-depot-canvas/game.js#L1137) `updateGame()`이 큰 프레임 시간을 `0.05`로 잘라먹고 나머지를 버리던 문제를 찾았고, `advanceGameStep()` 서브스텝 루프로 바꿔 저프레임에서도 게임 시간이 실제처럼 흘러가게 고쳤다.
- 스모크 테스트는 [smoke.mjs](/Users/seren.kim/work_personal/poong_game/playables/deadstock-depot-canvas/tools/smoke.mjs#L1)에 `1초 1회 업데이트`와 `0.05초 20회 업데이트`가 같은 결과를 내는 회귀 검증을 추가했다.
- 추가 헤드리스 시뮬레이션 기준으로 `낮 -> 밤 -> 결과` 진행이 중간에 멈추는 경우는 없었다. 다만 밸런스는 아직 거칠어서 단순 정책은 대부분 Day 1~4에서 죽고, 좀 더 강한 정책도 20회 중 1회만 완주했다.
- 후속 패치에서는 손님이 선반으로 갈 때와 좀비가 창문을 뚫고 코어로 들어올 때 [game.js](/Users/seren.kim/work_personal/poong_game/playables/deadstock-depot-canvas/game.js#L361) 이후 고정 경유점 라우팅을 타게 해, 선반과 카운터를 대각선으로 관통하던 움직임을 줄였다.
- 밤 종료도 [game.js](/Users/seren.kim/work_personal/poong_game/playables/deadstock-depot-canvas/game.js#L1323)에서 `새벽 도달 시 남은 스폰 0 정산`으로 닫아 softlock 가능성을 없앴다.
- 밸런스는 `초반 raidBase 6/8/11/14`, 시작 자원 `판자 5 / 탄약 18 / 수리 키트 2`, 보강량 증가, 사격 대미지 상향으로 다시 잡았다.
- 같은 자동 정책 30회 기준 패치 전에는 거의 완주가 나오지 않았고, 패치 후에는 `19승 11패`, 실패도 대부분 Day 3~4에 몰려 Day 1~2 진행감이 확실히 나아졌다.
- 이번 패치에서는 계산대 처리를 `카운터 근처`만으로 열지 않고, 맨 앞 손님이 실제 프런트 슬롯에 닿았을 때만 `checkout -> paying`으로 넘어가게 바꿨다. 결제 후에는 짧은 정산 딜레이와 퇴장 루트를 둬서 손님이 줄도 안 섰는데 바로 계산되고 사라지는 흐름을 막았다.
- 손님 렌더는 보행 bob, 결제 글로우, 결제 직후 코인 버스트를 붙였고, 좀비 렌더는 피격 플래시와 공격 링, 진입점/코어 타격 시 화면 흔들림까지 추가해 Canvas 전투 피드백을 강화했다.
- 스모크 테스트는 [smoke.mjs](/Users/seren.kim/work_personal/poong_game/playables/deadstock-depot-canvas/tools/smoke.mjs#L1)에 `줄 앞에 아직 도착하지 않은 손님은 결제 진행이 0이어야 한다`는 계산대 회귀 검증을 추가했고, `node --check` 2개와 스모크 실행까지 다시 통과했다.
- 추가 버그 헌트에서는 `줄 순서를 id로만 정렬해서 먼저 도착한 손님이 있어도 나중에 스폰된 손님을 계산할 수 없는 문제`, `queueSpots 4개보다 긴 줄이 마지막 슬롯 하나에 겹쳐 쌓이는 문제`, `낮 종료 시 줄에 남은 손님이 페널티 없이 삭제되는 문제`, `닫힌 진입점을 관통해 바깥 좀비를 사격할 수 있는 문제`를 재현했다.
- 후속 패치에서는 줄 정렬을 `상태 우선순위 + 프런트까지의 실제 거리` 기준으로 바꾸고, 5번째 이후 손님도 별도 큐 슬롯을 쓰도록 동적 queue spot 계산을 넣었다. 또 선반에서 계산대로 올 때는 고정된 마지막 슬롯을 route에 박지 않고, 동적 목표 슬롯을 바라보게 바꿨다.
- 영업 종료는 즉시 `night`로 넘기지 않고 `dayClosing` 상태를 거쳐 남은 손님을 정리한 뒤 밤으로 넘어가게 수정했다. 덕분에 마감 직전 줄/결제 손님이 보상 없이 증발하거나 공짜 판매로 처리되는 흐름을 막았다.
- 야간 탄환은 이제 닫힌 문/창문 rect에 선분 충돌 검사를 하고 멈춘다. 그래서 셔터가 살아 있을 때 안쪽에서 바깥 좀비를 관통 사격하는 문제가 사라졌다.
- 스모크 테스트는 `줄 우선순위`, `긴 줄 분리`, `마감 hold`, `닫힌 정문 바깥 좀비 사격 차단`까지 추가했고, `node --check playables/deadstock-depot-canvas/game.js`, `node --check playables/deadstock-depot-canvas/tools/smoke.mjs`, `node playables/deadstock-depot-canvas/tools/smoke.mjs`를 다시 통과했다.
- 이번 HUD 재설계에서는 topbar를 계기판처럼 묶고, 중앙 오버레이를 하단 정보 띠로 바꿨다. 좌우 패널은 카드형 설명을 줄이고 선반 레일, 제작대, 방어선, 무전 기록처럼 게임 안 장비 패널처럼 읽히게 조정했다.

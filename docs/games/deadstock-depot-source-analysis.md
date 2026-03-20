# Deadstock Depot Source Analysis

## Basic Info

- Working slug: `deadstock-depot`
- Source game title: `The Walking Trade`
- Source links:
  - User-provided YouTube link: `https://www.youtube.com/watch?v=wpedn95rDGQ`
  - Steam page: `https://store.steampowered.com/app/3398110/The_Walking_Trade/`
- Analysis date: `2026-03-19`

## What the Source Appears to Be

- Genre: 좀비 아포칼립스 배경의 상점 운영 + 액션 방어
- Camera: 공개 소개 기준으로는 3D 상점 운영 시점과 직접 전투가 결합된 형태
- Core fantasy: 세상이 망한 뒤에도 장사를 굴리며 살아남는 사장
- Session feel: 운영으로 돈을 벌고, 위기 때는 직접 막아내는 혼합형 루프

## Observable Systems

- 상점 배치와 진열
- 가격 설정과 고객 응대
- 자원 수급과 제작
- 좀비 습격 방어
- 생존자 고용
- 평판 또는 도덕적 선택

## What We Keep

- 메인 판타지: 종말 세계에서 장사와 생존을 동시에 굴리는 감각
- 핵심 루프 1: 제한된 재고를 빠르게 팔아 수익을 만든다
- 핵심 루프 2: 라운드 끝 위협을 버텨 번 돈을 지킨다
- 감정 비트: 낮에는 계산, 밤에는 긴장

## What We Cut

- 자유 배치형 3D 상점 꾸미기
- 복수 직원 관리와 장비 세팅
- 제작 트리와 복잡한 건설 요소
- 도덕 선택 분기와 서사형 평판 구조
- FPS 또는 실시간 자유 조준 전투

## Browser Translation

- Target platform: 단일 HTML 브라우저 게임
- Control scheme: 마우스 중심 + 보조 키보드 단축키
- Session length: 5분 내외
- Visual direction: 탑다운 2D, 러프한 포스트아포칼립스 마트

## Naming Directions

- Candidate 1: `Deadstock Depot`
- Candidate 2: `Aftermart`
- Candidate 3: `Last Light Market`

## Recommended Direction

`Deadstock Depot`를 추천한다.

- `stock`이 재고/장사 느낌을 바로 준다.
- `dead`가 좀비 아포칼립스 정서를 짧게 전달한다.
- 원작 제목 리듬과 장르 감각은 남지만 직접적으로 겹치지 않는다.

## Risks

- Production risk: 운영과 방어를 둘 다 넣다가 범위가 커질 수 있다.
- UX risk: 모드 전환이 많으면 처음 플레이어가 헷갈릴 수 있다.
- IP risk: 제목과 미술, 상품명, 세계관 고유 설정을 지나치게 닮게 만들면 안 된다.

## Go / No-Go

- Verdict: `Go`
- Reason: 상점 운영과 좀비 방어의 대비가 강한 훅이라 브라우저용 미니게임으로 재구성 가치가 높다. 단, 구현은 `운영 1개 + 방어 1개`로 강하게 줄여야 한다.

## Source Notes

Steam 공개 설명 기준으로 2026-03-19 시점 `The Walking Trade`는 상점 운영, 가격/진열, 생존자 활용, 제작, 좀비 방어를 결합한 게임으로 소개된다. 유저가 준 유튜브 링크는 실제 플레이 참고 소스로 취급하되, 이번 문서는 직접 복제보다 핵심 루프 추출을 우선했다.

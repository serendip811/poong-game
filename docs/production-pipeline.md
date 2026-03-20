# HTML Game Production Pipeline

이 저장소의 기본 생산 방식은 `유튜브 링크 기반 원작 분석 -> 단순화 설계 -> HTML 구현 -> 업로드`다.

## 목표

- 유튜브에서 본 게임의 판타지와 핵심 재미를 빠르게 추출한다.
- 브라우저에서 완성 가능한 크기로 줄인다.
- 문서 기반으로 구현해서 게임을 여러 개 연속 생산할 수 있게 한다.

## Step 1. Source Analysis + Design Lock

이 단계가 끝나면 구현을 시작할 수 있어야 한다.

### 입력값

- 유튜브 링크 1개 이상
- 원작 게임 제목
- 원하는 플레이 타임
- 플랫폼 제약: 단일 HTML 게임, 마우스/키보드, 세로 또는 가로

### 산출물

- `docs/games/<slug>-source-analysis.md`
- `docs/games/<slug>-design.md`

### 해야 할 일

1. 원작에서 보이는 요소를 전부 적는다.
2. 그중 브라우저에서 살릴 핵심 1~2개만 남긴다.
3. 버려야 할 시스템을 명시한다.
4. 제목 후보를 만든다.
5. 시각 콘셉트와 조작 방식을 고정한다.
6. 구현 범위를 MVP 기준으로 닫는다.

### 판단 기준

- 한 판이 3분에서 8분 안에 끝나야 한다.
- 플레이어가 첫 10초 안에 무엇을 해야 하는지 이해할 수 있어야 한다.
- 원작의 감정은 남기되 시스템 수는 줄여야 한다.
- 아트, 이름, 고유 설정은 직접 복제하지 않는다.

## Step 2. Implementation

설계 문서를 기준으로 실제 HTML 게임을 만든다.

### 구현 규칙

- 한 게임은 가능한 한 `index.html`, `styles.css`, `game.js`로 끝낸다.
- 외부 의존성은 기본적으로 쓰지 않는다.
- 첫 버전은 저장 기능보다 게임성 완주를 우선한다.
- 시각 효과보다 루프 완성도를 먼저 맞춘다.

### 완료 조건

- 시작, 플레이, 종료가 끊기지 않는다.
- 승리 또는 패배 상태가 존재한다.
- 최소 1개의 재시작 흐름이 있다.
- 설계 문서의 핵심 루프가 실제로 돌아간다.

## Step 3. QA + Upload Prep

### 체크리스트

- 첫 판에서 규칙을 이해할 수 있는가
- 입력 지연이나 오작동이 없는가
- 모바일 폭에서도 UI가 깨지지 않는가
- 제목, 설명, 썸네일 문구가 원작과 너무 닮지 않았는가

## Naming Rules

원작 느낌은 남기되, 제목과 브랜딩은 분명히 바꾼다.

- 같은 핵심 명사를 그대로 반복하지 않는다.
- 리듬이나 장르 감각만 참고한다.
- 두 단어 또는 세 단어 조합으로 짧고 기억되게 만든다.
- 직접적인 시리즈물처럼 보이는 접두사, 번호, 부제는 피한다.

### 예시

- `The Walking Trade` -> `Deadstock Depot`
- `The Walking Trade` -> `Last Light Market`
- `The Walking Trade` -> `Aftermart`

## Simplification Heuristics

빨리 많이 만들려면 이 원칙을 지킨다.

- 원작 핵심 루프는 최대 2개만 유지한다.
- 자원 종류는 4개에서 8개 사이로 제한한다.
- 맵은 단일 화면 또는 2개 화면 안에서 해결한다.
- NPC 역할은 2종류를 넘기지 않는다.
- 업그레이드는 3단계 정도로 고정한다.

## Recommended Folder Pattern

```text
docs/
  production-pipeline.md
  templates/
    source-analysis-template.md
    game-design-template.md
  games/
    <slug>-source-analysis.md
    <slug>-design.md
```

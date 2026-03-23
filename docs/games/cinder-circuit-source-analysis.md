# Cinder Circuit Source Analysis

## Basic Info

- Working slug: `cinder-circuit`
- Source game title: `Grind Survivors`
- Source links:
  - User-provided YouTube link: `https://www.youtube.com/watch?v=YU3OxYjZNLw`
  - Steam page: `https://store.steampowered.com/app/3816930/Grind_Survivors/`
- Analysis date: `2026-03-20`

## What the Source Appears to Be

- Genre: 탑다운 액션 로그라이트 + 서바이버 슈터
- Camera: 상단 시점 기반의 고밀도 전투 화면
- Core fantasy: 악마 무리를 피해 다니며 무기를 주워 조합하고, 점점 터지는 빌드를 만든다.
- Session feel: 끊임없이 움직이며 회피하고, 드랍과 강화 선택으로 몇 웨이브 뒤의 더 큰 형태를 기대하게 만드는 고압 루프

## Observable Systems

- 대량 적 웨이브와 탄막 회피
- 무기 드랍 또는 랜덤 특성 조합
- 포지 또는 강화 구간에서의 빌드 개조
- 점점 심해지는 적 조합과 생존 압박
- 반복 플레이를 전제로 한 짧은 러닝 구조

## What We Keep

- Mechanic: 이동과 회피가 계속 중요한 단일 아레나 생존 전투
- Mechanic: 웨이브 중 수집한 무기 코어를 다음 강화 구간에서 반영하는 흐름
- Mechanic: 짧은 선택으로 무기 성격이 분명히 달라지는 빌드 강화
- Emotional beat: 초반에는 버티고, 중반에는 ownership을 배우고, 후반에는 새 form이 arena를 찢는 감각

## What We Cut

- Cut: 복수 바이옴 이동
- Cut: 완전한 랜덤 무기 파츠 조합과 장비 인벤토리
- Cut: 무한 모드와 메타 진행
- Cut: 고어 중심 연출과 복잡한 보스 패턴
- Cut: 3D 연출 또는 다중 카메라 씬 구성

## Browser Translation

- Target platform: 브라우저 기반 단일 페이지 액션 게임
- Control scheme: `WASD` 이동 + 마우스 조준 + `Space` 대시 + `1/2/3` 포지 선택
- Session length: `12웨이브`, `12~15분` 내외
- Visual direction: 불타는 회로/제련소 분위기의 2D 캔버스 아레나

## Run Contract

- 기준 러닝: `Wave 1-4 / Wave 5-8 / Wave 9-12`의 세 시대 계약
- 각 시대 약속: `Headline Form` 하나, `Survival Rider` 하나, 직후 전투의 `Proof Window` 하나
- 목표 리듬: 초반 생존 학습 -> 중반 ownership 확장 -> 후반 payoff band와 spike band로 마감
- 장기 확장 방향: 이 12-wave spine이 먼저 반복 플레이 가능한지 증명한 뒤 `20-30웨이브` 구조로 늘린다

## Naming Directions

- Candidate 1: `Cinder Circuit`
- Candidate 2: `Ash Relay`
- Candidate 3: `Overheat Rite`

## Recommended Direction

`Cinder Circuit`를 추천한다.

- `Cinder`가 불타는 잔재와 전투 후열감을 준다.
- `Circuit`이 아레나, 루프, 전기적 무기 개조 이미지를 동시에 준다.
- 원작의 생존/학살 리듬은 남기되 제목 단어를 직접 반복하지 않는다.

## Risks

- Production risk: 서바이버류를 브라우저에 옮길 때 적 수와 이펙트가 과해지면 성능과 가독성이 같이 무너질 수 있다.
- UX risk: 전투 중 드랍 줍기, 과열, 대시, 포지 선택이 한꺼번에 들어가면 첫 판 이해가 어려워질 수 있다.
- IP risk: `Survivors`, `Forge`, 특정 무기명이나 적 디자인을 너무 직접적으로 닮게 만들면 안 된다.

## Go / No-Go

- Verdict: `Go`
- Reason: `회피 + 드랍 + 짧은 강화 선택`만 남겨도 원작의 쾌감 축을 충분히 살릴 수 있고, 단일 아레나 캔버스 게임으로도 구현 밀도가 높다.

## Source Notes

2026-03-20 기준 공개 소개 문구에서는 `Grind Survivors`가 빠른 액션 로그라이트, 악마 무리 생존, 무기 드랍, 포지 강화, 무한 확장 생존을 핵심으로 내세운다. 이번 문서는 그 구조를 그대로 복제하지 않고, 브라우저 범위에 맞게 `세 시대 12웨이브 러닝 + headline/rider 포지`로 재구성하는 전제를 둔다.

# Cinder Circuit Automation Loop

This file is shared by two recurring Codex CLI jobs.

- `critique`: reviews the current state of `playables/cinder-circuit/` and writes sharp feedback.
- `improve`: reads the latest critique, implements one bounded improvement, and records what changed.
- `release-review`: periodically audits whether the loop is still moving toward a shippable game.

## Agent Sessions

- `tasks/automation/state/critic-session.md` keeps the critic's long-lived memory.
- `tasks/automation/state/improver-session.md` keeps the improver's long-lived memory.
- `tasks/automation/state/release-review-session.md` keeps the release-review agent's long-lived memory.
- These files should stay short, current, and overwrite stale thinking instead of becoming logs.

## Release Goal

- Target: ship `Cinder Circuit` as a replayable, release-feeling browser action roguelite, not a prototype.
- Standard: a player should understand the run, feel stronger every few waves, want to chase future forms, and willingly replay for different builds.

## Current Stage

- Stage: alpha consolidation.
- Immediate priority: strip admin-heavy reward/opening language and front-loaded support clutter so `Wave 1-12` reads as a lean gun/body transformation ladder first, with support/utility as secondary payoff instead of the main fantasy.

## Release Gates

- Combat: movement, enemy pressure, spacing, and hazard reads stay legible while still creating threat.
- Progression: the run supports meaningful anticipation for at least 20-30 waves worth of structure, even if implemented in bounded steps.
- Builds: the player can form a recognizable offense path, defense/support path, and greed/utility path with visible payoff.
- Rewards: forge/draft screens sell desire first, explanation second.
- UX/UI: major screens are readable, reference-driven, and release-feeling rather than debug-heavy.
- Balance: new systems do not just exist; they create distinct advantages, tradeoffs, and replay reasons.

## Anti-Drift Rules

- Do not keep adding named systems if they do not increase replay desire.
- Do not use density, timers, or extra waves as a substitute for new combat asks.
- Do not let support systems outshine the player chassis for too long.
- Do not solve readability with more labels before simplifying the reward moment itself.
- Every few loops, prefer balance/readability consolidation over adding another content branch.

## Player Feedback Rules

- Treat direct human play feedback as higher priority than speculative system expansion.
- If recent player feedback identifies confusion, overload, or weak progression feel, solve that before adding more content.
- Prefer changes that make the first 1-3 waves cleaner, quieter, and easier to read.

## Current Red Flags

- Start-of-run text is still too heavy; the player should not feel greeted by a wall of explanation.
- `Tab` detail view is still too text-dense; it should behave more like a quick status board than a document.
- Early combat is too visually advanced, especially with too many missiles/support shots appearing too soon.
- Until these are improved, avoid adding more early-game spectacle, more explanatory copy, or more new progression wrappers.

## Rules

- Keep entries newest-first inside each section.
- Be concrete. Prefer specific files, mechanics, and next actions.
- `critique` should not edit gameplay files.
- `improve` should only act on the latest actionable critique unless blocked.

## Latest Critique

- 2026-03-30 23:59:59 KST
  Findings:
  - The project is still teaching prototype ambition. [docs/games/cinder-circuit-design.md](/Users/seren/workspace/poong-game/docs/games/cinder-circuit-design.md) and [docs/games/cinder-circuit-source-analysis.md](/Users/seren/workspace/poong-game/docs/games/cinder-circuit-source-analysis.md) still define the shipped contract as `8웨이브 + 짧은 승리 랩`, so the source-of-truth is actively pulling future work away from the stated release goal of a rerunnable `Wave 1-12` spine that can later stretch toward `20-30` waves.
  - Reward and transition language is still too administrative at the exact moments that should create hunger. `renderForgeOverlay()` and the surrounding combat-feed/transition copy in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) still surface `support bay`, `flex lane`, `uplink`, `armory`, `cache`, and similar wrapper terms too often; compared with the instant-read hierarchy of `Hades`, `Brotato`, or `Nova Drift`, the game is still asking the player to parse logistics before desire.
  - The weapon fantasy is still sold as incomplete until support arrives. `LATE_ASCENSION_DEFS` and `getBaseRouteWave8ClosureCopy(...)` in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) keep telling the player that the big gun/body leap only truly closes once `support uplink` or support clauses fill the gap, which weakens the payoff of the headline form and front-loads complexity the current red flags already warn against.
  - The system catalog is getting broader faster than the run is getting cleaner. Orbitals, shields, missiles, greed contracts, field caches, live ascension, and other branches already give enough raw ingredients in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js); the problem is not lack of options, it is that offense/defense/greed still do not read as three clean rerun fantasies with simple hierarchy and visible anticipation.
  Top Priority: Rewrite the design/source docs and the next layer of forge/combat-feed copy around one rule: the player should first read one dominant gun/body transformation, one immediate combat ask, and only then any secondary support or utility consequence.
  Why Now: Until the game stops explaining its scaffolding, every new branch increases reading load faster than replay desire.
  Do Not Repeat: Do not answer this pass with more routes, more support families, or more wrapper vocabulary while the opening and reward moments still read like build administration.
  Release Gate: UX/UI

- 2026-03-30 23:59:59 KST
  Findings:
  - `Wave 11-12` route ownership is stronger now, but the run still sells growth like a package assembler instead of a hungry roguelite build. `createSupportSystemChoices(...)`, `createForgePreviewRows(...)`, and `getForgeChoiceTransformation(...)` in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) still keep too much value inside chassis+support bundles, bay unlocks, rider plans, and deferred package logic, so the player is still steering wrappers more than chasing one visible weapon/body fantasy plus one meaningful side layer.
  - The forge is still too verbose for a release-feeling reward beat. Compared with the one-dominant-offer hierarchy in `Hades`, the brutal brevity of `Brotato` level-ups, or the silhouette-first mutation hunger in `Nova Drift`, `renderForgeOverlay()` in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) still asks the player to parse context cards, title swaps, preview rows, proof labels, slot labels, and rider framing when the screen should just make one transformation feel irresistible.
  - Late-form copy is still structurally support-led. `getBaseRouteWave8ClosureCopy(...)` in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) still injects support clauses into `Cataclysm Arsenal / Warplate Halo / Black Ledger Heist`, which weakens the sense that the gun/body itself became the run-winning machine and makes the payoff feel assisted instead of earned.
  - The project docs are still actively teaching prototype ambition. [docs/games/cinder-circuit-design.md](/Users/seren/workspace/poong-game/docs/games/cinder-circuit-design.md) and [docs/games/cinder-circuit-source-analysis.md](/Users/seren/workspace/poong-game/docs/games/cinder-circuit-source-analysis.md) still frame the shipped slice as `8웨이브 + 짧은 승리 랩` with support-chasing appetite, so the source-of-truth still points future work back toward an obsolete, smaller fantasy.
  Top Priority: Rebuild the forge/reward contract so each stop presents one dominant weapon/body leap first and only one secondary layer after it, while separating offense, defense, and greed into visibly different long-horizon payoffs instead of bundled chassis+support packages.
  Why Now: The late route is longer, but without cleaner reward hierarchy and stronger build steering, the extra waves still do not create enough anticipation to sustain reruns.
  Do Not Repeat: Do not spend the next pass on more route prose, extra preview rows, or more support module packaging if the reward screen still reads like build administration and the docs still teach the old 8-wave/support-first appetite.
  Release Gate: Rewards

- 2026-03-30 23:59:00 KST
  Findings:
  - The run is longer now, but `Wave 9-12` still leans too hard on shared `payoff / proof / pursuit / stand` grammar with mostly tuning-level route overrides in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js). That extends duration more than desire; offense, defense, and greed still read like seasoning on one late ladder instead of three rerunnable fantasies.
  - Build hunger is still too narrow for a release-feeling roguelite. `buildWave6ChassisBreakpointChoices(...)` and `createSupportSystemChoices(...)` in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) still resolve too much progression into pre-bundled chassis plus support installs, so the player is choosing packages more than steering a layered build with real passive, defense, utility, or greed tension.
  - The late form is described as dominant, but support is still doing too much structural work underneath it. `getBaseRouteWave8ClosureCopy(...)` keeps late-form payoff copy leaning on support clauses, which weakens the feeling that the gun/body itself has truly transformed into the run-winning machine.
  - Project guidance is now drifting behind the game. [docs/games/cinder-circuit-design.md](/Users/seren/workspace/poong-game/docs/games/cinder-circuit-design.md) still sells an `8웨이브 + 짧은 승리 랩` loop and support-chasing appetite, so the design source is still teaching prototype-scale ambition after the playable moved to `Wave 12`.
  Top Priority: Re-author `Wave 9-12` and its forge beats so each route gets one exclusive endgame contract plus one visibly different payoff lane, instead of shared late cells plus bundled support packaging.
  Why Now: A longer run without sharper route identity and stronger build steering just makes the prototype last longer.
  Do Not Repeat: Do not answer this with more late-wave copy cleanup or extra support module names while the three late routes still play this similarly and the forge still mostly hands out bundles.
  Release Gate: Builds

- 2026-03-30 23:32:00 KST
  Findings:
  - The source-of-truth design still caps the run at `8웨이브 + 짧은 승리 랩` and still tells the player loop to chase `더 강한 지원 설치` plus `Wave 5-8` ownership with inner support payoff in [docs/games/cinder-circuit-design.md](/Users/seren/workspace/poong-game/docs/games/cinder-circuit-design.md). That is prototype-scale appetite, not the longer escalation contract the project says it wants.
  - The playable already contains a more promising `Wave 9-12` grammar in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js), but shipped route language still closes desire at `Wave 8` via `getBaseRouteFinaleRoadmap(...)` and related `마감 랩` framing. The run currently peaks where a rerunnable roguelite should be opening its late-form proof stretch.
  - Branch identity from `Wave 5-8` is improved numerically, but too much of it still rides on shared recurring cells plus hazard/profile overlays. Because the same payoff/breach/proof scaffold keeps repeating, offense, defense, and greed still risk feeling like route seasoning on one midgame template instead of three fantasies players would rerun on purpose.
  - The between-wave layer is still too narrow for repeat-build hunger. `buildWave6ChassisBreakpointChoices(...)` and `createSupportSystemChoices(...)` in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) still resolve too much of the run into chassis plus support installs/upgrades, when a release-feeling ladder needs clearer passive, defensive, greed, and utility branches that visibly mutate how the next act is played.
  - UI cleanup is no longer the ceiling. Strong arena roguelites earn reruns because the player leaves Wave 6-8 wanting to see what their form becomes next; here the structure still says “you are basically done,” so even cleaner screens cannot create enough anticipation.
  Top Priority: Reframe the shipped alpha around a true `Wave 1-12` escalation spine where `Wave 8` locks a late-form mutation, `Wave 9-12` prove it with route-specific endgame contracts, and forge choices broaden beyond support-install wrappers into real offense/defense/greed/utility layers.
  Why Now: Until the run has a second half that cashes the chosen path, the project will keep polishing an ending where the real appetite curve should begin.
  Do Not Repeat: Do not spend the next loop on more copy trimming, card chrome, or support naming if `Wave 8` is still the effective finale and route differentiation still depends this much on text scaffolding.
  Release Gate: Progression

- 2026-03-30 11:01:00 KST
  Findings:
  - The project is still teaching the wrong appetite loop in its own design source. [docs/games/cinder-circuit-design.md](/Users/seren/workspace/poong-game/docs/games/cinder-circuit-design.md) still tells the player loop to chase `더 강한 지원 설치` and still frames `Wave 5-8` as path ownership with an inner support payoff, which keeps helper-first desire alive even after recent route cleanup.
  - The live shipped reward text is still leaking that same fantasy. `createSupportSystemChoices(...)` in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) still sells `Wave 8 완성 시험 직전 ... support silhouette`, and `getBaseRouteWave8ClosureCopy(...)` still injects support clauses into the capstone read, so the late memory is not yet brutally form-first.
  - The default forge surface is still carrying too much hierarchy for a game that wants instant hunger. Compared with the one-dominant-offer discipline in `Hades`, `Brotato`, or the cleaner status reads in `Nova Drift`, `renderForgeOverlay()` and its helpers in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) still stack title, transformation delta, current loadout, featured install, next ask, proof text, preview rows, and slot labels where one hero mutation plus one consequence should win the screen.
  - The shipped route also still sounds like a prelude to a larger game. Roadmap/detail helpers in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) keep surfacing `Wave 9-12`, `Late Break`, `crownline`, and extra step-detail language, which makes the current 8-wave run feel documented rather than complete and pushes the player into reading future scaffolding instead of wanting another run now.
  Top Priority: Collapse title, forge, `Tab` detail, roadmap, and result language for the shipped route to one dominant transformation plus one immediate combat ask, with support/admin/future-run text removed from the default view.
  Why Now: Until the current run stops reading like a spec sheet for later content, stronger combat and branch payoff still will not convert into repeat-run desire.
  Do Not Repeat: Do not spend another pass on new card chrome, more roadmap rows, or more support bay naming while the shipped surfaces still over-explain the run.
  Release Gate: UX/UI

- 2026-03-30 22:05:00 KST
  Findings:
  - The project is still teaching the wrong run fantasy in its source-of-truth docs. [docs/games/cinder-circuit-design.md](/Users/seren/workspace/poong-game/docs/games/cinder-circuit-design.md) still frames `Wave 5-8` as ownership plus an inner support payoff and still tells the player loop to chase stronger support installs, which keeps reintroducing helper-led thinking even after combat cadence started to separate by route.
  - The live doctrine text still points late desire at support hardware. `supportDoctrineText` in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) explicitly promises the first `Wave 8` support rider for all three doctrine lines, so the route fork still reads like a preface before the “real” toy arrives.
  - Forge is still too document-like for a release-feeling reward screen. Compared with strong upgrade beats in games like `Hades`, `Brotato`, or `20 Minutes Till Dawn`, [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) is still asking the player to parse proof windows, rider contracts, preview rows, install summaries, and context tails before one obvious power spike takes over the screen.
  - The same verbosity keeps leaking into transition copy and closure copy. `headline -> rider slot`, `support/defense/greed`, and support clauses in the `Wave 8` closure text keep naming the system plumbing instead of leaving the player with a simple memory of “my gun/body just became this.”
  Top Priority: Rebuild the shipped forge/title/progression language so each stop sells one dominant weapon/chassis transformation first, with support reduced to a quiet secondary rider and most contract/spec-sheet text removed from the default view.
  Why Now: If the reward moments still feel like reading an ops panel, players will not build rerun hunger even when the underlying combat routes improve.
  Do Not Repeat: Do not answer this with more naming passes or more helper variants while the forge still explains the machine harder than it excites the player.
  Release Gate: Rewards

- 2026-03-30 21:10:00 KST
  Findings:
  - The new hazard targeting split is a step, but `Wave 6-8` still climbs through almost the same base `spawnBudget / activeCap / baseSpawnInterval` ladder, and the branch overrides mostly shave numbers rather than create different combat rhythms. That is still one extended exam with route-flavored footwork, not three rerunnable midgame fantasies.
  - Support is still staged as the chapter beat instead of a quiet amplifier. `createSupportSystemChoices(...)` still sells `Wave 8 ... support silhouette`, `shouldUseSupportChapterBreathingRoom(...)` still reshapes the arena around the installed helper, and the wave cells are still literally `support_lap` / `support_proof`.
  - The run’s final memory is still too helper-laced. The victory lap text still says `body/support bracket` and the directives remain about proving a completed support-backed line, which weakens the hunger to chase a weapon/body route of its own.
  - This also caps long-run ambition. If the 8-wave slice already feels visually and systemically crowded by support hardware before the route-owned form truly peaks, extending to 20-30 waves will make the game broader without restoring anticipation.
  Top Priority: Remove shipped `Wave 6-8` support-chapter framing and reassign that budget to branch-specific enemy cadence plus a route-owned weapon/chassis spike, with support either delayed or demoted to background reinforcement.
  Why Now: Until the midrun power spike belongs clearly to the player chassis, reruns will feel like minor helper variation instead of a form worth chasing again.
  Do Not Repeat: Do not spend another pass on support naming, support families, or micro-copy while the shipped midrun still reads and plays like a helper chapter.
  Release Gate: Builds

- 2026-03-30 20:05:00 KST
  Findings:
  - The `Wave 8` capstone naming is better, but the actual `Wave 6-8` fights still lean too hard on one repeated ownership exam. `afterglow -> breakline -> crownfire -> forgecross` keeps describing the same lane/pocket hold ladder, and all three later hazards still share the `ownership_breathing` targeting profile, so reruns risk feeling like the same kite test with different nouns.
  - Arena scale is finally larger, but the combat ask still does not breathe enough because branch identity is being expressed through copy and reward wrappers more than through different movement contracts. A player should immediately feel `open kill lanes` vs `safe-pocket rotation` vs `scrap dive and escape`; right now the code still mostly asks them to hold one favorable seam longer.
  - Support is still too present as a shipped milestone even after the headline fix. `SUPPORT_SYSTEM_START_WAVE = 6`, `Wave 8 완성 시험 직전 ... support silhouette`, and status summaries like `Wave 6 지원 설치` keep teaching support hardware as a chapter beat instead of a quiet amplifier under the path-owned form.
  - The first-install visual reduction is cosmetic, not structural. `getSupportRenderPresentation()` hides orbit/range helpers, but missiles, drones, shields, deployables, and their combat logic still arrive intact, so the machine can still feel visually complete before the branch-owned weapon/body pattern has fully earned the screen.
  Top Priority: Rebuild `Wave 6-8` so each `Wave 5` path has its own movement contract, hazard targeting profile, and enemy cadence, with support installs restricted to reinforcing that contract instead of defining the chapter beat.
  Why Now: If the branch still does not change what the player is actually doing in the arena, replay desire will flatten no matter how strong the capstone names become.
  Do Not Repeat: Do not spend the next pass on more capstone copy or more support families while `Wave 6-8` still plays this similarly across routes.
  Release Gate: Combat

- 2026-03-30 19:15:00 KST
  Findings:
  - `getBaseRouteWave8ClosureCopy()` still lets `supportSummary.title` become the closing headline for offense, defense, and greed, so the run’s last memory is a support package name instead of the weapon/body silhouette the player supposedly spent the run building.
  - The shipped `Wave 6-8` payoff is still too support-led in both presentation and spectacle. `getVisibleSupportOfferSystemIds()` narrows the hardware catalog, but the actual visible jump is still orbiting shields, missiles, and drones rather than a branch-owned firing pattern or chassis mutation that feels worth rerunning for.
  - `renderForgeOverlay()` is cleaner, but the Wave 8 reward moment still carries `지원 설치` and rider-style framing, which teaches the player that the late stop is another install wrapper instead of a capstone fusion of the chosen path.
  - This is now the bigger ceiling blocker than more copy cleanup. The codebase already has enough weapon/body evolution material to support longer ambition, but the shipped 8-wave route keeps cashing its excitement budget through support layers, which will make a future 20-30 wave version feel broader without feeling hungrier.
  Top Priority: Rebuild the shipped `Wave 8` closure so each `Wave 5` path resolves into a path-owned weapon/body capstone first, with support only reinforcing that form instead of naming or visually dominating it.
  Why Now: If the final payoff is remembered as a helper install, players will stop craving the path itself and reruns flatten into minor loadout variation.
  Do Not Repeat: Do not answer this with more support families, more Wave 9+ scaffolding, or another wording pass that still leaves the late spike support-led.
  Release Gate: Builds

- 2026-03-30 18:40:00 KST
  Findings:
  - The shipped slice is still not behaving like a self-contained rerun loop because the implementation keeps leaking `Wave 9-12`, `Late Break`, `ascension`, and extra support-bay language into combat feeds, cadence helpers, and forge/result logic. That makes `Wave 1-8` feel like a tutorialized preface to a bigger game instead of a run worth repeating on its own.
  - `renderForgeOverlay()` is still too card-rich and explanation-heavy for a release-feeling reward moment. Even after cleanup, it still stacks context cards, headline/rider framing, proof lines, preview rows, slot/cost wrappers, and contract labels where stronger references push one dominant offer, one visible payoff, and almost no reading tax.
  - Path identity is still being carried by copy more than by anticipation. The route promises offense/defense/greed, but the surfaces still foreground support riders, proof windows, and transformation grammar so heavily that the player is asked to understand structure instead of feeling hunger for the next visible mutation.
  - The opening growth curve remains emotionally compressed because too much future-form language survives in the shipped shell. A run that should start as bare hull and earn spectacle still sounds mechanically mature too early, which weakens the jump from starter gun to first real weapon spike.
  Top Priority: Remove unshipped late-route/admin language from the `Wave 1-8` player-facing loop and compress forge/reward presentation until each stop reads as one object, one payoff, one next ask.
  Why Now: If the current run still feels like documentation for future content, players will not replay it for the build fantasy that already exists.
  Do Not Repeat: Do not answer this with more branch layers, more late-wave scaffolding, or another terminology pass that still leaves the shipped route talking like a 12-wave game.
  Release Gate: Rewards

- 2026-03-30 17:20:00 KST
  Findings:
  - The game is drifting from the active red flags: `renderForgeOverlay()` is still packed with context cards, transition rows, branch payoff tails, preview rows, proof copy, slot labels, and contract wrappers, so the reward moment reads closer to a systems briefing than the instant object-first hunger strong references like `Hades`, `Brotato`, or `Nova Drift` create.
  - `Wave 6-8` still leans on the same `ownership_breathing` hazard profile across relay, drift, and territory variants. Even with larger arenas, offense/defense/greed risk collapsing back into one long hold-and-kite exam because the player keeps solving similar space problems with different nouns.
  - The status surfaces are still too wordy for a run that is supposed to feel lean early. Pause/status summaries, proof windows, hazard notes, and route/result language repeatedly restate the build contract instead of showing one dominant silhouette plus one current ask, which hides the fantasy behind admin text.
  - The opening growth discipline is still fragile because the codebase keeps many future-form and support-rich promises visible in roadmap/detail logic. That weakens the emotional jump from bare starter gun to first real mutation and makes the current 8-wave slice feel like a preface to later content rather than a satisfying compact run.
  Top Priority: Collapse forge, pause, and detail-board presentation to a single dominant form read plus a single next-combat ask, and cut duplicate preview/proof/roadmap copy before adding any more branch or support content.
  Why Now: If reward and status screens still require reading through structure, the player cannot feel the transformation spikes cleanly enough for reruns to become hungry.
  Do Not Repeat: Do not spend the next pass on more path nouns, roadmap copy, or additional Wave 9+ promises while the current reward/HUD stack still over-explains the shipped run.
  Release Gate: UX/UI

- 2026-03-30 10:00:00 KST
  Findings:
  - The delayed `Wave 8` support wake helps, but the shipped slice still spends too much progression grammar too quickly: `Wave 3` weapon break, `Wave 5` path lock, `Wave 6` chassis breakpoint, `Wave 7` overdrive, `Wave 6-8` shard/chase/admin layers. By `Wave 7`, the machine already feels too explained and too complete for a rerun-driven roguelite.
  - The forge remains richer on paper than it feels in the hand. Strong references such as `Hades` boon screens or `Brotato` level-ups keep the reward read brutally short and desire-first; here preview rows, lane labels, forge verbs, and route wrappers still make the player parse structure when they should just want the next spike.
  - Weapon evolution content exists, but the shipped route still behaves more like authored package delivery than a hungry build recipe. A longer action roguelite curve needs the player to live with one form long enough to crave the next barrel, beam split, orbit, or shield layer, not get a new wrapper almost every stop.
  - This is now the structural blocker for `20-30` wave ambition. If the current `8-wave` run already burns through mutation, chassis, support, pursuit, and closure language, future expansion will either bloat the UI further or feel like stat-only padding.
  Top Priority: Strip the shipped `Wave 6-8` loop down to fewer decision verbs so the base run is mostly `weapon evolution + one route commitment + one late payoff`, with secondary mutation/overdrive/chase layers deferred or heavily thinned until the core ladder can breathe.
  Why Now: A short run that already feels near-complete by `Wave 7` leaves no anticipation budget for replayable long-form escalation.
  Do Not Repeat: Do not answer this with `Wave 9-12` scaffolding, more capstone labels, or more support/admin nouns while the shipped route still front-loads this much structure.
  Release Gate: Progression

- Older entries trimmed automatically: 1

## Latest Improvement

- 2026-03-31 00:25:00 KST
  Changed:
  - Simplified `Wave 8` closure text in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) so `getBaseRouteWave8ClosureCopy(...)` now sells only the locked form (`Cataclysm Arsenal / Warplate Halo / Black Ledger Heist`) plus its immediate combat ask, without secondary support clauses in the default payoff copy.
  - Rewrote the shipped forge transition/feed lines in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) so `getBaseRouteTransitionFeedCopy(...)` uses a shorter `정비/정리` read and `handleForgeSelection(...)` no longer opens package followups with `rider slot`, `support/defense/greed`, or support-led late-break recap wording.
  - Added smoke assertions in [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) to lock mid-forge transition text away from `현재 형태는`, `support`, and `rider slot`, and to keep the `Wave 8` offense payoff text off installed support names.
  Why:
  - The latest critique's `Top Priority` was to make the next layer of forge/combat-feed copy read as one dominant gun/body transformation first, one immediate combat ask second. The highest-value bounded interpretation inside `playables/` was to strip remaining support/admin scaffolding from the reward-transition sentences the player reads immediately after making a pick.
  Follow-up Risk:
  - The first-read reward beat is cleaner now, but deeper card descriptions and some non-shipped route cache text still carry admin vocabulary. If critique still says reward moments feel logistical, the next bounded pass should trim those secondary descriptions instead of adding more wrappers.
  Validation: `node --check playables/cinder-circuit/game.js`; `node --check playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`; `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs` still fails on the pre-existing `playables/cinder-circuit/tools/cinder-circuit-smoke.mjs:4277` assertion (`sentryTierTwo.interceptRange > 0`) after the new reward-copy assertions passed
  Reference Direction: `Hades` boon pickup brevity with `Brotato`-style level-up restraint; the default reward beat should name the form and the next ask, not the packaging.
  Release Gate: UX/UI

- 2026-03-31 00:10:00 KST
  Changed:
  - Added `getBaseRouteForgeContextIdentity(...)` in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) and rewired `renderForgeOverlay()` to build the compact forge context header/detail from payoff-owned `titleValue` / `transformation.cardTitle` instead of raw `choice.title`, so `Wave 6` route picks now headline `Crownsplitter Array`-style long-horizon forms even when the underlying card is a chassis package.
  - Updated [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) and [tasks/automation/state/improver-session.md](/Users/seren/workspace/poong-game/tasks/automation/state/improver-session.md) to lock the new context identity on `Twin Spine -> Crownsplitter Array` and fail if forge context drifts back to the package title.
  Why:
  - The latest critique's `Top Priority` was to make each reward stop sell one dominant weapon/body leap first. The highest-value bounded interpretation was to fix the forge surface that still let compact context cards prefer wrapper labels over the actual form payoff, because that undercut the cleaner card hierarchy already in place.
  Follow-up Risk:
  - The forge header now stays on the right payoff title, but some underlying support/system descriptions still carry bay/package wording deeper in the option data. If critique still says rewards read like admin, the next bounded pass should trim those secondary descriptions rather than reopen the top-level hierarchy.
  Validation: `node --check playables/cinder-circuit/game.js`; `node --check playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`; `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs` still fails on the pre-existing `playables/cinder-circuit/tools/cinder-circuit-smoke.mjs:4266` assertion (`sentryTierTwo.interceptRange > 0`) after the new forge-context assertions passed
  Reference Direction: `Hades` boon/shop title hierarchy with `Nova Drift`-style silhouette-first mutation reads; the reward header should name the build fantasy, not the packaging used to deliver it.
  Release Gate: Rewards

- 2026-03-30 23:59:30 KST
  Changed:
  - Split the shipped late staircase in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) so locked `lateBreakProfileId` runs route-owned `Wave 11-12` overrides instead of dropping back to the shared `Refuge Run / Final Stand` pool; `mutation` now resolves `Raptor Sweep -> Crown Siege`, `aegis` resolves `Bulwark Rotation -> Citadel Lock`, and `ledger` resolves `Exit Vector -> Jackpot Lock`.
  - Gave those new endgame contracts distinct labels, arena shapes, enemy mixes, and hazard profiles in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) so the back half reads as open-lane sweep vs pocket rotation vs jackpot exit/hold, not one shared late ladder with route seasoning.
  - Updated [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) and [tasks/automation/state/improver-session.md](/Users/seren/workspace/poong-game/tasks/automation/state/improver-session.md) to lock the new `Wave 11-12` labels/configs while keeping the no-profile shared route on `Refuge Run / Final Stand`.
  Why:
  - The latest critique's `Top Priority` was to stop `Wave 9-12` from reading like shared late cells with small route seasoning. The highest-value bounded interpretation was to finish route ownership on `Wave 11-12`, because `Wave 9-10` already had direct late-break overrides while the last two waves were still shared.
  Follow-up Risk:
  - Route identity is now clearer in actual late-wave labels and pressure, but the `Wave 8` armory card text still does not fully preview these exclusive endgame contracts. If critique still says the forge beats feel bundled, the next bounded pass should surface one explicit `Wave 11-12` payoff lane preview per route instead of adding more support wrappers.
  Validation: `node --check playables/cinder-circuit/game.js`; `node --check playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`; `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs` still fails on the pre-existing `playables/cinder-circuit/tools/cinder-circuit-smoke.mjs:4255` assertion (`sentryTierTwo.interceptRange > 0`) after the new late-route assertions passed
  Release Gate: Builds

- 2026-03-30 23:55:00 KST
  Changed:
  - Rewired the shipped consolidated route in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) so a locked `lateBreakProfileId` promotes the live route cap from `Wave 8` to `Wave 12` via `isBaseRouteLateStaircaseActive(...)` / `getBaseRoutePlayableWaveCount(...)`, instead of treating every post-`Wave 8` state as an automatic run complete.
  - Replaced the old `Wave 8 -> victory lap` handoff in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) with a real `Wave 9-12` continuation: `getBaseRoutePostWaveTransition(...)` now yields `continue_wave` for capped late-form runs, the clear loop calls `beginWave(...)` for that path, and `getBaseRouteTransitionFeedCopy(...)` now frames the back half as a no-stop late proof stretch instead of a short lap.
  - Updated the shipped late-wave readouts in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) and [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) so the wave track, pause snapshot, machine panel, combat ask summaries, and smoke assertions stop clamping capstone builds back to `Wave 8` once the late form is locked.
  Why:
  - The latest critique's `Top Priority` was to turn the alpha into a real `Wave 1-12` escalation spine where `Wave 8` locks the form and `Wave 9-12` prove it. The highest-value bounded interpretation was to consume the already-authored late-wave grammar instead of leaving the shipped route on an immediate pseudo-finale.
  Follow-up Risk:
  - This makes the second half playable, but many branch/payoff summary helpers still use `Wave 1-8` wording and shared late-wave asks. If critique still says the back half feels under-differentiated, the next bounded pass should split `Wave 9-12` payoff language and combat asks harder by route rather than reintroducing wrapper text.
  Validation: `node --check playables/cinder-circuit/game.js`; `node --check playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`; `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs` still fails on the pre-existing `playables/cinder-circuit/tools/cinder-circuit-smoke.mjs:4255` assertion (`sentryTierTwo.interceptRange > 0`) after the new late-staircase assertions passed
  Release Gate: Progression

- 2026-03-30 23:05:00 KST
  Changed:
  - Rewrote the shipped-route finale naming in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) so `getBaseRouteFinaleRoadmap(...)` and the consolidated roadmap no longer headline `Wave 8 완성 시험` / `짧은 승리 랩`; the default final step is now one compact `마감 랩` with shorter detail about pushing the locked form, not reading the stage structure.
  - Simplified the shipped result memory in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) by trimming `getBaseRouteResultCopy(...)`, `getBaseRouteResultRouteLabel(...)`, `getBaseRouteResultBeatLabels(...)`, and `createBaseRouteResultBuildMarkup(...)` down to `조용한 선체 -> 무기 -> 경로 -> 마감 랩` plus a one-line closure, while removing the old support-rider recap and `RUN MEMORY` header from the default result card.
  - Updated [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) and [tasks/automation/state/improver-session.md](/Users/seren/workspace/poong-game/tasks/automation/state/improver-session.md) to lock the shipped roadmap/result defaults onto `마감 랩` / `RUN` and fail if `Wave 8 완성 시험` or `RUN MEMORY` drift back into the compact route surfaces.
  Why:
  - The latest critique's `Top Priority` was to collapse shipped title/forge/Tab/roadmap/result language to one dominant transformation plus one immediate combat ask. The highest-value bounded interpretation still inside `playables/` was the roadmap/result layer, because it was leaving the run with stage-spec phrasing and support recap even after forge and pause had already been compacted.
  Follow-up Risk:
  - The result and roadmap are less document-like now, but some forge/support offer descriptions still mention `완성 시험` or support silhouette wording deeper in the card text. If critique still says the shipped route reads like a spec sheet, the next bounded pass should trim those remaining secondary reward sentences rather than add more chrome.
  Validation: `node --check playables/cinder-circuit/game.js`; `node --check playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`; `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs` still fails on the pre-existing `playables/cinder-circuit/tools/cinder-circuit-smoke.mjs:4255` assertion (`sentryTierTwo.interceptRange > 0`) after the new roadmap/result assertions passed
  Reference Direction: `Hades` result/boon recap restraint plus `Nova Drift`-style one-glance build memory; default post-run surfaces should leave one silhouette and one route memory, not a stage checklist.
  Release Gate: UX/UI

- 2026-03-30 10:43:59 KST
  Changed:
  - Rewired the shipped forge headline in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) so `getBaseRouteForgeSpotlightSummary(...)`, `getBaseRouteForgeDominantInstallHero(...)`, and the default `renderForgeOverlay()` context now foreground the branch-owned transformation (`Crownsplitter Array`, `Citadel Spindle`, etc.) instead of bundled support install names on `Wave 6` breakpoint cards.
  - Rewrote the three doctrine `supportDoctrineText` strings in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) to frame `Wave 8` support as a quiet amplifier that reinforces an already locked form, not the late-run toy the player is supposed to crave.
  - Updated [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) and [tasks/automation/state/improver-session.md](/Users/seren/workspace/poong-game/tasks/automation/state/improver-session.md) to lock the new form-first forge spotlight/context outputs for shipped `Wave 6` packages.
  Why:
  - The latest critique's `Top Priority` was to make reward stops sell one dominant weapon/chassis transformation first. The highest-value bounded interpretation inside `playables/` was to change the default forge hero/context and doctrine late-copy, because those were still teaching support hardware as the real payoff even after the underlying path forms existed.
  Follow-up Risk:
  - The default reward read is cleaner now, but some support-focused descriptions and `Wave 8` closure lines still mention system plumbing. If critique still says the reward stop reads like an ops panel, the next bounded pass should trim those remaining secondary sentences rather than add another naming layer.
  Validation: `node --check playables/cinder-circuit/game.js`; `node --check playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`; `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs` still fails on the pre-existing `playables/cinder-circuit/tools/cinder-circuit-smoke.mjs:4256` assertion (`sentryTierTwo.interceptRange > 0`) after the new forge headline assertions passed
  Reference Direction: `Hades` boon/shop headline hierarchy with `Brotato` / `20 Minutes Till Dawn`-style reward restraint; the default reward surface should show one form spike first and let support read as a secondary rider.
  Release Gate: Rewards

- 2026-03-30 10:16:47 KST
  Changed:
  - Removed shipped `Wave 6-8` helper-chapter pacing in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) by deleting `applySupportChapterBreathingRoom(...)` from `resolveWaveConfig(...)`, dropping the unused `support_showcase` hazard profile, renaming the shared cells to `dominion_sweep` / `dominion_proof`, and rewriting the victory-lap copy from `body/support bracket` to `body/weapon form`.
  - Rebalanced branch-owned cadence in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) so offense now pushes higher `spawnBudget`, faster `baseSpawnInterval`, more `spawnAcceleration`, and earlier elites; defense now cuts budget, slows the ladder, and lowers acceleration; greed now runs lower total budget but sharper burst timing for its dive-and-exit pocket windows.
  - Updated [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) and [tasks/automation/state/improver-session.md](/Users/seren/workspace/poong-game/tasks/automation/state/improver-session.md) to lock the new cadence split and to assert support-only Wave 7 no longer rewrites the encounter into a showcase hazard profile.
  Why:
  - The latest critique's `Top Priority` was to remove `Wave 6-8` support-chapter framing and spend that budget on route-owned combat rhythm. The highest-value bounded interpretation was to cut the helper-owned breathing-room override entirely, then make `offense / defense / greed` diverge in actual spawn cadence instead of only hazard placement and copy.
  Follow-up Risk:
  - The midrun now reads less like a helper chapter, but support proof text and some support-offer copy still exist around the same beats. If critique still says the back half feels helper-led, the next bounded pass should demote remaining support-first forge/status wording rather than reopen another combat wrapper.
  Validation: `node --check playables/cinder-circuit/game.js`; `node --check playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`; `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs` still fails on the pre-existing `playables/cinder-circuit/tools/cinder-circuit-smoke.mjs:4256` assertion (`sentryTierTwo.interceptRange > 0`) after the new cadence/support-framing assertions passed
  Release Gate: Builds

- 2026-03-30 20:35:00 KST
  Changed:
  - Added route-owned `Wave 6-8` hazard targeting profiles in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) so offense now places danger as `offense_killlane`, defense as `defense_refuge`, and greed salvage/caravan dives as `greed_dive_exit` instead of all three inheriting the same shared `ownership_breathing` placement logic.
  - Wired the same branch configs in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) through `applyWave5FieldPathEncounterConfig(...)` and `applyMidrunGreedRouteConfig(...)`, which makes the route fork affect actual hazard placement/selection behavior in addition to labels, arena size, and copy.
  - Updated [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) and [tasks/automation/state/improver-session.md](/Users/seren/workspace/poong-game/tasks/automation/state/improver-session.md) to lock the new `offense_killlane` / `defense_refuge` / `greed_dive_exit` profiles on the shipped route.
  Why:
  - The latest critique's `Top Priority` was to make `Wave 6-8` path-owned in actual arena behavior, not just in reward/copy framing. The highest-value bounded interpretation was to split hazard targeting itself, because all three routes were still sharing the same placement brain even after their labels and pacing diverged.
  Follow-up Risk:
  - This makes hazard selection more route-specific, but it does not yet give each path fully distinct enemy spawn choreography on every wave. If critique still says reruns blur together, the next bounded pass should tune branch-owned enemy cadence/mix interactions around these new profiles instead of adding more copy or support wrappers.
  Validation: `node --check playables/cinder-circuit/game.js`; `node --check playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`; `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs` still fails on the pre-existing `playables/cinder-circuit/tools/cinder-circuit-smoke.mjs:4244` assertion (`sentryTierTwo.interceptRange > 0`) after the new path-targeting assertions passed
  Release Gate: Combat

- 2026-03-30 09:14:48 KST
  Changed:
  - Rebuilt the shipped `Wave 8` closure copy in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) so `getBaseRouteWave8ClosureCopy(...)` always headlines the branch-owned capstone (`Cataclysm Arsenal`, `Warplate Halo`, `Black Ledger Heist`) instead of letting the already installed support title replace it.
  - Rewired the same `Wave 8` forge presentation in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) so late-break headline cards, forge spotlight/context, dominant hero read, preview rows, and the post-pick `BREAK` feed all say `완성 형태` plus the capstone title first, with support only mentioned as reinforcement detail.
  - Updated [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) and [tasks/automation/state/improver-session.md](/Users/seren/workspace/poong-game/tasks/automation/state/improver-session.md) to lock the defense/greed `Wave 8` spotlight, hero title, and preview row on capstone-first output.
  Why:
  - The latest critique's `Top Priority` was to make the shipped `Wave 8` stop resolve into a path-owned weapon/body capstone first. The highest-value bounded interpretation was to remove the support-title takeover at the exact presentation points that currently define the player's final memory of the run.
  Follow-up Risk:
  - The headline is now path-owned, but the actual combat spectacle can still read support-led on some branches because the helper visuals remain active under the capstone. If critique still says `Wave 8` feels helper-dominant, the next bounded pass should tune capstone-side weapon/body visuals or cadence rather than add more reward copy.
  Validation: `node --check playables/cinder-circuit/game.js`; `node --check playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`; `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs` still fails on the pre-existing `playables/cinder-circuit/tools/cinder-circuit-smoke.mjs:4237` assertion (`sentryTierTwo.interceptRange > 0`) after the new `Wave 8` capstone-first assertions matched targeted checks
  Release Gate: Builds

- 2026-03-30 08:43:34 KST
  Changed:
  - Rebuilt the shipped forge context in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) so `createBaseRouteForgeContextMarkup(...)` now uses the same `compact-machine-read` shell as pause/detail: one dominant reward title, one muted transition line, and one explicit `다음 전투` ask instead of the older two-slot rail.
  - Wired `renderForgeOverlay()` to feed that context with the real next-combat ask, including a path-owned ask preview on the `Wave 5` route fork, so reward stops no longer read like a static machine summary before the cards.
  - Updated [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) and [tasks/automation/state/improver-session.md](/Users/seren/workspace/poong-game/tasks/automation/state/improver-session.md) to lock forge context onto `compact-machine-read__ask` and fail if the older rail/admin shell comes back.
  Why:
  - The latest critique's `Top Priority` called for removing unshipped/admin language from the `Wave 1-8` reward loop and compressing forge until each stop reads as one object, one payoff, one next ask. The highest-value bounded interpretation was to collapse the forge context card itself, because it still split attention between current machine metadata and reward framing before the player even looked at the headline card.
  Follow-up Risk:
  - The forge stop is cleaner now, but side-card density can still feel a bit busy on three-option screens. If critique next still says rewards read too much, the next bounded pass should trim secondary card copy or layout density rather than reopen context metadata.
  Validation: `node --check playables/cinder-circuit/game.js`; `node --check playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`; `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs` still fails on the pre-existing `playables/cinder-circuit/tools/cinder-circuit-smoke.mjs:4237` assertion (`sentryTierTwo.interceptRange > 0`) after the new forge-context assertions passed
  Reference Direction: `Hades` boon header restraint and `Nova Drift` one-glance build reads; let one reward silhouette lead, keep transition context quiet, and surface one immediate combat ask instead of route/admin scaffolding.
  Release Gate: Rewards

- 2026-03-30 18:05:00 KST
  Changed:
  - Rebuilt the shipped pause snapshot and `Tab` detail board in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) around one shared `createCompactMachineReadMarkup(...)` shell, so both surfaces now lead with one dominant machine title, demote route/install context to a muted subline, and end on one explicit `다음 전투` ask instead of equal-weight pills plus spotlight fragments.
  - Added the matching `.compact-machine-read*` treatment in [playables/cinder-circuit/styles.css](/Users/seren/workspace/poong-game/playables/cinder-circuit/styles.css) so pause and overlay reads keep the same restrained hierarchy without reopening a dashboard grid.
  - Updated [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) and [tasks/automation/state/improver-session.md](/Users/seren/workspace/poong-game/tasks/automation/state/improver-session.md) to lock `compact-machine-read__ask` on shipped pause/detail markup and fail if `pause-summary__pill-row` returns.
  Why:
  - The latest critique's `Top Priority` called for forge, pause, and detail surfaces to collapse to one dominant form read plus one next-combat ask. The highest-value bounded interpretation was to finish that collapse on the two most repeatedly opened status surfaces, because they were still splitting attention between object read, path label, and duplicated proof pills.
  Follow-up Risk:
  - The shared status shell is leaner now, but the forge reward tray can still feel busier than pause/detail on three-card stops. If critique next says reward moments remain the main reading burden, the next bounded pass should compress non-headline forge card copy or side-card density rather than re-thicken pause or `Tab`.
  Validation: `node --check playables/cinder-circuit/game.js`; `node --check playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`; `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs` still fails on the pre-existing `playables/cinder-circuit/tools/cinder-circuit-smoke.mjs:4234` assertion (`sentryTierTwo.interceptRange > 0`) after the new compact-status assertions passed
  Reference Direction: `Hades` pause/boon hierarchy and `Nova Drift` compact status reads; keep one silhouette dominant, push route/admin context into a quiet subline, and let the actionable ask own the second beat.
  Release Gate: UX/UI

- 2026-03-30 10:30:00 KST
  Changed:
  - Cut `Crownfire Overdrive` out of the shipped `Wave 7` base-route forge in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js), so the compact `Wave 1-8` run no longer spends a separate overdrive verb between the `Wave 6` chassis lock and the `Wave 8` payoff.
  - Updated [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) to lock `Wave 7` back onto a visible main-weapon evolution and fail if the shipped route starts applying `crownfireOverdriveId` again.
  - Refreshed [tasks/automation/state/improver-session.md](/Users/seren/workspace/poong-game/tasks/automation/state/improver-session.md) so future passes keep the compact ladder on `weapon evolution -> route proof -> late payoff` instead of reopening a midrun overdrive wrapper.
  Why:
  - The latest critique's `Top Priority` asked to strip `Wave 6-8` down to fewer decision verbs. The highest-value concrete interpretation was to remove the extra `Wave 7` overdrive layer, because it was the clearest case where the shipped route was feeling authored and nearly complete before the final payoff arrived.
  Follow-up Risk:
  - `Wave 7` now breathes better, but some signatures may need stronger tier-2 evolution copy or visuals if critique next says the stop became too quiet. The next bounded pass should strengthen second-weapon-spike spectacle itself rather than reintroduce another named wrapper.
  Validation: `node --check playables/cinder-circuit/game.js`; `node --check playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`; `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs` still fails on the pre-existing `playables/cinder-circuit/tools/cinder-circuit-smoke.mjs:4234` assertion (`sentryTierTwo.interceptRange > 0`) after the new `Wave 7` forge assertions passed
  Release Gate: Progression

- Older entries trimmed automatically: 2

## History

- Loop initialized.
- Pending next critique entry.

## Latest Release Review

- 2026-03-24 10:20:43 KST
  Release Risk:
  - `Wave 8-12` is still presented through branch/admin language (`Architecture Draft`, `Bastion Draft`, `Field Cache`, `Live Ascension`, `Afterburn`) instead of one fixed late-run contract, so the run still reads like a prototype with routing exceptions.
  - Forge/HUD wording still asks the player to parse `Current Form`, `Main Leap`, and `Next Proof` at the reward moment, which means the game is explaining the payoff instead of selling it at a glance.
  - Late-content surface area is already ahead of release readability: multiple Wave 9-12 route families and `Act 4 · Afterburn` scaffolding are visible before the base 12-wave route feels clean, balanced, and memorable.
  Focus Gate: UX/UI
  Directive: For the next few loops, favor removing or hiding route/admin presentation and sharpening one obvious late-form reward-to-proof cadence before adding any new branches, support layers, or post-12 content.
  Freeze: Pause new systems and late-route expansion until the base `Wave 1-12` run reads cleanly enough that a player can describe the finale without using internal draft/cache/ascension vocabulary.

## Latest Improvement

- 2026-03-29 12:15:22 KST
  Changed: recentered the shipped `Wave 8` late-break reward around the already installed support object in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js). I added `getBaseRouteLateBreakSupportSummary(...)` and threaded it through `getBaseRouteWave8ClosureCopy(...)`, `getBaseRouteForgeChoiceTransformation(...)`, `getBaseRouteForgeSpotlightSummary(...)`, `getBaseRouteForgeDominantInstallHero(...)`, `getLateBreakHeadline(...)`, and the Wave 8 `BREAK` combat feed so the forge context now spotlights the earned support title first, keeps each card's unique late-break title second, and uses the compact late-break ask instead of generic defense text. In the same pass, [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) now locks a representative `Aegis Halo` Wave 8 state so late-break cards keep `Warplate Halo` as the pick name while the spotlight/context/hero all sell the installed support as the dominant object. Validation passed with `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`.
  Why: the newest critique's `Top Priority` said the first support install still failed to own the back half because Wave 8 immediately put a doctrine capstone back on top. The highest-value bounded interpretation inside `playables/cinder-circuit/` was to make the existing Wave 8 forge/status surfaces visibly inherit the installed support silhouette, so the player reads `my support chapter gets overdriven now` instead of `new doctrine finale appears now`.
  Follow-up Risk: this fixes the reward read and back-half identity without changing the underlying late-break mechanics, so some deeper result/combat-state labels can still surface doctrine-first naming after the pick resolves. If critique still says the support chapter is decorative, the next bounded pass should retune post-pick result/live-status naming or small bits of the actual Wave 8 behavior, not add another support branch.
  Reference Direction: followed the object-first snap-read from `Hades` boon picks and `Nova Drift` level-ups, where the top-line toy stays visible even when the underlying modifier is what actually changes.
  Release Gate: Progression

- 2026-03-29 14:25:00 KST
  Changed: quarantined more shipped-facing late-route leakage in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) by introducing `shouldHideShippingUpgradeEntry(...)` and using it in both `sanitizeConsolidatedBuildState(...)` and `getShippingUpgradePresentationLabel(...)`. Shipped pause/result `RUN` pills and recent-gain summaries now strip `시그니처`, `Late Break`, `Afterburn`, `Wave 9-12`, `Ownership Relay`, `Endform Overdrive`, contraband, and other roadmap/admin upgrade strings instead of letting those logs reappear after the 8-wave run has already been quarantined. I updated [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) to lock sanitized upgrade history and to assert that only compact shipped beats like `Wave 3 무기 도약` or `안정화` survive presentation. Validation passed with `node --check playables/cinder-circuit/game.js`, `node --check playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`, and `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`.
  Why: the newest critique's `Top Priority` said the judged route still failed the honest shipped-slice test because `Wave 9+ / Afterburn / signature / roadmap` language could still leak into shipped-facing flow. The highest-value bounded interpretation inside `playables/` was to close the run-history path, because that was still capable of reintroducing future-route doctrine even after combat progression had been hard-stopped at `Wave 8`.
  Follow-up Risk: the default result/pause history is cleaner now, but long-form forge/card/body copy still contains non-shipped late-route vocabulary deeper in the codebase for future hooks. If critique still says the current product reads like a teaser, the next bounded shipped-slice pass should hit any remaining player-facing summary/feed helpers that can surface `Wave 9+` terms outside upgrade-history presentation.
  Release Gate: UX/UI

- 2026-03-29 09:15:00 KST
  Changed: tightened the shipped forge spotlight in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) so the top card now reads as one dominant reward object, one current machine line, and one short combat ask only. `createBaseRouteForgeContextMarkup(...)` no longer emits the extra eyebrow/contract label layer for the shipped route, and `renderForgeOverlay()` now feeds it the picked install or mutation as the large line with the owned machine demoted to the only subline. `getBaseRouteForgeDominantInstallHero(...)` was adjusted to preserve support-first hierarchy without reintroducing `다음 전투` or wave/proof labels, and [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) now locks that object-first shell for generic forge states and live support installs. Validation passed with `node --check playables/cinder-circuit/game.js`, `node --check playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`, and `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`.
  Why: the newest critique's `Top Priority` was to stop shipped forge/status surfaces from reading like a contract brief and instead show only current loadout, one dominant reward object, and one short combat ask. The highest-value bounded interpretation was to finish collapsing the forge top shell itself, because that is the first thing the player reads when deciding whether a reward is exciting.
  Follow-up Risk: the forge spotlight is cleaner, but card body copy still carries some longer promise/proof sentences lower in the grid. If critique still says the reward beat feels too talkative, the next bounded pass should trim per-card copy length or card preview density rather than reopening progression structure.
  Reference Direction: followed the object-first snap-read from `Hades` boon picks and `Nova Drift` level-ups, where the chosen toy owns the top line and the tactical implication is compressed underneath it.
  Release Gate: UX/UI

- 2026-03-29 05:00:00 KST
  Changed: hard-stopped the shipped consolidated route at `Wave 8` inside [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) so any accidental post-`Wave 8` combat advance now collapses into the short `Victory Lap` instead of silently opening `Wave 9`. `beginWave(...)` now treats `index >= DEFAULT_ROUTE_WAVE_COUNT` as `victory lap -> result`, and `getBaseRoutePostWaveTransition(...)` no longer advertises another forge break for impossible post-`Wave 8` shipped states. I updated [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) to lock that contract so consolidated post-wave transitions resolve to `victory_lap` rather than `forge`. Validation passed with `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`.
  Why: the newest critique's `Top Priority` said the game was still balancing two live runs because `Wave 9-12` remained active even while the shipped target claimed to be an 8-wave appetite loop. The highest-value bounded interpretation was to make the actual runtime stop at the promised endpoint before doing more UI copy trimming or late-run tuning.
  Follow-up Risk: this closes the live gameplay path, but `Wave 9-12` data and some late-route helper text still exist for future hooks and internal tests. If critique still flags the shipped game as two games at once, the next bounded pass should remove or quarantine the remaining player-facing `Late Break / Afterburn` summaries rather than reopening progression content.
  Release Gate: Progression

- 2026-03-28 23:59:50 KST
  Changed: rewired the shipped-route copy spine in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) so the default title, HUD/pause, and forge summaries all read as one compact arc: `조용한 선체 -> Wave 3 무기 방향 -> Wave 6 지원 설치 -> Wave 8 숙련 랩`. `getShippingLadderSteps(...)` now exposes those four beats directly, `getShippingContractSummary(...)` and `getShippingMachinePayoffSummary(...)` stop using `런 실루엣 / 증명 / 마감` shorthand for the shipped route, and post-`Wave 6` machine summaries now surface the installed support silhouette inline instead of talking like a route brief. I also expanded `getLeanStartLaunchSummary(...)` into four tiny chips so the title panel hints at the whole run without extra prose, and changed `getBaseRouteForgeSpotlightSummary(...)` to use `다음 전투` instead of `다음 시험` for the shipped forge context. I updated [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) to lock the new four-step ladder, the new pause/HUD/forge labels, and the support-install machine summary. Validation passed with `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`.
  Why: the newest critique's `Top Priority` was still open because the shipped route kept describing itself like a contract/proof document instead of a short finished run with one hunger line. The highest-value bounded interpretation was to fix the shared helper layer that all compact player-facing surfaces already use, rather than adding another system or rewriting one screen in isolation.
  Follow-up Risk: the run is now speaking one simpler language, but some deeper helper text and combat/result copy still use `proof` framing outside the compact shipped surfaces. If critique keeps flagging route jargon, the next bounded UX pass should trim those remaining non-default summaries and `Tab` history strips rather than broadening progression again.
  Reference Direction: followed the terse hierarchy of `Hades` boon picks and `Brotato` shop/status reads, where the player first sees the current toy and immediate next beat, not a route taxonomy.
  Release Gate: UX/UI

- 2026-03-28 23:58:00 KST
  Changed: retuned the shipped `Wave 6-8` support arc in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) so `Chassis Breakpoint` now installs each doctrine's actual mid-run secondary silhouette instead of defaulting to the long-run primary payoff. `buildWave6ChassisBreakpointChoices(...)` now prefers `getDoctrineMidrunSupportSystemId(...)`, which makes the shipped run land `Volt Drones` for `Mirror Hunt`, `Aegis Halo` for `Kiln Bastion`, and `Ember Ring` for `Storm Artillery`; that aligns the shipped route with the existing support-catalog intention and gives Wave 7 a visibly different second toy sooner. In the same pass, `applySupportProofEncounterConfig(...)` now gives `Ember Ring` its own `Ring Cut -> Ring Re-ignite -> Ring Overclock` encounter ladder for `Wave 6-8`, so the artillery route no longer falls back to generic domination text once the new ring is installed. I exported `resolveWaveConfig(...)` for validation and updated [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) to lock the new doctrine-to-midrun installs, the `Ember Ring` proof labels, and the revised shipped-route support expectations. Validation passed with `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`.
  Why: the newest critique's `Top Priority` asked for the shipped run to mutate into a real second toy by `Wave 6-7`, not just keep proving the gun/body line. I took the highest-value concrete interpretation as "make the already designed mid-run support identities actually land on the shipped route, then make the missing artillery support branch read like a real combat form" instead of adding another system or more UI scaffolding.
  Follow-up Risk: `Wave 8` still upgrades the already installed mid-run system rather than reopening the broader support catalog, which is cleaner for payoff but means doctrine-primary support families remain mostly a post-`Wave 8` ambition. If critique keeps saying the back half still tops out too early, the next bounded build pass should decide whether `Wave 8` wants a second bay unlock or a doctrine-primary cameo without reintroducing route-admin wording.
  Release Gate: Builds

- 2026-03-28 22:35:00 KST
  Changed: expanded the shipped `Wave 7-8` support payoff read in [game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) so the default second-system beat now names the actual toy the player earned instead of falling back to generic module/admin language. `getSupportSystemSpotlight(...)` now covers `Ember Ring`, `Kiln Sentry`, `Seeker Array`, and `Volt Drones` in addition to `Aegis Halo`, with tier-aware promise/proof/feed copy for each, and `getBaseRouteForgePreviewLabel(...)` now uses those spotlight labels so late support cards read as `추적 랙`, `자율 편대`, `거점 포탑`, or `절단 고리` rather than `효과`. I updated [cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) to lock the new support spotlight outputs, the shipped branch-payoff summary, and the Wave 8 forge preview/transformation labels for offensive support upgrades. Validation passed with `node --check playables/cinder-circuit/game.js`, `node --check playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`, and `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`.
  Why: the latest critique's `Top Priority` still needed one visible `Wave 7-8` secondary-system payoff beat on the actual shipped route. I took the highest-value concrete interpretation as "make the already-installed support upgrade read like a new machine identity everywhere the player confirms it" instead of widening scope into docs or more late-route generator surgery in the same pass.
  Follow-up Risk: the shipped support payoff is now much more object-first, but the default run contract still carries doctrine-driven scaffolding underneath the Wave 3 and Wave 6 generator helpers. If critique keeps saying the run is mentally front-loaded, the next bounded progression pass should strip doctrine/admin wording from those default generator descriptions rather than adding another support family or extra forge wrapper.
  Reference Direction: followed the object-first reward read from `Hades` boon picks and `Nova Drift` level-ups, where a support payoff should first say what new machine piece exists on-screen and only second imply what combat ask it solves.
  Release Gate: Progression

- 2026-03-28 22:10:00 KST
  Changed: tightened the shipped opener contract in [game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) so pre-`Wave 3` player-facing surfaces stop advertising a partly complete run. `getShippingContractSummary(...)` now shows `현재 선체 / 빈 선체` before the first weapon break instead of `런 실루엣`, `getShippingLadderSteps(...)` drops the early `보조` mention from the `START` note, and the title shell now routes through a new `getLeanStartLaunchSummary(...)` helper so it only sells `조용한 시작 -> Wave 3 무기 굴절` rather than briefing `Wave 6` and the closing lap up front. I updated [cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) to lock the lean launch summary, the early live-status copy, and the `빈 선체` opening pause/status strip. Validation passed with `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`.
  Why: the latest critique's `Top Priority` was still open at the very start of the run, because the default title and early status contract were still presenting too much future structure before the first weapon/body break had earned attention. The highest-value bounded interpretation was to make the opener feel truly fragile and incomplete on the surfaces the player sees first, without reopening docs, support timing, or broader progression scaffolding.
  Follow-up Risk: the opener now hides later route grammar more cleanly, but shipped docs and some deeper non-default summaries can still mention `Signature` or longer-route promises outside this start-facing slice. If critique keeps saying the game opens with theory instead of hunger, the next bounded pass should hit the remaining shipped-facing docs or Tab/readout summaries rather than re-expanding start UI.
  Release Gate: Progression

- 2026-03-28 15:42:34 KST
  Changed: rewired the shipped forge reward header in [game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) so the base-route overlay no longer leads with `런 실루엣` plus `지금 도약/준비/증명`. I added `getBaseRouteForgeSpotlightSummary(...)` and routed `renderForgeOverlay()` through it, which makes the context card mirror the actual on-screen pickup instead: the first slot now uses the chosen card's own preview label/value such as the weapon evolution or installed rider identity, and the second slot stays on one `다음 시험` line. Final forge still collapses to `형태 고정 + 마무리`. I also updated [cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) to lock headline/rider/final spotlight summaries, and validation passed with `node --check playables/cinder-circuit/game.js`, `node --check playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`, and `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`.
  Why: the newest critique's `Top Priority` was still open on the forge screen, because even after the third slot was removed the header kept selling route contract grammar instead of the installed object the player was about to take. The highest-value bounded interpretation was to collapse just that header to `one prize + one proof ask`, which advances the reward gate without reopening combat, support timing, or more route wrappers.
  Follow-up Risk: the forge header is now power-first, but the individual card tags still use abstract role labels like `주력` and `버팀`. If critique keeps saying the reward moment still reads too authored, the next bounded UI pass should decide whether those tags should also become more object-facing without re-expanding the overlay.
  Reference Direction: followed the appetite-first reward framing from `Hades`, `Nova Drift`, and `Brotato`, where the pause beat names the thing you are getting first and leaves route theory off the main read.
  Release Gate: Rewards

- 2026-03-28 14:12:54 KST
  Changed: tightened one more shipped-facing contract surface in [game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) so the default `Wave 6-8` status board no longer swaps into installed-support headlines like `방호 고리` or other support spotlight copy the moment a rider exists. I kept active `supportProof` and `chassisProof` callouts intact, but changed the fallback shipped-route readout to stay on `getShippingContractSummary(...)` plus `getShippingLadderFocus(...)`, and I renamed the third ladder rung from `방호` to the more honest `증명` so the compact loop reads as `START -> 도약 -> 증명` instead of advertising support completeness. I updated [cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) to lock the new ladder label and the shipped default-status behavior, and validation passed with `node --check playables/cinder-circuit/game.js`, `node --check playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`, and `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`.
  Why: the newest critique's `Top Priority` was to strip the shipped UI contract down to one honest 8-wave ladder with a lean opener, one bend, one proof spike, and no default promise of support-bay/admin completeness. The highest-value bounded interpretation was to fix the status surface that still turned an earned rider into the headline contract, because that made the run feel pre-solved instead of keeping attention on the actual `Wave 3 -> Wave 6 -> closing lap` climb.
  Follow-up Risk: this restores the default status board to a cleaner ladder, but support-specific flavor now lives mostly inside active proof windows and result copy rather than the idle headline. If critique starts saying the Wave 6 payoff has become too muted, the next bounded pass should add a smaller secondary support chip inside proof states or forge payoff cards instead of promoting support names back into the default status slot.
  Release Gate: Progression

- 2026-03-28 07:42:34 KST
  Changed: scrubbed the remaining shipped-path `Wave 6` package fantasy in [game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) and locked the new contract with [cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs). I rewrote doctrine `supportDoctrineText` so it no longer claims `Wave 6` already opened a support bay, recut `getBaseRouteForgeChoiceTransformation(...)` so `bastion_bay_forge` no longer emits `body/support bracket` or `Wave 8 마무리 포지` bundle copy for the shipped single-axis chassis break, and made `getBaseRouteForgeContextTailSummary(...)` fail closed to `null` so the forge header now shows only the installed form and the immediate proof ask instead of a third branch/payoff slot. Smoke coverage now asserts the empty forge tail plus the single-axis chassis transformation text, and validation passed with `node --check playables/cinder-circuit/game.js`, `node --check playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`, and `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`.
  Why: the latest critique's `Top Priority` was to remove every remaining shipped-path promise that still bundled the `Wave 6` chassis lock with support install or reserved bay payoff, then make the forge context read like one installed object and one next proof. The highest-value bounded interpretation was to fix the specific copy and UI helpers that were still contradicting the mechanics rather than widening scope into another support or combat system pass.
  Follow-up Risk: the shipped breakpoint is now mechanically honest on the touched surfaces, but other older summaries outside the default route may still carry `Wave 6 support bay` memory if a future pass reuses them. If critique still finds bundle language leaking back in, the next bounded pass should audit remaining non-default `bastion_bay_forge` feed/result strings before adding more rider content.
  Reference Direction: followed the reward-shell restraint from `Hades` boon picks and `Nova Drift` upgrade pauses, where the header sells one installed form first and one immediate test second instead of a three-part route brief.
  Release Gate: Builds

- 2026-03-28 07:10:00 KST
  Changed: gave the shipped `Wave 6-7` `Kiln Sentry` branch its first bespoke proof encounter in [game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) instead of letting it ride the shared relay/drift ask. I added `applySupportProofEncounterConfig(...)` after the existing chassis overlay in `resolveWaveConfig(...)`, and the installed sentry family now rewrites those two fights into `Kiln Crosshold` and `Kiln Reclaim`: Wave 6 prioritizes `binder/warden` picks around a forward sentry pocket, Wave 7 prioritizes `brander` cuts and reclaiming the same turret-backed pocket instead of generic pocket rotation. The same pass routes the new `supportProof` state into live status/feed, and updates the shipped ladder/roadmap text so `Wave 6` now correctly says the first support rider installs with the chassis break instead of arriving later. I also updated [cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) to assert the new sentry proof labels/directives plus the corrected shipped ladder copy. Validation passed with `node --check playables/cinder-circuit/game.js`, `node --check playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`, and `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`.
  Why: the latest critique's `Top Priority` was to make installed `Wave 6-8` support families earn reruns through distinct combat asks, not more catalog breadth. The highest-value bounded interpretation was to spend one pass on `Kiln Sentry`, because it already promised a pocket-owning turret fantasy in runtime but the encounter layer was still teaching the same generic relay/drift read as other branches.
  Follow-up Risk: `Kiln Sentry` now owns a distinct hold/reclaim proof, but `Seeker Array` and `Volt Drones` can still fall back to generic hazard-level directives if they do not get the same encounter-side treatment. If critique keeps flagging support routes as too similar, the next bounded pass should give one of those offensive families its own target-priority overlay rather than widening the catalog again.
  Release Gate: Balance

- Older entries trimmed automatically: 1

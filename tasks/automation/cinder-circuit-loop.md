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
- Immediate priority: make the shipped `Wave 6-8` close on a path-owned weapon/body capstone and demote support installs back to amplifier status so the `Wave 1-8` route is remembered for build transformation, not helper packaging.

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

- 2026-03-30 08:35:00 KST
  Findings:
  - `Wave 5-8` path identity is clearer than before, but the run still spends too much of its payoff budget on chassis/support packages by `Wave 6`. The player is being asked to absorb gun mutation, path lock, support install, chassis identity, and greed/admin grammar in one short chapter, which blunts anticipation instead of extending it.
  - The code now contains real weapon evolution ladders, but the shipped appetite curve still does not make them the emotional spine of the run. A strong arena roguelite should make the player crave the next barrel, volley shape, or beam width first; here the more memorable promise is still often the helper/frame wrapper around the gun.
  - Between-wave choice grammar is broader on paper than the actual feeling of choice. `Infuse / Improve / Reforge / Recycle`, path contracts, support systems, and mutations exist, yet the shipped route still cashes many of them as authored package beats rather than letting the player feel like they are assembling a recipe with offense, defense, and utility layers over time.
  - This matters for the eventual `20-30` wave target: a longer run cannot be sustained by adding more support families or branch labels if the current 8-wave slice already front-loads too much system completeness. The opening and midrun need more hunger and less "machine already assembled" energy.
  Top Priority: Rebuild the shipped forge cadence so `Wave 1-8` guarantees at least two clearly visible main-weapon growth spikes before first-support spectacle becomes dominant, and demote support/chassis picks to amplifiers of the chosen gun/path rather than the primary emotional payoff.
  Why Now: If the player remembers the helper package more than the gun they grew, replay desire stays prototype-shallow.
  Do Not Repeat: Do not answer this with more module families, more frame names, or more late-route scaffolding while the shipped loop still front-loads system identity faster than weapon hunger.
  Release Gate: Builds

- 2026-03-30 07:20:00 KST
  Findings:
  - The shell is cleaner, but the run still behaves too much like one combat exam with three labels. `Wave 5` promises offense / defense / greed ownership, yet the shipped asks still mostly collapse into “hold one lane, then hold it longer,” which is not enough to make players rerun for a different movement fantasy.
  - First-support readability improved, but support actors are still arriving before branch identity is fully proven. Missiles, drones, shields, intercepts, and deployables can still claim too much arena attention in the same short chapter, so the player remembers helpers circling the hull more than the path they chose at `Wave 5`.
  - The result and pause surfaces now read cleaner, yet they still have to explain branch identity after the fact because combat itself is not separating it hard enough. Strong references do not need the debrief to tell you what fantasy you just played; the arena already made it obvious.
  - For a game that wants eventual `20-30` wave appetite, the current branch structure is still too thin. If offense, defense, and greed cannot each sustain 3 clearly different waves now, the project should not broaden the ladder yet; it should deepen these three asks first.
  Top Priority: Re-author `Wave 6-8` so each `Wave 5` path owns a distinct movement contract and enemy/hazard cadence before extra support spectacle layers in: offense should repeatedly cash open kill lanes, defense should manufacture and rotate safe recovery pockets, and greed should force risky scrap dives and fast exits.
  Why Now: Until the branch changes what the player is actually doing in the arena, the run still reads like a polished prototype rather than a replayable roguelite chapter.
  Do Not Repeat: Do not answer this with more branch naming, more capstone cards, or more support module families while the three paths still feel this similar to play.
  Release Gate: Combat

- 2026-03-30 06:01:02 KST
  Findings:
  - The shipped route now has better midrun and closing spikes, but the game still sells them through too much reading. The forge overlay is still a card-heavy explanation stack with context, proof, preview rows, pivot text, side notes, and slot labels, so the player is parsing the reward instead of wanting it instantly.
  - Early growth is still too visually complete for a rerun-hungry roguelite. `fireWeapon()` and the live support render path can layer extra patterns, orbit frames, deployable fields, intercept rings, missiles, and drones quickly enough that the run starts feeling "already assembled" instead of hungry for later transformation.
  - The minimal HUD idea is correct, but `Tab`/pause surfaces are still carrying status-board prose instead of acting like fast reference. That keeps the fantasy in admin mode longer than strong arena roguelite references, which usually hide detail until after the player already feels the build.
  - The combat space is larger on paper, yet support spectacle still risks collapsing movement decisions into "kite inside your own effects." If the first support install does not create one obvious lane-control advantage, extra shapes just make the arena feel busier rather than more tactical.
  Top Priority: Rebuild the shipped `Wave 1-6` readability pass around one dominant reward read at a time: one hero forge card, one short proof line, and support visuals that reveal only the primary payoff until higher tiers earn extra spectacle.
  Why Now: The chapter finally has better payoff structure, so the next ceiling is whether players can feel and desire that power without reading through it.
  Do Not Repeat: Do not answer this with another module family, more roadmap copy, or more simultaneous support effects before the opener and forge stop feeling clean.
  Release Gate: UX/UI

- 2026-03-30 05:30:51 KST
  Findings:
  - The new `Wave 6` package finally creates a rerun-worthy midrun silhouette, but the shipped chapter now risks peaking too early. `SUPPORT_SYSTEM_START_WAVE = 6` plus the current `Wave 8` rider/payoff framing in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js#L2767) and [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js#L11150) make the back half read like smaller follow-through on top of the real spike, not a second transformation beat.
  - The three paths still converge into too much of the same reward grammar after the branch lock. [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js#L2728) defines strong generic support families, but once the player has taken offense, defense, or greed, the route still too often resolves into shared orbit/shield/missile/drone tier logic rather than path-owned capstones that feel unique to that run.
  - The roadmap language still undersells the last stop for an 8-wave game. [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js#L9047) frames `Wave 8` mostly as `proof` and a short victory lap, which would be acceptable in a longer structure, but in the current shipped slice it leaves the closing forge beat sounding like verification instead of one more visible power mutation.
  - This hurts long-term ambition too. A game that wants eventual `20-30` wave appetite needs multiple owned spikes per chapter, not one large `Wave 6` jump and then a support tidy-up. Right now the run is better than before, but it still teaches a stronger escalation model than it actually delivers.
  Top Priority: Rebuild `Wave 8` into branch-specific capstone fusion choices that mutate the locked `Wave 5/6` form itself, so offense, defense, and greed each end the shipped run with a second unmistakable silhouette jump instead of a mostly generic rider install or tier-up.
  Why Now: Until the current route has two real payoff beats instead of one, replay hunger will flatten before the run ends.
  Do Not Repeat: Do not answer this with more generic support tiers or extra `proof` copy while the final forge stop still feels smaller than the midrun lock.
  Release Gate: Progression

- 2026-03-30 05:01:11 KST
  Findings:
  - The shell is cleaner now, but the shipped run still feels like a teaser because too much of the game's real spectacle is parked in quarantined late-route definitions. [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js#L5517) starts the biggest split-wing, slag-seed, lattice, and breach-form weapon transformations inside `LATE_ASCENSION_DEFS`, so the 8-wave route is still teaching hunger for toys it does not properly deliver.
  - The same problem exists in the synergy ceiling. [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js#L5707) keeps the strongest `support + chassis + greed` convergence logic in `LATE_FIELD_CONVERGENCE_DEFS`, which means the current shipped path can preview build language without paying it off as a repeatable run-defining form.
  - `Wave 5` currently locks an ask more clearly than it locks a fantasy. [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js#L11008) mostly resolves the branch into `공세/방호/판돈` labels and short ask text, but not into a visibly distinct owned silhouette that a player would rerun specifically to reach again.
  - Forge presentation is thinner than before, yet it still sells deferred payoff more than immediate appetite. [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js#L26783) and [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js#L27010) still frame `Wave 5-8` choices around previews, support-payoff hints, and future install language instead of letting the shipped branch already hit with a big enough on-run transformation.
  Top Priority: Pull one late-route-grade transformation package per path into the shipped `Wave 5-8` chapter so offense, defense, and greed each earn a visibly larger weapon/body/support state by `Wave 6-8`, not just a cleaner label and a modest rider.
  Why Now: Until the current 8-wave route contains a payoff players actively want to see again, longer-run ambition is still scope promise instead of replayable fun.
  Do Not Repeat: Do not spend another pass only slimming copy or HUD while the best multi-barrel, chain, orbit, and chassis fantasies still live outside the shipped route.
  Release Gate: Builds

- 2026-03-30 04:30:37 KST
  Findings:
  - The project is still drifting in its source-of-truth surfaces. [docs/games/cinder-circuit-design.md](/Users/seren/workspace/poong-game/docs/games/cinder-circuit-design.md) still says the title is a `Wave 3 -> Wave 6 -> Wave 8` ladder and that forge should show current core/bench first, which directly contradicts the active branch-first 8-wave shell and keeps reintroducing the wrong hierarchy.
  - The in-run HUD is still carrying prototype dashboard weight. [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) still renders roadmap cards, contract strips, machine panels, and era tracks around the arena, and [playables/cinder-circuit/styles.css](/Users/seren/workspace/poong-game/playables/cinder-circuit/styles.css) shows the non-`Tab` state is mostly a compressed version of that same package, not a genuinely thin combat HUD. Strong references keep the arena dominant and make the detailed build board opt-in, not ever-present.
  - Forge is still too eager to explain the machine. The current `forge-focus`, context tails, preview rows, proof labels, and branch-payoff callouts in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) are better framed than before, but they still ask the player to parse a mini spec sheet before feeling desire for one obvious spike.
  - This matters beyond wording because the opening fantasy is still being front-loaded with system completeness. If the player can already read route contract, support track, proof window, bench logic, and overdrive framing before the first strong mutation lands, later growth loses surprise and the run stops building hunger.
  Top Priority: Strip the default combat shell to one dominant wave ask, one survival resource cluster, and one compact weapon/path read; move roadmap/contract/machine detail fully behind `Tab`, then rewrite the design doc UI section to match that shipped hierarchy exactly.
  Why Now: Until the arena gets visual breathing room and the documentation stops teaching the old dashboard shape, every new build or wave idea will keep landing inside a shell that makes the run feel smaller and busier than it is.
  Do Not Repeat: Do not answer this with more overlay categories, more card metadata, or another late-wave branch while the default play view still behaves like a compressed debug console.
  Release Gate: UX/UI

- 2026-03-30 18:45:00 KST
  Findings:
  - The project is still drifting at the shell layer. [docs/games/cinder-circuit-design.md](/Users/seren/workspace/poong-game/docs/games/cinder-circuit-design.md) says the title ladder is `Wave 3 -> Wave 6 -> Wave 8`, which directly contradicts the active branch-first run spine and keeps teaching support as the real second chapter.
  - The result screen still lands like a prototype pretending it already has endgame scale. [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) still stamps `FINAL FORM`, `Overdrive`, affix chips, bench inventory, and route labels into the debrief, which is too much system bookkeeping for an 8-wave slice that should mostly make the player remember the weapon jump and the Wave 5 route.
  - Pause and forge are cleaner than before, but they still default to machine/admin framing over appetite. `현재 머신`, `설치`, preview rows, proof text, and branch detail stacks are still asking the player to parse the build instead of instantly wanting the next visible spike; strong references win here by showing one dominant offer, one hook, and getting out.
  - The run is also still front-loading completeness in language. Even with a quieter opener, recurring `Overdrive` and endform/final-form framing makes the chassis sound too evolved too early, which weakens the emotional distance between bare starter gun and earned spectacle later.
  Top Priority: Rewrite the shipped title/result/pause/forge language hierarchy so the only memorable beats are `Bare Hull -> Wave 3 weapon -> Wave 5 path -> Wave 8 closure`, with support, affixes, and bench state demoted to secondary detail or hidden entirely on the main rerun-facing surfaces.
  Why Now: Until the run reads as a clean hunger loop instead of a compressed systems document, adding more build layers will keep reducing desire instead of increasing replayability.
  Do Not Repeat: Do not answer this with more branch content, more support payoff variants, or more result stats while the current shell still over-explains and over-completes the run fantasy.
  Release Gate: Rewards

- 2026-03-30 18:10:00 KST
  Findings:
  - The new `Wave 5` branch now affects combat, but the game still presents itself like the old prototype. [docs/games/cinder-circuit-design.md](/Users/seren/workspace/poong-game/docs/games/cinder-circuit-design.md) and title/result surfaces in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) still teach `Wave 3 weapon jump -> Wave 6 support install -> Wave 8 proof` more loudly than `offense / defense / greed` as the rerun-defining fork.
  - The result screen is still memorializing the wrong thing. `getBaseRouteResultRouteLabel()` reduces the run to `조용한 선체 -> weapon beat -> support beat`, so a player can finish an offense or greed route and still get told the real identity was the support install instead of the `Wave 5` decision.
  - The forge stop is still too admin-heavy for a game that should sell hunger in under a second. `renderForgeOverlay()` still stacks current-loadout, featured-install, branch-payoff, proof, preview, and contract framing where stronger references like `Hades`, `Nova Drift`, and `Brotato` lead with one dominant object and one obvious payoff, not a mini design brief.
  - The opener is quieter than before, but the run still leaks too much completed-system language too early. `Overdrive`, `FINAL FORM`, support-track framing, and branch/payoff labels keep making the machine sound more complete than it looks, which blunts the emotional jump from tiny starter gun to earned spectacle.
  Top Priority: Rewrite shipped-facing title/forge/result hierarchy so the run is remembered as `Bare Hull -> Wave 3 weapon -> Wave 5 offense|defense|greed -> Wave 8 closure`, with `Wave 6` support treated as a payoff detail inside that path instead of the headline.
  Why Now: The mechanical branch exists; until the UI and docs teach that structure instantly, players still read the run as a short scripted ladder instead of a replayable build path.
  Do Not Repeat: Do not spend another pass inventing late-run forms or more branch tech while the shipped surfaces still summarize the run with the wrong beats.
  Release Gate: UX/UI

- Older entries trimmed automatically: 1

## Latest Improvement

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

- 2026-03-30 09:05:00 KST
  Changed:
  - Re-staged the shipped `Wave 6` offense/defense breakpoint bundles in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) so their bundled support installs now carry `activationWave: 8`; the chassis + late-form mutation still apply immediately, but live support stats stay offline through `Wave 6-7` and only wake for the final lap.
  - Updated the same `Wave 6` card/feed copy in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) to tell the player the support hardware is a folded amplifier, not the headline payoff, so the proof window sells the new gun/body silhouette first.
  - Refreshed [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) and [tasks/automation/state/improver-session.md](/Users/seren/workspace/poong-game/tasks/automation/state/improver-session.md) to lock `activationWave: 8` on those packages and assert `Wave 7` stays support-quiet while `Wave 8` reactivates the staged install.
  Why:
  - The latest critique's `Top Priority` asked for two visible main-weapon growth spikes before first-support spectacle dominates. The highest-value bounded interpretation was to keep the existing `Wave 6` branch packages, but delay their helper visuals so the player actually feels `Wave 3 weapon break -> Wave 6 weapon/body mutation -> Wave 8 support wake + closure` instead of one crowded midrun spike.
  Follow-up Risk:
  - This makes the midrun appetite curve cleaner, but defense in particular now leans harder on chassis/convergence reads during `Wave 6-7`. If critique next says the branch fantasy is clearer yet too quiet, the next bounded pass should strengthen branch-owned gun/body tells in those two waves rather than waking support spectacle early again.
  Validation: `node --check playables/cinder-circuit/game.js`; `node --check playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`; `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs` still fails on the pre-existing `playables/cinder-circuit/tools/cinder-circuit-smoke.mjs:4236` assertion (`sentryTierTwo.interceptRange > 0`) after the new staged-support assertions passed
  Release Gate: Builds

- 2026-03-30 07:45:00 KST
  Changed:
  - Re-authored the shipped greed route in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) so `Wave 6-8` now plays as `Entry Snap -> Caravan Hook -> Jackpot Exit`: bigger arenas, lower active caps, faster-closing vault/caravan windows, higher payout bait, and new `chassisProof` states that force short scrap dives followed by immediate escape lines instead of generic lane ownership.
  - Updated greed-facing ask text and combat feed in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) so the branch now explicitly teaches `entry pocket -> hook-and-cut -> jackpot exit` cadence, with live `Scrapline Route` messages pulling the current route note instead of one shared salvage warning.
  - Refreshed [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) and [tasks/automation/state/improver-session.md](/Users/seren/workspace/poong-game/tasks/automation/state/improver-session.md) to lock greed-route arena width, active-cap, caravan speed, payout, proof labels, and updated ask copy.
  Why:
  - The latest critique's `Top Priority` said the three `Wave 5` paths still were not changing arena behavior enough. The highest-value bounded interpretation was that offense and defense already had owned `Wave 6-8` cadences, so greed needed the same treatment in the actual encounter config instead of another reward or naming pass.
  Follow-up Risk:
  - Greed now reads more distinctly, but its pressure still comes mostly from hazard windows rather than a bespoke enemy-targeting profile. If critique next says the branch is clearer yet still too forgiving or too noisy, the next bounded pass should tune greed-specific spawn targeting or exit-lane enemy bias rather than add another progression layer.
  Validation: `node --check playables/cinder-circuit/game.js`; `node --check playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`; `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs` still fails on the pre-existing `playables/cinder-circuit/tools/cinder-circuit-smoke.mjs:4228` assertion (`sentryTierTwo.interceptRange > 0`) after the new greed-route assertions passed
  Release Gate: Combat

- 2026-03-30 06:13:14 KST
  Changed:
  - Rebuilt the shipped forge context in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) around a slim `forge-context-rail` so base-route reward stops now open with two compact reads (`현재 머신`, current payoff lane) plus one optional transition note instead of a second oversized spotlight card competing with the reward.
  - Updated the same base-route forge cards in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) and [playables/cinder-circuit/styles.css](/Users/seren/workspace/poong-game/playables/cinder-circuit/styles.css) so the headline offer carries the visible tag, title, and only `다음 전투` proof line, while side offers became quieter supporting cards with lighter spacing and smaller spotlight treatment.
  - Refreshed [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) and [tasks/automation/state/improver-session.md](/Users/seren/workspace/poong-game/tasks/automation/state/improver-session.md) to lock the new `status rail + hero card` hierarchy so future passes fail if forge drifts back to a multi-panel explanation stack.
  Why:
  - The latest critique's `Top Priority` asked for one dominant forge read at a time. The highest-value bounded interpretation was to demote the context shell so the player sees one obvious reward card first instead of parsing two large explanation surfaces before choosing.
  Follow-up Risk:
  - The reward moment is cleaner now, but `Wave 5` still shows three simultaneous options and the non-headline cards can still feel a bit busy on smaller screens. If critique next says the forge still reads too much like a card tray, the next bounded pass should compress side-card text density or grid layout rather than add new reward wrappers.
  Validation: `node --check playables/cinder-circuit/game.js`; `node --check playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`; `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs` still fails on the pre-existing `playables/cinder-circuit/tools/cinder-circuit-smoke.mjs:4219` assertion (`sentryTierTwo.interceptRange > 0`) after the new forge hierarchy assertions passed
  Reference Direction: `Hades` boon/shop reward hierarchy and `Brotato` level-up restraint; keep the surrounding shell thin so one offer reads as the moment and the rest read as supporting alternatives.
  Release Gate: UX/UI

- 2026-03-30 05:44:11 KST
  Changed:
  - Forced the shipped `Wave 8` forge in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) to resolve into a branch-owned closure card instead of reusing the shared headline pool: `Wave 5 공세 추적 -> Cataclysm Arsenal`, `방호 고정 -> Warplate Halo`, `판돈 급습 -> Black Ledger Heist`, each stamped as the `완성` headline on the compact route.
  - Opened the same late-break choice creators for the compact route's `nextWave: 8` stop and extended the post-pick combat feed so that when one of those closures is taken in the shipped run, the run immediately records the owned `lateBreakProfileId` and announces the matching lane/pocket/payout proof instead of waiting for the `Wave 9` armory path.
  - Updated [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) and [tasks/automation/state/improver-session.md](/Users/seren/workspace/poong-game/tasks/automation/state/improver-session.md) so future passes fail if `Wave 8` drifts back to generic support-headline promotion instead of the route's owned capstone.
  Why:
  - The latest critique's `Top Priority` said the current route still peaked at `Wave 6` because `Wave 8` read like a smaller rider/install follow-through. The highest-value bounded interpretation was to make the shipped final stop pay out the path itself, so every run now gets a second silhouette jump owned by its `Wave 5` decision.
  Follow-up Risk:
  - `Wave 8` now closes harder, but the second slot on that forge can still feel comparatively generic on some runs because only the headline was path-locked here. If critique next says the closure still half-converges, the next bounded pass should retune the non-headline `Wave 8` offer per branch rather than broadening the chapter again.
  Validation: `node --check playables/cinder-circuit/game.js`; `node --check playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`; `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs` still fails on the pre-existing `playables/cinder-circuit/tools/cinder-circuit-smoke.mjs:4214` assertion (`sentryTierTwo.interceptRange > 0`) after the new `Wave 8` branch-closure assertions passed
  Release Gate: Progression

- 2026-03-30 06:10:00 KST
  Changed:
  - Pulled late-route-grade `Wave 6` branch packages into the shipped route in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js): `offense` now locks `Vector Thrusters` plus a core-matched late ascension (`Crownsplitter Array` / `Slagburst Drive` / `Voltspine Lattice` / `Anvil Prism`), `defense` now locks `Bulwark Treads` plus `Citadel Spindle`, and `greed` now locks `Salvage Winch` plus `Towchain Reaver` instead of stopping at the smaller prior rider state.
  - Wired `applyForgeChoice(...)` so those `Wave 6` cards immediately apply the late-form ids during the shipped `Wave 5-8` chapter, then rewired the shipped forge presentation helpers in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) to spotlight the bigger package title on card previews/accents rather than burying the moment under the support install label.
  - Updated [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) and [tasks/automation/state/improver-session.md](/Users/seren/workspace/poong-game/tasks/automation/state/improver-session.md) so future passes keep `Wave 6` on branch-first spectacle and fail if the shipped path drifts back to support-first modesty.
  Why:
  - The latest critique's `Top Priority` said the current 8-wave route was still hoarding split-wing, spindle, and tow-fork-grade transformations in late-route definitions. The highest-value bounded interpretation was to let each `Wave 5` path cash out one of those bigger forms inside `Wave 6-8`, so the shipped run already reaches a rerun-worthy silhouette instead of only hinting at one.
  Follow-up Risk:
  - `Wave 6` now lands much harder, but `Wave 8` support upgrades may read comparatively smaller on some runs because the biggest visual jump now happens one stop earlier. If critique next says the back half flattens after this move, the next bounded pass should retune `Wave 8` upgrades or closure asks around these new midrun forms instead of adding another branch.
  Validation: `node --check playables/cinder-circuit/game.js`; `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs` still fails on the pre-existing `playables/cinder-circuit/tools/cinder-circuit-smoke.mjs:4201` assertion (`sentryTierTwo.interceptRange > 0`) after the new `Wave 6` branch-package assertions passed
  Release Gate: Builds

- 2026-03-30 04:47:39 KST
  Changed:
  - Rewired the shipped combat HUD in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) so live `Wave 1-8` combat now defaults to one right-side `combat ask` card built from `createMinimalCombatAskMarkup(...)`, while `Tab` temporarily opens the hidden detail board by flipping `hudDetailOpen` and restoring `Wave / Dash / Time / Scrap` plus the recent feed stack.
  - Added the matching thin-shell selectors in [playables/cinder-circuit/styles.css](/Users/seren/workspace/poong-game/playables/cinder-circuit/styles.css) so `.combat-feed--minimal-ask` stays visible in the default arena view instead of disappearing with the old stack-list rule, keeping the arena on `survival cluster + compact machine read + one wave ask`.
  - Rewrote the shipped UI truth in [docs/games/cinder-circuit-design.md](/Users/seren/workspace/poong-game/docs/games/cinder-circuit-design.md), refreshed [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) to lock the new `Tab`/minimal-HUD behavior, and updated [tasks/automation/state/improver-session.md](/Users/seren/workspace/poong-game/tasks/automation/state/improver-session.md) so future passes do not drift back toward a default dashboard shell.
  Why:
  - The latest critique's `Top Priority` still said the default combat shell was carrying too much panel weight and that detail needed to move fully behind `Tab`. The highest-value bounded interpretation was to give the arena one dominant ask card in live play and make `Tab` finally behave like the deferred detail layer instead of a dead key.
  Follow-up Risk:
  - `Tab` now reveals feed/detail timing, but the left machine panel is still intentionally compact even in detail mode. If critique next says the hidden board still is not enough of a true status board, the next bounded pass should expand only the `Tab` state with one additional run-memory row rather than re-thickening the live combat shell.
  Validation: `node --check playables/cinder-circuit/game.js`; `node --check playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`; `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs` still fails on the pre-existing `playables/cinder-circuit/tools/cinder-circuit-smoke.mjs:4186` assertion (`sentryTierTwo.interceptRange > 0`) after the new HUD/detail assertions passed
  Reference Direction: `Hades` combat HUD restraint and `Nova Drift`'s arena-first readability; keep one immediate ask visible in combat and defer build-history/detail reads until the player intentionally inspects them.
  Release Gate: UX/UI

- 2026-03-30 19:05:00 KST
  Changed:
  - Rebuilt the result-card shell in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) around a new `createBaseRouteResultBuildMarkup(...)` helper so the rerun-facing panel now leads with `RUN MEMORY`, the four-beat route recap, and a short `최종 형태 / 무기 축 / 잔여 고철` read instead of `FINAL FORM`, `Drive`, affix chips, and bench inventory.
  - Slimmed `finishRun(...)` in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) so the result stat grid stops memorializing route/core/drive bookkeeping and leaves the branch-first route memory to the main card plus run pills.
  - Updated [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) and [tasks/automation/state/improver-session.md](/Users/seren/workspace/poong-game/tasks/automation/state/improver-session.md) to lock the new result hierarchy and explicitly fail if `FINAL FORM`, `Drive`, `속성 없음`, or `보관 코어` leak back onto the main result panel.
  Why:
  - The latest critique's `Top Priority` still called out the result screen as the clearest prototype holdover. The highest-value bounded interpretation was to demote late-run bookkeeping from the debrief so the player leaves remembering `Bare Hull -> Wave 3 weapon -> Wave 5 path -> Wave 8 closure`, not an over-complete machine sheet.
  Follow-up Risk:
  - The result copy paragraph still mentions the dominant form and proof window in full sentences. If critique next says the debrief still reads too document-like even after the card cleanup, the next bounded pass should compress `getBaseRouteResultCopy(...)` itself rather than add more result stats or tags.
  Validation: `node --check playables/cinder-circuit/game.js`; `node --check playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`; `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs` still fails on the pre-existing `playables/cinder-circuit/tools/cinder-circuit-smoke.mjs:4168` assertion (`sentryTierTwo.interceptRange > 0`) after the new result-card assertions passed
  Reference Direction: `Hades` death recap hierarchy and `Nova Drift` end-of-wave restraint; lead with the run-defining route memory and one owned form read, not a loadout audit.
  Release Gate: Rewards

- 2026-03-30 03:48:13 KST
  Changed:
  - Rewrote the shipped run-memory helpers in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) so title/status/result hierarchy now remembers `조용한 선체 -> Wave 3 무기 -> Wave 5 경로 -> Wave 8 완성 시험`; `getBaseRouteStatusBoardSummary(...)`, `getShippingLadderSteps(...)`, `getBaseRouteResultRouteLabel(...)`, and `getBaseRouteResultBeatLabels(...)` no longer headline `Wave 6 지원 설치` as the second core beat.
  - Retuned the compact forge context in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) so the `Wave 5` stop brands itself as `Wave 5 경로` and shows the current form flowing into `공세 추적 / 방호 고정 / 판돈 급습`, while pause snapshots only use `현재 설치` when the shared payoff label is truly an install.
  - Updated shipped-facing expectations in [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs), refreshed the source-facing promise in [docs/games/cinder-circuit-design.md](/Users/seren/workspace/poong-game/docs/games/cinder-circuit-design.md), and recorded the new branch-first rule in [tasks/automation/state/improver-session.md](/Users/seren/workspace/poong-game/tasks/automation/state/improver-session.md).
  Why:
  - The latest critique's `Top Priority` said the mechanical `Wave 5` fork already exists but shipped surfaces still teach the old `Wave 3 -> Wave 6 -> Wave 8` ladder. The highest-value bounded interpretation was to rewrite the shared memory shell so the route-defining fork becomes the thing the player sees, remembers, and reruns for.
  Follow-up Risk:
  - Shared UI memory is now branch-first, but the result build card still carries `FINAL FORM` / `Overdrive` language and some branchless support-only states fall back to generic `Wave 5 진로 선택` preview text. If critique next says the route reads cleaner but the end panel still sounds too complete, the next bounded pass should rewrite that result-card copy rather than add more branch content.
  Validation: `node --check playables/cinder-circuit/game.js`; `node --check playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`; `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs` still fails on the pre-existing `playables/cinder-circuit/tools/cinder-circuit-smoke.mjs:4151` assertion (`sentryTierTwo.interceptRange > 0`) after the new branch-memory assertions passed
  Reference Direction: `Hades` boon/result hierarchy and `Nova Drift` upgrade memory; lead with one route-defining beat and let support spectacle read as the payoff inside that path, not the chapter headline.
  Release Gate: UX/UI

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

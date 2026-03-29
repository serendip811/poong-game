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
- Immediate priority: make shipped `Wave 1-8` read like a complete first chapter instead of a teaser for later acts by removing future-route/admin leakage, keeping only three clear power states, and giving `Wave 5-8` enough open space for one earned support silhouette to prove itself.

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

- 2026-03-30 10:15:00 KST
  Findings:
  - The shipped run still reads like a preview build for a bigger game instead of a clean first chapter. Large live seams of `game.js` keep `Wave 10-12`, doctrine chase, capstone, and `Afterburn` grammar close to the shipped route, so the player is constantly feeling adjacent future scaffolding instead of a self-contained `Wave 1-8` appetite loop.
  - The forge still explains too much relative to its payoff. `createForgePreviewRows()` and the surrounding forge presentation keep building multi-row context and route-preview logic where stronger references like `Hades`, `Nova Drift`, or `Brotato` usually win by showing one dramatic delta first and letting the next combat room do the proof.
  - Early growth is still being diluted by concept density. Even with a leaner pause card, the shipped slice still carries too many nearby nouns and route concepts around support bays, doctrines, evolution, and greed, which makes the opener feel more like build administration than survival with a hungry transformation curve.
  - The long-run ambition is not yet supported by a proven combat spine. Until `Wave 5-8` clearly becomes `one installed support silhouette opens real movement pockets and lane ownership`, talking about `20-30` waves risks becoming scope fantasy instead of believable progression design.
  Top Priority: Make shipped `Wave 1-8` chapter-local across title, forge, and status surfaces by stripping non-shipped route previews and doctrine/endform foreshadowing, then present each reward as one visible change plus one immediate combat ask.
  Why Now: A longer escalation curve starts by making the first chapter replayable and desire-driven, not by briefing the player on systems the current run cannot yet cash out.
  Do Not Repeat: Do not answer this with another roadmap row, future-act preview, or named progression wrapper that leaves the `8-wave` run feeling like a teaser.
  Release Gate: Progression

- 2026-03-29 23:31:01 KST
  Findings:
  - The run is still too visually and conceptually complete before it has earned excitement. `BASE_BUILD`, the exported route helpers, and large live seams of `game.js` still keep late-route doctrine/capstone/ascension machinery adjacent to the shipped path, so the short route keeps reading like a reduced build of a larger game instead of a finished opener with a strong hunger curve.
  - The forge is still over-explaining at the exact moment it should sell desire. `renderForgeOverlay()` still builds the stop around dominant-form summaries, proof windows, ask labels, context tails, and multiple transformation helpers; against the snap hierarchy of `Hades`, `Nova Drift`, or even `Brotato` shop/level-up cards, this is still a briefing screen, not a power spike screen.
  - Combat space is healthier than before on paper, but the payoff is still blurred by silhouette noise. `Wave 5-8` arenas do widen, yet the player can still carry enough chassis/support/hazard/readout clutter that movement decisions do not feel as clean and expressive as the route fantasy claims; the screen is often proving systems are present rather than proving one owned build has taken over.
  - The project should resist adding another progression layer right now. The current slice still has not fully nailed `small start -> weapon transformation -> support ownership lap`, so adding more passives, bay logic, or endform wrappers would only make the eventual `20-30 wave` ambition less believable, not more.
  Top Priority: Rebuild the shipped forge/pause/status presentation around one dominant offered form and one next-combat ask, while suppressing every nonessential shipped-route overlay or silhouette layer that makes `Wave 1-8` feel busier or more complete than its three-step ladder.
  Why Now: Until the player can instantly want the next form and then feel it clearly in open space, replayability will stall at prototype curiosity instead of build hunger.
  Do Not Repeat: Do not answer this with more support options, more route verbs, or another text pass that still leaves the same multi-layer reward/admin stack in place.
  Release Gate: Rewards

- 2026-03-29 23:15:00 KST
  Findings:
  - The shipped route is still conceptually and visually too broad for a run that is supposed to sell `small start -> weapon leap -> support leap`. `BASE_BUILD`, the render stack, and large live sections of `game.js` still carry doctrine, mutation, late-field, capstone, and `Afterburn` machinery, so the short run reads like a cropped midgame instead of an intentionally lean opener.
  - The early growth curve is still being undercut by fake completion. `createSupportSystemChoices()` can still fast-jump a base-route `Wave 8` support install straight to tier 2, which skips the satisfying arc of `install something modest at Wave 6, then feel it own two fights before wanting more`.
  - Forge readability is improved, but the shipped forge still asks the player to parse too many layers at once. `renderForgeOverlay()` still builds around context tails, branch payoff rows, ask labels, and transformation summaries; compared with `Hades` boon cards or `Nova Drift` level-ups, the object is still not dominant enough over the explanation.
  - The combat ceiling is still being blurred by system breadth rather than sharpened by cleaner asks. When the player already carries chassis marks, weapon frames, surge rings, satellites, halos, and other overlays, `Wave 5-8` loses some of the hard contrast that should make each newly earned silhouette feel like a real escalation step.
  Top Priority: Make the shipped `Wave 1-8` route render and reward only three visible power states: bare starter chassis, `Wave 3` weapon transformation, and one `Wave 6` support installation that grows by proving itself in combat, which means removing the `Wave 8` tier-2 catch-up shortcut and suppressing any unearned late-form/doctrine spectacle from the shipped path.
  Why Now: If the player starts half-complete or reaches a support payoff through a shortcut, there is no anticipation curve to sustain repeat runs.
  Do Not Repeat: Do not answer this with more support tiers, more passive layers, or more forge copy on top of the same over-complete silhouette stack.
  Release Gate: Builds

- 2026-03-29 22:30:57 KST
  Findings:
  - The shipped slice is still not structurally honest about being an `8-wave` game. `docs/games/cinder-circuit-source-application.md` still teaches `Wave 10-12` cadence and `playables/cinder-circuit/game.js` still carries large live seams of `Late Break`, `Afterburn`, and post-`Wave 8` support-bay language, so the player is still feeling roadmap leakage instead of a finished short run.
  - Reward readability is still below strong arena roguelite standards. Compared with the object-first snap of `Hades`, `Nova Drift`, or `Brotato`, `renderForgeOverlay()`, `createBaseRouteForgeContextMarkup()`, and `createBaseRoutePauseSnapshotMarkup()` still lead with `current machine / ask / proof / install` framing instead of landing the offered form and visible delta first.
  - The support chapter still reads too much like system administration. `createSupportSystemChoices()` is still built around install/upgrade/bay grammar and can still fast-track a tier-2 `Wave 8` support payoff, which front-loads completeness and weakens the feeling that the player is earning a bigger visual/function leap over time.
  - The run keeps narrating itself at the exact moments that should feel immediate. `maybeAdvancePhase()` and `enterForge()` still push a lot of explicit transition copy about what the next stop means, so the player is reading run management instead of feeling a clean `fight -> pick a power spike -> test it` rhythm.
  Top Priority: Collapse all shipped `Wave 1-8` reward and status surfaces to `current form -> offered leap -> next combat ask`, and fully quarantine all `Wave 9-12` / `Late Break` / support-bay admin language from the shipped docs, pause snapshot, combat-feed transitions, and forge framing.
  Why Now: Until the short run is instantly readable and desirable, more systems or tuning passes will keep landing as prototype overhead instead of replay hunger.
  Do Not Repeat: Do not answer this with more branch wrappers, more support-bay logic, or softer wording on the same multi-panel reward grammar.
  Release Gate: Rewards

- 2026-03-29 15:30:00 KST
  Findings:
  - The shipped run still plays too much like a managed stress test instead of a form-expression ladder. `beginWave()` can stack risk debt, greed raid, predator bait, combat cache, pursuit, and hazard amplification on top of the base wave, so even the supposed ownership band keeps inheriting prototype-style pressure clutter instead of letting one build identity breathe.
  - Combat space is not yet tuned like a replayable arena shooter. Even where arena sizes grow, `Wave 6-8` keeps rising enemy variety, active bodies, and targeted hazard pressure together, and `chooseHazardSpawn()` deliberately leans hazards into the player's route focus. That creates constant lane denial, which weakens the feeling that movement choices or weapon shape are actually solving the fight.
  - The support chapter still promises a wider system game than this slice can pay off. `createSupportSystemChoices()` is already talking in install/upgrade/bay language and even force-jumps to a tier-2 `Wave 8` payoff, so the player is being sold support administration before one clean support install has proven it can carry two fights by itself.
  - Forge/HUD readability is cleaner than before, but the reward grammar still behaves more like a briefing card than a desire hit. `renderForgeOverlay()` is still assembled around spotlight/context/ask/bill logic, while stronger references land the object and the power spike first; this game is still closer to explaining the run than making the next pick feel irresistible.
  Top Priority: Hard-quarantine all nonessential pressure taxes and side-objective overlays from the shipped `Wave 1-8` route, then retune `Wave 5-8` around larger breathing lanes, slightly lower live pressure, and exactly one support install that visibly owns two fights before any extra bay/upgrade/payoff logic returns.
  Why Now: If the player never gets clear room to feel a build take over the arena, more systems will read as clutter instead of depth.
  Do Not Repeat: Do not answer cramped combat with more support branches, more cache variants, or more descriptive forge framing.
  Release Gate: Combat

- 2026-03-29 14:35:00 KST
  Findings:
  - The shipped `8-wave` run still carries too much of a larger game's live machinery. `BASE_BUILD`, reward rows, HUD labels, and result/closure paths still expose `Late Break`, `Afterburn`, doctrine chase, and endform logic, so the player is feeling roadmap leakage instead of a finished short ladder.
  - The early growth curve is still too visually and structurally complete. Even when the title copy is cleaner, the codebase is already framing multi-tier supports, chase forms, and late-route silhouettes, which weakens the crucial release-feeling contrast between a bare opener and the first real leap.
  - Forge readability is improved, but it still behaves more like a designed briefing than a craving hit. Compared with the object-first snap of `Hades` boon choices or `Nova Drift` level-up moments, `renderForgeOverlay()` still spends too much surface on labels, proof framing, and ask narration before the new form lands.
  - Build breadth is now ahead of what the shipped slice can honestly prove. Missiles, drones, halos, sentries, greed frames, mutations, and endforms all promise long-run hunger, but the current run length only really validates one major support chapter, so the fantasy is broader than the payoff.
  Top Priority: Hard-lock the live `Wave 1-8` experience to a plain starter chassis, one big `Wave 3` weapon transformation, one major `Wave 6` support transformation, and a clean `Wave 7-8` mastery lap, with all player-facing `Late Break` / `Afterburn` / doctrine-pursuit language and payoff hooks fully hidden from the shipped route.
  Why Now: A longer 20-30 wave future only works if the short ladder already creates rerun hunger without roadmap scaffolding carrying it.
  Do Not Repeat: Do not answer this with another new support branch, another future-route teaser, or more text reshuffling on top of the same oversized live grammar.
  Release Gate: Progression

- 2026-03-29 13:20:00 KST
  Findings:
  - The run is still carrying too much future-run scaffolding for an `8-wave` game. `game.js` still contains large live seams of `Late Break` / `Afterburn` / `Wave 9-12` grammar, quarantine rules, and feed variants, which is a structural sign that the project is compensating for a weak shipped ladder with route administration instead of proving a satisfying short ladder first.
  - Player-facing surfaces are still more talkative than hungry. `renderForgeOverlay()`, the instant-draft combat feed, and the pause snapshot all keep explaining `headline / rider / proof / ask` relationships in words, while stronger references land the object, the delta, and the danger in one glance. This game is still making the player parse system framing instead of wanting the pickup.
  - The opener and status layer remain at odds with the red flags. The title is cleaner, but the live HUD/pause shell still presents a lot of run-structure language around a run that should begin smaller and simpler; that weakens the feeling that Wave 1 is a bare chassis and makes later spectacle feel less earned.
  - Build breadth is now ahead of build payoff. Missiles, drones, sentries, shields, greed contracts, and wave-specific branch logic all exist, but the current slice still lacks the punchy clarity of `small start -> first obvious weapon leap -> one major support/body leap -> mastery lap`. Until that reads viscerally, more branch grammar will only dilute rerun desire.
  Top Priority: Consolidate the shipped player-facing loop so title, pause, forge, and combat-feed surfaces show only current form, immediate upgrade delta, and next combat ask, while all non-shipped future-route grammar is removed or fully quarantined from the `Wave 1-8` experience.
  Why Now: The next ceiling gain is not another branch; it is making the existing slice instantly readable and desirable enough that players want a second run.
  Do Not Repeat: Do not answer this with another new lane, another route exception, or more terminology that still leaves the same verbose reward/admin shell in place.
  Release Gate: UX/UI

- 2026-03-29 23:59:59 KST
  Findings:
  - The shipped ladder is still more managed than hungry. `buildFieldGrantChoices()` keeps a default `twoCardBaseRouteContract` across most of `Wave 1-8`, only breaking it for the new `Wave 6` fork and forced `Wave 7` follow-up, so the run still spends more stops resolving the designer's contract than letting the player keep chasing or abandoning a build line.
  - `buildWave6ChassisBreakpointChoices()` makes the midpoint cleaner, but it still locks one featured chassis across offense, defense, and greed. That gives readable branches, yet it narrows the fantasy into `same body, pick your rider` instead of making Wave 6 feel like the run's first real transformation chapter.
  - The game is drifting back into future-route administration. `game.js` still carries a large amount of `Wave 9-12` / `Late Break` / `Afterburn` grammar and quarantine logic while the shipped run is only 8 waves, which is a warning sign that the project is solving unfinished appetite with extra route scaffolding instead of with a stronger live ladder.
  - Pause/HUD readability improved, but the forge moment still behaves more like a briefing than a craving hit. `renderForgeOverlay()` still builds context around spotlight summaries, transformation framing, combat asks, and contract labels before the pick lands, which is heavier than strong arena roguelite reward beats that show the new form first and let the test explain itself in play.
  Top Priority: Rebuild the shipped `Wave 3-8` reward cadence so at least three separate stops keep all three appetites live, and make `Wave 6` the first unmistakable silhouette leap instead of another managed package on the same chassis.
  Why Now: Until the 8-wave slice creates repeat-run hunger without route narration carrying it, adding longer-wave ambition is just hiding a weak core loop.
  Do Not Repeat: Do not answer this with more hidden fallback logic, more future-wave scaffolding, or more text compression on the same over-managed ladder.
  Release Gate: Builds

- 2026-03-29 00:40:00 KST
  Findings:
  - The new `Wave 6` fork is an improvement, but it is still mostly a packaged branch choice, not a build-authored chapter. `buildWave6ChassisBreakpointChoices()` locks the same featured chassis in every lane and then pre-bundles the support install for offense/defense, so the player is still selecting between prepared kits more than shaping a machine over time.
  - The run still loses its greed/utility tension too often after that midpoint. `buildFieldGrantChoices()` keeps the shipped `Wave 1-8` route on a two-card contract for most waves, which means the greed lane is frequently suppressed exactly where a rerunnable roguelite should keep asking whether the player wants more power now or safer ownership later.
  - `buildArchitectureDraftChoices()` still makes the run feel solved too early. A free doctrine-aligned Wave 3 weapon lock plus a forecasted Wave 6 payoff gives clarity, but it also narrows anticipation into “follow the promised chassis package” instead of building hunger for contested pivots, support timing, or risky economy lines.
  - The forge presentation is cleaner than before, but `renderForgeOverlay()` still spends too much structure on explaining the package: current loadout, featured install, ask, branch payoff, proof window. Strong arena roguelite reward screens land the object and its power spike first; this still reads closer to a guided briefing than a desire hit.
  Top Priority: Rework the shipped `Wave 4-8` reward ladder so the player can keep choosing between offense, defense/support, and greed at more than one stop, with support installs and economy risks competing as separate commitments instead of arriving pre-bundled inside fixed branch kits.
  Why Now: A single honest midpoint fork is not enough to create rerun hunger if the surrounding waves still collapse back into a solved script.
  Do Not Repeat: Do not answer this with a fourth branch, more terminology cleanup, or bigger numbers on the same prepacked lanes.
  Release Gate: Progression

- 2026-03-29 23:18:00 KST
  Findings:
  - The recent forge cleanup exposed the deeper problem: the shipped run is still mostly pre-authored. `buildWave6ChassisBreakpointChoices()` in `playables/cinder-circuit/game.js` effectively returns one doctrine-aligned featured chassis/support bundle plus a fallback, so the biggest mid-run beat behaves more like a confirm screen than a draft.
  - The shipped route keeps hiding its most replayable layers. `buildFieldGrantChoices()` explicitly collapses the base `Wave 1-8` contract to two safe cards, and the greed/gamble lane gets cut unless a secondary branch opens. That means the live slice still talks about greed/utility paths more than it actually lets players chase them.
  - `buildArchitectureDraftChoices()` is clean but too obedient: free doctrine-aligned weapon locks with forecasted `Wave 6` payoff make the run readable, yet they also make repeated runs feel solved early. Strong rerun hooks come from aiming at a future package and paying tradeoffs to get there, not just accepting the game’s recommended silhouette on schedule.
  - The game now has missiles, shields, drones, orbitals, greed contracts, and weapon evolutions in code, but the shipped ladder bundles or suppresses too many of them instead of letting them compete for slot pressure. That lowers build hunger even if individual cards read better.
  Top Priority: Rebuild the shipped `Wave 3-8` forge structure so at least one major between-wave beat presents a real three-way fork between offense growth, defense/support stability, and greed/utility pressure with visibly different payoff targets.
  Why Now: The UI shell is cleaner enough that the remaining replay problem is structural choice hunger, not wording.
  Do Not Repeat: Do not answer this with more copy trimming or another prepacked doctrine bundle that only looks like choice.
  Release Gate: Builds

- 2026-03-29 22:05:00 KST
  Findings:
  - Combat space is no longer the clearest blocker. `Wave 5-8` arenas already expand hard in `playables/cinder-circuit/game.js`, so the run now has enough room to prove builds. The bigger failure is that the game keeps filling that breathing room with route jargon instead of payoff.
  - The shipped reward moment still reads like run administration. `renderForgeOverlay()` in `playables/cinder-circuit/game.js` is still built around `proofWindow`, `current machine`, `featured install`, `combat ask`, preview rows, and contract-role framing before the install itself lands. Strong references put the object and its fantasy first; this still explains the test before the player wants the power.
  - The docs are still steering the team toward the wrong game. `docs/games/cinder-circuit-design.md` still calls the title a `mission board` with signature selection, and `docs/games/cinder-circuit-source-application.md` still normalizes `run-start signature` plus a `Wave 9-12` ladder. That keeps future-route grammar alive as design truth even if the shipped path is gated to 8 waves.
  - `getBaseRouteWave8ClosureCopy(...)` and related status/closure helpers still spend too many words on `roadmapDetail`, closure narration, and abstract lane language. The game has support systems, missiles, shields, drones, and visible weapon geometry already; if those visuals still need this much explanation, the payoff is not landing cleanly enough.
  Top Priority: Rewrite the shipped `Wave 3 / Wave 6 / Wave 8` reward and status shell around one dominant transformation card, one short combat promise, and zero future-route/roadmap narration; update the two design docs to match that shipped truth.
  Why Now: The run already has enough combat space and visible parts to sell desire, so the next ceiling is clarity discipline at the exact moments that should create replay hunger.
  Do Not Repeat: Do not answer this with another arena expansion, another support branch, or lighter copy wrapped around the same `proof/roadmap/contract` shell.
  Release Gate: UX/UI

- 2026-03-29 21:12:00 KST
  Findings:
  - The shipped run is still not structurally honest. `docs/games/cinder-circuit-design.md` still documents a title `mission board` with signature framing and still leaves `Afterburn` in the build target, while `docs/games/cinder-circuit-source-application.md` still teaches `run-start signature` and a `Wave 9-12` act ladder as if they are normal shipped grammar.
  - This drift is not just in docs. `playables/cinder-circuit/game.js` still carries player-facing combat-feed/cache language for `Act 4`, `ascension`, `afterburn`, `Dominion`, and other late-route wrappers, so the live game is still built to talk about a bigger hidden route instead of selling one clean repeatable run.
  - The forge is cleaner than before, but it still reads like a control panel. The shipped path still centers `current machine`, `featured install`, `combat ask`, branch payoff rows, contract labels, proof text, and slot cost tags in the same reward moment, which is more dashboard than hunger. Strong references land one visible power spike first and let the test be inferred.
  - The opening remains at risk of front-loading taxonomy instead of desire. As long as signatures, route jargon, and future bracket logic remain active design truth, the run starts too mentally busy and later transformation feels less earned.
  Top Priority: Do one strict shipped-surface quarantine pass: remove signature selection and all `Wave 9-12 / Afterburn / ascension / Act 4 / contract-route` teaching from title, docs, forge, combat-feed, and status surfaces for the live `Wave 1-8` route.
  Why Now: Until the player can start and finish one run without seeing the prototype's shadow systems, replay hunger will keep losing to explanation load.
  Do Not Repeat: Do not answer this with another wording trim on the same architecture or with new support/build content.
  Release Gate: UX/UI

- Older entries trimmed automatically: 1

## Latest Improvement

- 2026-03-30 10:40:00 KST
  Changed:
  - Added `createBaseRouteMachinePanelMarkup(...)` in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) so shipped `Wave 1-8` status/HUD surfaces now render one sanitized `현재 머신 + 다음 ask` card instead of rebuilding raw live summaries from the wider route state.
  - Routed both the compact contract panel and in-combat `renderWaveTrack()` through that helper, which means the live machine panel now always carries one immediate combat ask under the visible form change and no longer risks leaking polluted late-route state into the shipped chapter.
  - Updated [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) and [tasks/automation/state/improver-session.md](/Users/seren/workspace/poong-game/tasks/automation/state/improver-session.md) to lock the new machine panel against `Afterburn`, `Wave 9`, and `Cataclysm` leakage on polluted shipped builds.
  Why:
  - The latest critique's `Top Priority` still had an open gap on shipped status surfaces: title and forge were closer to `one visible change + one immediate ask`, but the live HUD card still stopped at loadout labels. The highest-value concrete interpretation was to make the machine panel itself chapter-local and ask-driven, so `Wave 1-8` reads like a complete first chapter even when broader route state exists in memory.
  Follow-up Risk:
  - The HUD/status card is now aligned with the compact forge/pause shell, but the forge header still computes more context than it finally shows. If critique next says the live panel is clean but reward stops still feel overbuilt, the next bounded pass should trim forge-header plumbing or preview-row dependency rather than add more route wrappers.
  Validation: `node --check playables/cinder-circuit/game.js`; `node --check playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`; `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs` still fails on the pre-existing `playables/cinder-circuit/tools/cinder-circuit-smoke.mjs:4057` assertion (`sentryTierTwo.interceptRange > 0`) after the new shipped machine-panel assertions passed
  Release Gate: Progression

- 2026-03-29 23:59:00 KST
  Changed:
  - Rebuilt the shipped `Tab` pause snapshot in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) around a new `getBaseRoutePauseSnapshotSummary(...)` helper so the compact route no longer reuses the stacked forge-context shell. Pause now shows one dominant form/install title, one short `current -> result` transition line, and only two pills: `지금` and `다음 전투`.
  - Updated [playables/cinder-circuit/styles.css](/Users/seren/workspace/poong-game/playables/cinder-circuit/styles.css) to support the slimmer pause card with `pause-summary__hero-head` and `pause-summary__pill-row`, including wrapped pill text so the combat ask reads like a quick board instead of a clipped paragraph.
  - Refreshed [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) and [tasks/automation/state/improver-session.md](/Users/seren/workspace/poong-game/tasks/automation/state/improver-session.md) to lock the new compact pause structure against regressions to forge-style stacked sublines and late-route wording.
  Why:
  - The latest critique's `Top Priority` was still open in the shipped status presentation: `Tab` was reusing forge grammar, so the run still felt busier and more explained than its three-step ladder needed. The highest-value bounded interpretation was to turn pause into a one-glance board that keeps only the dominant silhouette and the next combat ask.
  Follow-up Risk:
  - This makes pause faster to parse, but the forge overlay itself can still feel heavier than the new status card around it. If critique next says `Tab` is clean but reward stops still feel like briefings, the next bounded pass should trim forge header/card layering to the same object-first discipline instead of adding more reward verbs.
  Validation: `node --check playables/cinder-circuit/game.js`; `node --check playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`; `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs` still fails on the pre-existing `playables/cinder-circuit/tools/cinder-circuit-smoke.mjs:4044` assertion (`sentryTierTwo.interceptRange > 0`) after the new shipped pause snapshot assertions passed
  Reference Direction: `Nova Drift` pause/upgrade readouts and `Hades` boon-card hierarchy; one dominant object first, supporting ask second, no stacked admin rows.
  Release Gate: UX/UI

- 2026-03-29 23:40:00 KST
  Changed:
  - Hardened shipped `Wave 8` support gating in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) by adding `shouldBlockBaseRouteWave8SupportCatchup(...)` and routing both `shouldOfferSupportSystem(...)` and `getVisibleSupportOfferSystemIds(...)` through it, so compact-route runs that skipped the `Wave 6` install no longer get a last-second support catch-up at the final forge.
  - Updated [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) to lock the new shipped rule: supportless `Wave 8` builds now expose no support offers, while runs that already installed their doctrine-owned support still keep the normal proof/payoff path.
  - Refreshed [tasks/automation/state/improver-session.md](/Users/seren/workspace/poong-game/tasks/automation/state/improver-session.md) with the new `no catch-up install` heuristic for future consolidation passes.
  Why:
  - The latest critique's `Top Priority` explicitly called for removing the shipped `Wave 8` support catch-up shortcut so the short run only shows three earned power states. The highest-value concrete interpretation was to close the late-install path itself, because a support silhouette that appears only at the finish forge cannot feel like a form that proved itself across two fights.
  Follow-up Risk:
  - This makes the compact ladder more honest, but supportless greed or doctrine-commit runs may now feel intentionally sparse if their non-support payoff at `Wave 8` is not exciting enough. If critique next says the shortcut is gone but those endings feel flat, the next bounded pass should strengthen the non-support `Wave 8` payoff card rather than reopening late support installs.
  Validation: `node --check playables/cinder-circuit/game.js`; `node --check playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`; `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs` still fails on the pre-existing `playables/cinder-circuit/tools/cinder-circuit-smoke.mjs:4038` assertion (`sentryTierTwo.interceptRange > 0`) after the new shipped `Wave 8` support-gating assertions passed
  Release Gate: Builds

- 2026-03-29 22:44:36 KST
  Changed:
  - Rebuilt shipped `wave clear -> forge/victory lap` combat-feed transitions in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) around a new `getBaseRouteTransitionFeedCopy(...)` helper, then routed the consolidated `Wave 1-8` branches in `maybeAdvancePhase()` and `enterForge()` through it so they now speak in one compact `current form -> offered leap -> next ask` sentence instead of wave-specific admin narration.
  - Updated [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) and [tasks/automation/state/improver-session.md](/Users/seren/workspace/poong-game/tasks/automation/state/improver-session.md) to lock those shipped transition summaries against regressions to `Late Break`, `Afterburn`, `support bay`, or `Wave 9-10` wording.
  Why:
  - The latest critique's `Top Priority` was still open in the moment-to-moment transition feed, because even after pause/result cleanup the shipped route kept narrating `Wave 4` and `Wave 8` stops like management steps. The highest-value bounded interpretation was to collapse the shared clear/forge feed grammar itself so the player sees one readable reward rhythm everywhere: current form first, the next leap second, the next combat ask last.
  Follow-up Risk:
  - The feed is now much cleaner, but the actual forge card body can still carry more explanatory copy than the new transitions around it. If critique next says the stop opens cleanly but the card stack still feels wordy, the next bounded pass should trim forge-card body copy to match this same object-first cadence instead of reopening more progression branches.
  Validation: `node --check playables/cinder-circuit/game.js`; `node --check playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`; `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs` still fails on the pre-existing `playables/cinder-circuit/tools/cinder-circuit-smoke.mjs:4025` assertion (`sentryTierTwo.interceptRange > 0`) after the new shipped transition assertions passed
  Release Gate: Rewards

- 2026-03-29 16:20:00 KST
  Changed:
  - Retuned [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) so `support_showcase` hazards stop preferring the player’s forward route in the shipped `Wave 6-8` support chapter. The targeting profile now projects route candidates farther out, penalizes route-tag anchors, and adds heavier outer-flank candidates, which makes hazard spawns lean toward side pockets instead of repeatedly sealing the same approach lane.
  - Updated [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) and [tasks/automation/state/improver-session.md](/Users/seren/workspace/poong-game/tasks/automation/state/improver-session.md) to lock deterministic support-showcase hazard behavior around off-route flank placement.
  Why:
  - The latest critique's `Top Priority` asked for `Wave 5-8` breathing lanes and less side-pressure clutter so one `Wave 6` support install can visibly own two fights. The highest-value bounded interpretation was that `chooseHazardSpawn(...)` was still leaning `support_showcase` hazards back into the player's route focus, so support-proof fights kept feeling lane-denial heavy even after earlier spawn/arena tuning.
  Follow-up Risk:
  - This gives the support chapter cleaner side-pocket hazards, but offensive or greed support paths may now get slightly too much central safety if their enemy mix remains unchanged. If critique next says support-proof fights are readable but too soft, the next bounded pass should tune branch-specific enemy mix or hazard count, not reintroduce forward-route hazard bias.
  Validation: `node --check playables/cinder-circuit/game.js`; `node --check playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`; `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs` still fails on the pre-existing `playables/cinder-circuit/tools/cinder-circuit-smoke.mjs:4001` assertion (`sentryTierTwo.interceptRange > 0`) after the new support-showcase hazard assertions were added
  Release Gate: Combat

- 2026-03-29 21:45:43 KST
  Changed:
  - Rebuilt shipped result/history labeling in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) so `finishRun(...)` no longer surfaces doctrine names on the `Wave 1-8` route. The result panel now summarizes the run as a compact `조용한 선체 -> Wave 3 weapon -> Wave 6 support -> Wave 8 finish` ladder using concrete form/support labels like `Ember Spindle` and `Seeker Array`.
  - Updated shipped recent-gain formatting in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) so build-aware `교리 채택` / `Wave 6 Ascension` entries collapse to visible player-facing milestones instead of leaking `Mirror Hunt Doctrine` or abstract midpoint admin onto pause/result history.
  - Refreshed [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) and [tasks/automation/state/improver-session.md](/Users/seren/workspace/poong-game/tasks/automation/state/improver-session.md) to lock the new shipped result route label and beat pills against doctrine/admin regressions.
  Why:
  - The latest critique's `Top Priority` was to fully hide `Late Break / Afterburn / doctrine-pursuit` payoff hooks from the live `Wave 1-8` route. The highest-value bounded interpretation was to quarantine the post-run and recent-gain surfaces, because they were still turning a finished short ladder back into roadmap grammar after the player had already earned the run's visible forms.
  Follow-up Risk:
  - Result and pause history now speak in concrete form/support beats, but the in-run HUD/status layer can still inherit older `proof` or generic midpoint nouns from shared helpers. If critique next says the run ends cleanly but mid-run status still feels like admin, the next bounded pass should collapse those remaining helper labels toward the same concrete `weapon/support/finish` ladder instead of adding new reward branches.
  Validation: `node --check playables/cinder-circuit/game.js`; `node --check playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`; `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs` still fails on the pre-existing `playables/cinder-circuit/tools/cinder-circuit-smoke.mjs:4001` assertion (`sentryTierTwo.interceptRange > 0`) after the new shipped result/history assertions passed
  Release Gate: Progression

- 2026-03-29 23:59:59 KST
  Changed:
  - Rebuilt the shipped pause snapshot in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) to reuse the same compact spotlight shell as the shipped forge context, so `Tab` now reads as `현재 형태 -> 즉시 변화 -> 다음 전투` instead of the older two-slot `machine-payoff` status board plus note.
  - Updated [playables/cinder-circuit/styles.css](/Users/seren/workspace/poong-game/playables/cinder-circuit/styles.css) so the pause hero pads and frames that spotlight shell cleanly inside the existing overlay card without reopening extra rows or labels.
  - Refreshed [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) and [tasks/automation/state/improver-session.md](/Users/seren/workspace/poong-game/tasks/automation/state/improver-session.md) to lock the new shipped pause markup on compact lines like `다음 설치 · Wave 6 지원 설치` and `설치 · Aegis Halo`.
  Why:
  - The latest critique's `Top Priority` was to make shipped title/pause/forge/feed surfaces show only current form, immediate delta, and the next combat ask. The highest-value bounded interpretation was to finish the pause shell, because that surface was still reading more like a status document than a desire-first card after the forge/feed cleanup. The reference direction stayed anchored to `Hades` boon-card hierarchy and `Nova Drift` level-up snapshots: dominant object first, one short delta second, one combat promise last.
  Follow-up Risk:
  - The pause card is now aligned to the shipped forge shell, but the live HUD wave strip still uses a more literal two-slot board outside pause. If critique next says `Tab` is clean but the in-combat shell still feels more administrative, the next bounded pass should collapse that shared HUD strip toward the same object-first rhythm instead of adding new wrapper labels.
  Validation: `node --check playables/cinder-circuit/game.js`; `node --check playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`; `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs` still fails on the pre-existing `playables/cinder-circuit/tools/cinder-circuit-smoke.mjs:3934` assertion (`sentryTierTwo.interceptRange > 0`) after the new shipped pause assertions passed
  Release Gate: UX/UI

- 2026-03-29 20:41:22 KST
  Changed:
  - Reopened the shipped `Wave 5` field grant in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) as a forced three-card stop on the consolidated `Wave 1-8` route, so the first post-`Wave 3` reward beat now keeps offense, defense, and greed live instead of collapsing back to the old `주력 / 버팀` safety contract.
  - Updated [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) and [tasks/automation/state/improver-session.md](/Users/seren/workspace/poong-game/tasks/automation/state/improver-session.md) to lock `Wave 5` on `headline / rider / gamble`, with `field_greed` still occupying the live `판돈` slot.
  Why:
  - The latest critique's `Top Priority` was to keep all three appetites contestable across at least three shipped stops. The highest-value bounded interpretation was to uncollapse `Wave 5`, because it turns the early payoff beat into a real appetite test before the new `Wave 6` silhouette leap and `Wave 7` follow-up.
  Follow-up Risk:
  - This makes the ladder hungrier, but it may also raise the greed lane's pickup rate too sharply if `Wave 5` debt pressure is under-costed. If critique next says the gamble card is becoming too automatic that early, the next bounded pass should tune `field_greed`'s `Wave 5` numbers rather than reopen more stops.
  Validation: `node --check playables/cinder-circuit/game.js`; `node --check playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`; `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs` still fails on the pre-existing `playables/cinder-circuit/tools/cinder-circuit-smoke.mjs:3984` assertion (`sentryTierTwo.interceptRange > 0`) after the new `Wave 5` contract assertions passed
  Release Gate: Builds

- 2026-03-29 01:15:00 KST
  Changed:
  - Reopened the shipped `Wave 7` field grant in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) as a true three-card follow-up whenever the run already hit the `Wave 6` chassis breakpoint, so the midpoint no longer collapses straight back into the old two-card `주력 / 버팀` contract.
  - Kept the new `Wave 7` cache on visible offense / defense / greed tension by letting the existing `field_greed` raid contract compete as the `판돈` slot beside the installed-support rider instead of suppressing economy risk for the whole proof chapter.
  - Updated [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) and [tasks/automation/state/improver-session.md](/Users/seren/workspace/poong-game/tasks/automation/state/improver-session.md) to lock the new `Wave 7` breakpoint follow-up behavior.
  Why:
  - The latest critique's `Top Priority` was to keep offense, defense/support, and greed competing at more than one stop on the shipped `Wave 4-8` ladder. The highest-value bounded interpretation was to uncollapse `Wave 7`, because that was the first post-breakpoint reward beat still forcing the run back into a solved two-card script.
  Follow-up Risk:
  - This restores one more real choice stop, but the greed card now reappears even on support-proof runs. If critique next says the `Wave 7` gamble is always correct or always ignored, the next bounded pass should tune `field_greed`'s debt/payoff math for post-breakpoint builds rather than reopening more waves at once.
  Validation: `node --check playables/cinder-circuit/game.js`; `node --check playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`; `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs` still fails on the pre-existing `playables/cinder-circuit/tools/cinder-circuit-smoke.mjs:3983` assertion (`sentryTierTwo.interceptRange > 0`) after the new `Wave 7` contract assertions passed
  Release Gate: Progression

- 2026-03-29 23:59:00 KST
  Changed:
  - Rebuilt the live `Wave 6` breakpoint in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) from a promoted support install plus fallback into a true three-way fork: a doctrine-primary offense install, a doctrine-midrun defense/support install, and a `Scrapline Raid Frame` greed branch that locks the chassis while front-loading scrap/debt pressure.
  - Added `wave6BranchRole` / `wave6GreedFrame` handling in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) so the greed pick is not just economy text; it now applies a real `Wave 6` frame, shows its own forge preview/greed transformation read, and keeps follow-up paths like the `Afterglow -> Crownfire` line alive through the riskier raid route.
  - Updated [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) to lock doctrine-specific `Wave 6` offense/defense/greed cards, the new greed-frame application path, and the revised recurring `Wave 6` headline/rider/gamble expectations.
  Why:
  - The latest critique's `Top Priority` was to make at least one major between-wave beat on the shipped `Wave 3-8` route feel like a real fork between offense growth, defense/support stability, and greed/utility pressure. The highest-value bounded interpretation was to fix the live `Wave 6` midpoint itself, because that was still collapsing into a disguised confirm screen even after the forge UI cleanup.
  Follow-up Risk:
  - `Wave 6` now branches honestly, but the offense-first path shifts some old support-window assumptions in tests and future balance work. If critique next says the fork exists but one branch is still obviously dominant, the next bounded pass should tune branch-specific pressure/payoff math or preview desirability, not add a fourth lane.
  Validation: `node --check playables/cinder-circuit/game.js`; `node --check playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`; `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs` still fails on the pre-existing `playables/cinder-circuit/tools/cinder-circuit-smoke.mjs:3980` assertion (`sentryTierTwo.interceptRange > 0`) after the new `Wave 6` fork assertions passed
  Release Gate: Builds

- 2026-03-29 22:32:00 KST
  Changed:
  - Recut the shipped forge context shell in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) so `Wave 3 / Wave 6 / Wave 8` reward moments now read as one dominant transform title, one short `current -> result` transition line, and one `바로 다음 전투` ask instead of `현재 머신 / 대표 설치 / 전투 요청` admin rows.
  - Shortened shipped `Wave 8` closure/status copy in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) from roadmap-style lane narration to compact completion reads such as `Cataclysm Arsenal 완성`, keeping the reward shell on present payoff rather than future-route explanation.
  - Updated [docs/games/cinder-circuit-design.md](/Users/seren/workspace/poong-game/docs/games/cinder-circuit-design.md), [docs/games/cinder-circuit-source-application.md](/Users/seren/workspace/poong-game/docs/games/cinder-circuit-source-application.md), and [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) to match the shipped `8-wave` truth and lock the new object-first forge shell. The UI direction stayed anchored to `Hades` boon-card hierarchy and `Nova Drift` level-up snapshots: object first, one promise second, no roadmap paragraph.
  Why:
  - The latest critique's `Top Priority` was to rebuild the shipped reward/status shell around one dominant transformation card and one short combat promise. The highest-value bounded interpretation was to strip the remaining forge-header admin rows and late-break roadmap narration before adding anything else.
  Follow-up Risk:
  - The forge headline is cleaner now, but some individual choice descriptions still contain older support/admin phrasing outside the header shell. If critique next says the top card lands but side descriptions still read like tooling, the next bounded pass should trim the worst per-choice descriptions rather than reopening the shell.
  Validation: `node --check playables/cinder-circuit/game.js`; `node --check playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`; `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs` still fails on the pre-existing `playables/cinder-circuit/tools/cinder-circuit-smoke.mjs:3945` assertion (`sentryTierTwo.interceptRange > 0`) after the updated forge-context and closure-copy assertions passed
  Release Gate: UX/UI

- 2026-03-29 18:42:56 KST
  Changed:
  - Reworked shipped-route `combat feed` rendering in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) so the `Wave 1-8` pause/`Tab` view no longer expands into raw wave-log paragraphs. `renderCombatFeed()` now keeps the shipped run on the same compact headline/proof card read even in expanded pause mode.
  - Added `shouldQuarantineShippingCombatFeedText(...)` and `getShippingCombatFeedEntrySummary(...)` in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) so leaked `Afterburn / Ascension / Wave 9-12 / Dominion Run` feed text is replaced with sanitized `현재 머신` and current combat-ask summaries instead of prototype-route copy.
  - Extended [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) to lock that polluted shipped combat-feed entries no longer surface `Dominion`/`Afterburn` wording through the exported shipped summary helper.
  Why:
  - The latest critique's `Top Priority` called for a strict shipped-surface quarantine across combat-feed and status surfaces, and current player feedback also says `Tab` is still too text-dense. The highest-value bounded interpretation was to stop the shipped pause feed from behaving like a prototype log and keep it closer to the compact status-history direction seen in `Hades` chamber recap surfaces and `Nova Drift`'s short object-first level-up reads.
  Follow-up Risk:
  - This quarantines leaked late-route vocabulary and cuts pause-feed density, but it does not rewrite every wave-start `pushCombatFeed(...)` string at the source. If critique next says the feed reads cleaner yet some live in-wave toasts still sound too administrative, the next bounded pass should retune the worst shipped `Wave 1-8` feed messages themselves rather than reopening bigger route systems.
  Validation: `node --check playables/cinder-circuit/game.js`; `node --check playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`; `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs` still fails on the pre-existing `playables/cinder-circuit/tools/cinder-circuit-smoke.mjs:3933` assertion (`sentryTierTwo.interceptRange > 0`) after the new shipped combat-feed assertions passed
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

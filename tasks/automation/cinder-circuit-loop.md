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
- Immediate priority: make the new `Wave 5` fork visibly reshape `Wave 6-8` while keeping `Wave 1-2` starved and quiet; stop spending shipped attention on `Wave 9+ / Afterburn` grammar.

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

- 2026-03-30 16:20:00 KST
  Findings:
  - `Wave 5` now exposes a real three-way stop, but the shipped run still does not honor it strongly enough afterward. The design doc and surface grammar still mostly teach `Wave 3 weapon jump -> Wave 6 support install -> Wave 8 proof`, so the new fork risks reading like extra menu noise instead of a path the player wants to rerun.
  - The opener is still more verbally lean than sensorially lean. Title, pause, and forge context keep framing future forms and next-test structure around a chassis that should feel almost empty, so the player is still being told about the machine before earning the first satisfying visible mutation.
  - The codebase still hoards many of its strongest visible/function payoffs in `Wave 9+ / Afterburn / Ascension` definitions. That keeps the shipped `Wave 1-8` chapter feeling like a prelude to the real toybox instead of a compact roguelite run that already delivers one or two memorable transformations.
  - `Wave 6-8` combat space is larger, but the encounter asks still lean on relay/territory ownership wrappers that can turn open arenas back into prescribed kiting. A stronger branch payoff would make offense, defense, and greed each exploit space differently instead of funneling all three into similar hold-the-pocket proofs.
  Top Priority: Make the `Wave 5` offense/defense/greed pick visibly and mechanically reshape `Wave 6-8` combat asks plus pause/result memory, so the branch reads as a run path rather than a temporary card.
  Why Now: The fork now exists; if it does not echo through the rest of the shipped chapter, the run is still a scripted two-beat ladder with extra UI.
  Do Not Repeat: Do not spend the next pass on more `Wave 9+` content, hidden branches, or text cleanup that still leaves the new fork without a visible scar on the run.
  Release Gate: Builds

- 2026-03-30 15:10:00 KST
  Findings:
  - The shipped run is no longer mainly failing on wording; it is failing on appetite shape. `Wave 1-8` still only has two real payoff beats (`Wave 3` weapon jump, `Wave 6` support install), so repeat runs risk feeling scripted instead of hungry. A strong rerun loop needs one more contested stop where offense, defense/support, and greed can pull against each other.
  - The opener still feels too complete in presentation. Title/HUD/doctrine perk language/`Overdrive` framing advertise a whole machine before the player has earned even a second barrel. Strong references like `Hades`, `Nova Drift`, and `Brotato` start with one clear verb and let spectacle arrive later.
  - Combat space is larger on paper, but mid/late waves are still authored more as `ownership/contract` exams than as rich movement problems. Relay/territory wrappers can easily turn bigger arenas back into prescribed kiting lanes instead of giving the player multiple safe exits, greed dives, and breach angles.
  - The project still carries too much `Wave 9+ / Afterburn` mental weight in code/docs. Even when hidden from the shipped path, that future-route grammar keeps `Wave 8` from feeling like a hard-earned finish and pushes the current chapter toward "intro to later forms" thinking.
  Top Priority: Rebuild the shipped appetite loop around a starved `Wave 1-2` opener and one extra mid-run contested forge stop before support spectacle, using existing systems instead of new named layers.
  Why Now: Until the current chapter creates real hunger and one replayable fork of ownership, longer-run ambition has no trustworthy foundation.
  Do Not Repeat: Do not spend the next pass on new endforms, new terminology, or another copy-only cleanup that leaves the same two-beat reward ladder intact.
  Release Gate: Progression

- 2026-03-30 14:05:00 KST
  Findings:
  - The forge hierarchy is lighter now, but the shipped run is still over-explained at the surface layer. Title launch copy, combat-feed callouts, pause text, wave `note/directive` strings, and forge context still read like design documentation translated onto the screen. Strong references like `Hades`, `Nova Drift`, and `Brotato` keep the player on object-first labels, short proofs, and instantly readable threat states; `Cinder Circuit` still asks for too much sentence parsing before feel takes over.
  - The 8-wave chapter still does not feel fully shipped because the implementation and source-application doc keep a huge live `Wave 9-12 / Afterburn` body nearby. Even if some paths are quarantined, the current game grammar is still being authored as an intro to a longer route instead of a self-contained rerun loop with its own clean finality.
  - Combat space is trending in the right direction on paper with larger mid/late arenas and restrained active caps, but the game keeps narrating that breathing room instead of trusting movement and silhouette reads to sell it. If the player must read `directive` prose to understand the ask, the combat is not yet clear enough.
  - The early growth curve is still too system-complete in presentation. Between launch framing, forge/admin vocabulary, support grammar, and `Overdrive`/future-route references, the opener advertises too much machinery before the player has earned a satisfying first transformation.
  Top Priority: Strip shipped-visible sentence blocks down to glanceable labels across title/combat-feed/pause/forge context, and remove `Wave 9+ / Afterburn` target language from the docs and run-facing grammar that still define the current chapter.
  Why Now: Until the player can parse the run in seconds instead of reading a briefing, stronger escalation and build depth will continue to feel promised rather than delivered.
  Do Not Repeat: Do not answer this with more branch content, more support wrappers, or shorter wording laid over the same verbose surface stack.
  Release Gate: UX/UI

- 2026-03-30 12:10:00 KST
  Findings:
  - The latest support-quieting pass was the right correction, but it exposed the bigger remaining problem: the forge stop is still doing too much explanation. `renderForgeOverlay()` still computes `dominant form`, `next breakpoint`, `proof window`, `context tail`, `preview rows`, `combat ask`, and role-tagged card variants, which is still closer to a loadout briefing than the instant object-first reward hit strong arena roguelites use.
  - The shipped run still leaks future-route ambition into its design truth. `docs/games/cinder-circuit-source-application.md` continues to normalize `Wave 10` and `Wave 12` target states, and `playables/cinder-circuit/game.js` still carries highly legible `Afterburn`/post-`Wave 8` labels and copy near the shipped path. That keeps the current chapter feeling adjacent to a “real game” instead of being the real game.
  - Build hunger is still weaker than it should be because the player can sense too much finished structure too early. Even after the first support install got visually quieter, the overall route still presents weapon bench, support track, doctrine bias, greed lane, and future escalation grammar in a way that makes the opener feel system-rich before it feels needy.
  - The project should spend the next pass consolidating, not broadening. Right now the highest-ceiling improvement is to make one `Wave 3` or `Wave 6` reward screen feel irresistible and immediate, not to add another passive lane, another endform wrapper, or more long-run balance scaffolding.
  Top Priority: Rebuild the shipped forge presentation around one oversized headline card plus at most one short proof line, and suppress all shipped-surface references to `Wave 9+`, `Wave 10`, `Wave 12`, and `Afterburn` from docs/status/reward language that the current run cannot cash out.
  Why Now: Until the current 8-wave chapter feels self-contained and instantly desirable, longer-run ambition will keep reading as scope promise instead of replay value.
  Do Not Repeat: Do not answer this with more support options, more route bands, or lighter wording wrapped around the same multi-layer forge/admin stack.
  Release Gate: Rewards

- 2026-03-30 11:05:00 KST
  Findings:
  - The project is still in danger of solving chapter weakness with route breadth. `game.js` still carries a large live `Wave 10-12 / Afterburn / ascension` body, and even if shipped surfaces are cleaner now, that nearby ambition keeps encouraging “more ladder” thinking before `Wave 1-8` has fully proved repeated fun.
  - The forge reward moment is still too administrative for a game that needs immediate desire. `renderForgeOverlay()` is cleaner than before, but it still stacks `promise + proof + preview rows + impact strip + slot cost`, which is closer to a debug-rich loadout board than the snap hierarchy strong arena roguelites use when they make a player instantly want the install.
  - Support payoff still risks reading as clutter instead of transformation. The live render path draws orbit lines, deployable range rings, kiln fields, shields, missiles, drones, and support satellites together, so `Wave 6-8` can feel like the screen got busier rather than like one owned silhouette opened new movement pockets.
  - The opening growth curve is still fragile. With support visuals and multiple system nouns already so close to the player fantasy, the run risks starting too visually complete, which weakens the hunger for later multi-shot, orbit, shield, or helper breakthroughs.
  Top Priority: Consolidate the shipped chapter around one-card forge hierarchy and one support-readability pass so the first support install creates a single obvious lane-ownership advantage instead of adding more simultaneous shapes and labels.
  Why Now: If `Wave 6-8` does not clearly prove one earned transformation in breathable combat space, a future `20-30 wave` curve will still feel hypothetical.
  Do Not Repeat: Do not answer this with new passives, new route brackets, or extra reward verbs before the current support payoff is readable at a glance.
  Release Gate: Builds

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

- Older entries trimmed automatically: 1

## Latest Improvement

- 2026-03-30 16:55:00 KST
  Changed:
  - Added shipped-route `Wave 5` branch memory in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) so the compact run now records `offense|defense|greed` when the `headline|rider|gamble` stop resolves, then reuses that memory to rewrite generic `Wave 6-8` combat asks (`열린 입구 하나를 길게 찢는다.`, `복귀 pocket 하나만 길게 붙든다.`, `금고 seam 하나만 물고 곧장 끊는다.`) instead of letting all three paths collapse back to one neutral board summary.
  - Routed the same `Wave 5` branch memory into shipped pause/result surfaces, so [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) now labels the compact `Tab` ask pill with the chosen path (`공세 추적`, `방호 고정`, `판돈 급습`) and inserts a `Wave 5` beat into result-history pills/copy rather than skipping straight from `Wave 3` to `Wave 6`.
  - Updated [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) and [tasks/automation/state/improver-session.md](/Users/seren/workspace/poong-game/tasks/automation/state/improver-session.md) to lock `Wave 5` offense/defense/greed persistence across `Wave 6-8` ask text, pause labels, and result beats.
  Why:
  - The latest critique's `Top Priority` said the new `Wave 5` fork still read like a temporary card because later surfaces kept summarizing the run as `Wave 3 -> Wave 6 -> Wave 8`. The highest-value bounded interpretation was to make the branch leave a compact scar on the shipped chapter's shared ask/history helpers before adding any more route content.
  Follow-up Risk:
  - The branch now leaves visible memory on shared ask/result surfaces, but offense/defense still rely on later support/chassis payoffs for their strongest mechanical contrast. If critique next says the path reads clearly but two of the three routes still play too similarly in live space, the next bounded pass should tune one branch-specific `Wave 7-8` encounter mix or hazard cadence rather than add another fork.
  Validation: `node --check playables/cinder-circuit/game.js`; `node --check playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`; `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs` still fails on the pre-existing `playables/cinder-circuit/tools/cinder-circuit-smoke.mjs:4135` assertion (`sentryTierTwo.interceptRange > 0`) after the new `Wave 5` branch-memory assertions passed
  Release Gate: Builds

- 2026-03-30 15:45:00 KST
  Changed:
  - Reopened the shipped `Wave 5` forge in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) as a true three-way stop by exempting `EARLY_MUTATION_FORGE_WAVE` from the compact route's old two-card contract clamp, so the run now shows `주력 / 버팀 / 판돈` together before `Wave 6` support spectacle instead of hiding greed behind a later branch.
  - Updated [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) to lock shipped `nextWave: 5` forge and followup contracts on `headline|rider|gamble`, with `Scrapline Raid` occupying the visible `판돈` slot rather than disappearing under the old two-choice bridge.
  - Refreshed [tasks/automation/state/improver-session.md](/Users/seren/workspace/poong-game/tasks/automation/state/improver-session.md) so future passes keep this stop as the compact route's extra contested appetite beat.
  Why:
  - The latest critique's `Top Priority` asked for one extra mid-run contested forge stop before support spectacle using existing systems. The highest-value concrete interpretation was that the underlying `Wave 5` greed card already existed, but the shipped forge was still collapsing that moment to two cards, so reruns kept reading like `Wave 3 jump -> Wave 6 install` with no real intervening fork.
  Follow-up Risk:
  - `Wave 5` now exposes a real three-way choice, but the route still does not memorialize that stop beyond the forge itself. If critique next says the fork exists but still does not echo strongly enough through later HUD/result surfaces, the next bounded pass should surface the chosen `Wave 5` branch as a visible run beat rather than adding another new system.
  Validation: `node --check playables/cinder-circuit/game.js`; `node --check playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`; `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs` still fails on the pre-existing `playables/cinder-circuit/tools/cinder-circuit-smoke.mjs:4096` assertion (`sentryTierTwo.interceptRange > 0`) after the new `Wave 5` forge assertions passed
  Release Gate: Progression

- 2026-03-30 14:35:00 KST
  Changed:
  - Added compact shipped-wave briefing helpers in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) so `Wave 1-8` proof windows, live combat asks, and wave-intro feed entries now resolve to short `headline + proof` reads like `사선 유지 / 굵은 차단선 하나만 피해 간다.` instead of surfacing full sentence `note/directive` copy.
  - Routed shipped combat-feed summarization through the same compact wave briefing, so even verbose base-route intro logs collapse back to the short board-style read instead of reopening paragraph narration in pause/history surfaces.
  - Updated [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) and [tasks/automation/state/improver-session.md](/Users/seren/workspace/poong-game/tasks/automation/state/improver-session.md) to lock the new `Wave 1-8` briefing contract and compact `Wave 4` summary.
  Why:
  - The latest critique's `Top Priority` still had a shipped run-facing grammar gap. The highest-value bounded interpretation was to strip the base-route combat/proof surfaces down to glanceable threat labels first, because those lines were still asking the player to parse design-text sentences before acting.
  Follow-up Risk:
  - The shipped combat layer now reads faster, but title/pause/forge still carry some broader nouns around the same chapter. If critique next says the run is cleaner in motion but still over-explained at stops, the next bounded pass should trim remaining title/forge context strings rather than add new route structure.
  Validation: `node --check playables/cinder-circuit/game.js`; `node --check playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`; `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs` still fails on the pre-existing `playables/cinder-circuit/tools/cinder-circuit-smoke.mjs:4088` assertion (`sentryTierTwo.interceptRange > 0`) after the new compact-briefing assertions passed
  Reference Direction: `Hades` room-callout restraint and `Brotato`-style short wave asks; one dominant threat label plus one immediate action beats sentence narration.
  Release Gate: UX/UI

- 2026-03-30 13:05:00 KST
  Changed:
  - Collapsed the shipped base-route forge hierarchy in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) so only the oversized headline card keeps a short `다음 전투` proof line; the context card now stops at the visible `current -> offered` jump, and side cards no longer repeat combat-ask copy.
  - Updated [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) and [tasks/automation/state/improver-session.md](/Users/seren/workspace/poong-game/tasks/automation/state/improver-session.md) to lock that `one headline proof / no repeated side-card ask` rule for the shipped `Wave 3-8` forge.
  Why:
  - The latest critique's `Top Priority` was still open in the reward stop itself. The highest-value bounded interpretation was to remove repeated proof/admin copy from the shipped forge shell so the player reads one dominant reward object first, then one short next-fight promise.
  Follow-up Risk:
  - The forge is now lighter, but the headline card still uses the same compact proof styling across `Wave 3`, `Wave 6`, and `Wave 8`. If critique next says the stop parses faster but still lacks enough snap, the next pass should tune headline-card scale/typography rather than reintroduce more explanatory rows.
  Validation: `node --check playables/cinder-circuit/game.js`; `node --check playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`; `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs` still fails on the pre-existing `playables/cinder-circuit/tools/cinder-circuit-smoke.mjs:4060` assertion (`sentryTierTwo.interceptRange > 0`) after the new forge-hierarchy assertions passed
  Reference Direction: `Hades` boon-card hierarchy and `Nova Drift` upgrade-card restraint; one dominant card owns the desire hit, secondary cards stay quiet.
  Release Gate: Rewards

- 2026-03-30 11:35:00 KST
  Changed:
  - Added `getSupportRenderPresentation(...)` in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) and routed the live support draw path through it so shipped `Wave 6-8` tier-1 support installs now suppress orbit frames, deployable range circles, and Halo intercept rings while keeping the actual support body visible.
  - Tuned the same pass to keep later support upgrades loud again, so the readability clamp is only for the compact route's first earned install and not for `Mk.II+` payoff beats.
  - Updated [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) and [tasks/automation/state/improver-session.md](/Users/seren/workspace/poong-game/tasks/automation/state/improver-session.md) to lock the new `Wave 7 first install quiet / Wave 8 upgrade loud` presentation rule.
  Why:
  - The latest critique's `Top Priority` was still open on support readability. The highest-value bounded interpretation was to make the first support install read like one owned silhouette in open space instead of a pile of helper rings and guide geometry.
  Follow-up Risk:
  - This reduces support clutter, but forge hierarchy is still heavier than the in-combat payoff. If critique next says the install now reads well in combat but the reward stop still feels administrative, the next pass should trim forge card layering rather than reintroduce louder support guides.
  Validation: `node --check playables/cinder-circuit/game.js`; `node --check playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`; `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs` still fails on the pre-existing `playables/cinder-circuit/tools/cinder-circuit-smoke.mjs:4057` assertion (`sentryTierTwo.interceptRange > 0`) after the new support-render assertions passed
  Reference Direction: `Nova Drift`-style silhouette-first orbitals and `Hades`-style effect restraint at first unlock; the install body should read first, guide geometry second.
  Release Gate: Builds

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

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
- Immediate priority: hard-quarantine `Wave 9-12 / Afterburn / doctrine ascension` scaffolding from the shipped path and collapse `Wave 1-8` into one unmistakable reward ladder: quiet opener, one dramatic weapon leap, one readable support chapter, one almost wordless `Wave 8` payoff.

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

- 2026-03-29 17:31:01 KST
  Findings:
  - The shipped route still feels like a disguised branch of a larger prototype instead of a finished short run. `playables/cinder-circuit/game.js` still keeps live `Wave 9-12`, `Afterburn`, doctrine capstone, and pursuit/endform machinery throughout the same file, while `docs/games/cinder-circuit-source-application.md` still teaches signatures and a `12-wave` ladder as normal design grammar. Sanitizing presentation is not the same as making the shipped game structurally honest.
  - The forge remains too administrative for a release-feeling reward screen. `renderForgeOverlay()` still routes the player through `current machine`, `featured install`, `combat ask`, tail summaries, and contract-role logic before the object itself lands. Strong references like `Hades`, `Nova Drift`, and `Brotato` make the reward fantasy readable in one glance; this still reads like a compact dashboard.
  - The growth curve is cleaner, but it still does not create enough build hunger for repeated runs. The run now protects a `Wave 6-8` support ownership chapter, yet most of the visible ladder is still `weapon stat readout + one support install + Wave 8 payoff card`, not a sequence of escalating shape changes that suggests this structure could truly stretch to `20-30` waves later.
  - UI discipline is still inconsistent with the stated anti-drift rules. The title is leaner, but the docs and reward flow still over-explain system grammar the player should infer by feel. The game keeps spending words to justify choices that should already look powerful.
  Top Priority: Make the shipped route genuinely `8-wave-only` in player-facing design and reward flow by stripping late-route language from shipped docs/UI and reducing the forge context to one-glance `current form -> offered transformation -> next test`.
  Why Now: Until the short run stops advertising a larger hidden game, every reward moment loses punch and every replay feels provisional.
  Do Not Repeat: Do not answer this with more sanitizers or copy trims while the shipped path still shares vocabulary and scaffolding with the unshipped late-route game.
  Release Gate: UX/UI

- 2026-03-29 17:00:59 KST
  Findings:
  - The shipped slice is still structurally split between `8-wave release target` and `12-wave prototype skeleton`. `docs/games/cinder-circuit-design.md` still keeps `mission board` / `Afterburn` language, `docs/games/cinder-circuit-source-application.md` still teaches `run-start signature` and a `12-wave act ladder`, and `playables/cinder-circuit/game.js` still carries live `SIGNATURE_DEFS`, `BASTION_DOCTRINE_DEFS`, `WILDCARD_PROTOCOL_DEFS`, and `Afterburn` content. Even if some of it is gated off, that split keeps implementation energy flowing into future brackets instead of making the shipped run feel final.
  - The run is cleaner than before, but build hunger is still weak. Compact-route `Wave 6-8` now protects one support install, yet `createSupportSystemChoices()` and the owned-system `Wave 8` upgrade path mostly lead to tier bumps rather than a second dramatic fantasy beat. Compared with `Nova Drift`, `Hades`, or `Brotato`, the player can understand the build without strongly craving the next form.
  - The forge still explains the reward instead of landing it. `renderForgeOverlay()` remains built around `proofWindow`, `riderStep`, `contractRole`, and preview rows before the object sells itself, so the upgrade moment still behaves more like run administration than a snap decision screen.
  - Long-run ambition is still not backed by a real mid-run ladder. `AFFIX_DEFS` are mostly compact stat pushes, while the more spectacular evolutions sit in later hidden branches and `Afterburn` scaffolding. That means the 8-wave slice is being asked to prove replayability without enough visible intermediate transformations.
  Top Priority: Rebuild the compact-route `Wave 8` reward into one unmistakable owned-build payoff card that visibly transforms the installed support or weapon geometry, and cut any remaining shipped-facing wrapper text that competes with that moment.
  Why Now: The support chapter is finally readable enough that its lack of payoff is now the clearest ceiling on repeat-run desire.
  Do Not Repeat: Do not answer this with calmer fights or shorter copy alone if `Wave 8` still resolves as a modest tier-up instead of a form the player wants to chase again.
  Release Gate: Builds

- 2026-03-29 19:20:00 KST
  Findings:
  - The run still feels like a roadmap for a bigger game instead of a finished 8-wave slice. `docs/games/cinder-circuit-design.md` still frames the title as a `mission board`, `docs/games/cinder-circuit-source-application.md` still normalizes `run-start signature` and a `12-wave act ladder`, and `playables/cinder-circuit/game.js` still exposes `Wave 9-12` / `Afterburn` route language in shipped-facing preview text.
  - The forge is still too document-shaped to create build hunger. `renderForgeOverlay()` is still built around `proofWindow`, `riderStep`, `current machine`, `featured install`, `combat ask`, and contract-role scaffolding, while `createForgePreviewRows()` can still surface route-preview rows. Compared with the object-first snap of strong reward screens like `Hades`, `Nova Drift`, or `Brotato`, this is still too much explanation before desire.
  - `Wave 6-8` still rescues the support chapter instead of proving it. `createSupportSystemChoices()` still special-cases a `Wave 8` support silhouette payoff, and `Nullplate Halo` / support-bay growth logic still lets the run widen the system shell instead of making one earned install carry two honest fights.
  - Combat pressure is still layered like a stress test, not a payoff showcase. `beginWave()` stacks extra spawn budget, active cap, and hazard tempo through greed/debt/predator modifiers, and `chooseHazardSpawn()` still biases hazards toward the player route, so new installs keep getting judged inside the same squeezed movement lanes instead of creating clear ownership pockets.
  Top Priority: Stop adding branch wrappers and rebuild the shipped `Wave 1-8` loop around one one-glance forge reward plus one guaranteed `Wave 6` support install that owns two cleaner fights before any extra lane/cap/bay expansion returns.
  Why Now: Until the short run becomes immediately readable and desirable, more systems only hide the transformation fantasy instead of strengthening it.
  Do Not Repeat: Do not spend another pass adding named branches, cache variants, or preview rows before the existing 8-wave slice can be understood at a glance.
  Release Gate: Rewards

- 2026-03-29 18:45:00 KST
  Findings:
  - The project is still shipping a split fantasy. `docs/games/cinder-circuit-design.md` still presents the title as a `mission board` with signature-facing side panels and still keeps `Afterburn` as a next-build target, while `docs/games/cinder-circuit-source-application.md` still teaches `run-start signature` and a `Wave 9-12` ladder. That keeps the opener aimed at taxonomy and future scope instead of a quiet, repeatable Wave 1-8 run.
  - The live run is still structurally louder than the red flags allow. `BASE_BUILD` in `playables/cinder-circuit/game.js` still starts with `signatureId`, and `BASTION_DOCTRINE_DEFS` / doctrine pursuit text still frame Wave 6-8 around doctrine literacy, `support rider` reopen language, and shard chase instead of one simple support-install payoff the player can immediately feel.
  - The support chapter is still being rescued instead of proven. Wildcard logic like `Nullplate Halo` raises `supportBayCap` to max on Wave 7, and Wave 6-8 pursuit rules still promise extra shard-based payoff, so the game keeps compensating for a weak middle chapter instead of forcing one install to carry two honest fights.
  - The forge remains too process-heavy for a release-feeling reward hit. `renderForgeOverlay()` still runs through `proofWindow`, `riderStep`, `current machine`, and contract-role machinery before the install fantasy lands, which is far more explanatory than the object-first snap stronger upgrade screens use.
  Top Priority: Remove shipped-facing signature/doctrine/future-route language from title, HUD, and forge-facing reads, then hard-lock Wave 6-8 to one visible support install with no shard pursuit or support-bay rescue logic.
  Why Now: Until the opener is quieter and the first support chapter stands on its own, the run cannot generate real anticipation for a longer 20-30 wave future.
  Do Not Repeat: Do not spend another pass just trimming copy while doctrine scaffolding and Wave 7-8 bailout growth still stay live.
  Release Gate: Progression

- 2026-03-29 18:10:00 KST
  Findings:
  - The project is still teaching a larger, noisier game than the shipped slice can support. `docs/games/cinder-circuit-design.md` still sells the title as a `mission board` and keeps `Afterburn` in the next-build target, while `docs/games/cinder-circuit-source-application.md` still normalizes `run-start signature` and a `Wave 9-12` act ladder. That directly violates the current red-flag instruction to simplify the opener before adding more structure.
  - The live forge still is not a clean reward hit. `renderForgeOverlay()` may now expose `current loadout -> featured install -> combat ask`, but it is still built on `proofWindow`, `riderStep`, `current machine`, and contract-role routing, so the player is still reading system administration underneath the surface instead of just feeling a desirable install and one immediate test.
  - The support chapter is still padded with rescue logic instead of being honestly earned. The build still starts with `supportBayCap: 1`, but Wave 7/8 pathing can reopen extra support capacity or bypass the stop entirely through wildcard/admin-relay style logic, which means the run still compensates for weak chapter design instead of making one support install carry two real fights.
  - The opener is still too strategically complete for the transformation fantasy it wants later. Live doctrine/signature definitions keep biasing the run around predefined pursuit/fort/siege routes and even talk about the `first support rider` reopening at `Wave 8`, which front-loads route literacy when player feedback is already asking for a quieter, less wordy start.
  Top Priority: Remove shipped-facing `mission board / signature / Wave 9-12 / proof-rider` framing from docs and Wave 1-8 UI language, then lock `Wave 6-8` to one support install chapter with no wildcard, relay-skip, or bailout bay expansion.
  Why Now: Until the first support chapter is both quiet and honest, the run cannot build replay hunger for later layers.
  Do Not Repeat: Do not spend another pass only shortening forge copy while the same rescue structure and future-route grammar stay live.
  Release Gate: Progression

- 2026-03-29 17:05:00 KST
  Findings:
  - The forge is still reading like route administration instead of a reward hit. In `renderForgeOverlay()` the player is still being routed through `proofWindow`, `riderStep`, `12-wave spine`, and `current loadout/current machine` framing before the install fantasy lands, which is far denser than the object-first snap strong references use for boon/shop/upgrade moments.
  - The game keeps saying `Wave 6` is the support chapter, but the surrounding UI language still treats that moment as a checkpoint inside a longer plan. `enterBastionDraft()` and related forge copy keep talking about what the install will prove later rather than just showing a bigger silhouette and one immediate combat behavior to try now.
  - Drift is still alive in both docs and code. The design doc still preserves `mission board` framing, the source-application doc still normalizes `run-start signature` and `Wave 9-12`, and live copy still contains `Late Break cadence`/`Afterburn` scaffolding. That keeps contaminating the shipped slice with future-act grammar when the current red flags say the opener and status surfaces are already too wordy.
  - This also weakens long-run ambition instead of supporting it. A real `20-30 wave` future needs chapter clarity, not more chapter names; if the first support chapter still cannot read as `loadout -> install -> arena ask`, then adding later brackets will only multiply confusion.
  Top Priority: Recut every shipped-facing forge/status/HUD read so `Wave 6` shows only `current loadout`, `one featured install silhouette`, and `one combat ask`, while all `proof/rider/12-wave/Late Break/Afterburn` language is removed from the 8-wave path.
  Why Now: Until the reward moment becomes instantly desirable and legible, the support chapter cannot create the build hunger the run depends on.
  Do Not Repeat: Do not answer this with copy shortening on the same `proof/current machine/rider` shell.
  Release Gate: UX/UI

- 2026-03-29 16:45:00 KST
  Findings:
  - The loop is starting to cycle on the same fake-depth problem: there are already enough shields, missiles, drones, orbitals, and late-form hooks in the project, but the shipped run still does not give one support install a clean, repeatable ownership chapter. More systems will not fix a chapter that still arrives through rescue logic and admin framing.
  - The current forge/status shell is still hiding the fantasy behind too much structure. Against `Hades` boon screens, `Nova Drift` level-ups, or `Brotato` shop reads, `Cinder Circuit` is still spending too much hierarchy on `proof`, `rider`, `roadmap`, `current machine`, and route explanation instead of one obvious install silhouette and one immediate combat promise.
  - The early-to-mid growth curve is still too visually complete for the payoff it wants later. If the opener already feels busy and armed, then `Wave 6` support cannot feel like the first real mutation; it just looks like extra noise attached to an already-finished chassis.
  - The longer-run ambition is still not being scaffolded honestly. A future `20-30 wave` game needs a repeatable chapter pattern where each power layer gets breathing room and then a proof fight; the current shipped route still reads more like compressed exception handling than the first bracket of a scalable roguelite arc.
  Top Priority: Rebuild the shipped `Wave 6` forge/pause/HUD moment around one featured support install, one secondary fallback, and almost no route text, then tune `Wave 6-8` so that install gets two readable fights of space ownership before any extra escalation returns.
  Why Now: Until one support chapter becomes clear, desirable, and repeatable, every new weapon branch or future-wave plan is just stacking content onto an unproven loop.
  Do Not Repeat: Do not spend another pass adding support content, wildcard unlocks, or softer wording on the same forge shell.
  Release Gate: Rewards

- 2026-03-29 14:10:00 KST
  Findings:
  - The combat space is no longer the main blocker; `Wave 5-8` already expands the arena from `1520x860` up to `1920x1080` in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js#L480) and [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js#L587). The problem is that this breathing room is still being spent on proving the same gun/chassis lane instead of letting the player layer a second clear ownership axis.
  - The shipped build layer still cannot create real run hunger because it withholds support breadth, then patches over the gap with rescue logic. [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js#L5454) still starts the route at `supportBayCap: 1`, [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js#L6876) still forces a `Wave 8` tier-2 support payoff if none landed, and [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js#L3280) still lets a `Wave 7` wildcard suddenly unlock the full bay. That is not anticipation; it is emergency compensation.
  - The run-start doctrine layer is still front-loading too much plan text for a game whose player feedback says the opening is already too busy. [docs/games/cinder-circuit-source-application.md](/Users/seren/workspace/poong-game/docs/games/cinder-circuit-source-application.md#L157) still treats `run-start signature` as a principle, [docs/games/cinder-circuit-design.md](/Users/seren/workspace/poong-game/docs/games/cinder-circuit-design.md#L125) still frames the title as a `mission board`, and live doctrine copy in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js#L3629) still tells the player what support line should reopen at `Wave 8`. Stronger references do not ask the player to pre-read that much future routing before the first clean combat read.
  - The forge/status shell still explains closure instead of selling transformation. [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js#L2084) keeps `roadmapDetail` and closure language alive, while [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js#L25735) still builds the forge around `proofWindow`, `current machine`, and repeated “next test” framing. Compared with `Hades`, `Nova Drift`, or `Brotato`, this is still too much tactical grammar for a reward moment that should mainly make the player want the install.
  Top Priority: Replace the current `Wave 6-8` rescue structure with a guaranteed, visually obvious support chapter that starts at `Wave 6`, then strip shipped opener/forge/status surfaces down to current loadout, one dominant install, and one combat promise.
  Why Now: Until the back half earns a real second-axis payoff on schedule, the run will keep feeling like a prototype that explains future depth instead of delivering present excitement.
  Do Not Repeat: Do not answer this with more support variants, another wildcard, or shorter wording on the same doctrine/roadmap shell.
  Release Gate: Builds

- 2026-03-29 13:30:39 KST
  Findings:
  - The project is still drifting at the source-of-truth level. [docs/games/cinder-circuit-design.md](/Users/seren/workspace/poong-game/docs/games/cinder-circuit-design.md#L125) still teaches a `mission board`, signature-facing panels, and `forge pause`, while [docs/games/cinder-circuit-source-application.md](/Users/seren/workspace/poong-game/docs/games/cinder-circuit-source-application.md#L157) still normalizes `run-start signature` and a `Wave 9-12` bracket. That keeps design pressure aimed at a broader admin shell than the shipped release goal allows.
  - The live game still carries too much non-shipped route weight to judge the 8-wave loop honestly. [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js#L1201) still defines `Afterburn I-VII`, and [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js#L20583) still contains live `Wave 9 black-site uplink` flow. Even if those systems are gated off, they are still shaping pacing, copy, and reward logic around a second game.
  - The shipped back half still cannot create real build hunger because it relies on a fake catch-up payoff instead of layered ownership. [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js#L5460) starts the route at `supportBayCap: 1`, and [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js#L6873) special-cases `Wave 8` to inject a tier-2 support silhouette if none landed earlier. That is patching over a weak `Wave 6-7` chapter, not building anticipation toward it.
  - The forge is still over-explaining a thin choice set. [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js#L25653) still centers `proofWindow`, `rider`, `current machine`, and contract-role framing, while stronger references like `Hades`, `Nova Drift`, and `Brotato` would show one dominant install, one combat promise, and far less grammar. This screen still makes the player read structure before wanting the install.
  Top Priority: Quarantine all shipped-facing `signature / Wave 9+ / Afterburn / black-site` scaffolding and rebuild `Wave 6-8` as one honest support chapter that lands on time without a `Wave 8` bailout install.
  Why Now: Until the shipped slice stands alone, every new branch or payoff is being judged against a shadow game instead of real replayable fun.
  Do Not Repeat: Do not answer this with cleaner copy on the same contract shell or with more support variants that still depend on late catch-up logic.
  Release Gate: Progression

- 2026-03-29 13:00:54 KST
  Findings:
  - The run is still structurally too shallow to create repeat hunger even if the copy gets cleaner. [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js#L5460) hard-caps the shipped route at `supportBayCap: 1`, so the back half cannot naturally grow into recognizable offense, defense, and greed identities with visible layering. That cap makes the current `20-30 wave` ambition read theoretical instead of scaffolded.
  - The forge keeps packaging choice into the same narrow rhythm. [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js#L14111) repeatedly reduces pre-`Wave 9` stops to `headline + rider` and often to a two-card contract, while [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js#L20891) explicitly frames the stop as “one big card plus one survival answer.” That is not rich enough to make players fantasize about rerolling for a different run shape.
  - The game still leaves open a failure state where the first obvious support silhouette arrives too late. [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js#L6881) still special-cases the first tier-2 support reveal for `nextWave === DEFAULT_ROUTE_WAVE_COUNT`, and [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js#L7864) still describes the `Wave 6` break as gun/body first with support following after. That keeps the supposed chapter break from becoming a reliable payoff.
  - UI verbosity is still masking a systemic problem, not just a wording problem. [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js#L25586) still spends the forge on `proof`, `rider`, `current machine`, and contextual wrappers, but the deeper issue is that the underlying offer set is too thin to justify that ceremony. Compared with `Hades`, `Nova Drift`, or `Brotato`, the game is still presenting prototype scaffolding around choices that are not dramatic enough.
  Top Priority: Rebuild the shipped forge/reward structure so `Wave 6` always opens one clearly visible support/offense/utility fork and `Wave 7-8` let that fork own space, instead of capping the route at one support bay plus a mandatory `headline + rider` package.
  Why Now: Replayable action roguelites live or die on anticipating the next run-defining fork, and the current back half still cannot produce that hunger reliably.
  Do Not Repeat: Do not answer this with cleaner labels on the same two-card contract or with more late-form branch names on top of a one-support route.
  Release Gate: Builds

- 2026-03-29 16:10:00 KST
  Findings:
  - The project is still failing its own anti-drift rules at the source-of-truth level. [docs/games/cinder-circuit-design.md](/Users/seren/workspace/poong-game/docs/games/cinder-circuit-design.md) still promises a `mission board`, signature-facing side panels, and `forge pause`, while [docs/games/cinder-circuit-source-application.md](/Users/seren/workspace/poong-game/docs/games/cinder-circuit-source-application.md) still teaches `run-start signature` compression and a `Wave 9-12` act ladder. That keeps the team designing a louder, broader game than the current release goal allows.
  - The back half still reads like doctrine paperwork instead of a support-powered chapter. [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) keeps `support_proof`, `proof`, `roadmapDetail`, `rider`, and `Late Break` framing around `Wave 7-8`, so the first shield/drone/missile install is still being narrated as a contract step instead of visibly owning arena space for two waves.
  - The game is front-loading too much completed-feeling spectacle for a run that is supposed to grow into it. [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) still carries full `Afterburn` labels, post-`Wave 12` endform text, and late ascension support rendering hooks, which weakens the early-to-mid transformation curve even before those systems are fully relevant to the shipped slice.
  - UI direction is still over-described compared with strong arena roguelite references. Against the one-glance reward/object hierarchy of `Hades`, `Nova Drift`, or `Brotato`, `Cinder Circuit` is still spending too much screen and copy budget on status grammar (`proof`, `rider`, `roadmap`, `current machine`) and not enough on one dominant install silhouette plus one readable combat promise.
  Top Priority: Consolidate the shipped game around one quiet opener, one hard `Wave 3` weapon leap, and one `Wave 6` support install that owns `Wave 6-8`, while deleting all player-facing `signature / mission-board / Wave 9-12 / Afterburn / proof-rider-roadmap` framing that competes with that arc.
  Why Now: The run will not become replay-hungry until the player can feel a clean escalation arc instead of reading scaffolding for a larger imaginary version.
  Do Not Repeat: Do not answer this with more support content or softer copy trims on the same structure; the problem is still structural ambition without shipped-slice discipline.
  Release Gate: UX/UI

- 2026-03-29 15:05:00 KST
  Findings:
  - The project is still teaching and carrying a shadow game. [docs/games/cinder-circuit-design.md](/Users/seren/workspace/poong-game/docs/games/cinder-circuit-design.md) still specifies a `mission board` title and signature-facing side panels, while [docs/games/cinder-circuit-source-application.md](/Users/seren/workspace/poong-game/docs/games/cinder-circuit-source-application.md) still normalizes `run-start signature` and a `Wave 9-12` act ladder. That keeps the judged route aimed at prototype scaffolding instead of a shipped appetite loop.
  - The playable still preserves a full late-game spine even with `CONSOLIDATED_12_WAVE_ROUTE = true`. [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) still holds `WAVE_CONFIG` entries for `Wave 9-12`, the full `POST_CAPSTONE_WAVE_LABELS` and `POST_CAPSTONE_ENCOUNTER_POOL`, plus Wave 8 transition/feed copy about `Late Break Armory`, `Wave 9`, and doctrine caches. The current slice is still being tuned in the shadow of a non-shipped route.
  - The forge is still too document-like to create hunger. [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) `renderForgeOverlay()` still foregrounds `current loadout`, `ask`, `proof`, `rider`, preview rows, and contract labels. Against the snap-read reward cadence of `Hades`, `Nova Drift`, or `Brotato`, this screen still asks the player to parse structure before wanting the install.
  - The support layer has visible content breadth, but the run still refuses to let it own the back half. [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) already has distinct orbitals, shields, sentries, missiles, and drones, yet the shipped route caps support bays at `1` and Wave 8 closure headlines another doctrine capstone (`Cataclysm Arsenal` / `Warplate Halo` / `Black Ledger Heist`) instead of making the first support install feel like the run-defining chapter. That weakens build hunger and makes Wave 6 payoff feel decorative.
  Top Priority: Remove all shipped-facing `Wave 9-12 / Afterburn / signature / mission-board` scaffolding, then recenter `Wave 6-8` so one support install visibly owns the run's back half and the forge sells that object in one fast glance.
  Why Now: Until the first support chapter becomes the thing players anticipate and replay for, the game will keep reading as a prototype with extra systems rather than a repeatable action roguelite.
  Do Not Repeat: Do not spend another pass polishing doctrine names or adding more support variants while the run still hides a second game and buries installs under reward prose.
  Release Gate: Progression

- Older entries trimmed automatically: 1

## Latest Improvement

- 2026-03-29 17:43:35 KST
  Changed:
  - Recut the shipped base-route forge cards in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) so both headline and side cards now sell only the object name, one transformation spotlight, and one `전투 요청`. The extra `hero-copy` sentence is gone from the shipped `8-wave` card shell, and side cards now use the same spotlight primitive as the main reward card instead of a secondary preview row.
  - Promoted `.forge-card__spotlight` into the shared shipped reward primitive in [playables/cinder-circuit/styles.css](/Users/seren/workspace/poong-game/playables/cinder-circuit/styles.css), with lighter side-card sizing so the compact forge keeps the same read order without falling back to the older document-like stack.
  - Updated [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) to lock the new base-route shell: recurring shipped forge cards still render the spotlight, but no longer emit `forge-card__hero-copy` or the old compact `pivot` row.
  Why:
  - The latest critique's `Top Priority` was to reduce the shipped forge reward flow to one-glance `current form -> offered transformation -> next test`. The highest-value bounded interpretation was to remove the redundant explanation sentence from the cards themselves and keep the object-first snap closer to `Hades` boon cards and `Nova Drift` level-up reads, rather than trimming copy around the same old card hierarchy.
  Follow-up Risk:
  - The forge now reads faster, but some fallback cards may feel slightly less flavored because their descriptive sentence is gone. If critique next says the screen is clean but side options blur together, the next bounded pass should differentiate them through stronger spotlight labels or icon/silhouette treatment, not by restoring paragraph copy.
  Validation: `node --check playables/cinder-circuit/game.js`; `node --check playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`; `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs` still fails on the pre-existing `playables/cinder-circuit/tools/cinder-circuit-smoke.mjs:3909` assertion (`sentryTierTwo.interceptRange > 0`) after progressing past the updated forge-shell assertions
  Release Gate: UX/UI

- 2026-03-29 17:17:09 KST
  Changed:
  - Rebuilt the shipped `Wave 8` support-upgrade headline in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) so installed `Mk.II` payoff cards now get a dedicated `완성 보상` presentation instead of the same generic forge snap used by earlier rewards. The card now shows `현재 설치 -> 완성 형태` for the owned support geometry and relabels the ask as `완성 시험`.
  - Updated the compact forge context in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) so the same `Wave 8` payoff uses `완성 형태 / 완성 시험` in the spotlight shell, cutting one more layer of wrapper text that used to compete with the owned-build payoff moment.
  - Added the dedicated evolution-strip styling in [playables/cinder-circuit/styles.css](/Users/seren/workspace/poong-game/playables/cinder-circuit/styles.css) and extended [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) to lock a representative `Wave 8` `Ember Ring Mk.II` reward on `완성 보상`, `현재 설치`, `완성 형태`, and `완성 시험`.
  Why:
  - The latest critique's `Top Priority` was to turn `Wave 8` into one unmistakable owned-build payoff card that visibly transforms the installed support geometry. The highest-value bounded interpretation was to keep the existing support upgrade logic but give it its own object-first payoff shell, following the snap/read order direction of `Hades` boon screens and `Nova Drift` level-up cards instead of another generic forge card.
  Follow-up Risk:
  - The `Wave 8` support reward now reads more like a payoff, but the underlying transformation still lives only on support-upgrade headlines. If critique next says the run now sells the moment but still lacks enough hunger, the next bounded pass should give one weapon-side or support-side payoff a comparably visible geometry jump in combat, not add more wrapper rows around the card.
  Validation: `node --check playables/cinder-circuit/game.js`; `node --check playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`; `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs` still fails on the pre-existing `playables/cinder-circuit/tools/cinder-circuit-smoke.mjs:3908` assertion (`sentryTierTwo.interceptRange > 0`); targeted VM validation for the new `Wave 8` payoff card passed
  Release Gate: Builds

- 2026-03-29 20:35:00 KST
  Changed:
  - Added a compact-route `Wave 6-8` breathing-room pass in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) with `applySupportChapterBreathingRoom(...)`, applied from `resolveWaveConfig(...)` only when the shipped run has actually locked in its `Wave 6` support install. The chapter now trims spawn budget and active cap for those ownership fights instead of judging the new install inside the same stress-test density.
  - Added the new `support_showcase` hazard targeting profile in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) and retuned the same support chapter so hazards spawn less aggressively on the player route, telegraph a little longer, and give slightly wider arenas during the first two install fights. This keeps `Wave 6-8` focused on what the installed ring/halo/sentry/missile/drone silhouette actually opens, not on constant route denial.
  - Extended [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) to assert representative `Wave 7` support-ownership configs now use `support_showcase` and lower pressure values than the base ladder.
  Why:
  - The latest critique's `Top Priority` asked for one guaranteed `Wave 6` support install that owns two cleaner fights before extra lane/cap/bay expansion returns. The highest-value bounded interpretation was to keep the installed support chapter but stop stacking the same route-targeted pressure on top of it, so the player can actually feel that new second axis for two waves.
  Follow-up Risk:
  - This makes the support chapter easier to read, but it may also leave some doctrine/support combinations slightly under-threatening if later support-proof surges keep growing. If critique next says the chapter is clearer but too soft, the next bounded pass should reintroduce pressure through support-specific enemy geometry, not by restoring direct route-targeted hazard denial.
  Validation: `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs` failed on a pre-existing assertion at `playables/cinder-circuit/tools/cinder-circuit-smoke.mjs:3870` (`sentryTierTwo.interceptRange > 0`); targeted VM validation for the new `Wave 7` support-ownership config passed
  Release Gate: Combat

- 2026-03-29 20:05:00 KST
  Changed:
  - Hardened the shipped compact-route state cleanup in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) so `sanitizeConsolidatedBuildState(...)` now force-resets polluted `Wave 6-8` runs back to one-bay support ownership. Any carried `auxiliaryJunctionLevel`, wildcard residue, or doctrine-pursuit progress is stripped and `supportBayCap` is clamped straight back to the lean shipped value of `1`.
  - Closed one more leaked rescue path in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) by making the consolidated `BASE_BUILD` start with `signatureId = null` and by returning early from `shouldRunDoctrinePursuitWave(...)` on the shipped route. This keeps polluted compact states from reactivating shard-chase framing or hidden route identity inside the supposed single-install chapter.
  - Extended [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) with explicit dirty-build assertions for `auxiliaryJunctionLevel` and `supportBayCap`, then re-ran the existing smoke plus a targeted VM check for the new compact-route lock.
  Why:
  - The latest critique's `Top Priority` called for hard-locking `Wave 6-8` to one visible support install with no shard pursuit or support-bay rescue logic. The highest-value bounded interpretation here was to stop relying only on choice-generation guards and make the shipped route resilient even if older or polluted build state sneaks through.
  Follow-up Risk:
  - The compact route is now structurally safer, but this does not yet remove every remaining doctrine/signature noun from title/HUD/forge helper text. If critique next says the chapter is honest but still too taxonomic, the next bounded pass should target one shipped-facing text surface directly rather than widening support content again.
  Validation: `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs` failed on a pre-existing assertion at `playables/cinder-circuit/tools/cinder-circuit-smoke.mjs:3870` (`sentryTierTwo.interceptRange > 0`); targeted VM validation for the new compact-route lock passed
  Release Gate: Progression

- 2026-03-29 19:40:00 KST
  Changed:
  - Locked the shipped `Wave 6-8` support chapter in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) so `buildWave6ChassisBreakpointChoices(...)` no longer opens an extra support bay or uses hidden admin-skip framing when the compact route installs its featured support. The Wave 6 featured chassis card now lands as one installed support silhouette on a single-axis breakpoint, not as a bay-expansion rescue package.
  - Removed the compact-route bailout bay expansion in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) by making `unlockLateSupportBay(...)` a no-op for the shipped route and narrowing `getVisibleSupportOfferSystemIds(...)` so `Wave 8` only re-offers the already installed support system for an upgrade. The back half now keeps one owned support install instead of reopening second-install forks as compensation.
  - Updated [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) to assert the compact route stays at `supportBayCap = 1`, that Wave 6 chassis packages use `singleAxisBreakpoint` without `bayUnlock`, and that Wave 8 support visibility collapses to the installed system rather than a three-way fork. Re-ran the existing smoke test.
  Why:
  - The latest critique's `Top Priority` called for locking `Wave 6-8` to one honest support install chapter with no wildcard, relay-skip, or bailout bay expansion. The highest-value bounded interpretation in code was to stop the shipped route from reopening support capacity at the exact moments meant to prove one install can carry the back half.
  Follow-up Risk:
  - This makes the shipped support chapter more honest, but it also removes the compact route's secondary support fork at Wave 8. If critique next says the back half is cleaner but not exciting enough, the next bounded pass should make the installed support's Mk.II upgrade more dramatic in combat read or spectacle, not reopen extra bays.
  Validation: `node --check playables/cinder-circuit/game.js`; `node --check playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`; `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`
  Release Gate: Progression

- 2026-03-29 19:25:00 KST
  Changed:
  - Recut the shipped compact forge header in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) so `renderForgeOverlay()` and `createBaseRouteForgeContextMarkup(...)` now force one object-first stack at `Wave 6-8`: `현재 머신 -> 대표 설치 -> 전투 요청`. The old inline `설치 · ...` subline is gone, and the combat prompt is now its own labeled row instead of reading like leftover route helper text.
  - Updated the shipped base-route forge cards in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) so both `createBaseRouteForgeHeadlineCardMarkup(...)` and `createBaseRouteForgeCompactCardMarkup(...)` surface a compact `전투 요청` strip per card. This keeps the player reading one silhouette and one immediate arena behavior instead of the older `proof/rider` grammar.
  - Tuned the shipped forge styling in [playables/cinder-circuit/styles.css](/Users/seren/workspace/poong-game/playables/cinder-circuit/styles.css) and refreshed [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) so smoke locks the new hierarchy and wording, then re-ran the existing smoke test.
  Why:
  - The latest critique's `Top Priority` was to make shipped forge/status/HUD reads show only current loadout, one featured install silhouette, and one combat ask. The highest-value bounded interpretation was to rebuild the `Wave 6` forge read order itself, using the object-first snap of `Hades` boon screens and `Nova Drift` upgrade cards as the reference direction, rather than doing another copy-trim pass on the same hidden `proof/rider` shell.
  Follow-up Risk:
  - The forge now reads faster, but the installed/fallback side cards still depend on small descriptive copy to communicate tradeoffs. If critique next says the reward moment is cleaner but the fallback lacks enough desire or clarity, the next bounded pass should differentiate that fallback through stronger silhouette or risk/payoff presentation, not by restoring route-admin labels.
  Validation: `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`
  Release Gate: UX/UI

- 2026-03-29 19:05:00 KST
  Changed:
  - Reworked shipped `Wave 6` support drafting in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) so `buildWave6ChassisBreakpointChoices(...)` now surfaces one doctrine-owned featured install package instead of a three-chassis menu. Each doctrine now enters the chapter through one clear chassis/support silhouette, and the only alternate card is an explicit `Emergency Vent` fallback.
  - Updated the compact base-route forge assembly in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) so `Wave 6` no longer pairs the featured support install with a second `주포` headline-adjacent card. `buildForgeChoices(...)` now keeps that stop on `설치 -> 버팀`, which makes the support chapter read as one dominant mutation plus one safety exit.
  - Refreshed [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) to lock the new two-card expectation across direct `Wave 6` forge construction, doctrine-specific chassis packages, and representative support-proof paths, then re-ran the existing smoke test.
  Why:
  - The latest critique's `Top Priority` called for rebuilding the shipped `Wave 6` forge/pause/HUD moment around one featured support install and one secondary fallback with almost no route text. The highest-value bounded interpretation inside the current slice was to remove the fake-equal chassis/weapon competition at the reward source itself, so the first support chapter finally reads like a deliberate install beat instead of a prototype menu.
  Follow-up Risk:
  - This makes the `Wave 6` reward moment much clearer, but it also reduces local chassis choice at that stop to one doctrine-authored package. If critique next says the chapter is cleaner but too predetermined, the next bounded pass should add differentiation through the two ownership fights or the fallback's tradeoff, not by reopening three same-weight cards at the same forge.
  Validation: `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`
  Release Gate: Rewards

- 2026-03-29 18:20:00 KST
  Changed:
  - Reworked the shipped compact machine board in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) so live `Wave 6-8` HUD states stop promoting the installed support name to the main headline. `getBaseRouteOwnedPowerSummary(...)` now keeps support-owned reads on `현재 머신 -> 설치`, which makes the player read the active weapon/body first and the earned support silhouette second.
  - Recut [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) `createBaseRouteForgeContextMarkup(...)` and the related [playables/cinder-circuit/styles.css](/Users/seren/workspace/poong-game/playables/cinder-circuit/styles.css) spotlight styling so compact forge context now uses the same order: owned machine as the large line, installed reward as the smaller secondary line, and one short combat ask beneath it.
  - Updated [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) to lock the new hierarchy in both live status and forge context, then re-ran the existing smoke test.
  Why:
  - The latest critique's `Top Priority` was to strip shipped opener/forge/status surfaces down to current loadout, one dominant install, and one combat promise after the guaranteed `Wave 6` support chapter. The highest-value bounded interpretation already inside the shipped slice was to stop the compact route from flipping between `설치 우선` and `현재 머신 우선` depending on surface, because that inconsistency kept HUD/forge reading like route-admin shells instead of a single release-style board.
  Follow-up Risk:
  - This makes the shipped HUD/forge hierarchy more consistent, but the compact route still carries `proofWindow`/`current machine` plumbing in longer non-shipped branches and helper paths inside [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js). If critique still says the reward shell is over-explained, the next bounded pass should remove one remaining hidden proof/helper layer rather than add more reward widgets.
  Validation: `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`
  Release Gate: UX/UI

- 2026-03-29 17:45:00 KST
  Changed:
  - Reworked [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) so shipped `Wave 7` chassis-breakpoint runs no longer hide support rewards entirely after the `Wave 6` install. `shouldOfferSupportSystem(...)` and `getVisibleSupportOfferSystemIds(...)` now keep the single-axis hold on fresh installs while still surfacing the already installed support silhouette for `Mk.II` upgrades.
  - This turns the shipped `Wave 6-8` support chapter into `install -> reinforce -> payoff` instead of `install -> no support stop -> Wave 8 bailout`. `Wave 7` can now offer `Ember Ring`/`Aegis Halo`/other installed support overclock upgrades without reopening the whole catalog early.
  - Updated [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) to lock the new `Wave 7` expectation for chassis-breakpoint runs: visible support ids keep the installed system only, and the forge rider upgrades that same system to tier 2.
  Why:
  - The latest critique's `Top Priority` was to make `Wave 6-8` an honest support chapter instead of depending on a late `Wave 8` catch-up silhouette. The highest-value bounded interpretation inside `playables/cinder-circuit/` was to restore a real mid-chapter reward beat at `Wave 7` without adding more early spectacle or reopening broad support forks.
  Follow-up Risk:
  - `Wave 7` now reinforces the installed support silhouette, but the compact route still carries player-facing `Afterburn / black-site / Wave 9+` scaffolding elsewhere in non-shipped branches of [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js). If critique still says the shipped slice is being judged against a shadow game, the next bounded pass should quarantine one of those remaining late-route surfaces rather than widen support breadth again.
  Validation: `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`
  Release Gate: Progression

- 2026-03-29 17:05:00 KST
  Changed:
  - Reworked [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) so shipped `Wave 8` doctrine runs with a live `Wave 6` support install no longer reopen only one support id. `getVisibleSupportOfferSystemIds(...)` now surfaces a bounded three-silhouette fork per doctrine, which keeps `Wave 8` offers on `current install upgrade + cross-build install + fallback defense/offense silhouette` instead of collapsing back to one reopened doctrine card.
  - Updated the shipped base-route reward assembly in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) so that when a support payoff is promoted to `headline`, `Wave 8` keeps a second support card in `rider` rather than pulling the weapon card back into that slot. The resulting late-break read is now `installed Mk.II payoff -> second support branch -> greed`, which makes the second bay matter as a real run-shaping fork.
  - Expanded [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) to lock representative `storm_artillery`, `mirror_hunt`, and `kiln_bastion` `Wave 8` support forks, plus the `headline/rider/gamble` contract roles after the new fork logic.
  Why:
  - The latest critique's `Top Priority` was to stop capping the shipped back half at one support silhouette plus a mandatory `headline + rider` rhythm. The highest-value bounded interpretation was to make `Wave 8` finally expose a real second-bay fork: upgrade what you already own, branch into a second autonomous toy, or cash out for greed.
  Follow-up Risk:
  - This gives `Wave 8` a clearer offense/defense/utility fork, but `Wave 6` chassis cards still pre-bake one doctrine-leaning support rather than showing three equally explicit fork labels up front. If critique still says the chapter break is too hidden, the next bounded pass should retune `buildWave6ChassisBreakpointChoices(...)` presentation, not add more late content.
  Validation: `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`
  Release Gate: Builds

- 2026-03-29 16:35:00 KST
  Changed:
  - Reworked [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) so shipped `Wave 8` base-route forge choices now promote an already installed support payoff upgrade into the `headline` slot instead of always reserving support for the `rider` lane. `Ember Ring`/`Volt Drones`-style `Mk.II` payoffs now lead the reward moment while the weapon follow-up is demoted behind them.
  - Added `scoreBaseRouteSupportHeadlineChoice(...)` and updated `buildForgeChoices(...)` in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) to strongly prefer upgrading the support the player already owns over reopening a fresh catalog branch, which keeps the `Wave 6` install as the run's visible back-half chapter instead of letting reward grammar fall back to `headline gun / rider support`.
  - Updated [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) to assert installed-support runs now surface the `Mk.II` support card as `headline` at `Wave 8`, then re-ran the existing smoke test.
  Why:
  - The latest critique's `Top Priority` was to make one `Wave 6` support install own `Wave 6-8` instead of reading like contract paperwork. The highest-value bounded interpretation inside `playables/cinder-circuit/` was to change reward structure, not just copy, so the back-half forge follows the one-object hierarchy seen in `Hades`, `Nova Drift`, and `Brotato`: installed toy first, short combat promise second.
  Follow-up Risk:
  - `Wave 8` now pays off the installed support more honestly, but `Wave 7` still has no comparable between-wave support-led reward beat because the single-axis hold keeps offers shut until the payoff stop. If critique still says the support chapter feels too brief, the next bounded pass should decide whether `Wave 7` needs a lighter presentation/balance reinforcement without reopening more support catalog breadth.
  Validation: `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`
  Release Gate: Rewards

- 2026-03-29 15:05:00 KST
  Changed:
  - Rewrote the shipped `Wave 8` closure text in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) so `Cataclysm Arsenal`, `Warplate Halo`, and `Black Ledger Heist` now resolve as one dominant object plus one short combat ask instead of `완성 시험`, `짧은 승리 랩`, `proof`, or roadmap-step wording.
  - Recut the consolidated late-break reward previews and forge spotlight labels in [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) from `Wave 8/그 뒤` and `전투 ask` to `설치/다음 전투`, keeping the base-route reward moment closer to the object-first snap of `Hades`, `Nova Drift`, and `Brotato` rather than a route explanation shell.
  - Updated the shipped late-break choice descriptions and [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) so smoke now locks those reward strings against regressions back to `proof`, `완성 시험`, or `짧은 승리 랩`, then re-ran the existing smoke test.
  Why:
  - The latest critique's `Top Priority` was to remove shipped-facing `roadmap-proof` framing and rewrite the Wave 3/6/8 beats as one object plus one short combat promise. The highest-value bounded interpretation inside `playables/cinder-circuit/` was to fix the shipped `Wave 8` closure path, because that was still using admin language right where the run should instead feel complete and craveable.
  Follow-up Risk:
  - The compact route now sells the Wave 8 payoff more directly, but player-facing `Wave 9+ / Afterburn` language still exists in non-shipped helpers and long-route branches inside [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js). The next bounded rewards pass should quarantine one of those remaining late-route strings instead of adding another wrapper.
  Validation: `node playables/cinder-circuit/tools/cinder-circuit-smoke.mjs`
  Release Gate: Rewards

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

# Cinder Circuit Source Application

## Purpose

- Document how the currently available `Grind Survivors` source material should inform `Cinder Circuit`.
- Convert the source docs into concrete design and balance rules for future implementation passes.
- Keep the browser game distinct from the source instead of trying to clone the source systems one-to-one.

## Source Set

- Analysis date: `2026-03-20`
- Source note:
  - `grindsurvivors.wiki` appears to be a community wiki, not an official developer manual.
  - It is still useful because the pages are internally consistent and line up with the official Steam/Xbox descriptions already checked.
  - Treat the wiki as `high-signal design reference`, not as canon.
- Pages reviewed:
  - `https://grindsurvivors.wiki/beginners-guide/`
  - `https://grindsurvivors.wiki/weapons/`
  - `https://grindsurvivors.wiki/characters/`
  - `https://grindsurvivors.wiki/forge/`
  - `https://grindsurvivors.wiki/biomes/`
  - `https://grindsurvivors.wiki/runes/`
  - `https://grindsurvivors.wiki/builds/`

## What the Source Docs Imply

### 1. Weapon identity is `class + rarity + affix`, not just a single swap

- The source docs treat weapons as persistent objects with:
  - weapon class
  - rarity tier
  - affix package
- Highlighted classes are `Dual SMG`, `Shotgun`, `Revolver`, `Tesla Gun`.
- Highlighted affixes include:
  - `Bounce`
  - `Burn`
  - `Cold`
  - `Crit Chance`
  - `Crit Damage`
  - `Lifesteal`
  - `Piercing`
  - `Chain`
  - `Attack Speed`
  - `Reload Speed`
  - `AOE`
- Important implication:
  - The source game is not primarily about replacing one temporary weapon every few minutes.
  - It is about steering a weapon identity toward a target affix package.

### 2. The Forge is the real progression backbone

- The wiki describes four core Forge verbs:
  - `Infuse`
  - `Improve`
  - `Reforge`
  - `Recycle`
- The docs describe this as a `between runs` main-menu system.
- `Infuse` combines `5 weapons of identical type` into one of higher rarity.
- `Improve` levels a chosen weapon and introduces failure risk.
- `Reforge` rerolls affixes/stats but does not change weapon type.
- `Recycle` turns unused weapons into Ash.
- Important implication:
  - The source loop is inventory-driven and long-term.
  - Weapon quality is built over many runs, not only inside one run.

### 3. Character choice biases the target build

- The source docs frame characters as playstyle anchors that change which weapons are best to craft.
- Examples from the wiki:
  - `Cascade` pushes bounce / revolver play.
  - `Solara` pushes cooldown / Tesla play.
  - `Orfeo` is framed as Ash farming.
  - `Vex` leans defensive with cold/freeze synergy.
- Important implication:
  - Source builds are not only weapon-first.
  - They are `character + weapon + rune + affix` packages.

### 4. Runes are a separate passive layer

- The wiki frames runes as meta progression unlocked between runs with Ash.
- Runes stack with weapon affixes and character abilities.
- Rune examples focus on:
  - movement control
  - sustain
  - build-defining proc rules
  - economy
- Important implication:
  - The source has a second passive system on top of weapons and Forge.
  - This creates stronger long-term specialization than our current prototype.

### 5. Difficulty is expressed through biome brackets and expected rarity

- The biome guide ties content brackets to expected gear quality:
  - `Burned Forest`: `Common -> Rare`
  - `Scorched City`: `Rare -> Epic`
  - `Corrupted Lands`: `Epic -> Legendary`
- Important implication:
  - Encounter pressure is not only enemy count.
  - The game assumes a matching power tier by bracket.

### 6. Endgame builds are specific synergy recipes

- The build guide is not generic.
- It names exact recipes like:
  - `Legendary Revolver Bounce`
  - `Solara Tesla Ascended`
  - `Vex SMG Freeze Tank`
  - `Orfeo Shotgun Ash Farm`
- Important implication:
  - Build depth comes from convergence toward a known synergy package.
  - The source is not balanced around flat stat inflation alone.

## How This Should Apply To Cinder Circuit

## Principle 1. Keep the source shape, not the source scale

- `Cinder Circuit` should borrow the source's structure of:
  - weapon identity
  - layered progression
  - synergy recipes
  - economy-driven power growth
- It should not borrow the full source's:
  - persistent inventory depth
  - long-run meta tree
  - multi-biome content breadth
  - full loot table complexity

## Principle 2. Translate long-term crafting into short-run compression

- The source Forge is between runs.
- Our browser game is currently one short self-contained session.
- Therefore the correct translation is:
  - `Infuse / Improve / Reforge / Recycle` should become `between-wave micro-forge choices`
  - not literal menu-based long-term storage
- Translation rule:
  - `Infuse` becomes combining duplicate or same-family weapon pieces during the run.
  - `Improve` becomes safe direct stat investment on the currently equipped weapon.
  - `Reforge` becomes rerolling or redirecting current affix direction.
  - `Recycle` becomes converting unwanted weapon pieces into immediate run currency.

## Principle 3. Current single-core swap is useful, but too shallow

- The current prototype uses:
  - `active core swap`
  - `persistent mod accumulation`
- This is good as a first browser simplification.
- It is still shallower than the source because it lacks:
  - duplicate management
  - explicit rarity ladder
  - affix-targeting logic
  - “bad drop vs good drop” decision weight
- Recommended direction:
  - keep the single active firing pattern for readability
  - add a lightweight `weapon bench` layer above it
  - let the player hold a few candidate weapon pieces or duplicate cores during the run

## Principle 4. Characters and runes should be compressed into signatures

- Full character select plus rune tree is too much for the current scope.
- The correct browser translation is not “ignore them completely”.
- Recommended compression:
  - use one `run-start signature` choice at run start
  - each signature should mimic the source logic without copying names
- Current signature directions:
  - ricochet / drive
  - salvage / sustain
  - lance / cooling
- Later candidates if another layer is needed:
  - cooldown / ability-focused signature
  - control / freeze-focused signature

## Principle 5. Biomes should become wave acts

- The source uses 3 biome brackets.
- `Cinder Circuit` already uses a single arena, so biome changes should become `wave acts`, not map swaps.
- Recommended mapping:
  - `Wave 1-2` = Burned Forest equivalent
  - `Wave 3-4` = Scorched City equivalent
  - `Wave 5` = Corrupted Lands equivalent
- That mapping should affect:
  - enemy composition
  - hazard pattern style
  - expected build tier
  - acceptable player power floor

## Recommended System Mapping

| Source Layer | Source Behavior | Cinder Circuit Translation | Keep / Change |
| --- | --- | --- | --- |
| Weapon Class | SMG / Shotgun / Revolver / Tesla | core family or weapon family | Keep identity, rename presentation |
| Rarity | Common -> Legendary | per-run tier milestones or bench merge rank | Keep ladder, compress duration |
| Affixes | Bounce / Burn / Chain / Crit / etc. | mod package and future reroll targets | Keep logic, reduce count |
| Infuse | 5 same-type -> next rarity | merge duplicate weapon pieces between waves | Keep verb, shorten loop |
| Improve | invest Ash into chosen weapon | direct power upgrade card | Keep verb |
| Reforge | reroll stats/affixes | reroll or retarget a core/mod package | Keep verb |
| Recycle | break gear for Ash | salvage unwanted parts into Scrap | Keep verb |
| Character | passive + active + weapon bias | one run-start signature | Compress |
| Runes | permanent passive layer | small pre-run or mid-run passive package | Compress |
| Biomes | 3 content brackets | 5-wave act curve | Compress |

## Current Gaps Between Source Logic and Our Prototype

### Gap A. We have pattern identity, but not weapon ladder identity

- Current:
  - `Ember`
  - `Scatter`
  - `Lance`
  - `Ricochet`
- Current prototype now also has:
  - a lightweight `weapon bench`
  - duplicate-count tension through `SYNC`
  - duplicate overflow converting into Scrap
- Missing relative to source:
  - explicit rarity tier
  - explicit affix target structure
  - real rarity fusion ladder

### Gap B. We now have explicit Forge verbs, but not full inventory crafting

- Current Forge now exposes:
  - `Infuse` for weapon-bench installs
  - `Improve` for stable stat growth
  - `Reforge` for rerolling weapon-bench composition
  - `Recycle` for turning stored bench cores into immediate Scrap
- Remaining gap relative to source:
  - no rarity fusion ladder
  - no between-run storage
- Important implication:
  - the prototype now reads closer to the source's decision grammar
  - but it still does not create the source's long-term inventory pressure

### Gap C. We now have one run-start signature, but passive layering is still thin

- The prototype now has a compressed passive layer through run-start signatures.
- That is closer to the source than pure Overdrive-only progression.
- Remaining gap relative to source:
  - no second passive layer during the run
  - no rune grid or branching passive package
  - no character-specific active rule set
- Important implication:
  - the opening build direction now reads much earlier
  - but long-run specialization is still much thinner than the source

## Balance Guidance

## 1. Power Brackets By Wave

| Wave | Source Analogy | Target Build Feel | Player Expectation |
| --- | --- | --- | --- |
| 1 | Burned Forest early | Common / Uncommon | base core + first cheap improvement |
| 2 | Burned Forest late | Uncommon / early Rare | first clear build direction and one meaningful paid choice |
| 3 | Scorched City early | Rare | two-layer synergy should be online |
| 4 | Scorched City late | Rare / Epic | offense plus sustain or mobility must both matter |
| 5 | Corrupted Lands | Epic / pseudo-Legendary | full synergy package required for stable clear |

## 2. Target Failure Pattern

- A good run should not feel flat.
- Failure should shift by wave:
  - `Wave 1`: mostly positioning mistakes
  - `Wave 2`: greed on pickups or bad first purchase
  - `Wave 3`: incomplete build package
  - `Wave 4`: lack of sustain / mobility under stacked pressure
  - `Wave 5`: missing endgame synergy or poor Overdrive timing

## 3. Economy Reality Check

Current expected gross Scrap from the implemented wave table is roughly:

| Wave | Expected Gross Scrap | Hazard |
| --- | --- | --- |
| 1 | `277` | none |
| 2 | `438` | `Cinder Surge I` |
| 3 | `590` | `Cinder Surge II` |
| 4 | `761` | `Twin Surges` |
| 5 | `954` | `Meltdown Surge` |

Implication:

- The current card price band around roughly `48~86` becomes too cheap after the first half of the run.
- That means the economy reads like a reward meter, not like a decision layer.

Recommended normalization:

- Either reduce effective Scrap income to roughly `30~35%` of current values
- Or raise Forge prices aggressively by `2.5x~4x`

Recommended choice:

- Reduce Scrap income first.
- Reason:
  - smaller numbers read better in a short browser run
  - cost differences become easier to understand at a glance
  - the economy will feel more deliberate without giant totals

If income is normalized to about `32%` of current values, target gross Scrap becomes roughly:

| Wave | Target Gross Scrap After Normalization |
| --- | --- |
| 1 | `89` |
| 2 | `140` |
| 3 | `189` |
| 4 | `244` |
| 5 | `305` |

That makes these Forge price bands more readable:

| Forge Timing | Suggested Cost Band |
| --- | --- |
| After Wave 1 | `24~40` |
| After Wave 2 | `36~60` |
| After Wave 3 | `52~84` |
| After Wave 4 | `70~110` |

Current implementation note:

- The prototype now uses enemy Scrap values of:
  - `Scuttler 1`
  - `Brute 3`
  - `Shrike 2`
  - `Elite Husk 5`
- That puts expected gross Scrap at roughly:
  - `Wave 1`: `83`
  - `Wave 2`: `139`
  - `Wave 3`: `190`
  - `Wave 4`: `246`
  - `Wave 5`: `308`
- Current Forge card prices now sit around:
  - `Improve`: `24~50`
  - `Infuse`: `42~52`
  - `Reforge`: `18`
  - `Recycle`: `0`
- The weapon bench now stores up to `3` copies per core type.
- Duplicate cores produce `SYNC I~II`, reducing Infuse cost and strengthening the equipped matching core.
- Extra copies above the cap immediately convert to `Scrap +6`.
- The prototype now also offers three run-start signatures:
  - `Relay Oath` for ricochet / drive bias
  - `Scrap Pact` for salvage / sustain bias
  - `Rail Zeal` for lance / chain / cooling bias
- Late waves are now retuned to separate roles more clearly:
  - `Wave 4` lowers raw crowd cap a bit and leans into sustain / route pressure
  - `Wave 5` lowers blind attrition slightly, but boosts late-wave drive gain for clearer Overdrive windows
- Current late-wave implementation values are:
  - `Wave 4`: `activeCap 28`, `hazard interval 10.2`, `telegraph 0.98`, `driveGainFactor 1.08`
  - `Wave 5`: `activeCap 33`, `hazard interval 8.4`, `telegraph 0.88`, `driveGainFactor 1.18`
- This is close enough to the planned browser-scale target to keep tuning by playtest instead of another raw numeric compression pass.

## 4. Overdrive Balance Targets

- `Overdrive` should become ready:
  - once by late Wave 2 for an average run
  - two to four total times in a full clear
- If players can ignore `Overdrive` and still clear Wave 5 comfortably, the endgame is too soft.
- If players cannot reliably earn a first `Overdrive` until Wave 4, the meter is too stingy.

## 5. Hazard Balance Targets

- Hazards should create route change, not pure denial.
- Simultaneous active hazard count should stay readable:
  - `Wave 1`: `0`
  - `Wave 2`: `1`
  - `Wave 3`: `1`
  - `Wave 4`: `2`
  - `Wave 5`: `2`
- A player should usually see the telegraph, understand the danger, and still have one valid movement lane.
- If hazards force blind damage more than once per wave in normal play, telegraph timing is too short.

## 6. Build Diversity Targets

To feel closer to the source docs, the run should support at least three clearly different end states:

- `precision / bounce` style
- `spread / sustain` style
- `chain / cooldown` style

Current note:

- `Relay Oath + Ricochet + drive mods` reaches the first bucket cleanly.
- `Scrap Pact + Scatter + sustain mods` reaches the second bucket cleanly.
- `Rail Zeal + Arc Array + cooling mods` now reaches the third bucket with real `chain + cooldown` properties.
- A scripted audit confirms those three end states are reachable as browser-scale target builds.

## Recommended Next Design Pass

1. Decide whether a later pass needs a real tier ladder on top of the current bench.
2. Decide whether one more passive layer is needed after Forge to approach source-style specialization.
3. Verify the new Wave 4-5 curve by hand in the browser, not only through config inspection.
4. Check whether the scripted end states match what human play can reliably assemble.

## Non-Goals For The Next Pass

- Do not add a full persistent meta tree yet.
- Do not add full inventory drag-and-drop UI yet.
- Do not add multiple biomes as separate scenes yet.
- Do not try to reproduce exact source builds by name.

## Summary

- The source docs point toward `persistent weapon crafting + affix targeting + meta passives`.
- `Cinder Circuit` should adapt that into `short-run weapon shaping + explicit forge verbs + readable act brackets`.
- The next important task is not “more content first”.
- The next important task is `end-state audit + passive-layer decision + browser playtest verification`.

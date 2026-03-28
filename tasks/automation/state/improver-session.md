# Improver Session

Purpose: persistent memory for the improvement agent.

Use this file to remember:
- recent implementation patterns that worked well
- systems that are getting overbuilt and need consolidation
- important technical risks or balance risks
- short next-step heuristics for bounded, high-value improvements

Keep this short and replace stale notes instead of endlessly appending.

## Current Memory

- On the shipped `Wave 1-8` route, `Wave 6` chassis breakpoint cards now bundle one doctrine-primary tier-1 support install immediately instead of holding all support spectacle until `Wave 8`. Keep [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) on `buildWave6ChassisBreakpointChoices(...)` selecting `getDoctrinePrimarySupportSystemId(...)` plus `createSupportSystemTierChoice(...)`, and keep [playables/cinder-circuit/tools/cinder-circuit-smoke.mjs](/Users/seren/workspace/poong-game/playables/cinder-circuit/tools/cinder-circuit-smoke.mjs) asserting `bayUnlock + systemChoice` on `Wave 6` rider/chassis cards. If a future pass moves this rider back behind `Wave 7-8`, the shipped run will flatten back into a chassis-only proof stretch.
- On the shipped route, `Wave 8` should now read as a mastery/upgrade lap for the already installed support silhouette, not the first time the toy appears. Keep [playables/cinder-circuit/game.js](/Users/seren/workspace/poong-game/playables/cinder-circuit/game.js) on `getVisibleSupportOfferSystemIds(...)` and `createSupportSystemChoices(...)` preserving the doctrine-primary `Mk.II` upgrade window for breakpoint runs, and keep smoke asserting `Wave 8` rider offers upgrade the same installed system. If `Wave 8` reopens broad fresh installs again, the back half will slip back into catalog admin instead of payoff escalation.
- The current risk is doctrine/support mismatch around odd state mutations or future overcommit variants, because `Wave 6` cards now pre-bake a doctrine-owned support choice. Before widening content again, prefer a consolidation pass that checks special routes still adopt the intended doctrine before the bundled rider is generated or applied.

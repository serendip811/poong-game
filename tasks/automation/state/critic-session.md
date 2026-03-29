# Critic Session

Purpose: persistent memory for the critique agent.

Use this file to remember:
- recurring structural problems
- repeated false solutions
- what release gate is currently most fragile
- what kinds of critique are becoming repetitive or low value

Keep this short and overwrite stale thinking when the game changes.

## Current Memory

- The blocker has shifted from “open one real fork” to “stop over-managing the whole shipped ladder.” `Wave 6` and `Wave 7` now branch, but `buildFieldGrantChoices()` still defaults much of `Wave 1-8` back to a two-card contract, so the run remains more authored than replay-hungry.
- Most fragile gate is now `Builds`, with `Progression` still attached. The next useful critique should test whether the player keeps making appetitive offense / defense / greed decisions across at least three separate stops instead of getting one midrun fork and then following instructions.
- Key structural problem: `Wave 6` is still not a big enough silhouette leap because `buildWave6ChassisBreakpointChoices()` keeps one shared chassis across lanes. The build reads cleanly, but the transformation fantasy is still narrower than the system count suggests.
- Repeated false solutions: more fallback contract logic, more `Wave 9-12` / `Late Break` scaffolding leaking into the shipped slice, or more copy cleanup that leaves the same route-admin structure intact.

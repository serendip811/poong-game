Read `tasks/automation/cinder-circuit-loop.md`, especially the newest item under `## Latest Critique`, and implement one bounded improvement for `Cinder Circuit`.

Mission:
- Push the game toward a more complete, repeatedly fun action roguelite rather than a thin browser prototype.
- Favor changes that increase player excitement, build identity, combat readability, decision weight, escalation, and replayability.
- Move the game closer to source-level fun and depth in spirit, but do not clone source-specific content, names, progression trees, or exact systems one-to-one.

Important design directions to actively use when relevant:
- Expand the long-term gameplay ceiling, not just the first few waves. If the game needs more room to eventually support something like 20-30 waves, move it in that direction with bounded steps.
- Be open to enlarging or rebalancing the combat arena when tight spacing is reducing tactical play.
- Add richer between-wave choices than a single obvious weapon pick when possible: passives, defensive tech, satellites, shield systems, autonomous missiles, orbitals, utility modules, rerolls, branching power packages.
- Make weapon growth visible and exciting. Prefer upgrades that change how the weapon looks or behaves, such as extra barrels, projectile count increases, split shots, wider volleys, chained fire, helper drones, or periodic autonomous attacks.
- Favor upgrades that create "I want to see what this becomes next" momentum.
- When touching UI/UX, HUDs, forge screens, reward screens, readability, or interaction flow, first look at concrete references from strong game UI examples and use them deliberately. Do not do generic cleanup in a vacuum; anchor the change in at least one identifiable reference direction.
- Favor simplicity, hierarchy, and restraint. Prefer fewer words, fewer simultaneous panels, fewer repeated labels, and clearer dominant actions. The player should feel the fantasy quickly instead of reading a systems dashboard.

Working rules:
- Focus on `playables/cinder-circuit/` and only touch files needed for the selected improvement.
- Prefer the latest critique's `Top Priority` unless it is already clearly addressed.
- Read `## Release Goal`, `## Current Stage`, `## Release Gates`, and `## Anti-Drift Rules` first and use them to avoid drifting into low-value work.
- Read `tasks/automation/state/improver-session.md` first and update it after the change so this role keeps a practical implementation memory across runs.
- After changing code, update `tasks/automation/cinder-circuit-loop.md` by prepending a new entry under `## Latest Improvement`.
- Include what changed, why, and any new follow-up risk in that entry.
- Run the existing smoke test if your change touches gameplay or UI logic.
- Do not run `git add`, `git commit`, or `git push` yourself; the wrapper script handles the commit after you finish.
- If the work includes UI/UX changes, explicitly mention which reference direction or comparable game UI pattern informed the change in the loop entry.

Constraints:
- Keep the improvement bounded. One coherent change per run.
- Do not modify cron files or the automation shell scripts.
- Prefer meaningful game-feel or system-depth improvements over superficial polish.
- If choosing between UI cleanup and gameplay depth, prefer gameplay depth unless readability is the direct blocker.
- Prefer improvements that create visible power growth, stronger run variety, or better long-run pacing over tiny numerical tweaks.
- If the last few loops already added major systems, prefer one consolidation pass that improves readability, balance, or pacing instead of adding another branch.
- Tie the work to one release gate and make that gate visibly better by the end of the run.
- If the game is becoming too wordy or over-explained, prioritize simplification passes that remove redundant explanation and make reward moments faster to parse.

After code and loop-file changes are done:
- Run the existing smoke test if needed.
- End with a single-line `Commit message:` field containing a concise commit message the wrapper can reuse.

Final response rule:
- End with a very short 1-2 line plain-text summary in Korean of what was improved, what files changed, whether validation passed, and include the `Commit message:` line so the automation wrapper can relay and reuse it.
- In the loop entry, add `Release Gate:` to say which gate this improvement advanced.

If the critique is too vague, choose the highest-value concrete interpretation and note it in the loop file.

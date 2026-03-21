Review the current `Cinder Circuit` implementation as a gameplay critic.

Mission:
- Push this game toward a genuinely strong, release-feeling action roguelite, not a mere prototype.
- Critique it against the standard of "would a player want to run this repeatedly for fun?"
- Aim for the intensity, clarity, build hunger, and payoff expected from the source inspiration level, while staying distinct and not copying source-specific names or content one-to-one.

Important design directions to actively evaluate and push toward when relevant:
- A much longer escalation curve, potentially far beyond the current short run structure, with enough systemic depth to support something like 20-30 waves if the game grows into it.
- A combat space that can breathe, with arena size, encounter density, and enemy pressure tuned so the player has meaningful movement decisions instead of constant cramped kiting.
- Between-wave choices that are richer than just "pick one weapon thing" and can include weapon growth, passive systems, defensive systems, satellites, shields, missiles, utility modules, or other run-shaping layers.
- Weapons that evolve visually and functionally as they level up: more barrels, extra projectiles, new firing patterns, bigger beams, chained shots, autonomous helpers, orbitals, shield emitters, and other visible power spikes.
- Build paths that create excitement and anticipation, not just small stat nudges.

Working rules:
- Focus on `playables/cinder-circuit/` and relevant docs in `docs/games/`.
- Do not modify gameplay code, styles, HTML, scripts, cron files, or shell scripts.
- Only update `tasks/automation/cinder-circuit-loop.md`.
- Read the existing loop file first and prepend a new critique entry under `## Latest Critique`.
- Keep the entry concise but specific.

Your critique entry must include:
1. Timestamp placeholder as plain text you generate yourself.
2. `Findings:` with 3-5 bullets.
3. `Top Priority:` one concrete next improvement.
4. `Why Now:` one short sentence.
5. `Do Not Repeat:` optional short warning if the loop is cycling.

Final response rule:
- End with a very short 1-2 line plain-text summary of what critique was added so the automation webhook can relay it.

Bias toward game-feel, clarity, pacing, build depth, forge decisions, and combat pressure.
Prefer actionable criticism over praise.
Be harsher about shallow systems, fake choices, weak payoffs, poor escalation, and "this is fine for a prototype" thinking.
Prefer criticism that raises the ceiling of the game over local polish that does not improve replayable fun.
Call out when the game needs bigger structural ambition, not just cleanup.

Do not commit, do not push, and do not edit any file except `tasks/automation/cinder-circuit-loop.md`.

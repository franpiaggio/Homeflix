# Agent instructions

Read `docs/PROJECT.md`, `docs/DECISIONS.md`, and `docs/ROADMAP.md` before making changes.

- Write repository documentation in clear, concise English. Keep the README presentational; a brief work-in-progress note is sufficient.
- Do not hardcode personal audio, quality, or subtitle preferences as product defaults. Support per-user settings and per-movie overrides.
- Build short, stateful conversations: title, real available releases, language/subtitle choices, confirmation, and status.
- Never fabricate release options or subtitle availability. Distinguish verified and pending information.
- Prefer verified original-language audio when selected, including non-English films.
- Ensure Jellyfin exposes available subtitle tracks for selection during playback.
- Keep messaging, discovery, acquisition, and playback independent.
- Keep interfaces minimal and device-agnostic.
- Use free software and the existing VPS; optional storage is the only planned additional expense.
- Never commit credentials or sessions; keep administration private and use authorized sources.
- Run tests and update `docs/ROADMAP.md` after each milestone. Do not claim untested features work.
- Do not modify unrelated applications in Coolify.

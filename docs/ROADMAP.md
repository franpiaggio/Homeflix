# Development roadmap

## Current foundation

- Repository documentation and project structure.
- Initial Docker Compose configuration for Jellyfin, Radarr, Prowlarr, qBittorrent, and Bazarr.
- Telegram request prototype with user allowlist.
- Basic release quality rules and unit tests (currently hardcoded; must become configurable).

## Next milestones

1. Define per-user preferences, original-audio selection, and per-movie overrides.
2. Implement conversation states: title, disambiguation, real release choices, audio/subtitle confirmation, acquisition, and completion.
3. Validate available resolution/audio metadata before presenting choices; never invent options.
4. Integrate authorized indexers, Radarr, Prowlarr, and qBittorrent.
5. Integrate Bazarr and distinguish embedded, external, and unverified subtitle availability.
6. Verify subtitle selection in Jellyfin on Android, iOS, and browser.
7. Add persistent request tracking, notifications, retries, and duplicate handling.
8. Implement WhatsApp adapter with Telegram fallback.
9. Validate Coolify deployment, resource limits, storage, and private access.

## Release verification

- Only authorized users can request titles.
- Movie matches and release options are accurate.
- Audio defaults follow user preferences and verified original language.
- Subtitle availability is reported accurately.
- Ready requires verified library import and subtitle status.
- Subtitles can be selected or disabled during playback on supported clients.
- Secrets are excluded from git and admin services remain private.

**Current status:** prototype. End-to-end deployment and playback have not been validated.

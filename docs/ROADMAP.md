# Development roadmap

## Current foundation

- Repository documentation and project structure.
- Initial Docker Compose configuration for Jellyfin, Radarr, Prowlarr, qBittorrent, and Bazarr.
- Telegram request prototype with user allowlist.
- Release quality rules and unit tests.

## Next milestones

1. Validate Compose deployment and resource limits in Coolify.
2. Connect authorized indexers, Radarr, Prowlarr, and qBittorrent.
3. Connect Bazarr and verify Spanish subtitle handling.
4. Add request tracking, confirmation, notifications, and retries.
5. Implement the WhatsApp adapter and preserve Telegram fallback.
6. Configure private access and test Jellyfin on Android, iOS, and web.
7. Verify codec compatibility, Direct Play, and playback fallbacks.
8. Test storage limits, error recovery, and duplicate requests.

## Release verification

- Only authorized users can submit requests.
- Movie identification, quality, and language checks are accurate.
- Readiness requires verified library import and subtitle status.
- No manual file transfer is needed.
- Playback works on supported clients.
- Secrets stay out of the repository.
- Admin services are not publicly exposed.
- Other VPS applications remain unaffected except for shared resource usage.

**Current status:** prototype. End-to-end deployment and playback have not been validated.

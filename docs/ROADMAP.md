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

## Reference review (2026-11-15)

Sources:
- TRaSH Guides: https://trash-guides.info/File-and-Folder-Structure/How-to-set-up/Docker/
- Servarr Docker guide: https://wiki.servarr.com/docker-guide
- Reference Compose stack: https://github.com/rmmarconi/rmediacenter
- Jellyfin client codecs: https://jellyfin.org/docs/general/clients/codec-support/
- Jellyfin transcoding: https://jellyfin.org/docs/general/post-install/transcoding/

Critical findings:
1. A shared filesystem and consistent `/data` mounts enable hardlinks and atomic moves. Current configurable separate downloads/library mounts do **not** guarantee this. If library storage is remote, expect copying and additional disk/network I/O. Prefer same-filesystem downloads and library when feasible; keep separate mounts only as an explicit tradeoff.
2. Subtitle format can trigger expensive video transcoding, especially image subtitles burned into video. Prefer compatible text subtitle formats such as SRT and validate client codec support.
3. Validate container paths, user permissions, free space and mount availability before deployment; a missing remote mount must fail closed.
4. Reference stacks often include Seerr/Jellyseerr for requests. Keep it optional: Homeflix's bot is the intended interface, so an additional portal is unnecessary for the first release.
5. Use pinned container image versions for repeatable production deployments rather than unqualified `latest` after compatibility tests.

Code update: added a persistent Telegram-to-Radarr request flow with title selection, Radarr quality profile selection, subtitle preference and confirmation. The subtitle preference is recorded but not connected to Bazarr. Release selection currently uses Radarr quality profiles, **not verified live releases**. Do not claim end-to-end functionality. New tests are committed but have not been executed against a live Radarr instance.

Next priorities: validate the API integration against a real Radarr version, implement actual release availability, ensure no duplicate commands, wire subtitle selection to Bazarr, add status notifications, and integrate Sonarr.

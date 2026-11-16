# Roadmap
## Implemented
- Repository scaffold and documentation.
- Container compose draft for core services with private networking and resource limits.
- Transport-neutral command handling, quality rules, tests and Telegram long-polling prototype (JavaScript ESM; TypeScript migration pending).
## Requires operator validation and development
- Configure authorized indexers and credentials, download client, Radarr/Bazarr integration.
- Verify VPS capacity, storage, disk space, network limits and transcoding needs.
- Confirm Android projector model and codec support.
- Test Jellyfin access through Tailscale and actual end-to-end playback.
- WhatsApp Baileys adapter (experimental; not shipped yet).
- Wire Radarr status polling and subtitle checks for reliable notifications.
- Validate Docker Compose on target Coolify environment.
## Release criteria
- Only authorized user IDs can request titles.
- No public admin ports; secrets stored outside git.
- Quality and subtitle state independently verified before ready notification.
- Docker limits, storage limits, backups, and end-to-end smoke test pass.

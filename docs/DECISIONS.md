# Decisions
- Docker Compose inside existing Coolify, isolated networks/volumes and resource caps.
- Jellyfin rather than custom player initially; projector APK/browser fallback.
- Radarr/Prowlarr/qBittorrent/Bazarr are standard media-management components; test actual interoperability.
- WhatsApp via Baileys is an experimental nonofficial adapter; Telegram fallback.
- Audio English, Spanish subtitles, prefer 1080p, 720p acceptable, below 720p ask before downloading.
- Never promise subtitles or quality without verifying source metadata and resulting file.
- Storage initially local, remote storage evaluated after actual sizing.
- No paid services except VPS and optional storage.
- No visual polish until later iteration.

- Playback is device-agnostic, not projector-specific; Android, iOS and web are target clients.
- Four decoupled layers: request, discovery, acquisition, playback. Swap transport and player clients independently.
- Primary UX is asynchronous: request remotely, watch at home later. Never claim ready before verifying playback file and subtitle status.

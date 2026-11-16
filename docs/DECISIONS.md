# Technical decisions

- **Hosting:** Docker Compose on the existing Coolify VPS, with isolated networking, volumes, and resource limits.
- **Messaging:** WhatsApp through an experimental Baileys adapter; Telegram as a fallback. Keep transports independent.
- **Discovery:** TMDB, Radarr, and Prowlarr, using authorized sources.
- **Downloads:** qBittorrent, managed through Radarr.
- **Subtitles:** Bazarr, with verification before ready notifications.
- **Playback:** Jellyfin across Android, iOS, TV, projector, and browser clients.
- **Quality:** English audio, 1080p preferred, 720p accepted, confirmation below 720p.
- **Access:** Tailscale; no public administration panels.
- **Storage:** Local first, optional external storage when needed.
- **Cost:** No additional subscriptions; storage may be paid.
- **Interface:** Minimal and generic until a dedicated design iteration.
- **Validation:** Separate configured components from tested integrations.

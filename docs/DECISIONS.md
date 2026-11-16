# Technical decisions

- **Hosting:** Docker Compose on the existing Coolify VPS, with isolated networking, volumes, and resource limits.
- **Messaging:** WhatsApp through an experimental Baileys adapter; Telegram as a fallback. Keep transports independent.
- **Discovery:** TMDB, Radarr, and Prowlarr, using authorized sources.
- **Conversation:** Title → verified release options → audio/subtitle choice or confirmation → download → ready notification.
- **Preferences:** Per-user defaults with per-movie overrides. Original audio is an option, not a hardcoded English rule.
- **Quality:** Show available resolutions and respect user preferences; do not invent availability.
- **Downloads:** qBittorrent, managed through Radarr.
- **Subtitles:** Bazarr; distinguish confirmed, searchable, and unavailable subtitle tracks.
- **Playback:** Jellyfin across Android, iOS, TV, projector, and browser clients, with selectable subtitle tracks.
- **Access:** Tailscale; no public administration panels.
- **Storage:** Local first, optional external storage when needed.
- **Cost:** No additional subscriptions; storage may be paid.
- **Interface:** Minimal and generic until a dedicated design iteration.
- **Validation:** Separate configured components from tested integrations.

<div align="center">

# 🎞️ Homeflix

**Your movies. Your server. Your screen.**

A self-hosted movie-request and playback project for a private home library.

**Docker + Coolify** · **No paid software** · **Work in progress**

[Quick start](#quick-start) · [Status](#status) · [Architecture](docs/PROJECT.md) · [Roadmap](docs/ROADMAP.md) · [Agent instructions](AGENTS.md)

</div>

---

> [!IMPORTANT]
> **Early prototype.** The media stack is a deployment draft and the Telegram bot currently acknowledges requests only. Automated searching, downloads, subtitles and WhatsApp are not connected or validated.

## Intended flow

```text
WhatsApp / Telegram
        ↓
Movie request bot
        ↓
Radarr + Prowlarr (authorized sources)
        ↓
qBittorrent → Bazarr (Spanish subtitles)
        ↓
Jellyfin → Android / home projector
```

**Preferences:** English audio; Spanish subtitles; prefer 1080p; accept 720p; ask before lower quality. Notify on unavailable titles, low quality, missing subtitles and completion. These are goals, not implemented features.

## Status

| Component | State |
|---|---|
| Documentation and agent handoff | Ready |
| Docker Compose | Draft; not deployment-tested |
| Telegram bot | Prototype; requests only |
| WhatsApp (Baileys) | Planned; unofficial, potentially unstable |
| Search/download/subtitles | Not connected |
| Android projector / Tailscale | To validate |

## Quick start

**Run bot tests** (Node.js 20+):

```bash
cd apps/bot
npm test
```

**Try the Telegram prototype** (obtain token from BotFather and your numeric Telegram user ID):

```bash
TELEGRAM_BOT_TOKEN='YOUR_TOKEN' ALLOWED_TELEGRAM_IDS='YOUR_ID' node src/index.mjs
```

The bot replies that the request was received; **it does not download anything**.

**Validate the Compose draft** (Docker required):

```bash
cp .env.example .env
# Set MEDIA_ROOT, PUID, PGID, TZ
docker compose --env-file .env -f infra/compose.yml config
```

The stack publishes **no admin ports**. Configure private access (for example, Tailscale) before expecting Jellyfin to be reachable. Test Direct Play with a video you are authorized to use. Do not expose torrent or admin panels publicly.

## Design constraints

- Existing VPS with Coolify, isolated Docker stack and resource limits.
- No additional subscriptions; optional paid storage only if necessary.
- Minimal interfaces; visual redesign deferred.
- WhatsApp adapter must be replaceable with Telegram.
- Never commit credentials or sessions; use authorized media sources.
- Real end-to-end playback, subtitles and server capacity still require testing.

## For future agents

Read [AGENTS.md](AGENTS.md), [project specification](docs/PROJECT.md), [decisions](docs/DECISIONS.md), and [roadmap](docs/ROADMAP.md) before making changes. Keep roadmap and implementation status truthful.

---
Homeflix is a personal infrastructure experiment. Respect licensing and source terms.

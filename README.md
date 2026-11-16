<div align="center">

# Homeflix

**A self-hosted movie library, controlled by messages.**

*Work in progress*

</div>

## Overview

Request a movie from WhatsApp or Telegram, then watch it later from your phone, TV, projector, or browser. Homeflix connects movie discovery, downloads, subtitles, and playback in one private system.

## How it works

```text
WhatsApp / Telegram
         ↓
    Movie discovery
         ↓
 Download + subtitles
         ↓
       Jellyfin
         ↓
 Android · iOS · TV · Web
```

## Features

- **Simple requests.** Send a movie title and receive status updates.
- **Quality preferences.** Prefer 1080p, accept 720p, and ask before choosing lower quality.
- **Language preferences.** English audio with Spanish subtitles.
- **Clear feedback.** Report unavailable titles, quality limitations, and missing subtitles.
- **Private streaming.** Browse and play your library from supported devices.
- **Modular setup.** Messaging, discovery, downloads, and playback are independent components.

## Stack

| Layer | Tools |
| --- | --- |
| Messaging | WhatsApp / Telegram |
| Movie discovery | TMDB, Radarr, Prowlarr |
| Downloads | qBittorrent |
| Subtitles | Bazarr |
| Playback | Jellyfin |
| Private access | Tailscale |
| Hosting | Docker Compose, Coolify |

Homeflix runs on a personal VPS. The software stack is free; additional storage is optional.

## Repository

```text
apps/bot/         Messaging prototype and quality rules
infra/            Docker Compose
docs/PROJECT.md   Architecture and requirements
docs/DECISIONS.md Technical decisions
docs/ROADMAP.md   Development plan
AGENTS.md         Instructions for coding agents
```

## Development

Run the bot tests with Node.js 20+:

```bash
cd apps/bot
npm test
```

Run the Telegram prototype:

```bash
TELEGRAM_BOT_TOKEN='TOKEN' ALLOWED_TELEGRAM_IDS='USER_ID' npm start
```

Validate the Docker Compose configuration:

```bash
cp .env.example .env
docker compose --env-file .env -f infra/compose.yml config
```

Configure your own credentials and private network access before deployment. Use only media sources you are authorized to access.

## Documentation

[Architecture](docs/PROJECT.md) · [Technical decisions](docs/DECISIONS.md) · [Development plan](docs/ROADMAP.md) · [Agent instructions](AGENTS.md)

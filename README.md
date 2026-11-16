<div align="center">

# Homeflix

**A self-hosted movie library, controlled by messages.**

*Work in progress*

</div>

## Overview

Request a movie from WhatsApp or Telegram, choose a release and your preferred audio and subtitles, then watch it later from your phone, TV, projector, or browser.

## How it works

```text
WhatsApp / Telegram
         ↓
    Find a movie
         ↓
Choose quality, audio and subtitles
         ↓
 Download and prepare
         ↓
       Jellyfin
         ↓
 Android · iOS · TV · Web
```

## Features

- **Short conversations.** Send a title, select from available releases, and confirm your preferences.
- **Configurable preferences.** Set preferred quality, audio language, and subtitle languages, with per-movie overrides.
- **Original audio.** Choose the original language when available, regardless of the film's country.
- **Accurate choices.** Show only verified release options and distinguish confirmed subtitles from ones still being searched.
- **Status updates.** Get notified when a title is unavailable, needs confirmation, or is ready.
- **Playback controls.** Select or disable available audio and subtitle tracks in the player.
- **Private streaming.** Watch your library on supported Android, iOS, TV, projector, and web clients.

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

Try the offline conversation (fictional fixtures, no credentials):

```bash
cd apps/bot
npm run demo
```

For real credentials, service setup, diagnostics and the Telegram container, follow [the first test guide](docs/TESTING.md).

Validate the Docker Compose configuration:

```bash
cp .env.example .env
docker compose --env-file .env -f infra/compose.yml config
```

Configure credentials and private network access before deployment. Use only media sources you are authorized to access.

## Documentation

[Architecture](docs/PROJECT.md) · [Technical decisions](docs/DECISIONS.md) · [Development plan](docs/ROADMAP.md) · [Agent instructions](AGENTS.md)

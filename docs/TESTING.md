# First test session

## Verified in the development environment

- 15 assertions/tests pass with Node.js 24 (including mocked Radarr and TMDB API contracts).
- The complete terminal demo runs without tokens, downloads, or network access.
- Docker Compose resolves with the bot profile and loopback administration override.
- The diagnostic exits with failure when credentials are missing, without printing secrets.

No live server, download, subtitle, WhatsApp, or playback integration has been validated. This environment cannot access the VPS and cannot start Docker containers.

## 1. Try the conversation now

Install Node.js 20+ and clone this branch. No npm dependencies are required.

```bash
cd apps/bot
npm test
npm run demo
```

Send any title, then `1`, `1`, `1`, `YES`. All demo data is fictional. `/cancel` resets; `/exit` quits. The real prototype currently selects quality profiles, not verified releases. A successful demo proves only the conversation flow.

## 2. Prepare the Docker host

Copy `.env.example` to `.env`. Set `PUID` and `PGID` to the account that owns the directories. Use absolute paths. The shared `DATA_ROOT` replaces the old separate `LIBRARY_ROOT` and `DOWNLOADS_ROOT` settings; see STORAGE.md before migrating an existing installation.

Create these directories on the Docker host and give the configured UID/GID write access:

- `${CONFIG_ROOT}/bot`
- `${DATA_ROOT}/downloads/incomplete`
- `${DATA_ROOT}/downloads/complete`
- `${DATA_ROOT}/library/movies`

Check available space with `df -h`. Do not launch on an unmounted external disk. Run on local storage for the first test.

```bash
docker compose --env-file .env -f infra/compose.yml -f infra/compose.local.yml config --quiet
docker compose --env-file .env -f infra/compose.yml -f infra/compose.local.yml up -d
```

This starts the media services only. Image tags remain floating development tags; pin tested versions/digests before production. The bot is opt-in until service setup is complete.

Administration is bound to 127.0.0.1. On the Docker host open Jellyfin :8096, Radarr :7878, Prowlarr :9696, qBittorrent :8080 and Bazarr :6767. For a remote VPS use an SSH tunnel, for example:

```bash
ssh -L 8096:127.0.0.1:8096 -L 7878:127.0.0.1:7878 -L 9696:127.0.0.1:9696 -L 8080:127.0.0.1:8080 -L 6767:127.0.0.1:6767 USER@VPS
```

Keep ports private. Do not add public Coolify domains to administration panels.

## 3. Configure integrations

1. qBittorrent: set a permanent Web UI password; find the initial temporary password in its container logs. Use `/data/downloads/complete` and `/data/downloads/incomplete`, and a `movies` category. Internal hostname: `qbittorrent`, port `8080`.
2. Radarr: set root `/data/library/movies`, review quality profiles, connect qBittorrent and its movies category. Copy the Radarr API key to `.env`.
3. Prowlarr: configure sources you are authorized to access; add Radarr at `http://radarr:7878` with its API key, synchronize, and test the indexers.
4. Jellyfin: create the administrator, then add a Movies library at `/media/movies`. Keep its access private.
5. Bazarr: connect Radarr at `http://radarr:7878`, configure subtitle providers and language profiles. The bot only records a requested language: you must configure Bazarr separately in this prototype.
6. Telegram: obtain a bot token, add it and your numeric user ID to `.env`. Only allowlisted users should operate the bot. Run one poller per token.
7. TMDB: set either a v3 API key or an API Read Access Token in `TMDB_API_KEY`; both are supported.

## 4. Diagnose, then run Telegram

From the repository root on a host with Node.js installed, use the loopback Radarr port:

```bash
RADARR_URL=http://127.0.0.1:7878 node --env-file=.env apps/bot/src/doctor.mjs
```

The shell override takes precedence over the internal Docker hostname in `.env`. `doctor` only makes read requests. It checks Telegram authentication, TMDB authentication, Radarr API, profiles and the configured root folder. It does not queue any content.

After passing diagnostics:

```bash
docker compose --env-file .env -f infra/compose.yml -f infra/compose.local.yml --profile bot up -d bot
docker compose --env-file .env -f infra/compose.yml logs --tail=50 bot
```

Do not commit `.env`, tokens, API keys, or the bot state. Docker restart policies keep these services running on your host; they are not background AI agents.

## 5. Live acceptance checklist

- Send a title from an allowlisted Telegram user; try an unauthorized account too.
- Select the correct film, quality profile, and subtitle preference.
- Confirm once. Check Radarr's movie and search command.
- Request an already monitored movie: the bot must not start another search.
- Use a small authorized test item. Verify the qBittorrent path, Radarr import and Jellyfin library scan.
- Play in a browser, then the intended phone/TV. Check available audio tracks, SRT subtitle selection, subtitles off, and Direct Play/transcoding.
- Restart the bot and verify its state file is retained.

Record the service versions, device, container errors and outcome. A Radarr file is not proof of Jellyfin playback or verified subtitles.

## Remaining development

Verified release selection, original-audio/per-user preferences, Bazarr preference application, persistent Telegram update deduplication, retry-safe acquisition, ready notifications, and WhatsApp are unfinished. Existing tracked movies are left alone rather than automatically searched again. Simultaneous requests from different users are not yet transactionally deduplicated. Sonarr was mentioned in the previous research notes but is outside the documented movie MVP.

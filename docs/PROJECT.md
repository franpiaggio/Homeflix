# Homeflix architecture

Homeflix is a private, self-hosted movie request and streaming system for a household.

## User flow

Request a movie by message → find a matching release → download and prepare it → play it later from a supported device.

## Layers

1. **Messaging:** WhatsApp and Telegram adapters, authorized users, requests, confirmations, and notifications.
2. **Discovery:** TMDB for identification; Radarr and Prowlarr for configured, authorized sources and release selection.
3. **Acquisition:** qBittorrent for downloads, Bazarr for Spanish subtitles, library import, and readiness checks.
4. **Playback:** Jellyfin for Android, iOS, Android TV, compatible projectors, and browsers.

Each layer has a replaceable interface.

## Product rules

- Prefer English audio.
- Prefer 1080p, accept 720p, request confirmation below 720p.
- Report missing titles, low quality, unavailable English audio, and missing subtitles.
- Track requests through discovery, download, preparation, and readiness.
- Verify file availability and subtitle status before sending a ready notification.
- Handle duplicate requests, retries, and failures.
- No manual file transfers between services.

## Infrastructure

- Existing VPS and Coolify.
- Isolated Docker Compose stack with dedicated volumes, network, and resource limits.
- Private access through Tailscale.
- Direct Play first; transcoding depends on server capacity.
- Local storage initially; optional external storage based on capacity and cost.
- No paid API dependencies or software subscriptions.

## Constraints

Baileys is an unofficial WhatsApp integration; keep Telegram as a replaceable fallback. Playback formats vary by device. Subtitle availability depends on source material. Use authorized content sources.

## Acceptance criteria

An authorized household user requests a movie and later finds it in Jellyfin with the requested audio and subtitle options, or receives an accurate explanation of why it is unavailable. No manual file movement or exposed admin services.

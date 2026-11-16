# Homeflix
Personal, closed media workflow for two users. Request a movie through a messaging bot; identify via TMDB; check authorized source availability; apply English-audio and 1080p-preferred/720p-minimum rules; download via qBittorrent managed by Radarr; find Spanish subtitles with Bazarr; play via Jellyfin on Android/projector. Notify unavailable/low quality/missing subtitles. Infrastructure: existing VPS with Coolify, isolated Docker Compose. Optional external storage only if needed. No paid APIs or subscriptions. Direct Play prioritized. Access to Jellyfin and administration over private network (Tailscale); verify projector compatibility. Source licensing and subtitle availability cannot be assumed.

## Boundaries
Bot never directly searches arbitrary torrent websites; Radarr/Prowlarr configured by operator for authorized sources. No AI dependency. Minimal interfaces only. WhatsApp Baileys is unofficial and may break or trigger account restrictions; adapter replaceable with Telegram. A dedicated WhatsApp number is recommended. Avoid exposing bot/admin endpoints.

## Product experience and portability
Homeflix must be device-agnostic: Android phones, iOS phones/tablets, Android TV, compatible projectors and web browsers are first-class playback targets. Do not hardcode projector-specific assumptions. Jellyfin is the initial playback backend, with client fallback (native app, browser, compatible external player) if a device or codec blocks playback. Streaming compatibility and remote access must be tested per device.

## Four independent layers
1. Request: replaceable WhatsApp/Telegram adapters, authentication and notifications.
2. Discovery: metadata identification, authorized indexer search, source scoring and user confirmation when necessary.
3. Acquisition: download orchestration, subtitle acquisition, library import, readiness verification and job-state tracking.
4. Playback: Jellyfin library and device-agnostic access, optimized for Direct Play with transcoding fallback when hardware permits.

## Acceptance criteria
A household member requests a title, receives an accurate availability/quality decision, and can later open a supported device to find the correctly identified playable movie with English audio and Spanish subtitles, or a clear notification explaining why it is not ready. No manual file moving. No false ready notifications. Handle failures/retries/idempotency and limited VPS resources. Use authorized sources only.

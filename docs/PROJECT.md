# Homeflix architecture

Homeflix is a private, self-hosted movie request and streaming system.

## User flow

Request a title → disambiguate the movie → show verified available releases → select quality and language preferences → download and prepare → watch in Jellyfin.

## Layers

1. **Messaging:** WhatsApp and Telegram adapters, authorized users, short conversations, confirmation, and notifications.
2. **Discovery:** TMDB for movie identification; Radarr and Prowlarr for configured authorized sources and available release options.
3. **Acquisition:** qBittorrent for downloads, Bazarr for subtitles, library import, and readiness checks.
4. **Playback:** Jellyfin for Android, iOS, Android TV, compatible projectors, and browsers.

Each layer is replaceable.

## Conversation design

- Start with a movie title. Ask which movie only if the title is ambiguous.
- Show the actual available release choices, grouped by resolution (for example 4K, 1080p, 720p); do not fabricate options.
- Use saved user preferences as defaults, with per-request overrides.
- Ask for audio and subtitle preferences only when a choice or uncertainty needs confirmation. Keep prompts short.
- Use original audio as a configurable preference, based on verified movie/release language metadata, not an assumption that every film is English.
- Distinguish subtitles included in a release from subtitles available through an external provider and subtitles not yet verified.
- Confirm the selection before starting acquisition when needed.
- Report download and preparation status. Do not say ready until the library file and requested subtitle handling are verified.

## Preferences

Preferences belong to each user, not to the public product specification. Support preferred resolution, acceptable fallback resolutions, audio language or original audio, subtitle language, and subtitles off. Household defaults may be overridden per movie.

## Playback

Preserve compatible subtitle files or tracks in the Jellyfin library. Users can select or disable available subtitles and audio tracks in the player. Device capabilities vary; validate Android, iOS, web, and TV clients.

## Infrastructure

- Existing VPS with Coolify and isolated Docker Compose resources.
- Private access through Tailscale.
- Direct Play preferred, with transcoding only when server resources allow.
- Local storage initially; optional external storage based on capacity.
- No paid software subscriptions.
- Authorized content sources only.

## Acceptance criteria

An authorized user requests a movie, chooses from real available options, receives accurate status, and later plays the imported file in Jellyfin with selectable available subtitles. Failures and unavailable choices are explained; no manual file transfers.

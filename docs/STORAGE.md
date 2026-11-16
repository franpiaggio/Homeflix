# Storage

Use `CONFIG_ROOT` for application settings and `DATA_ROOT` for media data. Defaults are `/srv/homeflix/config` and `/srv/homeflix/data` on the Docker host.

```text
DATA_ROOT/
  downloads/incomplete/
  downloads/complete/
  library/movies/
```

Radarr and qBittorrent mount the same host root at `/data`. Radarr imports into `/data/library/movies`. Bazarr mounts its library at `/data/library`; Jellyfin reads the same library at `/media`. Downloads and library must actually be on the same filesystem for hardlinks; nested mounts can still prevent them. Verify permissions, free space and hardlink behavior on the host.

## Migrating the original prototype

`DOWNLOADS_ROOT` and `LIBRARY_ROOT` are no longer used by Compose. Stop Homeflix services, back up configuration, and explicitly relocate existing data under the shared root before starting this layout. Update saved qBittorrent paths, Radarr root folders and Jellyfin libraries as necessary. Do not simply change `.env` on an existing deployment: that can expose an empty library. No existing host data is moved automatically.

## External storage

For the first test use local storage. External filesystems must be mounted on the Docker host before containers start, and a missing mount must prevent startup. The current Compose file does not implement mount detection or a failure policy. Configure and test host-level mount dependencies before deploying on remote storage.

Object storage is not a direct POSIX filesystem. Gateway compatibility and cost require separate investigation. Keep application configurations on reliable local storage. Separate download/library filesystems require copying rather than hardlinks and may temporarily double disk usage.

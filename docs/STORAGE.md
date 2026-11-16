# Storage

Homeflix uses three independent host paths, configured in `.env`:

| Variable | Purpose |
| --- | --- |
| `CONFIG_ROOT` | Application settings and databases. Keep on reliable local storage. |
| `DOWNLOADS_ROOT` | Incomplete and completed downloads. Prefer a local disk. |
| `LIBRARY_ROOT` | Movies and subtitles served by Jellyfin. Can be local or a mounted external filesystem. |

Default paths are under `/srv/homeflix`.

## Local storage

Use the default paths or point them to another mounted local disk.

## External storage

Mount the remote filesystem **on the VPS host first** using the provider's supported method. Set `LIBRARY_ROOT` to that mounted directory. Containers use the same internal paths regardless of provider.

Example:

```env
CONFIG_ROOT=/srv/homeflix/config
DOWNLOADS_ROOT=/srv/homeflix/downloads
LIBRARY_ROOT=/mnt/media-library
```

The mount must be available before containers start. Configure persistent mounts, permissions, backups, monitoring and a failure policy. A missing mount must not silently become an empty local directory: validate it before deployment.

Keep downloads local unless the remote filesystem supports the random writes, locking and throughput required by qBittorrent. Importing across separate filesystems may copy rather than hardlink, increasing I/O and temporary disk use.

Object storage (for example S3-compatible buckets) is **not** a direct POSIX filesystem. A separate gateway/mount layer may have compatibility and cost limitations. Do not assume Cloudflare R2 works as a drop-in library disk.

## Validation

- Verify read/write permissions for download and library services.
- Verify Jellyfin can read imported files and subtitle sidecars.
- Check free disk space, network transfer, and provider limits.
- Test restart with remote storage temporarily unavailable.
- Confirm no other Coolify app uses these paths.

Storage paths are configurable now; external providers and failure handling are not yet end-to-end tested.

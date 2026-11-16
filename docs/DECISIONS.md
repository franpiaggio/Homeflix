# Decisiones técnicas

- **Infraestructura:** Docker Compose en el VPS existente con Coolify; límites de CPU, RAM y almacenamiento.
- **Mensajes:** WhatsApp con Baileys como opción experimental. Telegram como alternativa. Adaptadores independientes.
- **Búsqueda:** TMDB, Radarr y Prowlarr; solo fuentes autorizadas.
- **Descarga:** qBittorrent. Radarr administra la biblioteca.
- **Subtítulos:** Bazarr; comprobar disponibilidad real antes de notificar.
- **Reproducción:** Jellyfin. Android, iOS, TV y navegador. No depender de un proyector concreto.
- **Calidad:** inglés, preferir 1080p, aceptar 720p y consultar por calidades inferiores.
- **Acceso:** Tailscale; no exponer paneles de administración.
- **Almacenamiento:** empezar con el disco existente; ampliar solo si hace falta.
- **Costo:** ningún servicio pago adicional salvo almacenamiento opcional.
- **Diseño:** interfaces genéricas y mínimas hasta una iteración posterior.
- **Verificación:** no confundir configuraciones preparadas con integraciones probadas.

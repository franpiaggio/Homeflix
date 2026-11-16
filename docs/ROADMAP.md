# Estado y próximos pasos

## Hecho

- Estructura inicial del repositorio y documentación.
- Docker Compose preliminar para Jellyfin, Radarr, Prowlarr, qBittorrent y Bazarr.
- Bot de Telegram básico con lista de usuarios permitidos.
- Reglas de calidad y pruebas unitarias.

## Pendiente

1. Validar Docker Compose y recursos del VPS en Coolify.
2. Configurar fuentes autorizadas y conectar Radarr, Prowlarr y qBittorrent.
3. Integrar Bazarr y comprobar subtítulos en español.
4. Conectar el bot con las búsquedas, confirmaciones y estados de descarga.
5. Incorporar WhatsApp mediante Baileys y mantener Telegram como alternativa.
6. Configurar Tailscale y probar Jellyfin desde Android, iOS y navegador.
7. Probar reproducción directa, formatos incompatibles y alternativas.
8. Verificar límites de disco, errores, reintentos y pedidos duplicados.

## Pruebas necesarias para terminar

- Solo los usuarios autorizados pueden pedir películas.
- Búsqueda y calidad se informan correctamente.
- El sistema no marca una película como lista antes de comprobar el archivo y los subtítulos.
- La película aparece en Jellyfin sin mover archivos a mano.
- Se reproduce en dispositivos compatibles.
- Los demás servicios del VPS siguen aislados.
- No hay credenciales en el repositorio ni paneles administrativos expuestos.

**Estado actual:** prototipo. No hay prueba completa de extremo a extremo.

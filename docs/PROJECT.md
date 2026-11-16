# Proyecto

Homeflix permite pedir películas por mensaje y reproducirlas después desde dispositivos personales.

## Flujo

1. **Mensajes:** WhatsApp o Telegram recibe el título y responde con el estado.
2. **Búsqueda:** TMDB identifica la película; Radarr y Prowlarr consultan fuentes configuradas y autorizadas.
3. **Descarga:** qBittorrent descarga; Bazarr busca subtítulos en español; el sistema comprueba el archivo antes de marcarlo como listo.
4. **Reproducción:** Jellyfin presenta la biblioteca en Android, iOS, Android TV, proyectores compatibles o navegador.

Las capas deben poder reemplazarse sin rehacer las demás.

## Reglas

- Preferir audio original en inglés.
- Priorizar 1080p; aceptar 720p; consultar antes de descargar calidad inferior.
- Avisar cuando no se encuentre el título o no se pueda verificar idioma, calidad o subtítulos.
- No prometer subtítulos que todavía no se encontraron.
- Evitar pedidos duplicados y permitir reintentos.
- Estados: solicitado, buscando, pendiente de confirmación, descargando, preparando, listo y error.
- El usuario no debe mover archivos manualmente.

## Infraestructura

- VPS existente con Coolify.
- Un stack Docker Compose con red, volúmenes y límites de recursos propios.
- Jellyfin con reproducción directa cuando el dispositivo soporte el formato.
- Tailscale para acceso privado. Sin paneles administrativos públicos.
- Almacenamiento local al principio; evaluar uno externo según espacio y costo.
- Sin APIs ni suscripciones pagas.

## Restricciones

WhatsApp mediante Baileys no es oficial: puede desconectarse o sufrir restricciones. Telegram será la alternativa. La compatibilidad de cada dispositivo, los recursos del VPS y los subtítulos deben verificarse con pruebas reales. Solo usar fuentes de descarga autorizadas.

## Criterio de terminado

Un usuario autorizado pide una película, recibe información correcta sobre su disponibilidad, y más tarde puede abrir Jellyfin y reproducirla con audio inglés y subtítulos españoles. Si algo falla, el bot informa el motivo. Sin pasos manuales entre servicios.

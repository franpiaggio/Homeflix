# Homeflix

Servidor personal para pedir películas por mensaje y verlas después desde Android, iOS o un navegador.

**Estado:** prototipo. El circuito de descarga y reproducción todavía no está integrado.

## Cómo debería funcionar

```text
WhatsApp o Telegram
        ↓
Buscar película y comprobar calidad
        ↓
Descargar y conseguir subtítulos
        ↓
Agregar a Jellyfin
        ↓
Ver desde Android, iOS, TV o navegador
```

El objetivo es pedir una película fuera de casa y encontrarla lista para reproducir al volver, sin mover archivos manualmente.

## Reglas

- Audio en inglés y subtítulos en español.
- Preferir 1080p. Aceptar 720p. Consultar antes de descargar calidad inferior.
- Avisar si no se encuentra, si falta el idioma o si no hay subtítulos.
- Confirmar que está lista solo cuando el archivo esté importado y verificado.
- Acceso restringido a dos usuarios. Fuentes de descarga autorizadas.

## Tecnologías

| Función | Herramienta |
| --- | --- |
| Mensajes | WhatsApp (Baileys, no oficial) o Telegram |
| Bot | Node.js; TypeScript previsto |
| Catálogo y búsqueda | TMDB, Radarr, Prowlarr |
| Descarga | qBittorrent |
| Subtítulos | Bazarr |
| Reproducción | Jellyfin |
| Acceso privado | Tailscale |
| Despliegue | Docker Compose en Coolify |

Todo corre en el VPS existente. No se prevén servicios pagos, salvo almacenamiento adicional si hace falta.

## Qué funciona hoy

- Configuración inicial de Docker Compose para cinco servicios multimedia. **No probada en Coolify.**
- Prototipo de bot de Telegram: recibe un título de usuarios permitidos y responde. **No busca ni descarga.**
- Reglas de calidad y pruebas unitarias.

**Pendiente:** integrar búsqueda, descargas, subtítulos, avisos, WhatsApp y reproducción real en distintos dispositivos.

## Probar el prototipo

Requiere Node.js 20 o superior.

```bash
cd apps/bot
npm test
TELEGRAM_BOT_TOKEN='TOKEN' ALLOWED_TELEGRAM_IDS='ID' npm start
```

El token se obtiene con BotFather. El ID es el identificador numérico de tu cuenta de Telegram. El bot solo confirma la recepción de pedidos.

Para validar la configuración Docker:

```bash
cp .env.example .env
# Editar MEDIA_ROOT, PUID, PGID y TZ
docker compose --env-file .env -f infra/compose.yml config
```

El Compose no publica puertos de administración. Hace falta configurar acceso privado antes de usar los paneles.

## Documentación

- [Arquitectura y requisitos](docs/PROJECT.md)
- [Decisiones técnicas](docs/DECISIONS.md)
- [Estado y tareas pendientes](docs/ROADMAP.md)
- [Instrucciones para agentes](AGENTS.md)

Las interfaces deben mantenerse simples. La prioridad es que el circuito completo funcione.

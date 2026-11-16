export function classifyRelease(release) {
  const resolution = Number(release.resolution);
  if (!Number.isFinite(resolution) || resolution <= 0) return {status:'unknown',message:'Calidad sin verificar: requiere revisión'};
  if (release.audioLanguage !== 'en') return {status:'reject',message:'No se confirmó audio en inglés'};
  if (resolution < 720) return {status:'confirm',message:`Solo disponible en ${resolution}p. ¿Descargar igual?`};
  return {status:'eligible',priority:resolution >= 1080 ? 2 : 1,message:`Disponible en ${resolution}p, audio inglés. Subtítulos en español pendientes de verificar.`};
}
export function isAllowed(userId, allowedIds) {return allowedIds.includes(String(userId));}
export function parseRequest(message) {
  const value=String(message ?? '').trim();
  if (!value) return {kind:'help'};
  if (value === '/start' || value === '/help') return {kind:'help'};
  if (value.length > 180) return {kind:'invalid'};
  return {kind:'movie',query:value};
}

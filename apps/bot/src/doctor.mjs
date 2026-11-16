import {readConfig} from './config.mjs';
import {Radarr, requestJson} from './services.mjs';

const config = readConfig();
let failed = false;
function report(ok, message) {
  console.log(`${ok ? 'PASS' : 'FAIL'} ${message}`);
  if (!ok) failed = true;
}
for (const name of [...config.missing, ...(!config.allowed.length ? ['ALLOWED_TELEGRAM_IDS'] : [])]) report(false, `Missing ${name}`);
async function check(name, operation) {
  try { await operation(); report(true, name); }
  catch (error) {
    // Never print request URLs, tokens, provider response bodies, or stack traces.
    report(false, `${name}: ${error.status ? `HTTP ${error.status}` : 'connection or configuration failed'}`);
  }
}
if (config.telegramToken) await check('Telegram token (getMe; no messages sent)', async () => {
  const result = await requestJson(`https://api.telegram.org/bot${config.telegramToken}/getMe`);
  if (!result.ok) throw new Error('Invalid token');
});
if (config.tmdbKey) await check('TMDB authentication', () => new MovieCheck(config.tmdbKey).run());
if (config.radarrKey) {
  const radarr = new Radarr(config.radarrUrl, config.radarrKey);
  await check('Radarr API', () => radarr.api('/system/status'));
  await check('Radarr quality profiles', async () => { if (!(await radarr.profiles()).length) throw new Error('No profiles'); });
  await check('Radarr configured root folder', async () => {
    if (!(await radarr.rootFolders()).some(folder => folder.path === config.rootFolder)) throw new Error('Missing folder');
  });
}
console.log('This check does not verify downloads, indexers, Bazarr, Jellyfin playback, or disk capacity.');
process.exitCode = failed ? 1 : 0;

function MovieCheck(key) {
  this.run = () => {
    const url = new URL('https://api.themoviedb.org/3/configuration');
    const headers = {};
    if (/^[a-f\d]{32}$/i.test(key)) url.searchParams.set('api_key', key);
    else headers.Authorization = 'Bearer ' + key;
    return requestJson(url, {headers});
  };
}

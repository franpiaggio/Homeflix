export function readConfig(env = process.env) {
 const allowed=(env.ALLOWED_TELEGRAM_IDS||'').split(',').map(x=>x.trim()).filter(Boolean);
 const required=['TELEGRAM_BOT_TOKEN','RADARR_API_KEY','TMDB_API_KEY'];
 const missing=required.filter(k=>!env[k]);
 return {missing,allowed,telegramToken:env.TELEGRAM_BOT_TOKEN,radarrUrl:(env.RADARR_URL||'http://radarr:7878').replace(/\/$/,''),radarrKey:env.RADARR_API_KEY,tmdbKey:env.TMDB_API_KEY,rootFolder:env.RADARR_ROOT_FOLDER||'/data/library/movies',qualityProfileId:Number(env.RADARR_QUALITY_PROFILE_ID||0),language:env.DEFAULT_SUBTITLE_LANGUAGE||'es',statePath:env.STATE_FILE||'./state.json'};
}

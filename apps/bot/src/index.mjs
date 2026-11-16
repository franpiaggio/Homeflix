import {readConfig} from './config.mjs';
import {MovieCatalog,Radarr,requestJson} from './services.mjs';
import {Store} from './store.mjs';
import {Conversation} from './conversation.mjs';
const config=readConfig();
if(config.missing.length||!config.allowed.length){console.error('Missing: '+[...config.missing,...(!config.allowed.length?['ALLOWED_TELEGRAM_IDS']:[])].join(', '));process.exit(1)}
const store=await new Store(config.statePath).load();
const bot=new Conversation({catalog:new MovieCatalog(config.tmdbKey),radarr:new Radarr(config.radarrUrl,config.radarrKey),store,config});
const base='https://api.telegram.org/bot'+config.telegramToken;
async function telegram(method,data){const r=await requestJson(base+'/'+method,{method:'POST',body:data,timeout:35000,headers:{'Content-Type':'application/json'}});if(!r.ok)throw new Error(r.description||'Telegram API error');return r.result}
let offset=0;console.log('Homeflix Telegram adapter started');
while(true){try{const updates=await telegram('getUpdates',{offset,timeout:25,allowed_updates:['message']});for(const update of updates){offset=update.update_id+1;const msg=update.message;if(!msg?.text||!config.allowed.includes(String(msg.from?.id)))continue;
 let reply;try{reply=await bot.handle(String(msg.from.id),msg.text)}catch(e){console.error('Request failed',e);reply='Could not complete the request. Please try again later.'}
 await telegram('sendMessage',{chat_id:msg.chat.id,text:reply});}}
 catch(e){console.error('Polling error',e);await new Promise(r=>setTimeout(r,3000))}}

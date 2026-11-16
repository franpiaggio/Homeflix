import {isAllowed,parseRequest} from './core.mjs';
const token=process.env.TELEGRAM_BOT_TOKEN;
const allowed=(process.env.ALLOWED_TELEGRAM_IDS||'').split(',').map(x=>x.trim()).filter(Boolean);
if (!token || !allowed.length) {console.error('Set TELEGRAM_BOT_TOKEN and ALLOWED_TELEGRAM_IDS');process.exit(1);}
const endpoint=`https://api.telegram.org/bot${token}`;
async function api(method,data){const response=await fetch(`${endpoint}/${method}`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(data)});if(!response.ok)throw new Error(`Telegram HTTP ${response.status}`);const json=await response.json();if(!json.ok)throw new Error('Telegram API error');return json.result;}
let offset=0;
console.log('Homeflix bot started (prototype: search not connected)');
while(true){try{const updates=await api('getUpdates',{offset,timeout:25,allowed_updates:['message']});for(const update of updates){offset=update.update_id+1;const msg=update.message;if(!msg?.text||!isAllowed(msg.from?.id,allowed))continue;const req=parseRequest(msg.text);const reply=req.kind==='movie'?`🎬 ${req.query}\nSolicitud recibida. La búsqueda todavía no está conectada; no se inició ninguna descarga.`:req.kind==='help'?'Enviame el nombre de una película.':'Nombre demasiado largo.';await api('sendMessage',{chat_id:msg.chat.id,text:reply});}}catch(err){console.error(err.message);await new Promise(resolve=>setTimeout(resolve,3000));}}

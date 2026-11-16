import {releaseOptions} from './services.mjs';
const menu=(items)=>items.map((x,i)=>`${i+1}. ${x}`).join('\n');
export class Conversation {
 constructor({catalog,radarr,store,config}){Object.assign(this,{catalog,radarr,store,config})}
 async handle(user,text){
 const input=String(text||'').trim();const current=this.store.get(user);
 if(input==='/cancel'){await this.store.clear(user);return 'Request cancelled.'}
 if(input==='/start'||input==='/help'||(!input&&!current))return 'Send a movie title. Use /cancel to stop.';
 if(!current||current.step==='done'){
 const matches=await this.catalog.search(input);if(!matches.length)return 'No matching movie found. Try another title.';
 await this.store.set(user,{step:'movie',matches});
 return 'Which movie?\n'+menu(matches.map(x=>x.title+' ('+(x.year||'?')+')'))+'\nReply with a number.';
 }
 if(current.step==='movie'){
 const n=Number(input)-1;const movie=current.matches[n];if(!Number.isInteger(n)||!movie)return 'Choose a listed movie number.';
 const profiles=await this.radarr.profiles();if(!profiles.length)return 'No Radarr quality profiles configured.';
 const folders=await this.radarr.rootFolders();if(!folders.length)return 'No Radarr root folder configured.';
 await this.store.set(user,{step:'quality',movie,profiles:profiles.map(p=>({id:p.id,name:p.name})),rootFolder:this.config.rootFolder||folders[0].path});
 return `${movie.title}: choose a quality profile.\n`+menu(profiles.map(p=>p.name))+'\nReply with a number.';
 }
 if(current.step==='quality'){
 const n=Number(input)-1;const profile=current.profiles[n];if(!Number.isInteger(n)||!profile)return 'Choose a listed quality profile number.';
 await this.store.set(user,{...current,step:'subtitles',profile});
 return 'Subtitle preference?\n1. Spanish\n2. English\n3. None\nReply with a number.';
 }
 if(current.step==='subtitles'){
 const choices=['es','en','none'];const selected=choices[Number(input)-1];if(!selected)return 'Reply 1, 2, or 3.';
 await this.store.set(user,{...current,step:'confirm',subtitle:selected});
 return `Confirm: ${current.movie.title} (${current.movie.year||'?'}) · ${current.profile.name} · subtitles: ${selected}.\nReply YES to queue or NO to cancel.\nSubtitle availability and audio tracks have not been verified.`;
 }
 if(current.step==='confirm'){
 if(input.toLowerCase()==='no'){await this.store.clear(user);return 'Cancelled.'}
 if(input.toLowerCase()!=='yes')return 'Reply YES or NO.';
 const {movie,profile,rootFolder,subtitle}=current;
 const result=await this.radarr.add(movie.id,{qualityProfileId:profile.id,rootFolder});
 await this.radarr.searchMovie(result.movie.id);
 await this.store.set(user,{step:'done',movie,subtitle,radarrId:result.movie.id});
 return `Queued: ${movie.title}. Download depends on configured authorized indexers and sources. Subtitle selection is saved as a request preference, not yet applied to Bazarr.`;
 }
 return 'Send a movie title.';
 }
}

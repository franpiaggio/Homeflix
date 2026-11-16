export class ApiError extends Error {constructor(service,status,message){super(service+': '+status+' '+message);this.service=service;this.status=status}}
export async function requestJson(url,{method='GET',headers={},body,timeout=15000}={}){
 const ctrl=new AbortController();const timer=setTimeout(()=>ctrl.abort(),timeout);
 try{const r=await fetch(url,{method,headers:{accept:'application/json',...headers},body:body===undefined?undefined:JSON.stringify(body),signal:ctrl.signal});
 if(!r.ok)throw new ApiError(new URL(url).hostname,r.status,(await r.text()).slice(0,250));
 return await r.json();}finally{clearTimeout(timer)}
}
export class MovieCatalog {
 constructor(key){this.key=key}
 async search(query){const url=new URL('https://api.themoviedb.org/3/search/movie');
 url.searchParams.set('query',query);url.searchParams.set('include_adult','false');
 const headers={};
 if(/^[a-f\d]{32}$/i.test(this.key))url.searchParams.set('api_key',this.key);
 else headers.Authorization='Bearer '+this.key;
 const data=await requestJson(url,{headers});
 return (data.results||[]).slice(0,6).map(x=>({id:x.id,title:x.title,year:(x.release_date||'').slice(0,4),originalLanguage:x.original_language,overview:x.overview||''}));}
}
export class Radarr {
 constructor(url,key){this.url=url;this.key=key}
 async api(path,method='GET',body){return requestJson(this.url+'/api/v3'+path,{method,headers:{'X-Api-Key':this.key,'Content-Type':'application/json'},body})}
 async profiles(){return this.api('/qualityprofile')}
 async rootFolders(){return this.api('/rootfolder')}
 async lookup(tmdbId){const items=await this.api('/movie/lookup/tmdb?tmdbId='+encodeURIComponent(tmdbId));return Array.isArray(items)?items[0]:items}
 async movies(){return this.api('/movie')}
 async add(tmdbId,{rootFolder,qualityProfileId}){
 const existing=(await this.movies()).find(x=>x.tmdbId===Number(tmdbId));
 if(existing)return {movie:existing,existing:true};
 const item=await this.lookup(tmdbId);if(!item)throw new Error('Movie not found in Radarr');
 const movie=await this.api('/movie','POST',{...item,rootFolderPath:rootFolder,qualityProfileId,monitored:true,addOptions:{searchForMovie:false}});
 return {movie,existing:false};
 }
 async searchMovie(movieId){return this.api('/command','POST',{name:'MoviesSearch',movieIds:[movieId]})}
 async releases(movieId){return this.api('/release?movieId='+encodeURIComponent(movieId))}
 async status(tmdbId){const movie=(await this.movies()).find(x=>x.tmdbId===Number(tmdbId));if(!movie)return {state:'missing'};
 return {state:movie.hasFile?'ready':'pending',movieId:movie.id,title:movie.title,path:movie.movieFile?.path||null};}
}
export function releaseOptions(releases){
 const found=new Map();
 for(const r of releases||[]){
 if(r.rejected||r.isRejected||r.downloadAllowed===false)continue;
 const resolution=Number(r.quality?.quality?.resolution||0);
 const label=r.quality?.quality?.name||'Unknown';
 const key=resolution||label;
 const current=found.get(key);
 if(!current||Number(r.seeders||0)>Number(current.seeders||0))found.set(key,{resolution,label,seeders:r.seeders||0,indexer:r.indexer||null});
 }
 return [...found.values()].sort((a,b)=>b.resolution-a.resolution);
}

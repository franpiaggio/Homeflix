import test from 'node:test';import assert from 'node:assert/strict';import {Conversation} from '../src/conversation.mjs';import {releaseOptions} from '../src/services.mjs';
function fixture(){let request=null;const store={get:()=>request,set:async(_,v)=>{request=v},clear:async()=>{request=null}};
 let calls=0;const catalog={search:async()=>[{id:42,title:'Test Film',year:'2024',originalLanguage:'es'}]};
 const radarr={profiles:async()=>[{id:1,name:'1080p'}],rootFolders:async()=>[{path:'/data/library/movies'}],add:async()=>({movie:{id:9}}),searchMovie:async()=>{calls++}};
 return {bot:new Conversation({catalog,radarr,store,config:{}}),calls:()=>calls}}
test('request requires confirmation',async()=>{const f=fixture();assert.match(await f.bot.handle('1','Test Film'),/Which movie/);assert.match(await f.bot.handle('1','1'),/quality profile/);assert.match(await f.bot.handle('1','1'),/Subtitle preference/);assert.match(await f.bot.handle('1','1'),/Confirm/);assert.equal(f.calls(),0);assert.match(await f.bot.handle('1','YES'),/Queued/);assert.equal(f.calls(),1)});
test('invalid choice does not advance',async()=>{const f=fixture();await f.bot.handle('1','Test Film');assert.match(await f.bot.handle('1','9'),/Choose a listed/);assert.match(await f.bot.handle('1','1'),/quality profile/)});
test('cancel clears request',async()=>{const f=fixture();await f.bot.handle('1','Test Film');assert.equal(await f.bot.handle('1','/cancel'),'Request cancelled.')});
test('release options deduplicated',()=>{const r=releaseOptions([{quality:{quality:{resolution:1080,name:'1080p'}},seeders:2},{quality:{quality:{resolution:1080,name:'1080p'}},seeders:5},{quality:{quality:{resolution:720,name:'720p'}},seeders:4}]);assert.deepEqual(r.map(x=>x.resolution),[1080,720]);assert.equal(r[0].seeders,5)});

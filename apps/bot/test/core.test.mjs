import test from 'node:test';
import assert from 'node:assert/strict';
import {classifyRelease,isAllowed,parseRequest} from '../src/core.mjs';
test('1080p English is eligible without promising subtitles',()=>assert.match(classifyRelease({resolution:1080,audioLanguage:'en'}).message,/pendientes/));
test('below 720p requires confirmation',()=>assert.equal(classifyRelease({resolution:480,audioLanguage:'en'}).status,'confirm'));
test('non English audio rejected',()=>assert.equal(classifyRelease({resolution:1080,audioLanguage:'es'}).status,'reject'));
test('unknown quality not silently accepted',()=>assert.equal(classifyRelease({audioLanguage:'en'}).status,'unknown'));
test('allowlist',()=>{assert.equal(isAllowed(123,['123']),true);assert.equal(isAllowed(124,['123']),false)});
test('request parser',()=>assert.deepEqual(parseRequest(' Interstellar '),{kind:'movie',query:'Interstellar'}));

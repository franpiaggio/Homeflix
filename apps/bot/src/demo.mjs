import {createInterface} from 'node:readline/promises';
import {Conversation} from './conversation.mjs';

// Deliberately synthetic fixtures; this adapter never contacts external services.
let request = null;
const store = {get: () => request, set: async (_, value) => { request = value; }, clear: async () => { request = null; }};
const bot = new Conversation({
  store, config: {},
  catalog: {search: async () => [{id: 1, title: '[DEMO] Example Movie', year: '2026', originalLanguage: 'es'}]},
  radarr: {
    profiles: async () => [{id: 1, name: '[DEMO] 1080p profile'}],
    rootFolders: async () => [{path: '/data/library/movies'}],
    add: async () => ({movie: {id: 1}}),
    searchMovie: async () => {},
  },
});
console.log('OFFLINE DEMO: fictional movie and profile. No downloads or API calls.');
console.log('Send any title, then 1, 1, 1, YES. /cancel resets; /exit quits.');
const terminal = createInterface({input: process.stdin, output: process.stdout, terminal: Boolean(process.stdin.isTTY)});
for await (const line of terminal) {
  if (line.trim() === '/exit') break;
  console.log(await bot.handle('demo', line));
}
terminal.close();

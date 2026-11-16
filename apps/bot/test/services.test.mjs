import test from 'node:test';
import assert from 'node:assert/strict';
import {Radarr, MovieCatalog} from '../src/services.mjs';

test('Radarr adapter authenticates and adds before issuing a search', async t => {
  const seen = [];
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    assert.equal(options.headers['X-Api-Key'], 'test-key');
    const path = new URL(url).pathname;
    seen.push({method: options.method, path, body: options.body ? JSON.parse(options.body) : null});
    let data = {id: 1};
    if (path === '/api/v3/movie' && options.method === 'GET') data = [];
    else if (path === '/api/v3/movie/lookup/tmdb') data = {tmdbId: 42, title: 'Fixture'};
    else if (path === '/api/v3/movie') data = {id: 9, tmdbId: 42};
    return new Response(JSON.stringify(data));
  });
  const radarr = new Radarr('http://radarr:7878', 'test-key');
  const added = await radarr.add(42, {qualityProfileId: 3, rootFolder: '/data/library/movies'});
  await radarr.searchMovie(added.movie.id);
  const posts = seen.filter(request => request.method === 'POST');
  assert.equal(posts[0].body.rootFolderPath, '/data/library/movies');
  assert.equal(posts[0].body.qualityProfileId, 3);
  assert.equal(posts[0].body.addOptions.searchForMovie, false);
  assert.deepEqual(posts[1].body, {name: 'MoviesSearch', movieIds: [9]});
});

test('TMDB accepts API v3 keys and bearer read tokens', async t => {
  for (const key of ['a'.repeat(32), 'example-read-access-token']) {
    const requests = [];
    t.mock.method(globalThis, 'fetch', async (url, options) => {
      requests.push({url: new URL(url), headers: options.headers});
      return new Response(JSON.stringify({results: [{id: 42, title: 'Fixture', original_language: 'fr'}]}));
    });
    const movies = await new MovieCatalog(key).search('A & B');
    assert.equal(movies[0].originalLanguage, 'fr');
    assert.equal(requests[0].url.searchParams.get('query'), 'A & B');
    if (key.length === 32) assert.equal(requests[0].url.searchParams.get('api_key'), key);
    else assert.equal(requests[0].headers.Authorization, 'Bearer ' + key);
    t.mock.restoreAll();
  }
});

import { apiClient, getErrorMessage, itunesClient } from './client';

export function mapItunesTrack(track) {
  const year = new Date(track.releaseDate).getFullYear();

  return {
    id: `itunes-${track.trackId}`,
    title: track.trackName,
    artist: track.artistName,
    album: track.collectionName,
    year: Number.isNaN(year) ? 0 : year,
    source: 'itunes',
  };
}

export function mapItunesResults(tracks) {
  return tracks.map(mapItunesTrack);
}

export async function fetchItunesSongs() {
  try {
    const { data } = await itunesClient.get('/search', {
      params: { term: 'beatles', entity: 'song', limit: 50 },
    });
    return mapItunesResults(data.results ?? []);
  } catch (error) {
    throw new Error(getErrorMessage(error, 'iTunes API request failed'));
  }
}

export async function fetchLocalSongs() {
  try {
    const { data } = await apiClient.get('/songs');
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'Local songs API request failed'));
  }
}

export async function fetchAllSongs() {
  const [itunesSongs, localSongs] = await Promise.all([
    fetchItunesSongs(),
    fetchLocalSongs(),
  ]);

  const seen = new Set();
  const merged = [];

  [...localSongs, ...itunesSongs].forEach((song) => {
    const key = `${song.title}|${song.artist}|${song.album}`.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      merged.push(song);
    }
  });

  return merged;
}

export async function createSong(input) {
  try {
    const { data } = await apiClient.post('/songs', input);
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'Failed to add song'));
  }
}

export async function deleteSong(id) {
  try {
    await apiClient.delete(`/songs/${id}`);
  } catch (error) {
    throw new Error(getErrorMessage(error, 'Failed to delete song'));
  }
}

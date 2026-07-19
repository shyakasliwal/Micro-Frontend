let localSongs = [];

export function getLocalSongs() {
  return [...localSongs];
}

export function addLocalSong(input) {
  const song = {
    id: `local-${crypto.randomUUID()}`,
    title: input.title.trim(),
    artist: input.artist.trim(),
    album: input.album.trim(),
    year: input.year,
    source: 'local',
  };

  localSongs = [song, ...localSongs];
  return song;
}

export function deleteLocalSong(id) {
  const initialLength = localSongs.length;
  localSongs = localSongs.filter((song) => song.id !== id);
  return localSongs.length < initialLength;
}

export function resetLocalSongs() {
  localSongs = [];
}

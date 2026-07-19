function compareValues(a, b) {
  if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  }
  return String(a).localeCompare(String(b), undefined, { sensitivity: 'base' });
}

export function filterSongs(songs, search) {
  const query = search.trim().toLowerCase();
  if (!query) {
    return songs;
  }

  return songs.filter((song) => {
    const haystack = `${song.title} ${song.artist} ${song.album}`.toLowerCase();
    return haystack.includes(query);
  });
}

export function sortSongs(songs, field, direction) {
  const sorted = [...songs].sort((left, right) => compareValues(left[field], right[field]));
  return direction === 'asc' ? sorted : sorted.reverse();
}

export function groupSongs(songs, groupBy) {
  if (groupBy === 'none') {
    return [{ key: 'All Songs', songs }];
  }

  const groups = songs.reduce((accumulator, song) => {
    const key = song[groupBy] || 'Unknown';
    if (!accumulator[key]) {
      accumulator[key] = [];
    }
    accumulator[key].push(song);
    return accumulator;
  }, {});

  return Object.entries(groups)
    .map(([key, groupedSongs]) => ({ key, songs: groupedSongs }))
    .sort((left, right) => left.key.localeCompare(right.key));
}

export function applySongFilters(songs, filters) {
  const filtered = filterSongs(songs, filters.search);
  const sorted = sortSongs(filtered, filters.sortField, filters.sortDirection);
  return groupSongs(sorted, filters.groupBy);
}

export function countSongsBySource(songs) {
  return songs.reduce((counts, song) => {
    counts[song.source] = (counts[song.source] ?? 0) + 1;
    return counts;
  }, {});
}

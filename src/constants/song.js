export const DEFAULT_FILTERS = {
  search: '',
  sortField: 'title',
  sortDirection: 'asc',
  groupBy: 'none',
};

export const SORT_OPTIONS = [
  { value: 'title', label: 'Title' },
  { value: 'artist', label: 'Artist' },
  { value: 'album', label: 'Album' },
  { value: 'year', label: 'Year' },
];

export const GROUP_OPTIONS = [
  { value: 'none', label: 'None' },
  { value: 'title', label: 'Title' },
  { value: 'artist', label: 'Artist' },
  { value: 'album', label: 'Album' },
];

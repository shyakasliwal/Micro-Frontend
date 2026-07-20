import { useQuery } from '@tanstack/react-query';
import { fetchAllSongs } from '../api/songs';

export const SONGS_QUERY_KEY = ['songs'];

export function useSongsQuery({ enabled = true } = {}) {
  return useQuery({
    queryKey: SONGS_QUERY_KEY,
    queryFn: fetchAllSongs,
    enabled,
    staleTime: 1000 * 60 * 5,
  });
}

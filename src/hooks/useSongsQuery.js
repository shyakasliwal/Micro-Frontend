import { useQuery } from '@tanstack/react-query';
import { fetchAllSongs } from '../api/songs';

export const SONGS_QUERY_KEY = ['songs'];

export function useSongsQuery() {
  return useQuery({
    queryKey: SONGS_QUERY_KEY,
    queryFn: fetchAllSongs,
    staleTime: 1000 * 60 * 5,
  });
}

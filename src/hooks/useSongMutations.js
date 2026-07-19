import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSong, deleteSong } from '../api/songs';
import { SONGS_QUERY_KEY } from './useSongsQuery';

export function useAddSongMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSong,
    onSuccess: (newSong) => {
      queryClient.setQueryData(SONGS_QUERY_KEY, (current = []) => [
        newSong,
        ...current.filter((song) => {
  if (!song) return false;

  return !(
    song.title?.toLowerCase() === newSong.title.toLowerCase() &&
    song.artist?.toLowerCase() === newSong.artist.toLowerCase() &&
    song.album?.toLowerCase() === newSong.album.toLowerCase()
  );
    })
      ]);
    },
  });
}

export function useDeleteSongMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSong,
    onSuccess: (_result, deletedId) => {
      queryClient.setQueryData(SONGS_QUERY_KEY, (current = []) =>
        current.filter((song) => song.id !== deletedId),
      );
    },
  });
}

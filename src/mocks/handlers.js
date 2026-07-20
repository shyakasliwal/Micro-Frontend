import { http, HttpResponse } from 'msw';
import { addLocalSong, deleteLocalSong, getLocalSongs } from './store';

export const handlers = [
  http.get('/songs', () => HttpResponse.json(getLocalSongs())),

  http.post('/songs', async ({ request }) => {
    const body = await request.json();

    if (!body.title?.trim() || !body.artist?.trim() || !body.album?.trim()) {
      return HttpResponse.json(
        { message: 'Title, artist, and album are required.' },
        { status: 400 },
      );
    }

    if (typeof body.year !== 'number' || Number.isNaN(body.year)) {
      return HttpResponse.json({ message: 'Year must be a valid number.' }, { status: 400 });
    }

    const song = addLocalSong(body);
    return HttpResponse.json(song, { status: 201 });
  }),

  http.delete('/songs/:id', ({ params }) => {
    const id = String(params.id);
    const deleted = deleteLocalSong(id);

    if (!deleted) {
      return HttpResponse.json({ message: 'Song not found.' }, { status: 404 });
    }

    return HttpResponse.json({ success: true });
  }),
];

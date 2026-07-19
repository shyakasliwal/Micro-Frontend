import { useDeleteSongMutation } from '../hooks/useSongMutations';

function SongRow({ song, role }) {
  const deleteSong = useDeleteSongMutation();
  const canDelete = role === 'admin' && song.source === 'local';

  return (
    <article className="flex flex-col gap-3 border-t border-slate-700/60 bg-slate-900/70 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="font-medium text-white">{song.title}</h3>
        <p className="text-sm text-slate-400">
          {song.artist} · {song.album} · {song.year}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <span
          className={`rounded-full px-2.5 py-1 text-xs uppercase tracking-wide ${
            song.source === 'itunes'
              ? 'bg-blue-500/15 text-blue-300'
              : 'bg-emerald-500/15 text-emerald-300'
          }`}
        >
          {song.source}
        </span>
        {canDelete && (
          <button
            type="button"
            className="rounded-lg bg-rose-700 px-3 py-1.5 text-sm text-white disabled:opacity-60"
            disabled={deleteSong.isPending}
            onClick={() => deleteSong.mutate(song.id)}
          >
            Delete
          </button>
        )}
      </div>
    </article>
  );
}

export function SongList({ groups, role }) {
  const totalSongs = groups.reduce((count, group) => count + group.songs.length, 0);

  if (totalSongs === 0) {
    return (
      <section className="rounded-2xl border border-slate-700/80 bg-slate-900/80 p-8 text-center text-slate-400">
        <p>No songs match the current filters.</p>
      </section>
    );
  }

  return (
    <section className="grid gap-4" aria-label="Song list">
      {groups.map((group) => (
        <div key={group.key} className="overflow-hidden rounded-2xl border border-slate-700/80">
          <header className="flex items-center justify-between bg-slate-800/90 px-4 py-3">
            <h2 className="font-semibold text-white">{group.key}</h2>
            <span className="text-sm text-slate-400">{group.songs.length} songs</span>
          </header>
          <div>
            {group.songs.map((song) => (
              <SongRow key={song.id} song={song} role={role} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

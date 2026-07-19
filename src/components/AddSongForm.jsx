import { useForm } from 'react-hook-form';
import { useAddSongMutation } from '../hooks/useSongMutations';

const inputClassName =
  'w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2.5 text-slate-100 outline-none focus:border-indigo-400';

export function AddSongForm({ onSuccess }) {
  const addSong = useAddSongMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      artist: '',
      album: '',
      year: new Date().getFullYear(),
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    await addSong.mutateAsync(values);
    reset();
    onSuccess?.();
  });

  return (
    <section
      className="mb-4 rounded-2xl border border-slate-700/80 bg-slate-900/80 p-5"
      aria-label="Add song form"
    >
      <header className="mb-4">
        <h2 className="text-lg font-semibold text-white">Add Song</h2>
        <p className="mt-1 text-sm text-slate-400">
        
        </p>
      </header>

      <form className="grid gap-4 sm:grid-cols-2" onSubmit={onSubmit}>
        <label className="grid gap-1.5 text-sm text-slate-300">
          <span>Title</span>
          <input type="text" className={inputClassName} {...register('title', { required: 'Title is required' })} />
          {errors.title && <small className="text-rose-300">{errors.title.message}</small>}
        </label>

        <label className="grid gap-1.5 text-sm text-slate-300">
          <span>Artist</span>
          <input type="text" className={inputClassName} {...register('artist', { required: 'Artist is required' })} />
          {errors.artist && <small className="text-rose-300">{errors.artist.message}</small>}
        </label>

        <label className="grid gap-1.5 text-sm text-slate-300">
          <span>Album</span>
          <input type="text" className={inputClassName} {...register('album', { required: 'Album is required' })} />
          {errors.album && <small className="text-rose-300">{errors.album.message}</small>}
        </label>

        <label className="grid gap-1.5 text-sm text-slate-300">
          <span>Year</span>
          <input
            type="number"
            className={inputClassName}
            {...register('year', {
              required: 'Year is required',
              valueAsNumber: true,
              min: { value: 1900, message: 'Year must be 1900 or later' },
              max: { value: 2100, message: 'Year must be 2100 or earlier' },
            })}
          />
          {errors.year && <small className="text-rose-300">{errors.year.message}</small>}
        </label>

        {addSong.error && (
          <p className="sm:col-span-2 rounded-lg bg-rose-950/50 px-3 py-2 text-sm text-rose-300">
            {addSong.error.message}
          </p>
        )}

        <button
          type="submit"
          className="sm:col-span-2 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2.5 font-medium text-white disabled:opacity-60"
          disabled={addSong.isPending}
        >
          {addSong.isPending ? 'Adding…' : 'Add Song'}
        </button>
      </form>
    </section>
  );
}

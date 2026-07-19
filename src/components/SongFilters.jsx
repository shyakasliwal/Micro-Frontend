import { useMemo, useState } from 'react';
import { GROUP_OPTIONS, SORT_OPTIONS } from '../constants/song';

const inputClassName =
  'w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2.5 text-slate-100 outline-none focus:border-indigo-400';

export function SongFilters({ filters, onChange }) {
  const [search, setSearch] = useState(filters.search);

  const update = (partial) => {
    onChange({ ...filters, ...partial });
  };

  const searchLabel = useMemo(
    () => (filters.search ? `Filtering by "${filters.search}"` : 'Search songs'),
    [filters.search],
  );

  return (
    <section
      className="mb-4 rounded-2xl border border-slate-700/80 bg-slate-900/80 p-5"
      aria-label="Song filters"
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <label className="grid gap-1.5 text-sm text-slate-300">
          <span>{searchLabel}</span>
          <input
            type="search"
            className={inputClassName}
            value={search}
            placeholder="Title, artist, or album"
            onChange={(event) => setSearch(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                update({ search });
              }
            }}
            onBlur={() => update({ search })}
          />
        </label>

        <label className="grid gap-1.5 text-sm text-slate-300">
          <span>Sort by</span>
          <select
            className={inputClassName}
            value={filters.sortField}
            onChange={(event) => update({ sortField: event.target.value })}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-1.5 text-sm text-slate-300">
          <span>Direction</span>
          <select
            className={inputClassName}
            value={filters.sortDirection}
            onChange={(event) => update({ sortDirection: event.target.value })}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>

        <label className="grid gap-1.5 text-sm text-slate-300">
          <span>Group by</span>
          <select
            className={inputClassName}
            value={filters.groupBy}
            onChange={(event) => update({ groupBy: event.target.value })}
          >
            {GROUP_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
}

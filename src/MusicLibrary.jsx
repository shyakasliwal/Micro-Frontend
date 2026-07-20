import { useEffect, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { startMockServer } from './mocks/browser';
import { AddSongForm } from './components/AddSongForm';
import { ErrorPanel, LoadingPanel } from './components/StatePanels';
import { SongFilters } from './components/SongFilters';
import { SongList } from './components/SongList';
import { DEFAULT_FILTERS } from './constants/song';
import { useSongsQuery } from './hooks/useSongsQuery';
import { applySongFilters, countSongsBySource } from './utils/songFilters';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

let mockServerReady = null;

function ensureMockServer() {
  if (!mockServerReady) {
    mockServerReady = startMockServer();
  }
  return mockServerReady;
}

function MusicLibraryContent({ role }) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [mocksReady, setMocksReady] = useState(false);
  const songsQuery = useSongsQuery({ enabled: mocksReady });

  useEffect(() => {
    ensureMockServer().then(() => setMocksReady(true));
  }, []);

  const groups = useMemo(() => {
    if (!songsQuery.data) {
      return [];
    }
    return applySongFilters(songsQuery.data, filters);
  }, [songsQuery.data, filters]);

  const sourceCounts = useMemo(
    () => countSongsBySource(songsQuery.data ?? []),
    [songsQuery.data],
  );

  if (!mocksReady) {
    return <LoadingPanel message="Starting mocked write API…" />;
  }

  if (songsQuery.isLoading) {
    return <LoadingPanel message="Loading songs from iTunes and local store…" />;
  }

  if (songsQuery.isError) {
    return <ErrorPanel message={songsQuery.error.message} onRetry={() => songsQuery.refetch()} />;
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-8">
      <header className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">Micro Frontend</p>
          <h1 className="mt-1 text-3xl font-bold text-white">Music Library</h1>
          <p className="mt-2 text-slate-300">
           
            <strong className="text-white">{role}</strong>{/*Here We have put role admin so that we can check any feature like add local songs or delete or any other like filter by name etc.*/}
          </p>
        </div>
        <dl className="grid grid-cols-3 gap-3">
          {[
            ['Total', songsQuery.data?.length ?? 0],
            ['iTunes', sourceCounts.itunes ?? 0],
            ['Local', sourceCounts.local ?? 0],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-xl border border-slate-700/80 bg-slate-900/80 px-4 py-3 text-center"
            >
              <dt className="text-xs text-slate-400">{label}</dt>
              <dd className="text-2xl font-bold text-white">{value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <SongFilters filters={filters} onChange={setFilters} />

      {role === 'admin' && <AddSongForm />}

      <SongList groups={groups} role={role} />
    </div>
  );
}

export default function MusicLibrary({ role = 'user' }) {
  return (
    <QueryClientProvider client={queryClient}>
      <MusicLibraryContent role={role} />
    </QueryClientProvider>
  );
}

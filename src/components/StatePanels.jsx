function LoadingPanel({ message }) {
  return (
    <div className="mx-auto max-w-6xl px-5 py-8">
      <div
        className="flex flex-col items-center gap-4 rounded-2xl border border-slate-700/80 bg-slate-900/80 p-10 text-center"
        role="status"
      >
        <div className="h-10 w-10 animate-spin rounded-full border-3 border-slate-600 border-t-indigo-400" />
        <p className="text-slate-300">{message}</p>
      </div>
    </div>
  );
}

function ErrorPanel({ message, onRetry }) {
  return (
    <div className="mx-auto max-w-6xl px-5 py-8">
      <div
        className="rounded-2xl border border-rose-800/60 bg-rose-950/30 p-10 text-center"
        role="alert"
      >
        <h2 className="text-xl font-semibold text-white">Unable to load songs</h2>
        <p className="mt-2 text-rose-200">{message}</p>
        <button
          type="button"
          className="mt-4 rounded-lg bg-indigo-500 px-4 py-2 text-white"
          onClick={onRetry}
        >
          Retry
        </button>
      </div>
    </div>
  );
}

export { LoadingPanel, ErrorPanel };

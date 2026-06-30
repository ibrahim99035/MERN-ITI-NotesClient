import Loader from "../common/loader";
import ErrorState from "../common/errorState";

export default function Statistics({ data, isLoading, isError, error, refetch }) {
  if (isLoading) return <Loader label="Loading stats..." />;
  if (isError) return <ErrorState status={error?.response?.status} onRetry={refetch} />;
  if (!data) return null;

  const stats = data.data || data;

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-black/40 dark:text-white/40 mb-4">
          Notes overview
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard label="Total" value={stats.noteStats?.total ?? stats.totalNotes ?? 0} />
          <StatCard label="Active" value={stats.noteStats?.active ?? stats.activeNotes ?? 0} />
          <StatCard label="Archived" value={stats.noteStats?.archived ?? stats.archivedNotes ?? 0} />
          <StatCard label="Pinned" value={stats.noteStats?.pinned ?? stats.pinnedNotes ?? 0} />
        </div>
      </div>

      {stats.userStats && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-black/40 dark:text-white/40 mb-4">
            Users overview
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <StatCard label="Total" value={stats.userStats.total} />
            <StatCard label="Verified" value={stats.userStats.verified} />
            <StatCard label="Unverified" value={stats.userStats.unverified} />
          </div>
        </div>
      )}

      {stats.categoryDistribution && stats.categoryDistribution.length > 0 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-black/40 dark:text-white/40 mb-4">
            By category
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {stats.categoryDistribution.map((cat) => (
              <div
                key={cat._id}
                className="border border-black/10 dark:border-white/10 px-4 py-3 flex items-center justify-between"
              >
                <span className="text-xs font-semibold uppercase tracking-widest text-black/60 dark:text-white/60 capitalize">
                  {cat._id}
                </span>
                <span className="text-sm font-bold text-black dark:text-white">
                  {cat.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="border border-black/10 dark:border-white/10 px-4 py-4">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-black/40 dark:text-white/40 mb-1">
        {label}
      </p>
      <p className="text-2xl font-bold text-black dark:text-white">{value}</p>
    </div>
  );
}

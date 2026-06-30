import Loader from "../common/loader";
import ErrorState from "../common/errorState";

export default function Statistics({ data, isLoading, isError, error, refetch }) {
  if (isLoading) return <Loader label="Loading stats..." />;
  if (isError) return <ErrorState status={error?.response?.status} onRetry={refetch} />;
  if (!data) return null;

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-black/40 dark:text-white/40 mb-4">
          Notes overview
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard label="Total" value={data.notes?.total ?? 0} />
          <StatCard label="Active" value={data.notes?.active ?? 0} />
          <StatCard label="Archived" value={data.notes?.archived ?? 0} />
          <StatCard label="Pinned" value={data.notes?.pinned ?? 0} />
        </div>
      </div>

      {data.users && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-black/40 dark:text-white/40 mb-4">
            Users overview
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <StatCard label="Total" value={data.users.total} />
            <StatCard label="Verified" value={data.users.verified} />
            <StatCard label="Unverified" value={data.users.unverified} />
          </div>
        </div>
      )}

      {data.categories && data.categories.length > 0 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-black/40 dark:text-white/40 mb-4">
            By category
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {data.categories.map((cat) => (
              <div
                key={cat.name}
                className="border border-black/10 dark:border-white/10 px-4 py-3 flex items-center justify-between"
              >
                <span className="text-xs font-semibold uppercase tracking-widest text-black/60 dark:text-white/60 capitalize">
                  {cat.name}
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

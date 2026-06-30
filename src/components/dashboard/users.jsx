import { format } from "date-fns";
import Loader from "../common/loader";
import ErrorState from "../common/errorState";
import EmptyState from "../common/emptyState";

export default function DashboardUsers({ data, isLoading, isError, error, refetch }) {
  if (isLoading) return <Loader label="Loading users..." />;
  if (isError) return <ErrorState status={error?.response?.status} onRetry={refetch} />;

  const users = data?.data?.users || data?.users || [];
  if (users.length === 0) return <EmptyState title="No users found" />;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-black/10 dark:border-white/10">
            <th className="text-left py-3 px-3 text-[10px] font-semibold uppercase tracking-widest text-black/40 dark:text-white/40">
              Name
            </th>
            <th className="text-left py-3 px-3 text-[10px] font-semibold uppercase tracking-widest text-black/40 dark:text-white/40">
              Email
            </th>
            <th className="text-left py-3 px-3 text-[10px] font-semibold uppercase tracking-widest text-black/40 dark:text-white/40">
              Role
            </th>
            <th className="text-left py-3 px-3 text-[10px] font-semibold uppercase tracking-widest text-black/40 dark:text-white/40">
              Verified
            </th>
            <th className="text-left py-3 px-3 text-[10px] font-semibold uppercase tracking-widest text-black/40 dark:text-white/40">
              Notes
            </th>
            <th className="text-left py-3 px-3 text-[10px] font-semibold uppercase tracking-widest text-black/40 dark:text-white/40">
              Joined
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              <td className="py-3 px-3 text-sm font-medium text-black dark:text-white">
                {user.name}
              </td>
              <td className="py-3 px-3 text-xs text-black/50 dark:text-white/50">
                {user.email}
              </td>
              <td className="py-3 px-3">
                <span className="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 border border-black/20 dark:border-white/20 text-black/50 dark:text-white/50">
                  {user.role}
                </span>
              </td>
              <td className="py-3 px-3">
                {user.isVerified ? (
                  <span className="text-[10px] font-semibold text-green-600 dark:text-green-400">Yes</span>
                ) : (
                  <span className="text-[10px] font-semibold text-red-500">No</span>
                )}
              </td>
              <td className="py-3 px-3 text-xs text-black/50 dark:text-white/50">
                {user.noteCount ?? "—"}
              </td>
              <td className="py-3 px-3 text-xs text-black/40 dark:text-white/40">
                {format(new Date(user.createdAt), "MMM d, yyyy")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// src/components/profile/details.jsx
import { useProfile } from "../../hooks/useProfile";
import { Link } from "react-router-dom";

export default function ProfileDetails() {
  const { data, isLoading, isError, error, refetch } = useProfile();

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4 max-w-sm">
        <div className="w-20 h-20 bg-black/10 dark:bg-white/10" />
        <div className="h-4 w-32 bg-black/10 dark:bg-white/10" />
        <div className="h-4 w-48 bg-black/10 dark:bg-white/10" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-sm">
        <p className="text-sm text-black/60 dark:text-white/60 mb-3">
          Couldn't load your profile{error.response?.status ? ` (${error.response.status})` : ""}.
        </p>
        <button
          onClick={() => refetch()}
          className="text-xs font-semibold uppercase tracking-widest border border-black dark:border-white px-4 py-2 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
        >
          Try again
        </button>
      </div>
    );
  }

  const user = data?.user||data;

  return (
    <div className="max-w-sm space-y-6">
      <div className="w-20 h-20 border border-black/10 dark:border-white/10 overflow-hidden bg-black/5 dark:bg-white/5">
        {user.profileImage?.url ? (
          <img
            src={user.profileImage.url}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xl font-bold text-black/30 dark:text-white/30">
            {user.name?.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      <dl className="space-y-3">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-widest text-black/40 dark:text-white/40">
            Name
          </dt>
          <dd className="text-sm text-black dark:text-white mt-1">{user.name}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-widest text-black/40 dark:text-white/40">
            Email
          </dt>
          <dd className="text-sm text-black dark:text-white mt-1">{user.email}</dd>
        </div>
        {"isVerified" in user && (
          <div>
            <dt className="text-xs font-semibold uppercase tracking-widest text-black/40 dark:text-white/40">
              Status
            </dt>
            <dd className="text-sm mt-1">
              <span
                className={`inline-block px-2 py-0.5 text-xs font-semibold uppercase tracking-widest ${
                  user.isVerified
                    ? "bg-[#FFC400] text-black"
                    : "border border-black/30 dark:border-white/30 text-black/50 dark:text-white/50"
                }`}
              >
                {user.isVerified ? "Verified" : "Not verified"}
              </span>
            </dd>
          </div>
        )}
      </dl>

      <div className="flex gap-3 pt-2">
        <Link
          to="/profile/edit"
          className="text-xs font-semibold uppercase tracking-widest bg-black dark:bg-white text-white dark:text-black px-4 py-2 hover:bg-[#FFC400] hover:text-black transition-colors"
        >
          Edit profile
        </Link>
        <Link
          to="/profile/change-password"
          className="text-xs font-semibold uppercase tracking-widest border border-black dark:border-white px-4 py-2 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
        >
          Change password
        </Link>
      </div>
    </div>
  );
}
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../store/authSelectors";
import { useNotes } from "../hooks/useNotes";
import { useAdminStats, useAdminNotes, useAdminUsers } from "../hooks/useAdmin";
import Sidebar from "../components/dashboard/sidebar";
import Statistics from "../components/dashboard/statistics";
import DashboardNotes from "../components/dashboard/note";
import DashboardUsers from "../components/dashboard/users";
import DashboardSwagger from "../components/dashboard/swagger";
import NoteCard from "../components/notes/noteCard";
import Loader from "../components/common/loader";
import ErrorState from "../components/common/errorState";
import EmptyState from "../components/common/emptyState";

export default function Dashboard() {
  const user = useSelector(selectCurrentUser);
  const isAdmin = user?.role === "admin";
  const [activeTab, setActiveTab] = useState("overview");

  const { data: myNotesData, isLoading: myNotesLoading, isError: myNotesError, error: myNotesErr, refetch: refetchMyNotes } = useNotes({ limit: 6, sort: "-createdAt" });
  const { data: statsData, isLoading: statsLoading, isError: statsError, error: statsErr, refetch: refetchStats } = useAdminStats();
  const { data: allNotesData, isLoading: allNotesLoading, isError: allNotesError, error: allNotesErr, refetch: refetchAllNotes } = useAdminNotes({ limit: 20, sort: "-createdAt" });
  const { data: usersData, isLoading: usersLoading, isError: usersError, error: usersErr, refetch: refetchUsers } = useAdminUsers({ limit: 20 });

  const myNotes = myNotesData?.data?.notes || [];
  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <Statistics
            data={statsData}
            isLoading={statsLoading}
            isError={statsError}
            error={statsErr}
            refetch={refetchStats}
          />
        );

      case "my-notes":
        if (myNotesLoading) return <Loader label="Loading your notes..." />;
        if (myNotesError) return <ErrorState status={myNotesErr?.response?.status} onRetry={refetchMyNotes} />;
        if (myNotes.length === 0) return <EmptyState title="No notes yet" actionLabel="Create note" onAction={() => window.location.href = "/notes/new"} />;
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {myNotes.map((note) => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>
        );

      case "all-notes":
        if (!isAdmin) return <p className="text-sm text-black/50 dark:text-white/50">Admin access required.</p>;
        return (
          <DashboardNotes
            data={allNotesData}
            isLoading={allNotesLoading}
            isError={allNotesError}
            error={allNotesErr}
            refetch={refetchAllNotes}
          />
        );

      case "users":
        if (!isAdmin) return <p className="text-sm text-black/50 dark:text-white/50">Admin access required.</p>;
        return (
          <DashboardUsers
            data={usersData}
            isLoading={usersLoading}
            isError={usersError}
            error={usersErr}
            refetch={refetchUsers}
          />
        );

      case "api-docs":
        if (!isAdmin) return <p className="text-sm text-black/50 dark:text-white/50">Admin access required.</p>;
        return <DashboardSwagger />;

      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-black/40 dark:text-white/40 mb-1">
          Dashboard
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-black dark:text-white">
          Welcome back, {user?.name?.split(" ")[0] || "there"}.
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-10">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} isAdmin={isAdmin} />
        <div>{renderContent()}</div>
      </div>
    </div>
  );
}

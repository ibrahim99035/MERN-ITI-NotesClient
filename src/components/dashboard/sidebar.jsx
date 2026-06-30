import {
  HiOutlineChartBar,
  HiOutlineDocumentText,
  HiOutlineUsers,
  HiOutlineBookOpen,
  HiOutlineCode,
} from "react-icons/hi";

const TABS = [
  { key: "overview", label: "Overview", icon: HiOutlineChartBar },
  { key: "my-notes", label: "My Notes", icon: HiOutlineDocumentText },
];

const ADMIN_TABS = [
  { key: "all-notes", label: "All Notes", icon: HiOutlineBookOpen },
  { key: "users", label: "Users", icon: HiOutlineUsers },
  { key: "api-docs", label: "API Docs", icon: HiOutlineCode },
];

export default function Sidebar({ activeTab, onTabChange, isAdmin }) {
  const tabs = isAdmin ? [...TABS, ...ADMIN_TABS] : TABS;

  return (
    <nav className="flex flex-col gap-1">
      {tabs.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          onClick={() => onTabChange(key)}
          className={`flex items-center gap-3 px-4 py-2.5 text-xs font-semibold uppercase tracking-widest text-left transition-colors ${
            activeTab === key
              ? "bg-black/5 dark:bg-white/10 text-black dark:text-white"
              : "text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
          }`}
        >
          <Icon size={16} />
          {label}
        </button>
      ))}
    </nav>
  );
}

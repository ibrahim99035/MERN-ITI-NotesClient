import { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { HiOutlineSearch } from "react-icons/hi";

const CATEGORIES = ["Work", "Personal", "Study", "Ideas", "Tasks"];

export default function Filter({ filters, onFilterChange }) {
  const [search, setSearch] = useState(filters.search || "");

  const debouncedSearch = useDebouncedCallback((value) => {
    onFilterChange({ ...filters, search: value || undefined, page: 1 });
  }, 350);

  useEffect(() => {
    debouncedSearch(search);
  }, [search]);

  const handleCategoryChange = (e) => {
    onFilterChange({
      ...filters,
      category: e.target.value || undefined,
      page: 1,
    });
  };

  const handleStatusChange = (e) => {
    onFilterChange({
      ...filters,
      status: e.target.value || undefined,
      page: 1,
    });
  };

  const handleSortChange = (e) => {
    onFilterChange({ ...filters, sort: e.target.value, page: 1 });
  };

  return (
    <div className="flex flex-wrap items-end gap-4 mb-8">
      <div className="flex-1 min-w-[200px]">
        <label className="block text-[10px] font-semibold uppercase tracking-widest text-black/40 dark:text-white/40 mb-1.5">
          Search
        </label>
        <div className="relative">
          <HiOutlineSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-black/30 dark:text-white/30"
            size={15}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-black/10 dark:border-white/10 bg-transparent pl-9 pr-3 py-2 text-sm text-black dark:text-white focus:outline-none focus:border-[#FFC400]"
            placeholder="Search notes..."
          />
        </div>
      </div>

      <div>
        <label className="block text-[10px] font-semibold uppercase tracking-widest text-black/40 dark:text-white/40 mb-1.5">
          Category
        </label>
        <select
          value={filters.category || ""}
          onChange={handleCategoryChange}
          className="border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm text-black dark:text-white focus:outline-none focus:border-[#FFC400]"
        >
          <option value="">All</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c.toLowerCase()}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-[10px] font-semibold uppercase tracking-widest text-black/40 dark:text-white/40 mb-1.5">
          Status
        </label>
        <select
          value={filters.status || ""}
          onChange={handleStatusChange}
          className="border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm text-black dark:text-white focus:outline-none focus:border-[#FFC400]"
        >
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      <div>
        <label className="block text-[10px] font-semibold uppercase tracking-widest text-black/40 dark:text-white/40 mb-1.5">
          Sort
        </label>
        <select
          value={filters.sort || "-createdAt"}
          onChange={handleSortChange}
          className="border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm text-black dark:text-white focus:outline-none focus:border-[#FFC400]"
        >
          <option value="-createdAt">Newest</option>
          <option value="createdAt">Oldest</option>
          <option value="title">Title A-Z</option>
          <option value="-title">Title Z-A</option>
        </select>
      </div>
    </div>
  );
}


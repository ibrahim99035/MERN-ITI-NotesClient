import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <button
        onClick={() => setIsDark((prev) => !prev)}
        className="text-xs font-semibold uppercase tracking-widest px-3 py-2 border border-black dark:border-white bg-black dark:bg-white transition-colors"
    >
        {isDark ? (
            <span className="text-black">☀️ Light</span>
        ) : (
            <span className="text-white dark:text-white">🌙 Dark</span>
        )}
    </button>
  );
}
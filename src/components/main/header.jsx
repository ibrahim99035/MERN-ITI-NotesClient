import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { selectIsAuthenticated } from "../../store/authSelectors";
import ThemeToggle from "../common/themeToggle";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const navLinks = (isAuthenticated) => [
  ["Home", "/"],
  ...(isAuthenticated
    ? [["Dashboard", "/dashboard"], ["Notes", "/notes"], ["Profile", "/profile"]]
    : []),
];

export default function Header() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setMenuOpen(false);
    navigate("/login");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 dark:border-white/10 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-sm overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <span className="w-2.5 h-2.5 bg-[#FFC400] inline-block" />
          <span className="font-bold text-lg tracking-tight text-black dark:text-white">
            NOTES<span className="text-[#FFC400]">.</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks(isAuthenticated).map(([label, path]) => (
            <Link
              key={path}
              to={path}
              className="text-xs font-semibold uppercase tracking-widest text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white border-b-2 border-transparent hover:border-[#FFC400] pb-1 transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-4 shrink-0">
          <ThemeToggle />

          <button
            className="md:hidden p-1 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <HiOutlineX size={22} /> : <HiOutlineMenu size={22} />}
          </button>

          <div className="hidden md:block">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="text-xs font-semibold uppercase tracking-widest border border-black dark:border-white px-4 py-2 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
              >
                Log out
              </button>
            ) : (
              <Link
                to="/login"
                className="text-xs font-semibold uppercase tracking-widest bg-black dark:bg-white text-white dark:text-black px-4 py-2 hover:bg-[#FFC400] hover:text-black transition-colors"
              >
                Log in
              </Link>
            )}
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-black/10 dark:border-white/10 bg-white dark:bg-[#121212]">
          <div className="max-w-6xl mx-auto px-6 py-4 space-y-3">
          {navLinks(isAuthenticated).map(([label, path]) => (
            <Link
              key={path}
              to={path}
              onClick={closeMenu}
              className="block text-xs font-semibold uppercase tracking-widest text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-colors"
            >
              {label}
            </Link>
          ))}
          <hr className="border-black/10 dark:border-white/10" />
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="w-full text-left text-xs font-semibold uppercase tracking-widest text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-colors"
            >
              Log out
            </button>
          ) : (
            <Link
              to="/login"
              onClick={closeMenu}
              className="block text-xs font-semibold uppercase tracking-widest text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-colors"
            >
              Log in
            </Link>
          )}
          </div>
        </div>
      )}
    </header>
  );
}
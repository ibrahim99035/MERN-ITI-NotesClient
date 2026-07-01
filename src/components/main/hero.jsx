import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../store/authSelectors";
import { usePinnedNote } from "../../hooks/useNotes";

export default function Hero() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { data: pinnedRes } = usePinnedNote();
  const pinned = pinnedRes?.data;

  return (
    <section className="relative overflow-hidden bg-white dark:bg-[#121212] border-b border-black/10 dark:border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-black/40 dark:text-white/40 mb-4">
            Built for the ITI Full Stack Program
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black dark:text-white leading-[1.1] mb-6">
            Every thought,
            <br />
            pinned in place.
          </h1>
          <p className="text-base text-black/60 dark:text-white/60 max-w-md mb-8">
            Capture notes the moment they happen. Tag, search, and filter
            without losing the thread — and pick up exactly where you left
            off.
          </p>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="text-xs font-semibold uppercase tracking-widest bg-black dark:bg-white text-white dark:text-black px-6 py-3 hover:bg-[#FFC400] hover:text-black transition-colors"
                >
                  Profile
                </Link>
                <Link
                  to="/notes"
                  className="text-xs font-semibold uppercase tracking-widest text-black dark:text-white border-b-2 border-transparent hover:border-[#FFC400] pb-1 transition-colors"
                >
                  Notes
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="text-xs font-semibold uppercase tracking-widest bg-black dark:bg-white text-white dark:text-black px-6 py-3 hover:bg-[#FFC400] hover:text-black transition-colors"
                >
                  Get started
                </Link>
                <Link
                  to="/login"
                  className="text-xs font-semibold uppercase tracking-widest text-black dark:text-white border-b-2 border-transparent hover:border-[#FFC400] pb-1 transition-colors"
                >
                  Log in
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="relative h-72 md:h-80">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56">
            <div className="absolute inset-0 bg-black/5 dark:bg-white/10 rotate-[-10deg] shadow-sm" />

            <div className="absolute inset-0 bg-white dark:bg-[#1c1c1c] border border-black/10 dark:border-white/10 rotate-[6deg] shadow-md p-5">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-black/30 dark:text-white/30 mb-2">
                {pinned ? pinned.category : "Work"}
              </p>
              <p className="text-sm text-black/70 dark:text-white/70 leading-snug line-clamp-4">
                {pinned ? pinned.content : "Finish API docs before standup. Check the pagination params."}
              </p>
            </div>

            <div className="absolute inset-0 bg-[#FFC400] rotate-[-3deg] shadow-lg p-5 translate-x-3 translate-y-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-black/50">
                  Pinned
                </p>
                <span className="w-2 h-2 bg-black/70 inline-block" />
              </div>
              <p className="text-sm font-semibold text-black leading-snug">
                {pinned ? pinned.title : "Ship the notes app demo by Thursday."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
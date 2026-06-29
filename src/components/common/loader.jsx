export default function Loader({ label = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      <div className="w-8 h-8 border-2 border-black/10 dark:border-white/10 border-t-[#FFC400] rounded-full animate-spin" />
      <p className="text-xs font-semibold uppercase tracking-widest text-black/40 dark:text-white/40">
        {label}
      </p>
    </div>
  );
}

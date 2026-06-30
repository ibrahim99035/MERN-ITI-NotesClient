const API_URL = import.meta.env.VITE_API_URL?.replace("/api/v1", "") || "http://localhost:5000";

export default function DashboardSwagger() {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-black/40 dark:text-white/40 mb-4">
        API Documentation
      </p>
      <div className="border border-black/10 dark:border-white/10 overflow-hidden">
        <iframe
          src={`${API_URL}/api-docs`}
          title="Swagger API Docs"
          className="w-full h-[600px] bg-white"
        />
      </div>
    </div>
  );
}

const API_URL =
  import.meta.env.VITE_API_URL?.replace("/api/v1", "") || "http://localhost:5000";

export default function SwaggerDocs() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-black/40 dark:text-white/40 mb-1">
          Documentation
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-black dark:text-white">
          API Reference
        </h1>
      </div>
      <div className="border border-black/10 dark:border-white/10 overflow-hidden">
        <iframe
          src={`${API_URL}/api-docs`}
          title="Swagger API Docs"
          className="w-full h-[700px] bg-white"
        />
      </div>
    </div>
  );
}

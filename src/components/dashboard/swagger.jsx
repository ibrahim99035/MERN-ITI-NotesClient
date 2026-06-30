import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export default function DashboardSwagger() {
  return (
    <div className="swagger-theme">
      <p className="text-xs font-semibold uppercase tracking-widest text-black/40 dark:text-white/40 mb-4">
        API Documentation
      </p>
      <div className="border border-black/10 dark:border-white/10 overflow-hidden">
        <SwaggerUI url="/docs/swagger.json" />
      </div>
      <SwaggerStyles />
    </div>
  );
}

function SwaggerStyles() {
  return (
    <style>{`
      .swagger-theme .swagger-ui { color: inherit; font-family: inherit; }
      .swagger-theme .swagger-ui .topbar { display: none; }
      .swagger-theme .swagger-ui .info { margin: 20px 0; }
      .swagger-theme .swagger-ui .info .title { font-size: 20px; font-weight: 700; letter-spacing: -0.02em; color: inherit; font-family: inherit; }
      .swagger-theme .swagger-ui .info .title small.version-stamp { background: #FFC400; color: #000; }
      .swagger-theme .swagger-ui .info .description p { font-size: 13px; color: inherit; opacity: 0.7; }
      .swagger-theme .swagger-ui .scheme-container { background: transparent; box-shadow: none; padding: 12px 0; }
      .swagger-theme .swagger-ui select { border: 1px solid rgba(0,0,0,0.1); background: transparent; font-size: 12px; color: inherit; font-family: inherit; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; padding: 4px 24px 4px 8px; }
      .swagger-theme .swagger-ui .opblock-tag { font-size: 14px; font-weight: 700; color: inherit; font-family: inherit; border-bottom: 1px solid rgba(0,0,0,0.08); padding: 15px 0; }
      .swagger-theme .swagger-ui .opblock-tag:hover { color: #FFC400; }
      .swagger-theme .swagger-ui .opblock-tag .expand-operation { display: none; }
      .swagger-theme .swagger-ui .opblock { border: 1px solid rgba(0,0,0,0.08); border-radius: 0; box-shadow: none; margin: 0 0 8px; }
      .swagger-theme .swagger-ui .opblock .opblock-summary { padding: 10px 12px; }
      .swagger-theme .swagger-ui .opblock .opblock-summary .opblock-summary-path { font-size: 13px; font-family: "SF Mono","Fira Code",monospace; font-weight: 600; color: #1a1a2e; }
      .swagger-theme .swagger-ui .opblock .opblock-summary .opblock-summary-description { font-size: 12px; color: inherit; opacity: 0.6; }
      .swagger-theme .swagger-ui .opblock .opblock-summary .opblock-summary-method { font-size: 10px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; border-radius: 0; padding: 4px 8px; min-width: 60px; text-align: center; }
      .swagger-theme .swagger-ui .opblock.opblock-get .opblock-summary-method { background: #3b82f6; }
      .swagger-theme .swagger-ui .opblock.opblock-post .opblock-summary-method { background: #22c55e; }
      .swagger-theme .swagger-ui .opblock.opblock-patch .opblock-summary-method { background: #eab308; color: #000; }
      .swagger-theme .swagger-ui .opblock.opblock-delete .opblock-summary-method { background: #ef4444; }
      .swagger-theme .swagger-ui .opblock.opblock-get { background: rgba(59,130,246,0.04); border-color: rgba(59,130,246,0.15); }
      .swagger-theme .swagger-ui .opblock.opblock-post { background: rgba(34,197,94,0.04); border-color: rgba(34,197,94,0.15); }
      .swagger-theme .swagger-ui .opblock.opblock-patch { background: rgba(234,179,8,0.04); border-color: rgba(234,179,8,0.15); }
      .swagger-theme .swagger-ui .opblock.opblock-delete { background: rgba(239,68,68,0.04); border-color: rgba(239,68,68,0.15); }
      .swagger-theme .swagger-ui .opblock .opblock-section-header { background: transparent; border-bottom: 1px solid rgba(0,0,0,0.06); padding: 10px 16px; min-height: auto; box-shadow: none; }
      .swagger-theme .swagger-ui .opblock .opblock-section-header h4 { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: inherit; font-family: inherit; }
      .swagger-theme .swagger-ui .opblock .opblock-body .opblock-description-wrapper p { font-size: 13px; color: inherit; opacity: 0.7; }
      .swagger-theme .swagger-ui table thead tr td,
      .swagger-theme .swagger-ui table thead tr th { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: inherit; opacity: 0.6; border-bottom: 1px solid rgba(0,0,0,0.08); }
      .swagger-theme .swagger-ui table tbody tr td { font-size: 13px; color: inherit; font-family: "SF Mono","Fira Code",monospace; border-bottom: 1px solid rgba(0,0,0,0.04); padding: 8px 10px; }
      .swagger-theme .swagger-ui .btn { border-radius: 0; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; font-family: inherit; padding: 6px 16px; border: 1px solid rgba(0,0,0,0.15); background: transparent; color: inherit; }
      .swagger-theme .swagger-ui .btn:hover { background: rgba(0,0,0,0.05); border-color: rgba(0,0,0,0.25); }
      .swagger-theme .swagger-ui .btn.execute { background: #000; color: #fff; border-color: #000; }
      .swagger-theme .swagger-ui .btn.execute:hover { background: #FFC400; color: #000; border-color: #FFC400; }
      .swagger-theme .swagger-ui input[type="text"],
      .swagger-theme .swagger-ui textarea,
      .swagger-theme .swagger-ui select { border-radius: 0; border: 1px solid rgba(0,0,0,0.1); font-size: 12px; font-family: "SF Mono","Fira Code",monospace; padding: 6px 10px; background: transparent; color: inherit; outline: none; }
      .swagger-theme .swagger-ui input[type="text"]:focus,
      .swagger-theme .swagger-ui textarea:focus,
      .swagger-theme .swagger-ui select:focus { border-color: #FFC400; }
      .dark .swagger-theme .swagger-ui .opblock .opblock-summary .opblock-summary-path { color: #e0e0e0; }
      .dark .swagger-theme .swagger-ui select { border-color: rgba(255,255,255,0.15); }
      .dark .swagger-theme .swagger-ui .opblock-tag { border-bottom-color: rgba(255,255,255,0.08); }
      .dark .swagger-theme .swagger-ui .opblock { border-color: rgba(255,255,255,0.08); }
      .dark .swagger-theme .swagger-ui .opblock .opblock-section-header { border-bottom-color: rgba(255,255,255,0.06); }
      .dark .swagger-theme .swagger-ui table thead tr td,
      .dark .swagger-theme .swagger-ui table thead tr th { border-bottom-color: rgba(255,255,255,0.08); }
      .dark .swagger-theme .swagger-ui table tbody tr td { border-bottom-color: rgba(255,255,255,0.04); }
      .dark .swagger-theme .swagger-ui .opblock.opblock-get { background: rgba(59,130,246,0.08); border-color: rgba(59,130,246,0.2); }
      .dark .swagger-theme .swagger-ui .opblock.opblock-post { background: rgba(34,197,94,0.08); border-color: rgba(34,197,94,0.2); }
      .dark .swagger-theme .swagger-ui .opblock.opblock-patch { background: rgba(234,179,8,0.08); border-color: rgba(234,179,8,0.2); }
      .dark .swagger-theme .swagger-ui .opblock.opblock-delete { background: rgba(239,68,68,0.08); border-color: rgba(239,68,68,0.2); }
      .dark .swagger-theme .swagger-ui .info .title small.version-stamp { background: #FFC400; color: #000; }
      .dark .swagger-theme .swagger-ui .btn.execute { background: #fff; color: #000; border-color: #fff; }
      .dark .swagger-theme .swagger-ui .btn.execute:hover { background: #FFC400; color: #000; border-color: #FFC400; }
      .dark .swagger-theme .swagger-ui input[type="text"],
      .dark .swagger-theme .swagger-ui textarea,
      .dark .swagger-theme .swagger-ui select { border-color: rgba(255,255,255,0.15); color: #e0e0e0; }
      .dark .swagger-theme .swagger-ui input[type="text"]:focus,
      .dark .swagger-theme .swagger-ui textarea:focus { border-color: #FFC400; }
    `}</style>
  );
}

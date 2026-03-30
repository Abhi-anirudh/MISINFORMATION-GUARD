// ============================================================
// config.ts — Automatically uses local URL in development
// Uses HuggingFace URL in production
// ============================================================

const API_BASE = process.env.NODE_ENV === "development"
  ? "http://localhost:8000"          // local when running npm run dev
  : "https://abhianirudh-misinformation-guard.hf.space";  // production

export default API_BASE;

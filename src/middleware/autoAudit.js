// src/middleware/autoAudit.js
const AuditLog = require("../models/auditLog.model");

function mapAction(req) {
  const p = `${req.baseUrl}${req.path}`.toLowerCase();

  // Casos explícitos de auth
  if (p.includes("/auth/login")) return "login";
  if (p.includes("/auth/logout")) return "logout";

  switch (req.method) {
    case "POST":
      return "create";
    case "PUT":
    case "PATCH":
      return "update";
    case "DELETE":
      return "delete";
    default:
      return "read";
  }
}

function inferResource(req) {
  // /api/v2/equipo/123 → "equipo"
  const clean = `${req.baseUrl}${req.path}`.replace(/^\/api\/v\d+\//, "");
  const seg = clean.split("/").filter(Boolean);
  return seg[0] || ""; // primer segmento como recurso
}

const autoAudit = () => {
  return async (req, res, next) => {
    const startedAt = Date.now();

    res.on("finish", async () => {
      try {
        const action = mapAction(req);
        const resource = inferResource(req);

        // usuario si lo adjuntó attachUserIfPresent o authProfile
        const userId = req.user?._id || null;
        const userEmail =
          req.user?.email ||
          // fallback: en login, aún no hay req.user; toma email del body si existe
          (action === "login"
            ? req.body?.email || req.body?.username || null
            : null);

        const entry = {
          userId,
          userEmail,
          role: req.user?.role || null,

          action,
          resource,
          endpoint: `${req.baseUrl}${req.path}`,
          method: req.method,

          ip: req.headers["x-forwarded-for"] || req.ip,
          userAgent: req.headers["user-agent"] || "",
          statusCode: res.statusCode,

          meta: {
            query: req.query,
            params: req.params,
            // no guardamos body en GET por higiene
            body: req.method === "GET" ? undefined : req.body,
            durationMs: Date.now() - startedAt,
          },
        };

        await AuditLog.create(entry);
      } catch (e) {
        console.error("autoAudit error:", e.message);
      }
    });

    next();
  };
};

module.exports = { autoAudit };

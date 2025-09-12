// middleware/autoAudit.js
const jwt = require("jsonwebtoken");
const AuditLog = require("../models/auditLog.model");

const JWT_SECRET = process.env.JWT_SECRET;

function getTokenFromReq(req) {
  const h = req.headers?.authorization || req.headers?.Authorization;
  if (typeof h === "string" && h.startsWith("Bearer ")) {
    const tok = h.slice(7).trim();
    if (tok) return tok;
  }
  if (req.cookies?.token) return req.cookies.token;
  if (req.headers?.["x-access-token"]) return req.headers["x-access-token"];
  return null;
}

function pickUserFromReq(req) {
  if (req.user && (req.user._id || req.user.id)) {
    return {
      userId: String(req.user._id || req.user.id),
      userEmail: req.user.email || req.user.username || null,
      role: req.user.role || null,
    };
  }
  const token = getTokenFromReq(req);
  if (token) {
    try {
      const p = jwt.verify(token, JWT_SECRET);
      const id = p._id || p.id || p.sub || null;
      return {
        userId: id ? String(id) : null,
        userEmail: p.email || p.userEmail || null,
        role: p.role || null,
      };
    } catch {}
  }
  const isLogin = /\/auth\/login(?:\?|$|\/)/.test(req.originalUrl || "");
  if (isLogin && req.method === "POST" && req.body?.email) {
    return { userId: null, userEmail: req.body.email, role: null };
  }
  return { userId: null, userEmail: null, role: null };
}

function inferAction(method, path) {
  if (/\/auth\/login(?:\?|$|\/)/.test(path)) return "login";
  if (/\/auth\/logout(?:\?|$|\/)/.test(path)) return "logout";
  switch (method) {
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

function safeBody(body) {
  if (!body || typeof body !== "object") return body;
  const clone = { ...body };
  ["password", "pass", "pwd", "secret"].forEach((k) => {
    if (k in clone) clone[k] = "***";
  });
  return clone;
}

const autoAudit = (fixedAction) => {
  return async (req, res, next) => {
    const started = Date.now();

    res.on("finish", async () => {
      try {
        const { userId, userEmail, role } = pickUserFromReq(req);
        const base = (req.baseUrl || "").replace(/^\/api\/v2\/?/, "");
        const resource = base.split("/").filter(Boolean)[0] || null;

        const entry = {
          userId,
          userEmail,
          role,
          action: fixedAction || inferAction(req.method, req.originalUrl || ""),
          resource,
          resourceId: req.params?.id || null,
          endpoint: req.originalUrl,
          method: req.method,
          ip: req.headers["x-forwarded-for"] || req.ip,
          userAgent: req.headers["user-agent"] || null,
          statusCode: res.statusCode,
          meta: {
            query: req.query,
            params: req.params,
            body: req.method === "GET" ? undefined : safeBody(req.body),
            durationMs: Date.now() - started,
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
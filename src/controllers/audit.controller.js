const AuditLog = require("../models/auditLog.model");


// Helpers
const toInt = (v, d) => {
  const n = parseInt(v, 10);
  return Number.isFinite(n) ? n : d;
};
const toDate = (v) => (v ? new Date(v) : null);

function buildAuditQuery(qs) {
  const {
    q, userId, email, action, method, ip, resource,
    status, statusMin, statusMax, dateFrom, dateTo,
  } = qs;

  const query = {};

  if (q) {
    const regex = new RegExp(q, "i");
    query.$or = [
      { email: regex },
      { action: regex },
      { method: regex },
      { resource: regex },
      { ip: regex },
      { message: regex },
    ];
  }

  if (userId && mongoose.Types.ObjectId.isValid(userId)) {
    query.userId = userId;
  }

  if (email) query.email = new RegExp(`^${email}$`, "i");

  if (action) {
    query.action = Array.isArray(action) ? { $in: action } : action;
  }

  if (method) {
    query.method = Array.isArray(method) ? { $in: method } : method;
  }

  if (ip) query.ip = ip;

  if (resource) {
    query.resource = new RegExp(resource, "i");
  }

  if (status !== undefined) {
    const n = toInt(status, null);
    if (n !== null) query.status = n;
  } else {
    const min = toInt(statusMin, null);
    const max = toInt(statusMax, null);
    if (min !== null || max !== null) {
      query.status = {};
      if (min !== null) query.status.$gte = min;
      if (max !== null) query.status.$lte = max;
    }
  }

  const from = toDate(dateFrom);
  const to = toDate(dateTo);
  if (from || to) {
    query.createdAt = {};
    if (from) query.createdAt.$gte = from;
    if (to) query.createdAt.$lte = to;
  }

  return query;
}

function buildSort(sortParam) {
  // sort ejemplo: "-createdAt" o "status" o "createdAt:desc"
  if (!sortParam) return { createdAt: -1 };
  const s = String(sortParam).trim();

  if (s.includes(":")) {
    const [field, dir] = s.split(":");
    return { [field]: /desc|-1/i.test(dir) ? -1 : 1 };
  }

  if (s.startsWith("-")) return { [s.slice(1)]: -1 };
  return { [s]: 1 };
}

// ========= LISTA JSON (por si aún no la tienes) =========
exports.getAuditLogs = async (req, res) => {
  try {
    const { page = 1, limit = 50, sort } = req.query;
    const query = buildAuditQuery(req.query);
    const sortObj = buildSort(sort);

    const skip = (toInt(page, 1) - 1) * toInt(limit, 50);
    const [total, data] = await Promise.all([
      AuditLog.countDocuments(query),
      AuditLog.find(query).sort(sortObj).skip(skip).limit(toInt(limit, 50)).lean(),
    ]);

    res.json({
      meta: {
        page: toInt(page, 1),
        limit: toInt(limit, 50),
        total,
        pages: Math.ceil(total / toInt(limit, 50)) || 1,
      },
      data,
    });
  } catch (err) {
    console.error("getAuditLogs error:", err);
    res.status(500).json({ message: "Error al obtener auditoría" });
  }
};

// ========= EXPORT CSV STREAM =========
function csvEscape(v) {
  if (v === null || v === undefined) return "";
  const s = String(v);
  // Si contiene comillas, coma, salto de línea o ; lo encerramos en comillas dobles
  if (/[",\n;\r]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

exports.exportAuditCSV = async (req, res) => {
  try {
    const query = buildAuditQuery(req.query);
    const sortObj = buildSort(req.query.sort);

    const filename = `audit_${new Date().toISOString().slice(0,19).replace(/[:T]/g,'-')}.csv`;
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

    // Encabezados (ajusta columnas/orden a tu gusto)
    const headers = [
      "createdAt",
      "userId",
      "email",
      "action",
      "method",
      "resource",
      "ip",
      "status",
      "message",
      "meta", // stringificado
    ];
    res.write(headers.join(",") + "\n");

    const cursor = AuditLog.find(query).sort(sortObj).cursor();

    cursor.on("data", (doc) => {
      const row = [
        doc.createdAt ? new Date(doc.createdAt).toISOString() : "",
        doc.userId || "",
        doc.email || "",
        doc.action || "",
        doc.method || "",
        doc.resource || "",
        doc.ip || "",
        typeof doc.status === "number" ? doc.status : "",
        doc.message || "",
        doc.meta ? JSON.stringify(doc.meta) : "",
      ].map(csvEscape);

      res.write(row.join(",") + "\n");
    });

    cursor.on("end", () => res.end());
    cursor.on("error", (err) => {
      console.error("exportAuditCSV error:", err);
      if (!res.headersSent) {
        res.status(500).json({ message: "Error al exportar CSV" });
      } else {
        res.end(); // cierra por si ya había empezado a escribir
      }
    });
  } catch (err) {
    console.error("exportAuditCSV error:", err);
    res.status(500).json({ message: "Error al exportar CSV" });
  }
};

module.exports.getAuditLogs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      action,
      resource,
      userEmail,
      resourceId,
      from, // ISO date string
      to, // ISO date string
      q, // texto libre: buscar en endpoint / meta / userAgent
    } = req.query;

    const filter = {};

    if (action) filter.action = action;
    if (resource) filter.resource = resource;
    if (userEmail) filter.userEmail = new RegExp(userEmail, "i");
    if (resourceId) filter.resourceId = resourceId;

    if (from || to) {
      filter.createdAt = {};
      if (from) filter.createdAt.$gte = new Date(from);
      if (to) filter.createdAt.$lte = new Date(to);
    }

    if (q) {
      filter.$or = [
        { endpoint: new RegExp(q, "i") },
        { userAgent: new RegExp(q, "i") },
        { "meta.query": new RegExp(q, "i") }, // si guardaste query string en meta
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      AuditLog.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      AuditLog.countDocuments(filter),
    ]);

    res.json({
      page: Number(page),
      limit: Number(limit),
      total,
      items,
    });
  } catch (error) {
    console.error("getAuditLogs error:", error);
    res.status(500).json({ message: "Error al obtener auditoría" });
  }
};

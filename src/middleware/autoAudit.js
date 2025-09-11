// middlewares/autoAudit.js
const { audit } = require("../../utils/audit");

// Mapea métodos HTTP a acciones de auditoría
const DEFAULT_METHOD_ACTION = {
  POST: "create",
  PUT: "update",
  PATCH: "update",
  DELETE: "delete",
  GET: "read",
};

function autoAudit(options = {}) {
  const {
    methodAction = DEFAULT_METHOD_ACTION,
    // resuelve el "resource" desde el req (por ej. primer segmento de /api/equipo/:id => "equipo")
    getResource = (req) => {
      const path = req.baseUrl || req.originalUrl || "";
      // /api/equipo/123 -> ['','api','equipo','123'] => "equipo"
      const segs = path.split("?")[0].split("/").filter(Boolean);
      // si usas prefijo /api, saltarlo
      return segs[1] || segs[0] || "unknown";
    },
    includeReads = false, // si quieres loguear GET por defecto
    sanitize = (obj) => obj, // permite limpiar passwords o payloads sensibles
  } = options;

  return function autoAuditMiddleware(req, res, next) {
    // Guardamos mínima info del request
    const action = methodAction[req.method] || "read";
    const resource = getResource(req);

    // En res.locals el controlador puede setear:
    //  - auditResourceId  (string)
    //  - auditBefore      (obj)
    //  - auditAfter       (obj)
    //  - auditMeta        (obj)
    //  - auditAction      (override)
    //  - auditResource    (override)

    // Interceptar el payload de salida (para create/update si no setean auditAfter explícito)
    let responseBody;
    const originalJson = res.json.bind(res);
    const originalSend = res.send.bind(res);

    res.json = function interceptedJson(body) {
      responseBody = body;
      return originalJson(body);
    };
    res.send = function interceptedSend(body) {
      // si es JSON string, intenta parsear (best-effort)
      try {
        if (typeof body === "string" && body.startsWith("{")) {
          responseBody = JSON.parse(body);
        } else {
          responseBody = body;
        }
      } catch (_) {
        responseBody = body;
      }
      return originalSend(body);
    };

    res.on("finish", async () => {
      try {
        const finalAction = res.locals.auditAction || action;
        const finalResource = res.locals.auditResource || resource;

        // Si es GET y no queremos registrar lecturas masivas, salir
        if (finalAction === "read" && !includeReads) return;

        // Construye diff en orden de preferencia: lo que seteó el controlador
        let diff = undefined;
        if (res.locals.auditBefore || res.locals.auditAfter) {
          diff = {
            ...(res.locals.auditBefore
              ? { before: sanitize(res.locals.auditBefore) }
              : {}),
            ...(res.locals.auditAfter
              ? { after: sanitize(res.locals.auditAfter) }
              : {}),
          };
        } else if (
          finalAction === "create" &&
          responseBody &&
          typeof responseBody === "object"
        ) {
          // Para create, si devolviste el documento recién creado
          diff = { after: sanitize(responseBody) };
        } else if (finalAction === "delete" && res.locals.auditBefore) {
          diff = { before: sanitize(res.locals.auditBefore) };
        }

        // Id del recurso: prioridad a lo que setee el controlador
        let resourceId = res.locals.auditResourceId || null;
        if (!resourceId && responseBody && typeof responseBody === "object") {
          resourceId = responseBody._id || responseBody.id || null;
        }

        // Meta adicional
        const meta = sanitize(res.locals.auditMeta || {});

        await audit({
          req,
          action: finalAction,
          resource: finalResource,
          resourceId: resourceId ? String(resourceId) : null,
          statusCode: res.statusCode,
          diff,
          meta,
        });
      } catch (e) {
        // Nunca romper el flujo por auditoría
        console.warn("autoAudit error:", e?.message || e);
      }
    });

    next();
  };
}

module.exports = { autoAudit };

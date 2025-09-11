const mongoose = require("mongoose");

const AuditLogSchema = new mongoose.Schema(
  {
    // Quién
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
    userEmail: { type: String, index: true },
    role: { type: String },

    // Dónde/Qué
    action: {
      type: String,
      enum: ["create", "update", "delete", "read", "login", "logout"],
      index: true,
    },
    resource: { type: String, index: true }, // p.ej.: "equipo", "channel", "satellite"
    resourceId: { type: String, index: true }, // _id o identificador lógico
    endpoint: { type: String }, // req.originalUrl
    method: { type: String }, // GET/POST/PUT/DELETE...

    // Contexto
    ip: { type: String, index: true },
    userAgent: { type: String },
    statusCode: { type: Number },

    // Cambios
    diff: { type: Object }, // { before, after } o solo { after } (create), etc.

    // Extra libre (query params, cuerpo, etc. sanitizado)
    meta: { type: Object },
  },
  { timestamps: true, versionKey: false }
);

// Índices útiles (fecha + action + resource)
AuditLogSchema.index({ createdAt: -1, action: 1, resource: 1 });

const AuditLog = mongoose.model("AuditLog", AuditLogSchema);
module.exports = AuditLog;

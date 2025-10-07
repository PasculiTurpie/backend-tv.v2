const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const { attachUserIfPresent } = require("./middleware/attachUserIfPresent");
const validateTokenMaybe = require("./middleware/validateTokenMaybe");
const { autoAudit } = require("./middleware/autoAudit");
const { protectMutating } = require("./middleware/protectMutating");

const AuthRoutes = require("./routes/auth.routes");
const UserRoutes = require("./routes/user.routes");
const IrdRoutes = require("./routes/ird.routes");
const SatelliteRoutes = require("./routes/satellite.routes");
const PolarizationRoutes = require("./routes/polarization.routes");
const ContactRoutes = require("./routes/contact.routes");
const ChannelRoutes = require("./routes/channel.routes");
const SignalRoutes = require("./routes/signal.routes");
const TipoTechRoutes = require("./routes/tipoTech.routes");
const EquipoRoutes = require("./routes/equipo.routes");
const TipoEquipoRoutes = require("./routes/tipoEquipo.routes");
const AuditRoutes = require("./routes/audit.routes");
const BulkIrdRoutes = require("./routes/bulkIrd.routes");
const TitanRoutes = require("./routes/titans.routes");

const API_PREFIX = "/api/v2";

const app = express();

app.set("trust proxy", true);

const defaultOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "https://localhost:3000",
];

const configuredOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const normalizeOrigin = (origin) => {
  if (!origin) return origin;
  try {
    const { protocol, host } = new URL(origin);
    return `${protocol}//${host}`;
  } catch (_error) {
    return origin;
  }
};

const allowedOriginsSet = new Set(
  [...defaultOrigins, ...configuredOrigins].map(normalizeOrigin)
);

const allowAllOrigins = allowedOriginsSet.has("*");
if (allowAllOrigins) {
  allowedOriginsSet.delete("*");
}

const isOriginAllowed = (origin) => {
  if (allowAllOrigins) return true;
  if (!origin) return true;
  if (allowedOriginsSet.has(origin)) return true;
  const normalized = normalizeOrigin(origin);
  return allowedOriginsSet.has(normalized);
};

const corsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    if (isOriginAllowed(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.options(
  "*",
  cors({
    origin: allowAllOrigins
      ? true
      : Array.from(allowedOriginsSet.values()),
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

app.use(attachUserIfPresent);
app.use(validateTokenMaybe);
app.use(autoAudit());

app.get(`${API_PREFIX}/health`, (_req, res) => {
  res.json({ status: "ok" });
});

app.use(`${API_PREFIX}/auth`, AuthRoutes);
app.use(`${API_PREFIX}/titans`, TitanRoutes);
app.use(
  API_PREFIX,
  protectMutating,
  UserRoutes,
  IrdRoutes,
  SatelliteRoutes,
  PolarizationRoutes,
  SignalRoutes,
  ContactRoutes,
  ChannelRoutes,
  TipoTechRoutes,
  EquipoRoutes,
  TipoEquipoRoutes,
  AuditRoutes,
  BulkIrdRoutes
);

app.use((req, res, next) => {
  if (req.originalUrl.startsWith(API_PREFIX)) {
    return res.status(404).json({
      message: "Recurso no encontrado",
      path: req.originalUrl,
    });
  }
  return next();
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
  if (err?.message === "Not allowed by CORS") {
    return res.status(403).json({
      message: "Origen no permitido por CORS",
      origin: req.headers?.origin || null,
    });
  }

  console.error("Unhandled error:", err);
  return res.status(500).json({
    message: "Error interno del servidor",
  });
});

module.exports = app;

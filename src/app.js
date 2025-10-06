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

app.use("/api/v2/auth", AuthRoutes);
app.use("/api/v2/titans", TitanRoutes);
app.use(
  "/api/v2",
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

module.exports = app;

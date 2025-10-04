// server.js
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
require("dotenv").config();
require("./config/config.mongoose");

const { attachUserIfPresent } = require("./middleware/attachUserIfPresent");
const validateTokenMaybe = require("./middleware/validateTokenMaybe");
const { autoAudit } = require("./middleware/autoAudit");
const { protectMutating } = require("./middleware/protectMutating");

const AuthRoutes = require("./routes/auth.routes");
const User = require("./routes/user.routes");
const Ird = require("./routes/ird.routes");
const Satellite = require("./routes/satellite.routes");
const Polarization = require("./routes/polarization.routes");
const Contact = require("./routes/contact.routes");
const Channel = require("./routes/channel.routes");
const Signal = require("./routes/signal.routes");
const Tech = require("./routes/tipoTech.routes");
const Equipo = require("./routes/equipo.routes");
const TipoEquipo = require("./routes/tipoEquipo.routes");
const Audit = require("./routes/audit.routes");
const bulkIrdRoutes = require("./routes/bulkIrd.routes");
const servicesProxy = require("../utils/servicesProxy");


const app = express();


/** Confía en el proxy para obtener la IP real mediante X-Forwarded-* */
app.set("trust proxy", true);

app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

/** CORS con credenciales + preflight */
const allowed = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "https://localhost:3000",
  "http://192.168.56.1:5173",
];
app.use(
  cors({
    origin(origin, cb) {
      if (!origin) return cb(null, true); // Postman/cURL
      if (allowed.includes(origin)) return cb(null, true);
      return cb(new Error("Not allowed by CORS"));
    },
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

/** Responder siempre OPTIONS (preflight) */
app.options(
  "*",
  cors({
    origin: allowed,
    credentials: true,
  })
);

/** Popular req.user si hay token (suave, no bloquea).
 *  attachUserIfPresent no estorba; lo mantenemos por compat y lo complementamos con validateTokenMaybe.
 */
app.use(attachUserIfPresent);
app.use(validateTokenMaybe);

/** Auditar TODAS las requests (incluye /auth y anónimos) */
app.use(autoAudit());

/** Rutas de Auth SIN protectMutating (deben poder loguear/refresh/logout) */
app.use("/api/v2/auth", AuthRoutes);

app.use("/api/v2/proxy", servicesProxy);
/** Resto de rutas bajo /api/v2 con protección SOLO para métodos mutantes */
app.use(
  "/api/v2",
  protectMutating, // debe dejar pasar GET/HEAD/OPTIONS; bloquear mutantes si no hay permisos
  User,
  Ird,
  Satellite,
  Polarization,
  Signal,
  Contact,
  Channel,
  Tech,
  Equipo,
  TipoEquipo,
  Audit,
  bulkIrdRoutes
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy backend escuchando en http://localhost:${PORT}`);
  console.log(
    `Ruta proxy: http://localhost:${PORT}/proxy/services?host=172.19.14.118`
  );
});

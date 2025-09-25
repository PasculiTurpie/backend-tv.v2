// server.js
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
require("dotenv").config();
require("./config/config.mongoose");

const { attachUserIfPresent } = require("./middleware/attachUserIfPresent");
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
const Nodo = require("./routes/node.routes");
const Equipo = require("./routes/equipo.routes");
const TipoEquipo = require("./routes/tipoEquipo.routes");
const Audit = require("./routes/audit.routes");
const bulkIrdRoutes = require("./routes/bulkIrd.routes");

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

// Si alguna vez sirves detrás de proxy/HTTPS:
app.set("trust proxy", 1);

// --- CORS con credenciales + manejo de OPTIONS ---
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

// Responder siempre OPTIONS (preflight)
app.options(
  "*",
  cors({
    origin: allowed,
    credentials: true,
  })
);

// server.js (fragmento)
app.use(attachUserIfPresent); // opcional, no estorba

// 👇 /auth SIN protectMutating
app.use('/api/v2/auth', AuthRoutes);

// 👇 resto de rutas con protección SOLO a métodos mutantes
app.use(
  '/api/v2',
  protectMutating,    // debe dejar pasar GET/HEAD/OPTIONS
  autoAudit(),
  User,
  Ird,
  Satellite,
  Polarization,
  Signal,
  Contact,
  Channel,
  Tech,
  Nodo,
  Equipo,
  TipoEquipo,
  Audit,
  bulkIrdRoutes
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Escuchando el puerto ${PORT}`));

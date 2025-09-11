// server.js
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

require("dotenv").config();
require("./config/config.mongoose");

const { attachUserIfPresent } = require("./middleware/attachUserIfPresent");
const { autoAudit } = require("./middleware/autoAudit");

const AuthRoutes = require("./routes/auth.routes");
const User = require("./routes/user.routes");
const Ird = require("./routes/ird.routes");
const Satellite = require("./routes/satellite.routes");
const Polarization = require("./routes/polarization.routes");
const Conmutador = require("./routes/conmutador.routes");
const Dcm = require("./routes/dcm.routes");
const Titan = require("./routes/titan.routes");
const DcmVmx = require("./routes/dcmVmx.routes");
const RtesVmx = require("./routes/rtesVmx.routes");
const RouterAsr = require("./routes/routerAsr.routes");
const Contact = require("./routes/contact.routes");
const Channel = require("./routes/channel.routes");
const Signal = require("./routes/signal.routes");
const Tech = require("./routes/tipoTech.routes");
const Nodo = require("./routes/node.routes");
const Equipo = require("./routes/equipo.routes");
const TipoEquipo = require("./routes/tipoEquipo.routes");
const Audit = require("./routes/audit.routes");

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

app.use(
  cors({
    origin(origin, cb) {
      const allowed = [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:3000",
        "https://localhost:3000",
        "http://192.168.56.1:5173",
      ];
      if (!origin || allowed.includes(origin)) return cb(null, true);
      return cb(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// 1) Adjunta user si hay token (NO obliga auth)
app.use(attachUserIfPresent);

// 2) Auto-audit global (registrará todo lo que pase después)
app.use(autoAudit());

// 3) Rutas
app.use("/api/v2/auth", AuthRoutes);
app.use(
  "/api/v2",
  User,
  Ird,
  Satellite,
  Polarization,
  Conmutador,
  Dcm,
  Titan,
  DcmVmx,
  RtesVmx,
  RouterAsr,
  Signal,
  Contact,
  Channel,
  Tech,
  Nodo,
  Equipo,
  TipoEquipo,
  Audit
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Escuchando el puerto ${PORT}`));

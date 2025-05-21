const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const User = require("./routes/user.routes");
const Ird = require("./routes/ird.routes");
const Satellite = require("./routes/satellite.routes");
const Polarization = require("./routes/polarization.routes");
const Login = require("./routes/login.routes");
const Logout = require("./routes/logout.routes");
const VerifySession = require("./routes/verifyToken.routes");
const Conmutador = require('./routes/conmutador.routes');
const Dcm = require('./routes/dcm.routes')
const Titan = require('./routes/titan.routes')
const DcmVmx = require('./routes/dcmVmx.routes')
const RtesVmx = require('./routes/rtesVmx.routes')
const RouterAsr = require('./routes/routerAsr.routes')
const Contact = require('./routes/contact.routes')
const Channel = require('./routes/channel.routes')
const Signal = require('./routes/signal.routes')
const Tech = require('./routes/tipoTech.routes')
const errorHandler = require("./middleware/errorHandler");
const morgan = require("morgan");
require("dotenv").config();
const cookieParser = require("cookie-parser");

require("./config/config.mongoose");
// detecta el puerto 3000
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

const allowedOrigins = [
  "http://localhost:5174",
  "http://localhost:5173",
  "http://localhost:3000",
  "https://localhost:3000",
  "http://192.168.56.1:5173",
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Habilita el envío de cookies si es necesario
  })
);

app.use(
  "/api/v2",
  VerifySession,
  Login,
  Logout,
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
  errorHandler
);

app.listen(PORT, () => {
  // si todo funciona bien, la consola mostrará qué puerto está detectando la aplicación
  console.log(`Escuchando el puerto ${PORT}`);
});

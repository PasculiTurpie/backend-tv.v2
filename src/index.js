const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Equipo = require("./routes/equipo.routes");
const User = require("./routes/user.routes");
const Ird = require("./routes/ird.routes");
const morgan = require("morgan");

require("./config/config.mongoose");
// detecta el puerto 3000
const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*
const corsOptions = {
  origin: 'http://localhost:5174",
  method: ['GET','POST,'PATCH','PUT',''DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}

app.use(cors(corsOptions))
app.options('*', cors(corsOptions));
*/

app.use(morgan("dev"));

const allowedOrigins = [
  "http://localhost:5174",
  "http://localhost:5173",
  "http://localhost:3000",
  "https://localhost:3000",
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

app.options("*", cors()); // Maneja pre-flight requests
app.use(cors());

app.use("/api/v2", Equipo, User, Ird);

app.listen(PORT, () => {
  // si todo funciona bien, la consola mostrará qué puerto está detectando la aplicación
  console.log(`Escuchando el puerto ${PORT}`);
});

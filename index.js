const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
require("./config/config.mongoose")
// detecta el puerto 3000
const { PORT = 3000 } = process.env;
const Equipo = require('./routes/equipo.routes');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://localhost:3000',
];
app.use(cors({
  origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
      } else {
          callback(new Error('Not allowed by CORS'));
      }
  },
  methods: ['GET', 'POST','PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Habilita el envío de cookies si es necesario
}));

app.options('*', cors()); // Maneja pre-flight requests
app.use(cors());

app.use('/api/v2', Equipo);

app.listen(PORT, () => {
  // si todo funciona bien, la consola mostrará qué puerto está detectando la aplicación
  console.log(`Escuchando el puerto ${PORT}`);
})
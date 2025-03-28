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

app.use(cors());

app.use('/api/v2', Equipo);

app.listen(PORT, () => {
  // si todo funciona bien, la consola mostrará qué puerto está detectando la aplicación
  console.log(`Escuchando el puerto ${PORT}`);
})
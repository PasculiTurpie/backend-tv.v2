const express = require('express');
const bodyParser = require('body-parser');
require("./config/config.mongoose")
// detecta el puerto 3000
const { PORT = 3000 } = process.env;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', (req, res) => {
  res.json({
    message: 'Hola mundo',
    });
});
  

app.listen(PORT, () => {
  // si todo funciona bien, la consola mostrará qué puerto está detectando la aplicación
  console.log(`Escuchando el puerto ${PORT}`);
})
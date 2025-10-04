// CommonJS micro-servidor de proxy (SIN Mongo)
const express = require("express");
const cors = require("cors");
const servicesProxy = require("../utils/servicesProxy");

const app = express();

// CORS para Vite dev server
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Rutas del proxy
app.use("/proxy", servicesProxy); // => /proxy/services?host=...

// Salud
app.get("/health", (_req, res) => res.json({ ok: true, service: "proxy-only" }));

const PORT = process.env.PROXY_PORT || 3001;
app.listen(PORT, () => {
  console.log(`Proxy ONLY escuchando en http://localhost:${PORT}`);
  console.log(`Ejemplo: http://localhost:${PORT}/proxy/services?host=172.19.14.118`);
});

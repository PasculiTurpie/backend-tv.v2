// CommonJS router hacia hosts Titan
const express = require("express");
const router = express.Router();

// Si tu Node >=18 ya trae fetch global.
// Si tu Node <18, descomenta esto y añade node-fetch (npm i node-fetch)
// const fetch = (...args) => import("node-fetch").then(({ default: f }) => f(...args));

const USER = "Operator";
const PASS = "titan";
const PROTOCOL = "http"; // ajusta a "https" si corresponde

function b64(u, p) {
  return Buffer.from(`${u}:${p}`).toString("base64");
}

router.get("/services", async (req, res) => {
  const host = String(req.query.host || "").trim();
  if (!host) return res.status(400).json({ error: "Falta parámetro 'host'" });

  const url = `${PROTOCOL}://${host}/api/v1/servicesmngt/services`;

  console.log(url)

  try {
    const r = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Basic ${b64(USER, PASS)}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      // Si el destino fuera HTTPS con certificado self-signed:
      // agent: new (require("https").Agent)({ rejectUnauthorized: false })
    });

    // Devuelve JSON si es posible; si no, texto
    const text = await r.text();
    try {
      const json = JSON.parse(text);
      return res.status(r.status).json(json);
    } catch {
      return res.status(r.status).send(text);
    }
  } catch (e) {
    return res.status(502).json({ error: String(e?.message || e) });
  }
});

// Exporta middleware válido (NO export default)
module.exports = router;

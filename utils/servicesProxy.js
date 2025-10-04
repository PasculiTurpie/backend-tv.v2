// CommonJS router hacia hosts Titan
const express = require("express");
const router = express.Router();

// Node >=18 trae fetch global. Si Node <18, instala node-fetch y descoméntalo:
// const fetch = (...args) => import("node-fetch").then(({ default: f }) => f(...args));

const USER = "Operator";
const PASS = "titan";
const PROTOCOL = "http"; // cambia a "https" si corresponde

function b64(u, p) {
  return Buffer.from(`${u}:${p}`).toString("base64");
}

router.get("/services", async (req, res) => {
  const host = String(req.query.host || "").trim();
  if (!host) return res.status(400).json({ error: "Falta parámetro 'host'" });

  const url = `${PROTOCOL}://${host}/api/v1/servicesmngt/services`;

  try {
    const r = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Basic ${b64(USER, PASS)}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      }
      // Si fuera HTTPS self-signed:
      // , agent: new (require("https").Agent)({ rejectUnauthorized: false })
    });

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

module.exports = router;

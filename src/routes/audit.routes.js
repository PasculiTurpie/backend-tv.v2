const express = require("express");
const router = express.Router();
const { getAuditLogs } = require("../controllers/audit.controller");

// Si tienes un middleware de auth/roles, úsalo aquí (p.ej. solo admin):
// router.use(require("../middlewares/requireAdmin"));

router.get("/audit", getAuditLogs);

module.exports = router;

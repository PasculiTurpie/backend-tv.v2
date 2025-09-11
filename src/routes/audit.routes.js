const express = require("express");
const router = express.Router();
const { getAuditLogs, exportAuditCSV } = require('../controllers/audit.controller')
const { authProfile } = require('../middleware/validateToken');

// Si tienes un middleware de auth/roles, úsalo aquí (p.ej. solo admin):
// router.use(require("../middlewares/requireAdmin"));

router.get("/audit", getAuditLogs);

// Export CSV con los mismos filtros
router.get("/audit/export", authProfile, exportAuditCSV);

module.exports = router;

// routes/auth.routes.js
/* const { Router } = require("express");
const router = Router(); */

const express = require("express");
const router = express.Router();

const User = require("../controllers/login.controller"); // o tu controlador real
const { authProfile } = require("../middleware/validateToken");
const { autoAudit } = require("../middleware/autoAudit");

// OJO: si usas autoAudit global en server.js, no lo repitas aquí
// const { autoAudit } = require("../middleware/autoAudit");

// POST /api/v2/auth/login
router.post("/login", autoAudit("login"), User.login);

// POST /api/v2/auth/logout (protegida)
router.post("/logout", authProfile, autoAudit("logout"), User.logout);

// GET /api/v2/auth/profile (protegida)
router.get("/profile", authProfile, autoAudit("read"), User.profile);

module.exports = router;

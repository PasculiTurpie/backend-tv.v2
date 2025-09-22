const express = require("express");
const { login, refresh, logout } = require("../controllers/auth.controller.js");
const { authRequired } = require("../middleware/authRequired.js");

const router = express.Router();

router.post("/auth/login", login);
router.post("/auth/refresh", refresh);
router.get("/auth/me", authRequired, (req, res) =>
  res.json({ ok: true, user: req.user })
);
router.post("/auth/logout", logout);

module.exports = router;

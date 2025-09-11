const express = require('express')
const User = require('../controllers/login.controller');
const router = express.Router();
const { authProfile } = require('../middleware/validateToken');



router.post("/auth/login", User.login);
router.post("/auth/logout",authProfile, User.logout);
router.get("/auth/profile", authProfile, User.profile);

module.exports = router;
const express = require('express')
const User = require('../controllers/login.controller');
const router = express.Router();
const { authProfile } = require('../middleware/validateToken');


router.post("/login", User.login);
router.get("/logout",authProfile, User.logout);

module.exports = router;
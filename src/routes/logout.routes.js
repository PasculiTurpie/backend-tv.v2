const express = require('express')
const User = require('../controllers/login.controller');
const { authProfile } = require('../middleware/validateToken');
const router = express.Router();


router.post("/logout", authProfile, User.logout);

module.exports = router;
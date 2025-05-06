const express = require('express')
const User = require('../controllers/login.controller');
const auth = require('../config/auth');
const router = express.Router();


router.post('/logout', auth, User.logout)

module.exports = router;
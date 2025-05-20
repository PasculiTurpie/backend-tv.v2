const express = require('express')
const User = require('../controllers/login.controller');
const auth = require('../config/auth');
const router = express.Router();


router.post('/logout', User.logout)

module.exports = router;
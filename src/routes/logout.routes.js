const express = require('express')
const User = require('../controllers/login.controller');
const router = express.Router();


router.post('/logout', User.logout)

module.exports = router;
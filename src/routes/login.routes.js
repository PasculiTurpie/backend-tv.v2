const express = require('express')
const User = require('../controllers/login.controller');
const router = express.Router();
const { authProfile } = require('../middleware/validateToken');


router.post('/login', User.login)
router.get("/logout", User.logout);
router.get('/profile',authProfile, User.profile)

module.exports = router;
const express = require('express')
const User = require('../controllers/user.controller');
const router = express.Router();

router.get('/user', User.getAllUser);

router.post("/user", User.createUser);


module.exports = router;
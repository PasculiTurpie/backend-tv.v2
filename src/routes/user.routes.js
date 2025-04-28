const express = require('express')
const User = require('../controllers/user.controller');
const router = express.Router();

router.get('/user', User.getAllUser);
router.get('/user/:id', User.getUserId);
router.post("/user", User.createUser);
router.put('/user/:id')
router.delete('/user/:id')


module.exports = router;
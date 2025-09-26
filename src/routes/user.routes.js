const express = require('express')
const User = require('../controllers/user.controller');


const router = express.Router();

router.get("/users", User.getAllUser);
router.get("/user/:id", User.getUserId);
router.post("/user",  User.createUser);
router.delete("/user/:id",  User.deleteUser);
router.put("/user/:id",  User.updateUser);

module.exports = router;
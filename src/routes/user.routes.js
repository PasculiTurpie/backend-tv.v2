const express = require('express')
const User = require('../controllers/user.controller');
const { authProfile } = require('../middleware/validateToken');

const router = express.Router();

router.get("/users", User.getAllUser);
router.get("/user/:id", User.getUserId);
router.post("/user", authProfile, User.createUser);
router.delete("/user/:id", authProfile, User.deleteUser);
router.put("/user/:id", authProfile, User.updateUser);

router.get("/me", authProfile, User.getUserById);


module.exports = router;
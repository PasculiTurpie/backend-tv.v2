const express = require("express");
const router = express.Router();
const auth = require("../config/auth");

router.get("/verify-session",  (req, res) => {
  res.json({user:req.user})
});

module.exports = router;
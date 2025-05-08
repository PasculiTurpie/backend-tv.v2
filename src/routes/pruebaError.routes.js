const express = require("express");
const router = express.Router();

router.get("/prueba", async (req, res, next) => {
  next(new Error('Error intencional'))
});

module.exports = router;

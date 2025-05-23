const express = require('express')

const router = express.Router();

router.get('/nodo', (req, res) => {
  res.status(200).json({
    message:'Este es el nodo'
  })
})


module.exports = router;
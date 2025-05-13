const express = require('express')
const router = express.Router()
const Contact = require('../controllers/contact.controller')

router.get('/contact', Contact.getContact)
router.post('/contact', Contact.createContact)

module.exports = router
const express = require('express')
const router = express.Router()
const Contact = require('../controllers/contact.controller')
const { authProfile } = require('../middleware/validateToken')

router.get('/contact',Contact.getContact)
router.post('/contact',authProfile, Contact.createContact)
router.get("/contact/:id", Contact.getIdContact);
router.put("/contact/:id",authProfile, Contact.updateContact);
router.delete("/contact/:id", authProfile, Contact.deleteContact);


module.exports = router
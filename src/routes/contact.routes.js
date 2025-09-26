const express = require('express')
const router = express.Router()
const Contact = require('../controllers/contact.controller')
const { authProfile } = require('../middleware/validateToken')

router.get('/contact',Contact.getContact)
router.post('/contact', Contact.createContact)
router.get("/contact/:id", Contact.getIdContact);
router.put("/contact/:id", Contact.updateContact);
router.delete("/contact/:id",  Contact.deleteContact);


module.exports = router
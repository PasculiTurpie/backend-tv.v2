const express = require("express");
const ContactController = require("../controllers/contact.controller");

const router = express.Router();

const CONTACT_COLLECTION_ROUTES = ["/contacts", "/contact"];
const CONTACT_ENTITY_ROUTES = ["/contacts/:id", "/contact/:id"];

CONTACT_COLLECTION_ROUTES.forEach((path) => {
  router.get(path, ContactController.getContact);
  router.post(path, ContactController.createContact);
});

CONTACT_ENTITY_ROUTES.forEach((path) => {
  router.get(path, ContactController.getIdContact);
  router.put(path, ContactController.updateContact);
  router.delete(path, ContactController.deleteContact);
});

module.exports = router;

const express = require("express");
const IrdController = require("../controllers/ird.controller");

const router = express.Router();

const IRD_COLLECTION_ROUTES = ["/irds", "/ird"];
const IRD_ENTITY_ROUTES = ["/irds/:id", "/ird/:id"];

IRD_COLLECTION_ROUTES.forEach((path) => {
  router.get(path, IrdController.getIrd);
  router.post(path, IrdController.createIrd);
});

IRD_ENTITY_ROUTES.forEach((path) => {
  router.get(path, IrdController.getIdIrd);
  router.put(path, IrdController.updateIrd);
  router.delete(path, IrdController.deleteIrd);
});

module.exports = router;

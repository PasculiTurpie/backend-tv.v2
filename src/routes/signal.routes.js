const express = require("express");
const SignalController = require("../controllers/signal.controller");

const router = express.Router();

const SIGNAL_COLLECTION_ROUTES = ["/signals", "/signal"];
const SIGNAL_ENTITY_ROUTES = ["/signals/:id", "/signal/:id"];
const SIGNAL_SEARCH_ROUTES = ["/signals/search", "/signal/search"];

SIGNAL_COLLECTION_ROUTES.forEach((path) => {
  router.get(path, SignalController.getSignal);
  router.post(path, SignalController.createSignal);
});

SIGNAL_ENTITY_ROUTES.forEach((path) => {
  router.get(path, SignalController.getIdSignal);
  router.put(path, SignalController.updateSignal);
  router.delete(path, SignalController.deleteSignal);
});

SIGNAL_SEARCH_ROUTES.forEach((path) => {
  router.get(path, SignalController.searchSignals);
});

module.exports = router;

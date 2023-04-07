const express = require("express");
const {
  docterRegisterController,
  docterLoginController,
  addDocterUnavailabilityController,
  getDocterController,
} = require("../controllers/docter");
const docAuth = require("../middlewares/docterAuth");
const router = new express.Router();

router.post("/doc-register", docterRegisterController);
router.post("/doc-login", docterLoginController);
router.post("/add-unavailablity", docAuth, addDocterUnavailabilityController);
router.get("/doctor", docAuth, getDocterController);

module.exports = router;

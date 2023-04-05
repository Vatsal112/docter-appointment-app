const express = require("express");
const {
  docterRegisterController,
  docterLoginController,
} = require("../controllers/docter");
const router = new express.Router();

router.post("/doc-register", docterRegisterController);
router.post("/doc-login", docterLoginController);

module.exports = router;

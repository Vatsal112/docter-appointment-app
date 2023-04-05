const express = require("express");
const { registerController, loginController } = require("../controllers/user");
const router = new express.Router();

router.post("/user-register", registerController);
router.post("/user-login", loginController);

module.exports = router;

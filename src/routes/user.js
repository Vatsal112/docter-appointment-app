const express = require("express");
const {
  registerController,
  loginController,
  docterSearchController,
  getUserController,
} = require("../controllers/user");
const router = new express.Router();
const auth = require("../middlewares/userAuth");

router.post("/user-register", registerController);
router.post("/user-login", loginController);
router.get("/search-doctor", auth, docterSearchController);
router.get("/user", auth, getUserController);

module.exports = router;

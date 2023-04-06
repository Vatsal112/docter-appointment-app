const express = require("express");
const auth = require("../middlewares/userAuth");
const { addAppointmentController } = require("../controllers/appointment");
const router = new express.Router();

router.post("/add-appointment", auth, addAppointmentController);

module.exports = router;

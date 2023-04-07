const express = require("express");
const auth = require("../middlewares/userAuth");
const {
  addAppointmentController,
  cancelAppointmentController,
} = require("../controllers/appointment");
const router = new express.Router();

router.post("/add-appointment", auth, addAppointmentController);
router.put("/appointment/:id/cancel", auth, cancelAppointmentController);

module.exports = router;

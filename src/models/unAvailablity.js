const mongoose = require("mongoose");
const validator = require("validator");

const unAvailablitySchema = mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Docters",
  },
  unAvailablityDate: {
    type: String,
    required: true,
  },
  unAvailablityTimeFrom: {
    type: String,
    required: true,
  },
  unAvailablityTimeTo: {
    type: String,
    required: true,
  },
});

const unAvailablityModel = mongoose.model(
  "UnAvailability",
  unAvailablitySchema
);
module.exports = unAvailablityModel;

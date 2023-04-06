const mongoose = require("mongoose");
const validator = require("validator");

const daysSchema = mongoose.Schema({
  day: {
    type: String,
  },
});

const daysModel = mongoose.model("Days", daysSchema);
module.exports = daysModel;

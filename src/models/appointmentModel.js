const mongoose = require("mongoose");
const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Docters",
    },
    doctorInfo: {
      type: Object,
      required: true,
    },
    userInfo: {
      type: Object,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const appointmentModel = mongoose.model("Appointments", appointmentSchema);
module.exports = appointmentModel;

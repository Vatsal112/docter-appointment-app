const mongoose = require("mongoose");
const validator = require("validator");

const docterSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 7,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error('Password cannot be same as "password"!!');
        }
      },
    },
    phoneNumber: {
      type: String,
      minlength: 10,
      required: true,
    },
    website: {
      type: String,
    },
    address: {
      type: Object,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    feePerCunsultation: {
      type: Number,
      required: true,
    },
    unAvailablityDayIds: {
      type: Array,
    },
    serviceStartTime: {
      type: String,
      required: true,
    },
    serviceEndTime: {
      type: String,
      required: true,
    },
    serviceBreakTimeStart: {
      type: String,
      required: true,
    },
    serviceBreakTimeEnd: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const doctorModel = mongoose.model("Doctors", docterSchema);
module.exports = doctorModel;

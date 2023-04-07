const config = require("../configs/config");
const Appointment = require("../models/appointmentModel");
const Docter = require("../models/docterModel");
const User = require("../models/userModel");
const Unavailablity = require("../models/unAvailablity");
const jwt = require("jsonwebtoken");

const addAppointmentService = async (params) => {
  try {
    const docInfo = await Docter.findOne({ _id: params.doctorId });
    const userInfo = await User.findOne({ _id: params.userId });

    params.doctorInfo = {
      firstName: docInfo.firstName,
      lastName: docInfo.lastName,
      address: docInfo.address,
      feePerConsultation: docInfo.feePerConsultation,
      specialization: docInfo.specialization,
      unAvailablityDayIds: docInfo.unAvailablityDayIds,
      serviceStartTime: docInfo.serviceStartTime,
      serviceEndTime: docInfo.serviceEndTime,
      serviceBreakTimeStart: docInfo.serviceBreakTimeStart,
      serviceBreakTimeEnd: docInfo.serviceBreakTimeEnd,
    };
    params.userInfo = {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      address: userInfo.address,
      age: userInfo.age,
    };
    const checkDocAvailability = await Unavailablity.find({
      doctorId: params.doctorId,
    });

    if (checkDocAvailability) {
      for (let i = 0; i < checkDocAvailability.length; i++) {
        if (checkDocAvailability[i].unAvailablityDate === params.date) {
          if (
            checkDocAvailability[i].unAvailablityTimeFrom > params.time.from &&
            checkDocAvailability[i].unAvailablityTimeTo < params.time.to
          ) {
            const appointment = new Appointment(params);
            const data = await appointment.save();
            return {
              status: 200,
              data: data,
            };
          } else if (
            checkDocAvailability[i].unAvailablityTimeFrom < params.time.from &&
            checkDocAvailability[i].unAvailablityTimeTo > params.time.to
          ) {
            const appointment = new Appointment(params);
            const data = await appointment.save();
            return {
              status: 200,
              data: data,
            };
          } else {
            return {
              status: 400,
              message:
                "Doctor is not available in this time slot. Please choose different time slot",
            };
          }
        } else {
          const appointment = new Appointment(params);
          const data = await appointment.save();
          return {
            status: 200,
            data: data,
          };
        }
      }
    }
  } catch (error) {
    return {
      status: 500,
      message: error,
    };
  }
};

const cancelAppointmentService = async (id) => {
  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return {
        status: 400,
        message: "Appointment not found",
      };
    }

    await Appointment.findByIdAndUpdate(id, {
      status: "cancelled",
    });

    return {
      status: 200,
      message: "Appointment cancelled successfully",
    };
  } catch (error) {
    return {
      status: 500,
      message: error,
    };
  }
};

module.exports = { addAppointmentService, cancelAppointmentService };

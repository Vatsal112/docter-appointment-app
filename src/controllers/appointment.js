const {
  addAppointmentService,
  cancelAppointmentService,
} = require("../services/appointment");

const addAppointmentController = async (req, res) => {
  const response = await addAppointmentService(req.body);
  res.status(response.status).send(response);
};

const cancelAppointmentController = async (req, res) => {
  const response = await cancelAppointmentService(req.params.id);
  res.status(response.status).send(response);
};

module.exports = { addAppointmentController, cancelAppointmentController };

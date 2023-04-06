const { addAppointmentService } = require("../services/appointment");

const addAppointmentController = async (req, res) => {
  const response = await addAppointmentService(req.body);
  res.status(response.status).send(response);
};

module.exports = { addAppointmentController };

const {
  docterRegisterService,
  docterLoginService,
  addDocterUnavailabilityService,
  getDocterService,
} = require("../services/docter");
const { getUserService } = require("../services/user");

const docterRegisterController = async (req, res, next) => {
  const response = await docterRegisterService(req.body);
  res.status(response?.status).send(response);
};

const docterLoginController = async (req, res, next) => {
  const response = await docterLoginService(req.body);
  res.status(response?.status).send(response);
};

const addDocterUnavailabilityController = async (req, res, next) => {
  const response = await addDocterUnavailabilityService(req.body);
  res.status(response?.status).send(response);
};

const getDocterController = async (req, res, next) => {
  const response = await getDocterService(req.id);
  res.status(response?.status).send(response);
};
module.exports = {
  docterRegisterController,
  docterLoginController,
  addDocterUnavailabilityController,
  getDocterController,
};

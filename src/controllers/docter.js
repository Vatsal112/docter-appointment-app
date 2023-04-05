const {
  docterRegisterService,
  docterLoginService,
} = require("../services/docter");

const docterRegisterController = async (req, res, next) => {
  const response = await docterRegisterService(req.body);
  res.status(response?.status).send(response);
};

const docterLoginController = async (req, res, next) => {
  const response = await docterLoginService(req.body);
  res.status(response?.status).send(response);
};

module.exports = { docterRegisterController, docterLoginController };

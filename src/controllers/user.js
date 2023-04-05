const { registerService, loginService } = require("../services/user");

const registerController = async (req, res, next) => {
  let response = await registerService(req.body);
  res.status(response.status).send(response);
};

const loginController = async (req, res, next) => {
  let response = await loginService(req.body);
  res.status(response.status).send(response);
};

module.exports = { registerController, loginController };

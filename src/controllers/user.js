const {
  registerService,
  loginService,
  docterSearchService,
  getUserService,
} = require("../services/user");

const registerController = async (req, res) => {
  let response = await registerService(req.body);
  res.status(response.status).send(response);
};

const loginController = async (req, res) => {
  let response = await loginService(req.body);
  res.status(response.status).send(response);
};

const docterSearchController = async (req, res) => {
  let response = await docterSearchService(req.body);
  res.status(response.status).send(response);
};

const getUserController = async (req, res) => {
  let response = await getUserService(req.id);
  res.status(response.status).send(response);
};
module.exports = {
  registerController,
  loginController,
  docterSearchController,
  getUserController,
};

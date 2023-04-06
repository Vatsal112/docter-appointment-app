const jwt = require("jsonwebtoken");
const Docter = require("../models/docterModel");
const config = require("../configs/config");

const docAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decode = jwt.verify(token, config.JWT_SECRET);

    const user = await Docter.findOne({
      _id: decode._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    res.status(401).send({ error: "Unauthorized" });
  }
};

module.exports = docAuth;

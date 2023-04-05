const config = require("../configs/config");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const registerService = async (params) => {
  try {
    const isEmailTaken = await User.findOne({ email: params.email });
    if (!isEmailTaken) {
      params.password = await bcrypt.hash(params.password, 8);
      const user = new User(params);
      const data = await user.save();
      if (data) {
        return {
          status: 200,
          message: "registered successfully",
          data: data,
        };
      } else {
        return {
          status: 404,
          message: "error while registering",
        };
      }
    } else {
      return {
        status: 404,
        message: "email is already registered",
      };
    }
  } catch (error) {
    return {
      status: 500,
      message: error,
    };
  }
};

const loginService = async (params) => {
  try {
    const isEmailTaken = await User.findOne({ email: params.email });
    if (isEmailTaken) {
      const token = jwt.sign({ _id: isEmailTaken?._id }, config.JWT_SECRET, {
        expiresIn: "24h",
      });
      const isMatch = await bcrypt.compare(
        params.password,
        isEmailTaken.password
      );
      if (!isMatch) {
        return {
          status: 404,
          message: "Password is incorrect",
        };
      }
      return {
        status: 200,
        token: token,
      };
    } else {
      return {
        status: 404,
        message: "this email is not registered",
      };
    }
  } catch (error) {
    return {
      status: 500,
      message: error,
    };
  }
};
module.exports = { registerService, loginService };

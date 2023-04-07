const config = require("../configs/config");
const User = require("../models/userModel");
const Docter = require("../models/docterModel");
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

const docterSearchService = async (params) => {
  try {
    const search = [];
    if (params.area) {
      search.push({
        "address.area": params?.area,
      });
    } else if (params.line) {
      search.push({
        "address.line-1": params?.line,
      });
    } else if (params.city) {
      search.push({
        "address.city": params?.city,
      });
    } else if (params.pincode) {
      search.push({
        "address.pincode": params?.pincode,
      });
    } else if (params.specialty) {
      search.push({
        specialization: params?.specialty,
      });
    }
    const data = await Docter.find({
      $and: search,
    });
    if (data.length > 0) {
      return {
        status: 200,
        data: data,
      };
    } else {
      return {
        status: 400,
        message: "No docters found",
      };
    }
  } catch (error) {
    return {
      status: 500,
      message: error,
    };
  }
};

const getUserService = async (id) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      return {
        status: 404,
        message: "Something went wrong while getting user",
      };
    }

    return {
      status: 200,
      data: user,
    };
  } catch (error) {
    return {
      status: 500,
      message: error,
    };
  }
};
module.exports = {
  registerService,
  loginService,
  docterSearchService,
  getUserService,
};

// const mongoose = require("mongoose");
import * as mongoose from "mongoose";
// const { config } = require("../configs/config.js");
import { config } from "../configs/config.js";
export const connect = mongoose.connect(config.MONGODB_URL, {
  autoIndex: true,
});

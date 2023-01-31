import mongoose from "mongoose";
import config from "../config.js";
import User from "./User.js";

mongoose.set("strictQuery", true);

mongoose
  .connect(config.getDbConn("test"))
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("Error connecting to DB", err);
  });

const controller = {
  getUsers() {
    return User.find();
  },
};

export default controller;

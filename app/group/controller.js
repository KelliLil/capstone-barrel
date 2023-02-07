import mongoose from "mongoose";
import config from "../config.js";
import User from "./user/User.js";

mongoose.set("strictQuery", true);
mongoose
  .connect(config.dbConn)
  .then(() => {
    console.info("Connected to the database");
  })
  .catch((err) => {
    console.error("Error connecting to the database", err);
  });

const groupController = {
  getUsers() {
    return User.find();
  },
  versionKey: false,
  getUser(id) {
    return User.findById(id);
  },

  deleteById(id2Delete) {
    if (mongoose.Types.ObjectId.isValid(id2Delete)) {
      return User.findByIdAndDelete(id2Delete);
    }
  },
};

export default groupController;

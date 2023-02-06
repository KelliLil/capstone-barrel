import mongoose from "mongoose";
import config from "../config.js";
import User from "./User.js";

mongoose.set("strictQuery", true);
mongoose
  .connect(config.dbConn)
  .then(() => {
    console.info("Connected to the database");
  })
  .catch((err) => {
    console.error("Error connecting to the database", err);
  });

const controller = {
  getUsers() {
    return User.find();
  },

  getUser(id) {
    return User.findById(id);
  },

  deleteById(id2Delete) {
    if (mongoose.Types.ObjectId.isValid(id2Delete)) {
      return User.findByIdAndDelete(id2Delete);
    }
  },

  deleteByUsername(username2Delete) {
    return User.deleteOne({ username: username2Delete });
  },

  create(username, password) {
    return User.create({ username, password });
  },

  async login(username, password) {
    const loggedInUser = await User.login(username, password);
    return loggedInUser;
  },

  updateById(id, updatedName) {
    return User.findByIdAndUpdate(
      id,
      { name: updatedName },
      {
        runValidators: true,
        returnDocument: "after",
      }
    );
  },
};

// const loggedInUser = await userController.login("john", "123456");
// console.log(loggedInUser);

export default controller;

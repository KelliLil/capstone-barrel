import mongoose from "mongoose";
import config from "../config.js";
import User from "./User.js";

mongoose.set("strictQuery", true);

mongoose
  .connect(config.getDbConn("user"))
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
  };
const controller = {
  getUsers() {
    return User.find();
  },

  createUser(user) {
    return User.create(user);
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

const deleteUser = await controller.deleteById("63dc172370eb2e920d171059");

console.log(deleteUser);

export default controller;

export default userController;

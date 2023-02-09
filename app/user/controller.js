import mongoose from "mongoose";
import User from "./User.js";

const controller = {
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

  deleteByUsername(username2Delete) {
    return User.deleteOne({ username: username2Delete });
  },

  // 'newUser' is an object with the following properties:
  // name, email, password, username, dietRestrictions
  create({ newUser }) {
    return User.create(newUser);
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

export default controller;

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

const newUser = await User.create({
  name: "John Doe",
  email: "mark@west.clm",
  password: "password",
  username: "markwest",
});

console.log(newUser);

export default controller;

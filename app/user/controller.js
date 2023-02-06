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
};

const newUser = await controller.createUser({
  name: "Guy Dude",
  email: "guydude@stuff.com",
  password: "password",
  dietRestrictions: ["gluten", "dairy"],
  groupsJoined: [],
});

const foundUser = await controller.getUser("63e11a13a6e0a46655352477");
console.log(foundUser);

export default controller;

export default userController;

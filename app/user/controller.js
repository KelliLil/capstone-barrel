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

console.log(newUser);

export default controller;

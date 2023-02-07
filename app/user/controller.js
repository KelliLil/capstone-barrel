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
  versionKey: false,

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

// const newUser = await controller.create({
//   name: "Joe Jackson",
//   password: "password",
//   email: "joe@joe.com",
//   username: "joejoe",
//   dietRestrictions: ["vegan", "gluten-free"],
//   groupsJoined: [
//     {
//       date: 1 / 1 / 2021,
//       groupName: "Group 1",
//       voting: [
//         {
//           cuisineType: "Italian",
//           votes: 1,
//         },
//       ],
//     },
//   ],
//   isAdmin: true,
// }).catch;

// console.log(newUser);

// const loggedInUser = await userController.login("john", "123456");
// console.log(loggedInUser);

export default controller;

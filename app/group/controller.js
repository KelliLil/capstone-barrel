import mongoose from "mongoose";
import config from "../config.js";
import Group from "./Group.js";

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
  getGroups() {
    // The group/groups has the user info embedded in it
    return Group.find();
  },

  // 'newGroup' is an object with the following properties:
  // date, groupName, admin (a user from the user collection - whoever is logged in)
  create({ newGroup }) {
    // TODO: Validate the admin is a valid user - confirm that the user exists in the user collection
    return Group.create(newGroup);
  },
};

const newGroup = await Group.create({
  date: "2021-03-01",
  groupName: "Group 2",
  admin: {
    username: "peterparker",
    _id: "63e279acf37f3ca25e980179",
  },
});

console.log(newGroup);

export default groupController;

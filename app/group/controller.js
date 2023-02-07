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
    return Group.find();
  },

  create({ newGroup }) {
    // TODO: Validate the admin is a valid user - confirm that the user exists in the user collection
    return Group.create(newGroup);
  },

  updateGroupMembers({ groupName, newMembers }) {
    return Group.findOneAndUpdate({ groupName }, { members: newMembers });
  },
};

const groupMember = await groupController.updateGroupMembers({
  groupName: "Group 1",
  newMembers: [
    {
      name: "John Doe",
    },
    {
      name: "Jane Doe",
    },
  ],
});

console.log(groupMember);

export default groupController;

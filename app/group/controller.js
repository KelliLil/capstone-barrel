import mongoose from "mongoose";
import config from "../config.js";
import controller from "../user/controller.js";
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

  async updateVoteTally({ groupName, newVoteTally }) {
    const foundGroup = await Group.findOneAndUpdate(groupName);
    if (foundGroup) {
      foundGroup.voting.push(newVoteTally);
      return foundGroup.save();
    }
  },
};

const newVote = await controller.updateVoteTally({
  groupName: "Group 1",
  newVoteTally: {
    voting: 1,
    cuisineType: "Italian",
  },
});

console.log(newVote);

export default groupController;

import mongoose from "mongoose";
import config from "../config.js";
import Group from "./Group.js";

mongoose.set("strictQuery", true);
mongoose
  .connect(config.dbConn)
  .then(() => {
    console.info("Connected to the DB");
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

  // Add a new member to the group
  async updateGroupMembers({ groupName, newMember }) {
    const groups = await this.getGroups();
    const group2Update = groups.find((group) => group.groupName === groupName);

    // TODO: Validate the new member is a valid user - confirm that the user exists in the user collection
    // TODO: Validate that the new member is not already in the group

    group2Update.members.push(newMember);
    return group2Update.save();
  },

  // Update the vote tally for a group member
  // async updateVoteTally(memberId, vote) {
  //   try {
  //     const item = await Group.members.findById(memberId);
  //     if (item) throw new Error("Item not found");

  //     // TODO: Update this in the schema to use this name
  //     // TODO: Use push to add the new vote to the array
  //     // TODO: Before pushing a new vote, check if the user has already voted for this category
  //     // TODO: If the user has already voted, throw an error ("You have already voted for this category")
  //     // TODO: If the category already exists, update the vote tally ELSE add a new category with a vote tally of 1
  //     item.votes = item.votes + vote;
  //     await item.save();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // },
};

const addMember = await groupController.updateGroupMembers({
  groupName: "Group 1",
  newMember: {
    username: "user1",
    name: "Please work",
    _id: "63e279acf37f3ca25e980179",
  },
});

console.log(addMember);

export default groupController;

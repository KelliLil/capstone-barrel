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

  getGroup(groupId) {
    return Group.findById(groupId);
  },

  // create({ newGroup }) {
  //   const user = await User.findOne({ _id: newGroup.admin });
  //   if (!user) {
  //     throw new Error("The admin is not a valid user.");
  //   }
  //   if (!user.isAdmin) {
  //     throw new Error("The admin does not have sufficient privileges.");
  //   }
  //   return Group.create(newGroup);
  // }
  create({ newGroup }) {
    // TODO: Validate the admin is a valid user - confirm that the user exists in the user collection
    return Group.create(newGroup);
  },

  // Add a new member to the group
  async updateGroupMembers({ groupName, newMember }) {
    // TODO: Shorten this to a single query using this.getGroup()
    const groups = await this.getGroups();
    const group2Update = groups.find((group) => group.groupName === groupName);

    // TODO: Validate the new member is a valid user - confirm that the user exists in the user collection
    // TODO: Validate that the new member is not already in the group

    group2Update.members.push(newMember);
    return group2Update.save();
  },

  // Update the vote tally for a group member
  async updateVoteTally(groupId, incomingVote) {
    // This is the group that the user is voting for
    const group = await this.getGroup(groupId);
    if (!group) throw new Error("Item not found");

    // This will be undefined if the vote does not exist
    const voteForCategory = group.votes.find(
      (vote) => vote.cuisineType === incomingVote.cuisineType
    ) || {
      cuisineType: incomingVote.cuisineType,
      voters: [{ _id: incomingVote.memberId, username: incomingVote.username }],
    };

    group.votes.push(voteForCategory);

    return group.save();
  },
};

// TODO: fix to where a new id for user is not generated

const voteResults = await groupController.updateVoteTally(
  "63e28831c3210f3a9752a80e",
  {
    cuisineType: "Mexican",
    memberId: "63e2a7e7b365f40fbce2acb5",
    username: "Peter Pan",
  }
);

console.log(voteResults, "VOTE RESULTS");

export default groupController;

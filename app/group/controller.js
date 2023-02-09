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

    let votesCategory = group.votes.find(
      (vote) => vote.cuisineType === incomingVote.cuisineType
    );

    // If the votesCategory does not exist create it
    if (!votesCategory) {
      votesCategory = {
      cuisineType: incomingVote.cuisineType,
        voters: [],
    };

      group.votes.push(votesCategory);
    }

    // Otherwise, update the existing votesCategory
    const existingVoter = votesCategory.voters.find(
      (voter) => voter._id.toString() === incomingVote.memberId
      );

    if (existingVoter) {
      throw new Error("You have already voted for this category");
    }

    votesCategory.voters.push(incomingVote);

    return group.save();
  },
};

// const newGroup = await groupController.createNewGroup({
//   newGroup: {
//     date: new Date("01-01-2040"),
//     groupName: "Test Group",
//     admin: {
//       _id: "63e274b8e571be5c8417ddb1",
//     },
//   },
// });

// console.log(newGroup);

const voteResults = await groupController.updateVoteTally(
  "63e50a52f211b00b05530d2d",
  {
    cuisineType: "Mexican",
    _id: "63e11a13a6e0a46655352477",
    username: "Someone else",
  }
);

console.log(voteResults, "VOTE RESULTS");

export default groupController;

import Group from "./Group.js";

const groupController = {
  getGroups() {
    return Group.find();
  },

  getGroup(groupId) {
    return Group.findById(groupId);
  },

  createNewGroup({ newGroup }) {
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

export default groupController;

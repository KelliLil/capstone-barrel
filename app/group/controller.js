import Group from "./Group.js";

const groupController = {
  getGroups() {
    return Group.find();
  },

  getGroup(groupId) {
    return Group.findById(groupId);
  },

  createNewGroup({ newGroup }) {
    return Group.create(newGroup);
  },

  async addNewMember2Group(groupId, newMember) {
    const group2Update = await Group.findById(groupId);

    if (!group2Update) throw new Error("Group not found");

    // TODO: Validate the new member is a valid user - confirm that the user exists in the user collection
    // TODO: Validate that the new member is not already in the group

    group2Update.members.push(newMember);
    return group2Update.save();
  },

  async updateVoteTally(groupId, incomingVote) {
    const group = await this.getGroup(groupId);
    if (!group) throw new Error("Item not found");

    let votesCategory = group.votes.find(
      (vote) => vote.cuisineType === incomingVote.cuisineType
    );

    if (!votesCategory) {
      votesCategory = {
        cuisineType: incomingVote.cuisineType,
        voters: [],
      };

      group.votes.push(votesCategory);
    }

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

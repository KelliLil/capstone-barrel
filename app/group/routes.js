import { Router } from "express";
import groupController from "./controller.js";

const router = new Router();

// Get all groups - /api/groups
router.get("/", (_, res) => {
  groupController.getGroups().then((groups) => {
    res.json(groups);
  });
});

// Add a member to a group
router.put("/:groupId/add-member", async (req, res) => {
  const { groupId } = req.params;
  const { newMember } = req.body;

  const updatedGroup = await groupController.addNewMember2Group(
    groupId,
    newMember
  );

  return res.status(201).json({ success: true, data: updatedGroup });
});

router.put("/:groupId/vote", async (req, res) => {
  console.log("HELL");

  const { groupId } = req.params;
  const incomingVote = req.body;

  const updatedGroup = await groupController.updateVoteTally(
    groupId,
    incomingVote
  );

  return res.status(200).json({ success: true, data: updatedGroup });
});

export default router;

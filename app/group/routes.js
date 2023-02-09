import { Router } from "express";
import groupController from "./controller.js";

const router = new Router();

router.get("/", (_, res) => {
  groupController.getGroups().then((groups) => {
    res.json(groups);
  });
});
router.post("/group/update", async (req, res) => {
  groupController.updateGroupMembers(req.body).then((group) => {
    res.json(group);
  });
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

import { Router } from "express";
import groupController from "./controller.js";

const router = new Router();

router.post("/group/update", async (req, res) => {
  groupController.updateGroupMembers(req.body).then((group) => {
    res.json(group);
  });
});

export default router;

import { Router } from "express";
import mongoose from "mongoose";
import controller from "./controller.js";

const router = new Router();

router.get("/", (_, response) => {
  controller
    .getUsers()
    .then((users) => {
      response.json(users);
    })
    .catch((err) => {
      response.status(500).json(err);
    });
});

router.get("/:id", async (req, res) => {
  const foundStudent = await controller.getUser(req.params.id).catch((err) => {
    if (err instanceof mongoose.Error.CastError && err.kind === "ObjectId") {
      res.status(400).json({ message: "Invalid ID" });
    } else {
      res.status(500).json({ message: err.message });
    }
  });

  if (foundStudent) {
    res.json(foundStudent);
  } else {
    res.status(404).json({ message: "Student not found" });
  }
});

router.post("/create", async (req, res) => {
  const { username, password } = req.body;

  const user = await controller.create(username, password);

  res.json(user);
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await controller.login(username, password);
  if (user) {
    res.json(user);
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

router.put("/user/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const updatedUser = await controller.updateById(id, name);

  if (updatedUser) {
    res.json(updatedUser);
  } else {
    res.status(404).json({ message: "Student not found" });
  }
});

router.delete("/user/:id", async (req, res) => {
  const { id } = req.params;

  controller.deleteById(id).then((result) => {
    if (result.deletedCount) {
      res.json(result);
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  });
});

export default router;

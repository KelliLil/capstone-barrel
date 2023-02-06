import { Router } from "express";
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

export default router;

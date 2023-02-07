import cors from "cors";
import express from "express";
import config from "./config.js";
import groupRoutes from "./group/routes.js";
import decodeUser from "./middleware/decode-user.js";
import routes from "./user/routes.js";

export default () => {
  const app = express();

  // * Middleware order matters!
  app.use(express.json());
  app.use(decodeUser);
  app.use(cors());
  app.use("/api/users", routes);
  app.use("/api/groups", groupRoutes);

  app.use((_, res) => {
    res.status(404).json({ message: "Not found" });
  });

  app.listen(config.port, () => {
    console.info(`Server running on: http://localhost:${config.port}`);
  });
};

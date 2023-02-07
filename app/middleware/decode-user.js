import jwt from "jsonwebtoken";
import config from "../config.js";

export default function decodeUser(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  let decodedToken;

  if (token) {
    decodedToken = jwt.verify(token, config.jwtSecret);
  }

  req.user = decodedToken?.user;

  next();
}

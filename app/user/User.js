import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { model, Schema } from "mongoose";
import groupSchema from "./group-schema.js";
import config from "../config.js";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  dietRestrictions: { type: [String], required: true },
  groupsJoined: [groupSchema],
  groupsAdmins: [groupSchema],
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const generatedSalt = await bcrypt.genSalt(config.saltRounds);
    this.password = await bcrypt.hash(this.password, generatedSalt);
  }

  next();
});

userSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });

  let isMatch = false;
  if (user) {
    isMatch = await bcrypt.compare(password, user.password);
  }

  return isMatch
    ? jwt.sign(
        {
          user: {
            id: user._id,
            username: user.username,
          },
        },
        config.jwtSecret,
        { expiresIn: config.jwtExpiresIn }
      )
    : null;
};

export default model("User", userSchema);

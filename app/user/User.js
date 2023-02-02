import { model, Schema } from "mongoose";
import groupSchema from "./group-schema.js";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  dietRestrictions: { type: [String], required: true },
  groupsJoined: [groupSchema],
  groupsAdmins: [groupSchema],

  versionKey: false,
});

export default model("User", userSchema);

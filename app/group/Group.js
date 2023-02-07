import { model, Schema } from "mongoose";
import userSchema from "./user/user-schema.js";
import voteSchema from "./user/vote-schema.js";

const groupSchema = new Schema({
  date: { type: Number, required: true },
  groupName: { type: String, required: true },
  members: [userSchema],
  voting: [voteSchema],
  admin: userSchema,
});

export default model("Group", groupSchema);

import { model, Schema, Types } from "mongoose";
import { userSchema } from "../user/User.js";
import voteSchema from "./vote-schema.js";

const adminSchema = new Schema({
  username: { type: String, required: true },

  // TODO: Check if _id needs to be Schema.Types.ObjectId
  _id: { type: Types.ObjectId, required: true },
});

const groupSchema = new Schema({
  date: { type: Date, required: true },
  groupName: { type: String, required: true },
  members: [userSchema],
  voting: [voteSchema],
  admin: { type: adminSchema },
});

export default model("Group", groupSchema);

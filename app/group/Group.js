import { model, Schema, Types } from "mongoose";
import voteSchema from "./vote-schema.js";

const newUserSchema = new Schema({
  username: { type: String },
  _id: { type: Types.ObjectId, required: true },
});

const groupSchema = new Schema({
  date: { type: Date, required: true },
  groupName: { type: String, required: true },
  members: [newUserSchema],
  votes: [voteSchema],
  admin: { type: newUserSchema },
});

export default model("Group", groupSchema);

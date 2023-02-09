import { model, Schema } from "mongoose";
import voteSchema from "./vote-schema.js";

const newUserSchema = new Schema(
  {
    username: { type: String },
    _id: { type: Schema.Types.ObjectId, required: true },
  },
  { _id: false }
);

const groupSchema = new Schema(
  {
    date: { type: Date, required: true },
    groupName: { type: String, required: true },
    members: [newUserSchema],
    votes: [voteSchema],
    admin: { type: newUserSchema },
  },
  {
    versionKey: false,
  }
);

export default model("Group", groupSchema);

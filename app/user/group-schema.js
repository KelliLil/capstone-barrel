import { Schema } from "mongoose";
import voteSchema from "./vote-schema.js";

export default new Schema({
  date: { type: Number, required: true },
  groupName: { type: String, required: true },
  voting: [voteSchema],
});

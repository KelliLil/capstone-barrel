import { Schema } from "mongoose";

const voteSchema = new Schema({
  username: { type: String },
  _id: { type: String, required: true },
});

export default new Schema({
  cuisineType: { type: String, required: true },
  voters: [voteSchema],
});

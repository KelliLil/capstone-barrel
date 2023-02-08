import { Schema } from "mongoose";

const voteSchema = new Schema({
  username: { type: String },
  _id: { type: Schema.Types.ObjectId, required: true, _id: false },
});

export default new Schema({
  cuisineType: { type: String, required: true },
  voters: [voteSchema],
});

import { Schema } from "mongoose";

export default new Schema({
  cuisineType: { Type: String },
  votes: { type: Number, default: 0 },
});

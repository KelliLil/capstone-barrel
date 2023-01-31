

const UserSchema = new mongoose.Schema ({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  dietRestrictions: { type: [String], Use enum to restrict choices? },
  groupsJoined: [GroupSchema],
  groupsAdmins: [GroupSchema]
 });

 const GroupSchema = new mongoose.Schema ({
  date: { type: String, required: true},
  groupName: { type: String, required: true},
  voting: [VoteSchema]
 });

 const VoteSchema = new mongoose.Schema({
  cuisineType (or do by name of Restaurant?): String,
  votes: {type: Number, default: 0}
})
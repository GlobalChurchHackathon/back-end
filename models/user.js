const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  _id: ObjectId,
  name: {
    type: String,
    required: true,
    unique: true,
    min: 2,
    max: 64
  },
  email: {
    type: String,
    required: true,
    unique: true,
    min: 3,
    max: 64
  },
  password: {
    type: String,
    required: true,
    min: 3,
    max: 64
  },
});

const User = mongoose.model("Users", UserSchema);
module.exports = User;

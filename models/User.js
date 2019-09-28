const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var UserSchema = Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: String,
    default: Date.now
  }
});

module.exports = mongoose.model("user", UserSchema);

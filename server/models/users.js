const mongoose = require("mongoose");

const UserSeqSchema = mongoose.Schema({
  name: {
    type: Number,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model("users", UserSeqSchema, "users");

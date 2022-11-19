const mongoose = require("mongoose");
/**
 * @author Praveen
 * User model
 */
const UserSeqSchema = mongoose.Schema({
  name: {
    type: String,
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
  },
  mobile: {
    type: String,
  },
  isSuperAdmin: {
    type: Boolean,
  },
  isAdmin: {
    type: Boolean,
  },
  isActive: {
    type: Boolean,
  },
  fk_companyId: {
    type: [String],
  },
  createdBy: {
    type: String,
  },
  createdDate: {
    type: Date,
  },
  modifiedBy: {
    type: String,
  },
  modifiedDate: {
    type: Date,
  },
});
module.exports = mongoose.model("users", UserSeqSchema, "users");

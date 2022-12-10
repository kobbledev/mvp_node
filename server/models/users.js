const mongoose = require("mongoose");
/**
 * @author Praveen
 * User model
 */
const UserSeqSchema = mongoose.Schema({
  name: {
    type: String,
  },
  middlename: {
    type: String,
  },
  lastname: {
    type: String,
  },
  dob: {
    type: Date,
  },
  gender: {
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
  designation: {
    type: String,
  },
  department: {
    type: String,
  },
  address: {
    type: String,
  },
  modules: {
    type: [String],
  },
  isDelete: {
    type: Boolean,
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

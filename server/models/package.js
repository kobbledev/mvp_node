const mongoose = require("mongoose");
/**
 * @author Praveen
 * User model
 */
const PackageSeqSchema = mongoose.Schema({
  packageName: {
    type: String,
    required: true
  },
  noOfHalls: {
    type: String,
    required: true
  },
  softwareModel: {
    type: String,
    required: true
  },
  validity: {
    type: String,
    required: true
  },
  access: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
  },
  isActive:{
    type: Boolean
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
module.exports = mongoose.model("packages", PackageSeqSchema, "packages");
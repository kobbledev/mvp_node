const mongoose = require("mongoose");
/**
 * @author Praveen
 * Packages model
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
    type: String,
    required: true
  },
  currency: {
    type: String,
  },
  isActive: {
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
  isDelete: {
    type: Boolean
  },
});
module.exports = mongoose.model("packages", PackageSeqSchema, "packages");

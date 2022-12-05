const mongoose = require("mongoose");
/**
 * @author Praveen
 * Addon model
 */
const AddonSeqSchema = mongoose.Schema({
  packageName: {
    type: String,
    required: true
  },
  noOfHalls: {
    type: String,
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
module.exports = mongoose.model("addons", AddonSeqSchema, "addons");

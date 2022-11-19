const mongoose = require("mongoose");
/**
 * @author Praveen
 * User model
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
module.exports = mongoose.model("addons", AddonSeqSchema, "addons");

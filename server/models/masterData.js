const mongoose = require("mongoose");
/**
 * @author Praveen
 * Master model
 */
const MasterSeqSchema = mongoose.Schema({
  key: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  seq: {
    type: Number,
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
});
module.exports = mongoose.model("masterData", MasterSeqSchema, "masterData");

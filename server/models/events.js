const mongoose = require("mongoose");
/**
 * @author Praveen
 * events model
 */
const EventSeqSchema = mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  fk_companyId: {
    type: String,
    required: true
  },
  isDelete: {
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
module.exports = mongoose.model("events", EventSeqSchema, "events");

const mongoose = require("mongoose");
/**
 * @author Praveen
 * Enquiry model
 */
const EnquirySeqSchema = mongoose.Schema({
  name: {
    type: String,
  },
  companyName: {
    type: String,
  },
  email: {
    type: String,
  },
  mobile: {
    type: String,
  },
  message: {
    type: String,
    required: true
  },
  isDeleted: {
    type: Boolean,
    default: false
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
module.exports = mongoose.model("enquiries", EnquirySeqSchema, "enquiries");

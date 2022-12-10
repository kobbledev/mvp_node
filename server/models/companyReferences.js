const mongoose = require("mongoose");
/**
 * @author Praveen
 * Company reference model
 */
const CompanyRefSeqSchema = mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
  },
  fk_companyId: {
    type: String,
    required: true
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
module.exports = mongoose.model("company_reference", CompanyRefSeqSchema, "company_reference");

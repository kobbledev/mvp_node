const mongoose = require("mongoose");
/**
 * @author Praveen
 * Company model
 */
const CompanySeqSchema = mongoose.Schema({
  packageType: {
    type: String,
    required: true
  },
  expiryDate: {
    type: Date,
  },
  name: {
    type: String,
    required: true
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  pincode: {
    type: String,
  },
  contactNumber: {
    type: String,
  },
  cellNumber: {
    type: String,
  },
  email: {
    type: String,
  },
  companyType: {
    type: String,
  },
  pancard: {
    type: String,
  },
  gstNumber: {
    type: String,
  },
  paymentMode: {
    type: String,
  },
  transactionNum: {
    type: String,
  },
  status: {
    type: String
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
module.exports = mongoose.model("company", CompanySeqSchema, "company");

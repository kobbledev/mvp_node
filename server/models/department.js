const mongoose = require("mongoose");
/**
 * @author Praveen
 * department model
 */
const DeptSeqSchema = mongoose.Schema({
  departmentName: {
    type: String,
    required: true
  },
  displayName: {
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
module.exports = mongoose.model("department", DeptSeqSchema, "department");

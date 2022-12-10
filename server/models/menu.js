const mongoose = require("mongoose");
/**
 * @author Praveen
 * Addon model
 */
const MenuSeqSchema = mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean
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
module.exports = mongoose.model("menu", MenuSeqSchema, "menu");

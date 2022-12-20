const mongoose = require("mongoose");
/**
 * @author Praveen
 * Banquet  model
 */
const BanquetSeqSchema = mongoose.Schema({
  hallName: {
    type: String,
    required: true
  },
  hallType: {
    type: String,
    required: true
  },
  fk_companyId:{
    type: String,
    required: true
  },
  order: {
    type: Number,
  },
  lengths: {
    type: String,
  },
  widths: {
    type: String,
  },
  heights: {
    type: String,
  },
  area: {
    type: String,
  },
  capacityShape: {
    type: String,
  },
  capacityTheater: {
    type: String,
  },
  capacityCluster: {
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
  }
});
module.exports = mongoose.model("banquet", BanquetSeqSchema, "banquet");

const mongoose = require("mongoose");
/**
 * @author Praveen
 * Venue model
 */
const VenueSeqSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  fk_companyId: {
    type: String,
    required: true
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
module.exports = mongoose.model("venue", VenueSeqSchema, "venue");

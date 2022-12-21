const mongoose = require("mongoose");
/**
 * @author Praveen
 * Booking halls model
 */
const BookingHllsSeqSchema = mongoose.Schema({
  fk_companyId:{
      type: String
  },
  fk_bookId:{
    type: String,
    required: true
  },
  entryDate: {
    type: Date,
    required: true
  },
  breakFast: {
    type: Boolean,
  },
  lunch: {
    type: Boolean,
  },
  dinner: {
    type: Boolean,
  },
  hallType: {
    type: String,
    required: true
  },
  hallName: {
    type: String,
    required: true
  },
  guaranteePax:{
    type: String,
  },
  expectedPax:{
    type: String,
  },
  backupHall:{
    type: String,
  },
  event:{
    type: String,
  },
  isCancel: {
    type: Boolean
  },
});
module.exports = mongoose.model("booking_halls", BookingHllsSeqSchema, "booking_halls");

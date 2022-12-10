const mongoose = require("mongoose");
/**
 * @author Praveen
 * Booking model
 */
const BookingSeqSchema = mongoose.Schema({
  bookingId: {
    type: String,
    required: true
  },
  fk_companyId: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  guestName: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
  },
  email: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  bookingDate: {
    type: Date,
    reequired: true
  },
  bookingType: {
    type: String,
    required: true
  },
  fromDate: {
    type: Date,
    required: true
  },
  toDate: {
    type: Date,
    required: true
  },
  executiveRef: {
    type: String,
  },
  companyRef: {
    type: String,
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
  isCancel: {
    type: Boolean
  },
  paymentMode:{
    type: String
  },
  dateOfAdvance:{
    type: Date,
  },
  receiptNum:{
    type: String,
  },
  amount:{
    type: Number
  },
  currency:{
    typr: String
  },
  book_hall_refIds: {
    type: [String]
  }
});
module.exports = mongoose.model("booking", BookingSeqSchema, "booking");

const express = require("express");
const app = express();
const bookingController = require("../controllers/bookingController");
const authenticationService = require("../services/authenticationService");
/**
 * Save Booking
 * @author Praveen Varma
 */
app.post("/booking/save",
    authenticationService.validateHeaderSessionToken,
    bookingController.saveBooking);

/**
 * Fetch all Bookings
 * @author Praveen Varma
 */
app.post("/booking/:page/:pageSize",
    authenticationService.validateHeaderSessionToken,
    bookingController.fetchAllBookings);

/**
 * Fetch Booking
 * @author Praveen Varma
 */
app.post("/booking/fetch",
    authenticationService.validateHeaderSessionToken,
    bookingController.fetchBooking);


module.exports = app;
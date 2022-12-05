const express = require("express");
const app = express();
const authenticationService = require("../services/authenticationService");
const dashboardController = require("../controllers/dashboardController");
/**
* Venue count
* @author Praveen Varma
*/
app.post("/dashboard/venue/count",
    authenticationService.validateHeaderSessionToken,
    dashboardController.venueCount);
    
module.exports = app;
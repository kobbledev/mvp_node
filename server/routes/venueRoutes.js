const express = require("express");
const app = express();
const venueController = require("../controllers/venueController");
const authenticationService = require("../services/authenticationService");

/**
 * Save or update package
 * @author Praveen Varma
 */
app.post("/venue/save",
    authenticationService.validateHeaderSessionToken,
    venueController.saveVenue);

/**
 * Fetch all packages
 * @author Praveen Varma
 */
app.post("/venue/:page/:pageSize",
    authenticationService.validateHeaderSessionToken,
    venueController.fetchAllVenues);


/**
* Fetch package details
* @author Praveen Varma
*/
app.post("/venue/details",
    authenticationService.validateHeaderSessionToken,
    venueController.fetchVenueDetails);


module.exports = app;
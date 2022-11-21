const express = require("express");
const app = express();
const enquiryController = require("../controllers/enquiryController");
const authenticationService = require("../services/authenticationService");

/**
 * Save or update enquiry
 * @author Praveen Varma
 */
app.post("/enquiry/save",
    authenticationService.validateHeaderSessionToken,
    enquiryController.saveEnquiry);

/**
* Fetch all enquiries
* @author Praveen Varma
*/
app.post("/enquiry/:page/:pageSize",
    authenticationService.validateHeaderSessionToken,
    enquiryController.fetchAllEnquiries);


/**
* Fetch addon details
* @author Praveen Varma
*/
app.post("/enquiry/details",
    authenticationService.validateHeaderSessionToken,
    enquiryController.fetchEnquiryDetails);


module.exports = app;
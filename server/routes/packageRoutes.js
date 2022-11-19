const express = require("express");
const app = express();
const packageController = require("../controllers/packageController");
const authenticationService = require("../services/authenticationService");

/**
 * Save or update package
 * @author Praveen Varma
 */
app.post("/package/save",
    /*  authenticationService.validateHeaderSessionToken, */
    packageController.savePackage);

/**
 * Fetch all packages
 * @author Praveen Varma
 */
app.post("/package/:page/:pageSize",
    /*  authenticationService.validateHeaderSessionToken, */
    packageController.fetchAllPackages);


/**
* Fetch all packages
* @author Praveen Varma
*/
app.post("/package/details",
    /*  authenticationService.validateHeaderSessionToken, */
    packageController.fetchPackageDetails);


module.exports = app;
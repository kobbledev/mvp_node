const express = require("express");
const app = express();
const packageController = require("../controllers/packageController");
const authenticationService = require("../services/authenticationService");

/**
 * Save or update package
 * @author Praveen Varma
 */
app.post("/package/save",
    authenticationService.validateHeaderSessionToken,
    packageController.savePackage);

/**
 * Fetch all packages
 * @author Praveen Varma
 */
app.post("/package/:page/:pageSize",
    authenticationService.validateHeaderSessionToken,
    packageController.fetchAllPackages);


/**
* Fetch package details
* @author Praveen Varma
*/
app.post("/package/details",
    authenticationService.validateHeaderSessionToken,
    packageController.fetchPackageDetails);


/**
* load active package names
* @author Praveen Varma
*/
app.post("/package/names",
    authenticationService.validateHeaderSessionToken,
    packageController.fetchPackageNames);


module.exports = app;
const express = require("express");
const app = express();
const addonController = require("../controllers/addonController");
const authenticationService = require("../services/authenticationService");

/**
 * Save or update addon
 * @author Praveen Varma
 */
app.post("/addon/save",
    /*  authenticationService.validateHeaderSessionToken, */
    addonController.saveAddon);

/**
 * Fetch all addons
 * @author Praveen Varma
 */
app.post("/addon/:page/:pageSize",
    /*  authenticationService.validateHeaderSessionToken, */
    addonController.fetchAllAddons);


/**
* Fetch addon details
* @author Praveen Varma
*/
app.post("/addon/details",
    /*  authenticationService.validateHeaderSessionToken, */
    addonController.fetchAddonDetails);


module.exports = app;
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


module.exports = app;
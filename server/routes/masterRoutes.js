
const express = require("express");
const app = express();
const masterController = require("../controllers/masterController");
const authenticationService = require("../services/authenticationService");

/**
* load master data
* @author Praveen Varma
*/
app.post("/master/data",
    authenticationService.validateHeaderSessionToken,
    masterController.getMasterData);
    
module.exports = app;
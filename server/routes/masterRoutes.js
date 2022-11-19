
const express = require("express");
const app = express();
const masterController = require("../controllers/masterController");
/**
* load master data
* @author Praveen Varma
*/
app.post("/master/data",
    /*  authenticationService.validateHeaderSessionToken, */
    masterController.getMasterData);
    
module.exports = app;
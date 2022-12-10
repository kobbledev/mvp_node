const express = require("express");
const app = express();
const userController = require("../controllers/userController");
const authenticationService = require("../services/authenticationService");

/**
* User registration
* @author Praveen Varma
*/
app.post("/user/save",
    authenticationService.validateHeaderSessionToken,
    userController.saveUser);

/**
* Users fetch
* @author Praveen Varma
*/
app.post("/user/:page/:pageSize",
    authenticationService.validateHeaderSessionToken,
    userController.fetchUsers);

/**
* User fetch
* @author Praveen Varma
*/
app.post("/user/fetch",
    authenticationService.validateHeaderSessionToken,
    userController.fetchUser);

module.exports = app;

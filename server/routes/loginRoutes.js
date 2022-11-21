const express = require("express");
const app = express();
const loginController = require("../controllers/loginController");

/**
 * Login API Call
 * @author Praveen Varma
 */
app.post("/login",
    loginController.login);

/**
 * Logout API Call
 * @author Praveen Varma
 */
app.post("/logout",
    loginController.logoutUser);


module.exports = app;
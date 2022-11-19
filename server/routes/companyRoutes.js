const express = require("express");
const app = express();
const companyController = require("../controllers/companyController");
const authenticationService = require("../services/authenticationService");

/**
 * Save or update company
 * @author Praveen Varma
 */
app.post("/company/save",
    /*  authenticationService.validateHeaderSessionToken, */
    companyController.saveCompany);

/**
 * Fetch all companies
 * @author Praveen Varma
 */
app.post("/company/:page/:pageSize",
    /*  authenticationService.validateHeaderSessionToken, */
    companyController.fetchAllCompanies);


/**
* Fetch company details
* @author Praveen Varma
*/
app.post("/company/details",
    /*  authenticationService.validateHeaderSessionToken, */
    companyController.fetchCompanyDetails);

/**
* Fetch company names
* @author Praveen Varma
*/
app.post("/company/names",
    /*  authenticationService.validateHeaderSessionToken, */
    companyController.loadCompanyNames);


module.exports = app;
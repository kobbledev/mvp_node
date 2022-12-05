const express = require("express");
const app = express();
const companyController = require("../controllers/companyController");
const authenticationService = require("../services/authenticationService");

/**
 * Save or update company
 * @author Praveen Varma
 */
app.post("/company/save",
    authenticationService.validateHeaderSessionToken,
    companyController.saveCompany);

/**
 * Fetch all companies
 * @author Praveen Varma
 */
app.post("/company/:page/:pageSize",
    authenticationService.validateHeaderSessionToken,
    companyController.fetchAllCompanies);


/**
* Fetch company details
* @author Praveen Varma
*/
app.post("/company/details",
    authenticationService.validateHeaderSessionToken,
    companyController.fetchCompanyDetails);

/**
* Fetch company names
* @author Praveen Varma
*/
app.post("/company/names",
    authenticationService.validateHeaderSessionToken,
    companyController.loadCompanyNames);

/**
* Save or update department
* @author Praveen Varma
*/
app.post("/department/save",
    authenticationService.validateHeaderSessionToken,
    companyController.saveDepartment);

/**
 * Fetch all department
 * @author Praveen Varma
 */
app.post("/department/:page/:pageSize",
    authenticationService.validateHeaderSessionToken,
    companyController.fetchAllDepartments);

/**
* Save or update designation
* @author Praveen Varma
*/
app.post("/designation/save",
    authenticationService.validateHeaderSessionToken,
    companyController.saveDesignation);

/**
 * Fetch all designation
 * @author Praveen Varma
 */
app.post("/designation/:page/:pageSize",
    authenticationService.validateHeaderSessionToken,
    companyController.fetchAllDesigantions);

/**
* Save or update events
* @author Praveen Varma
*/
app.post("/event/save",
    authenticationService.validateHeaderSessionToken,
    companyController.saveEventType);

/**
 * Fetch all events
 * @author Praveen Varma
 */
app.post("/event/:page/:pageSize",
    authenticationService.validateHeaderSessionToken,
    companyController.fetchAllEventType);


module.exports = app;
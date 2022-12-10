const companyService = require("../services/companyService");

/**
 * Save company
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
 exports.saveCompany = async (req, res) =>{
     try {
        req.body.loggedIn= req.user ? req.user._id.toString():null;
        let resp = await companyService.saveCompany(req.body);
        res.status(200).json(resp);
     } catch (error) {
         console.log("Error occured in saveCompany "+error);
         res.status(200).json({success: false, msg:"Error while saving company"});
     }
 }

 /**
 * Fetch all companies
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
  exports.fetchAllCompanies = async (req, res) =>{
    try {
       req.body.loggedIn= req.user ? req.user._id.toString():null;
       let resp = await companyService.fetchAllCompanies(req);
       res.status(200).json(resp);
    } catch (error) {
        console.log("Error occured in fetch all companies "+error);
        res.status(200).json({success: false, msg:"Error while fetch all companies"});
    }
}

 /**
 * Fetch company details
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
  exports.fetchCompanyDetails = async (req, res) =>{
    try {
       req.body.loggedIn= req.user ? req.user._id.toString():null;
       let resp = await companyService.fetchCompanyDetails(req.body);
       res.status(200).json(resp);
    } catch (error) {
        console.log("Error occured in companyDetails "+error);
        res.status(200).json({success: false, msg:"Error while fetching company details"});
    }
}

 /**
 * Load CompanyNames
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
  exports.loadCompanyNames = async (req, res) =>{
    try {
       req.body.loggedIn= req.user ? req.user._id.toString():null;
       let resp = await companyService.loadCompanyNames(req.body);
       res.status(200).json(resp);
    } catch (error) {
        console.log("Error occured in loadCompanies "+error);
        res.status(200).json({success: false, msg:"Error while fetching loadCompanies"});
    }
}

/**
 * Save Department
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
 exports.saveDepartment = async (req, res) =>{
    try {
       req.body.loggedIn= req.user ? req.user._id.toString():null;
       let resp = await companyService.saveDepartment(req.body);
       res.status(200).json(resp);
    } catch (error) {
        console.log("Error occured in saveDepartment "+error);
        res.status(200).json({success: false, msg:"Error while saving Department"});
    }
}

/**
 * Fetch all Departments
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
 exports.fetchAllDepartments = async (req, res) =>{
    try {
       req.body.loggedIn= req.user ? req.user._id.toString():null;
       let resp = await companyService.fetchAllDepartments(req);
       res.status(200).json(resp);
    } catch (error) {
        console.log("Error occured in fetchAllDepartments "+error);
        res.status(200).json({success: false, msg:"Error while fetchAllDepartments"});
    }
}

/**
 * Save Designation
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
 exports.saveDesignation = async (req, res) =>{
    try {
       req.body.loggedIn= req.user ? req.user._id.toString():null;
       let resp = await companyService.saveDesignation(req.body);
       res.status(200).json(resp);
    } catch (error) {
        console.log("Error occured in saveDesignation "+error);
        res.status(200).json({success: false, msg:"Error while saving Designation"});
    }
}

/**
 * Fetch all Desigantion
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
 exports.fetchAllDesigantions = async (req, res) =>{
    try {
       req.body.loggedIn= req.user ? req.user._id.toString():null;
       let resp = await companyService.fetchAllDesigantions(req);
       res.status(200).json(resp);
    } catch (error) {
        console.log("Error occured in fetchAllDesigantions "+error);
        res.status(200).json({success: false, msg:"Error while fetchAllDesigantions"});
    }
}

/**
 * saveEventType
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
 exports.saveEventType = async (req, res) =>{
    try {
       req.body.loggedIn= req.user ? req.user._id.toString():null;
       let resp = await companyService.saveEventType(req.body);
       res.status(200).json(resp);
    } catch (error) {
        console.log("Error occured in saveEventType "+error);
        res.status(200).json({success: false, msg:"Error while saving saveEventType"});
    }
}

/**
 * Fetch all EventType
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
 exports.fetchAllEventType = async (req, res) =>{
    try {
       req.body.loggedIn= req.user ? req.user._id.toString():null;
       let resp = await companyService.fetchAllEventType(req);
       res.status(200).json(resp);
    } catch (error) {
        console.log("Error occured in fetchAllEventType "+error);
        res.status(200).json({success: false, msg:"Error while fetchAllEventType"});
    }
}

/**
 * saveCompanyReference
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
 exports.saveCompanyReference = async (req, res) =>{
    try {
       req.body.loggedIn= req.user ? req.user._id.toString():null;
       let resp = await companyService.saveCompanyReference(req.body);
       res.status(200).json(resp);
    } catch (error) {
        console.log("Error occured in saveCompanyReference "+error);
        res.status(200).json({success: false, msg:"Error while saving saveCompanyReference"});
    }
}

/**
 * Fetch all EventType
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
 exports.fetchAllCompanyReference = async (req, res) =>{
    try {
       req.body.loggedIn= req.user ? req.user._id.toString():null;
       let resp = await companyService.fetchAllCompanyReference(req);
       res.status(200).json(resp);
    } catch (error) {
        console.log("Error occured in fetchAllEventType "+error);
        res.status(200).json({success: false, msg:"Error while fetchAllCompanyReference"});
    }
}
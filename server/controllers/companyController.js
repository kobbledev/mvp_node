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
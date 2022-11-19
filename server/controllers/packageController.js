const packageService = require("../services/packageService");

/**
 * Save package
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
 exports.savePackage = async (req, res) =>{
     try {
        req.body.loggedIn= req.user ? req.user._id.toString():"63787e2a0b23e87334480f20";
        let resp = await packageService.savePackage(req.body);
        res.status(200).json(resp);
     } catch (error) {
         console.log("Error occured in savePackage "+error);
         res.status(200).json({success: false, msg:"Error while saving package"});
     }
 }

 /**
 * Fetch all packages
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
  exports.fetchAllPackages = async (req, res) =>{
    try {
       req.body.loggedIn= req.user ? req.user._id.toString():"63787e2a0b23e87334480f20";
       let resp = await packageService.fetchAllPackages(req);
       res.status(200).json(resp);
    } catch (error) {
        console.log("Error occured in fetch all packages "+error);
        res.status(200).json({success: false, msg:"Error while fetch all packages"});
    }
}

 /**
 * Fetch package details
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
  exports.fetchPackageDetails = async (req, res) =>{
    try {
       req.body.loggedIn= req.user ? req.user._id.toString():"63787e2a0b23e87334480f20";
       let resp = await packageService.fetchPackageDetails(req.body);
       res.status(200).json(resp);
    } catch (error) {
        console.log("Error occured in packageDetails "+error);
        res.status(200).json({success: false, msg:"Error while fetching package details"});
    }
}
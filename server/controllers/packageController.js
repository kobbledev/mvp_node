const packageService = require("../services/packageService");

/**
 * Save package
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
 exports.savePackage = async (req, res) =>{
     try {
        req.body.loggedIn="63787e2a0b23e87334480f20";
        let resp = await packageService.savePackage(req.body);
        res.send(200).json({success: true, msg:"Package saved successfully"});
     } catch (error) {
         console.log("Error occured in savePackage "+error);
         res.send(200).json({success: false, msg:"Error while saving package"});
     }
 }
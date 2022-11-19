const addonService = require("../services/addonService");

/**
 * Save addon
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
 exports.saveAddon = async (req, res) =>{
     try {
        req.body.loggedIn= req.user ? req.user._id.toString():"63787e2a0b23e87334480f20";
        let resp = await addonService.saveAddon(req.body);
        res.status(200).json(resp);
     } catch (error) {
         console.log("Error occured in saveAddon "+error);
         res.status(200).json({success: false, msg:"Error while saving addon"});
     }
 }

 /**
 * Fetch all addons
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
  exports.fetchAllAddons = async (req, res) =>{
    try {
       req.body.loggedIn= req.user ? req.user._id.toString():"63787e2a0b23e87334480f20";
       let resp = await addonService.fetchAllAddons(req);
       res.status(200).json(resp);
    } catch (error) {
        console.log("Error occured in fetch all addons "+error);
        res.status(200).json({success: false, msg:"Error while fetch all addons"});
    }
}

 /**
 * Fetch addon details
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
  exports.fetchAddonDetails = async (req, res) =>{
    try {
       req.body.loggedIn= req.user ? req.user._id.toString():"63787e2a0b23e87334480f20";
       let resp = await addonService.fetchAddonDetails(req.body);
       res.status(200).json(resp);
    } catch (error) {
        console.log("Error occured in fetchAddonDetails "+error);
        res.status(200).json({success: false, msg:"Error while fetching addon details"});
    }
}
const masterService = require("../services/masterService");
/** 
 * Master data
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
 exports.getMasterData = async (req, res) =>{
    try {
       req.body.loggedIn= req.user ? req.user._id.toString():"63787e2a0b23e87334480f20";
       let resp = await masterService.getMasterData(req.body);
       res.status(200).json(resp);
    } catch (error) {
        console.log("Error occured in saveVenue "+error);
        res.status(200).json({success: false, msg:"Error while saving venue"});
    }
}
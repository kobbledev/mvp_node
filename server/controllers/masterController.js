const masterService = require("../services/masterService");
/** 
 * Master data
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
 exports.getMasterData = async (req, res) =>{
    try {
       req.body.loggedIn= req.user ? req.user._id.toString():null;
       let resp = await masterService.getMasterData(req.body);
       res.status(200).json(resp);
    } catch (error) {
        console.log("Error occured in getMasterData "+error);
        res.status(200).json({success: false, msg:"Error while getMasterData"});
    }
}

/** 
 * Master data
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
 exports.getAllStates = async (req, res) =>{
    try {
       req.body.loggedIn= req.user ? req.user._id.toString():null;
       let resp = await masterService.getAllStates(req.body);
       res.status(200).json(resp);
    } catch (error) {
        console.log("Error occured in getAllStates "+error);
        res.status(200).json({success: false, msg:"Error while getAllStates"});
    }
}
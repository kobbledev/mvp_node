const userService = require("../services/userService");

/**
 * Save User
 * @author Praveen
 * @param {*} req 
 * @param {*} res 
 */
exports.saveUser = async(req, res)=>{
    try {
        req.body.loggedIn= req.user ? req.user._id.toString():null;
        let resp = await userService.saveUser(req.body);
        res.status(200).json(resp);
     } catch (error) {
         console.log("Error occured in userService "+error);
         res.status(200).json({success: false, msg:"Error while saving saveUser"});
     }
}

/**
 * Save User
 * @author Praveen
 * @param {*} req 
 * @param {*} res 
 */
 exports.fetchUsers = async(req, res)=>{
    try {
        req.body.loggedIn= req.user ? req.user._id.toString():null;
        let resp = await userService.fetchUsers(req);
        res.status(200).json(resp);
     } catch (error) {
         console.log("Error occured in fetchUsers "+error);
         res.status(200).json({success: false, msg:"Error while fetchUsers"});
     }
}

/**
 * Save User
 * @author Praveen
 * @param {*} req 
 * @param {*} res 
 */
 exports.fetchUser = async(req, res)=>{
    try {
        req.body.loggedIn= req.user ? req.user._id.toString():null;
        let resp = await userService.fetchUser(req.body);
        res.status(200).json(resp);
     } catch (error) {
         console.log("Error occured in fetchUser "+error);
         res.status(200).json({success: false, msg:"Error while fetchUser"});
     }
}
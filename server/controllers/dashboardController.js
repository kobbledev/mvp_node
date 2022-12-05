const dashboardService = require("../services/dashboardService");
/**
 * venue Count
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
exports.venueCount = async(req, res)=>{
    try {
        let loggedIn = req?.user?._id;
        req.body.loggedIn = loggedIn;
        let resp = await dashboardService.venueCount(req.body);
        res.status(200).json(resp);
    } catch (error) {
        console.log("Error occured in venueCount dashboard "+error);
        res.status(200).json({success: false, msg:"Error while fetching venue dashboard count"});
    }
}
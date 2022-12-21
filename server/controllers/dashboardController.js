const isEmpty = require("lodash.isempty");
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

/**
 * Client dashboard bookings
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
 exports.bookings = async(req, res)=>{
    try {
        if(isEmpty(req.body.fk_companyId)){
            return res.status(200).json({success: false, msg: "Invalid request"});
        }
        let loggedIn = req?.user?._id;
        req.body.loggedIn = loggedIn;
        let resp = await dashboardService.bookings(req.body);
        res.status(200).json(resp);
    } catch (error) {
        console.log("Error occured in bookings dashboard "+error);
        res.status(200).json({success: false, msg:"Error while fetching bookings dashboard count"});
    }
}
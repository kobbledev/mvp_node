const venueService = require("../services/venueService");

/**
 * Save venue
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
 exports.saveVenue = async (req, res) =>{
     try {
        req.body.loggedIn= req.user ? req.user._id.toString():"63787e2a0b23e87334480f20";
        let resp = await venueService.saveVenue(req.body);
        res.status(200).json(resp);
     } catch (error) {
         console.log("Error occured in saveVenue "+error);
         res.status(200).json({success: false, msg:"Error while saving venue"});
     }
 }

 /**
 * Fetch all venues
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
  exports.fetchAllVenues = async (req, res) =>{
    try {
       req.body.loggedIn= req.user ? req.user._id.toString():"63787e2a0b23e87334480f20";
       let resp = await venueService.fetchAllVenues(req);
       res.status(200).json(resp);
    } catch (error) {
        console.log("Error occured in fetch all venues "+error);
        res.status(200).json({success: false, msg:"Error while fetch all venues"});
    }
}

 /**
 * Fetch package details
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
  exports.fetchVenueDetails = async (req, res) =>{
    try {
       req.body.loggedIn= req.user ? req.user._id.toString():"63787e2a0b23e87334480f20";
       let resp = await venueService.fetchVenueDetails(req.body);
       res.status(200).json(resp);
    } catch (error) {
        console.log("Error occured in fetchVenueDetails "+error);
        res.status(200).json({success: false, msg:"Error while fetching venue details"});
    }
}
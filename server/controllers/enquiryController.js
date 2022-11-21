const enquiryService = require("../services/enquiryService");

/**
 * Save addon
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
 exports.saveEnquiry = async (req, res) =>{
     try {
        req.body.loggedIn= req.user ? req.user._id.toString():null;
        let resp = await enquiryService.saveEnquiry(req.body);
        res.status(200).json(resp);
     } catch (error) {
         console.log("Error occured in saveEnquiry "+error);
         res.status(200).json({success: false, msg:"Error while saving enquiry"});
     }
 }

 /**
 * Fetch all addons
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
  exports.fetchAllEnquiries = async (req, res) =>{
    try {
       req.body.loggedIn= req.user ? req.user._id.toString():null;
       let resp = await enquiryService.fetchAllEnquiries(req);
       res.status(200).json(resp);
    } catch (error) {
        console.log("Error occured in fetchAllEnquiries "+error);
        res.status(200).json({success: false, msg:"Error while fetch all enquiries"});
    }
}

 /**
 * Fetch addon details
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
  exports.fetchEnquiryDetails = async (req, res) =>{
    try {
       req.body.loggedIn= req.user ? req.user._id.toString():null;
       let resp = await enquiryService.fetchEnquiryDetails(req.body);
       res.status(200).json(resp);
    } catch (error) {
        console.log("Error occured in fetchEnquiryDetails "+error);
        res.status(200).json({success: false, msg:"Error while fetching enquiry details"});
    }
}
const bookService = require("../services/bookService");
/**
 * Save booking
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
exports.saveBooking = async(req, res) =>{
    try {
        req.body.loggedIn= req.user ? req.user._id.toString():null;
        let resp = await bookService.saveBooking(req.body);
        res.status(200).json(resp);
     } catch (error) {
         console.log("Error occured in saveBooking "+error);
         res.status(200).json({success: false, msg:"Error while saveBooking"});
     }
}

/**
 * fetchAllBookings
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
exports.fetchAllBookings = async(req, res) =>{
    try {
        req.body.loggedIn= req.user ? req.user._id.toString():null;
        let resp = await bookService.fetchAllBookings(req);
        res.status(200).json(resp);
     } catch (error) {
         console.log("Error occured in fetchAllBookings "+error);
         res.status(200).json({success: false, msg:"Error while fetchAllBookings"});
     }
}


/**
 * fetchBooking
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
 exports.fetchBooking = async(req, res) =>{
    try {
        req.body.loggedIn= req.user ? req.user._id.toString():null;
        let resp = await bookService.fetchBooking(req.body);
        res.status(200).json(resp);
     } catch (error) {
         console.log("Error occured in fetchBooking "+error);
         res.status(200).json({success: false, msg:"Error while fetchBooking"});
     }
}
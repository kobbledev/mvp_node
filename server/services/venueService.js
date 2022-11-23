const mongoose = require('mongoose');
const venueModel = require("../models/venue");
const Constants = require("../helper/constants");

/**
 * Save venue
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
exports.saveVenue = async (body) => {
    try {
        body.modifiedBy = body.loggedIn;
        body.modifiedDate = new Date();
        if (body._id) {
            await venueModel.findByIdAndUpdate(body._id, body, {
                new: true,
            });
            return { success: true, msg: "Venue updated successfully" };
        } else {
            body.createdBy = body.loggedIn;
            body.createdDate = new Date();
            venueModel(body).save();
            return { success: true, msg: "Venue saved successfully" };
        }
    } catch (error) {
        console.log("Error occured in saveVenue " + error);
        return { success: false, msg: "Error while saving the Venue" };
    }
}

/**
 * Fetch all venue
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
exports.fetchAllVenues = async (req) => {
    try {
        let filter ={};
        if(req.body.search){
            filter= {
                $or: [
                    { name: { $regex: ".*" + req.body.search, $options: "i" } },
                    { type: { $regex: ".*" + req.body.search, $options: "i" } }
                ],
            }
        }
        let venues = await venueModel.find()
            .skip(parseInt(req.params.page - 1) * parseInt(req.params.pageSize))
            .limit(parseInt(req.params.pageSize))
            .sort({ createdDate: -1 })
            .lean()
            .populate({
                path: "fk_companyId",
                model: "company",
                select: "name"
            })
            .populate({
                path: "createdBy",
                model: "users",
                select: "name"
            })
            .populate({
                path: "modifiedBy",
                model: "users",
                select: "name"
            });
        if(venues && venues.length >0){
            venues.forEach(itm =>{
                itm.type = itm.type ? Constants.VENUE_TYPE[itm.type] : "";
            })
        }
        let totalRecords = await venueModel.find().countDocuments();
        return { success: true, data: venues, totalRecords }
    } catch (error) {
        console.log("Error occured in fetchAllVenues " + error);
        return { success: false, msg: "No venue found" };
    }
}

/**
 * Fetch venue details
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
exports.fetchVenueDetails = async (body) => {
    try {
        if (body._id) {
            let venue = await venueModel.findOne({ _id: mongoose.Types.ObjectId(body._id) }, "").lean();
            return { success: true, data: venue };
        } else {
            return { success: true, msg: "Invalid request" };
        }
    } catch (error) {
        console.log("Error occured in fetchVenueDetails " + error);
        return { success: false, msg: "Error while fetch venue details" };
    }
}
const mongoose = require('mongoose');
const enquiryModel = require("../models/enquiries");
/**
 * Save addon
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
exports.saveEnquiry = async (body) => {
    try {
        body.modifiedBy = body.loggedIn;
        body.modifiedDate = new Date();
        if (body._id) {
            await enquiryModel.findByIdAndUpdate(body._id, body, {
                new: true,
            });
            return { success: true, msg: "Enquiry updated successfully" };
        } else {
            body.createdBy = body.loggedIn;
            body.createdDate = new Date();
            enquiryModel(body).save();
            return { success: true, msg: "Enquiry saved successfully" };
        }
    } catch (error) {
        console.log("Error occured in saving the Enquiry " + error);
        return { success: false, msg: "Error while saving the Enquiry" };
    }
}

/**
 * Fetch all enquiries
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
exports.fetchAllEnquiries = async (req) => {
    try {
        let filter ={};
        if(req.body.search){
            filter= {
                $or: [
                    { name: { $regex: ".*" + req.body.search, $options: "i" } },
                    { companyName: { $regex: ".*" + req.body.search, $options: "i" } },
                    { email: { $regex: ".*" + req.body.search, $options: "i" } },
                    { mobile: { $regex: ".*" + req.body.search, $options: "i" } },
                    { message: { $regex: ".*" + req.body.search, $options: "i" } }
                ],
            }
        }
        let enquiries = await enquiryModel.find(filter)
            .skip(parseInt(req.params.page - 1) * parseInt(req.params.pageSize))
            .limit(parseInt(req.params.pageSize))
            .sort({ createdDate: -1 })
            .lean()
        let totalRecords = await enquiryModel.find(filter).countDocuments();
        return { success: true, data: enquiries, totalRecords }
    } catch (error) {
        console.log("Error occured in fetchAllEnquiries " + error);
        return { success: false, msg: "No enquiry found" };
    }
}

/**
 * Fetch enquery details
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
exports.fetchEnquiryDetails = async (body) => {
    try {
        if (body._id) {
            let enquiry = await enquiryModel.findOne({ _id: mongoose.Types.ObjectId(body._id) }, "").lean();
            return { success: true, data: enquiry };
        } else {
            return { success: true, msg: "Invalid request" };
        }
    } catch (error) {
        console.log("Error occured in fetchEnquiryDetails " + error);
        return { success: false, msg: "Error while fetch enquiry details" };
    }
}
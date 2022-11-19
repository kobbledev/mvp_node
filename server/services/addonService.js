const mongoose = require('mongoose');
const addonModel = require("../models/addons");
/**
 * Save addon
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
 exports.saveAddon = async (body) =>{
    try {
        body.modifiedBy = body.loggedIn;
        body.modifiedDate = new Date();
        if(body._id){
            await addonModel.findByIdAndUpdate(body._id, body, {
                new: true,
            });
            return {success: true, msg:"Addon updated successfully"};
        }else{
            body.createdBy = body.loggedIn;
            body.createdDate = new Date();
            addonModel(body).save();
            return {success: true, msg:"Addon saved successfully"};
        }
    } catch (error) {
        console.log("Error occured in saving the addon "+error);
        return {success: false, msg:"Error while saving the addon"};
    }
}

/**
 * Fetch all Addons
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
 exports.fetchAllAddons = async(req) =>{
    try {
        let addons = await addonModel.find()
            .skip(parseInt(req.params.page - 1) * parseInt(req.params.pageSize))
            .limit(parseInt(req.params.pageSize))
            .sort({createdDate : -1})
            .lean()
            .populate({
                path:"createdBy",
                model:"users",
                select: "name"
            })
            .populate({
                path:"modifiedBy",
                model:"users",
                select: "name"
            });
        if(addons && addons.length >0){
            addons.forEach(itm =>{
                itm.noOfHalls = itm.noOfHalls ? `${itm.noOfHalls} Halls(s)`:"";
            })
        }
        let totalRecords = await addonModel.find().countDocuments();
        return {success : true, data: addons, totalRecords}
    } catch (error) {
        console.log("Error occured in fetchAllAddons "+error);
        return { success: false, msg: "No addon found" };
    }
}

/**
 * Fetch addon details
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
 exports.fetchAddonDetails = async (body) =>{
    try {
        if(body._id){
            let addon = await addonModel.findOne({_id:mongoose.Types.ObjectId(body._id)},"").lean();
            return {success: true, data: addon};
        }else{
            return {success: true, msg:"Invalid request"};
        }
    } catch (error) {
        console.log("Error occured in fetchAddonDetails "+error);
        return {success: false, msg:"Error while fetch addon details"};
    }
}
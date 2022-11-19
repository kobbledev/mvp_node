const mongoose = require('mongoose');
const packagesModel = require("../models/package");
const Constants = require("../helper/constants");
const moment = require('moment');

/**
 * Save package
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
 exports.savePackage = async (body) =>{
    try {
        body.modifiedBy = body.loggedIn;
        body.modifiedDate = new Date();
        if(body._id){
            await packagesModel.findByIdAndUpdate(body._id, body, {
                new: true,
            });
            return {success: true, msg:"Package updated successfully"};
        }else{
            body.createdBy = body.loggedIn;
            body.createdDate = new Date();
            packagesModel(body).save();
            return {success: true, msg:"Package saved successfully"};
        }
    } catch (error) {
        console.log("Error occured in savePackage "+error);
        return {success: false, msg:"Error while saving the package"};
    }
}

/**
 * Fetch all packages
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
 exports.fetchAllPackages = async(req) =>{
    try {
        let packages = await packagesModel.find()
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
        if(packages && packages.length >0){
            packages.forEach(itm =>{
                itm.noOfHalls = itm.noOfHalls ? `${itm.noOfHalls} Halls(s)`:"";
            })
        }
        let totalRecords = await packagesModel.find().countDocuments();
        return {success : true, data: packages, totalRecords}
    } catch (error) {
        console.log("Error occured in fetchAllPackages "+error);
        return { success: false, msg: "No package found" };
    }
}

/**
 * Fetch package details
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
 exports.fetchPackageDetails = async (body) =>{
    try {
        if(body._id){
            let package = await packagesModel.findOne({_id:mongoose.Types.ObjectId(body._id)},"").lean();
            return {success: true, data: package};
        }else{
            return {success: true, msg:"Invalid request"};
        }
    } catch (error) {
        console.log("Error occured in fetchPackageDetails "+error);
        return {success: false, msg:"Error while fetch package details"};
    }
}

/**
 * fetchPackageNames
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
 exports.fetchPackageNames = async (body) => {
    try {
        let packages = await packagesModel.find({ isActive: body.isActive }, "packageName softwareModel validity access isActive").lean();
        let pkgs = [];
        packages.forEach(itm => {
            let expDate;
            itm.access = itm.access ? itm.access :1;
            if(itm.validity === Constants.MONTHLY){
                expDate = moment().add(Number(itm.access), 'M').format('YYYY-MM-DD');
                expDate= new Date(expDate);
            }else if(itm.validity === Constants.YEARLY){
                expDate = moment().add(Number(itm.access), 'Y').format('YYYY-MM-DD');
                expDate= new Date(expDate);
            }
            pkgs= [...pkgs,  {
                label: itm.packageName,
                value: itm._id.toString(),
                softwareModel: itm.softwareModel,
                validity: itm.validity,
                access: itm.access,
                expiryDate: expDate
            }]
        })
        return { success: true, data: pkgs };
    } catch (error) {
        console.log("Error occured in fetchPackageNames " + error);
        return { success: false, msg: "Error while fetchPackageNames" };
    }
}
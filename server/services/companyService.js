const mongoose = require('mongoose');
const companyModel = require("../models/company");
const { base64encode} = require("nodejs-base64");
const Constants = require("../helper/constants");
const userModel = require("../models/users");
const deptModel = require("../models/department");
const designationModel = require("../models/designation");
const eventsModel = require("../models/events");
const isEmpty = require('lodash.isempty');

/**
 * Save company
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
 exports.saveCompany = async (body) =>{
    try {
        body.modifiedBy = body.loggedIn;
        body.modifiedDate = new Date();
        if(body.expiryDate){
            body.expiryDate = new Date(body.expiryDate);
        }
        if(body._id){
            if(body.password){
                delete body.password
            }
            await companyModel.findByIdAndUpdate(body._id, body, {
                new: true,
            });
            if(body.username){
                await userModel.updateOne(
                    { fk_companyId: {$in: body._id} },
                    { $set: { username: body.username } }
                );
            }
            return {success: true, msg:"Company details updated successfully"};
        }else{
            body.createdBy = body.loggedIn;
            body.createdDate = new Date();
            body.isDelete= false;
            let cmpDB = await companyModel(body).save();
            if(cmpDB){
                let obj ={
                    username: body.username,
                    password: base64encode(body.password),
                    isSuperAdmin: false,
                    isAdmin: true,
                    fk_companyId: [cmpDB._id.toString()],
                    createdDate: new Date(),
                    modifiedDate: new Date(),
                    createdBy: body.loggedIn,
                    modifiedBy: body.loggedIn,
                    status: body.status ? body.status : Constants.PENDING,
                    isActive : body.status && body.status === Constants.APPROVED ? true : false,
                    name: "Admin"
                }
                await userModel(obj).save();
            }
            return {success: true, msg:"Company details saved successfully"};
        }
    } catch (error) {
        console.log("Error occured in saveCompany "+error);
        return {success: false, msg:"Error while saving the company"};
    }
}

/**
 * Fetch all packages
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
 exports.fetchAllCompanies = async(req) =>{
    try {
        let companies = await companyModel.find({isDelete: false})
            .skip(parseInt(req.params.page - 1) * parseInt(req.params.pageSize))
            .limit(parseInt(req.params.pageSize))
            .sort({createdDate : -1})
            .select("name city contactNumber expiryDate packageType createdBy modifiedBy createdDate modifiedDate status")
            .lean()
            .populate({
                path:"packageType",
                model:"packages",
                select: "packageName noOfHalls softwareModel"
            })
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
        let totalRecords = await companyModel.find({isDelete: false}).countDocuments();
        return {success : true, data: companies, totalRecords}
    } catch (error) {
        console.log("Error occured in fetchAllCompanies "+error);
        return { success: false, msg: "No company found" };
    }
}

/**
 * Fetch company details
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
 exports.fetchCompanyDetails = async (body) =>{
    try {
        if(body._id){
            let [company, user] = await Promise.all([
                companyModel.findOne({_id:mongoose.Types.ObjectId(body._id)},"").lean(),
                userModel.findOne({fk_companyId: {$in: body._id.toString()}}, "username").lean()
            ]);
            if(user){
                company = company ? {...company, username: user.username} : undefined;
            }
            return {success: true, data: company};
        }else{
            return {success: false, msg:"Invalid request"};
        }
    } catch (error) {
        console.log("Error occured in fetchCompanyDetails "+error);
        return {success: false, msg:"Error while fetch company details"};
    }
}

/**
 * Load CompanyNames
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
exports.loadCompanyNames = async (body) => {
    try {
        let companies = await companyModel.find({ status: body.status, isDelete: false }, "name").lean();
        let cmps = [];
        companies.forEach(itm => {
            cmps= [...cmps,  {
                label: itm.name,
                value: itm._id.toString()
            }]
        })
        return { success: true, data: cmps };
    } catch (error) {
        console.log("Error occured in loadCompanyNames " + error);
        return { success: false, msg: "Error while loadCompanyNames" };
    }
}

/**
 * Save Department
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
 exports.saveDepartment = async (body) =>{
    try {
        body.modifiedBy = body.loggedIn;
        body.modifiedDate = new Date();
        if(body._id){
            await deptModel.findByIdAndUpdate(body._id, body, {
                new: true,
            });
            return {success: true, msg:"Department details updated successfully"};
        }else{
            body.createdBy = body.loggedIn;
            body.createdDate = new Date();
            body.isDelete= false;
            await deptModel(body).save();
            return {success: true, msg:"Department details saved successfully"};
        }
    } catch (error) {
        console.log("Error occured in Department "+error);
        return {success: false, msg:"Error while saving the Department"};
    }
}

/**
 * fetchAllDepartments
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
 exports.fetchAllDepartments = async (req) => {
    try {
        if(isEmpty(req.body.fk_companyId)){
            return { success: false, msg: "Invalid request" };
        }
        let filter={
            fk_companyId: {$in: req.body.fk_companyId},
            isDelete: false
        }
        if(req.body.search){
            filter= {
                ...filter,
                $or: [
                    { departmentName: { $regex: ".*" + req.body.search, $options: "i" } },
                    { displayName: { $regex: ".*" + req.body.search, $options: "i" } },
                ],
            }
        }
        let deptDb = await deptModel.find(filter)
            .skip(parseInt(req.params.page - 1) * parseInt(req.params.pageSize))
            .limit(parseInt(req.params.pageSize))
            .sort({ createdDate: -1 })
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
        let totalRecords = await deptModel.find(filter).countDocuments();
        return { success: true, data: deptDb, totalRecords }
    } catch (error) {
        console.log("Error occured in fetchAllEnquiries " + error);
        return { success: false, msg: "No enquiry found" };
    }
}

/**
 * saveDesignation
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
 exports.saveDesignation = async (body) =>{
    try {
        body.modifiedBy = body.loggedIn;
        body.modifiedDate = new Date();
        if(body._id){
            await designationModel.findByIdAndUpdate(body._id, body, {
                new: true,
            });
            return {success: true, msg:"Designation details updated successfully"};
        }else{
            body.createdBy = body.loggedIn;
            body.createdDate = new Date();
            body.isDelete= false;
            await designationModel(body).save();
            return {success: true, msg:"Designation details saved successfully"};
        }
    } catch (error) {
        console.log("Error occured in Designation "+error);
        return {success: false, msg:"Error while saving the Designation"};
    }
}

/**
 * fetchAllDesigantions
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
 exports.fetchAllDesigantions = async (req) => {
    try {
        if(isEmpty(req.body.fk_companyId)){
            return { success: false, msg: "Invalid request" };
        }
        let filter={
            fk_companyId: {$in: req.body.fk_companyId},
            isDelete: false
        }
        if(req.body.search){
            filter= {
                ...filter,
                $or: [
                    { designationName: { $regex: ".*" + req.body.search, $options: "i" } },
                    { displayName: { $regex: ".*" + req.body.search, $options: "i" } },
                ],
            }
        }
        let designationDb = await designationModel.find(filter)
            .skip(parseInt(req.params.page - 1) * parseInt(req.params.pageSize))
            .limit(parseInt(req.params.pageSize))
            .sort({ createdDate: -1 })
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
        let totalRecords = await designationModel.find(filter).countDocuments();
        return { success: true, data: designationDb, totalRecords }
    } catch (error) {
        console.log("Error occured in fetchAllEnquiries " + error);
        return { success: false, msg: "No enquiry found" };
    }
}

/**
 * saveEventType
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
 exports.saveEventType = async (body) =>{
    try {
        body.modifiedBy = body.loggedIn;
        body.modifiedDate = new Date();
        if(body._id){
            await eventsModel.findByIdAndUpdate(body._id, body, {
                new: true,
            });
            return {success: true, msg:"Event type updated successfully"};
        }else{
            body.createdBy = body.loggedIn;
            body.createdDate = new Date();
            body.isDelete= false;
            await eventsModel(body).save();
            return {success: true, msg:"Event type saved successfully"};
        }
    } catch (error) {
        console.log("Error occured in Event type  "+error);
        return {success: false, msg:"Error while saving the Event type"};
    }
}
/**
 * fetchAllEventType
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
 exports.fetchAllEventType = async (req) => {
    try {
        if(isEmpty(req.body.fk_companyId)){
            return { success: false, msg: "Invalid request" };
        }
        let filter={
            fk_companyId: {$in: req.body.fk_companyId},
            isDelete: false
        }
        if(req.body.search){
            filter= {
                ...filter,
                $or: [
                    { designationName: { $regex: ".*" + req.body.search, $options: "i" } },
                    { displayName: { $regex: ".*" + req.body.search, $options: "i" } },
                ],
            }
        }
        let eventDb = await eventsModel.find(filter)
            .skip(parseInt(req.params.page - 1) * parseInt(req.params.pageSize))
            .limit(parseInt(req.params.pageSize))
            .sort({ createdDate: -1 })
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
        let totalRecords = await eventsModel.find(filter).countDocuments();
        return { success: true, data: eventDb, totalRecords }
    } catch (error) {
        console.log("Error occured in fetchAllEventType " + error);
        return { success: false, msg: "No enquiry found" };
    }
}
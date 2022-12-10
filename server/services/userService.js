const isEmpty = require("lodash.isempty");
const userModel = require("../models/users");
const randomstring = require("randomstring");
const { base64encode } = require("nodejs-base64");
const moment = require('moment');
const designationModel = require("../models/designation");
const mongoose = require('mongoose');

/**
 * Save User
 * @author Praveen
 * @param {*} body 
 */
exports.saveUser = async (body) => {
    try {
        if (isEmpty(body.designation) || isEmpty(body.department) || isEmpty(body.fk_companyId)) {
            return { success: false, msg: "Mandatory fields missed" };
        }
        body.modifiedBy = body.loggedIn;
        body.modifiedDate = new Date();
        if (body._id) {
            if (body.password) {
                delete body.password;
            }
            await userModel.findByIdAndUpdate(body._id, body, {
                new: true,
            });
            return { success: true, msg: "User updated successfully" };
        } else {
            body.createdBy = body.loggedIn;
            body.createdDate = new Date();
            body.isDelete = false;
            body.isActive = true;
            if (body.dob) {
                body.dob = moment(body.dob, "DD-MM-YYYY").toDate();
            }
            body.password = base64encode(randomstring.generate(10));
            if (body.isAdmin === undefined) {
                body.isAdmin = false;
            }
            if (body.isSuperAdmin === undefined) {
                body.isSuperAdmin = false;
            }
            userModel(body).save();
            return { success: true, msg: "User saved successfully" };
        }
    } catch (error) {
        console.log("Error occured in saveUser " + error);
        return { success: false, msg: "Error while saving the saveUser" };
    }
}

/**
 * Fetch Users
 * @author Praveen
 * @param {*} body 
 */
exports.fetchUsers = async (req) => {
    try {
        if (isEmpty(req.body.fk_companyId) || req.body.fk_companyId.length === 0) {
            return { success: false, msg: "Mandatory fields missed" };
        }
        let filter = { isDelete: false, isAdmin: false, fk_companyId: req.body.fk_companyId };
        if (req.body.search) {
            filter = {
                ...filter,
                $or: [
                    { name: { $regex: ".*" + req.body.search, $options: "i" } },
                    { middlename: { $regex: ".*" + req.body.search, $options: "i" } },
                    { lastname: { $regex: ".*" + req.body.search, $options: "i" } },
                    { gender: { $regex: ".*" + req.body.search, $options: "i" } },
                    { mobile: { $regex: ".*" + req.body.search, $options: "i" } },
                    { email: { $regex: ".*" + req.body.search, $options: "i" } }
                ],
            }
        }
        let users = await userModel.find(filter)
            .skip(parseInt(req.params.page - 1) * parseInt(req.params.pageSize))
            .limit(parseInt(req.params.pageSize))
            .sort({ createdDate: -1 })
            .select("name middlename lastname gender mobile email dob designation createdBy modifiedBy createdDate modifiedDate")
            .lean()
            .populate({
                path: "createdBy",
                model: "users",
                select: "name"
            })
            .populate({
                path: "modifiedBy",
                model: "users",
                select: "name"
            })
            .populate({
                path: "designation",
                model: "designation",
                select: "designationName displayName"
            });
        let totalRecords = await userModel.find(filter).countDocuments();
        return { success: true, data: users, totalRecords }
    } catch (error) {
        console.log("Error occured in fetchUsers " + error);
        return { success: false, msg: "No users found" };
    }
}

/**
 * Fetch user
 * @param {*} body 
 * @returns 
 */
exports.fetchUser = async (body) => {
    try {
        let filter = { _id: mongoose.Types.ObjectId(body._id) };
        let user = await userModel.findOne(filter).lean();
        if(user && user.password){
            delete user.password;
        }
        return { success: true, data: user }
    } catch (error) {
        console.log("Error occured in fetchUser" + error);
        return { success: false, msg: "No user found" };
    }
}
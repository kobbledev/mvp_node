const mongoose = require('mongoose');
const packagesModel = require("../models/package");
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
            packagesModel.findByIdAndUpdate({_id: mongoose()}, body);
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
const isEmpty = require("lodash.isempty");
const mongoose = require("mongoose");
const userModel = require("../models/users");
const authenticationService  = require("../services/authenticationService");
const serviceHelper = require("../helper/serverHelper");

/**
 * Login Service call
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
exports.login = async (req, res) =>{
    try {
        let filter={
            username: req.body.username,
            password: req.body.password
        }
        let user = await userModel.findOne(filter,"username isSuperAdmin isAdmin isActive sessionId").lean();
        if(user){
            if(!user.isActive){
                return res.status(200).json({success : false, msg: "User is inactive. Please contact admin"});
            }
        }else{
            return res.status(200).json({success : false, msg: "Invalid credentials"});
        }
        const token = await authenticationService.generateJWTToken(
            { 
                _id: user._id,
                name: req.body.username,
                id: user._id.toString(),
                timeStamp: new Date().getTime()
            },
            "1d",
            "Web"
        );
        req.body.accessToken= token;
        req.body.userId = user._id.toString();
        let respDataSession = await authenticationService.saveSession(req);
        if(isEmpty(respDataSession.sessionId)){
            return res.status(200).json({
              success: false,
              message: "Unable to Process the request, no session id",
              data: null,
            });
        }
        return res.status(200).json({success : true, data: {...user, sessionId:respDataSession.sessionId }});
    } catch (error) {
        //serviceHelper.logWriter({error}, "sessionLogs", "errors", "");
        return res.status(200).json({success : false});
    }
}

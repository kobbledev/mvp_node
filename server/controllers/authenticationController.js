const redis = require("redis");
const redisClient = redis.createClient({
    host: 'localhost',
    port: 6379
});
const isEmpty = require("lodash.isempty");

const authenticationService = require("../services/authenticationService");

/**
 * This method is used for creating the session
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
exports.saveSession = async (req, res) =>{
    try {
        if(this.validateSessionFields(req.body)){
            let response = await authenticationService.saveSession(req);
            return res.status(200).json(response);
        }else{
            return res.status(200).json({success : false, message:"Bad request"});
        }
    } catch (error) {
       console.log("saveSession error :"+error); 
    }
    return res.status(200).json({success : false, message:"error while creating session"});
}

/**
 * Empty check
 * @author Praveen Varma
 * @param {*} data
 * @returns 
 */
exports.validateSessionFields = async (data) =>{
    try {
        if(isEmpty(data) || isEmpty(data.accessToken) || isEmpty(data.username) || isEmpty(data.userId)){
            return false;
        }else{
            return true;
        }
    } catch (error) {
        return false;
    }
}


/**
 * This method is used for deleting the session
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
 exports.logoutUser = async (req, res) =>{
    try {
        if (req.body.sessionId) {
            let sessionKey = `sess:${req.body.sessionId}`;
            let userId="";
            await redisClient.get(sessionKey, (err, data) => {
                userId = data && JSON.parse(data).key && JSON.parse(data).key.userId;
                console.log("Deleting the session id for the user :"+userId);
            });
            await redisClient.del(sessionKey, (err, reply) => {
              if(!err){
                return res.status(200).json({success: true, message:"Successfully loggedout", userId: userId});
              }else{
                return res.status(200).json({success: false, message:"Logout failed", userId: userId});
              }
            });
          } else {
            return res.status(200).json({success: false, message:"Logout failed"});
          }
    } catch (error) {
       console.log("logoutUser error :"+error); 
    }
}

/**
 * This method is used for if user is already logged in then deleting the old session
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res
 */
exports.checkIfUserAlreadyLoggedIn = async (req, res) => {
    try {
        authenticationService.checkIfUserAlreadyLoggedIn(req.body.username);
        return res.status(200).json({success: true, message:"Session deleted successfully"});
    } catch (error) {
        console.log("checkIfUserAlreadyLoggedIn error :"+error); 
    }
}

/**
 * This method is used for validating the session
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res
 */
 exports.validateHeaderSessionToken = async (req, res) => {
    try {
        await authenticationService.validateHeaderSessionToken(req, res);
    } catch (error) {
        console.log("validateHeaderSessionToken error :"+error);
    }
}
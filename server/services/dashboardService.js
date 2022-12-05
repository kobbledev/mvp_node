const mongoose = require('mongoose');
const venueModel = require("../models/venue");
const userModel = require("../models/users");

/**
 * venue Count
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
 exports.venueCount = async(body)=>{
    let resp = {total: 0, active:0, inActive: 0} 
    try {
        let user = await userModel.findOne({_id:mongoose.Types.ObjectId(body.loggedIn)}).lean();
        if(user){
            let filter ={};
            if(user.isSuperAdmin){
                //No conditions
            }else if(user.isAdmin){
                filter ={ 
                    fk_companyId: {$in: user.fk_companyId} 
                };
            }else{
                return {success: false, msg:"Access denied"};
            }
            let items = await venueModel.find(filter);
            resp.total = items && items.length > 0 ? items.length : 0;
            let activeCnt = items.filter(itm => itm.isActive === true);
            let inActiveCnt = items.filter(itm => itm.isActive === false);
            resp.active= activeCnt && activeCnt.length > 0 ? activeCnt.length :0;
            resp.inActive= inActiveCnt && inActiveCnt.length > 0 ? inActiveCnt.length :0;;
            return {success: true, data: resp};
        }else{
            return {success: false, msg:"Invalid user"};
        }
    } catch (error) {
        return {success: false, msg:"Erroe while fetching venue count"};
    }
}
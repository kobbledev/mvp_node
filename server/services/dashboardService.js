const mongoose = require('mongoose');
const venueModel = require("../models/venue");
const userModel = require("../models/users");
const moment = require('moment');
const bookingHallsModel = require("../models/bookHalls");
const companyService = require("../services/companyService");

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

/**
 * Cliwet booking dashboard
 *  * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
exports.bookings = async (body) => {
    try {
        var startDate = moment().startOf('day');
        var endDate = moment(startDate).add(6, 'd').endOf('day');
        console.log(moment(startDate).format("DD-MM-YYYY HH:mm") +" "+moment(endDate).format("DD-MM-YYYY HH:mm"))
        let filter = { fk_companyId: body.fk_companyId };
        let [halls, banquets] = await Promise.all([
            bookingHallsModel.find({
                ...filter,
                entryDate: {
                    $gte: startDate,
                    $lte: endDate
                }
            })
            .lean()
            .sort({entryDate: 1})
            .populate({ path: "hallName", model: "banquet", select: "hallName hallType" })
            .populate({ path: "event", model: "events", select: "type" })
            .populate({ path: "fk_companyId", model: "company", select: "name city" }),

            companyService.fetchAllBanquetsForDropDown({ fk_companyId: body.fk_companyId })
        ]);
        if (halls && halls.length > 0) {
            halls.forEach(itm => {
                itm.entryDate_str = moment(itm.entryDate).format("DD-MM-YYYY");
            })
        }
        if (banquets) {
            banquets=banquets
        }

    } catch (error) {
        console.log("error" + error);
    }
}
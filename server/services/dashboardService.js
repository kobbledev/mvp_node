const mongoose = require('mongoose');
const venueModel = require("../models/venue");
const userModel = require("../models/users");
const moment = require('moment');
const bookingHallsModel = require("../models/bookHalls");
const companyService = require("../services/companyService");
const e = require('express');

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
    let hallsData =[];
    try {
        var startDate = moment().startOf('day');
        var endDate = moment(startDate).add(6, 'd').endOf('day');
        let dates =[];
        [0,1,2,3,4,5,6].forEach(itm =>{
            dates.push(moment(startDate).startOf('day').add(itm, 'd').format("DD-MM-YYYY"));
        })
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
            .populate({ 
                path: "fk_bookId", 
                model: "booking", 
                select: "mobile guestName companyName email country state bookingDate bookingType isCancel bookingType executiveRef" ,
                populate: { path: "executiveRef", model: "users", select:"name middlename lastname email mobile" }
            }),
            companyService.fetchAllBanquetsForDropDown({ fk_companyId: body.fk_companyId })
        ]);
        if (banquets && banquets.data && banquets.data.length >0) {
            halls = halls.filter(itm => itm && itm.fk_bookId && itm.fk_bookId.bookingType && itm.fk_bookId.bookingType === "Confirm");
            halls.forEach(itm => {
                delete itm.__v;
                itm.entryDate_str = moment(itm.entryDate).format("DD-MM-YYYY");
                itm.hallName = itm.hallName && itm.hallName.hallName ? itm.hallName.hallName :"";
                itm.event = itm.event && itm.event.type ? itm.event.type :""; 
                if(itm.fk_bookId){
                    itm.mobile = itm.fk_bookId.mobile;
                    itm.guestName = itm.fk_bookId.guestName;
                    itm.companyName = itm.fk_bookId.companyName;
                    itm.email = itm.fk_bookId.email;
                    itm.country = itm.fk_bookId.country;
                    itm.state = itm.fk_bookId.state;
                    itm.executiveRef = itm.fk_bookId.executiveRef;
                    if(itm.executiveRef && itm.executiveRef._id){
                        delete itm.executiveRef._id;
                    }
                    delete itm.fk_bookId;
                }
            });

            banquets.data.forEach(ban => {
                let hallInfo = halls.filter(hall => hall.hallName === ban.hallName);
                if (hallInfo && hallInfo.length > 0) {
                    let datesArray = [];
                    dates.forEach(dt => {
                        let selHall = hallInfo.filter(hal => dt === hal.entryDate_str);
                        if (selHall && selHall.length > 0) {
                            datesArray = [...datesArray, {
                                date: dt,
                                ...selHall[0],
                                isAvailable: false,
                            }]
                        } else {
                            datesArray = [...datesArray, {
                                date: dt,
                                breakFast: false,
                                lunch: false,
                                dinner: false,
                                isAvailable: true
                            }]
                        }
                    })
                    hallsData = [...hallsData, {
                        hallName: ban.hallName,
                        dates: datesArray
                    }]
                } else {
                    let datesArray = [];
                    dates.forEach(dt => {
                        datesArray = [...datesArray, {
                            date: dt,
                            breakFast: false,
                            lunch: false,
                            dinner: false,
                            isAvailable: true
                        }]
                    })
                    hallsData = [...hallsData, {
                        hallName: ban.hallName,
                        dates: datesArray
                    }]
                }
            })
        }
    } catch (error) {
        console.log("error" + error);
    }
    return {success: true, data:hallsData}
}
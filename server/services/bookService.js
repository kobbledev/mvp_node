const bookModel = require("../models/booking");
const mongoose = require('mongoose');
const bookingHallsModel = require("../models/bookHalls");
const moment = require('moment');
const companyRefModel = require("../models/companyReferences");
const userModel = require("../models/users");
const eventModel = require("../models/events");
const stateModel =require("../models/states"); 
const isEmpty = require("lodash.isempty");
/**
 * Save booking
 * @param {*} body 
 */
exports.saveBooking = async (body) => {
    try {
        body.modifiedBy = body.loggedIn;
        body.modifiedDate = new Date();
        if (body._id) {
            let fetchBook = await bookModel.findOne({_id: mongoose.Types.ObjectId(body._id)}).lean();
            await bookingHallsModel.deleteMany({fk_bookId: fetchBook._id});
            await bookModel.findByIdAndUpdate(body._id, body, {
                new: true,
            });
            if(body.halls && body.halls.length > 0){
                let savedHalls =[];
                for(itm of body.halls){
                    itm.fk_companyId = fetchBook.fk_companyId;
                    itm.fk_bookId = fetchBook._id.toString();
                    itm.event = !isEmpty(itm.event) ? itm.event : null; 
                    await bookingHallsModel(itm).save();
                }
                if(savedHalls && savedHalls.length > 0){
                    await bookModel.updateMany(
                        { _id: fetchBook._id.toString() },
                        { $set: { book_hall_refIds: savedHalls} }
                    )
                }
            }
            return {success: true, msg:"Booking details updated successfully"};
        } else {
            body.createdBy = body.loggedIn;
            body.createdDate = new Date();
            body.isCancel = false;
            body.bookingId = moment(new Date).format("DDMMYYYYHHMMSS")+""+Math.floor(Math.random() * 1000);
            let bookHalls = body.halls ? body.halls : [];
            delete body.halls;
            let bookSave = await bookModel(body).save();
            if (bookSave && bookSave._id) {
                let savedHalls =[];
                for(itm of bookHalls){
                    itm.fk_companyId = body.fk_companyId;
                    itm.fk_bookId = bookSave._id.toString();
                    let hallId= await bookingHallsModel(itm).save();
                    savedHalls.push(hallId._id.toString());
                }
                if(savedHalls && savedHalls.length > 0){
                    await bookModel.updateMany(
                        { _id: bookSave._id.toString() },
                        { $set: { book_hall_refIds: savedHalls} }
                    )
                }
                return {success: true, msg:"Booking details saved successfully"};
            } else {
                return { success: false, msg: "Error while save booking" };
            }
        }
    } catch (error) {
        console.log("Error occured in save Booking details " + error);
        return { success: false, msg: "Error while save Booking details" };
    }
}

/**
 * fetchAllBookings
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
exports.fetchAllBookings = async(req) =>{
    try {
        let body = req.body;
        let filter ={ fk_companyId: body.fk_companyId };
        if(body.bookingId){
            filter= {
                ...filter,
                bookingId: { $regex: ".*" + body.bookingId, $options: "i" } 
            }
        }
        if(body.bookingType){
            filter= {
                ...filter,
                bookingType: { $regex: ".*" + body.bookingType, $options: "i" } 
            }
        }
        if(body.guestName){
            filter= {
                ...filter,
                guestName: { $regex: ".*" + body.guestName, $options: "i" } 
            }
        }
        if(body.mobile){
            filter= {
                ...filter,
                mobile: { $regex: ".*" + body.mobile, $options: "i" } 
            }
        }
        if(body.executiveRef){
            filter= {
                ...filter,
                executiveRef: { $regex: ".*" + body.executiveRef, $options: "i" } 
            }
        }
        if(body.companyRef){
            filter= {
                ...filter,
                companyRef: { $regex: ".*" + body.companyRef, $options: "i" } 
            }
        }
        if(body.fromDate){
            filter= {
                ...filter,
                fromDate: { $gte: moment(body.fromDate) } 
            }
        }
        if(body.toDate){
            filter= {
                ...filter,
                fromDate: { $lte: moment(body.toDate) } 
            }
        }
        let bookDb = await bookModel.find(filter)
            .skip(parseInt(req.params.page - 1) * parseInt(req.params.pageSize))
            .limit(parseInt(req.params.pageSize))
            .sort({createdDate : -1})
            .select("bookingId guestName mobile fromDate toDate bookingType createdBy modifiedBy createdDate modifiedDate isCancel")
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
        let totalRecords = await bookModel.find(filter).countDocuments();
        return {success : true, data: bookDb, totalRecords}
    } catch (error) {
        console.log("Error occured in fetchAllBookings "+error);
        return { success: false, msg: "No data found" };
    }
}

/**
 * fetchBooking
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
 exports.fetchBooking = async(body) =>{
     try {
        if (body._id) {
            let book = await bookModel.findOne({ _id: mongoose.Types.ObjectId(body._id) }).lean()
            .populate({ path:"fk_companyId", model:"company", select: "name city state"})
            .populate({ path:"executiveRef", model:"users", select: "name middlename lastname"})
            .populate({ path:"companyRef", model:"company_reference", select: "companyName"})
            if(book && book._id){
                let bookHall = await bookingHallsModel.find({ fk_bookId: book._id.toString()}).lean()
                .populate({ path:"event", model:"events", select: "type"})
                .populate({ path:"hallName", model:"banquet", select: "hallName hallType"});
                book.halls = bookHall;
            }
            return { success: true, data: book };
        } else {
            return { success: false, msg: "Invalid request" };
        }
     } catch (error) {
        return { success: false, msg: "Errro while load" };
     }
 }
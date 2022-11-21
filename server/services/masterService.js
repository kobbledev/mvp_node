const masterModel = require("../models/masterData");
const statesModel = require("../models/states");
const utils = require("../helper/utils");

/**
 * Fetch master fields
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
exports.getMasterData = async (body) => {
    try {
        let filter = { isActive: true }
        if (body.key) {
            filter = {
                key: { $in: body.key }
            }
            let master = await masterModel.find().lean();
            let items = [];
            if (master && master.length > 0) {
                const ressults = utils.groupBy(master, "key");
                for (const [key, value] of Object.entries(ressults)) {
                    let vals = [];
                    value.forEach(itmD => {
                        vals = [...vals, {
                            label: itmD.label,
                            value: itmD.value,
                            seq: itmD.seq
                        }]
                    })
                    items = [...items, {
                        key: key,
                        items: vals
                    }]
                }
            }
            return { success: true, data: items };
        }
    } catch (error) {
        console.log("Error occured in getMasterData " + error);
        return { success: false, msg: "Error while getMasterData" };
    }
}


/**
 * Fetch all states
 * @author Praveen Varma
 * @param {*} req 
 * @param {*} res 
 */
exports.getAllStates = async (body) => {
    try {
        filter = {
            key: { $in: body.key }
        }
        let states = await statesModel.find().lean();
        let items = [];
        if (states && states.length > 0) {
            states.forEach(itm => {
                items = [...items, {
                    label: `${itm.name} (${itm.code})`,
                    value: itm.code,
                    name: itm.name
                }]
            })
        }
        return { success: true, data: items };
    } catch (error) {
        console.log("Error occured in getAllStates " + error);
        return { success: false, msg: "Error while getAllStates" };
    }
}
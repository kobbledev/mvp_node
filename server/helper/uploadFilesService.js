const fs = require("fs");
const uploadFileModel = require("../models/uploadFiles");
/**
 * @param {*} filles 
 * @returns 
 */
exports.uploadFilesToDB = async (filles) => {
    let fileUploadIds = [];
    try {
        if (filles && filles.length > 0) {
            for (let file of filles) {
                var imgfs = fs.readFileSync(file.path);
                var encode_img = imgfs.toString('base64');
                let imgData = {
                    data: new Buffer(encode_img, 'base64')
                };
                var final_img = {
                    name: file.filename,
                    desc: "test",
                    contentType: file.mimetype,
                    img: imgData,
                    isDeleted:false

                };
                const imageDB = new uploadFileModel(final_img);
                fs.unlinkSync(file.path);

                let imageDBData = await imageDB.save();
                if (imageDBData) {
                    fileUploadIds.push(imageDBData._id.toString());
                }
                
            }
        }
    } catch (err) {
      console.log("Error occured in uploadFilesToDB due to : "+err);
      return fileUploadIds;
    }
    return fileUploadIds;
};
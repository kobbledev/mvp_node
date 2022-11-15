const helper = require("../helper/index");
const pdf = require("html-pdf");
const XLSX = require("xlsx");
const isEmpty = require("lodash.isempty");

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.sendSampleEmail = async(req, res) =>{
    try {
        let template = "<html><body>Test email</body></html>"
        let mailStatus = await helper.sendMail(
            "test@gmail.com",
            "testsubject",
            template,
        );
        res.status(200).json({sucess: true , data: mailStatus});
    } catch (error) {
        console.log("Error while sending email :"+error);
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
 exports.pdfAttachmentEmail = async(req, res) =>{
    try {
        let attachmentInfo = "<html><body>Attachment content</body></html>";
        let template = "html><body>Body content</body></html>"
        pdf
            .create(attachmentInfo)
            .toBuffer((err, buffer) => {
                if (err) {
                    console.log("pdf error :"+err);
                }
                let promises = [];
                let data = helper
                .sendMail(
                        "test@gmail.com",
                        "PDF attachment",
                        template,
                        [
                            {
                                filename: "pdfAttach.pdf",
                                content: buffer,
                            },
                        ],
                        null
                ).then((data) => {
                    return data;
                });
                promises.push(data);
                Promise.all(promises)
                .then((proData) => {
                    if (proData.length && proData[0].status === "success") {
                    }
                })
                .catch((err) => {
                    console.log("Deal proposal pdf : "+err)
                });
            });
        res.status(200).json({sucess: true});
    } catch (error) {
        console.log("Error while sending email :"+error);
    }
}

/**
 * PDF Download
 * @param {*} req 
 * @param {*} res 
 */
exports.prfDownlaod = async(req, res) => {
    try {
        let attachmentInfo = "<html><body>Attachment content</body></html>";
        pdf.create(attachmentInfo).toBuffer((err, buffer) => {
            if (err) {
              return console.log("error");
            }
            res.writeHead(200, {
              "Content-Length": Buffer.byteLength(buffer),
              "Content-Type": "blob",
            });
            res.end(buffer);
          });
    } catch (error) {
        
    }
}

/**
 * Excel Downlaod
 * @param {*} req 
 * @param {*} res 
 */
exports.excelfDownlaod = async(req, res) =>{
    try {
        var Heading = [
            [
              "SNO",
              "Name",
              "EmailId",
            ],
          ];
          let details =[
              {
                  SNO: 1,
                  Name: "Praveen",
                  EmailId: "test@gmail.com"
              },
              {
                SNO: 2,
                Name: "varma",
                EmailId: "varma@gmail.com"
              }
          ];
          let format = "xlsx";
          await sendExcel({
            details,
            res,
            format,
            Heading,
          });
        
    } catch (error) {
        
    }
}

/**
 * Excel
 * @param {*} param0 
 */
const sendExcel = ({
    details,
    res,
    format,
    Heading,
  }) => {
    var wb = XLSX.utils.book_new();
    wb.Props = {
      Title: "test statement",
      Subject: "test statement",
      Author: "test",
      CreatedDate: new Date(),
    };
    wb.SheetNames.push("Test Sheet");
    wb.Sheets["Test Sheet"] = {};
  
    var ws = wb.Sheets[wb.SheetNames[0]];
    let stmtStartDate;
    if (!isEmpty(details)) {
      let someData = {
        cols: [
          { name: "A", key: 0 },
          { name: "B", key: 1 },
          { name: "C", key: 2 },
        ],
        data: [
          [`dwn Details`],
        ],
      };
  
      XLSX.utils.sheet_add_aoa(ws, someData.data, { origin: "A5" });
      XLSX.utils.sheet_add_aoa(ws, Heading, { origin: "A14" });
  
      XLSX.utils.sheet_add_json(
        ws,
        details.map((tx) => {
          return tx;
        }),
        {
          skipHeader: true,
          origin: "A15",
        }
      );
    } else {
      ws = XLSX.utils.aoa_to_sheet([["No Records Found"]]);
    }
  
    wb.Sheets["Details Sheet"] = ws;
  
    var wbout;
    if (format === "xlsx") {
      wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
    } else {
      wbout = XLSX.write(wb, { bookType: "csv", type: "binary" });
    }
    res.send(wbout);
  };
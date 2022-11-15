const nodemailer = require("nodemailer");
const Constants = require("../helper/constants");
const { base64encode, base64decode } = require("nodejs-base64");

/**
 * 
 * @param {*} to 
 * @param {*} subject 
 * @param {*} text 
 * @param {*} attachments 
 * @param {*} cc 
 * @returns 
 */
exports.sendMail = async (to, subject, text, attachments, cc) => {
  if(to){
    let user="",pwd="",host="";
    if(process.env.ENABLE_SEND_GRID==="YES"){
      user=process.env.SEND_GRID_UN;
      pwd=process.env.SEND_GRID_PWD;
      host=process.env.SEND_GRID_HOST;
    }else{
      user=base64decode(process.env.EMAIL_AUTH_USER);
      pwd=base64decode(process.env.EMAIL_AUTH_PWD);
      host=base64decode(process.env.EMAIL_HOST);
    }
    const transporter = nodemailer.createTransport({
      host: host,
      secure: true,
      secureConnection: false, // TLS requires secureConnection to be false
      tls: {
        ciphers: "SSLv3",
      },
      requireTLS: true,
      port: 465,
      debug: process.env.NODE_ENV === "development" ? true : false,
      auth: {
        user: user,
        pass: pwd,
      },
      pool: true,
      maxConnections: 100,
      maxMessages: 1000
    });
    let mailOptions = {
      from: base64decode(process.env.EMAIL_AUTH_USER),
      to,
      subject,
      html: text,
      attachments
    };
    if(cc && cc!== "" && cc!==''){
      mailOptions.cc=cc;
    }
    try {
      let info = await transporter.sendMail(mailOptions);
      console.log("email sent response: " + JSON.stringify(info));
      return {
        status: Constants.SUCCESS,
        message: "Email Sent",
      };
    } catch (err) {
      console.log(err.stack);
      return {
        status: Constants.FAILED,
        message: "Email failed to send, Please try again",
      };
    }
  }else{
    return {
      status: Constants.FAILED,
      message: "To is undefined",
    };
  }
};


module.exports = exports;

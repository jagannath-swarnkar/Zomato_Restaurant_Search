var nodemailer = require('nodemailer');

module.exports.mailer = (email,message)=>{
// transport service which can send email from this email.
var transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"jagannath18@navgurukul.org",
        pass: "1017114@Jagan"
    }
})

// we use gmail as transport service

// user configuration email where we will send verification detail

const mailOption ={
        from : "jagannath18@navgurukul.org", // sender email add.
        to : email, // user email address.
        subject : 'Email verification',
        html : message  // plain text body
};

// sending the email using sendMail method provided by the transported object

transporter.sendMail(mailOption, (err, info)=>{
    if(err){console.log(err)}
    else{console.log(info)}
});
};
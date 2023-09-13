const nodemailer = require("nodemailer");

function generateOTP() {

    // Declare a digits variable 
    // which stores all digits
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

const sendMailOTP = async (userEmail, userName) => {

    const otp = generateOTP();
    let testAccount = await nodemailer.createTestAccount();

    // connect with the smtp
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            user: "testhostsite123@gmail.com",
            pass: "urzskschkroezgml",
        },
    });

    // let message = {
    //     from: '"TMDB App" <testhostsite123@gmail.com>', // sender address
    //     to: `"${userEmail}"`, // list of receivers
    //     subject: "Verification Code", // Subject line
    //     text: `${otp}`, // plain text body
    //     html: `<b>Hi ${userName},</b>
    //         <p>We are sending you this email because you requested a password reset. Use the below otp to reset password.</p>
    //         <p><h1>${otp}</h1></p>`, // html body
    // };

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"TMDB App" <testhostsite123@gmail.com>', // sender address
        to: `"${userEmail}"`, // list of receivers
        subject: "Verification Code", // Subject line
        text: `${otp}`, // plain text body
        html: `<b>Hi ${userName},</b>
            <p>We are sending you this email because you requested a password reset. Use the below otp to reset password.</p>
            <p><h1>${otp}</h1></p>`, // html body
    });
    return otp;
};

module.exports = {
    sendMailOTP
};
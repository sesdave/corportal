const nodemailer = require("nodemailer");

module.exports = (template, data) => {
    let transporter = nodemailer.createTransport({
        host: process.env.MAILER_HOST,
        port: process.env.MAILER_PORT,
        secure: process.env.MAILER_SECURE, // true for 465, false for other ports
        auth: {
            user: process.env.MAILER_USER,
            pass: process.env.MAILER_PASS
        }
    });

    // send mail with defined transport object
    return transporter.sendMail({
        from: `${process.env.MAILER_NAME}<${process.env.MAILER_USER}>`, // sender address
        to: data.email, // list of receivers
        subject: data.subject, // Subject line
        html: template // html body
    });
}
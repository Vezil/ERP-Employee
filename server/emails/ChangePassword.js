'use strict';

const { Users } = require('../models');

const nodemailer = require('nodemailer');

// async..await is not allowed in global scope, must use a wrapper
async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing

    // const testAccount = await Users.findByPk(22);
    // console.log(testAccount.email);
    // console.log(testAccount.password);

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: '127.0.0.1',
        port: 1025,
        secure: false // true for 465, false for other ports
        // auth: {
        //     user: testAccount.email,
        //     pass: testAccount.password
        // }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'ERP Employee server, <admin@erp.test>', // sender address
        to: 'You , <example@gmail.com>', // list of receivers
        subject: 'Change Password', // Subject line
        text: 'You changed password correctly!', // plain text body
        html: '<b>You changed password correctly!</b>' // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);

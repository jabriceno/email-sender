const handlebars = require("nodemailer-express-handlebars");
const nodemailer = require("nodemailer");
const path = require("path");
require('dotenv').config({ path: './.env' });


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.account,
        pass: process.env.password,
    },
});

const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve("./src/views/"),
        defaultLayout: false,
    },
    viewPath: path.resolve("./src/views/"),
};

// use a template file with nodemailer
transporter.use("compile", handlebars(handlebarOptions));

const mailOptions = {
    from: `"${process.env.user}" <${process.env.account}>`,
    to: "account@doamin.com", // list of receivers
    subject: "Congratulations, you won!",
    template: "email",
    context: {
        name: "Name",
    },
    attachments: [{
        filename: "beer.jpg",
        path: "./src/attachments/beer.jpg"
    }],
};

// trigger the sending of the E-mail
transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        return console.log(error);
    }
    console.log("Message sent: " + info.response);
});
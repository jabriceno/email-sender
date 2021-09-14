const Express = require("express");
const router = Express.Router();
const handlebars = require("nodemailer-express-handlebars");
const nodemailer = require("nodemailer");
const path = require("path");
const utils = require("../utils/utils");

require("dotenv").config({ path: "./.env" });

router.post("/send", async (req, res) => {
    const { receiptName, receiptEmail, subject, template } = req.body;

    if (utils.validateEmail(receiptEmail)) {
        // validates email
        try {
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

            transporter.use("compile", handlebars(handlebarOptions));

            const mailOptions = {
                from: `"${process.env.user}" <${process.env.account}>`,
                to: receiptEmail,
                subject: subject,
                template: template,
                context: {
                    name: receiptName,
                },
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    return console.log(error);
                }
                console.log(
                    `Message sent to: <${receiptEmail}> - Response: ${info.response}`
                );
                res.json({
                    response: `Message sent ${info.response}`,
                    receipt: receiptEmail,
                });
            });
        } catch (err) {
            console.log(err);
            res.status(500).json("Server Error");
        }
    } else {
        res.status(400).json("Invalid email address");
    }
});

module.exports = router;

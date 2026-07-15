const nodemailer = require("nodemailer");

console.log("EMAIL_USER =", process.env.EMAIL_USER);
console.log("EMAIL_PASS =", process.env.EMAIL_PASS ? "FOUND" : "NOT FOUND");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendLeadNotification = async (lead) => {

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: "New Lead Received - SK Property Hub",
        html: `<h2>Test Email</h2>`
    };

    try {

        console.log("Sending Email...");

        const info =
            await transporter.sendMail(mailOptions);

        console.log("Email Sent Successfully");
        console.log(info.response);

    } catch (error) {

        console.log("EMAIL ERROR:");
        console.log(error);

    }

};

module.exports = sendLeadNotification;
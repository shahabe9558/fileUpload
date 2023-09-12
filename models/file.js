const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
require('dotenv').config();
const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    tags: {
        type: String,
    },
    email: {
        type: String,
    }
});

// post middleware 
fileSchema.post('save', async function (doc) {
    try {
        // console.log("doc is = ", doc);
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });
        // SEND MAIL  //shift this configuration to config folder

        let info = await transporter.sendMail({
            from: "Shahabe Alam",
            to: doc.email,
            subject: "New file uploaded to cloudinary",
            html: `<h1> Hello Sab </h1> <p> File Uploaded </p> File Uploaded View Here : <a href = "${doc.imageUrl}">${doc.imageUrl}</a>`,
        })
        console.log("Info", info);

    }
    catch (error) {
        console.log(error);
        console.log("Error while sending mail");

    }
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
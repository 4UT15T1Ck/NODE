import nodemailer from 'nodemailer';
import {text} from 'express';

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'oliver31@ethereal.email',
        pass: 'n8yr9MuTYBKh58K4CW'
    }
});

export const mailService = {
    async sendMail(
        {
            emailFrom,
            emailTo,
            emailSubject,
            emailText
        }
    ){
        const mailOptions ={
            from: emailFrom,
            to:emailTo,
            subject: emailSubject,
            text: emailText
        }
        console.log("mailOptions: ", mailOptions);
        return await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
        return true;
    }

}


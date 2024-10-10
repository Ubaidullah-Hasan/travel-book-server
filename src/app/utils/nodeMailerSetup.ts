import nodemailer from 'nodemailer';
import config from '../config';

export const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: config.email_user,
        pass: config.email_pass,  
    }
});
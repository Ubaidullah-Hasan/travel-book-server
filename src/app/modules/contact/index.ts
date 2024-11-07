import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { transporter } from "../../utils/nodeMailerSetup";
import config from "../../config";
import { Router } from "express";

const sendMessage = catchAsync(async (req, res) => {
    const { message, email, name } = req.body;

    const mailOptions = {
        to: email,
        from: config.email_user,
        subject: `New message from ${name}`,
        html: `
            <div style={{
                display: 'flex',
                flex-derection: "column",
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',  // পুরো ভিউপোর্টের উচ্চতা জুড়ে সেন্টার করার জন্য
                backgroundColor: '#f0f0f0',  // হালকা ব্যাকগ্রাউন্ড রঙ
                fontFamily: 'Arial, sans-serif',
                textAlign: 'center',
                padding: '20px',
                borderRadius: '10px',
            }}>
                <h2>Message From ${name}</h2>
                <p>
                    ${message}
                </p>
            </div>
        `
    };

    const result = await transporter.sendMail(mailOptions);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Message send successfull!',
        data: result,
    });
});


const router = Router();
export const sendMessageRouter = router.post(
    "/",
    sendMessage
);


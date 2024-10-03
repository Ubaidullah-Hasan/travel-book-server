import httpStatus from "http-status";
import { sendResponse } from "../../utils/sendResponse";
import config from "../../config";
import { AuthServices } from "./auth.services";
import { catchAsync } from "../../utils/catchAsync";

const registerUser = catchAsync(async (req, res) => {
    const result = await AuthServices.registerUser(req.body);
    const { refreshToken, accessToken } = result;

    res.cookie('refreshToken', refreshToken, {
        secure: config.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: true,
    });

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User registered in successfully!',
        data: {
            accessToken,
            refreshToken,
        },
    });
});


export const AuthControllers = {
    registerUser,
};

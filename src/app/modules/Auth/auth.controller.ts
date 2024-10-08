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

const userlogin = catchAsync(async (req, res) => {
    const result = await AuthServices.userLogin(req.body);
    const { refreshToken, accessToken } = result;

    res.cookie('refreshToken', refreshToken, {
        secure: config.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: true, 
    });

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User logged in successfully!',
        data: {
            accessToken,
            refreshToken,
        },
    });
});


const changePassword = catchAsync(async (req, res) => {
    const {...passwordData } = req.body;

    const result = await AuthServices.changePassword(req.user, passwordData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Password updated successfully!',
        data: result,
    });
});


export const AuthControllers = {
    registerUser,
    userlogin,
    changePassword,
};

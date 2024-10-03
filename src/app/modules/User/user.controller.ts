/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { UserModel } from "./user.model";
import { catchAsync } from "../../utils/catchAsync";
import { UserServices } from "./user.services";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const createUser = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;

    const result = await UserServices.createUser(payload);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User created successfully!",
        data: result
    })
});



const getSingleUser = catchAsync(async (req, res) => {
    const user = await UserServices.getSingleUserFromDB(req.params.id);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'User Retrieved Successfully',
        data: user,
    });
});

export const userController = {
    createUser,
    getSingleUser,
}
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response } from "express";
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

const getAllUsers = catchAsync(async (req, res) => {
    const users = await UserServices.getAllUsersFromDB(req.query);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Users Retrieved Successfully',
        data: users,
    });
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

const updateUser = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const { email } = req.params;

    const result = await UserServices.updateUser(email, payload);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User updated successfully!",
        data: result
    })
});

const followingUser = catchAsync(async (req: Request, res: Response) => {
    const { userId, followingId } = req.body;

    const result = await UserServices.toggleFollowing(followingId, userId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Now You Are Following!",
        data: result
    })
});

const getUserFollowingAndFollowers = catchAsync(async (req: Request, res: Response) => {
    const { userId } = req.params;

    const followData = await UserServices.getUserFollowingAndFollowers(userId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Retrive Following!",
        data: followData
    })
});

const premiumUser = catchAsync(async (req, res) => {
    const { userId } = req.params;
    const result = await UserServices.premiumUser(userId, req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Payment!',
        data: result,
    });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    await UserServices.deleteUser(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User deleted successfully!",
        data: null,
    })
});

const editUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const {role} = req.body;

    const result = await UserServices.editUserRole(id, role);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User edited successfully!",
        data: result,
    })
});

export const userController = {
    createUser,
    getSingleUser,
    getAllUsers,
    updateUser,
    followingUser,
    getUserFollowingAndFollowers,
    premiumUser,
    deleteUser,
    editUser,
}
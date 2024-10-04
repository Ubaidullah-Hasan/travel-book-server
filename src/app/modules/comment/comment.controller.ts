import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { Request, Response } from "express";
import { commentServices } from "./comment.services";

const createComment = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body; 

    const result = await commentServices.createCommentIntoDB(payload);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Comment created successfully!",
        data: result
    })
});

const getAllComment = catchAsync(async (req, res) => {
    const users = await commentServices.getAllComment();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Comments Retrieved Successfully',
        data: users,
    });
});

const getSingleComment = catchAsync(async (req, res) => {
    const {id} = req.params;
    const users = await commentServices.getSingleCommentById(id);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Comment Retrieved Successfully',
        data: users,
    });
});



export const commentController = {
    createComment,
    getAllComment,
    getSingleComment,
}
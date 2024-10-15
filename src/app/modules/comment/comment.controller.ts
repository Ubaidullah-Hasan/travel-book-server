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

const getAllCommentOfPost = catchAsync(async (req, res) => {
    const { postId } = req.params;
    const users = await commentServices.getAllCommentOfPostById(postId, req.query);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Comments Retrieved Successfully',
        data: users,
    });
});

const getSingleComment = catchAsync(async (req, res) => {
    const { id } = req.params;
    const users = await commentServices.getSingleCommentById(id);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Comment Retrieved Successfully',
        data: users,
    });
});

const deleteCommentById = catchAsync(async (req, res) => {
    const { commentId } = req.params;
    const { userId } = req.query;

    await commentServices.deleteCommentById(commentId, userId as string);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Comment Deleted Successfully',
        data: null,
    });
});


const editCommentByCommentOwner = catchAsync(async (req, res) => {
    const { commentId } = req.params;
    const { userId } = req.query;
    const payload = req.body;

    const result = await commentServices.editCommentByCommentOwner(commentId, userId as string, payload);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Comment Edite Successfully!',
        data: result,
    });
});



export const commentController = {
    createComment,
    getAllComment,
    getSingleComment,
    getAllCommentOfPost,
    deleteCommentById,
    editCommentByCommentOwner,
}
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { Request, Response } from "express";
import { postServices } from "./post.services";

const createPost = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body; 

    const result = await postServices.createPostIntoDB(payload);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Post created successfully!",
        data: result
    })
});

const getAllPost = catchAsync(async (req, res) => {
    const users = await postServices.getAllPost(req.query);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Posts Retrieved Successfully',
        data: users,
    });
});

const getSinglePost = catchAsync(async (req, res) => {
    const {id} = req.params;
    const users = await postServices.getSinglePostById(id);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Post Retrieved Successfully',
        data: users,
    });
});

const getUserPosts = catchAsync(async (req, res) => {
    const {id} = req.params;
    const users = await postServices.getUserPostsById(id);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Your Posts Retrieved Successfully',
        data: users,
    });
});





export const postController = {
    createPost,
    getAllPost,
    getSinglePost,
    getUserPosts,
}
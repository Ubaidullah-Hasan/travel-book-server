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


const toggleUpVote = catchAsync(async (req, res) => {
    const { postId } = req.params;
    const {userId} = req.body;
    const users = await postServices.toggleUpVote(postId, userId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Upvote Successfully Added!',
        data: users,
    });
});

const toggleDownVote = catchAsync(async (req, res) => {
    const { postId } = req.params;
    const {userId} = req.body;
    const users = await postServices.toggleDownVote(postId, userId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Down vote successfully added!',
        data: users,
    });
});

const deletePostPermanently = catchAsync(async (req, res) => {
    const { postId } = req.params;
    const result = await postServices.deletePostPermanently(postId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Post delete successfull!',
        data: result,
    });
});




export const postController = {
    createPost,
    getAllPost,
    getSinglePost,
    getUserPosts,
    toggleUpVote,
    toggleDownVote,
    deletePostPermanently,
}
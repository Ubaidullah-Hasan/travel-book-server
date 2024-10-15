import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { PostModel } from "../post/post.model";
import { TComment } from "./comment.interface";
import { CommentModel } from "./comment.model";
import { QueryBuilder } from "../../builder/QueryBuilder";
import mongoose from "mongoose";


const createCommentIntoDB = async (payload: TComment) => {
    const post = await PostModel.findById(payload.postId);

    if (!post) {
        throw new AppError(httpStatus.BAD_REQUEST, "No post found!");
    }

    const result = await CommentModel.create(payload);
    return result;
}

const getAllComment = async () => {
    const result = await CommentModel.find();
    return result;
}

const getAllCommentOfPostById = async (postId: string, query: Record<string, unknown>) => {
    const comments = new QueryBuilder(CommentModel.find({ postId: postId }), query)
        .fields()
        .paginate()
        .sort()


    const result = await comments.modelQuery
        .populate("userId")
        .populate("postId");

    return result;
}

const getSingleCommentById = async (id: string) => {
    const result = await CommentModel.findById(id);
    return result;
}

const deleteCommentById = async (commentId: string, userId: string) => {

    const comment = await CommentModel.findById(commentId);
    if (!comment) {
        throw new AppError(httpStatus.NOT_FOUND, "Comment not found!")
    }
    const userIdStrToObjId = new mongoose.Types.ObjectId(userId); // userId will schema types and => interface will mongoose.Types.ObjectId


    if (!comment?.userId.equals(userIdStrToObjId)) { // for compatibility check
        throw new AppError(httpStatus.BAD_REQUEST, "You are not allowed to delete!")
    }

    const result = await CommentModel.findByIdAndDelete(commentId);
    return result;
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const editCommentByCommentOwner = async (commentId: string, userId: string, payload: any) => {

    const comment = await CommentModel.findById(commentId);
    if (!comment) {
        throw new AppError(httpStatus.NOT_FOUND, "Comment not found!")
    }
    const userIdStrToObjId = new mongoose.Types.ObjectId(userId); // userId will schema types and => interface will mongoose.Types.ObjectId


    if (!comment?.userId.equals(userIdStrToObjId)) { // for compatibility check
        throw new AppError(httpStatus.BAD_REQUEST, "You are not allowed to delete!")
    }

    const result = await CommentModel.findByIdAndUpdate(commentId,
        { comment: payload.comment },
        { new: true }
    );

    return result;
}

export const commentServices = {
    createCommentIntoDB,
    getAllComment,
    getSingleCommentById,
    getAllCommentOfPostById,
    deleteCommentById,
    editCommentByCommentOwner,
}
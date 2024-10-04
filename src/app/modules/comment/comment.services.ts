import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { PostModel } from "../post/post.model";
import { TComment } from "./comment.interface";
import { CommentModel } from "./comment.model";


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
const getAllCommentOfPostById = async (postId: string) => {
    console.log(postId)
    const result = await CommentModel.find({ postId: postId });
    return result;
}
const getSingleCommentById = async (id: string) => {
    const result = await CommentModel.findById(id);
    return result;
}

export const commentServices = {
    createCommentIntoDB,
    getAllComment,
    getSingleCommentById,
    getAllCommentOfPostById,
}
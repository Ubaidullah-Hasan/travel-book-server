import mongoose from "mongoose";
import { QueryBuilder } from "../../builder/QueryBuilder";
import { PostSearchableFields } from "./post.constant";
import { TPost } from "./post.interface";
import { PostModel } from "./post.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";


const createPostIntoDB = async (payload: TPost) => {
    const result = await PostModel.create(payload);
    return result;
}

const getAllPost = async (query: Record<string, unknown>) => {
    const posts = new QueryBuilder(PostModel.find(), query)
        .fields()
        .paginate()
        .sort()
        .filter()
        .search(PostSearchableFields)

    const result = await posts.modelQuery
        .populate('categoryId')
        .populate("userId");

    return result;
}

const getSinglePostById = async (id: string) => {
    const result = await PostModel.findById(id)
        .populate('categoryId')
        .populate("userId");
    return result;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updatePostById = async (id: string, payload: any) => {
    const post = await PostModel.findById(id);

    if (!post) {
        throw new AppError(httpStatus.NOT_FOUND, "No post found!");
    }

    const result = await PostModel.findByIdAndUpdate(
        id,
        { ...payload },
        { new: true }
    )
    return result;
}

const getUserPostsById = async (id: string) => {
    const result = await PostModel.find({ userId: id })
        .populate('categoryId')
        .populate("userId");
    return result;
}

const toggleUpVote = async (postId: string, userId: string) => {
    const post = await PostModel.findById(postId);

    if (!post) {
        throw new Error('Post not found!');
    };

    const userObjectId = new mongoose.Types.ObjectId(userId);
    const existDownVote = post.downVote.includes(userObjectId);

    if (existDownVote) {
        throw new AppError(httpStatus.BAD_REQUEST, "You give already down vote!")
    }

    const hasUpvoted = post.upVote.includes(userObjectId);

    let updatedPost;

    if (hasUpvoted) {
        // If the user has upvoted, remove their vote (Unvote)
        updatedPost = await PostModel.findByIdAndUpdate(
            postId,
            {
                $pull: { upVote: userObjectId },
            },
            { new: true }
        );
    } else {
        // If the user has not upvoted, add their vote (Upvote)
        updatedPost = await PostModel.findByIdAndUpdate(
            postId,
            { $addToSet: { upVote: userObjectId } },
            { new: true }
        );
    }
    if (updatedPost) {
        updatedPost.upVoteSize = updatedPost.upVote.length;
        await updatedPost.save();
    }

    return updatedPost;
}


const toggleDownVote = async (postId: string, userId: string) => {
    const post = await PostModel.findById(postId);

    if (!post) {
        throw new Error('Post not found!');
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);
    const existUpVote = post.upVote.includes(userObjectId);

    if (existUpVote) {
        throw new AppError(httpStatus.BAD_REQUEST, "You give already up vote!")
    }

    const hasDownvoted = post.downVote.includes(userObjectId);

    let updatedPost;

    if (hasDownvoted) {
        // If the user has upvoted, remove their vote (Unvote)
        updatedPost = await PostModel.findByIdAndUpdate(
            postId,
            { $pull: { downVote: userObjectId } },
            { new: true }
        );
    } else {
        // If the user has not upvoted, add their vote (Upvote)
        updatedPost = await PostModel.findByIdAndUpdate(
            postId,
            { $addToSet: { downVote: userObjectId } },
            { new: true }
        );
    }

    return updatedPost;
}

const deletePostPermanently = async (postId: string) => {
    const post = await PostModel.findByIdAndDelete(postId);
    if (!post) {
        throw new AppError(httpStatus.NOT_FOUND, "No post found!");
    }
    return post;
}

const sharePostIntoDB = async (postId:string, payload: TPost) => {
    const postInfo = {
        userId: payload.userId,
        description: payload.description,
        isPremium: payload.isPremium,
        sharedForm: postId, // orginal post information
    }
     
    const result = await PostModel.create(postInfo);
    return result;
}

export const postServices = {
    createPostIntoDB,
    getAllPost,
    getSinglePostById,
    getUserPostsById,
    toggleUpVote,
    toggleDownVote,
    deletePostPermanently,
    updatePostById,
    sharePostIntoDB,
}
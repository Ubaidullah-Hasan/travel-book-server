/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import { QueryBuilder } from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { UserSearchableFields } from "./user.constant";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";
import mongoose from "mongoose";
import { PostModel } from "../post/post.model";
import { createPayment } from "../payment/payment_utils";


const createUser = async (payload: TUser) => {
    const user = await UserModel.create(payload);

    return user;
};

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
    const users = new QueryBuilder(UserModel.find(), query)
        .fields()
        .paginate()
        .sort()
        .filter()
        .search(UserSearchableFields);

    const result = await users.modelQuery;

    return result;
};



const getSingleUserFromDB = async (id: string) => {
    const user = await UserModel.findById(id);

    return user;
};


const updateUser = async (email: string, payload: TUser) => {
    const user = await UserModel.isUserExistsByEmail(email);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User does not exist");
    }

    const result = await UserModel.findOneAndUpdate(
        { email: email },
        payload,
        { new: true }
    );
    return result;
};

const toggleFollowing = async (followingId: string, userId: string) => {
    // Find the current user to check if they are already following
    const user = await UserModel.findById(userId);

    if (!user) {
        throw new Error('User not found!');
    }

    // Check if the user is already following the target user
    const followingObjectId = new mongoose.Types.ObjectId(followingId);
    const isFollowing = user.following.includes(followingObjectId);

    let result;

    if (isFollowing) {
        // If the user is already following, remove them (Unfollow)
        result = await UserModel.findByIdAndUpdate(
            userId,
            { $pull: { following: followingId } }, // Remove followingId from the following list
            { new: true }
        );

        // Remove the current user from the target user's followers list
        await UserModel.findByIdAndUpdate(
            followingId,
            { $pull: { followers: userId } }, // Remove userId from the followers list
            { new: true }
        );
    } else {
        // If the user is not following, add them (Follow)
        result = await UserModel.findByIdAndUpdate(
            userId,
            { $addToSet: { following: followingId } }, // Add followingId to the following list
            { new: true }
        );

        // Add the current user to the target user's followers list
        await UserModel.findByIdAndUpdate(
            followingId,
            { $addToSet: { followers: userId } }, // Add userId to the followers list
            { new: true }
        );
    }

    return result;
};

const getUserFollowingAndFollowers = async (userId: string) => {
    const user = await UserModel.findById(userId)
        .select('followers following')
        .populate([
            { path: 'following', select: 'name profilePhoto email' },
            { path: 'followers', select: 'name profilePhoto email' },
        ]);

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found!");
    }

    const followersCount = user.followers.length;
    const followingCount = user.following.length;

    // Return the followers, following, and their count
    return {
        followers: user.followers,
        following: user.following,
        followersCount,
        followingCount
    };
}

const premiumUser = async (userId: string, payload: any) => {
    const user = await UserModel.findById(userId);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    if(user?.isVerified){
        throw new AppError(httpStatus.NOT_FOUND, "User already verified!");
    }

    const userPosts = await PostModel.find({ userId: userId });

    const hasUpvote = userPosts.some(post => {
        return post.upVote.length > 0;
        // return post.upVote.includes(new mongoose.Types.ObjectId(userId));
    });

    if (!hasUpvote) {
        throw new AppError(httpStatus.EXPECTATION_FAILED, "You have no enough up votes!");
    }

    const transactionId = 'TNX-' + Date.now();

    // todo:

    let result;
    if (hasUpvote) {
        const paymentInfo = {
            amount: payload.totalPrice,
            tran_id: transactionId,
            cus_name: user.name,
            cus_email: user.email,
            cus_phone: user?.mobileNumber || "01401635894",
        }
        
        result = await createPayment(paymentInfo);
    }

    return result;
}

export const UserServices = {
    createUser,
    getSingleUserFromDB,
    getAllUsersFromDB,
    updateUser,
    toggleFollowing,
    getUserFollowingAndFollowers,
    premiumUser,
};

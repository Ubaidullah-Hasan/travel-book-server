import mongoose, { ObjectId } from "mongoose"

export type TPost = {
    _id: ObjectId;
    userId: ObjectId;
    title: string;
    description: string;
    images: string[];
    categoryId: ObjectId;
    upVote: mongoose.Types.ObjectId[];
    downVote: mongoose.Types.ObjectId[];
    isPremium: boolean;
}
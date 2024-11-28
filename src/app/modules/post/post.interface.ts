import mongoose, { Document, ObjectId } from "mongoose"

export interface TPost extends Document {
    _id: ObjectId;
    userId: ObjectId;
    title: string;
    description: string;
    images: string[];
    categoryId: ObjectId;
    upVote: mongoose.Types.ObjectId[];
    downVote: mongoose.Types.ObjectId[];
    isPremium: boolean;
    upVoteSize: number;
    sharedForm: ObjectId;
}
import mongoose, { ObjectId } from "mongoose"

export type TComment = {
    _id: ObjectId;
    userId: mongoose.Types.ObjectId;
    postId: mongoose.Types.ObjectId;
    comment: string;
    files: string[];
    replies: string[];
}
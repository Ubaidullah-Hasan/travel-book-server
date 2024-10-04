import { ObjectId } from "mongoose"

export type TComment = {
    _id: ObjectId;
    userId: ObjectId;
    postId: ObjectId;
    comment: string;
    files: string[];
}
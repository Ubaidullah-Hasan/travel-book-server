import { ObjectId } from "mongoose"

export type TPost = {
    _id: ObjectId;
    userId: ObjectId;
    title: string;
    description: string;
    images: string[];
    categoryId: ObjectId;
    isPremium: boolean;
}
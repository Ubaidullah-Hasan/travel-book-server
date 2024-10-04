import { ObjectId } from "mongoose"

export type TCategory = {
    _id: ObjectId;
    name: string;
    file: string;
}
import { TComment } from "./comment.interface";
import { CommentModel } from "./comment.model";


const createCommentIntoDB = async (payload: TComment) => {
    console.log(payload);
    // todo => check post is available
    // const result = await CommentModel.create(payload);
    // return result;
}

const getAllComment = async () => {
    const result = await CommentModel.find();
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
}
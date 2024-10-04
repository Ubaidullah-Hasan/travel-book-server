import { QueryBuilder } from "../../builder/QueryBuilder";
import { PostSearchableFields } from "./post.constant";
import { TPost } from "./post.interface";
import { PostModel } from "./post.model";


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
        .search(PostSearchableFields);
    const result = await posts.modelQuery;

    return result;
}

const getSinglePostById = async (id: string) => {
    const result = await PostModel.findById(id);
    return result;
}

export const postServices = {
    createPostIntoDB,
    getAllPost,
    getSinglePostById,
}
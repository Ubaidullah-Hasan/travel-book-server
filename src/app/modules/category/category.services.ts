import { TCategory } from "./category.interface";
import { CategoryModel } from "./category.model";

const createCategoryIntoDB = async(payload: TCategory) => {
    const result = await CategoryModel.create(payload);
    return result;
}

const getAllCategory = async() => {
    const result = await CategoryModel.find();
    return result;
}
const getSingleCategory = async(id: string) => {
    const result = await CategoryModel.findById(id);
    return result;
}

export const categoryServices = {
    createCategoryIntoDB,
    getAllCategory,
    getSingleCategory,
}
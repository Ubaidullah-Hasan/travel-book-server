import { QueryBuilder } from "../../builder/QueryBuilder";
import { UserSearchableFields } from "./user.constant";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";


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

export const UserServices = {
    createUser,
    getSingleUserFromDB,
    getAllUsersFromDB
};

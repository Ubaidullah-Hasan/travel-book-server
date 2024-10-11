import httpStatus from "http-status";
import { QueryBuilder } from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
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


const updateUser = async (email: string, payload: TUser) => {
    const user = await UserModel.isUserExistsByEmail(email);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User does not exist");
    }

    const result = await UserModel.findOneAndUpdate(
        { email: email },
        payload,
        { new: true }
    );
console.log(result);
    return result;
};

export const UserServices = {
    createUser,
    getSingleUserFromDB,
    getAllUsersFromDB,
    updateUser
};

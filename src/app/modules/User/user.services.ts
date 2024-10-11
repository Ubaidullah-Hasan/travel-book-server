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
    return result;
};

// “Following” is the term for the users who you follow. "Followers" are the users who follow you
// followingId => ami jake 
// followerId => je amake (userId)
const following = async (followingId: string, userId: string) => {

    // increase following of UserModel
    const result = await UserModel.findByIdAndUpdate(
        userId,
        { $addToSet: { following: followingId } },
        { new: true }
    );

    // increase folower of UserModel
    if (result) {
        await UserModel.findByIdAndUpdate(followingId,
            { $addToSet: { followers: userId } },
            { new: true }
        )
    }

    return result;
}

export const UserServices = {
    createUser,
    getSingleUserFromDB,
    getAllUsersFromDB,
    updateUser,
    following,
};

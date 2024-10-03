import { TUser } from "./user.interface";
import { UserModel } from "./user.model";


const createUser = async (payload: TUser) => {
    const user = await UserModel.create(payload);

    return user;
};





const getSingleUserFromDB = async (id: string) => {
    const user = await UserModel.findById(id);

    return user;
};

export const UserServices = {
    createUser,
    getSingleUserFromDB,
    // getAllUsersFromDB,
};

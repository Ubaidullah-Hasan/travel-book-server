import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { UserModel } from "../User/user.model";
import { TRegisterUser } from "./auth.interface";
import { createToken } from "../../utils/verifyJWT";
import config from "../../config";

const registerUser = async (payload: TRegisterUser) => {
    // checking if the user is exist
    const user = await UserModel.isUserExistsByEmail(payload?.email);

    if (user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is already exist!');
    }

    const newUser = await UserModel.create(payload);

    //create token and sent to the  client

    const jwtPayload = {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        profilePhoto: newUser.profilePhoto,
        role: newUser.role,
        status: newUser.status,
        isVarified: newUser.isVerified,
        isDeleted: newUser.isDeleted,
    };

    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as string
    );

    const refreshToken = createToken(
        jwtPayload,
        config.jwt_refresh_secret as string,
        config.jwt_refresh_expires_in as string
    );

    return {
        accessToken,
        refreshToken,
    };
};


export const AuthServices = {
    registerUser,
};
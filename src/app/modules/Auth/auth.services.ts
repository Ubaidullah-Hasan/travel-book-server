import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { UserModel } from "../User/user.model";
import { TLoginUser, TRegisterUser } from "./auth.interface";
import { createToken } from "../../utils/verifyJWT";
import config from "../../config";
import { USER_STATUS } from "../User/user.constant";
import bcrypt from 'bcrypt';
import { JwtPayload } from "jsonwebtoken";


const registerUser = async (payload: TRegisterUser) => {
    // checking if the user is exist
    const user = await UserModel.isUserExistsByEmail(payload?.email);

    if (user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is already exist!');
    }

    const newUser = await UserModel.create(payload);

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


const userLogin = async (payload: TLoginUser) => {
    // checking if the user is exist
    const user = await UserModel.isUserExistsByEmail(payload?.email);

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
    }

    // checking if the user is blocked
    const userStatus = user?.status;

    if (userStatus === USER_STATUS.BLOCKED) {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
    }

    //checking if the password is correct

    if (!(await UserModel.isPasswordMatched(payload?.password, user?.password)))
        throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

    //create token and sent to the  client

    const jwtPayload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePhoto: user.profilePhoto,
        role: user.role,
        status: user.status,
        isVarified: user.isVerified,
        isDeleted: user.isDeleted,
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


const changePassword = async (
    userData: JwtPayload,
    payload: { oldPassword: string; newPassword: string }
) => {
    // checking if the user is exist
    const user = await UserModel.isUserExistsByEmail(userData.email);

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
    }

    // checking if the user is blocked

    const userStatus = user?.status;

    if (userStatus === USER_STATUS.BLOCKED) {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
    }

    //checking if the password is correct

    if (!(await UserModel.isPasswordMatched(payload.oldPassword, user?.password))){
        throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
    }
        

    //hash new password
    const newHashedPassword = await bcrypt.hash(
        payload.newPassword,
        Number(config.bcrypt_salt_rounds)
    );

    await UserModel.findOneAndUpdate(
        {
            email: userData.email,
            role: userData.role,
        },
        {
            password: newHashedPassword,
            passwordChangedAt: new Date(),
        }
    );

    return null;
};



export const AuthServices = {
    registerUser,
    userLogin,
    changePassword,
};
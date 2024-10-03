import mongoose, { Model } from "mongoose";
import { USER_ROLE, USER_STATUS } from "./user.constant"

export type TUser = {
    _id: string,
    email: string,
    name: string,
    password: string,
    profilePhoto: string,
    role: keyof typeof USER_ROLE;
    status: keyof typeof USER_STATUS;
    isVerified: boolean,
    following: mongoose.Types.ObjectId[];
    followers: mongoose.Types.ObjectId[];
    mobileNumber?: string;
    isDeleted: boolean,
    createdAt?: Date;
    updatedAt?: Date;
}

export interface TUserModel extends Model<TUser>{
    isUserExistsByEmail(email: string): Promise<TUser>;
    isPasswordMatched(
        plainTextPassword: string,
        hashedPassword: string
    ): Promise<boolean>;
    // isJWTIssuedBeforePasswordChanged(
    //     passwordChangedTimestamp: Date,
    //     jwtIssuedTimestamp: number
    // ): boolean; todo
}
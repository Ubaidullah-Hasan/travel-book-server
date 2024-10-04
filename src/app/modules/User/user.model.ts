import mongoose, { model, Schema } from "mongoose";
import { TUser, TUserModel } from "./user.interface";
import { USER_ROLE, USER_STATUS } from "./user.constant";
import bcrypt from 'bcrypt';
import config from "../../config";

// import profilePhoto from "../../../assets/user.png"

const userSchema = new Schema<TUser, TUserModel>(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        name: { type: String, required: true },
        password: {
            type: String,
            required: true,
            select: false, // সাধারণত পাসওয়ার্ড আড়াল থাকে
        },
        profilePhoto: {
            type: String,
            default: "https://i.ibb.co.com/nb7ZFPP/user.png"
        },
        role: {
            type: String,
            enum: [USER_ROLE.ADMIN, USER_ROLE.USER],
            default: USER_ROLE.USER
        },
        status: {
            type: String,
            enum: [USER_STATUS.ACTIVE, USER_STATUS.BLOCKED],
            default: USER_STATUS.ACTIVE
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        following: [{
            type: mongoose.Types.ObjectId,
            ref: 'User',
            default: []
        }],
        followers: [{
            type: mongoose.Types.ObjectId,
            ref: 'User',
            default: []
        }],
        mobileNumber: {
            type: String,
            default: ""
        },
        isDeleted: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
)


userSchema.pre("save", async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;

    user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));

    next();
});

userSchema.post("save", function (result, next) {

    result.password = ""
    next();
})

userSchema.statics.isUserExistsByEmail = async (email:string) => {
    // PASSWORD SHOW =>  UserModel.select("+password")
    // PASSWORD HIDE =>  UserModel.select("-password")
    return await UserModel.findOne({ email }).select("+password");
}

userSchema.statics.isPasswordMatched = async function (
    plainTextPassword,
    hashedPassword
) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
};

// userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
//     passwordChangedTimestamp: number,
//     jwtIssuedTimestamp: number
// ) {
//     const passwordChangedTime =
//         new Date(passwordChangedTimestamp).getTime() / 1000;
//     return passwordChangedTime > jwtIssuedTimestamp;
// }; todo

export const UserModel = model<TUser, TUserModel>("User", userSchema); 
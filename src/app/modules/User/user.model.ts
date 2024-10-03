import mongoose, { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import { USER_ROLE, USER_STATUS } from "./user.constant";
// import profilePhoto from "../../../assets/user.png"

const userSchema = new Schema<TUser>(
    {
        email: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        password: { type: String, required: true },
        profilePhoto: { 
            type: String, 
            default: "../../../assets/user.png" 
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

export const UserModel = model<TUser>("User", userSchema); 
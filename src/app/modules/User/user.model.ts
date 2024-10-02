import mongoose, { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import { USER_ROLE, USER_STATUS } from "./user.constant";

const userSchema = new Schema<TUser>(
    {
        _id: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        password: { type: String, required: true },
        needPasswordChange: { type: Boolean, default: true },
        profilePhoto: { type: String, required: false },
        role: { type: String, enum: [USER_ROLE.ADMIN, USER_ROLE.USER], required: true }, 
        status: { type: String, enum: [USER_STATUS.ACTIVE, USER_STATUS.BLOCKED], required: true }, 
        isVerified: { type: Boolean, default: false },
        following: [{ type: mongoose.Types.ObjectId, ref: 'User', default: [] }],
        followers: [{ type: mongoose.Types.ObjectId, ref: 'User', default: [] }],
        mobileNumber: { type: String, required: false },
        isDeleted: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
)

export const UserModal = model<TUser>("User", userSchema); 
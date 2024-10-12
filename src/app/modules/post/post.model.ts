import mongoose, { model, Schema } from "mongoose";
import { TPost } from "./post.interface";

const PostSchema = new Schema<TPost>({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Category',
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        validate: {
            validator: function (files: string[]) {
                return files.every(file => /^https?:\/\/.+/.test(file));
            },
            message: "Each file must be a valid URL"
        },
        default: [],
    },
    upVote: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    downVote: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    isPremium: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

export const PostModel = model<TPost>("Post", PostSchema);


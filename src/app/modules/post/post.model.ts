import mongoose, { model, Schema } from "mongoose";
import { TPost } from "./post.interface";

const PostSchema = new Schema<TPost>({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
    },
    title: {
        type: String,
        default: '',
    },
    description: {
        type: String,
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
    upVoteSize: {
        type: Number,
    },
    downVote: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    isPremium: {
        type: Boolean
    },
    sharedForm: {
        type: mongoose.Types.ObjectId,
        ref: "Post",
        default: "",
    }
}, {
    timestamps: true,
});

export const PostModel = model<TPost>("Post", PostSchema);


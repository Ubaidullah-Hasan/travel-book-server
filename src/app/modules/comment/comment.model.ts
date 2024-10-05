import { model, Schema } from "mongoose";
import { TComment } from "./comment.interface";

const CommentSchema = new Schema<TComment>({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    postId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Post',
    },
    comment: {
        type: String,
        required: true,
        trim: true
    },
    files: {
        type: [String],
        validate: {
            validator: function (files: string[]) {
                return files.every(file => /^https?:\/\/.+/.test(file));
            },
            message: "Each file must be a valid URL"
        },
    },
    replies: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment',
        },
    ],
},{
    timestamps: true
});

export const CommentModel = model<TComment>("Comment", CommentSchema);


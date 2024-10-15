import { z } from "zod";

// Regex for MongoDB ObjectId validation
const objectIdRegex = /^[a-f\d]{24}$/i;

const createCommentValidationSchema = z.object({
    body: z.object({
        userId: z.string().nonempty({ message: "User ID is required" }),
        postId: z.string().nonempty({ message: "Post ID is required" }),
        comment: z
            .string()
            .min(1, { message: "Comment is required" })
            .trim(),
        files: z
            .array(z.string().url({ message: "Each file must be a valid URL" }))
            .nonempty({ message: "At least one file is required" })
            .optional(),
        replies: z.array(
            z.string().regex(objectIdRegex, { message: "Invalid reply ObjectId" })
        ).optional(), 
    })
});

const updateCommentValidationSchema = z.object({
    body: z.object({
        comment: z
            .string()
            .min(1, { message: "Comment is required" })
            .trim(),
        files: z
            .array(z.string().url({ message: "Each file must be a valid URL" }))
            .optional(),
        replies: z.array(
            z.string().regex(objectIdRegex, { message: "Invalid reply ObjectId" })
        ).optional(), 
    })
});


export const commentValidation = {
    createCommentValidationSchema,
    updateCommentValidationSchema,
}
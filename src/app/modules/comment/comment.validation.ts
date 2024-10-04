import { z } from "zod";

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
    })
});


export const commentValidation = {
    createCommentValidationSchema,
}
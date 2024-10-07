import { z } from "zod";

const createPostValidationSchema = z.object({
    body: z.object({
        userId: z.string().nonempty({ message: "User ID is required" }),
        categoryId: z.string().nonempty({ message: "Category ID is required" }),
        title: z.string().min(1, { message: "Title is required" }),
        description: z.string().min(1, { message: "Description is required" }),
        images: z
            .array(z.string().url({ message: "Each image must be a valid URL" }))
            .nonempty({ message: "At least one image is required" })
            .optional(),
        upVote: z.number()
            .min(0, { message: "UpVote must be at least 0" })
            .default(0),
        downVote: z.number()
            .min(0, { message: "UpVote must be at least 0" })
            .default(0),
        isPremium: z.boolean().optional().default(false),
    })
});



const updatePostValidationSchema = z.object({
    body: z.object({
        userId: z.string().nonempty({ message: "User ID is required" }).optional(),
        categoryId: z.string().nonempty({ message: "Category ID is required" }).optional(),
        title: z.string().min(1, { message: "Title is required" }).optional(),
        description: z.string().min(1, { message: "Description is required" }).optional(),
        images: z
            .array(z.string().url({ message: "Each image must be a valid URL" }))
            .nonempty({ message: "At least one image is required" })
            .optional(),
        upVote: z.number()
            .min(0, { message: "UpVote must be at least 0" })
            .default(0)
            .optional(),
        downVote: z.number()
            .min(0, { message: "DownVote must be at least 0" })
            .default(0)
            .optional(),
        isPremium: z.boolean().optional().default(false),
    })
});


export const postValidation = {
    createPostValidationSchema,
    updatePostValidationSchema,
}
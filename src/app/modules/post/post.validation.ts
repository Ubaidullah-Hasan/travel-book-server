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
        isPremium: z.boolean().optional().default(false),
    })
});


export const postValidation = {
    createPostValidationSchema,
}
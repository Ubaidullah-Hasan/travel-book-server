import { z } from "zod";

const objectIdSchema = z.string().refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
    message: "Invalid ObjectId format",
});

const createPostValidationSchema = z.object({
    body: z.object({
        userId: z.string().nonempty({ message: "User ID is required" }),
        categoryId: z.string().nonempty({ message: "Category ID is required" }),
        title: z.string().min(1, { message: "Title is required" }),
        description: z.string().min(1, { message: "Description is required" }),
        images: z
            .array(z.string().url({ message: "Each image must be a valid URL" }))
            .optional() 
            .refine((val) => val === undefined || val.length === 0 || val.length > 0, {
                message: "At least one image is required if provided",
            }),
        upVote: z.array(objectIdSchema).default([]), 
        upVoteSize: z.number().default(0),
        downVote: z.array(objectIdSchema).default([]),
        isPremium: z.boolean({message: "Is premium is required!"}),
        sharedForm: z.string({message: "It contain objectId!"}).optional().default("")
    })
});

const sharePostValidationSchema = z.object({
    body: z.object({
        userId: z.string().nonempty({ message: "User ID is required" }),
        description: z.string().min(1, { message: "Description is required" }).optional(),
        images: z
            .array(z.string().url({ message: "Each image must be a valid URL" }))
            .optional()
            .refine((val) => val === undefined || val.length === 0 || val.length > 0, {
                message: "At least one image is required if provided",
            }),
        upVote: z.array(objectIdSchema).default([]),
        upVoteSize: z.number().default(0),
        downVote: z.array(objectIdSchema).default([]),
        isPremium: z.boolean({ message: "Is premium is required!" }),
    })
});



const updatePostValidationSchema = z.object({
    body: z.object({
        // userId: z.string().nonempty({ message: "User ID is required" }).optional(),
        categoryId: z.string().nonempty({ message: "Category ID is required" }).optional(),
        title: z.string().min(1, { message: "Title is required" }).optional(),
        description: z.string().min(1, { message: "Description is required" }).optional(),
        // images: z
        //     .array(z.string().url({ message: "Each image must be a valid URL" }))
        //     .optional() // Allow the field to be omitted
        //     .refine((val) => val === undefined || val.length === 0 || val.length > 0, {
        //         message: "At least one image is required if provided",
        //     }),
        isPremium: z.boolean().optional(),
    })
});

const updateVoteSchema = z.object({
    body: z.object({
        userId: z.string().length(24, { message: "Invalid Object ID format" })
    })
})


export const postValidation = {
    createPostValidationSchema,
    updatePostValidationSchema,
    updateVoteSchema,
    sharePostValidationSchema,
}
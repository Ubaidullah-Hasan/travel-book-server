import { z } from "zod";

export const createCategoryValidationSchema = z.object({
    body: z.object({
        name: z
            .string()
            .nonempty({ message: "Category name is required" })
            .trim(),
        file: z
            .string()
            .url({ message: "Each file must be a valid URL" })
            .default("https://i.ibb.co/98Z7g63/application.png")
    })
});

export const categoryValidation = {
    createCategoryValidationSchema,
}
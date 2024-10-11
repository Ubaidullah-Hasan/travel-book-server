import { z } from 'zod';
import { USER_ROLE, USER_STATUS } from './user.constant';


const createUserValidationSchema = z.object({
    body: z.object({
        email: z.string({ message: "Invalid email address" }).email({ message: "Invalid email address" }),
        name: z.string({ message: "Name is required" }).nonempty({ message: "Name is required" }),
        password: z.string({ message: "Password is required!" }).min(6, { message: "Password must be at least 6 characters" }),
        profilePhoto: z.string().url().optional(),
        role: z.enum([USER_ROLE.ADMIN, USER_ROLE.USER], { message: "Invalid role" }).default(USER_ROLE.USER),
        status: z.enum([USER_STATUS.ACTIVE, USER_STATUS.BLOCKED], { message: "Invalid status" }).default(USER_STATUS.ACTIVE),
        isVerified: z.boolean().default(false),
        following: z.array(z.string().regex(/^[a-fA-F0-9]{24}$/, { message: "Invalid ObjectId" })).optional(),
        followers: z.array(z.string().regex(/^[a-fA-F0-9]{24}$/, { message: "Invalid ObjectId" })).optional(),
        mobileNumber: z.string()
            .refine((value) => {
                return /^0[1-9]\d{1,14}$/.test(value);
            }, {
                message: "Invalid mobile number format"
            }).optional(),
        isDeleted: z.boolean().optional().default(false),
    })
});


const updateUserValidationSchema = z.object({
    body: z.object({
        email: z.string().email({ message: "Invalid email address" }).optional(),
        name: z.string().optional(),
        profilePhoto: z.string().url().optional(),
        role: z.enum([USER_ROLE.ADMIN, USER_ROLE.USER], { message: "Invalid role" }).default(USER_ROLE.USER),
        status: z.enum([USER_STATUS.ACTIVE, USER_STATUS.BLOCKED], { message: "Invalid status" }).optional(),
        isVerified: z.boolean().optional(),
        following: z.array(z.string().regex(/^[a-fA-F0-9]{24}$/, { message: "Invalid ObjectId" })).optional(),
        followers: z.array(z.string().regex(/^[a-fA-F0-9]{24}$/, { message: "Invalid ObjectId" })).optional(),
        mobileNumber: z.string()
            .refine((value) => {
                // যদি নম্বরের শুরুতে +880 না থাকে, তবে সেটি যোগ করুন
                // const processedValue = `+880${value}`;
                // যাচাই করুন যে প্রক্রিয়াকৃত নম্বরটি সঠিক ফরম্যাটে আছে কিনা
                return /^0[1-9]\d{1,14}$/.test(value);
            }, {
                message: "Invalid mobile number format"
            }).optional(),
        isDeleted: z.boolean().optional().default(false),
    })
});

export const userValidation = {
    createUserValidationSchema,
    updateUserValidationSchema
}
import { AnyZodObject } from "zod";
import { catchAsync } from "../utils/catchAsync";

export const validateRequest = (schema:AnyZodObject) => {
    return catchAsync(async (req, res, next) => {
            const parsedBody = await schema.parseAsync({
                body: req.body
            });
            req.body = parsedBody.body;
            
            next();
    })
}  
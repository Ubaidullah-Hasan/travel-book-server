import { AnyZodObject } from "zod";

export const validateRequest = (schema:AnyZodObject) => {
    return async(req, res, next) => {
        try {
            const parsedBody = await schema.parseAsync({
                body: req.body
            });
            req.body = parsedBody.body;
            next();
        } catch (error) {
            console.log(error);
        }
    } 
}
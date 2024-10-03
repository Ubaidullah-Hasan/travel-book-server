/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { UserModel } from "./user.model";

const createUser = async(req: Request, res: Response) => {
    try {
        const userInfo = req.body;
        console.log(userInfo);
        const result = await UserModel.create(userInfo);
        res.send(result);
    } catch (error:any) {
        console.log(error.message);
    }

}

export const userController = {
    createUser,
}
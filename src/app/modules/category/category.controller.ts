import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { categoryServices } from "./category.services";
import { Request, Response } from "express";

const createCategory = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body; 

    const result = await categoryServices.createCategoryIntoDB(payload);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Category created successfully!",
        data: result
    })
});

const getAllCategory = catchAsync(async (req, res) => {
    const users = await categoryServices.getAllCategory();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Categories Retrieved Successfully',
        data: users,
    });
});

const getSingleCategory = catchAsync(async (req, res) => {
    const {id} = req.params;
    const users = await categoryServices.getSingleCategory(id);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Category Retrieved Successfully',
        data: users,
    });
});



export const categoryController = {
    createCategory,
    getAllCategory,
    getSingleCategory
}
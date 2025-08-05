import { Request, Response } from "express"
import catchAsync from "../../../shared/catchAsync"
import { sendSuccessResponse } from "../../../shared/sendSuccessResponse"
import httpStatus from 'http-status'
import { categoryService } from "./category.service"
import pick from "../../../shared/pick"
import { IPaginationOption } from "../../../interfaces/sharedInterface"
import { paginationFields } from "../../../constants/shared.constant"
import { CATEGORY_FILTER_FIELDS } from "./category.constant"



const getAllCategory = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, ['searchTerm', ...CATEGORY_FILTER_FIELDS])
    const paginationOption: IPaginationOption = pick(req.query, paginationFields)
    const result = await categoryService.getAllCategory(filters, paginationOption)
    sendSuccessResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Car Owner list fetched successfully',
        data: result,
    })
})

const createCategory = catchAsync(async (req: Request, res: Response) => {
    const result = await categoryService.createCategory(req.body)
    sendSuccessResponse(res, {
        statusCode: httpStatus.OK,
        message: "Category Created",
        data: result
    })
})

const getSingleCategory = catchAsync(async (req: Request, res: Response) => {
    const { userId } = req.params
    const result = await categoryService.getSingleCategory(userId)
    sendSuccessResponse(res, {
        statusCode: httpStatus.OK,
        message: "Category Fetched",
        data: result
    })
})






export const categoryController = {
    getAllCategory,
    createCategory,
    getSingleCategory
}
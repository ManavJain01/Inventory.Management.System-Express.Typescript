
import * as stockService from "./stock.service";
import { createResponse } from "../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from 'express'

export const createStock = asyncHandler(async (req: Request, res: Response) => {
    const result = await stockService.createStock(req.body);
    res.send(createResponse(result, "Stock created successfully"))
});

export const updateStock = asyncHandler(async (req: Request, res: Response) => {
    const result = await stockService.updateStock(req.params.id, req.body);
    res.send(createResponse(result, "Stock updated successfully"))
});

export const editStock = asyncHandler(async (req: Request, res: Response) => {
    const result = await stockService.editStock(req.params.id, req.body);
    res.send(createResponse(result, "Stock updated successfully"))
});

export const deleteStock = asyncHandler(async (req: Request, res: Response) => {
    const result = await stockService.deleteStock(req.params.id);
    res.send(createResponse(result, "Stock deleted successfully"))
});


export const getStockById = asyncHandler(async (req: Request, res: Response) => {
    const result = await stockService.getStockById(req.params.id);
    res.send(createResponse(result))
});


export const getAllStock = asyncHandler(async (req: Request, res: Response) => {
    const result = await stockService.getAllStock();
    res.send(createResponse(result))
});
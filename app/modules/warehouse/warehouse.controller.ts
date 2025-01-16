
import * as warehouseService from "./warehouse.service";
import { createResponse } from "../../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from 'express'

export const createWarehouse = asyncHandler(async (req: Request, res: Response) => {
    const result = await warehouseService.createWarehouse(req.body);
    res.send(createResponse(result, "Warehouse created successfully"))
});

export const updateWarehouse = asyncHandler(async (req: Request, res: Response) => {
    const result = await warehouseService.updateWarehouse(req.params.id, req.body);
    res.send(createResponse(result, "Warehouse updated successfully"))
});

export const editWarehouse = asyncHandler(async (req: Request, res: Response) => {
    const result = await warehouseService.editWarehouse(req.params.id, req.body);
    res.send(createResponse(result, "Warehouse updated successfully"))
});

export const deleteWarehouse = asyncHandler(async (req: Request, res: Response) => {
    const result = await warehouseService.deleteWarehouse(req.params.id);
    res.send(createResponse(result, "Warehouse deleted successfully"))
});


export const getWarehouseById = asyncHandler(async (req: Request, res: Response) => {
    const result = await warehouseService.getWarehouseById(req.params.id);
    res.send(createResponse(result))
});


export const getAllWarehouse = asyncHandler(async (req: Request, res: Response) => {
    const result = await warehouseService.getAllWarehouse();
    res.send(createResponse(result))
});
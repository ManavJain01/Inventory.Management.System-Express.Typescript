
import * as inventoryService from "./inventory.service";
import { createResponse } from "../../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from 'express'

export const createInventory = asyncHandler(async (req: Request, res: Response) => {
    const result = await inventoryService.createInventory(req.body);
    res.send(createResponse(result, "Inventory created successfully"))
});

export const updateInventory = asyncHandler(async (req: Request, res: Response) => {
    const result = await inventoryService.updateInventory(req.params.id, req.body);
    res.send(createResponse(result, "Inventory updated successfully"))
});

export const editInventory = asyncHandler(async (req: Request, res: Response) => {
    const result = await inventoryService.editInventory(req.params.id, req.body);
    res.send(createResponse(result, "Inventory updated successfully"))
});

export const deleteInventory = asyncHandler(async (req: Request, res: Response) => {
    const result = await inventoryService.deleteInventory(req.params.id);
    res.send(createResponse(result, "Inventory deleted successfully"))
});


export const getInventoryById = asyncHandler(async (req: Request, res: Response) => {
    const result = await inventoryService.getInventoryById(req.params.id);
    res.send(createResponse(result))
});


export const getAllInventory = asyncHandler(async (req: Request, res: Response) => {
    const result = await inventoryService.getAllInventory();
    res.send(createResponse(result))
});

export const getWarehousesById = asyncHandler(async (req: Request, res: Response) => {
    const result = await inventoryService.getWarehousesById(req.params.id as Object);
    res.send(createResponse(result))
});

export const csvReport = asyncHandler(async (req: Request, res: Response) => {    
    const csvData = await inventoryService.csvReport(req.query.startDate as string, req.query.endDate as string);
    res.header('Content-Type', 'text/csv');
    res.attachment('inventory-report.csv');
    res.send(csvData);
});

export const pdfReport = asyncHandler(async (req: Request, res: Response) => {
    await inventoryService.pdfReport(res, req.query.startDate as string, req.query.endDate as string);
});
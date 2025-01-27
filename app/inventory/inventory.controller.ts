
import * as inventoryService from "./inventory.service";
import { createResponse } from "../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from 'express'

/**
 * @file inventory.controller.ts
 * @author Adebayo Ademola <https://github.com/adebayo>
 * @since 0.0.1
 * @description inventory controller
 */

/**
 * Creates a new inventory item.
 * @param {Request} req - The request object containing inventory data in the body.
 * @param {Response} res - The response object to send the result of the creation.
 * @returns {Promise<void>} - A promise that resolves when the inventory is created and response is sent.
 */
export const createInventory = asyncHandler(async (req: Request, res: Response) => {
    const result = await inventoryService.createInventory(req.body);
    res.send(createResponse(result, "Inventory created successfully"));
});

/**
 * Updates an existing inventory item.
 * @param {Request} req - The request object containing the inventory ID in params and update data in the body.
 * @param {Response} res - The response object to send the result of the update.
 * @returns {Promise<void>} - A promise that resolves when the inventory is updated and response is sent.
 */
export const updateInventory = asyncHandler(async (req: Request, res: Response) => {
    const result = await inventoryService.updateInventory(req.params.id, req.body);
    res.send(createResponse(result, "Inventory updated successfully"));
});

/**
 * Partially updates an existing inventory item.
 * @param {Request} req - The request object containing the inventory ID in params and update data in the body.
 * @param {Response} res - The response object to send the result of the update.
 * @returns {Promise<void>} - A promise that resolves when the inventory is updated and response is sent.
 */
export const editInventory = asyncHandler(async (req: Request, res: Response) => {
    const result = await inventoryService.editInventory(req.params.id, req.body);
    res.send(createResponse(result, "Inventory updated successfully"))
});

/**
 * Deletes an inventory item by ID.
 * @param {Request} req - The request object containing the inventory ID in params.
 * @param {Response} res - The response object to send the result of the deletion.
 * @returns {Promise<void>} - A promise that resolves when the inventory is deleted and response is sent.
 */
export const deleteInventory = asyncHandler(async (req: Request, res: Response) => {
    const result = await inventoryService.deleteInventory(req.params.id);
    res.send(createResponse(result, "Inventory deleted successfully"));
});


/**
 * Retrieves an inventory item by its ID.
 * @param {Request} req - The request object containing the inventory ID in params.
 * @param {Response} res - The response object to send the result of the retrieval.
 * @returns {Promise<void>} - A promise that resolves when the inventory is found and response is sent.
 */
export const getInventoryById = asyncHandler(async (req: Request, res: Response) => {
    const result = await inventoryService.getInventoryById(req.params.id);
    res.send(createResponse(result))
});


/**
 * Retrieves all inventory items.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object to send the result.
 * @returns {Promise<void>} - A promise that resolves when the inventory items are retrieved and response is sent.
 */
export const getAllInventory = asyncHandler(async (req: Request, res: Response) => {
    const result = await inventoryService.getAllInventory();
    res.send(createResponse(result));
});

/**
 * Retrieves all warehouses for a given product ID.
 * @param {Request} req - The request object containing the product ID in params.
 * @param {Response} res - The response object to send the result of the retrieval.
 * @returns {Promise<void>} - A promise that resolves when the warehouses are found and response is sent.
 */
export const getWarehousesById = asyncHandler(async (req: Request, res: Response) => {
    const result = await inventoryService.getWarehousesById(req.params.id as Object);
    res.send(createResponse(result))
});

export const filteredProducts = asyncHandler(async (req: Request, res: Response) => {
    const result = await inventoryService.filteredProducts(req.query.query as string);
    res.send(createResponse(result))
});

/**
 * Generates a CSV report of inventory data and sends it as a response.
 * @param {Request} req - The request object containing start and end date query parameters.
 * @param {Response} res - The response object used to send the CSV file.
 * @returns {Promise<void>} - A promise that resolves when the CSV report is generated and sent.
 */
export const csvReport = asyncHandler(async (req: Request, res: Response) => {    
    const csvData = await inventoryService.csvReport(req.query.startDate as string, req.query.endDate as string);
    res.header('Content-Type', 'text/csv');
    res.attachment('inventory-report.csv');
    res.send(csvData);
});

/**
 * Generates a PDF report of inventory data and sends it as a response.
 * @param {Request} req - The request object containing start and end date query parameters.
 * @param {Response} res - The response object used to send the PDF file.
 * @returns {Promise<void>} - A promise that resolves when the PDF report is generated and sent.
 */
export const pdfReport = asyncHandler(async (req: Request, res: Response) => {
    await inventoryService.pdfReport(res, req.query.startDate as string, req.query.endDate as string);
});


import * as warehouseService from "./warehouse.service";
import { createResponse } from "../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from 'express'

/**
 * @file warehouse.controller.ts
 * @author Adebayo Ademola <https://github.com/adebayo>
 * @since 0.0.1
 * @description warehouse controller
 */

/**
 * Creates a new warehouse.
 * @param {Request} req - The request object containing warehouse data in the body.
 * @param {Response} res - The response object to send the result of the creation.
 * @returns {Promise<void>} - A promise that resolves when the warehouse is created and response is sent.
 */
export const createWarehouse = asyncHandler(async (req: Request, res: Response) => {
    const result = await warehouseService.createWarehouse(req.body);
    res.send(createResponse(result, "Warehouse created successfully"))
});

/**
 * Updates an existing warehouse.
 * @param {Request} req - The request object containing the warehouse ID in params and update data in the body.
 * @param {Response} res - The response object to send the result of the update.
 * @returns {Promise<void>} - A promise that resolves when the warehouse is updated and response is sent.
 */
export const updateWarehouse = asyncHandler(async (req: Request, res: Response) => {
    const result = await warehouseService.updateWarehouse(req.params.id, req.body);
    res.send(createResponse(result, "Warehouse updated successfully"))
});

/**
 * Partially updates an existing warehouse.
 * @param {Request} req - The request object containing the warehouse ID in params and update data in the body.
 * @param {Response} res - The response object to send the result of the update.
 * @returns {Promise<void>} - A promise that resolves when the warehouse is updated and response is sent.
 */
export const editWarehouse = asyncHandler(async (req: Request, res: Response) => {
    const result = await warehouseService.editWarehouse(req.params.id, req.body);
    res.send(createResponse(result, "Warehouse updated successfully"))
});

/**
 * Deletes a warehouse by ID.
 * @param {Request} req - The request object containing the warehouse ID in params.
 * @param {Response} res - The response object to send the result of the deletion.
 * @returns {Promise<void>} - A promise that resolves when the warehouse is deleted and response is sent.
 */
export const deleteWarehouse = asyncHandler(async (req: Request, res: Response) => {
    const result = await warehouseService.deleteWarehouse(req.params.id);
    res.send(createResponse(result, "Warehouse deleted successfully"))
});

/**
 * Retrieves a warehouse by its ID.
 * @param {Request} req - The request object containing the warehouse ID in params.
 * @param {Response} res - The response object to send the result of the retrieval.
 * @returns {Promise<void>} - A promise that resolves when the warehouse is found and response is sent.
 */
export const getWarehouseById = asyncHandler(async (req: Request, res: Response) => {
    const result = await warehouseService.getWarehouseById(req.params.id);
    res.send(createResponse(result))
});

/**
 * Retrieves all warehouses.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object to send the result.
 * @returns {Promise<void>} - A promise that resolves when the warehouses are retrieved and response is sent.
 */
export const getAllWarehouse = asyncHandler(async (req: Request, res: Response) => {
    const result = await warehouseService.getAllWarehouse();
    res.send(createResponse(result))
});

export const showAllProductsByWarehouseId = asyncHandler(async (req: Request, res: Response) => {
    const result = await warehouseService.showAllProductsByWarehouseId(req.params.id);
    res.send(createResponse(result))
});

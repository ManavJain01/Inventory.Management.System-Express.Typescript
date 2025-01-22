
import * as stockService from "./stock.service";
import { createResponse } from "../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from 'express'

/**
 * @file stock.controller.ts
 * @author Adebayo Ademola <https://github.com/adebayo>
 * @since 0.0.1
 * @description stock controller
 */

/**
 * @description creates a stock
 * @param {Object} req.body - body of the request
 * @param {string} req.body.name - name of the stock
 * @param {number} req.body.quantity - quantity of the stock
 * @param {string} req.body.unit - unit of the stock
 * @param {string} req.body.category - category of the stock
 * @param {string} req.body.image - image of the stock
 * @returns {Promise<Response>}
 */
export const createStock = asyncHandler(async (req: Request, res: Response) => {
    const result = await stockService.createStock(req.body);
    res.send(createResponse(result, "Stock created successfully"))
});

/**
 * @description updates a stock
 * @param {string} req.params.id - id of the stock to be updated
 * @param {Object} req.body - body of the request
 * @param {string} req.body.name - name of the stock
 * @param {number} req.body.quantity - quantity of the stock
 * @param {string} req.body.unit - unit of the stock
 * @param {string} req.body.category - category of the stock
 * @param {string} req.body.image - image of the stock
 * @returns {Promise<Response>}
 */
export const updateStock = asyncHandler(async (req: Request, res: Response) => {
    const result = await stockService.updateStock(Number(req.params.id), req.body);
    res.send(createResponse(result, "Stock updated successfully"))
});

/**
 * @description edits a stock
 * @param {string} req.params.id - id of the stock to be edited
 * @param {Object} req.body - body of the request
 * @param {string} req.body.name - name of the stock
 * @param {number} req.body.quantity - quantity of the stock
 * @param {string} req.body.unit - unit of the stock
 * @param {string} req.body.category - category of the stock
 * @param {string} req.body.image - image of the stock
 * @returns {Promise<Response>}
 */
export const editStock = asyncHandler(async (req: Request, res: Response) => {
    const result = await stockService.editStock(Number(req.params.id), req.body);
    res.send(createResponse(result, "Stock updated successfully"))
});

/**
 * @description deletes a stock
 * @param {string} req.params.id - id of the stock to be deleted
 * @returns {Promise<Response>}
 */
export const deleteStock = asyncHandler(async (req: Request, res: Response) => {
    const result = await stockService.deleteStock(Number(req.params.id));
    res.send(createResponse(result, "Stock deleted successfully"))
});


/**
 * @description gets a stock by id
 * @param {string} req.params.id - id of the stock to be fetched
 * @returns {Promise<Response>}
 */
export const getStockById = asyncHandler(async (req: Request, res: Response) => {
    const result = await stockService.getStockById(Number(req.params.id));
    res.send(createResponse(result))
});


/**
 * @description gets all stocks
 * @returns {Promise<Response>}
 */
export const getAllStock = asyncHandler(async (req: Request, res: Response) => {
    const result = await stockService.getAllStock();
    res.send(createResponse(result))
});


import * as userService from "./user.service";
import { createResponse } from "../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from 'express'

/**
 * @file user.controller.ts
 * @author Adebayo Ademola <https://github.com/adebayo>
 * @since 0.0.1
 * @description user controller
 */

/**
 * Creates a new user.
 * @param {Request} req - The request object containing user data in the body.
 * @param {Response} res - The response object to send the result of the creation.
 * @returns {Promise<void>} - A promise that resolves when the user is created and response is sent.
 */
export const createUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.createUser(req.body);
    res.send(createResponse(result, "User created sucssefully"))
});

/**
 * Updates an existing user.
 * @param {Request} req - The request object containing the user ID in params and update data in the body.
 * @param {Response} res - The response object to send the result of the update.
 * @returns {Promise<void>} - A promise that resolves when the user is updated and response is sent.
 */
export const updateUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.updateUser(Number(req.params.id), req.body);
    res.send(createResponse(result, "User updated sucssefully"))
});

/**
 * Partially updates an existing user.
 * @param {Request} req - The request object containing the user ID in params and update data in the body.
 * @param {Response} res - The response object to send the result of the update.
 * @returns {Promise<void>} - A promise that resolves when the user is updated and response is sent.
 */
export const editUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.editUser(Number(req.params.id), req.body);
    res.send(createResponse(result, "User updated sucssefully"))
});

/**
 * Deletes a user by ID.
 * @param {Request} req - The request object containing the user ID in params.
 * @param {Response} res - The response object to send the result of the deletion.
 * @returns {Promise<void>} - A promise that resolves when the user is deleted and response is sent.
 */
export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.deleteUser(Number(req.params.id));
    res.send(createResponse(result, "User deleted sucssefully"))
});


/**
 * Retrieves a user by ID.
 * @param {Request} req - The request object containing the user ID in params.
 * @param {Response} res - The response object to send the result of the retrieval.
 * @returns {Promise<void>} - A promise that resolves when the user is found and response is sent.
 */
export const getUserById = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.getUserById(Number(req.params.id));
    res.send(createResponse(result))
});


/**
 * Retrieves all users.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object to send the result.
 * @returns {Promise<void>} - A promise that resolves when the users are retrieved and response is sent.
 */
export const getAllUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.getAllUser();
    res.send(createResponse(result))
});

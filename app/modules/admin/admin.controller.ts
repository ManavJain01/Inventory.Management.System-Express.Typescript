import * as adminService from "./admin.service";
import { createResponse } from "../../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from 'express'

export const createUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await adminService.createUser(req.body);
    res.send(createResponse(result, "User created sucssefully"))
});

export const getUserByLogin = asyncHandler(async (req: Request, res: Response) => {
    const result = await adminService.getUserByLogin(req.body);
    res.send(createResponse(result, "User login successfully"))
});
import * as adminService from "./admin.service";
import { createResponse } from "../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from 'express'

export const createUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await adminService.createUser(req.body);
    res.send(createResponse(result, "User created sucssefully"))
});

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await adminService.loginUser(req.body);
    res.send(createResponse(result, "User login successfully"))
});
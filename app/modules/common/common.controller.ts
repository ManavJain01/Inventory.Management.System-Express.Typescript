
import * as commonService from "./common.service";
import { createResponse } from "../../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from 'express'
import createHttpError from "http-errors";

export const refreshAccessToken = asyncHandler(async (req: Request, res: Response) => {
    if(!req.user){
        throw createHttpError(403, {
            message: "Invalid or unauthorized user role",
        });
    }
        
    const result = await commonService.refreshAccessToken(req.user._id);
    res.send(createResponse(result, "Refresh Token created successfully"))
});

import * as authService from "./auth.service";
import { createResponse } from "../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from 'express'
import createHttpError from "http-errors";
import { setCookieTokens } from "../common/utils/cookie.utils";
import { decodeAccessToken } from "../common/helper/jwt.helper";
import { IUser } from "../user/user.dto";

/**
 * @function loginUser
 * @description Logs in a user by validating their credentials and generating tokens.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves if the user is logged in successfully.
 */
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await authService.loginUser(req.body);

    // Set Cookies
    const { accessToken, refreshToken } = result;
    setCookieTokens(req, res, accessToken, refreshToken);

    res.send(createResponse(result, "User login successfully"))
});

/**
 * @function logoutUser
 * @description Logs out a user by invalidating their refresh token.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @throws {Error} If the user is not authorized.
 * @returns {Promise<void>} - A promise that resolves if the user is logged out successfully.
 */
export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
    if(!req.user){
        throw createHttpError(403, {
            message: "Invalid or unauthorized user role",
        });
    }

    await authService.logoutUser((req.user as IUser)._id as string);
    
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.send(createResponse("User logout successfully"))
});


/**
 * @function forgotPassword
 * @description Sends a password reset link to the user's email.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {string} email - The user's email address.
 * @returns {Promise<void>} - A promise that resolves if the email is sent successfully.
 * @throws {Error} If the user is not found.
 */
export const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;

    await authService.forgotPassword(email);

    res.send(createResponse("Password reset link sent to your email" ));
});

/**
 * Resets a user's password.
 * 
 * @function resetPassword
 * @description Resets a user's password using a password reset token.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {string} token - The password reset token.
 * @param {string} newPassword - The new password to be set.
 * @throws {Error} If the token is invalid.
 * @returns {Promise<void>} - A promise that resolves if the password is reset successfully.
 */
export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.params;  // Get token from URL params
    const { newPassword } = req.body;  // Get the new password from request body  
  
    // Verify the token
    const decodedUser = await decodeAccessToken(token) as IUser;

    await authService.resetPassword(decodedUser, newPassword);

    res.send(createResponse("Password successfully reset" ));
});

/**
 * Refreshes the access and refresh tokens for a user by their refresh token.
 * 
 * @function refreshAccessToken
 * @description Refreshes the access and refresh tokens for a user by their refresh token.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {string} refreshToken - The refresh token to be used for refreshing the access and refresh tokens.
 * @returns {Promise<void>} - A promise that resolves if the tokens are refreshed successfully.
 * @throws {Error} If the token is invalid.
 */
export const refreshAccessToken = asyncHandler(async (req: Request, res: Response) => {
    const token = req.headers.authorization?.replace("Bearer ", "") || req.cookies.refreshToken;

    const result = await authService.refreshAccessToken(token as string);
    
    // Set Cookies
    const { accessToken, refreshToken } = result;
    setCookieTokens(req, res, accessToken, refreshToken);

    res.send(createResponse(result, "Refresh Token created successfully"))
});

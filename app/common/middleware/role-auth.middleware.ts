import { type NextFunction, type Request, type Response } from "express";
import expressAsyncHandler from "express-async-handler";
import createHttpError from "http-errors";
import { userEnum, type IUser } from "../../user/user.dto";
import { decodeAccessToken } from "../helper/jwt.helper";

// Middleware for role-based authentication
export const roleAuthMiddleware = (roles: IUser["role"][], publicRoutes: string[] = []) =>
expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (publicRoutes.includes(req.path)) {
      next();
      return;
    }
    
    const token = req.headers.authorization?.replace("Bearer ", "") || req.cookies?.accessToken;
    
    if (!token) {
      throw createHttpError(401, {
        message: "Token is required for authentication",
      });
    }
    const decodedUser = await decodeAccessToken(token) as IUser;

    // Check if user has a valid role
    if (!decodedUser.role || !userEnum.includes(decodedUser.role)) {
      throw createHttpError(403, {
        message: "Invalid or unauthorized user role",
      });
    }
    
    if (!roles.includes(decodedUser.role)) {
      const type =
      decodedUser.role.slice(0, 1) + decodedUser.role.slice(1).toLocaleLowerCase();
      
      throw createHttpError(401, {
        message: `${type} can not access this resource`,
      });
    }

    req.user = decodedUser as IUser;
    next();
  }
);

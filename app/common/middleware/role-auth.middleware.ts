import { type NextFunction, type Request, type Response } from "express";
import expressAsyncHandler from "express-async-handler";
import createHttpError from "http-errors";
import { type IUser } from "../../modules/user/user.dto";
import { User } from "../../modules/user/user.schema";
import { decodeAccessToken } from "../helper/jwt.helper";

const fetchUser = async (id:string) => {
  return await User.findById(id).lean();
}

// Middleware for role-based authentication
export const roleAuthMiddleware = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    
    const token = req.headers.authorization?.replace("Bearer ", "");
    
    if (!token) {
      throw createHttpError(401, {
        message: "Token is required for authentication",
      });
    }

    const user = await decodeAccessToken(token) as IUser;
    
    // Check if user has a valid role
    if (!user.role || !['ADMIN', 'USER'].includes(user.role)) {
      throw createHttpError(403, {
        message: "Invalid or unauthorized user role",
      });
    }

    req.user = user as IUser;
    next();
  }
);

import { type IUser } from "../../modules/user/user.dto";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";


const getEnvTokens = () => {
    // const SECRET_KEY = process.env.JWT_SECRET ?? "";
    const REFRESH_TOKEN = process.env.REFRESH_TOKEN ?? "";
    const ACCESS_TOKEN = process.env.ACCESS_TOKEN ?? "";

    return { REFRESH_TOKEN, ACCESS_TOKEN };
}

export const generateAccessTokenAndRefreshToken = async (user : IUser, access: string = '1h') => {
    const { REFRESH_TOKEN, ACCESS_TOKEN } = getEnvTokens();
    console.log("in jwt helper: ", ACCESS_TOKEN);
    
    const payload = {
        _id: user._id,
        role: user.role,
    }
    
    const accessToken = jwt.sign(
        payload,
        ACCESS_TOKEN,
        {
            expiresIn: `${access === '1h' ? '1h' : '30d'}`, // Access Token expiration time
        }
    );

    const refreshToken = jwt.sign(
        payload,
        REFRESH_TOKEN,
        {
            expiresIn: "7d", // Refresh Token expiration time
        }
    );

    return { accessToken, refreshToken };
}

export const decodeAccessToken = async (encryptedAccessToken : string) => {
    const { ACCESS_TOKEN } = getEnvTokens();

    // Verify token and attach the user information to the request object
    const payload = jwt.verify(encryptedAccessToken, ACCESS_TOKEN);

    if (typeof payload !== "object" || payload === null || !payload._id || !payload.role) {
        throw createHttpError(403, {
        message: "Invalid Token",
        });
    }

    return payload;
}
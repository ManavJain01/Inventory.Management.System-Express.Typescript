import { type IUser } from "../../user/user.dto";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";


const getEnvTokens = () => {
    const REFRESH_TOKEN = process.env.REFRESH_TOKEN ?? "";
    const ACCESS_TOKEN = process.env.ACCESS_TOKEN ?? "";

    return { REFRESH_TOKEN, ACCESS_TOKEN };
}

const checkTokenExpiry = async (incomingToken: string, tokenSecret: string) => {
    try {
        const payload = jwt.verify(incomingToken, tokenSecret);
        
        if (typeof payload !== "object" || payload === null || !payload._id || !payload.role) {
            throw createHttpError(401, {
            message: "Invalid Token",
            });
        }
    
        return payload;
    } catch (err) {
        throw createHttpError(401, {
            message: "Invalid Token",
        });
    }
}

export const generateAccessTokenAndRefreshToken = async (user : IUser, access: string = '1h') => {
    const { REFRESH_TOKEN, ACCESS_TOKEN } = getEnvTokens();
    
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
    const payload = checkTokenExpiry(encryptedAccessToken, ACCESS_TOKEN);

    return payload;
}

export const decodeRefreshToken = async (encryptedRefreshToken : string) => {
    const { REFRESH_TOKEN } = getEnvTokens();

    // Verify token and attach the user information to the request object
    const payload = checkTokenExpiry(encryptedRefreshToken, REFRESH_TOKEN);

    return payload;
}
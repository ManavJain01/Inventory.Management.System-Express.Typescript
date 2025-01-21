import { type IUser } from "../user/user.dto";
import { User } from "../user/user.schema";
import { decodeAccessToken, generateAccessTokenAndRefreshToken } from "../common/helper/jwt.helper";

import bcrypt from 'bcrypt';

/**
 * Creates a new user, generates tokens, and saves them.
 * @async
 * @function createUser
 * @param {IUser} data - The user data to create a new user.
 * @returns {Promise<{ user: typeof User, accessToken: string, refreshToken: string }>} 
 * An object containing the created user, access token, and refresh token.
 */
export const createUser = async (data: IUser) => {
    const result = await User.create({ ...data });

    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(result);

    result.refreshToken = refreshToken;
    result.role = "ADMIN";
    await result.save();

    return { user: result, accessToken, refreshToken };
};

/**
 * Compares the incoming password with the database password.
 * @async
 * @function isCorrectPassword
 * @param {string} dbPassword - The hashed password stored in the database.
 * @param {string} incomingPassword - The plaintext password entered by the user.
 * @returns {Promise<boolean>} - Returns `true` if the passwords match, otherwise `false`.
 */
export const isCorrectPassword = async (dbPassword: string, incomingPassword: string) => {
    console.log("dbPassword: ", dbPassword);
    console.log("incomingPassword: ", incomingPassword);

    // const query = await bcrypt.compare(incomingPassword, dbPassword);
    const query = incomingPassword === dbPassword;

    if(query) return true;
    else return false;
}

/**
 * Logs in a user, sets them as active, and generates tokens.
 * @async
 * @function loginUser
 * @param {IUser} data - The login credentials containing email and password.
 * @returns {Promise<{ user: typeof User, accessToken: string, refreshToken: string }>} 
 * An object containing the user, access token, and refresh token.
 * @throws {Error} If the user is not found or the credentials are invalid.
 */
export const loginUser = async (data: IUser) => {
    const { email, password } = data;
    const user = await User.findOneAndUpdate(
        { email },              // Filter: Find by email
        { $set: { isActive: true } }, // Update: Set isActive to true
        { new: true }           // Option: Return the updated document
    );

    if (!user) {
        throw new Error("User not found");
    }
    
    // Checking input password is correct or not...
    if(!await isCorrectPassword(user.password, password)){
        throw new Error("Invalid credentials");
    }
    
    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user);

    return { user: user, accessToken, refreshToken };
};
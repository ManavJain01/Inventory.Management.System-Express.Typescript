import createHttpError from "http-errors";
import { decodeRefreshToken, generateAccessTokenAndRefreshToken } from "../common/helper/jwt.helper";
import { IUser } from "../user/user.dto";
import { User } from "../user/user.schema";
import bcrypt from 'bcrypt';
import * as mailService from "../common/services/email.service"

export const hashPassword = async (password: string) => {
    const hash = await bcrypt.hash(password, 12);
    return hash;
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
    const query = await bcrypt.compare(incomingPassword, dbPassword);
    // const query = incomingPassword === dbPassword;

    if(!query) return true;
    else return false;
}

export const signupUser = async (data: IUser) => {
    const result = await User.create({ ...data });

    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(result, "userCreating");

    result.refreshToken = refreshToken;

    await result.save();

    return { user: result, accessToken, refreshToken };
};

/**
 * Logs in a user by validating their credentials and generating tokens.
 * 
 * @param {IUser} data - The login data, including email and password.
 * @returns {Promise<{ user: User, accessToken: string, refreshToken: string }>} The authenticated user along with the generated tokens.
 * @throws {Error} Throws an error if the user is not found or credentials are incorrect.
 */
export const loginUser = async (data: IUser) => {
    const { email, password } = data;
    const user = await User.findOne({ email });
    
    if (!user) {
        throw new Error("User not found");
    }
    
    
    // Checking input password is correct or not...
    if(!await isCorrectPassword(user.password, password)){
        throw new Error("Invalid credentials");
    }
    
    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    return { user: user, accessToken, refreshToken };
};

/**
 * Logs out a user by finding the user by ID and saving the updated status.
 * 
 * @param {string} userId - The ID of the user to be logged out.
 * @returns {Promise<void>} A promise indicating the logout operation is completed.
 * @throws {Error} Throws an error if the user is not found.
 */
export const logoutUser = async (userId:string) => {
    const fetchUser = await User.findById(userId);

    if (!fetchUser) {
        throw new Error("User not found");
    }

    // Remove the refreshToken from the user document
    fetchUser.refreshToken = undefined;

    await fetchUser.save();

    return;
};

export const forgotPassword = async (email: string) => {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
        throw createHttpError(403, {
            message: "Invalid or unauthorized user role",
        });
    }

    // Generate a password reset token
    const { accessToken } = await generateAccessTokenAndRefreshToken(user);

    // Create a reset URL
    const resetURL = `${process.env.FE_BASE_URL}/reset-password?token=${accessToken}`;

    // Send the reset email
    const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset Request",
    text: `You requested a password reset. Click the link to reset your password: ${resetURL}`,
    };

    await mailService.sendEmail(mailOptions);
}

export const resetPassword = async (decodedUser: IUser, newPassword: string) => {
    // Find the user by decoded userId
    const user = await User.findById(decodedUser._id);
    if (!user) {
        throw createHttpError(403, {
            message: "Invalid or unauthorized user role",
        });
    }
    
    // Hash the new password
    const hashedPassword = await hashPassword(newPassword);
    
    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    return;
};

/**
 * Refreshes the access and refresh tokens for a user by their ID.
 * @async
 * @function refreshAccessToken
 * @param {string} userId - The ID of the user for whom tokens will be refreshed.
 * @returns {Promise<{ user: User, accessToken: string, refreshToken: string }>} 
 * A promise resolving to an object containing the updated user, new access token, and new refresh token.
 * @throws {Error} If the user is not found.
 */
export const refreshAccessToken = async (token :string) => {
    const userCredentials = await decodeRefreshToken(token);
    const user = await User.findById(userCredentials._id);

    if(!user){
        throw new Error("No User Found");
    }

    if(user.refreshToken === token){
        const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user);
    
        user.refreshToken = refreshToken;
    
        await user.save();
        
        return { user: user, accessToken, refreshToken };
    }else{
        throw createHttpError(403, {
            message: "Invalid Token",
        });
    }
};
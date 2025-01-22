import createHttpError from "http-errors";
import { decodeRefreshToken, generateAccessTokenAndRefreshToken } from "../common/helper/jwt.helper";
import { User } from "../user/user.entity";
import { IUser } from '../user/user.dto';
import bcrypt from 'bcrypt';
import * as mailService from "../common/services/email.service"
import { getRepository } from 'typeorm';
import { AppDataSource } from "../common/services/data-source";

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

/**
 * Logs in a user by validating their credentials and generating tokens.
 * @param {IUser} data - The user data containing email and password.
 * @returns {Promise<{ user: IUser, accessToken: string, refreshToken: string }>} - The logged-in user and tokens.
 * @throws {Error} If the user is not found or credentials are invalid.
 */
export const loginUser = async (data: IUser) => {
    const { email, password } = data;
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
        throw new Error("User not found");
    }

    if (!await isCorrectPassword(user.password, password)) {
        throw new Error("Invalid credentials");
    }

    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user);

    user.refreshToken = refreshToken;
    await userRepository.save(user);

    return { user, accessToken, refreshToken };
};

/**
 * Logs out a user by invalidating their refresh token.
 * @param {string} userId - The ID of the user to log out.
 * @returns {Promise<void>} - A promise that resolves when the user is logged out successfully.
 * @throws {Error} If the user is not found.
 */
export const logoutUser = async (userId: number) => {
    const userRepository = AppDataSource.getRepository(User);
    const fetchUser = await userRepository.findOne({ where: { id: userId } });

    if (!fetchUser) {
        throw new Error("User not found");
    }

    fetchUser.refreshToken = null;
    await userRepository.save(fetchUser);
};

/**
 * Sends a password reset link to the user's email.
 * @param {string} email - The email of the user requesting password reset.
 * @returns {Promise<void>} - A promise that resolves when the reset email is sent.
 * @throws {Error} If the user is not found.
 */
export const forgotPassword = async (email: string) => {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
        throw new Error("Invalid or unauthorized user role");
    }

    const { accessToken } = await generateAccessTokenAndRefreshToken(user);
    const resetURL = `${process.env.FE_BASE_URL}/reset-password?token=${accessToken}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Password Reset Request",
        text: `You requested a password reset. Click the link to reset your password: ${resetURL}`,
    };

    await mailService.sendEmail(mailOptions);
};

/**
 * Resets a user's password using a password reset token.
 * @param {IUser} decodedUser - The decoded user information from the reset token.
 * @param {string} newPassword - The new password to set.
 * @returns {Promise<void>} - A promise that resolves when the password is reset successfully.
 * @throws {Error} If the user is not found.
 */
export const resetPassword = async (decodedUser: IUser, newPassword: string) => {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: decodedUser.id } });

    if (!user) {
        throw new Error("Invalid or unauthorized user role");
    }

    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    await userRepository.save(user);
};

/**
 * Refreshes the access and refresh tokens for a user by their refresh token.
 * @param {string} token - The refresh token to use for refreshing tokens.
 * @returns {Promise<{ user: IUser, accessToken: string, refreshToken: string }>} - The user and new tokens.
 * @throws {Error} If the user is not found or the token is invalid.
 */
export const refreshAccessToken = async (token: string) => {
    const userCredentials = await decodeRefreshToken(token);
    const user = await AppDataSource.getRepository(User).findOne({ where: { id: userCredentials._id } });

    if (!user) {
        throw new Error("No User Found");
    }

    if (user.refreshToken === token) {
        const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user);
        user.refreshToken = refreshToken;
        await AppDataSource.getRepository(User).save(user);
        return { user, accessToken, refreshToken };
    } else {
        throw createHttpError(403, {
            message: "Invalid Token",
        });
    }
};

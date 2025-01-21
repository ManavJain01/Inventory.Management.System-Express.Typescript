import { generateAccessTokenAndRefreshToken } from "../common/helper/jwt.helper";
import { User } from "../user/user.schema";

/**
 * Refreshes the access and refresh tokens for a user by their ID.
 * @async
 * @function refreshAccessToken
 * @param {string} userId - The ID of the user for whom tokens will be refreshed.
 * @returns {Promise<{ user: User, accessToken: string, refreshToken: string }>} 
 * A promise resolving to an object containing the updated user, new access token, and new refresh token.
 * @throws {Error} If the user is not found.
 */
export const refreshAccessToken = async (userId :string) => {
    const user = await User.findById(userId);

    if(!user){
        throw new Error("No User Found");
    }

    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user);

    user.refreshToken = refreshToken;

    await user.save();

    return { user: user, accessToken, refreshToken };
};
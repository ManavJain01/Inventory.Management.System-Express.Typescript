import { generateAccessTokenAndRefreshToken } from "../../common/helper/jwt.helper";
import { User } from "../user/user.schema";

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
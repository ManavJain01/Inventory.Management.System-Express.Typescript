import { type IUser } from "../user/user.dto";
import { User } from "../user/user.schema";
import { decodeAccessToken, generateAccessTokenAndRefreshToken } from "../common/helper/jwt.helper";

import bcrypt from 'bcrypt';

export const createUser = async (data: IUser) => {
    const result = await User.create({ ...data });

    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(result);

    result.refreshToken = refreshToken;
    result.isActive = true;

    await result.save();

    return { user: result, accessToken, refreshToken };
};

export const isCorrectPassword = async (dbPassword: string, incomingPassword: string) => {
    console.log("dbPassword: ", dbPassword);
    console.log("incomingPassword: ", incomingPassword);

    // const query = await bcrypt.compare(incomingPassword, dbPassword);
    const query = incomingPassword === dbPassword;

    if(query) return true;
    else return false;
}

export const getUserByLogin = async (data: IUser) => {
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

export const restrictUser = async (data: IUser, userId: string) => {
    const { isBlock } = data;
    const result = await User.findByIdAndUpdate(userId, { isBlock: isBlock });

    return;
};

export const activeSessions = async () => {
    const onlineSessions = await User.findOne({ isActive: true });

    return onlineSessions;
};
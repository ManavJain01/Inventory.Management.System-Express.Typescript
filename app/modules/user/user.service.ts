import { type IUser } from "./user.dto";
import { User } from "./user.schema";
import { generateAccessTokenAndRefreshToken } from "../../common/helper/jwt.helper";
import { isCorrectPassword } from "../admin/admin.service";

export const createUser = async (data: IUser) => {
    const result = await User.create({ ...data });

    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(result, "userCreating");

    result.refreshToken = refreshToken;

    await result.save();

    return { user: result, accessToken, refreshToken };
};

export const updateUser = async (id: string, data: IUser) => {
    const result = await User.findOneAndUpdate({ _id: id }, data, {
        new: true,
    });
    return result;
};

export const editUser = async (id: string, data: Partial<IUser>) => {
    const result = await User.findOneAndUpdate({ _id: id }, data);
    return result;
};

export const deleteUser = async (id: string) => {
    const result = await User.deleteOne({ _id: id });
    return result;
};

export const getUserById = async (id: string) => {
    const result = await User.findById(id).lean();
    return result;
};

export const getAllUser = async () => {
    const result = await User.find({}).lean();
    return result;
};
export const getUserByEmail = async (email: string) => {
    const result = await User.findOne({ email }).lean();
    return result;
}

export const loginUser = async (data: IUser) => {
    const { email, password } = data;
    const user = await User.findOneAndUpdate({ email }, { isActive: true });
    
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

export const logoutUser = async (userId:string) => {
    const fetchUser = await User.findById(userId);

    if (!fetchUser) {
        throw new Error("User not found");
    }

    await fetchUser.save();

    return;
};

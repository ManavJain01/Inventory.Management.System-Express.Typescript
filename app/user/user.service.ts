import { type IUser } from "./user.dto";
import { User } from "./user.schema";
import { generateAccessTokenAndRefreshToken } from "../common/helper/jwt.helper";

/**
 * Creates a new user and generates access and refresh tokens.
 * @param {IUser} data - The user data to be saved in the database.
 * @returns {Promise<{ user: User, accessToken: string, refreshToken: string }>} The created user object along with the generated tokens.
 */
export const createUser = async (data: IUser) => {
    const result = await User.create({ ...data });

    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(result, "userCreating");

    result.refreshToken = refreshToken;

    await result.save();

    return { user: result, accessToken, refreshToken };
};

/**
 * Updates an existing user.
 * @param {string} id - The ID of the user to be updated.
 * @param {IUser} data - The user data to be updated in the database.
 * @returns {Promise<User>} The updated user object.
 */
export const updateUser = async (id: string, data: IUser) => {
    const result = await User.findOneAndUpdate({ _id: id }, data, {
        new: true,
    });
    return result;
};

/**
 * Partially updates an existing user.
 * @param {string} id - The ID of the user to be updated.
 * @param {Partial<IUser>} data - The user data to be updated in the database.
 * @returns {Promise<User>} The updated user object.
 */
export const editUser = async (id: string, data: Partial<IUser>) => {
    const result = await User.findOneAndUpdate({ _id: id }, data);
    return result;
};

/**
 * Deletes a user by ID.
 * @param {string} id - The ID of the user to be deleted.
 * @returns {Promise<Document | null>} The result of the deletion.
 */
export const deleteUser = async (id: string) => {
    const result = await User.deleteOne({ _id: id });
    return result;
};

/**
 * Retrieves a user by ID.
 * @param {string} id - The ID of the user to be retrieved.
 * @returns {Promise<Document | null>} The user object if found, otherwise null.
 */
export const getUserById = async (id: string) => {
    const result = await User.findById(id).lean();
    return result;
};

/**
 * Retrieves all users.
 * @returns {Promise<Document[]>} The array of user objects.
 */
export const getAllUser = async () => {
    const result = await User.find({}).lean();
    return result;
};

/**
 * Retrieves a user by email.
 * @param {string} email - The email of the user to be retrieved.
 * @returns {Promise<Document | null>} The user object if found, otherwise null.
 */
export const getUserByEmail = async (email: string) => {
    const result = await User.findOne({ email }).lean();
    return result;
}

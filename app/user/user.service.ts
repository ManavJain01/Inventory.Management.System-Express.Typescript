import { type IUser } from "./user.dto";
import { generateAccessTokenAndRefreshToken } from "../common/helper/jwt.helper";
import { User } from "./user.entity";
import { AppDataSource } from "../common/services/data-source";

/**
 * Creates a new user.
 * @param {IUser} data - The user data to create.
 * @returns {Promise<{ user: IUser, accessToken: string, refreshToken: string }>} - The created user and tokens.
 */
export const createUser = async (data: IUser) => {
    const userRepository = AppDataSource.getRepository(User);
    const result = await userRepository.save(userRepository.create(data));
    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(result, "userCreating");
    result.refreshToken = refreshToken;
    await userRepository.save(result);
    return { user: result, accessToken, refreshToken };
};

/**
 * Updates an existing user by ID.
 * @param {string} id - The ID of the user to update.
 * @param {IUser} data - The data to update the user with.
 * @returns {Promise<IUser>} - The updated user.
 * @throws {Error} - If the user is not found.
 */
export const updateUser = async (id: number, data: IUser) => {
    const userRepository = AppDataSource.getRepository(User);
    const result = await userRepository.findOneBy({ id });
    if (!result) throw new Error("User not found");
    Object.assign(result, data);
    await userRepository.save(result);
    return result;
};

/**
 * Partially updates an existing user by ID.
 * @param {string} id - The ID of the user to edit.
 * @param {Partial<IUser>} data - The partial data to edit the user with.
 * @returns {Promise<IUser>} - The edited user.
 * @throws {Error} - If the user is not found.
 */
export const editUser = async (id: number, data: Partial<IUser>) => {
    const userRepository = AppDataSource.getRepository(User);
    const result = await userRepository.findOneBy({ id });
    if (!result) throw new Error("User not found");
    Object.assign(result, data);
    await userRepository.save(result);
    return result;
};

/**
 * Deletes a user by ID.
 * @param {string} id - The ID of the user to delete.
 * @returns {Promise<void>} - A promise that resolves when the user is deleted.
 */
export const deleteUser = async (id: number) => {
    const userRepository = AppDataSource.getRepository(User);
    const result = await userRepository.delete(id);
    return result;
};

/**
 * Retrieves a user by ID.
 * @param {string} id - The ID of the user to retrieve.
 * @returns {Promise<IUser | null>} - The user, or null if not found.
 */
export const getUserById = async (id: number) => {
    const userRepository = AppDataSource.getRepository(User);
    const result = await userRepository.findOneBy({ id });
    return result;
};

/**
 * Retrieves all users.
 * @returns {Promise<IUser[]>} - A list of all users.
 */
export const getAllUser = async () => {
    const userRepository = AppDataSource.getRepository(User);
    const result = await userRepository.find();
    return result;
};

/**
 * Retrieves a user by email.
 * @param {string} email - The email of the user to retrieve.
 * @returns {Promise<IUser | null>} - The user, or null if not found.
 */
export const getUserByEmail = async (email: string) => {
    const userRepository = AppDataSource.getRepository(User);
    const result = await userRepository.findOneBy({ email });
    return result;
};

import { type IUser } from "./user.dto";
import { User } from "./user.schema";
import { generateAccessTokenAndRefreshToken } from "../common/helper/jwt.helper";
import { isCorrectPassword } from "../admin/admin.service";

/**
 * Creates a new user and generates access and refresh tokens.
 * 
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
 * Updates a user in the database based on the given user ID and data.
 * 
 * @param {string} id - The ID of the user to be updated.
 * @param {IUser} data - The updated user data.
 * @returns {Promise<User>} The updated user object.
 */
export const updateUser = async (id: string, data: IUser) => {
    const result = await User.findOneAndUpdate({ _id: id }, data, {
        new: true,
    });
    return result;
};

/**
 * Partially updates a user in the database based on the given user ID and data.
 * 
 * @param {string} id - The ID of the user to be updated.
 * @param {Partial<IUser>} data - The partial updated user data.
 * @returns {Promise<User>} The updated user object.
 */
export const editUser = async (id: string, data: Partial<IUser>) => {
    const result = await User.findOneAndUpdate({ _id: id }, data);
    return result;
};

/**
 * Deletes a user from the database based on the given user ID.
 * 
 * @param {string} id - The ID of the user to be deleted.
 * @returns {Promise<DeleteResult>} The result of the deletion operation.
 */
export const deleteUser = async (id: string) => {
    const result = await User.deleteOne({ _id: id });
    return result;
};

/**
 * Retrieves a user by their unique ID.
 * 
 * @param {string} id - The ID of the user to retrieve.
 * @returns {Promise<User | null>} The user object or null if not found.
 */
export const getUserById = async (id: string) => {
    const result = await User.findById(id).lean();
    return result;
};

/**
 * Retrieves all users from the database.
 * 
 * @returns {Promise<User[]>} An array of all user objects.
 */
export const getAllUser = async () => {
    const result = await User.find({}).lean();
    return result;
};

/**
 * Retrieves a user by their email address.
 * 
 * @param {string} email - The email address of the user to retrieve.
 * @returns {Promise<User | null>} The user object or null if not found.
 */
export const getUserByEmail = async (email: string) => {
    const result = await User.findOne({ email }).lean();
    return result;
}

/**
 * Logs in a user by validating their credentials and generating tokens.
 * 
 * @param {IUser} data - The login data, including email and password.
 * @returns {Promise<{ user: User, accessToken: string, refreshToken: string }>} The authenticated user along with the generated tokens.
 * @throws {Error} Throws an error if the user is not found or credentials are incorrect.
 */
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

    await fetchUser.save();

    return;
};

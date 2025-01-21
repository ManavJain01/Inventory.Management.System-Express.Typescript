import { sendEmail } from "../common/services/email.service";
import { type IStock } from "./stock.dto";
import { Stock } from "./stock.schema";

/**
 * Creates a new stock entry in the database.
 * 
 * @param {IStock} data - The stock data to be created.
 * @returns {Promise<{inventory: IStock}>} - The created stock data wrapped in an object.
 */
export const createStock = async (data: IStock) => {
    const result = await Stock.create({ ...data });

    await result.save();

    return { inventory: result };
};

/**
 * Updates an existing stock entry by ID.
 * 
 * @param {string} id - The ID of the stock to update.
 * @param {IStock} data - The new stock data to update.
 * @returns {Promise<IStock | null>} - The updated stock data or null if not found.
 */
export const updateStock = async (id: string, data: IStock) => {
    const result = await Stock.findOneAndUpdate({ _id: id }, data, {
        new: true,
    });
    return result;
};

/**
 * Partially updates an existing stock entry by ID.
 * 
 * @param {string} id - The ID of the stock to update.
 * @param {Partial<IStock>} data - The partial stock data to update.
 * @throws {Error} - If the stock is not found.
 * @returns {Promise<IStock>} - The updated stock data.
 */
export const editStock = async (id: string, data: Partial<IStock>) => {
    const result = await Stock.findOneAndUpdate({ _id: id }, data);

    if(!result){
        throw new Error("Stock not found");
    }

    return result;
};

/**
 * Deletes a stock entry by ID.
 * 
 * @param {string} id - The ID of the stock to delete.
 * @returns {Promise<{deletedCount: number}>} - The result of the deletion operation.
 */
export const deleteStock = async (id: string) => {
    const result = await Stock.deleteOne({ _id: id });
    return result;
};

/**
 * Retrieves a stock entry by ID.
 * 
 * @param {string} id - The ID of the stock to retrieve.
 * @returns {Promise<IStock | null>} - The stock data or null if not found.
 */
export const getStockById = async (id: string) => {
    const result = await Stock.findById(id).lean();
    return result;
};

/**
 * Retrieves all stock entries from the database.
 * 
 * @returns {Promise<IStock[]>} - An array of all stock entries.
 */
export const getAllStock = async () => {
    const result = await Stock.find({}).lean();
    return result;
};Stock
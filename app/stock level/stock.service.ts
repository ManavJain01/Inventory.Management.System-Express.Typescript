import { type IStock } from "./stock.dto";
import { Stock } from "./stock.schema";

/**
 * Creates a new stock entry.
 * @param {IStock} data - The stock data to be created.
 * @returns {Promise<IStock>} - The newly created stock entry.
 */
export const createStock = async (data: IStock) => {
    const result = await Stock.create({ ...data });

    await result.save();

    return { inventory: result };
};

/**
 * Updates an existing stock entry.
 * @param {string} id - The ID of the stock entry to be updated.
 * @param {IStock} data - The updated stock data.
 * @returns {Promise<IStock>} - The updated stock entry.
 */
export const updateStock = async (id: string, data: IStock) => {
    const result = await Stock.findOneAndUpdate({ _id: id }, data, {
        new: true,
    });
    return result;
};

/**
 * Partially updates an existing stock entry.
 * @param {string} id - The ID of the stock entry to be updated.
 * @param {Partial<IStock>} data - The partial updated stock data.
 * @returns {Promise<IStock>} - The updated stock entry.
 */
export const editStock = async (id: string, data: Partial<IStock>) => {
    const result = await Stock.findOneAndUpdate({ _id: id }, data);

    if(!result){
        throw new Error("Stock not found");
    }

    return result;
};

/**
 * Deletes a stock entry.
 * @param {string} id - The ID of the stock entry to be deleted.
 * @returns {Promise<DeleteResult>} - The result of the deletion.
 */
export const deleteStock = async (id: string) => {
    const result = await Stock.deleteOne({ _id: id });
    return result;
};

/**
 * Gets a stock entry by its ID.
 * @param {string} id - The ID of the stock entry to be fetched.
 * @returns {Promise<IStock>} - The stock entry.
 */
export const getStockById = async (id: string) => {
    const result = await Stock.findById(id).lean();
    return result;
};

/**
 * Gets all stock entries.
 * @returns {Promise<IStock[]>} - An array of all stock entries.
 */
export const getAllStock = async () => {
    const result = await Stock.find({}).lean();
    return result;
};
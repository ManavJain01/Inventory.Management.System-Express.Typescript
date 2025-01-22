import { AppDataSource } from "../common/services/data-source";
import { type IStock } from "./stock.dto";
import { Stock } from "./stock.entity";

const stockRepository = AppDataSource.getRepository(Stock);

/**
 * Creates a new stock entry.
 * @param {IStock} data - The stock data to be created.
 * @returns {Promise<{inventory: IStock}>} - The created stock entry.
 * @throws {Error} - If the stock entry is not created.
 */
export const createStock = async (data: IStock) => {
    const stock = stockRepository.create(data);
    const result = await stockRepository.save(stock);

    return { inventory: result };
};

/**
 * Updates an existing stock entry by its ID.
 * @param {string} id - The ID of the stock entry to update.
 * @param {IStock} data - The stock data to update.
 * @returns {Promise<IStock>} - The updated stock entry.
 * @throws {Error} - If the stock entry is not found or not updated.
 */
export const updateStock = async (id: number, data: IStock) => {
    const result = await stockRepository.update(id, data);
    if (result.affected === 0) {
        throw new Error("Stock not found");
    }

    const updatedStock = await stockRepository.findOneBy({ id });
    return updatedStock;
};

/**
 * Partially updates an existing stock entry by its ID.
 * @param {string} id - The ID of the stock entry to update.
 * @param {Partial<IStock>} data - The partial stock data to update. Only the fields provided will be updated.
 * @returns {Promise<IStock>} - The updated stock entry.
 * @throws {Error} - If the stock entry is not found or not updated.
 */
export const editStock = async (id: number, data: Partial<IStock>) => {
    const result = await stockRepository.update(id, data);

    if (result.affected === 0) {
        throw new Error("Stock not found");
    }

    const updatedStock = await stockRepository.findOneBy({ id });
    return updatedStock;
};

/**
 * Deletes a stock entry by its ID.
 * @param {string} id - The ID of the stock entry to delete.
 * @returns {Promise<{message: string}>} - The deletion result.
 * @throws {Error} - If the stock entry is not found or not deleted.
 */
export const deleteStock = async (id: number) => {
    const result = await stockRepository.delete(id);

    if (result.affected === 0) {
        throw new Error("Stock not found");
    }

    return { message: "Stock deleted successfully" };
};

/**
 * Gets a stock entry by its ID.
 * @param {string} id - The ID of the stock entry to retrieve.
 * @returns {Promise<IStock>} - The retrieved stock entry.
 * @throws {Error} - If the stock entry is not found.
 */
export const getStockById = async (id: number) => {
    const result = await stockRepository.findOneBy({ id });

    if (!result) {
        throw new Error("Stock not found");
    }

    return result;
};

/**
 * Gets all stock entries.
 * @returns {Promise<IStock[]>} - The retrieved stock entries.
 */
export const getAllStock = async () => {
    const result = await stockRepository.find();
    return result;
};

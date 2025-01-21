import { sendEmail } from "../common/services/email.service";
import { type IWarehouse } from "./warehouse.dto";
import { Warehouse } from "./warehouse.schema";

/**
 * Creates a new warehouse and saves it to the database.
 * @param {IWarehouse} data - The warehouse data to be created.
 * @returns {Promise<{ inventory: Warehouse }>} - The created warehouse data.
 */
export const createWarehouse = async (data: IWarehouse) => {
    const result = await Warehouse.create({ ...data });

    await result.save();

    return { inventory: result };
};

/**
 * Updates an existing warehouse by its ID with the provided data.
 * @param {string} id - The ID of the warehouse to be updated.
 * @param {IWarehouse} data - The new data to update the warehouse.
 * @returns {Promise<Warehouse>} - The updated warehouse data.
 */
export const updateWarehouse = async (id: string, data: IWarehouse) => {
    const result = await Warehouse.findOneAndUpdate({ _id: id }, data, {
        new: true,
    });
    return result;
};

/**
 * Edits an existing warehouse by its ID with the provided partial data.
 * @param {string} id - The ID of the warehouse to be edited.
 * @param {Partial<IWarehouse>} data - The partial data to update the warehouse.
 * @throws {Error} - Throws an error if the warehouse is not found.
 * @returns {Promise<Warehouse>} - The updated warehouse data.
 */
export const editWarehouse = async (id: string, data: Partial<IWarehouse>) => {
    const result = await Warehouse.findOneAndUpdate({ _id: id }, data);

    if(!result){
        throw new Error("Warehouse not found");
    }

    return result;
};

/**
 * Deletes a warehouse by its ID.
 * @param {string} id - The ID of the warehouse to be deleted.
 * @returns {Promise<any>} - The result of the delete operation.
 */
export const deleteWarehouse = async (id: string) => {
    const result = await Warehouse.deleteOne({ _id: id });
    return result;
};

/**
 * Retrieves a warehouse by its ID.
 * @param {string} id - The ID of the warehouse to retrieve.
 * @returns {Promise<Warehouse | null>} - The warehouse data or null if not found.
 */
export const getWarehouseById = async (id: string) => {
    const result = await Warehouse.findById(id).lean();
    return result;
};

/**
 * Retrieves all warehouses.
 * @returns {Promise<Warehouse[]>} - A list of all warehouses.
 */
export const getAllWarehouse = async () => {
    const result = await Warehouse.find({}).lean();
    return result;
};
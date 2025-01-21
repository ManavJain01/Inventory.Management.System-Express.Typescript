import { sendEmail } from "../common/services/email.service";
import { type IWarehouse } from "./warehouse.dto";
import { Warehouse } from "./warehouse.schema";

/**
 * Creates a new warehouse.
 * @param {IWarehouse} data - The warehouse data to create.
 * @returns {Promise<{ inventory: IWarehouse }>} - The created warehouse object.
 */
export const createWarehouse = async (data: IWarehouse) => {
    const result = await Warehouse.create({ ...data });

    await result.save();

    return { inventory: result };
};

/**
 * Updates an existing warehouse by its ID.
 * @param {string} id - The ID of the warehouse to update.
 * @param {IWarehouse} data - The new warehouse data.
 * @returns {Promise<IWarehouse | null>} - The updated warehouse object, or null if not found.
 */
export const updateWarehouse = async (id: string, data: IWarehouse) => {
    const result = await Warehouse.findOneAndUpdate({ _id: id }, data, {
        new: true,
    });
    return result;
};

/**
 * Partially updates an existing warehouse by its ID.
 * @param {string} id - The ID of the warehouse to update.
 * @param {Partial<IWarehouse>} data - The partial data to update.
 * @returns {Promise<IWarehouse>} - The updated warehouse object.
 * @throws {Error} - If the warehouse is not found.
 */
export const editWarehouse = async (id: string, data: Partial<IWarehouse>) => {
    const result = await Warehouse.findOneAndUpdate({ _id: id }, data);

    if (!result) {
        throw new Error("Warehouse not found");
    }

    return result;
};

/**
 * Deletes a warehouse by its ID.
 * @param {string} id - The ID of the warehouse to delete.
 * @returns {Promise<{ deletedCount?: number }>} - The result of the deletion operation.
 */
export const deleteWarehouse = async (id: string) => {
    const result = await Warehouse.deleteOne({ _id: id });
    return result;
};

/**
 * Retrieves a warehouse by its ID.
 * @param {string} id - The ID of the warehouse to retrieve.
 * @returns {Promise<IWarehouse | null>} - The found warehouse object, or null if not found.
 */
export const getWarehouseById = async (id: string) => {
    const result = await Warehouse.findById(id).lean();
    return result;
};

/**
 * Retrieves all warehouses.
 * @returns {Promise<IWarehouse[]>} - An array of all warehouse objects.
 */
export const getAllWarehouse = async () => {
    const result = await Warehouse.find({}).lean();
    return result;
};

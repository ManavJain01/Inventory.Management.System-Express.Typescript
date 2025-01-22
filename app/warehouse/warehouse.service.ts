import { AppDataSource } from "../common/services/data-source";
import { Warehouse } from "./warehouse.entity";

/**
 * Creates a new warehouse.
 * @param {Partial<Warehouse>} data - The data of the warehouse to be created.
 * @returns {Promise<{inventory: Warehouse}>} - A promise that resolves to the created warehouse.
 */
export const createWarehouse = async (data: Partial<Warehouse>) => {
    const warehouseRepository = AppDataSource.getRepository(Warehouse);
    const newWarehouse = warehouseRepository.create(data);
    const result = await warehouseRepository.save(newWarehouse);
    return { inventory: result };
};

/**
 * Updates an existing warehouse.
 * @param {number} id - The ID of the warehouse to be updated.
 * @param {Partial<Warehouse>} data - The data to be updated.
 * @returns {Promise<Warehouse>} - A promise that resolves to the updated warehouse.
 */
export const updateWarehouse = async (id: number, data: Partial<Warehouse>) => {
    const warehouseRepository = AppDataSource.getRepository(Warehouse);
    const warehouse = await warehouseRepository.findOneBy({ id });

    if (!warehouse) {
        throw new Error("Warehouse not found");
    }

    const updatedWarehouse = await warehouseRepository.save({ ...warehouse, ...data });
    return updatedWarehouse;
};

/**
 * Updates an existing warehouse with partial data.
 * @param {number} id - The ID of the warehouse to be updated.
 * @param {Partial<Warehouse>} data - The partial data to be updated.
 * @returns {Promise<Warehouse>} - A promise that resolves to the updated warehouse.
 */
export const editWarehouse = async (id: number, data: Partial<Warehouse>) => {
    const warehouseRepository = AppDataSource.getRepository(Warehouse);
    const result = await warehouseRepository.update({ id }, data);

    if (result.affected === 0) {
        throw new Error("Warehouse not found");
    }

    const updatedWarehouse = await warehouseRepository.findOneBy({ id });
    return updatedWarehouse;
};

/**
 * Deletes a warehouse.
 * @param {number} id - The ID of the warehouse to be deleted.
 * @returns {Promise<DeleteResult>} - A promise that resolves to the result of the deletion.
 */
export const deleteWarehouse = async (id: number) => {
    const warehouseRepository = AppDataSource.getRepository(Warehouse);
    const result = await warehouseRepository.delete({ id });
    return result;
};

/**
 * Retrieves a warehouse by ID.
 * @param {number} id - The ID of the warehouse to be retrieved.
 * @returns {Promise<Warehouse | null>} - A promise that resolves to the warehouse if found, otherwise null.
 */
export const getWarehouseById = async (id: number) => {
    const warehouseRepository = AppDataSource.getRepository(Warehouse);
    const result = await warehouseRepository.findOneBy({ id });
    return result;
};

/**
 * Retrieves all warehouses.
 * @returns {Promise<Warehouse[]>} - A promise that resolves to an array of all warehouses.
 */
export const getAllWarehouse = async () => {
    const warehouseRepository = AppDataSource.getRepository(Warehouse);
    const result = await warehouseRepository.find();
    return result;
};

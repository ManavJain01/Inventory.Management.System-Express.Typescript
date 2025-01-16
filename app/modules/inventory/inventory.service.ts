import { type IInventory } from "./inventory.dto";
import { Inventory } from "./inventory.schema";

export const createInventory = async (data: IInventory) => {
    const result = await Inventory.create({ ...data });

    await result.save();

    return { inventory: result };
};

export const updateInventory = async (id: string, data: IInventory) => {
    const result = await Inventory.findOneAndUpdate({ _id: id }, data, {
        new: true,
    });
    return result;
};

export const editInventory = async (id: string, data: Partial<IInventory>) => {
    const result = await Inventory.findOneAndUpdate({ _id: id }, data);
    return result;
};

export const deleteInventory = async (id: string) => {
    const result = await Inventory.deleteOne({ _id: id });
    return result;
};

export const getInventoryById = async (id: string) => {
    const result = await Inventory.findById(id).lean();
    return result;
};

export const getAllInventory = async () => {
    const result = await Inventory.find({}).lean();
    return result;
};
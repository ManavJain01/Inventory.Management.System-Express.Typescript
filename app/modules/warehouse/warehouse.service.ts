import { sendEmail } from "../../common/services/email.service";
import { type IWarehouse } from "./warehouse.dto";
import { Warehouse } from "./warehouse.schema";

export const createWarehouse = async (data: IWarehouse) => {
    const result = await Warehouse.create({ ...data });

    await result.save();

    return { inventory: result };
};

export const updateWarehouse = async (id: string, data: IWarehouse) => {
    const result = await Warehouse.findOneAndUpdate({ _id: id }, data, {
        new: true,
    });
    return result;
};

export const editWarehouse = async (id: string, data: Partial<IWarehouse>) => {
    const result = await Warehouse.findOneAndUpdate({ _id: id }, data);

    if(!result){
        throw new Error("Warehouse not found");
    }

    return result;
};

export const deleteWarehouse = async (id: string) => {
    const result = await Warehouse.deleteOne({ _id: id });
    return result;
};

export const getWarehouseById = async (id: string) => {
    const result = await Warehouse.findById(id).lean();
    return result;
};

export const getAllWarehouse = async () => {
    const result = await Warehouse.find({}).lean();
    return result;
};
import { sendEmail } from "../../common/services/email.service";
import { type IStock } from "./stock.dto";
import { Stock } from "./stock.schema";

export const createStock = async (data: IStock) => {
    const result = await Stock.create({ ...data });

    await result.save();

    return { inventory: result };
};

export const updateStock = async (id: string, data: IStock) => {
    const result = await Stock.findOneAndUpdate({ _id: id }, data, {
        new: true,
    });
    return result;
};

export const editStock = async (id: string, data: Partial<IStock>) => {
    const result = await Stock.findOneAndUpdate({ _id: id }, data);

    if(!result){
        throw new Error("Stock not found");
    }

    return result;
};

export const deleteStock = async (id: string) => {
    const result = await Stock.deleteOne({ _id: id });
    return result;
};

export const getStockById = async (id: string) => {
    const result = await Stock.findById(id).lean();
    return result;
};

export const getAllStock = async () => {
    const result = await Stock.find({}).lean();
    return result;
};Stock
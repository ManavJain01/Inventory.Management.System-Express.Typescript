import { type BaseSchema } from "../../common/dto/base.dto";

export interface IProduct extends BaseSchema {
    name: string;
    price: number;
    warehouse_id: object;
    quantity: number;
    lowStockThreshold: number;
}
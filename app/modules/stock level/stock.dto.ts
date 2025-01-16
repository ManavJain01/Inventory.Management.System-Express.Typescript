import { type BaseSchema } from "../../common/dto/base.dto";

export interface IStock extends BaseSchema {
    product_id: object;
    warehouse_id: object;
    quantity: number;
    lowStockThreshold: number;
}
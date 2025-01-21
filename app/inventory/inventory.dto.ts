import { type BaseSchema } from "../common/dto/base.dto";

export interface IInventory extends BaseSchema {
    name: string;
    price: number;
}
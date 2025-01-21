import { type BaseSchema } from "../common/dto/base.dto";

export interface IWarehouse extends BaseSchema {
    name: string;
    location: string;
    managerId: object;
}
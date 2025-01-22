export interface IWarehouse {
    id: number;
    name: string;
    location: string;
    managerId: number;
    createdAt?: Date;
    updatedAt?: Date;
}
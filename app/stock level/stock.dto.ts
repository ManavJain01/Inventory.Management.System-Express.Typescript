export interface IStock {
    id: number;
    product_id: number;
    warehouse_id: number;
    quantity: number;
    lowStockThreshold: number;
    createdAt?: Date;
    updatedAt?: Date;
}
import { Entity, Column } from "typeorm";

export class IProduct {
    @Column({ type: 'varchar', length: 255 })
    name: string;
  
    @Column({ type: 'varchar', length: 255 })
    price: number;

    @Column({ type: 'varchar', length: 255 })
    warehouse_id: number;

    @Column({ type: 'varchar', length: 255 })
    quantity: number;

    @Column({ type: 'varchar', length: 255 })
    lowStockThreshold: number;
}
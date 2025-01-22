import { Entity, Column } from "typeorm";
import { BaseEntity } from "../common/entity/base.entity";
import { IStock } from "./stock.dto";

@Entity("inventory")
export class Stock extends BaseEntity implements IStock {
  @Column({ type: 'varchar', length: 255 })
  product_id: number;

  @Column({ type: 'varchar', length: 255 })
  warehouse_id: number;
  
  @Column({ type: 'varchar', length: 255 })
  quantity: number;
  
  @Column({ type: 'varchar', length: 255 })
  lowStockThreshold: number;
}
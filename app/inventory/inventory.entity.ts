import { Entity, Column } from "typeorm";
import { BaseEntity } from "../common/entity/base.entity";
import { IInventory } from "./inventory.dto";

@Entity("inventory")
export class Inventory extends BaseEntity implements IInventory {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  price: number;
}
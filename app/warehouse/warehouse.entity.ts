import { Entity, Column } from "typeorm";
import { BaseEntity } from "../common/entity/base.entity";
import { IWarehouse } from "./warehouse.dto";

@Entity("warehouse")
export class Warehouse extends BaseEntity implements IWarehouse {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  location: string;
  
  @Column({ type: 'varchar', length: 255 })
  managerId: number;
}
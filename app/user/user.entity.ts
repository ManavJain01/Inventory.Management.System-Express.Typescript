import { Entity, Column } from "typeorm";
import { BaseEntity } from "../common/entity/base.entity";
import { IUser } from "./user.dto";

@Entity('users')
export class User extends BaseEntity implements IUser {
  @Column({ type: 'varchar', length: 255 })
  name: string;
  
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;
  
  @Column({ type: 'varchar', length: 255 })
  password: string;
  
  @Column({ type: 'varchar', enum: ["USER", "ADMIN", "MANAGER"] })
  role: "USER" | "ADMIN" | "MANAGER";
  
  @Column({ type: 'varchar', nullable: true })
  refreshToken: string | null;
}
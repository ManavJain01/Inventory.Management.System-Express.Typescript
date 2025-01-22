import { DataSource } from "typeorm";
import { User } from "../../user/user.entity";
import { Inventory } from "../../inventory/inventory.entity";
import { Warehouse } from "../../warehouse/warehouse.entity";
import { Stock } from "../../stock level/stock.entity";

export const AppDataSource = new DataSource({
  type: "postgres", // Change this to your database type
  host: "localhost",
  port: 5432, // Default PostgreSQL port
  username: "postgres",
  password: "1234",
  database: "postgres",
  synchronize: true, // Use false in production and run migrations instead
  logging: true,
  entities: [User, Inventory, Warehouse, Stock], // Path to your entity files
  migrations: ["app/common/migration/**/*.ts"], // Optional, for migrations
  // subscribers: ["app/common/subscriber/**/*.ts"], // Optional, for subscribers
});
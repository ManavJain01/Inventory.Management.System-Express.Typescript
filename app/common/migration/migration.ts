import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { UserMigration1620000000001 } from '../../user/user.migration';
import { WarehouseMigration1620000000001 } from '../../warehouse/warehouse.migration';
import { InventoryMigration1620000000001 } from '../../inventory/inventory.migration';
import { StockMigration1620000000001 } from '../../stock level/stock.migration';

export class MigrationName1620000000000 implements MigrationInterface {

  // `up` method for applying the migration
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Execute all individual migrations in sequence
    await new UserMigration1620000000001().up(queryRunner);
    await new WarehouseMigration1620000000001().up(queryRunner);
    await new InventoryMigration1620000000001().up(queryRunner);
    await new StockMigration1620000000001().up(queryRunner);
  }

  // `down` method for reverting the migration
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('stock');
    await queryRunner.dropTable('inventory');
    await queryRunner.dropTable('warehouse');
    await queryRunner.dropTable('users');
  }
}
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class StockMigration1620000000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
        new Table({
          name: 'stock',
          columns: [
            {
              name: 'id',
              type: 'int',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
            {
              name: 'product_id',
              type: 'int',
            },
            {
              name: 'warehouse_id',
              type: 'int',
            },
            {
              name: 'quantity',
              type: 'int',
            },
            {
              name: 'lowStockThreshold',
              type: 'int',
            },
            {
              name: 'createdAt',
              type: 'timestamp',
              default: 'CURRENT_TIMESTAMP',
            },
            {
              name: 'updatedAt',
              type: 'timestamp',
              default: 'CURRENT_TIMESTAMP',
              onUpdate: 'CURRENT_TIMESTAMP',
            },
          ],
        })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('stock');
  }
}
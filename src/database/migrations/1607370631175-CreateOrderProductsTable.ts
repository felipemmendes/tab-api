import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateOrderProductsTable1607370631175
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'order_products',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'product_id',
            type: 'uuid',
          },
          {
            name: 'product_value',
            type: 'decimal',
            precision: 6,
            scale: 2,
          },
          {
            name: 'product_quantity',
            type: 'int',
          },
          {
            name: 'restaurant_visit_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys('order_products', [
      new TableForeignKey({
        name: 'order_product',
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
      }),
      new TableForeignKey({
        name: 'order_visit',
        columnNames: ['restaurant_visit_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'restaurant_visits',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys('order_products', [
      new TableForeignKey({
        name: 'order_product',
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
      }),
      new TableForeignKey({
        name: 'order_visit',
        columnNames: ['restaurant_visit_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'restaurant_visits',
      }),
    ]);

    await queryRunner.dropTable('order_products');
  }
}

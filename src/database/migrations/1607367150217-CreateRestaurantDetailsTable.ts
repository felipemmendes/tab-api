import {
  TableColumn,
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateRestaurantDetailsTable1607367150217
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'restaurant_details',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'website',
            type: 'varchar',
          },
          {
            name: 'instagram',
            type: 'varchar',
          },
          {
            name: 'contact_number',
            type: 'varchar',
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

    await queryRunner.addColumn(
      'restaurants',
      new TableColumn({
        name: 'detail_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'restaurants',
      new TableForeignKey({
        name: 'restaurant_detail',
        columnNames: ['detail_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'restaurant_details',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('restaurants', 'restaurant_detail');
    await queryRunner.dropColumn('restaurants', 'detail_id');
    await queryRunner.dropTable('restaurant_details');
  }
}

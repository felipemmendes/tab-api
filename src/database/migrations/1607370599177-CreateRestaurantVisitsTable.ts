import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateRestaurantVisitsTable1607370599177
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'restaurant_visits',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'date',
            type: 'timestamp',
          },
          {
            name: 'score',
            type: 'integer',
          },
          {
            name: 'comments',
            type: 'varchar',
          },
          {
            name: 'restaurant_id',
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

    await queryRunner.createForeignKey(
      'restaurant_visits',
      new TableForeignKey({
        name: 'restaurant_visit',
        columnNames: ['restaurant_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'restaurants',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('restaurant_visits', 'restaurant_visit');
    await queryRunner.dropTable('restaurant_visits');
  }
}

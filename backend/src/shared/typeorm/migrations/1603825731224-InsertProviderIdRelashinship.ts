import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey
} from 'typeorm'

export default class AlterProviderFieldToProviderId1586971443311
implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'provider')

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true
      })
    )

    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'AppointmentProvider',

        referencedTableName: 'users',
        referencedColumnNames: ['id'],

        columnNames: ['provider_id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'AppointmentProvider')
    await queryRunner.dropColumn('appointments', 'provider_id')

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider',
        type: 'varchar',
        isNullable: true
      })
    )
  }
}

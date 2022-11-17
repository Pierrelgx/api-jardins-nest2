import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAvailableBooleanToProduct1668674118226
  implements MigrationInterface
{
  name = 'AddAvailableBooleanToProduct1668674118226';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" ADD "available" boolean NOT NULL DEFAULT true`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "available"`);
  }
}

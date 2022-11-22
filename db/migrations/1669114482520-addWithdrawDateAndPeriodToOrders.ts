import { MigrationInterface, QueryRunner } from 'typeorm';

export class addWithdrawDateAndPeriodToOrders1669114482520
  implements MigrationInterface
{
  name = 'addWithdrawDateAndPeriodToOrders1669114482520';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order" ADD "withdrawDate" date NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD "withdrawMorning" boolean NOT NULL DEFAULT true`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order" DROP COLUMN "withdrawMorning"`,
    );
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "withdrawDate"`);
  }
}

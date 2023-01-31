import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDateToCarts1675172702109 implements MigrationInterface {
    name = 'AddDateToCarts1675172702109'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "cart" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TYPE "public"."product_producttype_enum" RENAME TO "product_producttype_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."product_producttype_enum" AS ENUM('legumes', 'fruits', 'oeufs', 'sec')`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "productType" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "productType" TYPE "public"."product_producttype_enum" USING "productType"::"text"::"public"."product_producttype_enum"`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "productType" SET DEFAULT 'legumes'`);
        await queryRunner.query(`DROP TYPE "public"."product_producttype_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."product_producttype_enum_old" AS ENUM('legumes', 'fruits', 'oeufs', 'miel', 'divers')`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "productType" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "productType" TYPE "public"."product_producttype_enum_old" USING "productType"::"text"::"public"."product_producttype_enum_old"`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "productType" SET DEFAULT 'legumes'`);
        await queryRunner.query(`DROP TYPE "public"."product_producttype_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."product_producttype_enum_old" RENAME TO "product_producttype_enum"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "createdAt"`);
    }

}

import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateVehicle1616189085445 implements MigrationInterface {
  name = 'CreateVehicle1616189085445';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "bike_type" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_b4d5cd9baf8e5aca725adca3232" DEFAULT NEWSEQUENTIALID(), "description" nvarchar(255) NOT NULL, CONSTRAINT "PK_b4d5cd9baf8e5aca725adca3232" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "bicycles" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_c0ecd961ff05a2bcf3783ffc142" DEFAULT NEWSEQUENTIALID(), "brand" nvarchar(255) NOT NULL, "model" nvarchar(255) NOT NULL, "color" nvarchar(255) NOT NULL, "serial_number" nvarchar(255) NOT NULL, "bike_type_id" uniqueidentifier NOT NULL, "user_id" uniqueidentifier NOT NULL, CONSTRAINT "PK_c0ecd961ff05a2bcf3783ffc142" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "REL_31730dec2f88cf833ad50cd543" ON "bicycles" ("bike_type_id") WHERE "bike_type_id" IS NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "REL_2c98ff2b77ac30a630ce19a2e5" ON "bicycles" ("user_id") WHERE "user_id" IS NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "bicycles" ADD CONSTRAINT "FK_31730dec2f88cf833ad50cd543d" FOREIGN KEY ("bike_type_id") REFERENCES "bike_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bicycles" ADD CONSTRAINT "FK_2c98ff2b77ac30a630ce19a2e52" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bicycles" DROP CONSTRAINT "FK_2c98ff2b77ac30a630ce19a2e52"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bicycles" DROP CONSTRAINT "FK_31730dec2f88cf833ad50cd543d"`,
    );

    await queryRunner.query(
      `DROP INDEX "REL_2c98ff2b77ac30a630ce19a2e5" ON "bicycles"`,
    );
    await queryRunner.query(
      `DROP INDEX "REL_31730dec2f88cf833ad50cd543" ON "bicycles"`,
    );
    await queryRunner.query(`DROP TABLE "bicycles"`);
    await queryRunner.query(`DROP TABLE "bike_type"`);
  }
}

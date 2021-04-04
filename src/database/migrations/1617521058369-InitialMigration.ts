import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1617521058369 implements MigrationInterface {
    name = 'InitialMigration1617521058369'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "adresses" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_2787c84f7433e390ff8961d552d" DEFAULT NEWSEQUENTIALID(), "number" nvarchar(255) NULL, "route" nvarchar(255) NOT NULL, "sublocality" nvarchar(255) NOT NULL, "locality" nvarchar(255) NOT NULL, "state" nvarchar(255) NOT NULL, "country" nvarchar(255) NOT NULL, "latitude" decimal(9,6) NOT NULL, "longitude" decimal(9,6) NOT NULL, CONSTRAINT "PK_2787c84f7433e390ff8961d552d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bike_type" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_b4d5cd9baf8e5aca725adca3232" DEFAULT NEWSEQUENTIALID(), "description" nvarchar(255) NOT NULL, CONSTRAINT "PK_b4d5cd9baf8e5aca725adca3232" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_a3ffb1c0c8416b9fc6f907b7433" DEFAULT NEWSEQUENTIALID(), "name" nvarchar(255) NOT NULL, "family_name" nvarchar(255) NOT NULL, "email" nvarchar(255) NOT NULL, "telephone" nvarchar(10) NOT NULL, "cell_phone" nvarchar(11) NOT NULL, "password" nvarchar(255) NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bicycles" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_c0ecd961ff05a2bcf3783ffc142" DEFAULT NEWSEQUENTIALID(), "brand" nvarchar(255) NOT NULL, "model" nvarchar(255) NOT NULL, "color" nvarchar(255) NOT NULL, "serial_number" nvarchar(255) NOT NULL, "bike_type_id" uniqueidentifier NOT NULL, "user_id" uniqueidentifier NOT NULL, CONSTRAINT "PK_c0ecd961ff05a2bcf3783ffc142" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "occurrence_type" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_2d207b4c1ec7a3b4a8d1b9512b8" DEFAULT NEWSEQUENTIALID(), "description" nvarchar(255) NOT NULL, CONSTRAINT "PK_2d207b4c1ec7a3b4a8d1b9512b8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "occurrences" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_04fa3cf0bb8ea79b707dbfabe0a" DEFAULT NEWSEQUENTIALID(), "ocurence_type_id" uniqueidentifier NOT NULL, "bike_id" uniqueidentifier NOT NULL, "datetime" datetime NOT NULL, "description" nvarchar(255) NOT NULL, "address_id" uniqueidentifier NOT NULL, CONSTRAINT "PK_04fa3cf0bb8ea79b707dbfabe0a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "bicycles" ADD CONSTRAINT "FK_31730dec2f88cf833ad50cd543d" FOREIGN KEY ("bike_type_id") REFERENCES "bike_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bicycles" ADD CONSTRAINT "FK_2c98ff2b77ac30a630ce19a2e52" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "occurrences" ADD CONSTRAINT "FK_286357edf9181a5cc651d761668" FOREIGN KEY ("ocurence_type_id") REFERENCES "occurrence_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "occurrences" ADD CONSTRAINT "FK_6ea908d1bb80427395c163426d2" FOREIGN KEY ("bike_id") REFERENCES "bicycles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "occurrences" ADD CONSTRAINT "FK_28208b8d4ad2c29baf674825959" FOREIGN KEY ("address_id") REFERENCES "adresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "occurrences" DROP CONSTRAINT "FK_28208b8d4ad2c29baf674825959"`);
        await queryRunner.query(`ALTER TABLE "occurrences" DROP CONSTRAINT "FK_6ea908d1bb80427395c163426d2"`);
        await queryRunner.query(`ALTER TABLE "occurrences" DROP CONSTRAINT "FK_286357edf9181a5cc651d761668"`);
        await queryRunner.query(`ALTER TABLE "bicycles" DROP CONSTRAINT "FK_2c98ff2b77ac30a630ce19a2e52"`);
        await queryRunner.query(`ALTER TABLE "bicycles" DROP CONSTRAINT "FK_31730dec2f88cf833ad50cd543d"`);
        await queryRunner.query(`DROP TABLE "occurrences"`);
        await queryRunner.query(`DROP TABLE "occurrence_type"`);
        await queryRunner.query(`DROP TABLE "bicycles"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "bike_type"`);
        await queryRunner.query(`DROP TABLE "adresses"`);
    }

}

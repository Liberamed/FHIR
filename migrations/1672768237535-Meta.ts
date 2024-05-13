import { MigrationInterface, QueryRunner } from "typeorm";

export class Meta1672768237535 implements MigrationInterface {
    name = 'Meta1672768237535'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "diagnosis" DROP CONSTRAINT "FK_5c5d83c09fef194ef807fc1273a"`);
        await queryRunner.query(`ALTER TABLE "encounter" DROP CONSTRAINT "FK_816d3059ea387d08879713c7316"`);
        await queryRunner.query(`ALTER TABLE "encounter" DROP CONSTRAINT "FK_a9c05100cb3647a5660d1c4c20d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7e6ca88c465709b8b77c69f125"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_750a348c49aae2866fdd08efbe"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0cf84538504110d60bd43bf814"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9fb6a84f8a0b0e80931c4c1d7c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1ae0b84abc42f9f6c5d80cd2d7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2bb6640ba6d3f27865b755873b"`);
        await queryRunner.query(`ALTER TABLE "diagnosis" DROP CONSTRAINT "UQ_5c5d83c09fef194ef807fc1273a"`);
        await queryRunner.query(`ALTER TABLE "diagnosis" DROP COLUMN "conditionId"`);
        await queryRunner.query(`ALTER TABLE "encounter" DROP COLUMN "subjectId"`);
        await queryRunner.query(`ALTER TABLE "encounter" DROP COLUMN "patientId"`);
        await queryRunner.query(`ALTER TABLE "instant" DROP COLUMN "offsetFromUTC"`);
        await queryRunner.query(`ALTER TABLE "instant" DROP COLUMN "valueAtUTC"`);
        await queryRunner.query(`ALTER TABLE "instant" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "instant" DROP COLUMN "original"`);
        await queryRunner.query(`ALTER TABLE "diagnosis" ADD "conditionId" integer`);
        await queryRunner.query(`ALTER TABLE "diagnosis" ADD CONSTRAINT "UQ_5c5d83c09fef194ef807fc1273a" UNIQUE ("conditionId")`);
        await queryRunner.query(`ALTER TABLE "encounter" ADD "patientId" integer`);
        await queryRunner.query(`ALTER TABLE "encounter" ADD "subjectId" integer`);
        await queryRunner.query(`ALTER TABLE "instant" ADD "original" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "instant" ADD "value" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "instant" ADD "offsetFromUTC" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "instant" ADD "valueAtUTC" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "practitioner" ALTER COLUMN "active" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "practitioner" ALTER COLUMN "active" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "practitioner" ALTER COLUMN "active" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "practitioner" ALTER COLUMN "active" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "practitioner" ALTER COLUMN "active" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "observation" ALTER COLUMN "effectiveDateTime" SET DEFAULT '1900-01-01'`);
        await queryRunner.query(`ALTER TABLE "observation" ALTER COLUMN "effectiveDateTime" SET DEFAULT '1900-01-01'`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_750a348c49aae2866fdd08efbe" ON "identifier" ("system", "value") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_2bb6640ba6d3f27865b755873b" ON "appointment_identifier" ("system", "value") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_0cf84538504110d60bd43bf814" ON "encounter_identifier" ("system", "value") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_7e6ca88c465709b8b77c69f125" ON "patient_identifier" ("system", "value") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_9fb6a84f8a0b0e80931c4c1d7c" ON "qualification_identifier" ("system", "value") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_1ae0b84abc42f9f6c5d80cd2d7" ON "practitioner_identifier" ("system", "value") `);
        await queryRunner.query(`ALTER TABLE "diagnosis" ADD CONSTRAINT "FK_5c5d83c09fef194ef807fc1273a" FOREIGN KEY ("conditionId") REFERENCES "condition"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "encounter" ADD CONSTRAINT "FK_a9c05100cb3647a5660d1c4c20d" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "encounter" ADD CONSTRAINT "FK_816d3059ea387d08879713c7316" FOREIGN KEY ("subjectId") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "encounter" DROP CONSTRAINT "FK_816d3059ea387d08879713c7316"`);
        await queryRunner.query(`ALTER TABLE "encounter" DROP CONSTRAINT "FK_a9c05100cb3647a5660d1c4c20d"`);
        await queryRunner.query(`ALTER TABLE "diagnosis" DROP CONSTRAINT "FK_5c5d83c09fef194ef807fc1273a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1ae0b84abc42f9f6c5d80cd2d7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9fb6a84f8a0b0e80931c4c1d7c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7e6ca88c465709b8b77c69f125"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0cf84538504110d60bd43bf814"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2bb6640ba6d3f27865b755873b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_750a348c49aae2866fdd08efbe"`);
        await queryRunner.query(`ALTER TABLE "observation" ALTER COLUMN "effectiveDateTime" SET DEFAULT '1900-01-01 00:00:00'`);
        await queryRunner.query(`ALTER TABLE "observation" ALTER COLUMN "effectiveDateTime" SET DEFAULT '1900-01-01 00:00:00'`);
        await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "practitioner" ALTER COLUMN "active" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "practitioner" ALTER COLUMN "active" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "practitioner" ALTER COLUMN "active" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "practitioner" ALTER COLUMN "active" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "practitioner" ALTER COLUMN "active" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "instant" DROP COLUMN "valueAtUTC"`);
        await queryRunner.query(`ALTER TABLE "instant" DROP COLUMN "offsetFromUTC"`);
        await queryRunner.query(`ALTER TABLE "instant" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "instant" DROP COLUMN "original"`);
        await queryRunner.query(`ALTER TABLE "encounter" DROP COLUMN "subjectId"`);
        await queryRunner.query(`ALTER TABLE "encounter" DROP COLUMN "patientId"`);
        await queryRunner.query(`ALTER TABLE "diagnosis" DROP CONSTRAINT "UQ_5c5d83c09fef194ef807fc1273a"`);
        await queryRunner.query(`ALTER TABLE "diagnosis" DROP COLUMN "conditionId"`);
        await queryRunner.query(`ALTER TABLE "instant" ADD "original" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "instant" ADD "value" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "instant" ADD "valueAtUTC" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "instant" ADD "offsetFromUTC" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "encounter" ADD "patientId" integer`);
        await queryRunner.query(`ALTER TABLE "encounter" ADD "subjectId" integer`);
        await queryRunner.query(`ALTER TABLE "diagnosis" ADD "conditionId" integer`);
        await queryRunner.query(`ALTER TABLE "diagnosis" ADD CONSTRAINT "UQ_5c5d83c09fef194ef807fc1273a" UNIQUE ("conditionId")`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_2bb6640ba6d3f27865b755873b" ON "appointment_identifier" ("system", "value") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_1ae0b84abc42f9f6c5d80cd2d7" ON "practitioner_identifier" ("system", "value") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_9fb6a84f8a0b0e80931c4c1d7c" ON "qualification_identifier" ("system", "value") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_0cf84538504110d60bd43bf814" ON "encounter_identifier" ("system", "value") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_750a348c49aae2866fdd08efbe" ON "identifier" ("system", "value") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_7e6ca88c465709b8b77c69f125" ON "patient_identifier" ("system", "value") `);
        await queryRunner.query(`ALTER TABLE "encounter" ADD CONSTRAINT "FK_a9c05100cb3647a5660d1c4c20d" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "encounter" ADD CONSTRAINT "FK_816d3059ea387d08879713c7316" FOREIGN KEY ("subjectId") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "diagnosis" ADD CONSTRAINT "FK_5c5d83c09fef194ef807fc1273a" FOREIGN KEY ("conditionId") REFERENCES "condition"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

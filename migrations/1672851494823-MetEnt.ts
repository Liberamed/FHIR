import { MigrationInterface, QueryRunner } from "typeorm";

export class MetEnt1672851494823 implements MigrationInterface {
    name = 'MetEnt1672851494823'

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
        await queryRunner.query(`CREATE TABLE "meta" ("id" SERIAL NOT NULL, "versionId" SERIAL NOT NULL, "lastUpdated" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_87f330de9b6d9de9723557eb8be" PRIMARY KEY ("id", "versionId"))`);
        await queryRunner.query(`CREATE TABLE "meta_extension_extension" ("metaId" integer NOT NULL, "metaVersionId" integer NOT NULL, "extensionId" integer NOT NULL, CONSTRAINT "PK_e2903f5e7fb84185643cc30aff8" PRIMARY KEY ("metaId", "metaVersionId", "extensionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bdcd0ab4b1340f1b2646cafacf" ON "meta_extension_extension" ("metaId", "metaVersionId") `);
        await queryRunner.query(`CREATE INDEX "IDX_84aaeeacbc8c78bb291c6ee843" ON "meta_extension_extension" ("extensionId") `);
        await queryRunner.query(`ALTER TABLE "diagnosis" DROP CONSTRAINT "UQ_5c5d83c09fef194ef807fc1273a"`);
        await queryRunner.query(`ALTER TABLE "diagnosis" DROP COLUMN "conditionId"`);
        await queryRunner.query(`ALTER TABLE "encounter" DROP COLUMN "subjectId"`);
        await queryRunner.query(`ALTER TABLE "encounter" DROP COLUMN "patientId"`);
        await queryRunner.query(`ALTER TABLE "instant" DROP COLUMN "valueAtUTC"`);
        await queryRunner.query(`ALTER TABLE "instant" DROP COLUMN "offsetFromUTC"`);
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
        await queryRunner.query(`ALTER TABLE "practitioner" ALTER COLUMN "active" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "practitioner" ALTER COLUMN "active" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "practitioner" ALTER COLUMN "active" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "practitioner" ALTER COLUMN "active" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "practitioner" ALTER COLUMN "active" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "practitioner" ALTER COLUMN "active" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "observation" ALTER COLUMN "effectiveDateTime" SET DEFAULT '1900-01-01'`);
        await queryRunner.query(`ALTER TABLE "practitioner" ALTER COLUMN "active" DROP NOT NULL`);
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
        await queryRunner.query(`ALTER TABLE "meta_extension_extension" ADD CONSTRAINT "FK_bdcd0ab4b1340f1b2646cafacfa" FOREIGN KEY ("metaId", "metaVersionId") REFERENCES "meta"("id","versionId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "meta_extension_extension" ADD CONSTRAINT "FK_84aaeeacbc8c78bb291c6ee8437" FOREIGN KEY ("extensionId") REFERENCES "extension"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meta_extension_extension" DROP CONSTRAINT "FK_84aaeeacbc8c78bb291c6ee8437"`);
        await queryRunner.query(`ALTER TABLE "meta_extension_extension" DROP CONSTRAINT "FK_bdcd0ab4b1340f1b2646cafacfa"`);
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
        await queryRunner.query(`ALTER TABLE "practitioner" ALTER COLUMN "active" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "observation" ALTER COLUMN "effectiveDateTime" SET DEFAULT '1900-01-01 00:00:00'`);
        await queryRunner.query(`ALTER TABLE "practitioner" ALTER COLUMN "active" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "practitioner" ALTER COLUMN "active" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "practitioner" ALTER COLUMN "active" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "practitioner" ALTER COLUMN "active" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "practitioner" ALTER COLUMN "active" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "practitioner" ALTER COLUMN "active" SET NOT NULL`);
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
        await queryRunner.query(`ALTER TABLE "instant" ADD "offsetFromUTC" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "instant" ADD "valueAtUTC" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "encounter" ADD "patientId" integer`);
        await queryRunner.query(`ALTER TABLE "encounter" ADD "subjectId" integer`);
        await queryRunner.query(`ALTER TABLE "diagnosis" ADD "conditionId" integer`);
        await queryRunner.query(`ALTER TABLE "diagnosis" ADD CONSTRAINT "UQ_5c5d83c09fef194ef807fc1273a" UNIQUE ("conditionId")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_84aaeeacbc8c78bb291c6ee843"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bdcd0ab4b1340f1b2646cafacf"`);
        await queryRunner.query(`DROP TABLE "meta_extension_extension"`);
        await queryRunner.query(`DROP TABLE "meta"`);
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

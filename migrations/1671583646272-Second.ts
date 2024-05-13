import { MigrationInterface, QueryRunner } from 'typeorm'

export class Second1671583646272 implements MigrationInterface {
  name = 'Second1671583646272'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "period" ("id" SERIAL NOT NULL, "start" TIMESTAMP WITH TIME ZONE, "end" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_cabecec858892ab647cd28673b8" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TYPE "public"."patient_name_use_enum" AS ENUM('usual', 'official', 'temp', 'nickname', 'anonymous', 'old', 'maiden')`
    )
    await queryRunner.query(
      `CREATE TABLE "patient_name" ("id" SERIAL NOT NULL, "use" "public"."patient_name_use_enum" NOT NULL DEFAULT 'official', "text" character varying, "family" character varying, "given" text array, "prefix" character varying, "suffix" character varying, "periodId" integer, "patientId" integer, CONSTRAINT "REL_e41fa8054112c32c1903607936" UNIQUE ("periodId"), CONSTRAINT "PK_96dead6f4b92b0740adc43e72db" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TYPE "public"."patient_contact_point_use_enum" AS ENUM('home', 'work', 'temp', 'old', 'mobile')`
    )
    await queryRunner.query(
      `CREATE TABLE "patient_contact_point" ("id" SERIAL NOT NULL, "system" character varying, "value" character varying, "use" "public"."patient_contact_point_use_enum" NOT NULL DEFAULT 'work', "rank" integer, "periodId" integer, "patientId" integer, CONSTRAINT "REL_1840c1192e582e581c46fa2213" UNIQUE ("periodId"), CONSTRAINT "PK_b24218412545a199c7b06810b11" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TYPE "public"."patient_address_use_enum" AS ENUM('home', 'work', 'temp', 'old', 'billing')`
    )
    await queryRunner.query(
      `CREATE TYPE "public"."patient_address_type_enum" AS ENUM('postal', 'physical', 'both')`
    )
    await queryRunner.query(
      `CREATE TABLE "patient_address" ("id" SERIAL NOT NULL, "use" "public"."patient_address_use_enum" NOT NULL DEFAULT 'home', "type" "public"."patient_address_type_enum" NOT NULL DEFAULT 'both', "text" character varying, "line" text array, "city" character varying, "district" character varying, "state" character varying, "postalCode" character varying, "country" character varying, "periodId" integer, "patientId" integer, CONSTRAINT "REL_8f6464f305e2d7798b77625429" UNIQUE ("periodId"), CONSTRAINT "PK_f7f56b3710d99961ab06012bbbc" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "coding" ("id" SERIAL NOT NULL, "system" character varying, "version" character varying, "code" character varying, "display" character varying, "primary" boolean, "valueSet" character varying, "parentId" integer, CONSTRAINT "PK_f111c50f808133a6f11ff1bccb3" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "codeable_concept" ("id" SERIAL NOT NULL, "text" character varying, CONSTRAINT "PK_14ed08f6ea4206b3d6cf2dc5ff2" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TYPE "public"."patient_identifier_use_enum" AS ENUM('usual', 'official', 'temp', 'secondary', 'old')`
    )
    await queryRunner.query(
      `CREATE TABLE "patient_identifier" ("id" SERIAL NOT NULL, "use" "public"."patient_identifier_use_enum" NOT NULL DEFAULT 'official', "system" character varying, "value" character varying, "assigner" character varying, "periodId" integer, "patientId" integer, CONSTRAINT "REL_71665041bb7f618facc469d59f" UNIQUE ("periodId"), CONSTRAINT "PK_a9745dc9a1df60ebe02518d2e8c" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "patient_communication" ("id" SERIAL NOT NULL, "preferred" boolean, "languageId" integer, "patientId" integer, CONSTRAINT "REL_20535217f45058a69249a579fd" UNIQUE ("languageId"), CONSTRAINT "PK_43e4c5f8a9b49c9119573f2f954" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TYPE "public"."patient_gender_enum" AS ENUM('male', 'female', 'other', 'unknown')`
    )
    await queryRunner.query(
      `CREATE TABLE "patient" ("id" SERIAL NOT NULL, "resourceType" character varying NOT NULL, "gender" "public"."patient_gender_enum" NOT NULL DEFAULT 'unknown', "birthDate" date NOT NULL DEFAULT '1900-01-01', CONSTRAINT "PK_8dfa510bb29ad31ab2139fbfb99" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "condition" ("id" SERIAL NOT NULL, "codeId" integer, CONSTRAINT "REL_417623a8a2982b2e5be1e52476" UNIQUE ("codeId"), CONSTRAINT "PK_f0f824897e3acf880a6e488b632" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "diagnosis" ("id" SERIAL NOT NULL, "encounterId" integer, "conditionId" integer, "useId" integer, CONSTRAINT "REL_5c5d83c09fef194ef807fc1273" UNIQUE ("conditionId"), CONSTRAINT "REL_b017ebe630304dd0f4c79a9c9a" UNIQUE ("useId"), CONSTRAINT "PK_d5dbb1cc4e30790df368da56961" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TYPE "public"."identifier_use_enum" AS ENUM('usual', 'official', 'temp', 'secondary', 'old')`
    )
    await queryRunner.query(
      `CREATE TABLE "identifier" ("id" SERIAL NOT NULL, "use" "public"."identifier_use_enum" NOT NULL DEFAULT 'official', "system" character varying, "value" character varying, "assigner" character varying, "periodId" integer, CONSTRAINT "REL_ab503f5b3408ee06c1503a1ccb" UNIQUE ("periodId"), CONSTRAINT "PK_d3d2abb5833f4695e48610f5b6b" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TYPE "public"."encounter_identifier_use_enum" AS ENUM('usual', 'official', 'temp', 'secondary', 'old')`
    )
    await queryRunner.query(
      `CREATE TABLE "encounter_identifier" ("id" SERIAL NOT NULL, "use" "public"."encounter_identifier_use_enum" NOT NULL DEFAULT 'official', "system" character varying, "value" character varying, "assigner" character varying, "periodId" integer, "encounterId" integer, CONSTRAINT "REL_e0385c10c2ce2c9b707a65a172" UNIQUE ("periodId"), CONSTRAINT "PK_8ad07f2b1a1008950890828f816" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "extension" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "value" character varying NOT NULL, CONSTRAINT "PK_e9e7da4f1cfc826aba870c20589" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "reference" ("id" SERIAL NOT NULL, "reference" character varying NOT NULL, "type" character varying, "display" character varying, CONSTRAINT "PK_01bacbbdd90839b7dce352e4250" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "encounter" ("id" SERIAL NOT NULL, "patientId" integer, "periodId" integer, CONSTRAINT "REL_8614220e803ca21c146a871f8b" UNIQUE ("periodId"), CONSTRAINT "PK_1cf9e15e693ff9f0ef9b9061372" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "encounter_participant" ("id" SERIAL NOT NULL, "periodId" integer, "actorId" integer, "encounterId" integer, CONSTRAINT "REL_2974d8c90c6c70ced421024c0b" UNIQUE ("periodId"), CONSTRAINT "REL_1d6c8b982cfc8ae73bd66ec7ce" UNIQUE ("actorId"), CONSTRAINT "PK_9ddaf398e0e8fa8b770a3ed0f60" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TYPE "public"."qualification_identifier_use_enum" AS ENUM('usual', 'official', 'temp', 'secondary', 'old')`
    )
    await queryRunner.query(
      `CREATE TABLE "qualification_identifier" ("id" SERIAL NOT NULL, "use" "public"."qualification_identifier_use_enum" NOT NULL DEFAULT 'official', "system" character varying, "value" character varying, "assigner" character varying, "periodId" integer, "qualificationId" integer, CONSTRAINT "REL_45eee420e9bd8d4e03313b84bd" UNIQUE ("periodId"), CONSTRAINT "PK_df5cee637d389d69ca620e0a970" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "qualification" ("id" SERIAL NOT NULL, "issuer" character varying, "practitionerId" integer, "codeId" integer, "periodId" integer, CONSTRAINT "REL_ef3973178c301f7710399038c0" UNIQUE ("codeId"), CONSTRAINT "REL_a5c8241598c7fba2ad9f5d9d10" UNIQUE ("periodId"), CONSTRAINT "PK_c8244868552c4364a5264440a66" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TYPE "public"."practitioner_contact_point_use_enum" AS ENUM('home', 'work', 'temp', 'old', 'mobile')`
    )
    await queryRunner.query(
      `CREATE TABLE "practitioner_contact_point" ("id" SERIAL NOT NULL, "system" character varying, "value" character varying, "use" "public"."practitioner_contact_point_use_enum" NOT NULL DEFAULT 'work', "rank" integer, "periodId" integer, "practitionerId" integer, CONSTRAINT "REL_ca3159351319f43faa378dcd4c" UNIQUE ("periodId"), CONSTRAINT "PK_7057a8d2fbe89d76b5f033b104e" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TYPE "public"."practitioner_identifier_use_enum" AS ENUM('usual', 'official', 'temp', 'secondary', 'old')`
    )
    await queryRunner.query(
      `CREATE TABLE "practitioner_identifier" ("id" SERIAL NOT NULL, "use" "public"."practitioner_identifier_use_enum" NOT NULL DEFAULT 'official', "system" character varying, "value" character varying, "assigner" character varying, "periodId" integer, "practitionerId" integer, CONSTRAINT "REL_7659a3f577d5d0fe5110350095" UNIQUE ("periodId"), CONSTRAINT "PK_f5ef4c1ecbfeca00cfc020b4123" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TYPE "public"."practitioner_name_use_enum" AS ENUM('usual', 'official', 'temp', 'nickname', 'anonymous', 'old', 'maiden')`
    )
    await queryRunner.query(
      `CREATE TABLE "practitioner_name" ("id" SERIAL NOT NULL, "use" "public"."practitioner_name_use_enum" NOT NULL DEFAULT 'official', "text" character varying, "family" character varying, "given" text array, "prefix" character varying, "suffix" character varying, "periodId" integer, "practitionerId" integer, CONSTRAINT "REL_c13ff9ee02e9193fb785a0ad27" UNIQUE ("periodId"), CONSTRAINT "PK_d048ceaf25539ccae1cdffb7414" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TYPE "public"."practitioner_address_use_enum" AS ENUM('home', 'work', 'temp', 'old', 'billing')`
    )
    await queryRunner.query(
      `CREATE TYPE "public"."practitioner_address_type_enum" AS ENUM('postal', 'physical', 'both')`
    )
    await queryRunner.query(
      `CREATE TABLE "practitioner_address" ("id" SERIAL NOT NULL, "use" "public"."practitioner_address_use_enum" NOT NULL DEFAULT 'home', "type" "public"."practitioner_address_type_enum" NOT NULL DEFAULT 'both', "text" character varying, "line" text array, "city" character varying, "district" character varying, "state" character varying, "postalCode" character varying, "country" character varying, "periodId" integer, "practitionerId" integer, CONSTRAINT "REL_257cfb7c227d59318dc4bbe3f4" UNIQUE ("periodId"), CONSTRAINT "PK_a043ae27df813846d1fdb1324e2" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "practitioner_communication" ("id" SERIAL NOT NULL, "languageId" integer, "practitionerId" integer, CONSTRAINT "REL_3960f6847ab419c2ca222b28b1" UNIQUE ("languageId"), CONSTRAINT "PK_d8d42dc1c8f9ba7b2d20ad21c4f" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TYPE "public"."practitioner_gender_enum" AS ENUM('male', 'female', 'other', 'unknown')`
    )
    await queryRunner.query(
      `CREATE TABLE "practitioner" ("id" SERIAL NOT NULL, "active" boolean, "birthDate" date NOT NULL DEFAULT '1900-01-01', "gender" "public"."practitioner_gender_enum" NOT NULL DEFAULT 'unknown', CONSTRAINT "PK_6e23eae1429fc2e897d9eebac42" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "participant" ("id" SERIAL NOT NULL, "periodId" integer, "encounterId" integer, "individualId" integer, CONSTRAINT "REL_d0751b18fd377176af243c63ef" UNIQUE ("periodId"), CONSTRAINT "PK_64da4237f502041781ca15d4c41" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "appointment_participant" ("id" SERIAL NOT NULL, "periodId" integer, "actorId" integer, "appointmentId" integer, CONSTRAINT "REL_d5a9a1c33a7b585c090903f8f8" UNIQUE ("periodId"), CONSTRAINT "REL_9701e040c8a0e9961c070981ed" UNIQUE ("actorId"), CONSTRAINT "PK_1a6836448671652d8ead06a7672" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "codeable_reference" ("id" SERIAL NOT NULL, CONSTRAINT "PK_6d3b042d6a124a2bb0be7a14c66" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "annotation" ("id" SERIAL NOT NULL, "authorString" character varying NOT NULL, "time" TIMESTAMP WITH TIME ZONE, "text" text NOT NULL, CONSTRAINT "PK_ec39ebae82efb7cfc77302eb7b3" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TYPE "public"."appointment_status_enum" AS ENUM('proposed', 'pending', 'booked', 'arrived', 'fulfilled', 'cancelled', 'noshow', 'entered-in-error', 'checked-in', 'waitlist')`
    )
    await queryRunner.query(
      `CREATE TABLE "appointment" ("id" SERIAL NOT NULL, "resourceType" character varying NOT NULL, "status" "public"."appointment_status_enum" NOT NULL DEFAULT 'proposed', "description" character varying NOT NULL, "start" TIMESTAMP WITH TIME ZONE, "end" TIMESTAMP WITH TIME ZONE, "minutesDuration" integer NOT NULL, "created" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_e8be1a53027415e709ce8a2db74" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TYPE "public"."appointment_identifier_use_enum" AS ENUM('usual', 'official', 'temp', 'secondary', 'old')`
    )
    await queryRunner.query(
      `CREATE TABLE "appointment_identifier" ("id" SERIAL NOT NULL, "use" "public"."appointment_identifier_use_enum" NOT NULL DEFAULT 'official', "system" character varying, "value" character varying, "assigner" character varying, "periodId" integer, "appointmentId" integer, CONSTRAINT "REL_5c3394b708ccbdfcf31a4a08cf" UNIQUE ("periodId"), CONSTRAINT "PK_f8284ef7931646cd5c45a220f29" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "instant" ("id" SERIAL NOT NULL, "original" character varying NOT NULL, "value" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_42d498336a383a563137550b239" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "date_time" ("id" SERIAL NOT NULL, "offsetFromUTC" integer NOT NULL, "valueAtUTC" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_4b413838a57392b390521cc9906" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "patient_identifier_type_codeable_concept" ("patientIdentifierId" integer NOT NULL, "codeableConceptId" integer NOT NULL, CONSTRAINT "PK_1274e1ef334f80aaf8789db4ec1" PRIMARY KEY ("patientIdentifierId", "codeableConceptId"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_cb541a60da69a3ea9343a62071" ON "patient_identifier_type_codeable_concept" ("patientIdentifierId") `
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_9823a0174c01698bcb272be872" ON "patient_identifier_type_codeable_concept" ("codeableConceptId") `
    )
    await queryRunner.query(
      `CREATE TABLE "reference_extension_extension" ("referenceId" integer NOT NULL, "extensionId" integer NOT NULL, CONSTRAINT "PK_1d2b4b1d3216647b239c5a43ed6" PRIMARY KEY ("referenceId", "extensionId"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_1b89ca6ab6646fc85aefefe867" ON "reference_extension_extension" ("referenceId") `
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_562073fef8cd5756189532fa3a" ON "reference_extension_extension" ("extensionId") `
    )
    await queryRunner.query(
      `CREATE TABLE "patient_extension_extension" ("patientId" integer NOT NULL, "extensionId" integer NOT NULL, CONSTRAINT "PK_8617b6a1fa66f76e4675b651a6e" PRIMARY KEY ("patientId", "extensionId"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_cd1ec3765312b45131307c3cf7" ON "patient_extension_extension" ("patientId") `
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_cc56e03309eb1ca6a59d22b53b" ON "patient_extension_extension" ("extensionId") `
    )
    await queryRunner.query(
      `CREATE TABLE "patient_modifier_extension_extension" ("patientId" integer NOT NULL, "extensionId" integer NOT NULL, CONSTRAINT "PK_baa4ee0fd3e5bdbe6cee40b2c54" PRIMARY KEY ("patientId", "extensionId"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_d3d648c0c6052883dc7204c9a1" ON "patient_modifier_extension_extension" ("patientId") `
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_3c363d50cca2fd7cfb6d0cde06" ON "patient_modifier_extension_extension" ("extensionId") `
    )
    await queryRunner.query(
      `CREATE TABLE "encounter_type_codeable_concept" ("encounterId" integer NOT NULL, "codeableConceptId" integer NOT NULL, CONSTRAINT "PK_17f226422ed891b7cfb97800804" PRIMARY KEY ("encounterId", "codeableConceptId"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_808a39ff6d88aa331f8d27b7e8" ON "encounter_type_codeable_concept" ("encounterId") `
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_ea0edcecf0057c2ae89c25627e" ON "encounter_type_codeable_concept" ("codeableConceptId") `
    )
    await queryRunner.query(
      `CREATE TABLE "encounter_participant_type_codeable_concept" ("encounterParticipantId" integer NOT NULL, "codeableConceptId" integer NOT NULL, CONSTRAINT "PK_5ebae2cfd7b603cc3cde20a501c" PRIMARY KEY ("encounterParticipantId", "codeableConceptId"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_4c6a85f018112e0be9f8229e86" ON "encounter_participant_type_codeable_concept" ("encounterParticipantId") `
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_4a544843a1391b36bba607fd29" ON "encounter_participant_type_codeable_concept" ("codeableConceptId") `
    )
    await queryRunner.query(
      `CREATE TABLE "encounter_identifier_type_codeable_concept" ("encounterIdentifierId" integer NOT NULL, "codeableConceptId" integer NOT NULL, CONSTRAINT "PK_f4e04c629ed8ec56f6b1015e294" PRIMARY KEY ("encounterIdentifierId", "codeableConceptId"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_9be880052a94ae9f73626606d0" ON "encounter_identifier_type_codeable_concept" ("encounterIdentifierId") `
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_a10b32e954f3636256f1b44921" ON "encounter_identifier_type_codeable_concept" ("codeableConceptId") `
    )
    await queryRunner.query(
      `CREATE TABLE "qualification_identifier_type_codeable_concept" ("qualificationIdentifierId" integer NOT NULL, "codeableConceptId" integer NOT NULL, CONSTRAINT "PK_de4fb2bc0b96732a9a32eb4e4cb" PRIMARY KEY ("qualificationIdentifierId", "codeableConceptId"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_d305bc2314f5fcfc42481b4810" ON "qualification_identifier_type_codeable_concept" ("qualificationIdentifierId") `
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_6b4c27e7555bc42873cc49ec3d" ON "qualification_identifier_type_codeable_concept" ("codeableConceptId") `
    )
    await queryRunner.query(
      `CREATE TABLE "practitioner_identifier_type_codeable_concept" ("practitionerIdentifierId" integer NOT NULL, "codeableConceptId" integer NOT NULL, CONSTRAINT "PK_d1c00f441686c9e47e025ea7a63" PRIMARY KEY ("practitionerIdentifierId", "codeableConceptId"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_af90e6a89010d6a8728bfc71ff" ON "practitioner_identifier_type_codeable_concept" ("practitionerIdentifierId") `
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_266e789386862f3c47226518fb" ON "practitioner_identifier_type_codeable_concept" ("codeableConceptId") `
    )
    await queryRunner.query(
      `CREATE TABLE "participant_type_codeable_concept" ("participantId" integer NOT NULL, "codeableConceptId" integer NOT NULL, CONSTRAINT "PK_e1545471361b864f26e786ae6eb" PRIMARY KEY ("participantId", "codeableConceptId"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_d782177d6470ba572140f8cf20" ON "participant_type_codeable_concept" ("participantId") `
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_97e4162b2d2653bdbaaf59f8ff" ON "participant_type_codeable_concept" ("codeableConceptId") `
    )
    await queryRunner.query(
      `CREATE TABLE "appointment_participant_type_codeable_concept" ("appointmentParticipantId" integer NOT NULL, "codeableConceptId" integer NOT NULL, CONSTRAINT "PK_f683a9567e687ea831a7b5f644e" PRIMARY KEY ("appointmentParticipantId", "codeableConceptId"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_1206594d6d2c50130ce7384f2d" ON "appointment_participant_type_codeable_concept" ("appointmentParticipantId") `
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_7479df8863dbc843ecccc2b6ac" ON "appointment_participant_type_codeable_concept" ("codeableConceptId") `
    )
    await queryRunner.query(
      `CREATE TABLE "codeable_reference_extension_extension" ("codeableReferenceId" integer NOT NULL, "extensionId" integer NOT NULL, CONSTRAINT "PK_e9753e3a64c2e18fcc3c735bafc" PRIMARY KEY ("codeableReferenceId", "extensionId"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_6c7f115caaa71f04c94bfd0ace" ON "codeable_reference_extension_extension" ("codeableReferenceId") `
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_e06cdd21adb9e04dce9a93a217" ON "codeable_reference_extension_extension" ("extensionId") `
    )
    await queryRunner.query(
      `CREATE TABLE "annotation_extension_extension" ("annotationId" integer NOT NULL, "extensionId" integer NOT NULL, CONSTRAINT "PK_792f6993b46b04632299240ded7" PRIMARY KEY ("annotationId", "extensionId"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_b050988457f270348010949c42" ON "annotation_extension_extension" ("annotationId") `
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_125f5a3d3e922997ea476505fa" ON "annotation_extension_extension" ("extensionId") `
    )
    await queryRunner.query(
      `CREATE TABLE "appointment_extension_extension" ("appointmentId" integer NOT NULL, "extensionId" integer NOT NULL, CONSTRAINT "PK_cd19751805e4b07eb6f8ea69775" PRIMARY KEY ("appointmentId", "extensionId"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_edd6fca65501e272b8de69658e" ON "appointment_extension_extension" ("appointmentId") `
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_76dacddf1354dc93de1479b66b" ON "appointment_extension_extension" ("extensionId") `
    )
    await queryRunner.query(
      `CREATE TABLE "appointment_modifier_extension_extension" ("appointmentId" integer NOT NULL, "extensionId" integer NOT NULL, CONSTRAINT "PK_1dbee9b4b264f73600f0907dd0c" PRIMARY KEY ("appointmentId", "extensionId"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_f7fba9535102e93d138d40d5ce" ON "appointment_modifier_extension_extension" ("appointmentId") `
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_6675d017d9395593fa2f40fc41" ON "appointment_modifier_extension_extension" ("extensionId") `
    )
    await queryRunner.query(
      `CREATE TABLE "appointment_service_category_codeable_concept" ("appointmentId" integer NOT NULL, "codeableConceptId" integer NOT NULL, CONSTRAINT "PK_b340dd26b29f565d4f96c683c68" PRIMARY KEY ("appointmentId", "codeableConceptId"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_eefb43aaf7b673428fc10d03a7" ON "appointment_service_category_codeable_concept" ("appointmentId") `
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_c4e5ddf916c79bca4b647f8cd4" ON "appointment_service_category_codeable_concept" ("codeableConceptId") `
    )
    await queryRunner.query(
      `CREATE TABLE "appointment_service_type_codeable_concept" ("appointmentId" integer NOT NULL, "codeableConceptId" integer NOT NULL, CONSTRAINT "PK_39ef95bb4e81e9cdefe70149dde" PRIMARY KEY ("appointmentId", "codeableConceptId"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_27a3f9f5388fa7ac33a42fd7cb" ON "appointment_service_type_codeable_concept" ("appointmentId") `
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_04029c9716bf4ac8063dec79a2" ON "appointment_service_type_codeable_concept" ("codeableConceptId") `
    )
    await queryRunner.query(
      `CREATE TABLE "appointment_specialty_codeable_concept" ("appointmentId" integer NOT NULL, "codeableConceptId" integer NOT NULL, CONSTRAINT "PK_728efb8f849cb12842e0d523862" PRIMARY KEY ("appointmentId", "codeableConceptId"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_a8cb6b77f186525e73484858ba" ON "appointment_specialty_codeable_concept" ("appointmentId") `
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_38fb39cad33c4dec21a0fcffb5" ON "appointment_specialty_codeable_concept" ("codeableConceptId") `
    )
    await queryRunner.query(
      `CREATE TABLE "appointment_reason_codeable_reference" ("appointmentId" integer NOT NULL, "codeableReferenceId" integer NOT NULL, CONSTRAINT "PK_fa8d3526193de7a4d8e8a1ac352" PRIMARY KEY ("appointmentId", "codeableReferenceId"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_0b841614ac2c05623ac20fcb77" ON "appointment_reason_codeable_reference" ("appointmentId") `
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_ae0a642a2965610d66334563a4" ON "appointment_reason_codeable_reference" ("codeableReferenceId") `
    )
    await queryRunner.query(
      `CREATE TABLE "appointment_replaces_reference" ("appointmentId" integer NOT NULL, "referenceId" integer NOT NULL, CONSTRAINT "PK_bcd8fd2626f8432bcb8c5388e1e" PRIMARY KEY ("appointmentId", "referenceId"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_f71e023ee3ad66f5164a231e8d" ON "appointment_replaces_reference" ("appointmentId") `
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_3790d87cf3c56db8db1ce2cbb5" ON "appointment_replaces_reference" ("referenceId") `
    )
    await queryRunner.query(
      `CREATE TABLE "appointment_supporting_information_reference" ("appointmentId" integer NOT NULL, "referenceId" integer NOT NULL, CONSTRAINT "PK_96ded5036d4121a57c75bdebec1" PRIMARY KEY ("appointmentId", "referenceId"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_ab4a299cd33aab846497e15fe7" ON "appointment_supporting_information_reference" ("appointmentId") `
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_d739ab7beed4705132ac03d9a2" ON "appointment_supporting_information_reference" ("referenceId") `
    )
    await queryRunner.query(
      `CREATE TABLE "appointment_slot_reference" ("appointmentId" integer NOT NULL, "referenceId" integer NOT NULL, CONSTRAINT "PK_ef5537a6100df195b5f4de82aa4" PRIMARY KEY ("appointmentId", "referenceId"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_1f5a5e7a87f57c8cc7bb39b445" ON "appointment_slot_reference" ("appointmentId") `
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_cf5d6a843d2f6d426b41e91570" ON "appointment_slot_reference" ("referenceId") `
    )
    await queryRunner.query(
      `CREATE TABLE "appointment_account_reference" ("appointmentId" integer NOT NULL, "referenceId" integer NOT NULL, CONSTRAINT "PK_5effc0197c335e53fb224e77163" PRIMARY KEY ("appointmentId", "referenceId"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_ed4840d5b6d2e0d6fdb53f15aa" ON "appointment_account_reference" ("appointmentId") `
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_308ea064a793ac40d5d98f42e2" ON "appointment_account_reference" ("referenceId") `
    )
    await queryRunner.query(
      `CREATE TABLE "appointment_note_annotation" ("appointmentId" integer NOT NULL, "annotationId" integer NOT NULL, CONSTRAINT "PK_e3ba2e30de462cbaa13275e61f8" PRIMARY KEY ("appointmentId", "annotationId"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_bf9822166833bfc1cb661764c3" ON "appointment_note_annotation" ("appointmentId") `
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_9ab0a1e965182653f6a2b35f81" ON "appointment_note_annotation" ("annotationId") `
    )
    await queryRunner.query(
      `CREATE TABLE "appointment_patient_instruction_codeable_reference" ("appointmentId" integer NOT NULL, "codeableReferenceId" integer NOT NULL, CONSTRAINT "PK_bbd69644fa24a2e4c2929c43695" PRIMARY KEY ("appointmentId", "codeableReferenceId"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_da181bc28c66f2b51ffa4c6275" ON "appointment_patient_instruction_codeable_reference" ("appointmentId") `
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_93d6709d1d579bce4bbf7490c8" ON "appointment_patient_instruction_codeable_reference" ("codeableReferenceId") `
    )
    await queryRunner.query(
      `CREATE TABLE "appointment_based_on_reference" ("appointmentId" integer NOT NULL, "referenceId" integer NOT NULL, CONSTRAINT "PK_d49426adc0dba8f3fdec18087c6" PRIMARY KEY ("appointmentId", "referenceId"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_a88b8a829afa7a855f41f119e9" ON "appointment_based_on_reference" ("appointmentId") `
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_3f5fb852da33d344ca856443fb" ON "appointment_based_on_reference" ("referenceId") `
    )
    await queryRunner.query(
      `CREATE TABLE "appointment_requested_period_period" ("appointmentId" integer NOT NULL, "periodId" integer NOT NULL, CONSTRAINT "PK_1bbfdeae5f9a047ba8494f288f0" PRIMARY KEY ("appointmentId", "periodId"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_df8256d211ead023e6c461d668" ON "appointment_requested_period_period" ("appointmentId") `
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_cafecbd71d574b248dc495c780" ON "appointment_requested_period_period" ("periodId") `
    )
    await queryRunner.query(
      `ALTER TABLE "diagnosis" DROP CONSTRAINT "REL_5c5d83c09fef194ef807fc1273"`
    )
    await queryRunner.query(`ALTER TABLE "diagnosis" DROP COLUMN "conditionId"`)
    await queryRunner.query(`ALTER TABLE "encounter" DROP COLUMN "patientId"`)
    await queryRunner.query(`ALTER TABLE "instant" DROP COLUMN "original"`)
    await queryRunner.query(`ALTER TABLE "instant" DROP COLUMN "value"`)
    await queryRunner.query(`ALTER TABLE "diagnosis" ADD "conditionId" integer`)
    await queryRunner.query(
      `ALTER TABLE "diagnosis" ADD CONSTRAINT "UQ_5c5d83c09fef194ef807fc1273a" UNIQUE ("conditionId")`
    )
    await queryRunner.query(`ALTER TABLE "encounter" ADD "patientId" integer`)
    await queryRunner.query(`ALTER TABLE "encounter" ADD "subjectId" integer`)
    await queryRunner.query(
      `ALTER TABLE "instant" ADD "original" character varying NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "instant" ADD "value" TIMESTAMP WITH TIME ZONE`
    )
    await queryRunner.query(
      `ALTER TABLE "instant" ADD "offsetFromUTC" integer NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "instant" ADD "valueAtUTC" TIMESTAMP WITH TIME ZONE`
    )
    await queryRunner.query(
      `ALTER TABLE "practitioner" ALTER COLUMN "active" SET NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "practitioner" ALTER COLUMN "active" SET NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "practitioner" ALTER COLUMN "active" SET NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "practitioner" ALTER COLUMN "active" SET NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "practitioner" ALTER COLUMN "active" SET NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment" ALTER COLUMN "description" DROP NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment" ALTER COLUMN "description" DROP NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "patient_name" ADD CONSTRAINT "FK_e41fa8054112c32c1903607936b" FOREIGN KEY ("periodId") REFERENCES "period"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "patient_name" ADD CONSTRAINT "FK_8d1b60aefc150fdd6c89d05eb4e" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "patient_contact_point" ADD CONSTRAINT "FK_1840c1192e582e581c46fa22138" FOREIGN KEY ("periodId") REFERENCES "period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "patient_contact_point" ADD CONSTRAINT "FK_d27a1a70421e51e5b93f292c118" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "patient_address" ADD CONSTRAINT "FK_8f6464f305e2d7798b776254295" FOREIGN KEY ("periodId") REFERENCES "period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "patient_address" ADD CONSTRAINT "FK_971744b316662409103fa145f87" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "coding" ADD CONSTRAINT "FK_b7ee6ae754a99aa6aefc8f4fedb" FOREIGN KEY ("parentId") REFERENCES "codeable_concept"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "patient_identifier" ADD CONSTRAINT "FK_71665041bb7f618facc469d59f7" FOREIGN KEY ("periodId") REFERENCES "period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "patient_identifier" ADD CONSTRAINT "FK_933bf102d92916ab3f97c9878d2" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "patient_communication" ADD CONSTRAINT "FK_20535217f45058a69249a579fd4" FOREIGN KEY ("languageId") REFERENCES "codeable_concept"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "patient_communication" ADD CONSTRAINT "FK_7027a305efdef9c31ed79c3c912" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "condition" ADD CONSTRAINT "FK_417623a8a2982b2e5be1e524765" FOREIGN KEY ("codeId") REFERENCES "codeable_concept"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "diagnosis" ADD CONSTRAINT "FK_75ec87b65fd165c5d9a79bb0dd2" FOREIGN KEY ("encounterId") REFERENCES "encounter"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "diagnosis" ADD CONSTRAINT "FK_5c5d83c09fef194ef807fc1273a" FOREIGN KEY ("conditionId") REFERENCES "condition"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "diagnosis" ADD CONSTRAINT "FK_b017ebe630304dd0f4c79a9c9a3" FOREIGN KEY ("useId") REFERENCES "codeable_concept"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "identifier" ADD CONSTRAINT "FK_ab503f5b3408ee06c1503a1ccb5" FOREIGN KEY ("periodId") REFERENCES "period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "encounter_identifier" ADD CONSTRAINT "FK_e0385c10c2ce2c9b707a65a172e" FOREIGN KEY ("periodId") REFERENCES "period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "encounter_identifier" ADD CONSTRAINT "FK_315fc460d7626305e25c8db3525" FOREIGN KEY ("encounterId") REFERENCES "encounter"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "encounter" ADD CONSTRAINT "FK_a9c05100cb3647a5660d1c4c20d" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "encounter" ADD CONSTRAINT "FK_8614220e803ca21c146a871f8bf" FOREIGN KEY ("periodId") REFERENCES "period"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "encounter_participant" ADD CONSTRAINT "FK_2974d8c90c6c70ced421024c0b0" FOREIGN KEY ("periodId") REFERENCES "period"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "encounter_participant" ADD CONSTRAINT "FK_1d6c8b982cfc8ae73bd66ec7ce1" FOREIGN KEY ("actorId") REFERENCES "reference"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "encounter_participant" ADD CONSTRAINT "FK_c296cb6387d05e3df146da2e268" FOREIGN KEY ("encounterId") REFERENCES "encounter"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "qualification_identifier" ADD CONSTRAINT "FK_45eee420e9bd8d4e03313b84bdf" FOREIGN KEY ("periodId") REFERENCES "period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "qualification_identifier" ADD CONSTRAINT "FK_3bafe72393c9074c6d0ed8d90db" FOREIGN KEY ("qualificationId") REFERENCES "qualification"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "qualification" ADD CONSTRAINT "FK_d7087b5f9ed7c607ecad65fdf4a" FOREIGN KEY ("practitionerId") REFERENCES "practitioner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "qualification" ADD CONSTRAINT "FK_ef3973178c301f7710399038c0b" FOREIGN KEY ("codeId") REFERENCES "codeable_concept"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "qualification" ADD CONSTRAINT "FK_a5c8241598c7fba2ad9f5d9d105" FOREIGN KEY ("periodId") REFERENCES "period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "practitioner_contact_point" ADD CONSTRAINT "FK_ca3159351319f43faa378dcd4cd" FOREIGN KEY ("periodId") REFERENCES "period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "practitioner_contact_point" ADD CONSTRAINT "FK_9bb43092449b13d9bb160e8ae7b" FOREIGN KEY ("practitionerId") REFERENCES "practitioner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "practitioner_identifier" ADD CONSTRAINT "FK_7659a3f577d5d0fe51103500955" FOREIGN KEY ("periodId") REFERENCES "period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "practitioner_identifier" ADD CONSTRAINT "FK_e9f33fa15d17d51ac1face5acdb" FOREIGN KEY ("practitionerId") REFERENCES "practitioner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "practitioner_name" ADD CONSTRAINT "FK_c13ff9ee02e9193fb785a0ad272" FOREIGN KEY ("periodId") REFERENCES "period"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "practitioner_name" ADD CONSTRAINT "FK_574f196537f7640fbbf49475b1a" FOREIGN KEY ("practitionerId") REFERENCES "practitioner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "practitioner_address" ADD CONSTRAINT "FK_257cfb7c227d59318dc4bbe3f40" FOREIGN KEY ("periodId") REFERENCES "period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "practitioner_address" ADD CONSTRAINT "FK_ca273b8ec2c24583a7e37e3e5bd" FOREIGN KEY ("practitionerId") REFERENCES "practitioner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "practitioner_communication" ADD CONSTRAINT "FK_3960f6847ab419c2ca222b28b1f" FOREIGN KEY ("languageId") REFERENCES "codeable_concept"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "practitioner_communication" ADD CONSTRAINT "FK_b9725f99e6185a42642ba0c3b00" FOREIGN KEY ("practitionerId") REFERENCES "practitioner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "participant" ADD CONSTRAINT "FK_d0751b18fd377176af243c63ef0" FOREIGN KEY ("periodId") REFERENCES "period"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "participant" ADD CONSTRAINT "FK_75d08ef0e0ecc7aa2092ec0da39" FOREIGN KEY ("encounterId") REFERENCES "encounter"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "participant" ADD CONSTRAINT "FK_4c25eb5f7c273acb61c17bd2e9d" FOREIGN KEY ("individualId") REFERENCES "practitioner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "encounter" ADD CONSTRAINT "FK_816d3059ea387d08879713c7316" FOREIGN KEY ("subjectId") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_participant" ADD CONSTRAINT "FK_d5a9a1c33a7b585c090903f8f8f" FOREIGN KEY ("periodId") REFERENCES "period"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_participant" ADD CONSTRAINT "FK_9701e040c8a0e9961c070981edc" FOREIGN KEY ("actorId") REFERENCES "reference"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_participant" ADD CONSTRAINT "FK_983cf8637424fdb44dbfd371d7d" FOREIGN KEY ("appointmentId") REFERENCES "appointment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_identifier" ADD CONSTRAINT "FK_5c3394b708ccbdfcf31a4a08cf4" FOREIGN KEY ("periodId") REFERENCES "period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_identifier" ADD CONSTRAINT "FK_341aa4dc4991589ad983c05b417" FOREIGN KEY ("appointmentId") REFERENCES "appointment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "patient_identifier_type_codeable_concept" ADD CONSTRAINT "FK_cb541a60da69a3ea9343a62071c" FOREIGN KEY ("patientIdentifierId") REFERENCES "patient_identifier"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "patient_identifier_type_codeable_concept" ADD CONSTRAINT "FK_9823a0174c01698bcb272be8722" FOREIGN KEY ("codeableConceptId") REFERENCES "codeable_concept"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "reference_extension_extension" ADD CONSTRAINT "FK_1b89ca6ab6646fc85aefefe867b" FOREIGN KEY ("referenceId") REFERENCES "reference"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "reference_extension_extension" ADD CONSTRAINT "FK_562073fef8cd5756189532fa3af" FOREIGN KEY ("extensionId") REFERENCES "extension"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "patient_extension_extension" ADD CONSTRAINT "FK_cd1ec3765312b45131307c3cf73" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "patient_extension_extension" ADD CONSTRAINT "FK_cc56e03309eb1ca6a59d22b53b3" FOREIGN KEY ("extensionId") REFERENCES "extension"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "patient_modifier_extension_extension" ADD CONSTRAINT "FK_d3d648c0c6052883dc7204c9a17" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "patient_modifier_extension_extension" ADD CONSTRAINT "FK_3c363d50cca2fd7cfb6d0cde062" FOREIGN KEY ("extensionId") REFERENCES "extension"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "encounter_type_codeable_concept" ADD CONSTRAINT "FK_808a39ff6d88aa331f8d27b7e8e" FOREIGN KEY ("encounterId") REFERENCES "encounter"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "encounter_type_codeable_concept" ADD CONSTRAINT "FK_ea0edcecf0057c2ae89c25627e0" FOREIGN KEY ("codeableConceptId") REFERENCES "codeable_concept"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "encounter_participant_type_codeable_concept" ADD CONSTRAINT "FK_4c6a85f018112e0be9f8229e869" FOREIGN KEY ("encounterParticipantId") REFERENCES "encounter_participant"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "encounter_participant_type_codeable_concept" ADD CONSTRAINT "FK_4a544843a1391b36bba607fd29d" FOREIGN KEY ("codeableConceptId") REFERENCES "codeable_concept"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "encounter_identifier_type_codeable_concept" ADD CONSTRAINT "FK_9be880052a94ae9f73626606d04" FOREIGN KEY ("encounterIdentifierId") REFERENCES "encounter_identifier"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "encounter_identifier_type_codeable_concept" ADD CONSTRAINT "FK_a10b32e954f3636256f1b44921f" FOREIGN KEY ("codeableConceptId") REFERENCES "codeable_concept"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "qualification_identifier_type_codeable_concept" ADD CONSTRAINT "FK_d305bc2314f5fcfc42481b48101" FOREIGN KEY ("qualificationIdentifierId") REFERENCES "qualification_identifier"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "qualification_identifier_type_codeable_concept" ADD CONSTRAINT "FK_6b4c27e7555bc42873cc49ec3df" FOREIGN KEY ("codeableConceptId") REFERENCES "codeable_concept"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "practitioner_identifier_type_codeable_concept" ADD CONSTRAINT "FK_af90e6a89010d6a8728bfc71ff8" FOREIGN KEY ("practitionerIdentifierId") REFERENCES "practitioner_identifier"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "practitioner_identifier_type_codeable_concept" ADD CONSTRAINT "FK_266e789386862f3c47226518fb6" FOREIGN KEY ("codeableConceptId") REFERENCES "codeable_concept"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "participant_type_codeable_concept" ADD CONSTRAINT "FK_d782177d6470ba572140f8cf20e" FOREIGN KEY ("participantId") REFERENCES "participant"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "participant_type_codeable_concept" ADD CONSTRAINT "FK_97e4162b2d2653bdbaaf59f8ffa" FOREIGN KEY ("codeableConceptId") REFERENCES "codeable_concept"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_participant_type_codeable_concept" ADD CONSTRAINT "FK_1206594d6d2c50130ce7384f2d3" FOREIGN KEY ("appointmentParticipantId") REFERENCES "appointment_participant"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_participant_type_codeable_concept" ADD CONSTRAINT "FK_7479df8863dbc843ecccc2b6ac3" FOREIGN KEY ("codeableConceptId") REFERENCES "codeable_concept"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "codeable_reference_extension_extension" ADD CONSTRAINT "FK_6c7f115caaa71f04c94bfd0ace7" FOREIGN KEY ("codeableReferenceId") REFERENCES "codeable_reference"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "codeable_reference_extension_extension" ADD CONSTRAINT "FK_e06cdd21adb9e04dce9a93a2176" FOREIGN KEY ("extensionId") REFERENCES "extension"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "annotation_extension_extension" ADD CONSTRAINT "FK_b050988457f270348010949c420" FOREIGN KEY ("annotationId") REFERENCES "annotation"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "annotation_extension_extension" ADD CONSTRAINT "FK_125f5a3d3e922997ea476505faf" FOREIGN KEY ("extensionId") REFERENCES "extension"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_extension_extension" ADD CONSTRAINT "FK_edd6fca65501e272b8de69658ea" FOREIGN KEY ("appointmentId") REFERENCES "appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_extension_extension" ADD CONSTRAINT "FK_76dacddf1354dc93de1479b66b7" FOREIGN KEY ("extensionId") REFERENCES "extension"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_modifier_extension_extension" ADD CONSTRAINT "FK_f7fba9535102e93d138d40d5cea" FOREIGN KEY ("appointmentId") REFERENCES "appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_modifier_extension_extension" ADD CONSTRAINT "FK_6675d017d9395593fa2f40fc41a" FOREIGN KEY ("extensionId") REFERENCES "extension"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_service_category_codeable_concept" ADD CONSTRAINT "FK_eefb43aaf7b673428fc10d03a71" FOREIGN KEY ("appointmentId") REFERENCES "appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_service_category_codeable_concept" ADD CONSTRAINT "FK_c4e5ddf916c79bca4b647f8cd45" FOREIGN KEY ("codeableConceptId") REFERENCES "codeable_concept"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_service_type_codeable_concept" ADD CONSTRAINT "FK_27a3f9f5388fa7ac33a42fd7cbe" FOREIGN KEY ("appointmentId") REFERENCES "appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_service_type_codeable_concept" ADD CONSTRAINT "FK_04029c9716bf4ac8063dec79a22" FOREIGN KEY ("codeableConceptId") REFERENCES "codeable_concept"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_specialty_codeable_concept" ADD CONSTRAINT "FK_a8cb6b77f186525e73484858bab" FOREIGN KEY ("appointmentId") REFERENCES "appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_specialty_codeable_concept" ADD CONSTRAINT "FK_38fb39cad33c4dec21a0fcffb54" FOREIGN KEY ("codeableConceptId") REFERENCES "codeable_concept"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_reason_codeable_reference" ADD CONSTRAINT "FK_0b841614ac2c05623ac20fcb776" FOREIGN KEY ("appointmentId") REFERENCES "appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_reason_codeable_reference" ADD CONSTRAINT "FK_ae0a642a2965610d66334563a45" FOREIGN KEY ("codeableReferenceId") REFERENCES "codeable_reference"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_replaces_reference" ADD CONSTRAINT "FK_f71e023ee3ad66f5164a231e8d8" FOREIGN KEY ("appointmentId") REFERENCES "appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_replaces_reference" ADD CONSTRAINT "FK_3790d87cf3c56db8db1ce2cbb5f" FOREIGN KEY ("referenceId") REFERENCES "reference"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_supporting_information_reference" ADD CONSTRAINT "FK_ab4a299cd33aab846497e15fe73" FOREIGN KEY ("appointmentId") REFERENCES "appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_supporting_information_reference" ADD CONSTRAINT "FK_d739ab7beed4705132ac03d9a2e" FOREIGN KEY ("referenceId") REFERENCES "reference"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_slot_reference" ADD CONSTRAINT "FK_1f5a5e7a87f57c8cc7bb39b445c" FOREIGN KEY ("appointmentId") REFERENCES "appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_slot_reference" ADD CONSTRAINT "FK_cf5d6a843d2f6d426b41e91570f" FOREIGN KEY ("referenceId") REFERENCES "reference"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_account_reference" ADD CONSTRAINT "FK_ed4840d5b6d2e0d6fdb53f15aaf" FOREIGN KEY ("appointmentId") REFERENCES "appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_account_reference" ADD CONSTRAINT "FK_308ea064a793ac40d5d98f42e26" FOREIGN KEY ("referenceId") REFERENCES "reference"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_note_annotation" ADD CONSTRAINT "FK_bf9822166833bfc1cb661764c34" FOREIGN KEY ("appointmentId") REFERENCES "appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_note_annotation" ADD CONSTRAINT "FK_9ab0a1e965182653f6a2b35f815" FOREIGN KEY ("annotationId") REFERENCES "annotation"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_patient_instruction_codeable_reference" ADD CONSTRAINT "FK_da181bc28c66f2b51ffa4c62758" FOREIGN KEY ("appointmentId") REFERENCES "appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_patient_instruction_codeable_reference" ADD CONSTRAINT "FK_93d6709d1d579bce4bbf7490c86" FOREIGN KEY ("codeableReferenceId") REFERENCES "codeable_reference"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_based_on_reference" ADD CONSTRAINT "FK_a88b8a829afa7a855f41f119e92" FOREIGN KEY ("appointmentId") REFERENCES "appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_based_on_reference" ADD CONSTRAINT "FK_3f5fb852da33d344ca856443fba" FOREIGN KEY ("referenceId") REFERENCES "reference"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_requested_period_period" ADD CONSTRAINT "FK_df8256d211ead023e6c461d6686" FOREIGN KEY ("appointmentId") REFERENCES "appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_requested_period_period" ADD CONSTRAINT "FK_cafecbd71d574b248dc495c7808" FOREIGN KEY ("periodId") REFERENCES "period"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointment_requested_period_period" DROP CONSTRAINT "FK_cafecbd71d574b248dc495c7808"`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_requested_period_period" DROP CONSTRAINT "FK_df8256d211ead023e6c461d6686"`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_based_on_reference" DROP CONSTRAINT "FK_3f5fb852da33d344ca856443fba"`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_based_on_reference" DROP CONSTRAINT "FK_a88b8a829afa7a855f41f119e92"`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_patient_instruction_codeable_reference" DROP CONSTRAINT "FK_93d6709d1d579bce4bbf7490c86"`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_patient_instruction_codeable_reference" DROP CONSTRAINT "FK_da181bc28c66f2b51ffa4c62758"`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_note_annotation" DROP CONSTRAINT "FK_9ab0a1e965182653f6a2b35f815"`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_note_annotation" DROP CONSTRAINT "FK_bf9822166833bfc1cb661764c34"`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_account_reference" DROP CONSTRAINT "FK_308ea064a793ac40d5d98f42e26"`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_account_reference" DROP CONSTRAINT "FK_ed4840d5b6d2e0d6fdb53f15aaf"`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_slot_reference" DROP CONSTRAINT "FK_cf5d6a843d2f6d426b41e91570f"`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_slot_reference" DROP CONSTRAINT "FK_1f5a5e7a87f57c8cc7bb39b445c"`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_supporting_information_reference" DROP CONSTRAINT "FK_d739ab7beed4705132ac03d9a2e"`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_supporting_information_reference" DROP CONSTRAINT "FK_ab4a299cd33aab846497e15fe73"`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_replaces_reference" DROP CONSTRAINT "FK_3790d87cf3c56db8db1ce2cbb5f"`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_replaces_reference" DROP CONSTRAINT "FK_f71e023ee3ad66f5164a231e8d8"`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_reason_codeable_reference" DROP CONSTRAINT "FK_ae0a642a2965610d66334563a45"`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_reason_codeable_reference" DROP CONSTRAINT "FK_0b841614ac2c05623ac20fcb776"`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_specialty_codeable_concept" DROP CONSTRAINT "FK_38fb39cad33c4dec21a0fcffb54"`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_specialty_codeable_concept" DROP CONSTRAINT "FK_a8cb6b77f186525e73484858bab"`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_service_type_codeable_concept" DROP CONSTRAINT "FK_04029c9716bf4ac8063dec79a22"`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_service_type_codeable_concept" DROP CONSTRAINT "FK_27a3f9f5388fa7ac33a42fd7cbe"`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_service_category_codeable_concept" DROP CONSTRAINT "FK_c4e5ddf916c79bca4b647f8cd45"`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_service_category_codeable_concept" DROP CONSTRAINT "FK_eefb43aaf7b673428fc10d03a71"`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_modifier_extension_extension" DROP CONSTRAINT "FK_6675d017d9395593fa2f40fc41a"`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_modifier_extension_extension" DROP CONSTRAINT "FK_f7fba9535102e93d138d40d5cea"`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_extension_extension" DROP CONSTRAINT "FK_76dacddf1354dc93de1479b66b7"`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_extension_extension" DROP CONSTRAINT "FK_edd6fca65501e272b8de69658ea"`
    )
    await queryRunner.query(
      `ALTER TABLE "annotation_extension_extension" DROP CONSTRAINT "FK_125f5a3d3e922997ea476505faf"`
    )
    await queryRunner.query(
      `ALTER TABLE "annotation_extension_extension" DROP CONSTRAINT "FK_b050988457f270348010949c420"`
    )
    await queryRunner.query(
      `ALTER TABLE "codeable_reference_extension_extension" DROP CONSTRAINT "FK_e06cdd21adb9e04dce9a93a2176"`
    )
    await queryRunner.query(
      `ALTER TABLE "codeable_reference_extension_extension" DROP CONSTRAINT "FK_6c7f115caaa71f04c94bfd0ace7"`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_participant_type_codeable_concept" DROP CONSTRAINT "FK_7479df8863dbc843ecccc2b6ac3"`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_participant_type_codeable_concept" DROP CONSTRAINT "FK_1206594d6d2c50130ce7384f2d3"`
    )
    await queryRunner.query(
      `ALTER TABLE "participant_type_codeable_concept" DROP CONSTRAINT "FK_97e4162b2d2653bdbaaf59f8ffa"`
    )
    await queryRunner.query(
      `ALTER TABLE "participant_type_codeable_concept" DROP CONSTRAINT "FK_d782177d6470ba572140f8cf20e"`
    )
    await queryRunner.query(
      `ALTER TABLE "practitioner_identifier_type_codeable_concept" DROP CONSTRAINT "FK_266e789386862f3c47226518fb6"`
    )
    await queryRunner.query(
      `ALTER TABLE "practitioner_identifier_type_codeable_concept" DROP CONSTRAINT "FK_af90e6a89010d6a8728bfc71ff8"`
    )
    await queryRunner.query(
      `ALTER TABLE "qualification_identifier_type_codeable_concept" DROP CONSTRAINT "FK_6b4c27e7555bc42873cc49ec3df"`
    )
    await queryRunner.query(
      `ALTER TABLE "qualification_identifier_type_codeable_concept" DROP CONSTRAINT "FK_d305bc2314f5fcfc42481b48101"`
    )
    await queryRunner.query(
      `ALTER TABLE "encounter_identifier_type_codeable_concept" DROP CONSTRAINT "FK_a10b32e954f3636256f1b44921f"`
    )
    await queryRunner.query(
      `ALTER TABLE "encounter_identifier_type_codeable_concept" DROP CONSTRAINT "FK_9be880052a94ae9f73626606d04"`
    )
    await queryRunner.query(
      `ALTER TABLE "encounter_participant_type_codeable_concept" DROP CONSTRAINT "FK_4a544843a1391b36bba607fd29d"`
    )
    await queryRunner.query(
      `ALTER TABLE "encounter_participant_type_codeable_concept" DROP CONSTRAINT "FK_4c6a85f018112e0be9f8229e869"`
    )
    await queryRunner.query(
      `ALTER TABLE "encounter_type_codeable_concept" DROP CONSTRAINT "FK_ea0edcecf0057c2ae89c25627e0"`
    )
    await queryRunner.query(
      `ALTER TABLE "encounter_type_codeable_concept" DROP CONSTRAINT "FK_808a39ff6d88aa331f8d27b7e8e"`
    )
    await queryRunner.query(
      `ALTER TABLE "patient_modifier_extension_extension" DROP CONSTRAINT "FK_3c363d50cca2fd7cfb6d0cde062"`
    )
    await queryRunner.query(
      `ALTER TABLE "patient_modifier_extension_extension" DROP CONSTRAINT "FK_d3d648c0c6052883dc7204c9a17"`
    )
    await queryRunner.query(
      `ALTER TABLE "patient_extension_extension" DROP CONSTRAINT "FK_cc56e03309eb1ca6a59d22b53b3"`
    )
    await queryRunner.query(
      `ALTER TABLE "patient_extension_extension" DROP CONSTRAINT "FK_cd1ec3765312b45131307c3cf73"`
    )
    await queryRunner.query(
      `ALTER TABLE "reference_extension_extension" DROP CONSTRAINT "FK_562073fef8cd5756189532fa3af"`
    )
    await queryRunner.query(
      `ALTER TABLE "reference_extension_extension" DROP CONSTRAINT "FK_1b89ca6ab6646fc85aefefe867b"`
    )
    await queryRunner.query(
      `ALTER TABLE "patient_identifier_type_codeable_concept" DROP CONSTRAINT "FK_9823a0174c01698bcb272be8722"`
    )
    await queryRunner.query(
      `ALTER TABLE "patient_identifier_type_codeable_concept" DROP CONSTRAINT "FK_cb541a60da69a3ea9343a62071c"`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_identifier" DROP CONSTRAINT "FK_341aa4dc4991589ad983c05b417"`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_identifier" DROP CONSTRAINT "FK_5c3394b708ccbdfcf31a4a08cf4"`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_participant" DROP CONSTRAINT "FK_983cf8637424fdb44dbfd371d7d"`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_participant" DROP CONSTRAINT "FK_9701e040c8a0e9961c070981edc"`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment_participant" DROP CONSTRAINT "FK_d5a9a1c33a7b585c090903f8f8f"`
    )
    await queryRunner.query(
      `ALTER TABLE "encounter" DROP CONSTRAINT "FK_816d3059ea387d08879713c7316"`
    )
    await queryRunner.query(
      `ALTER TABLE "participant" DROP CONSTRAINT "FK_4c25eb5f7c273acb61c17bd2e9d"`
    )
    await queryRunner.query(
      `ALTER TABLE "participant" DROP CONSTRAINT "FK_75d08ef0e0ecc7aa2092ec0da39"`
    )
    await queryRunner.query(
      `ALTER TABLE "participant" DROP CONSTRAINT "FK_d0751b18fd377176af243c63ef0"`
    )
    await queryRunner.query(
      `ALTER TABLE "practitioner_communication" DROP CONSTRAINT "FK_b9725f99e6185a42642ba0c3b00"`
    )
    await queryRunner.query(
      `ALTER TABLE "practitioner_communication" DROP CONSTRAINT "FK_3960f6847ab419c2ca222b28b1f"`
    )
    await queryRunner.query(
      `ALTER TABLE "practitioner_address" DROP CONSTRAINT "FK_ca273b8ec2c24583a7e37e3e5bd"`
    )
    await queryRunner.query(
      `ALTER TABLE "practitioner_address" DROP CONSTRAINT "FK_257cfb7c227d59318dc4bbe3f40"`
    )
    await queryRunner.query(
      `ALTER TABLE "practitioner_name" DROP CONSTRAINT "FK_574f196537f7640fbbf49475b1a"`
    )
    await queryRunner.query(
      `ALTER TABLE "practitioner_name" DROP CONSTRAINT "FK_c13ff9ee02e9193fb785a0ad272"`
    )
    await queryRunner.query(
      `ALTER TABLE "practitioner_identifier" DROP CONSTRAINT "FK_e9f33fa15d17d51ac1face5acdb"`
    )
    await queryRunner.query(
      `ALTER TABLE "practitioner_identifier" DROP CONSTRAINT "FK_7659a3f577d5d0fe51103500955"`
    )
    await queryRunner.query(
      `ALTER TABLE "practitioner_contact_point" DROP CONSTRAINT "FK_9bb43092449b13d9bb160e8ae7b"`
    )
    await queryRunner.query(
      `ALTER TABLE "practitioner_contact_point" DROP CONSTRAINT "FK_ca3159351319f43faa378dcd4cd"`
    )
    await queryRunner.query(
      `ALTER TABLE "qualification" DROP CONSTRAINT "FK_a5c8241598c7fba2ad9f5d9d105"`
    )
    await queryRunner.query(
      `ALTER TABLE "qualification" DROP CONSTRAINT "FK_ef3973178c301f7710399038c0b"`
    )
    await queryRunner.query(
      `ALTER TABLE "qualification" DROP CONSTRAINT "FK_d7087b5f9ed7c607ecad65fdf4a"`
    )
    await queryRunner.query(
      `ALTER TABLE "qualification_identifier" DROP CONSTRAINT "FK_3bafe72393c9074c6d0ed8d90db"`
    )
    await queryRunner.query(
      `ALTER TABLE "qualification_identifier" DROP CONSTRAINT "FK_45eee420e9bd8d4e03313b84bdf"`
    )
    await queryRunner.query(
      `ALTER TABLE "encounter_participant" DROP CONSTRAINT "FK_c296cb6387d05e3df146da2e268"`
    )
    await queryRunner.query(
      `ALTER TABLE "encounter_participant" DROP CONSTRAINT "FK_1d6c8b982cfc8ae73bd66ec7ce1"`
    )
    await queryRunner.query(
      `ALTER TABLE "encounter_participant" DROP CONSTRAINT "FK_2974d8c90c6c70ced421024c0b0"`
    )
    await queryRunner.query(
      `ALTER TABLE "encounter" DROP CONSTRAINT "FK_8614220e803ca21c146a871f8bf"`
    )
    await queryRunner.query(
      `ALTER TABLE "encounter" DROP CONSTRAINT "FK_a9c05100cb3647a5660d1c4c20d"`
    )
    await queryRunner.query(
      `ALTER TABLE "encounter_identifier" DROP CONSTRAINT "FK_315fc460d7626305e25c8db3525"`
    )
    await queryRunner.query(
      `ALTER TABLE "encounter_identifier" DROP CONSTRAINT "FK_e0385c10c2ce2c9b707a65a172e"`
    )
    await queryRunner.query(
      `ALTER TABLE "identifier" DROP CONSTRAINT "FK_ab503f5b3408ee06c1503a1ccb5"`
    )
    await queryRunner.query(
      `ALTER TABLE "diagnosis" DROP CONSTRAINT "FK_b017ebe630304dd0f4c79a9c9a3"`
    )
    await queryRunner.query(
      `ALTER TABLE "diagnosis" DROP CONSTRAINT "FK_5c5d83c09fef194ef807fc1273a"`
    )
    await queryRunner.query(
      `ALTER TABLE "diagnosis" DROP CONSTRAINT "FK_75ec87b65fd165c5d9a79bb0dd2"`
    )
    await queryRunner.query(
      `ALTER TABLE "condition" DROP CONSTRAINT "FK_417623a8a2982b2e5be1e524765"`
    )
    await queryRunner.query(
      `ALTER TABLE "patient_communication" DROP CONSTRAINT "FK_7027a305efdef9c31ed79c3c912"`
    )
    await queryRunner.query(
      `ALTER TABLE "patient_communication" DROP CONSTRAINT "FK_20535217f45058a69249a579fd4"`
    )
    await queryRunner.query(
      `ALTER TABLE "patient_identifier" DROP CONSTRAINT "FK_933bf102d92916ab3f97c9878d2"`
    )
    await queryRunner.query(
      `ALTER TABLE "patient_identifier" DROP CONSTRAINT "FK_71665041bb7f618facc469d59f7"`
    )
    await queryRunner.query(
      `ALTER TABLE "coding" DROP CONSTRAINT "FK_b7ee6ae754a99aa6aefc8f4fedb"`
    )
    await queryRunner.query(
      `ALTER TABLE "patient_address" DROP CONSTRAINT "FK_971744b316662409103fa145f87"`
    )
    await queryRunner.query(
      `ALTER TABLE "patient_address" DROP CONSTRAINT "FK_8f6464f305e2d7798b776254295"`
    )
    await queryRunner.query(
      `ALTER TABLE "patient_contact_point" DROP CONSTRAINT "FK_d27a1a70421e51e5b93f292c118"`
    )
    await queryRunner.query(
      `ALTER TABLE "patient_contact_point" DROP CONSTRAINT "FK_1840c1192e582e581c46fa22138"`
    )
    await queryRunner.query(
      `ALTER TABLE "patient_name" DROP CONSTRAINT "FK_8d1b60aefc150fdd6c89d05eb4e"`
    )
    await queryRunner.query(
      `ALTER TABLE "patient_name" DROP CONSTRAINT "FK_e41fa8054112c32c1903607936b"`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment" ALTER COLUMN "description" SET NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment" ALTER COLUMN "description" SET NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "practitioner" ALTER COLUMN "active" DROP NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "practitioner" ALTER COLUMN "active" DROP NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "practitioner" ALTER COLUMN "active" DROP NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "practitioner" ALTER COLUMN "active" DROP NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "practitioner" ALTER COLUMN "active" DROP NOT NULL`
    )
    await queryRunner.query(`ALTER TABLE "instant" DROP COLUMN "valueAtUTC"`)
    await queryRunner.query(`ALTER TABLE "instant" DROP COLUMN "offsetFromUTC"`)
    await queryRunner.query(`ALTER TABLE "instant" DROP COLUMN "value"`)
    await queryRunner.query(`ALTER TABLE "instant" DROP COLUMN "original"`)
    await queryRunner.query(`ALTER TABLE "encounter" DROP COLUMN "subjectId"`)
    await queryRunner.query(`ALTER TABLE "encounter" DROP COLUMN "patientId"`)
    await queryRunner.query(
      `ALTER TABLE "diagnosis" DROP CONSTRAINT "UQ_5c5d83c09fef194ef807fc1273a"`
    )
    await queryRunner.query(`ALTER TABLE "diagnosis" DROP COLUMN "conditionId"`)
    await queryRunner.query(
      `ALTER TABLE "instant" ADD "value" TIMESTAMP WITH TIME ZONE`
    )
    await queryRunner.query(
      `ALTER TABLE "instant" ADD "original" character varying NOT NULL`
    )
    await queryRunner.query(`ALTER TABLE "encounter" ADD "patientId" integer`)
    await queryRunner.query(`ALTER TABLE "diagnosis" ADD "conditionId" integer`)
    await queryRunner.query(
      `ALTER TABLE "diagnosis" ADD CONSTRAINT "REL_5c5d83c09fef194ef807fc1273" UNIQUE ("conditionId")`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_cafecbd71d574b248dc495c780"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_df8256d211ead023e6c461d668"`
    )
    await queryRunner.query(`DROP TABLE "appointment_requested_period_period"`)
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3f5fb852da33d344ca856443fb"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a88b8a829afa7a855f41f119e9"`
    )
    await queryRunner.query(`DROP TABLE "appointment_based_on_reference"`)
    await queryRunner.query(
      `DROP INDEX "public"."IDX_93d6709d1d579bce4bbf7490c8"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_da181bc28c66f2b51ffa4c6275"`
    )
    await queryRunner.query(
      `DROP TABLE "appointment_patient_instruction_codeable_reference"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9ab0a1e965182653f6a2b35f81"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_bf9822166833bfc1cb661764c3"`
    )
    await queryRunner.query(`DROP TABLE "appointment_note_annotation"`)
    await queryRunner.query(
      `DROP INDEX "public"."IDX_308ea064a793ac40d5d98f42e2"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ed4840d5b6d2e0d6fdb53f15aa"`
    )
    await queryRunner.query(`DROP TABLE "appointment_account_reference"`)
    await queryRunner.query(
      `DROP INDEX "public"."IDX_cf5d6a843d2f6d426b41e91570"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1f5a5e7a87f57c8cc7bb39b445"`
    )
    await queryRunner.query(`DROP TABLE "appointment_slot_reference"`)
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d739ab7beed4705132ac03d9a2"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ab4a299cd33aab846497e15fe7"`
    )
    await queryRunner.query(
      `DROP TABLE "appointment_supporting_information_reference"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3790d87cf3c56db8db1ce2cbb5"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f71e023ee3ad66f5164a231e8d"`
    )
    await queryRunner.query(`DROP TABLE "appointment_replaces_reference"`)
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ae0a642a2965610d66334563a4"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0b841614ac2c05623ac20fcb77"`
    )
    await queryRunner.query(
      `DROP TABLE "appointment_reason_codeable_reference"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_38fb39cad33c4dec21a0fcffb5"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a8cb6b77f186525e73484858ba"`
    )
    await queryRunner.query(
      `DROP TABLE "appointment_specialty_codeable_concept"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_04029c9716bf4ac8063dec79a2"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_27a3f9f5388fa7ac33a42fd7cb"`
    )
    await queryRunner.query(
      `DROP TABLE "appointment_service_type_codeable_concept"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c4e5ddf916c79bca4b647f8cd4"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_eefb43aaf7b673428fc10d03a7"`
    )
    await queryRunner.query(
      `DROP TABLE "appointment_service_category_codeable_concept"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6675d017d9395593fa2f40fc41"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f7fba9535102e93d138d40d5ce"`
    )
    await queryRunner.query(
      `DROP TABLE "appointment_modifier_extension_extension"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_76dacddf1354dc93de1479b66b"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_edd6fca65501e272b8de69658e"`
    )
    await queryRunner.query(`DROP TABLE "appointment_extension_extension"`)
    await queryRunner.query(
      `DROP INDEX "public"."IDX_125f5a3d3e922997ea476505fa"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b050988457f270348010949c42"`
    )
    await queryRunner.query(`DROP TABLE "annotation_extension_extension"`)
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e06cdd21adb9e04dce9a93a217"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6c7f115caaa71f04c94bfd0ace"`
    )
    await queryRunner.query(
      `DROP TABLE "codeable_reference_extension_extension"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7479df8863dbc843ecccc2b6ac"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1206594d6d2c50130ce7384f2d"`
    )
    await queryRunner.query(
      `DROP TABLE "appointment_participant_type_codeable_concept"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_97e4162b2d2653bdbaaf59f8ff"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d782177d6470ba572140f8cf20"`
    )
    await queryRunner.query(`DROP TABLE "participant_type_codeable_concept"`)
    await queryRunner.query(
      `DROP INDEX "public"."IDX_266e789386862f3c47226518fb"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_af90e6a89010d6a8728bfc71ff"`
    )
    await queryRunner.query(
      `DROP TABLE "practitioner_identifier_type_codeable_concept"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6b4c27e7555bc42873cc49ec3d"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d305bc2314f5fcfc42481b4810"`
    )
    await queryRunner.query(
      `DROP TABLE "qualification_identifier_type_codeable_concept"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a10b32e954f3636256f1b44921"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9be880052a94ae9f73626606d0"`
    )
    await queryRunner.query(
      `DROP TABLE "encounter_identifier_type_codeable_concept"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4a544843a1391b36bba607fd29"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4c6a85f018112e0be9f8229e86"`
    )
    await queryRunner.query(
      `DROP TABLE "encounter_participant_type_codeable_concept"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ea0edcecf0057c2ae89c25627e"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_808a39ff6d88aa331f8d27b7e8"`
    )
    await queryRunner.query(`DROP TABLE "encounter_type_codeable_concept"`)
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3c363d50cca2fd7cfb6d0cde06"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d3d648c0c6052883dc7204c9a1"`
    )
    await queryRunner.query(`DROP TABLE "patient_modifier_extension_extension"`)
    await queryRunner.query(
      `DROP INDEX "public"."IDX_cc56e03309eb1ca6a59d22b53b"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_cd1ec3765312b45131307c3cf7"`
    )
    await queryRunner.query(`DROP TABLE "patient_extension_extension"`)
    await queryRunner.query(
      `DROP INDEX "public"."IDX_562073fef8cd5756189532fa3a"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1b89ca6ab6646fc85aefefe867"`
    )
    await queryRunner.query(`DROP TABLE "reference_extension_extension"`)
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9823a0174c01698bcb272be872"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_cb541a60da69a3ea9343a62071"`
    )
    await queryRunner.query(
      `DROP TABLE "patient_identifier_type_codeable_concept"`
    )
    await queryRunner.query(`DROP TABLE "date_time"`)
    await queryRunner.query(`DROP TABLE "instant"`)
    await queryRunner.query(`DROP TABLE "appointment_identifier"`)
    await queryRunner.query(
      `DROP TYPE "public"."appointment_identifier_use_enum"`
    )
    await queryRunner.query(`DROP TABLE "appointment"`)
    await queryRunner.query(`DROP TYPE "public"."appointment_status_enum"`)
    await queryRunner.query(`DROP TABLE "annotation"`)
    await queryRunner.query(`DROP TABLE "codeable_reference"`)
    await queryRunner.query(`DROP TABLE "appointment_participant"`)
    await queryRunner.query(`DROP TABLE "participant"`)
    await queryRunner.query(`DROP TABLE "practitioner"`)
    await queryRunner.query(`DROP TYPE "public"."practitioner_gender_enum"`)
    await queryRunner.query(`DROP TABLE "practitioner_communication"`)
    await queryRunner.query(`DROP TABLE "practitioner_address"`)
    await queryRunner.query(
      `DROP TYPE "public"."practitioner_address_type_enum"`
    )
    await queryRunner.query(
      `DROP TYPE "public"."practitioner_address_use_enum"`
    )
    await queryRunner.query(`DROP TABLE "practitioner_name"`)
    await queryRunner.query(`DROP TYPE "public"."practitioner_name_use_enum"`)
    await queryRunner.query(`DROP TABLE "practitioner_identifier"`)
    await queryRunner.query(
      `DROP TYPE "public"."practitioner_identifier_use_enum"`
    )
    await queryRunner.query(`DROP TABLE "practitioner_contact_point"`)
    await queryRunner.query(
      `DROP TYPE "public"."practitioner_contact_point_use_enum"`
    )
    await queryRunner.query(`DROP TABLE "qualification"`)
    await queryRunner.query(`DROP TABLE "qualification_identifier"`)
    await queryRunner.query(
      `DROP TYPE "public"."qualification_identifier_use_enum"`
    )
    await queryRunner.query(`DROP TABLE "encounter_participant"`)
    await queryRunner.query(`DROP TABLE "encounter"`)
    await queryRunner.query(`DROP TABLE "reference"`)
    await queryRunner.query(`DROP TABLE "extension"`)
    await queryRunner.query(`DROP TABLE "encounter_identifier"`)
    await queryRunner.query(
      `DROP TYPE "public"."encounter_identifier_use_enum"`
    )
    await queryRunner.query(`DROP TABLE "identifier"`)
    await queryRunner.query(`DROP TYPE "public"."identifier_use_enum"`)
    await queryRunner.query(`DROP TABLE "diagnosis"`)
    await queryRunner.query(`DROP TABLE "condition"`)
    await queryRunner.query(`DROP TABLE "patient"`)
    await queryRunner.query(`DROP TYPE "public"."patient_gender_enum"`)
    await queryRunner.query(`DROP TABLE "patient_communication"`)
    await queryRunner.query(`DROP TABLE "patient_identifier"`)
    await queryRunner.query(`DROP TYPE "public"."patient_identifier_use_enum"`)
    await queryRunner.query(`DROP TABLE "codeable_concept"`)
    await queryRunner.query(`DROP TABLE "coding"`)
    await queryRunner.query(`DROP TABLE "patient_address"`)
    await queryRunner.query(`DROP TYPE "public"."patient_address_type_enum"`)
    await queryRunner.query(`DROP TYPE "public"."patient_address_use_enum"`)
    await queryRunner.query(`DROP TABLE "patient_contact_point"`)
    await queryRunner.query(
      `DROP TYPE "public"."patient_contact_point_use_enum"`
    )
    await queryRunner.query(`DROP TABLE "patient_name"`)
    await queryRunner.query(`DROP TYPE "public"."patient_name_use_enum"`)
    await queryRunner.query(`DROP TABLE "period"`)
  }
}

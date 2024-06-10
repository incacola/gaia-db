CREATE TABLE IF NOT EXISTS "healthRecords" (
	"health_id" serial PRIMARY KEY NOT NULL,
	"person_id" integer,
	"health_record_type" varchar(255) NOT NULL,
	"description" text,
	"record_date" date,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "identification" (
	"identification_id" serial PRIMARY KEY NOT NULL,
	"address_person_id" serial NOT NULL,
	"type" varchar(255) NOT NULL,
	"id_number" varchar(255) NOT NULL,
	"issue_date" timestamp DEFAULT now() NOT NULL,
	"expiration_date" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "legal" (
	"record_id" serial PRIMARY KEY NOT NULL,
	"person_id" integer,
	"case_number" varchar(255) NOT NULL,
	"case_type" varchar(255) NOT NULL,
	"case_status" varchar(255) NOT NULL,
	"filing_date" date,
	"resolution_date" date,
	"details" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "taxRecords" (
	"tax_id" serial PRIMARY KEY NOT NULL,
	"person_id" integer,
	"tax_year" integer,
	"tax_amount" numeric(10, 2),
	"tax_status" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "healthRecords" ADD CONSTRAINT "healthRecords_person_id_person_person_id_fk" FOREIGN KEY ("person_id") REFERENCES "public"."person"("person_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "identification" ADD CONSTRAINT "identification_address_person_id_person_person_id_fk" FOREIGN KEY ("address_person_id") REFERENCES "public"."person"("person_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "legal" ADD CONSTRAINT "legal_person_id_person_person_id_fk" FOREIGN KEY ("person_id") REFERENCES "public"."person"("person_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "taxRecords" ADD CONSTRAINT "taxRecords_person_id_person_person_id_fk" FOREIGN KEY ("person_id") REFERENCES "public"."person"("person_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "healthRecords_id_idx" ON "healthRecords" USING btree ("health_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "healthRecords_person_idx" ON "healthRecords" USING btree ("person_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "identification_id_idx" ON "identification" USING btree ("identification_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "identification_person_idx" ON "identification" USING btree ("address_person_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "legal_id_idx" ON "legal" USING btree ("record_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "legal_person_idx" ON "legal" USING btree ("person_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "taxRecords_id_idx" ON "taxRecords" USING btree ("tax_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "taxRecords_person_idx" ON "taxRecords" USING btree ("person_id");
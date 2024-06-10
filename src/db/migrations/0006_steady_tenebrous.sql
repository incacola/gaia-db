CREATE TABLE IF NOT EXISTS "address" (
	"address_id" serial PRIMARY KEY NOT NULL,
	"address_person_id" serial NOT NULL,
	"street" varchar(255) NOT NULL,
	"city" varchar(255) NOT NULL,
	"state" varchar(255) NOT NULL,
	"zip" varchar(255) NOT NULL,
	"country" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "address" ADD CONSTRAINT "address_address_person_id_person_person_id_fk" FOREIGN KEY ("address_person_id") REFERENCES "public"."person"("person_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "address_id_idx" ON "address" USING btree ("address_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "address_person_idx" ON "address" USING btree ("address_person_id");
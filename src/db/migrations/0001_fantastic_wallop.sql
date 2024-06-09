CREATE INDEX IF NOT EXISTS "person_id_idx" ON "person" USING btree (person_id);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "person_first_name_idx" ON "person" USING btree (first_name);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "person_last_name_idx" ON "person" USING btree (last_name);
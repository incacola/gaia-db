ALTER TABLE "person" ALTER COLUMN "birthday" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "person" ALTER COLUMN "birthday" SET DEFAULT now();
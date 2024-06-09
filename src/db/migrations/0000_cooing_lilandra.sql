CREATE TABLE IF NOT EXISTS "person" (
	"person_id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"birthday" date NOT NULL,
	"gender" varchar(10) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(255),
	"social_security_number" varchar(20) NOT NULL,
	"tax_id" varchar(20) NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	"updated_at" date DEFAULT now() NOT NULL,
	CONSTRAINT "person_first_name_unique" UNIQUE("first_name"),
	CONSTRAINT "person_last_name_unique" UNIQUE("last_name"),
	CONSTRAINT "person_email_unique" UNIQUE("email"),
	CONSTRAINT "person_social_security_number_unique" UNIQUE("social_security_number")
);

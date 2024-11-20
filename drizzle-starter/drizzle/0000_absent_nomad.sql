CREATE TABLE IF NOT EXISTS "dinosaurs" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"dionsaur_id" integer,
	"description" text,
	"date_created" timestamp DEFAULT now(),
	"is_complete" boolean
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tasks" ADD CONSTRAINT "tasks_dinosaur_id_fkey" FOREIGN KEY ("dionsaur_id") REFERENCES "public"."dinosaurs"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

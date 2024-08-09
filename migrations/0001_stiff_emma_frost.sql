CREATE TABLE IF NOT EXISTS "files" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone,
	"title" text NOT NULL,
	"data" text,
	"in_trash" text,
	"banner_url" text,
	"folder_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "folders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone,
	"title" text NOT NULL,
	"data" text,
	"in_trash" text,
	"banner_url" text,
	"worksapce_id" uuid
);
--> statement-breakpoint
ALTER TABLE "workspaces" RENAME COLUMN "createed_at" TO "created_at";--> statement-breakpoint
ALTER TABLE "workspaces" ADD COLUMN "icon_id" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "files" ADD CONSTRAINT "files_folder_id_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."folders"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "folders" ADD CONSTRAINT "folders_worksapce_id_workspaces_id_fk" FOREIGN KEY ("worksapce_id") REFERENCES "public"."workspaces"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

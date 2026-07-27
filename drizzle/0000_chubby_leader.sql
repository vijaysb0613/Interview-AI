CREATE TABLE "mock_interview" (
	"id" serial PRIMARY KEY NOT NULL,
	"mock_id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"json_mock_resp" text NOT NULL,
	"job_position" varchar NOT NULL,
	"job_desc" varchar NOT NULL,
	"job_experience" varchar NOT NULL,
	"created_by" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "mock_interview_mock_id_unique" UNIQUE("mock_id")
);
--> statement-breakpoint
CREATE TABLE "user_answer" (
	"id" serial PRIMARY KEY NOT NULL,
	"mock_id_ref" uuid NOT NULL,
	"question" varchar NOT NULL,
	"correct_ans" text,
	"user_ans" text,
	"feedback" text,
	"rating" integer,
	"user_email" varchar,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "rating_range" CHECK ("user_answer"."rating" >= 0 AND "user_answer"."rating" <= 10)
);
--> statement-breakpoint
ALTER TABLE "user_answer" ADD CONSTRAINT "user_answer_mock_id_ref_mock_interview_mock_id_fk" FOREIGN KEY ("mock_id_ref") REFERENCES "public"."mock_interview"("mock_id") ON DELETE cascade ON UPDATE no action;
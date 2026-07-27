import { pgTable, serial, text, varchar, integer, uuid, timestamp, check } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const mockInterview = pgTable("mock_interview", {
  id: serial("id").primaryKey(),
  mockId: uuid("mock_id").notNull().unique().defaultRandom(),
  jsonMockResp: text("json_mock_resp").notNull(),
  jobPosition: varchar("job_position").notNull(),
  jobDesc: varchar("job_desc").notNull(),
  jobExperience: varchar("job_experience").notNull(),
  createdBy: varchar("created_by").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const userAnswer = pgTable(
  "user_answer",
  {
    id: serial("id").primaryKey(),
    mockIdRef: uuid("mock_id_ref")
      .notNull()
      .references(() => mockInterview.mockId, { onDelete: "cascade" }),
    question: varchar("question").notNull(),
    correctAns: text("correct_ans"),
    userAns: text("user_ans"),
    feedback: text("feedback"),
    rating: integer("rating"),
    userEmail: varchar("user_email"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [check("rating_range", sql`${table.rating} >= 0 AND ${table.rating} <= 10`)]
);

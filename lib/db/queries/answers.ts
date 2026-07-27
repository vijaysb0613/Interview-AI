import "server-only";
import { asc, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "../client";
import { userAnswer } from "../schema";

const uuidSchema = z.string().uuid();

export async function getAnswersForInterview(mockId: string) {
  if (!uuidSchema.safeParse(mockId).success) {
    return [];
  }
  return db
    .select()
    .from(userAnswer)
    .where(eq(userAnswer.mockIdRef, mockId))
    .orderBy(asc(userAnswer.id));
}

export async function createAnswer(input: {
  mockIdRef: string;
  question: string;
  correctAns?: string;
  userAns: string;
  feedback: string;
  rating: number;
  userEmail: string;
}) {
  const [row] = await db.insert(userAnswer).values(input).returning({ id: userAnswer.id });
  return row ?? null;
}

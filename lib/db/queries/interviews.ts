import "server-only";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "../client";
import { mockInterview } from "../schema";

const uuidSchema = z.string().uuid();

export async function getInterviewsForUser(userEmail: string) {
  return db
    .select()
    .from(mockInterview)
    .where(eq(mockInterview.createdBy, userEmail))
    .orderBy(desc(mockInterview.id));
}

export async function getInterviewByMockId(mockId: string) {
  if (!uuidSchema.safeParse(mockId).success) {
    return null;
  }
  const [interview] = await db
    .select()
    .from(mockInterview)
    .where(eq(mockInterview.mockId, mockId));
  return interview ?? null;
}

export async function createInterview(input: {
  jsonMockResp: string;
  jobPosition: string;
  jobDesc: string;
  jobExperience: string;
  createdBy: string;
}) {
  const [row] = await db
    .insert(mockInterview)
    .values(input)
    .returning({ mockId: mockInterview.mockId });
  return row ?? null;
}

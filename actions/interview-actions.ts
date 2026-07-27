"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { interviewFormSchema } from "@/lib/validation/interview-form";
import { generateJson } from "@/lib/ai/gemini";
import { buildQuestionPrompt } from "@/lib/ai/prompts";
import { interviewQuestionsResponseSchema } from "@/lib/ai/schemas";
import { createInterview } from "@/lib/db/queries/interviews";
import { logger } from "@/lib/logger";

const QUESTION_COUNT = Number(process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT) || 5;

export type CreateInterviewResult =
  | { status: "success"; mockId: string }
  | { status: "error"; message: string };

export async function createInterviewAction(input: {
  jobPosition: string;
  jobDesc: string;
  jobExperience: string;
}): Promise<CreateInterviewResult> {
  const { userId } = await auth();
  if (!userId) {
    return { status: "error", message: "You must be signed in." };
  }

  const parsed = interviewFormSchema.safeParse(input);
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress;
  if (!email) {
    return { status: "error", message: "Your account has no verified email address." };
  }

  let questions;
  try {
    const prompt = buildQuestionPrompt({
      jobPosition: parsed.data.jobPosition,
      jobDesc: parsed.data.jobDesc,
      jobExperience: String(parsed.data.jobExperience),
      questionCount: QUESTION_COUNT,
    });
    const raw = await generateJson(prompt);
    questions = interviewQuestionsResponseSchema.parse(raw);
  } catch (error) {
    logger.error("createInterviewAction: question generation failed", error, { userId });
    return { status: "error", message: "Failed to generate interview questions. Please try again." };
  }

  try {
    const row = await createInterview({
      jsonMockResp: JSON.stringify(questions),
      jobPosition: parsed.data.jobPosition,
      jobDesc: parsed.data.jobDesc,
      jobExperience: String(parsed.data.jobExperience),
      createdBy: email,
    });
    if (!row) {
      throw new Error("Insert returned no row");
    }
    return { status: "success", mockId: row.mockId };
  } catch (error) {
    logger.error("createInterviewAction: failed to save interview", error, { userId });
    return { status: "error", message: "Failed to save the interview. Please try again." };
  }
}

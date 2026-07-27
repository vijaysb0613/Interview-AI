"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { z } from "zod";
import { generateJson } from "@/lib/ai/gemini";
import { buildFeedbackPrompt } from "@/lib/ai/prompts";
import { feedbackResponseSchema } from "@/lib/ai/schemas";
import { createAnswer } from "@/lib/db/queries/answers";

const submitAnswerInputSchema = z.object({
  mockId: z.string().uuid(),
  question: z.string().min(1),
  correctAnswer: z.string().optional(),
  userAnswer: z.string().min(1),
});

export type SubmitAnswerResult =
  | { status: "success" }
  | { status: "error"; message: string };

export async function submitAnswerAction(
  input: z.infer<typeof submitAnswerInputSchema>
): Promise<SubmitAnswerResult> {
  const { userId } = await auth();
  if (!userId) {
    return { status: "error", message: "You must be signed in." };
  }

  const parsed = submitAnswerInputSchema.safeParse(input);
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress;
  if (!email) {
    return { status: "error", message: "Your account has no verified email address." };
  }

  let feedback;
  try {
    const prompt = buildFeedbackPrompt({
      question: parsed.data.question,
      userAnswer: parsed.data.userAnswer,
    });
    const raw = await generateJson(prompt);
    feedback = feedbackResponseSchema.parse(raw);
  } catch (error) {
    console.error("[submitAnswerAction] feedback generation failed", error);
    return { status: "error", message: "Failed to grade your answer. Please try again." };
  }

  try {
    await createAnswer({
      mockIdRef: parsed.data.mockId,
      question: parsed.data.question,
      correctAns: parsed.data.correctAnswer,
      userAns: parsed.data.userAnswer,
      feedback: feedback.feedback,
      rating: feedback.rating,
      userEmail: email,
    });
    return { status: "success" };
  } catch (error) {
    console.error("[submitAnswerAction] failed to save answer", error);
    return { status: "error", message: "Failed to save your answer. Please try again." };
  }
}

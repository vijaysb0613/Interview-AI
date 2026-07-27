import { z } from "zod";

export const interviewQuestionSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

export const interviewQuestionsResponseSchema = z.object({
  interviewQuestions: z.array(interviewQuestionSchema).min(1),
});

export const feedbackResponseSchema = z.object({
  rating: z.coerce.number().int().min(0).max(10),
  feedback: z.string(),
});

export type InterviewQuestion = z.infer<typeof interviewQuestionSchema>;
export type InterviewQuestionsResponse = z.infer<typeof interviewQuestionsResponseSchema>;
export type FeedbackResponse = z.infer<typeof feedbackResponseSchema>;

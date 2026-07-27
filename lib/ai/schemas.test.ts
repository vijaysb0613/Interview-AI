import { describe, expect, it } from "vitest";
import {
  feedbackResponseSchema,
  interviewQuestionsResponseSchema,
} from "./schemas";

describe("interviewQuestionsResponseSchema", () => {
  it("accepts a well-formed Gemini response", () => {
    const result = interviewQuestionsResponseSchema.safeParse({
      interviewQuestions: [
        { question: "What is a closure?", answer: "A function bound to its lexical scope." },
      ],
    });
    expect(result.success).toBe(true);
  });

  it("rejects an empty questions array", () => {
    const result = interviewQuestionsResponseSchema.safeParse({ interviewQuestions: [] });
    expect(result.success).toBe(false);
  });

  it("rejects a response missing the interviewQuestions field", () => {
    const result = interviewQuestionsResponseSchema.safeParse({ foo: "bar" });
    expect(result.success).toBe(false);
  });

  it("rejects a question item with a missing answer field", () => {
    const result = interviewQuestionsResponseSchema.safeParse({
      interviewQuestions: [{ question: "What is a closure?" }],
    });
    expect(result.success).toBe(false);
  });

  it("rejects completely malformed JSON shapes", () => {
    const result = interviewQuestionsResponseSchema.safeParse("not even an object");
    expect(result.success).toBe(false);
  });
});

describe("feedbackResponseSchema", () => {
  it("accepts a well-formed feedback response", () => {
    const result = feedbackResponseSchema.safeParse({ rating: 7, feedback: "Good answer." });
    expect(result.success).toBe(true);
  });

  it("coerces a numeric-string rating", () => {
    const result = feedbackResponseSchema.safeParse({ rating: "8", feedback: "Solid." });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.rating).toBe(8);
    }
  });

  it("rejects a rating above 10", () => {
    const result = feedbackResponseSchema.safeParse({ rating: 11, feedback: "Too high." });
    expect(result.success).toBe(false);
  });

  it("rejects a rating below 0", () => {
    const result = feedbackResponseSchema.safeParse({ rating: -1, feedback: "Too low." });
    expect(result.success).toBe(false);
  });

  it("rejects a non-integer rating", () => {
    const result = feedbackResponseSchema.safeParse({ rating: 7.5, feedback: "Fractional." });
    expect(result.success).toBe(false);
  });

  it("rejects a response missing the feedback field", () => {
    const result = feedbackResponseSchema.safeParse({ rating: 7 });
    expect(result.success).toBe(false);
  });
});

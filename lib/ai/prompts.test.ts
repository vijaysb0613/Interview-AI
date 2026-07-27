import { describe, expect, it } from "vitest";
import { buildFeedbackPrompt, buildQuestionPrompt } from "./prompts";

describe("buildQuestionPrompt", () => {
  it("includes the job details and question count", () => {
    const prompt = buildQuestionPrompt({
      jobPosition: "Backend Engineer",
      jobDesc: "Node.js, Postgres",
      jobExperience: "5",
      questionCount: 5,
    });
    expect(prompt).toContain("Backend Engineer");
    expect(prompt).toContain("Node.js, Postgres");
    expect(prompt).toContain("5 years");
    expect(prompt).toContain("5 interview");
    expect(prompt).toContain("interviewQuestions");
  });
});

describe("buildFeedbackPrompt", () => {
  it("includes the question and the user's answer", () => {
    const prompt = buildFeedbackPrompt({
      question: "What is a closure?",
      userAnswer: "A function with access to its outer scope.",
    });
    expect(prompt).toContain("What is a closure?");
    expect(prompt).toContain("A function with access to its outer scope.");
    expect(prompt).toContain("rating");
    expect(prompt).toContain("feedback");
  });
});

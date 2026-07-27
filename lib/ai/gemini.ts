import "server-only";
import { GoogleGenerativeAI } from "@google/generative-ai";

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

function getModel() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set. Copy .env.example to .env and fill it in.");
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
}

function stripJsonFence(text: string): string {
  return text.replace(/```json/g, "").replace(/```/g, "").trim();
}

/**
 * Gemini is called server-side, so a browser-level network mock (e.g.
 * Playwright's page.route()) can never intercept it - these calls don't
 * go through the browser at all. E2E runs opt into this instead via
 * E2E_MOCK_GEMINI, keyed off prompt content since question-generation and
 * feedback prompts need different canned shapes.
 */
function getMockResponse(prompt: string): unknown {
  if (prompt.includes("interviewQuestions")) {
    return {
      interviewQuestions: [
        { question: "What is a closure?", answer: "A function bound to its lexical scope." },
      ],
    };
  }
  return { rating: 8, feedback: "Solid answer with room to elaborate on edge cases." };
}

export async function generateJson(prompt: string): Promise<unknown> {
  if (process.env.E2E_MOCK_GEMINI === "true") {
    return getMockResponse(prompt);
  }

  const chatSession = getModel().startChat({ generationConfig, history: [] });
  const result = await chatSession.sendMessage(prompt);
  const raw = stripJsonFence(result.response.text());
  return JSON.parse(raw);
}

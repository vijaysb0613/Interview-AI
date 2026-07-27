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

export async function generateJson(prompt: string): Promise<unknown> {
  const chatSession = getModel().startChat({ generationConfig, history: [] });
  const result = await chatSession.sendMessage(prompt);
  const raw = stripJsonFence(result.response.text());
  return JSON.parse(raw);
}

import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error("GEMINI environment variable is not set.");
}

export const genAI = new GoogleGenAI({apiKey: GEMINI_API_KEY});
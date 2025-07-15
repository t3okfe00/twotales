import OpenAI from "openai";
import "dotenv/config";

export const openAiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

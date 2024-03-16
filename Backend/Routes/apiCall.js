import { config } from "dotenv";
import OpenAI from "openai";
import express from "express";

config();
const openai = new OpenAI({ key: process.env.OPENAI_API_KEY });

const ApiRouter = express.Router();

ApiRouter.post("/api", async (req, res) => {
  const { message } = req.body;

  const userMessage = { role: "user", content: message };

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a friendly assistant here to chat with you!",
      },
      userMessage,
    ],
    model: "gpt-3.5-turbo",
  });

  res.status(200).json({ reply: completion.choices[0].message.content });
});

export default ApiRouter;

import { config } from "dotenv";
import OpenAI from "openai";
import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
config();
const openai = new OpenAI({ key: process.env.OPENAI_API_KEY });

app.post("/api", async (req, res) => {
  const { message } = req.body;
  const greeting = "Hey there! 🌟 ";

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

app.listen(4000, () => {
  console.log("port listening");
});

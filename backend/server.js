const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const OpenAI = require("openai");
const marked = require("marked");

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/summarize", async (req, res) => {
  try {
    const { text, length } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    let prompt = "";
    if (length === "short") {
      prompt = "Summarize this in 1-2 sentences.";
    } else if (length === "medium") {
      prompt = "Summarize this in 3-4 sentences.";
    } else {
      prompt = "Summarize this in detail with key points.";
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that summarizes text.",
        },
        {
          role: "user",
          content: `${prompt}\n\n${text}`,
        },
      ],
      temperature: 0.7,
    });

    const summary = response.choices[0].message.content;
    res.json({ summary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to summarize text" });
  }
});

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));

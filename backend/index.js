const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const OPENROUTER_API_KEY = "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";

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-3-8b-instruct",
        messages: [
          {
            role: "system",
            content:
              "You are Vyan AI Guard, a friendly cybersecurity expert with a confident and reassuring tone.",
          },
          {
            role: "user",
            content: message,
          },
        ],
      },
      {
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://srivas-saksham.github.io/Vyan-Security", // Optional but recommended
          "X-Title": "VyanSecurityBot",
        },
      }
    );

    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error("API error:", error.message);
    res.status(500).json({ error: "AI server error" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ OpenRouter backend running at http://localhost:${PORT}`);
});

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const PORT = 3001;
require('dotenv').config();

app.use(cors());
app.use(express.json());

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  const forbiddenTopics = ["cybersecurity", "it security", "hacking", "malware", "firewall", "server", "network"];

  const isOffTopic = forbiddenTopics.some(keyword =>
    message.toLowerCase().includes(keyword)
  );

  if (isOffTopic) {
    return res.json({
      reply: "I'm here to assist only with contract-based physical security services — please ask me about guard hiring or protection contracts."
    });
  }


  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4-turbo",
        messages: [
          {
            role: "system",
            content:
              `
You are Vyan AI Guard named "Shieldon" — a professional, friendly assistant for physical security services.

Your goal is to help users with:
- Security guard hiring for commercial or residential sites
- Long-term or contract-based protection plans
- Corporate safety assurance
- Contract and pricing inquiries

❗ Do NOT support:
- One-day event bookings
- Private VIP/bodyguard protection
- Short-term casual security hires

If a user asks about these, respond:
"Vyan Security deals with **contract-based security services** only."

✅ Your tone must be:
- Friendly, brief, and clear
- Step-by-step or bullet point format
- Strictly focused on contract-based security services
- No technical jargon or off-topic replies

If the question is unrelated (e.g., cooking, finance), say:
"I'm here to help with your safety and security needs — ask me anything about guard services, protection, or contracts."
          `.trim(),
          },
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 0.3,
        max_tokens: 300,
        top_p: 1.0,
        frequency_penalty: 0.5,
        presence_penalty: 0.0,
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

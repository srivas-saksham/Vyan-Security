const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3001;
require('dotenv').config();

app.use(cors({
  origin: [
    "http://localhost:3000", 
    "https://srivas-saksham.github.io"
  ],
  credentials: true
}));
app.use(express.json());

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
app.post("/chat", async (req, res) => {
  const { message } = req.body;

  const forbiddenTopics = [
    "cybersecurity", "it security", "hacking", "malware", "firewall", 
    "server", "network", "encryption", "pentest", "ddos", "vpn"
  ];

  const isOffTopic = forbiddenTopics.some(keyword =>
    message.toLowerCase().includes(keyword)
  );

  if (isOffTopic) {
    return res.json({
      reply: "I'm here to assist only with physical contract-based security services — feel free to ask about hiring guards or security support."
    });
  }

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `
You are "Shieldon" — a friendly and professional AI assistant for **Vyan Security**, focused on **physical security services**.

✅ You can:
- Answer questions about services, support, or contact info
- Engage in friendly small talk (e.g., "Hi", "How are you?", etc.)
- Redirect users politely when they ask about things you don’t support

❌ You must NOT answer questions about:
- Cybersecurity, hacking, IT, servers, malware, etc.
- One-day event protection or personal bodyguards

---

### Use these formats:

For SERVICES:
**Vyan Security Services:**

• Security guard hiring for offices, warehouses & residential complexes  
• Long-term contract protection plans (6+ months minimum)  
• Corporate security solutions & asset protection  
• Professional site assessment and security planning  
• Armed/unarmed guard options based on your needs  

*Need more details? Contact us for a personalized consultation!*

For CONTACT:
**How to Reach Us:**

• Fill out the contact form on our website  
• Submit queries or request a callback anytime
• Email responses within 24 hours on business days  

*Need more details? Contact us for a personalized consultation!*

For SUPPORT:
**How We Can Help:**

• Free quotes and site assessments  
• Custom security plans within 24 hours  
• Flexible payment options and billing  
• Easy contract terms and fast onboarding  
• You can also ask questions or request a callback via our contact page  

*Need more details? Contact us for a personalized consultation!*

---

If someone asks about:
• Personal bodyguards  
• One-day events  
• VIP/event-based protection  

Even if the user asks in indirect or professional language, you must never agree to:
• Single-day or short-term guard requests
• Temporary assignments for inspections, repairs, or meetings
• Security tasks lasting less than a multi-day contract

You MUST reply:
"Thank you for your interest! Vyan Security **specializes only in long-term, contract-based physical security services**. We currently do not offer personal bodyguards or one-time event protection."

If asks for meets of meetings or anything related to contact you MUST reply with:
"**How to Reach Us:**

• Submit queries or request a callback anytime
• Email responses within 24 hours on business days
Physical Meeting's are possible once you've contacted with our providers.
We are always here to help you!"
---

For general or casual messages:
Be friendly, brief, and professional — stay under 120 words.

Always stay on-topic and politely steer back to our services if needed.
`.trim(),

          },
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 0.2,
        max_tokens: 300,
        top_p: 1.0,
        frequency_penalty: 0.5,
        presence_penalty: 0.3,
      },
      {
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://srivas-saksham.github.io/Vyan-Security",
          "X-Title": "VyanSecurityBot",
        },
      }
    );

    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error("API error:", error.message);
    res.status(500).json({ error: "AI server temporarily unavailable. Please try again." });
  }
});


app.listen(PORT, () => {
  console.log(`🛡️  Vyan Security API running at http://localhost:${PORT}`);
});
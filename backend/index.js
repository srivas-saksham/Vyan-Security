const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3001;
require('dotenv').config();

// Updated CORS configuration to include Vercel domain
app.use(cors({
  origin: [
    "http://localhost:3000", 
    "http://localhost:3001", 
    "https://srivas-saksham.github.io",
    "https://vyan-security.vercel.app",  // Added Vercel domain
    "https://vyan-security-git-main-srivas-saksham.vercel.app", // Vercel preview URLs
    "https://vyan-security-srivas-saksham.vercel.app" // Alternative Vercel URL format
  ],
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  optionsSuccessStatus: 200 // For legacy browser support
}));

// Add preflight handling
app.options('*', cors());

app.use(express.json({ limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

app.post("/chat", async (req, res) => {
  // Add request logging for debugging
  console.log('Chat request received from:', req.get('origin') || req.get('referer'));
  console.log('Request body:', req.body);

  const { message } = req.body;

  // Validate input
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ 
      error: "Message is required and must be a string" 
    });
  }

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
    // Determine the referer based on the request origin
    const origin = req.get('origin') || req.get('referer') || 'https://vyan-security.vercel.app';
    let referer = 'https://vyan-security.vercel.app';
    
    if (origin.includes('github.io')) {
      referer = 'https://srivas-saksham.github.io/Vyan-Security';
    } else if (origin.includes('vercel.app')) {
      referer = 'https://vyan-security.vercel.app';
    }

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
- Answer questions about security services, housekeeping services, support, or contact info
- Engage in friendly small talk (e.g., "Hi", "How are you?", etc.)
- Redirect users politely when they ask about things you don't support

❌ You must NOT answer questions about:
- Cybersecurity, hacking, IT, servers, malware, etc.
- One-day event protection or personal bodyguards

**IMPORTANT:** When users mention "housekeeping", "housekeeper", "cleaning", "janitor", or similar terms, you MUST provide the housekeeping services information, not general security services. However, if they express intent to BOOK or HIRE these services (using words like "book", "hire", "contract", "need", "want to book"), use the BOOKINGS/CONTRACT REQUESTS response instead.

---

**KEYWORD RECOGNITION:**
- If the user mentions "book", "booking", "hire", "contract", "want to book", "need", "require", "interested in hiring" → Use the BOOKINGS/CONTRACT REQUESTS response format (Priority 1)
- If the user mentions "housekeeping", "housekeeper", "cleaning", "janitor", "cleaner", or "maintenance staff" AND is not asking to book → Use the HOUSEKEEPING response format
- If the user asks about security services AND is not asking to book → Use the SERVICES response format
- If the user asks about contact → Use the CONTACT response format

---

### Use these formats:

For SERVICES:
**When discussing general security services, vary your response naturally while maintaining clear formatting and including these key points:**

• Security guard hiring for offices, warehouses & residential complexes  
• Long-term contract protection plans (6+ months minimum)  
• Corporate security solutions & asset protection  
• Professional site assessment and security planning  
• Armed/unarmed guard options based on needs  
• Male housekeepers for corporates and institutions

**Always use bullet points for service lists, bold headings, and end with a varied consultation offer. Be conversational but well-formatted.**

For HOUSEKEEPING:
When users ask about "housekeeping", "housekeeper", "cleaning", "janitor", or similar services, you MUST respond with:

**Yes, we also provide male housekeepers for corporates and institutions!**

Our housekeeping services include:
• Professional male housekeepers for corporate offices
• Institutional cleaning and maintenance staff
• Long-term contract-based housekeeping solutions
• Reliable and trained housekeeping personnel

*This service is available for corporates and institutions only. Contact us for more details and customized housekeeping solutions!*

For CONTACT:
**When users ask about contact information, use proper formatting with bold headings and bullet points:**

**How to Reach Us:** (vary this heading)

• Fill out the contact form on our website (vary this phrasing)
• Submit queries or request a callback anytime (vary this phrasing)  
• Email responses within 24 hours on business days (vary this phrasing)

**Maintain professional formatting while varying the actual words used.**

For SUPPORT:
**When discussing support, use clear formatting:**

**How We Can Help:** (vary this heading)

• Free quotes and site assessments (vary phrasing)
• Custom plans within 24 hours (vary phrasing)  
• Flexible payment and billing options (vary phrasing)
• Easy contract terms and fast onboarding (vary phrasing)
• Contact page for questions and callbacks (vary phrasing)

**Keep bullet points for clarity but vary the language naturally.**

For BOOKINGS/CONTRACT REQUESTS:
When users ask about booking services, wanting to book a contract, or share their security requirements, respond with:

"Thank you for your interest in our security services! 

I understand you're looking to secure professional protection for your needs. To provide you with the most suitable security solution and accurate pricing, I'll need our specialists to review your specific requirements.

**Next Steps:**

• Please submit your detailed requirements through our contact form  
• Request a callback for immediate assistance  
• Our team will respond within 24 hours on business days with a customized proposal  

We're committed to finding the perfect security solution for you!"

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

• Submit queries or request a callback anytime on our [Contact] Page.
• Email responses within 24 hours on business days.
Physical Meeting's are possible once you've contacted with our providers.
We are always here to help you!"

---

**RESPONSE VARIATION GUIDELINES:**

🎯 **CRITICAL:** Never use identical responses. Always vary your:
- Opening greetings and closing statements
- Sentence structure within the formatted sections
- Word choices while maintaining bullet points and bold headings
- Enthusiasm level and tone
- Transition phrases between sections

🎯 **FORMATTING REQUIREMENTS:**
- **Always use bold headings** for section titles
- **Always use bullet points (•)** for lists of services/steps
- **Maintain line breaks** for readability  
- **Keep professional structure** while varying content

🎯 **Example of good variation:**
Instead of always saying "**Vyan Security Services:**" you could say:
- "**Our Security Solutions:**" 
- "**What We Offer:**"
- "**Services Available:**"

**Keep responses natural, conversational, and well-formatted simultaneously.**
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
          "HTTP-Referer": referer,
          "X-Title": "VyanSecurityBot",
        },
        timeout: 15000, // 15 second timeout
      }
    );

    const reply = response.data.choices[0].message.content;
    console.log('AI response generated successfully');
    
    res.json({ reply });
  } catch (error) {
    console.error("API error:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
    
    if (error.code === 'ECONNABORTED') {
      res.status(408).json({ error: "Request timeout. Please try again." });
    } else if (error.response?.status === 429) {
      res.status(429).json({ error: "Too many requests. Please wait a moment." });
    } else if (error.response?.status >= 500) {
      res.status(502).json({ error: "AI service temporarily unavailable." });
    } else {
      res.status(500).json({ error: "AI server temporarily unavailable. Please try again." });
    }
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`🛡️  Vyan Security API running at http://localhost:${PORT}`);
  console.log(`🌐 CORS enabled for:`, [
    "http://localhost:3000", 
    "https://srivas-saksham.github.io",
    "https://vyan-security.vercel.app"
  ]);
});
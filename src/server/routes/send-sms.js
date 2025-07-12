// File: server/routes/send-sms.js (using Fast2SMS API)

import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.post('/', async (req, res) => {
  const { name, phone } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required' });
  }

  const payload = {
    route: "v3",
    sender_id: "TXTIND",
    message: `Hi ${name}, Vyan Security has received your query. We will reach out shortly.`,
    language: "english",
    flash: 0,
    numbers: `91${phone}`
  };

  try {
    const response = await fetch("https://www.fast2sms.com/dev/bulkV2", {
      method: "POST",
      headers: {
        "authorization": process.env.FAST2SMS_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (data.return) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(500).json({ success: false, error: data.message });
    }
  } catch (error) {
    console.error('Fast2SMS error:', error);
    return res.status(500).json({ success: false, error: 'SMS failed' });
  }
});

export default router;

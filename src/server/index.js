// File: server/index.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sendSMS from './routes/send-sms.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/send-sms', sendSMS);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));

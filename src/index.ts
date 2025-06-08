import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { WhatsAppWebhookPayload } from "./webhooks/webhook_payloads_DTO";
import { genProcessWhatsAppWebhook } from "./services/genProcessWhatsAppWebhook";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

app.use(express.json());

// POST for webhook callbacks
app.post("/webhook", async (req: Request, res: Response) => {
  console.log("Incoming message:", JSON.stringify(req.body, null, 2));

  const incoming_webhook: WhatsAppWebhookPayload = req.body;
  await genProcessWhatsAppWebhook(incoming_webhook);

  res.sendStatus(200);
});

// GET for webhook verification
app.get("/webhook", (req: Request, res: Response) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verified");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

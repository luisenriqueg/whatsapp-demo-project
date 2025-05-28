import express, { Request, Response } from "express";
import { sendWhatsAppMessage } from "./messages/text/text_message";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

app.use(express.json());

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

// POST for webhook callbacks
app.post("/webhook", async (req: Request, res: Response) => {
  console.log("Incoming message:", JSON.stringify(req.body, null, 2));
  // await sendWhatsAppMessage();
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

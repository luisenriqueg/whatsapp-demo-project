import type { WhatsAppMessagePayload } from "./text_messages_DTO.js";
import { GRAPH_API_VERSION, WHATSAPP_PHONE_NUMBER_ID } from "../../constants";

export async function sendWhatsAppMessage({
  senderPhoneNumber,
}: {
  senderPhoneNumber: string;
}): Promise<void> {
  const apiVersion = GRAPH_API_VERSION;
  const phoneNumberId = WHATSAPP_PHONE_NUMBER_ID;
  const accessToken = process.env.GRAPH_API_ACCESS_TOKEN;
  const recipientPhoneNumber = `+${senderPhoneNumber}`;
  const messageBody =
    "Hello from WhatsApp NodeJS Typescript API! This is a test message.";
  const enablePreview = true; // or false

  const url = `https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`;

  const payload: WhatsAppMessagePayload = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: recipientPhoneNumber,
    type: "text",
    text: {
      preview_url: enablePreview,
      body: messageBody,
    },
  };

  console.log("accessToken:", accessToken);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log("Message sent:", data);
  } catch (error) {
    console.error("Failed to send WhatsApp message:", error);
  }
}

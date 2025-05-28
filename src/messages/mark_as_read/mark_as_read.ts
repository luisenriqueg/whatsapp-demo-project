import type { MarkReadPayload } from "./mark_as_read_DTO";
import { GRAPH_API_VERSION, WHATSAPP_PHONE_NUMBER_ID } from "../../constants";

export async function markMessageAsRead({
  whatsappMessageId,
}: {
  whatsappMessageId: string;
}) {
  const apiVersion = GRAPH_API_VERSION;
  const phoneNumberId = WHATSAPP_PHONE_NUMBER_ID;
  const accessToken = process.env.GRAPH_API_ACCESS_TOKEN;
  const messageId = whatsappMessageId;

  const url = `https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`;

  const payload: MarkReadPayload = {
    messaging_product: "whatsapp",
    status: "read",
    message_id: messageId,
  };

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
    console.log("Mark as read response:", data);
  } catch (error) {
    console.error("Error marking message as read:", error);
  }
}

import { markMessageAsRead } from "../messages/mark_as_read/mark_as_read";
import { WhatsAppWebhookPayload } from "../webhooks/webhook_payloads_DTO";

export async function genWhatsAppWebhookType(
  webhook: WhatsAppWebhookPayload
): Promise<void> {
  for (const entry of webhook.entry) {
    for (const change of entry.changes) {
      if (change.field === "messages") {
        const { value } = change;
        const messages = value.messages ?? [];
        const contacts = value.contacts ?? [];

        for (const message of messages) {
          const sender = contacts.find((c) => c.wa_id === message.from);
          const senderName = sender?.profile?.name ?? "Unknown";
          const senderPhone = sender?.wa_id ?? message.from;

          console.log(`Message from ${senderName} (${senderPhone}):`);

          switch (message.type) {
            case "text":
              console.log("Text:", message.text.body);
              await markMessageAsRead({
                whatsappMessageId: message.id,
              });
              break;
            case "reaction":
              console.log("Emoji:", message.reaction.emoji);
              break;
            case "image":
              console.log("Image SHA256:", message.image.sha256);
              break;
            // handle more...
          }
        }
      } else if (change.field === "statuses") {
        for (const status of change.value.statuses ?? []) {
          console.log(`Message ${status.id} status: ${status.status}`);
        }
      }
    }
  }
}

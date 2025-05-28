export interface WhatsAppWebhookPayload {
  object: "whatsapp_business_account";
  entry: WhatsAppEntry[];
}

interface WhatsAppEntry {
  id: string;
  changes: WhatsAppChange[];
}

interface WhatsAppChange {
  field: "messages" | "statuses";
  value: WhatsAppChangeValue;
}

interface WhatsAppChangeValue {
  messaging_product: "whatsapp";
  metadata: WhatsAppMetadata;
  contacts?: WhatsAppContact[]; // messages only
  messages?: WhatsAppMessage[]; // field: messages
  statuses?: WhatsAppStatus[]; // field: statuses
}

interface WhatsAppContact {
  profile: {
    name: string;
  };
  wa_id: string;
}

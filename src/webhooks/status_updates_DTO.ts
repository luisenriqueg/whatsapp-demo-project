interface WhatsAppStatus {
  id: string; // message ID
  status: "sent" | "delivered" | "read" | "failed" | string;
  timestamp: string;
  recipient_id: string;
  conversation?: {
    id: string;
    origin: {
      type: "business_initiated" | "user_initiated" | "referral";
    };
  };
  pricing?: {
    billable: boolean;
    pricing_model: string;
    category: string;
  };
  errors?: {
    code: number;
    title: string;
    details?: string;
  }[];
}

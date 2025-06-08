export interface WhatsAppAudioPayload {
  messaging_product: "whatsapp";
  recipient_type: "individual";
  to: string;
  type: "audio";
  audio: media;
}

type media = {
  id?: string; // Optional, use if media is uploaded
  link?: string; // Optional, use if media is hosted
};

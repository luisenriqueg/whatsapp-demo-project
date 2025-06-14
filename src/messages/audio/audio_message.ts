import type { WhatsAppAudioPayload } from "./whatsapp_audio_DTO";

import { GRAPH_API_VERSION, WHATSAPP_PHONE_NUMBER_ID } from "../../constants";

const media = {
  // https://thetestdata.com/sample-m4a-file-download.php
  link: "https://thetestdata.com/assets/audio/m4a/thetestdata-sample-m4a-1.m4a",
};

export async function sendWhatsAppAudio({
  recipient_phone_number,
}: {
  recipient_phone_number: string;
}) {
  const apiVersion = GRAPH_API_VERSION;
  const phoneNumberId = WHATSAPP_PHONE_NUMBER_ID;
  const accessToken = process.env.GRAPH_API_ACCESS_TOKEN;
  const recipientPhoneNumber = `+${recipient_phone_number}`;

  const url = `https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`;

  const body: WhatsAppAudioPayload = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: recipientPhoneNumber,
    type: "audio",
    audio: media,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    console.log("Send Audio Response", response);

    const data = await response.json();

    if (!response.ok) {
      console.error("Failed to send message:", data);
    } else {
      console.log("Message sent successfully:", data);
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

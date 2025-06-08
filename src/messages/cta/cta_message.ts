import { GRAPH_API_VERSION, WHATSAPP_PHONE_NUMBER_ID } from "../../constants";

export async function sendWhatsAppCTAMessage({
  recipient_phone_number,
}: {
  recipient_phone_number: string;
}): Promise<void> {
  const apiVersion = GRAPH_API_VERSION;
  const phoneNumberId = WHATSAPP_PHONE_NUMBER_ID;
  const accessToken = process.env.GRAPH_API_ACCESS_TOKEN;
  const recipientPhoneNumber = `+${recipient_phone_number}`;
  const url = `https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`;

  const payload = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: recipientPhoneNumber,
    type: "interactive",
    interactive: {
      type: "cta_url",
      header: {
        type: "image",
        image: {
          link: "https://mobileimages.lowes.com/productimages/3a725ae6-c541-4571-852a-4f82dc1539f7/70350869.jpeg?size=pdhz",
        },
      },
      body: {
        text: "Click the button below to see some nice discounts.",
      },
      action: {
        name: "cta_url",
        parameters: {
          display_text: "See Discounts",
          url: "https://www.facebook.com",
        },
      },
      footer: {
        text: "Promotions and discounts for limited time only!",
      },
    },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log("Response:", data);
  } catch (error) {
    console.error("Error sending message:", error);
  }
}

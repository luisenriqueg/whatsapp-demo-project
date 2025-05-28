interface WhatsAppMessagePayload {
  messaging_product: "whatsapp";
  recipient_type: "individual";
  to: string;
  type: "text";
  text: {
    preview_url: boolean;
    body: string;
  };
}

export async function sendWhatsAppMessage() {
  const apiVersion = "v22.0";
  const phoneNumberId = "686283031229166";
  const accessToken = process.env.GRAPH_API_ACCESS_TOKEN;
  const recipientPhoneNumber = "+5511968577558";
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

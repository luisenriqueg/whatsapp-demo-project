type WhatsAppMessage =
  | TextMessage
  | ReactionMessage
  | ImageMessage
  | StickerMessage;
// | UnknownMessage; // etc.

interface BaseMessage {
  from: string;
  id: string;
  timestamp: string;
  type: string;
}

interface TextMessage extends BaseMessage {
  type: "text";
  text: {
    body: string;
  };
}

interface ReactionMessage extends BaseMessage {
  type: "reaction";
  reaction: {
    emoji: string;
    message_id: string;
  };
}

interface ImageMessage extends BaseMessage {
  type: "image";
  image: {
    id: string;
    mime_type: string;
    sha256: string;
    caption?: string;
  };
}

interface StickerMessage extends BaseMessage {
  type: "sticker";
  sticker: {
    mime_type: string;
    sha256: string;
    id: string;
  };
}

interface UnknownMessage extends BaseMessage {
  type: string; // fallback
}

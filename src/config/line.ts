import {
  Client,
  WebhookEvent,
  MessageAPIResponseBase,
  TextMessage,
} from "@line/bot-sdk";
import * as dotenv from "dotenv";

dotenv.config();

export const lineConfig = {
  channelAccessToken: process.env.CHANNELACCESSTOKEN || "",
  channelSecret: process.env.CHANNELSECRET || "",
};

export const client: Client = new Client(lineConfig);

export const handleEvent = async (
  event: WebhookEvent
): Promise<MessageAPIResponseBase | undefined> => {
  if (event.type !== "message" || event.message.type !== "text") {
    return;
  }

  const { replyToken } = event;
  const { text } = event.message;
  // const { userId } = event.source;

  await client.replyMessage(replyToken, {
    type: 'text',
    text: text
  });
}

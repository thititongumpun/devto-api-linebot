import {
  Client,
  WebhookEvent,
  MessageAPIResponseBase,
  TextMessage,
} from "@line/bot-sdk";
import * as dotenv from "dotenv";
import { fetchData } from "../libs/devtoApi";
import { ApiResponse } from "../types/apiResponse";

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

  const data: ApiResponse[] = await fetchData();
  let apiResponse: ApiResponse[] = data.map(val => ({
    title: val.title,
    description: val.description,
    url: val.url,
    tags: val.tags,
    readable_publish_date: val.readable_publish_date
  }))
  let textResponse: string = JSON.stringify(apiResponse);

  const response: TextMessage = {
    type: "text",
    text: textResponse,
  };

  await client.replyMessage(replyToken, response);
}

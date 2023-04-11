import {
  Client,
  WebhookEvent,
  MessageAPIResponseBase,
  FlexBubble,
  FlexMessage
} from "@line/bot-sdk";
import * as dotenv from "dotenv";
import { fetchData, fetchDataPerPage, fetchDataWithTag } from "../libs/devtoApi";
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

  let data: ApiResponse[] = await fetchData();
  
  let regexNumber = /^\d+$/;
  if (text.match(regexNumber)) {
    data = await fetchDataPerPage(text);
  }

  if (text.startsWith("tags=")) {
    data = await fetchDataWithTag(text.split('=').pop());
  }

  let response: ApiResponse[] = data.map(val => ({
    title: val.title,
    description: val.description,
    url: val.url,
    tags: val.tags,
    readable_publish_date: val.readable_publish_date,
    social_image: val.social_image
  }))

  let flexBubbles: FlexBubble[] = [];

  for (let i = 0; i < response.length; i++) {
    let bubbles: FlexBubble = {
      type: "bubble",
      hero: {
        type: "image",
        size: "full",
        aspectRatio: "20:13",
        aspectMode: "cover",
        url: response[i].social_image
      },
      body: {
        type: "box",
        layout: "vertical",
        spacing: "sm",
        contents: [
          {
            type: "text",
            text: response[i].title,
            wrap: true,
            weight: "bold",
            size: "md"
          },
          {
            type: "box",
            layout: "baseline",
            contents: [
              {
                type: "text",
                text: response[i].tags,
                wrap: true,
                weight: "regular",
                size: "xs",
                flex: 0
              },
            ]
          }
        ]
      },
      footer: {
        type: "box",
        layout: "vertical",
        spacing: "sm",
        contents: [
          {
            type: "button",
            style: "primary",
            action: {
              type: "uri",
              label: "Link",
              uri: response[i].url
            }
          },
          {
            type: "text",
            text: response[i].readable_publish_date,
            wrap: true,
            weight: "bold",
            size: "md",
            align: "center"
          },
        ]
      }
    }
    flexBubbles.push(bubbles);
  }

  const flexRes: FlexMessage = {
    type: "flex",
    altText: "..",
    contents: {
      type: "carousel",
      contents: flexBubbles
    }
  }

  await client.replyMessage(replyToken, flexRes);
}

import {
  Client,
  WebhookEvent,
  MessageAPIResponseBase,
  TextMessage,
  FlexBubble,
  FlexMessage,
  FlexCarousel,
} from "@line/bot-sdk";
import * as dotenv from "dotenv";
import { fetchData, fetchDataWithTag } from "../libs/devtoApi";
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

  // const data: ApiResponse[] = await fetchDataWithTag(text);
  // let apiResponse: ApiResponse[] = data.map(val => ({
  //   title: val.title,
  //   description: val.description,
  //   url: val.url,
  //   tags: val.tags,
  //   readable_publish_date: val.readable_publish_date
  // }));
  const data = await fetchData();

  let textResponse: string = JSON.stringify(data, null, 4);
  const response: TextMessage = {
    type: "text",
    text: textResponse,
  };

  const flexRes: FlexMessage = {
    type: "flex",
    altText: "..",
    contents: {
      "type": "carousel",
      "contents": [
        {
          "type": "bubble",
          "hero": {
            "type": "image",
            "size": "full",
            "aspectRatio": "20:13",
            "aspectMode": "cover",
            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_5_carousel.png"
          },
          "body": {
            "type": "box",
            "layout": "vertical",
            "spacing": "sm",
            "contents": [
              {
                "type": "text",
                "text": "Arm Chair, White",
                "wrap": true,
                "weight": "bold",
                "size": "xl"
              },
              {
                "type": "box",
                "layout": "baseline",
                "contents": [
                  {
                    "type": "text",
                    "text": "$49",
                    "wrap": true,
                    "weight": "bold",
                    "size": "xl",
                    "flex": 0
                  },
                  {
                    "type": "text",
                    "text": ".99",
                    "wrap": true,
                    "weight": "bold",
                    "size": "sm",
                    "flex": 0
                  }
                ]
              }
            ]
          },
          "footer": {
            "type": "box",
            "layout": "vertical",
            "spacing": "sm",
            "contents": [
              {
                "type": "button",
                "style": "primary",
                "action": {
                  "type": "uri",
                  "label": "Add to Cart",
                  "uri": "https://linecorp.com"
                }
              },
              {
                "type": "button",
                "action": {
                  "type": "uri",
                  "label": "Add to wishlist",
                  "uri": "https://linecorp.com"
                }
              }
            ]
          }
        },
        {
          "type": "bubble",
          "hero": {
            "type": "image",
            "size": "full",
            "aspectRatio": "20:13",
            "aspectMode": "cover",
            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_6_carousel.png"
          },
          "body": {
            "type": "box",
            "layout": "vertical",
            "spacing": "sm",
            "contents": [
              {
                "type": "text",
                "text": "Metal Desk Lamp",
                "wrap": true,
                "weight": "bold",
                "size": "xl"
              },
              {
                "type": "box",
                "layout": "baseline",
                "flex": 1,
                "contents": [
                  {
                    "type": "text",
                    "text": "$11",
                    "wrap": true,
                    "weight": "bold",
                    "size": "xl",
                    "flex": 0
                  },
                  {
                    "type": "text",
                    "text": ".99",
                    "wrap": true,
                    "weight": "bold",
                    "size": "sm",
                    "flex": 0
                  }
                ]
              },
              {
                "type": "text",
                "text": "Temporarily out of stock",
                "wrap": true,
                "size": "xxs",
                "margin": "md",
                "color": "#ff5551",
                "flex": 0
              }
            ]
          },
          "footer": {
            "type": "box",
            "layout": "vertical",
            "spacing": "sm",
            "contents": [
              {
                "type": "button",
                "flex": 2,
                "style": "primary",
                "color": "#aaaaaa",
                "action": {
                  "type": "uri",
                  "label": "Add to Cart",
                  "uri": "https://linecorp.com"
                }
              },
              {
                "type": "button",
                "action": {
                  "type": "uri",
                  "label": "Add to wish list",
                  "uri": "https://linecorp.com"
                }
              }
            ]
          }
        },
        {
          "type": "bubble",
          "body": {
            "type": "box",
            "layout": "vertical",
            "spacing": "sm",
            "contents": [
              {
                "type": "button",
                "flex": 1,
                "gravity": "center",
                "action": {
                  "type": "uri",
                  "label": "See more",
                  "uri": "https://linecorp.com"
                }
              }
            ]
          }
        }
      ]
    }
  }

  // await client.replyMessage(replyToken, response);
  await client.replyMessage(replyToken, flexRes);
}

import {
  Client,
  WebhookEvent,
  MessageAPIResponseBase,
  TextMessage,
  FlexBubble,
  FlexMessage,
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

  const flex: FlexMessage = {
    altText: "bubble",
    type: "flex",
    contents: {
      "type": "bubble",
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "image",
                "url": "https://scdn.line-apps.com/n/channel_devcenter/img/flexsnapshot/clip/clip7.jpg",
                "size": "5xl",
                "aspectMode": "cover",
                "aspectRatio": "150:196",
                "gravity": "center",
                "flex": 1
              },
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "image",
                    "url": "https://scdn.line-apps.com/n/channel_devcenter/img/flexsnapshot/clip/clip8.jpg",
                    "size": "full",
                    "aspectMode": "cover",
                    "aspectRatio": "150:98",
                    "gravity": "center"
                  },
                  {
                    "type": "image",
                    "url": "https://scdn.line-apps.com/n/channel_devcenter/img/flexsnapshot/clip/clip9.jpg",
                    "size": "full",
                    "aspectMode": "cover",
                    "aspectRatio": "150:98",
                    "gravity": "center"
                  }
                ],
                "flex": 1
              }
            ]
          },
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "image",
                    "url": "https://scdn.line-apps.com/n/channel_devcenter/img/flexsnapshot/clip/clip13.jpg",
                    "aspectMode": "cover",
                    "size": "full"
                  }
                ],
                "cornerRadius": "100px",
                "width": "72px",
                "height": "72px"
              },
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "text",
                    "contents": [
                      {
                        "type": "span",
                        "text": "brown_05",
                        "weight": "bold",
                        "color": "#000000"
                      },
                      {
                        "type": "span",
                        "text": "     "
                      },
                      {
                        "type": "span",
                        "text": "I went to the Brown&Cony cafe in Tokyo and took a picture"
                      }
                    ],
                    "size": "sm",
                    "wrap": true
                  },
                  {
                    "type": "box",
                    "layout": "baseline",
                    "contents": [
                      {
                        "type": "text",
                        "text": "1,140,753 Like",
                        "size": "sm",
                        "color": "#bcbcbc"
                      }
                    ],
                    "spacing": "sm",
                    "margin": "md"
                  }
                ]
              }
            ],
            "spacing": "xl",
            "paddingAll": "20px"
          }
        ],
        "paddingAll": "0px"
      }
    }
  }

  // await client.replyMessage(replyToken, response);
  await client.replyMessage(replyToken, flex);
}

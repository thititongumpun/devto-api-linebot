import { middleware, WebhookEvent } from "@line/bot-sdk";
import { Router, Request, Response } from "express";
import { lineConfig, handleEvent } from "../config/line";

export const webhookRoute = Router();
webhookRoute.post(
  "/webhook",
  middleware(lineConfig),
  async (req: Request, res: Response): Promise<Response> => {
    const events: WebhookEvent[] = req.body.events;
    const results = await Promise.all(
      events.map(async (event: WebhookEvent) => {
        try {
          await handleEvent(event);
        } catch (err: unknown) {
          if (err instanceof Error) {
            console.error(err);
          }

          return res.status(500).json({
            status: "error",
          });
        }
      })
    );
    return res.status(200).json({
      status: "success",
      results,
    });
  }
);
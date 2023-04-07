import { Router } from 'express';
import { webhookRoute } from "./webhook";

export const routes = Router();

routes.use(webhookRoute);
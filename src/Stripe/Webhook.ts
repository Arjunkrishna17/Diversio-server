import { RequestHandler } from "express";
import Stripe from "stripe";
import EventHandler from "./EventHandler";
import { Logger } from "../Utils/Logger";

const Webhook: RequestHandler = (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

  const sig = req.headers["stripe-signature"] as string;

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEB_HOOK_SECRET as string
    );

    Logger.info("Stripe webhook event received, type: " + event.type);

    EventHandler(event);

    res.sendStatus(200);
  } catch (error) {
    Logger.info("Stripe webhok error: " + error);
    res.sendStatus(400);
  }
};

export default Webhook;

import stripe from "stripe";

import { paymentInfoTypes } from "../Config/GeneralTypes";
import { Logger } from "../Utils/Logger";

const PaymentIntent = async (paymentInfo: paymentInfoTypes) => {
  try {
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY as string);

    const paymentIntent = await stripeInstance.paymentIntents.create({
      ...paymentInfo,
    });
    Logger.info("Payment intent created:" + paymentIntent);

    return paymentIntent;
  } catch (error) {
    Logger.info("Failed to create payment intent, " + error);
  }
};

export default PaymentIntent;

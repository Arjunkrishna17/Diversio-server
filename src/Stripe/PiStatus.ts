import Stripe from "stripe";
import { Logger } from "../Utils/Logger";

const PiStatus = async (pi: string) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

    const response = await stripe.paymentIntents.retrieve(pi);

    return response.status;
  } catch (error) {
    Logger.info("Failed to retrieve payment intent " + error);
  }
};

export default PiStatus;

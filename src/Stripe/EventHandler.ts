import Stripe from "stripe";
import UpdatePayment from "../Controllers/Checkout/Payment/UpdatePayment";

const EventHandler = (event: Stripe.Event) => {
  const paymentIntentObj = event.data.object as Stripe.PaymentIntent;

  const paymentInfo = {
    cartId: paymentIntentObj.metadata.cartId,
    userId: paymentIntentObj.metadata.userId,
    type: "CARD",
  };

  switch (event.type) {
    case "payment_intent.succeeded":
      UpdatePayment({ ...paymentInfo, status: "Success" });
      break;
    case "payment_intent.requires_action":
      UpdatePayment({ ...paymentInfo, status: "Action Needed" });
      break;
    case "payment_intent.payment_failed":
      UpdatePayment({ ...paymentInfo, status: "Failed" });
      break;
  }
};

export default EventHandler;

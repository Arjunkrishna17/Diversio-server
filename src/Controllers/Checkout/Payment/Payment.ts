import { RequestHandler } from "express";

import PaymentIntent from "../../../Stripe/PaymentIntent";
import { Logger } from "../../../Utils/Logger";
import OrderModal from "../../../Modals/Order";
import DeleteAllCart from "../../Cart/DeleteAllCart";
import { orderDetails } from "../../../Types/Order";

export const CreatePaymentIntent: RequestHandler = async (req, res, next) => {
  try {
    const cartId = req.query.cartId;

    const order = (await OrderModal.findOne({
      cartId: cartId,
    })) as orderDetails;

    const paymentInfo = {
      amount: order.cartAmount,
      currency: "inr",
      metadata: { userId: order.userId, cartId: cartId as string },
      description: "Payment for product from diversio",
    };

    const response = await PaymentIntent(paymentInfo);

    if (response) {
      await OrderModal.updateMany(
        { cartId: cartId },
        { $set: { pi: response.id } }
      );

      res.status(200).json({
        clientSecret: response.client_secret,
        amount: response.amount,
      });
      Logger.info(
        "Payment intent generated for order: " +
          cartId +
          " have user id " +
          paymentInfo.metadata.userId
      );
    } else {
      res.status(500).json("Failed to create payment intent");
    }
  } catch (error) {
    res.status(500).json("Failed to create payment intent, error: " + error);
    Logger.error("Failed to create payment intent, error: " + error);
  }
};

export const CodHandler: RequestHandler = async (req, res, next) => {
  const cartId = req.query.cartId;

  const userId = res.locals.userId;

  if (cartId) {
    try {
      await OrderModal.updateMany(
        { cartId: cartId as string },
        { $set: { paymentType: "cod", paymentStatus: "Success" } }
      );

      await DeleteAllCart(cartId as string, userId);

      res.sendStatus(200);
    } catch (error) {
      res.status(200).json("Failed to place order on COD");
    }
  } else {
    res.status(404).json("Please provide a valid order ID");
  }
};

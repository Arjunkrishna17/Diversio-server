import { error } from "console";
import { RequestHandler } from "express";
import * as yup from "yup";
import { ValidationError } from "yup";

import PaymentIntent from "../../../Stripe/PaymentIntent";
import { Logger } from "../../../Utils/Logger";
import OrderModal from "../../../Modals/Order";
import { orderTypes } from "../Types";

export const CreatePaymentIntent: RequestHandler = async (req, res, next) => {
  try {
    const orderId = req.query.orderId;

    const order = (await OrderModal.findById(orderId)) as orderTypes;

    const paymentInfo = {
      amount: order.totalAmount,
      currency: "inr",
      metadata: { userId: order.userId, orderId: orderId as string },
    };

    const response = await PaymentIntent(paymentInfo);

    if (response) {
      await OrderModal.findByIdAndUpdate(
        { _id: orderId },
        { $set: { pi: response.id } }
      );

      res.status(200).json({ clientSecret: response.client_secret });
      Logger.info(
        "Payment intent generated for order: " +
          orderId +
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
  const orderId = req.query.orderId;

  if (orderId) {
    try {
      await OrderModal.findOneAndUpdate(
        { _id: orderId as string },
        { $set: { paymentType: "cod", paymentStatus: "success" } }
      );

      res.sendStatus(200);
    } catch (error) {
      res.status(200).json("Failed to place order on COD");
    }
  } else {
    res.status(404).json("Please provide a valid order ID");
  }
};

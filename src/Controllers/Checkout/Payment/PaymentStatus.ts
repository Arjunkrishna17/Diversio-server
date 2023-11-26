import { RequestHandler } from "express";

import OrderModal from "../../../Modals/Order";
import { ERROR_MSG } from "../../../Config/Constants";
import { Logger } from "../../../Utils/Logger";

const PaymentStatus: RequestHandler = async (req, res, next) => {
  try {
    const cartId = req.query.cartId;

    if (cartId) {
      const response = await OrderModal.find({ cartId: cartId });

      if (response) {
        res.status(200).json(response[0].paymentStatus);
      } else {
        res
          .status(404)
          .json(
            "No such order found or payment details of the order not found"
          );

        Logger.info(
          "No such order found or payment details of the order not found" +
            cartId
        );
      }
    } else {
      res.status(404).json("Please provide an cart ID");
    }
  } catch (error) {
    res.status(500).json(ERROR_MSG + " error: " + error);
    Logger.info("Failed to get payment intent status error: " + error);
  }
};

export default PaymentStatus;

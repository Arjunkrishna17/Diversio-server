import { RequestHandler } from "express";
import OrderModal from "../../../Modals/Order";
import Stripe from "stripe";
import PiStatus from "../../../Stripe/PiStatus";
import { ERROR_MSG } from "../../../Config/Constants";
import { Logger } from "../../../Utils/Logger";

const PaymentStatus: RequestHandler = async (req, res, next) => {
  try {
    const orderId = req.query.orderId;

    if (orderId) {
      const response = await OrderModal.findById(orderId);

      if (response && response.pi) {
        const piStatus = await PiStatus(response.pi);

        res.status(200).json(piStatus);
      } else {
        res
          .status(404)
          .json(
            "No such order found or payment details of the order not found"
          );

        Logger.info(
          "No such order found or payment details of the order not found" +
            orderId
        );
      }
    } else {
      res.status(404).json("Please provide an Order ID");
    }
  } catch (error) {
    res.status(500).json(ERROR_MSG + " error: " + error);
    Logger.info("Failed to get payment intent status error: " + error);
  }
};

export default PaymentStatus;

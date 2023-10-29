import { RequestHandler } from "express";
import OrderModal from "../../Modals/Order";
import { ERROR_MSG } from "../../Config/Constants";
import ProductModal from "../../Modals/Product";
import { Logger } from "../../Utils/Logger";
import TotalAmount from "./TotalAmount";
import { product } from "./Types";

export const PlaceOrder: RequestHandler = async (req, res, next) => {
  const userId = res.locals.userId;

  try {
    const products: product[] = req.body.products;

    const totalOrder = await TotalAmount(products);

    if (totalOrder) {
      const order = {
        userId: userId,
        totalAmount: totalOrder.totalAmount,
        paymentType: null,
        paymentStatus: null,
        ...req.body,
      };

      const response = await OrderModal.create(order);

      if (response) {
        res.status(200).json({ orderId: response._id });
        Logger.info("New order created successfully, orderId: " + response._id);
      } else {
        res.status(400).json(ERROR_MSG);
        Logger.error("Failed to create order of user " + userId);
      }
    } else {
      res.status(400).json(ERROR_MSG);
      Logger.error(
        "Failed to create order of user, error: Failed to get the total amount " +
          "user ID: " +
          userId
      );
    }
  } catch (error) {
    res.status(500).json("Failed to place order, error: " + error);
    Logger.error(
      "Failed to place order for user " + userId + " error: " + error
    );
  }
};

export const GetOrders: RequestHandler = async (req, res, next) => {
  try {
    const query = {
      $or: [{ paymentStatus: "Success" }, { paymentStatus: "Failed" }],
    };

    const projection = {
      pi: 0,
    };

    const response = await OrderModal.find(query, projection);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(ERROR_MSG + " error: " + error);
  }
};

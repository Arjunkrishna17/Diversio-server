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

    if (products) {
      const totalOrder = await TotalAmount(products);

      const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // If the order fail to receive order confirmation, order will be deleted

      if (totalOrder) {
        const order = {
          userId: userId,
          totalAmount: totalOrder.totalAmount,
          paymentType: null,
          paymentStatus: null,
          expiresAt: expiresAt,
          ...req.body,
        };

        const response = await OrderModal.create(order);

        if (response) {
          res.status(200).json({ orderId: response._id });
          Logger.info(
            "New order created successfully, orderId: " + response._id
          );
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
    } else {
      res.status(404).json("Please provide productId and its quantity");
    }
  } catch (error) {
    res.status(500).json("Failed to place order, error: " + error);
    Logger.error(
      "Failed to place order for user " + userId + " error: " + error
    );
  }
};

export const GetOrders: RequestHandler = async (req, res, next) => {
  const orderId = req.query.orderId;

  try {
    if (orderId) {
      const response = await OrderModal.find({
        _id: orderId,
        paymentStatus: null,
      });

      if (response.length) {
        res.status(200).json(response[0]);
      } else {
        res.status(404).json("Session expired");
      }
    } else {
      const query = {
        $or: [{ paymentStatus: "Success" }, { paymentStatus: "Failed" }],
      };

      const projection = {
        pi: 0,
      };

      const response = await OrderModal.find(query, projection);

      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json(ERROR_MSG + " error: " + error);
  }
};

export const UpdateOrderAddress: RequestHandler = async (req, res, next) => {
  const orderId =
    req.query.orderId || res.sendStatus(404).json("Please provide order ID");

  try {
    const response = await OrderModal.findByIdAndUpdate(
      { _id: orderId },
      { $set: { address: req.body.address } },
      { new: true }
    );

    if (response) {
      res.sendStatus(200);
    } else {
      res.status(404).json("No such order found");
    }
  } catch (error) {
    res
      .status(500)
      .json("failed to update the address in the order error:" + error);

    Logger.error(
      "failed to update the address in the order ID:" +
        orderId +
        " error: " +
        error
    );
  }
};

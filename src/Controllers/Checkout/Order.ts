import { RequestHandler } from "express";
import OrderModal from "../../Modals/Order";
import { ERROR_MSG } from "../../Config/Constants";
import { Logger } from "../../Utils/Logger";
import { product } from "./Types";
import { CreateOrderService, GetOrderService } from "../../Services/Order";

export const CreateOrder: RequestHandler = async (req, res, next) => {
  const userId = res.locals.userId;
  const products: product[] = req.body.products;

  try {
    if (!products) {
      res.status(404).json("Please provide productId and quantity");
      return;
    }

    const cartId = await CreateOrderService(userId, products);

    res.status(200).json({ cartId: cartId });
  } catch (error) {
    Logger.error(
      "Failed to create order for user " + userId + " error: " + error
    );

    res.sendStatus(500);
  }
};

export const GetOrders: RequestHandler = async (req, res, next) => {
  const orderId = req.query.orderId;
  const cartId = req.query.cartId;
  const userId = res.locals.userId;

  try {
    const orders = await GetOrderService(
      orderId as string | undefined,
      cartId as string | undefined,
      userId
    );

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(ERROR_MSG + " error: " + error);
  }
};

export const UpdateOrderAddress: RequestHandler = async (req, res, next) => {
  const cartId =
    req.query.cartId || res.sendStatus(404).json("Please provide cart ID");

  try {
    const response = await OrderModal.updateMany(
      { cartId: cartId },
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
        cartId +
        " error: " +
        error
    );
  }
};

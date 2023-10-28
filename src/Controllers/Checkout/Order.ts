import { RequestHandler } from "express";
import OrderModal from "../../Modals/Order";
import { ERROR_MSG } from "../../Config/Constants";
import ProductModal from "../../Modals/Product";
import { Logger } from "../../Utils/Logger";

interface product {
  productId: string;
  quantity: number;
}

export const PlaceOrder: RequestHandler = async (req, res, next) => {
  const userId = res.locals.userId;

  try {
    const itemIds = req.body.products.map((item: product) => item.productId);

    const products = await ProductModal.find({ _id: { $in: itemIds } });

    const orderTotal = req.body.products.reduce(
      (total: number, item: product) => {
        const product = products.find(
          (product) => product._id.toString() === item.productId
        );
        if (product) {
          total += +product.price * +item.quantity;
        }
        return total;
      },
      0
    );

    const order = {
      userId: userId,
      totalAmount: orderTotal,
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

import { RequestHandler } from "express";
import Product from "../Modals/Product";
import { Logger } from "../Utils/Logger";

const Cart: RequestHandler = async (req, res, next) => {
  try {
    const productIds = req.query.productIds as string;

    if (productIds) {
      const ids = productIds.split(",");
      const products = await Product.find({ _id: { $in: ids } });

      res.status(200).json(products);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    Logger.error("Failed to fetch products in the cart: " + error);
    res.status(404).json("Failed to get products, please try again later.");
  }
};

export default Cart;

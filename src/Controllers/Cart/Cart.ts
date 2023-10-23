import { RequestHandler } from "express";
import Product from "../../Modals/Product";
import { Logger } from "../../Utils/Logger";
import CartProducts from "../../Modals/Cart";

const Cart: RequestHandler = async (req, res, next) => {
  try {
    const userId = res.locals.userId;

    const products = await CartProducts.find({ userId: userId });

    res.status(200).json(products);
  } catch (error) {
    Logger.error("Failed to fetch products from the cart: " + error);
    res.status(404).json("Failed to get products, please try again later.");
  }
};

export default Cart;

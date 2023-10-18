import { RequestHandler } from "express";

import CartProducts from "../../Modals/Cart";
import { Logger } from "../../Utils/Logger";

const AddToCart: RequestHandler = async (req, res, next) => {
  try {
    const product = req.body;

    await CartProducts.insertMany(product);

    res.status(200);
    Logger.info("Product from cart inserted successfully");
  } catch (error) {
    Logger.error("Failed to insert the product from cart " + error);
    res.status(500).json("Failed to insert the product from cart " + error);
  }
};

export default AddToCart;

import { RequestHandler } from "express";

import CartProducts from "../../Modals/Cart";
import { Logger } from "../../Utils/Logger";
import { product } from "./Type";

const AddToCart: RequestHandler = async (req, res, next) => {
  try {
    const products: product[] = req.body;

    const userId = res.locals.userId;

    if (products.length) {
      let productWithUserId: product[];

      productWithUserId = products.map((product) => {
        let productFromBody = { ...product };
        product.quantity = +product.quantity;
        product.price = +product.price;

        productFromBody = { ...productFromBody, userId: userId };

        return productFromBody;
      });

      if (productWithUserId) {
        await CartProducts.insertMany(productWithUserId);

        res.status(200).json("Product add to cart successfully");
        Logger.info("Product inserted to cart successfully");
      }
    } else {
      res.status(400).json("Something went wrong, please try again later");
    }
  } catch (error) {
    Logger.error("Failed to insert the product from cart " + error);
    res.status(500).json("Failed to insert the product from cart " + error);
  }
};

export default AddToCart;

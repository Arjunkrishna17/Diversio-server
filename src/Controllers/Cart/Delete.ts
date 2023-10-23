import { RequestHandler } from "express";
import CartProducts from "../../Modals/Cart";
import { Logger } from "../../Utils/Logger";

const Delete: RequestHandler = async (req, res, next) => {
  try {
    const productId = req.query["product-id"];

    await CartProducts.deleteOne({ _id: productId });

    Logger.info("Product deleted successfully" + productId);

    res.status(200).json("Product deleted from your cart successfully");
  } catch (error) {
    Logger.info("Failed to delete product from the cart", error);
    res.status(404).json("Failed to delete product from the cart" + error);
  }
};

export default Delete;

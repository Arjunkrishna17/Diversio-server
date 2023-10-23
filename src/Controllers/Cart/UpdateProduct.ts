import { RequestHandler } from "express";
import CartProducts from "../../Modals/Cart";
import { Logger } from "../../Utils/Logger";
import { product } from "./Type";

const UpdateProduct: RequestHandler = async (req, res, next) => {
  try {
    const product: product = req.body;

    const response = (await CartProducts.findOneAndReplace(
      { _id: product._id },
      product,
      {
        new: true,
      }
    )) as product;

    res.status(200).json(response);

    Logger.info(
      "Product name " +
        product.productName +
        " updated successfully with id" +
        response._id
    );
  } catch (error) {
    res.status(404).json(error);
    Logger.error(
      "Failed to update the product with id " +
        req.body.product +
        " name " +
        req.body.productName +
        " error: " +
        error
    );
  }
};
export default UpdateProduct;

import { RequestHandler } from "express";
import ProductModal from "../../Modals/Product";
import { Logger } from "../../Utils/Logger";

const Products: RequestHandler = async (req, res, next) => {
  try {
    const productId = req.query["product-id"];

    let products;

    if (productId) {
      products = await ProductModal.findById(productId);
    } else {
      products = await ProductModal.find();
    }

    res.status(200).json(products);
  } catch (error) {
    Logger.error("Failed to fetch products: " + error);
    res.status(404).json("Failed to get products, please try again later.");
  }
};

export default Products;

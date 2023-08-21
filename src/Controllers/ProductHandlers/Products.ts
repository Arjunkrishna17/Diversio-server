import { RequestHandler } from "express";
import Product from "../../Modals/Product";
import { Logger } from "../../Utils/Logger";

const Products: RequestHandler = async (req, res, next) => {
  try {
    const allProducts = await Product.find();

    res.status(200).json(allProducts);
  } catch (error) {
    Logger.error("Failed to fetch products: " + error);
    res.status(404).json("Failed to get products, please try again later.");
  }
};

export default Products;

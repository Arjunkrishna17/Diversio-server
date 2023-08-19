import { RequestHandler } from "express";
import Product from "../../Modals/Product";

const NewProduct: RequestHandler = async (req, res, next) => {
  await Product.create(req.body);

  res.status(201);
};

export default NewProduct;

import { RequestHandler } from "express";
import { product } from "./Types";
import TotalAmount from "./TotalAmount";
import { ERROR_MSG } from "../../Config/Constants";
import { Logger } from "../../Utils/Logger";

const GetTotalOrder: RequestHandler = async (req, res, next) => {
  try {
    const products: product[] = req.body.products;

    const totalOrder = await TotalAmount(products);

    if (totalOrder) {
      res.status(200).json(totalOrder);
    } else {
      res.status(404).json(ERROR_MSG);
    }
  } catch (error) {
    res
      .status(500)
      .json("Failed to get the total order amount error: " + error);

    Logger.error("Failed to get the total order amount error: " + error);
  }
};

export default GetTotalOrder;

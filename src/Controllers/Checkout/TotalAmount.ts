import { RequestHandler } from "express";

import ProductModal from "../../Modals/Product";
import { Logger } from "../../Utils/Logger";
import { product } from "./Types";

const TotalAmount = async (product: product[]) => {
  const itemIds = product.map((item: product) => item.productId);

  const products = await ProductModal.find({ _id: { $in: itemIds } });

  const totalItems = products.length;

  const orderTotal = product.reduce((total: number, item: product) => {
    const product = products.find(
      (product) => product._id.toString() === item.productId
    );
    if (product) {
      total += +product.price * +item.quantity;
    }
    return total;
  }, 0);

  const order = {
    totalItems: totalItems,
    totalAmount: orderTotal,
  };

  return order;
};

export default TotalAmount;

import { v4 as uuidV4 } from "uuid";

import TotalAmount from "../Controllers/Checkout/TotalAmount";
import { product } from "../Controllers/Checkout/Types";
import { GetProductsWithIdsDL } from "../DataLayer/Products";
import { CreateOrderDL, GetOrdersDL } from "../DataLayer/Orders";
import { productTypes } from "../Types/Products";

export const CreateOrderService = async (
  userId: string,
  products: product[]
) => {
  const totalCartAmount = await TotalAmount(products);

  const productIds = products.map((product) => product.productId);

  const productDetails = await GetProductsWithIdsDL(productIds);

  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // If the order fail to receive order confirmation, order will be deleted

  const getQty = (productId: string) => {
    return products.find(
      (productParams) => productParams.productId === productId
    )?.quantity;
  };

  const uniqueCartId = uuidV4();

  const orderDetails = productDetails.map((product: any) => {
    return {
      cartId: uniqueCartId,
      userId: userId,
      product: product,
      quantity: getQty(product._id.toString()) as number,
      cartAmount: totalCartAmount.totalAmount,
      expiresAt: expiresAt,
    };
  });

  const response = await CreateOrderDL(orderDetails);

  return response.cartId;
};

export const GetOrderService = async (
  orderId: string | null = null,
  cartId: string | null = null,
  userId: string
) => {
  let order;

  order = await GetOrdersDL(orderId, cartId, userId);

  return order;
};

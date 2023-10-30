import { product } from "./Type";
import OrderModal from "../../Modals/Order";
import { orderTypes } from "../Checkout/Types";
import CartProducts from "../../Modals/Cart";
import { Logger } from "../../Utils/Logger";

const DeleteAllCart = async (orderId: string, userId: string) => {
  const orderDetails = await OrderModal.findById(orderId);

  

  try {
    if (orderDetails) {
      const ids = orderDetails.products.map(
        (product: { productId: string; quantity: number }) => product.productId
      );

      const response = await CartProducts.deleteMany({
        userId: userId,
        productId: { $in: ids },
      });

      Logger.info("All products of order ID: " + orderId + " deleted");

      return true;
    }
  } catch (error) {
    Logger.error(
      "Failed to delete the products from cart after the payment status update, error: " +
        error
    );

    return false;
  }
};

export default DeleteAllCart;

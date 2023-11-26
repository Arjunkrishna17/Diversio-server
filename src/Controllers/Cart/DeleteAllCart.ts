import { product } from "./Type";
import OrderModal from "../../Modals/Order";
import CartProducts from "../../Modals/Cart";
import { Logger } from "../../Utils/Logger";

const DeleteAllCart = async (cartId: string, userId: string) => {
  const orderDetails = await OrderModal.find({ cartId: cartId });

  try {
    if (orderDetails) {
      const ids = orderDetails.map(
        (product: { product: { _id: string } }) => product.product._id
      );

      const response = await CartProducts.deleteMany({
        userId: userId,
        productId: { $in: ids },
      });

      Logger.info("All products of order ID: " + cartId + " deleted");

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

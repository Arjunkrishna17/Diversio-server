import TotalAmount from "../Controllers/Checkout/TotalAmount";
import { product } from "../Controllers/Checkout/Types";
import OrderModal from "../Modals/Order";
import { orderDetails } from "../Types/Order";

export const CreateOrderDL = async (orderDetails: orderDetails[]) => {
  const response = await OrderModal.create(orderDetails);

  return response[0];
};

export const GetOrdersDL = async (
  orderId: string | null = null,
  cartId: string | null = null,
  userId: string
) => {
  let order;

  if (orderId) {
    order = await OrderModal.find({ _id: orderId });
  } else if (cartId) {
    order = await OrderModal.find({
      cartId: cartId,
      paymentStatus: null,
    });
  } else {
    const query = {
      userId: userId,
      $or: [{ paymentStatus: "Success" }, { paymentStatus: "Failed" }],
    };

    const projection = {
      pi: 0,
    };

    order = await OrderModal.find(query, projection).sort({ createdAt: 1 });
  }

  return order;
};

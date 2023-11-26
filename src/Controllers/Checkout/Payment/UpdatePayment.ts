import OrderModal from "../../../Modals/Order";
import { Logger } from "../../../Utils/Logger";
import DeleteAllCart from "../../Cart/DeleteAllCart";

interface props {
  cartId: string;
  userId: string;
  type: string;
  status: string;
}

const UpdatePayment = async ({ cartId, userId, type, status }: props) => {
  try {
    const response = await OrderModal.updateMany(
      { cartId: cartId },
      { $set: { paymentStatus: status, paymentType: type, expiresAt: null } },
      { new: true }
    );

    if (response) {
      Logger.info(
        "Payment status of cartId: " + cartId + " updated to" + status
      );
    }

    const deleteResult = await DeleteAllCart(cartId, userId);
  } catch (error) {
    Logger.info("Failed to update the payment status of cart: " + cartId);
  }
};

export default UpdatePayment;

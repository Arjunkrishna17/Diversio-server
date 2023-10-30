import OrderModal from "../../../Modals/Order";
import { Logger } from "../../../Utils/Logger";
import DeleteAllCart from "../../Cart/DeleteAllCart";

interface props {
  orderId: string;
  userId: string;
  type: string;
  status: string;
}

const UpdatePayment = async ({ orderId, userId, type, status }: props) => {
  try {
    const response = await OrderModal.findByIdAndUpdate(
      { _id: orderId },
      { $set: { paymentStatus: status, paymentType: type, expiresAt: null } },
      { new: true }
    );

    if (response) {
      Logger.info(
        "Payment status of order: " +
          response._id +
          " updated to" +
          response.paymentStatus
      );
    }

    const deleteResult = await DeleteAllCart(orderId, userId);
  } catch (error) {
    Logger.info("Failed to update the payment status of order: " + orderId);
  }
};

export default UpdatePayment;

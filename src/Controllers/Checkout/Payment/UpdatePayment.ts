import OrderModal from "../../../Modals/Order";
import { Logger } from "../../../Utils/Logger";

interface props {
  orderId: string;
  userId: string;
  type: string;
  status: string;
}

const UpdatePayment = async ({ orderId, type, status }: props) => {
  try {
    const response = await OrderModal.findByIdAndUpdate(
      { _id: orderId },
      { $set: { paymentStatus: status, paymentType: type } },
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
  } catch (error) {
    Logger.info("Failed to update the payment status of order: " + orderId);
  }
};

export default UpdatePayment;

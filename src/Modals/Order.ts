import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  userId: { type: String, required: true },
  products: { type: Array, required: true },
  totalAmount: { type: Number, required: true },
  address: { type: Object, required: true },
  paymentType: { type: String, default: null },
  paymentStatus: { type: String, default: null },
  pi: { type: String, default: null },
});

const OrderModal = model("orders", orderSchema);

export default OrderModal;

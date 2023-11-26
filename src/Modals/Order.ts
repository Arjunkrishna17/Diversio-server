import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  cartId: { type: String, required: true },
  userId: { type: String, required: true },
  product: { type: Object, required: true },
  cartAmount: { type: Number, required: true },
  address: { type: Object, default: null },
  quantity: { type: Number, required: true },
  paymentType: { type: String, default: null },
  paymentStatus: { type: String, default: null },
  pi: { type: String, default: null },
  createdAt: { type: Date, default: Date.now() },
  expiresAt: {
    type: Date,
    default: null,
  },
});

const OrderModal = model("orders", orderSchema);

export default OrderModal;

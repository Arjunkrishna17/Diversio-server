import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
});

const CartProducts = model("Cart", cartSchema);

export default CartProducts;

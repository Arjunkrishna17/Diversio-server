import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  qty: { type: Number, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
});

const CartProducts = model("Cart", cartSchema);

export default CartProducts;

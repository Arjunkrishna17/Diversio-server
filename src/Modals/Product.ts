import mongoose from "mongoose";
import { DateTime } from "luxon";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  images: [{ type: String, required: true }],
  seller: { type: String, required: true },
  stock: { type: Number, required: true },
  specifications: { type: mongoose.Schema.Types.Mixed, required: true },
  createdAt: { type: Date, default: DateTime.now().toUTC() },
});

const Product = mongoose.model("Product", productSchema);

export default Product;

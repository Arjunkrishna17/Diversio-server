import { TokenValidator } from "./../Middleware/TokenValidator";
import { Router } from "express";
import NewProduct from "../Controllers/ProductHandlers/NewProduct";
import multer from "multer";
import Products from "../Controllers/ProductHandlers/Products";
import Cart from "../Controllers/Cart/Cart";
import AddToCart from "../Controllers/Cart/AddToCart";
import Product from "../Modals/Product";
import UpdateProduct from "../Controllers/Cart/UpdateProduct";
import Delete from "../Controllers/Cart/Delete";

const ProductRouter = Router();
const Upload = multer();

ProductRouter.get("/", Products);

ProductRouter.post(
  "/new-product",
  TokenValidator,
  Upload.array("images"),
  NewProduct
);

ProductRouter.post("/cart/new", TokenValidator, AddToCart);

ProductRouter.get("/cart", TokenValidator, Cart);

ProductRouter.put("/cart", TokenValidator, UpdateProduct);

ProductRouter.delete("/cart", TokenValidator, Delete);

export default ProductRouter;

import { TokenValidator } from "./../Middleware/TokenValidator";
import { Router } from "express";
import NewProduct from "../Controllers/ProductHandlers/NewProduct";
import multer from "multer";
import Products from "../Controllers/ProductHandlers/Products";
import Cart from "../Controllers/Cart";

const ProductRouter = Router();
const Upload = multer();

ProductRouter.get("/", Products);

ProductRouter.get("/cart", Cart);

ProductRouter.post(
  "/new-product",
  TokenValidator,
  Upload.array("images"),
  NewProduct
);

export default ProductRouter;

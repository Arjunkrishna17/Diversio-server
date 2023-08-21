import { Router } from "express";
import NewProduct from "../Controllers/ProductHandlers/NewProduct";
import multer from "multer";
import Products from "../Controllers/ProductHandlers/Products";

const ProductRouter = Router();
const Upload = multer();

ProductRouter.get("/", Products);

ProductRouter.post("/new-product", Upload.array("images"), NewProduct);

export default ProductRouter;

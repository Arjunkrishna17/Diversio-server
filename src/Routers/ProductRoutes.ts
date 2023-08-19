import { Router } from "express";
import NewProduct from "../Controllers/ProductHandlers/NewProduct";
import multer from "multer";

const ProductRouter = Router();
const Upload = multer();

ProductRouter.post("/new-product", Upload.array("images"), NewProduct);

export default ProductRouter;

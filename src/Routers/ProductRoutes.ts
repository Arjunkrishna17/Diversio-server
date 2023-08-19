import { Router } from "express";
import NewProduct from "../Controllers/ProductHandlers/NewProduct";

const ProductRouter = Router();

ProductRouter.put("/new-product", NewProduct);

export default ProductRouter;

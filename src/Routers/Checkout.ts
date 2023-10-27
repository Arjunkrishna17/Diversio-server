import { Router } from "express";
import { TokenValidator } from "../Middleware/TokenValidator";
import {
  deleteAddress,
  editAddress,
  getAddress,
  saveAddress,
} from "../Controllers/Address";

const Checkout = Router();

Checkout.post("/address", TokenValidator, saveAddress);

Checkout.get("/address", TokenValidator, getAddress);

Checkout.delete("/address", TokenValidator, deleteAddress);

Checkout.put("/address", TokenValidator, editAddress);

export default Checkout;

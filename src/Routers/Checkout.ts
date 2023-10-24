import { Router } from "express";
import { TokenValidator } from "../Middleware/TokenValidator";
import { deleteAddress, getAddress, saveAddress } from "../Controllers/Address";

const Checkout = Router();

Checkout.post("/address", TokenValidator, saveAddress);

Checkout.get("/address", TokenValidator, getAddress);

Checkout.delete("/address", TokenValidator, deleteAddress);

export default Checkout;

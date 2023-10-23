import { Router } from "express";
import { TokenValidator } from "../Middleware/TokenValidator";
import { getAddress, saveAddress } from "../Controllers/Address";

const Checkout = Router();

Checkout.post("/address", TokenValidator, saveAddress);

Checkout.get("/address", TokenValidator, getAddress);

export default Checkout;

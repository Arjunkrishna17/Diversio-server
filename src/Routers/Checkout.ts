import { Router } from "express";
import { TokenValidator } from "../Middleware/TokenValidator";
import {
  DeleteAddress,
  EditAddress,
  GetAddress,
  SaveAddress,
} from "../Controllers/Checkout/Address";
import {
  CreatePaymentIntent,
  CodHandler,
} from "../Controllers/Checkout/Payment/Payment";
import {
  GetOrders,
  CreateOrder,
  UpdateOrderAddress,
} from "../Controllers/Checkout/Order";
import PaymentStatus from "../Controllers/Checkout/Payment/PaymentStatus";
import TotalAmount from "../Controllers/Checkout/TotalAmount";
import GetTotalOrder from "../Controllers/Checkout/GetTotalOrder";

const Checkout = Router();

Checkout.get("/orders", TokenValidator, GetOrders);

Checkout.post("/orders/address/update", TokenValidator, UpdateOrderAddress);

Checkout.post("/orders", TokenValidator, CreateOrder);

Checkout.post("/orders/total-amount", TokenValidator, GetTotalOrder);

Checkout.post("/address", TokenValidator, SaveAddress);

Checkout.get("/address", TokenValidator, GetAddress);

Checkout.delete("/address", TokenValidator, DeleteAddress);

Checkout.put("/address", TokenValidator, EditAddress);

Checkout.get("/payment-intent", TokenValidator, CreatePaymentIntent);

Checkout.get("/payment-cod", TokenValidator, CodHandler);

Checkout.get("/payment/status", TokenValidator, PaymentStatus);

export default Checkout;

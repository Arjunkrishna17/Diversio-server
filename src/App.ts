import express from "express";
import cors from "cors";
import https from "https";

import { Logger } from "./Utils/Logger";
import ConnectDb from "./Db/ConnectDb";
import ProductRoutes from "./Routers/ProductRoutes";
import { DEV_URL, PROD_URL } from "./Config/CorsUrl";
import Login from "./Routers/Login";
import Checkout from "./Routers/Checkout";
import Webhook from "./Stripe/Webhook";

const app = express();

ConnectDb();

app.post("/stripe/webhook", express.raw({ type: "*/*" }), Webhook);

app.use(express.json());

app.use(cors({ origin: [DEV_URL, PROD_URL] }));

app.use("/health", (req, res, next) => {
  // Helps Aws to keep the server running
  res.status(200).end();
});

app.use("/products", ProductRoutes);

app.use("/auth", Login);

app.use("/checkout", Checkout);

// const params = {
//   key: process.env.PRIVATE_KEY?.replace(/\\n/g, "\n"),
//   cert: process.env.PUBLIC_KEY?.replace(/\\n/g, "\n"),
// };

// let server = https.createServer(params, app);

// server.listen(443, () => {
//   Logger.info("Listening on port 443");
// });

app.listen(3000, () => {
  Logger.info("Listening on port 8080");
});

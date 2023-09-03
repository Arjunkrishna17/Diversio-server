import express from "express";
import cors from "cors";

import { Logger } from "./Utils/Logger";
import ConnectDb from "./Db/ConnectDb";
import ProductRoutes from "./Routers/ProductRoutes";
import { DEV_URL, PROD_URL } from "./Config/CorsUrl";

const app = express();

ConnectDb();

app.use(cors({ origin: [DEV_URL, PROD_URL] }));

app.use("/health", (req, res, next) => {
  res.status(200).end();
});

app.use("/products", ProductRoutes);

app.listen(8080, () => {
  Logger.info("Listening on port 8080");
});

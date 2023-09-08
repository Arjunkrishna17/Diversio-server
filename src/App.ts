import express from "express";
import cors from "cors";
import https from "https";

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

const params = {
  key: process.env.PRIVATE_KEY?.replace(/\\n/g, "\n"),
  cert: process.env.PUBLIC_KEY?.replace(/\\n/g, "\n"),
};

let server = https.createServer(params, app);

server.listen(443, () => {
  Logger.info("Listening on port 443");
});

import express from "express";
import cors from "cors";

import { Logger } from "./Utils/Logger";
import ConnectDb from "./Db/ConnectDb";
import ProductRoutes from "./Routers/ProductRoutes";

const app = express();

ConnectDb();

const devURL = "http://localhost:3000";

const productionURL = "";

app.use(cors({ origin: [devURL, productionURL] }));

app.use("/test",(req,res) => {
  res.status(200).json("Request Received")
})

app.use("/health", (req, res) => {
  res.status(200).end();
});

app.use("/products", ProductRoutes);

app.listen(8080, () => {
  Logger.info("Listening on port 8080");
});

import express from "express";
import { Logger } from "./Utils/Logger";
import ConnectDb from "./Db/ConnectDb";
import ProductRoutes from "./Routers/ProductRoutes";

const app = express();

ConnectDb();

app.use("/products", ProductRoutes);

app.listen(8080, () => {
  Logger.info("Listening on port 8080");
});

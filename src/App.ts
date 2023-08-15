import express from "express";
import { Logger } from "./Utils/Logger";
import connectDb from "./Db/ConnectDb";

const app = express();

connectDb();

app.listen(8080, () => {
  Logger.info("Listening on port 8080");
});

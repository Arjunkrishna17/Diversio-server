import express from "express";
import { Logger } from "./Utils/Logger";
import ConnectDb from "./Db/ConnectDb";

const app = express();

ConnectDb();

app.listen(8080, () => {
  Logger.info("Listening on port 8080");
});

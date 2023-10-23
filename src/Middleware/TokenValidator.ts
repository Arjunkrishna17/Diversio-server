import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { Logger } from "../Utils/Logger";

export const TokenValidator: RequestHandler = (req, res, next) => {
  let bearerToken;
  let authType;

  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ");
    bearerToken = token[1];
    authType = token[0];
  }

  if (bearerToken && bearerToken !== null && authType === "Bearer") {
    // jwt verify will do the verification and parsing.

    jwt.verify(
      bearerToken,
      process.env.JWT_SECRET_KEY as string,

      // eslint-disable-next-line
      (err, tokenInfo: any) => {
        if (err) {
          res.status(401).json("Authentication failed, error: " + err);
          Logger.info("Token Invalid error" + err);
        } else {
          const userId = tokenInfo["userId"];
          res.locals.userId = userId;

          next();
        }
      }
    );
  } else {
    res.status(401).end();
  }
};

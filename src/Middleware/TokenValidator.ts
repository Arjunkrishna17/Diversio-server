import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

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
      process.env.JWT_SECERET as string,

      // eslint-disable-next-line
      (err, tokenInfo: any) => {
        if (err) {
          res.status(401).end();
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

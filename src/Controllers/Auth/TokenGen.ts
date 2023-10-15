import jwt from "jsonwebtoken";

import { user } from "./Type";

const TokenGen = (payload: user) => {
  const secret = process.env.JWT_SECRET_KEY as string;

  const tokenPayload = {
    user: payload.user,
    username: payload.username,
  };

  return jwt.sign(tokenPayload, secret, { expiresIn: "7h" });
};

export default TokenGen;

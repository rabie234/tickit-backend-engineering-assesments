import jwt, { Secret, SignOptions } from "jsonwebtoken";
import config from "../config/app.config";

const accessTokenSecret: Secret = config.jwt.access.secret;

interface TokenPayload {
  id: string;
}

interface TokenResult {
  token: string;
}

export const signAccessToken = (payload: TokenPayload): TokenResult => {
  const options: SignOptions = {
    expiresIn: "24h",
  };

  const token = jwt.sign(payload, accessTokenSecret, options);

  return {
    token,
  };
};

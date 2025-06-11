import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User, { IUser } from "../model/user.model";
import Exception from "../lib/HttpException";

// Extend Request to include `user` and `token_data`
interface AuthenticatedRequest extends Request {
  user?: Partial<Omit<IUser, "password">>;
  body: {
    token_data?: JwtPayload;
    [key: string]: any;
  };
}

// Manually promisify jwt.verify to handle async/await
const verifyToken = (token: string, secret: string): Promise<JwtPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) return reject(err);
      resolve(decoded as JwtPayload);
    });
  });
};

// Protect middleware
export const protect = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
  checkUser: boolean
): Promise<void> => {
  try {
    let token: string | undefined;
    console.log("--------------------------");
    console.log(req.headers.authorization);
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(new Exception(401, "Authentication token missing"));
    }

    let decoded: JwtPayload;

    try {
      decoded = await verifyToken(token, __config.jwt.access.secret);
      console.log(decoded);
    } catch (err: any) {
      if (err.name === "JsonWebTokenError") {
        return next(new Exception(401, "Invalid authentication token"));
      } else if (err.name === "TokenExpiredError") {
        return next(
          new Exception(
            401,
            checkUser
              ? "Your session expired. Please login again"
              : "Your session expired. Please try again"
          )
        );
      } else {
        return next(err);
      }
    }

    if (!decoded) {
      return next(new Exception(401, "Invalid authentication token"));
    }

    if (checkUser) {
      const user = await User.findById(decoded.id);
      if (!user) {
        return next(new Exception(401, "User account not found."));
      }

      const { password: _, ...strippedUser } = user.toObject();
      req.user = strippedUser;
    } else {
      req.body.token_data = decoded;
    }

    return next();
  } catch (error) {
    next(error);
  }
};

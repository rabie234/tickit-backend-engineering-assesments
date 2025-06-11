import { NextFunction } from "express";
import HttpException from "./HttpException";

interface ErrorDetail {
  key: string;
  code: number;
  msg: string;
}

type ErrorConfig = Record<string, ErrorDetail>;

const errorHandling = (
  errors: ErrorConfig,
  error: any,
  next: NextFunction
): void => {
  const match = Object.values(errors).find((err) => err.key === error.message);

  if (match) {
    return next(new HttpException(match.code, match.msg));
  }

  next(error);
};

export default errorHandling;

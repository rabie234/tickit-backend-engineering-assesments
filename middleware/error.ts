import { Request, Response, NextFunction } from "express";
import { error as sendError } from "../lib/response";

const errorMiddleware = (
  error: { status?: number; message?: string },
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  sendError(res, status, message);
};

export default errorMiddleware;

import { Request, Response, NextFunction, RequestHandler } from "express";
import errorHandling from "./errorHandling";
import configs from "../config/booking.config";

const promiseHandler =
  (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
  ): RequestHandler =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      errorHandling(configs.bookingSeatErrors, error, next);
    });
  };

export default promiseHandler;

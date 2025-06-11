import { Request, Response, NextFunction } from "express";
import { getAllOrders } from "../service/order.service";

export const getOrdersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const events = await getAllOrders();
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

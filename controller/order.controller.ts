import { Request, Response, NextFunction } from "express";
import { createOrder } from "../service/order.service";

export const bookSeat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { seatID } = req.body;

  try {
    const result = await createOrder(seatID);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

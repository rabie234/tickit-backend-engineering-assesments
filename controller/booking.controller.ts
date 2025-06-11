import { Request, Response, NextFunction } from "express";
import { buyTicket } from "../service/booking.service";
import { createOrder } from "../service/order.service";
import Seat from "../model/seat.model";

export const bookSeat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { seatID } = req.body;
  console.log("-------------------------------------");
  console.log(req.user);

  try {
    const result = await buyTicket(seatID);
    const seat = await Seat.findOne({
      seatID: seatID,
    });
    const user = req.user;
    await createOrder({
      customerID: user?._id ? user?._id : "0",
      amount: seat?.price ? seat.price : 0,
      currency: "US",
      seat: seatID,
    });

    res.status(200).json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

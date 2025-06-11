import { Request, Response, NextFunction } from "express";
import { getAllEvents, getSeatByEventId } from "../service/event.service";

export const getEventsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const events = await getAllEvents();
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};
export const getSeatsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const seats = await getSeatByEventId(req.params.eventId);
    res.status(200).json(seats);
  } catch (error) {
    next(error);
  }
};

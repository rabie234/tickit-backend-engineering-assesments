import Event, { IEvent } from "../model/event.model";
import Seat, { ISeat } from "../model/seat.model";

export const getAllEvents = async (): Promise<IEvent[]> => {
  try {
    const events = await Event.find().sort({ createdAt: -1 }); // optionally sort by creation date
    return events;
  } catch (error) {
    throw new Error("Failed to fetch events: " + (error as Error).message);
  }
};
export const getSeatByEventId = async (eventID: String): Promise<ISeat[]> => {
  try {
    const seats = await Seat.find({ eventID: eventID }).sort({
      createdAt: -1,
    }); // optionally sort by creation date
    return seats;
  } catch (error) {
    throw new Error("Failed to fetch events: " + (error as Error).message);
  }
};

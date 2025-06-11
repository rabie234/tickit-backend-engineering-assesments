import Seat from "../model/seat.model";

export const buyTicket = async (seatID: string) => {
  const seat = await Seat.findOne({ seatID });

  if (!seat) {
    throw new Error("Seat not found.");
  }

  if (seat.isTaken) {
    throw new Error("Seat is already taken.");
  }

  seat.isTaken = true;
  await seat.save();

  return {
    message: "Seat successfully booked.",
    seat: {
      seatID: seat.seatID,
      name: seat.name,
      eventID: seat.eventID,
    },
  };
};

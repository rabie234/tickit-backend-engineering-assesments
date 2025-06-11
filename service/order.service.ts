import Order, { IOrder } from "../model/order.model";
import Seat from "../model/seat.model";

export interface CreateOrderInput {
  customerID: string;
  amount: number;
  currency: string;
  seat: string;
}

export const createOrder = async ({
  customerID,
  amount,
  currency,
  seat,
}: CreateOrderInput): Promise<IOrder> => {
  const order = new Order({
    customerID,
    amount,
    currency,
    status: "completed",
    seats: [seat],
  });

  return await order.save();
};

export const getAllOrders = async (): Promise<IOrder[]> => {
  try {
    const events = await Order.find()
      .populate("customerID", "-password")
      .sort({ createdAt: -1 });
    return events;
  } catch (error) {
    throw new Error("Failed to fetch events: " + (error as Error).message);
  }
};

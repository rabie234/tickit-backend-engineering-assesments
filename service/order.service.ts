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
    seats: [seat], // still storing as array for schema consistency
  });

  return await order.save();
};

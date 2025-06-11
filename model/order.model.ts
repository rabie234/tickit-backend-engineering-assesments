// models/order.model.ts

import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOrder extends Document {
  customerID: string;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed";
  seats: string[]; // array of seatIDs
  createdAt?: Date;
  updatedAt?: Date;
}

const orderSchema: Schema<IOrder> = new Schema(
  {
    customerID: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      required: true,
      default: "USD",
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    seats: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order: Model<IOrder> = mongoose.model<IOrder>("Order", orderSchema);

export default Order;

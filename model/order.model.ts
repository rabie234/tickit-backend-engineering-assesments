// models/order.model.ts

import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IOrder extends Document {
  customerID: Types.ObjectId;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed";
  seats: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const orderSchema: Schema<IOrder> = new Schema(
  {
    customerID: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
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

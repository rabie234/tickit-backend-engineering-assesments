import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISeat extends Document {
  seatID: string;
  name: string;
  eventID: string;
  price: number;
  isTaken?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const seatSchema: Schema<ISeat> = new Schema(
  {
    seatID: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    eventID: {
      type: String,
      required: true,
    },
    isTaken: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Seat: Model<ISeat> = mongoose.model<ISeat>("Seat", seatSchema);

export default Seat;

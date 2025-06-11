import mongoose, { Schema, Document, Model } from "mongoose";

// Define an interface representing a document in MongoDB.
export interface IEvent extends Document {
  eventID: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const eventSchema: Schema<IEvent> = new Schema(
  {
    eventID: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Event: Model<IEvent> = mongoose.model<IEvent>("Event", eventSchema);

export default Event;

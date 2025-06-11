import express, { Express } from "express";
import cors from "cors";
import connectToDatabase from "./config/database.config";
import errorMiddleware from "./middleware/error";
import config from "./config/app.config";
import eventRouter from "./route/event.route";
import authRouter from "./route/auth.route";
import bookingRouter from "./route/booking.route";

const initializeMiddlewares = (app: Express) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};

const initializeRoutes = (app: Express) => {
  app.use("/events", eventRouter);
  app.use("/book", bookingRouter);
  app.use("/auth", authRouter);
  app.use("*", (_req, res) => {
    res.status(404).send("API End Point doesn't exist");
  });
};

const initializeApp = async (app: Express) => {
  await connectToDatabase(config);
  initializeMiddlewares(app);
  initializeRoutes(app);
  app.use(errorMiddleware);
};
export default {
  initializeApp,
};

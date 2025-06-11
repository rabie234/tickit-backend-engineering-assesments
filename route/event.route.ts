import { Router } from "express";
import {
  getEventsController,
  getSeatsController,
} from "../controller/event.controller";

const router = Router();

router.get("/getEvents", getEventsController);
router.get("/getSeats/:eventId", getSeatsController);

export default router;

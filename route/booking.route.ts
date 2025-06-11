import { Router } from "express";
import { bookSeat } from "../controller/booking.controller";
import { protect } from "../middleware/restrict";

const router = Router();

router.post(
  "/buy-ticket",
  (req, res, next) => protect(req, res, next, true),
  bookSeat
);

export default router;

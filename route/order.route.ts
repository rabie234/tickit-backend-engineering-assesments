import { Router } from "express";
import { getOrdersController } from "../controller/order.controller";

const router = Router();

router.get("/getOrders", getOrdersController);

export default router;

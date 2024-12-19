import express from "express";
import { orderController } from "@controllers";

const router = express.Router();
const BASE_ROUTE = "/api/orders";

router.get("", orderController.getOrders);
router.post("/add", orderController.addOrder);
router.get("/details", orderController.getOrderDetails);
router.put("/payment_status", orderController.updatePaymentStatus);
router.put("/delivery_status", orderController.updateDeliveryStatus);

export default {
	BASE_ROUTE,
	router
};


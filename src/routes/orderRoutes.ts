import express from "express";
import { orderController } from "@controllers";
import { asyncHandler } from "@/middlewares";

const router = express.Router();
const BASE_ROUTE = "/orders";

router.get("/", asyncHandler(orderController.getOrders));
router.get("/details", asyncHandler(orderController.getOrderDetails));
router.put(
	"/payment_status",
	asyncHandler(orderController.updatePaymentStatus),
);
router.put(
	"/delivery_status",
	asyncHandler(orderController.updateDeliveryStatus),
);
router.post("/add", asyncHandler(orderController.addOrder));

export default {
	BASE_ROUTE,
	router,
};

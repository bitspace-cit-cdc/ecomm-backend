import express from "express";
import { customerController } from "@controllers";
import { asyncHandler, authHandler } from "@/middlewares";

const router = express.Router();
const BASE_ROUTE = "/customers";

router.get("", asyncHandler(customerController.getAllCustomers));
router.get("/:id", asyncHandler(customerController.getCustomer));

export default {
  router,
  BASE_ROUTE,
};

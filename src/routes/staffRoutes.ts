import { staffController } from "@/controllers";
import { asyncHandler, authHandler } from "@/middlewares";
import express from "express";

const router = express.Router();
const BASE_ROUTE = "/staff";

router.post("/create", authHandler, asyncHandler(staffController.createStaff));
router.post("/login", asyncHandler(staffController.loginStaff));
router.get("/issues", authHandler, asyncHandler(staffController.getAllIssues))

export default {
  BASE_ROUTE,
  router,
};

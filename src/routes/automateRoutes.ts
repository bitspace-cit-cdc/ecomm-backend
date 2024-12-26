import express from "express";
import { automateController } from "@controllers";
import { asyncHandler } from "@/middlewares";

const router = express.Router();
const BASE_ROUTE = "/automate";

router.get("/", asyncHandler(automateController.sayHI));

export default {
	BASE_ROUTE,
	router,
};

import { userController } from "@/controllers";
import { asyncHandler } from "@/middlewares";
import { authHandler } from "@/middlewares/authHandler";
import express from "express";

const router = express.Router();
const BASE_ROUTE = "/user";

router.get("/", (_, res) => {
  res.json({
    status: "success",
    message: "Hello World from USER",
  });
});

router.post("/", asyncHandler(userController.createUser));
router.post("/login", asyncHandler(userController.loginUser));
router.post("/check", authHandler, asyncHandler(userController.checkUser));

export default {
  BASE_ROUTE,
  router,
};

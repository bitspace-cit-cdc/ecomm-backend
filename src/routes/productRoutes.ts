import express from "express";
import { productController } from "@controllers";
import { asyncHandler } from "@/middlewares";

const router = express.Router();
const BASE_ROUTE = "/products";

router.get("", asyncHandler(productController.getAllProducts));
router.get("/category", asyncHandler(productController.getProductsByCategory));
router.put("/update", asyncHandler(productController.updateProduct));
router.post("/add", asyncHandler(productController.addProduct));

export default {
	BASE_ROUTE,
	router,
};

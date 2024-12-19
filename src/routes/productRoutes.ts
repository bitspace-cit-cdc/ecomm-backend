import express from "express";
import { productController } from "@controllers";

const router = express.Router();
const BASE_ROUTE = "/api/products";

router.post("/add", productController.addProduct); 
router.get("", productController.getAllProducts); 
router.get("/category", productController.getProductsByCategory); 
router.put("/update", productController.updateProduct);

export default {
	BASE_ROUTE,
	router
};


import { Request, Response } from "express";
import { productQueries } from "@queries";
import { db } from "@config";
import { CustomError } from "utils";

const getAllProducts = async (_req: Request, _res: Response): Promise<any> => {
	const client = await db.pool.connect();
	const result = await client.query(productQueries.getAllProducts);
	client.release();
	return result.rows;
};

const getProductsByCategory = async (
	req: Request,
	_res: Response,
): Promise<any> => {
	const client = await db.pool.connect();
	const category = req.body.category;
	const result = await client.query(productQueries.getProductsByCategory, [
		category,
	]);
	client.release();
	return result.rows;
};

const addProduct = async (req: Request, _res: Response): Promise<void> => {
	const client = await db.pool.connect();
	const values = Object.values(req.body);
	await client.query(productQueries.addProduct, values);
	client.release();
};

const updateProduct = async (req: Request, _res: Response): Promise<any> => {
	const { product_id, ...fieldsToUpdate } = req.body;

	if (!product_id) {
		throw new CustomError("Product ID is required for updates", 400);
	} else {
		const fields = Object.keys(fieldsToUpdate);
		const values = Object.values(fieldsToUpdate);
		values.push(product_id);

		const query = productQueries.updateProduct(fields);

		const client = await db.pool.connect();
		const result = await client.query(query, values);
		client.release();

		return result.rowCount;
	}
};

export default {
	getAllProducts,
	getProductsByCategory,
	addProduct,
	updateProduct,
};

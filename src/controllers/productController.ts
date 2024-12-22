import { Request, Response } from "express";
import { productQueries } from "@queries";
import { db } from "@config";
import { CustomError } from "utils";

type ProductType = {
	product_id: string;
	product_type: string;
	name: string;
	price: number;
	quantity: number;
	image_url: string;
};

const getAllProducts = async (_req: Request, _res: Response): Promise<any> => {
	const client = await db.pool.connect();
	const result = await client.query(productQueries.getAllProducts);
	client.release();
	const products: { [key: string]: Array<ProductType> } = {};
	result.rows.forEach((product: ProductType) => {
		if (products[product.product_type])
			products[product.product_type].push(product);
		else products[product.product_type] = [product];
	});
	return products;
};

const getProductById = async (req: Request, _res: Response): Promise<any> => {
	const client = await db.pool.connect();
	const product_id = req.params.product_id;
	const result = await client.query(productQueries.getProductById, [
		product_id,
	]);
	client.release();
	if (result.rows.length === 0) {
		throw new CustomError("Product not found", 404);
	}
	return result.rows[0];
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
	getProductById,
};

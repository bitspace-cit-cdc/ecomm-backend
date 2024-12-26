import { Request, Response } from "express";
import { db } from "@config";
import { customerQueries } from "@queries";


const getAllCustomers = async (req: Request, res: Response) => {
	const client = await db.pool.connect();
	const results = await client.query(customerQueries.getAllCustomers);
	client.release();
	return results.rows;
};

export default {
	getAllCustomers
};

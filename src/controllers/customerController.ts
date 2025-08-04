import { Request, Response } from "express";
import { db } from "@config";
import { customerQueries } from "@queries";

const getAllCustomers = async (req: Request, res: Response) => {
  const client = await db.pool.connect();
  const results = await client.query(customerQueries.getAllCustomers);
  client.release();
  return results.rows;
};

const getCustomer = async (req: Request, res: Response) => {
  const { id } = req.params;
  const client = await db.pool.connect();
  const results = await client.query(customerQueries.getCustomer, [id]);
  client.release();
  if (results.rows.length === 0) {
    res.status(404).json({ message: "Customer not found" });
  } else {
    return results.rows[0];
  }
};

export default {
  getAllCustomers,
  getCustomer,
};
